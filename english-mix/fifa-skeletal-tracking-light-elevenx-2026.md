---
id: "fifa-skeletal-tracking-light-elevenx-2026"
title: "テレビ中継から選手の骨まで当てる――FIFAのAI大会でElevenXが世界2位になった意味"
subtitle: "A single broadcast camera, a three-dimensional footballer, and the cost of getting it wrong"
created: "2026-10-26"
updated: "2026-10-26"
type: "Essay"
status: "完成"
tags: ["FIFA", "ElevenX", "sports analytics", "computer vision", "English Mix"]
keywords: ["skeletal tracking", "pose estimation", "MPJPE", "WorldPose"]
grow: 5
abstract: "FIFAの骨格追跡技術コンペとElevenXの世界2位発表を、primary sourcesとともにたどる。2025年と2026年を混ぜずに、技術の仕組みと現場導入の距離を考える。"
---

# テレビ中継から選手の骨まで当てる――FIFAのAI大会でElevenXが世界2位になった意味

*English Mix — 日本語を足場に、主要な技術表現を自然な英語で読める版。Research cutoff: October 26, 2026.*

## 守｜サッカー選手は画面に映っているのに、なぜ「骨」を推理するのか

Picture an ordinary football broadcast. We watch the ball, not the exact coordinates of a player's left knee. なのにFIFAが開いたのは、a challenge to recover three-dimensional human poses from televised football. 選手の関節の位置を、moving camera の映像から復元する。It sounds oddly specific. And it is extremely difficult.

