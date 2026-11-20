---
sidebar_position: 1
title: Desteklenen S3 Özellikleri
description: Cloud2Biz Object Storage'ın desteklediği Amazon S3 özellikleri ve ayrıntıları.
---

Object Storage, Amazon S3 protokolüyle uyumlu çalışır ve **GET, PUT, COPY, DELETE** gibi temel S3 işlemlerinin yanı sıra **15 gelişmiş S3 özelliğini** destekler. Bu uyumluluk sayesinde Amazon S3 için geliştirilmiş uygulama, SDK ve araçlarınızı değişiklik yapmadan kullanmaya devam edebilirsiniz.

## Desteklenen Özellikler

| Kategori | Özellik | Amazon S3 karşılığı |
| --- | --- | --- |
| Veri yönetimi | Multipart Upload | Multipart upload |
| Veri yönetimi | Versioning | Versioning |
| Veri yönetimi | Object Storage Classes | Object storage classes |
| Veri yönetimi | Object Expiration | Bucket lifecycle (yalnızca object expiration) |
| Veri yönetimi | Object Tagging | Object tagging |
| Güvenlik ve erişim | Access Control Lists (ACLs) | Access control lists (ACLs) |
| Güvenlik ve erişim | Bucket Policies | Bucket policies |
| Güvenlik ve erişim | Presigned URLs | Presigned URLs |
| Güvenlik ve erişim | Object Locking | Object locking |
| Güvenlik ve erişim | CORS | Cross-origin resource sharing |
| Süreklilik ve bütünlük | Cross-Region Replication | Cross-region replication (CRR) |
| Süreklilik ve bütünlük | Data Integrity Checks | Data integrity checks |
| İzleme ve entegrasyon | Server Access Logging | Server access logging |
| İzleme ve entegrasyon | Bucket Notifications | Bucket notifications |
| İzleme ve entegrasyon | Website Hosting | Website hosting |

## Veri Yönetimi {#veri-yönetimi}

- **Çok parçalı yükleme (Multipart Upload):** Büyük dosyalar parçalara bölünerek paralel yüklenir. Bağlantı kesilirse yalnızca eksik parçalar yeniden gönderilir.
- **Sürüm yönetimi (Versioning):** Nesnelerin önceki sürümleri saklanır. Hatalı değişiklik veya silme durumunda eski sürüme dönülür.
- **Depolama sınıfları (Storage Classes):** Veriler erişim sıklığına ve performans ihtiyacına göre farklı sınıflarda saklanır.
- **Nesne yaşam süresi yönetimi (Object Expiration):** Tanımlanan kurallara göre süresi dolan nesneler otomatik olarak silinir.
- **Nesne etiketleme (Object Tagging):** Nesnelere anahtar-değer etiketleri eklenerek sınıflandırma ve yönetim kolaylaşır.

## Güvenlik ve Erişim {#güvenlik-ve-erişim}

- **Erişim kontrol listeleri (ACL):** Bucket ve nesne düzeyinde kullanıcı bazlı okuma ve yazma izinleri tanımlanır.
- **Bucket politikaları:** JSON tabanlı kurallarla kullanıcı, klasör, IP adresi ve TLS sürümü bazlı erişim kontrolü sağlanır. Bkz. [Bucket Politikaları](../erisim-yonetimi/bucket-politikalari.md).
- **Ön imzalı URL'ler (Presigned URLs):** Kimlik bilgisi paylaşmadan, süre sınırlı ve güvenli erişim bağlantıları oluşturulur.
- **Nesne kilitleme (Object Locking):** Nesneler WORM (Write Once, Read Many) prensibiyle belirlenen süre boyunca silinmeye ve değiştirilmeye karşı korunur; fidye yazılımına karşı etkili bir önlemdir.
- **CORS desteği:** Farklı alan adlarından çalışan web uygulamalarının bucket'a güvenli şekilde erişmesi sağlanır.

## Süreklilik ve Bütünlük {#süreklilik-ve-bütünlük}

- **Bölgeler arası replikasyon (CRR):** Yazılan veriler farklı bir lokasyona otomatik olarak kopyalanır. Bölgesel kesintilerde iş sürekliliği korunur.
- **Veri bütünlüğü kontrolleri:** Yükleme ve indirme sırasında checksum doğrulaması yapılarak verinin bozulmadan aktarıldığı teyit edilir.

## İzleme ve Entegrasyon {#izleme-ve-entegrasyon}

- **Sunucu erişim kayıtları (Server Access Logging):** Bucket'a yapılan tüm istekler kayıt altına alınır. Denetim, güvenlik analizi ve uyumluluk raporlamasında kullanılır.
- **Bucket bildirimleri (Bucket Notifications):** Nesne oluşturma veya silme gibi olaylarda otomatik bildirim gönderilerek iş akışları tetiklenir.
- **Statik web sitesi barındırma (Website Hosting):** HTML, CSS ve görsellerden oluşan statik siteler doğrudan bucket üzerinden yayınlanır.

## Önemli Notlar

:::note Yaşam döngüsü kuralları
Bucket yaşam döngüsü (lifecycle) kurallarında yalnızca **nesne silme (object expiration)** desteklenir. Depolama sınıfı geçişi (transition) gibi diğer yaşam döngüsü eylemleri desteklenmez.
:::

Ayrıntılı teknik uyumluluk; desteklenen Amazon S3 REST işlemleri, istek ve yanıt başlıkları, kimlik doğrulama yöntemleri, bucket politikalarında desteklenen S3 özellikleri, nesne süre sonu eylemleri, veri bütünlüğü kontrolleri ve nesne etiketlerini kapsar. Belirli bir işlem veya başlıkla ilgili sorularınız için [destek talebi](https://cloud2biz.com/clientarea) oluşturabilirsiniz.

Amazon S3 ile ayrıntılı karşılaştırma için [Amazon S3 Karşılaştırması](./amazon-s3-karsilastirma.md) sayfasına bakın.
