---
sidebar_position: 3
title: Sanal Makine Yönetimi
description: FlexoStack sanal makinelerini başlatma, durdurma, CPU ve RAM değiştirme (hot plug), rafa kaldırma, kurtarma modu, ISO bağlama, silme ve sorun giderme.
---

Bu sayfada sanal makinelerinizin günlük yönetimiyle ilgili tüm işlemleri bulabilirsiniz. İşlemlerin çoğu **Virtual machines** ekranında sanal makineyi seçtikten sonra sağ üstteki işlem menüsünden yapılır.

## Güç İşlemleri {#güç-işlemleri}

| İşlem | Ne yapar? |
| --- | --- |
| **Run** | Kapalı sanal makineyi başlatır. |
| **Shut down** | İşletim sistemine düzgün kapanma sinyali gönderir. Önerilen kapatma yöntemidir. |
| **Power off** | Elektriği kesilmiş gibi anında kapatır. Yalnızca sanal makine yanıt vermiyorsa kullanın. |
| **Reboot** | İşletim sistemini düzgün şekilde yeniden başlatır. |
| **Hard reboot** | Sanal makineyi zorla yeniden başlatır. |
| **Pause / Resume** | Sanal makineyi bellekte dondurur ve kaldığı yerden devam ettirir. |
| **Suspend / Resume** | Belleği diske yazarak askıya alır ve daha sonra devam ettirir. |

:::warning Power off ve Hard reboot veri kaybına yol açabilir
Bu işlemler işletim sistemine kapanma fırsatı vermez; yazılmakta olan veriler kaybolabilir veya dosya sistemi bozulabilir. Önce **Shut down** veya **Reboot** deneyin.
:::

## CPU ve RAM Değiştirme

Sanal makinenin vCPU ve RAM miktarını farklı bir **flavor** seçerek değiştirirsiniz. Bunun için sanal makinede **CPU and RAM hot plug** özelliğinin **etkin** olması gerekir.

### 1. CPU ve RAM Hot Plug'ı Etkinleştirin {#hot-plug-etkinlestirme}

Hot plug özelliğini iki şekilde etkinleştirebilirsiniz:

