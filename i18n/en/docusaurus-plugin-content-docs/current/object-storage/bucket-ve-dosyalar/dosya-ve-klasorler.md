---
sidebar_position: 2
title: Files and Folders
description: Creating folders in a bucket, uploading, downloading and deleting files.
---

You can manage the files and folders in your buckets from the **S3 storage** screen in the panel. For many or large files, we recommend [S3 tools](../baslangic/s3-araclari.md).

## Prerequisite

You must first [create a bucket](./bucketlar.md#creating-a-bucket).

## Limitation

**Folder size** cannot be displayed in the panel.

## Creating a Folder

1. On the **S3 storage** > **Buckets** screen, click the bucket name.
2. On the bucket screen, click **Create folder**.
3. In the **Create folder** window, enter a folder name and click **Create**.

:::note
In S3, folders are not real directories but a common beginning (prefix) of object keys. For example, the object `reports/january.pdf` is shown inside the `reports` folder in the panel.
:::

## Uploading Files

1. On the **S3 storage** > **Buckets** screen, click the bucket name. Optionally, click the name of the folder to upload to.
2. Drag and drop files onto the screen or click **Upload files**.
3. In the **Upload files** window, select the files to upload.

## Downloading Files

1. On the **S3 storage** > **Buckets** screen, click the bucket name (and the folder name if needed).
2. Click the file you want to download.
3. In the file's right pane, click **Download**.

## Deleting a File or Folder

1. On the **S3 storage** > **Buckets** screen, click the bucket that contains the item.
2. Click the file or folder you want to delete.
3. In the right pane, click **Delete**.

:::tip Protecting against accidental deletion
For important data, use [Versioning](../ozellikler/desteklenen-ozellikler.md#data-management) or block deletion with a [bucket policy](../erisim-yonetimi/politika-ornekleri.md#8-preventing-object-deletion).
:::
