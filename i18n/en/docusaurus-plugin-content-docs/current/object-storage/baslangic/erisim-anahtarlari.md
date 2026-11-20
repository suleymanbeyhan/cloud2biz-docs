---
sidebar_position: 2
title: Access Keys
description: Creating, copying, disabling and deleting S3 access key pairs.
---

An **access key pair** has two parts:

- **Access key ID:** Works like a username.
- **Secret access key:** Works like a password.

Third-party S3 applications (AWS CLI, rclone, backup software, etc.) need both to access your buckets.

Access keys are managed from the bucket's right pane. Keys belong to your **S3 user**, not to a single bucket; a key you create appears and is valid for all your buckets.

## Limitations

- You can have up to **two** access key pairs.
- If only one key pair exists, you **cannot delete** it.
- A deleted access key **cannot be recovered**.

## Prerequisites

- [S3 access](./s3-erisimi.md) must be enabled for your project.
- At least one [bucket](../bucket-ve-dosyalar/bucketlar.md) must exist. A key pair is created automatically with the first bucket.

## Creating a Key Pair

1. On the **S3 storage** > **Buckets** screen, click any bucket.
2. In the right pane, on the **Overview** tab, click **Create** in the **S3 access keys** section.
3. In the **Create S3 access key** window, optionally enter a name for the key and click **Create**.

## Copying a Key {#copying-a-key}

1. On the **S3 storage** > **Buckets** screen, click a bucket.
2. In the right pane, find the **S3 access keys** section on the **Overview** tab.
   - To copy the **access key ID**, click the copy icon next to the key.
   - To copy the **secret access key**, click the ellipsis icon next to the key, then **Copy secret access key**.

## Disabling a Key

1. On the **S3 storage** > **Buckets** screen, click a bucket.
2. In the right pane, in the **S3 access keys** section of the **Overview** tab, click the ellipsis icon next to the key, then **Disable**.

## Deleting a Key

1. On the **S3 storage** > **Buckets** screen, click a bucket.
2. In the right pane, in the **S3 access keys** section of the **Overview** tab, click the ellipsis icon next to the key, then **Delete**.

## Security Recommendations

- Rotate your keys regularly: create a new key pair, move your applications to the new key, then delete the old one. The two-key limit lets you do this without downtime.
- Do not put the secret access key in source code, public repositories or email.
- If you suspect a key has been compromised, **Disable** it immediately and create a new one.
- Use [bucket policies](../erisim-yonetimi/bucket-politikalari.md) to give applications access only to the buckets and folders they need.
