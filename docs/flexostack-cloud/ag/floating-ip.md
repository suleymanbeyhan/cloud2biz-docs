---
sidebar_position: 3
title: Floating IP
description: FlexoStack'te floating IP oluşturma, sanal makineye atama, sanal makineler arasında taşıma ve ters DNS kaydı.
---

**Floating IP**, bir sanal makineye atayabileceğiniz ve gerektiğinde başka bir sanal makineye anında taşıyabileceğiniz genel (public) IP adresidir. Private Network'teki sunucunuzu internetten erişilebilir kılmak veya bakım ve arıza durumlarında trafiği IP adresini değiştirmeden yedek sunucuya yönlendirmek için kullanılır.

## Nasıl Çalışır?

Floating IP, sanal makinenin işletim sistemine doğrudan tanımlanmaz. Sanal makine yalnızca kendi özel IP adresini (ör. `192.168.10.15`) görür; router, floating IP'ye gelen trafiği bu özel adrese yönlendirir (1:1 NAT).

```text
İnternet ──> 185.x.x.x (floating IP) ──> Router ──> 192.168.10.15 (web-01)
```

Bu sayede:

- Floating IP'yi bir sanal makineden alıp başka birine verdiğinizde sunucu içinde hiçbir ayar değiştirmeniz gerekmez.
- Sanal makineyi silseniz bile floating IP projenizde kalır; DNS kayıtlarınızı değiştirmeden yeni bir sunucuya atayabilirsiniz.

## Ön Koşullar

Bir sanal makineye floating IP atayabilmek için sanal makinenin bağlı olduğu ağın, dış ağ geçidi tanımlı bir [router](./sanal-routerlar.md)'a bağlı olması gerekir.

## Floating IP Oluşturma ve Atama

1. Panelde **Floating IPs** ekranını açın ve **Add floating IP** butonuna tıklayın.
2. Genel ağı seçin.
3. İsterseniz IP'yi hemen bir sanal makinenin ağ arayüzüne atayın veya daha sonra atamak üzere boşta bırakın.
4. **Add** butonuna tıklayın.

Mevcut boşta bir floating IP'yi atamak için IP'yi seçin, **Assign** seçeneğine tıklayın ve sanal makineyi seçin.

## Floating IP'yi Başka Bir Sanal Makineye Taşıma

1. **Floating IPs** ekranında IP'yi seçin ve **Unassign** ile mevcut sanal makineden ayırın.
2. **Assign** ile yeni sanal makineye atayın.

Bu işlem birkaç saniye sürer. Planlı bakımlarda veya bir sunucunun arızalanması durumunda trafiği yedek sunucuya yönlendirmenin en hızlı yoludur.

:::tip Güvenlik grubunu unutmayın
Floating IP'yi taşıdığınız sanal makinede, gerekli portları açan güvenlik grubunun tanımlı olduğundan emin olun.
:::

## Ters DNS (PTR) Kaydı

E-posta sunucuları gibi ters DNS kaydı gerektiren hizmetler için floating IP adresinize PTR kaydı tanımlatmak üzere, IP adresini ve kayıt değerini belirterek destek talebi oluşturabilirsiniz.

## Floating IP'yi Serbest Bırakma

Kullanmadığınız floating IP'ler ücretlendirilmeye devam eder. Bir IP'ye artık ihtiyacınız yoksa:

1. IP bir sanal makineye atanmışsa önce **Unassign** ile ayırın.
2. **Delete** ile IP'yi projenizden serbest bırakın.

:::warning Serbest bırakılan IP geri alınamayabilir
Serbest bıraktığınız IP adresi havuza geri döner ve başka bir müşteriye atanabilir. DNS kayıtlarınızda kullanılan bir IP'yi serbest bırakmadan önce kayıtlarınızı güncelleyin.
:::
