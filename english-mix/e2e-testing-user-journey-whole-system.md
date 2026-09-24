---
id: e2e-testing-user-journey-whole-system
title: "E2E testingは、partsではなく「最後まで使える」を確かめる"
subtitle: "My Essaysを調べたら、already a browser was pretending to be human"
created: "2026-09-24"
updated: "2026-09-24"
type: "Research Essay / English Mix"
status: "完成"
tags: ["software testing", "E2E testing", "Web development", "quality assurance", "Playwright", "My Essays"]
keywords: ["E2E testing", "end-to-end testing", "browser testing", "Playwright", "Cypress", "test pyramid", "My Essays"]
grow: 5
abstract: "E2E testingは、each partが正しいかではなく、a user's journeyがsystemをまたいで最後まで成立するかを確かめる。My Essaysの実装を調べると、すでにPlaywrightでChromiumを動かし、日本語記事を開いてEnglish Mixへ切り替えるbrowser QAが組み込まれていた。自分のcodeを材料に、E2Eのstrength, limits, system boundary, and what to automateを考える。"
---

# E2E testingは、partsではなく「最後まで使える」を確かめる
## My Essaysを調べたら、already a browser was pretending to be human

<!-- level:4 role:claim -->
I started with a simple question: "What is E2E testing?" そしてMy Essaysのrepositoryを開いた。するとdefinitionを読むより先に、答えがcodeの中にいた。Playwright launches Chromium, opens an essay, checks the page, and switches the reading mode. E2Eを知らないつもりで、I was already doing something very close to it.

<!-- level:2 role:description -->
GitHub Actionsの「Visual QA」は、local web serverを起動し、PlaywrightとChromiumを用意してbrowser QAを走らせる。`scripts/visual-qa.mjs` はdesktopとmobile相当のviewportで記事を開き、content visibility, Reading Mode switching, horizontal overflow, browser errorsを確認し、screenshotsも保存する。

<!-- level:1 role:evidence -->
同じrepositoryには `tests/data-integrity.test.js` があり、article files, IDs, indexes, derived versionsの整合性を確かめる。`tests/reader-navigation.test.js` は簡易DOM環境でrelated navigationを確認する。All are tests, but they exercise different distances from real user behavior.

<!-- level:3 role:analysis -->
Put them side by side and the idea becomes clear. A file can be correct. A function can be correct. A component can be correct. それでも「open → read → switch」が壊れることはある。E2E testing checks not only parts, but the glue between parts.

<!-- level:5 role:implication -->
So E2E is not "test everything in detail." **It checks whether a meaningful user journey survives from one end of the system to the other.** 名前は大きい。でも実際には、browserに人間のふりをさせて、いつもの道を歩かせる。

