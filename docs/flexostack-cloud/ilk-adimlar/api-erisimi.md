---
sidebar_position: 5
title: API Erişimi ve OpenStack CLI
sidebar_label: API Erişimi
description: FlexoStack OpenStack uyumlu API'sine erişim için ağ izni alma, API erişim bilgisi oluşturma ve OpenStack CLI ile kullanma.
---

FlexoStack, **OpenStack uyumlu** bir API sunar. Bu API sayesinde sanal makine, disk, ağ ve diğer kaynaklarınızı OpenStack komut satırı aracı (CLI), Terraform, Ansible veya kendi yazdığınız betiklerle yönetebilirsiniz.

API'ye bağlanmak için iki şeye ihtiyacınız vardır:

1. Bağlanacağınız IP adresleri için **ağ izni**
2. Panelden oluşturacağınız bir **API erişim bilgisi** (API credential)

## 1. Ağ İzni Alın {#1-ağ-izni-alın}

:::warning API erişimi için ağ izni gerekir
API bağlantılarına ağ erişimi sınırlı olarak tanımlanmıştır. OpenStack API'si ile bağlanabilmek için [müşteri panelinden](https://cloud2biz.com/clientarea) bir destek talebi oluşturarak bağlanacağınız IP adresleri için ağ izni almanız gerekir.
:::

Destek talebinizde şunları belirtin:

- FlexoStack hesabınız / domain adınız
- API'ye bağlanacağınız sabit genel IP adresleri (ofis, CI/CD sunucusu, yönetim sunucusu gibi)

Ağ izni tanımlandığında destek ekibi size bilgi verir.

## 2. API Erişim Bilgisi Oluşturun

API erişim bilgisi, uygulamaların ve betiklerin kullanıcı adı ve parola kullanmadan API'ye kimlik doğrulaması yapmasını sağlar. Her erişim bilgisi bir kullanıcıya ve bir projeye bağlıdır; bir **Credential ID** ve bir **API secret key** içerir.

- Erişim bilgisi, sahibi olan kullanıcının o projedeki yetkilerinden fazlasını veremez.
- Birden fazla projeye erişmek için her proje için ayrı bir erişim bilgisi oluşturmanız gerekir.

### Oluşturma Adımları

1. Panelde ilgili projeyi açın ve **Settings** > **API credentials** ekranına gidin.
2. **Create** butonuna tıklayın.
3. Benzersiz bir ad girin, erişilecek projeyi seçin ve bir **son kullanma tarihi** belirleyin. Son kullanma tarihi en fazla oluşturma tarihinden **bir yıl** sonrası olabilir.
4. **Create** butonuna tıklayın.
5. Açılan pencerede **Credential ID**, **API secret key** ve **kimlik doğrulama adresini (auth URL)** kopyalayıp güvenli bir yere kaydedin. Hepsini birlikte kopyalamak için **Copy token information** seçeneğini kullanabilirsiniz.

:::danger API secret key yalnızca bir kez gösterilir
API secret key oluşturma anında yalnızca bir kez görüntülenir ve daha sonra tekrar görüntülenemez. Kaybederseniz yeni bir erişim bilgisi oluşturmanız gerekir.
:::

### Durumlar

| Durum | Anlamı |
| --- | --- |
| **Active** | Kimlik doğrulama için kullanılabilir. |
| **Expiring soon** | 30 günden az süre içinde sona erecek. Yenisini oluşturun. |
| **Expired** | Süresi dolmuş, artık kullanılamaz. |
| **Revoked** | İptal edilmiş, artık kullanılamaz. |

## 3. OpenStack CLI ile Kullanın

### CLI Kurulumu

```bash
# Debian / Ubuntu
sudo apt install -y python3-openstackclient

# veya pip ile (tüm platformlar)
pip install python-openstackclient
```

Load balancer ve Kubernetes komutları için ek istemcileri de kurabilirsiniz:

```bash
pip install python-octaviaclient python-magnumclient
```

### Ortam Değişkenleri

`openrc-flexostack.sh` adında bir dosya oluşturun ve kendi değerlerinizi girin:

```bash
export OS_AUTH_TYPE=v3applicationcredential
export OS_AUTH_URL=https://KIMLIK_DOGRULAMA_ADRESI
export OS_APPLICATION_CREDENTIAL_ID=CREDENTIAL_ID
export OS_APPLICATION_CREDENTIAL_SECRET=API_SECRET_KEY
export OS_IDENTITY_API_VERSION=3
```

Dosyayı yükleyip ilk komutunuzu çalıştırın:

```bash
source openrc-flexostack.sh
openstack server list
```

### Sık Kullanılan Komutlar

```bash
openstack server list                  # Sanal makineler
openstack flavor list                  # CPU/RAM şablonları
openstack image list                   # İmajlar
openstack volume list                  # Diskler
openstack network list                 # Ağlar
openstack floating ip list             # Floating IP'ler
openstack security group list          # Güvenlik grupları
openstack server stop web-01           # Sanal makineyi kapat
openstack server start web-01          # Sanal makineyi başlat
```

:::tip Sertifika uyarısı
İstemciniz API sertifikasına güvenmiyorsa komutlara `--insecure` ekleyebilirsiniz. Bu seçeneği yalnızca test amaçlı kullanın; kalıcı çözüm için güvenilir CA sertifikalarınızı güncel tutun.
:::

## Terraform ile Kullanım

FlexoStack, OpenStack Terraform sağlayıcısı (`terraform-provider-openstack`) ile çalışır. Aynı ortam değişkenleri Terraform tarafından da okunur:

```hcl
terraform {
  required_providers {
    openstack = {
      source = "terraform-provider-openstack/openstack"
    }
  }
}

provider "openstack" {}

resource "openstack_compute_instance_v2" "web" {
  name        = "web-01"
  flavor_name = "FLAVOR_ADI"
  image_name  = "IMAJ_ADI"
  key_pair    = "anahtarim"

  network {
    name = "web-agi"
  }
}
```

## Erişim Bilgisini İptal Etme veya Silme {#erişim-bilgisini-iptal-etme-veya-silme}

1. İlgili projede **Settings** > **API credentials** ekranını açın.
2. Erişim bilgisini seçin ve sağ panelde **Delete** veya **Revoke** butonuna tıklayın.
3. İşlemi onaylayın.

İptal edilen, silinen veya süresi dolan bir erişim bilgisini kullanan uygulamalar artık kimlik doğrulaması yapamaz.

## Güvenlik Önerileri

- API secret key'i kaynak kodunuza veya Git deposuna eklemeyin; ortam değişkeni veya gizli anahtar yöneticisi kullanın.
- Her uygulama veya otomasyon için ayrı erişim bilgisi oluşturun; böylece birini iptal ettiğinizde diğerleri etkilenmez.
- Son kullanma tarihini ihtiyacınız kadar kısa tutun ve **Expiring soon** durumundaki bilgileri zamanında yenileyin.
- Artık kullanılmayan erişim bilgilerini silin.
