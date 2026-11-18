---
sidebar_position: 2
title: PAYG (Kullandığın Kadar Öde) Faturalandırması
sidebar_label: PAYG
description: FlexoStack PAYG modelinde hesap açma, ölçülen kaynaklar, saatlik birim fiyatlar, ağ trafiği, Windows Server lisansı, PayG Hesapları ve kota seviyeleri.
---

**Kullandığın Kadar Öde (Pay As You Go, PAYG)** modelinde FlexoStack kaynaklarınız için sabit bir aylık ücret ödemezsiniz. Kullandığınız kaynaklar **saatlik** olarak ölçülür ve yalnızca kullandığınız süre kadar ücretlendirilirsiniz. Bir sunucuyu birkaç saatliğine açıp sildiğinizde yalnızca o birkaç saatin ücretini ödersiniz.

PAYG; test ve geliştirme ortamları, kısa süreli projeler, kampanya dönemleri ve yükü gün içinde değişen uygulamalar için idealdir.

## PAYG hesabı açma

PAYG modelini kullanmaya başlamak için cloud2biz.com üzerinden bir PAYG hesabı satın almanız gerekir:

1. [cloud2biz.com](https://cloud2biz.com) üzerinden **Cloud2Biz - Flexostack - PayG** hizmetini satın alın.
2. Sipariş için **1 USD** tutarında bir fatura oluşturulur.
3. Faturayı [cloud2biz.com müşteri panelinizden](https://cloud2biz.com/clientarea) ödeyin.
4. Ödeme tamamlandığında PAYG hesabınız aktif hale gelir ve kaynak oluşturmaya başlayabilirsiniz.

Hesabınız aktif olduktan sonra FlexoStack paneline giriş bilgilerinize **Hizmetler** altındaki PAYG hizmetinizin **Giriş Detayları** sekmesinden ulaşabilirsiniz. Bkz. [Panele giriş](../ilk-adimlar/panele-giris.md).

## Neler ölçülür?

| Kaynak | Nasıl ölçülür? |
| --- | --- |
| **CPU** | Sanal makinelerinize ayrılan vCPU sayısı |
| **RAM** | Sanal makinelerinize ayrılan bellek miktarı |
| **Disk** | Disklerinize ayrılan (allocate edilen) toplam alan, disk tipine göre |
| **IP adresleri** | Genel IP ve floating IP adresleri |
| **Load balancer** | Oluşturduğunuz load balancer sayısı |
| **Ağ trafiği** | Gelen (inbound) ve giden (outbound) trafik |
| **Windows Server lisansı** | Windows Server imajıyla çalışan sanal makineler |

### Ayrılan kaynak ölçülür, kullanılan değil

Ölçüm, kaynakların **ne kadarının kullanıldığına göre değil, ne kadarının ayrıldığına (allocate edildiğine) göre** yapılır:

- 4 vCPU ve 8 GB RAM ile oluşturulan bir sanal makine, işlemci kullanımı düşük olsa bile 4 vCPU ve 8 GB RAM üzerinden ölçülür.
- 100 GB olarak oluşturulan bir disk, içinde yalnızca 10 GB veri olsa bile 100 GB üzerinden ölçülür.

## Saatlik birim fiyatlar

Tüm fiyatlar **USD** cinsindendir. vCPU, RAM ve diskte, kullanım miktarı arttıkça birim fiyat kademeli olarak düşer: her kademedeki miktar o kademenin fiyatıyla ücretlendirilir.

### İşlemci ve bellek

| Kaynak | Kademe | Saatlik fiyat | Aylık karşılığı (730 saat) |
| --- | --- | --- | --- |
| vCPU | 1–8 vCore | 0,0033 / vCore-saat | 2,41 |
| vCPU | 9–32 vCore (%10 indirimli) | 0,00297 / vCore-saat | 2,17 |
| vCPU | 33 vCore ve üzeri (%15 indirimli) | 0,002805 / vCore-saat | 2,05 |
| RAM | 1–32 GB | 0,0033 / GB-saat | 2,41 |
| RAM | 33–64 GB (%10 indirimli) | 0,00297 / GB-saat | 2,17 |
| RAM | 65 GB ve üzeri (%15 indirimli) | 0,002805 / GB-saat | 2,05 |

### Disk

| Disk tipi | Kademe | Saatlik fiyat | Aylık karşılığı (730 saat) |
| --- | --- | --- | --- |
| Disk High IOPS (NVMe SSD) | 0–4 TB | 0,000086 / GB-saat | 0,063 |
| Disk High IOPS (NVMe SSD) | 4–20 TB (%10 indirimli) | 0,000077 / GB-saat | 0,056 |
| Disk High IOPS (NVMe SSD) | 20 TB ve üzeri (%15 indirimli) | 0,000073 / GB-saat | 0,053 |
| Disk Economy (SAS) | 0–4 TB | 0,000050 / GB-saat | 0,037 |
| Disk Economy (SAS) | 4–20 TB (%10 indirimli) | 0,000045 / GB-saat | 0,033 |
| Disk Economy (SAS) | 20 TB ve üzeri (%15 indirimli) | 0,000043 / GB-saat | 0,031 |

### IP, load balancer ve lisans

| Kaynak | Birim | Saatlik fiyat | Aylık karşılığı (730 saat) |
| --- | --- | --- | --- |
| Public IP | 1 IP | 0,0036 | 2,63 |
| Load balancer | 1 load balancer | 0,0308 | 22,48 |
| Windows Server lisansı | 1 sanal makine | 0,0342 | ≈ 25,00 |

Snapshot'larda 2 adet ücretsizdir; fazlası disk depolama ücreti üzerinden ölçülür.

:::info Sürekli çalışan sunucular için
Bir ay boyunca kesintisiz çalışacak kaynaklarda [sabit kaynak](./sabit-kaynak.md) modeli PAYG'ye göre daha uygun maliyetlidir. Örneğin 1 vCPU, PAYG'de aylık yaklaşık 2,41 USD tutarken sabit kaynakta aylık 1,80 USD'dir.
:::

### Ağ trafiği

PAYG hesabınızda **gelen (inbound)** ve **giden (outbound)** ağ trafiği ayrı ayrı ölçülür ve aylık toplam trafik üzerinden kademeli olarak ücretlendirilir:

| Aylık trafik (her yön için ayrı) | Fiyat |
| --- | --- |
| İlk 1 TB (1.024 GB) | Ücretsiz |
| 1–4 TB | 0,0070 / GB |
| 4–8 TB | 0,0065 / GB |
| 8–16 TB | 0,0060 / GB |
| 16–32 TB | 0,0055 / GB |
| 32 TB ve üzeri | 0,0050 / GB |

Trafik fiyatları [sabit kaynak](./sabit-kaynak.md#ağ-trafiği) modeliyle aynıdır.

Örneğin bir ayda 1.500 GB giden trafik oluştuysa, ilk 1.024 GB ücretsizdir ve kalan 476 GB için 476 × 0,0070 = 3,33 USD ücretlendirilir.

### Windows Server lisansı

FlexoStack'teki **Windows Server imajları hazır olarak lisanslanmıştır**; ayrıca lisans satın almanız veya etkinleştirmeniz gerekmez.

- Lisanslama **Windows Server Datacenter** lisansı ile yapılır.
- Lisans bedeli **çekirdek (core) başına değildir**; sanal makine başına **aylık 25 USD** üzerinden hesaplanır. Sanal makinenize kaç vCPU verirseniz verin lisans bedeli değişmez.
- Lisans kullanımı **saatlik** ölçülür (0,0342 USD / saat). Windows sanal makineniz bir ay boyunca kesintisiz çalışırsa lisans bedeli **25 USD** olur; daha kısa süre kullanırsanız yalnızca kullandığınız süre kadar ödersiniz.

## Kullanımın hesaba yazılması

- Kullanımınız **saatlik** olarak ölçülür.
- Ölçülen kullanım, cloud2biz.com müşteri panelinizde **PayG Hesapları** altında ilgili PAYG hesabınıza yazılır.
- Kaynak değişiklikleri ölçüme **anında** yansır: bir sanal makinenin CPU veya RAM'ini artırdığınızda yeni değer, sildiğiniz bir kaynak ise o andan itibaren ölçülmez.

Kullanımınızı ve oluşan tutarları cloud2biz.com müşteri panelinizdeki **PayG Hesapları** bölümünden takip edebilirsiniz.

## Örnek hesaplama

**4 vCPU, 8 GB RAM, 80 GB Disk High IOPS ve 1 IP** ile çalışan bir Linux sunucusu:

| Kalem | Saatlik | 100 saat | 1 ay (730 saat) |
| --- | --- | --- | --- |
| 4 vCPU | 4 × 0,0033 = 0,0132 | 1,32 | 9,64 |
| 8 GB RAM | 8 × 0,0033 = 0,0264 | 2,64 | 19,27 |
| 80 GB Disk High IOPS | 80 × 0,000086 = 0,00688 | 0,69 | 5,02 |
| 1 IP | 0,0036 | 0,36 | 2,63 |
| **Toplam** | **0,05008** | **5,01 USD** | **36,56 USD** |

Ağ trafiği, aylık ilk 1 TB ücretsiz olduğu için bu örnekte ek ücret oluşturmaz. Aynı sunucu Windows Server ile çalışsaydı, 1 aylık kullanımda toplama 25 USD lisans bedeli eklenirdi.

## Kota seviyeleri

PAYG hesapları, kaynak kullanımını sınırlayan **kota seviyeleriyle** çalışır. Kota, hesabınızda aynı anda oluşturabileceğiniz en fazla kaynak miktarını belirler:

| Seviye | Paket | vCPU | RAM | Sanal makine | Disk adedi | Toplam disk | Floating IP |
| --- | --- | --- | --- | --- | --- | --- | --- |
| L1 | Starter Package | 4 | 8 GB | 1 | 20 | 100 GB | 1 |
| L2 | Basic Package | 50 | 125 GB | 25 | 200 | 2 TB | 6 |
| L3 | Advanced Package | 100 | 250 GB | 50 | 500 | 20 TB | 25 |
| Sınırsız | Unlimited Package | Sınırsız | Sınırsız | Sınırsız | Sınırsız | Sınırsız | Sınırsız |

Kota yalnızca oluşturabileceğiniz en fazla kaynak miktarını sınırlar; ücretlendirme kotaya göre değil, ayırdığınız kaynaklara göre yapılır.

### Kota artırma

1. [cloud2biz.com müşteri panelinizden](https://cloud2biz.com/clientarea) bir destek talebi oluşturun.
2. PAYG hesabınızı ve geçmek istediğiniz seviyeyi (ör. Basic Package) belirtin.
3. Destek ekibimiz kotanızı yükseltir ve size bilgi verir.

Kota sınırına ulaştığınızda yeni sanal makine, disk veya floating IP oluşturma işlemi hata verir; mevcut kaynaklarınız çalışmaya devam eder.

## Maliyeti düşürme ipuçları

- Kullanmadığınız sunucuları yalnızca kapatmak yerine [rafa kaldırın (shelve)](../sanal-makineler/sanal-makine-yonetimi.md#rafa-kaldırma-shelve); kapalı bir sanal makine CPU ve RAM kaynaklarını ayırmaya devam eder.
- Diskleri büyük başlatmak yerine ihtiyaç oldukça [büyütün](../depolama/diskler.md#disk-boyutunu-büyütme); disk boyutu küçültülemez.
- Yüksek performans gerektirmeyen veriler için **Disk Economy** tipini kullanın.
- Kullanmadığınız floating IP'leri serbest bırakın ve eski snapshot'ları silin.
- Sürekli çalışan sunucularınızı [sabit kaynak](./sabit-kaynak.md) modeline taşıyın.

:::info Fiyatlar hakkında
Bu sayfadaki fiyatlar bilgilendirme amaçlıdır ve değişebilir. Kesin tutar için [cloud2biz.com fiyat hesaplayıcısını](https://cloud2biz.com/calculator) esas alın.
:::
