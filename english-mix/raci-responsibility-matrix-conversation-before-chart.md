---
id: raci-responsibility-matrix-conversation-before-chart
title: "RACIは「Who does it?」だけの表ではない"
subtitle: "四つのlettersで、responsibility ambiguityを机の上に出す"
created: "2026-09-27"
updated: "2026-09-27"
type: "リサーチエッセイ"
status: "完成"
tags: ["RACI", "project management", "responsibility", "organization design", "decision making"]
keywords: ["RACI", "responsibility assignment matrix", "RAM", "linear responsibility chart", "DACI", "RAPID"]
grow: 5
abstract: "RACIはResponsible、Accountable、Consulted、Informedの四つで、workとrolesの関係を整理するresponsibility matrixである。ただし本質はtable fillingではなく、who does the work, who owns the outcome, whose input is needed, and who needs to knowを合意することにある。1960年代のLinear Responsibility Chartまで遡れるhistory、四文字の意味、作り方、典型的なfailure、criticism、DACIやRAPIDなどのnearby frameworksまで整理する。"
---

# RACIは「Who does it?」だけの表ではない
## 四つのlettersで、responsibility ambiguityを机の上に出す

会議で“What exactly do you own?”と聞いた瞬間、全員が微妙に別の方向を見ることがある。担当者はいる。しかしfinal approverが分からない。Inputをもらうべき人は多い。しかしwhen consultation endsが分からない。しかも、あとで“I wasn't informed”と言う人までいる。

この、組織のどこにでも生えるthin fogを、たったfour lettersで切ろうとするのがRACIである。文字だけ見ると妙に強そうだが、やっていることは地味だ。Workを縦に、rolesを横に並べ、“do the work”“own the outcome”“give input”“stay informed”を置いていく。

