---
sidebar_position: 1
title: FlexoStack Cloud'a Genel Bakış
sidebar_label: Genel Bakış
description: FlexoStack esnek bulut platformunun altyapısı, faturalandırma modelleri, lokasyonları ve temel özellikleri.
---

FlexoStack, CPU, RAM ve disk kaynaklarını ihtiyacınıza göre şekillendirebildiğiniz, KVM tabanlı esnek bir bulut altyapı platformudur. Projeniz büyüdükçe altyapınızı yeniden kurmadan ölçekleyebilir, kaynaklarınızı ister **Kullandığın Kadar Öde (PAYG)** ister **sabit kaynak** modeliyle, isterseniz ikisini birlikte kullanarak yönetebilirsiniz.

Bu sayfada FlexoStack'in sunduğu altyapıyı, faturalandırma modellerini, lokasyonları ve günlük kullanımda bilmeniz gereken temel konuları bulabilirsiniz.

## FlexoStack kimler için uygun?

- **Web hosting:** Yüksek erişilebilirlikli (H/A) cluster'larda hızlı, güvenilir ve güvenli barındırma.
- **Yazılım geliştiriciler ve ajanslar:** Geliştirme, test ve canlı ortamlar için esnek kaynaklar ve API erişimi.
- **Kurumsal işletmeler:** Yüksek güvenlik, performans ve iş sürekliliği gerektiren iş yükleri.
- **Kamu kurumları:** Güvenli, yüksek performanslı ve yerel veri barındırma gerektiren projeler.
- **İş ortakları ve bayiler:** Kendi müşterilerine bulut hizmeti sunmak isteyen firmalar.

PAYG modeli özellikle kısa süreli projeler, test ortamları ve yükü gün içinde değişen uygulamalar için idealdir.

## Altyapı ve teknik özellikler

### İşlemci ve depolama

- **Intel® Xeon® Platinum** işlemciler ve yeni nesil yüksek hızlı RAM.
- **NVMe SSD tabanlı High IOPS diskler:** Yüksek I/O performansı ve düşük gecikme.
- **Multi-channel storage mimarisi:** Yük dengelemeli depolama yapısı sayesinde yüksek block storage performansı.
- Daha uygun maliyetli çözümler için SAS disklerden oluşan **Disk Economy** seçeneği.

### Sanallaştırma

FlexoStack, **KVM hypervisor** teknolojisini kullanır. Her sanal makine izole çalışır ve kendisine ayrılan kaynakları tam performansla kullanır. Tamamen sanallaştırılmış bir altyapı olduğu için Linux, Windows ve diğer işletim sistemlerinin imajları çalıştırılabilir.

### Ağ

- **80GE LAN altyapısı:** Cluster içi iletişim 80 Gbit/s hızındadır; İstanbul ve Sofya lokasyonları arasında düşük gecikmeli, yüksek bant genişlikli bağlantı bulunur.
- **Private Network:** Yazılım tanımlı ağ (SDN) ile sunucularınız arasında dış erişime kapalı, izole ağlar oluşturabilirsiniz.
- **Yazılım tanımlı switch ve router:** Private Network'ünüzü router üzerinden internete çıkarabilir, hangi portların açık olacağını belirleyebilirsiniz.
- **Site-to-Site VPN:** Farklı lokasyonlardaki sunucularınızı tek bir Private Network altında şifreli olarak birbirine bağlayabilirsiniz.
- **Security Groups (güvenlik grupları):** Sanal makinelerinize gelen ve giden trafiği, port, protokol ve yön bazında tanımladığınız erişim kurallarıyla kontrol edebilirsiniz.
  - Bir sanal makineye birden fazla güvenlik grubu atanabilir. Tüm gruplardaki kurallar birlikte değerlendirilir ve kuralların sırası önemli değildir.
  - Bir paket, en az bir kural tarafından izin veriliyorsa geçer; hiçbir kurala uymayan trafik varsayılan olarak engellenir. Kurallar birbirini tamamladığı için çakışan veya tekrar eden kurallar sorun oluşturmaz.
  - Her proje için otomatik oluşturulan **default** güvenlik grubu, tüm protokollerde ve tüm portlarda trafiğe izin verir ve silinemez. Özel bir grup seçmediğiniz sürece sanal makineye bağlanan ağ arayüzleri bu gruba dahil edilir.
  - Güvenlik gruplarını yeni ve mevcut sanal makinelere atayabilirsiniz. Kural ekleme ve silme işlemleri sanal makineyi yeniden başlatmaya gerek kalmadan anında uygulanır.
  - **Öneri:** Canlı sunucularda default grup yerine yalnızca ihtiyaç duyduğunuz portlara (örneğin 22, 80, 443) izin veren özel bir güvenlik grubu kullanın.
