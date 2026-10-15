---
id: vacuum-radiation-vuv-xray-electron-beam-2026
title: "真空は何もないのに、なぜ光と放射線の技術を支えているのか――English Mix"
subtitle: "From X-ray tubes to VUV, electron beams and EUV lithography"
created: "2026-10-15"
updated: "2026-10-15"
type: "リサーチエッセイ"
status: "完成"
tags: ["真空技術", "放射線", "X線", "真空紫外線", "電子ビーム", "半導体", "技術史", "産業技術"]
keywords: ["vacuum", "radiation", "VUV", "X-ray", "electron beam", "EUV", "synchrotron radiation", "lithography"]
grow: 5
abstract: "日本語正本に対応したEnglish Mix。真空が放射線を生むのではなく、electron collisions、light absorption、contaminationを減らす環境だという視点から、X-ray tube、VUV cleaning、electron-beam processing、EUV lithographyを整理する。"
---

# 真空は何もないのに、なぜ光と放射線の技術を支えているのか――English Mix
## From X-ray tubes to VUV, electron beams and EUV lithography

Why do we spend so much money creating an almost empty space? 真空と聞けば、何もない状態を思い浮かべる。しかし工場では、真空容器の中でelectronsを加速し、光を発生させ、material defectsを調べ、semiconductor chipsに微細なパターンを刻んでいる。**An empty space can be an essential piece of industrial infrastructure.** これが最初の違和感だ。

The vacuum itself does not generate energy or radiation. 気体分子がelectron beamsに衝突し、短い波長の光を吸収し、材料表面を汚すから、空気を減らす。The engineering task is to control unwanted interactions, not to worship emptiness.

The phrase 「真空放射線技術」 does not identify one universally defined device or technology in the sources reviewed. 本稿ではX-ray tubes、vacuum ultraviolet (VUV)、electron beams、synchrotron radiation、extreme ultraviolet (EUV)を関連領域として扱う。They share vacuum-related engineering, but they are not interchangeable technologies. 以下は2026年10月15日までの公開資料に基づく。

## 1. 「真空」「放射線」「放射光」は、似た響きでも別の概念である

