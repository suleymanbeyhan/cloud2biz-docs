---
sidebar_position: 4
title: Security Groups (Güvenlik Grupları)
sidebar_label: Security Groups
description: FlexoStack'te güvenlik grupları ile sanal makinelere gelen ve giden trafiği port, protokol ve kaynak bazında kontrol etme.
---

**Security group (güvenlik grubu)**, bu gruba atanmış sanal makinelere gelen ve giden trafiği kontrol eden ağ erişim kuralları kümesidir. Güvenlik grubu kurallarıyla, bir sanal ağ arayüzüne hangi tür ve yöndeki trafiğin erişebileceğini belirlersiniz. Güvenlik grupları sanal makinenin dışında, ağ katmanında uygulanır; sanal makine içinde ek bir yazılım gerektirmez.

## Kurallar Nasıl Değerlendirilir?

Güvenlik grubundaki **her kural bir izin (allow) kuralıdır.** Panelde bir grubun **Rules** sekmesinde listelenen kurallar, izin verilen trafiği gösterir. **Listede yazılı olmayan trafik izinli değildir, engellenir (deny).** Ayrı bir "engelle" kuralı yazmanıza gerek yoktur; bir trafiği engellemek için ona izin veren kuralı silmeniz yeterlidir.

- Bir sanal makineye **birden fazla** güvenlik grubu atanabilir. Tüm gruplardaki kurallar birlikte değerlendirilir.
- **Kuralların sırası önemli değildir**; ne tek bir grup içinde ne de gruplar arasında sıralama değerlendirmeyi etkiler.
- Her paket, uygulanabilir tüm kurallarla karşılaştırılır. **En az bir kural izin veriyorsa** paket geçer.
- Kurallar birbirini tamamlar (kümülatiftir); çakışan veya tekrar eden kurallar sorun oluşturmaz.
- Güvenlik grupları **durum bilgilidir (stateful)**: izin verilen bir bağlantının dönüş trafiği için ayrıca kural yazmanız gerekmez.

## Default Güvenlik Grubu

Her proje için **default** adında bir güvenlik grubu otomatik olarak oluşturulur. Grubun kurallarını görmek için **Compute** > **Security groups** ekranında **default** grubunun üzerine tıklayın; sağdaki bölmede **Rules**, **Properties** ve **Assigned VMs** sekmeleri açılır.

![FlexoStack panelinde default güvenlik grubunun Inbound ve Outbound kuralları](/img/flexostack/security-group-default.png)

Default grupta aşağıdaki **izin** kuralları bulunur:

| Yön | Protokol | Port aralığı | Kaynak / Hedef | Anlamı |
| --- | --- | --- | --- | --- |
| Inbound | Any | 1 - 65535 | `default` (IPv4 ve IPv6) | Default gruba dahil sanal makineler birbirine her portta erişebilir. |
| Inbound | Any | 1 - 65535 | `0.0.0.0/0` | Tüm IPv4 adreslerinden gelen trafiğe izin verilir. |
| Inbound | Any | 1 - 65535 | `::/0` | Tüm IPv6 adreslerinden gelen trafiğe izin verilir. |
| Outbound | Any | 1 - 65535 | `0.0.0.0/0` | Tüm IPv4 adreslerine giden trafiğe izin verilir. |
| Outbound | Any | 1 - 65535 | `::/0` | Tüm IPv6 adreslerine giden trafiğe izin verilir. |

Yani default grup **tüm protokollerde ve tüm portlarda** gelen ve giden trafiğe izin verir. Bu kurallardan birini silerseniz, o kuralın izin verdiği trafik engellenir.

- Default grup silinemez.
- Bir sanal makineye ağ arayüzü eklerken özel bir grup seçmezseniz arayüz bu gruba dahil edilir.
- **Assigned VMs** sekmesinde gruba atanmış sanal makineleri görebilirsiniz.

:::warning Canlı sunucularda default grubu kullanmayın
Default grup tüm portlara erişime izin verdiği için, internete açık sunucularda yalnızca ihtiyaç duyduğunuz portları açan özel bir güvenlik grubu kullanın.
:::

## Güvenlik Grubu Oluşturma

1. Panelde **Security groups** ekranını açın ve **Create security group** butonuna tıklayın.
2. Gruba açıklayıcı bir ad verin, örneğin `web-sunucu` veya `veritabani`.
3. Grubu oluşturduktan sonra grubun **Rules** sekmesinde **Inbound** (gelen) veya **Outbound** (giden) bölümündeki **Add** butonuyla kuralları ekleyin. Bir kuralı kaldırmak için satırın sonundaki çöp kutusu simgesine tıklayın.

Yeni oluşturulan bir grupta, tüm **giden (Outbound)** trafiğe izin veren kurallar hazır gelir; **gelen (Inbound)** trafik ise siz izin kuralı ekleyene kadar kapalıdır.

## Kural Alanları