- **Kurulum sırasında:** Sanal makine oluşturma özet ekranında **Advanced options** altındaki **Enable CPU and RAM hot plug** seçeneğini işaretleyin. Bkz. [Sanal Makine Oluşturma](./sanal-makine-olusturma.md#cpu-ve-ram-hot-plug).
- **Kurulumdan sonra:** Sanal makineyi **Power off** ile kapatın, ardından **Overview** sekmesindeki **Properties** bölümünde **CPU and RAM hot plug** satırının yanındaki kalem simgesine tıklayarak özelliği etkinleştirin.

Özellik etkin olduğunda **Properties** bölümünde **CPU and RAM hot plug: Enabled** görünür.

![Sanal makinenin Properties bölümünde Flavor ve CPU and RAM hot plug: Enabled](/img/flexostack/vm-hotplug-properties.png)

### 2. Flavor'ı Değiştirin

1. **Virtual machines** ekranında sanal makinenin üzerine tıklayın.
2. **Overview** sekmesindeki **Properties** bölümünde **Flavor** satırının yanındaki kalem simgesine tıklayın.
3. **Flavor** penceresinde **Available flavors** listesinden yeni flavor'ı seçin.
4. **Done** butonuna tıklayın.

![Flavor penceresi ve Available flavors listesi](/img/flexostack/vm-flavor-dialog.png)

### Ne Zaman Kapatmak Gerekir?

| Değişiklik | Sanal makine durumu |
| --- | --- |
| **Daha yüksek** flavor'a geçiş (vCPU/RAM artırma) | Sanal makine **çalışırken**, kapatmadan yapılabilir. |
| **Daha düşük** flavor'a geçiş (vCPU/RAM azaltma) | Sanal makine önce **Power off** ile kapatılmalıdır. |
| Hot plug'ı sonradan etkinleştirme | Sanal makine önce **Power off** ile kapatılmalıdır. |

:::warning
Hot plug etkin değilse veya misafir işletim sistemi CPU/RAM hot plug'ı desteklemiyorsa, flavor değişikliğinden sonra işletim sistemi kararsız çalışabilir. Bu durumda değişikliği sanal makine kapalıyken yapın.
:::

### Faturalandırma Etkisi

- **PAYG** kaynaklarında yeni CPU/RAM miktarı ücretlendirmeye anında yansır.
- **Sabit kaynaklarda** kaynak artırma müşteri panelinden [paket yükseltme](../faturalandirma/sabit-kaynak.md#kaynak-değişiklikleri) ile yapılır. Azaltmada ücret iadesi yapılmaz; bir sonraki ayın faturası azaltılan kaynaklar kadar düşer.

Disk boyutunu büyütmek için [Diskler](../depolama/diskler.md#disk-boyutunu-büyütme) sayfasına bakın.

## Ağ Arayüzü ve IP Adresi Ekleme

Bir sanal makineye **yeni bir ağ arayüzü** ekleyebilir veya **mevcut bir arayüze ikincil (secondary) IP adresi** tanımlayarak aynı arayüz üzerinden farklı bir IP adresi kullanabilirsiniz. Bir sanal makineye en fazla 15 ağ arayüzü eklenebilir.

### Network Interfaces Penceresini Açma

1. **Virtual machines** ekranında sanal makinenin üzerine tıklayın.
2. **Overview** sekmesindeki **Network interfaces** bölümünde **Edit** butonuna tıklayın.

![Sanal makinenin Overview sekmesinde Network interfaces - Edit butonu](/img/flexostack/vm-nic-overview.png)

### Yeni Ağ Arayüzü Ekleme

1. **Network interfaces** penceresinde sağ üstteki **Add** butonuna tıklayın.
2. **Add network interface** penceresinde arayüzün bağlanacağı ağı seçin; IP adresini ve [güvenlik gruplarını](../ag/security-groups.md#sanal-makineye-güvenlik-grubu-atama) belirleyin.
3. Arayüzü ekleyin ve **Network interfaces** penceresinde **Done** butonuna tıklayın.

![Network interfaces penceresi ve Add butonu](/img/flexostack/vm-nic-list.png)

### Mevcut Arayüze İkincil IP Ekleme (Secondary IP)

Yeni bir arayüz eklemeden, mevcut arayüz üzerinden ek bir IP adresi kullanmak için:

1. **Network interfaces** penceresinde arayüzün satırındaki üç nokta simgesine tıklayın ve **Edit** seçeneğini seçin.

   ![Ağ arayüzü menüsünde Edit ve Remove seçenekleri](/img/flexostack/vm-nic-menu.png)

2. **Edit network interface** penceresinde **Secondary IP addresses** bölümündeki **IPv4 addresses** satırında **Add** butonuna tıklayın ve eklemek istediğiniz IP adresini girin.
3. **Save** ile kaydedin, ardından **Network interfaces** penceresinde **Done** butonuna tıklayın.

![Edit network interface penceresinde Secondary IP addresses - Add](/img/flexostack/vm-nic-edit.png)

:::note
İkincil IP adresi aynı arayüzün bağlı olduğu ağdan (subnet) alınır. Gerekirse IP adresini sanal makinenin işletim sisteminde de ağ arayüzüne tanımlayın.
:::

### Ağ Arayüzünü Kaldırma

**Network interfaces** penceresinde arayüzün satırındaki üç nokta simgesine tıklayın, **Remove** seçeneğini seçin ve **Done** ile kaydedin.

Aynı **Edit network interface** penceresinden arayüzün güvenlik gruplarını da değiştirebilirsiniz; değişiklikler anında uygulanır.

## Rafa Kaldırma (Shelve)

Bir sanal makineyi uzun süre kullanmayacaksanız **rafa kaldırabilirsiniz**. Rafa kaldırılan sanal makine kapatılır ve ayrılmış **CPU ve RAM kaynakları serbest bırakılır**; diskleri, ağ yapılandırması ve IP adresleri korunur.

- **Shelve:** Sanal makineyi rafa kaldırır.
- **Unshelve:** Sanal makineyi yeniden başlatır ve kaynaklarını tekrar ayırır.

Rafa kaldırılmış bir sanal makinenin diskleri depolama alanı kullanmaya devam eder.

:::tip Kapatmak ile rafa kaldırmak arasındaki fark
Yalnızca kapatılan (**Shut off**) bir sanal makine CPU ve RAM kaynaklarını ayırmaya devam eder. Kaynakları serbest bırakmak istiyorsanız rafa kaldırın.
:::

## ISO İmajı Bağlama {#iso-imajı-bağlama}

Bir sanal makineye ISO imajını sanal CD/DVD olarak bağlayabilirsiniz. Bu özellik işletim sistemi kurulumu, sürücü yükleme veya ISO'dan araç çalıştırma için kullanılır.

1. ISO dosyasını önce [imaj olarak yükleyin](./imajlar.md).
2. Sanal makineyi seçin ve **Attach ISO** seçeneğine tıklayın.
3. ISO imajını seçin ve onaylayın.
4. Gerekirse sanal makineyi yeniden başlatarak ISO'dan önyükleme yapın.
5. İşiniz bittiğinde **Detach ISO** ile ISO'yu çıkarın.

## Kurtarma Modu (Rescue)

Sanal makineniz açılmıyor, parolanızı unuttunuz veya dosya sistemi bozulduysa **kurtarma modunu** kullanabilirsiniz. Kurtarma modunda sanal makine geçici bir kurtarma imajıyla başlatılır ve kendi sistem diski ek disk olarak bağlanır.

1. Sanal makineyi seçin ve **Rescue** seçeneğine tıklayın.
2. Kurtarma imajını seçin ve onaylayın.
3. [Konsol](./sanal-makineye-baglanma.md#panel-konsolu) üzerinden kurtarma sistemine bağlanın.
4. Kendi diskinizi bağlayın ve gerekli düzeltmeleri yapın:

```bash
lsblk                         # Diskleri listele (ör. /dev/vdb1)
sudo mount /dev/vdb1 /mnt     # Kendi sistem diskinizi bağlayın
sudo nano /mnt/etc/fstab      # Örnek: hatalı fstab satırını düzeltin
sudo umount /mnt
```

5. İşiniz bittiğinde **Unrescue** ile sanal makineyi normal haline döndürün.

## Misafir Araçları (Guest Tools)

Misafir araçları, sanal makine içinde çalışan küçük bir yardımcı yazılımdır. Yüklü olduğunda panel; parola belirleme, tutarlı disk snapshot'ları alma ve sanal makine hakkında ek bilgi gösterme gibi işlemleri yapabilir. Hazır imajlarımızın çoğunda misafir araçları yüklü gelir. Kendi imajınızda yüklemek için destek ekibimizden yardım alabilirsiniz.

## Sanal Makineyi Silme

1. Sanal makineyi seçin ve **Delete** seçeneğine tıklayın.
2. Sanal makineyle birlikte disklerinin de silinip silinmeyeceğini seçin.
3. İşlemi onaylayın.

:::danger Silme işlemi geri alınamaz
Silinen sanal makine ve birlikte silinen diskler geri getirilemez. Silmeden önce gerekli verilerin [yedeğini](../depolama/yedekleme.md) aldığınızdan emin olun. Floating IP'ler sanal makineyle birlikte silinmez; kullanmıyorsanız **Floating IPs** ekranından ayrıca serbest bırakın.
:::

## Sorun Giderme

### Sanal Makine "Error" Durumunda

- Sanal makine detayındaki hata mesajını kontrol edin. En sık neden yetersiz kotadır (CPU, RAM, disk veya IP).
- Kotanızı kontrol edin; gerekirse kullanılmayan kaynakları silin veya kota artışı talep edin.
- Hata mesajını ve sanal makine adını belirterek destek talebi oluşturun.

### Sanal Makine Açılmıyor

- [Konsolu](./sanal-makineye-baglanma.md#panel-konsolu) açarak önyükleme sırasında ekrandaki mesajı kontrol edin.
- Dosya sistemi veya önyükleyici sorunlarında [kurtarma modunu](#kurtarma-modu-rescue) kullanın.

### Ağ Bağlantısı Yok

- Sanal makinenin ağ arayüzünün bağlı olduğunu ve IP adresi aldığını konsoldan kontrol edin (`ip a`).
- Ağın bir router'a bağlı olduğunu ve router'ın dış ağ geçidinin tanımlı olduğunu kontrol edin.
- Güvenlik grubu kurallarını ve sunucu içi güvenlik duvarını kontrol edin.

### Performans Sorunu

- Panelde sanal makinenin **Monitoring** sekmesinden CPU, RAM, disk ve ağ kullanımını inceleyin.
- Disk yoğun uygulamalar için **Disk High IOPS** tipini kullandığınızdan emin olun.
- Gerekirse flavor'ı büyütün.
