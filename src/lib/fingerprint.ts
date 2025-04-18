// Tarayıcı parmak izi oluşturmak için gerekli tüm işlevler

// Canvas fingerprinting
export async function getCanvasFingerprint(): Promise<{hash: string, imageData: string}> {
  if (typeof document === 'undefined') {
    return { hash: '', imageData: '' };
  }
  
  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return { hash: '', imageData: '' };
    
    canvas.width = 200;
    canvas.height = 50;
    
    // Metin, renkler ve şekiller
    ctx.textBaseline = "top";
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0F0";
    ctx.fillText("Browser Fingerprint 👆", 4, 16);
    ctx.fillStyle = "#F00";
    ctx.fillRect(100, 30, 80, 10);
    ctx.beginPath();
    ctx.arc(50, 30, 10, 0, Math.PI * 2);
    ctx.fillStyle = "#00F";
    ctx.fill();
    
    // Canvas verisini hash için base64'e dönüştür
    const imageData = canvas.toDataURL();
    
    // Basit bir hash oluştur (gerçek uygulamada daha iyi bir hash algoritması kullanılmalı)
    const hash = await digestMessage(imageData);
    
    return { hash, imageData };
  } catch (e) {
    console.error("Canvas fingerprint oluşturulamadı:", e);
    return { hash: 'desteklenmiyor', imageData: '' };
  }
}

// WebGL bilgileri
export function getWebGLInfo(): { vendor: string; renderer: string; hash: string } {
  if (typeof document === 'undefined') {
    return { vendor: '', renderer: '', hash: '' };
  }
  
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    if (!gl) {
      return { vendor: 'WebGL desteklenmiyor', renderer: '', hash: '' };
    }
    
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    
    if (!debugInfo) {
      return { vendor: 'WEBGL_debug_renderer_info desteklenmiyor', renderer: '', hash: '' };
    }
    
    const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
    const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
    
    // WebGL parametrelerinden birkaçını hash için birleştir
    const parameters = [
      gl.getParameter(gl.ALPHA_BITS),
      gl.getParameter(gl.BLUE_BITS),
      gl.getParameter(gl.DEPTH_BITS),
      gl.getParameter(gl.GREEN_BITS),
      gl.getParameter(gl.RED_BITS),
      gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS),
      gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE),
      gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS),
      gl.getParameter(gl.MAX_RENDERBUFFER_SIZE),
      gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS),
      gl.getParameter(gl.MAX_TEXTURE_SIZE),
      gl.getParameter(gl.MAX_VARYING_VECTORS),
      gl.getParameter(gl.MAX_VERTEX_ATTRIBS),
      gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS),
      gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS),
      vendor,
      renderer
    ].join('|');
    
    return { vendor, renderer, hash: parameters };
  } catch (e) {
    console.error("WebGL bilgileri alınamadı:", e);
    return { vendor: 'Hata', renderer: 'Hata', hash: '' };
  }
}

// Audio fingerprinting
export async function getAudioFingerprint(): Promise<string> {
  if (typeof window === 'undefined') {
    return '';
  }
  
  try {
    if (!window.AudioContext && !(window as any).webkitAudioContext) {
      return 'AudioContext desteklenmiyor';
    }
    
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    const context = new AudioContext();
    
    // Osillatör oluştur
    const oscillator = context.createOscillator();
    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(500, context.currentTime);
    
    // Analyser düğümü
    const analyser = context.createAnalyser();
    analyser.fftSize = 64;
    
    // Compressor düğümü
    const compressor = context.createDynamicsCompressor();
    compressor.threshold.setValueAtTime(-50, context.currentTime);
    compressor.knee.setValueAtTime(40, context.currentTime);
    compressor.ratio.setValueAtTime(12, context.currentTime);
    compressor.attack.setValueAtTime(0, context.currentTime);
    compressor.release.setValueAtTime(0.25, context.currentTime);
    
    // Bağlantıları kur
    oscillator.connect(compressor);
    compressor.connect(analyser);
    analyser.connect(context.destination);
    
    // Osillatörü başlat ve 100ms sonra durdur
    oscillator.start(0);
    
    // 100ms bekle ve örnekleri al
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const dataArray = new Float32Array(analyser.frequencyBinCount);
    analyser.getFloatFrequencyData(dataArray);
    
    // Osillatörü durdur
    oscillator.stop();
    
    // Context'i kapat
    await context.close();
    
    // Verileri hash'e dönüştür
    return dataArray.slice(0, 15).join(',');
  } catch (e) {
    console.error("Audio fingerprint oluşturulamadı:", e);
    return 'Hata';
  }
}

