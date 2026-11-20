---
sidebar_position: 1
title: Genel Bakış
description: Cloud2Biz Object Storage nedir, nasıl çalışır, hangi özellikleri sunar ve hangi lokasyonlarda kullanılabilir.
---

**Cloud2Biz Object Storage**, verilerinizi **nesne (object)** olarak saklayan, **Amazon S3 protokolüyle uyumlu** bir depolama hizmetidir. GET, PUT, COPY, DELETE gibi temel S3 işlemlerinin yanı sıra versioning, object lock, bucket politikaları ve replikasyon gibi gelişmiş S3 özelliklerini destekler.

Bu uyumluluk sayesinde Amazon S3 için geliştirilmiş uygulama, SDK ve araçlarınızı **değişiklik yapmadan** kullanmaya devam edebilirsiniz.

## Temel Kavramlar

| Kavram | Açıklama |
| --- | --- |
| **Bucket** | Nesnelerin saklandığı, benzersiz adlı kapsayıcı. Nesneleri gruplar ve diğer bucket'lardaki nesnelerden yalıtır. |
| **Nesne (object)** | Bucket içinde saklanan dosya ve ona ait meta veriler. |
| **Anahtar (key)** | Nesnenin bucket içindeki tam adı (ör. `raporlar/2026/ocak.pdf`). |
| **Prefix / klasör** | Nesne anahtarlarının ortak başlangıcı (ör. `raporlar/`). Panelde klasör olarak gösterilir. |
| **Erişim anahtarı** | Uygulamaların S3'e bağlanmak için kullandığı **access key ID** ve **secret access key** çifti. |
| **ARN** | Bucket'ın Amazon Resource Name biçimindeki kimliği (ör. `arn:aws:s3:::my-bucket`). Bucket politikalarında kullanılır. |

## Öne Çıkan Özellikler

- **Tam S3 API uyumu:** AWS CLI, rclone, s3cmd, Cyberduck ve AWS SDK'ları ile çalışır.
- **Veri koruma:** [Versioning](./ozellikler/desteklenen-ozellikler.md#veri-yönetimi) ile önceki sürümlere dönüş, [Object Lock](./ozellikler/desteklenen-ozellikler.md#güvenlik-ve-erişim) (WORM) ile fidye yazılımına karşı koruma.
- **Ayrıntılı erişim kontrolü:** [Bucket politikaları](./erisim-yonetimi/bucket-politikalari.md) ile kullanıcı, klasör, IP adresi ve TLS sürümü bazlı yetkilendirme; ACL'ler ve süre sınırlı ön imzalı URL'ler.
- **Lokasyonlar arası replikasyon:** Verilerinizi farklı bir lokasyona otomatik olarak kopyalayarak iş sürekliliği sağlayın.
- **Statik web sitesi barındırma:** HTML, CSS ve görsellerden oluşan siteleri doğrudan bucket üzerinden yayınlayın.

Tüm özelliklerin listesi için [Desteklenen S3 Özellikleri](./ozellikler/desteklenen-ozellikler.md) sayfasına bakın.

## Lokasyonlar

Object Storage aşağıdaki lokasyonlarda kullanılabilir:

- **İstanbul** — Türkiye
- **Ankara** — Türkiye
- **Sofya** — Bulgaristan (Avrupa Birliği)

Verilerinizi Türkiye sınırları içinde iki ayrı şehirde veya Avrupa Birliği içinde tutabilirsiniz.

## Nasıl Başlanır?

1. Projeniz için [S3 erişiminin etkin](./baslangic/s3-erisimi.md) olduğundan emin olun.
2. Panelde **S3 storage** > **Buckets** ekranından [ilk bucket'ınızı oluşturun](./bucket-ve-dosyalar/bucketlar.md#bucket-oluşturma). İlk bucket ile birlikte S3 kullanıcınız ve bir erişim anahtarı çifti otomatik olarak oluşturulur.
3. [Erişim anahtarlarınızı](./baslangic/erisim-anahtarlari.md) kopyalayın.
4. Dosyalarınızı [panelden](./bucket-ve-dosyalar/dosya-ve-klasorler.md) veya [S3 araçlarıyla](./baslangic/s3-araclari.md) yükleyin.

## Kullanım Alanları

| Senaryo | Açıklama |
| --- | --- |
| **Yedekleme** | Sunucu, veritabanı ve uygulama yedeklerinin saklanması; Object Lock ile değiştirilemez yedekler |
| **Arşivleme** | Yasal saklama gerektiren verilerin yurt içinde uzun süreli saklanması |
| **Uygulama verisi** | Kullanıcı yüklemeleri, görseller, videolar ve dokümanlar |
| **Büyük veri** | Hadoop ve Spark gibi araçlarla S3 API üzerinden analiz |
| **Statik web siteleri** | Bucket üzerinden doğrudan yayınlanan statik içerik |
