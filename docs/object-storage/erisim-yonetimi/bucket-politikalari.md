---
sidebar_position: 1
title: Bucket Politikaları
description: JSON tabanlı bucket politikalarıyla erişim kontrolü, panelde politika oluşturucu ile politika ekleme ve en iyi uygulamalar.
---

**Bucket politikaları**, bir bucket'a ve içindeki nesnelere **kimin**, **hangi koşullarda**, **hangi işlemleri** yapabileceğini belirleyen JSON tabanlı erişim kurallarıdır. Politikalar AWS IAM politika dilini kullanır. Bu sayede erişim yetkileri kullanıcı, klasör, nesne ve IP adresi düzeyinde ayrıntılı olarak kontrol edilebilir.

Politikalar paneldeki grafik **Policy builder** ile kod yazmadan hazırlanabilir veya hazır bir JSON dosyası yüklenerek uygulanabilir.

:::note
Bir bucket'a politika yalnızca **bucket sahibi** tarafından eklenebilir. Bucket politikalarında Amazon S3 eylemlerinin, koşul anahtarlarının ve koşul operatörlerinin **belirli bir alt kümesi** desteklenir.
:::

## Politika Yapısı

Bir politika bir veya daha fazla **ifade (statement)** içerir. Her ifade şu öğelerden oluşur:

| Öğe | Açıklama |
| --- | --- |
| **Sid** | İfadenin kimliği (ör. `AllowReadFromOffice`) |
| **Effect** | İfadenin isteğe izin mi (`Allow`) yoksa engel mi (`Deny`) olduğu |
| **Principal** | İfadenin uygulandığı kullanıcı, hesap veya herkes (`*`) |
| **Action** | İzin verilen veya engellenen S3 işlemleri (ör. `s3:GetObject`) |
| **Resource** | İfadenin kapsadığı bucket, klasör (prefix) veya nesneler |
| **Condition** | İsteğin özelliklerine göre ek kısıtlamalar (ör. kaynak IP adresi, TLS sürümü) |

Politikalar bucket'ın tamamına, belirli bir klasöre (prefix) veya tek tek nesnelere uygulanabilir.

## Öne Çıkan Özellikler

| Özellik | Açıklama |
| --- | --- |
| **Grafik politika oluşturucu** | Policy builder ile politika ifadeleri JSON yazmadan arayüzden oluşturulur |
| **JSON yükleme** | Hazır politika dosyaları doğrudan yüklenerek uygulanır |
| **Allow / Deny ifadeleri** | Her ifade seçilen işlemlere izin verir veya bunları açıkça engeller |
| **S3 eylem seçimi** | Okuma, yazma, silme gibi S3 işlemleri açılır menüden seçilir |
| **Kaynak bazlı kontrol** | Kural tüm bucket'a ya da belirli klasör (prefix) ve nesnelere uygulanır |
| **Kullanıcı / domain bazlı yetki** | Yetki tüm S3 kullanıcılarına veya ARN ile belirtilen kullanıcı ve domainlere verilir |
| **Koşul tanımlama** | Prefix, kaynak IP adresi gibi koşullarla ek kısıtlama getirilir |
| **JSON görünümü ve dışa aktarma** | Oluşturulan politika JSON olarak incelenir ve dosya olarak indirilir |

## Bucket Politikası Ekleme

**Ön koşul:** Politika eklenecek [bucket](../bucket-ve-dosyalar/bucketlar.md) önceden oluşturulmuş olmalıdır.

