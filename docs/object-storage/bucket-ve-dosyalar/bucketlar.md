---
sidebar_position: 1
title: Bucket'lar
description: Bucket adlandırma kuralları, bucket oluşturma, içeriğini listeleme, ayrıntılarını görüntüleme ve silme.
---

**Bucket**, nesnelerin (dosyaların) saklandığı benzersiz adlı bir kapsayıcıdır. Nesneleri gruplar ve diğer bucket'lardaki nesnelerden yalıtır. [S3 erişimi](../baslangic/s3-erisimi.md) etkinleştirildikten sonra bucket oluşturup veri yükleyebilirsiniz.

## Adlandırma Kuralları

Bucket adlarının DNS uyumlu olması önerilir. Bir bucket adı:

- **3 ile 63 karakter** arasında olmalıdır.
- Yalnızca **küçük harf**, **rakam**, **tire (-)** ve **nokta (.)** içerebilir.
- Bir **harf veya rakamla** başlayıp bitmelidir.
- Noktalarla ayrılmış geçerli ad parçalarından oluşabilir (ör. `yedek.uygulama-01`).

| Örnek | Geçerli mi? |
| --- | --- |
| `sirket-yedekleri` | Evet |
| `web.statik-icerik` | Evet |
| `Sirket_Yedekleri` | Hayır: büyük harf ve alt çizgi içeriyor |
| `-yedekler` | Hayır: tire ile başlıyor |
| `ab` | Hayır: 3 karakterden kısa |

## Bucket Oluşturma {#bucket-oluşturma}

1. Panelde **S3 storage** > **Buckets** ekranına gidin ve bucket oluşturma butonuna tıklayın.
2. **Create bucket** penceresinde bucket için bir ad girin.
3. **Create** butonuna tıklayın.

İlk bucket'ınızı oluşturduğunuzda S3 kullanıcınız ve bir [erişim anahtarı çifti](../baslangic/erisim-anahtarlari.md) otomatik olarak oluşturulur.

## Bucket İçeriğini Listeleme

**S3 storage** > **Buckets** ekranında bucket'ın adına tıklayın. Bucket'taki dosya ve klasörler listelenir. Dosya işlemleri için [Dosya ve Klasörler](./dosya-ve-klasorler.md) sayfasına bakın.

## Bucket Ayrıntılarını Görüntüleme

1. **S3 storage** > **Buckets** ekranında bucket'a tıklayın.
2. Sağ bölmede **Overview** sekmesini açın.

Bu sekmede şunlar görüntülenir:

| Bilgi | Açıklama |
| --- | --- |
| **Bucket adı** | Bucket'ın adı |
| **ARN** | Bucket'ın Amazon Resource Name kimliği. [Bucket politikalarında](../erisim-yonetimi/bucket-politikalari.md) bucket'ı kaynak olarak belirtmek için kullanılır. |
| **Oluşturma tarihi** | Bucket'ın oluşturulduğu tarih |
| **Erişim yolları** | Bucket'a HTTP ve HTTPS ile erişim adresleri. [S3 araçlarında](../baslangic/s3-araclari.md) uç nokta olarak kullanılır. |
| **S3 access keys** | [Erişim anahtarlarınız](../baslangic/erisim-anahtarlari.md) |

## Bucket Silme

:::warning
Yalnızca **boş** bir bucket silinebilir. Silmeden önce bucket'taki tüm dosya ve klasörleri silin veya başka bir bucket'a taşıyın.
:::

1. **S3 storage** > **Buckets** ekranında bucket'ın satırına tıklayın.
2. Sağ bölmede **Delete** butonuna tıklayın.
3. Onay penceresinde **Delete** butonuna tıklayın.
