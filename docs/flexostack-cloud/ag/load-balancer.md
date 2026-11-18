---
sidebar_position: 5
title: Load Balancer
description: FlexoStack'te load balancer oluşturma, dinleyiciler, dengeleme havuzları, algoritmalar, sağlık kontrolleri ve izin verilen CIDR'lar.
---

**Load balancer (yük dengeleyici)**, gelen trafiği birden fazla sanal makine arasında dağıtır. Böylece uygulamanız daha fazla kullanıcıya hizmet verebilir ve sunuculardan biri arızalandığında trafik otomatik olarak sağlıklı sunuculara yönlendirilir.

## Temel Kavramlar

```text
                 İnternet
                    │
            Floating IP (LB adresi)
                    │
         ┌──── Load Balancer ────┐
         │                       │
   Dinleyici HTTP:80      Dinleyici HTTPS:443
         │                       │
         └──── Dengeleme havuzu ─┘
              │      │      │
           web-01 web-02 web-03   (havuz üyeleri)
```

| Kavram | Açıklama |
| --- | --- |
| **Load balancer** | Trafiği karşılayan ve dağıtan bileşen. Bir sanal ağ üzerinde çalışır ve bir IP adresine sahiptir. |
| **Dinleyici (listener)** | Load balancer'ın hangi protokol ve portta bağlantı kabul edeceğini belirler, ör. HTTP 80 veya HTTPS 443. |
| **Dengeleme havuzu (pool)** | Trafiğin dağıtılacağı sunucular grubu ve dağıtım kuralları. |
| **Üye (member)** | Havuzdaki her bir sanal makine ve uygulamanın çalıştığı port. |
| **Sağlık kontrolü (health monitor)** | Üyelerin çalışıp çalışmadığını düzenli olarak kontrol eder; yanıt vermeyen üyeleri trafikten çıkarır. |

## Ücretlendirme

FlexoStack'te tek tip load balancer vardır; boyut seçimi yapmanız gerekmez:

| Model | Fiyat |
| --- | --- |
| Sabit kaynak | Load balancer başına aylık 15 USD |
| PAYG | Load balancer başına saatlik 0,0308 USD (aylık ≈ 22,48 USD) |