| Alan | Açıklama |
| --- | --- |
| **Yön** | Kuralı **Inbound** (gelen) veya **Outbound** (giden) bölümüne eklersiniz. |
| **Protocol** | TCP, UDP, ICMP veya tümü (Any) |
| **Port range** | Tek bir port (ör. `443`) veya aralık (ör. `8000-8100`) |
| **Source** / **Destination** | Gelen trafiğin kaynağı (Inbound) veya giden trafiğin hedefi (Outbound): bir **CIDR** (ör. `203.0.113.10/32`, tüm IPv4 için `0.0.0.0/0`, tüm IPv6 için `::/0`) veya başka bir **güvenlik grubu** |

### Kaynak Olarak Güvenlik Grubu Kullanma

Kaynak olarak CIDR yerine başka bir güvenlik grubu seçtiğinizde, kural o gruba üye tüm sanal makinelerden gelen trafiğe izin verir. Örneğin veritabanı grubuna "yalnızca `web-sunucu` grubundan TCP 3306" kuralı eklerseniz, yeni web sunucuları eklendiğinde kuralı güncellemeniz gerekmez.

## Örnek Kural Setleri

### Web Sunucusu

| Yön | Protokol | Port | Kaynak |
| --- | --- | --- | --- |
| Inbound | TCP | 80 | `0.0.0.0/0` |
| Inbound | TCP | 443 | `0.0.0.0/0` |
| Inbound | TCP | 22 | Ofis IP'niz, ör. `203.0.113.10/32` |

### Veritabanı Sunucusu

| Yön | Protokol | Port | Kaynak |
| --- | --- | --- | --- |
| Inbound | TCP | 3306 (MySQL) veya 5432 (PostgreSQL) | `web-sunucu` güvenlik grubu |
| Inbound | TCP | 22 | Ofis IP'niz |

### Windows Sunucu

| Yön | Protokol | Port | Kaynak |
| --- | --- | --- | --- |
| Inbound | TCP | 3389 | Ofis IP'niz |
| Inbound | ICMP | – | Ofis IP'niz (isteğe bağlı) |

## Sanal Makineye Güvenlik Grubu Atama

Güvenlik grupları sanal makinenin **ağ arayüzüne** atanır. Bir arayüze birden fazla grup atayabilirsiniz; bu durumda tüm grupların izin kuralları birlikte geçerli olur.

### Oluşturma Sırasında

1. **Virtual machines** ekranında **Create virtual machine** butonuna tıklayın.
2. **Network interfaces** bölümünde **Add** ile bir ağ arayüzü ekleyin (veya mevcut arayüzü düzenleyin).
3. **Add network interface** penceresinde **Network** alanından ağı seçin.
4. **Security groups** alanını açın ve arayüze atamak istediğiniz grupları işaretleyin. Birden fazla grup seçebilirsiniz.
5. **Add** ile arayüzü kaydedin ve sanal makine oluşturma adımlarına devam edin.

![Add network interface penceresinde Security groups seçimi](/img/flexostack/security-group-add-interface.png)

### Kurulumdan Sonra Değiştirme

1. **Virtual machines** ekranında sanal makinenin üzerine tıklayın.
2. **Network interfaces** bölümünde **Edit** butonuna tıklayın ve düzenlemek istediğiniz arayüzü seçin.
3. **Edit network interface** penceresinde **Security groups** alanını açın.
4. Eklemek istediğiniz grupları işaretleyin, çıkarmak istediğiniz grupların işaretini kaldırın.
5. **Save** ile kaydedin, ardından **Done** butonuna tıklayın.

![Edit network interface penceresinde Security groups değiştirme](/img/flexostack/security-group-edit-interface.png)

Güvenlik grubu atamalarında ve kurallarında yaptığınız değişiklikler **anında**, sanal makineyi yeniden başlatmaya gerek kalmadan uygulanır.

:::tip
Bir arayüzden tüm güvenlik gruplarını kaldırırsanız o arayüze hiçbir izin kuralı uygulanmaz ve trafik engellenir. Sanal makineye erişiminizi kaybetmemek için en az bir uygun grubun seçili kaldığından emin olun.
:::

## Gelişmiş Güvenlik Duvarı İhtiyaçları {#gelişmiş-güvenlik-duvarı-ihtiyaçları}

Güvenlik grupları çoğu kullanım için yeterlidir. Daha gelişmiş ihtiyaçlar için (ör. derin paket inceleme, IPS) pfSense gibi açık kaynak yazılım güvenlik duvarları veya FortiGate (sanal ya da fiziksel) çözümleri de kullanılabilir. Bu seçenekler için destek ekibimizle iletişime geçebilirsiniz.

## Sorun Giderme

- **Bağlantı zaman aşımına uğruyor:** İlgili port için Inbound izin kuralı olduğunu ve kaynak CIDR'ın kendi IP adresinizi kapsadığını kontrol edin. Kendi genel IP adresinizi öğrenmek için `curl ifconfig.me` komutunu kullanabilirsiniz.
- **Kural doğru ama yine erişilemiyor:** Sanal makine içindeki güvenlik duvarını (ufw, firewalld, Windows Firewall) ve servisin ilgili portu dinlediğini kontrol edin (`ss -tlnp`).
- **Ping çalışmıyor:** ICMP için ayrı bir Inbound izin kuralı gerekir.
