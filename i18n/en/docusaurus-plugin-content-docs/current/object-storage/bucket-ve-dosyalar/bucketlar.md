---
sidebar_position: 1
title: Buckets
description: Bucket naming rules, creating a bucket, listing its contents, viewing its details and deleting it.
---

A **bucket** is a uniquely named container for objects (files). It groups objects and isolates them from objects in other buckets. After [S3 access](../baslangic/s3-erisimi.md) is enabled, you can create buckets and upload data.

## Naming Rules

Bucket names should be DNS-compliant. A bucket name:

- Must be **3 to 63 characters** long.
- May contain only **lowercase letters**, **numbers**, **hyphens (-)** and **periods (.)**.
- Must start and end with a **letter or number**.
- May consist of valid name parts separated by periods (e.g. `backup.app-01`).

| Example | Valid? |
| --- | --- |
| `company-backups` | Yes |
| `web.static-content` | Yes |
| `Company_Backups` | No: contains uppercase letters and an underscore |
| `-backups` | No: starts with a hyphen |
| `ab` | No: shorter than 3 characters |

## Creating a Bucket {#creating-a-bucket}

1. In the panel, go to **S3 storage** > **Buckets** and click the button to create a bucket.
2. In the **Create bucket** window, enter a name for the bucket.
3. Click **Create**.

When you create your first bucket, your S3 user and an [access key pair](../baslangic/erisim-anahtarlari.md) are created automatically.

## Listing Bucket Contents

On the **S3 storage** > **Buckets** screen, click the bucket name. The files and folders in the bucket are listed. For file operations, see [Files and Folders](./dosya-ve-klasorler.md).

## Viewing Bucket Details

1. On the **S3 storage** > **Buckets** screen, click the bucket.
2. In the right pane, open the **Overview** tab.

This tab shows:

| Information | Description |
| --- | --- |
| **Bucket name** | The name of the bucket |
| **ARN** | The bucket's Amazon Resource Name. Used to specify the bucket as a resource in [bucket policies](../erisim-yonetimi/bucket-politikalari.md). |
| **Creation date** | When the bucket was created |
| **Access paths** | The HTTP and HTTPS addresses of the bucket. Used as the endpoint in [S3 tools](../baslangic/s3-araclari.md). |
| **S3 access keys** | Your [access keys](../baslangic/erisim-anahtarlari.md) |

## Deleting a Bucket

:::warning
You can delete only an **empty** bucket. Before deleting, delete all files and folders in the bucket or move them to another bucket.
:::

1. On the **S3 storage** > **Buckets** screen, click the bucket's row.
2. In the right pane, click **Delete**.
3. Click **Delete** in the confirmation window.
