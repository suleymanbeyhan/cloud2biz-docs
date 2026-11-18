---
sidebar_position: 2
title: Yedekleme
description: FlexoStack'te yedekleme planları oluşturma, disk ekleme ve çıkarma, elle yedek alma, diskleri ve sanal makineleri yedekten geri yükleme.
---

FlexoStack'in yedekleme hizmetiyle disklerinizin (volume) yedeklerini **yedekleme planları** sayesinde otomatik olarak veya istediğiniz anda **elle** alabilirsiniz. Yedeklerden yeni bir disk ya da yeni bir sanal makine oluşturarak verilerinizi geri yükleyebilirsiniz.

Bu sayfada yedek ve **kurtarma noktası** (recovery point) ifadeleri aynı anlamda kullanılır: bir diskin tamamının veya belirli bir anda değişen verilerinin kopyası.

## Yedek Türleri

| | Tam yedek (Full) | Artımlı yedek (Incremental) |
| --- | --- | --- |
| İçerik | Diskin tamamının kopyası | Yalnızca son yedekten (türü ne olursa olsun) bu yana değişen veriler |
| Geri yükleme | Tek başına yeterlidir | İlk tam yedek ve ardından gelen tüm artımlı yedekler (yedek zinciri) gerekir |
| Süre ve alan | Daha uzun sürer, daha fazla yer kaplar | Daha hızlıdır, daha az yer kaplar |

## Snapshot ile Yedek Arasındaki Fark

| | Snapshot | Yedek |
| --- | --- | --- |
| Saklandığı yer | Diskle aynı depolama altyapısı | Ayrı yedekleme depolaması |
| Kullanım amacı | Değişiklik öncesi hızlı geri dönüş | Veri kaybına karşı koruma |
| Otomasyon | Elle alınır | Takvime göre otomatik veya elle |

