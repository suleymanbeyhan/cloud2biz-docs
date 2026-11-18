---
sidebar_position: 1
title: Yönetilen Kubernetes (K8s)
sidebar_label: Kubernetes Kümeleri
description: FlexoStack'te yönetilen Kubernetes kümesi oluşturma, worker grupları, otomatik ölçeklendirme, kubeconfig ve kalıcı diskler.
---

FlexoStack **Yönetilen Kubernetes** servisi ile birkaç tıklamayla, üretime hazır Kubernetes kümeleri oluşturabilirsiniz. Kümenin kurulumu, master düğümleri ve temel bileşenleri platform tarafından yönetilir; siz yalnızca uygulamalarınıza odaklanırsınız. Container tabanlı uygulamalarınızı çalıştırabilir, monolitik uygulamalarınızı mikro servis mimarisine kademeli olarak taşıyabilirsiniz.

## Küme Bileşenleri

| Bileşen | Açıklama |
| --- | --- |
| **Master düğüm(ler)** | Kubernetes kontrol düzlemi (API sunucusu, zamanlayıcı, etcd). Yüksek erişilebilirlik için 3 master düğüm kullanılabilir. |
| **Worker grupları** | Uygulamalarınızın (pod'ların) çalıştığı düğüm grupları. Her grup farklı CPU/RAM boyutunda olabilir. |
| **Ağ** | Küme düğümlerinin bağlı olduğu sanal ağ. |
| **Load balancer** | `LoadBalancer` tipindeki servisler için otomatik oluşturulan yük dengeleyiciler. |
| **Kalıcı diskler** | `PersistentVolumeClaim` ile otomatik oluşturulan FlexoStack diskleri. |

## Başlamadan Önce

- Dış ağ geçidi tanımlı bir [router](../ag/sanal-routerlar.md)'a bağlı bir [sanal ağ](../ag/sanal-aglar.md)
- Düğümlere SSH ile erişim için bir [SSH anahtarı](../sanal-makineler/ssh-anahtarlari.md)
- Bilgisayarınızda `kubectl` aracı

## Küme Oluşturma

1. Panelde **Kubernetes clusters** ekranını açın ve **Create Kubernetes cluster** butonuna tıklayın.
2. Kümeye bir ad verin ve **Kubernetes sürümünü** seçin. Aksi bir gereksiniminiz yoksa listedeki en güncel sürümü seçin.
3. **SSH anahtarını** seçin.
4. **Ağ** bölümünde küme düğümlerinin bağlanacağı sanal ağı seçin. Kubernetes API'sine internetten erişmek istiyorsanız API için **floating IP** atanmasını etkinleştirin.
5. **Master düğüm** ayarlarında flavor'ı seçin. Canlı ortamlar için **yüksek erişilebilirlik** seçeneğiyle 3 master düğüm kullanmanızı öneririz.
6. **Worker** ayarlarında varsayılan worker grubunun flavor'ını, düğüm sayısını ve isterseniz otomatik ölçeklendirmeyi belirleyin.
7. Kalıcı diskler için kullanılacak **disk tipini** seçin.
8. **Create** butonuna tıklayın.

Küme oluşturma işlemi birkaç dakika sürer. Durum **Active** olduğunda küme kullanıma hazırdır.

## Kümeye Bağlanma (kubeconfig)

1. Panelde kümeyi seçin ve **Download kubeconfig** seçeneğiyle yapılandırma dosyasını indirin.
2. Dosyayı kullanarak kümeye bağlanın:

```bash
export KUBECONFIG=~/indirilenler/kubeconfig.yaml
kubectl get nodes
kubectl get pods -A
```

:::warning kubeconfig dosyasını koruyun
kubeconfig dosyası kümeniz üzerinde tam yetki verir. Bu dosyayı Git deposuna eklemeyin ve yalnızca yetkili kişilerle paylaşın.
:::

## Worker Grupları

Worker grupları, aynı kümede farklı CPU ve RAM boyutlarına sahip düğümler çalıştırmanızı sağlar. Örneğin genel uygulamalar için küçük düğümlerden, bellek yoğun işler için büyük düğümlerden oluşan ayrı gruplar oluşturabilirsiniz.

- Yeni bir küme yalnızca bir worker grubuyla, **varsayılan (default)** grupla oluşturulur. Diğer grupları oluşturma sonrasında eklersiniz.
- Bir gruptaki düğüm sayısını sonradan değiştirebilirsiniz.

### Grup Ekleme

1. Kümenin **Groups** sekmesini açın ve **Workers** bölümünde **Add** butonuna tıklayın.
2. Grup adını girin, flavor'ı ve otomatik ölçeklendirme ayarını seçin.
3. İsterseniz **etiketler (labels)** ekleyin.
4. **Add** butonuna tıklayın.

Pod'larınızı belirli bir gruba yönlendirmek için `nodeSelector` veya `nodeAffinity` kullanabilirsiniz.

### Grup Düzenleme ve Silme

- **Düzenleme:** Varsayılan grup için kalem simgesine, diğer gruplar için üç nokta menüsüne tıklayıp **Edit** seçeneğiyle otomatik ölçeklendirmeyi veya düğüm sayısını değiştirin.
- **Silme:** Grubun yanındaki üç nokta menüsünden **Delete** seçin. Grup ve düğümleri silinir; bu düğümlerdeki yerel veriler kaybolur.

### Varsayılan Grubu Devre Dışı Bırakma

Varsayılan grup kümenin ilk yapısının parçası olduğu için silinemez, ancak boşaltılarak sıfıra ölçeklendirilebilir:

1. Varsayılan grubu düzenleyin, otomatik ölçeklendirmeyi etkinleştirin ve en düşük düğüm sayısını **0** yapın.
2. Düğümü yeni iş yüklerine kapatın:

```bash
kubectl cordon DUGUM_ADI
kubectl drain DUGUM_ADI --ignore-daemonsets --delete-emptydir-data --force
```

3. Yaklaşık 10 dakika içinde otomatik ölçeklendirici boş düğümü kaldırır ve iş yükleriniz yeni gruplarda çalışmaya devam eder.

## Otomatik Ölçeklendirme

Bir worker grubunda otomatik ölçeklendirme etkinse:

- Yetersiz kaynak nedeniyle **Pending** durumunda bekleyen pod'lar olduğunda kümeye yeni worker düğümleri eklenir.
- Üzerinde pod çalışmayan worker düğümleri otomatik olarak kaldırılır.
- Grup için bir **en az** ve **en fazla** düğüm sayısı belirlersiniz.

Bazı pod türleri (ör. yerel depolama kullanan veya bir denetleyiciye bağlı olmayan pod'lar) bir düğümün kaldırılmasını engelleyebilir. Otomatik ölçeklendirme kapalıyken belirlediğiniz düğüm sayısı sabit kalır.

:::tip Kaynak isteklerini (requests) tanımlayın
Otomatik ölçeklendiricinin doğru çalışması için pod'larınızda CPU ve bellek `requests` değerlerini mutlaka tanımlayın.
:::

## Uygulamaları Dışarı Açma

`LoadBalancer` tipinde bir servis oluşturduğunuzda FlexoStack otomatik olarak bir [load balancer](../ag/load-balancer.md) ve floating IP oluşturur:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: web
spec:
  type: LoadBalancer
  selector:
    app: web
  ports:
    - port: 80
      targetPort: 8080
```

```bash
kubectl apply -f servis.yaml
kubectl get svc web        # EXTERNAL-IP sütununda genel IP görünür
```

Birden fazla web uygulamasını tek bir IP üzerinden yayınlamak için bir Ingress denetleyicisi (ör. ingress-nginx) kurup yalnızca onu `LoadBalancer` tipiyle dışarı açabilirsiniz.

## Kalıcı Depolama

`PersistentVolumeClaim` (PVC) oluşturduğunuzda FlexoStack otomatik olarak bir disk oluşturur ve pod'a bağlar:

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: veri
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 20Gi
```

Mevcut depolama sınıflarını görmek için `kubectl get storageclass` komutunu kullanın. Oluşan diskler panelde **Volumes** ekranında da görünür ve disk kullanımı olarak ücretlendirilir.

## Kubernetes Sürümünü Yükseltme

Yeni bir Kubernetes sürümü kullanılabilir olduğunda panelde küme detaylarında yükseltme seçeneği görünür. Yükseltme sırasında düğümler sırayla güncellenir. Yükseltmeden önce:

- İş yüklerinizin yeni sürümle uyumlu olduğunu kontrol edin (kaldırılan API sürümleri gibi).
- Birden fazla replika ile çalışan uygulamalarda `PodDisruptionBudget` tanımlayarak kesintiyi en aza indirin.
- Önemli verilerinizin yedeğini alın.

## Kümeyi Yedekleme

Kubernetes kaynaklarınızı ve kalıcı disklerinizi yedeklemek için Velero gibi araçları, yedek hedefi olarak Cloud2Biz S3 uyumlu Object Storage ile birlikte kullanabilirsiniz.

## Kümeyi Silme

Panelde kümeyi seçip **Delete** butonuna tıklayın. Küme silindiğinde master ve worker düğümleri kaldırılır. `LoadBalancer` servisleri için oluşturulan load balancer'lar ve PVC disklerinin durumu silme şekline bağlıdır; silme sonrasında **Load balancers**, **Floating IPs** ve **Volumes** ekranlarını kontrol ederek kullanılmayan kaynakları temizleyin.
