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

## Nasıl çalışır?

1. [cloud2biz.com](https://cloud2biz.com) üzerinden ihtiyacınız olan lokasyon için FlexoStack sabit kaynak hizmetini satın alın (ör. **Flexostack - Sabit Kaynak - İstanbul**).
2. Sipariş sırasında vCPU, RAM ve disk miktarlarını ve ödeme dönemini (aylık, 6 aylık veya 12 aylık) seçin.
3. Ödeme tamamlandığında hizmetiniz aktif olur. FlexoStack paneline giriş bilgilerinize **Hizmetler** altındaki hizmetinizin **Giriş Detayları** sekmesinden ulaşabilirsiniz. Bkz. [Panele giriş](../ilk-adimlar/panele-giris.md).
4. Satın aldığınız kaynak havuzunu panelde istediğiniz sayıda sanal makineye dağıtın. Örneğin 8 vCPU ve 16 GB RAM'lik bir havuzla 4 vCPU / 8 GB'lık bir, 2 vCPU / 4 GB'lık iki sanal makine oluşturabilirsiniz.

## Birim fiyatlar

Tüm fiyatlar **USD** cinsindendir ve **aylık birim fiyattır**. 6 ve 12 aylık sütunlar, ilgili dönemi peşin ödediğinizde uygulanan aylık fiyatı gösterir.

### İşlemci ve bellek

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

### IP adresleri

| Kaynak | Birim | Aylık | 6 ay peşin | 12 ay peşin |
| --- | --- | --- | --- | --- |
| Public IP | 1 adet | 2,00 | 1,90 | 1,80 |

### Ağ trafiği

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

### Windows Server lisansı

FlexoStack'teki Windows Server imajları **hazır olarak lisanslanmıştır**. Lisanslama **Windows Server Datacenter** lisansı ile yapılır ve bedeli **çekirdek (core) başına değil**, sanal makine başına **aylık 25 USD**'dir. Sanal makinenize kaç vCPU verirseniz verin lisans bedeli değişmez.

### Load balancer

FlexoStack'te tek tip load balancer vardır. Load balancer başına sabit aylık ücret uygulanır; 6 ve 12 aylık peşin ödemelerde aylık fiyat değişmez.

| Kaynak | Birim | Aylık | 6 ay peşin | 12 ay peşin |
| --- | --- | --- | --- | --- |
| Load balancer | 1 adet | 15,00 | 15,00 | 15,00 |

### Snapshot ve yedekleme

- **Snapshot:** 2 adet snapshot ücretsizdir. Daha fazlası için kullanılan alan, disk depolama ücreti üzerinden ücretlendirilir.
- **Acronis yedekleme:**

| Hizmet | Birim | Aylık | 6 ay peşin | 12 ay peşin |
| --- | --- | --- | --- | --- |
| Acronis Backup (GB bazlı) | 1 GB | 0,100 | 0,095 | 0,090 |
| Acronis Backup (sanal makine bazlı) | 1 VM | 11,00 | 10,45 | 9,90 |
| Acronis Backup (fiziksel sunucu bazlı) | 1 sunucu | 36,00 | 34,20 | 32,40 |
| Acronis Cloud Backup (GB bazlı, Frankfurt veya İstanbul) | 1 GB | 0,200 | 0,190 | 0,180 |

Sanal makine ve fiziksel sunucu bazlı yedekleme, ayrıca ücretlendirilen yedekleme depolama alanıyla birlikte satın alınır. Yedekleme lokasyonları ve diğer seçenekler için [Yedekleme](../depolama/yedekleme.md#acronis-yedekleme) sayfasına bakın.

### Ücretsiz hizmetler

- vLAN, switch ve port bazlı güvenlik duvarı ([Security Groups](../ag/security-groups.md))
- 2 adet snapshot

## Miktar indirimleri

Satın aldığınız kaynak miktarı arttıkça birim fiyata indirim uygulanır:

| Kaynak | %0 | %10 | %15 |
| --- | --- | --- | --- |
| vCPU | 1–8 adet | 9–32 adet | 33 adet ve üzeri |
| RAM | 1–32 GB | 33–64 GB | 65 GB ve üzeri |
| Disk | 0–4 TB | 4–20 TB | 20 TB ve üzeri |
| Acronis yedekleme alanı | 0–4 TB | 4–20 TB | 20 TB ve üzeri |
| Acronis VM / fiziksel sunucu | 1–10 adet | 11–30 adet | 31 adet ve üzeri |

Miktar indirimleri, 6 ve 12 aylık peşin ödeme fiyatlarına ek olarak uygulanır.

## Ödeme dönemleri ve faturalar

| Dönem | Fatura | Avantaj |
| --- | --- | --- |
| Aylık | Her ay peşin | Standart fiyat, taahhüt 1 ay |
| 6 aylık | 6 ay peşin | Yaklaşık %5 indirimli birim fiyat |
| 12 aylık | 12 ay peşin | Yaklaşık %10 indirimli birim fiyat |

- Faturalar dönem başında **peşin** olarak oluşturulur.
- Dönem içinde yaptığınız **kaynak artışlarından** doğan farklar **ay sonunda** faturalandırılır.
- Ay boyunca ölçülen **ağ trafiği** ay sonunda faturalandırılır.
- Ödemelerinizi [cloud2biz.com müşteri panelinizden](https://cloud2biz.com/clientarea) kredi kartı veya banka kartıyla yapabilirsiniz.

## Örnek hesaplama

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

## Kaynak değişiklikleri

| Değişiklik | Faturaya etkisi |
| --- | --- |
| **CPU / RAM artırma** | Fark ay sonunda faturalandırılır. |
| **CPU / RAM azaltma** | Mevcut dönemin faturasını etkilemez, **bir sonraki dönemden** itibaren geçerli olur. |
| **Disk artırma** | Fark ay sonunda faturalandırılır. |
| **Disk azaltma** | Desteklenmez; disk alanı yalnızca artırılabilir. |

Kaynak artırma veya azaltma talepleriniz için [cloud2biz.com müşteri panelinizden](https://cloud2biz.com/clientarea) destek talebi oluşturabilirsiniz.

## Sabit kaynak mı, PAYG mi?

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
