"use client";

import { ComparisonChart } from "@/components/ui/ComparisonChart";
import { DataGrid, DataItem } from "@/components/ui/DataGrid";
import { DownloadButton } from "@/components/ui/DownloadButton";
import { Navbar } from "@/components/ui/Navbar";
import { ScoreGauge } from "@/components/ui/ScoreGauge";
import { calculateAnonymityScore, collectAllFingerprints } from "@/lib/fingerprint";
import { useEffect, useState } from "react";

export default function ResultPage() {
  const [fingerprint, setFingerprint] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [anonymityScore, setAnonymityScore] = useState(0);
  
  useEffect(() => {
    async function getFingerprintData() {
      const data = await collectAllFingerprints();
      setFingerprint(data);
      
      // Anonimlik skorunu hesapla
      const score = calculateAnonymityScore(data);
      setAnonymityScore(score);
      
      setLoading(false);
    }
    
    getFingerprintData();
  }, []);
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex flex-col items-center justify-center flex-grow">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-lg">Tarayıcı verileriniz toplanıyor...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex flex-col flex-grow container py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">Tarayıcı Parmak İziniz</h1>
        <p className="text-center text-muted-foreground mb-8">
          İşte tarayıcınızın sizin hakkınızda açığa çıkardığı bilgiler
        </p>
        
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          <div className="w-full lg:w-1/2 glassmorphism rounded-lg p-6">
            <ScoreGauge score={anonymityScore} />
          </div>
          
          <div className="w-full lg:w-1/2">
            <ComparisonChart
              userBrowser={fingerprint?.browserInfo?.userAgent || ''}
              hasAdBlock={fingerprint?.hasAdBlocker || false}
              doNotTrack={fingerprint?.browserInfo?.doNotTrack || null}
              anonymityScore={anonymityScore}
            />
          </div>
        </div>
        
        <h2 className="text-2xl font-semibold mb-6">Temel Bilgiler</h2>
        
        <DataGrid className="mb-8">
          <DataItem
            title="Tarayıcı"
            value={fingerprint?.browserInfo?.userAgent || 'Bilinmiyor'}
            tooltipKey="userAgent"
            staggerIndex={1}
          />
          
          <DataItem
            title="Ekran Çözünürlüğü"
            value={`${fingerprint?.browserInfo?.screenSize?.width || 0} x ${fingerprint?.browserInfo?.screenSize?.height || 0}`}
            tooltipKey="resolution"
            staggerIndex={2}
          />
          
          <DataItem
            title="Piksel Oranı"
            value={fingerprint?.browserInfo?.devicePixelRatio || 1}
            tooltipKey="pixelRatio"
            staggerIndex={3}
          />
          
          <DataItem
            title="Renk Derinliği"
            value={`${fingerprint?.browserInfo?.colorDepth || 0} bit`}
            tooltipKey="colorDepth"
            staggerIndex={4}
          />
          
          <DataItem
            title="Zaman Dilimi"
            value={fingerprint?.browserInfo?.timezone || 'Bilinmiyor'}
            tooltipKey="timezone"
            staggerIndex={5}
          />
          
          <DataItem
            title="Dil"
            value={fingerprint?.browserInfo?.language || 'Bilinmiyor'}
            tooltipKey="language"
            staggerIndex={6}
          />
          
          <DataItem
            title="Platform"
            value={fingerprint?.browserInfo?.platform || 'Bilinmiyor'}
            tooltipKey="platform"
            staggerIndex={7}
          />
          
          <DataItem
            title="Do Not Track"
            value={fingerprint?.browserInfo?.doNotTrack ? 'Etkin' : 'Devre Dışı'}
            tooltipKey="doNotTrack"
            staggerIndex={8}
          />
          
          <DataItem
            title="Çerezler"
            value={fingerprint?.browserInfo?.cookieEnabled ? 'Etkin' : 'Devre Dışı'}
            tooltipKey="cookiesEnabled"
            staggerIndex={9}
          />
        </DataGrid>
        
        <h2 className="text-2xl font-semibold mb-6">Gelişmiş Parmak İzi</h2>
        
        <DataGrid className="mb-8">
          <DataItem
            title="Canvas Parmak İzi"
            value={
              <div className="flex flex-col items-start">
                <span className="text-sm mb-2 break-all">
                  {fingerprint?.canvasFingerprint?.hash?.substring(0, 20)}...
                </span>
                {fingerprint?.canvasFingerprint?.imageData && (
                  <img 
                    src={fingerprint.canvasFingerprint.imageData} 
                    alt="Canvas Fingerprint" 
                    className="border border-border rounded-md" 
                    width={150}
                    height={40}
                  />
                )}
              </div>
            }
            tooltipKey="canvas"
            staggerIndex={1}
          />
          
          <DataItem
            title="WebGL Bilgileri"
            value={
              <div>
                <div className="mb-1"><span className="text-muted-foreground">Vendor:</span> {fingerprint?.webglInfo?.vendor || 'Bilinmiyor'}</div>
                <div><span className="text-muted-foreground">Renderer:</span> {fingerprint?.webglInfo?.renderer || 'Bilinmiyor'}</div>
              </div>
            }
            tooltipKey="webGL"
            staggerIndex={2}
          />
          
          <DataItem
            title="Audio Parmak İzi"
            value={
              <div className="truncate max-w-full">
                <span className="font-mono text-sm">
                  {fingerprint?.audioFingerprint?.substring(0, 30) || 'Bilinmiyor'}...
                </span>
              </div>
            }
            tooltipKey="audio"
            staggerIndex={3}
          />
          
          <DataItem
            title="Font Listesi"
            value={
              <div>
                <p className="mb-1">{fingerprint?.fonts?.length || 0} adet font tespit edildi</p>
                <div className="text-sm text-muted-foreground max-h-20 overflow-y-auto">
                  {fingerprint?.fonts?.slice(0, 5).join(', ')}
                  {fingerprint?.fonts?.length > 5 ? '...' : ''}
                </div>
              </div>
            }
            tooltipKey="fonts"
            staggerIndex={4}
          />
          
          <DataItem
            title="Batarya Durumu"
            value={
              fingerprint?.batteryInfo ? (
                <div>
                  <div className="mb-1">Şarj: %{Math.round(fingerprint.batteryInfo.level)}</div>
                  <div>Şarj Oluyor: {fingerprint.batteryInfo.charging ? 'Evet' : 'Hayır'}</div>
                </div>
              ) : (
                'Bilgi alınamadı'
              )
            }
            tooltipKey="batteryStatus"
            staggerIndex={5}
          />
          
          <DataItem
            title="AdBlock Durumu"
            value={fingerprint?.hasAdBlocker ? 'Tespit Edildi' : 'Tespit Edilemedi'}
            tooltipKey="adBlocker"
            staggerIndex={6}
          />
        </DataGrid>
        
        <div className="flex justify-center mt-8">
          <DownloadButton data={fingerprint} className="mr-4" />
        </div>
      </main>
      
      <footer className="container py-6 text-center text-sm text-muted-foreground">
        <p>© 2023 Browser Footprint Viewer. Hiçbir verini sunucularımızda saklamıyoruz.</p>
      </footer>
    </div>
  );
}
