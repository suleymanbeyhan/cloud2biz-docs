---
sidebar_position: 1
title: General Questions
---

## When Is Object Storage a Good Fit? {#when-is-object-storage-a-good-fit}

- **Backup and archiving:** Server, database and application backups; data subject to legal retention
- **Static content:** Images, videos and documents
- **Application data:** User uploads and applications working with the S3 API
- **Big data:** Analytics over the S3 API with Hadoop and Spark

## When Is Object Storage Not a Good Fit? {#when-is-object-storage-not-a-good-fit}

- **High-frequency reads/writes:** For databases, use [volumes](/docs/flexostack-cloud/depolama/diskler) attached to your virtual machine.
- **Very small files:** Uploading many small files as an archive (e.g. `tar`) is more efficient.

:::warning This service is not a CDN
For high-traffic static content, put a CDN in front of Object Storage.
:::

## Will My Application Written for Amazon S3 Work? {#s3-compatibility}

Yes. Object Storage is compatible with the Amazon S3 API. You only need to change the **endpoint** and the **access keys** in your application. See [Connecting with S3 Tools](../baslangic/s3-araclari.md) and [Supported S3 Features](../ozellikler/desteklenen-ozellikler.md).

## I Cannot See the S3 Storage Screen in the Panel {#no-s3-screen}

S3 access is not enabled for your project. Open a support ticket on [cloud2biz.com](https://cloud2biz.com/clientarea). See [S3 Access](../baslangic/s3-erisimi.md).

## Where Is My Access Key? {#access-key}

A key pair is created automatically when you create your first bucket. You can copy your keys from the **S3 access keys** section on the **Overview** tab of any bucket. You can have up to two key pairs. See [Access Keys](../baslangic/erisim-anahtarlari.md).

## Why Can't I Delete a Bucket? {#cannot-delete-bucket}

Only **empty** buckets can be deleted. Delete all files and folders in the bucket first. See [Buckets](../bucket-ve-dosyalar/bucketlar.md).

## How Can I See a Folder's Size? {#folder-size}

Folder size cannot be displayed in the panel. Use S3 tools instead, for example: `aws --endpoint-url <S3_ENDPOINT> s3 ls s3://my-bucket/folder/ --recursive --summarize`

## Can I Delete Old Files Automatically? {#lifecycle}

Yes. With bucket lifecycle rules, expired objects can be deleted automatically (**object expiration**). Storage class transition is not supported.

## How Do I Protect My Backups from Ransomware? {#ransomware}

With **Object Lock** (WORM), you can protect objects against deletion and modification for a period you set. You can also use [Versioning](../ozellikler/desteklenen-ozellikler.md#data-management) and block deletion with a [bucket policy](../erisim-yonetimi/politika-ornekleri.md#8-preventing-object-deletion).
