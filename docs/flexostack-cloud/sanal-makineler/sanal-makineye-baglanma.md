---
sidebar_position: 2
title: Sanal Makineye Bağlanma
description: FlexoStack sanal makinelerine panel konsolu, SSH ve RDP ile bağlanma, parola belirleme.
---

Sanal makinenize üç farklı yolla bağlanabilirsiniz: panel üzerindeki **konsol**, Linux için **SSH** ve Windows için **Uzak Masaüstü (RDP)**.

## Panel Konsolu

Konsol, sanal makinenin ekranına doğrudan tarayıcıdan erişmenizi sağlar. Ağ bağlantısı olmasa veya SSH çalışmasa bile kullanılabilir; bu nedenle kurulum ve sorun giderme için idealdir.

1. **Virtual machines** ekranında sanal makineyi seçin.
2. **Console** butonuna tıklayın.

Konsolda giriş yapmak için işletim sisteminde parola tanımlı bir kullanıcı gerekir. SSH anahtarıyla oluşturulan Linux sunucularda varsayılan olarak parola tanımlı değildir; parola belirlemek için aşağıdaki [Parola belirleme](#parola-belirleme) bölümüne bakın.

## SSH ile Bağlanma (Linux)

SSH ile bağlanmak için:

- Sanal makineye bir [floating IP](../ag/floating-ip.md) atanmış olmalı (veya aynı özel ağdaki başka bir sunucudan bağlanmalısınız).
- Güvenlik grubunda **TCP 22** portu sizin IP adresinize açık olmalı.
- Oluşturma sırasında seçtiğiniz SSH anahtarının özel (private) anahtarı bilgisayarınızda olmalı.

```bash
ssh -i ~/.ssh/id_ed25519 KULLANICI@FLOATING_IP_ADRESI
```

Varsayılan kullanıcı adı imaja göre değişir:

| İmaj | Varsayılan kullanıcı |
| --- | --- |
| Ubuntu | `ubuntu` |
| Debian | `debian` |
| Rocky Linux | `rocky` |
| AlmaLinux | `almalinux` |
| CentOS Stream | `cloud-user` veya `centos` |

Kendi yüklediğiniz imajlarda kullanıcı adı imajın yapılandırmasına bağlıdır.

### Windows'tan SSH

Windows 10 ve sonrasında PowerShell içinde `ssh` komutu hazır gelir. Alternatif olarak PuTTY veya MobaXterm kullanabilirsiniz.

## RDP ile Bağlanma (Windows)

1. Güvenlik grubunda **TCP 3389** portunu yalnızca kendi IP adresinize açın.
2. Windows sanal makinenize bir floating IP atayın.
3. Bilgisayarınızda **Uzak Masaüstü Bağlantısı** uygulamasını açın ve floating IP adresini girin.
4. `Administrator` kullanıcısı ve kurulum sonrasında konsoldan belirlediğiniz parola ile giriş yapın. Bkz. [Windows Sunucularda İlk Parola](#windows-sunucularda-ilk-parola).

:::warning RDP portunu herkese açmayın
3389 portunu `0.0.0.0/0` adresine açmak, sunucunuzu sürekli parola deneme saldırılarına maruz bırakır. Erişimi yalnızca kendi IP adreslerinizle sınırlayın.
:::

## Parola Belirleme

### Oluşturma Sırasında (cloud-init)

Linux sanal makineyi oluştururken **Customization script** alanına aşağıdaki gibi bir yapılandırma ekleyerek parola belirleyebilirsiniz. Ayrıntılar ve root parolası örneği için [Customization Script](./sanal-makine-olusturma.md#customization-script-cloud-init) bölümüne bakın:

```yaml
#cloud-config
password: GucluBirParola!2026
chpasswd:
  expire: false
ssh_pwauth: false
```

`ssh_pwauth: false` ayarı SSH'ta parola ile girişi kapalı tutar; parola yalnızca konsol girişi için kullanılır. Bu, önerilen güvenli yapılandırmadır.

### Windows Sunucularda İlk Parola {#windows-sunucularda-ilk-parola}

Windows Server imajları Sysprep alınarak hazırlandığı için, sanal makine ilk açıldığında Windows kurulumunun son adımı olarak yönetici parolası belirlenmesini bekler:

1. Sanal makine **Active** durumuna geçtikten sonra panelde sanal makineyi açın ve **Console** ile konsola bağlanın.
2. Kurulum ekranında bölge, dil ve klavye ayarlarını onaylayın.
3. **Customize settings** ekranında `Administrator` kullanıcısı için **Password** alanına güçlü bir parola yazın, **Reenter password** alanına tekrar girin ve **Finish** butonuna tıklayın.

   ![Windows Server konsolunda Customize settings: Administrator parolası belirleme](/img/flexostack/windows-set-password.png)

4. Kurulum tamamlandıktan sonra bu parolayla konsoldan veya [RDP](#rdp-ile-bağlanma-windows) ile giriş yapabilirsiniz.

:::tip
Parola belirlenene kadar sanal makineye RDP ile bağlanamazsınız. Parolanızı güvenli bir yerde saklayın.
:::

### Çalışan Sunucuda

SSH ile bağlandıktan sonra parolayı işletim sistemi içinden değiştirebilirsiniz:

```bash
sudo passwd ubuntu
```

Panelde misafir araçlarının (guest tools) yüklü olduğu sanal makineler için **Set password** seçeneği de bulunabilir. Bu seçenek, sunucuya bağlanmadan işletim sistemi içindeki bir kullanıcının parolasını belirlemenizi sağlar.

## Bağlanamıyorsanız

1. Sanal makinenin durumunun **Active** olduğunu kontrol edin.
2. Floating IP'nin doğru sanal makineye atandığını kontrol edin.
3. Güvenlik grubunda ilgili portun (22 veya 3389) açık olduğunu ve kaynak IP'nin doğru olduğunu kontrol edin.
4. Sunucu içindeki güvenlik duvarını (ufw, firewalld, Windows Firewall) panel konsolundan kontrol edin.
5. Sorun devam ederse [Sorun giderme](./sanal-makine-yonetimi.md#sorun-giderme) bölümüne bakın veya destek talebi oluşturun.
