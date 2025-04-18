"use client";

import { averageFingerprintStats } from "@/lib/data-examples";
import { useState } from "react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

// Tarayıcı karşılaştırması için veri formatı
type BrowserComparisonData = {
  name: string;
  yours: number;
  average: number;
};

type ComparisonChartProps = {
  userBrowser: string;
  hasAdBlock: boolean;
  doNotTrack: string | null;
  anonymityScore: number;
  className?: string;
};

export function ComparisonChart({
  userBrowser,
  hasAdBlock,
  doNotTrack,
  anonymityScore,
  className = "",
}: ComparisonChartProps) {
  const [activeTab, setActiveTab] = useState<"browsers" | "features">("browsers");

  // Kullanıcının tarayıcısını tespit et (basit)
  const detectBrowserType = (userAgent: string): string => {
    const browserMap: Record<string, string> = {
      "Chrome": "chrome",
      "Firefox": "firefox",
      "Safari": "safari",
      "Edg": "edge",
      "OPR": "opera"
    };
    
    for (const [key, value] of Object.entries(browserMap)) {
      if (userAgent.includes(key)) {
        return value;
      }
    }
    return "other";
  };
  
  const userBrowserType = detectBrowserType(userBrowser);
  
  // Tarayıcı bazlı anonimlik skoru karşılaştırması
  const browsersData: BrowserComparisonData[] = [
    {
      name: "Chrome",
      yours: userBrowserType === "chrome" ? anonymityScore : 0,
      average: 100 - averageFingerprintStats.uniquenessByBrowser.chrome,
    },
    {
      name: "Firefox",
      yours: userBrowserType === "firefox" ? anonymityScore : 0,
      average: 100 - averageFingerprintStats.uniquenessByBrowser.firefox,
    },
    {
      name: "Safari",
      yours: userBrowserType === "safari" ? anonymityScore : 0,
      average: 100 - averageFingerprintStats.uniquenessByBrowser.safari,
    },
    {
      name: "Edge",
      yours: userBrowserType === "edge" ? anonymityScore : 0,
      average: 100 - averageFingerprintStats.uniquenessByBrowser.edge,
    },
  ].filter(item => item.yours > 0 || userBrowserType === "other");

  // Özellik bazlı karşılaştırma (AdBlock ve DNT)
  const featuresData = [
    {
      name: "AdBlock Kullanımı",
      yours: hasAdBlock ? 100 : 0,
      average: averageFingerprintStats.adBlockUsage,
    },
    {
      name: "Do Not Track",
      yours: doNotTrack === "1" || doNotTrack === "yes" ? 100 : 0,
      average: averageFingerprintStats.doNotTrackEnabled,
    },
  ];

  const activeData = activeTab === "browsers" ? browsersData : featuresData;

  return (
    <div className={`glassmorphism rounded-lg p-5 ${className}`}>
      <h3 className="text-xl font-semibold mb-4">Ortalama ile Karşılaştırma</h3>
      
      <div className="flex space-x-2 mb-6">
        <button
          onClick={() => setActiveTab("browsers")}
          className={`px-4 py-2 rounded-md ${
            activeTab === "browsers"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground"
          }`}
        >
          Tarayıcılar
        </button>
        <button
          onClick={() => setActiveTab("features")}
          className={`px-4 py-2 rounded-md ${
            activeTab === "features"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground"
          }`}
        >
          Özellikler
        </button>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={activeData}
            margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="name" angle={-45} textAnchor="end" />
            <YAxis domain={[0, 100]} label={{ value: activeTab === "browsers" ? "Anonimlik Skoru" : "Yüzde (%)", angle: -90, position: "insideLeft" }} />
            <Tooltip 
              formatter={(value) => [`${value}${activeTab === "browsers" ? " puan" : "%"}`, ""]}
              labelStyle={{ color: "#222" }}
            />
            <Legend />
            <Bar name="Sizin" dataKey="yours" fill="#10b981" />
            <Bar name="Ortalama" dataKey="average" fill="#6366f1" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
