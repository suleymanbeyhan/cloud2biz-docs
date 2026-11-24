---
sidebar_position: 1
title: Sabit Kaynak Faturalandırması
sidebar_label: Sabit Kaynak
description: FlexoStack sabit kaynak modelinde birim fiyatlar, ödeme dönemleri, peşin ödeme ve miktar indirimleri, Windows lisansı, yedekleme ücretleri ve kaynak değişikliklerinin faturaya etkisi.
---

**Sabit kaynak** modelinde belirli bir miktarda CPU, RAM ve disk kaynağını **aylık sabit bir ücretle** satın alırsınız. Bu kaynak havuzunu FlexoStack panelinde dilediğiniz gibi bölerek sanal makinelerinizi oluşturursunuz. Ücretiniz kullanım oranından bağımsızdır; aylık maliyetinizi önceden bilirsiniz.

Sabit kaynak modeli; web siteleri, veritabanları ve kurumsal uygulamalar gibi **sürekli çalışan ve kaynak ihtiyacı öngörülebilir** sistemler için idealdir.

:::tip Maliyetinizi hemen hesaplayın
İhtiyacınız olan kaynakları girerek aylık ve dönemlik tutarı görmek için [Sabit Kaynak Hesaplayıcı](./fiyat-hesaplayici.mdx) sayfasını kullanın.
:::

## Nasıl Çalışır?