<!-- level:1 role:source -->
[My Essays Visual QA workflow](https://github.com/silovar-uk/myessays/blob/main/.github/workflows/visual-qa.yml) ／ [My Essays visual-qa.mjs](https://github.com/silovar-uk/myessays/blob/main/scripts/visual-qa.mjs) ／ [data-integrity.test.js](https://github.com/silovar-uk/myessays/blob/main/tests/data-integrity.test.js) ／ [reader-navigation.test.js](https://github.com/silovar-uk/myessays/blob/main/tests/reader-navigation.test.js)

> **Information cutoff: September 24, 2026**
>
> Here, "E2E-like" means a real browser exercises the main HTML, JavaScript, content data, rendering, and interaction path inside the My Essays app boundary. It does not mean the test always exercises the public GitHub Pages delivery network itself. This essay confirms the configured test behavior, not the result of one specific latest run.

## 1. E2E checks a journey, not each part

<!-- level:4 role:claim -->
The core idea is user-visible behavior. E2E asks: can a person complete the flow?

<!-- level:2 role:description -->
Cypress documentation describes E2E testing as exercising an application through a real browser, often across backend and integrations. Playwright's best practices also emphasize testing what users can see and do, instead of relying on implementation details.

<!-- level:1 role:evidence -->
"Search function was called" is an internal fact. "Type a keyword, see results, open one, and read it" is a user journey. If the test then changes from Japanese to English Mix and confirms the new content, multiple systems must cooperate correctly.

<!-- level:3 role:analysis -->
That does not make E2E "better" than unit tests. Unit tests are fast and precise for small behavior. E2E gives wider confidence. Different tests answer different questions.

<!-- level:5 role:implication -->
Correct parts do not automatically create a correct experience. Routes, loading, state, rendering, and data mapping can fail in the gaps. **E2E is a test of those gaps becoming one path.**

<!-- level:1 role:source -->
[Cypress Documentation, Testing Types](https://docs.cypress.io/app/core-concepts/testing-types) ／ [Playwright Documentation, Best Practices](https://playwright.dev/docs/best-practices)

## 2. "End" depends on where you draw the system boundary

<!-- level:4 role:claim -->
"End-to-end" sounds like everything must be real: database, network, external services, production. Not necessarily. The ends depend on your system boundary.

<!-- level:2 role:description -->
Martin Fowler describes broad-stack testing as a continuum. Remote systems can be replaced with test doubles when that boundary makes sense. "Close to reality" does not mean "make the whole internet part of every test."

<!-- level:1 role:evidence -->
My Essays browser QA uses a local web server rather than the public GitHub Pages URL. It still exercises HTML, JavaScript, essay data, rendering, and interaction in a real browser. The delivery network is outside this particular test boundary.

<!-- level:3 role:analysis -->
This boundary is not cheating. It is a design decision: what are we trying to prove, and which dependencies would add noise rather than useful confidence?

<!-- level:5 role:implication -->
The "ends" in E2E are really responsibility boundaries. Before testing end to end, you first have to define what counts as an end.

<!-- level:1 role:source -->
[Martin Fowler, Broad Stack Test](https://martinfowler.com/bliki/BroadStackTest.html)

## 3. More realistic means more confidence—and more cost

<!-- level:4 role:claim -->
E2E has a strange trade-off. The closer a test gets to real usage, the more reassuring it can be. But if every test becomes E2E, the test suite becomes harder to live with.

<!-- level:2 role:description -->
The test pyramid keeps many small, fast tests lower down and fewer broad, high-level tests near the top. High-level UI tests tend to be slower and more expensive to maintain. Playwright also recommends isolated tests and stable, user-facing locators.

<!-- level:1 role:evidence -->
When an E2E test fails, it can tell you, "the user's road is broken." It may not immediately tell you whether the cause is data, routing, rendering, state, timing, or something else. A smaller test often localizes the problem faster.

<!-- level:3 role:analysis -->
There is also flakiness: a test can sometimes pass and sometimes fail without a meaningful product change. Google Testing Blog notes that instability can come from the test, framework, system under test, dependencies, or environment.

<!-- level:5 role:implication -->
Small tests help diagnosis. E2E provides integrated confidence. **Diagnosis and confidence are different jobs.** A healthy test strategy needs both.

<!-- level:1 role:source -->
[Martin Fowler, The Practical Test Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html) ／ [Playwright Documentation, Best Practices](https://playwright.dev/docs/best-practices) ／ [Google Testing Blog, Test Flakiness](https://testing.googleblog.com/2020/12/test-flakiness-one-of-main-challenges.html)

## 4. A passing E2E test does not prove good UX

<!-- level:4 role:claim -->
The browser reached the end. No errors. Does that mean the site is easy to use? No.

<!-- level:2 role:description -->
My Essays browser QA can check content visibility, mode switching, overflow, and browser errors. Useful. But it cannot automatically prove that a first-time reader understands the controls, finds the right article quickly, or feels comfortable reading the page.

<!-- level:1 role:evidence -->
A button can have a terrible label and still be clickable by an automated test that already knows its locator. The robot knows the road. A human may not even see the sign.

<!-- level:3 role:analysis -->
So "tests passed" cannot be expanded into "quality is solved." Visual checks, accessibility checks, exploratory testing, and usability observation answer different questions.

<!-- level:5 role:implication -->
E2E is not a robot that has become human. It is a robot that can faithfully replay human actions. That distinction is exactly why it is powerful—and limited.

## 5. For My Essays, the next useful E2E could start one step earlier

<!-- level:4 role:claim -->
This section is a proposal, not a fact. The inspected `visual-qa.mjs` starts from a direct essay URL. A useful next journey could start from discovery.

<!-- level:2 role:description -->
Open the library → type a search term → see the target essay → click it → confirm the article is readable → switch from Japanese to English Mix. One path, one meaningful goal.

<!-- level:1 role:evidence -->
The existing browser QA already covers important behavior after an essay is open. So adding dozens of new browser tests may create more maintenance than confidence. One missing entry path can expand coverage without duplicating everything.

<!-- level:3 role:analysis -->
Do not E2E every button. Pick critical journeys. For an essay library, "find it," "open it," "read it," and "switch the view" are closer to user goals than a list of implementation features.

<!-- level:5 role:implication -->
An E2E test case is almost a product sentence: "What did the user come here to accomplish?" Testing can become a way to clarify the service itself.

## 6. After researching it, E2E looks smaller—and more important

<!-- level:4 role:claim -->
Before this, E2E sounded like a giant technical ritual: inspect the whole system from one end to the other.

<!-- level:2 role:description -->
In the actual My Essays code, it looked much more ordinary. Open a browser. See an article. Click a control. Wait for the content to change. Check the screen. It is a small chain of human-like actions.

<!-- level:3 role:analysis -->
But the meaning of that chain is large. Users do not experience files and functions separately. When the connection breaks, they simply experience "it doesn't work." E2E observes the system from that side.

<!-- level:5 role:implication -->
Before researching, I almost thought "E2E = test everything." After researching, I would say the opposite: **E2E means choosing one important user journey and walking it all the way through.**

<!-- level:4 role:claim -->
And the strangest part of this research was finding that, while asking "what is E2E?", a browser was already walking around inside my own project.

<!-- level:5 role:implication -->
Software quality is not the sum of correct parts. It also includes whether a person can safely cross the spaces between them. E2E testing puts a test runner in those spaces.

---

### Main sources

- [Cypress Documentation, Testing Types](https://docs.cypress.io/app/core-concepts/testing-types)
- [Playwright Documentation, Best Practices](https://playwright.dev/docs/best-practices)
- [Martin Fowler, Broad Stack Test](https://martinfowler.com/bliki/BroadStackTest.html)
- [Martin Fowler, The Practical Test Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html)
- [Google Testing Blog, Test Flakiness](https://testing.googleblog.com/2020/12/test-flakiness-one-of-main-challenges.html)
- [My Essays Visual QA workflow](https://github.com/silovar-uk/myessays/blob/main/.github/workflows/visual-qa.yml)
- [My Essays visual-qa.mjs](https://github.com/silovar-uk/myessays/blob/main/scripts/visual-qa.mjs)
- [My Essays data-integrity.test.js](https://github.com/silovar-uk/myessays/blob/main/tests/data-integrity.test.js)
- [My Essays reader-navigation.test.js](https://github.com/silovar-uk/myessays/blob/main/tests/reader-navigation.test.js)
