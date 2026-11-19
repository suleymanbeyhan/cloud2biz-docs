---
sidebar_position: 1
title: Sanal Ağlar (Private Network)
sidebar_label: Sanal Ağlar
description: FlexoStack'te dış erişime kapalı, izole sanal ağlar oluşturma; alt ağ, DHCP ve DNS ayarları.
---

FlexoStack'te sunucularınızı **sanal ağlar (Private Network)** üzerinde birbirine bağlarsınız. Sanal ağlar yazılım tanımlı ağ (SDN) teknolojisiyle oluşturulur; her proje kendi ağlarına sahiptir ve bu ağlar diğer müşterilerin ağlarından tamamen yalıtılmıştır.

## Ağ Türleri

| Tür | Açıklama |
| --- | --- |
| **Genel ağ (public / external)** | Cloud2Biz tarafından sağlanan, internete çıkan ağdır. Floating IP adresleri ve router'ların dış ağ geçidi bu ağdan alınır. |
| **Sanal ağ (private)** | Sizin oluşturduğunuz, dış erişime kapalı ağdır. Sunucular arasındaki iç trafik bu ağ üzerinden akar ve iç trafik için ek trafik ücreti oluşmaz. |

Önerilen yapı; sunucularınızı sanal ağlara bağlamak, internet çıkışını bir [router](./sanal-routerlar.md) üzerinden sağlamak ve dışarıdan erişilmesi gereken sunuculara [floating IP](./floating-ip.md) atamaktır.

## Sanal Ağ Oluşturma

**1. Networks sayfasını açın**

**Compute** panelinde sol menüden **Networks** sekmesine girin ve sağ üstteki **Create network** butonuna tıklayın.

![Networks sayfası ve Create network butonu](/img/flexostack/network-create.png)

**2. Subnet ekleyin**

Açılan **Create virtual network** penceresinde ağa bir ad verin (ör. `Private Network`). **IP address management** adımında **Subnets** bölümündeki **Add** butonuna tıklayın ve IPv4 subnet ekleyin.

![Create virtual network penceresinde Subnets - Add butonu](/img/flexostack/network-subnet-add.png)

**3. IPv4 subnet bilgilerini girin**

**Add IPv4 subnet** penceresinde **CIDR** bilgisini girin (ör. `192.168.1.0/24`). İsteğe bağlı olarak **Gateway**, **Allocation pools** ve **DNS servers** alanlarını da doldurabilirsiniz. **Add** ile subnet'i ekleyin, ardından özet ekranında **Create** ile ağı oluşturun.

![Add IPv4 subnet penceresi](/img/flexostack/network-subnet-ipv4.png)

| Alan | Örnek | Açıklama |
| --- | --- | --- |
| **CIDR** | `192.168.1.0/24` | Ağın IP aralığı. `/24` yaklaşık 250 adres sağlar. |
| **Gateway** | `192.168.1.1` | Ağ geçidi adresi (isteğe bağlı). Router bu adresi kullanır; boş bırakılırsa otomatik atanır. |
| **Built-in DHCP server** | Açık | Sanal makinelerin IP adresini otomatik almasını sağlar. |
| **Allocation pools** | `192.168.1.100 — 192.168.1.200` | DHCP'nin dağıtacağı adres aralığı (isteğe bağlı). |
| **DNS servers** | `8.8.8.8` | Sanal makinelere dağıtılacak DNS sunucuları (isteğe bağlı). |

:::tip Sonraki adım: router
Private network'teki sunucuların internete çıkabilmesi veya [Site-to-Site VPN](./vpn.md) kurabilmeniz için ağı bir [sanal router](./sanal-routerlar.md#router-oluşturma)'a bağlamanız gerekir.
:::

:::tip Adres aralığı planlaması
Farklı sanal ağlar için çakışmayan aralıklar kullanın (ör. `192.168.10.0/24`, `192.168.20.0/24`). Ofis ağınızla [Site-to-Site VPN](./vpn.md) kurmayı planlıyorsanız ofisinizdeki aralıklarla da çakışmamasına dikkat edin.
:::

## Örnek Ağ Mimarisi

Çok katmanlı bir uygulama için örnek yapı:

```text
                    İnternet
                       │
              Load Balancer (floating IP)
                       │
 ┌──────────── web-agi 192.168.10.0/24 ────────────┐
 │   web-01            web-02            web-03     │
 └──────────────────────┬──────────────────────────┘
                        │ (router üzerinden)
 ┌──────────── db-agi 192.168.20.0/24 ─────────────┐
 │   db-01 (birincil)        db-02 (yedek)          │
 └─────────────────────────────────────────────────┘
```

Bu yapıda veritabanı sunucularının floating IP'si yoktur; internetten doğrudan erişilemezler. [Security Groups](./security-groups.md) ile veritabanı portuna yalnızca web ağından erişim izni verilir.

## Ağ Ayarlarını Düzenleme

**Networks** ekranında ağı seçip **Edit** ile adını, DNS sunucularını ve DHCP ayarlarını değiştirebilirsiniz. Alt ağ CIDR'ı oluşturulduktan sonra değiştirilemez; farklı bir aralığa ihtiyacınız varsa yeni bir ağ oluşturun.

## Sanal Makineyi Ağa Bağlama

- Yeni bir sanal makineyi oluştururken **Networks** bölümünde ağı seçin.
- Çalışan bir sanal makineye yeni bir ağ arayüzü eklemek için sanal makinenin **Networks** sekmesini kullanın. Bkz. [Sanal makine yönetimi](../sanal-makineler/sanal-makine-yonetimi.md#ağ-arayüzü-ekleme-ve-çıkarma).

## Sanal Ağı Silme

Bir ağı silmeden önce o ağa bağlı tüm sanal makine arayüzlerini, router arayüzlerini ve load balancer'ları kaldırmanız gerekir. Ardından **Networks** ekranında ağı seçip **Delete** butonuna tıklayın.

## MTU Hakkında

Sanal ağlar VXLAN kapsüllemesi kullandığı için, sanal makine içindeki MTU değeri standart 1500'den biraz düşük olabilir. Hazır imajlarda MTU, DHCP üzerinden otomatik ayarlanır. Kendi imajlarınızda veya VPN/tünel kurulumlarında büyük paketlerle ilgili sorun yaşarsanız MTU değerini kontrol edin.
