---
sidebar_position: 2
title: Yedekleme
description: FlexoStack'te yedekleme planları oluşturma, saklama süreleri, artımlı yedekler, geri yükleme ve Acronis yedekleme seçenekleri.
---

FlexoStack, disklerinizin düzenli olarak yedeklenmesi için iki seçenek sunar:

- **Panel üzerinden yedekleme planları:** Disklerinizi belirlediğiniz takvime göre otomatik yedekler.
- **Acronis yedekleme:** Dosya düzeyinde geri yükleme, farklı lokasyonda saklama ve fiziksel sunucu yedekleme gibi gelişmiş ihtiyaçlar için.

## Snapshot ile yedek arasındaki fark

| | Snapshot | Yedek |
| --- | --- | --- |
| Saklandığı yer | Diskle aynı depolama altyapısı | Ayrı yedekleme depolaması |
| Kullanım amacı | Değişiklik öncesi hızlı geri dönüş | Veri kaybına ve felaketlere karşı koruma |
| Otomasyon | Elle alınır | Takvime göre otomatik |

Snapshot'lar bir yedeğin yerini tutmaz. Önemli verileriniz için mutlaka bir yedekleme planı kullanın. Snapshot'lar hakkında bilgi için [Diskler ve snapshot'lar](./diskler.md#snapshotlar) sayfasına bakın.

## Yedekleme planları

Yedekleme planı, hangi disklerin, ne zaman yedekleneceğini ve kaç yedeğin saklanacağını belirler.

### Plan oluşturma

1. Panelde **Backup plans** ekranını açın ve **Create backup plan** butonuna tıklayın.
2. Plana bir ad ve isteğe bağlı bir açıklama girin. Açıklamaya kişisel veya hassas iş verisi yazmayın.
3. **What to back up** bölümünde **Manage** butonuna tıklayın, yedeklenecek diskleri seçin ve **Save** ile kaydedin.
4. **Schedule** bölümünde bir saklama seçeneği belirleyin veya özel takvim oluşturun.
5. **Create** butonuna tıklayın.

### Takvim seçenekleri

| Seçenek | Açıklama |
| --- | --- |
| **Retention 7 days** | Her gün 02:00 UTC'de (Türkiye saatiyle 05:00) yedek alınır, en fazla 7 tam kurtarma noktası saklanır. |
| **Retention 14 days** | Her gün 02:00 UTC'de yedek alınır, en fazla 14 tam kurtarma noktası saklanır. |
| **Custom** | Ayları, haftanın günlerini, ayın günlerini, saati ve saklanacak en fazla tam yedek sayısını kendiniz belirlersiniz. |

### Tam ve artımlı yedekler

Yedekler **zincirler** halinde tutulur. Her zincir bir **tam yedek** ve onu takip eden **artımlı yedeklerden** oluşur. Artımlı yedekler yalnızca bir önceki yedekten bu yana değişen verileri içerdiği için hem daha hızlı alınır hem de daha az yer kaplar.

- Varsayılan zincir uzunluğu 7'dir: 1 tam yedek ve 6 artımlı yedek.
- Saklanan toplam yedek sayısı yaklaşık olarak **en fazla tam yedek sayısı × zincir uzunluğu** kadardır.
- Yeni bir tam yedek, saklama limitini aştığında en eski tam yedek ve ona bağlı artımlı yedekler otomatik olarak silinir.

### Kurallar ve sınırlamalar

- Bir disk yalnızca **tek bir** yedekleme planına dahil edilebilir.
- Bir sanal makinenin tamamını yedeklemek için tüm disklerini (sistem diski ve veri diskleri) plana ekleyin.
- Yedekleme alanı kullandığınız kadar ücretlendirilir.

## Yedekten geri yükleme

1. **Backups** ekranında ilgili diskin yedeklerini açın.
2. Geri yüklemek istediğiniz kurtarma noktasını (tarih ve saat) seçin.
3. Geri yükleme yöntemini seçin:
   - **Yeni bir disk olarak geri yükleme:** Mevcut diske dokunmadan yedeği yeni bir diske açar. Önerilen ve en güvenli yöntemdir; bu diski bir sanal makineye bağlayıp ihtiyacınız olan dosyaları alabilirsiniz.
   - **Mevcut diskin üzerine geri yükleme:** Diskin içeriğini yedekteki haliyle değiştirir. Bu işlem için disk sanal makineden ayrılmış veya sanal makine kapalı olmalıdır.

:::danger Üzerine geri yükleme mevcut verileri siler
Mevcut diskin üzerine geri yükleme yapıldığında, yedek alındıktan sonra diske yazılan tüm veriler kaybolur. Emin değilseniz önce yeni bir disk olarak geri yükleyin.
:::

## Acronis yedekleme

Daha gelişmiş yedekleme ihtiyaçları için Acronis tabanlı yedekleme hizmetini kullanabilirsiniz:

- **GB bazlı** veya **sanal makine / fiziksel sunucu adedi bazlı** ücretlendirme
- Dosya ve klasör düzeyinde geri yükleme
- Yedekleme lokasyonları: İstanbul-1 (FlexoStack dışında), İstanbul-2 ve Ankara (FlexoStack içinde)
- **Acronis Cloud Backup** ile yedeklerinizi Frankfurt veya İstanbul'daki Acronis bulutunda saklama
- Ek lisans ücreti yansıtılmaz

Acronis yedekleme hizmeti için [müşteri panelinden](https://cloud2biz.com/clientarea) sipariş verebilir veya destek ekibimizle iletişime geçebilirsiniz.

## Yedekleme önerileri

- **3-2-1 kuralı:** Verilerinizin en az 3 kopyasını, 2 farklı ortamda ve 1'ini farklı bir lokasyonda tutun.
- Kritik sistemlerde yedekleri sunucunuzdan farklı bir lokasyonda saklayın.
- Yedeklerinizi düzenli olarak **geri yükleme testi** yapın. Test edilmemiş bir yedek, ihtiyaç anında çalışmayabilir.
- Veritabanları için disk yedeğine ek olarak veritabanının kendi döküm (dump) yedeklerini de alın.
