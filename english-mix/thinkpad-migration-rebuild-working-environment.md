---
id: thinkpad-migration-rebuild-working-environment
title: "ThinkPadへの移行で、本当に移すべきものはファイルではない――rebuild the working environment, not the old PC"
subtitle: "TrackPoint, Fn/Ctrl, Lenovo Vantage, Windows Backup, WinGetまで。Migrationを「copy」から「reproducible setup」へ変える"
created: "2026-10-01"
updated: "2026-10-01"
type: "リサーチエッセイ"
status: "完成"
tags: ["ThinkPad", "PC migration", "Windows 11", "working environment", "Lenovo Vantage", "TrackPoint"]
keywords: ["ThinkPad setup", "PC migration", "TrackPoint", "Fn Ctrl swap", "Lenovo Vantage", "Windows Backup", "WinGet", "battery charge threshold"]
grow: 5
abstract: "Moving to a ThinkPad is not mainly a file-copy problem. It is a reconstruction problem across five layers: data, credentials, apps, local environments, and physical/hardware behavior. This essay checks TrackPoint, Fn/Ctrl swap, Lenovo Vantage, battery thresholds, Windows Backup, WinGet, and passkeys against primary documentation, then reframes migration as designing a reproducible working environment rather than cloning the old machine."
---

# ThinkPadへの移行で、本当に移すべきものはファイルではない
## rebuild the working environment, not the old PC

ThinkPadに初めて触ると、the first strange object is usually the red nub in the middle of the keyboard. トラックポイント（TrackPoint）。It looks like the obvious symbol of the machine, so you touch it, the pointer moves, and the mystery seems solved.

But on supported ThinkPads, hold the center button and push the TrackPoint to scroll vertically or horizontally. Add Ctrl and compatible apps can zoom. On some models, double-tapping the TrackPoint opens the トラックポイント・クイック・メニュー（TrackPoint Quick Menu） for camera, microphone, battery, and other controls. A tiny red stick turns out to be carrying more workflow than its size suggests.

It would be easy to turn this into a list of “ThinkPad tricks.” でも、他のPCから移る人にとって本当の問題は、tricksの数ではない。Files are relatively easy to see. What disappears during migration is often invisible: muscle memory, silent authentication, accumulated apps, local-only settings, and the way power or peripherals were handled without conscious thought.

**PC migration is less like moving boxes and more like rediscovering the conditions under which work used to happen.**

ThinkPad is unusually good at exposing those conditions. Input devices, keyboard behavior, battery rules, firmware, and hardware settings are visible and adjustable. So this essay uses ThinkPad-specific details as an entrance to a larger idea: migration should be treated not as cloning the old PC, but as **rebuilding a reproducible working environment**.

> **Information date: 2026-10-01**
>
> ThinkPad features vary by generation, series, and configuration. TrackPoint Quick Menu, keyboard backlight, Fn/Ctrl swap, and charge-threshold controls are not guaranteed to exist or behave identically on every model. 本稿はLenovoの複数機種向け公式資料からcommon patternsを整理し、individual featuresは自分の機種のUser Guideとレノボ・バンテージ（Lenovo Vantage）で確認する前提にする。

## 1. 最初に移すべきはdataではなく「手の地図」である

<!-- level:4 role:claim -->
Moving from another PC to a ThinkPad, friction often begins in your fingers before it appears in any spec sheet. Ctrlを押すつもりで小指が迷う。You hit F1–F12 and change volume instead. Your right hand keeps leaving the keyboard for the touchpad. Each miss is tiny, but repeated dozens of times, it becomes the vague judgment that “this new PC feels worse.” So the first migration target is not storage or CPU. It is the mapping between body and input.

ThinkPad gives you more control over that mapping than many users realize. On supported models, Fn and Ctrl functions can be swapped through UEFI/BIOS, Lenovo Keyboard Manager, or Lenovo Vantage. FnLock changes whether the top row behaves as special controls or standard F1–F12 keys. Some backlit keyboards use Fn+Space to change illumination. The point is not “adapt yourself to ThinkPad defaults.” It is to compare your existing muscle memory with the settings the machine can change, then decide deliberately which side should move.

But copying old habits without thought is not automatically correct either. Fn/Ctrl swap may reduce friction on one personal machine, while becoming confusing if you regularly use several ThinkPads with the standard layout. 逆に、一台を長く自分専用で使うなら、muscle memoryを優先するほうが合理的な場合もある。There is no universal best setting; the real decision is what you want to define as your reference environment.

