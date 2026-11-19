---
sidebar_position: 1
title: Sanal Makine Oluşturma
description: FlexoStack'te sanal makine oluştururken kullanılan seçenekler, kaynak limitleri ve cloud-init ile otomatik yapılandırma.
---

FlexoStack'teki her sanal makine (VM), kendi sanal donanımına sahip bağımsız bir sunucudur. Fiziksel bir bilgisayar gibi çalışır; uygulamalarınız herhangi bir değişiklik gerektirmeden çalışır. Sanal makineler aynı fiziksel donanımı paylaşsa da dosya sistemi, süreçler ve ağ açısından birbirinden tamamen yalıtılmıştır.

## Kaynak Limitleri

Sanal makineyi oluştururken **Flavor** bölümünden kullanabileceğiniz tüm kaynak seçeneklerini (vCPU ve RAM) görüntüleyebilirsiniz. İhtiyacınız olan yeni bir flavor yoksa [cloud2biz.com](https://cloud2biz.com/clientarea) üzerinden destek talebi oluşturmanız gerekmektedir.

## Başlamadan Önce

Sanal makineyi oluşturmadan önce şunların hazır olması işinizi kolaylaştırır:

- En az bir [sanal ağ](../ag/sanal-aglar.md) (internete erişim için bir [router](../ag/sanal-routerlar.md) ile)
- Bir [SSH anahtarı](./ssh-anahtarlari.md) (Linux sunucular için)
- Gerekli portları açan bir [güvenlik grubu](../ag/security-groups.md)

## Oluşturma Adımları

1. Panelde **Virtual machines** ekranını açın ve **Create virtual machine** butonuna tıklayın.
2. Aşağıdaki bölümleri doldurun ve **Deploy** butonuna tıklayın.

### Ad

Sanal makineye anlamlı bir ad verin, örneğin `web-01` veya `db-prod`. Linux imajlarında bu ad genellikle sunucunun hostname'i olarak da kullanılır.

### Kaynak (Source)

Sanal makinenin neyden başlatılacağını seçin:

- **İmaj:** Hazır işletim sistemi imajlarından birini (Ubuntu, Debian, Rocky Linux, AlmaLinux, Windows Server vb.) veya kendi yüklediğiniz bir imajı seçin. Bkz. [İmajlar](./imajlar.md).
- **Disk (volume):** Daha önce hazırladığınız önyüklenebilir bir diskten başlatın.
- **ISO:** İşletim sistemini kendiniz kurmak için bir ISO imajı seçin. Bu durumda kurulumu panel konsolu üzerinden yaparsınız.

#### Hazır İmajlar Nasıl Hazırlanır?

- **Linux:** FlexoStack'teki tüm Linux işletim sistemi imajları **cloud-init** teknolojisiyle hazırlanmıştır. Sanal makine birkaç dakika içinde kurulur; kullanıcı, parola, SSH anahtarı ve paket gibi ayarları oluşturma sırasında [Customization Script](#customization-script-cloud-init) ile otomatik olarak yapabilirsiniz.
- **Windows:** Windows Server imajları hazır kurulum yapılıp ardından **Sysprep** alınarak hazırlanmıştır. Sysprep alınmış bir imajla kurulum yapıldığında, kurulum tamamlandıktan sonra **panel konsolu üzerinden yönetici (Administrator) parolası belirlemeniz** gerekir. Bkz. [Windows Sunucularda İlk Parola](./sanal-makineye-baglanma.md#windows-sunucularda-ilk-parola).

### Diskler (Volumes)

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

### SSH Anahtarı (Key Pair)

Linux imajlarında, giriş için kullanılacak SSH anahtarını seçin. Anahtar yalnızca **oluşturma sırasında** sunucuya eklenir; sonradan panelden değiştirilemez.

### Customization Script (cloud-init)

Linux imajları cloud-init ile uyumlu olduğundan, sanal makineyi oluştururken bir **Customization Script** girerek kullanıcı hesaplarını, parolaları ve diğer ayarları otomatik olarak tanımlayabilirsiniz. Script, sanal makine ilk kez açılırken otomatik olarak çalıştırılır. Cloud-init, YAML formatındaki **cloud-config** betiklerini ve shell script'leri destekler.

**1. Customization script alanını açın**

**Create virtual machine** özet ekranında **Customization script (optional)** satırının yanındaki kalem simgesine tıklayın.

![Create virtual machine özet ekranında Customization script (optional) alanı](/img/flexostack/vm-customization-script.png)

**2. Script'i girin**

Açılan **Provide a customization script** penceresine cloud-config formatındaki betiğinizi yazın (veya **Load from file** ile bir dosyadan yükleyin) ve **Save** butonuna tıklayın. Ardından **Deploy** ile sanal makineyi oluşturun.

![Provide a customization script penceresi](/img/flexostack/vm-customization-script-editor.png)

#### Örnek: Root Parolası Belirleme

Aşağıdaki script, `root` kullanıcısının parolasını belirler, SSH ile root girişine izin verir ve işlem sonunda sunucuyu yeniden başlatır:

```yaml
#cloud-config
user: root
password: password
chpasswd: {expire: False}
ssh_pwauth: True
runcmd:
  - sed -i -r 's/(#+?)PermitRootLogin(.*)/PermitRootLogin yes/g' /etc/ssh/sshd_config
power_state:
  mode: reboot
```

| Satır | Açıklama |
| --- | --- |
| `user` | Parolası belirlenecek kullanıcı (örnekte `root`). |
| `password` | Kullanıcının parolası. `password` ifadesini kendi güçlü parolanızla değiştirin. |
| `chpasswd: {expire: False}` | Parolanın ilk girişte değiştirilmeye zorlanmamasını sağlar. |
| `ssh_pwauth` | SSH üzerinden parola ile kimlik doğrulamayı etkinleştirir. |
| `runcmd` | `sshd_config` dosyasında root girişine izin verir (`PermitRootLogin yes`). |
| `power_state` | Script çalıştıktan sonra sunucuyu yeniden başlatır (`reboot`). |

:::warning Önemli
Canlı (production) ortamlarda `password` alanına zayıf bir değer yazmayın; güçlü ve benzersiz bir parola kullanın. Mümkünse parola yerine [SSH anahtarı](./ssh-anahtarlari.md) ile kimlik doğrulamayı tercih edin.
:::

#### Örnek: Paket Kurulumu

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

Customization script yalnızca Linux imajlarında kullanılır. Windows sunucularda ilk parola kurulumdan sonra konsoldan belirlenir.

### Etiketler ve Açıklama

Sanal makinelerinizi ayırt etmek için açıklama ve etiketler ekleyebilirsiniz. Açıklama alanına parola veya kişisel veri yazmayın.

## Oluşturma Sonrası

Sanal makine birkaç dakika içinde **Active** durumuna geçer. Ardından:

1. İnternetten erişim için bir [floating IP](../ag/floating-ip.md) atayın.
2. [Sanal makineye bağlanın](./sanal-makineye-baglanma.md).
3. Önemli veriler için bir [yedekleme planı](../depolama/yedekleme.md) oluşturun.

## Sanal Makine Durumları

| Durum | Anlamı |
| --- | --- |
| **Building / Deploying** | Sanal makine oluşturuluyor. |
| **Active** | Çalışıyor. |
| **Shut off** | Kapalı. |
| **Paused / Suspended** | Duraklatılmış veya askıya alınmış. |
| **Shelved** | Rafa kaldırılmış; CPU ve RAM serbest bırakılmış, diskler korunuyor. |
| **Rescue** | Kurtarma modunda başlatılmış. |
| **Error** | Bir hata oluşmuş. Bkz. [Sorun giderme](./sanal-makine-yonetimi.md#sorun-giderme). |
