---
sidebar_position: 1
title: General
---

## What Is Object Storage Best Suited For?

- **Backups & archiving:** Long-term retention of rarely accessed data
- **Static content:** Images, videos and documents

## What Is Object Storage Less Suited For?

- **High-frequency read/write operations:** Use block storage for databases
- **Very small files:** Bundle files under 1 MB into archives before uploading

:::warning This service is not a CDN
Put a CDN in front of Object Storage for high-traffic static content.
:::
