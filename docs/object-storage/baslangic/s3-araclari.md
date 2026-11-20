---
sidebar_position: 3
title: S3 Araçlarıyla Bağlanma
description: AWS CLI ve rclone gibi S3 uyumlu araçlarla Cloud2Biz Object Storage'a bağlanma.
---

Object Storage, Amazon S3 API'si ile uyumlu olduğundan S3 destekleyen tüm araçlarla kullanılabilir. Bağlantı için üç bilgiye ihtiyacınız vardır:

| Bilgi | Nereden alınır? |
| --- | --- |
| **Uç nokta (endpoint)** | **S3 storage** > **Buckets** ekranında bucket'a tıklayın; **Overview** sekmesinde bucket'a HTTP ve HTTPS erişim yolları gösterilir. Uç nokta, bu adresin bucket adı olmayan kısmıdır. |
| **Access key ID** | [Erişim Anahtarları](./erisim-anahtarlari.md#anahtarı-kopyalama) |
| **Secret access key** | [Erişim Anahtarları](./erisim-anahtarlari.md#anahtarı-kopyalama) |

Aşağıdaki örneklerde `<S3_ENDPOINT>` yerine uç nokta adresinizi (ör. `https://s3.ornek.com`), `<ACCESS_KEY>` ve `<SECRET_KEY>` yerine kendi anahtarlarınızı yazın. Her zaman **HTTPS** kullanın.

## AWS CLI

Anahtarlarınızı tanımlayın:

```bash
aws configure
# AWS Access Key ID: <ACCESS_KEY>
# AWS Secret Access Key: <SECRET_KEY>
# Default region name: us-east-1
# Default output format: json
```

Komutlarda `--endpoint-url` parametresini kullanın:

```bash
# Bucket'ları listele
aws --endpoint-url <S3_ENDPOINT> s3 ls

# Dosya yükle
aws --endpoint-url <S3_ENDPOINT> s3 cp yedek.tar.gz s3://my-bucket/yedekler/

# Klasörü eşitle
aws --endpoint-url <S3_ENDPOINT> s3 sync ./site s3://my-bucket/site/

# Dosya indir
aws --endpoint-url <S3_ENDPOINT> s3 cp s3://my-bucket/yedekler/yedek.tar.gz .

# 1 saat geçerli ön imzalı (presigned) bağlantı oluştur
aws --endpoint-url <S3_ENDPOINT> s3 presign s3://my-bucket/rapor.pdf --expires-in 3600
```

## rclone

`~/.config/rclone/rclone.conf` dosyasına aşağıdaki yapılandırmayı ekleyin:

```ini
[cloud2biz]
type = s3
provider = Other
access_key_id = <ACCESS_KEY>
secret_access_key = <SECRET_KEY>
endpoint = <S3_ENDPOINT>
force_path_style = true
```

```bash
rclone lsd cloud2biz:
rclone copy ./yedekler cloud2biz:my-bucket/yedekler --progress
rclone sync ./site cloud2biz:my-bucket/site
```

## Diğer Araçlar

S3 uyumlu uç nokta tanımlanabilen tüm araçlar desteklenir; örneğin **s3cmd**, **Cyberduck**, **WinSCP**, **MinIO Client (mc)**, AWS SDK'ları (Python boto3, Java, Go, .NET, Node.js) ve S3 hedefini destekleyen yedekleme yazılımları. Bu araçlarda sağlayıcı olarak "S3 uyumlu" / "Other" seçin ve uç nokta adresini girin.

:::tip Büyük dosyalar
Büyük dosyalar araçlar tarafından otomatik olarak [çok parçalı yükleme (multipart upload)](../ozellikler/desteklenen-ozellikler.md#veri-yönetimi) ile parçalara bölünerek paralel gönderilir; bağlantı kesilirse yalnızca eksik parçalar yeniden gönderilir.
:::
