---
sidebar_position: 1
title: Volumes and Snapshots
description: Creating volumes on FlexoStack, attaching them to virtual machines, extending them, taking snapshots and reverting to a snapshot.
---

On FlexoStack, all data of your virtual machines lives on **volumes**. Volumes are resources independent of virtual machines: you can detach a volume from one virtual machine and attach it to another, take snapshots of it or extend it.

Your volumes are stored on highly available, redundant storage infrastructure; the failure of a single physical disk or server does not cause data loss.

## Disk Types

| Disk type | Technology | Performance | Recommended for |
| --- | --- | --- | --- |
| **Disk High IOPS** | NVMe SSD | Up to 16,000 IOPS and 2,000 MB/s per volume | Operating systems, databases, I/O-intensive applications |
| **Disk Economy** | SAS disk | Capacity-oriented | Archives, backups, large but rarely accessed data |

The disk type is chosen at creation.

## Creating a Volume

1. In the panel, open **Volumes** and click **Create volume**.
2. Name the volume and enter its size (GB).
3. Select the disk type (**Disk High IOPS** or **Disk Economy**).
4. Optionally choose a source: empty, from an image, or from a snapshot.
5. Click **Create**.

## Attaching a Volume to a Virtual Machine

1. On the **Volumes** screen, select the volume and click **Attach**.
2. Select the virtual machine and confirm.

The volume appears as a new device in the virtual machine (on Linux usually `/dev/vdb`, `/dev/vdc`). To prepare a new, empty volume on Linux:

```bash
lsblk                                  # Find the new disk, e.g. /dev/vdb
sudo mkfs.ext4 /dev/vdb                # Create a file system (erases data!)
sudo mkdir -p /data
sudo mount /dev/vdb /data
# Mount automatically at boot:
echo "UUID=$(sudo blkid -s UUID -o value /dev/vdb) /data ext4 defaults,nofail 0 2" | sudo tee -a /etc/fstab
```

:::warning mkfs erases the disk
Use `mkfs` only on new, empty disks. Running it on a disk with data destroys all of it.
:::

On Windows, bring the new disk online and format it in **Disk Management** (`diskmgmt.msc`).

## Detaching a Volume

1. If the volume is in use inside the virtual machine, unmount it first (on Linux, `sudo umount /data`).
2. On the **Volumes** screen, select the volume and click **Detach**.

A boot volume cannot be detached from a running virtual machine.

## Extending a Volume

You can extend a volume at any time:

1. On the **Volumes** screen, select the volume and click **Extend**.
2. Enter the new size and confirm.

Then grow the partition and file system inside the operating system. Example for an ext4 root disk on Ubuntu/Debian:

```bash
sudo growpart /dev/vda 1
sudo resize2fs /dev/vda1
df -h
```

For XFS, use `sudo xfs_growfs /` instead of `resize2fs`.

:::info Shrinking is not supported
Volume size can only be increased. To move to a smaller volume, create a new one and migrate your data.
:::

## Snapshots

A snapshot is an image of a volume at a specific point in time. Taking a snapshot before risky operations such as updates, configuration changes or software installations lets you quickly revert the volume if something goes wrong.

- **Snapshots are free.** Snapshots use your disk quota, so no separate fee is charged.
- Snapshots are kept on the same storage infrastructure as the volume. For protection against disasters, use [backups](./yedekleme.md) in addition to snapshots.

### Taking a Snapshot

1. On the **Volumes** screen, select the volume.
2. On the **Snapshots** tab, click **Create snapshot**.
3. Give the snapshot a descriptive name, for example `before-update-2026-11-17`.

:::tip For consistent snapshots
On servers running databases, stopping the application before the snapshot or having guest tools installed helps you get a consistent snapshot.
:::

### Reverting to a Snapshot

To return a volume to the moment the snapshot was taken:

1. Shut down the virtual machine the volume is attached to.
2. On the volume's **Snapshots** tab, select the snapshot and click **Revert**.
3. Start the virtual machine again.

:::danger Revert cannot be undone
When you revert to a snapshot, all data written to the volume after the snapshot was taken is lost.
:::

### Creating a New Volume from a Snapshot

To access old data without touching the current volume, create a new volume from the snapshot and attach it to a virtual machine. This is the safest way to recover a single file.

## Deleting a Volume

On the **Volumes** screen, select the volume and click **Delete**. A deleted volume and its snapshots cannot be recovered. A volume attached to a virtual machine cannot be deleted; detach it first.