1. [cloud2biz.com](https://cloud2biz.com) üzerinden ihtiyacınız olan lokasyon için FlexoStack sabit kaynak hizmetini satın alın (ör. **Flexostack - Sabit Kaynak - İstanbul**).
2. Sipariş sırasında vCPU, RAM ve disk miktarlarını ve ödeme dönemini (aylık, 6 aylık veya 12 aylık) seçin.
3. Ödeme tamamlandığında hizmetiniz aktif olur. FlexoStack paneline giriş bilgilerinize **Hizmetler** altındaki hizmetinizin **Giriş Detayları** sekmesinden ulaşabilirsiniz. Bkz. [Panele giriş](../ilk-adimlar/panele-giris.md).
4. Satın aldığınız kaynak havuzunu panelde istediğiniz sayıda sanal makineye dağıtın. Örneğin 8 vCPU ve 16 GB RAM'lik bir havuzla 4 vCPU / 8 GB'lık bir, 2 vCPU / 4 GB'lık iki sanal makine oluşturabilirsiniz.

## Birim Fiyatlar

Tüm fiyatlar **USD** cinsindendir ve **aylık birim fiyattır**. 6 ve 12 aylık sütunlar, ilgili dönemi peşin ödediğinizde uygulanan aylık fiyatı gösterir.

### İşlemci ve Bellek

| Kaynak | Birim | Aylık | 6 ay peşin | 12 ay peşin |
| --- | --- | --- | --- | --- |
| vCPU | 1 vCore | 1,80 | 1,71 | 1,62 |
| RAM | 1 GB | 1,80 | 1,71 | 1,62 |

### Disk

| Disk tipi | Teknoloji | Birim | Aylık | 6 ay peşin | 12 ay peşin |
| --- | --- | --- | --- | --- | --- |
| Disk High IOPS | NVMe SSD | 1 GB | 0,048 | 0,0456 | 0,0432 |
| Disk Economy | SAS disk | 1 GB | 0,028 | 0,0266 | 0,0252 |

Disk, oluşturduğunuz boyut (ayrılan alan) üzerinden ücretlendirilir.

### IP Adresleri

| Kaynak | Birim | Aylık | 6 ay peşin | 12 ay peşin |
| --- | --- | --- | --- | --- |
| Public IP | 1 adet | 2,00 | 1,90 | 1,80 |

### Ağ Trafiği

Sabit kaynak modelinde ağ trafiği sabit ücrete dahil değildir. **Gelen (inbound)** ve **giden (outbound)** trafiğiniz ay boyunca ayrı ayrı ölçülür ve **ay sonunda** faturalandırılır. Trafik fiyatları PAYG ile aynıdır:

| Aylık trafik (her yön için ayrı) | Fiyat |
| --- | --- |
| İlk 1 TB (1.024 GB) | Ücretsiz |
| 1–4 TB | 0,0070 / GB |
| 4–8 TB | 0,0065 / GB |
| 8–16 TB | 0,0060 / GB |
| 16–32 TB | 0,0055 / GB |
| 32 TB ve üzeri | 0,0050 / GB |

Örneğin bir ayda 1.500 GB giden trafik oluştuysa, ilk 1.024 GB ücretsizdir ve kalan 476 GB için ay sonunda 476 × 0,0070 = 3,33 USD faturalandırılır.

### Windows Server Lisansı

FlexoStack'teki Windows Server imajları **hazır olarak lisanslanmıştır**. Lisanslama **Windows Server Datacenter** lisansı ile yapılır ve bedeli **çekirdek (core) başına değil**, sanal makine başına **aylık 25 USD**'dir. Sanal makinenize kaç vCPU verirseniz verin lisans bedeli değişmez.

### Load Balancer

FlexoStack'te tek tip load balancer vardır. Load balancer başına sabit aylık ücret uygulanır; 6 ve 12 aylık peşin ödemelerde aylık fiyat değişmez.

| Kaynak | Birim | Aylık | 6 ay peşin | 12 ay peşin |
| --- | --- | --- | --- | --- |
| Load balancer | 1 adet | 15,00 | 15,00 | 15,00 |

### Snapshot ve Yedekleme

- **Snapshot:** Snapshot ücretsizdir. Snapshot'lar disk kotanızdan kullanıldığı için ayrıca ücret alınmaz.
- **Yedekleme:** [Yedekleme planları](../depolama/yedekleme.md) ve elle alınan yedekler için kullanılan yedekleme alanı GB bazında ücretlendirilir. **En az 100 GB** satın alınır; yedekleme kullanmayacaksanız satın almanız gerekmez.

| Hizmet | Birim | Aylık | 6 ay peşin | 12 ay peşin |
| --- | --- | --- | --- | --- |
| Yedekleme alanı (en az 100 GB) | 1 GB | 0,0140 | 0,0133 | 0,0126 |

### Ücretsiz Hizmetler

- vLAN, switch ve port bazlı güvenlik duvarı ([Security Groups](../ag/security-groups.md))
- Snapshot

## Miktar İndirimleri {#miktar-indirimleri}

Satın aldığınız kaynak miktarı arttıkça birim fiyata indirim uygulanır:

| Kaynak | %0 | %10 | %15 |
| --- | --- | --- | --- |
| vCPU | 1–8 adet | 9–32 adet | 33 adet ve üzeri |
| RAM | 1–32 GB | 33–64 GB | 65 GB ve üzeri |
| Disk | 0–4 TB | 4–20 TB | 20 TB ve üzeri |
| Yedekleme alanı | 100–4.095 GB | 4.096–20.479 GB | 20.480–51.200 GB |

Ulaşılan kademenin indirimi, satın alınan miktarın **tamamına** uygulanır. Örneğin 10 vCPU satın aldığınızda 10 vCPU'nun tamamı %10 indirimli fiyattan hesaplanır. ([PAYG](./payg.md#kademeli-hesaplama)'de ise her kademe kendi fiyatıyla ayrı hesaplanır.)

Miktar indirimleri, 6 ve 12 aylık peşin ödeme fiyatlarına ek olarak uygulanır.

## Ödeme Dönemleri ve Faturalar

| Dönem | Fatura | Avantaj |
| --- | --- | --- |
| Aylık | Her ay peşin | Standart fiyat, taahhüt 1 ay |
| 6 aylık | 6 ay peşin | Yaklaşık %5 indirimli birim fiyat |
| 12 aylık | 12 ay peşin | Yaklaşık %10 indirimli birim fiyat |

