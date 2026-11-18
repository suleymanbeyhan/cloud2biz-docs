---
sidebar_position: 3
title: Sanal Makine Yönetimi
description: FlexoStack sanal makinelerini başlatma, durdurma, yeniden boyutlandırma, rafa kaldırma, kurtarma modu, ISO bağlama, silme ve sorun giderme.
---

Bu sayfada sanal makinelerinizin günlük yönetimiyle ilgili tüm işlemleri bulabilirsiniz. İşlemlerin çoğu **Virtual machines** ekranında sanal makineyi seçtikten sonra sağ üstteki işlem menüsünden yapılır.

## Güç işlemleri

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

## CPU ve RAM değiştirme

Sanal makinenin CPU ve RAM miktarını farklı bir flavor seçerek değiştirebilirsiniz:

1. Sanal makineyi seçin ve **Edit** veya **Resize** seçeneğine tıklayın.
2. Yeni flavor'ı seçin ve kaydedin.

Kaynak değişikliği için sanal makinenin yeniden başlatılması gerekebilir. Canlı sistemlerde bu işlemi bakım penceresinde yapmanızı öneririz.

Faturalandırma etkisi:

- **PAYG** kaynaklarında yeni CPU/RAM miktarı ücretlendirmeye anında yansır.
- **Sabit kaynaklarda** azaltma bir sonraki dönemden itibaren geçerli olur.

Disk boyutunu büyütmek için [Diskler](../depolama/diskler.md#disk-boyutunu-büyütme) sayfasına bakın.

## Ağ arayüzü ekleme ve çıkarma

Bir sanal makineye en fazla 15 ağ arayüzü ekleyebilirsiniz:

1. Sanal makinenin **Networks** sekmesini açın.
2. **Add** ile yeni bir ağ arayüzü ekleyin, ağı ve güvenlik gruplarını seçin.
3. Bir arayüzü kaldırmak için ilgili arayüzün yanındaki menüden **Detach** seçeneğini kullanın.

Mevcut bir arayüzün güvenlik gruplarını da aynı sekmeden değiştirebilirsiniz; değişiklikler anında uygulanır.

## Rafa kaldırma (Shelve)

Bir sanal makineyi uzun süre kullanmayacaksanız **rafa kaldırabilirsiniz**. Rafa kaldırılan sanal makine kapatılır ve ayrılmış **CPU ve RAM kaynakları serbest bırakılır**; diskleri, ağ yapılandırması ve IP adresleri korunur.

- **Shelve:** Sanal makineyi rafa kaldırır.
- **Unshelve:** Sanal makineyi yeniden başlatır ve kaynaklarını tekrar ayırır.

Rafa kaldırılmış bir sanal makinenin diskleri depolama alanı kullanmaya devam eder.

:::tip Kapatmak ile rafa kaldırmak arasındaki fark
Yalnızca kapatılan (**Shut off**) bir sanal makine CPU ve RAM kaynaklarını ayırmaya devam eder. Kaynakları serbest bırakmak istiyorsanız rafa kaldırın.
:::

## ISO imajı bağlama

Bir sanal makineye ISO imajını sanal CD/DVD olarak bağlayabilirsiniz. Bu özellik işletim sistemi kurulumu, sürücü yükleme veya ISO'dan araç çalıştırma için kullanılır.

1. ISO dosyasını önce [imaj olarak yükleyin](./imajlar.md).
2. Sanal makineyi seçin ve **Attach ISO** seçeneğine tıklayın.
3. ISO imajını seçin ve onaylayın.
4. Gerekirse sanal makineyi yeniden başlatarak ISO'dan önyükleme yapın.
5. İşiniz bittiğinde **Detach ISO** ile ISO'yu çıkarın.

## Kurtarma modu (Rescue)

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

## Misafir araçları (guest tools)

Misafir araçları, sanal makine içinde çalışan küçük bir yardımcı yazılımdır. Yüklü olduğunda panel; parola belirleme, tutarlı disk snapshot'ları alma ve sanal makine hakkında ek bilgi gösterme gibi işlemleri yapabilir. Hazır imajlarımızın çoğunda misafir araçları yüklü gelir. Kendi imajınızda yüklemek için destek ekibimizden yardım alabilirsiniz.

## Sanal makineyi silme

1. Sanal makineyi seçin ve **Delete** seçeneğine tıklayın.
2. Sanal makineyle birlikte disklerinin de silinip silinmeyeceğini seçin.
3. İşlemi onaylayın.

:::danger Silme işlemi geri alınamaz
Silinen sanal makine ve birlikte silinen diskler geri getirilemez. Silmeden önce gerekli verilerin [yedeğini](../depolama/yedekleme.md) aldığınızdan emin olun. Floating IP'ler sanal makineyle birlikte silinmez; kullanmıyorsanız **Floating IPs** ekranından ayrıca serbest bırakın.
:::

## Sorun giderme

### Sanal makine "Error" durumunda

- Sanal makine detayındaki hata mesajını kontrol edin. En sık neden yetersiz kotadır (CPU, RAM, disk veya IP).
- Kotanızı kontrol edin; gerekirse kullanılmayan kaynakları silin veya kota artışı talep edin.
- Hata mesajını ve sanal makine adını belirterek destek talebi oluşturun.

### Sanal makine açılmıyor

- [Konsolu](./sanal-makineye-baglanma.md#panel-konsolu) açarak önyükleme sırasında ekrandaki mesajı kontrol edin.
- Dosya sistemi veya önyükleyici sorunlarında [kurtarma modunu](#kurtarma-modu-rescue) kullanın.

### Ağ bağlantısı yok

- Sanal makinenin ağ arayüzünün bağlı olduğunu ve IP adresi aldığını konsoldan kontrol edin (`ip a`).
- Ağın bir router'a bağlı olduğunu ve router'ın dış ağ geçidinin tanımlı olduğunu kontrol edin.
- Güvenlik grubu kurallarını ve sunucu içi güvenlik duvarını kontrol edin.

### Performans sorunu

- Panelde sanal makinenin **Monitoring** sekmesinden CPU, RAM, disk ve ağ kullanımını inceleyin.
- Disk yoğun uygulamalar için **Disk High IOPS** tipini kullandığınızdan emin olun.
- Gerekirse flavor'ı büyütün.
