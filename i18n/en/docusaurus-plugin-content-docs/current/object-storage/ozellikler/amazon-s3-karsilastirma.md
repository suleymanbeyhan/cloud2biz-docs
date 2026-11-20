---
sidebar_position: 2
title: Amazon S3 Comparison
description: Cloud2Biz Object Storage's compatibility with Amazon S3 and the advantages it offers in-country.
---

## Summary

Cloud2Biz Object Storage offers **the same API and core features** as Amazon S3. For scenarios such as backup, archiving, application data and content storage, you can use applications built for Amazon S3 without changes. On top of that, your data is stored **in two cities in Türkiye and in the European Union**, with the full feature set and **local support**.

## Feature Comparison

| Feature | Amazon S3 | Cloud2Biz Object Storage |
| --- | --- | --- |
| S3 API (GET, PUT, COPY, DELETE) | ✅ | ✅ |
| Multipart Upload | ✅ | ✅ |
| Versioning | ✅ | ✅ |
| Object Locking (WORM) | ✅ | ✅ |
| Presigned URLs | ✅ | ✅ |
| Bucket Policies | ✅ | ✅ |
| Access Control Lists (ACLs) | ✅ | ✅ |
| Server-side encryption | ✅ | ✅ |
| CORS | ✅ | ✅ |
| Object Tagging | ✅ | ✅ |
| Data Integrity Checks | ✅ | ✅ |
| Server Access Logging | ✅ | ✅ |
| Static website hosting | ✅ | ✅ |
| Bucket Notifications | ✅ | ✅ |
| Storage classes | ✅ | ✅ |
| Cross-location replication | ✅ | ✅ Between Istanbul, Ankara and Sofia |
| Data in two separate cities in Türkiye | ❌ | ✅ Istanbul and Ankara |
| Full S3 feature set in Türkiye | ❌ Istanbul Local Zone only, single storage class (S3 One Zone-IA) | ✅ All features |
| European Union location | ✅ | ✅ Sofia |
| Local support in Turkish | ❌ | ✅ |

For details of the supported features, see [Supported S3 Features](./desteklenen-ozellikler.md).

## Use Cases

| Scenario | With Cloud2Biz Object Storage |
| --- | --- |
| **Backup** | Immutable, ransomware-resistant backups with Object Lock; shorter restore times thanks to a local location |
| **Archiving** | Secure in-country retention of data subject to legal requirements, in two separate cities |
| **Big data analytics** | Analytics over the S3 API with Hadoop and Spark |
| **Cloud-native applications** | Applications written for the S3 API move without changes |
| **Digital asset management** | Low latency for users in Türkiye with a local location |

## Advantages of Cloud2Biz Object Storage

- **In-country geographic redundancy:** With replication between Istanbul and Ankara, your data can be kept in two separate cities within Türkiye.
- **Full feature set in-country:** Versioning, Object Lock, bucket policies and other S3 features are fully available in the local location. AWS's Istanbul Local Zone is not a full region and offers Amazon S3 only in a single zone with a single storage class (One Zone-Infrequent Access) ([AWS announcement](https://aws.amazon.com/de/about-aws/whats-new/2026/05/aws-local-zones-istanbul-turkiye/)).
- **European Union option:** The Sofia location suits organizations that want to keep their data within the EU.
- **Local support and contact:** Support in Turkish and direct communication with a local provider.
- **Low latency:** Locations close to your users and servers in Türkiye.
- **Easy migration:** Thanks to S3 API compatibility, moving from Amazon S3 requires no application changes; you only change the endpoint and access keys. See [Connecting with S3 Tools](../baslangic/s3-araclari.md).
