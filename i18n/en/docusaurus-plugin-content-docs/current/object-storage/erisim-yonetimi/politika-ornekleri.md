---
sidebar_position: 2
title: Policy Examples
description: Ready-made bucket policy examples for the most common access scenarios.
---

The eight examples below cover the most common access scenarios. Before using them in your environment, update the **bucket names**, **IP ranges** and **user ARNs**. See [Bucket Policies](./bucket-politikalari.md#adding-a-bucket-policy) for how to add a policy.

## 1. Public Read-Only Access {#1-public-read-only-access}

Lets anyone read the objects in the bucket. Suitable for static websites or public content distribution.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadOnlyAccess",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::my-public-bucket/*"
    }
  ]
}
```

## 2. Blocking Public Access {#2-blocking-public-access}

Explicitly blocks public access to the whole bucket, even if other policies or ACLs allow it.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "DenyPublicAccess",
      "Effect": "Deny",
      "Principal": "*",
      "Action": "s3:*",
      "Resource": ["arn:aws:s3:::my-private-bucket", "arn:aws:s3:::my-private-bucket/*"]
    }
  ]
}
```

## 3. Allowing Access from a Specific IP Range {#3-allowing-access-from-a-specific-ip-range}

Grants read-only access only to users connecting from the specified IP addresses.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowAccessFromIP",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::my-secure-bucket/*",
      "Condition": {
        "IpAddress": {
          "aws:SourceIp": "192.168.1.0/24"
        }
      }
    }
  ]
}
```

## 4. Granting Access to Another S3 User {#4-granting-access-to-another-s3-user}

Allows the specified S3 user to upload objects to your bucket.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowAccountUpload",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::<domain_id>:<user_id>"
      },
      "Action": "s3:PutObject",
      "Resource": "arn:aws:s3:::my-shared-bucket/*"
    }
  ]
}
```

## 5. Allowing Access to a Specific Folder {#5-allowing-access-to-a-specific-folder}

Grants read access to only one folder in the bucket.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowFolderAccess",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::my-bucket/folder1/*"
    }
  ]
}
```

## 6. Restricting Access to a Specific Path {#6-restricting-access-to-a-specific-path}

Lets the user list and read objects only in a specific folder; other objects in the bucket are not accessible.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowListSpecificPrefix",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::<domain_id>:<user_id>"
      },
      "Action": "s3:ListBucket",
      "Resource": "arn:aws:s3:::my-bucket",
      "Condition": {
        "StringEquals": {
          "s3:prefix": "my-folder/"
        }
      }
    },
    {
      "Sid": "AllowGetSpecificFolder",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::<domain_id>:<user_id>"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::my-bucket/my-folder/*"
    }
  ]
}
```

## 7. Enforcing a Minimum TLS Version {#7-enforcing-a-minimum-tls-version}

Blocks clients using a TLS version lower than 1.2 (for example 1.1 or 1.0) from uploading objects to the bucket.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Deny",
      "Principal": "*",
      "Action": "s3:PutObject",
      "Resource": [
        "arn:aws:s3:::my-bucket",
        "arn:aws:s3:::my-bucket/*"
      ],
      "Condition": {
        "NumericLessThan": {
          "s3:TlsVersion": 1.2
        }
      }
    }
  ]
}
```

## 8. Preventing Object Deletion {#8-preventing-object-deletion}

Protects a bucket containing important objects by denying the `DeleteObject` operation.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "DenyObjectDeletion",
      "Effect": "Deny",
      "Principal": "*",
      "Action": "s3:DeleteObject",
      "Resource": "arn:aws:s3:::my-bucket/*"
    }
  ]
}
```
