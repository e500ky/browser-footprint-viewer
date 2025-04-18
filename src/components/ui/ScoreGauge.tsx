"use client";

import { anonymityScoreReference } from "@/lib/data-examples";
import { useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

type ScoreGaugeProps = {
  score: number;
  className?: string;
};

export function ScoreGauge({ score, className = "" }: ScoreGaugeProps) {
  // Animation için score'u 0'dan başlat ve gerçek score'a doğru animasyonla arttır
  const [animatedScore, setAnimatedScore] = useState(0);
  const [description, setDescription] = useState("");

  useEffect(() => {
    // Score'u 0'dan istenen değere animasyonla arttır
    let start = 0;
    const end = score;
    const duration = 1500; // milisaniye
    const increment = 1;
    const stepTime = Math.abs(Math.floor(duration / (end - start)));
    
    const timer = setInterval(() => {
      start += increment;
      setAnimatedScore(start);
      if (start >= end) {
        clearInterval(timer);
        setAnimatedScore(end);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [score]);
  
  useEffect(() => {
    // Score'a göre açıklamayı seç
    const reference = anonymityScoreReference.find(
      item => animatedScore >= item.range[0] && animatedScore <= item.range[1]
    );
    setDescription(reference ? reference.description : "");
  }, [animatedScore]);

  // Renk ve veriler
  let color = "#22c55e"; // Yeşil (iyi)
  if (score < 40) color = "#ef4444"; // Kırmızı (kötü)
  else if (score < 70) color = "#eab308"; // Sarı (orta)
  
  const data = [
    { name: "Score", value: animatedScore },
    { name: "Remaining", value: 100 - animatedScore },
  ];

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="relative w-full h-64 max-w-lg">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              startAngle={180}
              endAngle={0}
              innerRadius="60%"
              outerRadius="80%"
              paddingAngle={5}
              dataKey="value"
              stroke="none"
              cornerRadius={5}
            >
              <Cell key={`cell-0`} fill={color} />
              <Cell key={`cell-1`} fill="#2a2a2a" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <span className="text-5xl font-bold">{animatedScore}</span>
          <span className="text-lg text-muted-foreground">/100</span>
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <h3 className="text-xl font-medium mb-2">Anonimlik Skoru</h3>
        <p className="text-sm max-w-md text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
