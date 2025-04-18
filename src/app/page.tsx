import { ArrowRightIcon, LockIcon } from "@/components/icons";
import { Navbar } from "@/components/ui/Navbar";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex flex-col items-center justify-center flex-grow py-10 px-4">
        <div className="max-w-3xl w-full text-center space-y-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold neon-text">
            Tarayıcın Seni Nasıl Ele Veriyor?
          </h1>
          
          <p className="text-xl text-muted-foreground">
            İnternet üzerinde yaptığın her hareket takip edilebilir bir iz bırakır. 
            Tarayıcın senin hakkında ne kadar bilgi topluyor ve paylaşıyor, öğren.
          </p>
          
          <div className="glassmorphism rounded-xl p-6 md:p-8 space-y-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-left">
                <div className="bg-primary/20 p-3 rounded-full">
                  <LockIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Gizlilik Garantisi</h3>
                  <p className="text-sm text-muted-foreground">
                    Hiçbir veri sunucularımıza kaydedilmez, her şey tarayıcınızda kalır.
                  </p>
                </div>
              </div>
              
              <Link 
                href="/result" 
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-lg flex items-center gap-2 font-medium transition-all shadow-md hover:shadow-xl"
              >
                <span>Tarayıcını Test Et</span>
                <ArrowRightIcon className="h-5 w-5" />
              </Link>
            </div>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glassmorphism p-5 rounded-lg card-glow">
              <h3 className="font-semibold text-lg mb-2">Tarayıcı Parmak İzi</h3>
              <p className="text-muted-foreground">
                WebGL, Canvas ve Audio API'leri ile oluşturulan benzersiz kimliğinizi öğrenin.
              </p>
            </div>
            
            <div className="glassmorphism p-5 rounded-lg card-glow">
              <h3 className="font-semibold text-lg mb-2">Anonimlik Skoru</h3>
              <p className="text-muted-foreground">
                Çevrimiçi anonimlik skorunuzu görün ve nasıl geliştirebileceğinizi öğrenin.
              </p>
            </div>
            
            <div className="glassmorphism p-5 rounded-lg card-glow">
              <h3 className="font-semibold text-lg mb-2">Gizlilik İpuçları</h3>
              <p className="text-muted-foreground">
                Çevrimiçi gizliliğinizi korumak için ipuçları ve öneriler edinebilirsiniz.
              </p>
            </div>
          </div>
          
          <div className="mt-16">
            <p className="text-sm text-muted-foreground">
              Bu araç eğitim ve farkındalık amacıyla oluşturulmuştur. 
              Topladığımız hiçbir bilgi sunucularımızda saklanmaz veya 3. taraflarla paylaşılmaz.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
