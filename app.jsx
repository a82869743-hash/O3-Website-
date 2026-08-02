// ==========================================================================
// O3 Car-Spa — Master Application (Reordered Cinema Showcase & Redesigned FAQ)
// ==========================================================================

const { useState, useEffect, useRef } = React;

// 0. LUXURY PRELOADER OVERLAY WITH OFFICIAL O3 TAGLINE & TELEMETRY
function O3Preloader({ progress, isFinished }) {
  const getPhaseMessage = (p) => {
    if (p < 30) return "INITIALIZING HEPA CLEANROOM BAY...";
    if (p < 65) return "CALIBRATING 6500K SPECTROMETRY LIGHTS...";
    if (p < 90) return "SYNCHRONIZING 10H CERAMIC & PPF TELEMETRY...";
    return "WELCOME TO O3 CAR-SPA STUDIO — ANAND";
  };

  return (
    <div 
      className={`fixed inset-0 z-[99999] bg-[#05070c] flex flex-col items-center justify-center p-6 transition-all duration-700 select-none ${
        isFinished ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'
      }`}
    >
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(0,240,255,0.14)_0%,transparent_65%)] pointer-events-none"></div>

      <div className="relative z-10 max-w-md w-full text-center space-y-8">
        {/* Brand Official Logo with Pulsing Halo */}
        <div className="relative inline-block">
          <div className="absolute -inset-4 bg-[#00f0ff]/20 rounded-full blur-2xl animate-pulse"></div>
          <img src="assets/o3_official_logo.png" 
            alt="O3 CAR-SPA Official Studio Logo" 
            className="h-20 sm:h-24 w-auto mx-auto relative z-10 drop-shadow-[0_0_35px_rgba(0,240,255,0.7)]"
           loading="lazy" decoding="async" />
        </div>

        {/* Studio Official Tagline */}
        <div className="space-y-2">
          <span className="text-[11px] font-mono font-bold tracking-[0.3em] uppercase text-[#00f0ff] block">
            PREMIUM CAR DETAILING STUDIO
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Real Protection. Real Results.
          </h2>
          <p className="text-xs text-slate-400 font-mono">
            Vallabh Vidyanagar, Anand, Gujarat
          </p>
        </div>

        {/* Dynamic Progress Bar & Telemetry */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 font-bold">
            <span className="text-[#cae8e8] tracking-widest uppercase">{getPhaseMessage(progress)}</span>
            <span className="text-[#00f0ff] font-extrabold text-sm">{progress}%</span>
          </div>

          <div className="w-full h-2 bg-[#0d111a] rounded-full overflow-hidden border border-[#cae8e8]/25 p-0.5 shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-[#cae8e8] via-[#00f0ff] to-[#cae8e8] rounded-full transition-all duration-150 shadow-[0_0_15px_#00f0ff]"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Founder Signature Badge */}
        <div className="pt-2 text-[10px] font-mono text-slate-500">
          Craftsmanship Directed by <span className="text-emerald-400 font-semibold">Sharanpal Sodhi</span>
        </div>
      </div>
    </div>
  );
}

// 1. INTERACTIVE PAINT INSPECTION LIGHT GLOW VISUALIZER
function PaintGlowVisualizer() {
  const containerRef = useRef(null);
  const [coords, setCoords] = useState({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: -1000, y: -1000 });
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="glow-visualizer-container"
    >
      {/* Before Layer (Swirls) */}
      <img src="assets/o3_swirl_before.png" alt="Detailing Before Inspection" className="visualizer-base-swirls"  loading="lazy" decoding="async" />

      {/* After Layer (Flawless Ceramic Polish) */}
      <img src="assets/o3_swirl_after.png" 
        alt="Ceramic Mirror Polish" 
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          pointerEvents: 'none',
          clipPath: isHovered 
            ? `circle(150px at ${coords.x}px ${coords.y}px)` 
            : 'circle(0px at 0px 0px)'
        }}
       loading="lazy" decoding="async" />

      {/* Flashlight Inspection Beam & Lens Flare */}
      {isHovered && (
        <>
          <div 
            className="visualizer-flashlight-ring"
            style={{
              left: `${coords.x}px`,
              top: `${coords.y}px`
            }}
          ></div>
          <div 
            className="visualizer-lens-flare"
            style={{
              left: `${coords.x}px`,
              top: `${coords.y}px`
            }}
          ></div>
        </>
      )}

      {/* Overlay text description */}
      <div className="absolute bottom-4 left-6 z-20 text-[11px] font-mono text-[#cae8e8] bg-[#05070c]/85 border border-[#cae8e8]/30 px-3 py-1.5 rounded-full backdrop-blur-md pointer-events-none">
        🔍 Drag cursor inside container to scan with 6500K Inspection Light
      </div>
    </div>
  );
}

// 2. STUDIO HEPA CLIMATE CONTROL HUD
function CleanroomClimateHud() {
  const [metrics, setMetrics] = useState({
    temp: 21.8,
    humidity: 42.5,
    airPurity: 99.982
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => {
        const tempDelta = (Math.random() - 0.5) * 0.1;
        const humDelta = (Math.random() - 0.5) * 0.25;
        const airDelta = (Math.random() - 0.5) * 0.002;
        
        let nextTemp = parseFloat((prev.temp + tempDelta).toFixed(1));
        if (nextTemp < 21.2) nextTemp = 21.2;
        if (nextTemp > 22.4) nextTemp = 22.4;

        let nextHum = parseFloat((prev.humidity + humDelta).toFixed(1));
        if (nextHum < 40) nextHum = 40;
        if (nextHum > 45) nextHum = 45;

        let nextAir = parseFloat((prev.airPurity + airDelta).toFixed(3));
        if (nextAir < 99.975) nextAir = 99.975;
        if (nextAir > 99.995) nextAir = 99.995;

        return {
          temp: nextTemp,
          humidity: nextHum,
          airPurity: nextAir
        };
      });
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="cleanroom-hud-grid text-left font-mono">
      <div className="cleanroom-hud-card">
        <span className="text-[10px] text-slate-400 block uppercase mb-1">🏥 HEPA STATUS</span>
        <div className="flex items-center gap-2">
          <span className="hud-pulse-dot bg-emerald-400"></span>
          <strong className="text-white text-sm">ACTIVE</strong>
        </div>
      </div>
      <div className="cleanroom-hud-card">
        <span className="text-[10px] text-slate-400 block uppercase mb-1">🌡️ TEMPERATURE</span>
        <strong className="text-white text-base font-bold">{metrics.temp}°C</strong>
        <span className="text-[9px] text-[#cae8e8] block mt-0.5">Target: 22.0°C</span>
      </div>
      <div className="cleanroom-hud-card">
        <span className="text-[10px] text-slate-400 block uppercase mb-1">🌀 REL HUMIDITY</span>
        <strong className="text-white text-base font-bold">{metrics.humidity}%</strong>
        <span className="text-[9px] text-[#cae8e8] block mt-0.5">Limits: 40-45%</span>
      </div>
      <div className="cleanroom-hud-card">
        <span className="text-[10px] text-slate-400 block uppercase mb-1">🔬 AIR PURITY</span>
        <strong className="text-emerald-400 text-sm font-bold">{metrics.airPurity}%</strong>
        <span className="text-[9px] text-slate-500 block mt-0.5">HEPA Filter Grade</span>
      </div>
    </div>
  );
}

