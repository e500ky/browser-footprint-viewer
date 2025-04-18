import { Navbar } from "@/components/ui/Navbar";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="container py-8 flex-grow">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Bu Proje Hakkında</h1>
        
        <div className="max-w-3xl mx-auto glassmorphism rounded-lg p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Tarayıcı Parmak İzi Nedir?</h2>
          <p className="mb-4">
            Tarayıcı parmak izi (browser fingerprinting), tarayıcınızın ve cihazınızın karakteristik özelliklerinin
            bir kombinasyonu kullanılarak oluşturulan benzersiz bir tanımlayıcıdır. Bu teknik, çerezlere alternatif olarak
            kullanıcıları takip etmek için kullanılır ve genellikle çerez politikalarının ve izleme karşıtı
            önlemlerin etrafından dolaşmak için tercih edilir.
          </p>
          <p>
            Bu özellikler arasında tarayıcı sürümü, işletim sistemi, yüklü eklentiler, ekran çözünürlüğü, 
            zaman dilimi, dil ayarları, Canvas API ve WebGL davranışı, font listesi ve daha birçok teknik detay bulunur.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto glassmorphism rounded-lg p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Bu Aracın Amacı</h2>
          <p className="mb-4">
            Bu web uygulaması, tarayıcınız tarafından açığa çıkarılabilecek bilgileri görselleştirerek dijital gizlilik konusunda farkındalık
            yaratmayı amaçlamaktadır. Tarayıcınızın sizi ne kadar benzersiz kıldığını ve bu verilerin potansiyel olarak
            sizi nasıl tanımlayabileceğini anlayabilirsiniz.
          </p>
          <p>
            Bu araç aynı zamanda çevrimiçi gizliliğinizi artırmak için neler yapabileceğinizi anlamanıza yardımcı olabilir.
            Anonimlik skorunuzun düşük olduğunu görürseniz, bu rehberde sunulan önerileri uygulayarak gizliliğinizi güçlendirebilirsiniz.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto glassmorphism rounded-lg p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Gizlilik İpuçları</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Tarayıcı Seçiminiz Önemlidir</h3>
              <p>Firefox ve Brave gibi gizlilik odaklı tarayıcılar parmak izi koruması sağlar.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium">Tor Browser Kullanın</h3>
              <p>Maksimum anonimlik için Tor tarayıcısı, parmak izi engelleme özellikleriyle bilinir.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium">Tarayıcı Eklentileri</h3>
              <p>Privacy Badger, uBlock Origin ve Canvas Blocker gibi eklentiler izlenmeye karşı korunmanıza yardımcı olur.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium">JavaScript'i Sınırlandırın</h3>
              <p>NoScript gibi araçlarla JavaScript'i seçtiğiniz sitelerle sınırlandırmak parmak izi oluşturmayı zorlaştırır.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium">VPN Kullanın</h3>
              <p>Güvenilir bir VPN IP adresinizi ve konumunuzu gizlemenize yardımcı olabilir.</p>
            </div>
          </div>
        </div>
        
        <div className="max-w-3xl mx-auto glassmorphism rounded-lg p-6 md:p-8">
          <h2 className="text-2xl font-semibold mb-4">Veri Gizliliği Politikası</h2>
          <p className="mb-4">
            Tarayıcınız hakkında toplanan tüm bilgiler yalnızca tarayıcınızda yerel olarak saklanır ve hiçbir zaman 
            sunucularımıza veya üçüncü taraflara gönderilmez. Bu araç, çevrimiçi gizlilik hakkında bilgi ve farkındalık 
            sağlamak amacıyla tasarlanmıştır.
          </p>
          <p>
            "JSON Olarak İndir" butonu ile verilerinizi indirebilir ve dilediğiniz gibi kullanabilirsiniz.
            Tarayıcı sekmesini kapatıp tekrar açtığınızda verileriniz sıfırlanır.
          </p>
        </div>
      </main>
      
      <footer className="container py-6 text-center text-sm text-muted-foreground">
        <p>© 2023 Browser Footprint Viewer. Hiçbir verini sunucularımızda saklamıyoruz.</p>
      </footer>
    </div>
  );
}