At that point migration changes meaning. **You are not merely making the new PC resemble the old one; you are writing down what “normal” means for your own work.**

参照：[Lenovo「FnキーとCtrlキーの機能を入れ替える」](https://support.lenovo.com/by/en/solutions/ht074187-how-to-swap-the-fn-function-and-ctrl-control-keyboard-keys-in-bios) ／ [ThinkPad X1 Carbon Gen 13 User Guide, keyboard shortcuts](https://download.lenovo.com/manual/thinkpad_x1_carbon_gen13/user_guide/en/Use_the_keyboard_shortcuts.html)

## 2. TrackPointは「small mouse」ではなく、hand travelを変える装置である

<!-- level:4 role:claim -->
If you treat TrackPoint as a smaller substitute for the touchpad, its appeal is hard to see. Moving a pointer is not a unique capability. The interesting part is that your hands can stay close to the home row while switching among typing, pointing, and scrolling. The gain is not one dramatic fast action; it appears in how often your hands stop commuting between input surfaces.

Lenovo's user guide says pointer speed changes with the pressure applied to the TrackPoint. Hold the center button and push the stick to scroll vertically or horizontally; add Ctrl and compatible apps can zoom. On supported models, TrackPoint Quick Menu can expose camera, microphone, voice typing, battery, audio, and related controls from a double-tap. つまり「pointer device」が、small control hubへ広がっている。

Trying to use TrackPoint for everything on day one is usually slower. So here is one small experiment: **spend ten minutes without moving your hand to the touchpad**. Read a document, open links, scroll a long page, zoom once. Do not measure whether you are “good at TrackPoint.” Measure only which hand movements disappear. If nothing improves, go back. Convenience should be tested against your work, not accepted as a brand ritual.

That experiment reveals the larger point. **A tool is valuable not because it has many functions, but because it lowers the switching cost between actions.**

参照：[ThinkPad P1 Gen 8 / T1g Gen 8 User Guide, TrackPoint pointing device](https://download.lenovo.com/manual/thinkpad_p1_gen8_t1g_gen8/user_guide/en/Use_the_TrackPoint_pointing_device.html) ／ [ThinkPad E14 Gen 7 / E16 Gen 3 User Guide, TrackPoint Quick Menu](https://support.lenovo.com/jp/ja/documentation/SG10064/TrackPoint_Quick_Menu?language=en)

## 3. ThinkPadらしさは、Lenovo Vantageを開くと急に見えてくる

<!-- level:4 role:claim -->
On a new PC, finishing Windows Update can feel like finishing setup. But ThinkPad has another layer: hardware settings and updates managed by Lenovo rather than by Windows alone. If you never look at that layer, you may move to a ThinkPad while barely touching what is specific to the machine.

レノボ・コマーシャル・バンテージ（Lenovo Commercial Vantage） and related Vantage apps can, on supported systems, handle UEFI/BIOS, firmware and driver updates, hardware settings, system health, diagnostics, and warranty information. Some models also expose battery charge thresholds, letting users choose not to keep the battery at 100% all the time. Lenovo describes these controls as ways to support battery longevity by avoiding unnecessary short recharge cycles or limiting charge levels.

The important move is not “turn everything on.” A commuter who regularly drains the battery has different needs from someone docked to AC power all day. Camera and microphone enhancements matter differently to meeting-heavy and meeting-light users. Vantage is more useful when treated not as a feature showroom but as **a control surface where you tell the hardware how you actually use it**.

UEFI/BIOS updates also show why this layer deserves care. Lenovo notes that the screen may go blank during some update or memory-retraining processes and warns users not to interrupt them. Hardware-near updates should be treated as a procedure: connect power, save work, confirm the package, then update. The closer the setting is to hardware, the more convenience and caution live together.

So opening Vantage early is not mainly about “getting the latest drivers.” **It is how you discover the second setup layer that Windows Settings cannot fully show you.**

参照：[Lenovo Commercial Vantage](https://download.lenovo.com/manual/thinkpad_l14g5_l16g1/ug/html_en/en/The_Vantage_app.html) ／ [Lenovo Battery Charge Threshold](https://support.lenovo.com/ax/en/videos/nvid500286) ／ [Lenovo「バッテリーのQ&A」](https://support.lenovo.com/jp/ja/solutions/ht509084-battery-qa) ／ [Lenovo Update UEFI BIOS](https://download.lenovo.com/pccbbs/pubs/ts_p5/ug/html_en/en/Update_UEFI_BIOS.html)

## 4. “Move my PC”を一つのtaskにすると、必ず何かを落とす

<!-- level:4 role:claim -->
Ask what moved from the old PC and people often answer with three buckets: files, apps, settings. But a real working environment is built from layers with very different transfer rules. Calling all of them “migration” hides the boundary between what moved and what merely looked familiar.

This essay separates migration into five layers.

- **Data layer**：documents, images, videos, downloads, local files
- **Credential layer**：Microsoft account, browser sign-ins, password managers, passkeys, Windows Hello, VPN, work accounts
- **App layer**：installed software, licenses, plug-ins, extensions
- **Environment layer**：Git, SSH keys, WSL, developer tools, dictionaries, templates, detailed app settings
- **Body/hardware layer**：keyboard layout, FnLock, TrackPoint, touchpad sensitivity, charging, external displays, docks

Even Microsoft's native Windows tools do not move these layers in the same way. The Windows 11 PC-to-PC transfer experience copies files and some settings/personalization, but Microsoft explicitly excludes installed applications, saved passwords/sign-in credentials, and system areas. Windows Backup can remember apps and settings to help restore a familiar experience, but it is not a byte-for-byte transfer of the old execution environment.

Authentication is more device-bound than it looks. Windows Hello PIN is associated with a device. A device-bound passkey may need to be created again on the new PC, while a passkey stored in a synced credential manager can follow the account. BitLocker recovery keys are another trap: if you do not know where the recovery key is before migration, you can end up with data that exists but cannot be opened.

Once the five layers are visible, “migration complete” becomes stricter. **Seeing your files is only one partial success; being able to resume the work is the actual completion condition.**

参照：[Microsoft, Transfer your files and settings to a new Windows PC](https://support.microsoft.com/en-us/windows/experience/backup-recovery/transfer-your-files-and-settings-to-a-new-windows-pc) ／ [Microsoft, Back up and restore with Windows Backup](https://support.microsoft.com/en-us/windows/experience/backup-recovery/back-up-and-restore-with-windows-backup) ／ [Microsoft, Configure Windows Hello](https://support.microsoft.com/en-us/windows/security/configure-windows-hello) ／ [Microsoft, Manage your saved passkeys](https://support.microsoft.com/en-us/accounts-billing/security/manage-your-saved-passkeys) ／ [Microsoft, Back Up Your BitLocker Recovery Key](https://support.microsoft.com/en-us/windows/security/encryption/back-up-your-bitlocker-recovery-key)

## 5. Old PCのperfect copyより、「rebuildできるもの」を残す

<!-- level:4 role:claim -->
The most reassuring migration is the one that recreates the same desktop, the same apps, the same arrangement. But perfect copies have a hidden cost: unused apps, stale settings, mystery startup utilities, and years of accidental history can all survive. You buy a new machine and preserve the old machine's sediment.

A better model is reconstruction instead of cloning. Windows Package Manager, ウィンゲット（WinGet）, can export recognized installed applications to JSON and import that list on another PC. It is not perfect. Microsoft notes that apps that cannot be matched to an available package source produce warnings. But that imperfection is useful: anything not reproducible automatically becomes an exception you can inspect.

```powershell
winget export -o apps.json
winget import -i apps.json --ignore-unavailable
```

Do not treat `apps.json` as an unquestionable restore command. Open it once and ask, “Do I still use this?” Remove software you have not used for months, duplicated tools, or things a browser now replaces. Migration becomes a forced inventory rather than a preservation ritual.

For people who code or maintain small tools, go one layer deeper. WSL supports `wsl --export` and `wsl --import` to move distributions. GitHub SSH access requires confirming keys and account registration on the new PC. At that point, the valuable state is no longer “identical to the old machine.” It is **a state you can rebuild after failure**.

An environment that has to be remembered from scratch every time is fragile even if it feels familiar. **Once a migration leaves a reproducible procedure behind, the setup becomes more truly yours than a perfect but unexplained clone.**

参照：[Microsoft Learn, winget export](https://learn.microsoft.com/en-us/windows/package-manager/winget/export) ／ [Microsoft Learn, winget import](https://learn.microsoft.com/en-us/windows/package-manager/winget/import) ／ [Microsoft Learn, WSL basic commands](https://learn.microsoft.com/en-us/windows/wsl/basic-commands) ／ [GitHub Docs, Adding a new SSH key](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account?platform=windows)

## 6. いちばん危険なのは、“I thought it was synced”である

<!-- level:4 role:claim -->
The files most likely to surprise you are not always the obviously local ones. The dangerous category is information you assume is “probably in the cloud.” Because you stopped thinking about where it lives, you only discover the missing dependency after the old machine is gone.

Browsers are a clean example. Microsoft Edge can sync favorites, passwords, history, extensions, settings, tabs, and more when the user is signed in and sync is enabled. Google Chrome similarly lets account users save bookmarks, passwords, extensions, web apps, and settings. But “I used the browser” is not the same statement as “the profile was synced.” Multiple profiles, disabled work-profile sync, or locally stored credentials can create exceptions.

So before migration, verify data by **recovery path**, not by storage label. Do not stop at “this file is in OneDrive”; sign in on the new PC and open it. Do not stop at “I use a password manager”; unlock the vault on the new machine. Do not stop at “I have two-factor authentication”; confirm you can approve a login without the old PC. A backup existing somewhere is not the same thing as a successful restore.

Push the idea to an extreme and it becomes a useful test: **assume the old PC fails right now. Can the new ThinkPad start today's work by itself?** Every place where you stop is an un-migrated dependency.

Sync does not mean “stored somewhere.” **It means you can return to the same work from another device, and you have actually verified that return path.**

参照：[Microsoft Edge, Change and customize sync settings](https://support.microsoft.com/en-us/edge/change-and-customize-sync-settings-in-microsoft-edge) ／ [Google Chrome「すべてのデバイスで同じブックマーク、パスワード、その他の設定を利用する」](https://support.google.com/chrome/answer/165139?hl=ja)

## 7. Proposal: make migration a 72-hour staged cutover

<!-- level:4 role:claim -->
If you put the old PC away on delivery day, migration becomes a memory exam. You configure whatever you remember, then reopen the old machine every time something is missing. That is not a controlled transition; it is dependency discovery in production. A better approach is to reduce the old PC's role in stages.

- **0–3 hours: foundation** — Windows Update, Vantage, UEFI/BIOS/firmware/drivers, Windows Hello, browser, password manager, cloud sync
- **3–12 hours: body** — Fn/Ctrl, FnLock, TrackPoint, touchpad, keyboard backlight, display scaling, external displays
- **Day 1: work** — daily apps, VPN, meetings, printers, fonts, dictionaries, templates
- **Day 2: exceptions** — Git, SSH, WSL, local data, special licenses, old peripherals, organization-specific tools
- **Day 3: disconnect test** — spend one day without powering on the old PC and add every blockage to the migration ledger

There is no scientific magic in “72 hours.” The point is the order: **foundation → body → work → exceptions → disconnect**. A giant copy hides dependencies. A staged cutover makes them visible because the old machine is gradually moved farther away.

And this logic is not unique to ThinkPad. ThinkPad simply makes the layering easier to notice because its own input and hardware controls demand an explicit setup step. The red nub looks far away from migration theory, but it is actually a good doorway.

**Learning a new PC is not patiently accepting the machine's habits. It is redrawing the boundary between your habits and the machine's behavior.**

## 8. Proposal: write the migration ledger with five verbs, not a list of nouns

<!-- level:4 role:claim -->
A checklist that says “Chrome / Excel / Photos” proves only that you remembered the nouns. A more useful ledger records what action will reproduce each item. Verbs preserve the recovery method.

Use five verbs.

- **Sync**：OneDrive, browser data, cloud notes
- **Reinstall**：apps recoverable through WinGet or official installers
- **Reissue**：Windows Hello, device-bound passkeys, VPN certificates, SSH keys
- **Rebuild**：WSL, development environments, dictionaries, templates, complex settings
- **Discard**：unused apps, stale settings, duplicates, unexplained startup software

This turns “not migrated” into a possible success instead of an automatic failure. Removing an old dependency can be a design decision. At the same time, a credential that actually requires reissue becomes visible before you incorrectly label it “sync.”

Add one line called “verification” to each item and the ledger becomes an acceptance test. “VPN: reissue / complete when internal site opens.” “Chrome: sync / confirm bookmarks and extensions.” “TrackPoint: reconfigure / complete when a long document scrolls comfortably with the center button.” Migration stops depending on memory and starts depending on evidence.

**A good migration ledger is not an inventory of possessions. It is a small design document for regenerating your working environment on the next machine.**

## 9. Before wiping the old PC, run a day of work—not a spec checklist

<!-- level:4 role:claim -->
Final checks often ask whether all files exist and all apps are installed. That is insufficient because work is not a set of components; it is a sequence connecting them. The last migration test should run the sequence, not inspect the parts.

Start the morning. Unlock with face or fingerprint. Open the browser. Edit a cloud document. Join a meeting with camera and microphone. Connect an external display. Export a PDF. Attach it in chat. Enter VPN if needed. Push a Git change. Unplug power and leave. Running the “script of a day” reveals failures that isolated checks miss.

ThinkPad-specific choices finally become meaningful here. Do you actually use TrackPoint? Is the Fn/Ctrl decision still comfortable? Does the charge threshold fit your mobility pattern? Did Vantage updates finish? Does the dock or external monitor wake correctly? A feature becomes useful only after it survives contact with the routine.

Only after this acceptance test has passed for a few days should the old PC be wiped. Check BitLocker recovery keys, cloud sync, local-only data, license deactivation, and anything that still requires the old machine.

At that point migration leaves something more valuable than a finished new PC. **You have decomposed the hidden assumptions behind your work and rebuilt them once. The next failure, replacement, or second device becomes less frightening because the environment is no longer mysterious.**

## 10. Moving to ThinkPad does not mean “use it like a ThinkPad person”

<!-- level:5 role:implication -->
Back to the red nub.

TrackPoint is a ThinkPad symbol, but you are allowed not to use it. You can swap Fn/Ctrl or leave them alone. You can charge to 100% on days when you need the range. The goal is not to activate every feature because “this is what ThinkPad users do.”

Before the research, ThinkPad migration looked like a collection of ThinkPad-specific setup tips. After the research, the picture is different. ThinkPad exposes layers that ordinary PC use often keeps invisible: input, power, firmware, and pointing behavior. That makes it unusually good at forcing the question, “What is my working environment actually made of?”

What comes back through Windows Backup? What does not? Which credentials are device-bound? Which apps can be reinstalled automatically? Which motions are stored in your hands? How do you actually use the battery? Once these questions are separated, the goal stops being recreation of the old computer.

**What really needs to move is not the old PC's state. It is the method that lets you reproduce your work without the old PC.**

The red nub was a strangely good entrance to that idea. In the middle of the new machine sits one unfamiliar control that your old machine did not have. It forces a small pause.

What do I bring forward? What do I discard? What do I learn anew?

Once those three decisions are explicit, “migration” becomes something more useful: **design**.

### Main sources

- [Lenovo Support, Fn and Ctrl key swap](https://support.lenovo.com/by/en/solutions/ht074187-how-to-swap-the-fn-function-and-ctrl-control-keyboard-keys-in-bios)
- [Lenovo ThinkPad User Guide, TrackPoint pointing device](https://download.lenovo.com/manual/thinkpad_p1_gen8_t1g_gen8/user_guide/en/Use_the_TrackPoint_pointing_device.html)
- [Lenovo ThinkPad User Guide, TrackPoint Quick Menu](https://support.lenovo.com/jp/ja/documentation/SG10064/TrackPoint_Quick_Menu?language=en)
- [Lenovo Commercial Vantage](https://download.lenovo.com/manual/thinkpad_l14g5_l16g1/ug/html_en/en/The_Vantage_app.html)
- [Lenovo Battery Q&A](https://support.lenovo.com/jp/ja/solutions/ht509084-battery-qa)
- [Microsoft, Transfer your files and settings to a new Windows PC](https://support.microsoft.com/en-us/windows/experience/backup-recovery/transfer-your-files-and-settings-to-a-new-windows-pc)
- [Microsoft, Back up and restore with Windows Backup](https://support.microsoft.com/en-us/windows/experience/backup-recovery/back-up-and-restore-with-windows-backup)
- [Microsoft, Manage your saved passkeys](https://support.microsoft.com/en-us/accounts-billing/security/manage-your-saved-passkeys)
- [Microsoft Learn, winget export](https://learn.microsoft.com/en-us/windows/package-manager/winget/export)
- [Microsoft Learn, winget import](https://learn.microsoft.com/en-us/windows/package-manager/winget/import)
- [Microsoft Learn, WSL basic commands](https://learn.microsoft.com/en-us/windows/wsl/basic-commands)
