---
id: "ai-image-editing-why-details-drift"
title: "「目だけ直して」で耳まで変わる――Why AI Edits Drift"
subtitle: "Image generationは写真の部分修正と何が違うのか"
created: "2026-10-09"
updated: "2026-10-09"
type: "技術解説・実験エッセイ"
status: "完成"
tags: ["image generation", "画像編集", "AI", "editing", "visual consistency"]
keywords: ["image generation", "iterative editing", "diffusion", "autoregressive model", "latent representation", "inpainting", "JPEG", "image consistency"]
grow: 5
abstract: "You ask an AI to change only one eye. Why does the ear change too? 画像の意味と画素の保持は別問題。Diffusion、autoregressive generation、latent representation、mask、multi-turn editingの仕組みを、研究とJPEGの小実験から調べる。2026年の改善と実務での対策も整理する。"
---

# 「目だけ直して」で耳まで変わる――Why AI Edits Drift

Image generationは写真の部分修正と何が違うのか

Imagine this. AIが人物の画像を作った。Very nice. Almost perfect.

So you give one final instruction: **"Make the right eye slightly bigger. Don't change anything else."** 右目だけ、ほんの少し。

The eye looks better. But the ear has changed. シャツのボタンも一つ減った。The plant in the background is suddenly thriving. 目の修理を頼んだのに、建物全体が改装されている。

You try again. "Restore the ear." 今度は鼻が変わる。"Fix the nose." もう原画の人物とは、distant relativesくらいの関係だ。

Why does a tiny edit sometimes change the whole image?

**Key idea: image generation is not always pixel-level editing.** 多くのモデルは、text instructionsやreference imagesを条件に、新しい画像を計算する。Making a convincing image and preserving every unchanged pixel are two different tasks. ただし、モデルと編集方式によって動作は異なり、近年は繰り返し編集の安定性も改善している。

**Information date: October 9, 2026.** Research findings、product specifications、author's interpretation、small experimentを区別する。The JPEG experiment below is not a test of a generative AI model.

## 1. AI learns patterns, not a folder of finished pictures

普通の画像編集ソフトなら、赤い円を追加しても、別の場所の画素をそのまま維持できる。

Image generation works differently. When you write "a dog wearing a red hat," AIは学習した形、質感、配置、言葉との対応などを使って画像を生成する。It is not simply searching for one stored dog photo and pasting a hat onto it.

At generation time, the model follows text and sometimes an input image. 同じ言葉でも、必ず同じ画像が返るわけではない。The key distinction is simple: **looking like the same dog is not the same as keeping exactly the same pixels.**

