---
sidebar_position: 1
title: S3 Erişimi
description: Projenizde S3 erişiminin nasıl etkinleştirildiği, kapasite kotası ve S3 kullanıcısının oluşturulması.
---

Object Storage kullanabilmek için projenizde **S3 erişiminin etkin** olması gerekir. S3 erişimi proje bazında, proje kotaları üzerinden tanımlanır.

## S3 Erişimi Nasıl Etkinleştirilir?

- S3 erişimi varsayılan olarak tüm projelerde **kapalıdır**.
- Object Storage hizmetiniz tanımlandığında S3 erişimi projeniz için **Cloud2Biz tarafından etkinleştirilir** ve kullanabileceğiniz **depolama kapasitesi** (GiB cinsinden) kota olarak belirlenir.
- S3 erişimi etkinleştirildiğinde, projenin üyeleri panelde **S3 storage** ekranını görür.

:::tip
Panelde **S3 storage** ekranını göremiyorsanız veya kapasite kotanızı artırmak istiyorsanız [cloud2biz.com](https://cloud2biz.com/clientarea) üzerinden destek talebi oluşturun.
:::

## S3 Kullanıcısı

S3 kullanıcısını ayrıca oluşturmanız gerekmez. Proje üyesi **ilk bucket'ını oluşturduğunda**, bir S3 kullanıcısı ve ona ait bir **erişim anahtarı çifti** otomatik olarak oluşturulur. Ayrıntılar için [Erişim Anahtarları](./erisim-anahtarlari.md) sayfasına bakın.

## S3 Erişimi Kapatılırsa

S3 erişimi bir proje için kapatıldığında projenin Object Storage erişimi durdurulur; ancak **S3 kullanıcıları, bucket'lar ve veriler korunur**. Erişim yeniden açıldığında kaldığınız yerden devam edebilirsiniz.

## Salt Okunur Erişim

Projeye erişiminiz salt okunur ise panelin sağ üst köşesinde **Read-only mode** etiketi görünür. Bu modda kaynakları görüntüleyebilir ancak değiştiremezsiniz.
