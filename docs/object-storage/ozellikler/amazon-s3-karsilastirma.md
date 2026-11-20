---
sidebar_position: 2
title: Amazon S3 Karşılaştırması
description: Cloud2Biz Object Storage ile Amazon S3'ün özellik, kullanım alanı, güçlü ve zayıf yönler açısından karşılaştırması.
---

## Özet

Yedekleme, arşivleme, uygulama verisi ve içerik depolama gibi temel senaryolarda Cloud2Biz Object Storage, Amazon S3 ile **aynı API'yi ve çekirdek özellikleri** sunar. Fark iki noktada belirginleşir: Amazon S3 çok daha geniş bir AWS ekosistemi ve ileri seviye yönetim araçları sunarken, Cloud2Biz Object Storage verinin **Türkiye ve Bulgaristan'da, yerel destekle** tutulmasını sağlar.

AWS ekosistemine (Lambda, Athena, SQS vb.) bağlı olmayan ve verisini yurt içinde tutmak isteyen kurumlar için Cloud2Biz Object Storage doğrudan bir alternatiftir.

## Özellik Karşılaştırması

Temel S3 özelliklerinin tamamı iki tarafta da bulunur; farklar yaşam döngüsü, depolama sınıfları ve AWS'ye özgü ileri araçlardadır.

| Özellik | Amazon S3 | Cloud2Biz Object Storage |
| --- | --- | --- |
| S3 API (GET, PUT, COPY, DELETE) | ✅ Var | ✅ Var |
| Multipart Upload | ✅ Var | ✅ Var |
| Versioning | ✅ Var | ✅ Var |
| Object Locking (WORM) | ✅ Var | ✅ Var |
| Presigned URLs | ✅ Var | ✅ Var |
| Bucket Policies | ✅ Var | ✅ Var |
| Access Control Lists (ACLs) | ✅ Var | ✅ Var |
| Sunucu tarafı şifreleme | ✅ Var (SSE-S3, SSE-KMS, SSE-C) | ✅ Var (isteğe bağlı) |
| CORS | ✅ Var | ✅ Var |
| Object Tagging | ✅ Var | ✅ Var |
| Data Integrity Checks | ✅ Var | ✅ Var |
| Server Access Logging | ✅ Var | ✅ Var |
| Statik web sitesi barındırma | ✅ Var | ✅ Var |
| Bucket Notifications | ✅ Var (Lambda, SQS, SNS, EventBridge) | ✅ Var |
| Replikasyon | ✅ Var (bölge içi ve bölgeler arası) | ✅ Var (İstanbul, Ankara, Sofya arası) |
| Depolama sınıfları | ✅ Geniş (Standard, IA, Intelligent-Tiering, Glacier ailesi vb.) | ✅ Var |
| Yaşam döngüsü | ✅ Var (silme + sınıf geçişi) | ⚠️ Kısmi (yalnızca silme) |
| Arşiv katmanı (Glacier türü) | ✅ Var | ❌ Yok |
| İleri yönetim araçları (Batch Operations, Inventory, Storage Lens, Access Points) | ✅ Var | ❌ Yok |
| Sorgu ve analitik entegrasyonu (Athena, S3 Select vb.) | ✅ Var | ❌ Yok (Hadoop/Spark ile S3 API üzerinden) |
| Veri lokasyonu | Dünya geneli AWS bölgeleri; Türkiye'de yalnızca İstanbul Local Zone (S3 One Zone-IA) | İstanbul, Ankara, Sofya |

## Kullanım Alanı Karşılaştırması

Altı senaryodan beşinde Cloud2Biz Object Storage güçlü bir seçenektir; AWS'ye bağlı analitik ve sunucusuz iş akışlarında Amazon S3 öne çıkar.

