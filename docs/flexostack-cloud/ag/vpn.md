---
sidebar_position: 6
title: Site-to-Site VPN
description: FlexoStack sanal ağlarınızı ofisinize veya diğer veri merkezlerine IPsec Site-to-Site VPN ile şifreli olarak bağlama.
---

**Site-to-Site VPN**, FlexoStack'teki sanal ağlarınızı ofis ağınıza, başka bir bulut ortamına veya farklı bir Cloud2Biz lokasyonuna **IPsec** protokolüyle şifreli olarak bağlar. Bağlantı kurulduktan sonra iki taraftaki sunucular, sanki aynı ağdaymış gibi özel IP adresleriyle haberleşir.

## Kullanım Senaryoları

- Ofisteki çalışanların sunuculara internete açmadan, özel IP ile erişmesi
- Şirket içi (on-premise) sistemler ile bulut sunucuları arasında hibrit yapı kurma
- İstanbul, Ankara ve Sofya lokasyonlarındaki sunucularınızı tek bir özel ağ altında birleştirme
- Felaket kurtarma için lokasyonlar arası veri replikasyonu

## Ön Koşullar

:::info Önce private network ve router oluşturun
IPsec VPN kurulumu için öncelikle bir **private network** ve bu ağa bağlı bir **virtual router** oluşturulması gerekir. VPN'e geçmeden önce aşağıdaki dokümanları okuyup adımları tamamlayın:

