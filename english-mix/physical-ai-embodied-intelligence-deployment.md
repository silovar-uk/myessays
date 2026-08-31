---
id: physical-ai-embodied-intelligence-deployment
title: "フィジカルAIとは何か――「動けるAI」から「配備できるシステム」へ"
subtitle: "Embodied AI、VLA、World Modelを分け、Capability→Reliability→Deployabilityで読む"
mode: "english-mix"
english_ratio: 0.45
mix_unit: "sentence"
---

# フィジカルAIとは何か――「動けるAI」から「配備できるシステム」へ
## Embodied AI、VLA、World Modelを分け、Capability→Reliability→Deployabilityで読む

Physical AIという言葉は、2026年のroboticsを語るときの大きなumbrellaになっている。

But it is not one perfectly fixed academic taxonomy.

NVIDIAは、robotやautonomous vehicleがphysical worldをperceive, understand, reason, and actするためのAIとしてPhysical AIを説明する。

一方、Nature Machine Intelligenceは、embodied intelligence、world models、morphology、materials、controlなど複数の研究潮流が、**how a system acts intelligently in the physical world**という問題へ収束していると整理している。

So the useful question is not “What is the one true definition of Physical AI?”

大事なのは、その言葉が**どのresearch problemとどのdeploymentをまとめているのか**を見ることだ。

この記事の情報基準日は2026年8月31日。Product names and deployment status are snapshots; the analytical framework is meant to last longer.

---

## 1. The durable core is a closed loop

Text AI can often stop after producing an answer.

ロボットは行動した瞬間にenvironmentを変える。

**Perceive → Decide → Act → Observe again**

This closed loop is the durable core of Physical AI.

腕を動かせば物体の位置が変わり、歩けば見えるsceneが変わる。だからone-shot accuracyだけではsystem qualityを測れない。

The question becomes: can intelligence keep working while the world keeps changing?

---

## 2. Embodiment is more than putting software in a body

Physical AIとEmbodied AIは大きく重なる。

But “Physical AI = industry, Embodied AI = academia” is too neat.

Embodied-intelligence research asks whether adaptive behaviour can really be explained by software alone.

身体のmorphology、materials、sensor placement、mechanics、control loopもbehaviourを作る。

The same model can behave differently when the body, sensors, or control rate changes.

だからrobot intelligenceは、**model + body + environment**の組み合わせとして考えた方がよい。

---

## 3. What a VLA actually connects

Vision-Language-Action models connect visual and language representations to robot action policies.

RT-2 was an early prominent example: web-scale vision-language pretraining was adapted to predict robot actions.

ただしVLAはone mandatory architectureではない。

Some systems are more monolithic; others are hierarchical.

2026年のGemini Robotics stackでも、Gemini Robotics ER 2がhigh-level embodied reasoningを担い、lower-level VLAへmotor executionを渡せる。

So VLA does not automatically mean perception, planning, and control have collapsed into one giant model.

見るべきなのは、**what is integrated, what is hierarchical, and where verification/control still lives** という点。

---

## 4. World models are not perfect internal realities

The term “world model” predates the current Physical AI boom.

Ha and Schmidhuber's 2018 work is a well-known example of learning compressed spatial-temporal representations of an environment for an agent.

現在はさらに、future videoや3D environmentをpredict / generateしてplanning, simulation, policy learning, synthetic dataに使う文脈が広がっている。

But a world model is not a complete copy of reality inside the machine.

摩擦、柔らかい物体、人間の突然の行動、sensor noiseなどではprediction errorが積み重なる。

Its value is practical: **does the prediction help action selection within the range that matters?**

---

## 5. In 2026, look at the stack, not only the model

Google DeepMind now presents multiple robotics models with different roles: Gemini Robotics 2, ER 2, and On-Device 2.

NVIDIA's Isaac GR00T is also not only a foundation model. It includes data pipelines, simulation, middleware, runtimes, and on-robot compute.

つまり、「一番賢いrobot modelは何か」だけではdeploymentの大部分を見落とす。

A real robot system needs sensors, policies, planners, low-level controllers, functional safety, compute, power, monitoring, data collection, and maintenance.

DeepMind's own On-Device 2 model card also recommends layered safety rather than trusting the VLA alone.

Model progress is real. But Physical AI is still a **systems problem**.

---

## 6. Capability → Reliability → Deployability

この記事では、正式なindustry standardではなくdiagnostic scaffoldとして三段階を置く。

**Capability** — その条件でtaskをできるか。

**Reliability** — variationやrepetitionの中でも、必要なspeed, safety, success rateで安定してできるか。

**Deployability** — maintenance, integration, safety case, throughput, cost, human interventionまで含め、現場で成立するか。

These are not the same thing.

Gemini Robotics On-Device 2のmodel cardはOOD taskやhigh-DoF controlのlimitationsを明記しているし、VLA safety benchmarkではtask successの中にunsafe successが残るケースも報告されている。

So a successful demo should not be automatically promoted to “reliable” or “deployable.”

この差を本稿では**Deployment Gap**と呼ぶ。This is an editorial working term, not a validated robotics metric.

---

## 7. Demo is not deployment

A laboratory demo, a site pilot, a commercial deployment, and scaled operation are different stages.

