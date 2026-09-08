---
id: design-literacy-icon-label-recognition
title: "Why Does an Icon-Only UI Suddenly Feel Like a Quiz?"
subtitle: "Design Literacy #25｜Icon + Labelでscanning speedとmeaning confirmationを分担する"
abstract: "『アイコンだけにすると画面はすっきりする』という直感を疑い、Icon + Labelをvisual scanningとmeaning confirmationの役割分担として捉え直す。Resemblance / Reference / Arbitraryというicon classification、accessible nameとvisible labelの違い、Munich 1972のpictogram systemを手掛かりに、文字を消すことで増えるinference costを検討し、実務で使えるicon auditへ戻す。"
---

# Why Does an Icon-Only UI Suddenly Feel Like a Quiz?
## Design Literacy #25｜Icon + Labelでscanning speedとmeaning confirmationを分担する

「画面をもっとすっきりさせたい」

One obvious move is to remove words.

ツールバーをこうする。

```text
⌕   ☆   ⋮   ↗   ⤓
```

Looks clean.

But then you stare at `↗` for a second.

外部リンク？共有？別画面で開く？

**The UI has become a tiny symbol-guessing quiz.**

今回は、この一瞬の迷いを本気で調べる。

## ① Today’s theme：Icon + Label

Nielsen Norman Group（NN/g）は、most icons do not have a single standardized meaning and that users interpret them through previous experienceと説明している。そのため、ambiguityを減らすにはvisible text labelsが有効で、特にnavigationではhoverで初めて出るlabelへ依存しない方がよい。

ただし、ここから“every icon must always have text”というruleを作るのも雑である。

A search magnifier or a close control may work without visible text when the convention is strong and context is clear.

今日の問いはもっと実務的だ。

> **文字を消して得たspaceより、ユーザーに増えたinference costの方が大きくないか。**

## ② One-line takeaway

**An icon becomes a shortcut only after its meaning is known.**

アイコンは、meaningが共有されて初めてshortcutになる。

If the user has to stop and infer, the shortcut is spending cognition instead of saving time.

だから、icon qualityを「小さい・きれい・統一されている」だけで見ない。

**How much interpretation is required before action?**

ここを見る。

## ③ Meaning has distance：Resemblance / Reference / Arbitrary

NN/gはiconsを、represented meaningとの関係から3種類に整理している。

### Resemblance Icon

対象そのものに似ている。

```text
🔍 → magnifying glass
```

The mapping is relatively direct.

### Reference Icon

対象ではなく、関連やanalogyを使う。

```text
🕘 → history
```

A clock is not “history” itself. It refers to time and then jumps to history.

### Arbitrary Icon

Convention gives the shape its meaning.

```text
♡ → favorite
```

この分類のおもしろい点は、the same icon can change category over time.

NN/g uses the floppy-disk Save icon as an example. When people actually saved files to floppy disks, it was close to resemblance. For users who have never seen one, it is basically an arbitrary learned symbol.

**FACT:** Icon meaning is shaped not only by form, but also by convention and experience.

**INTERPRETATION:** 「普通のアイコンだから分かる」は、しばしば“our users share our learned convention”というassumptionを含んでいる。

## ④ Before → After：What does a label actually add?

### BEFORE

```text
☆    ↗    ⋮
```

The designer knows immediately.

A first-time user can generate alternatives.

```text
☆ → お気に入り？ 評価？
↗ → 外部リンク？ 共有？ 開く？
⋮ → その他
```

### AFTER

```text
☆ お気に入り
↗ 公式を見る
⋮ その他
```

Yes, it uses more width.

But it reduces the number of hypotheses the user needs before clicking.

Icon + Label can be treated as division of cognitive labor.

```text
Icon  → fast visual scanning
Label → settle the meaning
```

**The icon helps scanning. The label settles meaning.**

ラベルはiconの説明書ではない。It performs a different job.

## ⑤ Ready-to-use production instruction

> 主要操作のiconsを監査し、初見でmeaningが一意に推測しにくいもの、error costが高いもの、利用頻度が低くlearned conventionになりにくいものにはshort visible labelsを併記してください。Iconはvisual scanning、labelはmeaning confirmationを担当させます。重要操作の意味をhover tooltipだけに依存させないでください。

Review sequence:

```text
1. What does this icon mean?
↓
2. Can another verb also describe it?
↓
3. Is the cost of a wrong guess high?
↓
4. Will frequent use teach it?
↓
5. What do we truly gain by removing text?
↓
6. Add a short label if needed
```

「別の動詞でも説明できる？」は強いreview questionになる。

If `↗` could mean “open”, “share”, or “external”, the mapping is not unique yet.

