# Browser Footprint Viewer

![Browser Footprint Viewer](https://img.shields.io/badge/Version-1.0.0-brightgreen) ![License MIT](https://img.shields.io/badge/License-MIT-blue)

Bu proje, tarayıcınızın sizin hakkınızda toplayabildiği bilgileri görselleştirerek çevrimiçi gizlilik hakkında farkındalık yaratmayı amaçlayan bir web uygulamasıdır.

## 📑 İçerik

- [Proje Hakkında](#proje-hakkında)
- [Özellikler](#özellikler)
- [Teknolojiler](#teknolojiler)
- [Kurulum](#kurulum)
- [Kullanım](#kullanım)
- [Gizlilik](#gizlilik)
- [Ekran Görüntüleri](#ekran-görüntüleri)
- [Katkıda Bulunma](#katkıda-bulunma)
- [Lisans](#lisans)

## 🔍 Proje Hakkında

Browser Footprint Viewer, tarayıcınızın dijital parmak izinizi nasıl oluşturduğunu ve potansiyel olarak sizi nasıl tanımlayabileceğini göstermeyi amaçlar. Tarayıcı parmak izi (browser fingerprinting), tarayıcınızın ve cihazınızın özellikleri kombinasyonu kullanılarak sizi tanımlayan bir teknolojidir. Bu uygulama ile kendi parmak izinizi inceleyebilir ve çevrimiçi gizliliğinizi artırmak için ipuçları alabilirsiniz.

## ✨ Özellikler

- **Detaylı Tarayıcı Analizi**: UserAgent, işletim sistemi, ekran çözünürlüğü, dil, zaman dilimi ve daha fazla bilgiyi görüntüleme
- **Gelişmiş Parmak İzi Tespiti**:
  - Canvas Fingerprinting
  - WebGL Bilgileri
  - AudioContext Parmak İzi
  - Font Tespiti
  - Batarya Durumu
  - AdBlock Kullanımı
- **Anonimlik Skoru**: Tarayıcınızın ne kadar benzersiz olduğunu ölçen puan
- **Veri Karşılaştırması**: Kendi verilerinizi ortalama kullanıcı verileriyle karşılaştırma
- **Veri Dışa Aktarımı**: Tüm bilgilerinizi JSON formatında indirme imkanı
- **Karanlık/Aydınlık Tema**: Kullanıcı tercihine göre tema değiştirme

## 🛠️ Teknolojiler

- Next.js (App Router)
- React
- TypeScript
- SCSS & Tailwind CSS
- Recharts (Grafik gösterimi için)
- Next-themes (tema desteği için)

## 📦 Kurulum

Projeyi yerel ortamınızda çalıştırmak için:

```bash
# Projeyi klonlayın
git clone https://github.com/e500ky/browser-footprint-viewer.git

# Proje dizinine geçin
cd browser-footprint-viewer

# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev
```

Tarayıcınızda `http://localhost:3000` adresini açarak uygulamayı görüntüleyebilirsiniz.

## 📊 Kullanım

1. Ana sayfada "Tarayıcını Test Et" butonuna tıklayın
2. Tarayıcınızdan toplanan veriler analiz edilecek ve görselleştirilecektir
3. Anonimlik skorunuzu görüntüleyin ve diğer tarayıcılarla karşılaştırın
4. İsterseniz verilerinizi JSON formatında indirebilirsiniz
5. Gizliliğinizi artırmak için önerilen ipuçlarını inceleyin

## 🔒 Gizlilik

Bu uygulama **hiçbir veriyi sunucuda saklamaz**. Tüm işlemler yalnızca kullanıcının tarayıcısında yerel olarak gerçekleşir. Toplanan bilgiler yalnızca kullanıcıya gösterilir ve üçüncü taraflarla paylaşılmaz. Bu araç yalnızca eğitim ve farkındalık amacıyla geliştirilmiştir.

## 📷 Ekran Görüntüleri

![Ana Sayfa](screenshots/home.png)
![Sonuç Sayfası](screenshots/results.png)
![Karşılaştırma Grafikleri](screenshots/comparison.png)

## 👥 Katkıda Bulunma

Katkılarınızı bekliyoruz! Proje ile ilgili fikirleriniz, önerileriniz veya bulduğunuz hatalar için:

1. Bu repo'yu fork edin
2. Yeni bir branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some amazing feature'`)
4. Branch'inize push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT Lisansı ile lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasını inceleyebilirsiniz.

---

Hazırlayan: [e500ky](https://github.com/e500ky)

© 2025 Browser Footprint Viewer. Tüm hakları saklıdır.
