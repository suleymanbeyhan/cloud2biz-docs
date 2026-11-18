---
sidebar_position: 4
title: Images
description: Ready-made operating system images on FlexoStack, uploading your own image or ISO file, and creating an image from a volume.
---

An image is a ready-made disk template used to boot a new virtual machine. On FlexoStack, you can use ready-made operating system images, upload your own images, or create an image from an existing server.

## Ready-Made Images

The **Images** screen in the panel lists all images available in your project. Ready-made images are provided and kept up to date by Cloud2Biz. They usually include cloud-init and guest tools, so features such as SSH keys and user data work out of the box.

## Supported Formats

| Format | Description |
| --- | --- |
| **QCOW2** | Recommended. A compressed disk image in which free space takes no room. |
| **RAW** | A raw disk image. |
| **ISO** | An installation CD/DVD image, used to install an operating system yourself. |
| **VMDK / VHD(X)** | Disks from other virtualization platforms. We recommend converting them to QCOW2 before uploading. |

## Uploading an Image

1. On the **Images** screen, click **Add image**.
2. Select the file from your computer, or enter a URL to download the image from.
3. Name the image and select the correct **operating system type**. This ensures the virtual machine boots with suitable virtual hardware and drivers.
4. Start the upload. Large files may take a while depending on your internet connection.

:::tip Use a URL for large images
For images larger than a few GB, placing the image at an internet-accessible address and adding it by URL is much faster than uploading from your computer. For example, you can add Ubuntu's official cloud images directly by URL.
:::

For custom images you cannot upload from the panel, open a support ticket after ordering and our team will help you add your image.

## Preparing Your Own Image

For your own images to work smoothly on FlexoStack:

- **VirtIO drivers** must be installed. Linux distributions include them; for Windows, add the VirtIO drivers to the image.
- With **cloud-init** (Linux) or **cloudbase-init** (Windows) installed, the SSH key, hostname and user data are applied automatically.
- Network configuration should use **DHCP**.
- For disks from other platforms, we recommend removing tools of the old platform (e.g. VMware Tools).

To convert a disk to QCOW2, use `qemu-img`:

```bash
qemu-img convert -p -f vmdk -O qcow2 server.vmdk server.qcow2
qemu-img info server.qcow2
```

## Creating an Image from a Volume

You can save a configured server as a template and reuse the same environment for new servers:

1. Shut down the source virtual machine gracefully (**Shut down**).
2. On the **Volumes** screen, select the virtual machine's boot volume.
3. Click **Create image** and name the image.

The new image appears on the **Images** screen and can be selected as the source when creating a virtual machine.

:::info Clean personal data from template images
Before turning a server into an image, remove SSH host keys, history files, logs and configuration files containing passwords. On Linux, `sudo cloud-init clean` makes servers created from the image run their first-boot configuration again.
:::

## Deleting an Image

Select the image on the **Images** screen and click **Delete**. Deleting an image does not affect virtual machines previously created from it.
