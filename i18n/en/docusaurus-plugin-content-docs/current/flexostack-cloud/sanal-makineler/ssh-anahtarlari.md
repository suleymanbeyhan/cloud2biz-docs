---
sidebar_position: 5
title: SSH Keys
description: Creating an SSH key pair, adding it to the FlexoStack panel and using it with virtual machines.
---

SSH keys let you connect securely to your Linux servers with a cryptographic key pair instead of a password. They are far more secure against password-guessing attacks and are the recommended login method for Linux servers on FlexoStack.

A key pair has two parts:

- **Private key:** Stays on your computer and is never shared.
- **Public key:** Added to the FlexoStack panel and placed on servers.

## Creating a Key Pair

### Linux and macOS

```bash
ssh-keygen -t ed25519 -C "email@example.com"
```

The command asks for a file location and an optional passphrase. You can accept the default location. To view your public key:

```bash
cat ~/.ssh/id_ed25519.pub
```

### Windows

On Windows 10 and later, use the same command in PowerShell:

```powershell
ssh-keygen -t ed25519
Get-Content $env:USERPROFILE\.ssh\id_ed25519.pub
```

If you use PuTTY, create the key with **PuTTYgen** and copy the text in the "Public key for pasting into OpenSSH authorized_keys file" field.

:::tip Ed25519 or RSA?
Ed25519 is shorter, faster and secure, and is recommended for new keys. If you need compatibility with very old systems, create an RSA key with `ssh-keygen -t rsa -b 4096`.
:::

## Adding a Key to the Panel

1. In the panel, open **SSH keys** and click **Add key**.
2. Name the key, for example `alex-laptop`.
3. Paste the full public key (e.g. `ssh-ed25519 AAAA... email@example.com`).
4. Click **Add**.

Add only the **public key** (the contents of the `.pub` file) to the panel. Never paste your private key into the panel, an email or a support ticket.

## Using It with a Virtual Machine

When creating a virtual machine, select your key in the **Key pair** field. On first boot, cloud-init adds the key to the default user's `~/.ssh/authorized_keys` file.

:::info The key is added only at creation
The SSH key selected in the panel is added to the virtual machine only when it is first created. To add or change keys on a running server, use the method below.
:::

## Adding a Key to a Running Server

If you can connect to the server, add the new public key to `authorized_keys`:

```bash
echo "ssh-ed25519 AAAA... new-key" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

Or from your own computer:

```bash
ssh-copy-id -i ~/.ssh/new_key.pub USER@FLOATING_IP_ADDRESS
```

## If You Lost Your Private Key

Without the private key, you cannot log in with that key. To regain access:

1. If you can log in with a password via the panel [console](./sanal-makineye-baglanma.md#panel-console), add a new public key to `authorized_keys`.
2. If no password is set, use [rescue mode](./sanal-makine-yonetimi.md#rescue-mode) to mount the boot volume and add the new key to the user's `.ssh/authorized_keys` file.

## Deleting a Key

Select the key on the **SSH keys** screen and click **Delete**. Deleting a key from the panel does not remove it from servers it was added to; remove it from the `authorized_keys` files on those servers separately.
