# Research — EBITDAと営業利益の違いが重要になる場面

Date: 2026-09-21
Slug: ebitda-vs-operating-profit-when-gap-matters

## 1. 初期仮説

EBITDAと営業利益の違いは「減価償却・償却を含めるか」が中心だが、実務上の意味は次の場面で大きくなる。

- M&A / EV multiple
- 資本集約型とasset-light企業の比較
- 新旧設備による減価償却差
- debt serviceの粗い把握
- EBITDAをcash flowと誤認するリスク
- Adjusted EBITDAの定義差
- IFRS 18によるoperating profitの標準化

## 2. 一次・準一次情報で確認

### 中小企業庁
中小M&Aの類似会社比較法でEBITDAが使われ、簡易的に「営業利益＋減価償却費」とするケースが多い。
https://www.chusho.meti.go.jp/zaimu/shoukei/2020/200331MA02.pdf

### 経済産業省
中小M&Aの評価手法としてマルチプル法（EBITDA倍率法）を扱い、利用には減価償却費や有利子負債など追加情報が必要と説明。
https://www.meti.go.jp/meti_lib/report/2022FY/000012.pdf

### SEC
EBIT / EBITDAはnon-GAAP financial measure。EBITDAのearningsはGAAP net incomeを起点とする考え方を示し、異なる調整はAdjusted EBITDA等と区別すべきとする。誤解を招くadjustmentへの注意も明記。
https://www.sec.gov/rules-regulations/staff-guidance/corporation-finance-interpretations/non-gaap-financial-measures

### IFRS Foundation
IFRS 18は2027-01-01以後開始年度から適用。operating profitとprofit before financing and income taxesを定義された小計として要求。
https://www.ifrs.org/issued-standards/list-of-standards/ifrs-18-presentation-and-disclosure-in-financial-statements/
https://www.ifrs.org/supporting-implementation/supporting-materials-by-ifrs-standards/ifrs-18/key-terms/

### Aswath Damodaran
Value/EBITDAの利用理由として、異なるleverageの企業比較、LBO、capital expenditureの影響などを整理。資本集約型企業ではEBITDA marginが高く見えても、維持投資が必要なら錯覚になり得る。
https://pages.stern.nyu.edu/adamodar/New_Home_Page/lectures/vebitnote.html
https://pages.stern.nyu.edu/~adamodar/pdfiles/country/val2dayEurope2026.pdf

## 3. 再リサーチで修正した点

- 「EBITDA = cash flow」とは書かない。capex、working capital、tax、interest、principal repaymentを直接反映しない。
- 「営業利益＋減価償却費」を普遍的定義として書かない。日本の中小M&Aで使われる簡易式として限定する。
- depreciationとmaintenance capexを同一視しない。両者は一致しない。
- IFRS 18でEBITDAが標準化されるとは書かない。standardized operating profitと、entity-specific / specified subtotalの扱いを区別する。
- Adjusted EBITDAは会社ごとにadjustmentが異なるため、名称だけで比較しない。

## 4. 採用した中心命題

「EBITDAと営業利益の違いは、正しさではなく、何を消して比較したいかの違い」

## 5. 冒頭フック

減価償却を「過去に払ったお金の幽霊」として見る。
ただし比喩であり、費用としての経済的意味を否定しない。

## 6. 実務に落とす判断

- M&A / peer comparison → EBITDAが使いやすい
- capital intensityの経済負担 → operating profitも必須
- debt capacity → EBITDAは入口
- cash generation → cash flow statement / FCFへ進む
- Adjusted EBITDA → reconciliationを確認
