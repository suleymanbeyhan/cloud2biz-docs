---
sidebar_position: 1
title: Supported S3 Features
description: Amazon S3 features supported by Cloud2Biz Object Storage and their details.
---

Object Storage works with the Amazon S3 protocol and supports **15 advanced S3 features** in addition to core S3 operations such as **GET, PUT, COPY and DELETE**. Thanks to this compatibility, you can keep using applications, SDKs and tools built for Amazon S3 without changes.

## Supported Features

| Category | Feature | Amazon S3 equivalent |
| --- | --- | --- |
| Data management | Multipart Upload | Multipart upload |
| Data management | Versioning | Versioning |
| Data management | Object Storage Classes | Object storage classes |
| Data management | Object Expiration | Bucket lifecycle (object expiration only) |
| Data management | Object Tagging | Object tagging |
| Security and access | Access Control Lists (ACLs) | Access control lists (ACLs) |
| Security and access | Bucket Policies | Bucket policies |
| Security and access | Presigned URLs | Presigned URLs |
| Security and access | Object Locking | Object locking |
| Security and access | CORS | Cross-origin resource sharing |
| Continuity and integrity | Cross-Region Replication | Cross-region replication (CRR) |
| Continuity and integrity | Data Integrity Checks | Data integrity checks |
| Monitoring and integration | Server Access Logging | Server access logging |
| Monitoring and integration | Bucket Notifications | Bucket notifications |
| Monitoring and integration | Website Hosting | Website hosting |

## Data Management {#data-management}

- **Multipart Upload:** Large files are split into parts and uploaded in parallel. If the connection drops, only the missing parts are resent.
- **Versioning:** Previous versions of objects are kept. After an accidental change or deletion, you can return to an earlier version.
- **Storage Classes:** Data is stored in different classes according to access frequency and performance needs.
- **Object Expiration:** Objects that reach the end of their lifetime are deleted automatically according to the rules you define.
- **Object Tagging:** Adding key-value tags to objects makes classification and management easier.

## Security and Access {#security-and-access}

- **Access Control Lists (ACLs):** Define user-based read and write permissions at the bucket and object level.
- **Bucket Policies:** JSON-based rules provide access control by user, folder, IP address and TLS version. See [Bucket Policies](../erisim-yonetimi/bucket-politikalari.md).
- **Presigned URLs:** Create time-limited, secure access links without sharing credentials.
- **Object Locking:** Objects are protected against deletion and modification for a set period based on the WORM (Write Once, Read Many) principle; an effective measure against ransomware.
- **CORS:** Lets web applications running on other domains access the bucket securely.

## Continuity and Integrity {#continuity-and-integrity}

- **Cross-Region Replication (CRR):** Written data is copied automatically to another location. Business continuity is maintained during regional outages.
- **Data Integrity Checks:** Checksums are verified during upload and download to confirm that data is transferred without corruption.

## Monitoring and Integration {#monitoring-and-integration}

- **Server Access Logging:** All requests made to the bucket are logged. Used for auditing, security analysis and compliance reporting.
- **Bucket Notifications:** Automatic notifications are sent on events such as object creation or deletion to trigger workflows.
- **Website Hosting:** Static sites made of HTML, CSS and images are published directly from a bucket.

## Important Notes

:::note Lifecycle rules
Bucket lifecycle rules support only **object expiration**. Other lifecycle actions, such as storage class transition, are not supported.
:::

Detailed technical compatibility covers the supported Amazon S3 REST operations, request and response headers, authentication methods, S3 features supported in bucket policies, object expiration actions, data integrity checks and object tags. For questions about a specific operation or header, you can open a [support ticket](https://cloud2biz.com/clientarea).

For a detailed comparison with Amazon S3, see [Amazon S3 Comparison](./amazon-s3-karsilastirma.md).
