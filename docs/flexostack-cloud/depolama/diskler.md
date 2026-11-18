---
sidebar_position: 1
title: Diskler (Volumes) ve Snapshot'lar
sidebar_label: Diskler ve Snapshot'lar
description: FlexoStack'te disk oluşturma, sanal makineye bağlama, boyut büyütme, snapshot alma ve snapshot'tan geri dönme.
---

FlexoStack'te sanal makinelerin tüm verileri **disklerde (volumes)** tutulur. Diskler sanal makineden bağımsız kaynaklardır: bir diski bir sanal makineden çıkarıp başka birine bağlayabilir, snapshot'ını alabilir veya boyutunu büyütebilirsiniz.

Diskleriniz, yüksek erişilebilirlikli ve yedekli bir depolama altyapısında saklanır; tek bir fiziksel diskin veya sunucunun arızalanması verilerinizin kaybolmasına neden olmaz.

## Disk Tipleri

| Disk tipi | Teknoloji | Performans | Önerilen kullanım |
| --- | --- | --- | --- |
| **Disk High IOPS** | NVMe SSD | Disk başına 16.000 IOPS ve 2.000 MB/s'ye kadar | İşletim sistemi, veritabanları, yoğun I/O gerektiren uygulamalar |
| **Disk Economy** | SAS disk | Kapasite odaklı | Arşiv, yedek, büyük ama nadiren erişilen veriler |

Disk tipi oluşturma sırasında seçilir.

## Disk Oluşturma

1. Panelde **Volumes** ekranını açın ve **Create volume** butonuna tıklayın.
2. Diske bir ad verin ve boyutunu (GB) girin.
3. Disk tipini (**Disk High IOPS** veya **Disk Economy**) seçin.
4. İsterseniz kaynak seçin: boş disk, bir imajdan veya bir snapshot'tan.
5. **Create** butonuna tıklayın.

## Diski Sanal Makineye Bağlama

1. **Volumes** ekranında diski seçin ve **Attach** seçeneğine tıklayın.
2. Sanal makineyi seçin ve onaylayın.

Disk, sanal makinede yeni bir aygıt olarak görünür (Linux'ta genellikle `/dev/vdb`, `/dev/vdc`). Yeni ve boş bir diski Linux'ta kullanıma hazırlamak için:

```bash
lsblk                                  # Yeni diski bulun, ör. /dev/vdb
sudo mkfs.ext4 /dev/vdb                # Dosya sistemi oluşturun (veriler silinir!)
sudo mkdir -p /veri
sudo mount /dev/vdb /veri
# Açılışta otomatik bağlanması için:
echo "UUID=$(sudo blkid -s UUID -o value /dev/vdb) /veri ext4 defaults,nofail 0 2" | sudo tee -a /etc/fstab
```

:::warning mkfs komutu diski siler
`mkfs` yalnızca yeni ve boş diskler için kullanılmalıdır. Veri içeren bir diskte çalıştırırsanız tüm veriler kaybolur.
:::

Windows'ta yeni diski **Disk Yönetimi** (`diskmgmt.msc`) üzerinden çevrimiçi yapıp biçimlendirebilirsiniz.

## Diski Sanal Makineden Ayırma

1. Disk sanal makine içinde kullanılıyorsa önce işletim sisteminden ayırın (Linux'ta `sudo umount /veri`).
2. **Volumes** ekranında diski seçin ve **Detach** seçeneğine tıklayın.

Sistem diski (önyükleme diski) çalışan bir sanal makineden ayrılamaz.

## Disk Boyutunu Büyütme

Disk boyutunu dilediğiniz zaman büyütebilirsiniz:

1. **Volumes** ekranında diski seçin ve **Extend** seçeneğine tıklayın.
2. Yeni boyutu girin ve onaylayın.

Ardından işletim sistemi içinde bölümü ve dosya sistemini genişletin. Ubuntu/Debian üzerinde ext4 kök disk için örnek:

```bash
sudo growpart /dev/vda 1
sudo resize2fs /dev/vda1
df -h
```

XFS dosya sisteminde `resize2fs` yerine `sudo xfs_growfs /` kullanılır.

:::info Disk küçültme desteklenmez
Disk boyutu yalnızca artırılabilir. Daha küçük bir diske geçmek için yeni bir disk oluşturup verilerinizi taşımanız gerekir.
:::

## Snapshot'lar

Snapshot, bir diskin belirli bir andaki görüntüsüdür. Güncelleme, yapılandırma değişikliği veya yazılım kurulumu gibi riskli işlemlerden önce snapshot almanız, bir sorun çıktığında diski hızla eski haline döndürmenizi sağlar.

- **Snapshot ücretsizdir.** Snapshot'lar disk kotanızdan kullanıldığı için ayrıca ücret alınmaz.
- Snapshot'lar diskle aynı depolama altyapısında tutulur. Felaket senaryolarına karşı koruma için snapshot'lara ek olarak [yedekleme](./yedekleme.md) kullanın.

### Snapshot Alma

1. **Volumes** ekranında diski seçin.
2. **Snapshots** sekmesinde **Create snapshot** butonuna tıklayın.
3. Snapshot'a açıklayıcı bir ad verin, örneğin `guncelleme-oncesi-2026-11-17`.

:::tip Tutarlı snapshot için
Veritabanı çalışan sunucularda snapshot öncesinde uygulamayı durdurmak veya misafir araçlarının yüklü olması, tutarlı bir snapshot elde etmenizi sağlar.
:::

### Snapshot'tan Geri Dönme

Bir diski snapshot alındığı ana döndürmek için:

1. Diskin bağlı olduğu sanal makineyi kapatın.
2. Diskin **Snapshots** sekmesinde ilgili snapshot'ı seçin ve **Revert** seçeneğine tıklayın.
3. Sanal makineyi yeniden başlatın.

:::danger Revert geri alınamaz
Snapshot'a geri dönüldüğünde, snapshot alındıktan sonra diske yazılan tüm veriler kaybolur.
:::

### Snapshot'tan Yeni Disk Oluşturma

Mevcut diske dokunmadan eski verilere erişmek için snapshot'tan yeni bir disk oluşturabilir ve bu diski bir sanal makineye bağlayabilirsiniz. Bu yöntem, tek bir dosyayı geri almak için en güvenli yoldur.

## Diski Silme

**Volumes** ekranında diski seçin ve **Delete** butonuna tıklayın. Silinen disk ve ona ait snapshot'lar geri getirilemez. Sanal makineye bağlı bir disk silinemez; önce ayırın.