Snapshot'lar bir yedeğin yerini tutmaz. Önemli verileriniz için mutlaka bir yedekleme planı kullanın. Snapshot'lar hakkında bilgi için [Diskler ve snapshot'lar](./diskler.md#snapshotlar) sayfasına bakın.

## Yedekleme Planları

Yedekleme planı üç şeyi belirler:

- **Neyin yedekleneceği:** Bir veya daha fazla disk. Bir disk yalnızca **tek bir** plana dahil edilebilir.
- **Ne sıklıkla yedekleneceği:** Yedeklerin hangi zamanlarda alınacağı.
- **Ne kadar saklanacağı:** Aynı anda saklanacak en fazla **tam yedek** sayısı.

### Yedek Zinciri

Bir **yedek zinciri**, bir tam yedek ve bir sonraki tam yedeğe kadar alınan artımlı yedeklerden oluşur. Varsayılan zincir uzunluğu **7**'dir: 1 tam yedek ve 6 artımlı yedek. Bu durumda saklanan toplam yedek sayısı yaklaşık olarak **en fazla tam yedek sayısı × zincir uzunluğu** kadardır.

### Yedek Rotasyonu

Yeni bir tam yedek alındığında saklama sınırı aşılıyorsa, **en eski tam yedek ve ona bağlı tüm artımlı yedekler** otomatik olarak silinir. Örneğin:

- Saklama sınırı **1** ise, yeni bir tam yedek alındığında önceki zincirin tamamı silinir.
- Saklama sınırı **2** ise, üçüncü tam yedek alındığında en eski zincir silinir.

### Plan Oluşturma

1. Panelde **Backup plans** ekranını açın ve **Create backup plan** butonuna tıklayın.
2. **Create backup plan** penceresinde plana bir ad ve isteğe bağlı bir açıklama girin. Açıklamaya kişisel veya hassas iş verisi yazmayın.
3. **What to back up** bölümünde **Manage** butonuna tıklayın. **Manage volumes** penceresinde yedeklenecek diskleri seçin ve **Save** ile kaydedin.
4. **Schedule** bölümünde bir takvim seçin:

   | Seçenek | Açıklama |
   | --- | --- |
   | **Retention 7 days** | Her gün 02:00 UTC'de (Türkiye saatiyle 05:00) yedek alınır, en fazla 7 tam kurtarma noktası saklanır. |
   | **Retention 14 days** | Her gün 02:00 UTC'de yedek alınır, en fazla 14 tam kurtarma noktası saklanır. |
   | **Custom** | Ayları, haftanın günlerini, ayın günlerini, saati ve saklanacak en fazla tam kurtarma noktası sayısını kendiniz belirlersiniz. |

5. **Create** butonuna tıklayın.

:::tip Sanal makinenin tamamını yedekleyin
Bir sanal makineyi eksiksiz geri getirebilmek için sistem (boot) diskini ve tüm veri disklerini plana ekleyin. Sanal makineyi yedekten yeniden oluşturmak için **boot diskinin** yedeği gerekir.
:::

### Plana Disk Ekleme ve Çıkarma

**Disk eklemek için:**

1. **Backup plans** ekranında planın üzerine tıklayın.
2. Sağ bölmede **Volumes to back up** sekmesine geçin.
3. **Manage** butonuna tıklayın, **Manage volumes** penceresinde eklemek istediğiniz diskleri seçin ve **Save** ile kaydedin.

**Disk çıkarmak için** aynı adımları izleyin ve çıkarmak istediğiniz disklerin seçimini kaldırın. Yalnızca plana bağlı diskleri görmek için arama alanının yanındaki **Show only selected items** seçeneğini işaretleyebilirsiniz.

Plandan çıkarılan bir diskin **daha önce alınmış yedekleri silinmez**.

:::note
Bir disk aynı anda birden fazla yedekleme planına eklenemez. Diski başka bir plana taşımak için önce mevcut plandan çıkarın.
:::

### Planı Düzenleme

1. **Backup plans** ekranında planın üzerine tıklayın.
2. Sağ bölmede **Edit** butonuna tıklayın.
3. **Edit backup plan** penceresinde planın adını, açıklamasını veya takvimini değiştirin ve **Save** ile kaydedin.

### Planı Silme

1. **Backup plans** ekranında planın üzerine tıklayın.
2. Sağ bölmede **Delete** butonuna tıklayın.
3. Planın kurtarma noktaları varsa, bunları da silmek için **Delete recovery points** seçeneğini işaretleyin ve onaylamak için kutuya `Delete` yazın.
4. Onay penceresinde **Delete** butonuna tıklayın.

:::danger
**Delete recovery points** seçeneğini işaretlerseniz planın tüm yedekleri kalıcı olarak silinir ve geri alınamaz. Yedekleri saklamak istiyorsanız bu seçeneği işaretlemeden silin.
:::

## Elle Yedek Alma

Elle alınan yedekler, tek bir diskin anlık ve tek seferlik yedeğidir. Bu yedeklere saklama politikası uygulanmaz; ihtiyacınız kalmadığında **elle silmeniz** gerekir.

### Yedek Alma

1. **Volumes** ekranında diskin üzerine tıklayın.
2. Sağ bölmede **Create backup now** butonuna tıklayın.

Oluşturulan yedek **Recovery points** ekranında görünür.

### Yedek Silme

1. **Recovery points** ekranında kurtarma noktasının üzerine tıklayın.
2. **Delete** butonuna tıklayın ve işlemi onaylayın.

:::warning
Bir yedeği sildiğinizde, aynı zincirde ona **bağlı olan tüm yedekler** de silinir ve bu yedeklerdeki veriler kalıcı olarak kaybolur.
:::

## Yedekten Geri Yükleme

Geri yükleme her zaman **yeni** bir disk veya **yeni** bir sanal makine oluşturur. Orijinal disk ve sanal makine değişmeden kalır; bu sayede yedeği güvenle deneyebilir, ihtiyacınız olan verileri alabilirsiniz.

### Diski Geri Yükleme

Otomatik veya elle alınmış, veri diski ya da boot diski yedeklerinden yeni bir disk oluşturabilirsiniz.

1. **Recovery points** ekranında kurtarma noktasının üzerine tıklayın.
2. Sağ bölmede **Restore volume** butonuna tıklayın.
3. **Restore volume** penceresinde yeni diskin adını girin, bir depolama politikası (disk tipi) seçin ve **Restore** butonuna tıklayın.

Yeni disk **Volumes** ekranında görünür. Bu diski bir sanal makineye bağlayarak dosyalarınıza erişebilirsiniz.

### Sanal Makineyi Geri Yükleme

Bir sanal makineyi yalnızca **boot diskinin** yedeğinden yeniden oluşturabilirsiniz.

1. **Recovery points** ekranında boot diskine ait kurtarma noktasının üzerine tıklayın.
2. Sağ bölmede **Restore virtual machine** butonuna tıklayın.
3. **Restore virtual machine** penceresinde boot diski, seçtiğiniz kurtarma noktasından otomatik olarak ayarlanır. Diğer ayarları (flavor, ağlar, SSH anahtarı vb.) [yeni bir sanal makine oluştururken](../sanal-makineler/sanal-makine-olusturma.md) olduğu gibi yapın.
4. **Deploy** butonuna tıklayın.

Yeni sanal makine **Virtual machines** ekranında görünür. Sanal makinenin veri disklerini de geri getirmek için bu disklerin yedeklerini [disk olarak geri yükleyip](#diski-geri-yükleme) yeni sanal makineye bağlayın.

## Ücretlendirme

Yedekleme alanı **GB bazında** ücretlendirilir ve en az **100 GB** olarak satın alınır. Güncel birim fiyatlar ve miktar indirimleri için [Sabit Kaynak Faturalandırması](../faturalandirma/sabit-kaynak.md#snapshot-ve-yedekleme) sayfasına, tahmini tutar için [Fiyat Hesaplayıcı](../faturalandirma/fiyat-hesaplayici.mdx)'ya bakın.

## Yedekleme Önerileri

- **3-2-1 kuralı:** Verilerinizin en az 3 kopyasını, 2 farklı ortamda ve 1'ini farklı bir lokasyonda tutun.
- Kritik sanal makinelerin boot ve veri disklerini aynı plana ekleyin; böylece tüm diskler aynı zamanlarda yedeklenir.
- Saklama sınırını, geri dönmek isteyebileceğiniz en eski tarihe göre belirleyin.
- Yedeklerinizi düzenli olarak **geri yükleme testi** yapın. Yedeği yeni bir disk olarak açmak orijinal sisteminizi etkilemez.
- Veritabanları için disk yedeğine ek olarak veritabanının kendi döküm (dump) yedeklerini de alın.
