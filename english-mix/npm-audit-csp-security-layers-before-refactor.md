---
id: npm-audit-csp-security-layers-before-refactor
title: "Three High-Severity Vulnerabilities, but Strong CSP――結局どっちなん？"
subtitle: "Understanding npm audit, CSP, no-store, and Phase 0 as different security layers"
created: "2026-09-17"
updated: "2026-09-17"
type: "Essay"
status: "完成"
tags: ["security", "npm", "CSP", "CI", "refactoring", "English Mix"]
keywords: ["npm audit", "npm ci", "high severity", "Content Security Policy", "default-src none", "script-src self", "Cache-Control no-store", "dependency vulnerability", "Phase 0"]
grow: 5
abstract: "A CI log says “3 high severity vulnerabilities,” while the same app is described as having a strong CSP. 矛盾しているように見えるが、they measure different layers. npm audit checks known vulnerabilities in dependencies; CSP limits what the browser may load and execute; no-store controls caching. This essay uses npm, MDN, web.dev, and GitHub documentation to translate the security jargon into a model that a non-engineer can actually use."
---

# Three High-Severity Vulnerabilities, but Strong CSP――結局どっちなん？

## Three red warnings, and then someone says “the baseline defense is good”

A CI log says `3 high severity vulnerabilities`.

Right after that, someone says, 「ただしCSPはかなり強い。基礎防御は良い」。

Which is it?

If you are not deep into security, “high severity” three times feels like an evacuation order. でも「CSPが強い」と言われると、suddenly the same app sounds like a fortress.

The key discovery is that these are not two scores from the same test. **npm audit looks at the parts you depend on. CSP looks at what the browser is allowed to do.** And `no-store` is another layer again: it controls whether responses are stored in caches.

So this is not simply safe versus unsafe. 玄関の鍵は強い。でも、建物に使っている部材のうち3件は要確認。That is much closer to what the original sentence means.

