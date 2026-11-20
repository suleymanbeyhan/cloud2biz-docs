---
sidebar_position: 2
title: Amazon S3 Karşılaştırması
description: Cloud2Biz Object Storage'ın Amazon S3 ile uyumluluğu ve yurt içinde sunduğu avantajlar.
---

## Özet

Cloud2Biz Object Storage, Amazon S3 ile **aynı API'yi ve çekirdek özellikleri** sunar. Yedekleme, arşivleme, uygulama verisi ve içerik depolama gibi senaryolarda Amazon S3 için geliştirilmiş uygulamalarınızı değişiklik yapmadan kullanabilirsiniz. Üstelik verileriniz **Türkiye'de iki şehirde ve Avrupa Birliği'nde**, tam özellik setiyle ve **yerel destekle** saklanır.

## Özellik Karşılaştırması

| Özellik | Amazon S3 | Cloud2Biz Object Storage |
| --- | --- | --- |
| S3 API (GET, PUT, COPY, DELETE) | ✅ | ✅ |
| Multipart Upload | ✅ | ✅ |
| Versioning | ✅ | ✅ |
| Object Locking (WORM) | ✅ | ✅ |
| Presigned URLs | ✅ | ✅ |
| Bucket Policies | ✅ | ✅ |
| Access Control Lists (ACLs) | ✅ | ✅ |
| Sunucu tarafı şifreleme | ✅ | ✅ |
| CORS | ✅ | ✅ |
| Object Tagging | ✅ | ✅ |
| Data Integrity Checks | ✅ | ✅ |
| Server Access Logging | ✅ | ✅ |
| Statik web sitesi barındırma | ✅ | ✅ |
| Bucket Notifications | ✅ | ✅ |
| Depolama sınıfları | ✅ | ✅ |
| Lokasyonlar arası replikasyon | ✅ | ✅ İstanbul, Ankara ve Sofya arası |
| Türkiye'de iki ayrı şehirde veri saklama | ❌ | ✅ İstanbul ve Ankara |
| Türkiye'de tam S3 özellik seti | ❌ Yalnızca İstanbul Local Zone, tek depolama sınıfı (S3 One Zone-IA) | ✅ Tüm özellikler |
| Avrupa Birliği lokasyonu | ✅ | ✅ Sofya |
| Türkçe yerel destek | ❌ | ✅ |

Desteklenen özelliklerin ayrıntıları için [Desteklenen S3 Özellikleri](./desteklenen-ozellikler.md) sayfasına bakın.

## Kullanım Alanları

| Senaryo | Cloud2Biz Object Storage ile |
| --- | --- |
| **Yedekleme** | Object Lock ile fidye yazılımına karşı değiştirilemez yedekler; yerel lokasyon sayesinde daha kısa geri yükleme süresi |
| **Arşivleme** | Yasal saklama gerektiren verilerin yurt içinde, iki ayrı şehirde güvenle saklanması |
| **Büyük veri analitiği** | Hadoop ve Spark ile S3 API üzerinden analiz |
| **Bulut tabanlı uygulamalar** | S3 API ile yazılmış uygulamaların değişiklik yapmadan taşınması |
| **Dijital varlık yönetimi** | Türkiye'deki kullanıcılar için yerel lokasyonla düşük gecikme |

## Cloud2Biz Object Storage'ın Avantajları

- **Yurt içinde coğrafi yedeklilik:** İstanbul ve Ankara arasında replikasyonla verileriniz Türkiye sınırları içinde iki ayrı şehirde tutulabilir.
- **Tam özellik seti yurt içinde:** Versioning, Object Lock, bucket politikaları ve diğer S3 özellikleri yerel lokasyonda eksiksiz sunulur. AWS'nin İstanbul'daki Local Zone'u tam bir bölge değildir ve Amazon S3'ü yalnızca tek bir zone'da, tek bir depolama sınıfıyla (One Zone-Infrequent Access) sunar ([AWS duyurusu](https://aws.amazon.com/de/about-aws/whats-new/2026/05/aws-local-zones-istanbul-turkiye/)).
- **Avrupa Birliği seçeneği:** Sofya lokasyonu, verisini AB içinde tutmak isteyen kurumlar için uygundur.
- **Yerel destek ve muhatap:** Türkçe destek ve yerel bir hizmet sağlayıcıyla doğrudan iletişim.
- **Düşük gecikme:** Türkiye'deki kullanıcılarınıza ve sunucularınıza yakın lokasyonlar.
- **Kolay geçiş:** S3 API uyumu sayesinde Amazon S3'ten geçişte uygulama değişikliği gerekmez; yalnızca uç nokta adresini ve erişim anahtarlarını değiştirmeniz yeterlidir. Bkz. [S3 Araçlarıyla Bağlanma](../baslangic/s3-araclari.md).