- **Load Balancer:** Yazılım tanımlı yük dengeleyici ile trafiği sunucularınız arasında otomatik dağıtabilirsiniz.
- **Floating IP:** Bir sanal makineye atayabileceğiniz ve gerektiğinde başka bir sanal makineye anında taşıyabileceğiniz genel (public) IP adresidir. Router üzerinden internete bağlanan bir Private Network'teki sunucunuzu dışarıdan erişilebilir kılmak veya bakım ve arıza durumlarında trafiği IP adresini değiştirmeden yedek sunucuya yönlendirmek için kullanılır.

### API ve otomasyon

Platform API'si (**OpenStack** uyumlu) dileyen kullanıcılara açıktır. API erişimi yalnızca sizin kendi kaynaklarınızı yönetmenize izin verecek şekilde yetkilendirilir. Böylece Terraform, Ansible gibi araçlarla altyapınızı kod olarak yönetebilirsiniz.

:::warning API erişimi için ağ izni gerekir
API bağlantılarına ağ erişimi sınırlı olarak tanımlanmıştır. OpenStack API'si ile bağlanabilmek için [müşteri panelinden](https://cloud2biz.com/clientarea) bir destek talebi oluşturarak bağlanacağınız IP adresleri için ağ izni almanız gerekir.
:::

### Kubernetes

**Yönetilen Kubernetes (K8s)** servisi ile container tabanlı uygulamalarınızı çalıştırabilir, monolitik uygulamalarınızı mikro servis mimarisine kademeli olarak taşıyabilirsiniz. Kaynaklarınızı ister kullanıcı arayüzünden ister API üzerinden yönetebilirsiniz.

### Güvenlik ve erişim

- Parola yerine **SSH anahtarı** ile sunuculara güvenli erişim.
- Her sanal makinenin KVM ile izole çalışması.
- Security Firewall ve Private Network ile katmanlı ağ güvenliği.

### İzleme

CPU, RAM ve disk kullanımınızı FlexoStack panelinizden gerçek zamanlı grafiklerle takip edebilirsiniz.

## Disk tipleri

FlexoStack'te iş yükünüze göre iki disk tipi arasından seçim yapabilirsiniz:

| Disk tipi | Disk teknolojisi | Önerilen kullanım |
| --- | --- | --- |
| Disk Economy | SAS disk | Arşiv, yedekler, nadiren erişilen veriler, maliyet öncelikli uygulamalar |
| Disk High IOPS | NVMe SSD | Veritabanları, web siteleri, yoğun I/O ve düşük gecikme gerektiren uygulamalar |

- **Disk High IOPS** NVMe SSD disklerden oluşur ve disk (volume) başına 16.000 IOPS ve 2.000 MB/s'ye kadar performans sunar.
- **Disk Economy** SAS disklerden oluşur; yüksek performansın öncelikli olmadığı, kapasite ve maliyetin önemli olduğu iş yükleri için uygundur.

## Faturalandırma modelleri

FlexoStack iki faturalandırma modeli sunar. Aynı hesapta ikisini birlikte kullanarak, sürekli ihtiyaç duyduğunuz kaynakları sabit, değişken ihtiyaçlarınızı PAYG olarak yapılandırabilir ve maliyetinizi optimize edebilirsiniz.

### Kullandığın Kadar Öde (PAYG)

- CPU, RAM, disk ve trafik kullanımınız **saatlik** olarak ölçülür.
- Ücretler **ön ödemeli bakiyenizden** düşülür.
- Faturalarınız **her ayın başında** oluşturulur.
- Kaynak değişiklikleri ücretlendirmeye **anında** yansır; kullanmadığınız kaynak için ödeme yapmazsınız.

### Sabit kaynak

- Belirli kaynaklar için **aylık sabit ücret** ödersiniz.
- Faturalar **peşin** oluşturulur, dönem içinde oluşabilecek farklar ay sonunda faturalandırılır.
- **6 aylık** ve **12 aylık** peşin ödemelerde indirimli fiyatlar uygulanır.
- Dönem içinde yapılan kaynak azaltmaları mevcut dönemin faturasını etkilemez, **bir sonraki dönemden** itibaren geçerli olur.

### Karşılaştırma

| | PAYG | Sabit kaynak |
| --- | --- | --- |
| Ölçüm | Saatlik | Aylık |
| Ödeme | Ön ödemeli bakiye | Peşin fatura |
| Taahhüt | Yok | Seçilen dönem (1, 6 veya 12 ay) |
| Kaynak azaltma etkisi | Anında | Bir sonraki dönem |
| En uygun olduğu durum | Test, kısa süreli projeler, değişken yük | Sürekli çalışan, yükü öngörülebilir sistemler |

### Örnek birim fiyatlar

