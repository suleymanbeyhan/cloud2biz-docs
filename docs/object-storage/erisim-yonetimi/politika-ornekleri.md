---
sidebar_position: 2
title: Politika Örnekleri
description: En sık karşılaşılan erişim senaryoları için hazır bucket politikası örnekleri.
---

Aşağıdaki sekiz örnek, en sık karşılaşılan erişim senaryolarını kapsar. Kendi ortamınızda kullanmadan önce **bucket adlarını**, **IP aralıklarını** ve **kullanıcı ARN'lerini** güncelleyin. Politikaları nasıl ekleyeceğinizi [Bucket Politikaları](./bucket-politikalari.md#bucket-politikası-ekleme) sayfasında bulabilirsiniz.

## 1. Herkese Açık Salt Okunur Erişim {#1-herkese-açık-salt-okunur-erişim}

Bucket'taki nesnelerin herkes tarafından okunabilmesini sağlar. Statik web sitesi veya herkese açık içerik dağıtımı için uygundur.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadOnlyAccess",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::my-public-bucket/*"
    }
  ]
}
```

## 2. Herkese Açık Erişimi Engelleme {#2-herkese-açık-erişimi-engelleme}

Diğer politikalar veya ACL'ler izin verse bile bucket'ın tamamına genel erişimi açıkça engeller.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "DenyPublicAccess",
      "Effect": "Deny",
      "Principal": "*",
      "Action": "s3:*",
      "Resource": ["arn:aws:s3:::my-private-bucket", "arn:aws:s3:::my-private-bucket/*"]
    }
  ]
}
```

## 3. Belirli Bir IP Aralığından Erişime İzin Verme {#3-belirli-bir-ip-aralığından-erişime-izin-verme}

Yalnızca belirtilen IP adreslerinden bağlanan kullanıcılara salt okunur erişim tanır.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowAccessFromIP",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::my-secure-bucket/*",
      "Condition": {
        "IpAddress": {
          "aws:SourceIp": "192.168.1.0/24"
        }
      }
    }
  ]
}
```

## 4. Başka Bir S3 Kullanıcısına Erişim Verme {#4-başka-bir-s3-kullanıcısına-erişim-verme}

Belirtilen başka bir S3 kullanıcısının bucket'ınıza nesne yüklemesine izin verir.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowAccountUpload",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::<domain_id>:<user_id>"
      },
      "Action": "s3:PutObject",
      "Resource": "arn:aws:s3:::my-shared-bucket/*"
    }
  ]
}
```

## 5. Belirli Bir Klasöre Erişime İzin Verme {#5-belirli-bir-klasöre-erişime-izin-verme}

Bucket içindeki yalnızca belirli bir klasöre okuma erişimi tanır.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowFolderAccess",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::my-bucket/folder1/*"
    }
  ]
}
```

## 6. Erişimi Belirli Bir Yolla Sınırlama {#6-erişimi-belirli-bir-yolla-sınırlama}

Kullanıcının yalnızca belirli bir klasördeki nesneleri listeleyip okumasına izin verir; bucket'taki diğer nesnelere erişemez.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowListSpecificPrefix",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::<domain_id>:<user_id>"
      },
      "Action": "s3:ListBucket",
      "Resource": "arn:aws:s3:::my-bucket",
      "Condition": {
        "StringEquals": {
          "s3:prefix": "my-folder/"
        }
      }
    },
    {
      "Sid": "AllowGetSpecificFolder",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::<domain_id>:<user_id>"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::my-bucket/my-folder/*"
    }
  ]
}
```

## 7. Minimum TLS Sürümü Zorunluluğu {#7-minimum-tls-sürümü-zorunluluğu}

TLS sürümü 1.2'den düşük olan (örneğin 1.1 veya 1.0) istemcilerin bucket'a nesne yüklemesini engeller.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Deny",
      "Principal": "*",
      "Action": "s3:PutObject",
      "Resource": [
        "arn:aws:s3:::my-bucket",
        "arn:aws:s3:::my-bucket/*"
      ],
      "Condition": {
        "NumericLessThan": {
          "s3:TlsVersion": 1.2
        }
      }
    }
  ]
}
```

## 8. Nesnelerin Silinmesini Engelleme {#8-nesnelerin-silinmesini-engelleme}

`DeleteObject` işlemini reddederek önemli nesneler içeren bucket'ı silinmeye karşı korur.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "DenyObjectDeletion",
      "Effect": "Deny",
      "Principal": "*",
      "Action": "s3:DeleteObject",
      "Resource": "arn:aws:s3:::my-bucket/*"
    }
  ]
}
```
