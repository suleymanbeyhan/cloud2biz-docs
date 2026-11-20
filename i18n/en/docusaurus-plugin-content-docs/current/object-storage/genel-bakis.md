---
sidebar_position: 1
title: Overview
description: What Cloud2Biz Object Storage is, how it works, its features and where it is available.
---

**Cloud2Biz Object Storage** stores your data as **objects** and is **compatible with the Amazon S3 protocol**. In addition to core S3 operations such as GET, PUT, COPY and DELETE, it supports advanced S3 features including versioning, object lock, bucket policies and replication.

Thanks to this compatibility, you can keep using applications, SDKs and tools built for Amazon S3 **without changes**.

## Key Concepts

| Concept | Description |
| --- | --- |
| **Bucket** | A uniquely named container for objects. It groups objects and isolates them from objects in other buckets. |
| **Object** | A file stored in a bucket, together with its metadata. |
| **Key** | The full name of an object within the bucket (e.g. `reports/2026/january.pdf`). |
| **Prefix / folder** | The common beginning of object keys (e.g. `reports/`). Shown as a folder in the panel. |
| **Access key** | The **access key ID** and **secret access key** pair that applications use to connect to S3. |
| **ARN** | The bucket's identifier in Amazon Resource Name format (e.g. `arn:aws:s3:::my-bucket`). Used in bucket policies. |

## Key Features

- **Full S3 API compatibility:** Works with AWS CLI, rclone, s3cmd, Cyberduck and the AWS SDKs.
- **Data protection:** Roll back to earlier versions with [Versioning](./ozellikler/desteklenen-ozellikler.md#data-management), and protect against ransomware with [Object Lock](./ozellikler/desteklenen-ozellikler.md#security-and-access) (WORM).
- **Fine-grained access control:** User, folder, IP address and TLS version based authorization with [bucket policies](./erisim-yonetimi/bucket-politikalari.md); ACLs and time-limited presigned URLs.
- **Cross-location replication:** Copy your data automatically to another location for business continuity.
- **Static website hosting:** Publish sites made of HTML, CSS and images directly from a bucket.

For the full list, see [Supported S3 Features](./ozellikler/desteklenen-ozellikler.md).

## Locations

Object Storage is available in the following locations:

- **Istanbul** — Türkiye
- **Ankara** — Türkiye
- **Sofia** — Bulgaria (European Union)

You can keep your data in two separate cities within Türkiye or within the European Union.

## Getting Started

1. Make sure [S3 access is enabled](./baslangic/s3-erisimi.md) for your project.
2. [Create your first bucket](./bucket-ve-dosyalar/bucketlar.md#creating-a-bucket) on the **S3 storage** > **Buckets** screen. Your S3 user and an access key pair are created automatically with the first bucket.
3. Copy your [access keys](./baslangic/erisim-anahtarlari.md).
4. Upload your files [from the panel](./bucket-ve-dosyalar/dosya-ve-klasorler.md) or [with S3 tools](./baslangic/s3-araclari.md).

## Use Cases

| Scenario | Description |
| --- | --- |
| **Backup** | Storing server, database and application backups; immutable backups with Object Lock |
| **Archiving** | Long-term in-country retention of data subject to legal retention requirements |
| **Application data** | User uploads, images, videos and documents |
| **Big data** | Analytics over the S3 API with tools such as Hadoop and Spark |
| **Static websites** | Static content published directly from a bucket |