1. [Sanal Ağ Oluşturma](./sanal-aglar.md#sanal-ağ-oluşturma): private network ve subnet oluşturma
2. [Router Oluşturma](./sanal-routerlar.md#router-oluşturma): private network'ü public network'e bağlayan virtual router oluşturma
:::

Ayrıca şunlar gereklidir:

- Karşı tarafta IPsec destekleyen bir cihaz (FortiGate, pfSense, MikroTik, Cisco gibi) ve **sabit bir genel IP adresi**
- İki taraftaki ağ aralıklarının **çakışmaması** (ör. FlexoStack `192.168.1.0/24`, ofis `10.1.1.0/24`)

## VPN Bağlantısı Oluşturma

Private network ve virtual router hazır olduğunda VPN'i oluşturabilirsiniz.

### 1. VPN Sayfasını Açın

Sol menüden **VPN** sekmesine girin ve **Add VPN** butonuna tıklayın. **Create VPN** sihirbazı açılır.

![VPN sayfası ve Add VPN butonu](/img/flexostack/vpn-add.png)

### 2. IKE Politikasını Yapılandırın

**Configure IKE** adımında **IKE policy** alanından **New IKE policy** seçin ve şunları belirleyin: politika adı (**Policy name**), anahtar geçerlilik süresi (**Key lifetime**), **Authentication algorithm**, **Encryption algorithm**, **IKE version** ve **Diffie-Hellman group**. **Next** ile devam edin.

![Create VPN: Configure IKE adımı](/img/flexostack/vpn-ike.png)

### 3. IPsec Politikasını Yapılandırın

**Configure IPsec** adımında VPN trafiğini şifrelemek için kullanılacak IPsec politikasının parametrelerini belirleyin: politika adı, **Key lifetime**, authentication ve encryption algoritmaları, **Diffie-Hellman group**. **Next** ile devam edin.

![Create VPN: Configure IPsec adımı](/img/flexostack/vpn-ipsec.png)

### 4. Endpoint Gruplarını Oluşturun

**Create endpoint groups** adımında önce **Router** alanından daha önce oluşturduğunuz virtual router'ı seçin.

![Create endpoint groups: router seçimi](/img/flexostack/vpn-router.png)

Ardından VPN üzerinden haberleşecek ağları belirleyin:

- **Local endpoint:** **Create endpoint group** seçip bir grup adı verin ve **Subnets** alanından FlexoStack'te oluşturduğunuz private network'ü seçin (ör. `192.168.1.0/24`).
- **Remote endpoint:** **Create endpoint group** seçip bir grup adı verin ve **Subnets** bölümünde **Add** ile karşı taraftaki subnet'i ekleyin (ör. `10.1.1.0/24`).

![Create endpoint groups: Local ve Remote endpoint tanımları](/img/flexostack/vpn-endpoints.png)

### 5. VPN Bağlantı Bilgilerini Girin

**Configure VPN** adımında:

- **VPN name:** Karşı lokasyon için bir ad girin (ör. `Branch Office`).
- **Public IPv4 address (Peer IP):** Karşı lokasyonun genel IP adresini girin.
- **Pre-shared key (PSK):** **Generate** ile yeni bir anahtar oluşturun veya size verilen anahtarı girin.
- **Peer ID authentication** ve **Local ID authentication** alanları isteğe bağlıdır, gerektiğinde doldurabilirsiniz.
- **Advanced settings** altında **Initiator mode** ve **Dead Peer Detection (DPD)** ayarlarını da düzenleyebilirsiniz.

![Create VPN: Configure VPN adımı](/img/flexostack/vpn-configure.png)

### 6. Özeti Kontrol Edin ve Oluşturun

**Summary** adımında seçtiğiniz ayarların özeti görüntülenir. **Create** butonuna tıkladığınızda IPsec VPN kurulumu tamamlanır.

:::note Özet
IPsec VPN kurulumu; önce bir private network ve virtual router oluşturulmasını, ardından VPN sihirbazında IKE ve IPsec politikalarının, endpoint gruplarının (local/remote) ve son olarak remote gateway ile pre-shared key bilgilerinin tanımlanmasını gerektirir.
:::

### Önerilen IKE ve IPsec Ayarları

İki tarafın **aynı** şifreleme ayarlarını kullanması gerekir. Güvenli ve yaygın uyumlu bir başlangıç yapılandırması:

| Parametre | IKE (Faz 1) | IPsec (Faz 2) |
| --- | --- | --- |
| Sürüm | IKEv2 | – |
| Encryption | AES-256 | AES-256 |
| Authentication | SHA-256 | SHA-256 |
| Diffie-Hellman group | group14 | group14 |
| Key lifetime | 3600 saniye | 3600 saniye |

:::warning Güçlü bir PSK kullanın
Pre-shared key en az 32 karakter uzunluğunda, rastgele üretilmiş bir değer olmalıdır. Paneldeki **Generate** butonunu kullanabilirsiniz. PSK'yı e-posta veya mesajlaşma uygulamalarıyla düz metin olarak paylaşmayın.
:::

## Karşı Tarafı Yapılandırma

Karşı taraftaki cihazda aynı parametrelerle bir IPsec tüneli oluşturun:

- **Remote gateway:** FlexoStack router'ınızın genel IP adresi (router detaylarında görünür)
- **Local subnet:** Ofis ağınız (ör. `10.1.1.0/24`)
- **Remote subnet:** FlexoStack sanal ağınız (ör. `192.168.1.0/24`)
- **PSK ve IKE/IPsec ayarları:** FlexoStack tarafıyla birebir aynı

Tünel her iki tarafta da yapılandırıldıktan sonra bağlantı durumu panelde **Active** olarak görünür.

## Güvenlik Grupları ve Güvenlik Duvarı

VPN üzerinden gelen trafik de [güvenlik grupları](./security-groups.md) tarafından denetlenir. FlexoStack sunucularınızın güvenlik gruplarında, karşı taraftaki ağ aralığından (ör. `10.1.1.0/24`) gelen trafiğe ihtiyaç duyduğunuz portlar için izin verin. Karşı taraftaki güvenlik duvarında da FlexoStack ağına izin vermeyi unutmayın.

## Sorun Giderme

- **Tünel kurulmuyor (Faz 1):** İki taraftaki IKE sürümü, şifreleme, hash, DH grubu ve PSK değerlerinin birebir aynı olduğunu; karşı taraftaki güvenlik duvarında UDP 500 ve UDP 4500 portlarının açık olduğunu kontrol edin.
- **Tünel kuruluyor ama trafik geçmiyor (Faz 2):** Yerel ve uzak ağ aralıklarının iki tarafta birbirinin tersi olacak şekilde tanımlandığını ve güvenlik grubu kurallarını kontrol edin.
- **Büyük paketlerde sorun:** Tünel ek başlıklar eklediği için MTU sorunları yaşanabilir. Karşı taraftaki cihazda TCP MSS değerini 1350 civarına düşürmeyi deneyin.

Sorun devam ederse VPN bağlantı adını ve karşı taraftaki cihaz modelini belirterek destek talebi oluşturabilirsiniz.
