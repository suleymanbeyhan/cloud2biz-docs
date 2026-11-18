---
sidebar_position: 1
title: Sanal Makine Oluşturma
description: FlexoStack'te sanal makine oluştururken kullanılan seçenekler, kaynak limitleri ve cloud-init ile otomatik yapılandırma.
---

FlexoStack'teki her sanal makine (VM), kendi sanal donanımına sahip bağımsız bir sunucudur. Fiziksel bir bilgisayar gibi çalışır; uygulamalarınız herhangi bir değişiklik gerektirmeden çalışır. Sanal makineler aynı fiziksel donanımı paylaşsa da dosya sistemi, süreçler ve ağ açısından birbirinden tamamen yalıtılmıştır.

## Kaynak limitleri

Tek bir sanal makine için üst limitler şunlardır:

| Kaynak | Üst limit |
| --- | --- |
| RAM | 1 TiB |
| CPU | 64 vCPU |
| Disk | 15 disk (volume), her biri en fazla 512 TiB |
| Ağ | 15 ağ arayüzü (NIC) |

Projenizin toplam kaynakları ayrıca hesabınıza tanımlı kotalarla sınırlıdır. Kota artışı için destek talebi oluşturabilirsiniz.

## Başlamadan önce

Sanal makineyi oluşturmadan önce şunların hazır olması işinizi kolaylaştırır:

- En az bir [sanal ağ](../ag/sanal-aglar.md) (internete erişim için bir [router](../ag/sanal-routerlar.md) ile)
- Bir [SSH anahtarı](./ssh-anahtarlari.md) (Linux sunucular için)
- Gerekli portları açan bir [güvenlik grubu](../ag/security-groups.md)

## Oluşturma adımları

1. Panelde **Virtual machines** ekranını açın ve **Create virtual machine** butonuna tıklayın.
2. Aşağıdaki bölümleri doldurun ve **Deploy** butonuna tıklayın.

### Ad

Sanal makineye anlamlı bir ad verin, örneğin `web-01` veya `db-prod`. Linux imajlarında bu ad genellikle sunucunun hostname'i olarak da kullanılır.

### Kaynak (source)

Sanal makinenin neyden başlatılacağını seçin:

- **İmaj:** Hazır işletim sistemi imajlarından birini (Ubuntu, Debian, Rocky Linux, AlmaLinux, Windows Server vb.) veya kendi yüklediğiniz bir imajı seçin. Bkz. [İmajlar](./imajlar.md).
- **Disk (volume):** Daha önce hazırladığınız önyüklenebilir bir diskten başlatın.
- **ISO:** İşletim sistemini kendiniz kurmak için bir ISO imajı seçin. Bu durumda kurulumu panel konsolu üzerinden yaparsınız.

### Diskler (volumes)

- **Sistem diski:** Boyutunu ve disk tipini seçin. Boyut, seçtiğiniz imajın gerektirdiği minimum boyuttan küçük olamaz.
- **Ek diskler:** İsterseniz veri için ek diskler ekleyebilirsiniz.

FlexoStack'te iki disk tipi vardır:

| Disk tipi | Teknoloji | Önerilen kullanım |
| --- | --- | --- |
| Disk High IOPS | NVMe SSD | İşletim sistemi, veritabanları, yoğun I/O |
| Disk Economy | SAS disk | Arşiv, yedek, kapasite öncelikli veriler |

:::info Disk boyutu yalnızca artırılabilir
Disk boyutunu sonradan artırabilirsiniz ancak küçültemezsiniz. Başlangıçta ihtiyacınız kadar boyut seçip zamanla büyütmenizi öneririz.
:::

### Flavor (CPU ve RAM)

Flavor, sanal makinenin vCPU ve RAM miktarını belirleyen şablondur. İhtiyacınıza uygun olanı seçin; daha sonra [yeniden boyutlandırarak](./sanal-makine-yonetimi.md#cpu-ve-ram-değiştirme) değiştirebilirsiniz.

### Ağlar

- Sanal makinenin bağlanacağı ağı veya ağları seçin.
- Her ağ arayüzü için bir veya daha fazla **güvenlik grubu** seçin. Seçmezseniz **default** grubu atanır.
- İsterseniz arayüze sabit bir IP adresi belirleyebilirsiniz; belirtmezseniz DHCP ile otomatik atanır.

### SSH anahtarı (key pair)

Linux imajlarında, giriş için kullanılacak SSH anahtarını seçin. Anahtar yalnızca **oluşturma sırasında** sunucuya eklenir; sonradan panelden değiştirilemez.

### Kullanıcı verisi (cloud-init)

**User data** alanına bir cloud-init betiği yazarak sunucuyu ilk açılışta otomatik yapılandırabilirsiniz. Örnek:

```yaml
#cloud-config
package_update: true
packages:
  - nginx
  - htop
timezone: Europe/Istanbul
runcmd:
  - systemctl enable --now nginx
```

Windows imajlarında cloudbase-init kullanılır ve PowerShell betikleri `#ps1_sysnative` satırıyla başlar.

### Etiketler ve açıklama

Sanal makinelerinizi ayırt etmek için açıklama ve etiketler ekleyebilirsiniz. Açıklama alanına parola veya kişisel veri yazmayın.

## Oluşturma sonrası

Sanal makine birkaç dakika içinde **Active** durumuna geçer. Ardından:

1. İnternetten erişim için bir [floating IP](../ag/floating-ip.md) atayın.
2. [Sanal makineye bağlanın](./sanal-makineye-baglanma.md).
3. Önemli veriler için bir [yedekleme planı](../depolama/yedekleme.md) oluşturun.

## Sanal makine durumları

| Durum | Anlamı |
| --- | --- |
| **Building / Deploying** | Sanal makine oluşturuluyor. |
| **Active** | Çalışıyor. |
| **Shut off** | Kapalı. |
| **Paused / Suspended** | Duraklatılmış veya askıya alınmış. |
| **Shelved** | Rafa kaldırılmış; CPU ve RAM serbest bırakılmış, diskler korunuyor. |
| **Rescue** | Kurtarma modunda başlatılmış. |
| **Error** | Bir hata oluşmuş. Bkz. [Sorun giderme](./sanal-makine-yonetimi.md#sorun-giderme). |
