---
sidebar_position: 2
title: Dosya ve Klasörler
description: Bucket içinde klasör oluşturma, dosya yükleme, indirme ve silme.
---

Bucket'lardaki dosya ve klasörleri panelin **S3 storage** ekranından yönetebilirsiniz. Çok sayıda veya büyük dosyalar için [S3 araçlarını](../baslangic/s3-araclari.md) kullanmanızı öneririz.

## Ön Koşul

Önce bir [bucket oluşturmalısınız](./bucketlar.md#bucket-oluşturma).

## Sınırlama

Panelde **klasör boyutu** görüntülenemez.

## Klasör Oluşturma

1. **S3 storage** > **Buckets** ekranında bucket'ın adına tıklayın.
2. Bucket ekranında **Create folder** butonuna tıklayın.
3. **Create folder** penceresinde klasöre bir ad verin ve **Create** butonuna tıklayın.

:::note
S3'te klasörler gerçek dizinler değil, nesne anahtarlarının ortak başlangıcıdır (prefix). Örneğin `raporlar/ocak.pdf` nesnesi panelde `raporlar` klasörünün içinde gösterilir.
:::

## Dosya Yükleme

1. **S3 storage** > **Buckets** ekranında bucket'ın adına tıklayın. İsterseniz yükleme yapılacak klasörün adına da tıklayın.
2. Dosyaları ekrana sürükleyip bırakın veya **Upload files** butonuna tıklayın.
3. **Upload files** penceresinde yüklemek istediğiniz dosyaları seçin.

## Dosya İndirme

1. **S3 storage** > **Buckets** ekranında bucket'ın adına (gerekirse klasörün adına) tıklayın.
2. İndirmek istediğiniz dosyaya tıklayın.
3. Dosyanın sağ bölmesinde **Download** butonuna tıklayın.

## Dosya veya Klasör Silme

1. **S3 storage** > **Buckets** ekranında dosyanın bulunduğu bucket'a tıklayın.
2. Silmek istediğiniz dosya veya klasöre tıklayın.
3. Sağ bölmede **Delete** butonuna tıklayın.

:::tip Yanlışlıkla silmeye karşı
Önemli veriler için [Versioning](../ozellikler/desteklenen-ozellikler.md#veri-yönetimi) kullanın veya [bucket politikasıyla](../erisim-yonetimi/politika-ornekleri.md#8-nesnelerin-silinmesini-engelleme) silme işlemini engelleyin.
:::
