---
sidebar_position: 1
title: Creating Virtual Machines
description: Options used when creating a FlexoStack virtual machine, resource limits and automatic configuration with cloud-init.
---

Each FlexoStack virtual machine (VM) is an independent server with its own virtual hardware. It works like a physical computer, and your applications run without modification. Although virtual machines share physical hardware, they are fully isolated from each other in terms of file system, processes and networking.

## Resource Limits

The upper limits for a single virtual machine are:

| Resource | Limit |
| --- | --- |
| RAM | 1 TiB |
| CPU | 64 vCPUs |
| Storage | 15 volumes, up to 512 TiB each |
| Network | 15 network interfaces (NICs) |

Your project's total resources are also limited by the quotas assigned to your account. Open a support ticket to request a quota increase.

## Before You Begin

Having the following ready makes things easier:

- At least one [virtual network](../ag/sanal-aglar.md) (with a [router](../ag/sanal-routerlar.md) for internet access)
- An [SSH key](./ssh-anahtarlari.md) (for Linux servers)
- A [security group](../ag/security-groups.md) that opens the required ports

## Steps

1. In the panel, open **Virtual machines** and click **Create virtual machine**.
2. Fill in the sections below and click **Deploy**.

### Name

Give the virtual machine a meaningful name, such as `web-01` or `db-prod`. On Linux images, this name is usually also used as the hostname.

### Source

Choose what the virtual machine boots from:

- **Image:** One of the ready-made operating system images (Ubuntu, Debian, Rocky Linux, AlmaLinux, Windows Server, etc.) or an image you uploaded. See [Images](./imajlar.md).
- **Volume:** A bootable volume you prepared earlier.
- **ISO:** An ISO image for installing the operating system yourself. In this case, you complete the installation through the panel console.

#### How Are the Ready-Made Images Prepared?

- **Linux:** All Linux operating system images on FlexoStack are prepared with **cloud-init**. The virtual machine is installed in a few minutes, and you can configure users, passwords, SSH keys, packages and more automatically at creation with a [Customization Script](#customization-script-cloud-init).
- **Windows:** Windows Server images are pre-installed and then generalized with **Sysprep**. When you deploy from a Sysprep image, you must **set the administrator (Administrator) password through the panel console** after the installation completes. See [Initial Password on Windows Servers](./sanal-makineye-baglanma.md#initial-password-on-windows-servers).

### Volumes

- **Boot volume:** Choose its size and disk type. The size cannot be smaller than the minimum required by the selected image.
- **Additional volumes:** Optionally add data volumes.

FlexoStack has two disk types:

| Disk type | Technology | Recommended for |
| --- | --- | --- |
| Disk High IOPS | NVMe SSD | Operating system, databases, heavy I/O |
| Disk Economy | SAS disk | Archives, backups, capacity-oriented data |

:::info Volume size can only be increased
You can extend a volume later, but you cannot shrink it. We recommend starting with the size you need and growing it over time.
:::

### Flavor (CPU and RAM)

A flavor is a template that defines the number of vCPUs and the amount of RAM. Choose one that fits your needs; you can change it later by [resizing](./sanal-makine-yonetimi.md#changing-cpu-and-ram).

### Networks

- Select the network or networks the virtual machine will connect to.
- Select one or more **security groups** for each network interface. If you do not select any, the **default** group is assigned.
- Optionally specify a fixed IP address for the interface; otherwise one is assigned via DHCP.

### SSH Key (Key Pair)

On Linux images, select the SSH key used for login. The key is added to the server only **at creation time** and cannot be changed later from the panel.

### Customization Script (cloud-init)

Because the Linux images support cloud-init, you can enter a **Customization Script** when creating a virtual machine to define user accounts, passwords and other settings automatically. The script runs automatically the first time the virtual machine boots. Cloud-init supports **cloud-config** scripts in YAML format as well as shell scripts.

**1. Open the customization script field**

On the **Create virtual machine** summary screen, click the pencil icon next to **Customization script (optional)**.

![Customization script (optional) field on the Create virtual machine summary screen](/img/flexostack/vm-customization-script.png)

**2. Enter the script**

In the **Provide a customization script** window, enter your cloud-config script (or load it from a file with **Load from file**) and click **Save**. Then click **Deploy** to create the virtual machine.

![Provide a customization script window](/img/flexostack/vm-customization-script-editor.png)

#### Example: Setting the Root Password

The following script sets the password of the `root` user, allows root login over SSH and reboots the server when it finishes:

```yaml
#cloud-config
user: root
password: password
chpasswd: {expire: False}
ssh_pwauth: True
runcmd:
  - sed -i -r 's/(#+?)PermitRootLogin(.*)/PermitRootLogin yes/g' /etc/ssh/sshd_config
power_state:
  mode: reboot
```

| Line | Description |
| --- | --- |
| `user` | The user whose password is set (`root` in the example). |
| `password` | The user's password. Replace `password` with your own strong password. |
| `chpasswd: {expire: False}` | Does not force a password change at first login. |
| `ssh_pwauth` | Enables password authentication over SSH. |
| `runcmd` | Allows root login in `sshd_config` (`PermitRootLogin yes`). |
| `power_state` | Reboots the server after the script runs (`reboot`). |

:::warning Important
In production, do not put a weak value in the `password` field; use a strong, unique password. Where possible, prefer [SSH key](./ssh-anahtarlari.md) authentication instead of passwords.
:::

#### Example: Installing Packages

```yaml
#cloud-config
package_update: true
packages:
  - nginx
  - htop
timezone: Europe/Istanbul
runcmd:
  - systemctl enable --now nginx
```

Customization scripts are used with Linux images only. On Windows servers, the initial password is set from the console after installation.

### Tags and Description

Add a description and tags to tell your virtual machines apart. Do not put passwords or personal data in the description.

## After Creation

The virtual machine becomes **Active** within a few minutes. Then:

1. Assign a [floating IP](../ag/floating-ip.md) for internet access.
2. [Connect to the virtual machine](./sanal-makineye-baglanma.md).
3. Create a [backup plan](../depolama/yedekleme.md) for important data.

## Virtual Machine Statuses

| Status | Meaning |
| --- | --- |
| **Building / Deploying** | The virtual machine is being created. |
| **Active** | Running. |
| **Shut off** | Powered off. |
| **Paused / Suspended** | Paused or suspended. |
| **Shelved** | Shelved; CPU and RAM released, volumes kept. |
| **Rescue** | Booted in rescue mode. |
| **Error** | An error occurred. See [Troubleshooting](./sanal-makine-yonetimi.md#troubleshooting). |
