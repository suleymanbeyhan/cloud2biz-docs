---
sidebar_position: 3
title: Managing Virtual Machines
description: Starting, stopping, changing CPU and RAM (hot plug), shelving, rescuing, attaching ISO images to, deleting and troubleshooting FlexoStack virtual machines.
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

You change the vCPU and RAM of a virtual machine by selecting a different **flavor**. This requires **CPU and RAM hot plug** to be **enabled** on the virtual machine.

### 1. Enable CPU and RAM Hot Plug {#enabling-hot-plug}

You can enable hot plug in two ways:

- **During creation:** On the virtual machine creation summary screen, select **Enable CPU and RAM hot plug** under **Advanced options**. See [Creating a Virtual Machine](./sanal-makine-olusturma.md#cpu-and-ram-hot-plug).
- **After creation:** Stop the virtual machine with **Power off**, then enable the feature by clicking the pencil icon next to **CPU and RAM hot plug** in the **Properties** section of the **Overview** tab.

When the feature is enabled, **Properties** shows **CPU and RAM hot plug: Enabled**.

![Flavor and CPU and RAM hot plug: Enabled in the virtual machine's Properties section](/img/flexostack/vm-hotplug-properties.png)

### 2. Change the Flavor

1. On the **Virtual machines** screen, click the virtual machine.
2. In the **Properties** section of the **Overview** tab, click the pencil icon next to **Flavor**.
3. In the **Flavor** window, select the new flavor from **Available flavors**.
4. Click **Done**.

![Flavor window and the Available flavors list](/img/flexostack/vm-flavor-dialog.png)

### When Do You Need to Power Off?

| Change | Virtual machine state |
| --- | --- |
| Moving to a **larger** flavor (more vCPU/RAM) | Can be done **while running**, without powering off. |
| Moving to a **smaller** flavor (less vCPU/RAM) | The virtual machine must be stopped with **Power off** first. |
| Enabling hot plug after creation | The virtual machine must be stopped with **Power off** first. |

:::warning
If hot plug is not enabled, or the guest operating system does not support CPU/RAM hot plug, the operating system may become unstable after a flavor change. In that case, make the change while the virtual machine is powered off.
:::

### Billing Effect

- For **PAYG** resources, the new CPU/RAM amount affects billing immediately.
- For **fixed resources**, increases are made with a [package upgrade](../faturalandirma/sabit-kaynak.md#resource-changes) in the client area. Decreases are not refunded; next month's invoice is reduced accordingly.

To grow a volume, see [Volumes](../depolama/diskler.md#extending-a-volume).

## Adding Network Interfaces and IP Addresses

You can add a **new network interface** to a virtual machine, or assign a **secondary IP address to an existing interface** to use a different IP address on the same interface. A virtual machine can have up to 15 network interfaces.

### Opening the Network Interfaces Window

1. On the **Virtual machines** screen, click the virtual machine.
2. In the **Network interfaces** section of the **Overview** tab, click **Edit**.

![Network interfaces - Edit button on the virtual machine's Overview tab](/img/flexostack/vm-nic-overview.png)

### Adding a New Network Interface

1. In the **Network interfaces** window, click **Add** at the top right.
2. In the **Add network interface** window, select the network the interface connects to, and set the IP address and [security groups](../ag/security-groups.md#assigning-security-groups-to-a-virtual-machine).
3. Add the interface and click **Done** in the **Network interfaces** window.

![Network interfaces window and the Add button](/img/flexostack/vm-nic-list.png)

### Adding a Secondary IP to an Existing Interface

To use an additional IP address on an existing interface without adding a new one:

1. In the **Network interfaces** window, click the ellipsis icon on the interface's row and select **Edit**.

   ![Edit and Remove options in the network interface menu](/img/flexostack/vm-nic-menu.png)

2. In the **Edit network interface** window, click **Add** on the **IPv4 addresses** row in **Secondary IP addresses** and enter the IP address to add.
3. Click **Save**, then **Done** in the **Network interfaces** window.

![Secondary IP addresses - Add in the Edit network interface window](/img/flexostack/vm-nic-edit.png)

:::note
The secondary IP address comes from the same network (subnet) the interface is connected to. If needed, also configure the IP address on the network interface inside the virtual machine's operating system.
:::

### Removing a Network Interface

In the **Network interfaces** window, click the ellipsis icon on the interface's row, select **Remove** and save with **Done**.

You can also change the interface's security groups in the same **Edit network interface** window; changes apply immediately.

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