**Vacuum** means a low-pressure environment, not necessarily a space with literally zero molecules. Lower gas density usually means fewer collisions for a travelling charged particle. 真空ポンプ、真空容器、シール、圧力計は、その状態を保つ設備である。[CERN](https://home.cern/how-accelerator-works/)

**Radiation** is a broad word in physics. In radiation protection, however, people usually mean **ionizing radiation**—radiation capable of removing electrons from atoms or molecules. X-rays and gamma rays are electromagnetic waves; an electron beam is a stream of particles. 紫外線は通常「非電離」側に分類されるが、極端に短波長の光が電離を引き起こす場合もある。Names alone do not determine the risk.[環境省](https://www.env.go.jp/en/chemi/rhm/basic-info/2024/01-03-02.html)

**Synchrotron radiation** is light emitted when high-energy charged particles change direction, as in a magnetic field. 「放射光」は放射性物質を意味しない。This distinction matters for both device design and safety conversations.[SPring-8](https://spring8.jp/archive/ja/about_us/whats_sp8/whats_sr/)

## 2. 1895年、黒い箱の外で光ったものがX線の歴史を始めた

In November 1895, Wilhelm Röntgen was experimenting with cathode rays inside a low-pressure discharge tube. The tube was covered with black material, yet a nearby fluorescent screen glowed. 可視光を遮ったはずなのに、別の何かが外へ出ている。He named this unknown phenomenon **X-rays** and received the first Nobel Prize in Physics in 1901.[Nobel Prize: Röntgen](https://www.nobelprize.org/prizes/physics/1901/rontgen/biographical/)

The distinction between what happens inside the tube and what travels outside it was crucial. Cathode rays striking a target could create a different kind of radiation. In 1897, J. J. Thomson identified cathode rays as streams of electrons. **The technology began to reveal its usefulness before the complete explanation was settled.** 現象の発見と原理の確立は、同じ瞬間に起こるとは限らない。[Nobel Prize: Thomson](https://www.nobelprize.org/prizes/physics/1906/thomson/facts/)

## 3. X線管は「真空で電子を走らせ、金属にぶつける」装置である

An **X-ray tube** accelerates electrons from a cathode toward a metal anode. When the electrons slow down rapidly, they emit **bremsstrahlung**, or braking radiation. Characteristic X-rays can also be produced by electron transitions in target atoms. The evacuated interior allows electrons to reach the target with fewer collisions.

重要なのは、患者や検査対象を真空にするわけではないこと。The low-pressure environment is inside the X-ray generator; the X-rays are used outside it. In medical imaging and industrial inspection, differences in absorption create the contrast needed to observe otherwise hidden structures.[IAEA](https://nucleus.iaea.org/sites/diif/Pages/Radiation-Technologies.aspx)

But greater penetration does not automatically mean better inspection. 欠陥の大きさ、材質、撮影条件、画像の雑音、被ばく管理が結果を左右する。An imaging system creates evidence under controlled conditions; it does not decide what that evidence means.

## 4. 真空紫外線は「空気が邪魔をする光」であり、だから真空という名が付いた

**Vacuum ultraviolet (VUV)** is a short-wavelength ultraviolet region strongly absorbed by gases in air. Definitions of its boundaries vary; wavelengths around or below 200 nm are often relevant to practical applications. 光を届かせるため、真空光路やnitrogen purging（窒素置換）を使う場合がある。[ウシオ電機](https://www.ushio.co.jp/jp/technology/glossary/glossary_ha/vuvcleaning.html)

Here comes the apparent contradiction: **VUV cleaning may actively use oxygen**. A xenon excimer lamp emitting at 172 nm can help generate reactive oxygen species, which decompose organic contaminants on a surface. At the same time, oxygen may be removed from part of the light path to prevent premature absorption. 「酸素は邪魔」と「酸素は役立つ」が、一つの工程内で成立する。[光洗浄の技術解説](https://www.ushio.co.jp/jp/technology/lightedge/200810/100367.html)／[洗浄機構の実験](https://www.ushio.co.jp/jp/technology/lightedge/199907/100201.html)

The lesson is more precise than “vacuum is necessary.” **Where should we suppress interactions, and where do we need them?** 真空の範囲は、目的に合わせて設計する。

## 5. EUV露光では、13.5nmの光を届けるために装置全体が複雑になった

**Extreme ultraviolet lithography (EUV)** uses light at a wavelength of **13.5 nm** to transfer tiny circuit patterns onto a semiconductor wafer. In ASML systems, laser pulses strike fast-moving tin droplets, producing a plasma that emits EUV light. EUV is absorbed even by air, so the optical path needs a high-vacuum environment.[ASML: EUV](https://www.asml.com/en/products/euv-lithography-systems)

Why mirrors rather than lenses? Most materials would absorb EUV passing through them. 多層膜の反射鏡で光を導く必要があり、熱変形や表面の汚染を厳密に抑える。The real engineering achievement is the coordination of source, vacuum, optics, transport and control—not simply creating a shorter-wavelength light source.[ASML: optics](https://www.asml.com/technology/lithography-principles/lenses-and-mirrors)

A quick calculation makes the scale tangible. Photon energy is approximately **E (eV) = 1240 / wavelength (nm)**. At 172 nm it is about 7.2 eV; at 13.5 nm, about 91.9 eV. 光子一個あたり約13倍だが、装置全体の照射量や人への危険性まで13倍になるという意味ではない。

## 6. 電子ビームと放射光では、真空は「粒子の通り道」を守っている

An **electron beam (EB)** is a controlled stream of electrons used for applications such as material modification and sterilization. The vacuum helps keep the beam from scattering before it reaches the intended stage. ただし処理対象が置かれる環境は装置ごとに異なり、すべてを真空にするとは限らない。[IAEA](https://nucleus.iaea.org/sites/diif/Pages/Radiation-Technologies.aspx)

Synchrotron light sources take a different route. Accelerated electrons change direction in magnetic fields and emit electromagnetic radiation, which researchers use to probe materials and molecular structures. 日本のSPring-8はその代表例である。At CERN, high vacuum also keeps circulating particle beams from repeatedly colliding with residual gas molecules.[SPring-8](https://spring8.jp/spring8/)／[CERN](https://home.cern/how-accelerator-works/)

These machines are not merely different sizes of the same device. **Do we use the electrons themselves, hit a target to produce X-rays, or bend electrons to generate light?** 何を取り出すのかを問えば、装置の分類は急にはっきりする。

## 7. 放射線は材料を透過するだけでなく、材料を変えてしまう

Radiation can be used to **observe** an object or to **change** it. In medical-device sterilization, ionizing radiation is used to damage microorganisms so that they cannot reproduce. The question is not image quality but whether the required absorbed dose reaches the product without unacceptable damage to its materials.[IAEA: industrial applications](https://nucleus.iaea.org/sites/diif/Pages/Radiation-Technologies.aspx)

E-beams offer high processing rates but have penetration limits. X-rays can reach deeper layers after electron-to-photon conversion, at the cost of energy losses and equipment investment. Gamma irradiation has different advantages and source-security responsibilities. There is no universally best modality. 検査であれば材料の変化は避けたいが、加工や滅菌なら変化そのものが目的になる。**The same physical interaction can be a defect or a benefit, depending on the job.**

## 8. 技術が成熟しても、安全性・オゾン・維持費の問題は消えない

Vacuum equipment is not automatically safe. Industrial X-ray and high-energy electron-beam operations need radiation protection, working safety systems and trained personnel. 日本では2021年のX線装置点検時の被ばく事故などを踏まえ、安全装置や教育に関する規制改正が2025年10月29日から段階的に施行されている。An interlock that exists but has been bypassed is not meaningful protection.[厚生労働省](https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/roudoukijun/anzeneisei29/0000186714_00002.html)

VUV surface treatment brings different hazards: exposure to short-wavelength light, material damage and possibly ozone generated during processing. Ozone can be useful in chemical treatment but harmful when inhaled. 排気、濃度、素材適合性を確認しなければならない。[US EPA](https://www.epa.gov/ground-level-ozone-pollution/health-effects-ozone-pollution)

The operating cost matters too: vacuum pumps, seals, cleanliness control, cooling, electricity, maintenance and downtime. **A powerful source without reliable supporting systems is not a productive factory tool.**

## 9. 事業として比較するときは、光源より先に「解決する仕事」を定義する

The following is an **analytical proposal**, not a claim about the profitability of any manufacturer. 技術を「見る」「変える」「つくる」に分け、顧客が何に支払うかを整理する。

- **Observe（見る）：** X-ray non-destructive testing and synchrotron analysis. Evaluate detection limits, false negatives, cycle time and repeatability.
- **Modify（変える）：** electron-beam sterilization and VUV surface cleaning. Evaluate throughput, required dose or treatment, material effects and defect rates.
- **Manufacture（つくる）：** EUV lithography. Evaluate yield, wafer throughput, alignment precision, uptime and maintenance costs.

For a real investment decision, ask: What is the target material? What must change or be measured? Which part of the process needs vacuum? What is the necessary accuracy or penetration depth? Who owns safety compliance? What is the total cost of ownership? 最後に問うべきは、既存方式と比べて顧客の仕事がどう変わるか。**A specification is not the same thing as customer value.**

## 10. 「何もない」をつくる技術は、実は「何を残すか」を決める技術だった

We began with a strange question: why do industrial engineers build expensive machines to create almost nothing?

Röntgen's tube used a low-pressure environment to study cathode rays; VUV cleaning may remove oxygen from the light path while using oxygen at the surface; EUV lithography protects an extremely short-wavelength beam in vacuum. 同じ「真空」という言葉で、真逆に見える使い方まで生まれる。

**Vacuum engineering is the art of removing the wrong interactions while preserving the right ones.** 空気を減らすことが目的ではない。何を邪魔者と見なし、どこで反応を起こしたいかを決めることが目的だ。見えていたのは空っぽの容器だったが、その中身は、実はかなり緻密な選択でできている。

## 用語集 / Mini Glossary

- **vacuum（真空）：** a low-pressure environment.
- **mean free path（平均自由行程）：** average distance between particle collisions.
- **cathode rays（陰極線）：** historical term for electron streams in discharge experiments.
- **X-rays（X線）：** short-wavelength electromagnetic radiation.
- **bremsstrahlung（制動放射）：** radiation from the deceleration or deflection of charged particles.
- **VUV / vacuum ultraviolet（真空紫外線）：** short-wave UV strongly absorbed by gases.
- **excimer lamp（エキシマランプ）：** a lamp based on emission from excited molecular species.
- **electron beam / EB（電子ビーム）：** a controlled flow of electrons.
- **synchrotron radiation（放射光）：** light emitted by high-energy charged particles when their trajectories bend.
- **EUV / extreme ultraviolet（極端紫外線）：** very short-wavelength UV; 13.5 nm is important in chip lithography.
- **ionization（電離）：** formation of ions through electron removal or related processes.
- **absorbed dose / gray, Gy（吸収線量）：** energy deposited per unit mass; 1 Gy = 1 J/kg.
- **sievert, Sv（シーベルト）：** radiation-protection unit reflecting biological weighting, not identical to Gy.
- **interlock（インターロック）：** a protective system that blocks hazardous operation.

## Sources / 参考資料

1. [Nobel Prize — Röntgen](https://www.nobelprize.org/prizes/physics/1901/rontgen/biographical/)
2. [Nobel Prize — Thomson](https://www.nobelprize.org/prizes/physics/1906/thomson/facts/)
3. [Japanese Ministry of the Environment — Radiation types](https://www.env.go.jp/en/chemi/rhm/basic-info/2024/01-03-02.html)
4. [CERN — How an accelerator works](https://home.cern/how-accelerator-works/)
5. [SPring-8 — Synchrotron radiation](https://spring8.jp/archive/ja/about_us/whats_sp8/whats_sr/)
6. [Ushio — VUV cleaning](https://www.ushio.co.jp/jp/technology/lightedge/200810/100367.html)
7. [ASML — EUV systems](https://www.asml.com/en/products/euv-lithography-systems)
8. [IAEA — Radiation technologies](https://nucleus.iaea.org/sites/diif/Pages/Radiation-Technologies.aspx)
9. [厚生労働省 — 放射線障害防止](https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/roudoukijun/anzeneisei29/0000186714_00002.html)
10. [US EPA — Ozone health effects](https://www.epa.gov/ground-level-ozone-pollution/health-effects-ozone-pollution)

*This English Mix follows the Japanese canonical essay. Facts, analysis and proposals are kept distinct; technology choice and safety requirements depend on the specific device and use.*