![RACIの例。タスクごとにResponsible、Accountable、Consulted、Informedを割り当てている。](https://cerri.com/blog/project-team-roles-responsibilities/figure-3-raci.png)

*図1：典型的なRACI matrixの例。Work and rolesを交差させ、type of involvementをfour lettersで可視化する。画像出典：[Cerri「Project team roles & responsibilities」](https://cerri.com/blog/project-team-roles-responsibilities)。*

だが、調べていくと少し妙なことが分かる。これほどwidely usedなtoolなのに、“Who invented RACI?”にはclear answerがない。一方、そのancestorにあたるLinear Responsibility Chartは、1960年代のproject-management literatureまでかなり明瞭にたどれる。RACIは、one geniusの発明というより、**complex workでresponsibilityが霧散するのを防ぐため、practiceの中で徐々に研がれたnotation**と見たほうがよい。

本稿では、RACIをfour-letter mnemonicとしてではなく、“turn ambiguity into a discussable object”なtoolとして捉える。すると、when it helpsとwhen it hurtsの境目まで見えてくる。

> **Information date: 2026-09-27**
>
> RACIのoriginにはsingle confirmed inventorを置きにくい。本稿は、確認できるLinear Responsibility Chartのliterature、current project-management definitions、practical criticismを分けて記述する。

## 1. そもそもRACIはorg chartではなく、workごとのinvolvementを決めるmatrixである

RACIはResponsibility Assignment Matrix（RAM）の代表的な型である。Project Management Institute（PMI）のlexiconは、RACIを“a type of responsibility assignment matrix”として、Responsible、Accountable、Consulted、Informedでstakeholder involvementを定義するものとする。つまり、hierarchyを描くorg chartではない。**For a specific activity, who is involved and how?**を描く。

この違いは小さいようで大きい。部長だからeverythingでAccountableになるわけではないし、担当者だからall tasksでResponsibleになるわけでもない。たとえば“event concept”“web announcement”“on-site operation”“post-event report”は、same projectでもrole assignmentが変わる。RACIは人へstatus labelを貼るのではなく、workごとにrelationshipを切り直す。

縦軸には、できれば“PR”や“Sales”のようなhuge domainではなく、deliverableやdecision boundaryが見えるactivityを置く。“announce”より“finalize announcement copy”、“prepare”より“approve venue flow”のほうがよい。横軸にはpersonal namesよりrolesを置くことが多い。People changeでもstructureをreuseしやすいからである。

したがって、RACIが解くfirst problemは“who is senior?”ではない。**Do we share the same understanding of the type of involvement needed to move the work?**である。この時点でRACIはstaffing tableより、conversation grammarに近くなる。

[PMI「PMI Lexicon of Project Management Terms」](https://www.pmi.org/-/media/pmi/documents/registered/pdf/pmbok-standards/pmi-lexicon-pm-terms.pdf?rev=447328d841c249af985d14177ddd5f95) ／ [NASA「Reference Guide for Project Control Account Managers」](https://www.nasa.gov/wp-content/uploads/2018/06/nasa-reference-guide-for-project-cams.pdf)

## 2. R、A、C、Iは似ているようで、workのtime axisが違う

四文字を日本語にすると、Responsibleは“実行担当”、Accountableは“最終責任”、Consultedは“相談先”、Informedは“報告先”などになる。ただし、日本語の「責任」という一語にResponsibleとAccountableを押し込むと、最初から少し事故が起きる。ここはtranslationよりfunctionで覚えたほうが早い。

- **R = Responsible（実行担当）**：the doer。実際に手を動かしてworkをcompleteする人。More than oneでもよい。
- **A = Accountable（最終責任者）**：the person ultimately answerable for the outcome。必要ならapprove or rejectする。Classic RACI practiceではone per activityに絞る。
- **C = Consulted（相談先）**：input is sought before action or decision。Communication is two-way.
- **I = Informed（報告先）**：progress or outcomeを知る必要がある人。Communication is mainly one-way.

たとえば“publish an event announcement page”を考える。Web editorがcopy and pageを作るならR、施策全体を持ちgo/no-goを最終判断するresponsible leadがA、ticketingやlegalやon-site operationsがpre-checkするならC、公開後に知ればよいsalesやcustomer-supportがI、といった具合である。もちろんreal organizationでは兼務もあり、same personにA and Rが付くこともある。

ここで大事なのは、Aを“highest-ranking person”と考えないことである。A is not rank; it is where the buck stops for that row。またmore C does not mean more careful。Consultedを十人置けば、そのten consultationsがprocessになる。Iも同じで、more recipients means more communication design.

Four letters are not mere categories. RACIを一行埋めるたびに、“do”“decide/own”“give input”“know”という**four kinds of time and communication**をdesignしている。この見方を持つと、letter countよりworkflow itselfが見えるようになる。

[SIG「Role and Responsibility Charting (RACI)」](https://www.sig.org/srcdocuments/role-and-responsibility-charting-raci/) ／ [PMI「PMI Lexicon of Project Management Terms」](https://www.pmi.org/-/media/pmi/documents/registered/pdf/pmbok-standards/pmi-lexicon-pm-terms.pdf?rev=447328d841c249af985d14177ddd5f95)

## 3. わざと壊してみると、RACIが何をpreventしているか分かる

RACIの意味をつかむには、clean final matrixを見るより、extreme broken matrixを想像したほうが早い。たとえば、あるimportant launchでeveryoneをCにしてみる。Everybody gets a voice。民主的でsafeそうに見える。しかしno one does the work and no one makes the final call。会議だけが非常によくできたprojectになる。

反対に、everyoneをRにしてみる。今度は全員が“I’m doing it”と思う。Duplicate work、overwrite、missed checksが起きやすい。Aをthree people置けば、three peopleともfinal authorityを持つつもりになり、実際にはthree veto pointsが生まれる。Iをzeroにすればworkは速く見えるが、周辺部署が突然resultだけを受け取る。

さらに厄介なのが、tableではone Aなのに、actual approval authorityは別の人が握っている場合である。Paper上ではclearでも、real power structureが違えば、RACIはambiguityを解消するどころかhideしてしまう。RACI is not magic that makes organizations true; **it is a mirror that asks how the organization really moves**.

この“break it on purpose”実験から分かるのは、good RACIの条件がfour lettersを均等に配ることではないということだ。Blank cells are fine。大切なのは、no R、multiple A、too many C、I everywhereといったanomaliesを見つけ、その理由をtalk throughすることである。

そして、このconversationこそがRACIの意外な主役である。1971年のtraining materialには、Linear Responsibility Chartについて、finished chart以上にthe process of creating itが重要だという趣旨の記述がある。Half a century agoから、table itselfより、tableを作るときに露出するdisagreementのほうが価値だったのである。

[ERIC「Responsibility Assignment / Linear Responsibility Chart」](https://files.eric.ed.gov/fulltext/ED052155.pdf) ／ [SIG「Role and Responsibility Charting (RACI)」](https://www.sig.org/srcdocuments/role-and-responsibility-charting-raci/)

## 4. 作り方は“list people”より先に、“what deserves a row?”を決める

実務でRACIを作るとき、最初にpeopleを並べたくなる。しかし先に決めるべきなのはrow granularityである。Workがtoo broadだと、same rowにplanning、decision、production、review、executionが混ざり、結局almost everyoneにsome letterが付く。逆にtoo detailedだと、maintaining the matrix itselfがone jobになる。

作成順は、次のようにすると扱いやすい。

- まず、deliverables or critical activitiesを列挙する。“plan”ではなく“finalize concept”“approve budget”“publish announcement”のように、definition of doneが見える単位へ寄せる。
- 次に、involved rolesを横に並べる。Personal namesではなく“project lead”“producer”“legal”“sales”など、roleとして置く。
- 各行で、first choose one A。Who ultimately owns the outcomeを先に置くと、その後のRやCが決めやすい。
- Rを置く。Who actually drives the work to completionかを確認する。
- CとIをminimum necessaryで置く。Cは“quality or legitimacy drops without their input”、Iは“cannot do the next job without knowing the result”と考える。
- 最後にrow and column auditをする。A/R gapsだけでなく、一人の列へRやAが集中しすぎていないかも見る。

この最後の“read vertically”が地味に効く。Row auditはresponsibility gapsを探すが、column auditはworkload concentrationを探す。一人にAが十五個並んでいれば、その人がexcellentというより、approval bottleneckになっている可能性がある。逆に、あるroleがalmost all Iなら、その人をevery meetingへ呼ぶ必要があるのか再考できる。

つまりRACIは、完成したあとに眺めるdocumentではない。**While building it, inspect work granularity, authority, meetings, information flow, and load together.** きれいなcolor codingより、hard-to-fill cellを見つけたときのほうがvalueが高い。

[NASA「Reference Guide for Project Control Account Managers」](https://www.nasa.gov/wp-content/uploads/2018/06/nasa-reference-guide-for-project-cams.pdf) ／ [SIG「Role and Responsibility Charting (RACI)」](https://www.sig.org/srcdocuments/role-and-responsibility-charting-raci/)

## 5. Historyをたどると、RACIのancestorはmatrix organizationの摩擦にいた

RACIのbackgroundには、workがone departmentだけで完結しなくなった時代のproblemがある。Projectsでは、functional hierarchyのvertical commandと、project across functionsのhorizontal flowが交差する。Who can ask whom? Who approves? Does authority sit with the project manager or the functional manager? Organizationがmatrix化すると、responsibility linesも一本では済まなくなる。

PMIが1999年にまとめたearly project-management literatureのreviewによると、1964年にはJohn F. Meeがorganizational conceptとして“matrix”を用い、1967年にはDavid I. ClelandとWilliam R. Munseyが“Who Works with Whom”でLinear Responsibility Chartを用いてauthority and responsibilityを整理した。1968年のClelandとWilliam R. KingのbookにもLinear Responsibility Chartが現れる。

当時のchartは、modern RACIそのものではない。1971年のmaterialに転載されたexampleでは、“supervise”“actual responsibility”“approval required”“must be consulted”“must be notified”など、todayより多いcodesが並ぶ。だが、activities on one axis、people or organizations on the other、intersectionにtype of involvementを書くというgeometryは、すでに同じである。

その後、Responsibility Assignment Matrix（RAM）というgeneral categoryの中で、RACIは代表的notationとして定着した。Current PMI lexiconもRACIをRAMの一種として扱う。2005年にMichael L. SmithとJames Erwinがまとめた“Role & Responsibility Charting (RACI)”は、today’s familiar four rolesを明瞭に示している。ただし、これをRACIの“founding paper”とみなす根拠はない。

ここで見え方が少し変わる。RACIは、four memorable lettersとして突然現れたmanagement trickではない。**It belongs to a lineage born when org charts stopped being enough to explain who works with whom.** だからmodern cross-functional projectsでいまだに使われるのも、それほど不思議ではない。

[PMI「They wrote the book: the early literature of modern project management」](https://www.pmi.org/learning/library/early-literature-modern-project-management-3542) ／ [ERIC「Responsibility Assignment / Linear Responsibility Chart」](https://files.eric.ed.gov/fulltext/ED052155.pdf) ／ [SIG「Role and Responsibility Charting (RACI)」](https://www.sig.org/srcdocuments/role-and-responsibility-charting-raci/)

## 6. RACIへのlargest criticismは、work responsibilityとdecision authorityを混ぜやすいことにある

RACIはusefulだが、universalではない。とくに危ないのは、“Aがいるからdecision makerもclearだろう”と思うことである。Accountableをfinal approverとして運用することは多いが、RACIはそもそもactivities and deliverablesへのinvolvementを整理するframeworkであり、complex decisionsのprocessを細かく記述するためだけに作られたものではない。

McKinseyはRACIのlimitsとして、who actually decidesがunclearになり得ること、stakeholder orchestrationを“who, when, what kind of input”までdesignしにくいことなどを挙げている。RACIをdecision makingへそのまま持ち込むと、Responsible、Accountable、Consultedの全員がde facto vote or vetoを持つように振る舞い、かえってslowerになる場合がある。

もう一つのweaknessは、static tableであることだ。RACIはdeadlines、sequence、dependencies、skills、effort、budget、psychological safety、relationshipsまでは表さない。Tableを作った日にcorrectでも、role changesやreorg、project progressでrealityが変わればstaleになる。“We made a RACI”はresponsibility design完了のcertificateではない。

さらに、one A ruleもreal governanceと衝突することがある。Legal approvalとbudget approvalが制度上separateなら、一つのrowへ無理に押し込むより、workを“legal approval”“budget approval”“final publish decision”へ分けたほうがよい。Do not distort reality to obey the rule; **use the reason the rule fails to rethink the structure of work**.

したがって、RACIのfailureは“the table is wrong”だけではない。Tableをrealityより上位に置いたときに起きる。RACI is a map, not the territory。Role ambiguityには強いが、decision process、schedule、resources、relationshipsをone sheetで表そうとすると、急に無理が出る。

[McKinsey & Company「The limits of RACI—and a better way to make decisions」](https://www.mckinsey.com/capabilities/people-and-organization/our-insights/the-organization-blog/the-limits-of-raci-and-a-better-way-to-make-decisions) ／ [PMI「PMI Lexicon of Project Management Terms」](https://www.pmi.org/-/media/pmi/documents/registered/pdf/pmbok-standards/pmi-lexicon-pm-terms.pdf?rev=447328d841c249af985d14177ddd5f95)

## 7. DACI、RAPID、RASCIはRACIのupgradeではなく、different ambiguityを解く

RACIのrelativesは多い。Acronymsが増えると、急にconsulting deckの森になる。しかし、一段abstractに見ると整理できる。違いは、**what ambiguity are you trying to remove?**である。

- **RAM（Responsibility Assignment Matrix）**：RACIを含むumbrella concept。Workとrolesのrelationshipを表す。
- **RASCI**：RACIにSupportを加える。Responsibleとactive supportを分けたいときに使う。
- **DACI**：Driver、Approver、Contributors、Informed。Atlassianはdecision-making frameworkとして紹介している。RACIより“who drives the decision forward?”が前面に出る。
- **RAPID**：Recommend、Agree、Perform、Input、Decide。Bain & Companyがdecision rolesの整理に用いるframeworkで、とくに“who has the D?”、つまりfinal decision rightを明示する。
- **MOCHA**：Manager、Owner、Consulted、Helper、Approver。Delegationやnonprofit managementのcontextで使われ、OwnerとManager、Helperを分ける点が特徴である。

たとえば“monthly recurring production processのresponsibilityが曖昧”ならRACIがnaturalである。一方、“Should we launch the new service, and who makes the final call?”で揉めているならDACIやRAPIDのほうが論点へdirectly届くことがある。Many supporting handsがいる現場ならRASCIが見やすい場合もある。

つまりframework selectionはbrand selectionではない。Work ambiguityなのか、decision-right ambiguityなのか、support relationship ambiguityなのかを先に見る。**A framework is a lens, not an answer.** More acronymsより先に、what is blurryを決めるほうが先だ。

[Atlassian「DACI: A Decision-Making Framework」](https://www.atlassian.com/team-playbook/plays/daci) ／ [Bain & Company「Decision Insights: Set up your most important decisions for success」](https://media.bain.com/Images/DECISION%20INSIGHTS_Compendium_Issues1-5.pdf) ／ [Bridgespan「Effective Delegation in Three Simple Steps」](https://www.bridgespan.org/insights/effective-delegation-in-three-simple-steps)

## 8. Four lettersの価値は、four lettersでは済まない話を始められることにある

最初のmeetingへ戻る。“Who owns this?”と聞いたとき、everyone looks elsewhere。RACIは、そのawkward few secondsをなくすためのtableに見える。だが、実際には逆かもしれない。Remove discomfortではなく、**have the uncomfortable conversation earlier, on purpose**のためのtoolなのである。

“Why are there two A's?” “Does this C really need to be consulted before action?” “If R spans three departments, should we split the deliverable?” “This person only needs I, so why are they in every weekly meeting?” こうしたquestionsは、matrix completion上は面倒である。しかし、そのfrictionを飛ばすと、execution stageでdelay、duplicate work、reworkとして戻ってくる。

調べる前は、RACIは“a table showing who does what”だと思っていた。調べたあとでは、それだけでは少し足りない。Historical Linear Responsibility Chartからcurrent RACIまで一貫しているのは、workをfour lettersへcompressすることより、**expose assumptions about authority and responsibility**である。

だからbest RACIは、densely filled and beautifulなtableとは限らない。むしろblank or conflicting cellsを見つけ、“we never actually decided this”と言えるmatrixのほうが役に立つ。The finished matrix is a deliverable, but the conversation that produced it is often the real product.

RACIが便利なのは、four lettersで済むからではない。**Trying to place four letters reveals the organizational reality that cannot be reduced to four letters.** そこまで見えたとき、RACIはmanagement spreadsheetから、organizationをobserveするtoolへ変わる。

[PMI「They wrote the book: the early literature of modern project management」](https://www.pmi.org/learning/library/early-literature-modern-project-management-3542) ／ [ERIC「Responsibility Assignment / Linear Responsibility Chart」](https://files.eric.ed.gov/fulltext/ED052155.pdf) ／ [McKinsey & Company「The limits of RACI—and a better way to make decisions」](https://www.mckinsey.com/capabilities/people-and-organization/our-insights/the-organization-blog/the-limits-of-raci-and-a-better-way-to-make-decisions)