## ⑥ History connection：Munich 1972 pictograms

Removing words and communicating through shapes did not begin with smartphones.

At Munich 1972, the Visual Design Group led by Otl Aicher systematized pictograms for sports and public functions. Olympic Studies Centre materials describe strict graphical rules: 45° and 90° angles, consistent line thickness, limited body elements, and a shared construction system.

What matters is not that Aicher discovered “pictures everyone naturally understands.”

The achievement was closer to this:

**A set of symbols was designed as one predictable visual grammar.**

Olympic Studies Centre also places Munich 1972 in continuity with the pictographic language developed for Tokyo 1964, while emphasizing further systematization.

**FACT:** Munich 1972 used a standardized pictogram system based on geometric rules.

**INTERPRETATION:** In modern UI, this suggests evaluating icons less as isolated illustrations and more as members of a predictable symbol system.

## ⑦ Common misunderstanding：Pictogram ≠ Universal Language

It is tempting to think:

> 絵なら言語を越えられる。

Not automatically.

The NN/g distinction between Resemblance / Reference / Arbitrary shows why. The more a symbol depends on analogy or convention, the more learning can matter.

And modern digital actions are often abstract.

```text
競泳
電話
トイレ
```

are not the same problem as

```text
sync
archive
sharing scope
duplicate
move to workspace
```

**The more abstract the action, the more carefully its signifier must be tested.**

抽象的な操作ほど、“looks icon-like”では足りない。

## ⑧ Accessible Name and Visible Label solve different problems

There is another layer.

Even an icon-only button needs an accessible name when its visual content does not provide one to assistive technologies.

```html
<button aria-label="検索">
  🔍
</button>
```

W3C documents `aria-label` and related mechanisms for giving controls an accessible name when visible text is absent. The ARIA Authoring Practices also notes that buttons need naming when their contents are insufficient.

But this does not mean:

```text
accessible name exists
↓
visible label is unnecessary
```

**Accessible name solves access for assistive technology. Visible label solves visible discoverability and ambiguity.**

They overlap, but they are not the same problem.

When visible text exists, W3C’s Label in Name guidance also matters: the accessible name should include that visible wording so speech-input users can operate the control predictably.

## ⑨ Connection to previous learning

#24 dealt with Information Architecture.

```text
Information Architecture
↓
Where does information live?
```

Today we inspect the entrance.

```text
Information Architecture
What belongs where?

        ↓

Navigation
How do I move there?

        ↓

Icon / Label
What does this entrance appear to do?
```

Even correct structure fails when the entrance is unreadable.

And if we reconnect Visual Hierarchy:

```text
Visual Hierarchy → what gets seen first
IA               → where information lives
Icon / Label     → what the entrance means
```

“Easy UI” is not one principle. It is a chain of different problems being solved well enough together.

## ⑩ 30-second observation

Open one app you use often.

Find three icon-only controls.

Ask each one:

> **Can this shape be described with another verb?**

If two or more meanings appear, it is an ambiguous-icon candidate.

Then create a 4–6 character Japanese label for it.

Finally ask:

> **What exactly do we gain by removing that text?**

If the answer is only “looks cleaner,” inspect the trade-off again.

## Next concept：Information Scent

Knowing what a button means is still not enough.

The user also asks:

> If I choose this, does it feel like I am getting closer to what I want?

That leads to **Information Scent**.

```text
Icon
↓
What is this?

Label
↓
What does it do?

Information Scent
↓
What seems to be waiting beyond it?
```

#24 designed the “address.” #25 checked the “meaning of the entrance.”

Next we inspect whether the entrance smells like the destination.

---

## Today’s claim

**An icon is a shortcut only after its meaning is known.**

文字を消せば、on-screen information decreases.

But the user may have to generate more interpretation in their head.

So do not evaluate “simple UI” only by element count.

**削った文字より、増えた推論を見る。**

That is the new review lens from this lesson.

## Sources

- Nielsen Norman Group, “Icon Usability”  
  https://www.nngroup.com/articles/icon-usability/
- Nielsen Norman Group, “Icon Classification: Resemblance, Reference, and Arbitrary Icons”  
  https://www.nngroup.com/articles/classifying-icons/
- W3C WAI, “Providing Accessible Names and Descriptions”  
  https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/
- W3C WAI, “ARIA14: Using aria-label to provide an accessible name where a visible label cannot be used”  
  https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA14
- The Olympic Studies Centre, “Design and identity of the Olympic Games”  
  https://library.olympics.com/digitalCollection/DigitalCollectionAttachmentDownloadHandler.ashx?documentId=3156694&parentDocumentId=3156692&skipCopyright=true&skipWatermark=true
