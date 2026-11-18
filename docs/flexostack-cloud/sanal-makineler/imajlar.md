---
sidebar_position: 4
title: İmajlar
description: FlexoStack'te hazır işletim sistemi imajları, kendi imajınızı veya ISO dosyanızı yükleme ve diskten imaj oluşturma.
---

İmaj, yeni bir sanal makinenin başlatılacağı hazır disk şablonudur. FlexoStack'te hazır işletim sistemi imajlarını kullanabilir, kendi imajlarınızı yükleyebilir veya mevcut bir sunucudan imaj oluşturabilirsiniz.

## Hazır imajlar

Panelde **Images** ekranında projenizde kullanabileceğiniz tüm imajları görebilirsiniz. Hazır imajlar Cloud2Biz tarafından sağlanır ve güncel tutulur. Bu imajlarda genellikle cloud-init ve misafir araçları yüklüdür; SSH anahtarı ve kullanıcı verisi gibi özellikler doğrudan çalışır.

## Desteklenen formatlar

| Format | Açıklama |
| --- | --- |
| **QCOW2** | Önerilen format. Sıkıştırılmış ve boş alanı yer kaplamayan disk imajı. |
| **RAW** | Ham disk imajı. |
| **ISO** | Kurulum CD/DVD imajı. İşletim sistemini kendiniz kurmak için kullanılır. |
| **VMDK / VHD(X)** | Diğer sanallaştırma platformlarından gelen diskler. Yüklemeden önce QCOW2'ye dönüştürmenizi öneririz. |

## İmaj yükleme

1. **Images** ekranında **Add image** butonuna tıklayın.
2. Dosyayı bilgisayarınızdan seçin veya imajın indirileceği bir URL girin.
3. İmaja bir ad verin ve **işletim sistemi tipini** doğru seçin. Bu seçim, sanal makinenin uygun sanal donanım ve sürücülerle başlatılması için önemlidir.
4. Yüklemeyi başlatın. Büyük dosyalarda yükleme süresi internet bağlantınıza göre uzayabilir.

:::tip Büyük imajlar için URL kullanın
Birkaç GB'tan büyük imajlarda dosyayı bilgisayarınızdan yüklemek yerine, imajı internetten erişilebilir bir adrese koyup URL ile yüklemek çok daha hızlıdır. Örneğin Ubuntu'nun resmi bulut imajlarını doğrudan URL ile ekleyebilirsiniz.
:::

Panelden yükleyemediğiniz özel imajlar için sipariş sonrasında destek talebi oluşturabilirsiniz; ekibimiz imajınızı eklemenize yardımcı olur.

## Kendi imajınızı hazırlama

Kendi imajlarınızın FlexoStack'te sorunsuz çalışması için:

- **VirtIO sürücüleri** yüklü olmalıdır. Linux dağıtımlarında hazır gelir; Windows için VirtIO sürücülerini imaja eklemeniz gerekir.
- **cloud-init** (Linux) veya **cloudbase-init** (Windows) yüklü olursa SSH anahtarı, hostname ve kullanıcı verisi otomatik uygulanır.
- Ağ yapılandırması **DHCP** olmalıdır.
- Diğer platformlardan gelen disklerde, eski platforma ait araçları (ör. VMware Tools) kaldırmanızı öneririz.

Bir diski QCOW2 formatına dönüştürmek için `qemu-img` aracını kullanabilirsiniz:

```bash
qemu-img convert -p -f vmdk -O qcow2 sunucu.vmdk sunucu.qcow2
qemu-img info sunucu.qcow2
```

## Diskten imaj oluşturma

Yapılandırdığınız bir sunucuyu şablon olarak saklayıp aynı ortamı yeni sunucularda kullanabilirsiniz:

1. Kaynak sanal makineyi düzgün şekilde kapatın (**Shut down**).
2. **Volumes** ekranında sanal makinenin sistem diskini seçin.
3. **Create image** seçeneğine tıklayın ve imaja bir ad verin.

Oluşan imaj **Images** ekranında görünür ve yeni sanal makine oluştururken kaynak olarak seçilebilir.

:::info Şablon imajlardan kişisel verileri temizleyin
Bir sunucuyu imaja dönüştürmeden önce SSH host anahtarlarını, geçmiş dosyalarını, günlükleri ve parola içeren yapılandırmaları temizleyin. Linux'ta `sudo cloud-init clean` komutu, imajdan oluşturulan sunucuların ilk açılış yapılandırmasını yeniden çalıştırmasını sağlar.
:::

## İmajı silme

**Images** ekranında imajı seçin ve **Delete** butonuna tıklayın. Bir imajı silmek, o imajdan daha önce oluşturulmuş sanal makineleri etkilemez.