1. **S3 storage** > **Buckets** ekranına gidin ve ilgili bucket'ın satırına tıklayın.
2. Sağ bölmede **Manage bucket policy** seçeneğine tıklayın.
3. Açılan pencerede hazır bir JSON dosyası yükleyin veya ifadeleri **Policy builder** ile oluşturun:
   1. **Policy builder** alanında **Add** ile yeni bir ifade ekleyin.
   2. **Statement ID (Sid)** girin. Yalnızca büyük/küçük harf (A-Z, a-z) ve rakam (0-9) kullanılabilir; boşluk içeremez.
   3. İfade tipini seçin: **Allow** (izin ver) veya **Deny** (engelle).
   4. Açılır menüden uygulanacak **S3 eylemlerini** seçin.
   5. Kaynakları belirleyin: bucket'ın tamamı için **All objects in the bucket**, belirli klasör veya nesneler için **Select prefix or object** seçin. Örnek: `arn:aws:s3:::my-bucket/my-folder1/*`

      ![Resources alanında klasör ve nesne kaynakları](/img/flexostack/s3-policy-resources.webp)

   6. **Principal** belirleyin: tüm kullanıcılar için **All S3 users**, belirli kullanıcılar için **Specify S3 users or domains** seçin ve `arn:aws:iam::<domain_id>:<user_id>` biçimini kullanın.

      ![Principals alanında S3 kullanıcılarının ARN'leri](/img/flexostack/s3-policy-principals.webp)

   7. İsteğe bağlı olarak **Conditions** alanında koşul anahtarı, operatör ve değer tanımlayın. Örnek: `aws:SourceIp` + `IpAddress` + `192.168.1.0/24`

      ![Conditions alanında koşul anahtarı, operatör ve değer](/img/flexostack/s3-policy-conditions.webp)

   8. **Add** ile ifadeyi oluşturun.
4. İhtiyaç duyduğunuz kadar ifade ekleyin.
5. **JSON view** sekmesinde politikayı kontrol edin; gerekirse **Download file** ile JSON olarak indirin.
6. **Save** ile kaydedin.

Uygulanan politika, bucket'ın **Bucket policy** sekmesinde JSON biçiminde görüntülenebilir.

## Örnek Politika

Aşağıdaki politika, belirli bir kullanıcının yalnızca şirket ağından (`192.168.1.0/24`) `raporlar/` klasörünü okumasına izin verir ve tüm kullanıcılar için nesne silmeyi engeller:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowReadFromOffice",
      "Effect": "Allow",
      "Principal": { "AWS": ["arn:aws:iam::<domain_id>:<user_id>"] },
      "Action": ["s3:GetObject"],
      "Resource": ["arn:aws:s3:::my-bucket/raporlar/*"],
      "Condition": { "IpAddress": { "aws:SourceIp": "192.168.1.0/24" } }
    },
    {
      "Sid": "DenyDeleteForAll",
      "Effect": "Deny",
      "Principal": "*",
      "Action": ["s3:DeleteObject"],
      "Resource": ["arn:aws:s3:::my-bucket/*"]
    }
  ]
}
```

Daha fazla hazır örnek için [Politika Örnekleri](./politika-ornekleri.md) sayfasına bakın.

## Yaygın Kullanım Senaryoları

- **Ofis dışı erişimi engelleme:** `aws:SourceIp` koşuluyla erişimi yalnızca kurumsal IP aralıklarına sınırlayın.
- **Departman bazlı klasör yetkisi:** Her ekibe yalnızca kendi prefix'ine erişim verin.
- **Yedeklerin korunması:** `Deny` ile silme işlemini engelleyerek yedekleri kazara veya kötü niyetli silinmeye karşı koruyun.

## En İyi Uygulamalar

- **Deny ifadelerini tercih edin:** Mümkün olan her yerde `Deny` kullanarak sıkı güvenlik uygulayın.
- **`*` kullanımını sınırlayın:** Principal olarak `*` vermek tüm kullanıcılara yetki tanır; istenmeyen erişimleri önlemek için bundan kaçının.
- **Koşullardan yararlanın:** Conditions ile IP adresi veya prefix gibi ek kısıtlamalar tanımlayın.
- **Düzenli denetleyin:** Politikaları belirli aralıklarla gözden geçirerek güvenlik ve uyumluluk gereksinimleriyle uyumlu kalın.