- Faturalar dönem başında **peşin** olarak oluşturulur.
- Dönem içinde yaptığınız **kaynak artışlarından** doğan farklar **ay sonunda** faturalandırılır.
- Ay boyunca ölçülen **ağ trafiği** ay sonunda faturalandırılır.
- Ödemelerinizi [cloud2biz.com müşteri panelinizden](https://cloud2biz.com/clientarea) kredi kartı veya banka kartıyla yapabilirsiniz.

## Örnek Hesaplama

**8 vCPU, 16 GB RAM, 200 GB Disk High IOPS ve 1 IP** içeren bir yapılandırma:

| Kalem | Aylık ödeme | 12 ay peşin |
| --- | --- | --- |
| 8 vCPU | 8 × 1,80 = 14,40 | 8 × 1,62 = 12,96 |
| 16 GB RAM | 16 × 1,80 = 28,80 | 16 × 1,62 = 25,92 |
| 200 GB Disk High IOPS | 200 × 0,048 = 9,60 | 200 × 0,0432 = 8,64 |
| 1 IP | 2,00 | 1,80 |
| **Aylık toplam** | **54,80 USD** | **49,32 USD** |
| **Dönem toplamı** | 54,80 USD | 591,84 USD |

Bu yapılandırmada 12 aylık peşin ödeme, aylık ödemeye göre yıllık yaklaşık 65,76 USD tasarruf sağlar. Kendi yapılandırmanızı hesaplamak için [Sabit Kaynak Hesaplayıcı](./fiyat-hesaplayici.mdx) sayfasını kullanın.

## Kaynak Değişiklikleri

### Kaynak Artırma (Paket Yükseltme)

Sabit kaynak satın aldıysanız FlexoStack hesabınızın kaynaklarını dönem sonunu beklemeden, **anında** artırabilirsiniz:

1. [cloud2biz.com müşteri panelinize](https://cloud2biz.com/clientarea) giriş yapın.
2. **Hizmetler** bölümünden ilgili FlexoStack hizmetinizi seçin.
3. **Paket yükseltme** seçeneğine tıklayın.
4. Artırmak istediğiniz kaynakları (vCPU, RAM, disk, IP vb.) yeni değerleriyle güncelleyin.
5. Oluşan ek ücreti ödeyin.

Ödeme tamamlandığında yeni kaynaklar FlexoStack hesabınıza anında tanımlanır ve kullanmaya başlayabilirsiniz.

### Kaynak Azaltma

FlexoStack hesabınızın kaynaklarını aynı **Paket yükseltme** ekranından azaltabilirsiniz. Bu durumda:

- Mevcut dönem için **herhangi bir ücret iadesi yapılmaz**.
- **Bir sonraki ayın faturası**, azaltılan kaynaklar kadar düşük oluşturulur.

:::note Disk alanı
Disk alanı yalnızca artırılabilir; mevcut bir disk küçültülemez. Bu nedenle disk boyutunu ihtiyacınıza göre kademeli olarak artırmanızı öneririz.
:::

| Değişiklik | Ne zaman geçerli olur? | Faturaya etkisi |
| --- | --- | --- |
| **Kaynak artırma** | Ödeme sonrasında anında | Paket yükseltme sırasında ek ücret ödenir. |
| **Kaynak azaltma** | Hemen | Ücret iadesi yapılmaz; bir sonraki ayın faturası azalır. |

## Sabit Kaynak mı, PAYG mi?

| | Sabit kaynak | PAYG |
| --- | --- | --- |
| Ücretlendirme | Aylık sabit | Saatlik ölçüm |
| Ağ trafiği | Ay sonunda ölçülüp faturalandırılır | Ölçülüp faturalandırılır (aynı fiyat) |
| Maliyet öngörüsü | Yüksek, her ay aynı | Kullanıma göre değişir |
| Taahhüt | Seçilen dönem (1, 6 veya 12 ay) | Yok |
| İndirimler | Peşin ödeme ve miktar indirimleri | – |
| Kaynak azaltma etkisi | Bir sonraki dönem | Anında |
| En uygun olduğu durum | Sürekli çalışan, yükü öngörülebilir sistemler | Test, kısa süreli projeler, değişken yük |

İki modeli aynı anda kullanabilirsiniz: canlı sistemlerinizi sabit kaynakla, test ortamlarınızı ve dönemsel ihtiyaçlarınızı [PAYG](./payg.md) ile çalıştırarak maliyetinizi optimize edebilirsiniz.

:::info Fiyatlar hakkında
Bu sayfadaki fiyatlar bilgilendirme amaçlıdır ve değişebilir. Kesin tutar için sipariş ekranındaki fiyatları ve [cloud2biz.com fiyat hesaplayıcısını](https://cloud2biz.com/calculator) esas alın.
:::
