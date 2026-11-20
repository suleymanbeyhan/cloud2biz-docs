---
sidebar_position: 1
title: S3 Access
description: How S3 access is enabled for your project, the capacity quota and how the S3 user is created.
---

To use Object Storage, **S3 access must be enabled** for your project. S3 access is granted per project through project quotas.

## How Is S3 Access Enabled?

- S3 access is **disabled** for all projects by default.
- When your Object Storage service is set up, **Cloud2Biz enables S3 access** for your project and sets the **storage capacity** (in GiB) you can use as a quota.
- Once S3 access is enabled, project members see the **S3 storage** screen in the panel.

:::tip
If you cannot see the **S3 storage** screen in the panel, or you want to increase your capacity quota, open a support ticket on [cloud2biz.com](https://cloud2biz.com/clientarea).
:::

## S3 User

You do not need to create an S3 user yourself. When a project member **creates their first bucket**, an S3 user and an **access key pair** are created automatically. See [Access Keys](./erisim-anahtarlari.md) for details.

## If S3 Access Is Disabled

When S3 access is disabled for a project, the project's Object Storage access is blocked, but **S3 users, buckets and data are kept**. When access is enabled again, you can continue where you left off.

## Read-Only Access

If your access to the project is read-only, a **Read-only mode** label appears in the upper-right corner of the panel. In this mode you can view resources but cannot change them.