// 3. SMART TREATMENT CONFIGURATOR & ROI CALCULATOR
function TreatmentConfigurator({ onBookService }) {
  const [carType, setCarType] = useState('sedan');
  const [paintState, setPaintState] = useState('minor');

  const configData = {
    hatchback: {
      label: 'Hatchback / Compact',
      baseValue: 400000,
      factor: 1.0
    },
    sedan: {
      label: 'Sedan / Executive',
      baseValue: 800000,
      factor: 1.2
    },
    suv: {
      label: 'SUV / Luxury Offroad',
      baseValue: 1200000,
      factor: 1.4
    },
    supercar: {
      label: 'Exotic / Supercar',
      baseValue: 5000000,
      factor: 2.2
    }
  };

  const paintStateData = {
    new: {
      label: 'Pristine / Brand New',
      desc: 'Lock in factory gloss immediately before road damage occurs.',
      recommendation: 'Signature TPU Paint Protection Film (PPF)',
      costRange: '₹55,000 – ₹1,20,000',
      correctionPasses: 'Single-stage prep polish',
      valueRetention: '10 – 12%'
    },
    minor: {
      label: 'Minor Swirls & Scratches',
      desc: 'Light defects from washing. Requires refining to restore depth.',
      recommendation: '9H Silica Quartz Ceramic & Graphene Coating',
      costRange: '₹22,000 – ₹45,000',
      correctionPasses: '2-stage paint correction pass',
      valueRetention: '6 – 8%'
    },
    heavy: {
      label: 'Heavy Swirls & Oxidation',
      desc: 'Deep spiderwebbing & dull paint. Full restoration required.',
      recommendation: 'Paint Correction + Ceramic 9H Dual Shield',
      costRange: '₹35,000 – ₹65,000',
      correctionPasses: '3-stage micro-abrasive compounding pass',
      valueRetention: '8 – 10%'
    }
  };

  const currentConfig = paintStateData[paintState];
  const carFactor = configData[carType].factor;
  
  const baseCarVal = configData[carType].baseValue;
  const retentionPercent = parseFloat(currentConfig.valueRetention);
  const roiAmount = Math.round(baseCarVal * (retentionPercent / 100));

  return (
    <div className="glass-surface p-8 sm:p-12 border border-[#cae8e8]/30 bg-gradient-to-br from-[#0d111a] via-[#101726] to-[#05070c] space-y-8 shadow-2xl">
      <div className="border-b border-[#cae8e8]/20 pb-4 text-left">
        <span className="text-xs uppercase tracking-widest text-[#cae8e8] font-mono font-bold">Smart Treatment Configurator</span>
        <div className="overflow-hidden py-3">
          <h3 className="gsap-stagger-title text-2xl sm:text-3xl font-extrabold text-white">Select Your Vehicle Specs & Protection Goals</h3>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 text-left">
        {/* Controls */}
        <div className="lg:col-span-6 space-y-6">
          {/* Step 1: Vehicle Type */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase text-[#cae8e8] font-mono">1. Select Vehicle Segment</label>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(configData).map(([key, val]) => (
                <button
                  key={key}
                  onClick={() => setCarType(key)}
                  className={`p-3 text-xs font-bold transition-all text-left cockpit-tactile-btn ${
                    carType === key ? 'active' : ''
                  }`}
                >
                  {val.label}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Paint Condition */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase text-[#cae8e8] font-mono">2. Current Paint Surface State</label>
            <div className="space-y-2.5">
              {Object.entries(paintStateData).map(([key, val]) => (
                <button
                  key={key}
                  onClick={() => setPaintState(key)}
                  className={`w-full p-4 text-xs text-left transition-all block cockpit-tactile-btn ${
                    paintState === key ? 'active' : ''
                  }`}
                >
                  <div className="font-bold text-sm mb-0.5">{val.label}</div>
                  <div className={`text-[11px] font-normal ${paintState === key ? 'text-slate-200' : 'text-slate-400'}`}>{val.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Dashboard */}
        <div className="lg:col-span-6 flex flex-col justify-between bg-[#05070c] p-6 sm:p-8 rounded-3xl border border-[#cae8e8]/20 space-y-6">
          <div className="space-y-4">
            <div>
              <span className="text-[10px] text-[#cae8e8] font-mono uppercase block">Recommended Package</span>
              <strong className="text-white text-xl sm:text-2xl font-bold">{currentConfig.recommendation}</strong>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <span className="text-[10px] text-slate-400 font-mono block">Estimated Cost</span>
                <span className="text-white text-sm font-mono font-bold">{currentConfig.costRange}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-mono block">Required Prep</span>
                <span className="text-white text-sm font-bold">{currentConfig.correctionPasses}</span>
              </div>
            </div>

            {/* Resale Value Protection */}
            <div className="p-4 rounded-2xl bg-[#cae8e8]/5 border border-[#cae8e8]/15 space-y-1 mt-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-[#cae8e8] font-mono uppercase">Value Protection Retention</span>
                <span className="text-emerald-400 font-mono text-xs font-bold">+{currentConfig.valueRetention}</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Protects surface gloss & clear coat depth to maintain private resale value up to <strong className="text-white">₹{roiAmount.toLocaleString('en-IN')}</strong>.
              </p>
            </div>
          </div>

          <button 
            onClick={() => onBookService(`${configData[carType].label} - ${currentConfig.recommendation}`)}
            className="btn-primary text-xs w-full justify-center py-3.5"
          >
            Book Recommended Treatment
          </button>
        </div>
      </div>
    </div>
  );
}

// 4. DYNAMIC HYDROPHOBIC RAIN SHIELD PHYSICS CANVAS
function HydrophobicRainCanvas() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [mouse, setMouse] = useState({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      if (!containerRef.current) return;
      canvas.width = containerRef.current.clientWidth;
      canvas.height = containerRef.current.clientHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const drops = [];
    const maxDrops = 110;

    for (let i = 0; i < maxDrops; i++) {
      drops.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: 1 + Math.random() * 2,
        vy: 3 + Math.random() * 4,
        r: 2.5 + Math.random() * 3,
        alpha: 0.3 + Math.random() * 0.5
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = 'rgba(202, 232, 232, 0.06)';
      ctx.font = 'bold 12px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('⚡ 9H HYPER-HYDROPHOBIC BEADING MATRIX', canvas.width / 2, canvas.height / 2 - 10);
      ctx.fillText('MOVE CURSOR TO ACTIVATE HIGH-PRESSURE AIR DRYER', canvas.width / 2, canvas.height / 2 + 15);

      if (mouse.active) {
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 80, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.25)';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 8, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 240, 255, 0.4)';
        ctx.fill();
      }

      drops.forEach(drop => {
        if (mouse.active) {
          const dx = drop.x - mouse.x;
          const dy = drop.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const limit = 85;

          if (dist < limit) {
            const force = (limit - dist) / limit;
            const angle = Math.atan2(dy, dx);
            drop.vx += Math.cos(angle) * force * 3.5;
            drop.vy += Math.sin(angle) * force * 3.5;
            drop.r = Math.max(1.8, drop.r - 0.15);
          }
        }

        drop.x += drop.vx;
        drop.y += drop.vy;

        drop.vx *= 0.95;
        drop.vy = drop.vy * 0.95 + (3 + Math.random() * 0.5) * 0.05;
        if (drop.r < 3.5) drop.r += 0.04;

        ctx.beginPath();
        ctx.arc(drop.x, drop.y, drop.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(202, 232, 232, ${drop.alpha})`;
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(drop.x - drop.r * 0.3, drop.y - drop.r * 0.3, drop.r * 0.25, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.fill();

        if (drop.y > canvas.height || drop.x > canvas.width) {
          drop.y = -10;
          drop.x = Math.random() * canvas.width;
          drop.vx = 1 + Math.random() * 1.5;
          drop.vy = 3 + Math.random() * 4;
          drop.r = 2.5 + Math.random() * 3;
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mouse]);

  const handleMouseMove = (e) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    setMouse({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true
    });
  };

  const handleMouseLeave = () => {
    setMouse({ x: -1000, y: -1000, active: false });
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="hydrophobic-canvas-container"
    >
      <canvas ref={canvasRef} className="hydrophobic-rain-canvas"></canvas>
    </div>
  );
}

// 5. VEHICLE STUDIO CONFIGURATOR (PAINT & CALIPER SWAPS)
function VehicleStudioConfigurator() {
  const [paintColor, setPaintColor] = useState('#fbfcf7');
  const [paintFinish, setPaintFinish] = useState('satin');
  const [caliperColor, setCaliperColor] = useState('#ff2e2e');

  const paints = [
    { name: 'English White (Rolls)', color: '#fbfcf7', finish: 'satin', img: 'assets/o3_rolls_royce.png' },
    { name: 'Metallic Ocean Cyan', color: '#00f0ff', finish: 'metallic', img: 'assets/o3_rolls_royce_cyan.png' },
    { name: 'Matte Vantablack', color: '#090d16', finish: 'matte', img: 'assets/o3_rolls_royce_black.png' },
    { name: 'Lustrous Gold Leaf', color: '#d4af37', finish: 'metallic', img: 'assets/o3_rolls_royce_gold.png' }
  ];

  const calipers = [
    { name: 'Brembo Crimson Accent', color: '#ff2e2e' },
    { name: 'Acid Caliper Green', color: '#39ff14' },
    { name: 'Ceramic Safety Yellow', color: '#ffcc00' }
  ];

  const activePaint = paints.find(p => p.color === paintColor) || paints[0];

  return (
    <div className="glass-surface p-6 sm:p-8 border border-[#cae8e8]/25 bg-[#0d111a] space-y-6">
      <div className="border-b border-[#cae8e8]/15 pb-4 text-left">
        <span className="text-xs uppercase tracking-widest text-[#cae8e8] font-mono font-bold">Studio Color Configurator</span>
        <div className="overflow-hidden py-3">
          <h3 className="gsap-stagger-title text-xl font-bold text-white mt-1">Car-Spa Paint & Caliper Aesthetic Studio</h3>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-center text-left">
        {/* Visualizer Canvas */}
        <div className="lg:col-span-7 car-vector-canvas relative p-0 overflow-hidden">
          <div className="car-reflection-shimmer z-10"></div>
          
          <img src={activePaint.img} 
            alt={`Rolls-Royce Ghost in ${activePaint.name}`} 
            className="w-full h-full object-cover transition-all duration-700 opacity-90"
           loading="lazy" decoding="async" />

          {/* Bottom Ambient Vignette to keep card contrast premium */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#05070c] via-transparent to-transparent pointer-events-none z-10"></div>

          <span className="absolute top-3 right-3 text-[9px] font-mono bg-[#05070c]/85 border border-[#cae8e8]/20 px-2.5 py-1 rounded-full text-slate-400 capitalize z-20">
            Finish: {paintFinish}
          </span>
        </div>

        {/* Customizer Controllers */}
        <div className="lg:col-span-5 space-y-5">
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-slate-400 block uppercase font-bold">1. Select Body Finish</span>
            <div className="grid grid-cols-2 gap-2">
              {paints.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => { setPaintColor(p.color); setPaintFinish(p.finish); }}
                  className={`p-2.5 flex items-center gap-2.5 transition-all cockpit-tactile-btn ${
                    paintColor === p.color ? 'active' : ''
                  }`}
                >
                  <span className="w-3.5 h-3.5 rounded-full border border-white/20" style={{ backgroundColor: p.color }}></span>
                  <span className="truncate">{p.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-mono text-slate-400 block uppercase font-bold">2. Select Brake Caliper Accent</span>
            <div className="flex flex-col gap-2">
              {calipers.map((c, idx) => (
                <button
                  key={idx}
                  onClick={() => setCaliperColor(c.color)}
                  className={`w-full p-2.5 flex items-center justify-between transition-all cockpit-tactile-btn ${
                    caliperColor === c.color ? 'active' : ''
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: c.color }}></span>
                    <span>{c.name}</span>
                  </span>
                  <span className="font-mono text-[9px] text-[#cae8e8]">Active</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 6. PAINT THICKNESS TELEMETRY HOTSPOTS
function PaintThicknessHotspots() {
  const [activeHotspot, setActiveHotspot] = useState('hood');

  const hotspots = {
    hood: {
      label: 'Engine Hood Panel (Mercedes-Benz)',
      x: '22%',
      y: '54%',
      thickness: '124 µm',
      composition: {
        substrate: 'Aluminum Alloy',
        primer: '42 µm',
        basecoat: '68 µm',
        clearcoat: '11.5 µm',
        ceramic: '2.5 µm (9H Graphene Matrix)'
      },
      verdict: 'Optimal depth. AMG aluminum panel prepared for coating.'
    },
    door: {
      label: 'Front Passenger Door (Mercedes-Benz)',
      x: '52%',
      y: '60%',
      thickness: '116 µm',
      composition: {
        substrate: 'Galvanized High-Strength Steel',
        primer: '35 µm',
        basecoat: '62 µm',
        clearcoat: '16.2 µm',
        ceramic: '2.8 µm (SiO2 Quartz Shield)'
      },
      verdict: 'Refining complete. Micro-reflections calibrated at 98.4%.'
    },
    roof: {
      label: 'Mercedes Panoramic Sunroof Arch',
      x: '58%',
      y: '32%',
      thickness: '98 µm',
      composition: {
        substrate: 'Tempered Glass & Composite Frame',
        primer: '20 µm',
        basecoat: '60 µm',
        clearcoat: '15.5 µm',
        ceramic: '2.5 µm (Satin TPU Self-Heal Film)'
      },
      verdict: 'Glass-panel transition. Finished with hydrophobic ceramic shield.'
    },
    fender: {
      label: 'Mercedes-Benz Rear Fender Flaring',
      x: '82%',
      y: '58%',
      thickness: '132 µm',
      composition: {
        substrate: 'Composite Sheet Molding (SMC)',
        primer: '48 µm',
        basecoat: '68 µm',
        clearcoat: '13.2 µm',
        ceramic: '2.8 µm (9H Ceramic Shield)'
      },
      verdict: 'Heavy factory clearcoat. Fully COMPOUNDED and corrected.'
    }
  };

  const currentData = hotspots[activeHotspot];

  return (
    <div className="glass-surface p-6 sm:p-8 border border-[#cae8e8]/25 bg-[#0d111a] space-y-6">
      <div className="border-b border-[#cae8e8]/15 pb-4 text-left">
        <span className="text-xs uppercase tracking-widest text-[#cae8e8] font-mono font-bold">Paint Thickness Telemetry</span>
        <div className="overflow-hidden py-3">
          <h3 className="gsap-stagger-title text-xl font-bold text-white mt-1">Inspection Depth Gauge Hotspots</h3>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-center text-left">
        {/* Blueprint diagram */}
        <div className="lg:col-span-7 telemetry-car-outline relative p-0 overflow-hidden">
          <img src="assets/o3_mercedes_amg.png" 
            alt="Mercedes-Benz AMG C63 Coupe Studio Shot" 
            className="w-full h-full object-cover opacity-85 transition-all hover:scale-[1.01]" 
           loading="lazy" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05070c] via-transparent to-transparent pointer-events-none"></div>

          {Object.entries(hotspots).map(([key, val]) => (
            <button
              key={key}
              onClick={() => setActiveHotspot(key)}
              className={`telemetry-hotspot ${activeHotspot === key ? 'active' : ''}`}
              style={{ left: val.x, top: val.y }}
              title={`Scan ${val.label}`}
            ></button>
          ))}
        </div>

        {/* Telemetry Display */}
        <div className="lg:col-span-5 bg-[#05070c] p-5 rounded-2xl border border-slate-800 space-y-4 font-mono text-xs text-slate-300">
          <div>
            <span className="text-[10px] text-slate-400 uppercase">Selected Panel</span>
            <div className="text-white font-bold text-sm mt-0.5">{currentData.label}</div>
          </div>

          <div className="grid grid-cols-2 gap-3 pb-2 border-b border-slate-800">
            <div>
              <span className="text-[10px] text-slate-400 block">Total Thickness</span>
              <strong className="text-emerald-400 text-sm font-bold">{currentData.thickness}</strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Clear Coat Layer</span>
              <strong className="text-white text-sm font-bold">{currentData.composition.clearcoat}</strong>
            </div>
          </div>

          <div className="space-y-1.5 pt-1">
            <span className="text-[10px] text-[#cae8e8] block font-bold">LAYER SPECIFICATION:</span>
            <div className="flex justify-between text-[11px]">
              <span className="text-slate-400">Substrate:</span>
              <span className="text-white">{currentData.composition.substrate}</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-slate-400">Primer Coating:</span>
              <span className="text-white">{currentData.composition.primer}</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-slate-400">Base Coat Color:</span>
              <span className="text-white">{currentData.composition.basecoat}</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-slate-[#cae8e8]">Ceramic Quartz Guard:</span>
              <span className="text-emerald-400 font-bold">{currentData.composition.ceramic}</span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[10px] text-slate-400 mt-2">
            <strong className="text-white uppercase block mb-0.5">Verdict:</strong>
            {currentData.verdict}
          </div>
        </div>
      </div>
    </div>
  );
}

// 7. PAINT MICRO-SCRATCH REPAIR SIMULATOR
function PaintScratchHealSimulator() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [coords, setCoords] = useState({ x: -1000, y: -1000 });
  const [isPolishing, setIsPolishing] = useState(false);
  const [heat, setHeat] = useState(22);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      if (!containerRef.current) return;
      canvas.width = containerRef.current.clientWidth;
      canvas.height = containerRef.current.clientHeight;
      drawScratches();
    };

    const drawScratches = () => {
      ctx.fillStyle = '#1c2430';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < 40; i++) {
        ctx.beginPath();
        ctx.arc(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          40 + Math.random() * 80,
          0,
          Math.PI * 2
        );
        ctx.stroke();
      }

      ctx.strokeStyle = 'rgba(235, 240, 245, 0.45)';
      ctx.lineWidth = 1.2;
      for (let i = 0; i < 6; i++) {
        ctx.beginPath();
        ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.stroke();
      }
    };

    resize();
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  useEffect(() => {
    let timer;
    if (isPolishing) {
      timer = setInterval(() => {
        setHeat(prev => Math.min(48, prev + 2));
      }, 150);
    } else {
      timer = setInterval(() => {
        setHeat(prev => Math.max(22, prev - 1));
      }, 200);
    }
    return () => clearInterval(timer);
  }, [isPolishing]);

  const handleMouseMove = (e) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });
    setIsPolishing(true);

    const ctx = canvasRef.current.getContext('2d');
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 45, 0, Math.PI * 2);
    ctx.fill();
  };

  const handleMouseLeave = () => {
    setIsPolishing(false);
    setCoords({ x: -1000, y: -1000 });
  };

  return (
    <div className="glass-surface p-6 sm:p-8 border border-[#cae8e8]/25 bg-[#0d111a] space-y-6">
      <div className="border-b border-[#cae8e8]/15 pb-4 text-left">
        <span className="text-xs uppercase tracking-widest text-[#cae8e8] font-mono font-bold">Inspection & Correction</span>
        <div className="overflow-hidden py-3">
          <h3 className="gsap-stagger-title text-xl font-bold text-white mt-1">Paint Micro-Scratch Repair Simulator</h3>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-center text-left">
        {/* Simulator Area */}
        <div className="lg:col-span-7 relative">
          <div 
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="scratch-simulator-container"
          >
            <img src="assets/o3_swirl_after.png" alt="Corrected Paint Underneath" className="scratch-bg-swirls"  loading="lazy" decoding="async" />
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block"></canvas>

            {isPolishing && (
              <div 
                className="scratch-orbital-pad" 
                style={{ left: `${coords.x}px`, top: `${coords.y}px` }}
              ></div>
            )}

            <div className="scratch-heat-meter">
              🌡️ FRICTION HEAT: <strong className={heat > 40 ? 'text-red-400' : 'text-[#cae8e8]'}>{heat}°C</strong>
            </div>
          </div>
        </div>

        {/* Informative Telemetry Panel */}
        <div className="lg:col-span-5 bg-[#05070c] p-5 rounded-2xl border border-slate-800 space-y-4 font-mono text-xs text-slate-300">
          <div>
            <span className="text-[10px] text-slate-400 uppercase">Process Description</span>
            <div className="text-white font-bold text-sm mt-0.5">Dual-Action Orbital Paint Correction</div>
          </div>

          <p className="text-[11px] leading-relaxed text-slate-400">
            Drag your cursor over the panel to run our <strong>O3 Dual-Action orbital cutting pad</strong>. Friction heat heats the clearcoat matrix, leveling out microscopic swirls and deep scratches to reveal a flawless mirror surface.
          </p>

          <div className="space-y-1.5 pt-2 border-t border-slate-800">
            <span className="text-[10px] text-[#cae8e8] block font-bold">SIMULATION METRICS:</span>
            <div className="flex justify-between">
              <span className="text-slate-400">Pad speed:</span>
              <span className="text-white">4,800 OPM (Orbit/Min)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Heat threshold:</span>
              <span className="text-emerald-400 font-bold">52°C max safe limit</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Polish compound:</span>
              <span className="text-white">Fine Diminishing Alumina</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 8. GLOSS TELEMETRY CHART
function GlossTelemetryChart() {
  const [activeStage, setActiveStage] = useState(3);
  const chartRef = useRef(null);

  const stages = [
    { label: 'Raw Factory Swirls', gloss: 62, color: '#ff2e2e', data: [45, 52, 58, 62] },
    { label: 'Chemical Clay Prep', gloss: 78, color: '#ffcc00', data: [45, 58, 70, 78] },
    { label: '2-Stage Cutting Pass', gloss: 92, color: '#00f0ff', data: [45, 62, 82, 92] },
    { label: 'O3 Dual Ceramic Quartz', gloss: 99.8, color: '#10b981', data: [45, 68, 88, 99.8] }
  ];

  const current = stages[activeStage];

  useEffect(() => {
    const canvas = chartRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const points = current.data;
    const padding = 30;
    const w = canvas.width - padding * 2;
    const h = canvas.height - padding * 2;

    ctx.strokeStyle = 'rgba(202, 232, 232, 0.08)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = padding + (h / 4) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(canvas.width - padding, y);
      ctx.stroke();
    }

    ctx.strokeStyle = current.color;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    points.forEach((pt, idx) => {
      const x = padding + (w / (points.length - 1)) * idx;
      const y = padding + h - (h * (pt / 100));
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    points.forEach((pt, idx) => {
      const x = padding + (w / (points.length - 1)) * idx;
      const y = padding + h - (h * (pt / 100));
      
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.strokeStyle = current.color;
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.font = '9px monospace';
      ctx.fillText(`${pt} GU`, x - 12, y - 10);
    });

  }, [activeStage]);

  return (
    <div className="glass-surface p-6 sm:p-8 border border-[#cae8e8]/25 bg-[#0d111a] space-y-6">
      <div className="border-b border-[#cae8e8]/15 pb-4 text-left">
        <span className="text-xs uppercase tracking-widest text-[#cae8e8] font-mono font-bold">Reflection Quality</span>
        <div className="overflow-hidden py-3">
          <h3 className="gsap-stagger-title text-xl font-bold text-white mt-1">Gloss Unit (GU) Reflection Curve</h3>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-center text-left">
        {/* Plot Graph Canvas */}
        <div className="lg:col-span-7 bg-[#05070c] p-5 rounded-3xl border border-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Chart */}
            <div className="md:col-span-8">
              <span className="text-[9px] font-mono text-slate-500 block mb-1">GLOSS PROGRESSION CURVE (GU)</span>
              <canvas ref={chartRef} width="280" height="150" className="w-full block"></canvas>
            </div>
            
            {/* Speedometer Gauge */}
            <div className="md:col-span-4 flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-slate-800 pt-3 md:pt-0 md:pl-4">
              <span className="text-[9px] font-mono text-slate-500 block mb-2 text-center">HUD REFLECTION DIAL</span>
              <div className="relative w-28 h-28 flex items-center justify-center">
                <svg width="112" height="112" viewBox="0 0 100 100" className="overflow-visible">
                  <circle cx="50" cy="50" r="45" stroke="rgba(202, 232, 232, 0.08)" strokeWidth="6" fill="none" />
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="45" 
                    stroke={current.color} 
                    strokeWidth="3.5" 
                    strokeDasharray="210" 
                    strokeDashoffset={210 - (210 * current.gloss) / 100} 
                    strokeLinecap="round" 
                    fill="none" 
                    transform="rotate(135 50 50)" 
                    style={{ transition: 'stroke-dashoffset 0.8s ease-out, stroke 0.4s' }}
                  />
                  <circle cx="50" cy="50" r="5" fill="#ffffff" />
                  <line 
                    x1="50" 
                    y1="50" 
                    x2="50" 
                    y2="15" 
                    stroke="#ff2e2e" 
                    strokeWidth="2.5" 
                    strokeLinecap="round"
                    style={{
                      transform: `rotate(${-120 + current.gloss * 2.4}deg)`,
                      transformOrigin: '50px 50px',
                      transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  />
                </svg>
                <div className="absolute bottom-3 text-center">
                  <div className="text-[14px] font-mono font-bold text-white leading-none">{current.gloss}</div>
                  <div className="text-[7px] font-mono text-slate-500 uppercase tracking-widest mt-0.5">GU UNITS</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Controls */}
        <div className="lg:col-span-5 space-y-4">
          <span className="text-[10px] font-mono text-slate-400 block uppercase font-bold">Select Detailing Phase</span>
          <div className="flex flex-col gap-2.5">
            {stages.map((st, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStage(idx)}
                className={`w-full p-3 flex items-center justify-between transition-all cockpit-tactile-btn ${
                  activeStage === idx ? 'active' : ''
                }`}
              >
                <span>{st.label}</span>
                <strong style={{ color: st.color }}>{st.gloss} GU</strong>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// 8A. LUXURY CAR BEFORE & AFTER SHOWCASE (EXTERIOR, INTERIOR, PAINT WORK)
function LuxuryCarBeforeAfterShowcase() {
  const [activeTab, setActiveTab] = useState('exterior'); // 'exterior' | 'interior' | 'paint'
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const showcaseData = {
    exterior: {
      title: "Exterior Detailing & PPF Shield",
      car: "Rolls-Royce Ghost Flagship",
      beforeLabel: "Factory Weathered & Raw Surface",
      afterLabel: "10H Ceramic Quartz & PPF Shield",
      beforeImg: "assets/o3_ext_before.png",
      afterImg: "assets/o3_ext_after.png",
      description: "Complete surface decontamination, multi-stage paint correction, and ultra-hydrophobic 10H Ceramic Coating combined with Opti-Armor self-healing Paint Protection Film.",
      specs: [
        { label: "GLOSS RATING", value: "99.8 GU (Mirror Finish)" },
        { label: "PROTECTION", value: "Self-Healing 10H Ceramic PPF" },
        { label: "HYDROPHOBIC", value: "115° Water Contact Angle" }
      ]
    },
    interior: {
      title: "Interior Studio Transformation",
      car: "Rolls-Royce Starlight Cabin",
      beforeLabel: "Weathered Leather & Faded Trim",
      afterLabel: "Restored Cognac Hide & Starlight Ceiling",
      beforeImg: "assets/o3_int_before.png",
      afterImg: "assets/o3_int_after.png",
      description: "Deep hide steam extraction, Swiss leather matte sealant, open-pore timber rejuvenation, and custom 6500K optical fiber starlight headliner installation.",
      specs: [
        { label: "LEATHER STATE", value: "Matte OEM Factory Finish" },
        { label: "CEILING AMBIENCE", value: "Fiber-Optic Starlight Matrix" },
        { label: "AIR PURITY", value: "HEPA Sanitized 99.98%" }
      ]
    },
    paint: {
      title: "Paint Correction & Defect Removal",
      car: "6500K LED Inspection Bay",
      beforeLabel: "Micro-Swirls & Spiderweb Scratches",
      afterLabel: "100% Defect-Free Level 3 Polish",
      beforeImg: "assets/o3_swirl_before.png",
      afterImg: "assets/o3_swirl_after.png",
      description: "Level 3 multi-stage rotary & dual-action micro-abrasive polishing eliminates 99.8% of swirl marks, clearcoat holograms, oxidation, and buffer trails.",
      specs: [
        { label: "DEFECT ELIMINATION", value: "99.8% Swirl & Scratch Free" },
        { label: "REFLECTION DEPTH", value: "Molecular Flat Mirror Leveling" },
        { label: "CLEARCOAT MEASURE", value: "Safe Micro-Measurement Precision" }
      ]
    }
  };

  const currentData = showcaseData[activeTab];

  const updateSlider = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPos(percentage);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    updateSlider(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      updateSlider(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      updateSlider(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  return (
    <div className="glass-surface p-6 sm:p-8 border border-[#cae8e8]/25 bg-[#0d111a] space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#cae8e8]/15 pb-4 gap-4 text-left">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#cae8e8] font-mono font-bold">Bespoke Studio Transformation</span>
          <h3 className="gsap-stagger-title text-xl sm:text-2xl font-bold text-white mt-1">Interactive Before & After Showcase</h3>
        </div>

        {/* 3 Interactive Category Tabs */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => { setActiveTab('exterior'); setSliderPos(50); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cockpit-tactile-btn ${
              activeTab === 'exterior' ? 'active text-[#00f0ff]' : 'text-slate-300 hover:text-white'
            }`}
          >
            🏎️ Exterior Detailing & PPF
          </button>
          <button
            onClick={() => { setActiveTab('interior'); setSliderPos(50); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cockpit-tactile-btn ${
              activeTab === 'interior' ? 'active text-[#00f0ff]' : 'text-slate-300 hover:text-white'
            }`}
          >
            💺 Interior Studio Cabin
          </button>
          <button
            onClick={() => { setActiveTab('paint'); setSliderPos(50); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cockpit-tactile-btn ${
              activeTab === 'paint' ? 'active text-[#00f0ff]' : 'text-slate-300 hover:text-white'
            }`}
          >
            ✨ Paint Work & Polish
          </button>
        </div>
      </div>

      {/* Main Interactive Slider Stage */}
      <div className="space-y-4">
        <div 
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchMove={handleTouchMove}
          className="relative w-full h-[340px] sm:h-[440px] rounded-3xl overflow-hidden cursor-ew-resize select-none border border-[#cae8e8]/20 bg-[#05070c] shadow-2xl"
        >
          {/* AFTER Image Layer (Full Base) */}
          <img src={currentData.afterImg} 
            alt={`After ${currentData.title}`} 
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
           loading="lazy" decoding="async" />

          {/* BEFORE Image Layer (Clipped overlay) */}
          <div 
            className="absolute inset-0 overflow-hidden pointer-events-none"
            style={{ width: `${sliderPos}%` }}
          >
            <img src={currentData.beforeImg} 
              alt={`Before ${currentData.title}`} 
              className="absolute inset-0 w-full h-full object-cover max-w-none"
              style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
             loading="lazy" decoding="async" />
          </div>

          {/* Vertical Slider Handle Line */}
          <div 
            className="absolute top-0 bottom-0 z-20 pointer-events-none flex flex-col items-center justify-center"
            style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
          >
            <div className="w-0.5 h-full bg-[#00f0ff] shadow-[0_0_12px_#00f0ff]"></div>
            <div className="absolute w-10 h-10 rounded-full bg-[#05070c] border-2 border-[#00f0ff] flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.7)] text-[#00f0ff] text-xs font-mono font-bold">
              ◀▶
            </div>
          </div>

          {/* Dynamic Badges */}
          <div className="absolute top-4 left-4 z-20 pointer-events-none">
            <span className="px-3 py-1.5 rounded-full text-[10px] font-mono font-bold bg-[#05070c]/85 border border-red-500/40 text-red-300 backdrop-blur-md shadow-lg">
              ⚠️ BEFORE: {currentData.beforeLabel}
            </span>
          </div>

          <div className="absolute top-4 right-4 z-20 pointer-events-none">
            <span className="px-3 py-1.5 rounded-full text-[10px] font-mono font-bold bg-[#05070c]/85 border border-[#00f0ff]/50 text-[#00f0ff] backdrop-blur-md shadow-lg shadow-[0_0_15px_rgba(0,240,255,0.3)]">
              ✨ AFTER: {currentData.afterLabel}
            </span>
          </div>

          {/* Hint Overlay at bottom */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
            <span className="px-4 py-1.5 rounded-full text-[10px] font-mono text-[#cae8e8] bg-[#05070c]/90 border border-[#cae8e8]/30 backdrop-blur-md">
              👈 Drag slider to compare Before & After details 👉
            </span>
          </div>
        </div>

        {/* Spec Data Cards for Selected Category */}
        <div className="grid sm:grid-cols-3 gap-4 text-left">
          {currentData.specs.map((spec, i) => (
            <div key={i} className="bg-[#05070c] p-4 rounded-2xl border border-slate-800 space-y-1 font-mono">
              <span className="text-[10px] text-slate-400 block uppercase font-bold">{spec.label}</span>
              <span className="text-xs sm:text-sm text-[#00f0ff] font-bold block">{spec.value}</span>
            </div>
          ))}
        </div>

        <p className="text-xs text-slate-300 font-light leading-relaxed text-left bg-[#05070c]/60 p-4 rounded-2xl border border-[#cae8e8]/15 font-mono">
          <strong className="text-white block mb-1">STUDIO TRANSFORMATION ANALYSIS ({currentData.car}):</strong>
          {currentData.description}
        </p>
      </div>
    </div>
  );
}

// 8B. INTERACTIVE DETAILING WORKFLOW TIMELINE
function DetailingWorkflowTimeline() {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      id: 0,
      phase: '01',
      title: 'Chemical Clay Prep',
      duration: '2.5 Hours',
      tools: 'Clay bar & Iron Decontaminator',
      compound: 'O3 pH-neutral foam & fallout remover',
      impact: '+1.2% reflection depth',
      desc: 'Deep chemical decontamination wash to extract metallic fallout, brake dust, and environmental pollutants, restoring a smooth, clean paint surface.'
    },
    {
      id: 1,
      phase: '02',
      title: 'Paint Surface Correction',
      duration: '6.0 Hours',
      tools: 'Rupes Dual-Action Orbital Polisher',
      compound: 'Diminishing alumina cutting cream',
      impact: '+4.5% clarity level',
      desc: 'Dual-stage orbital cutting and finishing pass. Micro-abrasive crystals level the clearcoat matrix to erase 95%+ of surface swirls, restoring optical clarity.'
    },
    {
      id: 2,
      phase: '03',
      title: 'Quartz Base Coat Layer',
      duration: '3.0 Hours',
      tools: 'Suede applicator pad & buffer wipe',
      compound: 'Liquid SiO2 Glass Sol-Gel Compound',
      impact: '9H crystalline hardness',
      desc: 'Manual lay-down of our ultra-dense ceramic base coat. The quartz formula bonds chemically with the clearcoat, forming a durable, highly protective layer.'
    },
    {
      id: 3,
      phase: '04',
      title: 'Top Quartz Graphene Shield',
      duration: '2.0 Hours',
      tools: 'Soft microfiber finishing buffer',
      compound: 'Fluorinated graphene quartz matrix',
      impact: '115° water contact angle',
      desc: 'Application of the graphene composite top coat. This step creates a slick, hydrophobic barrier that repels water beads and blocks UV paint fading.'
    },
    {
      id: 4,
      phase: '05',
      title: 'IR Curing Chamber Bake',
      duration: '1.5 Hours',
      tools: 'Short-wave infrared curing lamps',
      compound: '80°C heat wave polymerization',
      impact: 'Locks molecular structure',
      desc: 'Accelerated thermal baking in our cleanroom. Short-wave IR heat triggers complete polymerization of the ceramic matrix in just 90 minutes instead of days.'
    }
  ];

  const current = steps[activeStep];

  return (
    <div className="glass-surface p-6 sm:p-8 border border-[#cae8e8]/25 bg-[#0d111a] space-y-6">
      <div className="border-b border-[#cae8e8]/15 pb-4 text-left">
        <span className="text-xs uppercase tracking-widest text-[#cae8e8] font-mono font-bold">Detailing Procedure</span>
        <div className="overflow-hidden py-3">
          <h3 className="gsap-stagger-title text-xl font-bold text-white mt-1">O3 Detailing Studio Step-by-Step Flow</h3>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 text-left">
        {/* Timeline trigger list (Grid 7) */}
        <div className="lg:col-span-7">
          <div className="workflow-timeline-wrapper">
            {steps.map((step) => (
              <div 
                key={step.id} 
                onClick={() => setActiveStep(step.id)}
                className={`workflow-step cursor-pointer group select-none ${
                  activeStep === step.id ? 'active' : ''
                }`}
              >
                <div className="workflow-node"></div>
                <div className="flex justify-between items-center pr-4">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono text-[#cae8e8]/60 block font-bold">PHASE {step.phase}</span>
                    <h4 className={`text-[15px] font-bold transition-colors ${
                      activeStep === step.id ? 'text-white' : 'text-slate-400 group-hover:text-slate-300'
                    }`}>
                      {step.title}
                    </h4>
                  </div>
                  <span className={`text-[10px] font-mono border px-2 py-0.5 rounded transition-all ${
                    activeStep === step.id 
                      ? 'border-cyan-400/40 text-cyan-400 bg-cyan-400/5' 
                      : 'border-slate-800 text-slate-500'
                  }`}>
                    {step.duration}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step details dashboard (Grid 5) */}
        <div className="lg:col-span-5 bg-[#05070c] p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-[11px] text-slate-300 flex flex-col justify-between">
          <div className="space-y-3.5">
            <div>
              <span className="text-[9px] text-slate-400 uppercase">Interactive Detailing Phase Details</span>
              <div className="text-white font-bold text-sm mt-0.5">{current.title}</div>
            </div>
            
            <p className="text-[11px] text-slate-400 leading-relaxed font-sans">{current.desc}</p>
          </div>

          <div className="space-y-1.5 pt-4 border-t border-slate-800">
            <span className="text-[9px] text-[#cae8e8] block font-bold uppercase">PROCESS TELEMETRY:</span>
            <div className="flex justify-between">
              <span className="text-slate-500">Equipment:</span>
              <span className="text-white truncate max-w-[150px]">{current.tools}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Compound:</span>
              <span className="text-white truncate max-w-[150px]">{current.compound}</span>
            </div>
            <div className="flex justify-between pt-1 border-t border-slate-900 mt-1">
              <span className="text-slate-500">Value locked:</span>
              <span className="text-emerald-400 font-bold">{current.impact}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 9. ROLLS-ROYCE INTERIOR STARLIGHT CUSTOMIZER
function StarlightCabinCustomizer() {
  const [color, setColor] = useState('#ffffff');
  const [density, setDensity] = useState(60);
  const [stars, setStars] = useState([]);
  const [shootingStar, setShootingStar] = useState(null);

  useEffect(() => {
    const newStars = [];
    for (let i = 0; i < 110; i++) {
      newStars.push({
        x: 5 + Math.random() * 90,
        y: 5 + Math.random() * 90,
        size: 1.2 + Math.random() * 2.2,
        delay: Math.random() * 4,
        speed: 1.5 + Math.random() * 2
      });
    }
    setStars(newStars);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.6) {
        setShootingStar({
          x: Math.random() * 50,
          y: Math.random() * 40,
          id: Date.now()
        });
        setTimeout(() => {
          setShootingStar(null);
        }, 1200);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const colorPresets = [
    { name: 'Pure White Constellation', val: '#ffffff', glow: 'rgba(255, 255, 255, 0.8)' },
    { name: 'Aurora Ice Cyan', val: '#00f0ff', glow: 'rgba(0, 240, 255, 0.8)' },
    { name: 'Sunset Amber Glow', val: '#ffcc00', glow: 'rgba(255, 204, 0, 0.8)' }
  ];

  return (
    <div className="glass-surface p-6 sm:p-8 border border-[#cae8e8]/25 bg-[#0d111a] space-y-6">
      <div className="border-b border-[#cae8e8]/15 pb-4 text-left">
        <span className="text-xs uppercase tracking-widest text-[#cae8e8] font-mono font-bold">Cabin Ambience</span>
        <div className="overflow-hidden py-3">
          <h3 className="gsap-stagger-title text-xl font-bold text-white mt-1">Rolls-Royce Interior Starlight Customizer</h3>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-center text-left">
        {/* Starlight Roof Canopy View */}
        <div className="lg:col-span-7 cabin-headliner-container relative p-0">
          <img src="assets/o3_rolls_royce_cabin.png" 
            alt="Rolls-Royce Starlight Cabin Roof View" 
            className="w-full h-full object-cover opacity-80"
           loading="lazy" decoding="async" />
          <div className="absolute inset-0 bg-[#05070c]/20 pointer-events-none"></div>
          
          {/* Static stars overlay */}
          {stars.slice(0, density).map((star, idx) => (
            <div
              key={idx}
              className="starlight-dot"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                backgroundColor: color,
                boxShadow: `0 0 8px 1.5px ${color}`,
                opacity: 0.3 + Math.abs(Math.sin(Date.now() / 1000 + star.delay)) * 0.7,
                animation: `pulse-star ${2 + star.delay}s infinite alternate`
              }}
            ></div>
          ))}

          {/* Dynamic Shooting Star sweep */}
          {shootingStar && (
            <div
              key={shootingStar.id}
              className="absolute pointer-events-none"
              style={{
                left: `${shootingStar.x}%`,
                top: `${shootingStar.y}%`,
                width: '120px',
                height: '2px',
                background: `linear-gradient(to right, ${color}, transparent)`,
                transform: 'rotate(25deg)',
                transformOrigin: 'left center',
                animation: 'shooting-sweep 1.2s linear forwards',
                boxShadow: `0 0 8px ${color}`
              }}
            ></div>
          )}

          <span className="absolute bottom-3 left-4 text-[9px] font-mono text-slate-400 uppercase tracking-widest z-20">
            Rolls-Royce Cabin Ceiling Panoramic Customizer
          </span>
        </div>

        {/* Ambient controls */}
        <div className="lg:col-span-5 space-y-5">
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-slate-400 block uppercase font-bold">1. Select Ambience Tone</span>
            <div className="flex flex-col gap-2">
              {colorPresets.map((c, idx) => (
                <button
                  key={idx}
                  onClick={() => setColor(c.val)}
                  className={`w-full p-2.5 flex items-center gap-2.5 transition-all cockpit-tactile-btn ${
                    color === c.val ? 'active' : ''
                  }`}
                >
                  <span className="w-3.5 h-3.5 rounded-full border border-white/20" style={{ backgroundColor: c.val, boxShadow: `0 0 8px ${c.val}` }}></span>
                  <span>{c.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-mono text-slate-400 font-bold uppercase">
              <span>2. Starlight Density</span>
              <span className="text-white">{density} Stars</span>
            </div>
            <input
              type="range"
              min="20"
              max="110"
              step="10"
              value={density}
              onChange={(e) => setDensity(Number(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// 12. OFFICIAL O3 CAR-SPA STUDIO TARIFF & PRICE CATALOG (EXACT OFFICIAL PRICE LIST)
function OfficialTariffMenu() {
  const [activeCategory, setActiveCategory] = useState('all');

  const tariffCategories = [
    { id: 'all', name: 'All Official Services' },
    { id: 'wash', name: 'Washing & Care' },
    { id: 'protection', name: 'Color Protection & Treatments' },
    { id: 'ceramic', name: 'Ceramic Coating' },
    { id: 'graphene', name: 'Graphene Coating' },
    { id: 'ppf', name: 'Paint Protection Film (PPF)' },
    { id: 'maintenance', name: 'Maintenance Coatings' },
    { id: 'packages', name: 'Special Washing Subscriptions' },
    { id: 'anti-rust', name: 'Anti-Rust Underbody' }
  ];

  const priceData = [
    // SERVICES
    { cat: 'wash', name: 'Exterior Wash + Shampoo & Vacuum', price: '₹ 500', note: 'Complete exterior snow foam wash & interior vacuuming' },
    { cat: 'wash', name: 'Intensive Shiny Interior', price: '₹ 2,500', note: 'Deep interior extraction, dashboard & leather dressing' },
    { cat: 'wash', name: 'Ozone Treatment & Odour Removal', price: '₹ 800', note: 'O3 cabin sanitization & bacteria elimination' },
    { cat: 'wash', name: 'Leather Care Treatment*', price: '₹ 800', note: 'Nourishing leather conditioner & UV shield' },
    { cat: 'wash', name: 'Head Light Restoration', price: '₹ 1,200', note: 'Oxidation removal & UV clear seal' },

    // COLOR PROTECTION & COATING TREATMENT
    { cat: 'protection', name: 'Rodent Repellant Coating', price: '₹ 1,200', note: 'Engine bay wire & pipe rodent protection' },
    { cat: 'protection', name: 'Engine Coating', price: '₹ 3,000', note: 'Degreasing, thermal bay dressing & electrical seal' },
    { cat: 'protection', name: 'Alloy Wheel Coating', price: '₹ 3,500', note: 'Brake dust repellent & heat-resistant silica layer' },
    { cat: 'protection', name: 'Windshield Coating', price: '₹ 3,000', note: 'Rain repellent & night glare hydrophobic shield' },
    { cat: 'protection', name: 'Leather Shield', price: '₹ 6,000', note: 'Hydrophobic & stain barrier for leather seats' },
    { cat: 'protection', name: 'Fabric Shield', price: '₹ 6,000', note: 'Liquid repellent barrier for fabric upholstery' },
    { cat: 'protection', name: 'Trim Shield', price: '₹ 4,000', note: 'Restores plastic cladding & prevents UV fading' },
    { cat: 'protection', name: 'Machine Polish & Wax', price: '₹ 2,000', note: 'Single-stage gloss enhancement & carnauba wax' },
    { cat: 'protection', name: 'Compounding Hi-tech Wax (2 Steps)', price: '₹ 3,500', note: 'Swirl mark reduction & high-gloss sealant' },
    { cat: 'protection', name: 'O3 Coating (3 Steps)', price: '₹ 7,000', note: '3-stage paint leveling & deep gloss conservation' },

    // CERAMIC COATING
    { cat: 'ceramic', name: '1 Year - Ceramic Shield', price: '₹ 12,000', note: '9H SiO2 Hydrophobic Glass Coating' },
    { cat: 'ceramic', name: '2 Years - Ceramic Shield', price: '₹ 14,000', note: '9H SiO2 Hydrophobic Glass Coating' },
    { cat: 'ceramic', name: '3 Years - Ceramic Shield', price: '₹ 20,000', note: '9H SiO2 Hydrophobic Glass Coating' },
    { cat: 'ceramic', name: '5 Years - Ceramic Shield', price: '₹ 30,000', note: '9H SiO2 Hydrophobic Glass Coating' },
    { cat: 'ceramic', name: '2 YEARS - Ceramic Shield (1 CoatCare)', price: '₹ 25,000', note: 'Includes 1 Free Maintenance CoatCare Service' },
    { cat: 'ceramic', name: '3 YEARS - Ceramic Shield (2 CoatCare)', price: '₹ 35,000', note: 'Includes 2 Free Maintenance CoatCare Services' },
    { cat: 'ceramic', name: '5 YEARS - Ceramic Shield (4 CoatCare)', price: '₹ 40,000', note: 'Includes 4 Free Maintenance CoatCare Services' },

    // GRAPHENE COATING
    { cat: 'graphene', name: '2 YEARS - Graphene Armor', price: '₹ 18,000', note: 'Reduced Water Spotting & Enhanced Hardness' },
    { cat: 'graphene', name: '3 YEARS - Graphene Armor', price: '₹ 22,000', note: 'Reduced Water Spotting & Enhanced Hardness' },
    { cat: 'graphene', name: '5 YEARS - Graphene Armor', price: '₹ 30,000', note: 'Reduced Water Spotting & Enhanced Hardness' },
    { cat: 'graphene', name: '2 YEARS - Graphene Armor (1 CoatCare)', price: '₹ 28,000', note: 'Includes 1 Free Maintenance CoatCare Service' },
    { cat: 'graphene', name: '3 YEARS - Graphene Armor (2 CoatCare)', price: '₹ 40,000', note: 'Includes 2 Free Maintenance CoatCare Services' },
    { cat: 'graphene', name: '5 YEARS - Graphene Armor (4 CoatCare)', price: '₹ 45,000', note: 'Includes 4 Free Maintenance CoatCare Services' },

    // PPF - PAINT PROTECTION FILM
    { cat: 'ppf', name: 'PPF 3 Years - CLEAR (TPH - Thermoplastic Hybrid)', price: '₹ 70,000', note: 'Clear Self-Healing Protective Film' },
    { cat: 'ppf', name: 'PPF 5 Years - CLEAR (TPH - Thermoplastic Hybrid)', price: '₹ 90,000', note: 'Clear Self-Healing Protective Film' },
    { cat: 'ppf', name: 'PPF 5 Years - GLOSS (TPU - Thermoplastic Polyurethane)', price: '₹ 1,30,000', note: 'Premium Optical Grade Self-Healing Film' },
    { cat: 'ppf', name: 'PPF 7 Years - GLOSS (TPU - Thermoplastic Polyurethane)', price: '₹ 1,50,000', note: 'Flagship Optical Grade Self-Healing Film' },
    { cat: 'ppf', name: 'PPF 3 Years - MATT (TPH - Thermoplastic Hybrid)', price: '₹ 80,000', note: 'Stealth Satin Finish Self-Healing Film' },
    { cat: 'ppf', name: 'PPF 5 Years - MATT (TPU - Thermoplastic Polyurethane)', price: '₹ 1,50,000', note: 'Stealth Satin Finish Self-Healing Film' },
    { cat: 'ppf', name: 'PPF 7 Years - MATT (TPU - Thermoplastic Polyurethane)', price: '₹ 1,80,000', note: 'Flagship Satin Finish Self-Healing Film' },
    { cat: 'ppf', name: 'PPF 3 Years - BLACK (TPH - Thermoplastic Hybrid)', price: '₹ 80,000', note: 'Gloss Black Roof & Accent Film' },
    { cat: 'ppf', name: 'PPF 5 Years - BLACK (TPH - Thermoplastic Hybrid)', price: '₹ 1,50,000', note: 'Gloss Black Roof & Accent Film' },
    { cat: 'ppf', name: 'PPF 7 Years - BLACK (TPU - Thermoplastic Polyurethane)', price: '₹ 1,80,000', note: 'Flagship Black TPU Protection Film' },
    { cat: 'ppf', name: 'PPF 3 Years - COLOR (TPH - Thermoplastic Hybrid)', price: '₹ 1,50,000', note: 'Colored Custom Wrap Protection Film' },

    // MAINTENANCE COATING
    { cat: 'maintenance', name: 'Maintenance Coating - 1 Time', price: '₹ 1,500', note: 'Quick Top-Up Hydrophobic Boost' },
    { cat: 'maintenance', name: 'Ceramic Maintenance - 1 Time', price: '₹ 8,000', note: 'Complete Decontamination & Ceramic Re-Load' },
    { cat: 'maintenance', name: 'Graphene Maintenance - 1 Time', price: '₹ 9,000', note: 'Complete Decontamination & Graphene Re-Load' },

    // SPECIAL WASHING OFFER RATE
    { cat: 'packages', name: '12 Washes For 12 Months', price: '₹ 4,200', note: 'Monthly Detailing Snow Foam Wash Package' },
    { cat: 'packages', name: '24 Washes For 24 Months', price: '₹ 8,400', note: 'Bi-Monthly Detailing Snow Foam Wash Package' },
    { cat: 'packages', name: '36 Washes For 36 Months', price: '₹ 12,500', note: '3-Year VIP Detailing Wash Package' },
    { cat: 'packages', name: '60 Washes For 60 Months', price: '₹ 21,000', note: '5-Year VIP Unlimited Detailing Wash Package' },

    // ANTI RUST UNDER SHIELD
    { cat: 'anti-rust', name: 'O3 Undershield Body Coating (2 Years)', price: '₹ 3,500', note: 'Heavy-Duty Rubberized Anti-Rust Chassis Coating' }
  ];

  const filteredData = activeCategory === 'all' 
    ? priceData 
    : priceData.filter(item => item.cat === activeCategory);

  return (
    <div className="glass-surface p-6 sm:p-10 border border-[#cae8e8]/30 bg-[#0a0e17] space-y-8 shadow-2xl rounded-3xl">
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#cae8e8]/20 pb-4 gap-4 text-left">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#00f0ff] font-mono font-bold">Official Studio Price List & Tariff Card</span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-1">O3 Car-Spa Official Services Menu</h2>
          <p className="text-xs text-slate-400 font-mono mt-1">Transparent fixed pricing · Managed by Mr. Sharanpalsingh Sodhi · Vitthal Udyognagar, Anand</p>
        </div>

        <a 
          href="https://wa.me/917225030303?text=Hello%20Sharanpalsingh%20Sir!%20I%20want%20to%20book%20a%20detailing%20service%20from%20the%20official%20price%20list." 
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary text-xs !py-3 !px-6 flex items-center gap-2"
        >
          <span>💬 Book via WhatsApp (72250 30303)</span>
        </a>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {tariffCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cockpit-tactile-btn ${
              activeCategory === cat.id ? 'active text-[#00f0ff]' : 'text-slate-300 hover:text-[#00f0ff]'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Price Table Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
        {filteredData.map((item, idx) => (
          <div key={idx} className="bg-[#05070c] p-5 rounded-2xl border border-slate-800 hover:border-[#cae8e8]/40 transition-all flex flex-col justify-between space-y-3 group">
            <div className="space-y-1">
              <div className="flex items-start justify-between gap-2">
                <h4 className="text-sm font-bold text-white group-hover:text-[#00f0ff] transition-colors">{item.name}</h4>
              </div>
              <p className="text-[11px] text-slate-400 font-light leading-relaxed">{item.note}</p>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-base font-extrabold text-[#00f0ff] font-mono">{item.price}</span>
              <a 
                href={`https://wa.me/917225030303?text=Hello%20Sharanpalsingh%20Sir!%20I%20want%20to%20inquire%20about:%20${encodeURIComponent(item.name)}%20(${item.price})`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-mono text-[#cae8e8] hover:underline font-bold"
              >
                Inquire Service →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  const [currentView, setCurrentView] = useState('home');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedBookingService, setSelectedBookingService] = useState('');
  const [isFranchiseModalOpen, setIsFranchiseModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Fast Preloader Calibration Timer
  useEffect(() => {
    let curr = 0;
    const timer = setInterval(() => {
      curr += Math.floor(Math.random() * 25) + 20;
      if (curr >= 100) {
        curr = 100;
        setLoadProgress(100);
        clearInterval(timer);
        setTimeout(() => {
          setIsLoading(false);
        }, 100);
      } else {
        setLoadProgress(curr);
      }
    }, 35);
    return () => clearInterval(timer);
  }, []);

  // Active Video in 3D Cinema Showcase
  const [activeCinemaVideo, setActiveCinemaVideo] = useState(0);

  // Selected Service for In-Depth Detail Modal
  const [activeServiceDetail, setActiveServiceDetail] = useState(null);
  const [serviceCategory, setServiceCategory] = useState('all');

  // FAQ Accordion
  const [expandedFaq, setExpandedFaq] = useState(0);
  const [productCategory, setProductCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [galleryCategory, setGalleryCategory] = useState('all');
  const [lightboxMedia, setLightboxMedia] = useState(null);

  // Before/After Slider Position
  const [sliderPos, setSliderPos] = useState(50);
  const isDraggingRef = useRef(false);

  const canvasRef = useRef(null);

  // THE 6 WORKSPACE MP4 VIDEOS DATABASE
  const videoGalleryData = [
    {
      id: 0,
      title: 'O3 Car-Spa Official Cinematic Detailing Showcase',
      tagline: 'Flagship Detailing Production & Surface Conservation',
      src: 'assets/hero_section.mp4',
      badge: '🌟 Flagship Hero Video',
      desc: 'Official 4K cinematic presentation of O3 Car-Spa studio craftsmanship directed by Founder Mr. Sharanpal Sodhi.'
    },
    {
      id: 1,
      title: 'Porsche Detailing Studio Bay — High-Tech Hexagonal Cleanroom',
      tagline: 'Controlled Environment Paint Prep & Multi-Stage Polish on Porsche',
      src: 'assets/porsche_studio_bay_video.mp4',
      badge: '🏎️ Porsche Studio Bay',
      desc: 'Inside the O3 Car-Spa controlled cleanroom bay — master technicians executing precision compounding on a Porsche under color-calibrated daylight LEDs.'
    },
    {
      id: 2,
      title: 'Porsche 911 Ceramic Inspection by Founder Sharanpal Sir',
      tagline: '13+ Years Master Craftsmanship on Porsche 911 Hood',
      src: 'assets/sikh_man_video.mp4',
      badge: '🎥 Founder Inspection',
      desc: 'Mr. Sharanpal Sodhi (Sharanpal Sir) inspecting molecular ceramic quartz gloss on a Porsche 911 hood using Scangrip LED daylight rigging.'
    },
    {
      id: 3,
      title: 'BMW M2 Competition Pressure Wash & Decontamination',
      tagline: 'High-Pressure Snow Foam Bath & Wheel Barrel Detailing',
      src: 'assets/bmw_m2_video.mp4',
      badge: '🏎️ BMW M2 Studio Prep',
      desc: 'Watch our studio team perform high-pressure snow foam wash, underbody flush, and grit-free paint decontamination on a BMW M2 Competition.'
    },
    {
      id: 4,
      title: 'Sports Car Detailing Team Inside Studio Bay',
      tagline: 'Hexagonal LED Cleanroom Lighting & Multi-Stage Polish',
      src: 'assets/sports_car_video.mp4',
      badge: '🏢 Cleanroom Bay',
      desc: 'Inside the O3 Car-Spa controlled cleanroom bay — master technicians executing multi-stage Rupes compounding on exotic sports cars.'
    },
    {
      id: 5,
      title: 'Master Technician Applying 9H Liquid Ceramic Coating',
      tagline: 'Precision Suede Applicator Pass & Rainbow Flash Pattern',
      src: 'assets/worker_applying_video.mp4',
      badge: '✨ Coating Precision',
      desc: 'Macro perspective of precision ceramic coating hand-application showing cross-hatch leveling and hydrophobic silica bonding.'
    }
,
    {
      id: 6,
      title: 'Mercedes-AMG Paint Protection Film (PPF) Masterwork',
      tagline: 'Precision Edge-Tucked Self-Healing TPU PPF Application on Mercedes-AMG',
      src: 'assets/mercedes_ppf_video.mp4',
      badge: '🛡️ Mercedes PPF Showcase',
      desc: 'Exclusive high-definition studio showcase of optical TPU self-healing film hand-applied on Mercedes-AMG panels.'
    }
  ];

  // 47 EXHAUSTIVE INTERACTIVE OFFICIAL SERVICES DATABASE
  const allServicesData = [
  {
    "id": "wash-vacuum",
    "title": "Exterior Wash + Shampoo & Vacuum",
    "category": "Washing & Quick Care",
    "price": "\u20b9 500",
    "icon": "\ud83d\udebf",
    "tagline": "Complete Exterior Snow Foam Wash & Interior Vacuuming",
    "summary": "Multi-stage safe wash procedure using high-pressure foam cannons, grit-guard wash mitts, wheel arch cleaning, and full interior cabin vacuuming.",
    "img": "assets/gallery/35_44_services_design_extra_services_also_mentioned_17_cute_wash_design.jpg",
    "warranty": "Cleanliness Guarantee",
    "durability": "Per Wash",
    "equipment": "K\u00e4rcher High-Pressure Washer, Snow Foam Lance, Industrial Vacuum",
    "procedure": [
      "Phase 1: High-pressure water pre-rinse removing surface grit",
      "Phase 2: Thick pH-neutral snow foam bath dwell time",
      "Phase 3: Scratch-free two-bucket microfiber mitt pass",
      "Phase 4: High-power interior cabin, carpet & boot vacuuming",
      "Phase 5: Streak-free microfiber drying & glass cleaning"
    ],
    "maintenance": "Recommended weekly or after long highway drives."
  },
  {
    "id": "shiny-interior",
    "title": "Intensive Shiny Interior Detailing",
    "category": "Washing & Quick Care",
    "price": "\u20b9 2,500",
    "icon": "\ud83e\ude91",
    "tagline": "Deep Interior Extraction, Dashboard & Leather Dressing",
    "summary": "Deep interior sanitization treatment extracting ground-in dirt from carpets, upholstery, dashboard seams, and door trims using hot steam & specialized leather dressings.",
    "img": "assets/o3_int_after.png",
    "warranty": "Sanitization Certificate",
    "durability": "6 Months Cleanliness",
    "equipment": "Hot Water Extractor, Dry Steam Vapor Machine, Leather Care Balms",
    "procedure": [
      "Phase 1: Deep vacuum extraction of carpets, seats & trunk",
      "Phase 2: 140\u00b0C dry steam vapor cleaning of AC vents & seams",
      "Phase 3: Fabric shampoo stain extraction",
      "Phase 4: pH-balanced leather scrub & rich conditioner pass",
      "Phase 5: Non-greasy matte UV protection dressing on dashboard"
    ],
    "maintenance": "Vacuum monthly and apply leather conditioner every 3 months."
  },
  {
    "id": "ozone-treatment",
    "title": "Ozone Treatment & Odour Removal",
    "category": "Washing & Quick Care",
    "price": "\u20b9 800",
    "icon": "\ud83c\udf00",
    "tagline": "O3 Cabin Sanitization & Bacteria Elimination",
    "summary": "High-output O3 ozone gas flooding that oxidizes and destroys airborne bacteria, mold spores, smoke smells, and persistent cabin odors.",
    "img": "assets/o3_equipment_lab.png",
    "warranty": "99.9% Bacteria Free",
    "durability": "3 \u2013 6 Months",
    "equipment": "High-Output O3 Ozone Generator, HEPA Cabin Recirculation Unit",
    "procedure": [
      "Phase 1: Cabin sealing & AC system set to full internal recirculation",
      "Phase 2: 20-minute active O3 ozone gas generator cycle inside closed cabin",
      "Phase 3: Breakdown of odor molecules & biological contaminants",
      "Phase 4: 10-minute fresh air ventilation purge"
    ],
    "maintenance": "Perform after rain or once every 6 months."
  },
  {
    "id": "leather-care",
    "title": "Leather Care Treatment",
    "category": "Washing & Quick Care",
    "price": "\u20b9 800",
    "icon": "\ud83d\udcbc",
    "tagline": "Nourishing Leather Conditioner & UV Shield",
    "summary": "Specialized leather cleansing and oil-nourishing treatment that restores natural suppleness, prevents cracking, and shields against sun UV fading.",
    "img": "assets/product_interior_leather.png",
    "warranty": "Supple Finish Guarantee",
    "durability": "3 \u2013 4 Months",
    "equipment": "Soft Horsehair Brushes, Ma-Fra Italian Leather Care Cream",
    "procedure": [
      "Phase 1: Gentle horsehair brush scrubbing removing pore dirt",
      "Phase 2: Damp microfiber residue wipe",
      "Phase 3: Hand application of natural Aloe Vera enriched leather cream",
      "Phase 4: Buffing to natural non-slippery satin shine"
    ],
    "maintenance": "Avoid harsh chemical wipes on leather surfaces."
  },
  {
    "id": "headlight-restoration",
    "title": "Head Light Restoration & UV Seal",
    "category": "Washing & Quick Care",
    "price": "\u20b9 1,200",
    "icon": "\ud83d\udca1",
    "tagline": "Oxidation Removal & UV Clear Sealant",
    "summary": "Multi-stage wet sanding and micro-compounding technique that permanently strips yellow oxidation and haze from polycarbonate headlight lenses.",
    "img": "assets/o3_studio_environment.png",
    "warranty": "1 Year Clarity Warranty",
    "durability": "12 Months",
    "equipment": "2000/3000 Grit Wet Sanding Discs, Rotary Polisher, UV Clear Sealant",
    "procedure": [
      "Phase 1: Masking surrounding paintwork with protective tape",
      "Phase 2: Multi-grade wet sanding stripping yellowed outer layer",
      "Phase 3: Micro-abrasive compound polishing to crystal clarity",
      "Phase 4: Application of UV ceramic clear coat barrier"
    ],
    "maintenance": "Wash with mild shampoo; avoid dry wiping headlights."
  },
  {
    "id": "rodent-repellant",
    "title": "Rodent Repellant Coating",
    "category": "Color Protection & Treatments",
    "price": "\u20b9 1,200",
    "icon": "\ud83d\udc00",
    "tagline": "Engine Bay Wire & Pipe Rodent Protection",
    "summary": "Heavy-duty heat-resistant bitter spray formulation applied to engine bay wiring harnesses, rubber hoses, and cables to prevent rodent chewing damage.",
    "img": "assets/o3_coating_worker.png",
    "warranty": "6 Months Rodent Shield",
    "durability": "6 Months",
    "equipment": "High-Temp Bitter Polymer Coating, Engine Bay Prep Washer",
    "procedure": [
      "Phase 1: Engine bay degreasing and dust removal",
      "Phase 2: Compressed air drying of electrical connectors",
      "Phase 3: High-temp bitter repellant spray across wires, hoses & insulation",
      "Phase 4: Inspection and curing check"
    ],
    "maintenance": "Re-apply every 6 months or after engine bay pressure washing."
  },
  {
    "id": "engine-coating",
    "title": "Engine Coating & Thermal Dressing",
    "category": "Color Protection & Treatments",
    "price": "\u20b9 3,000",
    "icon": "\u2699\ufe0f",
    "tagline": "Degreasing, Thermal Bay Dressing & Electrical Seal",
    "summary": "Complete engine bay steam restoration and heat-resistant protective clear lacquer application that keeps plastic covers, hoses, and metal components looking showroom new.",
    "img": "assets/o3_coating_worker.png",
    "warranty": "1 Year Bay Shield",
    "durability": "12 Months",
    "equipment": "Steam Jet Cleaner, W\u00fcrth German Heat Lacquer",
    "procedure": [
      "Phase 1: Heavy oil & sludge steam degreasing",
      "Phase 2: Compressed air moisture removal",
      "Phase 3: Application of heat-resistant, non-sticky clear engine lacquer spray",
      "Phase 4: Plastic cover & hose dressing"
    ],
    "maintenance": "Wipe down engine cover with damp cloth during routine washes."
  },
  {
    "id": "alloy-coating",
    "title": "Alloy Wheel Coating (Heat-Resistant 9H)",
    "category": "Color Protection & Treatments",
    "price": "\u20b9 3,500",
    "icon": "\ud83d\udede",
    "tagline": "Brake Dust Repellent & Heat-Resistant Silica Layer",
    "summary": "Ultra-high temperature 9H quartz ceramic coating engineered to withstand 800\u00b0C brake temperatures, preventing corrosive brake dust etching into alloy rims.",
    "img": "assets/product_tools_accessories.png",
    "warranty": "2 Years Rim Guard",
    "durability": "2 Years",
    "equipment": "Iron Fallout Chemical Remover, 800\u00b0C Heat Quartz Coating",
    "procedure": [
      "Phase 1: Iron chemical fallout decontamination wash",
      "Phase 2: Alloy barrel claying & alcohol wipe",
      "Phase 3: Precision hand wipe of heat-resistant 9H ceramic coating on spokes & inner barrel",
      "Phase 4: IR lamp curing pass"
    ],
    "maintenance": "Rinse wheels with water; brake dust slides off effortlessly without acid cleaners."
  },
  {
    "id": "windshield-coating",
    "title": "Windshield Hydrophobic Coating",
    "category": "Color Protection & Treatments",
    "price": "\u20b9 3,000",
    "icon": "\ud83c\udf27\ufe0f",
    "tagline": "Rain Repellent & Night Glare Hydrophobic Shield",
    "summary": "Fluoropolymer glass coating that chemically bonds to glass, allowing rainwater to bead and fly off at speeds above 40 km/h for dramatically improved night rain visibility.",
    "img": "assets/o3_studio_environment.png",
    "warranty": "1 Year Warranty",
    "durability": "12 Months",
    "equipment": "Cerium Oxide Glass Polish, Kisho Japanese Fluorine Glass Shield",
    "procedure": [
      "Phase 1: Cerium oxide rotary glass polishing eliminating wiper haze & water spots",
      "Phase 2: Isopropyl alcohol degreasing wipe",
      "Phase 3: Kisho Japanese glass hydrophobic shield hand wipe",
      "Phase 4: Curing and buffing to optical transparency"
    ],
    "maintenance": "Clean wiper blades with damp cloth regularly."
  },
  {
    "id": "leather-shield",
    "title": "Leather Shield Coating",
    "category": "Color Protection & Treatments",
    "price": "\u20b9 6,000",
    "icon": "\ud83d\udecb\ufe0f",
    "tagline": "Hydrophobic & Stain Barrier for Leather Seats",
    "summary": "Advanced breathable ceramic coating formulated for genuine leather seats that prevents liquid penetration, UV fading, and dye transfer from blue jeans.",
    "img": "assets/product_interior_leather.png",
    "warranty": "2 Years Warranty",
    "durability": "2 Years",
    "equipment": "Nanotechnology Leather Coating, Micro Suede Applicators",
    "procedure": [
      "Phase 1: Leather deep cleaning & pore decontamination",
      "Phase 2: Solvent residue wipe",
      "Phase 3: Layering breathable ceramic leather coating across all seat bolsters & headrests",
      "Phase 4: Natural matte finish curing"
    ],
    "maintenance": "Wipe spills immediately with dry microfiber towel."
  },
  {
    "id": "fabric-shield",
    "title": "Fabric Shield Upholstery Guard",
    "category": "Color Protection & Treatments",
    "price": "\u20b9 6,000",
    "icon": "\ud83e\uddf5",
    "tagline": "Liquid Repellent Barrier for Fabric Upholstery",
    "summary": "Hydrophobic textile barrier coating that coats individual fabric fibers, causing coffee, soda, and water spills to bead up on top of seats without soaking in.",
    "img": "assets/o3_int_after.png",
    "warranty": "2 Years Warranty",
    "durability": "2 Years",
    "equipment": "Nano-Textile Spray Coating, Thermal Curing Guns",
    "procedure": [
      "Phase 1: Fabric shampoo extraction wash & 100% moisture removal",
      "Phase 2: Fiber-penetrating hydrophobic spray coating pass",
      "Phase 3: Thermal curing creating invisible liquid spill-proof barrier"
    ],
    "maintenance": "Blot liquid spills with dry paper towel or microfiber cloth."
  },
  {
    "id": "trim-shield",
    "title": "Trim Shield Plastic UV Restorer",
    "category": "Color Protection & Treatments",
    "price": "\u20b9 4,000",
    "icon": "\ud83d\udda4",
    "tagline": "Restores Plastic Cladding & Prevents UV Fading",
    "summary": "Permanent plastic restoration ceramic coating that penetrates deep into oxidized unpainted exterior trim and bumpers, restoring rich dark matte color with 2-year UV defense.",
    "img": "assets/product_exterior_care.png",
    "warranty": "2 Years Warranty",
    "durability": "2 Years",
    "equipment": "Trim Restorer Coating, Suede Applicator Blocks",
    "procedure": [
      "Phase 1: Plastic cladding deep degreasing",
      "Phase 2: Restorative dark pigment bonding pass",
      "Phase 3: Permanent UV ceramic barrier seal"
    ],
    "maintenance": "Avoid harsh petroleum-based tire shines on plastic cladding."
  },
  {
    "id": "machine-polish",
    "title": "Machine Polish & Wax",
    "category": "Color Protection & Treatments",
    "price": "\u20b9 2,000",
    "icon": "\u2728",
    "tagline": "Single-Stage Gloss Enhancement & Carnauba Wax",
    "summary": "Single-stage orbital machine polish that restores paint clarity, removes light haze, and applies a rich protective synthetic wax layer.",
    "img": "assets/o3_paint_correction.png",
    "warranty": "High Gloss Guarantee",
    "durability": "6 Months",
    "equipment": "Rupes Orbital Polisher, Meguiar\u2019s Finishing Polish & Synthetic Wax",
    "procedure": [
      "Phase 1: Foam prep wash & surface decontamination",
      "Phase 2: Single-pass orbital gloss refining pass",
      "Phase 3: Synthetic polymer gloss wax application & microfiber buffing"
    ],
    "maintenance": "Wash with pH-neutral shampoo to preserve wax layer."
  },
  {
    "id": "compounding-wax",
    "title": "Compounding Hi-Tech Wax (2 Steps)",
    "category": "Color Protection & Treatments",
    "price": "\u20b9 3,500",
    "icon": "\ud83d\udd0d",
    "tagline": "Swirl Mark Reduction & High-Gloss Sealant",
    "summary": "Two-stage paint correction process combining heavy compounding scratch reduction with fine finishing polish and a high-durability hybrid wax sealant.",
    "img": "assets/gallery/35_44_services_design_extra_services_also_mentioned_19_graphene_design.jpg",
    "warranty": "1 Year Swirl Reduction",
    "durability": "12 Months",
    "equipment": "Menzerna Heavy Cut 400, Microfiber Cutting Pads, Dual Action Polisher",
    "procedure": [
      "Phase 1: Step 1 heavy compounding removing 75%+ swirl marks & holograms",
      "Phase 2: Step 2 ultra-fine finishing polish",
      "Phase 3: Hi-tech hybrid wax sealant curing & final wipe"
    ],
    "maintenance": "Wash using two-bucket method with grit guards."
  },
  {
    "id": "o3-coating-3steps",
    "title": "O3 Coating (3 Steps Leveling)",
    "category": "Color Protection & Treatments",
    "price": "\u20b9 7,000",
    "icon": "\ud83d\udc8e",
    "tagline": "3-Stage Paint Leveling & Deep Gloss Conservation",
    "summary": "Flagship 3-step studio paint correction and leveling treatment that measures clear coat depth, removes multi-layer defects, and applies O3 silica protective coating.",
    "img": "assets/o3_ceramic_coating.png",
    "warranty": "2 Years Warranty",
    "durability": "2 Years",
    "equipment": "3-Pass Rupes Compounding System, Ultrasonic Depth Gauge, O3 Silica Sealant",
    "procedure": [
      "Phase 1: Ultrasonic clear coat depth measurement across 20 points",
      "Phase 2: Stage 1 heavy cut compounding pass",
      "Phase 3: Stage 2 micro-abrasive refining polish",
      "Phase 4: Stage 3 O3 Silica protective coating application & inspection"
    ],
    "maintenance": "Re-apply O3 booster spray annually."
  },
  {
    "id": "ceramic-1yr",
    "title": "1 Year Ceramic Shield (9H SiO2)",
    "category": "Ceramic Coating Packages",
    "price": "\u20b9 12,000",
    "icon": "\u2728",
    "tagline": "Entry-Level Liquid Quartz Gloss & Hydrophobic Barrier",
    "summary": "Professional 9H SiO2 ceramic glass coating providing 12 months of high-gloss shine, rain repellency, and chemical resistance.",
    "img": "assets/o3_ceramic_coating.png",
    "warranty": "1 Year Warranty",
    "durability": "12 Months",
    "equipment": "Rupes Orbital Polishers, 9H Silica Quartz, IR Curing Lamp Rig",
    "procedure": [
      "Phase 1: Single-stage paint correction removing fine swirls",
      "Phase 2: Panel degreasing wipe",
      "Phase 3: 9H Silica quartz liquid application",
      "Phase 4: Infrared curing at 80\u00b0C"
    ],
    "maintenance": "Apply ceramic booster spray every 6 months."
  },
  {
    "id": "ceramic-2yr",
    "title": "2 Years Ceramic Shield (9H SiO2)",
    "category": "Ceramic Coating Packages",
    "price": "\u20b9 14,000",
    "icon": "\u2728",
    "tagline": "24-Month Quartz Hardness & Mirror Surface Gloss",
    "summary": "Double-layer 9H SiO2 quartz coating that bonds to clear coat, preserving deep mirror gloss and UV protection for 2 full years.",
    "img": "assets/o3_ceramic_coating.png",
    "warranty": "2 Years Warranty",
    "durability": "24 Months",
    "equipment": "Scangrip Daylight LED, 9H Silica Quartz, Hedson IR Curing",
    "procedure": [
      "Phase 1: 2-stage paint correction & swirl removal",
      "Phase 2: IPA decontamination wipe",
      "Phase 3: Double cross-hatch SiO2 application",
      "Phase 4: 24-hr IR curing"
    ],
    "maintenance": "Use pH-neutral car wash shampoo."
  },
  {
    "id": "ceramic-3yr",
    "title": "3 Years Ceramic Shield (9H SiO2)",
    "category": "Ceramic Coating Packages",
    "price": "\u20b9 20,000",
    "icon": "\ud83d\udee1\ufe0f",
    "tagline": "36-Month High-Density Quartz Surface Protection",
    "summary": "High-density 9H SiO2 ceramic formulation with enhanced chemical resistance against bird droppings, tree sap, and acid rain.",
    "img": "assets/o3_ceramic_coating.png",
    "warranty": "3 Years Warranty",
    "durability": "3 Years",
    "equipment": "Rupes BigFoot, High-Density Quartz, Shortwave IR Rig",
    "procedure": [
      "Phase 1: Multi-stage paint compounding & leveling",
      "Phase 2: Panel prep wipe",
      "Phase 3: High-density 9H quartz layering",
      "Phase 4: Full shortwave IR heat curing"
    ],
    "maintenance": "Bring vehicle for annual studio inspection."
  },
  {
    "id": "ceramic-5yr",
    "title": "5 Years Ceramic Shield (9H SiO2)",
    "category": "Ceramic Coating Packages",
    "price": "\u20b9 30,000",
    "icon": "\ud83d\udc51",
    "tagline": "5-Year Ultra-Durable SiO2 Quartz Flagship Coating",
    "summary": "Flagship 5-year multi-layer ceramic matrix coating offering ultimate scratch resistance, deep wet-look reflection, and hyper-hydrophobic water repellency.",
    "img": "assets/o3_ceramic_coating.png",
    "warranty": "5 Years Warranty",
    "durability": "5 Years",
    "equipment": "DeFelsko Gauge, Multi-Layer 9H Quartz, Hedson IR Curing",
    "procedure": [
      "Phase 1: 3-pass paint correction to 98%+ clarity",
      "Phase 2: Dual panel wipe decontamination",
      "Phase 3: Base coat + Top coat multi-layer quartz application",
      "Phase 4: 48-hr cleanroom curing pass"
    ],
    "maintenance": "Annual studio maintenance top-up pass included."
  },
  {
    "id": "ceramic-2yr-1coatcare",
    "title": "2 Years Ceramic Shield (1 CoatCare Included)",
    "category": "Ceramic Coating Packages",
    "price": "\u20b9 25,000",
    "icon": "\ud83c\udf81",
    "tagline": "Includes 1 Free Maintenance CoatCare Service",
    "summary": "Complete 2-year ceramic coating package bundled with 1 complimentary annual studio CoatCare decontamination & top-up maintenance service.",
    "img": "assets/o3_ceramic_coating.png",
    "warranty": "2 Years Warranty + 1 Maintenance",
    "durability": "2 Years",
    "equipment": "9H Quartz, CoatCare Booster Spray, IR Curing",
    "procedure": [
      "Phase 1: 2-stage paint compounding",
      "Phase 2: Ceramic 9H application & curing",
      "Phase 3: 1 Free CoatCare maintenance voucher issued"
    ],
    "maintenance": "Redeem CoatCare maintenance at 12 months."
  },
  {
    "id": "ceramic-3yr-2coatcare",
    "title": "3 Years Ceramic Shield (2 CoatCare Included)",
    "category": "Ceramic Coating Packages",
    "price": "\u20b9 35,000",
    "icon": "\ud83c\udf81",
    "tagline": "Includes 2 Free Maintenance CoatCare Services",
    "summary": "Premium 3-year ceramic shield bundle backed by 2 complimentary annual studio CoatCare maintenance sessions for long-term gloss retention.",
    "img": "assets/o3_ceramic_coating.png",
    "warranty": "3 Years Warranty + 2 Maintenances",
    "durability": "3 Years",
    "equipment": "9H SiO2 Quartz, IR Curing Rig",
    "procedure": [
      "Phase 1: Multi-stage paint leveling",
      "Phase 2: High-density 9H quartz layering",
      "Phase 3: 2 Free CoatCare maintenance vouchers issued"
    ],
    "maintenance": "Redeem CoatCare maintenance at month 12 and month 24."
  },
  {
    "id": "ceramic-5yr-4coatcare",
    "title": "5 Years Ceramic Shield (4 CoatCare Included)",
    "category": "Ceramic Coating Packages",
    "price": "\u20b9 40,000",
    "icon": "\ud83d\udc51",
    "tagline": "Includes 4 Free Annual CoatCare Services",
    "summary": "Ultimate 5-year ceramic protection program bundled with 4 full annual studio CoatCare maintenance passes for total peace of mind.",
    "img": "assets/o3_ceramic_coating.png",
    "warranty": "5 Years Warranty + 4 Maintenances",
    "durability": "5 Years",
    "equipment": "Multi-Layer Quartz, Hedson IR Curing",
    "procedure": [
      "Phase 1: 3-pass paint correction to flawless finish",
      "Phase 2: Multi-layer ceramic quartz application",
      "Phase 3: 4 Free CoatCare maintenance vouchers issued"
    ],
    "maintenance": "Annual CoatCare pass redeemable every 12 months."
  },
  {
    "id": "graphene-2yr",
    "title": "2 Years Graphene Armor (9H Matrix)",
    "category": "Graphene Coating Packages",
    "price": "\u20b9 18,000",
    "icon": "\u26a1",
    "tagline": "Reduced Water Spotting & Enhanced Hardness",
    "summary": "Reduced Graphene Oxide (rGO) matrix coating delivering high thermal dissipation, lower water spot etching, and slick hydrophobic protection.",
    "img": "assets/gallery/35_44_services_design_extra_services_also_mentioned_19_graphene_design.jpg",
    "warranty": "2 Years Warranty",
    "durability": "2 Years",
    "equipment": "rGO Graphene Oxide Matrix, IR Curing Rig",
    "procedure": [
      "Phase 1: 2-stage paint correction",
      "Phase 2: Panel wiping with residue remover",
      "Phase 3: Graphene matrix coating application",
      "Phase 4: IR lamp heat curing at 80\u00b0C"
    ],
    "maintenance": "Wash with pH-neutral shampoo."
  },
  {
    "id": "graphene-3yr",
    "title": "3 Years Graphene Armor (9H Matrix)",
    "category": "Graphene Coating Packages",
    "price": "\u20b9 22,000",
    "icon": "\u26a1",
    "tagline": "36-Month Thermal Dissipation & Hydrophobic Slickness",
    "summary": "3-year high-durability graphene matrix coating engineered for hot Indian summer road conditions, repelling water spots & road grime.",
    "img": "assets/gallery/35_44_services_design_extra_services_also_mentioned_19_graphene_design.jpg",
    "warranty": "3 Years Warranty",
    "durability": "3 Years",
    "equipment": "Scangrip Daylight, rGO Graphene Matrix, IR Curing",
    "procedure": [
      "Phase 1: Multi-pass paint defect compounding",
      "Phase 2: Panel prep wipe",
      "Phase 3: Double graphene matrix coat",
      "Phase 4: IR lamp heat curing"
    ],
    "maintenance": "Use graphene booster spray every 6 months."
  },
  {
    "id": "graphene-5yr",
    "title": "5 Years Graphene Armor (9H Matrix)",
    "category": "Graphene Coating Packages",
    "price": "\u20b9 30,000",
    "icon": "\ud83d\udee1\ufe0f",
    "tagline": "5-Year Ultra Graphene Hardness Matrix Flagship",
    "summary": "Flagship 5-year graphene matrix protection providing unmatched contact angle water beading, extreme scratch resistance, and wet gloss.",
    "img": "assets/gallery/35_44_services_design_extra_services_also_mentioned_19_graphene_design.jpg",
    "warranty": "5 Years Warranty",
    "durability": "5 Years",
    "equipment": "Multi-Layer Graphene Oxide, Hedson IR Curing",
    "procedure": [
      "Phase 1: 3-stage paint leveling to 98%+ scratch elimination",
      "Phase 2: Solvent decontamination wipe",
      "Phase 3: Multi-layer rGO graphene matrix application",
      "Phase 4: 48-hr cleanroom curing pass"
    ],
    "maintenance": "Annual studio inspection included."
  },
  {
    "id": "graphene-2yr-1coatcare",
    "title": "2 Years Graphene Armor (1 CoatCare Included)",
    "category": "Graphene Coating Packages",
    "price": "\u20b9 28,000",
    "icon": "\ud83c\udf81",
    "tagline": "Includes 1 Free Maintenance CoatCare Service",
    "summary": "2-year graphene armor package bundled with 1 complimentary annual studio CoatCare decontamination & top-up service.",
    "img": "assets/gallery/35_44_services_design_extra_services_also_mentioned_19_graphene_design.jpg",
    "warranty": "2 Years Warranty + 1 Maintenance",
    "durability": "2 Years",
    "equipment": "rGO Graphene Coating, CoatCare Booster, IR Curing",
    "procedure": [
      "Phase 1: 2-stage paint correction",
      "Phase 2: Graphene matrix coating application & IR curing",
      "Phase 3: 1 Free CoatCare maintenance voucher issued"
    ],
    "maintenance": "Redeem CoatCare maintenance at 12 months."
  },
  {
    "id": "graphene-3yr-2coatcare",
    "title": "3 Years Graphene Armor (2 CoatCare Included)",
    "category": "Graphene Coating Packages",
    "price": "\u20b9 40,000",
    "icon": "\ud83c\udf81",
    "tagline": "Includes 2 Free Maintenance CoatCare Services",
    "summary": "3-year graphene matrix coating bundle including 2 complimentary annual studio CoatCare maintenance sessions.",
    "img": "assets/gallery/35_44_services_design_extra_services_also_mentioned_19_graphene_design.jpg",
    "warranty": "3 Years Warranty + 2 Maintenances",
    "durability": "3 Years",
    "equipment": "Graphene Oxide Matrix, IR Curing Rig",
    "procedure": [
      "Phase 1: Multi-stage paint correction",
      "Phase 2: Graphene matrix coat & curing",
      "Phase 3: 2 Free CoatCare maintenance vouchers issued"
    ],
    "maintenance": "Redeem CoatCare maintenance at month 12 and month 24."
  },
  {
    "id": "graphene-5yr-4coatcare",
    "title": "5 Years Graphene Armor (4 CoatCare Included)",
    "category": "Graphene Coating Packages",
    "price": "\u20b9 45,000",
    "icon": "\ud83d\udc51",
    "tagline": "Includes 4 Free Annual CoatCare Services",
    "summary": "Ultimate 5-year graphene matrix program bundled with 4 full annual studio CoatCare maintenance passes.",
    "img": "assets/gallery/35_44_services_design_extra_services_also_mentioned_19_graphene_design.jpg",
    "warranty": "5 Years Warranty + 4 Maintenances",
    "durability": "5 Years",
    "equipment": "Multi-Layer Graphene Oxide, Hedson IR Curing",
    "procedure": [
      "Phase 1: 3-pass paint leveling to flawless finish",
      "Phase 2: Multi-layer graphene matrix application",
      "Phase 3: 4 Free CoatCare maintenance vouchers issued"
    ],
    "maintenance": "Annual CoatCare pass redeemable every 12 months."
  },
  {
    "id": "ppf-3yr-clear",
    "title": "PPF 3 Years - CLEAR (TPH Thermoplastic Hybrid)",
    "category": "Paint Protection Film (PPF)",
    "price": "\u20b9 70,000",
    "icon": "\ud83d\udee1\ufe0f",
    "tagline": "Clear Self-Healing Protective Film (3 Years)",
    "summary": "Entry-level clear self-healing protective film engineered to shield factory paint against stone chips, scratches, and road debris.",
    "img": "assets/o3_ppf_protection.png",
    "warranty": "3 Years Warranty",
    "durability": "3 Years",
    "equipment": "Plotter Pre-Cut Film, Alcohol Prep Solution, Steam Edge-Tuckers",
    "procedure": [
      "Phase 1: Full decontamination wash & single-stage paint polish",
      "Phase 2: IPA alcohol wipe for sterile paint bonding",
      "Phase 3: Computerized plotter template cutting",
      "Phase 4: Slip solution laying & squeegee air extraction",
      "Phase 5: Heat-sealed edge wrapping into seams"
    ],
    "maintenance": "Wash with pH-neutral shampoo."
  },
  {
    "id": "ppf-5yr-clear",
    "title": "PPF 5 Years - CLEAR (TPH Thermoplastic Hybrid)",
    "category": "Paint Protection Film (PPF)",
    "price": "\u20b9 90,000",
    "icon": "\ud83d\udee1\ufe0f",
    "tagline": "5-Year Clear Self-Healing Hybrid Protective Armor",
    "summary": "High-durability clear TPH film offering 5 years of self-healing scratch defense and optical paint clarity.",
    "img": "assets/o3_ppf_protection.png",
    "warranty": "5 Years Warranty",
    "durability": "5 Years",
    "equipment": "Plotter Pre-Cut Film, Steam Edge-Tuckers",
    "procedure": [
      "Phase 1: Decontamination wash & paint prep",
      "Phase 2: Plotter pre-cut installation",
      "Phase 3: Squeegee extraction & edge tucking"
    ],
    "maintenance": "Avoid pressure washing within 5cm of edges."
  },
  {
    "id": "ppf-5yr-gloss-tpu",
    "title": "PPF 5 Years - GLOSS (TPU Thermoplastic Polyurethane)",
    "category": "Paint Protection Film (PPF)",
    "price": "\u20b9 1,30,000",
    "icon": "\ud83d\udc8e",
    "tagline": "Premium Optical Grade Self-Healing TPU Film",
    "summary": "Premium 100% optical-grade TPU film with instant heat-activated self-healing, hyper-gloss clarity, and non-yellowing adhesive layer.",
    "img": "assets/o3_ppf_protection.png",
    "warranty": "5 Years Warranty",
    "durability": "5 Years",
    "equipment": "Optical TPU Film, Steam Edge Tuckers, Plotter Pre-Cut",
    "procedure": [
      "Phase 1: Paint defect correction to pristine surface",
      "Phase 2: Plotter cut TPU template squeegee installation",
      "Phase 3: Heat-wrapped edge tucking"
    ],
    "maintenance": "Self-heals swirl marks under sunlight or warm water."
  },
  {
    "id": "ppf-7yr-gloss-tpu",
    "title": "PPF 7 Years - GLOSS (TPU Thermoplastic Polyurethane)",
    "category": "Paint Protection Film (PPF)",
    "price": "\u20b9 1,50,000",
    "icon": "\ud83d\udc51",
    "tagline": "Flagship Optical Grade Self-Healing TPU Film (7 Years)",
    "summary": "Ultra-thick 7-year flagship TPU self-healing armor providing maximum protection against high-speed gravel hits and key scratches.",
    "img": "assets/o3_ppf_protection.png",
    "warranty": "7 Years Warranty",
    "durability": "7 Years",
    "equipment": "Flagship Optical TPU, Plotter Pre-Cut, Steam Edge Tuckers",
    "procedure": [
      "Phase 1: Multi-stage paint prep wash & polish",
      "Phase 2: Computerized pre-cut template installation",
      "Phase 3: Invisible edge tucking under emblems & seams"
    ],
    "maintenance": "Back by 7-year studio warranty against yellowing & bubbling."
  },
  {
    "id": "ppf-3yr-matt",
    "title": "PPF 3 Years - MATT (TPH Thermoplastic Hybrid)",
    "category": "Paint Protection Film (PPF)",
    "price": "\u20b9 80,000",
    "icon": "\ud83d\udda4",
    "tagline": "Stealth Satin Finish Self-Healing Film (3 Years)",
    "summary": "Converts glossy paint into a sleek matte/satin finish while providing full self-healing stone chip protection.",
    "img": "assets/o3_rolls_royce_black.png",
    "warranty": "3 Years Warranty",
    "durability": "3 Years",
    "equipment": "Matte TPH Film, Steam Edge Tuckers",
    "procedure": [
      "Phase 1: Decontamination wash & panel prep",
      "Phase 2: Matte TPH film squeegee installation",
      "Phase 3: Heat-sealed edge wrapping"
    ],
    "maintenance": "Clean with matte-safe quick detailer spray."
  },
  {
    "id": "ppf-5yr-matt-tpu",
    "title": "PPF 5 Years - MATT (TPU Thermoplastic Polyurethane)",
    "category": "Paint Protection Film (PPF)",
    "price": "\u20b9 1,50,000",
    "icon": "\ud83d\udda4",
    "tagline": "Stealth Satin Finish Optical TPU Self-Healing Film",
    "summary": "Premium optical-grade matte TPU film offering smooth satin texture, self-healing capability, and 5 years of anti-scratch armor.",
    "img": "assets/o3_rolls_royce_black.png",
    "warranty": "5 Years Warranty",
    "durability": "5 Years",
    "equipment": "Matte Optical TPU, Computerized Plotter Pre-Cut",
    "procedure": [
      "Phase 1: Paint prep decontamination",
      "Phase 2: Pre-cut matte TPU installation",
      "Phase 3: Seamless edge wrapping"
    ],
    "maintenance": "Do not apply glossy waxes on matte film."
  },
  {
    "id": "ppf-7yr-matt-tpu",
    "title": "PPF 7 Years - MATT (TPU Thermoplastic Polyurethane)",
    "category": "Paint Protection Film (PPF)",
    "price": "\u20b9 1,80,000",
    "icon": "\ud83d\udc51",
    "tagline": "Flagship Satin TPU Stealth Protection Film (7 Years)",
    "summary": "Top-of-the-line 7-year matte TPU armor for luxury supercars and SUVs seeking a custom satin look with ultimate paint defense.",
    "img": "assets/o3_rolls_royce_black.png",
    "warranty": "7 Years Warranty",
    "durability": "7 Years",
    "equipment": "Flagship Matte TPU, Steam Edge Tuckers",
    "procedure": [
      "Phase 1: Full vehicle paint prep",
      "Phase 2: Full body stealth matte TPU wrap",
      "Phase 3: Cleanroom heat curing"
    ],
    "maintenance": "7-year studio warranty included."
  },
  {
    "id": "ppf-3yr-black",
    "title": "PPF 3 Years - BLACK (TPH Roof & Accent Film)",
    "category": "Paint Protection Film (PPF)",
    "price": "\u20b9 80,000",
    "icon": "\ud83c\udfce\ufe0f",
    "tagline": "Gloss Black Roof & Accent Protection Film",
    "summary": "Deep mirror gloss black TPH film designed for dual-tone roof wraps, pillars, mirrors, and hood accents with self-healing defense.",
    "img": "assets/o3_mercedes_amg.png",
    "warranty": "3 Years Warranty",
    "durability": "3 Years",
    "equipment": "Gloss Black TPH Film, Heat Guns",
    "procedure": [
      "Phase 1: Roof & pillar decontamination wash",
      "Phase 2: High-gloss black TPH application",
      "Phase 3: Heat trimming & edge tucking"
    ],
    "maintenance": "Wipe with soft microfiber."
  },
  {
    "id": "ppf-5yr-black",
    "title": "PPF 5 Years - BLACK (TPH Roof & Accent Film)",
    "category": "Paint Protection Film (PPF)",
    "price": "\u20b9 1,50,000",
    "icon": "\ud83c\udfce\ufe0f",
    "tagline": "5-Year Gloss Black Self-Healing Accent Film",
    "summary": "High-durability gloss black TPH protective film for full body or accent panel transformations.",
    "img": "assets/o3_mercedes_amg.png",
    "warranty": "5 Years Warranty",
    "durability": "5 Years",
    "equipment": "Gloss Black TPH, Steam Tuckers",
    "procedure": [
      "Phase 1: Surface prep & alcohol wipe",
      "Phase 2: Gloss black TPH squeegee installation",
      "Phase 3: Edge wrapping"
    ],
    "maintenance": "Wash with pH-neutral shampoo."
  },
  {
    "id": "ppf-7yr-black-tpu",
    "title": "PPF 7 Years - BLACK (TPU Roof & Accent Film)",
    "category": "Paint Protection Film (PPF)",
    "price": "\u20b9 1,80,000",
    "icon": "\ud83d\udc51",
    "tagline": "Flagship Black TPU Self-Healing Armor (7 Years)",
    "summary": "Flagship black TPU film combining deep piano-black mirror shine with heavy-duty anti-scratch self-healing armor.",
    "img": "assets/o3_mercedes_amg.png",
    "warranty": "7 Years Warranty",
    "durability": "7 Years",
    "equipment": "Piano Black TPU, Plotter Pre-Cut",
    "procedure": [
      "Phase 1: Full panel correction",
      "Phase 2: Black TPU wrap installation",
      "Phase 3: IR curing"
    ],
    "maintenance": "Backed by 7-year studio warranty."
  },
  {
    "id": "ppf-3yr-color",
    "title": "PPF 3 Years - COLOR WRAP (TPH Color Protection)",
    "category": "Paint Protection Film (PPF)",
    "price": "\u20b9 1,50,000",
    "icon": "\ud83c\udfa8",
    "tagline": "Colored Custom Wrap Protection Film",
    "summary": "Custom colored TPH protection film allowing complete vehicle color transformations with built-in stone chip defense.",
    "img": "assets/o3_rolls_royce_cyan.png",
    "warranty": "3 Years Warranty",
    "durability": "3 Years",
    "equipment": "Color TPH Film, Heat Guns, Edge Tuckers",
    "procedure": [
      "Phase 1: Full body decontamination",
      "Phase 2: Custom color TPH application",
      "Phase 3: Seamless edge wrapping"
    ],
    "maintenance": "Wash with mild car shampoo."
  },
  {
    "id": "maintenance-1time",
    "title": "Maintenance Coating - 1 Time",
    "category": "Maintenance & Subscriptions",
    "price": "\u20b9 1,500",
    "icon": "\ud83d\udd04",
    "tagline": "Quick Top-Up Hydrophobic Boost",
    "summary": "Single-pass studio maintenance wash & SiO2 hydrophobic booster spray application to revive ceramic/wax water beading.",
    "img": "assets/product_coating_kit.png",
    "warranty": "Gloss Booster Guarantee",
    "durability": "3 Months",
    "equipment": "SiO2 Spray Booster, Microfiber Towels",
    "procedure": [
      "Phase 1: Decontamination wash",
      "Phase 2: Hydrophobic SiO2 booster spray pass",
      "Phase 3: Microfiber buffing"
    ],
    "maintenance": "Perform quarterly."
  },
  {
    "id": "ceramic-maintenance-1time",
    "title": "Ceramic Maintenance - 1 Time",
    "category": "Maintenance & Subscriptions",
    "price": "\u20b9 8,000",
    "icon": "\u2728",
    "tagline": "Complete Decontamination & Ceramic Re-Load",
    "summary": "Full studio ceramic maintenance session including iron decontamination wash, clay bar pass, and ceramic reload coating top-up.",
    "img": "assets/product_coating_kit.png",
    "warranty": "Annual Re-Load Certificate",
    "durability": "12 Months",
    "equipment": "Iron Remover, Clay Bar, Ceramic Re-Load Spray",
    "procedure": [
      "Phase 1: Chemical iron fallout wash",
      "Phase 2: Clay bar decontamination",
      "Phase 3: Machine ceramic reload pass"
    ],
    "maintenance": "Recommended once a year."
  },
  {
    "id": "graphene-maintenance-1time",
    "title": "Graphene Maintenance - 1 Time",
    "category": "Maintenance & Subscriptions",
    "price": "\u20b9 9,000",
    "icon": "\u26a1",
    "tagline": "Complete Decontamination & Graphene Re-Load",
    "summary": "Complete studio graphene maintenance treatment reviving slickness, gloss, and water spot defense on graphene-coated vehicles.",
    "img": "assets/product_coating_kit.png",
    "warranty": "Annual Re-Load Certificate",
    "durability": "12 Months",
    "equipment": "Graphene Booster, Clay Bar, IR Lamp",
    "procedure": [
      "Phase 1: Decontamination wash",
      "Phase 2: Clay bar pass",
      "Phase 3: Graphene re-load application & IR curing"
    ],
    "maintenance": "Recommended once a year."
  },
  {
    "id": "subscription-12",
    "title": "12 Washes For 12 Months Subscription",
    "category": "Maintenance & Subscriptions",
    "price": "\u20b9 4,200",
    "icon": "\ud83c\udf9f\ufe0f",
    "tagline": "Monthly Detailing Snow Foam Wash Package",
    "summary": "12 high-pressure snow foam detailing washes valid over 12 months with interior vacuuming and tire gel dressing.",
    "img": "assets/o3_on_wheels.png",
    "warranty": "12 Washes Pass",
    "durability": "12 Months",
    "equipment": "K\u00e4rcher Washer, Snow Foam Lance",
    "procedure": [
      "Phase 1: High-pressure foam wash",
      "Phase 2: Interior vacuuming",
      "Phase 3: Tire gel dressing"
    ],
    "maintenance": "Redeem 1 wash per month."
  },
  {
    "id": "subscription-24",
    "title": "24 Washes For 24 Months Subscription",
    "category": "Maintenance & Subscriptions",
    "price": "\u20b9 8,400",
    "icon": "\ud83c\udf9f\ufe0f",
    "tagline": "Bi-Monthly Detailing Snow Foam Wash Package",
    "summary": "24 detailing snow foam washes valid over 24 months for complete vehicle maintenance.",
    "img": "assets/o3_on_wheels.png",
    "warranty": "24 Washes Pass",
    "durability": "24 Months",
    "equipment": "K\u00e4rcher Washer, Industrial Vacuum",
    "procedure": [
      "Phase 1: Foam wash & vacuum",
      "Phase 2: Glass wipe & tire dressing"
    ],
    "maintenance": "Redeem 1 wash every 2 weeks."
  },
  {
    "id": "subscription-36",
    "title": "36 Washes For 36 Months Subscription",
    "category": "Maintenance & Subscriptions",
    "price": "\u20b9 12,500",
    "icon": "\ud83c\udf9f\ufe0f",
    "tagline": "3-Year VIP Detailing Wash Package",
    "summary": "36 detailing washes valid over 3 years with complimentary underbody flush sessions.",
    "img": "assets/o3_on_wheels.png",
    "warranty": "36 Washes Pass",
    "durability": "36 Months",
    "equipment": "High-Pressure Washer, Vacuum",
    "procedure": [
      "Phase 1: Snow foam wash & vacuum",
      "Phase 2: Underbody flush"
    ],
    "maintenance": "Redeem 1 wash per month."
  },
  {
    "id": "subscription-60",
    "title": "60 Washes For 60 Months Subscription",
    "category": "Maintenance & Subscriptions",
    "price": "\u20b9 21,000",
    "icon": "\ud83c\udf9f\ufe0f",
    "tagline": "5-Year VIP Unlimited Detailing Wash Package",
    "summary": "Ultimate 60-wash subscription over 5 years keeping your vehicle pristine with high-glow foam washes.",
    "img": "assets/o3_on_wheels.png",
    "warranty": "60 Washes Pass",
    "durability": "60 Months",
    "equipment": "K\u00e4rcher Washer, Snow Foam Cannon",
    "procedure": [
      "Phase 1: High-glow snow foam wash",
      "Phase 2: Interior vacuuming & tire dressing"
    ],
    "maintenance": "Redeem anytime within 5 years."
  },
  {
    "id": "undershield-2yr",
    "title": "O3 Undershield Body Coating (2 Years)",
    "category": "Maintenance & Subscriptions",
    "price": "\u20b9 3,500",
    "icon": "\ud83d\ude9c",
    "tagline": "Heavy-Duty Rubberized Anti-Rust Chassis Coating",
    "summary": "Heavy-duty rubberized underbody coating applied on hydraulic lift to frame rails and wheel wells to prevent monsoon rust & gravel noise.",
    "img": "assets/o3_on_wheels.png",
    "warranty": "2 Years Rust-Proof Warranty",
    "durability": "2 Years",
    "equipment": "Hydraulic Hoist, Rubberized Spray Gun",
    "procedure": [
      "Phase 1: Hydraulic lift raising",
      "Phase 2: Chassis mud wash & dry",
      "Phase 3: Rubberized anti-rust spray application"
    ],
    "maintenance": "Inspect after monsoon season."
  }
];

  // AUTHENTIC REVIEWS DATABASE
  const realReviews = [
    {
      id: 99,
      author: "Satisfied Car Owner",
      badge: "Verified Customer",
      time: "Recent",
      car: "Ceramic Protection",
      category: "Ceramic Coating",
      rating: "★★★★★",
      quote: "My car hasn't looked this good since I bought it."
    },
    {
      id: 98,
      author: "Premium SUV Owner",
      badge: "Verified Customer",
      time: "Recent",
      car: "Ceramic AMC Plan",
      category: "Ceramic AMC",
      rating: "★★★★★",
      quote: "Booked the ceramic coating plan, and it's held up through two monsoons already."
    },
    {
      id: 1,
      author: "Chintan Patel",
      badge: "Local Guide · 9 reviews",
      time: "5 months ago",
      car: "Maruti Suzuki WagonR (2015)",
      category: "Underbody & Restoration",
      rating: "★★★★★",
      quote: "My 2015 WagonR Complete Under Body Coating, Head Light Buffing And Total Clean..... Thanks Sharanpal Sir O3 Car Spa Good Staff!"
    },
    {
      id: 2,
      author: "Rutvik Gamit",
      badge: "Local Guide · 15 reviews",
      time: "a month ago",
      car: "Accidental Paint Restoration",
      category: "Paint Restoration",
      rating: "★★★★★",
      quote: "I had the opportunity to refer a friend to Mr. Sharanpal Sodhi and the team at O3 Car Spa after his car was accidentally splattered with paint. Professionalism, attention to detail, and top-notch problem solving!"
    },
    {
      id: 3,
      author: "Adit Shah",
      badge: "Local Guide · 5 reviews",
      time: "4 months ago",
      car: "Royal Enfield Hunter 350",
      category: "Bikes & Superbikes",
      rating: "★★★★★",
      quote: "I got a matte ceramic coating on my Hunter 350. My overall experience was beyond expectations. Thank you O3 Car Spa for your wonderful service!"
    },
    {
      id: 4,
      author: "Mihir Patel",
      badge: "9 reviews · 3 photos",
      time: "10 months ago",
      car: "Maruti Dzire",
      category: "Ceramic & Graphene",
      rating: "★★★★★",
      quote: "Very good work for my Dzire — removed all scratches and did ceramic coating with a very good price!"
    },
    {
      id: 5,
      author: "Keyur Desai",
      badge: "Local Guide · 17 reviews",
      time: "6 months ago",
      car: "Ceramic Coating Treatment",
      category: "Ceramic & Graphene",
      rating: "★★★★★",
      quote: "Good experience for ceramic coating, super service and very efficient staff!"
    },
    {
      id: 6,
      author: "Vijaysinh Parmar",
      badge: "2 reviews",
      time: "a year ago",
      car: "Mahindra Thar",
      category: "Ceramic & Graphene",
      rating: "★★★★★",
      quote: "Best work with best service! My Thar car has been protected with Graphene coating — awesome work with best rates!"
    },
    {
      id: 7,
      author: "Hd Parmar",
      badge: "1 review",
      time: "a year ago",
      car: "Honda Activa",
      category: "Bikes & Superbikes",
      rating: "★★★★★",
      quote: "My Activa has been done ceramic coating at O3 Car Spa — beautiful detailed work! 13+ years of expert experience in town!"
    },
    {
      id: 8,
      author: "Bhavesh Prajapati",
      badge: "1 review · 1 photo",
      time: "a year ago",
      car: "Pre-owned Hyundai i20",
      category: "Car Makeover",
      rating: "★★★★★",
      quote: "Provided us best detailing service at affordable rates. Our old car was converted into brand new! Highly recommend!"
    }
  ];

  // Hash Navigation Sync
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['home', 'about', 'story', 'gallery', 'services', 'products', 'plans', 'contact', 'studio', 'concierge', 'testimonials', 'faq', 'franchise'].includes(hash)) {
        setCurrentView(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (view) => {
    setCurrentView(view);
    window.location.hash = view;
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Oxygen Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles = Array.from({ length: 35 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2.5 + 1,
      color: Math.random() > 0.5 ? 'rgba(202, 232, 232, ' : 'rgba(0, 240, 255, ',
      alpha: Math.random() * 0.4 + 0.1,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: (Math.random() - 0.5) * 0.4 - 0.2
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = canvas.height;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#cae8e8';
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // GSAP ScrollTrigger Animations
  useEffect(() => {
    if (currentView === 'home' && window.gsap && window.ScrollTrigger) {
      window.gsap.registerPlugin(window.ScrollTrigger);

      window.gsap.to('.gsap-hero-title', {
        scrollTrigger: {
          trigger: '.gsap-hero-title',
          start: 'top 30%',
          end: 'bottom top',
          scrub: 1
        },
        y: -25,
        opacity: 0.85
      });

      // Masked Title Stagger Reveals
      window.gsap.utils.toArray('.gsap-stagger-title').forEach((title) => {
        window.gsap.fromTo(title,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.4,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: title,
              start: 'top 90%',
              toggleActions: 'play none none none'
            }
          }
        );
      });
    }
  }, [currentView]);

  // Before/After slider
  const handleSliderMove = (clientX, containerRect) => {
    const x = clientX - containerRect.left;
    let percentage = (x / containerRect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPos(percentage);
  };

  const onTouchMove = (e) => {
    const container = e.currentTarget.getBoundingClientRect();
    handleSliderMove(e.touches[0].clientX, container);
  };

  const onMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    const container = e.currentTarget.getBoundingClientRect();
    handleSliderMove(e.clientX, container);
  };

  const handleOpenBookingWithService = (serviceName) => {
    setSelectedBookingService(serviceName);
    setIsBookingOpen(true);
    setActiveServiceDetail(null);
  };

  return (
    <div className="min-h-screen bg-[#05070c] text-slate-100 flex flex-col font-sans selection:bg-[#cae8e8] selection:text-[#05070c] relative">
      
      {/* LUXURY PRELOADER SCREEN */}
      <O3Preloader progress={loadProgress} isFinished={!isLoading} />

      {/* Background Oxygen Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-60"></canvas>

      {/* FLOATING DIRECT WHATSAPP ACTION TOGGLE BUTTON (PURE ROUND CIRCLE) */}
      <a 
        href="https://wa.me/917225030303?text=Hello%20O3%20Car-Spa!%20I%20want%20to%20inquire%20about%20detailing."
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float-btn"
        title="Direct WhatsApp Chat with Sharanpalsingh Sir"
      >
        <span className="whatsapp-pulse-dot"></span>
        <span>💬</span>
      </a>

      {/* ================= HEADER / NAVIGATION (SEAMLESS ABSOLUTE BLENDED HEADER) ================= */}
      <header className="absolute top-6 left-0 right-0 z-50 pointer-events-none transition-all">
        <div className="w-full px-4 sm:px-8 flex items-center justify-between pointer-events-auto">
          
          {/* OFFICIAL SEAMLESS TRANSPARENT LOGO */}
          <div 
            onClick={() => navigateTo('home')} 
            className="cursor-pointer flex items-center gap-3 group"
          >
            <img src="assets/o3_official_logo.png" 
              alt="O3 CAR-SPA Premium Car Detailing Studio Official Logo" 
              className="logo-blend h-11 sm:h-12 w-auto group-hover:scale-103 transition-transform"
             loading="lazy" decoding="async" />
          </div>

          {/* ELEGANT FLOATING GLASS NAV CAPSULE */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#0d111a]/85 backdrop-blur-xl border border-[#cae8e8]/25 px-3 py-1.5 rounded-full shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
            {[
              { id: 'home', label: 'Home' },
              { id: 'about', label: 'About' },
              { id: 'story', label: 'Our Story' },
              { id: 'gallery', label: 'Work' },
              { id: 'services', label: 'Services' },
              { id: 'products', label: 'Products' },
              { id: 'plans', label: 'Plans' },
              { id: 'contact', label: 'Contact' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  currentView === item.id
                    ? 'bg-gradient-to-r from-[#00f0ff] to-[#cae8e8] text-[#05070c] shadow-[0_0_20px_rgba(0,240,255,0.6)] font-extrabold'
                    : 'text-slate-300 hover:text-white hover:bg-white/10 font-medium'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center space-x-3">
            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden flex items-center gap-2 bg-[#0d111a]/90 backdrop-blur-xl border border-[#00f0ff]/40 text-[#00f0ff] px-4 py-2 rounded-full font-mono text-xs font-bold shadow-[0_0_15px_rgba(0,240,255,0.3)] active:scale-95 transition-all"
            >
              <span>☰</span>
              <span>MENU</span>
            </button>
            <a 
              href="tel:7225030303" 
              className="hidden xl:flex items-center gap-2 text-xs text-[#00f0ff] bg-[#00f0ff]/10 px-4 py-2 rounded-full border border-[#00f0ff]/30 hover:bg-[#00f0ff]/20 transition-all font-mono font-bold shadow-[0_0_15px_rgba(0,240,255,0.2)]"
            >
              <span>📞</span>
              <span>72250 30303</span>
            </a>

            <button 
              onClick={() => setIsBookingOpen(true)}
              className="btn-primary text-xs !py-2 !px-5 font-bold shadow-[0_0_20px_rgba(0,240,255,0.4)]"
            >
              Book Appointment
            </button>

            <button
              onClick={() => setIsDrawerOpen(true)}
              className="p-2 rounded-full text-[#cae8e8] hover:bg-[#cae8e8]/10 border border-[#cae8e8]/20 text-xs font-bold"
              title="Inspect Design System Tokens"
            >
              🎨
            </button>
          </div>
        </div>
      </header>

      {/* ================= MAIN VIEWS ================= */}
      <main className="flex-1 relative z-10">

        {/* ---------------- HOME VIEW ---------------- */}
        {currentView === 'home' && (
          <div className="space-y-24 pb-24">
            
            {/* 1. UNOBSTRUCTED 4K HERO VIDEO STAGE */}
            <section className="relative w-full overflow-hidden">
              <div className="hero-video-stage-clear min-h-[85vh] sm:min-h-[90vh]">
                
                <video 
                  src="assets/hero_section.mp4" 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="hero-video-bg-clear"
                ></video>

                <div className="hero-video-overlay-light"></div>

                <div className="absolute bottom-10 left-0 right-0 z-20 w-full px-4 sm:px-8 lg:px-12 flex flex-col md:flex-row md:items-end justify-between gap-6 pointer-events-none">
                  
                  <div className="space-y-3 max-w-lg text-left pointer-events-auto">
                    <div className="pill-capsule backdrop-blur-xl bg-[#05070c]/70 border-[#cae8e8]/40 shadow-2xl !py-1 !px-3.5 !text-[11px]">
                      <span className="font-bold">⭐ 13+ Years Detailing Expertise</span>
                      <span className="text-[#cae8e8]/40">|</span>
                      <span className="font-mono text-emerald-400 font-semibold">Sharanpal Sodhi</span>
                    </div>

                    <h1 className="gsap-hero-title text-shadow-hero text-4xl sm:text-6xl font-extrabold text-white leading-[1.08] tracking-tight">
                      Exclusive Coatings for <span className="text-gradient-ocean font-black">Cars That Deserve More.</span>
                    </h1>

                    <p className="text-shadow-hero text-xs sm:text-sm text-slate-200 font-light leading-relaxed max-w-md">
                      Precision detailing for people who care about every inch of their car. Glass Coating · Ceramic Coating · Acrylic Coating
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pointer-events-auto">
                    <button onClick={() => setIsBookingOpen(true)} className="btn-primary text-xs !py-3 !px-6">
                      <span>Book Appointment</span>
                      <span>→</span>
                    </button>
                    <button onClick={() => navigateTo('services')} className="btn-secondary text-xs !py-3 !px-6">
                      <span>Services Menu</span>
                    </button>
                  </div>

                </div>

              </div>
            </section>

            {/* 2. OFFICIAL BRAND PILLARS */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10 space-y-2">
                <span className="pill-capsule font-mono">Official Brand Standards</span>
                <div className="overflow-hidden py-3">
                  <h2 className="gsap-stagger-title text-3xl sm:text-4xl font-extrabold text-white">Our Core Brand System</h2>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { num: '01', title: 'PROTECT', desc: 'LONG LASTING PROTECTION against rock chips, UV ray fading & chemical contaminants.' },
                  { num: '02', title: 'ENHANCE', desc: 'BRING OUT THE BEST deep mirror clarity and vivid color saturation on every panel.' },
                  { num: '03', title: 'RESTORE', desc: 'RENEW EVERY DETAIL of interior upholstery, leather, glass, and swirl marks.' },
                  { num: '04', title: 'CARE', desc: 'WE CARE FOR YOUR RIDE with bespoke studio treatment directed by Sharanpal Sir.' },
                ].map((pillar, idx) => (
                  <div key={idx} className="pillar-floating-item space-y-3">
                    <span className="pillar-number">{pillar.num}</span>
                    <h3 className="text-lg font-extrabold text-white tracking-widest uppercase flex items-center gap-2">
                      <span>{pillar.title}</span>
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed font-light">{pillar.desc}</p>
                    <div className="pillar-hover-bar"></div>
                    {idx < 3 && <div className="pillar-divider-line"></div>}
                  </div>
                ))}
              </div>
            </section>

            
            {/* TRUST STRIP SECTION [NEW] */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="glass-surface p-6 sm:p-8 border border-[#cae8e8]/30 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div className="space-y-1">
                  <div className="text-3xl font-extrabold text-[#00f0ff] font-mono">10+ Years</div>
                  <div className="text-xs text-slate-300 font-medium">Detailing Experience</div>
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-extrabold text-[#00f0ff] font-mono">5,000+</div>
                  <div className="text-xs text-slate-300 font-medium">Cars Detailed</div>
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-extrabold text-[#00f0ff] font-mono">Trusted</div>
                  <div className="text-xs text-slate-300 font-medium">Global Brands Only</div>
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-extrabold text-[#00f0ff] font-mono">Two</div>
                  <div className="text-xs text-slate-300 font-medium">Studio Locations</div>
                </div>
              </div>
            </section>

            {/* 3. INTERACTIVE 3D 4K CINEMA SHOWCASE (MOVED UP FOR MAXIMUM VISUAL IMPACT) */}
            <section className="gsap-cinema-trigger max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <div className="text-center max-w-3xl mx-auto space-y-3">
                <span className="pill-capsule font-mono">⚡ Interactive 4K Cinema Database</span>
                <div className="overflow-hidden py-3">
                  <h2 className="gsap-stagger-title text-3xl sm:text-5xl font-extrabold text-white">Experience O3 Studio In Motion</h2>
                </div>
                <p className="text-slate-300 text-sm">Select any of the 6 studio productions below to stream live 4K detailing craftsmanship.</p>
              </div>

              <div className="grid lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8">
                  <div className="gsap-cinema-main video-glass-3d h-[450px]">
                    <video 
                      key={activeCinemaVideo}
                      src={videoGalleryData[activeCinemaVideo].src} 
                      autoPlay 
                      loop 
                      muted 
                      controls
                      playsInline
                    ></video>
                  </div>
                </div>

                <div className="lg:col-span-4 space-y-2.5">
                  <div className="text-xs font-bold text-[#cae8e8] uppercase font-mono mb-2">6 Studio 4K Highlights:</div>
                  {videoGalleryData.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setActiveCinemaVideo(v.id)}
                      className={`w-full p-3 rounded-2xl border text-left transition-all ${
                        activeCinemaVideo === v.id
                          ? 'bg-[#cae8e8] text-[#05070c] border-[#cae8e8] shadow-[0_0_25px_rgba(202,232,232,0.4)]'
                          : 'bg-[#0d111a] text-slate-300 border-[#cae8e8]/20 hover:border-[#cae8e8]/50'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] font-mono font-bold mb-1">
                        <span>{v.badge}</span>
                        <span>{activeCinemaVideo === v.id ? 'NOW PLAYING ▶' : 'PLAY'}</span>
                      </div>
                      <h4 className="text-xs font-bold leading-tight">{v.title}</h4>
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* WORKFLOW TIMELINE SECTION */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <DetailingWorkflowTimeline />
            </section>

            {/* 4. ABOUT & LEADERSHIP HIGHLIGHT */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="glass-surface p-8 sm:p-12 border border-[#cae8e8]/30 bg-gradient-to-br from-[#0a0e17] via-[#0f1726] to-[#05070c]">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-4 border-b border-[#cae8e8]/20">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-[#cae8e8] font-mono font-bold">ABOUT HIGHLIGHT</span>
                    <div className="overflow-hidden py-3">
                      <h2 className="gsap-stagger-title text-3xl font-extrabold text-white">13+ Years Master Detailing Heritage</h2>
                    </div>
                  </div>
                  <button onClick={() => navigateTo('about')} className="btn-secondary text-xs mt-4 md:mt-0">
                    Explore Full About Story →
                  </button>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-5 space-y-4">
                    <img src="assets/sharanpal_sodhi_founder.png" alt="Founder Mr. Sharanpal Sodhi" className="w-full h-80 object-cover rounded-3xl border border-[#cae8e8]/30 shadow-2xl"  loading="lazy" decoding="async" />
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-white">Mr. Sharanpal Sodhi</h3>
                      <p className="text-xs text-[#cae8e8] font-mono">Founder & Master Detailer (Sharanpal Sir)</p>
                    </div>
                  </div>

                  <div className="lg:col-span-7 space-y-5">
                    <div className="relative rounded-3xl overflow-hidden border border-[#cae8e8]/30 shadow-2xl h-72">
                      <video src="assets/porsche_studio_bay_video.mp4" autoPlay loop muted playsInline preload="metadata" className="w-full h-full object-cover rounded-2xl"></video>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      "At O3 Car Spa, detailing is an exact science. From supercars to daily commuters, every panel undergoes multi-stage compound polishing and molecular quartz ceramic bonding inside our 6500K daylight cleanroom."
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 5. SERVICES SHOWCASE HIGHLIGHT */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-[#cae8e8]/20">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#cae8e8] font-mono font-bold">SERVICES MENU HIGHLIGHT</span>
                  <div className="overflow-hidden py-3">
                    <h2 className="gsap-stagger-title text-3xl font-extrabold text-white">11 Precision Treatment Categories</h2>
                  </div>
                </div>
                <button onClick={() => navigateTo('services')} className="btn-secondary text-xs mt-4 md:mt-0">
                  View All 11 Services →
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {allServicesData.slice(0, 3).map((s) => (
                  <div key={s.id} className="glass-surface p-6 border border-[#cae8e8]/25 flex flex-col justify-between space-y-4 group">
                    <div className="space-y-3">
                      <div className="relative overflow-hidden rounded-2xl">
                        <img src={s.img} alt={s.title} className="w-full h-48 object-cover group-hover:scale-103 transition-all"  loading="lazy" decoding="async" />
                        <span className="absolute top-3 right-3 bg-[#05070c]/90 border border-[#cae8e8]/30 text-[#cae8e8] text-[10px] font-mono px-3 py-1 rounded-full backdrop-blur-md">
                          {s.warranty}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{s.icon}</span>
                        <span className="text-[10px] font-mono text-[#cae8e8] uppercase">{s.category}</span>
                      </div>

                      <h3 className="text-xl font-bold text-white group-hover:text-[#cae8e8] transition-colors">{s.title}</h3>
                      <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">{s.tagline}</p>
                    </div>

                    <div className="pt-3 border-t border-[#cae8e8]/15 flex items-center gap-3">
                      <button 
                        onClick={() => setActiveServiceDetail(s)} 
                        className="btn-secondary text-xs flex-1 justify-center py-2.5"
                      >
                        <span>Open Specs 🔍</span>
                      </button>
                      <button 
                        onClick={() => handleOpenBookingWithService(s.title)} 
                        className="btn-primary text-xs flex-1 justify-center py-2.5"
                      >
                        <span>Book Now</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* VEHICLE CONFIGURATOR HIGHLIGHT */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <VehicleStudioConfigurator />
            </section>

            {/* 6. GALLERY HIGHLIGHT */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <div className="glass-surface p-8 border border-[#cae8e8]/30 space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#cae8e8]/20 pb-4">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-[#cae8e8] font-mono font-bold">GALLERY HIGHLIGHT</span>
                    <div className="overflow-hidden py-3">
                      <h2 className="gsap-stagger-title text-3xl font-extrabold text-white">Paint Correction & Hydrophobic Beading Visualizer</h2>
                    </div>
                  </div>
                  <button onClick={() => navigateTo('gallery')} className="btn-secondary text-xs mt-4 md:mt-0">
                    Open Full Gallery →
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <PaintGlowVisualizer />
                  <HydrophobicRainCanvas />
                </div>
              </div>
            </section>

            {/* SCRATCH REPAIR SIMULATOR SECTION */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <PaintScratchHealSimulator />
            </section>

            {/* BESPOKE STUDIO TRANSFORMATION SHOWCASE SECTION */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <LuxuryCarBeforeAfterShowcase />
            </section>

            {/* 7. STUDIO CLEANROOM & PAINT TELEMETRY HIGHLIGHT */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <div className="glass-surface p-8 sm:p-12 border border-[#cae8e8]/30 bg-gradient-to-br from-[#0a0e17] via-[#0f1726] to-[#05070c]">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-4 border-b border-[#cae8e8]/20">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-cyan-400 font-mono font-bold">STUDIO HIGHLIGHT</span>
                    <div className="overflow-hidden py-3">
                      <h2 className="gsap-stagger-title text-3xl font-extrabold text-white">Hexagonal 6500K LED Cleanroom</h2>
                    </div>
                  </div>
                  <button onClick={() => navigateTo('studio')} className="btn-secondary text-xs mt-4 md:mt-0">
                    Inspect Studio Tech →
                  </button>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-6 space-y-4">
                    <img src="assets/o3_studio_environment.png" alt="O3 Cleanroom Studio Environment" className="w-full h-72 object-cover rounded-3xl border border-[#cae8e8]/30 shadow-2xl"  loading="lazy" decoding="async" />
                  </div>

                  <div className="lg:col-span-6 space-y-6 text-xs text-slate-300">
                    <CleanroomClimateHud />

                    <div className="grid sm:grid-cols-3 gap-4 pt-2">
                      <div className="p-4 rounded-2xl bg-[#05070c] border border-[#cae8e8]/20 space-y-1 col-span-3 sm:col-span-1">
                        <strong className="text-white text-xs block">💡 6500K LED Rig</strong>
                        <p className="text-[10px] text-slate-400">Daylight calibrated paint defect scans.</p>
                      </div>
                      <div className="p-4 rounded-2xl bg-[#05070c] border border-[#cae8e8]/20 space-y-1 col-span-3 sm:col-span-1">
                        <strong className="text-white text-xs block">🌀 Climate HEPA</strong>
                        <p className="text-[10px] text-slate-400">Dust-free 22°C ambient bonding.</p>
                      </div>
                      <div className="p-4 rounded-2xl bg-[#05070c] border border-[#cae8e8]/20 space-y-1 col-span-3 sm:col-span-1">
                        <strong className="text-white text-xs block">🔥 IR Curing</strong>
                        <p className="text-[10px] text-slate-400">80°C accelerated curing.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Paint Thickness Hotspot Telemetry Dashboard */}
              <PaintThicknessHotspots />

              {/* Gloss Unit GU Curve Telemetry Chart */}
              <GlossTelemetryChart />
            </section>

            {/* CABIN STARLIGHT SHOWCASE SECTION */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <StarlightCabinCustomizer />
            </section>

            {/* 8. CONCIERGE DOORSTEP HIGHLIGHT */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="glass-surface p-8 sm:p-12 border border-[#cae8e8]/30 bg-gradient-to-r from-[#0d111a] via-[#101726] to-[#05070c]">
                <div className="grid lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-5">
                    <span className="inline-block bg-[#cae8e8]/15 text-[#cae8e8] px-4 py-1 rounded-full text-xs font-mono font-bold">
                      CONCIERGE HIGHLIGHT
                    </span>
                    <div className="overflow-hidden py-3">
                      <h2 className="gsap-stagger-title text-3xl sm:text-4xl font-extrabold text-white">
                        Doorstep Mobile Detailing "O3 On Wheels"
                      </h2>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      Equipped with onboard silent power generators, de-ionized pure water filtration, and Kärcher high-pressure wash systems — bringing the studio directly to your garage.
                    </p>

                    <div className="flex gap-4 pt-2">
                      <button onClick={() => setIsBookingOpen(true)} className="btn-primary text-xs">
                        Book Doorstep Visit
                      </button>
                      <button onClick={() => navigateTo('concierge')} className="btn-secondary text-xs">
                        Explore Concierge →
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-5">
                    <img src="assets/o3_on_wheels.png" alt="O3 On Wheels Mobile Concierge Truck" className="w-full h-64 object-cover rounded-3xl border border-[#cae8e8]/30 shadow-2xl"  loading="lazy" decoding="async" />
                  </div>
                </div>
              </div>
            </section>

            {/* 9. CUSTOMER REVIEWS & TESTIMONIALS HIGHLIGHT */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-[#cae8e8]/20">
                <div>
                  <span className="text-xs uppercase tracking-widest text-amber-400 font-mono font-bold">REVIEWS HIGHLIGHT</span>
                  <div className="overflow-hidden py-3">
                    <h2 className="gsap-stagger-title text-3xl font-extrabold text-white">5.0 ★ Google Rating & Verified Stories</h2>
                  </div>
                </div>
                <button onClick={() => navigateTo('testimonials')} className="btn-secondary text-xs mt-4 md:mt-0">
                  Read All Customer Reviews →
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {realReviews.slice(0, 3).map((rev) => (
                  <div key={rev.id} className="glass-surface p-6 border border-[#cae8e8]/25 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-amber-400 font-bold">{rev.rating}</span>
                        <span className="text-slate-400 font-mono text-[10px]">{rev.time}</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed italic">"{rev.quote}"</p>
                    </div>

                    <div className="pt-3 border-t border-[#cae8e8]/15 flex items-center justify-between text-xs">
                      <div>
                        <strong className="text-white block">{rev.author}</strong>
                        <span className="text-[#cae8e8] text-[11px] font-medium">{rev.car}</span>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20">
                        Verified
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 10. FRANCHISE HIGHLIGHT */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <div className="glass-surface p-8 border border-[#cae8e8]/30 space-y-6 bg-[#0d111a]">
                <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#cae8e8]/20 pb-4">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-purple-400 font-mono font-bold">FRANCHISE HIGHLIGHT</span>
                    <div className="overflow-hidden py-3">
                      <h2 className="gsap-stagger-title text-3xl font-extrabold text-white">Partner with O3 Car-Spa (₹5L & ₹10L Models)</h2>
                    </div>
                  </div>
                  <button onClick={() => navigateTo('franchise')} className="btn-secondary text-xs mt-4 md:mt-0">
                    Explore Franchise Program →
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-3xl bg-[#05070c] border border-[#cae8e8]/20 space-y-3">
                    <img src="assets/o3_on_wheels.png" alt="Mobile Unit Franchise" className="w-full h-40 object-cover rounded-2xl border border-[#cae8e8]/20"  loading="lazy" decoding="async" />
                    <h4 className="text-lg font-bold text-white">Doorstep Detailing Franchise (₹5 Lakhs)</h4>
                    <p className="text-xs text-slate-400">Fully equipped mobile van setup with generator, pure water tank, and German Würth compounds.</p>
                  </div>
                  <div className="p-6 rounded-3xl bg-[#05070c] border border-[#cae8e8]/20 space-y-3">
                    <img src="assets/o3_studio_environment.png" alt="Full Studio Franchise" className="w-full h-40 object-cover rounded-2xl border border-[#cae8e8]/20"  loading="lazy" decoding="async" />
                    <h4 className="text-lg font-bold text-white">Turnkey Precision Studio (₹10 Lakhs)</h4>
                    <p className="text-xs text-slate-400">Complete studio architecture, 6500K LED lighting rig, Rupes polishers, and staff training by Sharanpal Sir.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 11. SMART TREATMENT CONFIGURATOR & ROI CALCULATOR */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <TreatmentConfigurator onBookService={handleOpenBookingWithService} />
            </section>

            {/* 12. REDESIGNED BEAUTIFUL GLASS FAQ HIGHLIGHT SECTION */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <div className="glass-surface p-8 sm:p-12 border border-[#cae8e8]/30 bg-gradient-to-br from-[#0d111a] via-[#101726] to-[#05070c] space-y-8 shadow-2xl">
                
                <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#cae8e8]/20 pb-6">
                  <div className="space-y-1">
                    <span className="text-xs uppercase tracking-widest text-[#cae8e8] font-mono font-bold">
                      💡 KNOWLEDGE BASE & FREQUENTLY ASKED QUESTIONS
                    </span>
                    <div className="overflow-hidden py-3">
                      <h2 className="gsap-stagger-title text-3xl sm:text-4xl font-extrabold text-white">
                        Everything You Need To Know
                      </h2>
                    </div>
                  </div>
                  <button onClick={() => navigateTo('faq')} className="btn-secondary text-xs mt-4 md:mt-0">
                    Read Full Knowledge Base →
                  </button>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      q: 'What is the difference between Ceramic Coating and Paint Protection Film (PPF)?',
                      a: 'PPF is a physical self-healing thermoplastic polyurethane (TPU) film designed to absorb impact energy from stone chips, gravel, keys, and road debris. Ceramic Coating is a liquid quartz SiO₂ & Graphene matrix that chemically bonds to clear coat, providing hyper-hydrophobic water beading, chemical resistance, and deep mirror gloss.'
                    },
                    {
                      q: 'How does O3 On Wheels doorstep car detailing work?',
                      a: 'Our mobile unit arrives directly at your doorstep or office parking equipped with silent power generators, de-ionized pure water filtration, Kärcher high-pressure foam washers, and dry steam extractors for 100% self-powered detailing.'
                    },
                    {
                      q: 'How long does a studio Paint Correction & Ceramic Coating take?',
                      a: 'A complete multi-stage paint defect compounding pass and 9H liquid ceramic quartz application requires 24 to 48 hours to allow surface decontamination, scratch leveling, and shortwave infra-red lamp curing at 80°C.'
                    },
                    {
                      q: 'What chemicals and compounding equipment are used at O3 Car Spa?',
                      a: 'We exclusively utilize Italian Rupes BigFoot orbital polishers, German Würth protection systems, Scangrip 6500K color-calibrated daylight LEDs, and Grade-A Brazilian Carnauba natural waxes.'
                    }
                  ].map((faq, idx) => (
                    <div 
                      key={idx} 
                      className="p-1 rounded-[24px] bg-[#cae8e8]/5 border border-[#cae8e8]/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] transition-all duration-500 hover:border-[#cae8e8]/30 hover:bg-[#cae8e8]/8"
                    >
                      <div className={`rounded-[20px] transition-all duration-500 overflow-hidden ${
                        expandedFaq === idx 
                          ? 'bg-[#05070c] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] border border-[#cae8e8]/25' 
                          : 'bg-transparent border border-transparent'
                      }`}>
                        <button 
                          onClick={() => setExpandedFaq(expandedFaq === idx ? -1 : idx)}
                          className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-white text-base sm:text-lg group"
                        >
                          <span className="group-hover:text-[#cae8e8] transition-colors">{faq.q}</span>
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
                            expandedFaq === idx 
                              ? 'bg-[#cae8e8] text-[#05070c] border-[#cae8e8] font-bold rotate-180' 
                              : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-500'
                          }`}>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d={expandedFaq === idx ? "M18 12H6" : "M12 6v12M6 12h12"} />
                            </svg>
                          </span>
                        </button>

                        {expandedFaq === idx && (
                          <div className="px-6 pb-6 text-xs sm:text-sm text-slate-300 leading-relaxed font-light border-t border-[#cae8e8]/10 pt-4 ml-6 mr-6">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </section>

            {/* 13. FULLY DETAILED INTERACTIVE GOOGLE MAP & SOCIAL API CONNECT HUB */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <div className="glass-surface p-8 sm:p-12 border border-[#cae8e8]/30 bg-gradient-to-r from-[#0d111a] via-[#101827] to-[#05070c]">
                
                <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
                  <span className="pill-capsule font-mono">📍 Studio Location & Direct API Hub</span>
                  <div className="overflow-hidden py-3">
                    <h2 className="gsap-stagger-title text-3xl sm:text-4xl font-extrabold text-white">Find Our Studio & Connect Direct</h2>
                  </div>
                  <p className="text-xs text-slate-300">Interactive GPS directions to our Vallabh Vidyanagar cleanroom studio + instant API channels.</p>
                </div>

                {/* DETAILED MAP + STUDIO LOCATION INFO GRID */}
                <div className="grid lg:grid-cols-12 gap-8 items-center mb-10">
                  
                  {/* Embedded Google Map */}
                  <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-[#cae8e8]/30 shadow-2xl h-80 sm:h-96">
                    <iframe 
                      title="O3 Car-Spa Studio Location Map"
                      src="https://maps.google.com/maps?q=O3%20Car%20Spa%20New%20Vallabh%20Vidyanagar%20GIDC%20Anand%20Gujarat&t=&z=15&ie=UTF8&iwloc=&output=embed"
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }} 
                      allowFullScreen="" 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>

                  {/* Studio Details Card */}
                  <div className="lg:col-span-5 space-y-5 p-6 rounded-3xl bg-[#05070c] border border-[#cae8e8]/20 text-xs text-slate-300">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-[#cae8e8] uppercase font-bold">Flagship Studio Facility</span>
                      <h3 className="text-xl font-bold text-white">O3 Car-Spa Studio, Anand</h3>
                      <p className="text-[11px] text-emerald-400 font-mono">Directed by Mr. Sharanpalsingh Sodhi</p>
                    </div>

                    <div className="space-y-3 pt-2">
                      <div className="flex items-start gap-3">
                        <span className="text-lg">📍</span>
                        <div>
                          <strong className="text-white block">Full Studio Address:</strong>
                          Plot No. 37, Zone No. D5, Opp. Bank of Baroda, GIDC, Vitthal Udyognagar, Anand, Gujarat (388121)
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <span className="text-lg">⏰</span>
                        <div>
                          <strong className="text-white block">Studio Working Hours:</strong>
                          Monday – Sunday: 9:00 AM – 8:00 PM
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <span className="text-lg">📞</span>
                        <div>
                          <strong className="text-white block">Direct Booking / Query Line:</strong>
                          <a href="tel:7225030303" className="text-[#00f0ff] hover:underline font-mono font-bold">72250 30303</a>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <span className="text-lg">✉️</span>
                        <div>
                          <strong className="text-white block">Official Email:</strong>
                          <a href="mailto:o3carspavvn@gmail.com" className="text-[#cae8e8] hover:underline font-mono">o3carspavvn@gmail.com</a>
                        </div>
                      </div>
                    </div>

                    <a 
                      href="https://www.google.com/maps/dir/?api=1&destination=22.5492,72.9304" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn-primary text-xs w-full justify-center py-3 mt-2"
                    >
                      🚀 Open Turn-By-Turn GPS Directions
                    </a>
                  </div>

                </div>

                {/* 5 DIRECT SOCIAL & API TILES */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 pt-4 border-t border-[#cae8e8]/20">
                  {/* WhatsApp API */}
                  <a 
                    href="https://wa.me/917225030303?text=Hello%20O3%20Car-Spa!%20I%20want%20to%20book%20a%20detailing%20session." 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-5 rounded-2xl bg-[#0d1a14] border border-emerald-500/30 hover:border-emerald-400 text-center space-y-2 transition-all hover:-translate-y-1 group"
                  >
                    <div className="text-3xl text-emerald-400">💬</div>
                    <div className="text-xs font-bold text-white group-hover:text-emerald-400">WhatsApp Chat</div>
                    <div className="text-[10px] font-mono text-emerald-400">72250 30303</div>
                  </a>

                  {/* Phone Direct */}
                  <a 
                    href="tel:7225030303" 
                    className="p-5 rounded-2xl bg-[#091524] border border-cyan-500/30 hover:border-cyan-400 text-center space-y-2 transition-all hover:-translate-y-1 group"
                  >
                    <div className="text-3xl text-cyan-400">📞</div>
                    <div className="text-xs font-bold text-white group-hover:text-cyan-400">Call Direct</div>
                    <div className="text-[10px] font-mono text-cyan-400">72250 30303</div>
                  </a>

                  {/* Google Maps Direction */}
                  <a 
                    href="https://www.google.com/maps/dir/?api=1&destination=22.5492,72.9304" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-5 rounded-2xl bg-[#1b140a] border border-amber-500/30 hover:border-amber-400 text-center space-y-2 transition-all hover:-translate-y-1 group"
                  >
                    <div className="text-3xl text-amber-400">📍</div>
                    <div className="text-xs font-bold text-white group-hover:text-amber-400">GPS Directions</div>
                    <div className="text-[10px] font-mono text-amber-400">GIDC, Vidyanagar</div>
                  </a>

                  {/* Instagram API */}
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-5 rounded-2xl bg-[#1d0918] border border-pink-500/30 hover:border-pink-400 text-center space-y-2 transition-all hover:-translate-y-1 group"
                  >
                    <div className="text-3xl text-pink-400">📸</div>
                    <div className="text-xs font-bold text-white group-hover:text-pink-400">Instagram</div>
                    <div className="text-[10px] font-mono text-pink-400">@O3CarSpa</div>
                  </a>

                  {/* Facebook API */}
                  <a 
                    href="https://facebook.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-5 rounded-2xl bg-[#0c1328] border border-blue-500/30 hover:border-blue-400 text-center space-y-2 transition-all hover:-translate-y-1 group col-span-2 sm:col-span-1"
                  >
                    <div className="text-3xl text-blue-400">📘</div>
                    <div className="text-xs font-bold text-white group-hover:text-blue-400">Facebook</div>
                    <div className="text-[10px] font-mono text-blue-400">O3 Car Spa</div>
                  </a>
                </div>

              </div>
            </section>

          </div>
        )}

        
        {/* ---------------- OUR STORY VIEW (ELEGANT NARRATIVE & HERITAGE) ---------------- */}
        {currentView === 'story' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
            
            {/* HERO TITLE */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="pill-capsule font-mono">Our Heritage & Craftsmanship Spine</span>
              <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
                The Story of <span className="text-gradient-ocean font-black">O3 Car-Spa</span>
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Built one careful detail at a time — from a single unit in Vallabh Vidyanagar to Anand's premier automotive cleanroom studio.
              </p>
            </div>

            {/* 3 IMAGE-LED ELEGANT NARRATIVE CHAPTER CARDS */}
            <div className="grid md:grid-cols-3 gap-8">
              
              <div className="glass-surface p-6 border border-[#cae8e8]/25 space-y-4 bg-[#0d111a] hover:border-[#00f0ff] transition-all duration-300 group">
                <div className="relative h-56 rounded-2xl overflow-hidden bg-black border border-[#cae8e8]/20">
                  <img src="assets/o3_studio_environment.png" alt="How It Started" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"  loading="lazy" decoding="async" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d111a] via-transparent to-transparent opacity-80"></div>
                  <span className="absolute top-3 left-3 bg-[#05070c]/90 border border-[#cae8e8]/30 text-[#00f0ff] text-[10px] font-mono px-3 py-1 rounded-full backdrop-blur-md font-bold">
                    Chapter 01 · Origin
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-extrabold text-white group-hover:text-[#00f0ff] transition-colors">How It Started</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    O3 Car Spa began with a simple frustration — most car washes rush through the job, and cars come out looking barely better than before. We wanted to build something different: a studio where every car gets time, attention, and the right products, not just a quick rinse.
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed font-mono">
                    What started as a single unit in Vallabh Vidyanagar has grown into a name car owners across Anand trust — built one careful detail at a time.
                  </p>
                </div>
              </div>

              <div className="glass-surface p-6 border border-[#cae8e8]/25 space-y-4 bg-[#0d111a] hover:border-[#00f0ff] transition-all duration-300 group">
                <div className="relative h-56 rounded-2xl overflow-hidden bg-black border border-[#cae8e8]/20">
                  <img src="assets/o3_equipment_lab.png" alt="Meaning Behind Our Name" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"  loading="lazy" decoding="async" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d111a] via-transparent to-transparent opacity-80"></div>
                  <span className="absolute top-3 left-3 bg-[#05070c]/90 border border-[#cae8e8]/30 text-[#00f0ff] text-[10px] font-mono px-3 py-1 rounded-full backdrop-blur-md font-bold">
                    Chapter 02 · Identity
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-extrabold text-white group-hover:text-[#00f0ff] transition-colors">The Meaning Behind O3</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Ozone — O3 — adds an extra layer of protection to the air around us. That's exactly what we do for your car.
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed font-mono">
                    Every service we offer adds a molecular layer of care, silica quartz protection, and deep gloss that goes beyond a regular wash. We add an atom of oxygen to your car.
                  </p>
                </div>
              </div>

              <div className="glass-surface p-6 border border-[#cae8e8]/25 space-y-4 bg-[#0d111a] hover:border-[#00f0ff] transition-all duration-300 group">
                <div className="relative h-56 rounded-2xl overflow-hidden bg-black border border-[#cae8e8]/20">
                  <img src="assets/o3_mercedes_amg.png" alt="Where We Are Today" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"  loading="lazy" decoding="async" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d111a] via-transparent to-transparent opacity-80"></div>
                  <span className="absolute top-3 left-3 bg-[#05070c]/90 border border-[#cae8e8]/30 text-[#00f0ff] text-[10px] font-mono px-3 py-1 rounded-full backdrop-blur-md font-bold">
                    Chapter 03 · Excellence
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-extrabold text-white group-hover:text-[#00f0ff] transition-colors">Where We Are Today</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Today, O3 Car Spa runs a full studio with modern equipment, trained detailers, and a growing list of customers who trust us with their cars — from daily drivers to premium rides.
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed font-mono">
                    Equipped with 6500K LED cleanrooms, infrared curing lamps, and global brand formulations from Germany, Italy, and Japan.
                  </p>
                </div>
              </div>

            </div>

            {/* IN-DEPTH 13-YEAR TIMELINE */}
            <div className="glass-surface p-8 sm:p-12 border border-[#cae8e8]/30 space-y-8 bg-[#0d111a]">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-xs uppercase tracking-widest text-[#00f0ff] font-mono font-bold">HERITAGE TIMELINE</span>
                <h2 className="text-3xl font-extrabold text-white">Our 13-Year Milestone Journey</h2>
              </div>

              <div className="grid md:grid-cols-4 gap-6 text-left">
                <div className="p-5 rounded-2xl bg-[#05070c] border border-[#cae8e8]/20 space-y-2 hover:border-[#00f0ff] transition-all">
                  <span className="text-xs font-mono text-[#00f0ff] font-bold">2011 — FOUNDATION</span>
                  <h4 className="text-base font-bold text-white">First Studio Opening</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">Sharanpal Sir establishes Anand's first specialized car spa bay in GIDC, Vallabh Vidyanagar.</p>
                </div>
                <div className="p-5 rounded-2xl bg-[#05070c] border border-[#cae8e8]/20 space-y-2 hover:border-[#00f0ff] transition-all">
                  <span className="text-xs font-mono text-[#00f0ff] font-bold">2016 — INNOVATION</span>
                  <h4 className="text-base font-bold text-white">9H Silica Ceramic Pass</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">Introduces liquid silica quartz ceramic coating and infrared curing lamps to Anand.</p>
                </div>
                <div className="p-5 rounded-2xl bg-[#05070c] border border-[#cae8e8]/20 space-y-2 hover:border-[#00f0ff] transition-all">
                  <span className="text-xs font-mono text-[#00f0ff] font-bold">2020 — EXPANSION</span>
                  <h4 className="text-base font-bold text-white">O3 On Wheels Concierge</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">Launches fully equipped mobile detailing truck unit for doorstep visits.</p>
                </div>
                <div className="p-5 rounded-2xl bg-[#05070c] border border-[#cae8e8]/20 space-y-2 hover:border-[#00f0ff] transition-all">
                  <span className="text-xs font-mono text-[#00f0ff] font-bold">PRESENT — FLAGSHIP</span>
                  <h4 className="text-base font-bold text-white">Hexagonal Cleanroom</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">Full 4K video cleanroom bay accommodating exotic supercars and daily rides.</p>
                </div>
              </div>
            </div>

            {/* FOUNDER SPOTLIGHT CARD */}
            <div className="glass-surface p-8 sm:p-12 border border-[#cae8e8]/30 bg-gradient-to-br from-[#0a0e17] via-[#0f1726] to-[#05070c] space-y-6">
              <span className="text-xs uppercase tracking-widest text-[#00f0ff] font-mono font-bold">MEET THE FOUNDER</span>
              <div className="grid lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-4 space-y-3">
                  <img src="assets/sharanpal_sodhi_founder.png" alt="Sharanpal Sodhi — Founder, O3 Car Spa" className="w-full h-80 object-cover rounded-3xl border border-[#cae8e8]/30 shadow-2xl"  loading="lazy" decoding="async" />
                  <div>
                    <h3 className="text-2xl font-bold text-white">Sharanpal Sodhi</h3>
                    <p className="text-xs text-[#00f0ff] font-mono">Founder, O3 Car Spa</p>
                  </div>
                </div>
                <div className="lg:col-span-8 space-y-4">
                  <h3 className="text-3xl font-extrabold text-white leading-tight">
                    "We don't just wash cars. We take care of them."
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    O3 Car Spa was founded on a simple belief: a car is more than a machine — it's something people take pride in. Sharanpal built the studio from the ground up, focused on one goal — bringing genuine, detail-first car care to Anand, without cutting corners.
                  </p>
                  <blockquote className="p-4 rounded-2xl bg-[#05070c] border border-[#cae8e8]/20 text-xs italic text-[#cae8e8]">
                    "Every car that enters our bay gets the same level of precision and obsessive care as if it were our own personal machine." — Sharanpal Sodhi
                  </blockquote>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ---------------- ABOUT VIEW (EXPANDED & IN-DEPTH) ---------------- */}
        {currentView === 'about' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
            
            {/* BRAND VISION HEADER */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <img src="assets/o3_official_logo.png" alt="O3 CAR-SPA Logo" className="logo-blend h-16 w-auto mx-auto mb-2"  loading="lazy" decoding="async" />
              <span className="text-xs uppercase tracking-widest text-[#00f0ff] font-mono font-bold">WE ADD AN ATOM OF OXYGEN TO YOUR AUTOMOBILES</span>
              <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
                About <span className="text-gradient-ocean font-black">O3 Car Spa</span>
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                O3 Car Spa is changing the way people think about car care. We built a cleaning studio around one core idea — your car should feel brand new, every time you drive it. Using high-pressure cleaning machines, steam cleaners, powerful vacuums, and precise spray equipment, we treat every car like it's the only one in the shop.
              </p>
            </div>

            {/* MISSION & 3 DIFFERENTIATORS */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass-surface p-8 border border-[#cae8e8]/30 space-y-4 bg-[#0d111a]">
                <span className="text-xs font-mono text-[#00f0ff] uppercase font-bold">Our Mission</span>
                <h3 className="text-2xl font-bold text-white">Honest, Thorough & Done Right</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  To give every car the kind of care it deserves — honest, thorough, and done right the first time. We treat detailing as a precision craft rather than a volume business.
                </p>
              </div>

              <div className="glass-surface p-8 border border-[#cae8e8]/30 space-y-4 bg-[#0d111a]">
                <span className="text-xs font-mono text-[#00f0ff] uppercase font-bold">What Makes Us Different</span>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-[#00f0ff] font-bold">✓</span>
                    <span><strong>No shortcuts:</strong> Every wash, every coat, every polish is done the full way — not the fast way.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00f0ff] font-bold">✓</span>
                    <span><strong>Global-standard products:</strong> We only use brands trusted by detailers worldwide.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00f0ff] font-bold">✓</span>
                    <span><strong>Real training:</strong> Our team isn't just taught to clean — they're taught to care.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* 4 STUDIO CORE VALUES */}
            <div className="glass-surface p-8 sm:p-12 border border-[#cae8e8]/30 space-y-8 bg-[#0d111a]">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-xs uppercase tracking-widest text-[#00f0ff] font-mono font-bold">STUDIO STANDARDS</span>
                <h2 className="text-3xl font-extrabold text-white">Our 4 Core Studio Pillars</h2>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { num: '01', title: 'Precision over Speed', desc: 'Zero rushed jobs. Multi-stage polish and cleanroom curing given full allocated time.' },
                  { num: '02', title: 'Pure De-Ionized Wash', desc: 'Pure mineral-free water and high-glow foam washes eliminating micro-swirls.' },
                  { num: '03', title: '6500K Inspection', desc: 'Daylight calibrated LED inspection revealing 0.1-micron paint defects.' },
                  { num: '04', title: 'Lifetime Support', desc: 'Continuous ceramic maintenance support, annual check-ups, and warranties.' },
                ].map((p, pIdx) => (
                  <div key={pIdx} className="p-5 rounded-2xl bg-[#05070c] border border-[#cae8e8]/20 space-y-2 hover:border-[#00f0ff] transition-all">
                    <span className="text-xs font-mono text-[#00f0ff] font-bold">{p.num}</span>
                    <h4 className="text-base font-bold text-white">{p.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* FOUNDER & STUDIO PHOTO SPOTLIGHT */}
            <div className="grid md:grid-cols-3 gap-8">
              <div className="glass-surface p-6 border border-[#cae8e8]/30 space-y-4 text-center">
                <img src="assets/sharanpal_sodhi_founder.png" alt="Founder Mr. Sharanpal Sodhi" className="w-full h-64 object-cover rounded-2xl border border-[#cae8e8]/20"  loading="lazy" decoding="async" />
                <div>
                  <h3 className="text-xl font-bold text-white">Mr. Sharanpal Sodhi</h3>
                  <span className="text-xs text-[#00f0ff] font-mono">Founder & Master Detailer (13+ Yrs)</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Personally inspects ceramic flash patterns, PPF edge tucks, and paint correction depth across supercars and everyday rides.
                </p>
              </div>

              <div className="glass-surface p-6 border border-[#cae8e8]/30 space-y-4 text-center">
                <img src="assets/o3_detailers_team.png" alt="O3 Certified Detailers Team" className="w-full h-64 object-cover rounded-2xl border border-[#cae8e8]/20"  loading="lazy" decoding="async" />
                <div>
                  <h3 className="text-xl font-bold text-white">Master Technicians</h3>
                  <span className="text-xs text-[#00f0ff] font-mono">Rupes Italian Certified Craftsmen</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Trained in multi-stage micro-abrasive compounding, hot steam sanitization, and dust-free TPU edge sealing.
                </p>
              </div>

              <div className="glass-surface p-6 border border-[#cae8e8]/30 space-y-4 text-center">
                <img src="assets/o3_equipment_lab.png" alt="O3 Detailing Equipment & Lab Setup" className="w-full h-64 object-cover rounded-2xl border border-[#cae8e8]/20"  loading="lazy" decoding="async" />
                <div>
                  <h3 className="text-xl font-bold text-white">German & Italian Tools</h3>
                  <span className="text-xs text-[#00f0ff] font-mono">Würth & Rupes BigFoot System</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Equipped with shortwave infra-red curing lamps, 6500K daylight LED rigs, and ultrasonic micrometer gauges.
                </p>
              </div>
            </div>

            {/* BRANDS WE TRUST SECTION */}
            <div className="glass-surface p-8 sm:p-12 border border-[#cae8e8]/30 space-y-8 bg-[#0d111a]">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-xs uppercase tracking-widest text-[#00f0ff] font-mono font-bold">AUTHENTIC PRODUCTS ONLY</span>
                <h2 className="text-3xl font-extrabold text-white">Brands We Trust</h2>
                <p className="text-xs text-slate-300">Every product on your car is a trusted, industry-leading global brand.</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 text-left text-xs">
                {[
                  { name: "Meguiar's", note: "Trusted since 1901", logo: "assets/logos/meguiars.png" },
                  { name: "Menzerna", note: "Polishing compounds", logo: "assets/logos/menzerna.png" },
                  { name: "Paicristal Italia", note: "Masters in polishing since 1965", logo: "assets/logos/paicristal.png" },
                  { name: "Kisho", note: "Japanese craftsmanship since 1965", logo: "assets/logos/kisho.png" },
                  { name: "Würth", note: "German car care compounds", logo: "assets/logos/wurth.png" },
                  { name: "Ma-Fra", note: "Cosmetics for your car", logo: "assets/logos/mafra.png" },
                  { name: "3M Car Care", note: "Keep your car looking new", logo: "assets/logos/3m.png" },
                  { name: "Vista Car Care", note: "Surface protection", logo: "assets/logos/vista.png" },
                  { name: "Chem-Verse Consultants", note: "ISO 9001 Certified", logo: "assets/logos/chemverse.png" },
                ].map((b, bIdx) => (
                  <div key={bIdx} className="p-4 rounded-2xl bg-[#05070c] border border-[#cae8e8]/20 space-y-3 hover:border-[#00f0ff] transition-all flex flex-col justify-between group hover:-translate-y-1">
                    <div className="h-16 rounded-xl bg-black/60 border border-[#cae8e8]/15 overflow-hidden flex items-center justify-center p-2 group-hover:border-[#00f0ff]/50 transition-all">
                      <img src={b.logo} alt={b.name} className="h-full w-auto object-contain group-hover:scale-105 transition-transform"  loading="lazy" decoding="async" />
                    </div>
                    <div>
                      <strong className="text-white text-sm block leading-tight">{b.name}</strong>
                      <span className="text-[10px] text-slate-400 block mt-0.5 font-mono">{b.note}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ---------------- PRODUCTS VIEW (PROFESSIONAL E-COMMERCE DETAILING STORE) ---------------- */}
        {currentView === 'products' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
            
            {/* STOREFRONT HERO */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="pill-capsule font-mono">In-Studio Detailing Inventory & Store</span>
              <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
                Shop Our <span className="text-gradient-ocean font-black">Detailing Essentials</span>
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Bring the O3 Car Spa finish home. We stock authentic, global-standard detailing formulations, ceramic maintenance boosters, and professional applicator kits.
              </p>
            </div>

            {/* 4 FEATURED CATEGORY BANNER CARDS WITH HIGH-RES GENERATED IMAGES */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Exterior Care', desc: 'pH-balanced shampoos, snow foam cleaners, synthetic sealant waxes', img: 'assets/product_exterior_care.png', cat: 'Exterior Care' },
                { title: 'Interior Care', desc: 'Leather nourishers, dashboard UV polish, anti-bacterial sanitizers', img: 'assets/product_interior_leather.png', cat: 'Interior Care' },
                { title: 'Coating Kits', desc: 'DIY 9H quartz ceramic, hydrophobic glass & graphene booster kits', img: 'assets/product_coating_kit.png', cat: 'Coating Kits' },
                { title: 'Tools & Towels', desc: 'Plush edgeless microfibers, Rupes foam pads, detailing brushes', img: 'assets/product_tools_accessories.png', cat: 'Tools & Accessories' },
              ].map((cItem, cIdx) => (
                <div 
                  key={cIdx} 
                  onClick={() => setProductCategory(cItem.cat)}
                  className="glass-surface p-4 border border-[#cae8e8]/25 hover:border-[#00f0ff] space-y-3 cursor-pointer group transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-44 rounded-2xl overflow-hidden bg-black border border-[#cae8e8]/20">
                    <img src={cItem.img} alt={cItem.title} className="w-full h-full object-cover group-hover:scale-108 transition-all duration-500"  loading="lazy" decoding="async" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#05070c] via-transparent to-transparent opacity-80"></div>
                    <span className="absolute bottom-3 left-3 text-xs font-mono font-bold text-[#00f0ff] bg-[#05070c]/80 px-2.5 py-1 rounded-full border border-[#00f0ff]/30">
                      Explore SKU Grid →
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-[#00f0ff] transition-colors">{cItem.title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-2 mt-1">{cItem.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* PRODUCT FILTER TABS */}
            <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto pt-4 border-t border-[#cae8e8]/20">
              {[
                { id: 'all', label: '🛒 All Products (12)' },
                { id: 'Exterior Care', label: '🧼 Exterior Care' },
                { id: 'Interior Care', label: '🪑 Interior Care' },
                { id: 'Coating Kits', label: '✨ Coating Kits' },
                { id: 'Tools & Accessories', label: '🧽 Tools & Accessories' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setProductCategory(tab.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    productCategory === tab.id
                      ? 'bg-[#00f0ff] text-[#05070c] shadow-[0_0_20px_rgba(0,240,255,0.4)] font-bold'
                      : 'bg-[#0d111a] text-slate-300 border border-[#cae8e8]/20 hover:border-[#cae8e8]/50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* 12 SKU DETAILED PRODUCTS GRID */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  id: 'p1',
                  name: "Meguiar's Gold Class Wash & Conditioner (16oz)",
                  brand: "Meguiar's",
                  category: "Exterior Care",
                  price: "₹ 1,250",
                  img: "assets/product_exterior_care.png",
                  desc: "pH-balanced luxury wash formula that cleans paint without stripping existing wax or ceramic coating protection.",
                  specs: "Formula: Rich Carnauba Conditioner · Volume: 473ml · Origin: USA",
                  inStock: true
                },
                {
                  id: 'p2',
                  name: "Menzerna Heavy Cut Compound 400 (250ml)",
                  brand: "Menzerna",
                  category: "Exterior Care",
                  price: "₹ 1,890",
                  img: "assets/gallery/35_44_services_design_extra_services_also_mentioned_19_graphene_design.jpg",
                  desc: "German high-performance compound that removes 1200 grit sanding marks and deep scratches rapidly.",
                  specs: "Cut Level: 9/10 · Gloss Level: 8/10 · Silicone-Free · Origin: Germany",
                  inStock: true
                },
                {
                  id: 'p3',
                  name: "Würth German 9H Silica Ceramic DIY Kit",
                  brand: "Würth",
                  category: "Coating Kits",
                  price: "₹ 4,990",
                  img: "assets/product_coating_kit.png",
                  desc: "Complete German engineered liquid quartz ceramic kit providing 3 years of hyper-hydrophobic water beading.",
                  specs: "Hardness: 9H Pencil · Coverage: 50ml · Durability: 3 Years · Origin: Germany",
                  inStock: true
                },
                {
                  id: 'p4',
                  name: "Ma-Fra Leather Care & Conditioning Cream (500ml)",
                  brand: "Ma-Fra",
                  category: "Interior Care",
                  price: "₹ 1,450",
                  img: "assets/product_interior_leather.png",
                  desc: "Italian leather cosmetics formula enriched with Aloe Vera and natural oils to prevent cracking and fading.",
                  specs: "Finish: Natural Matte · Volume: 500ml · Scent: Fresh Leather · Origin: Italy",
                  inStock: true
                },
                {
                  id: 'p5',
                  name: "3M Ultra-Plush Microfiber Towels (Pack of 4)",
                  brand: "3M Car Care",
                  category: "Tools & Accessories",
                  price: "₹ 790",
                  img: "assets/product_tools_accessories.png",
                  desc: "500 GSM edgeless microfibers engineered for streak-free polish removal, drying, and glass wiping.",
                  specs: "Density: 500 GSM · Size: 40cm x 40cm · Scratch-Free Edgeless · Pack of 4",
                  inStock: true
                },
                {
                  id: 'p6',
                  name: "Kisho Japanese Hydrophobic Glass Coating Kit",
                  brand: "Kisho",
                  category: "Coating Kits",
                  price: "₹ 3,490",
                  img: "assets/o3_ceramic_coating.png",
                  desc: "Japanese fluorine silica glass coating creating a water-repellent barrier for windshields and windows.",
                  specs: "Water Contact Angle: 110° · Rain Visibility Speed: 40km/h · Origin: Japan",
                  inStock: true
                },
                {
                  id: 'p7',
                  name: "Meguiar's Ultimate Synthetic Polymer Wax (16oz)",
                  brand: "Meguiar's",
                  category: "Exterior Care",
                  price: "₹ 2,150",
                  img: "assets/product_exterior_care.png",
                  desc: "Advanced pure synthetic wax offering maximum gloss, mirror reflections, and hydrophobic slickness.",
                  specs: "Technology: ThinFilm Hydrophobic · Easy On/Off · Volume: 473ml · Origin: USA",
                  inStock: true
                },
                {
                  id: 'p8',
                  name: "Paicristal Italia High-Gloss Micro Polish (500ml)",
                  brand: "Paicristal Italia",
                  category: "Exterior Care",
                  price: "₹ 2,350",
                  img: "assets/gallery/35_44_services_design_extra_services_also_mentioned_17_cute_wash_design.jpg",
                  desc: "Master Italian micro-abrasive polish designed to eliminate fine swirl marks and deliver deep wet-look shine.",
                  specs: "Cut Level: 3/10 · Gloss Level: 10/10 · Zero Dusting · Origin: Italy",
                  inStock: true
                },
                {
                  id: 'p9',
                  name: "Vista Dashboard Anti-Static Clean & Shine Spray",
                  brand: "Vista Car Care",
                  category: "Interior Care",
                  price: "₹ 650",
                  img: "assets/product_interior_leather.png",
                  desc: "Restores vinyl, plastic dashboard, and door trims with non-greasy UV protective satin sheen.",
                  specs: "Protection: UV Blocker · Non-Sticky · Volume: 500ml",
                  inStock: true
                },
                {
                  id: 'p10',
                  name: "Würth Engine Bay & Rubber Dressing (500ml)",
                  brand: "Würth",
                  category: "Exterior Care",
                  price: "₹ 1,190",
                  img: "assets/product_tools_accessories.png",
                  desc: "Protective engine bay coating and rubber trim preservative engineered to withstand high temperatures.",
                  specs: "Heat Resistance: 200°C · Anti-Corrosive · Volume: 500ml · Origin: Germany",
                  inStock: true
                },
                {
                  id: 'p11',
                  name: "O3 Studio DIY Ceramic Booster Refresher Spray",
                  brand: "O3 Studio",
                  category: "Coating Kits",
                  price: "₹ 1,690",
                  img: "assets/product_coating_kit.png",
                  desc: "Spray-on silica quartz ceramic booster to rejuvenate hydrophobic water beading on existing coatings.",
                  specs: "Silica Content: 12% SiO2 · Application: Spray & Wipe · Volume: 300ml",
                  inStock: true
                },
                {
                  id: 'p12',
                  name: "Rupes BigFoot Italian Compounding Foam Pads (Set of 2)",
                  brand: "Rupes",
                  category: "Tools & Accessories",
                  price: "₹ 1,950",
                  img: "assets/product_tools_accessories.png",
                  desc: "Authentic Italian open-cell foam polishing pads engineered for Rupes dual-action random orbital polishers.",
                  specs: "Diameter: 150mm (6 in) · Pattern: Beveled Edge · Set of 2 · Origin: Italy",
                  inStock: true
                }
              ].filter(item => productCategory === 'all' || item.category === productCategory).map((prod) => (
                <div key={prod.id} className="glass-surface p-6 border border-[#cae8e8]/25 flex flex-col justify-between space-y-4 group hover:border-[#00f0ff] transition-all">
                  
                  <div className="space-y-4">
                    <div className="relative rounded-2xl overflow-hidden bg-black border border-[#cae8e8]/20 aspect-video">
                      <img src={prod.img} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"  loading="lazy" decoding="async" />
                      <span className="absolute top-3 left-3 bg-[#05070c]/90 border border-[#cae8e8]/30 text-[#00f0ff] text-[10px] font-mono px-3 py-1 rounded-full backdrop-blur-md font-bold">
                        {prod.brand}
                      </span>
                      <span className="absolute bottom-3 right-3 bg-[#00f0ff] text-[#05070c] font-extrabold text-xs font-mono px-3 py-1 rounded-full shadow-[0_0_15px_rgba(0,240,255,0.5)]">
                        {prod.price}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-[#cae8e8] uppercase font-bold">{prod.category}</span>
                      <h3 className="text-lg font-bold text-white group-hover:text-[#00f0ff] transition-colors leading-snug">{prod.name}</h3>
                      <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">{prod.desc}</p>
                    </div>

                    <div className="pt-2 text-[11px] font-mono text-slate-400 border-t border-[#cae8e8]/15 space-y-1">
                      <div><strong className="text-white">Specs:</strong> {prod.specs}</div>
                      <div><strong className="text-emerald-400">Status:</strong> In Stock at Studio</div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#cae8e8]/15 flex items-center gap-3">
                    <button 
                      onClick={() => setSelectedProduct(prod)}
                      className="btn-secondary text-xs flex-1 justify-center py-2.5"
                    >
                      <span>View Details 🔍</span>
                    </button>
                    <a 
                      href={`https://wa.me/917225030303?text=Hello%20O3%20Car-Spa!%20I%20want%20to%20order%20product:%20${encodeURIComponent(prod.name)}%20(${prod.price})`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary text-xs flex-1 justify-center py-2.5"
                    >
                      <span>Order Now 🛒</span>
                    </a>
                  </div>

                </div>
              ))}
            </div>

            {/* FEATURED GLOBAL DETAILING BRANDS SHOWCASE */}
            <div className="glass-surface p-8 sm:p-12 border border-[#cae8e8]/30 space-y-8 bg-[#0d111a]">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-xs uppercase tracking-widest text-[#00f0ff] font-mono font-bold">100% AUTHENTIC FORMULATIONS</span>
                <h2 className="text-3xl font-extrabold text-white">Global Brands We Stock</h2>
                <p className="text-xs text-slate-300">We stock the exact imported detailing brands used in our Vallabh Vidyanagar studio bay.</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 text-left text-xs">
                {[
                  { name: "Meguiar's", note: "Trusted since 1901", logo: "assets/logos/meguiars.png" },
                  { name: "Menzerna", note: "Polishing compounds", logo: "assets/logos/menzerna.png" },
                  { name: "Paicristal Italia", note: "Masters in polishing since 1965", logo: "assets/logos/paicristal.png" },
                  { name: "Kisho", note: "Japanese craftsmanship since 1965", logo: "assets/logos/kisho.png" },
                  { name: "Würth", note: "German car care compounds", logo: "assets/logos/wurth.png" },
                  { name: "Ma-Fra", note: "Cosmetics for your car", logo: "assets/logos/mafra.png" },
                  { name: "3M Car Care", note: "Keep your car looking new", logo: "assets/logos/3m.png" },
                  { name: "Vista Car Care", note: "Surface protection", logo: "assets/logos/vista.png" },
                  { name: "Chem-Verse Consultants", note: "ISO 9001 Certified", logo: "assets/logos/chemverse.png" },
                ].map((b, bIdx) => (
                  <div key={bIdx} className="p-4 rounded-2xl bg-[#05070c] border border-[#cae8e8]/20 space-y-3 hover:border-[#00f0ff] transition-all flex flex-col justify-between group hover:-translate-y-1">
                    <div className="h-16 rounded-xl bg-black/60 border border-[#cae8e8]/15 overflow-hidden flex items-center justify-center p-2 group-hover:border-[#00f0ff]/50 transition-all">
                      <img src={b.logo} alt={b.name} className="h-full w-auto object-contain group-hover:scale-105 transition-transform"  loading="lazy" decoding="async" />
                    </div>
                    <div>
                      <strong className="text-white text-sm block leading-tight">{b.name}</strong>
                      <span className="text-[10px] text-slate-400 block mt-0.5 font-mono">{b.note}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* PRODUCT DETAIL MODAL */}
            {selectedProduct && (
              <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
                <div className="glass-surface max-w-xl w-full p-8 bg-[#0d111a] border border-[#cae8e8]/40 space-y-6 relative" onClick={(e) => e.stopPropagation()}>
                  <button 
                    onClick={() => setSelectedProduct(null)}
                    className="absolute top-5 right-5 text-slate-400 hover:text-white text-xl font-bold p-2 bg-slate-900 rounded-full z-20"
                  >
                    ✕
                  </button>

                  <div className="space-y-2">
                    <span className="text-xs font-mono text-[#00f0ff] font-bold uppercase">{selectedProduct.category} · {selectedProduct.brand}</span>
                    <h2 className="text-2xl font-extrabold text-white">{selectedProduct.name}</h2>
                    <div className="text-3xl font-extrabold text-[#00f0ff] font-mono">{selectedProduct.price}</div>
                  </div>

                  <div className="rounded-2xl overflow-hidden border border-[#cae8e8]/20 bg-black h-56">
                    <img src={selectedProduct.img} alt={selectedProduct.name} className="w-full h-full object-cover"  loading="lazy" decoding="async" />
                  </div>

                  <div className="space-y-2 text-xs text-slate-300">
                    <h4 className="font-bold text-white uppercase text-sm border-b border-[#cae8e8]/20 pb-1">Product Description</h4>
                    <p className="leading-relaxed">{selectedProduct.desc}</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#05070c] border border-[#cae8e8]/20 text-xs space-y-1">
                    <strong className="text-white block font-mono">Technical Specifications:</strong>
                    <p className="text-slate-300 font-mono text-[11px]">{selectedProduct.specs}</p>
                  </div>

                  <div className="pt-4 flex gap-4 border-t border-[#cae8e8]/20">
                    <a 
                      href={`https://wa.me/917225030303?text=Hello%20O3%20Car-Spa!%20I%20want%20to%20order%20product:%20${encodeURIComponent(selectedProduct.name)}%20(${selectedProduct.price})`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary text-xs w-full justify-center py-3"
                    >
                      Instant Order via WhatsApp 💬
                    </a>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

        {/* ---------------- SERVICES VIEW ---------------- */}
        {currentView === 'services' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
            
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="pill-capsule font-mono">100% Visual Interactive Service Cards (47 Treatments)</span>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white">All Precision Services & Packages</h1>
              <p className="text-slate-300 text-sm sm:text-base">
                Click or touch any card below to inspect full step-by-step detailing procedures, equipment specs, and instant WhatsApp booking.
              </p>
            </div>

            {/* INTERACTIVE CATEGORY FILTER BAR */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-5xl mx-auto">
              {[
                { id: 'all', label: 'All Services (47)' },
                { id: 'Washing & Quick Care', label: 'Washing & Quick Care (5)' },
                { id: 'Color Protection & Treatments', label: 'Color Protection & Treatments (10)' },
                { id: 'Ceramic Coating Packages', label: 'Ceramic Coating 9H (7)' },
                { id: 'Graphene Coating Packages', label: 'Graphene Armor 9H (6)' },
                { id: 'Paint Protection Film (PPF)', label: 'PPF Armor Film (11)' },
                { id: 'Maintenance & Subscriptions', label: 'Maintenance & Subscriptions (8)' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setServiceCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all border ${
                    serviceCategory === cat.id
                      ? 'bg-[#00f0ff] text-[#05070c] border-[#00f0ff] shadow-[0_0_20px_rgba(0,240,255,0.4)] scale-105'
                      : 'bg-[#0d111a]/80 text-slate-300 border-[#cae8e8]/20 hover:border-[#00f0ff]/50 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* 47 EXHAUSTIVE OFFICIAL VISUAL SERVICE CARDS GRID */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#cae8e8]/20 pb-4">
                <span className="text-xs font-mono font-bold text-[#00f0ff] uppercase tracking-wider">
                  {serviceCategory === 'all' ? 'ALL 47 CERTIFIED CAR-SPA SERVICES' : serviceCategory.toUpperCase()}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Showing {(serviceCategory === 'all' ? allServicesData : allServicesData.filter(s => s.category === serviceCategory)).length} Certified Treatments
                </span>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {(serviceCategory === 'all' ? allServicesData : allServicesData.filter(s => s.category === serviceCategory)).map((s) => (
                  <div 
                    key={s.id} 
                    onClick={() => setActiveServiceDetail(s)}
                    className="gsap-service-card glass-surface p-6 border border-[#cae8e8]/25 flex flex-col justify-between space-y-4 group bg-[#0d111a] hover:border-[#00f0ff] transition-all duration-300 hover:-translate-y-1.5 shadow-xl cursor-pointer"
                  >
                    <div className="space-y-3">
                      {/* CARD IMAGE & BADGES */}
                      <div className="relative overflow-hidden rounded-2xl bg-black border border-[#cae8e8]/20 h-52">
                        <img 
                          src={s.img} 
                          alt={s.title} 
                          className="w-full h-full object-cover group-hover:scale-108 transition-all duration-500"  
                          loading="lazy" 
                          decoding="async" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#05070c] via-transparent to-transparent opacity-80"></div>
                        
                        {/* Warranty Badge (Top Right) */}
                        <span className="absolute top-3 right-3 bg-[#05070c]/90 border border-[#cae8e8]/30 text-[#cae8e8] text-[10px] font-mono font-bold px-3 py-1 rounded-full backdrop-blur-md">
                          {s.warranty}
                        </span>

                        {/* Official Tariff Price Badge (Bottom Left) */}
                        <span className="absolute bottom-3 left-3 bg-[#05070c]/90 border border-[#00f0ff]/60 text-[#00f0ff] text-sm font-mono font-extrabold px-3.5 py-1.5 rounded-full backdrop-blur-md shadow-[0_0_20px_rgba(0,240,255,0.5)]">
                          {s.price}
                        </span>
                      </div>

                      {/* CATEGORY & ICON */}
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{s.icon}</span>
                        <span className="text-[10px] font-mono text-[#00f0ff] uppercase font-bold tracking-wider">{s.category}</span>
                      </div>

                      {/* TITLE & TAGLINE */}
                      <h3 className="text-xl font-bold text-white group-hover:text-[#00f0ff] transition-colors leading-snug">{s.title}</h3>
                      <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">{s.tagline}</p>

                      {/* QUICK SPECS PREVIEW */}
                      <div className="pt-2 text-[11px] text-slate-400 space-y-1 font-mono border-t border-[#cae8e8]/10">
                        <div><strong className="text-white">Official Price:</strong> <span className="text-[#00f0ff] font-bold">{s.price}</span></div>
                        <div><strong className="text-white">Durability:</strong> {s.durability}</div>
                        <div><strong className="text-white">Equipment:</strong> {s.equipment.slice(0, 36)}...</div>
                      </div>
                    </div>

                    {/* CARD ACTIONS */}
                    <div className="pt-3 border-t border-[#cae8e8]/15 flex items-center gap-3">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setActiveServiceDetail(s); }} 
                        className="btn-secondary text-xs flex-1 justify-center py-2.5 font-bold"
                      >
                        <span>Open Details 🔍</span>
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleOpenBookingWithService(s.title); }} 
                        className="btn-primary text-xs flex-1 justify-center py-2.5 font-bold"
                      >
                        <span>Book Now</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        
        {/* ---------------- PLANS VIEW (ELEGANT AMC CARDS WITH VISUAL HEADERS) ---------------- */}
        {currentView === 'plans' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
            
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="pill-capsule font-mono">Bespoke AMC Maintenance Packages</span>
              <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
                Choose Your <span className="text-gradient-ocean font-black">Perfect Plan</span>
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Comprehensive Annual Maintenance Contracts (AMC) designed to preserve your vehicle's gloss and protection all year round.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  name: 'Glass Leather AMC',
                  badge: 'Glass & Leather Care',
                  img: 'assets/o3_int_after.png',
                  price: 'Bespoke Annual AMC',
                  features: [
                    'Exterior wash, shampoo & vacuum',
                    'Intensive interior cleaning',
                    'Ozone treatment & odour removal',
                    'Glass coating',
                    'Glass coating maintenance',
                    'Leather care treatment'
                  ]
                },
                {
                  name: 'Ceramic Leather AMC',
                  badge: '⭐ MOST POPULAR',
                  highlight: true,
                  img: 'assets/o3_ceramic_coating.png',
                  price: 'Flagship Studio AMC',
                  features: [
                    'Exterior wash, shampoo & vacuum',
                    'Intensive interior cleaning',
                    'Ozone treatment & odour removal',
                    'Ceramic coating',
                    'Ceramic coating maintenance',
                    'Leather care treatment'
                  ]
                },
                {
                  name: 'Acrylic Leather AMC',
                  badge: 'Acrylic Protection',
                  img: 'assets/o3_ext_after.png',
                  price: 'Acrylic Armor AMC',
                  features: [
                    'Exterior wash, shampoo & vacuum',
                    'Intensive interior cleaning',
                    'Ozone treatment & odour removal',
                    'Acrylic sealant coating',
                    'Machine polish & wax',
                    'Leather care treatment'
                  ]
                },
                {
                  name: '3M AMC',
                  badge: '3M Finish Armor',
                  img: 'assets/gallery/35_44_services_design_extra_services_also_mentioned_18_ppf_design.jpg',
                  price: '3M Paint Guard AMC',
                  features: [
                    'Exterior wash, shampoo & vacuum',
                    'Intensive interior cleaning',
                    '3M coating',
                    'Machine polish & wax',
                    'Ozone treatment & odour removal'
                  ]
                }
              ].map((plan, idx) => (
                <div key={idx} className={`glass-surface p-5 border flex flex-col justify-between space-y-6 transition-all duration-300 hover:-translate-y-1 ${plan.highlight ? 'border-[#00f0ff] bg-[#0d1726] shadow-[0_0_30px_rgba(0,240,255,0.25)]' : 'border-[#cae8e8]/25 bg-[#0d111a]'}`}>
                  
                  <div className="space-y-4">
                    <div className="relative rounded-2xl overflow-hidden h-36 bg-black border border-[#cae8e8]/20">
                      <img src={plan.img} alt={plan.name} className="w-full h-full object-cover"  loading="lazy" decoding="async" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d111a] via-transparent to-transparent opacity-90"></div>
                      <span className={`absolute top-3 left-3 text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-full backdrop-blur-md border ${plan.highlight ? 'bg-[#00f0ff] text-[#05070c] border-[#00f0ff]' : 'bg-[#05070c]/80 text-[#00f0ff] border-[#00f0ff]/30'}`}>
                        {plan.badge}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-xl font-extrabold text-white">{plan.name}</h3>
                      <div className="text-xs font-mono text-[#cae8e8] font-semibold">{plan.price}</div>
                    </div>

                    <ul className="space-y-2.5 text-xs text-slate-300 pt-2 border-t border-[#cae8e8]/15">
                      {plan.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2">
                          <span className="text-[#00f0ff] font-bold text-sm leading-none">✓</span>
                          <span className="leading-snug">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button 
                    onClick={() => handleOpenBookingWithService(plan.name)}
                    className="btn-primary text-xs w-full justify-center py-3"
                  >
                    Enquire Now
                  </button>

                </div>
              ))}
            </div>

          </div>
        )}

        {/* ---------------- GALLERY VIEW (FULL 44 MULTI-MEDIA SHOWCASE) ---------------- */}
        {currentView === 'gallery' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
            
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="pill-capsule font-mono">Official Studio Media Database</span>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white">Work & Media Gallery</h1>
              <p className="text-slate-300 text-sm sm:text-base">
                Explore all 44 studio productions, PPF installations, graphene coating reveals, interior steam treatments, and client video reels.
              </p>
            </div>

            {/* CATEGORY FILTER TABS */}
            <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
              {[
                { id: 'all', label: '🌟 All Media (44)' },
                { id: 'videos', label: '🎥 Videos (14)' },
                { id: 'PPF Armor', label: '🛡️ PPF Armor' },
                { id: 'Ceramic & Graphene', label: '✨ Ceramic & Graphene' },
                { id: 'Interior & Steam', label: '🧼 Interior & Steam' },
                { id: 'Customer Reels', label: '⚡ Customer Reels' },
                { id: 'Service Design Specs', label: '📋 Service Specs' },
                { id: 'Studio Photos', label: '📸 Studio Photos' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setGalleryCategory(tab.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    galleryCategory === tab.id
                      ? 'bg-[#00f0ff] text-[#05070c] shadow-[0_0_20px_rgba(0,240,255,0.4)] font-bold'
                      : 'bg-[#0d111a] text-slate-300 border border-[#cae8e8]/20 hover:border-[#cae8e8]/50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* MEDIA ITEMS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
  {
    "id": "v1",
    "title": "Hydro-Foam Wash & TPU PPF Preparation",
    "desc": "High-pressure snow foam decontamination bath prior to PPF installation.",
    "src": "assets/gallery/13_wash_coat_ppf.mp4",
    "category": "PPF Armor",
    "badge": "\ud83d\udee1\ufe0f PPF Prep",
    "type": "video"
  },
  {
    "id": "v2",
    "title": "BMW Studio Detailing & Polish Showcase",
    "desc": "Multi-stage compounding and mirror finish polish on BMW.",
    "src": "assets/gallery/26_bmw_edit.mp4",
    "category": "Ceramic & Graphene",
    "badge": "\ud83c\udfce\ufe0f BMW Detailing",
    "type": "video"
  },
  {
    "id": "v3",
    "title": "Intensive Interior High-Pressure Steam Sanitization",
    "desc": "99.9% anti-bacterial deep steam extraction for leather and upholstery.",
    "src": "assets/gallery/8_interior_steam_cleaning.mp4",
    "category": "Interior & Steam",
    "badge": "\ud83e\uddfc Steam Sanitization",
    "type": "video"
  },
  {
    "id": "v4",
    "title": "Mahindra Scorpio Compounding & Ceramic Pass",
    "desc": "Paint defect removal and silica quartz coating application on Scorpio.",
    "src": "assets/gallery/graphene_and_normal_coating_25_scorpio_polish_and_coating.mp4",
    "category": "Ceramic & Graphene",
    "badge": "\u2728 Scorpio Ceramic",
    "type": "video"
  },
  {
    "id": "v5",
    "title": "Toyota Fortuner 9H Graphene Armor Application",
    "desc": "Extreme hydrophobic matrix bonding on Fortuner clear coat.",
    "src": "assets/gallery/graphene_and_normal_coating_27_fortuner_coating.mp4",
    "category": "Ceramic & Graphene",
    "badge": "\u2728 Fortuner Graphene",
    "type": "video"
  },
  {
    "id": "v6",
    "title": "Kia Seltos Multi-Stage Polish & Quartz Pass",
    "desc": "Scangrip LED inspection and high-gloss quartz coating on Kia.",
    "src": "assets/gallery/graphene_and_normal_coating_29_kia_coating.mp4",
    "category": "Ceramic & Graphene",
    "badge": "\u2728 Kia Quartz Pass",
    "type": "video"
  },
  {
    "id": "v7",
    "title": "Mahindra Scorpio Graphene Matrix Coating",
    "desc": "Dual-layer graphene heat resistance and deep mirror gloss.",
    "src": "assets/gallery/graphene_and_normal_coating_30_scorpio_graphene_coating.mp4",
    "category": "Ceramic & Graphene",
    "badge": "\u2728 Graphene Shield",
    "type": "video"
  },
  {
    "id": "v8",
    "title": "Maruti Brezza Graphene Shield Treatment",
    "desc": "Ultra-durable hydrophobic coat protecting paint against tropical UV.",
    "src": "assets/gallery/graphene_and_normal_coating_33_brezza_graphene_coating.mp4",
    "category": "Ceramic & Graphene",
    "badge": "\u2728 Brezza Graphene",
    "type": "video"
  },
  {
    "id": "v9",
    "title": "Optical TPU Self-Healing PPF Hand Installation",
    "desc": "Squeegee pass and bubble-free optical TPU film wrap on vehicle panel.",
    "src": "assets/gallery/ppf_11_ppf_application.mp4",
    "category": "PPF Armor",
    "badge": "\ud83d\udee1\ufe0f Optical TPU Pass",
    "type": "video"
  },
  {
    "id": "v10",
    "title": "Precision Edge-Tucked Paint Protection Film",
    "desc": "Corner tucking and seamless edge application of self-healing TPU.",
    "src": "assets/gallery/ppf_14_ppf_nice_video.mp4",
    "category": "PPF Armor",
    "badge": "\ud83d\udee1\ufe0f Edge Tucking",
    "type": "video"
  },
  {
    "id": "v11",
    "title": "Mahindra Thar Full Body TPU PPF Armor",
    "desc": "Rugged off-road impact energy absorption film installed on Thar.",
    "src": "assets/gallery/ppf_28_thar_ppf.mp4",
    "category": "PPF Armor",
    "badge": "\ud83d\udee1\ufe0f Thar PPF Armor",
    "type": "video"
  },
  {
    "id": "v12",
    "title": "Mercedes-AMG Full Body TPU PPF Armor",
    "desc": "Precision optical clarity self-healing TPU hand applied on Mercedes-AMG.",
    "src": "assets/gallery/ppf_34_mercedes_ppf_very_nice.mp4",
    "category": "PPF Armor",
    "badge": "\ud83d\udee1\ufe0f Mercedes-AMG PPF",
    "type": "video"
  },
  {
    "id": "v13",
    "title": "Client Reel: PPF Stone Chip Resistance Test",
    "desc": "Real customer video showing optical clarity and self-healing properties.",
    "src": "assets/gallery/ugc_12_ugc_ppf.mp4",
    "category": "Customer Reels",
    "badge": "\ud83c\udfa5 Client Review",
    "type": "video"
  },
  {
    "id": "v14",
    "title": "High-Energy Studio Detailing Reel & Gloss Reveal",
    "desc": "Cinematic showcase of studio transformations inside O3 cleanroom bay.",
    "src": "assets/gallery/ugc_21_high_energy_ugc.mp4",
    "category": "Customer Reels",
    "badge": "\u26a1 High Energy Reel",
    "type": "video"
  },
  {
    "id": "p1",
    "title": "17 Cute Wash Design",
    "desc": "Official O3 Car Spa treatment specification card and package breakdown.",
    "src": "assets/gallery/35_44_services_design_extra_services_also_mentioned_17_cute_wash_design.jpg",
    "category": "Service Design Specs",
    "badge": "\ud83d\udccb Service Spec",
    "type": "photo"
  },
  {
    "id": "p2",
    "title": "18 Ppf Design",
    "desc": "Official O3 Car Spa treatment specification card and package breakdown.",
    "src": "assets/gallery/35_44_services_design_extra_services_also_mentioned_18_ppf_design.jpg",
    "category": "Service Design Specs",
    "badge": "\ud83d\udccb Service Spec",
    "type": "photo"
  },
  {
    "id": "p3",
    "title": "19 Graphene Design",
    "desc": "Official O3 Car Spa treatment specification card and package breakdown.",
    "src": "assets/gallery/35_44_services_design_extra_services_also_mentioned_19_graphene_design.jpg",
    "category": "Service Design Specs",
    "badge": "\ud83d\udccb Service Spec",
    "type": "photo"
  },
  {
    "id": "p4",
    "title": "Image-17244",
    "desc": "Official O3 Car Spa treatment specification card and package breakdown.",
    "src": "assets/gallery/35_44_services_design_extra_services_also_mentioned_image-17244.jpg",
    "category": "Service Design Specs",
    "badge": "\ud83d\udccb Service Spec",
    "type": "photo"
  },
  {
    "id": "p5",
    "title": "Image-35242",
    "desc": "Official O3 Car Spa treatment specification card and package breakdown.",
    "src": "assets/gallery/35_44_services_design_extra_services_also_mentioned_image-35242.jpg",
    "category": "Service Design Specs",
    "badge": "\ud83d\udccb Service Spec",
    "type": "photo"
  },
  {
    "id": "p6",
    "title": "Image-35330",
    "desc": "Official O3 Car Spa treatment specification card and package breakdown.",
    "src": "assets/gallery/35_44_services_design_extra_services_also_mentioned_image-35330.jpg",
    "category": "Service Design Specs",
    "badge": "\ud83d\udccb Service Spec",
    "type": "photo"
  },
  {
    "id": "p7",
    "title": "Image-46627",
    "desc": "Official O3 Car Spa treatment specification card and package breakdown.",
    "src": "assets/gallery/35_44_services_design_extra_services_also_mentioned_image-46627.jpg",
    "category": "Service Design Specs",
    "badge": "\ud83d\udccb Service Spec",
    "type": "photo"
  },
  {
    "id": "p8",
    "title": "Image-49803",
    "desc": "Official O3 Car Spa treatment specification card and package breakdown.",
    "src": "assets/gallery/35_44_services_design_extra_services_also_mentioned_image-49803.jpg",
    "category": "Service Design Specs",
    "badge": "\ud83d\udccb Service Spec",
    "type": "photo"
  },
  {
    "id": "p9",
    "title": "Image-67602",
    "desc": "Official O3 Car Spa treatment specification card and package breakdown.",
    "src": "assets/gallery/35_44_services_design_extra_services_also_mentioned_image-67602.jpg",
    "category": "Service Design Specs",
    "badge": "\ud83d\udccb Service Spec",
    "type": "photo"
  },
  {
    "id": "p10",
    "title": "Image-77137",
    "desc": "Official O3 Car Spa treatment specification card and package breakdown.",
    "src": "assets/gallery/35_44_services_design_extra_services_also_mentioned_image-77137.jpg",
    "category": "Service Design Specs",
    "badge": "\ud83d\udccb Service Spec",
    "type": "photo"
  },
  {
    "id": "p11",
    "title": "Image-84181",
    "desc": "Official O3 Car Spa treatment specification card and package breakdown.",
    "src": "assets/gallery/35_44_services_design_extra_services_also_mentioned_image-84181.jpg",
    "category": "Service Design Specs",
    "badge": "\ud83d\udccb Service Spec",
    "type": "photo"
  },
  {
    "id": "p12",
    "title": "Image-88692",
    "desc": "Official O3 Car Spa treatment specification card and package breakdown.",
    "src": "assets/gallery/35_44_services_design_extra_services_also_mentioned_image-88692.jpg",
    "category": "Service Design Specs",
    "badge": "\ud83d\udccb Service Spec",
    "type": "photo"
  },
  {
    "id": "p13",
    "title": "Image-91501",
    "desc": "Official O3 Car Spa treatment specification card and package breakdown.",
    "src": "assets/gallery/35_44_services_design_extra_services_also_mentioned_image-91501.jpg",
    "category": "Service Design Specs",
    "badge": "\ud83d\udccb Service Spec",
    "type": "photo"
  },
  {
    "id": "p14",
    "title": "Studio Transformation Detail #14",
    "desc": "Precision automotive detailing result completed at O3 Car Spa.",
    "src": "assets/gallery/6__ppf_why_carousel_image-262.jpg",
    "category": "Studio Photos",
    "badge": "\ud83d\udcf8 Studio Craft",
    "type": "photo"
  },
  {
    "id": "p15",
    "title": "Studio Transformation Detail #15",
    "desc": "Precision automotive detailing result completed at O3 Car Spa.",
    "src": "assets/gallery/6__ppf_why_carousel_image-29722.jpg",
    "category": "Studio Photos",
    "badge": "\ud83d\udcf8 Studio Craft",
    "type": "photo"
  },
  {
    "id": "p16",
    "title": "Studio Transformation Detail #16",
    "desc": "Precision automotive detailing result completed at O3 Car Spa.",
    "src": "assets/gallery/6__ppf_why_carousel_image-70233.jpg",
    "category": "Studio Photos",
    "badge": "\ud83d\udcf8 Studio Craft",
    "type": "photo"
  },
  {
    "id": "p17",
    "title": "Studio Transformation Detail #17",
    "desc": "Precision automotive detailing result completed at O3 Car Spa.",
    "src": "assets/gallery/6__ppf_why_carousel_image-76627.jpg",
    "category": "Studio Photos",
    "badge": "\ud83d\udcf8 Studio Craft",
    "type": "photo"
  },
  {
    "id": "p18",
    "title": "Studio Transformation Detail #18",
    "desc": "Precision automotive detailing result completed at O3 Car Spa.",
    "src": "assets/gallery/6__ppf_why_carousel_image-94354.jpg",
    "category": "Studio Photos",
    "badge": "\ud83d\udcf8 Studio Craft",
    "type": "photo"
  },
  {
    "id": "p19",
    "title": "Studio Transformation Detail #19",
    "desc": "Precision automotive detailing result completed at O3 Car Spa.",
    "src": "assets/gallery/6__ppf_why_carousel_image-97038.jpg",
    "category": "Studio Photos",
    "badge": "\ud83d\udcf8 Studio Craft",
    "type": "photo"
  },
  {
    "id": "p20",
    "title": "Graphene & Quartz Coating Step-by-Step",
    "desc": "Multi-layer silica pass and curing process for ultimate hydrophobicity.",
    "src": "assets/gallery/graphene_and_normal_coating_31_graphene_coating_steps.jpg",
    "category": "Ceramic & Graphene",
    "badge": "\u2728 Graphene Process",
    "type": "photo"
  },
  {
    "id": "p21",
    "title": "Studio Transformation Detail #21",
    "desc": "Precision automotive detailing result completed at O3 Car Spa.",
    "src": "assets/gallery/insta_pinned_main_theme_very_nice_image-27511.jpg",
    "category": "Studio Photos",
    "badge": "\ud83d\udcf8 Studio Craft",
    "type": "photo"
  },
  {
    "id": "p22",
    "title": "Studio Transformation Detail #22",
    "desc": "Precision automotive detailing result completed at O3 Car Spa.",
    "src": "assets/gallery/insta_pinned_main_theme_very_nice_image-82021.jpg",
    "category": "Studio Photos",
    "badge": "\ud83d\udcf8 Studio Craft",
    "type": "photo"
  },
  {
    "id": "p23",
    "title": "Studio Transformation Detail #23",
    "desc": "Precision automotive detailing result completed at O3 Car Spa.",
    "src": "assets/gallery/insta_pinned_main_theme_very_nice_image-86981.jpg",
    "category": "Studio Photos",
    "badge": "\ud83d\udcf8 Studio Craft",
    "type": "photo"
  },
  {
    "id": "p24",
    "title": "High-Gloss Studio Finish 1.2",
    "desc": "Mirror reflection and scratch decontamination under 6500K daylight LEDs.",
    "src": "assets/gallery/only_images_good_ones_1.2.jpg",
    "category": "Studio Photos",
    "badge": "\ud83c\udfce\ufe0f Studio Showcase",
    "type": "photo"
  },
  {
    "id": "p25",
    "title": "High-Gloss Studio Finish 1",
    "desc": "Mirror reflection and scratch decontamination under 6500K daylight LEDs.",
    "src": "assets/gallery/only_images_good_ones_1.jpg",
    "category": "Studio Photos",
    "badge": "\ud83c\udfce\ufe0f Studio Showcase",
    "type": "photo"
  },
  {
    "id": "p26",
    "title": "High-Gloss Studio Finish 3.1",
    "desc": "Mirror reflection and scratch decontamination under 6500K daylight LEDs.",
    "src": "assets/gallery/only_images_good_ones_3.1.jpg",
    "category": "Studio Photos",
    "badge": "\ud83c\udfce\ufe0f Studio Showcase",
    "type": "photo"
  },
  {
    "id": "p27",
    "title": "High-Gloss Studio Finish 3.2",
    "desc": "Mirror reflection and scratch decontamination under 6500K daylight LEDs.",
    "src": "assets/gallery/only_images_good_ones_3.2.jpg",
    "category": "Studio Photos",
    "badge": "\ud83c\udfce\ufe0f Studio Showcase",
    "type": "photo"
  },
  {
    "id": "p28",
    "title": "High-Gloss Studio Finish 3.3",
    "desc": "Mirror reflection and scratch decontamination under 6500K daylight LEDs.",
    "src": "assets/gallery/only_images_good_ones_3.3.jpg",
    "category": "Studio Photos",
    "badge": "\ud83c\udfce\ufe0f Studio Showcase",
    "type": "photo"
  },
  {
    "id": "p29",
    "title": "High-Gloss Studio Finish 4",
    "desc": "Mirror reflection and scratch decontamination under 6500K daylight LEDs.",
    "src": "assets/gallery/only_images_good_ones_4.jpg",
    "category": "Studio Photos",
    "badge": "\ud83c\udfce\ufe0f Studio Showcase",
    "type": "photo"
  },
  {
    "id": "p30",
    "title": "High-Gloss Studio Finish 5",
    "desc": "Mirror reflection and scratch decontamination under 6500K daylight LEDs.",
    "src": "assets/gallery/only_images_good_ones_5.jpg",
    "category": "Studio Photos",
    "badge": "\ud83c\udfce\ufe0f Studio Showcase",
    "type": "photo"
  }
].filter(item => {
                if (galleryCategory === 'all') return true;
                if (galleryCategory === 'videos') return item.type === 'video';
                return item.category === galleryCategory;
              }).map((item) => (
                <div key={item.id} className="glass-surface p-5 border border-[#cae8e8]/25 flex flex-col justify-between space-y-4 group hover:border-[#00f0ff]/50 transition-all">
                  
                  <div className="space-y-3">
                    <div className="relative rounded-2xl overflow-hidden bg-black border border-[#cae8e8]/20 aspect-video flex items-center justify-center">
                      {item.type === 'video' ? (
                        <div 
                          onClick={() => setLightboxMedia(item)}
                          className="relative w-full h-full bg-[#0a0e17] flex flex-col items-center justify-center cursor-pointer group/vid"
                        >
                          <img src={item.src.endsWith('.mp4') ? 'assets/o3_official_brand_poster.jpg' : item.src} 
                            alt={item.title} 
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover opacity-60 group-hover/vid:opacity-80 transition-opacity" 
                           loading="lazy" decoding="async" />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#05070c] via-transparent to-transparent"></div>
                          <div className="absolute w-12 h-12 rounded-full bg-[#00f0ff]/90 text-[#05070c] font-bold flex items-center justify-center text-lg shadow-[0_0_20px_rgba(0,240,255,0.8)] group-hover/vid:scale-110 transition-transform">
                            ▶
                          </div>
                          <span className="absolute bottom-2 text-[10px] font-mono text-white bg-black/80 px-2 py-0.5 rounded-full border border-[#00f0ff]/30">
                            Click to Watch Video Reel
                          </span>
                        </div>
                      ) : (
                        <img src={item.src} 
                          alt={item.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                          onClick={() => setLightboxMedia(item)}
                        />
                      )}

                      <span className="absolute top-3 left-3 bg-[#05070c]/90 border border-[#cae8e8]/30 text-[#00f0ff] text-[10px] font-mono px-3 py-1 rounded-full backdrop-blur-md font-bold">
                        {item.badge}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-[#cae8e8] uppercase font-bold block">{item.category}</span>
                      <h3 className="text-lg font-bold text-white group-hover:text-[#00f0ff] transition-colors leading-snug">{item.title}</h3>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>

                  {item.type === 'photo' && (
                    <button 
                      onClick={() => setLightboxMedia(item)}
                      className="btn-secondary text-xs w-full justify-center py-2.5"
                    >
                      🔍 Enlarge Photo
                    </button>
                  )}

                </div>
              ))}
            </div>

            {/* LIGHTBOX PREVIEW MODAL FOR PHOTOS */}
            {lightboxMedia && (
              <div className="modal-overlay" onClick={() => setLightboxMedia(null)}>
                <div className="glass-surface max-w-4xl w-full p-6 bg-[#0d111a] border border-[#cae8e8]/40 space-y-4 relative" onClick={(e) => e.stopPropagation()}>
                  <button 
                    onClick={() => setLightboxMedia(null)}
                    className="absolute top-4 right-4 text-slate-300 hover:text-white text-2xl font-bold bg-[#05070c] p-2 rounded-full border border-[#cae8e8]/30 z-20"
                  >
                    ✕
                  </button>

                  <div className="space-y-1">
                    <span className="text-xs font-mono text-[#00f0ff] font-bold">{lightboxMedia.badge}</span>
                    <h3 className="text-2xl font-bold text-white">{lightboxMedia.title}</h3>
                    <p className="text-xs text-slate-300">{lightboxMedia.desc}</p>
                  </div>

                  <div className="rounded-2xl overflow-hidden border border-[#cae8e8]/20 bg-black max-h-[75vh] flex items-center justify-center">
                    <img src={lightboxMedia.src} alt={lightboxMedia.title} className="max-h-[70vh] w-auto object-contain"  loading="lazy" decoding="async" />
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

        {/* ---------------- STUDIO VIEW ---------------- */}
        {currentView === 'studio' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
            
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs uppercase tracking-widest text-[#cae8e8] font-bold font-mono">The Science of Care</span>
              <h1 className="text-4xl font-extrabold text-white">Inside O3 Detailing Studio</h1>
              <p className="text-slate-300 text-sm">
                Our cleanroom studio is engineered specifically for paint surface conservation, temperature-controlled curing, and zero-dust application.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-extrabold text-white">Controlled Cleanroom Bay & Tech</h2>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Every vehicle that enters our studio moves through a controlled process of deep foam decontamination, micro-abrasive polishing, and clean-room coating application.
                </p>

                <div className="space-y-3 text-sm text-slate-200">
                  <div className="p-4 rounded-2xl bg-[#0d111a] border border-[#cae8e8]/25 flex items-start gap-3">
                    <span className="text-2xl">💡</span>
                    <div>
                      <strong className="text-white block">Hexagonal Ceiling LED Light Rig</strong>
                      <span className="text-xs text-[#cae8e8]">Color-calibrated 6500K daylight LEDs revealing 0.1-micron paint defects.</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#0d111a] border border-[#cae8e8]/25 flex items-start gap-3">
                    <span className="text-2xl">🌀</span>
                    <div>
                      <strong className="text-white block">Dust-Free Climate Cleanroom</strong>
                      <span className="text-xs text-[#cae8e8]">HEPA filtered air circulation maintaining 22°C ambient temperature for ceramic bonding.</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#0d111a] border border-[#cae8e8]/25 flex items-start gap-3">
                    <span className="text-2xl">🔥</span>
                    <div>
                      <strong className="text-white block">Hedson Shortwave Infra-Red Curing Lamps</strong>
                      <span className="text-xs text-[#cae8e8]">Accelerates silica quartz cross-linking to achieve maximum scratch hardness in 24 hrs.</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <img src="assets/o3_studio_environment.png" alt="O3 Studio Environment" className="w-full h-72 object-cover rounded-3xl border border-[#cae8e8]/30 shadow-2xl"  loading="lazy" decoding="async" />
                <img src="assets/o3_equipment_lab.png" alt="O3 Equipment & Compound Station" className="w-full h-56 object-cover rounded-3xl border border-[#cae8e8]/30 shadow-2xl"  loading="lazy" decoding="async" />
              </div>
            </div>

          </div>
        )}

        {/* ---------------- CONCIERGE VIEW ---------------- */}
        {currentView === 'concierge' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
            
            <div className="glass-surface p-8 sm:p-12 bg-gradient-to-r from-[#0d111a] via-[#101726] to-[#05070c] border border-[#cae8e8]/30">
              <div className="grid lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <span className="inline-block bg-[#cae8e8]/15 text-[#cae8e8] px-4 py-1.5 rounded-full text-xs font-mono font-bold border border-[#cae8e8]/30">
                    Sub-Brand: O3 On Wheels
                  </span>
                  <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
                    Doorstep Mobile Detailing <br />
                    <span className="text-gradient-ocean">Concierge Unit.</span>
                  </h1>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    Can't make it to our studio? O3 On Wheels delivers the complete studio experience directly to your doorstep, residential garage, or office park in Anand and surrounding areas.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 text-xs text-slate-300 pt-2">
                    <div className="p-3 rounded-2xl bg-[#05070c] border border-[#cae8e8]/20">
                      <strong className="text-white block">⚡ Onboard Silent Generator</strong>
                      100% self-powered mobile detailing.
                    </div>
                    <div className="p-3 rounded-2xl bg-[#05070c] border border-[#cae8e8]/20">
                      <strong className="text-white block">💧 Purified Water Tank</strong>
                      Zero mineral water spots on your finish.
                    </div>
                  </div>

                  <div className="flex gap-4 pt-2">
                    <button onClick={() => setIsBookingOpen(true)} className="btn-primary">
                      Book Doorstep Visit Now
                    </button>
                    <a href="tel:9033088869" className="btn-secondary">
                      📞 Call 90330 88869
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <img src="assets/o3_on_wheels.png" alt="O3 On Wheels Mobile Concierge Unit" className="w-full h-80 object-cover rounded-3xl border border-[#cae8e8]/30 shadow-2xl"  loading="lazy" decoding="async" />
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ---------------- STANDALONE REVIEWS VIEW ---------------- */}
        {currentView === 'testimonials' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
            
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs uppercase tracking-widest text-[#cae8e8] font-bold">Real Customer Validation</span>
              <h1 className="text-4xl font-extrabold text-white">Customer Reviews</h1>
              <p className="text-slate-300 text-sm">Real reviews left by valued customers at O3 Car Spa.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {realReviews.map((rev) => (
                <div key={rev.id} className="gsap-review-card glass-surface p-6 border border-[#cae8e8]/25 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-amber-400 font-bold">{rev.rating}</span>
                      <span className="text-slate-400 font-mono text-[10px]">{rev.time}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed italic">"{rev.quote}"</p>
                  </div>

                  <div className="pt-3 border-t border-[#cae8e8]/15 flex items-center justify-between text-xs">
                    <div>
                      <strong className="text-white block">{rev.author}</strong>
                      <span className="text-[#cae8e8] text-[11px] font-medium">{rev.car}</span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20">
                      Verified Review
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ---------------- FRANCHISE VIEW ---------------- */}
        {currentView === 'franchise' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
            
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="inline-block bg-[#cae8e8]/15 text-[#cae8e8] px-4 py-1 rounded-full text-xs font-mono font-bold">
                Business Opportunity
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white">O3 Car-Spa Franchise Program</h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Partner with Anand's most trusted automotive detailing brand under the guidance of <strong className="text-white">Mr. Sharanpal Sodhi</strong>.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              
              <div className="glass-surface p-8 space-y-6 bg-[#0d111a] border border-[#cae8e8]/40">
                <img src="assets/o3_on_wheels.png" alt="Mobile Detailing Franchise Unit" className="w-full h-48 object-cover rounded-2xl border border-[#cae8e8]/20"  loading="lazy" decoding="async" />
                <div className="space-y-2">
                  <span className="text-xs font-mono text-[#cae8e8] uppercase font-bold">Model 1: Mobile Unit</span>
                  <h3 className="text-2xl font-bold text-white">Doorstep Detailing Franchise</h3>
                  <div className="text-3xl font-extrabold text-white mt-2">
                    ₹ 5,00,000 <span className="text-xs text-slate-400 font-normal">Initial Setup</span>
                  </div>
                </div>

                <ul className="space-y-3 text-xs text-slate-300">
                  <li className="flex items-center gap-2"><span className="text-[#cae8e8]">✓</span> Fully equipped mobile van setup with onboard generator</li>
                  <li className="flex items-center gap-2"><span className="text-[#cae8e8]">✓</span> Pure de-ionized water filtration system</li>
                  <li className="flex items-center gap-2"><span className="text-[#cae8e8]">✓</span> Kärcher high-pressure wash system & hot steam extractors</li>
                  <li className="flex items-center gap-2"><span className="text-[#cae8e8]">✓</span> Initial stock of German Würth car care compounds</li>
                  <li className="flex items-center gap-2"><span className="text-[#cae8e8]">✓</span> Estimated Payback: <strong className="text-emerald-400">6 – 9 Months</strong></li>
                </ul>

                <button onClick={() => setIsFranchiseModalOpen(true)} className="btn-primary text-xs w-full justify-center">
                  Apply for Mobile Franchise →
                </button>
              </div>

              <div className="glass-surface p-8 space-y-6 bg-[#0d111a] border border-[#cae8e8]/60">
                <img src="assets/o3_studio_environment.png" alt="Studio Detailing Franchise Unit" className="w-full h-48 object-cover rounded-2xl border border-[#cae8e8]/20"  loading="lazy" decoding="async" />
                <div className="space-y-2">
                  <span className="text-xs font-mono text-[#cae8e8] uppercase font-bold">Model 2: Full Studio</span>
                  <h3 className="text-2xl font-bold text-white">Precision Detailing Studio</h3>
                  <div className="text-3xl font-extrabold text-white mt-2">
                    ₹ 10,00,000 <span className="text-xs text-slate-400 font-normal">Complete Turnkey Studio</span>
                  </div>
                </div>

                <ul className="space-y-3 text-xs text-slate-300">
                  <li className="flex items-center gap-2"><span className="text-[#cae8e8]">✓</span> Complete studio design & 6500K ceiling LED light rig</li>
                  <li className="flex items-center gap-2"><span className="text-[#cae8e8]">✓</span> Climate cleanroom ceramic application bay setup</li>
                  <li className="flex items-center gap-2"><span className="text-[#cae8e8]">✓</span> Rupes BigFoot Italian polishers & ultrasonic paint meters</li>
                  <li className="flex items-center gap-2"><span className="text-[#cae8e8]">✓</span> Direct 2-week training by Sharanpal Sir & staff</li>
                  <li className="flex items-center gap-2"><span className="text-[#cae8e8]">✓</span> Estimated Payback: <strong className="text-emerald-400">10 – 14 Months</strong></li>
                </ul>

                <button onClick={() => setIsFranchiseModalOpen(true)} className="btn-primary text-xs w-full justify-center">
                  Apply for Studio Franchise →
                </button>
              </div>

            </div>

          </div>
        )}

        {/* ---------------- FAQ VIEW ---------------- */}
        {currentView === 'faq' && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
            
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs uppercase tracking-widest text-[#cae8e8] font-bold font-mono">Knowledge Base</span>
              <h1 className="text-4xl font-extrabold text-white">Frequently Asked Questions</h1>
              <p className="text-slate-300 text-sm">Everything you need to know about PPF, Ceramic Coating, and Doorstep Concierge services.</p>
            </div>

            <div className="space-y-4">
              {[
                {
                  q: 'What is the difference between Ceramic Coating and Paint Protection Film (PPF)?',
                  a: 'PPF is a physical self-healing thermoplastic polyurethane film designed to absorb impact energy from stones, gravel, and scratches. Ceramic Coating is a liquid silica polymer that chemically bonds to the paint, creating hyper-hydrophobic water beading, chemical resistance, and mirror gloss.'
                },
                {
                  q: 'How does O3 On Wheels doorstep car detailing work?',
                  a: 'Our mobile unit arrives directly at your home or office equipped with high-pressure foam wash systems, clean water, generators, vacuum extractors, and imported compounds.'
                },
                {
                  q: 'How long does a studio Paint Correction & Ceramic Coating take?',
                  a: 'A thorough 2-stage paint correction and 9H ceramic coating application takes 24 to 48 hours to allow proper decontamination, defect removal, and infra-red curing.'
                },
                {
                  q: 'Does Paint Protection Film yellow or bubble over time?',
                  a: 'We use non-yellowing, optical-grade TPU PPF backed by studio warranties against yellowing, cracking, or peeling.'
                },
                {
                  q: 'What chemicals and compounds are used at O3 Car Spa?',
                  a: 'We exclusively use German Würth protection formulations, Italian Rupes micro-abrasive compounds, and certified Grade-A Brazilian Carnauba wax.'
                },
                {
                  q: 'Can PPF or Ceramic Coating be applied to matte or satin paint finishes?',
                  a: 'Yes! We offer specialized Matte Ceramic Coatings and Matte Self-Healing PPF that preserve the satin finish without adding unwanted gloss.'
                }
              ].map((faq, idx) => (
                <div key={idx} className="glass-surface border border-[#cae8e8]/20 overflow-hidden">
                  <button 
                    onClick={() => setExpandedFaq(expandedFaq === idx ? -1 : idx)}
                    className="w-full p-5 text-left flex items-center justify-between font-bold text-[#cae8e8]"
                  >
                    <span>{faq.q}</span>
                    <span>{expandedFaq === idx ? '−' : '+'}</span>
                  </button>
                  {expandedFaq === idx && (
                    <div className="px-5 pb-5 text-xs text-slate-300 leading-relaxed border-t border-[#cae8e8]/15 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ---------------- CONTACT VIEW ---------------- */}
        {currentView === 'contact' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
            
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs uppercase tracking-widest text-[#cae8e8] font-bold font-mono">Get In Touch</span>
              <h1 className="text-4xl font-extrabold text-white">Contact & Studio Location</h1>
              <p className="text-slate-300 text-sm">Schedule a consultation at our premium studio, or request our concierge pickup service.</p>
            </div>

            <div className="grid lg:grid-cols-12 gap-10">
              
              <div className="lg:col-span-5 glass-surface p-8 space-y-6 bg-[#0d111a]">
                <img src="assets/o3_official_logo.png" alt="O3 CAR-SPA Logo" className="logo-blend h-12 w-auto mb-2"  loading="lazy" decoding="async" />
                <h3 className="text-2xl font-bold text-white">O3 Car-Spa Studio</h3>
                <p className="text-xs text-[#cae8e8] font-mono">Managed by Mr. Sharanpal Sodhi</p>

                <img src="assets/o3_studio_environment.png" alt="O3 Studio Entrance" className="w-full h-44 object-cover rounded-2xl border border-[#cae8e8]/20"  loading="lazy" decoding="async" />

                <div className="space-y-4 text-sm text-slate-300">
                  <div className="flex gap-3">
                    <span className="text-[#cae8e8]">📍</span>
                    <div>
                      <strong className="text-white block">Studio Address:</strong>
                      No. 444/2, Phase 4, Opp. Swiss Glass Coat, Plot VU Nagar, New Vallabh Vidyanagar, GIDC, Anand, Gujarat 388121
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <span className="text-[#cae8e8]">📞</span>
                    <div>
                      <strong className="text-white block">Direct Phone Lines:</strong>
                      <a href="tel:9033088869" className="hover:underline font-mono text-[#cae8e8]">90330 88869</a> · <a href="tel:7225030303" className="hover:underline font-mono text-[#cae8e8]">72250 30303</a>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <span className="text-[#cae8e8]">✉️</span>
                    <div>
                      <strong className="text-white block">Email:</strong>
                      <a href="mailto:o3carspavvn@gmail.com" className="hover:underline text-[#cae8e8]">o3carspavvn@gmail.com</a>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#cae8e8]/20">
                  <button onClick={() => setIsBookingOpen(true)} className="btn-primary text-xs w-full justify-center">
                    Book Appointment Now
                  </button>
                </div>
              </div>

              <div className="lg:col-span-7 glass-surface p-8 space-y-6">
                <h3 className="text-2xl font-bold text-white">Send Consultation Message</h3>

                <form onSubmit={(e) => { e.preventDefault(); alert('Thank you! Our O3 Car-Spa representative will call you shortly.'); }} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Full Name</label>
                      <input type="text" required placeholder="Your Name" className="w-full bg-[#05070c] border border-[#cae8e8]/30 rounded-2xl p-3 text-sm text-white focus:outline-none focus:border-[#cae8e8]" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Phone Number</label>
                      <input type="tel" required placeholder="90330 88869" className="w-full bg-[#05070c] border border-[#cae8e8]/30 rounded-2xl p-3 text-sm text-white focus:outline-none focus:border-[#cae8e8]" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Vehicle Details & Model</label>
                    <input type="text" placeholder="e.g. WagonR / Hunter 350 / Thar / i20" className="w-full bg-[#05070c] border border-[#cae8e8]/30 rounded-2xl p-3 text-sm text-white focus:outline-none focus:border-[#cae8e8]" />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Service Required</label>
                    <select className="w-full bg-[#05070c] border border-[#cae8e8]/30 rounded-2xl p-3 text-sm text-white focus:outline-none focus:border-[#cae8e8]">
                      <option>Paint Protection Film (PPF)</option>
                      <option>Ceramic & Graphene Coating 9H</option>
                      <option>Paint Correction & Polish</option>
                      <option>Underbody Coating & Headlight Buffing</option>
                      <option>O3 On Wheels (Doorstep Detailing)</option>
                    </select>
                  </div>

                  <button type="submit" className="btn-primary text-xs w-full justify-center">
                    Submit Request →
                  </button>
                </form>
              </div>

            </div>

          </div>
        )}

      </main>

      {/* ================= IN-DEPTH OPENABLE SERVICE DETAIL MODAL ================= */}
      {activeServiceDetail && (
        <div className="modal-overlay">
          <div className="glass-surface max-w-2xl w-full p-8 bg-[#0d111a] border border-[#cae8e8]/40 space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setActiveServiceDetail(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white text-xl font-bold p-2 bg-slate-900 rounded-full z-20"
            >
              ✕
            </button>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl p-3 rounded-2xl bg-[#cae8e8]/10 border border-[#cae8e8]/20">{activeServiceDetail.icon}</span>
                <div>
                  <span className="text-[10px] font-mono text-[#cae8e8] uppercase tracking-wider block">{activeServiceDetail.category}</span>
                  <h2 className="text-2xl font-extrabold text-white">{activeServiceDetail.title}</h2>
                </div>
              </div>

              <p className="text-xs text-[#cae8e8] font-mono italic">{activeServiceDetail.tagline}</p>
            </div>

            <img src={activeServiceDetail.img} alt={activeServiceDetail.title} className="w-full h-56 object-cover rounded-2xl border border-[#cae8e8]/20 shadow-xl"  loading="lazy" decoding="async" />

            <div className="space-y-3 text-xs text-slate-300">
              <h4 className="font-bold text-white uppercase text-sm border-b border-[#cae8e8]/20 pb-2">Treatment Executive Summary</h4>
              <p className="leading-relaxed">{activeServiceDetail.summary}</p>
            </div>

            <div className="grid grid-cols-3 gap-3 text-xs bg-[#05070c] p-4 rounded-2xl border border-[#cae8e8]/20">
              <div>
                <span className="text-slate-400 text-[10px] uppercase block font-mono font-bold">Official Tariff</span>
                <strong className="text-[#00f0ff] text-sm sm:text-base font-extrabold font-mono">{activeServiceDetail.price}</strong>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase block font-mono font-bold">Studio Warranty</span>
                <strong className="text-[#cae8e8] text-xs font-bold">{activeServiceDetail.warranty}</strong>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase block font-mono font-bold">Durability</span>
                <strong className="text-white text-xs font-bold">{activeServiceDetail.durability}</strong>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <h4 className="font-bold text-white uppercase text-sm border-b border-[#cae8e8]/20 pb-2">Step-by-Step Detailing Procedure</h4>
              <ul className="space-y-2">
                {activeServiceDetail.procedure.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#00f0ff] font-bold">▸</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              <h4 className="font-bold text-white uppercase text-sm border-b border-[#cae8e8]/20 pb-2">Equipment & Chemical Standards</h4>
              <p className="text-slate-300 leading-relaxed"><strong className="text-white">Tools Used:</strong> {activeServiceDetail.equipment}</p>
              <p className="text-slate-300 leading-relaxed"><strong className="text-white">Recommended Maintenance:</strong> {activeServiceDetail.maintenance}</p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3 border-t border-[#cae8e8]/20">
              <button 
                onClick={() => handleOpenBookingWithService(activeServiceDetail.title)} 
                className="btn-primary text-xs flex-1 justify-center py-3 font-bold"
              >
                Book Treatment Now →
              </button>
              <a 
                href={`https://wa.me/917225030303?text=Hello%20O3%20Car-Spa!%20I%20want%20to%20inquire%20about%20service:%20${encodeURIComponent(activeServiceDetail.title)}%20(${activeServiceDetail.price})`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-xs flex-1 justify-center py-3 text-emerald-400 border-emerald-500/40 hover:bg-emerald-500/10 font-bold"
              >
                Instant WhatsApp Inquiry 💬
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ================= FINAL CTA BAND ================= */}
      <section className="bg-gradient-to-r from-[#0d111a] via-[#101827] to-[#0d111a] border-t border-b border-[#cae8e8]/20 py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <img src="assets/o3_official_logo.png" alt="O3 CAR-SPA Logo" className="logo-blend h-14 w-auto mx-auto mb-2"  loading="lazy" decoding="async" />
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">Ready for Perfection?</h2>
          <p className="text-slate-[#cae8e8] max-w-xl mx-auto text-sm sm:text-base">
            Schedule a consultation with Sharanpal Sir and team at our studio, or request doorstep concierge service.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button onClick={() => setIsBookingOpen(true)} className="btn-primary">
              Book Appointment
            </button>
            <a href="tel:9033088869" className="btn-secondary">
              📞 Call 90330 88869
            </a>
          </div>
        </div>
      </section>

      {/* ================= FOOTER (WITH SEAMLESS TRANSPARENT LOGO MARK) ================= */}
      <footer className="bg-[#040609] border-t border-[#cae8e8]/15 pt-16 pb-12 text-slate-400 text-xs relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            <div className="space-y-4">
              <img src="assets/o3_official_logo.png" alt="O3 CAR-SPA Premium Detailing Studio Official Logo" className="logo-blend h-12 w-auto"  loading="lazy" decoding="async" />
              <p className="text-slate-400 leading-relaxed">
                13+ years of detailing excellence in Anand under Mr. Sharanpal Sodhi. High-glow foam wash, PPF, Graphene & Ceramic Coating.
              </p>
              <div className="text-[#cae8e8] font-mono text-[11px]">
                "REAL PROTECTION. REAL RESULTS."
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-white text-sm uppercase tracking-wider">Navigation</h4>
              <ul className="space-y-2">
                {[{id:'home',l:'Home'},{id:'about',l:'About'},{id:'story',l:'Our Story'},{id:'gallery',l:'Work'},{id:'services',l:'Services'},{id:'products',l:'Products'},{id:'plans',l:'Plans'},{id:'contact',l:'Contact'}].map((item) => (
                  <li key={item.id}>
                    <button 
                      onClick={() => navigateTo(item.id)} 
                      className="hover:text-[#cae8e8] capitalize transition-colors text-left"
                    >
                      {item.l}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-white text-sm uppercase tracking-wider">Signature Treatments</h4>
              <ul className="space-y-2">
                {allServicesData.slice(0, 5).map((s) => (
                  <li key={s.id}>
                    <button onClick={() => { navigateTo('services'); setActiveServiceDetail(s); }} className="hover:text-[#cae8e8] transition-colors text-left">
                      {s.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-white text-sm uppercase tracking-wider">Studio Contact</h4>
              <p>📍 Plot No. 37, Zone No. D5, Opp. Bank of Baroda, GIDC, Vitthal Udyognagar, Anand, Gujarat (388121)</p>
              <p>📞 <a href="tel:7225030303" className="hover:underline text-[#00f0ff]">72250 30303</a></p>
              <p>✉️ <a href="mailto:o3carspavvn@gmail.com" className="hover:underline text-[#cae8e8]">o3carspavvn@gmail.com</a></p>
            </div>

          </div>

          <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <div>
              © O3 Car-Spa. Precision Detailing Studio (Managed by Mr. Sharanpalsingh Sodhi). All rights reserved.
            </div>
            <div className="flex gap-4">
              <a href="#" className="hover:underline">Privacy Policy</a>
              <a href="#" className="hover:underline">Terms of Service</a>
              <a href="#" className="hover:underline">Careers</a>
            </div>
          </div>

        </div>
      </footer>

      {/* ================= FRANCHISE APPLICATION MODAL ================= */}
      {isFranchiseModalOpen && (
        <div className="modal-overlay">
          <div className="glass-surface max-w-lg w-full p-8 bg-[#0d111a] space-y-6 relative border border-[#cae8e8]/30">
            <button 
              onClick={() => setIsFranchiseModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-xl font-bold"
            >
              ✕
            </button>

            <div className="space-y-1">
              <img src="assets/o3_official_logo.png" alt="O3 CAR-SPA Logo" className="logo-blend h-10 w-auto mb-1"  loading="lazy" decoding="async" />
              <h3 className="text-2xl font-bold text-white">Partner with O3 Car-Spa</h3>
              <p className="text-xs text-slate-400">Investment Tier: ₹5 Lakhs – ₹10 Lakhs</p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); alert('Franchise application received! Mr. Sharanpal Sodhi or team will connect with you within 24 hours.'); setIsFranchiseModalOpen(false); }} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Full Name</label>
                <input type="text" required placeholder="Your Name" className="w-full bg-[#05070c] border border-[#cae8e8]/30 rounded-2xl p-3 text-sm text-white focus:outline-none focus:border-[#cae8e8]" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Phone Number</label>
                <input type="tel" required placeholder="Phone Number" className="w-full bg-[#05070c] border border-[#cae8e8]/30 rounded-2xl p-3 text-sm text-white focus:outline-none focus:border-[#cae8e8]" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Target City / Location</label>
                <input type="text" required placeholder="e.g. Vadodara / Nadiad / Ahmedabad" className="w-full bg-[#05070c] border border-[#cae8e8]/30 rounded-2xl p-3 text-sm text-white focus:outline-none focus:border-[#cae8e8]" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Franchise Model Preference</label>
                <select className="w-full bg-[#05070c] border border-[#cae8e8]/30 rounded-2xl p-3 text-sm text-white focus:outline-none focus:border-[#cae8e8]">
                  <option>Mobile Unit "O3 On Wheels" (₹5 Lakhs)</option>
                  <option>Full Studio Experience (₹10 Lakhs)</option>
                </select>
              </div>

              <button type="submit" className="btn-primary text-xs w-full justify-center py-3">
                Submit Franchise Application →
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ================= INTERACTIVE BOOKING MODAL ================= */}
      {isBookingOpen && (
        <div className="modal-overlay">
          <div className="glass-surface max-w-lg w-full p-8 bg-[#0d111a] space-y-6 relative border border-[#cae8e8]/30">
            <button 
              onClick={() => setIsBookingOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-xl font-bold"
            >
              ✕
            </button>

            <div className="space-y-1">
              <img src="assets/o3_official_logo.png" alt="O3 CAR-SPA Logo" className="logo-blend h-10 w-auto mb-1"  loading="lazy" decoding="async" />
              <h3 className="text-2xl font-bold text-white">Schedule Detailing Visit</h3>
              {selectedBookingService && (
                <div className="text-xs text-[#cae8e8] font-mono">Selected: {selectedBookingService}</div>
              )}
            </div>

            <form onSubmit={(e) => { e.preventDefault(); alert(`Booking confirmed for ${selectedBookingService || 'Detailing Visit'}! Our O3 team will call you to verify your slot.`); setIsBookingOpen(false); }} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Your Full Name</label>
                <input type="text" required placeholder="Name" className="w-full bg-[#05070c] border border-[#cae8e8]/30 rounded-2xl p-3 text-sm text-white focus:outline-none focus:border-[#cae8e8]" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Phone Number</label>
                <input type="tel" required placeholder="90330 88869" className="w-full bg-[#05070c] border border-[#cae8e8]/30 rounded-2xl p-3 text-sm text-white focus:outline-none focus:border-[#cae8e8]" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Service Type</label>
                <select className="w-full bg-[#05070c] border border-[#cae8e8]/30 rounded-2xl p-3 text-sm text-white focus:outline-none focus:border-[#cae8e8]">
                  <option>Studio Visit (Vallabh Vidyanagar)</option>
                  <option>O3 On Wheels (Doorstep Concierge Visit)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Treatment Package</label>
                <input 
                  type="text" 
                  value={selectedBookingService || 'Paint Protection Film (PPF) / Ceramic 9H'} 
                  onChange={(e) => setSelectedBookingService(e.target.value)}
                  className="w-full bg-[#05070c] border border-[#cae8e8]/30 rounded-2xl p-3 text-sm text-white focus:outline-none focus:border-[#cae8e8]" 
                />
              </div>

              <button type="submit" className="btn-primary text-xs w-full justify-center py-3">
                Confirm Booking Request
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ================= DESIGN SYSTEM DRAWER ================= */}
      {isDrawerOpen && (
        <div className="drawer-panel">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#cae8e8]/20">
            <div>
              <img src="assets/o3_official_logo.png" alt="O3 CAR-SPA Logo" className="logo-blend h-8 w-auto mb-1"  loading="lazy" decoding="async" />
              <p className="text-xs text-[#cae8e8] font-mono">Official O3 Brand Tokens</p>
            </div>
            <button onClick={() => setIsDrawerOpen(false)} className="text-[#cae8e8] hover:text-[#00f0ff] font-bold">
              ✕
            </button>
          </div>

          <div className="space-y-6 text-xs text-slate-300">
            <div>
              <h4 className="font-bold text-white uppercase tracking-wider mb-2">Color Palette Tokens</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 rounded-2xl bg-[#cae8e8] text-[#05070c] font-bold">
                  <span>Ocean Water</span>
                  <span>#CAE8E8</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-2xl bg-[#00f0ff] text-[#05070c] font-bold">
                  <span>Oxygen Cyan</span>
                  <span>#00F0FF</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-2xl bg-[#05070c] text-white border border-[#cae8e8]/30">
                  <span>Obsidian Canvas</span>
                  <span>#05070C</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* ================= MOBILE NAVIGATION GLASS DRAWER (END-TO-END RESPONSIVE) ================= */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[99999] bg-[#05070c]/95 backdrop-blur-2xl flex flex-col justify-between p-6 overflow-y-auto animate-in fade-in duration-200">
          
          {/* Drawer Header */}
          <div className="flex items-center justify-between pb-6 border-b border-[#cae8e8]/20">
            <div className="flex items-center gap-3">
              <img src="assets/o3_official_logo.png" 
                alt="O3 CAR-SPA Logo" 
                className="logo-blend h-10 w-auto" 
               loading="lazy" decoding="async" />
              <div>
                <span className="text-[10px] font-mono font-bold text-[#00f0ff] uppercase block">PREMIUM STUDIO</span>
                <span className="text-xs text-white font-extrabold">Vallabh Vidyanagar</span>
              </div>
            </div>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-10 h-10 rounded-full bg-[#0d111a] border border-[#cae8e8]/30 text-white font-bold flex items-center justify-center text-lg shadow-lg active:scale-95 transition-all"
            >
              ✕
            </button>
          </div>

          {/* Navigation Links */}
          <div className="py-6 space-y-2">
            {[
              { id: 'home', label: 'Home', icon: '🏠' },
              { id: 'about', label: 'About', icon: 'ℹ️' },
              { id: 'story', label: 'Our Story', icon: '📖' },
              { id: 'gallery', label: 'Work & Media', icon: '🎥' },
              { id: 'services', label: 'Services Menu', icon: '✨' },
              { id: 'products', label: 'Products Store', icon: '🛒' },
              { id: 'plans', label: 'Plans & AMC', icon: '💎' },
              { id: 'contact', label: 'Contact Us', icon: '📍' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`w-full p-3.5 rounded-2xl text-left flex items-center justify-between font-bold text-sm transition-all ${
                  currentView === item.id
                    ? 'bg-gradient-to-r from-[#00f0ff] to-[#cae8e8] text-[#05070c] shadow-[0_0_20px_rgba(0,240,255,0.4)]'
                    : 'bg-[#0d111a] text-slate-200 border border-[#cae8e8]/15 hover:border-[#00f0ff]/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                <span>→</span>
              </button>
            ))}
          </div>

          {/* Drawer Actions */}
          <div className="pt-6 border-t border-[#cae8e8]/20 space-y-3">
            <button 
              onClick={() => { setIsMobileMenuOpen(false); setIsBookingOpen(true); }}
              className="btn-primary text-xs w-full justify-center py-3.5 font-bold shadow-[0_0_20px_rgba(0,240,255,0.5)]"
            >
              Book Studio Appointment Now 📅
            </button>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <a 
                href="tel:9033088869" 
                className="p-3 rounded-2xl bg-[#091524] border border-[#00f0ff]/30 text-[#00f0ff] font-mono font-bold flex items-center justify-center gap-2"
              >
                <span>📞</span>
                <span>Call Us</span>
              </a>

              <a 
                href="https://wa.me/919033088869?text=Hello%20O3%20Car-Spa!%20I%20want%20to%20inquire%20about%20detailing."
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-2xl bg-[#0d1a14] border border-emerald-500/30 text-emerald-400 font-mono font-bold flex items-center justify-center gap-2"
              >
                <span>💬</span>
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

// Render React App
const rootElement = document.getElementById('root');
if (rootElement) {
  const rootInstance = ReactDOM.createRoot(rootElement);
  rootInstance.render(<App />);
}