ElevenX announced that four of its members took second place worldwide in the FIFA Skeletal Tracking Light Challenge. 福島隆人氏の[2026年の技術寄稿](https://knowledge.sakura.ad.jp/51062/)から開発内容を確認できる。ただし、the final rank is attributed to the team's announcement; a complete, independently verified 2026 final leaderboard was not available in this research. [FIFA challenge](https://inside.fifa.com/innovation/innovation-programme/skeletal-tracking).

## 守｜そもそも骨格追跡とは、身体を点と線のデータに変えることである

Skeletal tracking does not mean X-raying bones. It means estimating keypoints — shoulders, elbows, hips, knees and ankles — and tracking them over time. **2D pose estimation** works in image coordinates, while **3D pose estimation** aims to locate joints in real space.

A player can look identical on screen at two different distances. 同じ2D imageでも、奥行きは自動的に決まらない。Likewise, player tracking tells us *where a player is*; skeletal tracking adds *how their body is arranged*. That difference matters for motion analysis, but pose data alone does not establish why a play happened or whether an injury will occur. [FIFA background](https://inside.fifa.com/innovation/news/limb-tracking-technology-offers-new-array-of-possibilities).

## 守｜大会の正体は「10台以上の専用設備」を「放送カメラ1台」へ近づける実験だった

Traditional high-accuracy optical tracking may require ten or more dedicated stadium cameras. FIFA's 2022 semi-automated offside setup used twelve tracking cameras. This challenge asks whether the main broadcast camera, Camera 1, can support accurate 3D reconstruction. FIFA says that camera accounts for roughly 70% of its tournament broadcast footage. [FIFA official page](https://inside.fifa.com/innovation/innovation-programme/skeletal-tracking).

But **single-camera does not mean zero supporting data**. Participants also receive player boxes, IDs, intrinsic camera parameters and initial external camera parameters. They must estimate later camera movement and global 3D joint positions. これは何もない映像から完全自動で解析する商品が完成した、という話とは異なる。[福島氏の記事](https://knowledge.sakura.ad.jp/51062/)。

![A visual explanation of the single-broadcast-camera pipeline](https://silovar-uk.github.io/myessays/assets/fifa-skeletal-light-pipeline-2026.svg)

*Original explanatory diagram based on FIFA and the team's published technical description.*

## 守｜FIFAは何を配り、何を隠して競わせたのか

The second edition opened on December 8, 2025, with an April 30, 2026 submission deadline. It used 2022 World Cup footage and the WorldPose research dataset, prepared with ETH Zürich. Ground-truth poses came from 16–18 static cameras, while contestants attempted to recover comparable information from broadcast footage. The paradox is beautiful: **many cameras create the answer key for testing a one-camera solution**. [Official challenge details](https://inside.fifa.com/innovation/innovation-programme/skeletal-tracking).

The held-out test set makes the contest a benchmark. It asks not merely whether a model can reproduce familiar training examples, but whether it can generalize to unseen footage.

### 大会の賞と別年度の区別

For 2026, the announced prizes were up to four World Cup tickets: final for first, semifinal for second, and quarterfinal for third. これは賞品規定であって、実際の受領記録ではない。[FIFA](https://inside.fifa.com/innovation/innovation-programme/skeletal-tracking)。

In the first edition in 2025, the top published technical write-ups came from Team Tim, Team mil and Team arturxarles. Team mil's report lists Ryuto Fukushima, Tianhan Xu and Tatsuya Harada. That is **not the same team roster** as ElevenX's four-member 2026 entry. 以前の大会と混同してはいけない。[CVPR workshop](https://g3p-workshop.github.io/)／[2025 technical report](https://g3p-workshop.github.io/assets/pdfs/solution-mil.pdf)。

FIFA reported approximately 50 cm global error and 7 cm local error for the best 2025 submission. Those values should not be placed directly beside 2026 scores without checking the evaluation protocol. [FIFA case study](https://inside.fifa.com/innovation/innovation-programme/case-studies).

## 守｜ElevenXの4人は何を開発したのか――「当てるAIを5つ置いて、もう一度間違いを直す」

The 2026 team comprised Ryuto Fukushima, Fangcheng Wang, Kazuto Iwai and Sadao Hirose, according to Fukushima's Japanese report. まず camera calibration により、動く撮影機の位置と向きを推定する。次に複数のpose-estimation models — SAM3D, 4DHumans, KASportsFormer, VideoPose3D and MotionBERT — を15個の関節点という共通形式へ変換する。[Source](https://knowledge.sakura.ad.jp/51062/)。

Their key idea was residual correction. Rather than trusting the raw predictions, the team trained a network to predict systematic errors left behind by the initial models. They corrected **root position**, meaning where the whole player is on the pitch, separately from **local pose**, meaning joint positions relative to the body. Then came an ensemble of several models, with additional tuning for venue and camera conditions.

The important insight is not simply "a better AI." **Different mistakes require different correction strategies.** だからこそ、複数モデルの組み合わせ方までが技術になる。

## 破｜実験してみる。「膝が正しい」と「選手が正しい場所にいる」は別問題だった

Imagine every knee and elbow angle is correct, but the entire reconstructed player is shifted one metre to the right. Local body geometry remains accurate; global location is wrong. In the reverse case, the pelvis may be placed correctly while the knee bends in the wrong direction.

That is why the challenge distinguishes **Global MPJPE**, the mean joint-position error in world coordinates, from **Local MPJPE**, the mean error after alignment around a root joint. 一つの「誤差」に二種類の問題が隠れている。[Evaluation definition](https://inside.fifa.com/innovation/innovation-programme/skeletal-tracking)。

The team's reported public evaluation progressed from a single VideoPose3D score of **0.42138** to **0.41941** with straightforward ensembling, **0.40363** after separate weighting, and **0.38576** with camera/venue adjustments. Lower is better. **0.38576 is a combined score, not the knee's physical error measured directly in metres.** [Reported experiment](https://knowledge.sakura.ad.jp/51062/)。

Here is a useful audit finding: the 2025 Kaggle rules used Global MPJPE + 10 × Local MPJPE, whereas the team's 2026 write-up states Global Error + 5 × Local Error. Changing weights means rankings and scores across years cannot be compared casually. [2025 rules](https://www.kaggle.com/competitions/fifa-skeletal-light)／[2026 report](https://knowledge.sakura.ad.jp/51062/)。

## 破｜「Lenovoにも勝った」と言いたいが、ここは資料を分けて読む

Lenovo is indeed a FIFA technology partner and has announced AI-assisted three-dimensional player avatars for World Cup 2026. Yet being a FIFA partner and being an identified competitor in this specific challenge are different claims. The available sources did not establish Lenovo's entry name or ranking. だから「Lenovoに勝った」は独立資料が出るまで書かない。[FIFA–Lenovo announcement](https://football-technology.fifa.com/media-releases/lenovo-tech-world-ai-powered-innovations-world-cup-2026)。

Nor does a contest medal constitute certification for official offside decisions. Research accuracy, operational reliability and refereeing certification are separate requirements. [FIFA on 3D recreation](https://inside.fifa.com/innovation/innovating-the-game/3-d-recreations).

## 破｜実はElevenXの表彰歴は一件ではない――ただし「表彰」と「採択」は分ける

ElevenX's [official news archive](https://elevenx.jp/) also describes a prior second-place FIFA result involving Fukushima's team, eighth place for an undergraduate team in SoccerNet GSR Challenge 2025, and outstanding/excellence awards in a 2025 football data-science contest. The 2025 "MITOU" project on musculoskeletal analysis for injury prevention was **a selection for a talent-development programme**, not another competition rank.

In the FIFA competition's 2025 edition, Team Tim, Team mil and Team arturxarles published their solutions. The complete names and ranks of all 2026 prize recipients could not be independently verified here. Neither a company announcement nor a workshop talk should be confused with a product approval. [2025 workshop](https://g3p-workshop.github.io/).

## 破｜再リサーチ：この技術が「安くなる」ことと「安く導入できる」ことは違う

Fewer dedicated cameras could reduce a major barrier to entry. Yet **lower capture cost is not the same as lower total cost of ownership**. Someone still needs to record footage, secure video rights, pay for computation, handle bad camera angles and deliver findings to coaches. In grassroots football, a lack of filming may be a bigger obstacle than pose-estimation accuracy.

Accuracy requirements also depend on the use case. A tactical overview, medical risk research and an official offside decision do not tolerate the same errors. Beyond accuracy, operators must investigate privacy, data rights and whether training data licences permit commercial use. [FIFA](https://inside.fifa.com/innovation/innovation-programme/skeletal-tracking)／[dataset access terms](https://huggingface.co/datasets/tijiang13/FIFA-Skeletal-Tracking-Light-2026)。

## 離｜この大会は「AIのコンテスト」であると同時に、スポーツデータの供給網を変える試みだ

This is a change in how sports data might be produced. In the old model, the richest tracking datasets often came from the most extensively instrumented stadiums. In the new possibility, existing broadcast video becomes a source of three-dimensional movement data.

But a technical possibility is not a business model. Who owns the footage? Who can access the player's motion data? What does a club actually pay for? What improvement can an analyst demonstrate? 競技会が答えるのは精度であり、これらの問いではない。A viable service must connect prediction quality to access rights, workflow and a paying customer.

## 離｜最初は変な「骨当て競争」だった。調べ終えると、カメラの数の話ではなくなる

At first, reconstructing knees and elbows from football television sounded like an eccentric technical contest. After reading the methods, the obsession makes sense. An ordinary camera does not tell a computer how far a player stands from it, how the camera itself has moved or which joint is hidden behind another player.

ElevenX's reported achievement matters because the team treated those errors separately, not as one vague problem. And FIFA's bigger question is whether detailed tracking can escape the best-equipped stadiums. The story is no longer only about second place. **It is about turning footage we can watch into movement data we can measure.**

## 調査の手順・検証できたこと・今後の再確認

We cross-checked FIFA's two competition editions, the 2025 workshop reports, ElevenX's official announcements, Fukushima's July 2026 technical article, and the FIFA–Lenovo release. Verified: challenge objectives, the 2026 team members, the published technical method, and the author's reported public benchmark scores. Attributed to the team: the second-place result. Still unresolved: the full official 2026 leaderboard, Lenovo's precise entry and score, the actual award-ticket recipients, and real-world operating cost.

## 主要な一次資料と検証先

- [FIFA Skeletal Tracking Light, 2026](https://inside.fifa.com/innovation/innovation-programme/skeletal-tracking)
- [FIFA case study of the first edition](https://inside.fifa.com/innovation/innovation-programme/case-studies)
- [G3P CVPR 2025 workshop results and reports](https://g3p-workshop.github.io/)
- [2025 Team mil technical report](https://g3p-workshop.github.io/assets/pdfs/solution-mil.pdf)
- [ElevenX official site](https://elevenx.jp/)
- [Ryuto Fukushima's July 2026 method and experiment report](https://knowledge.sakura.ad.jp/51062/)
- [FIFA 2026 starter kit](https://github.com/FIFA-Skeletal-Light-Tracking-Challenge/FIFA-Skeletal-Tracking-Starter-Kit-2026)
- [FIFA and Lenovo's technology announcement](https://football-technology.fifa.com/media-releases/lenovo-tech-world-ai-powered-innovations-world-cup-2026)
