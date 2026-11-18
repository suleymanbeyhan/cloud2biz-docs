---
sidebar_position: 1
title: FlexoStack Paneline Giriş
sidebar_label: Panele Giriş
description: FlexoStack paneline giriş yapma, iki faktörlü doğrulama (2FA) kurulumu ve projeler hakkında bilgiler.
---

FlexoStack kaynaklarınızın tamamını (sanal makineler, diskler, ağlar, load balancer, Kubernetes ve yedekler) **FlexoStack paneli** üzerinden yönetirsiniz. Bu sayfada panele nasıl giriş yapacağınızı ve hesabınızı iki faktörlü doğrulama ile nasıl koruyacağınızı bulabilirsiniz.

## Giriş Bilgileriniz

FlexoStack paneline giriş bilgilerinize [cloud2biz.com müşteri panelinizden](https://cloud2biz.com/clientarea) erişebilirsiniz:

1. [cloud2biz.com müşteri paneline](https://cloud2biz.com/clientarea) giriş yapın.
2. Sol menüden **Hizmetler** bölümünü açın ve FlexoStack hizmetinizi seçin (ör. *Flexostack - Sabit Kaynak - İstanbul*).
3. Hizmet sayfasında **Giriş Detayları** sekmesine tıklayın.

![cloud2biz.com müşteri panelinde FlexoStack Giriş Detayları ekranı](/img/flexostack/giris-detaylari.png)

Bu ekranda şu bilgiler yer alır:

| Alan | Açıklama |
| --- | --- |
| **URL** | FlexoStack paneline giriş adresiniz, ör. `https://vhi.cloud2biz.com:8800/login/Default` |
| **Kullanıcı Adı** | FlexoStack paneli kullanıcı adınız |
| **Şifre** | Panel şifreniz. Göz simgesiyle şifreyi görüntüleyebilir, kopyala simgesiyle panoya kopyalayabilirsiniz. |

## Panele Giriş Yapma

1. **Giriş Detayları** ekranındaki **URL** bağlantısına tıklayın veya adresi tarayıcınızda açın.
2. **Kullanıcı Adı** ve **Şifre** bilgilerinizi girin. URL hesabınıza özel olduğu için ayrıca domain adı girmeniz gerekmez.
3. İki faktörlü doğrulama etkinse, doğrulama uygulamanızdaki 6 haneli kodu girin.

:::tip Giriş ekranı domain adı soruyorsa
Panele URL'deki bağlantı yerine genel adresten girdiyseniz giriş ekranı domain adı da isteyebilir. Domain adınız, URL'de `/login/` ifadesinden sonra gelen kısımdır (ör. `Default`) ve büyük/küçük harfe duyarlıdır.
:::

## Projeler

FlexoStack'te kaynaklarınız **projeler** altında gruplanır. Bir proje; kendi sanal makinelerine, ağlarına, disklerine ve kotasına sahip yalıtılmış bir çalışma alanıdır. Örneğin canlı ortamınızı ve test ortamınızı ayrı projelerde tutabilirsiniz.

- Panelde sağ üstteki proje seçiciyle projeler arasında geçiş yapabilirsiniz.
- Bir projede oluşturduğunuz kaynaklar başka bir projeden görünmez.
- API erişim bilgileri de proje bazında oluşturulur (bkz. [API erişimi](./api-erisimi.md)).

Yeni proje veya ek kullanıcı ihtiyacınız için destek ekibimizle iletişime geçebilirsiniz.

## İki Faktörlü Doğrulama (2FA)

İki faktörlü doğrulama, girişte parolanızın yanında telefonunuzdaki bir uygulamanın ürettiği tek kullanımlık kodu da ister. Parolanız başkasının eline geçse bile bu kod olmadan hesabınıza giriş yapılamaz. Tüm kullanıcılara 2FA'yı etkinleştirmelerini önemle tavsiye ederiz.

Kod üretmek için **Google Authenticator** veya **Microsoft Authenticator** gibi bir doğrulama uygulaması kullanabilirsiniz. Uygulama her 30 saniyede bir yenilenen 6 haneli bir kod üretir.

### 2FA'yı Etkinleştirme

1. Telefonunuza bir doğrulama uygulaması kurun.
2. Panelde sağ üstteki profil simgesine tıklayın ve **Configure 2FA** seçeneğini seçin.
3. Ekranda görünen QR kodunu doğrulama uygulamanızla okutun. QR kodu okutamıyorsanız **Setup key** seçeneğiyle görünen anahtarı uygulamaya elle girin.
4. Uygulamanın ürettiği 6 haneli kodu girin ve **Configure** butonuna tıklayın.

### Telefonunuzu Kaybederseniz

Doğrulama uygulamanızın bulunduğu cihaza erişiminizi kaybettiyseniz:

- Uygulamanın yedekleme özelliği varsa uygulamayı yeni cihaza geri yüklemeyi deneyin.
- Geri yükleme mümkün değilse [destek talebi](https://cloud2biz.com/clientarea) oluşturun. Kimlik doğrulamasının ardından ekibimiz 2FA ayarlarınızı sıfırlar.

Erişiminiz geri geldikten sonra 2FA'yı yeniden yapılandırmanız gerekir.

### 2FA'yı Sıfırlama

Örneğin telefon değiştirmeden önce 2FA'yı sıfırlamak isterseniz:

1. Sağ üstteki profil simgesine tıklayın ve **Reset 2FA** seçeneğini seçin.
2. Doğrulama uygulamanızdaki 6 haneli kodu girin ve **Reset** butonuna tıklayın.
3. Yeni cihazınızla 2FA'yı yeniden etkinleştirin.

## Güvenlik Önerileri

- Panel parolanızı başka hiçbir hizmette kullanmayın.
- Otomasyon araçları ve betikler için kullanıcı parolanız yerine [API erişim bilgisi](./api-erisimi.md) oluşturun.
- Ekipteki her kişi için ayrı kullanıcı kullanın; ortak hesap paylaşmayın.

## Sonraki Adım

Panele giriş yaptıktan sonra ilk sanal makinenizi oluşturmak için [Sanal makine oluşturma](../sanal-makineler/sanal-makine-olusturma.md) rehberine göz atabilirsiniz.
