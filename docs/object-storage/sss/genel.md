---
sidebar_position: 1
title: Genel Sorular
---

## Object Storage hangi durumlar için uygundur?

- **Yedekleme ve arşivleme:** Nadiren erişilen verilerin uzun süreli saklanması
- **Statik içerik:** Görseller, videolar ve dokümanlar

## Object Storage hangi durumlar için uygun değildir?

- **Yüksek frekanslı okuma/yazma:** Veritabanları için blok depolama kullanın
- **Çok küçük dosyalar:** 1 MB altındaki dosyaları arşivleyerek yükleyin

:::warning Bu servis bir CDN değildir
Yüksek trafikli statik içerik için Object Storage önüne bir CDN koyun.
:::
