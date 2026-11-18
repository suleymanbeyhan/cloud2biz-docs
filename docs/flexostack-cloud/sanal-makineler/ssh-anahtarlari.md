---
sidebar_position: 5
title: SSH Anahtarları
description: SSH anahtar çifti oluşturma, FlexoStack paneline ekleme ve sanal makinelerde kullanma.
---

SSH anahtarları, Linux sunucularınıza parola yerine kriptografik bir anahtar çiftiyle güvenli şekilde bağlanmanızı sağlar. Parola tahmin saldırılarına karşı çok daha güvenlidir ve FlexoStack'te Linux sunucular için önerilen giriş yöntemidir.

Bir anahtar çifti iki parçadan oluşur:

- **Özel anahtar (private key):** Bilgisayarınızda kalır, kimseyle paylaşılmaz.
- **Genel anahtar (public key):** FlexoStack paneline eklenir ve sunuculara yerleştirilir.

## Anahtar çifti oluşturma

### Linux ve macOS

```bash
ssh-keygen -t ed25519 -C "eposta@ornek.com"
```

Komut size bir dosya konumu ve isteğe bağlı bir parola (passphrase) sorar. Varsayılan konumu kabul edebilirsiniz. Genel anahtarınızı görüntülemek için:

```bash
cat ~/.ssh/id_ed25519.pub
```

### Windows

Windows 10 ve sonrasında PowerShell'de aynı komutu kullanabilirsiniz:

```powershell
ssh-keygen -t ed25519
Get-Content $env:USERPROFILE\.ssh\id_ed25519.pub
```

PuTTY kullanıyorsanız anahtarı **PuTTYgen** ile oluşturup "Public key for pasting into OpenSSH authorized_keys file" alanındaki metni kopyalayın.

:::tip Ed25519 mu RSA mı?
Ed25519 daha kısa, hızlı ve güvenlidir; yeni anahtarlar için önerilir. Çok eski sistemlerle uyumluluk gerekiyorsa `ssh-keygen -t rsa -b 4096` ile RSA anahtarı oluşturabilirsiniz.
:::

## Panele anahtar ekleme

1. Panelde **SSH keys** ekranını açın ve **Add key** butonuna tıklayın.
2. Anahtara bir ad verin, örneğin `ahmet-laptop`.
3. Genel anahtarın tamamını (ör. `ssh-ed25519 AAAA... eposta@ornek.com`) yapıştırın.
4. **Add** ile kaydedin.

Panele yalnızca **genel anahtarı** (`.pub` uzantılı dosyanın içeriği) ekleyin. Özel anahtarınızı hiçbir zaman panele, e-postaya veya destek talebine yapıştırmayın.

## Sanal makinede kullanma

Sanal makine oluştururken **Key pair** alanında anahtarınızı seçin. Anahtar, ilk açılışta cloud-init tarafından varsayılan kullanıcının `~/.ssh/authorized_keys` dosyasına eklenir.

:::info Anahtar yalnızca oluşturma sırasında eklenir
Panelden seçilen SSH anahtarı sanal makineye yalnızca ilk oluşturma sırasında eklenir. Çalışan bir sunucuya yeni anahtar eklemek veya anahtar değiştirmek için aşağıdaki yöntemi kullanın.
:::

## Çalışan sunucuya anahtar ekleme

Sunucuya bağlanabiliyorsanız yeni genel anahtarı `authorized_keys` dosyasına ekleyin:

```bash
echo "ssh-ed25519 AAAA... yeni-anahtar" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

Veya kendi bilgisayarınızdan:

```bash
ssh-copy-id -i ~/.ssh/yeni_anahtar.pub KULLANICI@FLOATING_IP_ADRESI
```

## Özel anahtarı kaybettiyseniz

Özel anahtar kaybolduysa o anahtarla giriş yapılamaz. Erişimi geri kazanmak için:

1. Panel [konsolu](./sanal-makineye-baglanma.md#panel-konsolu) üzerinden parola ile giriş yapabiliyorsanız yeni genel anahtarı `authorized_keys` dosyasına ekleyin.
2. Konsolda parola tanımlı değilse [kurtarma modunu](./sanal-makine-yonetimi.md#kurtarma-modu-rescue) kullanarak sistem diskini bağlayın ve yeni anahtarı ilgili kullanıcının `.ssh/authorized_keys` dosyasına ekleyin.

## Anahtarı silme

**SSH keys** ekranında anahtarı seçip **Delete** butonuna tıklayın. Paneldeki anahtarı silmek, o anahtarın daha önce eklendiği sunuculardan kaldırılması anlamına gelmez; sunuculardaki `authorized_keys` dosyalarından ayrıca silmeniz gerekir.
