---
sidebar_position: 1
title: Genel Sorular
---

## Object Storage Hangi Durumlar İçin Uygundur? {#object-storage-hangi-durumlar-için-uygundur}

- **Yedekleme ve arşivleme:** Sunucu, veritabanı ve uygulama yedekleri; yasal saklama gerektiren veriler
- **Statik içerik:** Görseller, videolar ve dokümanlar
- **Uygulama verisi:** Kullanıcı yüklemeleri ve S3 API ile çalışan uygulamalar
- **Büyük veri:** Hadoop ve Spark ile S3 API üzerinden analiz

## Object Storage Hangi Durumlar İçin Uygun Değildir? {#object-storage-hangi-durumlar-için-uygun-değildir}

- **Yüksek frekanslı okuma/yazma:** Veritabanları için sanal makinenize bağlı [diskleri](/docs/flexostack-cloud/depolama/diskler) kullanın.
- **Çok küçük dosyalar:** Çok sayıda küçük dosyayı arşivleyerek (ör. `tar`) yüklemek daha verimlidir.

:::warning Bu servis bir CDN değildir
Yüksek trafikli statik içerik için Object Storage önüne bir CDN koyun.
:::

## Amazon S3 İçin Yazılmış Uygulamam Çalışır mı? {#amazon-s3-uyumluluk}

Evet. Object Storage, Amazon S3 API'si ile uyumludur. Uygulamanızda yalnızca **uç nokta (endpoint)** adresini ve **erişim anahtarlarını** değiştirmeniz yeterlidir. Bkz. [S3 Araçlarıyla Bağlanma](../baslangic/s3-araclari.md) ve [Desteklenen S3 Özellikleri](../ozellikler/desteklenen-ozellikler.md).

## Panelde S3 Storage Ekranını Göremiyorum {#s3-ekrani-yok}

Projenizde S3 erişimi etkin değildir. [cloud2biz.com](https://cloud2biz.com/clientarea) üzerinden destek talebi oluşturun. Bkz. [S3 Erişimi](../baslangic/s3-erisimi.md).

## Erişim Anahtarım Nerede? {#erisim-anahtari}

İlk bucket'ınızı oluşturduğunuzda bir anahtar çifti otomatik olarak oluşturulur. Anahtarlarınızı herhangi bir bucket'ın **Overview** sekmesindeki **S3 access keys** bölümünden kopyalayabilirsiniz. En fazla iki anahtar çiftiniz olabilir. Bkz. [Erişim Anahtarları](../baslangic/erisim-anahtarlari.md).

## Bucket'ı Neden Silemiyorum? {#bucket-silinemiyor}

Yalnızca **boş** bucket'lar silinebilir. Önce bucket'taki tüm dosya ve klasörleri silin. Bkz. [Bucket'lar](../bucket-ve-dosyalar/bucketlar.md).

## Klasör Boyutunu Nasıl Görebilirim? {#klasor-boyutu}

Panelde klasör boyutu görüntülenemez. Boyutu öğrenmek için S3 araçlarını kullanabilirsiniz, örneğin: `aws --endpoint-url <S3_ENDPOINT> s3 ls s3://my-bucket/klasor/ --recursive --summarize`

## Eski Dosyaları Otomatik Olarak Silebilir miyim? {#yasam-dongusu}

Evet. Bucket yaşam döngüsü kurallarıyla süresi dolan nesneler otomatik olarak silinebilir (**object expiration**). Depolama sınıfı geçişi (transition) desteklenmez.

## Yedeklerimi Fidye Yazılımına Karşı Nasıl Korurum? {#fidye-yazilimi}

**Object Lock** (WORM) ile nesneleri belirlediğiniz süre boyunca silinmeye ve değiştirilmeye karşı koruyabilirsiniz. Ek olarak [Versioning](../ozellikler/desteklenen-ozellikler.md#veri-yönetimi) kullanabilir ve [bucket politikasıyla](../erisim-yonetimi/politika-ornekleri.md#8-nesnelerin-silinmesini-engelleme) silme işlemini engelleyebilirsiniz.