| Senaryo | Amazon S3 | Cloud2Biz Object Storage | Not |
| --- | --- | --- | --- |
| Yedekleme | Uygun | Uygun | Object Lock ile fidye yazılımına karşı koruma iki tarafta da var; yerel lokasyon geri yükleme süresini kısaltabilir. |
| Arşivleme | Uygun | Uygun | Amazon S3'te Glacier ile çok düşük maliyetli derin arşiv var; yasal saklama yurt içinde isteniyorsa Cloud2Biz Object Storage avantajlı. |
| Büyük veri analitiği | Uygun | Uygun | Hadoop/Spark iki tarafta da çalışır; Athena gibi yönetilen analitik yalnızca AWS'de. |
| Bulut tabanlı uygulamalar | Uygun | Uygun | S3 API ile yazılmış uygulamalar değişiklik yapmadan taşınabilir. |
| Dijital varlık yönetimi | Uygun | Uygun | Türkiye'deki kullanıcılar için yerel lokasyon düşük gecikme sağlayabilir. |
| AWS'ye bağlı sunucusuz iş akışları (Lambda tetikleme vb.) | Uygun | Sınırlı | Bu bağımlılık varsa Amazon S3 daha doğal tercih. |

## Güçlü ve Zayıf Yönler

Cloud2Biz Object Storage'ın en güçlü farkı, tam S3 özellik setinin Türkiye'de iki lokasyonda sunulmasıdır; Amazon S3'ün farkı ise ekosistem ve ileri araçlardır.

**AWS'nin Türkiye'deki durumu:** AWS, 20 Mayıs 2026'da İstanbul'da bir Local Zone açmıştır ([AWS duyurusu](https://aws.amazon.com/de/about-aws/whats-new/2026/05/aws-local-zones-istanbul-turkiye/)). Ancak bu tam bir AWS bölgesi değildir: İstanbul Local Zone'da Amazon S3 yalnızca One Zone-Infrequent Access sınıfıyla sunulmakta ve zone, Frankfurt bölgesine bağlı olarak yönetilmektedir ([DCD](https://datacenterdynamics.com/en/news/aws-launches-local-zone-edge-location-in-istanbul-turkey/)). Yani Türkiye'de tutulan Amazon S3 verisi tek bir zone'da, sınırlı özellikle durmaktadır.

### Cloud2Biz Object Storage'ın Öne Çıktığı Noktalar

- **Yurt içinde coğrafi yedeklilik:** İstanbul ve Ankara arasında replikasyonla veri Türkiye sınırları içinde iki ayrı şehirde tutulabilir. Amazon S3'te Türkiye'de bunun karşılığı yoktur.
- **Tam özellik seti yurt içinde:** Versioning, Object Lock, bucket politikaları ve diğer S3 özellikleri yerel lokasyonda eksiksiz sunulur.
- **Avrupa Birliği seçeneği:** Sofya lokasyonu, verisini AB içinde tutmak isteyen kurumlara hitap eder.
- **Yerel destek ve muhatap:** Türkçe destek ve yerel bir hizmet sağlayıcıyla doğrudan iletişim.
- **Taşınabilirlik:** S3 API uyumu sayesinde Amazon S3'ten veya Amazon S3'e geçişte uygulama değişikliği gerekmez.

### Amazon S3'ün Üstün Olduğu Alanlar

- **Ekosistem:** Lambda, Athena, SQS gibi AWS servisleriyle doğrudan entegrasyon.
- **Arşiv ve maliyet katmanları:** Glacier ailesi ve otomatik sınıf geçişi ile çok uzun süreli arşivde düşük maliyet.
- **İleri yönetim araçları:** Batch Operations, Inventory, Storage Lens gibi büyük ölçekli veri yönetim araçları.
- **Küresel erişim:** Dünya geneline yayılmış bölgelerle global uygulamalar için geniş seçenek.

## Kaynaklar

- [AWS Local Zone İstanbul duyurusu](https://aws.amazon.com/de/about-aws/whats-new/2026/05/aws-local-zones-istanbul-turkiye/)
- [DCD: AWS launches Local Zone in Istanbul](https://datacenterdynamics.com/en/news/aws-launches-local-zone-edge-location-in-istanbul-turkey/)
- [Desteklenen S3 Özellikleri](./desteklenen-ozellikler.md)
