---
sidebar_position: 2
title: Backups
description: Creating backup plans on FlexoStack, retention, incremental backups, restoring and Acronis backup options.
---

FlexoStack offers two options for backing up your volumes regularly:

- **Backup plans in the panel:** Automatically back up your volumes on a schedule you define.
- **Acronis backup:** For advanced needs such as file-level restore, off-site storage and physical server backups.

## Snapshots vs. backups

| | Snapshot | Backup |
| --- | --- | --- |
| Stored on | Same storage as the volume | Separate backup storage |
| Purpose | Quick rollback before changes | Protection against data loss and disasters |
| Automation | Taken manually | Automatic, on a schedule |

Snapshots do not replace backups. Always use a backup plan for important data. For snapshots, see [Volumes and snapshots](./diskler.md#snapshots).

## Backup plans

A backup plan defines which volumes are backed up, when, and how many backups are kept.

### Creating a plan

1. In the panel, open **Backup plans** and click **Create backup plan**.
2. Enter a name and an optional description. Do not put personal or sensitive business data in the description.
3. Under **What to back up**, click **Manage**, select the volumes and click **Save**.
4. Under **Schedule**, choose a retention option or create a custom schedule.
5. Click **Create**.

### Schedule options

| Option | Description |
| --- | --- |
| **Retention 7 days** | Daily backups at 02:00 UTC, keeping up to 7 full recovery points. |
| **Retention 14 days** | Daily backups at 02:00 UTC, keeping up to 14 full recovery points. |
| **Custom** | You set the months, days of the week, days of the month, time, and the maximum number of full backups to keep. |

### Full and incremental backups

Backups are kept in **chains**. Each chain consists of one **full backup** followed by **incremental backups**. Incremental backups contain only the data changed since the previous backup, so they are faster and take less space.

- The default chain length is 7: one full backup and six incremental backups.
- The total number of stored backups is roughly **maximum full backups × chain length**.
- When a new full backup exceeds the retention limit, the oldest full backup and its incremental backups are deleted automatically.

### Rules and limitations

- A volume can belong to only **one** backup plan.
- To back up a whole virtual machine, add all of its volumes (boot and data volumes) to the plan.
- Backup storage is billed by usage.

## Restoring from a backup

1. On the **Backups** screen, open the backups of the volume.
2. Select the recovery point (date and time) you want to restore.
3. Choose a restore method:
   - **Restore as a new volume:** Restores the backup to a new volume without touching the current one. This is the recommended and safest method; attach the new volume to a virtual machine and copy the files you need.
   - **Restore over the existing volume:** Replaces the volume contents with the backup. The volume must be detached or the virtual machine shut down.

:::danger Restoring over a volume erases current data
When you restore over an existing volume, all data written after the backup was taken is lost. If unsure, restore to a new volume first.
:::

## Acronis backup

For more advanced backup needs, use the Acronis-based backup service:

- **Per-GB** or **per-VM / per-physical-server** pricing
- File and folder-level restore
- Backup locations: Istanbul-1 (outside FlexoStack), Istanbul-2 and Ankara (inside FlexoStack)
- **Acronis Cloud Backup** to keep backups in the Acronis cloud in Frankfurt or Istanbul
- No additional license fee

Order Acronis backup from the [client area](https://cloud2biz.com/clientarea) or contact our support team.

## Backup recommendations

- **3-2-1 rule:** Keep at least 3 copies of your data, on 2 different media, with 1 off-site.
- For critical systems, store backups in a different location from your server.
- **Test restores** regularly. An untested backup may not work when you need it.
- For databases, take database dumps in addition to volume backups.