Aşağıdaki fiyatlar USD cinsindendir ve bilgi amaçlıdır. Güncel fiyatlar ve diğer bileşenler (Object Storage, yedekleme, trafik, SSL) için [fiyat hesaplayıcıyı](https://cloud2biz.com/calculator) kullanın.

| Kaynak | Birim | PAYG (saatlik) | Aylık | 6 aylık peşin (aylık) | 12 aylık peşin (aylık) |
| --- | --- | --- | --- | --- | --- |
| vCPU | 1 vCore | 0,0033 | 1,80 | 1,71 | 1,62 |
| RAM | 1 GB | 0,0033 | 1,80 | 1,71 | 1,62 |
| Disk High IOPS | 1 GB | 0,000086 | 0,048 | 0,0456 | 0,0432 |
| Public IP | 1 adet | 0,0036 | 2,00 | 1,90 | 1,80 |

### Miktar indirimleri

Sabit kaynaklarda kullandığınız miktar arttıkça indirim oranı da artar:

| Kaynak | %0 | %10 | %15 |
| --- | --- | --- | --- |
| vCPU | 1–8 adet | 9–32 adet | 33 adet ve üzeri |
| RAM | 1–32 GB | 33–64 GB | 65 GB ve üzeri |
| Disk | 0–4 TB | 4–20 TB | 20 TB ve üzeri |

## Lokasyonlar

FlexoStack'i aşağıdaki veri merkezi lokasyonlarında kullanabilirsiniz:

- **İstanbul Avrupa-1** — Türkiye
- **İstanbul Avrupa-2** — Türkiye
- **Ankara** — Türkiye
- **Sofya** — Bulgaristan
- **Frankfurt** — Almanya *(yakında)*

Verileriniz, seçtiğiniz lokasyondaki veri merkezinde yedekli altyapılarda saklanır.

### Hangi lokasyonu seçmeliyim?

- **İstanbul ve Ankara:** Türkiye ve çevre bölgelerdeki kullanıcılar için en düşük gecikme süresini ve verilerin yurt içinde barındırılmasını sağlar.
- **Sofya:** Avrupa bağlantıları için optimize edilmiştir. Yurt dışı operasyonu olan şirketler ve verilerini yurt dışında yedeklemek isteyen işletmeler için uygundur; iş sürekliliği açısından ikinci lokasyon olarak da tercih edilir.

:::info Yüksek erişilebilirlik (H/A) için İstanbul Avrupa-1 ve Avrupa-2
İstanbul Avrupa-1 ve Avrupa-2, aynı kampüs içinde **farklı elektrik ve mekanik altyapıya sahip iki ayrı binada** yer alır ve yüksek hızlı fiber ile birbirine bağlıdır. Uygulamanızı iki lokasyona dağıtarak yüksek erişilebilirlikli (H/A) yapılar kurabilirsiniz.
:::

Fiziksel sunucularınızı ve FlexoStack kaynaklarınızı birlikte kullanarak hibrit altyapılar da oluşturabilirsiniz.

## Kaynak değişiklikleri

- **CPU ve RAM** cloud paneli üzerinden istediğiniz zaman artırılıp azaltılabilir.
- **Disk alanı yalnızca artırılabilir.** İşletim sistemi düzeyinde disk küçültme desteklenmez; bu nedenle disk boyutunu ihtiyacınıza göre kademeli artırmanızı öneririz.
- PAYG kaynaklarında değişiklik ücretlendirmeye anında yansır. Sabit kaynaklarda azaltma bir sonraki dönemden itibaren geçerli olur.

## Sunucu oluşturma ve yönetim

- **Hızlı kurulum:** Etkinleştirme otomatiktir. Ödemenin ardından sunucunuz ve işletim sistemi birkaç dakika içinde hazır olur; IP adresi ve giriş bilgileri e-posta ile gönderilir.
- **Hazır veya kendi imajınız:** Hazır işletim sistemi imajlarını kullanabilir ya da kendi yapılandırmanızı imaj olarak kaydedip yeni sunucularda tekrar kullanabilirsiniz.
- **Kendi ISO/imajınızı yükleme:** Sipariş sonrasında [müşteri panelinden](https://cloud2biz.com/clientarea) destek talebi açmanız yeterli, ekibimiz imajınızı eklemenize yardımcı olur.
- **İşletim sistemini yeniden kurma:** Kontrol panelinden istediğiniz zaman, sınırsız sayıda yeniden kurulum yapabilirsiniz.
- **IP adresi yönetimi:** IP adresi değişikliklerini bulut yönetim panelinden yapabilirsiniz.

## Yedekleme ve snapshot

### Snapshot

Snapshot, sunucunuzun belirli bir andaki görüntüsünü alır. Bir yapılandırma değişikliği veya güncelleme öncesinde snapshot almanız, sorun çıktığında değişiklikleri anında geri almanızı sağlar.

- **2 adet snapshot ücretsizdir.**
- Daha fazla snapshot için yalnızca kullandığınız depolama alanı ücretlendirilir.

### Acronis yedekleme

Planlı yedekleme için Acronis tabanlı yedekleme hizmetini kullanabilirsiniz. Satın aldığınız yedekleme alanıyla bir veya birden fazla sanal makinenizi yedekleyebilirsiniz; ayrıca lisans ücreti yansıtılmaz.

- **GB bazlı** veya **sanal makine / fiziksel sunucu adedi bazlı** ücretlendirme seçenekleri.
- Yedekleme lokasyonları: İstanbul-1 (FlexoStack dışında), İstanbul-2 ve Ankara (FlexoStack içinde).
- **Acronis Cloud Backup** ile yedeklerinizi Frankfurt veya İstanbul'daki Acronis bulutunda da tutabilirsiniz.

:::tip Felaket kurtarma
Yedeklerinizi sunucunuzdan farklı bir lokasyonda tutmak, veri merkezi düzeyindeki olası sorunlara karşı en güçlü korumadır. Cloud2Biz'in çok lokasyonlu altyapısıyla kendi felaket kurtarma (Disaster Recovery) senaryolarınızı oluşturabilirsiniz.
:::

## Ücretsiz deneme

Yeni kullanıcılara **15 gün** boyunca, **50 ABD doları + KDV** tutarına kadar ücretsiz deneme sunulur. Deneme süresinde CPU, RAM ve disk kaynaklarını dilediğiniz gibi ayarlayabilir, süre sonunda memnun kalırsanız aynı yapılandırmayla devam edebilirsiniz.

Memnun kalmazsanız hizmeti portal üzerinden iptal edebilir, yüklediğiniz krediler için iade talebi oluşturabilirsiniz.

## Ödeme

Kredi kartı veya banka kartıyla sanal POS üzerinden ödeme yapabilirsiniz. PAYG kullanımları için bakiyenize önceden yükleme yapmanız gerekir.

## Destek ve süreklilik

- Destek ekibine **7/24** ulaşabilirsiniz.
- Donanım, sanallaştırma platformu ve ağ, kapsamlı bir izleme altyapısıyla sürekli takip edilir.
- Yüksek erişilebilirlik ve yük dengelemeli mimari sayesinde çoğu donanım arızası kullanıcılar tarafından fark edilmez.
- Planlı bakımlar önceden duyurulur; kesinti gerektiren çalışmalar yoğunluğun düşük olduğu saatlerde yapılır.

## Sıkça sorulan sorular

<details>
<summary>PAYG ile sabit kaynak arasındaki fark nedir?</summary>

Sabit kaynakta belirli kaynaklar için aylık sabit ücret ödersiniz. PAYG'de ise kaynaklarınız saatlik ölçülür ve yalnızca kullandığınız kadar ödersiniz. İkisini aynı hesapta birlikte kullanabilirsiniz.

</details>

<details>
<summary>Sunucumun diskini küçültebilir miyim?</summary>

Hayır. Disk alanı yalnızca artırılabilir. CPU ve RAM ise hem artırılıp hem azaltılabilir.

</details>

<details>
<summary>Sunucum ne kadar sürede hazır olur?</summary>

Ödemenin ardından birkaç dakika içinde. Giriş bilgileri e-posta ile gönderilir.

</details>

<details>
<summary>Kendi işletim sistemi imajımı kullanabilir miyim?</summary>

Evet. Altyapı tamamen sanallaştırılmış olduğu için her türlü imaj çalıştırılabilir. Sipariş sonrasında destek talebi açarak imajınızı ekletebilirsiniz.

</details>

<details>
<summary>Kaç adet snapshot alabilirim?</summary>

2 adet snapshot ücretsizdir. Daha fazlası için kullandığınız depolama alanı ücretlendirilir.

</details>

<details>
<summary>Verilerim nerede saklanıyor?</summary>

Seçtiğiniz lokasyondaki (İstanbul Avrupa-1, İstanbul Avrupa-2, Ankara veya Sofya) veri merkezinde, yedekli altyapıda saklanır.

</details>

## Sonraki adımlar

- [Fiyat hesaplayıcı](https://cloud2biz.com/calculator) ile ihtiyacınıza uygun yapılandırmanın maliyetini görün.
- [FlexoStack ürün sayfasından](https://cloud2biz.com/flexostack) siparişinizi oluşturun.
- Sorularınız için [iletişim sayfasından](https://cloud2biz.com/iletisim) veya **0850 300 0 300** numaralı telefondan bize ulaşın.