[GitHub Docs: Continuous integration](https://docs.github.com/en/actions/get-started/continuous-integration) / [npm Docs: npm audit](https://docs.npmjs.com/cli/v11/commands/npm-audit/) / [MDN: Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP)

---

## First: what are CI and `npm ci` actually doing?

CI means Continuous Integration. コードが更新されたときに、buildやtestを自動実行して、problemsを早く見つける仕組み。With GitHub Actions, a push or pull request can trigger a workflow that installs Node.js dependencies and runs tests.

In Node.js projects, `npm ci` is commonly used for a clean, reproducible install based on `package-lock.json`. And in current npm configuration, `audit` defaults to `true`. つまり `npm ci` の最中にも、npm can submit dependency information to the registry and receive known vulnerability information.

So when someone says “`npm ci` reported three high-severity vulnerabilities,” it does not mean the install command personally discovered an active attack. It means **while reconstructing the dependency tree, npm also checked that tree against known security advisories and found three high-severity findings**.

CI here is less like a security guard and more like an automated vehicle inspection. 毎回同じ手順で組み立て、動かし、known recall partsまで照合する。

[npm Docs: npm ci](https://docs.npmjs.com/cli/v11/commands/npm-ci/) / [GitHub Docs: Understanding GitHub Actions](https://docs.github.com/en/actions/get-started/understand-github-actions)

---

## “Three high severity” does not automatically mean “three holes attackers can use right now”

npm says Severity is determined by the vulnerability’s impact and exploitability in its most common use case. For High, the recommended action is **“Address as quickly as possible.”**

So yes, this deserves attention.

But you still cannot jump directly to “the live app can be remotely compromised right now.” npm itself tells users to check mitigating factors: some vulnerabilities exist only on a particular OS or only when a specific function is called. 実際のriskは、そのpackageがproduction dependencyかdevDependencyか、direct dependencyかtransitive dependencyかでも変わる。

npm also calculates “meta-vulnerabilities.” A package can be considered vulnerable because it depends on another package version that is vulnerable. だから数字の「3」が、three independent front doors for attackersを意味するとは限らない。

The useful next step is to inspect the findings, not stare at the count. With `npm audit --json`, look for **which package, which dependency path, what condition triggers the issue, and whether a patched version exists**. 「3」はinvestigation start buttonであって、final diagnosisではない。

[npm Docs: About audit reports](https://docs.npmjs.com/about-audit-reports/) / [npm Docs: Auditing package dependencies](https://docs.npmjs.com/auditing-package-dependencies-for-security-vulnerabilities/) / [npm Docs: npm audit - meta-vulnerabilities](https://docs.npmjs.com/cli/v11/commands/npm-audit/)

---

## Dependencies mean a lot of code you did not personally write enters the house

This was the strangest part for me.

You may write ten thousand lines of application code yourself, while npm installs dozens or hundreds of packages around it. さらにpackage Aがpackage Bを使い、BがCを使う。The dependency tree keeps growing.

It is like buying one chair and discovering that the delivery company, screw supplier, glue maker, and timber supplier are all part of the supply chain.

`npm audit` examines that wider dependency tree. So “I did not write suspicious JavaScript” does not guarantee zero findings. 逆に、audit warningが出たからといって、自分のcodeにdirect bugが3個あるわけでもない。

Once I understood that, `high severity 3件` looked different. It felt less like three fire alarms and more like **three component model numbers on a list marked “inspect with high priority.”**

[npm Docs: npm audit](https://docs.npmjs.com/cli/v11/commands/npm-audit/)

---

## CSP controls browser behavior, not the dependency tree

So what does CSP do?

CSP, Content Security Policy, tells the browser where scripts, stylesheets, images, iframes, and other resources may come from. It is an additional defense against attacks such as XSS: even if malicious markup is injected, CSP can make script execution much harder.

`default-src 'none'` is a very restrictive starting point. 明示していないresource typeは原則loadさせない。その上で `script-src 'self'` allows JavaScript from the same origin, and `style-src 'self'` allows stylesheets from the same origin.

Using the house metaphor, npm audit checks the model numbers of building materials. CSP writes the indoor rules: “only this entrance may be used,” “only approved local scripts may enter.” だからdependency riskが残っていても、browser-side restrictions can still be good.

But there is an important terminology caveat. Google’s web.dev and OWASP use **Strict CSP** mainly for nonce- or hash-based policies. `script-src 'self'` is a restrictive allowlist, but it is not the same thing as modern nonce/hash-based “Strict CSP.” 元文の「かなり強い」はreasonable shorthand; 「これで最高水準、安心」と読むのはtoo strong.

[MDN: CSP default-src](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/default-src) / [MDN: CSP script-src](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/script-src) / [web.dev: Mitigate XSS with a strict CSP](https://web.dev/articles/strict-csp) / [OWASP: Content Security Policy Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html)

---

## “Frames are blocked” actually has two directions

This was the point where security vocabulary became almost comically precise.

CSP has both `frame-src` and `frame-ancestors`. 名前が似ているが、the arrows point in opposite directions. `frame-src` controls **which iframe sources this page may load**. `frame-ancestors` controls **which parent pages may embed this page**.

The extra trap: `default-src 'none'` can serve as a fallback for `frame-src`, but it does **not** serve as a fallback for `frame-ancestors`. MDN explicitly notes that even with `default-src 'none'`, another site may still embed your page unless `frame-ancestors` is separately restricted.

So the phrase 「frame禁止」is slightly underspecified. If the policy includes `frame-ancestors 'none'`, that blocks other sites from embedding the page and helps against clickjacking. でも `default-src 'none'` だけを見て “nobody can frame me” と判断すると、directionを取り違える。

Tiny distinction. Big effect. セキュリティ文書はこういう“same word, opposite arrow”を普通の顔で置いてくる。

[MDN: frame-src](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/frame-src) / [MDN: frame-ancestors](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/frame-ancestors)

---

## `no-store` was not even part of CSP

Then there is `no-store`.

At first I mentally filed it under “another CSP move.” It is not. 通常ここでいう `no-store` は `Cache-Control: no-store`, an HTTP caching directive telling caches not to store the response.

CSP asks, “what may this page load or execute?” `no-store` asks, “may this response be kept for reuse later?” ログイン後など、sensitive responseをcacheへ残したくない場面で意味を持つ。

So the original sentence quietly placed dependency auditing, browser execution restrictions, iframe rules, and cache policy in one row. They are all security-related, but **they belong to different departments**.

Once separated, the logic becomes much easier. 「CSPとno-storeがあるからnpm vulnerabilityは無視できる」でもないし、“npm audit is red, therefore CSP is useless”でもない。Different controls reduce different classes of failure.

[MDN: Cache-Control no-store](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cache-Control)

---

## Experiment: four houses make the layers visible

Imagine four extreme houses.

- **House A: npm audit = zero, no CSP.** Known dependency issues are not currently reported, but if some other HTML injection or XSS bug exists, there is little browser-side containment.
- **House B: High findings in npm audit, strong CSP.** Browser behavior is constrained, but known dependency risks still need investigation.
- **House C: only `no-store` is strong.** Responses are less likely to remain in caches, but that does not answer script execution or dependency vulnerability questions.
- **House D: dependencies audited, CSP configured, and `no-store` used where appropriate.** 複数layerで事故を減らす、defense in depthに近づく。

House D is still not invincible. web.dev explicitly says CSP is an added XSS defense, not a replacement for sanitizing input or fixing XSS vulnerabilities themselves.

Security seems less like “find the one strongest wall” and more like “put different walls in front of different failure modes.”

[web.dev: Security headers quick reference](https://web.dev/articles/security-headers) / [web.dev: Strict CSP](https://web.dev/articles/strict-csp)

---

## Why put dependency auditing in “Phase 0”?

“Phase 0” is not an npm standard term. It is project language for “work we do before the main work begins.”

Refactoring, in Martin Fowler’s definition, improves internal software structure while preserving observable behavior. 外から見える動作を変えずに、under the hoodを理解・変更しやすくする。

If three high-severity dependency findings are already visible, it makes sense to identify them first. Is there a patched version? Does the fix require a major version upgrade? Is the vulnerable path used in production? 特定条件だけで成立するのか。If you begin a large restructure before answering these questions, existing security risk and refactor-induced failures can become harder to separate.

Phase 0 does not necessarily mean “fix everything immediately.” It means **identify the three findings, understand impact, and decide the remediation and its side effects**. Some cases can be solved with a compatible update; others may involve a SemVer-major change. `npm audit fix --force` can permit larger changes, so it is not a button to press blindly.

So “put it in Phase 0” is less like “stop development, emergency!” and more like checking electricity, gas, and structural warnings before renovating the house.

[Martin Fowler: Definition of Refactoring](https://martinfowler.com/bliki/DefinitionOfRefactoring.html) / [npm Docs: Auditing package dependencies](https://docs.npmjs.com/auditing-package-dependencies-for-security-vulnerabilities/) / [npm Docs: npm audit](https://docs.npmjs.com/cli/v11/commands/npm-audit/)

---

## Translating the original sentence into normal language

After all that, the original statement becomes much simpler.

**“The app has fairly restrictive browser-side defenses. At the same time, the external packages it depends on include three known high-priority security findings. That does not prove the live app is immediately exploitable, but before a major refactor we should identify those three findings, understand whether they affect us, and decide how to remediate them.”**

これなら分かる。

At first, `high severity 3件` and “strong CSP” looked like one traffic light showing red and green at the same time. 実際にはsignalが2台あった。One watched dependencies; one watched browser execution. And a cache-control officer was standing next to them.

The hardest part of security prose may not be the danger itself. It may be that many different controls are bundled into the single word **security**. 調べる前は「結局、安全なのか？」と聞きたかった。After researching, the better first question changed.

**“Which layer, and which risk, are we talking about?”**

Once you can ask that, the red words `high severity` become something you can investigate instead of something you can only fear.

---

## Sources / 参考資料

- [npm Docs — npm ci](https://docs.npmjs.com/cli/v11/commands/npm-ci/)
- [npm Docs — npm audit](https://docs.npmjs.com/cli/v11/commands/npm-audit/)
- [npm Docs — About audit reports](https://docs.npmjs.com/about-audit-reports/)
- [npm Docs — Auditing package dependencies for security vulnerabilities](https://docs.npmjs.com/auditing-package-dependencies-for-security-vulnerabilities/)
- [MDN — Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP)
- [MDN — default-src](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/default-src)
- [MDN — frame-src](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/frame-src)
- [MDN — frame-ancestors](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/frame-ancestors)
- [MDN — Cache-Control](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cache-Control)
- [web.dev — Mitigate XSS with a strict CSP](https://web.dev/articles/strict-csp)
- [OWASP — Content Security Policy Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html)
- [GitHub Docs — Continuous integration](https://docs.github.com/en/actions/get-started/continuous-integration)
- [Martin Fowler — Definition of Refactoring](https://martinfowler.com/bliki/DefinitionOfRefactoring.html)
