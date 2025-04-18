"use client";

import { DownloadIcon } from "@/components/icons";
import { useState } from "react";

type DownloadButtonProps = {
  data: any;
  filename?: string;
  className?: string;
};

export function DownloadButton({ 
  data, 
  filename = "browser-footprint.json", 
  className = "" 
}: DownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    
    try {
      // Veriyi JSON formatına dönüştür
      const jsonData = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonData], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      
      // İndirme bağlantısı oluştur
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      
      // İndirmeyi başlat
      link.click();
      
      // Temizlik
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      setTimeout(() => {
        setIsDownloading(false);
      }, 1000);
    } catch (error) {
      console.error("Dosya indirme hatası:", error);
      setIsDownloading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isDownloading}
      className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors ${
        isDownloading ? "opacity-70 cursor-not-allowed" : ""
      } ${className}`}
    >
      <DownloadIcon className="w-5 h-5" />
      <span>{isDownloading ? "İndiriliyor..." : "JSON Olarak İndir"}</span>
    </button>
  );
}
