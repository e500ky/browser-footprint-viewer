// Karşılaştırma ve istatistikler için örnek veriler

export const averageFingerprintStats = {
  browser: {
    chrome: 65.8,
    firefox: 20.2,
    safari: 9.7,
    edge: 3.5,
    opera: 0.8
  },
  adBlockUsage: 42.7, // yüzde olarak
  doNotTrackEnabled: 21.3, // yüzde olarak
  commonResolutions: [
    { resolution: "1920x1080", percentage: 21.3 },
    { resolution: "1366x768", percentage: 19.8 },
    { resolution: "1536x864", percentage: 9.7 },
    { resolution: "1440x900", percentage: 7.2 },
    { resolution: "1280x720", percentage: 6.4 }
  ],
  operatingSystems: {
    windows: 73.2,
    macos: 15.3,
    linux: 2.1,
    android: 8.1,
    ios: 1.3
  },
  uniquenessByBrowser: {
    chrome: 82.3, // Chrome kullanıcıları daha benzersiz parmak izlerine sahip
    firefox: 63.7, // Firefox'un izleme koruması daha iyi anonimlik sağlar
    safari: 71.5,
    edge: 84.2,
    opera: 78.9
  }
};

export const toolTipDescriptions = {
  userAgent: "Tarayıcınızın kendini web sitelerine tanıtma şekli. Bu bilgi, tarayıcı türünüzü, sürümünüzü ve işletim sisteminizi içerir.",
  resolution: "Ekranınızın piksel cinsinden çözünürlüğü. Sık kullanılmayan çözünürlükler sizi daha benzersiz yapar.",
  colorDepth: "Ekranınızın renk derinliği. Genellikle 24bit veya 32bit olur.",
  timezone: "Cihazınızın zaman dilimi. Bulunduğunuz konumu yaklaşık olarak belirlemek için kullanılabilir.",
  language: "Tarayıcınızda ayarladığınız dil tercihi.",
  platform: "Cihazınızın işletim sistemi platformu.",
  doNotTrack: "Tarayıcınızda 'İzleme Yapma' (DNT) ayarının durumu. Etkinleştirilmesi izlemeyi tamamen engellemez.",
  canvas: "Canvas parmak izi, tarayıcınızın grafikleri nasıl oluşturduğuna dayanarak oluşturulan benzersiz bir kimliktir. Sizi takip etmek için yaygın olarak kullanılır.",
  webGL: "WebGL, tarayıcınız ve grafik kartınız hakkında detaylı bilgiler sağlayan bir 3B grafik API'sidir.",
  audio: "Audio parmak izi, tarayıcınızın ses işleme özellikleriyle oluşturulan benzersiz bir imzadır.",
  fonts: "Sisteminizde yüklü fontlar, sizi diğer kullanıcılardan ayırt etmek için kullanılabilir.",
  batteryStatus: "Batarya API'si, şarj durumu ve seviyesi gibi cihaz bataryası hakkında bilgi sağlar.",
  adBlocker: "Reklam engelleyicilerin varlığı tespit edilebilir ve bu kullanıcı profilinizin bir parçası olabilir.",
  cookiesEnabled: "Tarayıcınızda çerezlerin etkin olup olmadığı.",
  anonymityScore: "Bu puan, çevrimiçi parmak izinizin ne kadar ayırt edilebilir olduğunu gösterir. Düşük puan, daha benzersiz ve dolayısıyla daha takip edilebilir olduğunuz anlamına gelir.",
  pixelRatio: "Fiziksel piksel sayısının CSS piksellerine oranı. Genellikle retina ekranlarda 2 veya daha yüksektir."
};

// Anonimlik skoru için referans değerler
export const anonymityScoreReference = [
  { range: [0, 20], description: "Çok Benzersiz: Tarayıcı yapılandırmanız oldukça nadir. Web sitelerinin sizi kolayca tanımlama ve takip etme olasılığı çok yüksek." },
  { range: [21, 40], description: "Benzersiz: Parmak iziniz ortalamadan daha benzersiz. Çevrimiçi kimliğinizi gizlemek için ek önlemler almayı düşünebilirsiniz." },
  { range: [41, 60], description: "Ortalama: Parmak iziniz internetteki ortalama kullanıcıya benziyor. Yine de kolaylıkla takip edilebilirsiniz." },
  { range: [61, 80], description: "İyi: Tarayıcı yapılandırmanız sizi kalabalık içinde biraz daha gizliyor. İyi gizlilik uygulamaları kullanıyor olabilirsiniz." },
  { range: [81, 100], description: "Mükemmel: Parmak iziniz çok az benzersiz özellik içeriyor. Gizlilik odaklı bir tarayıcı veya eklentiler kullanıyor olabilirsiniz." }
];
