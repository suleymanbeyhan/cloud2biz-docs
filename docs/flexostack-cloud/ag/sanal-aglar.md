---
sidebar_position: 1
title: Sanal Ağlar (Private Network)
sidebar_label: Sanal ağlar
description: FlexoStack'te dış erişime kapalı, izole sanal ağlar oluşturma; alt ağ, DHCP ve DNS ayarları.
---

FlexoStack'te sunucularınızı **sanal ağlar (Private Network)** üzerinde birbirine bağlarsınız. Sanal ağlar yazılım tanımlı ağ (SDN) teknolojisiyle oluşturulur; her proje kendi ağlarına sahiptir ve bu ağlar diğer müşterilerin ağlarından tamamen yalıtılmıştır.

## Ağ türleri

| Tür | Açıklama |
| --- | --- |
| **Genel ağ (public / external)** | Cloud2Biz tarafından sağlanan, internete çıkan ağdır. Floating IP adresleri ve router'ların dış ağ geçidi bu ağdan alınır. |
| **Sanal ağ (private)** | Sizin oluşturduğunuz, dış erişime kapalı ağdır. Sunucular arasındaki iç trafik bu ağ üzerinden akar ve iç trafik için ek trafik ücreti oluşmaz. |

Önerilen yapı; sunucularınızı sanal ağlara bağlamak, internet çıkışını bir [router](./sanal-routerlar.md) üzerinden sağlamak ve dışarıdan erişilmesi gereken sunuculara [floating IP](./floating-ip.md) atamaktır.

## Sanal ağ oluşturma

1. Panelde **Networks** ekranını açın ve **Create virtual network** butonuna tıklayın.
2. Ağa bir ad verin, örneğin `uygulama-agi`.
3. **IP adres yönetimi** seçeneğini açık bırakın ve alt ağ (subnet) bilgilerini girin:

| Alan | Örnek | Açıklama |
| --- | --- | --- |
| **Subnet CIDR** | `192.168.10.0/24` | Ağın IP aralığı. `/24` yaklaşık 250 adres sağlar. |
| **Gateway** | `192.168.10.1` | Ağ geçidi adresi. Router bu adresi kullanır. Boş bırakılırsa otomatik atanır. |
| **DHCP** | Açık | Sanal makinelerin IP adresini otomatik almasını sağlar. |
| **Allocation pool** | `192.168.10.100-192.168.10.200` | DHCP'nin dağıtacağı adres aralığı (isteğe bağlı). |
| **DNS servers** | `1.1.1.1`, `8.8.8.8` | Sanal makinelere dağıtılacak DNS sunucuları. |

4. **Create** butonuna tıklayın.

:::tip Adres aralığı planlaması
Farklı sanal ağlar için çakışmayan aralıklar kullanın (ör. `192.168.10.0/24`, `192.168.20.0/24`). Ofis ağınızla [Site-to-Site VPN](./vpn.md) kurmayı planlıyorsanız ofisinizdeki aralıklarla da çakışmamasına dikkat edin.
:::

## Örnek ağ mimarisi

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

## Ağ ayarlarını düzenleme

**Networks** ekranında ağı seçip **Edit** ile adını, DNS sunucularını ve DHCP ayarlarını değiştirebilirsiniz. Alt ağ CIDR'ı oluşturulduktan sonra değiştirilemez; farklı bir aralığa ihtiyacınız varsa yeni bir ağ oluşturun.

## Sanal makineyi ağa bağlama

- Yeni bir sanal makineyi oluştururken **Networks** bölümünde ağı seçin.
- Çalışan bir sanal makineye yeni bir ağ arayüzü eklemek için sanal makinenin **Networks** sekmesini kullanın. Bkz. [Sanal makine yönetimi](../sanal-makineler/sanal-makine-yonetimi.md#ağ-arayüzü-ekleme-ve-çıkarma).

## Sanal ağı silme

Bir ağı silmeden önce o ağa bağlı tüm sanal makine arayüzlerini, router arayüzlerini ve load balancer'ları kaldırmanız gerekir. Ardından **Networks** ekranında ağı seçip **Delete** butonuna tıklayın.

## MTU hakkında

Sanal ağlar VXLAN kapsüllemesi kullandığı için, sanal makine içindeki MTU değeri standart 1500'den biraz düşük olabilir. Hazır imajlarda MTU, DHCP üzerinden otomatik ayarlanır. Kendi imajlarınızda veya VPN/tünel kurulumlarında büyük paketlerle ilgili sorun yaşarsanız MTU değerini kontrol edin.