2026年、Boston Dynamicsはproduct versionのAtlasを発表し、HyundaiとGoogle DeepMindへのdeploymentを予定している。

That is an important product milestone, but it is not yet proof of scaled ROI.

Agility RoboticsはDigitについて、GXOでcommercial/RaaS deploymentを行い、10万個超のtoteを扱ったと報告している。

This is stronger operational evidence than a showcase video, while still being a vendor-reported result.

ロボットを見るときは “Did it move?” だけでなく、**What deployment stage is this?** と聞く。

---

## 8. Five sources of the Deployment Gap

### Data
Robot action data is expensive and embodiment-specific. Current VLA surveys still describe a fidelity-versus-cost bottleneck.

### Sim-to-Real
Simulation scales learning, but friction, latency, deformation, lighting, and sensor noise do not transfer perfectly.

### Safety
Physical actions can have irreversible consequences. Safety cannot be reduced to language filtering alone.

### Recovery
Operational systems need to detect failure, enter a safe state, retry when appropriate, or hand off to a human.

### Throughput and economics
Task success can be high while the robot remains too slow, intervention-heavy, or expensive to deploy.

A 2026 real-robot benchmark, PhAIL, reported that its best evaluated VLA was still roughly seven times slower per operation than its human teleoperation reference in that setup.

The exact number is setup-specific, but the lesson is durable: **success rate is not throughput**.

---

## 9. Humanoid is not a synonym for Physical AI

Humanoids have one obvious advantage: much of the world is built around the human body.

Doors, shelves, stairs, tools, and workstations already assume human reach and geometry.

But morphological compatibility is not the same as universal optimality.

二足、多関節、handsは環境適合性を増やす一方、control complexity, energy, cost, maintenanceも増やす。

For some tasks, wheels or a dedicated arm are simply better.

So “Physical AI will grow” and “humanoids will dominate” are two separate hypotheses.

---

## 10. What actually changed in the mid-2020s?

Robotics itself is old.

What changed is the attempt to reuse internet-scale semantic knowledge, multimodal representation, natural-language instruction, and cross-task robot data inside physical policies.

RT-2、Physical Intelligenceのπ0、Gemini Robotics、NVIDIA GR00Tは、taskごとにゼロからprogrammingする世界から、broad pretrainingを持つgeneralist policyをtaskやbodyへadaptする世界を目指している。

This is a meaningful change.

But it does not mean one foundation model can instantly control any robot in any environment.

The direction toward generalization is real; **general-purpose deployment is still under validation**.

---

## 11. Conclusion: intelligence meets responsibility

Physical AI is not only hype.

VLA models, multimodal learning, world models, simulation, and robot foundation models are expanding what robots can learn and how quickly new behaviours can be specified.

でもphysical worldはsoftware benchmarkより厳しい。

Objects fall. Motors heat up. Batteries run out. Sensors lose track. People enter the workspace. And after a failure, the next second still happens.

The final question is not simply, “How smart is the AI?”

それは、**Can this intelligence operate under the constraints and responsibilities of the real world?** という問いになる。

Capabilityだけならdemoを見る。

Reliabilityを見るとsafety, recovery, speedが入る。

Deployabilityまで行けばmaintenance, integration, cost, throughputが入る。

**Do not automatically translate “it worked” into “it is usable.”**

その区別を持つと、Physical AIの進歩をhypeとして切り捨てず、同時に過大評価もしにくくなる。

---

## Sources / 参考文献

- NVIDIA, [フィジカル AI とは?](https://www.nvidia.com/ja-jp/glossary/generative-physical-ai/)
- Nature Machine Intelligence, [From embodied intelligence to physical AI](https://www.nature.com/articles/s42256-026-01239-3)
- Ha & Schmidhuber, [World Models](https://arxiv.org/abs/1803.10122)
- Google DeepMind, [RT-2](https://deepmind.google/blog/rt-2-new-model-translates-vision-and-language-into-action/)
- Google DeepMind, [Gemini Robotics](https://deepmind.google/models/gemini-robotics/)
- Google DeepMind, [Gemini Robotics On-Device 2 Model Card](https://deepmind.google/models/model-cards/gemini-robotics-on-device-2/)
- NVIDIA, [Isaac GR00T](https://developer.nvidia.com/isaac/gr00t)
- Physical Intelligence, [π0: Our First Generalist Policy](https://www.physicalintelligence.company/blog/pi0)
- Wang et al., [VLA datasets, benchmarks and data engines survey](https://arxiv.org/abs/2604.23001)
- Lyu et al., [ForesightSafety-VLA](https://arxiv.org/abs/2606.27079)
- Kim et al., [Object-Centric Residual RL for Zero-Shot Sim-to-Real VLA Enhancement](https://arxiv.org/abs/2606.18953)
- Arkhangelskiy, [PhAIL](https://arxiv.org/abs/2605.29710)
- Boston Dynamics, [Product Atlas announcement](https://bostondynamics.com/blog/boston-dynamics-unveils-new-atlas-robot-to-revolutionize-industry/)
- Agility Robotics, [Digit at GXO](https://www.agilityrobotics.com/content/digit-deployed-at-gxo-in-historic-humanoid-raas-agreement)