// Font detection
export async function detectFonts(): Promise<string[]> {
  if (typeof document === 'undefined') {
    return [];
  }
  
  // Test edilecek fontların listesi
  const fontTestList = [
    'Arial', 'Arial Black', 'Arial Narrow', 'Calibri',
    'Cambria', 'Candara', 'Century Gothic', 'Comic Sans MS',
    'Consolas', 'Courier New', 'Georgia', 'Impact',
    'Lucida Console', 'Lucida Sans Unicode', 'Palatino Linotype',
    'Segoe UI', 'Tahoma', 'Times New Roman', 'Trebuchet MS',
    'Verdana', 'Helvetica', 'Helvetica Neue', 'Roboto'
  ];

  const h = 'mmmmmmmmmmlli';
  const m = 'fffffffffff';
  
  // Kıyaslama için referans fontlar
  const referenceFont = 'monospace';
  const referenceSansFont = 'sans-serif';
  
  const div = document.createElement('div');
  div.style.visibility = 'hidden';
  div.style.position = 'absolute';
  div.style.top = '-10000px';
  div.style.left = '-10000px';
  div.style.fontSize = '16px';
  
  document.body.appendChild(div);
  
  // Referans genişliklerin ölçülmesi
  div.style.fontFamily = referenceFont;
  div.innerText = h;
  const monoWidth = div.clientWidth;
  
  div.style.fontFamily = referenceSansFont;
  div.innerText = m;
  const sansWidth = div.clientWidth;
  
  // Tespit edilen fontlar
  const detectedFonts: string[] = [];
  
  // Her bir fontu test et
  fontTestList.forEach(font => {
    // Monospace font testi
    div.style.fontFamily = `'${font}', ${referenceFont}`;
    div.innerText = h;
    const testWidth = div.clientWidth;
    
    // Sans-serif font testi
    div.style.fontFamily = `'${font}', ${referenceSansFont}`;
    div.innerText = m;
    const testSansWidth = div.clientWidth;
    
    // Eğer genişlikler farklıysa, font yüklüdür
    if (testWidth !== monoWidth || testSansWidth !== sansWidth) {
      detectedFonts.push(font);
    }
  });
  
  document.body.removeChild(div);
  
  return detectedFonts;
}

// Batarya seviyesi ve şarj bilgisi
export async function getBatteryInfo(): Promise<{level: number, charging: boolean, chargingTime: number, dischargingTime: number} | null> {
  if (typeof navigator === 'undefined' || !('getBattery' in navigator)) {
    return null;
  }
  
  try {
    const battery = await (navigator as any).getBattery();
    return {
      level: battery.level * 100,
      charging: battery.charging,
      chargingTime: battery.chargingTime !== Infinity ? battery.chargingTime : 0,
      dischargingTime: battery.dischargingTime !== Infinity ? battery.dischargingTime : 0
    };
  } catch (e) {
    console.error("Batarya bilgileri alınamadı:", e);
    return null;
  }
}

// AdBlock tespit et
export async function detectAdblock(): Promise<boolean> {
  if (typeof document === 'undefined') {
    return false;
  }
  
  return new Promise(resolve => {
    const testDiv = document.createElement('div');
    testDiv.innerHTML = '&nbsp;';
    testDiv.className = 'adsbox pub_300x250';
    testDiv.style.cssText = 'position: absolute; top: -10px; left: -10px; width: 1px; height: 1px;';
    document.body.appendChild(testDiv);
    
    setTimeout(() => {
      const isBlocked = testDiv.offsetHeight === 0;
      if (testDiv.parentNode) {
        testDiv.parentNode.removeChild(testDiv);
      }
      resolve(isBlocked);
    }, 100);
  });
}

// Genel tarayıcı bilgileri
export function getBrowserInfo() {
  if (typeof navigator === 'undefined') {
    return {
      userAgent: '',
      appName: '',
      appVersion: '',
      platform: '',
      language: '',
      doNotTrack: '',
      cookieEnabled: false,
      timezone: '',
      timezoneOffset: 0,
      screenSize: { width: 0, height: 0 },
      colorDepth: 0,
      devicePixelRatio: 1
    };
  }
  
  return {
    userAgent: navigator.userAgent,
    appName: navigator.appName,
    appVersion: navigator.appVersion,
    platform: navigator.platform,
    language: navigator.language,
    doNotTrack: navigator.doNotTrack,
    cookieEnabled: navigator.cookieEnabled,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    timezoneOffset: new Date().getTimezoneOffset(),
    screenSize: {
      width: window.screen.width,
      height: window.screen.height
    },
    colorDepth: window.screen.colorDepth,
    devicePixelRatio: window.devicePixelRatio || 1
  };
}