Ayrıntılar için [Faturalandırma](../faturalandirma/sabit-kaynak.md#load-balancer) sayfasına bakın.

## Load Balancer Oluşturma

1. Panelde **Load balancers** ekranını açın ve **Create load balancer** butonuna tıklayın.
2. Bir ad girin ve load balancer'ın çalışacağı **sanal ağı** seçin. Bu ağ, arka uç sunucularınızın bulunduğu ağ olmalıdır.
3. İnternetten erişilebilmesi için **floating IP** atanmasını seçin.
4. İsterseniz **yüksek erişilebilirlik (HA)** seçeneğini etkinleştirin; bu durumda load balancer yedekli çalışır.
5. Bir veya daha fazla **dengeleme havuzu** ekleyin (aşağıya bakın).
6. **Create** butonuna tıklayın.

## Dengeleme Havuzu Ayarları

### Protokol ve Port

Dinleyici protokolünü ve portunu (ön uç) ve üyelerin uygulama portunu (arka uç) belirlersiniz:

| Ön uç | Arka uç | Kullanım |
| --- | --- | --- |
| HTTP 80 | HTTP 80 | Basit web siteleri |
| HTTPS 443 (TLS sonlandırma) | HTTP 80 | SSL sertifikasını load balancer'da yönetme; sunucular şifresiz HTTP ile çalışır |
| TCP 443 | TCP 443 | SSL'in sunucularda sonlandırıldığı durumlar (TLS passthrough) |
| TCP / UDP | TCP / UDP | Veritabanı, oyun sunucusu, DNS gibi HTTP dışı servisler |

**TLS sonlandırma** kullanıyorsanız SSL sertifikanızı ve özel anahtarınızı load balancer'a yüklersiniz. Bu sayede sertifikayı tek bir yerden yönetirsiniz ve şifreleme yükü sunuculardan alınır.

### Dengeleme Algoritması

| Algoritma | Davranış | Ne zaman kullanılır? |
| --- | --- | --- |
| **Round robin** | İstekleri sırayla üyelere dağıtır. | Üyeler eşit güçte ve istekler benzer ağırlıkta ise |
| **Least connections** | İsteği en az aktif bağlantısı olan üyeye gönderir. | Uzun süren bağlantılar veya değişken işlem süreleri |
| **Source IP** | Aynı istemci IP'sini her zaman aynı üyeye gönderir. | Oturum bilgisini sunucuda tutan uygulamalar |

### Oturum Kalıcılığı (Sticky Sessions)

Uygulamanız oturum bilgisini sunucu belleğinde tutuyorsa, bir kullanıcının tüm isteklerinin aynı sunucuya gitmesi için oturum kalıcılığını etkinleştirebilirsiniz (ör. kaynak IP veya HTTP çerezi bazlı).

### HTTP Başlıkları

HTTP dinleyicilerinde load balancer, istemcinin gerçek IP adresini sunuculara iletmek için `X-Forwarded-For` gibi başlıklar ekleyebilir. Web sunucunuzun günlüklerinde gerçek ziyaretçi IP'lerini görmek için bu başlığı kullanın.

### İzin Verilen CIDR'lar

Havuza yalnızca belirli IP aralıklarından erişilmesini istiyorsanız **Allowed CIDRs** alanına bu aralıkları CIDR formatında ekleyin (ör. `203.0.113.0/24`). Boş bırakılırsa tüm adreslerden erişime izin verilir.

### Sağlık Kontrolü

Sağlık kontrolü, üyelere düzenli aralıklarla istek göndererek çalışıp çalışmadıklarını denetler:

- **Tip:** HTTP (belirli bir yola istek, ör. `/health`), TCP (port açık mı) veya PING.
- **Aralık ve zaman aşımı:** Kontrolün ne sıklıkla yapılacağı ve yanıt için ne kadar bekleneceği.
- **Deneme sayısı:** Bir üyenin sağlıksız veya yeniden sağlıklı sayılması için art arda kaç kontrolün başarısız veya başarılı olması gerektiği.

:::tip Uygulamanıza bir sağlık kontrolü adresi ekleyin
Uygulamanızda veritabanı bağlantısı gibi temel bağımlılıkları da kontrol eden basit bir `/health` adresi oluşturup HTTP sağlık kontrolünde bu adresi kullanmak, sorunlu sunucuların trafikten daha doğru şekilde çıkarılmasını sağlar.
:::

## Havuz Üyelerini Yönetme

1. Load balancer'ı seçin ve ilgili dengeleme havuzunu açın.
2. **Members** bölümünde **Add** ile sanal makine ekleyin veya mevcut üyeleri kaldırın.
3. Her üye için uygulamanın çalıştığı portu ve isteğe bağlı bir **ağırlık (weight)** belirleyin. Ağırlığı yüksek olan üye daha fazla trafik alır.

Bakım yapacağınız bir sunucuyu havuzdan geçici olarak çıkararak trafiği kesintisiz şekilde diğer üyelere yönlendirebilirsiniz.

## Güvenlik Grupları

Havuz üyesi sanal makinelerin güvenlik gruplarında, uygulama portuna load balancer'ın bulunduğu ağdan gelen trafiğe ve sağlık kontrollerine izin verildiğinden emin olun. Aksi halde üyeler sağlıksız görünür ve trafik almaz.

## Havuzu Düzenleme ve Silme

- **Edit:** Dengeleme ayarlarını (başlıklar, TLS, algoritma, oturum kalıcılığı) değiştirir.
- **Edit allowed CIDRs:** İzin verilen IP aralıklarını düzenler.
- **Edit health monitor:** Sağlık kontrolü parametrelerini değiştirir.
- **Delete:** Havuzu siler.

Load balancer'ın tamamını silmek için **Load balancers** ekranında load balancer'ı seçip **Delete** butonuna tıklayın. Load balancer'a atanmış floating IP ayrıca serbest bırakılmalıdır.
