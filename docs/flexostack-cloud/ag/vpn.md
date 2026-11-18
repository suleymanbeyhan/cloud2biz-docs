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

- FlexoStack tarafında, dış ağ geçidi tanımlı bir [router](./sanal-routerlar.md)'a bağlı bir sanal ağ
- Karşı tarafta IPsec destekleyen bir cihaz (FortiGate, pfSense, MikroTik, Cisco gibi) ve **sabit bir genel IP adresi**
- İki taraftaki ağ aralıklarının **çakışmaması** (ör. FlexoStack `192.168.10.0/24`, ofis `10.0.0.0/24`)

## VPN Bağlantısı Oluşturma

1. Panelde **VPN** ekranını açın ve **Create VPN connection** butonuna tıklayın.
2. Aşağıdaki bölümleri doldurun ve **Create** butonuna tıklayın.

### Bağlantı Bilgileri

| Alan | Açıklama |
| --- | --- |
| **Router** | VPN'in çalışacağı FlexoStack router'ı |
| **Local subnets** | FlexoStack tarafındaki, VPN üzerinden erişilecek sanal ağ(lar) |
| **Peer address** | Karşı taraftaki VPN cihazının genel IP adresi |
| **Peer subnets** | Karşı taraftaki ağ aralıkları (ör. `10.0.0.0/24`) |
| **Pre-shared key (PSK)** | İki tarafın kimlik doğrulaması için kullanılan ortak gizli anahtar |

### IKE ve IPsec Politikaları

İki tarafın aynı şifreleme ayarlarını kullanması gerekir. Güvenli ve yaygın uyumlu bir başlangıç yapılandırması:

| Parametre | IKE (Faz 1) | IPsec (Faz 2) |
| --- | --- | --- |
| Sürüm | IKEv2 | – |
| Şifreleme | AES-256 | AES-256 |
| Bütünlük (hash) | SHA-256 | SHA-256 |
| DH grubu / PFS | Group 14 | Group 14 |
| Ömür (lifetime) | 28800 saniye | 3600 saniye |

:::warning Güçlü bir PSK kullanın
Pre-shared key en az 32 karakter uzunluğunda, rastgele üretilmiş bir değer olmalıdır. Örneğin `openssl rand -base64 32` komutuyla üretebilirsiniz. PSK'yı e-posta veya mesajlaşma uygulamalarıyla düz metin olarak paylaşmayın.
:::

## Karşı Tarafı Yapılandırma

Karşı taraftaki cihazda aynı parametrelerle bir IPsec tüneli oluşturun:

- **Remote gateway:** FlexoStack router'ınızın genel IP adresi (router detaylarında görünür)
- **Local subnet:** Ofis ağınız (ör. `10.0.0.0/24`)
- **Remote subnet:** FlexoStack sanal ağınız (ör. `192.168.10.0/24`)
- **PSK ve IKE/IPsec ayarları:** FlexoStack tarafıyla birebir aynı

Tünel her iki tarafta da yapılandırıldıktan sonra bağlantı durumu panelde **Active** olarak görünür.

## Güvenlik Grupları ve Güvenlik Duvarı

VPN üzerinden gelen trafik de [güvenlik grupları](./security-groups.md) tarafından denetlenir. FlexoStack sunucularınızın güvenlik gruplarında, karşı taraftaki ağ aralığından (ör. `10.0.0.0/24`) gelen trafiğe ihtiyaç duyduğunuz portlar için izin verin. Karşı taraftaki güvenlik duvarında da FlexoStack ağına izin vermeyi unutmayın.

## Sorun Giderme

- **Tünel kurulmuyor (Faz 1):** İki taraftaki IKE sürümü, şifreleme, hash, DH grubu ve PSK değerlerinin birebir aynı olduğunu; karşı taraftaki güvenlik duvarında UDP 500 ve UDP 4500 portlarının açık olduğunu kontrol edin.
- **Tünel kuruluyor ama trafik geçmiyor (Faz 2):** Yerel ve uzak ağ aralıklarının iki tarafta birbirinin tersi olacak şekilde tanımlandığını ve güvenlik grubu kurallarını kontrol edin.
- **Büyük paketlerde sorun:** Tünel ek başlıklar eklediği için MTU sorunları yaşanabilir. Karşı taraftaki cihazda TCP MSS değerini 1350 civarına düşürmeyi deneyin.

Sorun devam ederse VPN bağlantı adını ve karşı taraftaki cihaz modelini belirterek destek talebi oluşturabilirsiniz.