// Mesaj hash'leme için yardımcı fonksiyon (Canvas ve diğer veriler için)
async function digestMessage(message: string): Promise<string> {
  if (typeof crypto === 'undefined' || !crypto.subtle || !crypto.subtle.digest) {
    // Crypto API desteklenmiyor, basit bir hash oluştur
    let hash = 0;
    for (let i = 0; i < message.length; i++) {
      const char = message.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // 32bit integer'a dönüştür
    }
    return hash.toString(16);
  }

  // Modern tarayıcılarda SubtleCrypto API kullan
  try {
    const msgUint8 = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  } catch (e) {
    console.error("Hash oluşturulamadı:", e);
    return 'hash-error';
  }
}

// Tüm parmak izi verilerini topla
export async function collectAllFingerprints() {
  // Browser temel bilgileri
  const browserInfo = getBrowserInfo();
  
  // Canvas parmak izi
  const canvasFingerprint = await getCanvasFingerprint();
  
  // WebGL bilgileri
  const webglInfo = getWebGLInfo();
  
  // Audio parmak izi
  const audioFingerprint = await getAudioFingerprint();
  
  // Font tespiti
  const fonts = await detectFonts();
  
  // Batarya bilgisi
  const batteryInfo = await getBatteryInfo();
  
  // AdBlock tespiti
  const hasAdBlocker = await detectAdblock();
  
  return {
    browserInfo,
    canvasFingerprint,
    webglInfo,
    audioFingerprint,
    fonts,
    batteryInfo,
    hasAdBlocker,
    timestamp: new Date().toISOString()
  };
}

// Anonimlik skoru hesapla - ne kadar yüksekse o kadar benzersizsin
export function calculateAnonymityScore(data: any): number {
  let score = 0;
  const totalPoints = 100;
  
  // Tarayıcı bilgileri
  if (data.browserInfo) {
    // DNT etkinse +10 puan (daha anonim)
    if (data.browserInfo.doNotTrack === "1" || data.browserInfo.doNotTrack === "yes") {
      score += 10;
    }
    
    // Yaygın olmayan bir platform kullanıyorsa -5 puan (daha benzersiz)
    if (!["Win32", "MacIntel", "Linux x86_64"].includes(data.browserInfo.platform)) {
      score -= 5;
    }
    
    // Standart dışı ekran çözünürlüğü -5 puan
    const { width, height } = data.browserInfo.screenSize;
    const commonResolutions = [
      [1920, 1080], [1366, 768], [1536, 864], [1440, 900], 
      [1280, 720], [2560, 1440], [3840, 2160]
    ];
    if (!commonResolutions.some(res => res[0] === width && res[1] === height)) {
      score -= 5;
    }
  }
  
  // Canvas parmak izi varsa -15 puan (daha benzersiz)
  if (data.canvasFingerprint && data.canvasFingerprint.hash) {
    score -= 15;
  }
  
  // WebGL bilgileri varsa -10 puan
  if (data.webglInfo && data.webglInfo.vendor && data.webglInfo.renderer) {
    score -= 10;
  }
  
  // Audio parmak izi varsa -10 puan
  if (data.audioFingerprint && data.audioFingerprint !== 'AudioContext desteklenmiyor' && data.audioFingerprint !== 'Hata') {
    score -= 10;
  }
  
  // Fontların sayısı - çok sayıda font daha benzersiz yapar
  if (data.fonts && data.fonts.length > 0) {
    // 10'dan fazla font tespit edildiğinde -10 puan
    score -= Math.min(10, Math.floor(data.fonts.length / 2));
  }
  
  // AdBlock varsa +5 puan (daha anonim)
  if (data.hasAdBlocker) {
    score += 5;
  }
  
  // Batarya API'si etkinse -5 puan
  if (data.batteryInfo) {
    score -= 5;
  }
  
  // Skoru 0-100 aralığında normalize et
  // Not: Düşük skor = daha benzersiz = daha az anonim
  // Yüksek skor = daha az benzersiz = daha anonim
  const normalizedScore = Math.max(0, Math.min(100, totalPoints + score));
  
  return Math.round(normalizedScore);
}
