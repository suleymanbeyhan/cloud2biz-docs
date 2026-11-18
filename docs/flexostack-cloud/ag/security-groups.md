---
sidebar_position: 4
title: Security Groups (Güvenlik Grupları)
sidebar_label: Security Groups
description: FlexoStack'te güvenlik grupları ile sanal makinelere gelen ve giden trafiği port, protokol ve kaynak bazında kontrol etme.
---

**Security group (güvenlik grubu)**, bu gruba atanmış sanal makinelere gelen ve giden trafiği kontrol eden ağ erişim kuralları kümesidir. Güvenlik grubu kurallarıyla, bir sanal ağ arayüzüne hangi tür ve yöndeki trafiğin erişebileceğini belirlersiniz. Güvenlik grupları sanal makinenin dışında, ağ katmanında uygulanır; sanal makine içinde ek bir yazılım gerektirmez.

## Kurallar Nasıl Değerlendirilir?

- Bir sanal makineye **birden fazla** güvenlik grubu atanabilir. Tüm gruplardaki kurallar birlikte değerlendirilir.
- **Kuralların sırası önemli değildir**; ne tek bir grup içinde ne de gruplar arasında sıralama değerlendirmeyi etkiler.
- Her paket, uygulanabilir tüm kurallarla karşılaştırılır. **En az bir kural izin veriyorsa** paket geçer.
- **Hiçbir kurala uymayan trafik varsayılan olarak engellenir.**
- Kurallar birbirini tamamlar (kümülatiftir); çakışan veya tekrar eden kurallar sorun oluşturmaz.
- Güvenlik grupları **durum bilgilidir (stateful)**: izin verilen bir bağlantının dönüş trafiği için ayrıca kural yazmanız gerekmez.

## Default Güvenlik Grubu

Her proje için **default** adında bir güvenlik grubu otomatik olarak oluşturulur.

- Bu grup tüm protokollerde ve tüm portlarda trafiğe izin verir.
- Default grup silinemez.
- Bir sanal makineye ağ arayüzü eklerken özel bir grup seçmezseniz arayüz bu gruba dahil edilir.

:::warning Canlı sunucularda default grubu kullanmayın
Default grup tüm portlara erişime izin verdiği için, internete açık sunucularda yalnızca ihtiyaç duyduğunuz portları açan özel bir güvenlik grubu kullanın.
:::

## Güvenlik Grubu Oluşturma

1. Panelde **Security groups** ekranını açın ve **Create security group** butonuna tıklayın.
2. Gruba açıklayıcı bir ad verin, örneğin `web-sunucu` veya `veritabani`.
3. Grubu oluşturduktan sonra **Add rule** ile kuralları ekleyin.

Yeni oluşturulan bir grupta, tüm **giden (egress)** trafiğe izin veren kurallar hazır gelir; **gelen (ingress)** trafik ise siz kural ekleyene kadar kapalıdır.

## Kural Alanları

| Alan | Açıklama |
| --- | --- |
| **Direction** | **Ingress** (gelen) veya **Egress** (giden) |
| **Protocol** | TCP, UDP, ICMP veya tümü (any) |
| **Port range** | Tek bir port (ör. `443`) veya aralık (ör. `8000-8100`) |
| **Remote** | Trafiğin kaynağı (ingress) veya hedefi (egress): bir **CIDR** (ör. `203.0.113.10/32`) veya başka bir **güvenlik grubu** |
| **Ethertype** | IPv4 veya IPv6 |

### Kaynak Olarak Güvenlik Grubu Kullanma

Kaynak olarak CIDR yerine başka bir güvenlik grubu seçtiğinizde, kural o gruba üye tüm sanal makinelerden gelen trafiğe izin verir. Örneğin veritabanı grubuna "yalnızca `web-sunucu` grubundan TCP 3306" kuralı eklerseniz, yeni web sunucuları eklendiğinde kuralı güncellemeniz gerekmez.

## Örnek Kural Setleri

### Web Sunucusu

| Yön | Protokol | Port | Kaynak |
| --- | --- | --- | --- |
| Ingress | TCP | 80 | `0.0.0.0/0` |
| Ingress | TCP | 443 | `0.0.0.0/0` |
| Ingress | TCP | 22 | Ofis IP'niz, ör. `203.0.113.10/32` |

### Veritabanı Sunucusu

| Yön | Protokol | Port | Kaynak |
| --- | --- | --- | --- |
| Ingress | TCP | 3306 (MySQL) veya 5432 (PostgreSQL) | `web-sunucu` güvenlik grubu |
| Ingress | TCP | 22 | Ofis IP'niz |

### Windows Sunucu

| Yön | Protokol | Port | Kaynak |
| --- | --- | --- | --- |
| Ingress | TCP | 3389 | Ofis IP'niz |
| Ingress | ICMP | – | Ofis IP'niz (isteğe bağlı) |

## Sanal Makineye Güvenlik Grubu Atama

Güvenlik gruplarını hem yeni hem de mevcut sanal makinelere atayabilirsiniz:

- **Oluşturma sırasında:** **Networks** bölümünde her ağ arayüzü için grupları seçin.
- **Çalışan sanal makinede:** Sanal makinenin **Networks** sekmesinde ilgili arayüzü düzenleyerek grup ekleyin veya çıkarın.

Güvenlik gruplarına kural eklediğinizde veya kural kaldırdığınızda değişiklikler **anında**, sanal makineyi yeniden başlatmaya gerek kalmadan uygulanır.

## Gelişmiş Güvenlik Duvarı İhtiyaçları {#gelişmiş-güvenlik-duvarı-ihtiyaçları}

Güvenlik grupları çoğu kullanım için yeterlidir. Daha gelişmiş ihtiyaçlar için (ör. derin paket inceleme, IPS) pfSense gibi açık kaynak yazılım güvenlik duvarları veya FortiGate (sanal ya da fiziksel) çözümleri de kullanılabilir. Bu seçenekler için destek ekibimizle iletişime geçebilirsiniz.

## Sorun Giderme

- **Bağlantı zaman aşımına uğruyor:** İlgili port için ingress kuralı olduğunu ve kaynak CIDR'ın kendi IP adresinizi kapsadığını kontrol edin. Kendi genel IP adresinizi öğrenmek için `curl ifconfig.me` komutunu kullanabilirsiniz.
- **Kural doğru ama yine erişilemiyor:** Sanal makine içindeki güvenlik duvarını (ufw, firewalld, Windows Firewall) ve servisin ilgili portu dinlediğini kontrol edin (`ss -tlnp`).
- **Ping çalışmıyor:** ICMP için ayrı bir ingress kuralı gerekir.
