# Research: ThinkPad migration as reconstruction of a working environment

Date: 2026-10-01  
Target article ID: `thinkpad-migration-rebuild-working-environment`

## Research question

When moving from another PC to a ThinkPad, what is genuinely ThinkPad-specific, and what migration work is easy to miss if the task is treated as a simple file copy?

The working thesis is that a PC migration is not mainly a data-transfer problem. It is the reconstruction of the conditions under which work was possible: physical input habits, device-bound authentication, applications, local environments, hardware settings, and recovery paths.

## Primary-source findings

### 1. Fn/Ctrl is a configurable body–device boundary

Lenovo documents Fn/Ctrl function swapping on compatible ThinkPad systems through BIOS/UEFI, Lenovo Keyboard Manager, or Lenovo Vantage depending on model. The relevant user guide must still be checked because availability varies by system.

Source:
- https://support.lenovo.com/by/en/solutions/ht074187-how-to-swap-the-fn-function-and-ctrl-control-keyboard-keys-in-bios

Implication:
- The useful migration question is not “What is the ThinkPad-standard layout?” but “Which layout should become my cross-device standard?”

### 2. TrackPoint is more than pointer motion

Lenovo user guides document pressure-sensitive pointer movement, scrolling with the center button, and in some configurations zooming while holding Ctrl. Compatible models can also expose a TrackPoint Quick Menu through a double tap.

Sources:
- https://download.lenovo.com/manual/thinkpad_p1_gen8_t1g_gen8/user_guide/en/Use_the_TrackPoint_pointing_device.html
- https://support.lenovo.com/jp/ja/documentation/SG10064/TrackPoint_Quick_Menu?language=en

Implication:
- The relevant unit is not feature count but hand travel and task-switching cost. A ten-minute “no touchpad” experiment is therefore more informative than memorizing a feature list.

### 3. Lenovo Vantage exposes a second configuration layer below Windows

Lenovo Commercial Vantage documentation describes hardware settings, diagnostics, support information, and updates including UEFI BIOS, firmware, and drivers. Lenovo also documents battery charge thresholds on supported systems.

Sources:
- https://download.lenovo.com/manual/thinkpad_l14g5_l16g1/ug/html_en/en/The_Vantage_app.html
- https://support.lenovo.com/ax/en/videos/nvid500286
- https://support.lenovo.com/jp/ja/solutions/ht509084-battery-qa

Implication:
- “Windows setup complete” is not the same as “ThinkPad setup complete.” The migration has an OS layer and a hardware-management layer.

### 4. Windows migration mechanisms do not move all dependency types

Microsoft’s current Windows PC transfer documentation says the process can transfer files and certain settings/personalization, but not installed applications, saved passwords/sign-in credentials, system OS files, or BitLocker-encrypted drives unless handled appropriately. Windows Backup can remember files, settings, credentials-related configuration, and an application list, but it is not a disk image of the old execution environment.

Sources:
- https://support.microsoft.com/en-us/windows/experience/backup-recovery/transfer-your-files-and-settings-to-a-new-windows-pc
- https://support.microsoft.com/en-us/windows/experience/backup-recovery/back-up-and-restore-with-windows-backup

Implication:
- “Migration” should be decomposed into at least data, authentication, applications, local environment, and body/hardware layers.

### 5. Authentication is partly device-bound

Microsoft documents Windows Hello PIN as device-associated. For passkeys, a device-bound passkey needs to be created again for the new device, while passkeys stored in a synchronizing credential manager can follow the signed-in account. BitLocker recovery keys are separate recovery assets whose location should be confirmed before decommissioning the old PC.

Sources:
- https://support.microsoft.com/en-us/windows/security-and-privacy/passkeys/windows-hello-and-passwordless-sign-in
- https://support.microsoft.com/en-us/accounts-billing/security/manage-your-saved-passkeys
- https://support.microsoft.com/en-us/windows/finding-your-bitlocker-recovery-key-in-windows

Implication:
- “I can sign in today” is not an adequate migration check. The test is whether the same access can be recovered without the old machine.

### 6. Rebuildability can be captured as data

Microsoft’s WinGet documentation supports exporting recognized installed packages to JSON and importing that list on another machine. Export can warn when installed software has no match in the available sources, which means the export is useful but not exhaustive.

Sources:
- https://learn.microsoft.com/en-us/windows/package-manager/winget/export
- https://learn.microsoft.com/en-us/windows/package-manager/winget/import

Implication:
- A partial, inspectable reconstruction recipe is often safer than opaque cloning because exceptions become visible and obsolete software can be intentionally discarded.

### 7. Advanced local environments need separate handling

Microsoft documents WSL export/import. GitHub’s SSH documentation makes clear that SSH authentication depends on a private key held on the device and a corresponding public key registered to the account.

Sources:
- https://learn.microsoft.com/en-us/windows/wsl/basic-commands
- https://docs.github.com/en/authentication/connecting-to-github-with-ssh

Implication:
- Developers and tool-builders should treat environment reconstruction as a distinct layer rather than assuming “apps restored” means “work restored.”

## Editorial hypotheses produced by the research

1. The oddest useful entry point is the red TrackPoint nub: conspicuous, tactile, and apparently trivial, yet it reveals that migration includes the body.
2. The article should move from “ThinkPad tips” to “migration architecture,” not the other way around.
3. A five-layer model makes omissions legible:
   - data
   - authentication
   - applications
   - local environment
   - body/hardware
4. A five-verb migration ledger is more actionable than a noun checklist:
   - synchronize
   - reinstall
   - reissue
   - rebuild
   - discard
5. The final acceptance test should be an ordinary workday performed without powering on the old PC.

## Evidence boundaries

- ThinkPad features vary by model, generation, operating-system image, and installed Lenovo software.
- No universal battery-charge threshold is recommended in the article.
- The proposed 72-hour staged cutover is an editorial operating heuristic, not a research-backed optimum.
- WinGet does not guarantee that every installed application can be exported or restored.
- Browser sync only restores what was actually signed into and configured to sync.
