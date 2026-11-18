---
sidebar_position: 3
title: Managing Virtual Machines
description: Starting, stopping, resizing, shelving, rescuing, attaching ISO images to, deleting and troubleshooting FlexoStack virtual machines.
---

This page covers everyday management of your virtual machines. Most actions are available from the action menu in the top-right corner after selecting a virtual machine on the **Virtual machines** screen.

## Power Actions

| Action | What it does |
| --- | --- |
| **Run** | Starts a stopped virtual machine. |
| **Shut down** | Sends a graceful shutdown signal to the operating system. The recommended way to stop a VM. |
| **Power off** | Stops the VM immediately, like pulling the plug. Use only if the VM is unresponsive. |
| **Reboot** | Restarts the operating system gracefully. |
| **Hard reboot** | Forcefully restarts the virtual machine. |
| **Pause / Resume** | Freezes the virtual machine in memory and resumes it where it left off. |
| **Suspend / Resume** | Writes memory to disk to suspend the VM and resumes it later. |

:::warning Power off and Hard reboot can cause data loss
These actions give the operating system no chance to shut down; data being written may be lost or the file system may be damaged. Try **Shut down** or **Reboot** first.
:::

## Changing CPU and RAM

You can change the CPU and RAM of a virtual machine by selecting a different flavor:

1. Select the virtual machine and click **Edit** or **Resize**.
2. Choose the new flavor and save.

The change may require the virtual machine to restart. On production systems, we recommend doing this during a maintenance window.

Billing effect:

- For **PAYG** resources, the new CPU/RAM amount affects billing immediately.
- For **fixed resources**, reductions take effect from the next period.

To grow a volume, see [Volumes](../depolama/diskler.md#extending-a-volume).

## Adding and Removing Network Interfaces

You can add up to 15 network interfaces to a virtual machine:

1. Open the virtual machine's **Networks** tab.
2. Click **Add**, then select the network and security groups.
3. To remove an interface, use **Detach** from the interface menu.

You can also change the security groups of an existing interface from the same tab; changes apply immediately.

## Shelving

If you will not use a virtual machine for a long time, you can **shelve** it. A shelved virtual machine is shut down and its **CPU and RAM are released**; its volumes, network configuration and IP addresses are kept.

- **Shelve:** Shelves the virtual machine.
- **Unshelve:** Starts the virtual machine again and re-allocates its resources.

The volumes of a shelved virtual machine continue to use storage.

:::tip Shutting down vs. shelving
A virtual machine that is only shut down (**Shut off**) keeps its CPU and RAM allocated. Shelve it if you want to release those resources.
:::

## Attaching an ISO Image

You can attach an ISO image to a virtual machine as a virtual CD/DVD drive, for installing an operating system, loading drivers or running tools from an ISO.

1. First [upload the ISO as an image](./imajlar.md).
2. Select the virtual machine and click **Attach ISO**.
3. Select the ISO image and confirm.
4. If needed, restart the virtual machine to boot from the ISO.
5. When finished, remove it with **Detach ISO**.

## Rescue Mode

If your virtual machine does not boot, you forgot your password or the file system is damaged, use **rescue mode**. In rescue mode, the virtual machine boots from a temporary rescue image and its own boot volume is attached as an additional disk.

1. Select the virtual machine and click **Rescue**.
2. Select the rescue image and confirm.
3. Connect to the rescue system via the [console](./sanal-makineye-baglanma.md#panel-console).
4. Mount your own disk and make the necessary fixes:

```bash
lsblk                         # List disks (e.g. /dev/vdb1)
sudo mount /dev/vdb1 /mnt     # Mount your own boot volume
sudo nano /mnt/etc/fstab      # Example: fix a broken fstab entry
sudo umount /mnt
```

5. When finished, return the virtual machine to normal with **Unrescue**.

## Guest Tools

Guest tools are a small helper running inside the virtual machine. When installed, the panel can set passwords, take consistent volume snapshots and show additional information about the virtual machine. Most of our ready-made images include guest tools. Our support team can help you install them on your own images.

## Deleting a Virtual Machine

1. Select the virtual machine and click **Delete**.
2. Choose whether its volumes should be deleted as well.
3. Confirm the action.

:::danger Deletion cannot be undone
A deleted virtual machine and any volumes deleted with it cannot be recovered. Make sure you have [backups](../depolama/yedekleme.md) of any data you need. Floating IPs are not deleted with the virtual machine; release unused ones separately on the **Floating IPs** screen.
:::

## Troubleshooting

### Virtual Machine Is in "Error" State

- Check the error message in the virtual machine details. The most common cause is insufficient quota (CPU, RAM, storage or IPs).
- Check your quota; delete unused resources or request a quota increase if needed.
- Open a support ticket with the error message and the virtual machine name.

### Virtual Machine Does Not Boot

- Open the [console](./sanal-makineye-baglanma.md#panel-console) and check the messages shown during boot.
- For file system or bootloader problems, use [rescue mode](#rescue-mode).

### No Network Connectivity

- Check from the console that the network interface is up and has an IP address (`ip a`).
- Check that the network is connected to a router with an external gateway.
- Check the security group rules and the firewall inside the server.

### Performance Issues

- Review CPU, RAM, disk and network usage in the virtual machine's **Monitoring** tab.
- Make sure disk-heavy applications use the **Disk High IOPS** type.
- Increase the flavor if needed.
