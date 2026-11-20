---
sidebar_position: 2
title: Erişim Anahtarları
description: S3 erişim anahtarı çiftlerini oluşturma, kopyalama, devre dışı bırakma ve silme.
---

Bir **erişim anahtarı çifti** iki parçadan oluşur:

- **Access key ID:** Kullanıcı adı gibi çalışır.
- **Secret access key:** Parola gibi çalışır.

Üçüncü taraf S3 uygulamalarının (AWS CLI, rclone, yedekleme yazılımları vb.) bucket'larınıza erişebilmesi için her ikisi de gerekir.

Erişim anahtarları bucket'ın sağ bölmesinden yönetilir. Anahtarlar tek bir bucket'a değil, **S3 kullanıcınıza** aittir; oluşturduğunuz bir anahtar tüm bucket'larınızda görünür ve geçerlidir.

## Sınırlamalar

- En fazla **iki** erişim anahtarı çiftiniz olabilir.
- Yalnızca bir anahtar çifti varsa bu anahtarı **silemezsiniz**.
- Silinen bir erişim anahtarı **geri getirilemez**.

## Ön Koşullar

- Projenizde [S3 erişimi](./s3-erisimi.md) etkin olmalıdır.
- En az bir [bucket](../bucket-ve-dosyalar/bucketlar.md) oluşturulmuş olmalıdır. İlk bucket oluşturulduğunda bir anahtar çifti otomatik olarak oluşturulur.

## Anahtar Çifti Oluşturma

1. **S3 storage** > **Buckets** ekranında herhangi bir bucket'a tıklayın.
2. Sağ bölmede **Overview** sekmesindeki **S3 access keys** bölümünde **Create** butonuna tıklayın.
3. **Create S3 access key** penceresinde isteğe bağlı olarak anahtara bir ad verin ve **Create** butonuna tıklayın.

## Anahtarı Kopyalama

1. **S3 storage** > **Buckets** ekranında bir bucket'a tıklayın.
2. Sağ bölmede **Overview** sekmesindeki **S3 access keys** bölümünü bulun.
   - **Access key ID**'yi kopyalamak için anahtarın yanındaki kopyalama simgesine tıklayın.
   - **Secret access key**'i kopyalamak için anahtarın yanındaki üç nokta simgesine ve ardından **Copy secret access key** seçeneğine tıklayın.

## Anahtarı Devre Dışı Bırakma

1. **S3 storage** > **Buckets** ekranında bir bucket'a tıklayın.
2. Sağ bölmede **Overview** sekmesindeki **S3 access keys** bölümünde anahtarın yanındaki üç nokta simgesine ve ardından **Disable** seçeneğine tıklayın.

## Anahtarı Silme

1. **S3 storage** > **Buckets** ekranında bir bucket'a tıklayın.
2. Sağ bölmede **Overview** sekmesindeki **S3 access keys** bölümünde anahtarın yanındaki üç nokta simgesine ve ardından **Delete** seçeneğine tıklayın.

## Güvenlik Önerileri

- Anahtarlarınızı düzenli aralıklarla yenileyin: yeni bir anahtar çifti oluşturun, uygulamalarınızı yeni anahtara geçirin ve ardından eski anahtarı silin. İki anahtar çifti sınırı, bu geçişi kesintisiz yapabilmeniz içindir.
- Secret access key'i kaynak kodunuza, herkese açık depolara veya e-postaya yazmayın.
- Bir anahtarın ele geçirildiğinden şüpheleniyorsanız hemen **Disable** ile devre dışı bırakın ve yeni bir anahtar oluşturun.
- Uygulamalara yalnızca ihtiyaç duydukları bucket ve klasörlere erişim vermek için [bucket politikalarını](../erisim-yonetimi/bucket-politikalari.md) kullanın.