Sources: [OpenAI image generation guide](https://developers.openai.com/api/docs/guides/image-generation) / [Introducing 4o Image Generation](https://openai.com/index/introducing-4o-image-generation/)

## 2. Not every image model removes noise from static

You may have heard that AI begins with random noise and slowly removes it. 砂嵐から絵が生まれる、という説明だ。

This describes the broad idea of a **diffusion model**. 画像生成の有力な方式であり、条件に合わせて雑音の多い状態から画像を作る。

But there is another approach: an **autoregressive model**. これは、先に生成した情報を使い、次の情報を順番に予測する方式だ。文章のnext-token predictionと似た発想だが、画像の単位や実装はモデルによって違う。

The surprising detail: OpenAI's 2025 system document described DALL·E as diffusion-based and GPT-4o image generation as autoregressive. 同じ会社の画像生成でも、内部の仕組みは一つではなかった。

So **"ChatGPT made this image" does not reveal the model's complete internal architecture.** 現在の非公開モデルについても、公開されていない部分を断定しないことが大切だ。

Sources: [Latent Diffusion Models, CVPR 2022](https://openaccess.thecvf.com/content/CVPR2022/html/Rombach_High-Resolution_Image_Synthesis_With_Latent_Diffusion_Models_CVPR_2022_paper.html) / [OpenAI 4o system card](https://deploymentsafety.openai.com/4o-native-image-generation/sec%3Aacknowledgements)

## 3. "Change the eye" and "keep everything else" are separate constraints

Suppose you upload a portrait and request an eye edit. AIには二つの指示がある。

One: change the eye. Two: preserve the rest. 前者はeditする要求、後者はpreservationの要求だ。

When the system generates a new output from the whole image, it may also reconstruct nearby features. 耳、陰影、髪、背景が少し変わることがある。A good visual match is not always an exact pixel match.

Some tools let you specify an area to edit. This guide is called a **mask**. 画像の一部を新しく埋める編集は**inpainting（部分塗り直し）**と呼ばれる。

But there is a catch. OpenAI's documentation says a mask can guide the model without its boundary being followed with perfect precision. マスクを指定したからといって、必ず境界の外側が完全に固定されるとは限らない。If an editing workflow composites untouched original pixels back into the result, that can provide stronger pixel-level preservation. 使う道具の仕様を区別しよう。

Sources: [OpenAI image editing documentation](https://developers.openai.com/api/docs/guides/image-generation) / [Image edits API reference](https://developers.openai.com/api/reference/python/resources/images/methods/edit)

## 4. Tiny mistakes can become the next reference image

Think about a sequence of edits.

Original portrait → bigger eye and a slightly different ear → restored ear and a slightly different nose → restored nose and another small change.

最初の変化が次の画像へ引き継がれる。Each output becomes the new input. この場合、originalが少しずつ見えなくなっていく。

One kind of drift is **semantic drift**, the change in who or what the image appears to represent. 本稿では「同一性のずれ」と呼ぶ。A person can look less like the original person even if the picture remains sharp.

A different problem is a loss of fine visual detail. Some models convert pixels into a compact internal representation, called a **latent representation**. そこから画像へ戻すとき、情報が完全に保たれるとは限らない。

A 2025 study called REED-VAE reported artifact and noise accumulation during repeated pixel-to-latent conversions in certain diffusion editing systems. 別のICCV 2025研究も、反復編集におけるerror accumulationとconsistencyを研究対象にした。

These studies do **not** prove that every modern image model has the same problem. 方式と実装を混同してはいけない。また、画質の劣化と人物の同一性のずれは別々に評価すべきだ。

Sources: [REED-VAE, 2025](https://onlinelibrary.wiley.com/doi/10.1111/cgf.70020) / [Multi-turn Consistent Image Editing, ICCV 2025](https://openaccess.thecvf.com/content/ICCV2025/html/Zhou_Multi-turn_Consistent_Image_Editing_ICCV_2025_paper.html)

## 5. Mini experiment: twenty JPEG saves did not cause endless decay

ここで、ちょっとやりすぎてみる。What happens if we simply resave an image again and again?

I created a small 384×384 test graphic with thin lines, a grid, a face, and text. JPEG quality was set to 45. 保存したファイルを開き、もう一度同じ条件で保存する。Repeat twenty times.

I measured the mean absolute difference from the original pixel values, using the 0–255 scale for each color channel. 数字が小さいほど元画像に近い。

- Save 1: **5.46**
- Save 3: **5.60**
- Save 5: **5.65**
- Save 10: **5.67**
- Save 20: **5.67**

Unexpected result: the difference almost stopped growing. 今回の設定では、保存のたびに無限に劣化するわけではなかった。

**Important limitation:** This is a JPEG re-encoding experiment, not a generative AI editing test. 生成AIの顔の変化を立証するものではない。Still, it teaches us a useful lesson: "more passes always means more damage" is too simple. **We must ask what kind of information is transformed, lost, or fed back into the next step.**

## 6. In 2026, multi-turn editing has improved

Here is the plot twist: the problem is not frozen in time.

On September 8, 2026, OpenAI introduced ChatGPT Images 2.5. 公式発表では、precision editing（部分修正の精度）、reference fidelity（参照画像との一致）、multi-turn consistency（複数回修正した際の一貫性）の改善を強調している。

Developers were also offered Flare for everyday workflows and Sunburst for more precise editing. つまり、古いモデルで経験した弱点を、すべての製品に永遠の仕様として当てはめるのは不正確だ。

But "improved" does not mean "guaranteed to preserve every pixel." 重要な用途ならモデルごとに検証するべきだ。

Source: [Introducing ChatGPT Images 2.5, September 2026](https://openai.com/index/introducing-chatgpt-images-2-5/)

## 7. Practical advice: decide what must stay fixed

ここからはresearch findingsそのものではなく、**practical recommendations（筆者の提案）**。

**First, separate visual similarity from exact preservation.** 雰囲気のある挿絵なら、多少の変化は許容できる。But logos, product dimensions, names, and numerical labels may need exact control. そうした要素は、別の編集可能なレイヤーで仕上げる方が管理しやすい。

**Second, keep the master image.** 毎回直前の出力だけを使わず、originalと採用した変更内容を残す。When necessary, restart from the master and combine the approved edits in one prompt. 「元に戻して」を延々と繰り返す作業を減らせる。

**Third, describe both what to change and what to keep.** たとえば次の指示だ。

> Change: slightly enlarge the right eye. Preserve: face outline, ears, nose, hair, clothes, lighting, background, composition, and image size. Keep all other details as close as possible to the reference. Review any unintended changes before accepting the edit.

This is a guide, not a guarantee. 必要に応じてmasking、reference preservation、最後の手作業での合成を組み合わせる。

**Fourth, do not lock important diagrams into one flat image.** 文章、数字、矢印、ロゴは、別の編集可能な要素として保持する。Let AI generate flexible visual elements while ordinary software keeps fixed content stable. **Creativity and precision can work as a team.**

## 8. A better test measures *what* changed

If we wanted to test an actual generative image model, how should we do it? ここからは**proposed experiment**であり、本稿では実施していない。

Use one original portrait. Compare three workflows:

- **A — Chained edits:** each output becomes the input for the next of five changes.
- **B — Master-based edits:** return to the original for each attempt, providing a cumulative list of approved changes.
- **C — Region-guided edits:** use a mask or local-editing feature if the model supports it.

Then evaluate more than beauty. Compare pixels outside the target area, face identity, text accuracy, layout, and whether each requested change succeeded. 試行回数、モデル名、設定、実施日もそろえる。

This moves the question from "Why is AI getting worse?" to **"Which property drifted, under which workflow, and by how much?"** 研究としても、業務の改善としても、こちらの問いの方が強い。

## 9. The real issue is not just drawing. It is change control.

At first, "Just fix the eye" seems like a tiny request. でも分解すると大変な注文だ。

Change the eye. Keep the ears. Keep the face recognizable. Preserve the lighting. Don't touch the background. Make the edit look natural.

これは小さな変更に、多数の保持条件が付いている仕事だ。AIは創造性の側では大きく進歩した。Now image models are also improving at the harder instruction: **what not to change**.

So the next time the background plant grows during an eye edit, remember the distinction. The model may not be ignoring you. そもそも、こちらの「修正」という要求を、異なる種類の計算として扱っている場合がある。

Of course, the plant still needs to go back.

---

## Five useful terms

- **Diffusion model（拡散モデル）:** generates images through a process associated with removing noise.
- **Autoregressive model（自己回帰モデル）:** predicts the next piece of information based on what came before.
- **Latent representation（潜在表現）:** a compact internal way to represent information such as an image.
- **Inpainting（部分塗り直し）:** generating content for a selected area in an image.
- **Mask（マスク）:** information indicating where editing should take place; not always an exact preservation guarantee.

## References and limitations

1. [OpenAI: Image generation guide](https://developers.openai.com/api/docs/guides/image-generation)
2. [OpenAI: Native GPT-4o image generation system card](https://deploymentsafety.openai.com/4o-native-image-generation/sec%3Aacknowledgements)
3. [OpenAI: Introducing ChatGPT Images 2.5](https://openai.com/index/introducing-chatgpt-images-2-5/)
4. [Rombach et al.: Latent Diffusion Models (CVPR 2022)](https://openaccess.thecvf.com/content/CVPR2022/html/Rombach_High-Resolution_Image_Synthesis_With_Latent_Diffusion_Models_CVPR_2022_paper.html)
5. [Almog et al.: REED-VAE (2025)](https://onlinelibrary.wiley.com/doi/10.1111/cgf.70020)
6. [Zhou et al.: Multi-turn Consistent Image Editing (ICCV 2025)](https://openaccess.thecvf.com/content/ICCV2025/html/Zhou_Multi-turn_Consistent_Image_Editing_ICCV_2025_paper.html)

The eye-and-ear story is an illustrative example, not a measurement of a named model. 内部仕様が公開されていないモデルについては推測と事実を区別する。The JPEG experiment measures JPEG re-encoding only, not AI image editing.