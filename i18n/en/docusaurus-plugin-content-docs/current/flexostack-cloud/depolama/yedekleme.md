---
sidebar_position: 2
title: Backups
description: Creating backup plans on FlexoStack, adding and removing volumes, manual backups, and restoring volumes and virtual machines from backups.
---

With the FlexoStack backup service you can back up your volumes automatically with **backup plans** or **manually** whenever you need. You restore your data by creating a new volume or a new virtual machine from a backup.

On this page, backup and **recovery point** mean the same thing: a copy of an entire volume, or of the data that changed at a specific time.

## Backup types

| | Full backup | Incremental backup |
| --- | --- | --- |
| Contents | A copy of the entire volume | Only the changes since the latest backup, whatever its type |
| Restore | Self-sufficient | Requires the first full backup and all following incremental backups (the backup chain) |
| Time and space | Takes longer, uses more space | Faster, uses less space |

## Snapshots vs. backups

| | Snapshot | Backup |
| --- | --- | --- |
| Where it is stored | Same storage as the volume | Separate backup storage |
| Purpose | Quick rollback before a change | Protection against data loss |
| Automation | Taken manually | Scheduled automatically or taken manually |

Snapshots are not a substitute for backups. Always use a backup plan for important data. For snapshots, see [Volumes and snapshots](./diskler.md#snapshots).

## Backup plans

A backup plan defines three things:

- **What to back up:** One or more volumes. A volume can belong to **only one** plan.
- **How often:** When backups are created.
- **How long to keep them:** The maximum number of **full backups** kept at any time.

### Backup chains

A **backup chain** is one full backup followed by the incremental backups created before the next full backup. The default chain length is **7**: one full backup and six incremental backups. The total number of stored backups is therefore roughly **maximum number of full backups × chain length**.

### Backup rotation

When a new full backup is created and the retention limit is exceeded, the **oldest full backup and all of its incremental backups** are deleted automatically. For example:

- With retention set to **1**, creating a new full backup deletes the previous chain.
- With retention set to **2**, creating the third full backup deletes the oldest chain.

### Creating a plan

1. In the panel, open the **Backup plans** screen and click **Create backup plan**.
2. In the **Create backup plan** window, enter a name and, optionally, a description. Do not put personal or sensitive business data in the description.
3. Under **What to back up**, click **Manage**. In the **Manage volumes** window, select the volumes to back up and click **Save**.
4. Under **Schedule**, choose a schedule:

   | Option | Description |
   | --- | --- |
   | **Retention 7 days** | A backup is created every day at 2:00 AM UTC; at most 7 full recovery points are kept. |
   | **Retention 14 days** | A backup is created every day at 2:00 AM UTC; at most 14 full recovery points are kept. |
   | **Custom** | You set the months, days of the week, days of the month, time and the maximum number of full recovery points to keep. |

5. Click **Create**.

:::tip Back up the whole virtual machine
To be able to bring a virtual machine back completely, add its boot volume and all data volumes to the plan. Recreating a virtual machine from a backup requires a backup of its **boot volume**.
:::

### Adding and removing volumes

**To add volumes:**

1. On the **Backup plans** screen, click the plan.
2. In the right pane, go to the **Volumes to back up** tab.
3. Click **Manage**, select the volumes in the **Manage volumes** window and click **Save**.

**To remove volumes**, follow the same steps and clear the selection for the volumes you want to remove. To see only the volumes assigned to the plan, select **Show only selected items** next to the search field.

Backups that were **already created** for a removed volume are not deleted.

:::note
A volume cannot be added to more than one backup plan. To move a volume to another plan, remove it from its current plan first.
:::

### Editing a plan

1. On the **Backup plans** screen, click the plan.
2. In the right pane, click **Edit**.
3. In the **Edit backup plan** window, change the name, description or schedule and click **Save**.

### Deleting a plan

1. On the **Backup plans** screen, click the plan.
2. In the right pane, click **Delete**.
3. If the plan has recovery points, select **Delete recovery points** to delete them too, and type `Delete` to confirm.
4. Click **Delete** in the confirmation window.

:::danger
If you select **Delete recovery points**, all backups of the plan are permanently deleted and cannot be recovered. To keep the backups, delete the plan without selecting this option.
:::

## Manual backups

Manual backups are instant, one-off backups of a single volume. No retention policy applies to them, so you must **delete them manually** when you no longer need them.

### Creating a backup

1. On the **Volumes** screen, click the volume.
2. In the right pane, click **Create backup now**.

The backup appears on the **Recovery points** screen.

### Deleting a backup

1. On the **Recovery points** screen, click the recovery point.
2. Click **Delete** and confirm.

:::warning
Deleting a backup also deletes **all backups that depend on it** in the same chain, and their data is permanently lost.
:::

## Restoring from backups

A restore always creates a **new** volume or a **new** virtual machine. The original volume and virtual machine stay unchanged, so you can safely try a backup and take the data you need.

### Restoring a volume

You can create a new volume from a backup of a data or boot volume, whether the backup was created automatically or manually.

1. On the **Recovery points** screen, click the recovery point.
2. In the right pane, click **Restore volume**.
3. In the **Restore volume** window, enter a name for the new volume, select a storage policy (disk type) and click **Restore**.

The new volume appears on the **Volumes** screen. Attach it to a virtual machine to access your files.

### Restoring a virtual machine

You can recreate a virtual machine only from a backup of its **boot volume**.

1. On the **Recovery points** screen, click the recovery point of the boot volume.
2. In the right pane, click **Restore virtual machine**.
3. In the **Restore virtual machine** window, the boot volume is set automatically from the selected recovery point. Configure the other settings (flavor, networks, SSH key, etc.) as you would when [creating a virtual machine](../sanal-makineler/sanal-makine-olusturma.md).
4. Click **Deploy**.

The new virtual machine appears on the **Virtual machines** screen. To bring back its data volumes as well, [restore their backups as volumes](#restoring-a-volume) and attach them to the new virtual machine.

## Pricing

Backup storage is billed **per GB** with a minimum purchase of **100 GB**. For current unit prices and quantity discounts, see [Fixed Resource Billing](../faturalandirma/sabit-kaynak.md#snapshots-and-backups); for an estimate, use the [Price Calculator](../faturalandirma/fiyat-hesaplayici.mdx).

## Backup recommendations

- **3-2-1 rule:** Keep at least 3 copies of your data, on 2 different media, with 1 copy in a different location.
- Add the boot and data volumes of critical virtual machines to the same plan so all volumes are backed up at the same times.
- Set the retention limit based on the oldest date you may want to go back to.
- **Test restores** regularly. Restoring a backup as a new volume does not affect your original system.
- For databases, take the database's own dump backups in addition to volume backups.
