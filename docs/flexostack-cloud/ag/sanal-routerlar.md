---
sidebar_position: 2
title: Sanal Router'lar
description: FlexoStack'te sanal ağları internete ve birbirine bağlayan sanal router oluşturma, SNAT ve statik rotalar.
---

Sanal router, sanal ağlarınızı birbirine ve internete bağlayan yazılım tanımlı bir yönlendiricidir. Sanal ağlar varsayılan olarak dış dünyaya kapalıdır; bir router bağlanana kadar bu ağlardaki sunucular internete çıkamaz.

## Router Ne İşe Yarar? {#router-ne-işe-yarar}

- **İnternet çıkışı (SNAT):** Floating IP'si olmayan sunucuların da internete çıkmasını (ör. güncelleme indirmesini) sağlar. Bu sunucular dışarıya router'ın genel IP adresiyle görünür.
- **Floating IP:** Bir sanal ağdaki sunucuya [floating IP](./floating-ip.md) atayabilmek için o ağın, dış ağ geçidi tanımlı bir router'a bağlı olması gerekir.
- **Ağlar arası yönlendirme:** Aynı router'a bağlı farklı sanal ağlar birbirleriyle haberleşebilir.

## Router Oluşturma

1. Panelde **Routers** ekranını açın ve **Add router** butonuna tıklayın.
2. Router'a bir ad verin, örneğin `ana-router`.
3. **External gateway** olarak genel ağı seçin.
4. **SNAT** seçeneğini, sunucularınızın internete çıkabilmesi için açık bırakın.
5. **Add interface** ile router'ı bağlamak istediğiniz sanal ağları ekleyin. Router, her ağın gateway adresini kullanır.
6. **Create** butonuna tıklayın.

## Arayüz Ekleme ve Çıkarma

Router oluşturulduktan sonra yeni sanal ağları bağlamak için:

1. **Routers** ekranında router'ı seçin.
2. **Interfaces** sekmesinde **Add** butonuna tıklayın ve sanal ağı seçin.

Bir ağı router'dan ayırmak için ilgili arayüzü **Delete** ile kaldırın. Ayırma işleminden sonra o ağdaki sunucular internete çıkamaz ve floating IP'leri çalışmaz.

## Statik Rotalar

Router'a statik rota ekleyerek belirli bir hedef ağa giden trafiği ağınızdaki bir sunucuya (ör. kendi kurduğunuz bir VPN veya güvenlik duvarı sunucusuna) yönlendirebilirsiniz:

1. Router'ı seçin ve **Static routes** sekmesini açın.
2. **Add** butonuna tıklayın.
3. **Destination** alanına hedef ağı (ör. `10.50.0.0/16`), **Next hop** alanına trafiğin gönderileceği sunucunun iç IP adresini girin.

## Dış Ağ Geçidini Kaldırma

Bir router'ın dış ağ geçidini kaldırırsanız router yalnızca bağlı sanal ağlar arasında yönlendirme yapar; internete çıkış ve floating IP erişimi durur. Bu yapı, internetle hiç bağlantısı olmaması gereken izole ortamlar için kullanılabilir.

## Router'ı Silme

Router'ı silmeden önce:

1. Router üzerinden kullanılan floating IP'leri sunuculardan ayırın.
2. Router'ın tüm sanal ağ arayüzlerini kaldırın.
3. **Routers** ekranında router'ı seçip **Delete** butonuna tıklayın.
