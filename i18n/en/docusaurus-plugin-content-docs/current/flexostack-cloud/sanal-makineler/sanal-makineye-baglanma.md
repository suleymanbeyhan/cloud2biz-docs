---
sidebar_position: 2
title: Connecting to Virtual Machines
description: Connecting to FlexoStack virtual machines via the panel console, SSH and RDP, and setting passwords.
---

You can connect to your virtual machine in three ways: the **console** in the panel, **SSH** for Linux and **Remote Desktop (RDP)** for Windows.

## Panel Console

The console gives you direct access to the virtual machine's screen from your browser. It works even without network connectivity or a working SSH service, which makes it ideal for installation and troubleshooting.

1. On the **Virtual machines** screen, select the virtual machine.
2. Click **Console**.

To log in on the console, the operating system needs a user with a password. Linux servers created with an SSH key have no password by default; see [Setting a password](#setting-a-password) below.

## Connecting via SSH (Linux)

To connect via SSH:

- The virtual machine must have a [floating IP](../ag/floating-ip.md) (or you connect from another server on the same private network).
- TCP port **22** must be open to your IP address in the security group.
- The private key matching the SSH key selected at creation must be on your computer.

```bash
ssh -i ~/.ssh/id_ed25519 USER@FLOATING_IP_ADDRESS
```

The default user name depends on the image:

| Image | Default user |
| --- | --- |
| Ubuntu | `ubuntu` |
| Debian | `debian` |
| Rocky Linux | `rocky` |
| AlmaLinux | `almalinux` |
| CentOS Stream | `cloud-user` or `centos` |

For images you uploaded, the user name depends on the image configuration.

### SSH from Windows

On Windows 10 and later, the `ssh` command is available in PowerShell. Alternatively, use PuTTY or MobaXterm.

## Connecting via RDP (Windows)

1. Open TCP port **3389** in the security group to your own IP address only.
2. Assign a floating IP to your Windows virtual machine.
3. Open **Remote Desktop Connection** on your computer and enter the floating IP.
4. Log in as `Administrator` with the password you set from the console after installation. See [Initial Password on Windows Servers](#initial-password-on-windows-servers).

:::warning Do not open RDP to everyone
Opening port 3389 to `0.0.0.0/0` exposes your server to constant password-guessing attacks. Restrict access to your own IP addresses only.
:::

## Setting a Password

### At Creation (cloud-init)

When creating a Linux virtual machine, add a configuration like the following in the **Customization script** field. For details and a root password example, see [Customization Script](./sanal-makine-olusturma.md#customization-script-cloud-init):

```yaml
#cloud-config
password: AStrongPassword!2026
chpasswd:
  expire: false
ssh_pwauth: false
```

`ssh_pwauth: false` keeps password login over SSH disabled, so the password is used only for console login. This is the recommended secure configuration.

### Initial Password on Windows Servers

Windows Server images are generalized with Sysprep, so when the virtual machine first starts, Windows setup waits for you to set the administrator password as its final step:

1. After the virtual machine becomes **Active**, open it in the panel and connect with **Console**.
2. Confirm the region, language and keyboard settings on the setup screen.
3. Set a strong password for the `Administrator` user and enter it again.
4. When setup finishes, log in with this password from the console or via [RDP](#connecting-via-rdp-windows).

:::tip
You cannot connect via RDP until the password is set. Keep your password in a safe place.
:::

### On a Running Server

After connecting via SSH, change the password from inside the operating system:

```bash
sudo passwd ubuntu
```

For virtual machines with guest tools installed, the panel may also offer a **Set password** option, which lets you set a user's password inside the operating system without connecting to the server.

## If You Cannot Connect

1. Check that the virtual machine status is **Active**.
2. Check that the floating IP is assigned to the correct virtual machine.
3. Check that the relevant port (22 or 3389) is open in the security group and that the source IP is correct.
4. Check the firewall inside the server (ufw, firewalld, Windows Firewall) via the panel console.
5. If the problem persists, see [Troubleshooting](./sanal-makine-yonetimi.md#troubleshooting) or open a support ticket.
