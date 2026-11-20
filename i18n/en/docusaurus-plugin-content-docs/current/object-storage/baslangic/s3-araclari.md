---
sidebar_position: 3
title: Connecting with S3 Tools
description: Connecting to Cloud2Biz Object Storage with S3-compatible tools such as AWS CLI and rclone.
---

Because Object Storage is compatible with the Amazon S3 API, it works with any tool that supports S3. You need three pieces of information to connect:

| Information | Where to find it |
| --- | --- |
| **Endpoint** | On the **S3 storage** > **Buckets** screen, click a bucket; the **Overview** tab shows the HTTP and HTTPS paths to the bucket. The endpoint is the part of this address without the bucket name. |
| **Access key ID** | [Access Keys](./erisim-anahtarlari.md#copying-a-key) |
| **Secret access key** | [Access Keys](./erisim-anahtarlari.md#copying-a-key) |

In the examples below, replace `<S3_ENDPOINT>` with your endpoint (e.g. `https://s3.example.com`) and `<ACCESS_KEY>` and `<SECRET_KEY>` with your keys. Always use **HTTPS**.

## AWS CLI

Set up your keys:

```bash
aws configure
# AWS Access Key ID: <ACCESS_KEY>
# AWS Secret Access Key: <SECRET_KEY>
# Default region name: us-east-1
# Default output format: json
```

Use the `--endpoint-url` parameter in commands:

```bash
# List buckets
aws --endpoint-url <S3_ENDPOINT> s3 ls

# Upload a file
aws --endpoint-url <S3_ENDPOINT> s3 cp backup.tar.gz s3://my-bucket/backups/

# Sync a folder
aws --endpoint-url <S3_ENDPOINT> s3 sync ./site s3://my-bucket/site/

# Download a file
aws --endpoint-url <S3_ENDPOINT> s3 cp s3://my-bucket/backups/backup.tar.gz .

# Create a presigned link valid for 1 hour
aws --endpoint-url <S3_ENDPOINT> s3 presign s3://my-bucket/report.pdf --expires-in 3600
```

## rclone

Add the following configuration to `~/.config/rclone/rclone.conf`:

```ini
[cloud2biz]
type = s3
provider = Other
access_key_id = <ACCESS_KEY>
secret_access_key = <SECRET_KEY>
endpoint = <S3_ENDPOINT>
force_path_style = true
```

```bash
rclone lsd cloud2biz:
rclone copy ./backups cloud2biz:my-bucket/backups --progress
rclone sync ./site cloud2biz:my-bucket/site
```

## Other Tools

Any tool that lets you set an S3-compatible endpoint is supported, for example **s3cmd**, **Cyberduck**, **WinSCP**, **MinIO Client (mc)**, the AWS SDKs (Python boto3, Java, Go, .NET, Node.js) and backup software with an S3 target. In these tools, choose "S3 compatible" / "Other" as the provider and enter the endpoint.

:::tip Large files
Tools automatically split large files with [multipart upload](../ozellikler/desteklenen-ozellikler.md#data-management) and send the parts in parallel; if the connection drops, only the missing parts are resent.
:::
