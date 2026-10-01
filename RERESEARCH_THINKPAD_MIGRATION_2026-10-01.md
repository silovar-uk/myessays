# Re-research / factual audit: ThinkPad migration article

Date: 2026-10-01  
Article ID: `thinkpad-migration-rebuild-working-environment`

## Why a second pass was needed

The first research pass made several useful features sound broader than the source material supports. This pass narrows model-dependent claims, separates Windows Backup from direct PC-to-PC transfer, and checks which ideas are editorial proposals rather than documented best practices.

## Corrections and qualifications

### TrackPoint Quick Menu
Correction:
- Do not write as if every ThinkPad opens a Quick Menu by double-tapping TrackPoint.
- Use “compatible models” / “on supported models.”
- Fn+G behavior should not be generalized unless the model guide confirms it.

Checked against:
- https://support.lenovo.com/jp/ja/documentation/SG10064/TrackPoint_Quick_Menu?language=en

### Fn/Ctrl swap
Correction:
- Treat the swap as a supported option on compatible systems, with method varying by model/software.
- Do not imply every generation exposes the same control surface.

Checked against:
- https://support.lenovo.com/by/en/solutions/ht074187-how-to-swap-the-fn-function-and-ctrl-control-keyboard-keys-in-bios

### Keyboard backlight
Correction:
- State “on backlit-keyboard models” rather than treating Fn+Space as universally available.

### Battery threshold
Correction:
- The article must not prescribe an arbitrary fixed number such as 80% as universally optimal.
- Say that supported systems can expose a charge threshold and that an appropriate choice depends on whether the machine spends its life on AC power or frequently needs full portable capacity.

Checked against:
- https://support.lenovo.com/ax/en/videos/nvid500286
- https://support.lenovo.com/jp/ja/solutions/ht509084-battery-qa

### UEFI/BIOS and firmware
Correction:
- Updates are presented as a managed procedure: connect power, save work, review the update, and do not interrupt the process.
- Avoid framing firmware updates as a casual “always press update immediately” rule.

### Windows PC-to-PC transfer versus Windows Backup
Correction:
- Direct transfer and Windows Backup are related migration paths but not interchangeable.
- Direct transfer does not carry installed apps or saved passwords/sign-in credentials as if cloning a disk.
- Windows Backup can preserve app lists/preferences and selected settings, but restoration still involves reinstalling apps and re-establishing some credentials.

Checked against:
- https://support.microsoft.com/en-us/windows/experience/backup-recovery/transfer-your-files-and-settings-to-a-new-windows-pc
- https://support.microsoft.com/en-us/windows/experience/backup-recovery/back-up-and-restore-with-windows-backup

### Passkeys
Correction:
- Distinguish device-bound passkeys from synchronized passkeys.
- Do not say “passkeys do not migrate” as a general rule.

Checked against:
- https://support.microsoft.com/en-us/accounts-billing/security/manage-your-saved-passkeys

### WinGet export
Correction:
- Do not promise an exhaustive inventory.
- Export attempts to match installed applications to available package sources and warns about unmatched packages.
- The article therefore treats unmatched software as an exception queue rather than a failure of the model.

Checked against:
- https://learn.microsoft.com/en-us/windows/package-manager/winget/export
- https://learn.microsoft.com/en-us/windows/package-manager/winget/import

### WinGet Configuration
Correction:
- Add the 2026-current WinGet Configuration path as a more complete desired-state option beyond package-list export/import.
- Keep export/import as the simpler migration path, while identifying Configuration as the stronger reproducibility mechanism.

Checked against:
- https://learn.microsoft.com/en-us/windows/package-manager/winget/configure

### WSL / Git / SSH
Correction:
- Keep these in an “advanced / if relevant” layer rather than implying every reader needs them.
- WSL export/import is documented; SSH key handling remains its own credential concern.

Checked against:
- https://learn.microsoft.com/en-us/windows/wsl/basic-commands
- https://docs.github.com/en/authentication/connecting-to-github-with-ssh

### 72-hour staged cutover
Correction:
- This is not a Lenovo or Microsoft recommendation.
- State explicitly that 72 hours has no scientific necessity. The useful part is the ordered exposure of dependencies: foundation → body → work → exceptions → old-PC-off test.

## Japanese-language audit

Policy:
- In the canonical Japanese article, technical names are introduced in Japanese with the original English form in parentheses where that improves identification.
- After first introduction, Japanese forms are preferred.
- Command names, package names, code, URLs, and official source titles may retain English where fidelity requires it.
- Avoid stray English nouns functioning as untranslated prose.

Examples:
- トラックポイント（TrackPoint）
- レノボ・バンテージ（Lenovo Vantage）
- ウィンドウズ・バックアップ（Windows Backup）
- ウィンゲット（WinGet）
- ウィンドウズ・ハロー（Windows Hello）
- ビットロッカー（BitLocker）
- ワンドライブ（OneDrive）
- マイクロソフト・エッジ（Microsoft Edge）
- グーグル・クローム（Google Chrome）
- セキュア・シェル（SSH）

## Result

The second pass does not change the article’s thesis. It makes the thesis more defensible: ThinkPad-specific features are examples of a configurable hardware layer, while the migration framework is explicitly an editorial synthesis built on documented platform behavior.
