// ==========================================================================
// O3 Car-Spa — Master Application (Reordered Cinema Showcase & Redesigned FAQ)
// ==========================================================================

const { useState, useEffect, useRef } = React;

// Official brand logos only (assets/logos/official). Brands without a verified
// official logo are shown as their name in type, never as an invented badge.
const BRAND_LOGOS = {
  '3M': 'assets/logos/official/3m.svg',
  '3M Car Care': 'assets/logos/official/3m.svg',
  'Würth': 'assets/logos/official/wurth.svg',
  'Menzerna': 'assets/logos/official/menzerna.svg',
  'Paicristal Italia': 'assets/logos/official/paicristal.svg',
  'Ma-Fra': 'assets/logos/official/mafra.webp',
  'O3 Studio': 'assets/brand/o3-logo-blue.svg',
};
function BrandMark({ brand, className = 'h-16', pad = 'p-3' }) {
  const logo = BRAND_LOGOS[brand];
  return (
    <div className={`${className} ${pad} w-full rounded-xl bg-white flex items-center justify-center overflow-hidden`}>
      {logo
        ? <img src={logo} alt={`${brand} logo`} className="max-h-full max-w-full object-contain" loading="lazy" decoding="async" />
        : <span className="font-display font-extrabold text-[#0d111a] text-lg tracking-tight text-center leading-tight">{brand}</span>}
    </div>
  );
}

// Small line icons (replace emoji in UI; inherit text colour)
const ICON_PATHS = {
  whatsapp: <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />,
  phone: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />,
  pin: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></>,
  clock: <><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>,
  mail: <><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 5L2 7" /></>,
  instagram: <><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></>,
  facebook: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
};
function Icon({ name, className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {ICON_PATHS[name]}
    </svg>
  );
}

// 0. LUXURY PRELOADER OVERLAY WITH OFFICIAL O3 TAGLINE & TELEMETRY
function O3Preloader({ progress, isFinished }) {
  const getPhaseMessage = (p) => {
    if (p < 30) return "WARMING UP THE STUDIO LIGHTS...";
    if (p < 65) return "PREPPING THE DETAILING BAY...";
    if (p < 90) return "LOADING OUR LATEST WORK...";
    return "WELCOME TO O3 CAR-SPA STUDIO — ANAND";
  };

  return (
    <div 
      className={`fixed inset-0 z-[99999] bg-[#05070c] flex flex-col items-center justify-center p-6 transition-all duration-700 select-none ${
        isFinished ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'
      }`}
    >
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(0, 141, 210, 0.07)_0%,transparent_65%)] pointer-events-none"></div>

      <div className="relative z-10 max-w-md w-full text-center space-y-8">
        {/* Brand Official Logo with Pulsing Halo */}
        <div className="relative inline-block">
          <div className="absolute -inset-4 bg-[#29A9E8]/20 rounded-full blur-2xl animate-pulse"></div>
          <img src="assets/brand/o3-logo-white.svg" 
            alt="O3 CAR-SPA Official Studio Logo" 
            className="h-20 sm:h-24 w-auto mx-auto relative z-10 drop-shadow-[0_0_35px_rgba(0, 141, 210, 0.35)]"
           loading="lazy" decoding="async" />
        </div>

        {/* Studio Official Tagline */}
        <div className="space-y-2">
          <span className="text-[11px] font-mono font-bold tracking-[0.3em] uppercase text-[#29A9E8] block">
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
            <span className="text-[#29A9E8] font-extrabold text-sm">{progress}%</span>
          </div>

          <div className="w-full h-2 bg-[#0d111a] rounded-full overflow-hidden border border-[#cae8e8]/25 p-0.5 shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-[#cae8e8] via-[#29A9E8] to-[#cae8e8] rounded-full transition-all duration-150 shadow-[0_0_15px_#29A9E8]"
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
          <span className="text-xs uppercase tracking-widest text-[#29A9E8] font-mono font-bold">Official Studio Price List & Tariff Card</span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-1">O3 Car-Spa Official Services Menu</h2>
          <p className="text-xs text-slate-400 font-mono mt-1">Transparent fixed pricing · Managed by Mr. Sharanpalsingh Sodhi · Vitthal Udyognagar, Anand</p>
        </div>

        <a 
          href="https://wa.me/917225030303?text=Hello%20Sharanpalsingh%20Sir!%20I%20want%20to%20book%20a%20detailing%20service%20from%20the%20official%20price%20list." 
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary text-xs !py-3 !px-6 flex items-center gap-2"
        >
          <span>Book via WhatsApp (72250 30303)</span>
        </a>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {tariffCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cockpit-tactile-btn ${
              activeCategory === cat.id ? 'active text-[#29A9E8]' : 'text-slate-300 hover:text-[#29A9E8]'
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
                <h4 className="text-sm font-bold text-white group-hover:text-[#29A9E8] transition-colors">{item.name}</h4>
              </div>
              <p className="text-[11px] text-slate-400 font-light leading-relaxed">{item.note}</p>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-base font-extrabold text-[#29A9E8] font-mono">{item.price}</span>
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

// 13. INDIAN GARAGE — PICK YOUR CAR (THREE.JS HEX-LED STUDIO + GSAP)
// Cars with `realWork: true` link to actual O3 studio footage of that model.
// The rest show similar-segment work and say so. Recommended services are
// looked up by id from the official tariff, so prices never drift.
const INDIAN_GARAGE = [
  { id: 'thar', name: 'Thar', maker: 'Mahindra', segment: 'Off-Road SUV', realWork: true, video: 'assets/reels/thar.mp4', accent: '#ff6b3d', why: 'Trail gravel, slush and low branches chew up a Thar\'s paint. Full-body TPU PPF soaks up stone hits; Undershield guards the chassis.', recommend: ['ppf-5yr-gloss-tpu', 'graphene-3yr', 'undershield-2yr'] },
  { id: 'scorpio', name: 'Scorpio-N', maker: 'Mahindra', segment: 'Full-Size SUV', realWork: true, video: 'assets/reels/scorpio.mp4', accent: '#c9a96e', why: 'Big flat panels show every swirl. Graphene keeps the dark paint deep and sheds Gujarat dust with a rinse.', recommend: ['graphene-5yr', 'undershield-2yr', 'alloy-coating'] },
  { id: 'fortuner', name: 'Fortuner', maker: 'Toyota', segment: 'Premium SUV', realWork: true, video: 'assets/reels/fortuner.mp4', accent: '#e8e8e8', why: 'Highway-heavy Fortuners collect chips on the bonnet and bumper. Graphene on the body, PPF on the impact zones.', recommend: ['graphene-5yr', 'ppf-5yr-gloss-tpu', 'undershield-2yr'] },
  { id: 'carens', name: 'Carens', maker: 'Kia', segment: 'Family MPV', realWork: true, video: 'assets/reels/seltos.mp4', accent: '#00d4ff', why: 'Daily city driver? A 3-year ceramic keeps it showroom-glossy with easy weekend washes.', recommend: ['ceramic-3yr', 'alloy-coating', 'ozone-treatment'] },
  { id: 'brezza', name: 'Brezza', maker: 'Maruti Suzuki', segment: 'Compact SUV', realWork: true, video: 'assets/reels/brezza.mp4', accent: '#4dd2a0', why: 'Graphene shields the clear coat from harsh summer UV and stops colour fading on bright shades.', recommend: ['graphene-3yr', 'compounding-wax', 'ozone-treatment'] },
  { id: 'xuv700', name: 'XUV700', maker: 'Mahindra', segment: 'Premium SUV', realWork: false, video: 'assets/reels/ugc-ppf.mp4', accent: '#8fb3ff', why: 'Clear PPF keeps the factory colour while blocking chips; leather care protects the light-coloured cabin.', recommend: ['ppf-3yr-clear', 'graphene-5yr', 'leather-care'] },
  { id: 'creta', name: 'Creta', maker: 'Hyundai', segment: 'Compact SUV', realWork: false, video: 'assets/reels/ppf-install.mp4', accent: '#7fe7ff', why: 'India\'s favourite SUV deserves a ceramic that makes it stand out in the parking lot.', recommend: ['ceramic-3yr', 'ozone-treatment', 'alloy-coating'] },
  { id: 'harrier', name: 'Harrier / Safari', maker: 'Tata', segment: 'Premium SUV', realWork: false, video: 'assets/reels/edge-tuck.mp4', accent: '#ff9f43', why: 'Bold paint shades and wide bonnets: gloss TPU PPF keeps them flawless for years.', recommend: ['ppf-5yr-gloss-tpu', 'ceramic-3yr', 'leather-care'] },
  { id: 'nexon', name: 'Nexon', maker: 'Tata', segment: 'Sub-4m SUV', realWork: false, video: 'assets/reels/foam-wash.mp4', accent: '#b6ff5c', why: 'Smart value pick: a 2-year ceramic plus compounding brings back the shine at a sensible budget.', recommend: ['ceramic-2yr', 'compounding-wax', 'undershield-2yr'] },
  { id: 'innova', name: 'Innova Hycross', maker: 'Toyota', segment: 'Family MPV', realWork: false, video: 'assets/reels/steam.mp4', accent: '#d9d9ff', why: 'Family cabins take a beating. Ozone treatment kills odours; graphene keeps the big body easy to wash.', recommend: ['graphene-3yr', 'leather-care', 'ozone-treatment'] }
];

const THREE_CDN = 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js';

function loadThree() {
  if (window.THREE) return Promise.resolve(window.THREE);
  if (!window.__o3ThreePromise) {
    window.__o3ThreePromise = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = THREE_CDN;
      s.async = true;
      s.onload = () => resolve(window.THREE);
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }
  return window.__o3ThreePromise;
}

// Infinite hexagonal LED cleanroom ceiling with a glossy floor reflection,
// modelled on the O3 studio's real hex lighting rig.
function HexStudioScene({ accent }) {
  const mountRef = useRef(null);
  const sceneApi = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    let disposed = false;
    let cleanup = () => {};

    const start = (THREE) => {
      if (disposed || !THREE) return;
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      // Cost control: the scene shares the GPU with the hero video above it.
      // Phones render at 1x, desktops at up to 1.25x; MSAA only on 1x screens.
      const isPhone = window.matchMedia('(max-width: 767px)').matches;
      const dpr = Math.min(window.devicePixelRatio || 1, isPhone ? 1 : 1.25);
      const renderer = new THREE.WebGLRenderer({ antialias: (window.devicePixelRatio || 1) <= 1, alpha: true, powerPreference: 'high-performance' });
      renderer.setPixelRatio(dpr);
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      mount.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      scene.fog = new THREE.Fog(0x05070c, 8, 30);
      const camera = new THREE.PerspectiveCamera(62, mount.clientWidth / mount.clientHeight, 0.1, 60);
      camera.position.set(0, 0, 4);

      const R = 1.15;
      const CEIL = 2.6;
      const FLOOR = -1.6;
      const rowStep = Math.sqrt(3) * R;
      const edgeGeo = new THREE.BoxGeometry(R * 0.93, 0.035, 0.07);
      const ledMat = new THREE.MeshBasicMaterial({ color: 0xe8fbff });
      const reflMat = new THREE.MeshBasicMaterial({ color: 0xe8fbff, transparent: true, opacity: 0.22 });

      const edges = [];
      for (let c = -7; c <= 7; c++) {
        for (let r = -14; r <= 3; r++) {
          const cx = c * 1.5 * R;
          const cz = r * rowStep + (c & 1 ? rowStep / 2 : 0);
          for (let i = 0; i < 6; i++) {
            const a1 = (Math.PI / 3) * i;
            const a2 = (Math.PI / 3) * (i + 1);
            const x1 = cx + R * Math.cos(a1), z1 = cz + R * Math.sin(a1);
            const x2 = cx + R * Math.cos(a2), z2 = cz + R * Math.sin(a2);
            edges.push([(x1 + x2) / 2, (z1 + z2) / 2, -Math.atan2(z2 - z1, x2 - x1)]);
          }
        }
      }

      const build = (mat, y) => {
        const mesh = new THREE.InstancedMesh(edgeGeo, mat, edges.length);
        const m = new THREE.Object3D();
        edges.forEach(([x, z, rot], i) => {
          m.position.set(x, y, z);
          m.rotation.set(0, rot, 0);
          m.updateMatrix();
          mesh.setMatrixAt(i, m.matrix);
        });
        return mesh;
      };
      const grid = new THREE.Group();
      grid.add(build(ledMat, CEIL));
      grid.add(build(reflMat, 2 * FLOOR - CEIL));
      scene.add(grid);

      // Glossy dark floor that the reflection shows through
      const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(60, 60),
        new THREE.MeshBasicMaterial({ color: 0x05070c, transparent: true, opacity: 0.55 })
      );
      floor.rotation.x = -Math.PI / 2;
      floor.position.y = FLOOR;
      scene.add(floor);

      // Accent light streak on the floor, recoloured per selected car
      const streakMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(accent), transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending, depthWrite: false });
      const streak = new THREE.Mesh(new THREE.PlaneGeometry(0.12, 40), streakMat);
      streak.rotation.x = -Math.PI / 2;
      streak.position.set(0, FLOOR + 0.01, -10);
      scene.add(streak);

      const pointer = { x: 0, y: 0 };
      const onPointer = (e) => {
        const rect = mount.getBoundingClientRect();
        pointer.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        pointer.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      };
      window.addEventListener('pointermove', onPointer, { passive: true });

      const onResize = () => {
        const w = mount.clientWidth, h = mount.clientHeight;
        if (!w || !h) return;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      window.addEventListener('resize', onResize);

      let visible = false;
      let raf = 0;
      const io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !raf) { last = performance.now(); raf = requestAnimationFrame(tick); }
      }, { threshold: 0.12 });
      io.observe(mount);

      const period = rowStep * 2;
      let last = performance.now();
      const FRAME = 1000 / 30;
      const tick = (now) => {
        if (!visible) { raf = 0; return; } // loop stops entirely off screen
        raf = requestAnimationFrame(tick);
        if (now - last < FRAME - 1) return;
        const dt = Math.min((now - last) / 1000, 0.08);
        last = now;
        if (!reduceMotion) grid.position.z = (grid.position.z + dt * 0.9) % period;
        camera.position.x += (pointer.x * 0.6 - camera.position.x) * 0.04;
        camera.position.y += (-pointer.y * 0.3 - camera.position.y) * 0.04;
        camera.lookAt(0, 0.4, -10);
        renderer.render(scene, camera);
      };
      // first frame is started by the IntersectionObserver above

      sceneApi.current = { THREE, ledMat, reflMat, streakMat };

      cleanup = () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        window.removeEventListener('pointermove', onPointer);
        window.removeEventListener('resize', onResize);
        edgeGeo.dispose(); ledMat.dispose(); reflMat.dispose(); streakMat.dispose();
        floor.geometry.dispose(); floor.material.dispose(); streak.geometry.dispose();
        renderer.dispose();
        renderer.domElement.remove();
        sceneApi.current = null;
      };
    };

    // Only fetch three.js once the section is about to scroll into view
    const lazy = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      lazy.disconnect();
      loadThree().then(start).catch(() => {});
    }, { rootMargin: '400px' });
    lazy.observe(mount);

    return () => { disposed = true; lazy.disconnect(); cleanup(); };
  }, []);

  // Recolour the floor streak and tint the LED rig toward the car's accent
  useEffect(() => {
    const api = sceneApi.current;
    if (!api || !window.gsap) return;
    const target = new api.THREE.Color(accent);
    const tint = new api.THREE.Color(0xe8fbff).lerp(target, 0.25);
    [[api.streakMat.color, target], [api.ledMat.color, tint], [api.reflMat.color, tint]].forEach(([c, t]) => {
      window.gsap.to(c, { r: t.r, g: t.g, b: t.b, duration: 0.9, ease: 'power2.out' });
    });
  }, [accent]);

  return <div ref={mountRef} className="absolute inset-0 pointer-events-none" aria-hidden="true"></div>;
}

function IndianGarageShowcase({ services, onBookService }) {
  const [carId, setCarId] = useState('thar');
  const stageRef = useRef(null);
  const sectionRef = useRef(null);
  const car = INDIAN_GARAGE.find(c => c.id === carId);
  const picks = car.recommend.map(id => services.find(s => s.id === id)).filter(Boolean);

  // Entrance: chips cascade in when the section scrolls into view
  useEffect(() => {
    const el = sectionRef.current;
    if (!window.gsap || !el) return;
    const chips = el.querySelectorAll('.garage-chip');
    window.gsap.set(chips, { y: 24, opacity: 0 });
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      window.gsap.to(chips, { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: 'power3.out' });
    }, { threshold: 0.2 });
    io.observe(el);
    return () => { io.disconnect(); window.gsap.set(chips, { clearProps: 'all' }); };
  }, []);

  // Car change: video and spec panel slide in
  useEffect(() => {
    if (!window.gsap || !stageRef.current) return;
    const ctx = window.gsap.context(() => {
      window.gsap.fromTo('.garage-media', { opacity: 0, scale: 1.04 }, { opacity: 1, scale: 1, duration: 0.7, ease: 'power3.out' });
      window.gsap.fromTo('.garage-reveal', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.55, stagger: 0.07, ease: 'power3.out' });
    }, stageRef);
    return () => ctx.revert();
  }, [carId]);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden py-16 sm:py-20 border-y border-[#cae8e8]/15 bg-[#05070c]">
      <HexStudioScene accent={car.accent} />
      <div className="absolute inset-0 bg-gradient-to-b from-[#05070c] via-transparent to-[#05070c] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="pill-capsule font-mono">Made for Indian Roads</span>
          <div className="overflow-hidden py-3">
            <h2 className="gsap-stagger-title text-3xl sm:text-4xl font-extrabold text-white">Pick Your Car. See Our Work.</h2>
          </div>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">From Thars that live off-road to family Innovas, choose your model for real O3 studio footage and the treatments we recommend for it.</p>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center -mx-4 px-4 sm:mx-0 sm:px-0" role="tablist" aria-label="Choose your car">
          {INDIAN_GARAGE.map(c => (
            <button
              key={c.id}
              role="tab"
              aria-selected={c.id === carId}
              onClick={() => setCarId(c.id)}
              className={`garage-chip shrink-0 px-4 py-2 rounded-full border text-xs font-semibold transition-all duration-300 ${
                c.id === carId
                  ? 'bg-white text-[#05070c] border-white shadow-[0_0_24px_rgba(202,232,232,0.55)]'
                  : 'bg-[#0d111a]/70 text-slate-300 border-[#cae8e8]/25 hover:border-[#29A9E8] hover:text-white'
              }`}
            >
              <span className="opacity-60 font-mono mr-1">{c.maker.split(' ')[0]}</span>{c.name}
            </button>
          ))}
        </div>

        <div ref={stageRef} className="grid lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-7 relative rounded-3xl overflow-hidden border border-[#cae8e8]/25 bg-black aspect-video lg:aspect-auto lg:min-h-[420px] shadow-[0_30px_80px_rgba(0,0,0,0.7)]">
            <video key={car.video} src={car.video} poster={car.video.replace('.mp4', '.webp')} data-autoplay loop muted playsInline preload="none" className="garage-media absolute inset-0 w-full h-full object-cover"></video>
            <div className="absolute inset-0 bg-gradient-to-t from-[#05070c]/90 via-transparent to-transparent pointer-events-none"></div>
            <div className="absolute top-4 left-4 flex gap-2">
              <span className={`text-[10px] font-mono font-bold px-3 py-1 rounded-full border ${car.realWork ? 'bg-emerald-500/15 border-emerald-400/50 text-emerald-300' : 'bg-[#05070c]/80 border-[#cae8e8]/30 text-slate-300'}`}>
                {car.realWork ? `● Real O3 job: ${car.name}` : 'Similar-segment O3 work'}
              </span>
            </div>
            <div className="absolute bottom-5 left-5 right-5">
              <div className="text-xs font-mono uppercase tracking-widest" style={{ color: car.accent }}>{car.maker} · {car.segment}</div>
              <div className="text-3xl sm:text-5xl font-black text-white tracking-tight">{car.name}</div>
            </div>
          </div>

          <div className="lg:col-span-5 glass-surface p-6 sm:p-7 border border-[#cae8e8]/25 bg-[#0d111a]/85 flex flex-col gap-5 text-left">
            <div className="garage-reveal space-y-2">
              <span className="text-xs uppercase tracking-widest font-mono font-bold text-[#cae8e8]">Why this combo</span>
              <p className="text-sm text-slate-300 leading-relaxed">{car.why}</p>
            </div>

            <div className="space-y-3">
              {picks.map(s => (
                <div key={s.id} className="garage-reveal flex items-center justify-between gap-3 p-3 rounded-2xl bg-[#05070c]/80 border border-[#cae8e8]/15 hover:border-[#29A9E8]/60 transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="min-w-0">
                      <div className="text-sm font-bold text-white truncate">{s.title}</div>
                      <div className="text-[11px] text-slate-400 truncate">{s.durability || s.warranty}</div>
                    </div>
                  </div>
                  <div className="text-sm font-mono font-extrabold text-[#29A9E8] shrink-0">{s.price}</div>
                </div>
              ))}
            </div>

            <div className="garage-reveal mt-auto space-y-2">
              <button onClick={() => onBookService(`${car.maker} ${car.name}: ${picks.map(p => p.title).join(' + ')}`)} className="btn-primary w-full justify-center text-xs !py-3">
                <span>Book this for my {car.name}</span>
                <span>→</span>
              </button>
              <p className="text-[10px] text-slate-500 font-mono text-center">Prices from O3's official tariff. Final quote after paint inspection.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// 14. SCROLL-VELOCITY MARQUEE — speeds up, reverses and skews with your scroll
function VelocityMarquee() {
  const rootRef = useRef(null);
  const rows = [
    { items: ['Thar', 'Scorpio-N', 'Fortuner', 'Creta', 'XUV700', 'Carens', 'Brezza', 'Harrier', 'Nexon', 'Innova Hycross'], outline: false },
    { items: ['Ceramic 9H', 'Graphene Armor', 'Self-Healing PPF', 'Paint Correction', 'Steam Interior', 'Ozone Treatment', 'Undershield'], outline: true }
  ];

  useEffect(() => {
    const gsap = window.gsap, ScrollTrigger = window.ScrollTrigger;
    if (!gsap || !ScrollTrigger || !rootRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      const tracks = gsap.utils.toArray('.marquee-track');
      const loops = tracks.map((track, i) => i % 2
        ? gsap.fromTo(track, { xPercent: -50 }, { xPercent: 0, duration: 45, ease: 'none', repeat: -1 })
        : gsap.fromTo(track, { xPercent: 0 }, { xPercent: -50, duration: 40, ease: 'none', repeat: -1 }));
      const skew = gsap.quickTo(tracks, 'skewX', { duration: 0.5, ease: 'power3' });
      // One shared speed value eased toward a target each tick. The old version
      // created four new tweens per scroll event, which churned styles and GC.
      let target = 1, speed = 1, dir = 1, idle = 0;
      const tick = () => {
        speed += (target - speed) * 0.08;
        loops.forEach(l => l.timeScale(speed));
        if (++idle === 15) { target = dir; skew(0); } // settle back to cruising speed, level
      };
      ScrollTrigger.create({
        trigger: rootRef.current,
        start: 'top bottom',
        end: 'bottom top',
        // Loops and ticker run only while the marquee is on screen
        onToggle: (self) => {
          if (self.isActive) { loops.forEach(l => l.play()); gsap.ticker.add(tick); }
          else { loops.forEach(l => l.pause()); gsap.ticker.remove(tick); }
        },
        onUpdate: (self) => {
          const v = self.getVelocity();
          dir = self.direction;
          target = gsap.utils.clamp(1, 5, Math.abs(v) / 300) * dir;
          idle = 0;
          skew(gsap.utils.clamp(-12, 12, v / -250));
        }
      });
      return () => gsap.ticker.remove(tick);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="no-scroll-reveal relative w-full overflow-hidden py-6 space-y-2 select-none" aria-label="Cars we detail and services we offer">
      {rows.map((row, i) => (
        <div key={i} className="overflow-hidden whitespace-nowrap">
          <div className="marquee-track inline-flex will-change-transform">
            {[0, 1].map(copy => (
              <div key={copy} className="flex shrink-0" aria-hidden={copy === 1}>
                {row.items.map(item => (
                  <span key={item} className={`px-6 text-4xl sm:text-6xl font-black uppercase tracking-tight ${row.outline ? 'marquee-outline' : 'text-white/90'}`}>
                    {item}<span className="inline-block align-middle w-3 h-3 sm:w-4 sm:h-4 mx-6 rotate-45 bg-[#29A9E8] shadow-[0_0_14px_#29A9E8]"></span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

// 16. PINNED HORIZONTAL PROCESS — the page pins and the 5 stages slide sideways
const O3_PROCESS = [
  { n: '01', title: 'Inspect', line: 'Paint-depth gauge and 6500K LED scan of every panel. We find what the eye can\'t.', img: 'assets/process/inspect.webp' },
  { n: '02', title: 'Decontaminate', line: 'Snow-foam bath, iron fallout remover and clay bar strip years of road grime.', img: 'assets/process/decon.webp' },
  { n: '03', title: 'Correct', line: 'Multi-stage machine compounding removes swirls, haze and light scratches.', img: 'assets/process/correct.webp' },
  { n: '04', title: 'Protect', line: 'Ceramic, graphene or self-healing PPF, hand-applied and IR-cured in the bay.', img: 'assets/process/protect.webp' },
  { n: '05', title: 'Deliver', line: 'Final inspection under studio lights, care guide and warranty card in your hand.', img: 'assets/process/deliver.webp' }
];

function PinnedProcessScroller() {
  const rootRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const gsap = window.gsap;
    if (!gsap || !window.ScrollTrigger || !rootRef.current) return;
    const mm = gsap.matchMedia();
    mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      const track = trackRef.current;
      const distance = () => track.scrollWidth - window.innerWidth;
      const tween = gsap.to(track, {
        x: () => -distance(), ease: 'none',
        scrollTrigger: {
          trigger: rootRef.current, start: 'top top', end: () => '+=' + distance(),
          pin: true, scrub: true, invalidateOnRefresh: true, anticipatePin: 1
        }
      });
      gsap.fromTo('.process-progress', { scaleX: 0 }, {
        scaleX: 1, ease: 'none',
        scrollTrigger: { trigger: rootRef.current, start: 'top top', end: () => '+=' + distance(), scrub: true, invalidateOnRefresh: true }
      });
      // Each panel's image drifts against the scroll direction for depth
      gsap.utils.toArray('.process-panel').forEach((panel) => {
        gsap.fromTo(panel.querySelector('img'), { xPercent: -8 }, {
          xPercent: 8, ease: 'none',
          scrollTrigger: { trigger: panel, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true }
        });
        gsap.from(panel.querySelectorAll('.process-copy > *'), {
          y: 40, opacity: 0, stagger: 0.08, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: panel, containerAnimation: tween, start: 'left 70%' }
        });
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={rootRef} className="no-scroll-reveal relative w-full overflow-hidden bg-[#05070c] md:h-screen flex flex-col justify-center py-12 md:py-0">
      <div className="px-4 sm:px-8 lg:px-12 mb-8 flex items-end justify-between gap-6">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-[#29A9E8] font-mono font-bold">The O3 Process</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-2">Five stages. Zero shortcuts.</h2>
        </div>
        <div className="hidden md:block w-56 h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div className="process-progress h-full bg-gradient-to-r from-[#29A9E8] to-[#cae8e8] origin-left"></div>
        </div>
      </div>

      <div ref={trackRef} className="flex flex-col md:flex-row gap-6 px-4 sm:px-8 lg:px-12 md:w-max will-change-transform">
        {O3_PROCESS.map(step => (
          <article key={step.n} className="process-panel relative md:w-[38vw] lg:w-[30vw] h-[70vh] md:h-[72vh] shrink-0 rounded-3xl overflow-hidden border border-[#cae8e8]/20 bg-black">
            <img src={step.img} alt={step.title} className="absolute inset-0 w-[116%] max-w-none h-full object-cover -left-[8%] opacity-80" loading="lazy" decoding="async" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#05070c] via-[#05070c]/40 to-transparent"></div>
            <div className="process-copy absolute bottom-0 left-0 right-0 p-6 sm:p-10 space-y-3">
              <div className="text-7xl sm:text-8xl font-black text-transparent leading-none" style={{ WebkitTextStroke: '1px rgba(0, 141, 210, 0.3)' }}>{step.n}</div>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white">{step.title}</h3>
              <p className="text-sm sm:text-base text-slate-300 max-w-md leading-relaxed">{step.line}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

// 17. SCROLL-SCRUBBED SWIRL CORRECTION — scrolling polishes the paint
function SwirlCorrectionReveal({ onBook }) {
  const rootRef = useRef(null);

  useEffect(() => {
    const gsap = window.gsap;
    if (!gsap || !window.ScrollTrigger || !rootRef.current) return;
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: rootRef.current, start: 'top top', end: '+=140%', pin: true, scrub: true, anticipatePin: 1 }
      });
      // Transform-only wipe (GPU composited): the mask slides in from the left
      // while the image inside counter-slides so it stays put. No clip-path
      // repaints or layout-triggering `left` changes per frame.
      tl.fromTo('.swirl-mask', { xPercent: -100 }, { xPercent: 0, ease: 'none' }, 0)
        .fromTo('.swirl-mask-inner', { xPercent: 100 }, { xPercent: 0, ease: 'none' }, 0)
        .fromTo('.swirl-pad', { x: 0 }, { x: () => rootRef.current.offsetWidth, ease: 'none' }, 0)
        .fromTo('.swirl-stage-label', { opacity: 1 }, { opacity: 0, duration: 0.2 }, 0.1)
        .fromTo('.swirl-done', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.2 }, 0.8);
    });
    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set(['.swirl-mask', '.swirl-mask-inner'], { xPercent: 0 });
      gsap.set('.swirl-done', { opacity: 1 });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={rootRef} className="no-scroll-reveal relative w-full h-screen overflow-hidden bg-black">
      <img src="assets/o3_swirl_before.webp" alt="Paint with swirl marks before correction" className="absolute inset-0 w-full h-full object-cover" loading="lazy" decoding="async" />
      <div className="swirl-mask absolute inset-0 overflow-hidden will-change-transform">
        <div className="swirl-mask-inner absolute inset-0 will-change-transform">
          <img src="assets/o3_swirl_after.webp" alt="Same paint after O3 correction" className="absolute inset-0 w-full h-full object-cover" decoding="async" />
        </div>
      </div>
      <div className="swirl-pad absolute top-0 bottom-0 left-0 w-[2px] -ml-px bg-[#29A9E8] shadow-[0_0_30px_8px_rgba(0, 141, 210, 0.28)] pointer-events-none will-change-transform"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#05070c]/80 via-transparent to-[#05070c]/90 pointer-events-none"></div>

      <div className="absolute top-10 left-4 right-4 sm:left-10 sm:right-10 flex items-start justify-between gap-6">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-[#29A9E8] font-mono font-bold">Paint Correction</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-2 max-w-xl">Scroll to polish.</h2>
          <p className="swirl-stage-label text-sm text-slate-300 mt-2">Keep scrolling: watch the swirl marks disappear.</p>
        </div>
        <div className="shrink-0 flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest">
          <span className="px-3 py-1 rounded-full bg-black/60 text-slate-300">Before</span>
          <span className="text-[#29A9E8]">→</span>
          <span className="px-3 py-1 rounded-full bg-[#29A9E8] text-[#05070c]">After</span>
        </div>
      </div>

      <div className="swirl-done absolute bottom-10 left-4 right-4 sm:left-10 sm:right-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 opacity-0">
        <p className="text-base sm:text-lg text-white max-w-md font-semibold">Multi-stage correction plus a ceramic or graphene layer, done in our Anand studio.</p>
        <button onClick={() => onBook('Paint Correction + Coating')} className="btn-primary text-xs !py-3 !px-6 self-start sm:self-auto">
          <span>Book a correction</span><span>→</span>
        </button>
      </div>
    </section>
  );
}

// 18. REEL FILM-STRIP — real O3 phone reels drift sideways as you scroll.
// Only the card nearest the centre plays; the rest show a still. Active card is
// worked out from scroll progress maths (no per-frame layout reads).
const O3_REELS = [
  { id: 'thar', car: 'Mahindra Thar', job: 'Full-body PPF' },
  { id: 'fortuner', car: 'Toyota Fortuner', job: 'Ceramic coating' },
  { id: 'scorpio', car: 'Mahindra Scorpio-N', job: 'Graphene coating' },
  { id: 'seltos', car: 'Kia Carens', job: 'Polish + coating' },
  { id: 'brezza', car: 'Maruti Brezza', job: 'Graphene coating' },
  { id: 'mercedes-ppf', car: 'Mercedes-Benz', job: 'PPF installation' },
  { id: 'foam-wash', car: 'Studio wash', job: 'Foam decontamination' },
  { id: 'edge-tuck', car: 'PPF detail', job: 'Edge tucking' },
  { id: 'steam', car: 'Interior', job: 'Steam sanitising' },
  { id: 'bmw', car: 'BMW', job: 'Polish & finish' }
];

function ReelFilmStrip({ onOpenGallery }) {
  const rootRef = useRef(null);
  const trackRef = useRef(null);
  const videoRefs = useRef([]);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: '100px' });
    io.observe(rootRef.current);
    return () => io.disconnect();
  }, []);

  // Play only the active reel, and only while the strip is on screen
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (inView && i === active) { const p = v.play(); if (p) p.catch(() => {}); }
      else v.pause();
    });
  }, [active, inView]);

  useEffect(() => {
    const gsap = window.gsap;
    const root = rootRef.current, track = trackRef.current;
    if (!gsap || !window.ScrollTrigger || !root || !track) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let geo = { start: 0, end: 0, step: 1, first: 0 };
    const measure = () => {
      const cards = track.children;
      const vw = window.innerWidth;
      const step = cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : 1;
      geo = {
        start: vw * 0.25,
        end: -(track.scrollWidth - vw * 0.75),
        step,
        first: cards[0].offsetLeft + cards[0].offsetWidth / 2
      };
    };
    measure();
    const pick = (x) => {
      const centre = window.innerWidth / 2 - x;
      const idx = Math.max(0, Math.min(O3_REELS.length - 1, Math.round((centre - geo.first) / geo.step)));
      if (idx !== activeRef.current) { activeRef.current = idx; setActive(idx); }
    };
    const ctx = gsap.context(() => {
      if (reduce) return;
      gsap.fromTo(track, { x: () => geo.start }, {
        x: () => geo.end,
        ease: 'none',
        scrollTrigger: {
          trigger: root, start: 'top bottom', end: 'bottom top', scrub: true,
          invalidateOnRefresh: true, onRefreshInit: measure,
          onUpdate: (self) => pick(geo.start + (geo.end - geo.start) * self.progress)
        }
      });
    }, root);
    // Reduced motion / no-GSAP fallback: native horizontal scrolling
    let onScroll;
    if (reduce) {
      onScroll = () => pick(-track.parentElement.scrollLeft);
      track.parentElement.addEventListener('scroll', onScroll, { passive: true });
    }
    return () => { ctx.revert(); if (onScroll) track.parentElement.removeEventListener('scroll', onScroll); };
  }, []);

  return (
    <section ref={rootRef} className="no-scroll-reveal relative w-full py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-[#29A9E8] font-mono font-bold">Straight from the bay</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-2">Real cars. Real reels.</h2>
          <p className="text-sm text-slate-400 mt-2 max-w-md">Unedited phone footage from our Anand studio. Scroll and the reel in the middle plays.</p>
        </div>
        <button onClick={onOpenGallery} className="btn-secondary text-xs self-start sm:self-auto">See all work →</button>
      </div>

      <div className="overflow-x-auto motion-safe:overflow-visible no-scrollbar">
        <div ref={trackRef} className="flex gap-5 sm:gap-7 w-max will-change-transform px-4">
          {O3_REELS.map((r, i) => (
            <figure
              key={r.id}
              className={`relative shrink-0 w-[62vw] sm:w-[260px] lg:w-[280px] aspect-[9/16] rounded-[28px] overflow-hidden bg-[#0d111a] border transition-[transform,opacity,border-color] duration-500 ease-out ${
                i === active ? 'scale-100 opacity-100 border-[#29A9E8]/60 shadow-[0_30px_70px_rgba(0, 141, 210, 0.09)]' : 'scale-[0.88] opacity-50 border-white/10'
              }`}
            >
              <video
                ref={el => (videoRefs.current[i] = el)}
                src={`assets/reels/${r.id}.mp4`}
                poster={`assets/reels/${r.id}.webp`}
                muted loop playsInline preload="none"
                className="absolute inset-0 w-full h-full object-cover"
              ></video>
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 to-transparent pointer-events-none"></div>
              <figcaption className="absolute bottom-0 left-0 right-0 p-5">
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#29A9E8]">{r.job}</div>
                <div className="text-lg font-extrabold text-white leading-tight">{r.car}</div>
              </figcaption>
              {i === active && (
                <span className="absolute top-4 left-4 flex items-center gap-1.5 text-[10px] font-mono font-bold text-white bg-black/60 px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>PLAYING
                </span>
              )}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

// 19. CERAMIC vs GRAPHENE vs PPF — plain-language comparison with official prices
const COMPARE_OPTIONS = [
  { id: 'ceramic-3yr', name: 'Ceramic', tone: '#cae8e8', bestFor: 'Daily drivers that want easy washing and lasting gloss' },
  { id: 'graphene-3yr', name: 'Graphene', tone: '#29A9E8', bestFor: 'Dark paint, open parking, harsh summer sun', pick: true },
  { id: 'ppf-5yr-gloss-tpu', name: 'PPF Film', tone: '#ffffff', bestFor: 'New cars, highway use, bonnets and bumpers that take stone hits' }
];
const COMPARE_ROWS = [
  { label: 'Deep gloss & colour depth', v: [true, true, true] },
  { label: 'UV & fading protection', v: [true, true, true] },
  { label: 'Water beading, easy washing', v: [true, true, true] },
  { label: 'Fewer water spots in heat', v: [false, true, false] },
  { label: 'Stops stone chips', v: [false, false, true] },
  { label: 'Light scratches heal with heat', v: [false, false, true] }
];

function CoatingCompare({ services, onBook }) {
  const rootRef = useRef(null);
  const opts = COMPARE_OPTIONS.map(o => ({ ...o, svc: services.find(s => s.id === o.id) }));

  useEffect(() => {
    const gsap = window.gsap;
    if (!gsap || !window.ScrollTrigger || !rootRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: rootRef.current, start: 'top 70%', once: true } });
      tl.from('.cmp-col', { y: 60, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out' })
        .from('.cmp-tick', { scale: 0, opacity: 0, duration: 0.35, stagger: 0.03, ease: 'back.out(2.5)' }, '-=0.4')
        .from('.cmp-price', { y: 12, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }, '-=0.3');
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="no-scroll-reveal max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <span className="text-xs uppercase tracking-[0.3em] text-[#29A9E8] font-mono font-bold">Which one do I need?</span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-2">Ceramic vs Graphene vs PPF</h2>
        <p className="text-sm text-slate-400 mt-3 max-w-xl mx-auto">The question we hear most at the studio, answered on one screen.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {opts.map((o, ci) => (
          <div key={o.id} className={`cmp-col relative rounded-3xl p-6 sm:p-7 flex flex-col gap-5 border ${o.pick ? 'bg-[#0b1a22] border-[#29A9E8]/50' : 'bg-[#0d111a] border-white/10'}`}>
            {o.pick && <span className="absolute -top-3 left-6 text-[10px] font-mono font-bold bg-[#29A9E8] text-[#05070c] px-3 py-1 rounded-full">MOST CHOSEN</span>}
            <div>
              <h3 className="text-2xl font-black" style={{ color: o.tone }}>{o.name}</h3>
              <div className="cmp-price mt-1 flex items-baseline gap-2">
                <span className="text-3xl font-black font-mono text-white">{o.svc ? o.svc.price : ''}</span>
                <span className="text-xs text-slate-400">{o.svc ? o.svc.durability : ''}</span>
              </div>
            </div>
            <ul className="space-y-2.5 text-sm">
              {COMPARE_ROWS.map(row => (
                <li key={row.label} className="flex items-center gap-3">
                  <span className={`cmp-tick inline-flex w-5 h-5 shrink-0 rounded-full items-center justify-center text-[11px] font-black ${row.v[ci] ? 'bg-[#29A9E8] text-[#05070c]' : 'bg-white/5 text-slate-600'}`}>{row.v[ci] ? '✓' : '–'}</span>
                  <span className={row.v[ci] ? 'text-slate-200' : 'text-slate-500'}>{row.label}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-slate-400 border-t border-white/10 pt-4"><span className="text-slate-200 font-semibold">Best for: </span>{o.bestFor}</p>
            <button onClick={() => onBook(o.svc ? o.svc.title : o.name)} className={`${o.pick ? 'btn-primary' : 'btn-secondary'} text-xs justify-center mt-auto`}>
              <span>Book {o.name}</span><span>→</span>
            </button>
          </div>
        ))}
      </div>
      <p className="text-center text-[11px] text-slate-500 font-mono mt-6">Many owners combine them: PPF on the front, graphene on the rest. Prices from O3's official tariff; final quote after inspection.</p>
    </section>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  // Preloader is removed from the DOM after its fade-out; left mounted, its
  // pulsing blur kept repainting every frame on every page.
  const [showPreloader, setShowPreloader] = useState(true);
  useEffect(() => {
    if (isLoading) return;
    const t = setTimeout(() => setShowPreloader(false), 800);
    return () => clearTimeout(t);
  }, [isLoading]);
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


  // Selected Service for In-Depth Detail Modal
  const [activeServiceDetail, setActiveServiceDetail] = useState(null);
  const [serviceCategory, setServiceCategory] = useState('all');

  // FAQ Accordion
  const [expandedFaq, setExpandedFaq] = useState(0);
  const [showAllReviews, setShowAllReviews] = useState(false);

  // Each page gets its own browser-tab / search title
  useEffect(() => {
    const titles = {
      home: 'O3 Car-Spa | Car Detailing, Ceramic Coating & PPF in Anand',
      about: 'About O3 Car-Spa | Detailing in Anand Since 2013',
      services: 'Services & Prices | Ceramic, Graphene, PPF | O3 Car-Spa Anand',
      plans: 'Wash Plans & Subscriptions | O3 Car-Spa Anand',
      gallery: 'Our Work | Real Cars Detailed at O3 Car-Spa, Anand',
      franchise: 'Franchise | O3 Car-Spa',
      contact: 'Contact & Location | O3 Car-Spa, Vitthal Udyognagar, Anand',
      products: 'Products | O3 Car-Spa'
    };
    document.title = titles[currentView] || titles.home;
  }, [currentView]);
  const [productCategory, setProductCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [galleryCategory, setGalleryCategory] = useState('all');
  const [lightboxMedia, setLightboxMedia] = useState(null);

  // Before/After Slider Position
  const [sliderPos, setSliderPos] = useState(50);
  const isDraggingRef = useRef(false);
  const lenisRef = useRef(null);

  const canvasRef = useRef(null);


  // 47 EXHAUSTIVE INTERACTIVE OFFICIAL SERVICES DATABASE
  const allServicesData = [
  {
    "id": "wash-vacuum",
    "title": "Exterior Wash + Shampoo & Vacuum",
    "category": "Washing & Quick Care",
    "price": "\u20b9 500",
    "icon": "",
    "tagline": "Complete Exterior Snow Foam Wash & Interior Vacuuming",
    "summary": "Multi-stage safe wash procedure using high-pressure foam cannons, grit-guard wash mitts, wheel arch cleaning, and full interior cabin vacuuming.",
    "img": "assets/services/wash-vacuum.webp",
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
    "icon": "",
    "tagline": "Deep Interior Extraction, Dashboard & Leather Dressing",
    "summary": "Deep interior sanitization treatment extracting ground-in dirt from carpets, upholstery, dashboard seams, and door trims using hot steam & specialized leather dressings.",
    "img": "assets/services/shiny-interior.webp",
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
    "icon": "",
    "tagline": "O3 Cabin Sanitization & Bacteria Elimination",
    "summary": "High-output O3 ozone gas flooding that oxidizes and destroys airborne bacteria, mold spores, smoke smells, and persistent cabin odors.",
    "img": "assets/services/ozone-treatment.webp",
    "warranty": "Odour-Free Cabin",
    "durability": "3 \u2013 6 Months",
    "equipment": "Ozone Generator, Cabin Air Circulation",
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
    "icon": "",
    "tagline": "Nourishing Leather Conditioner & UV Shield",
    "summary": "Specialized leather cleansing and oil-nourishing treatment that restores natural suppleness, prevents cracking, and shields against sun UV fading.",
    "img": "assets/services/leather-care.webp",
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
    "icon": "",
    "tagline": "Oxidation Removal & UV Clear Sealant",
    "summary": "Multi-stage wet sanding and micro-compounding technique that permanently strips yellow oxidation and haze from polycarbonate headlight lenses.",
    "img": "assets/services/headlight-restoration.webp",
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
    "icon": "",
    "tagline": "Engine Bay Wire & Pipe Rodent Protection",
    "summary": "Heavy-duty heat-resistant bitter spray formulation applied to engine bay wiring harnesses, rubber hoses, and cables to prevent rodent chewing damage.",
    "img": "assets/services/rodent-repellant.webp",
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
    "icon": "",
    "tagline": "Degreasing, Thermal Bay Dressing & Electrical Seal",
    "summary": "Complete engine bay steam restoration and heat-resistant protective clear lacquer application that keeps plastic covers, hoses, and metal components looking showroom new.",
    "img": "assets/services/engine-coating.webp",
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
    "icon": "",
    "tagline": "Brake Dust Repellent & Heat-Resistant Silica Layer",
    "summary": "Ultra-high temperature 9H quartz ceramic coating engineered to withstand 800\u00b0C brake temperatures, preventing corrosive brake dust etching into alloy rims.",
    "img": "assets/services/alloy-coating.webp",
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
    "icon": "",
    "tagline": "Rain Repellent & Night Glare Hydrophobic Shield",
    "summary": "Fluoropolymer glass coating that chemically bonds to glass, allowing rainwater to bead and fly off at speeds above 40 km/h for dramatically improved night rain visibility.",
    "img": "assets/services/windshield-coating.webp",
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
    "icon": "",
    "tagline": "Hydrophobic & Stain Barrier for Leather Seats",
    "summary": "Advanced breathable ceramic coating formulated for genuine leather seats that prevents liquid penetration, UV fading, and dye transfer from blue jeans.",
    "img": "assets/services/leather-shield.webp",
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
    "icon": "",
    "tagline": "Liquid Repellent Barrier for Fabric Upholstery",
    "summary": "Hydrophobic textile barrier coating that coats individual fabric fibers, causing coffee, soda, and water spills to bead up on top of seats without soaking in.",
    "img": "assets/services/fabric-shield.webp",
    "warranty": "2 Years Warranty",
    "durability": "2 Years",
    "equipment": "Fabric Protection Spray, Heat Curing Guns",
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
    "icon": "",
    "tagline": "Restores Plastic Cladding & Prevents UV Fading",
    "summary": "Permanent plastic restoration ceramic coating that penetrates deep into oxidized unpainted exterior trim and bumpers, restoring rich dark matte color with 2-year UV defense.",
    "img": "assets/services/trim-shield.webp",
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
    "icon": "",
    "tagline": "Single-Stage Gloss Enhancement & Carnauba Wax",
    "summary": "Single-stage orbital machine polish that restores paint clarity, removes light haze, and applies a rich protective synthetic wax layer.",
    "img": "assets/services/machine-polish.webp",
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
    "icon": "",
    "tagline": "Swirl Mark Reduction & High-Gloss Sealant",
    "summary": "Two-stage paint correction process combining heavy compounding scratch reduction with fine finishing polish and a high-durability hybrid wax sealant.",
    "img": "assets/services/compounding-wax.webp",
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
    "icon": "",
    "tagline": "3-Stage Paint Leveling & Deep Gloss Conservation",
    "summary": "Flagship 3-step studio paint correction and leveling treatment that measures clear coat depth, removes multi-layer defects, and applies O3 silica protective coating.",
    "img": "assets/services/o3-coating-3steps.webp",
    "warranty": "2 Years Warranty",
    "durability": "2 Years",
    "equipment": "Machine Polishers, Cutting & Finishing Compounds, O3 Silica Sealant",
    "procedure": [
      "Phase 1: Paint inspection under bright LED lights",
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
    "icon": "",
    "tagline": "Entry-Level Liquid Quartz Gloss & Hydrophobic Barrier",
    "summary": "Professional 9H SiO2 ceramic glass coating providing 12 months of high-gloss shine, rain repellency, and chemical resistance.",
    "img": "assets/services/ceramic-1yr.webp",
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
    "icon": "",
    "tagline": "24-Month Quartz Hardness & Mirror Surface Gloss",
    "summary": "Double-layer 9H SiO2 quartz coating that bonds to clear coat, preserving deep mirror gloss and UV protection for 2 full years.",
    "img": "assets/services/ceramic-2yr.webp",
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
    "icon": "",
    "tagline": "36-Month High-Density Quartz Surface Protection",
    "summary": "High-density 9H SiO2 ceramic formulation with enhanced chemical resistance against bird droppings, tree sap, and acid rain.",
    "img": "assets/services/ceramic-3yr.webp",
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
    "icon": "",
    "tagline": "5-Year Ultra-Durable SiO2 Quartz Flagship Coating",
    "summary": "Flagship 5-year multi-layer ceramic matrix coating offering ultimate scratch resistance, deep wet-look reflection, and hyper-hydrophobic water repellency.",
    "img": "assets/services/ceramic-5yr.webp",
    "warranty": "5 Years Warranty",
    "durability": "5 Years",
    "equipment": "DeFelsko Gauge, Multi-Layer 9H Quartz, Hedson IR Curing",
    "procedure": [
      "Phase 1: 3-pass paint correction to 98%+ clarity",
      "Phase 2: Dual panel wipe decontamination",
      "Phase 3: Base coat + Top coat multi-layer quartz application",
      "Phase 4: Indoor curing before handover"
    ],
    "maintenance": "Annual studio maintenance top-up pass included."
  },
  {
    "id": "ceramic-2yr-1coatcare",
    "title": "2 Years Ceramic Shield (1 CoatCare Included)",
    "category": "Ceramic Coating Packages",
    "price": "\u20b9 25,000",
    "icon": "",
    "tagline": "Includes 1 Free Maintenance CoatCare Service",
    "summary": "Complete 2-year ceramic coating package bundled with 1 complimentary annual studio CoatCare decontamination & top-up maintenance service.",
    "img": "assets/services/ceramic-2yr-1coatcare.webp",
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
    "icon": "",
    "tagline": "Includes 2 Free Maintenance CoatCare Services",
    "summary": "Premium 3-year ceramic shield bundle backed by 2 complimentary annual studio CoatCare maintenance sessions for long-term gloss retention.",
    "img": "assets/services/ceramic-3yr-2coatcare.webp",
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
    "icon": "",
    "tagline": "Includes 4 Free Annual CoatCare Services",
    "summary": "Ultimate 5-year ceramic protection program bundled with 4 full annual studio CoatCare maintenance passes for total peace of mind.",
    "img": "assets/services/ceramic-5yr-4coatcare.webp",
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
    "icon": "",
    "tagline": "Reduced Water Spotting & Enhanced Hardness",
    "summary": "Reduced Graphene Oxide (rGO) matrix coating delivering high thermal dissipation, lower water spot etching, and slick hydrophobic protection.",
    "img": "assets/services/graphene-2yr.webp",
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
    "icon": "",
    "tagline": "36-Month Thermal Dissipation & Hydrophobic Slickness",
    "summary": "3-year high-durability graphene matrix coating engineered for hot Indian summer road conditions, repelling water spots & road grime.",
    "img": "assets/services/graphene-3yr.webp",
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
    "icon": "",
    "tagline": "5-Year Ultra Graphene Hardness Matrix Flagship",
    "summary": "Flagship 5-year graphene matrix protection providing unmatched contact angle water beading, extreme scratch resistance, and wet gloss.",
    "img": "assets/services/graphene-5yr.webp",
    "warranty": "5 Years Warranty",
    "durability": "5 Years",
    "equipment": "Multi-Layer Graphene Oxide, Hedson IR Curing",
    "procedure": [
      "Phase 1: 3-stage paint leveling to 98%+ scratch elimination",
      "Phase 2: Solvent decontamination wipe",
      "Phase 3: Multi-layer rGO graphene matrix application",
      "Phase 4: Indoor curing before handover"
    ],
    "maintenance": "Annual studio inspection included."
  },
  {
    "id": "graphene-2yr-1coatcare",
    "title": "2 Years Graphene Armor (1 CoatCare Included)",
    "category": "Graphene Coating Packages",
    "price": "\u20b9 28,000",
    "icon": "",
    "tagline": "Includes 1 Free Maintenance CoatCare Service",
    "summary": "2-year graphene armor package bundled with 1 complimentary annual studio CoatCare decontamination & top-up service.",
    "img": "assets/services/graphene-2yr-1coatcare.webp",
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
    "icon": "",
    "tagline": "Includes 2 Free Maintenance CoatCare Services",
    "summary": "3-year graphene matrix coating bundle including 2 complimentary annual studio CoatCare maintenance sessions.",
    "img": "assets/services/graphene-3yr-2coatcare.webp",
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
    "icon": "",
    "tagline": "Includes 4 Free Annual CoatCare Services",
    "summary": "Ultimate 5-year graphene matrix program bundled with 4 full annual studio CoatCare maintenance passes.",
    "img": "assets/services/graphene-5yr-4coatcare.webp",
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
    "icon": "",
    "tagline": "Clear Self-Healing Protective Film (3 Years)",
    "summary": "Entry-level clear self-healing protective film engineered to shield factory paint against stone chips, scratches, and road debris.",
    "img": "assets/services/ppf-3yr-clear.webp",
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
    "icon": "",
    "tagline": "5-Year Clear Self-Healing Hybrid Protective Armor",
    "summary": "High-durability clear TPH film offering 5 years of self-healing scratch defense and optical paint clarity.",
    "img": "assets/services/ppf-5yr-clear.webp",
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
    "icon": "",
    "tagline": "Premium Optical Grade Self-Healing TPU Film",
    "summary": "Premium 100% optical-grade TPU film with instant heat-activated self-healing, hyper-gloss clarity, and non-yellowing adhesive layer.",
    "img": "assets/services/ppf-5yr-gloss-tpu.webp",
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
    "icon": "",
    "tagline": "Flagship Optical Grade Self-Healing TPU Film (7 Years)",
    "summary": "Ultra-thick 7-year flagship TPU self-healing armor providing maximum protection against high-speed gravel hits and key scratches.",
    "img": "assets/services/ppf-7yr-gloss-tpu.webp",
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
    "icon": "",
    "tagline": "Stealth Satin Finish Self-Healing Film (3 Years)",
    "summary": "Converts glossy paint into a sleek matte/satin finish while providing full self-healing stone chip protection.",
    "img": "assets/services/ppf-3yr-matt.webp",
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
    "icon": "",
    "tagline": "Stealth Satin Finish Optical TPU Self-Healing Film",
    "summary": "Premium optical-grade matte TPU film offering smooth satin texture, self-healing capability, and 5 years of anti-scratch armor.",
    "img": "assets/services/ppf-5yr-matt-tpu.webp",
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
    "icon": "",
    "tagline": "Flagship Satin TPU Stealth Protection Film (7 Years)",
    "summary": "Top-of-the-line 7-year matte TPU armor for premium cars and SUVs seeking a custom satin look with ultimate paint defense.",
    "img": "assets/services/ppf-7yr-matt-tpu.webp",
    "warranty": "7 Years Warranty",
    "durability": "7 Years",
    "equipment": "Flagship Matte TPU, Steam Edge Tuckers",
    "procedure": [
      "Phase 1: Full vehicle paint prep",
      "Phase 2: Full body stealth matte TPU wrap",
      "Phase 3: Indoor heat curing"
    ],
    "maintenance": "7-year studio warranty included."
  },
  {
    "id": "ppf-3yr-black",
    "title": "PPF 3 Years - BLACK (TPH Roof & Accent Film)",
    "category": "Paint Protection Film (PPF)",
    "price": "\u20b9 80,000",
    "icon": "",
    "tagline": "Gloss Black Roof & Accent Protection Film",
    "summary": "Deep mirror gloss black TPH film designed for dual-tone roof wraps, pillars, mirrors, and hood accents with self-healing defense.",
    "img": "assets/services/ppf-3yr-black.webp",
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
    "icon": "",
    "tagline": "5-Year Gloss Black Self-Healing Accent Film",
    "summary": "High-durability gloss black TPH protective film for full body or accent panel transformations.",
    "img": "assets/services/ppf-5yr-black.webp",
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
    "icon": "",
    "tagline": "Flagship Black TPU Self-Healing Armor (7 Years)",
    "summary": "Flagship black TPU film combining deep piano-black mirror shine with heavy-duty anti-scratch self-healing armor.",
    "img": "assets/services/ppf-7yr-black-tpu.webp",
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
    "icon": "",
    "tagline": "Colored Custom Wrap Protection Film",
    "summary": "Custom colored TPH protection film allowing complete vehicle color transformations with built-in stone chip defense.",
    "img": "assets/services/ppf-3yr-color.webp",
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
    "icon": "",
    "tagline": "Quick Top-Up Hydrophobic Boost",
    "summary": "Single-pass studio maintenance wash & SiO2 hydrophobic booster spray application to revive ceramic/wax water beading.",
    "img": "assets/services/maintenance-1time.webp",
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
    "icon": "",
    "tagline": "Complete Decontamination & Ceramic Re-Load",
    "summary": "Full studio ceramic maintenance session including iron decontamination wash, clay bar pass, and ceramic reload coating top-up.",
    "img": "assets/services/ceramic-maintenance-1time.webp",
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
    "icon": "",
    "tagline": "Complete Decontamination & Graphene Re-Load",
    "summary": "Complete studio graphene maintenance treatment reviving slickness, gloss, and water spot defense on graphene-coated vehicles.",
    "img": "assets/services/graphene-maintenance-1time.webp",
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
    "icon": "",
    "tagline": "Monthly Detailing Snow Foam Wash Package",
    "summary": "12 high-pressure snow foam detailing washes valid over 12 months with interior vacuuming and tire gel dressing.",
    "img": "assets/services/subscription-12.webp",
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
    "icon": "",
    "tagline": "Bi-Monthly Detailing Snow Foam Wash Package",
    "summary": "24 detailing snow foam washes valid over 24 months for complete vehicle maintenance.",
    "img": "assets/services/subscription-24.webp",
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
    "icon": "",
    "tagline": "3-Year VIP Detailing Wash Package",
    "summary": "36 detailing washes valid over 3 years with complimentary underbody flush sessions.",
    "img": "assets/services/subscription-36.webp",
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
    "icon": "",
    "tagline": "5-Year VIP Unlimited Detailing Wash Package",
    "summary": "Ultimate 60-wash subscription over 5 years keeping your vehicle pristine with high-glow foam washes.",
    "img": "assets/services/subscription-60.webp",
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
    "icon": "",
    "tagline": "Heavy-Duty Rubberized Anti-Rust Chassis Coating",
    "summary": "Heavy-duty rubberized underbody coating applied on hydraulic lift to frame rails and wheel wells to prevent monsoon rust & gravel noise.",
    "img": "assets/services/undershield-2yr.webp",
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
      // Old links to merged/hidden pages land on the right page and section
      const aliases = { story: ['about'], studio: ['about'], concierge: ['services', 'doorstep'], faq: ['services', 'faq'], testimonials: ['home', 'reviews'] };
      if (aliases[hash]) {
        const [v, anchor] = aliases[hash];
        setCurrentView(v);
        if (anchor) setTimeout(() => { const el = document.getElementById(anchor); if (el) el.scrollIntoView(); }, 600);
        return;
      }
      if (['home', 'about', 'gallery', 'services', 'products', 'plans', 'contact', 'franchise'].includes(hash)) {
        setCurrentView(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Pages merged into others (or hidden): old names land on the right section
  const VIEW_ALIASES = { story: ['about'], studio: ['about'], concierge: ['services', 'doorstep'], faq: ['services', 'faq'], testimonials: ['home', 'reviews'] };
  const scrollToAnchor = (id) => setTimeout(() => {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenisRef.current) lenisRef.current.scrollTo(el, { offset: -100 }); else el.scrollIntoView({ behavior: 'smooth' });
  }, 350);

  const navigateTo = (requested) => {
    const [view, anchor] = VIEW_ALIASES[requested] || [requested];
    setCurrentView(view);
    window.location.hash = view;
    if (anchor) { setIsMobileMenuOpen(false); scrollToAnchor(anchor); return; }
    setIsMobileMenuOpen(false);
    if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Videos only play (and only download) while near the screen.
  // Use data-autoplay instead of autoPlay so off-screen videos never download up front.
  // Autoplay videos only play while on screen — dozens of looping videos
  // decoding at once was the other big source of lag
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) { const p = target.play(); if (p) p.catch(() => {}); }
        else target.pause();
      });
    }, { rootMargin: '200px' });
    const watch = () => document.querySelectorAll('video[autoplay], video[data-autoplay]').forEach(v => {
      if (!v.__o3Watched) { v.__o3Watched = true; io.observe(v); }
    });
    watch();
    const mo = new MutationObserver(watch);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { mo.disconnect(); io.disconnect(); };
  }, []);

  // GSAP ScrollTrigger Animations (runs for every view once the preloader is gone)
  useEffect(() => {
    const gsap = window.gsap, ScrollTrigger = window.ScrollTrigger;
    if (isLoading || !gsap || !ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      // Reading progress bar
      gsap.fromTo('.scroll-progress-bar', { scaleX: 0 }, {
        scaleX: 1, ease: 'none',
        scrollTrigger: { trigger: document.documentElement, start: 'top top', end: 'bottom bottom', scrub: 0.3 }
      });

      if (reduceMotion) return;

      // Hero: video pushes in and text lifts away as you scroll past
      if (document.querySelector('.hero-video-bg-clear')) {
        const heroTl = gsap.timeline({
          scrollTrigger: { trigger: '.hero-video-stage-clear', start: 'top top', end: 'bottom top', scrub: true }
        });
        // force3D keeps the video and copy on stable GPU layers. With the default
        // ("auto") GSAP drops the layer whenever scrolling pauses and the browser
        // re-rasterises the full-screen video when scrolling resumes.
        gsap.set(['.hero-video-bg-clear', '.gsap-hero-copy'], { force3D: true, willChange: 'transform' });
        // Scaling a full-screen video every scroll frame is the hero's biggest cost on
        // phones (3x pixel density), so the zoom runs on tablets/desktops only. The video
        // itself plays unchanged everywhere; the text lift-and-fade runs everywhere.
        if (window.matchMedia('(min-width: 768px)').matches) {
          heroTl.to('.hero-video-bg-clear', { scale: 1.18, yPercent: 12, ease: 'none', force3D: true }, 0);
        }
        heroTl.to('.gsap-hero-copy', { yPercent: -40, opacity: 0, ease: 'none', force3D: true }, 0);
        // Hero is off screen: let the browser free those layers
        ScrollTrigger.create({
          trigger: '.hero-video-stage-clear', start: 'bottom top',
          onEnter: () => gsap.set(['.hero-video-bg-clear', '.gsap-hero-copy'], { willChange: 'auto' }),
          onLeaveBack: () => gsap.set(['.hero-video-bg-clear', '.gsap-hero-copy'], { willChange: 'transform' })
        });

        gsap.from('.gsap-hero-copy > *', { y: 40, opacity: 0, duration: 1.1, stagger: 0.12, ease: 'power4.out', delay: 0.15 });
      }

      // Masked title reveals
      gsap.utils.toArray('.gsap-stagger-title').forEach((title) => {
        gsap.fromTo(title, { yPercent: 100, opacity: 0 }, {
          yPercent: 0, opacity: 1, duration: 1.2, ease: 'power4.out',
          scrollTrigger: { trigger: title, start: 'top 92%', once: true }
        });
      });

      // Section intro pills and paragraphs
      gsap.utils.toArray('main .pill-capsule').forEach((el) => {
        if (el.closest('.hero-video-stage-clear')) return;
        gsap.from(el, { y: 16, opacity: 0, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 92%', once: true } });
      });

      // Cards rise in, in batches, wherever they appear on the page.
      // Their own CSS hover transitions are paused during the tween so they don't fight GSAP.
      const cards = gsap.utils.toArray('main .glass-surface, main .pillar-floating-item').filter(el => !el.closest('.no-scroll-reveal'));
      gsap.set(cards, { y: 50, opacity: 0, transition: 'none' });
      ScrollTrigger.batch(cards, {
        start: 'top 90%',
        once: true,
        onEnter: (batch) => gsap.to(batch, {
          y: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: 'power3.out', force3D: true,
          onStart: () => gsap.set(batch, { willChange: 'transform, opacity' }),
          onComplete: () => gsap.set(batch, { clearProps: 'transform,opacity,transition,willChange' })
        })
      });

      // Trust-strip count-up ("5,000+" → counts from 0, keeps its suffix)
      gsap.utils.toArray('.gsap-counter').forEach((el) => {
        const match = el.textContent.match(/^([\d,]+)(.*)$/);
        if (!match) return;
        const target = parseInt(match[1].replace(/,/g, ''), 10);
        const suffix = match[2];
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target, duration: 2, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          onUpdate: () => { el.textContent = Math.round(obj.v).toLocaleString('en-IN') + suffix; }
        });
      });
    });

    // Layout shifts after fonts/videos load; re-measure so triggers fire at the right spots
    const refresh = () => ScrollTrigger.refresh();
    const t = setTimeout(refresh, 300);
    window.addEventListener('load', refresh);
    return () => { clearTimeout(t); window.removeEventListener('load', refresh); ctx.revert(); };
  }, [currentView, isLoading]);

  // Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger stays in sync
  useEffect(() => {
    const gsap = window.gsap, ScrollTrigger = window.ScrollTrigger;
    if (!window.Lenis || !gsap || !ScrollTrigger) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new window.Lenis({
      lerp: 0.1,
      smoothWheel: true,
      // Let modals, drawers and lightboxes (all position: fixed) scroll natively
      prevent: (node) => node instanceof Element && getComputedStyle(node).position === 'fixed'
    });
    lenisRef.current = lenis;
    // Lenis rewrites the <html> class on every scroll start/stop, which forces a
    // full-page style recalculation many times a second. Set the classes once
    // and toggle only `lenis-stopped` ourselves (see the overlay effect below).
    lenis.updateClassName = () => {};
    lenis.cleanUpClassName = () => {};
    document.documentElement.classList.add('lenis', 'lenis-smooth');
    lenis.on('scroll', ScrollTrigger.update);
    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => { gsap.ticker.remove(raf); lenis.destroy(); lenisRef.current = null; document.documentElement.classList.remove('lenis', 'lenis-smooth', 'lenis-stopped'); };
  }, []);

  // While the page is scrolling, content slides under a resting mouse and every
  // card it passes fires its hover lift/glow/zoom, restyling and repainting each
  // frame. Disable hit-testing during scroll; hover returns 150ms after it stops.
  useEffect(() => {
    const root = document.documentElement;
    let timer = null;
    const onScroll = () => {
      if (!timer) root.classList.add('is-scrolling');
      else clearTimeout(timer);
      timer = setTimeout(() => { root.classList.remove('is-scrolling'); timer = null; }, 150);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); clearTimeout(timer); root.classList.remove('is-scrolling'); };
  }, []);

  // Freeze page scrolling while any modal or drawer is open (lets the modal scroll itself)
  const anyOverlayOpen = isBookingOpen || isFranchiseModalOpen || isDrawerOpen || isMobileMenuOpen || !!activeServiceDetail || !!selectedProduct || !!lightboxMedia;
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    if (anyOverlayOpen) lenis.stop(); else lenis.start();
    document.documentElement.classList.toggle('lenis-stopped', anyOverlayOpen);
  }, [anyOverlayOpen]);

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
      {showPreloader && <O3Preloader progress={loadProgress} isFinished={!isLoading} />}

      {/* Scroll progress bar */}
      <div className="scroll-progress-bar" aria-hidden="true"></div>


      {/* FLOATING DIRECT WHATSAPP ACTION TOGGLE BUTTON (PURE ROUND CIRCLE) */}
      <a 
        href="https://wa.me/917225030303?text=Hello%20O3%20Car-Spa!%20I%20want%20to%20inquire%20about%20detailing."
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float-btn"
        title="Direct WhatsApp Chat with Sharanpalsingh Sir"
      >
        <span className="whatsapp-pulse-dot"></span>
        <Icon name="whatsapp" className="w-7 h-7" />
      </a>

      {/* ================= HEADER / NAVIGATION (SEAMLESS ABSOLUTE BLENDED HEADER) ================= */}
      <header className="absolute top-6 left-0 right-0 z-50 pointer-events-none transition-all">
        <div className="w-full px-4 sm:px-8 flex items-center justify-between pointer-events-auto">
          
          {/* OFFICIAL SEAMLESS TRANSPARENT LOGO */}
          <div 
            onClick={() => navigateTo('home')} 
            className="cursor-pointer flex items-center gap-3 group"
          >
            <img src="assets/brand/o3-logo-white.svg" 
              alt="O3 CAR-SPA Premium Car Detailing Studio Official Logo" 
              className="logo-blend h-12 sm:h-14 w-auto group-hover:scale-103 transition-transform"
             loading="lazy" decoding="async" />
          </div>

          {/* ELEGANT FLOATING GLASS NAV CAPSULE */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#0d111a]/85 backdrop-blur-xl border border-[#cae8e8]/25 px-3 py-1.5 rounded-full shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
            {[
              { id: 'home', label: 'Home' },
              { id: 'about', label: 'About' },
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
                    ? 'bg-gradient-to-r from-[#29A9E8] to-[#cae8e8] text-[#05070c] shadow-[0_0_20px_rgba(0, 141, 210, 0.3)] font-extrabold'
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
              className="lg:hidden flex items-center gap-2 bg-[#0d111a]/90 border border-[#29A9E8]/40 text-[#29A9E8] px-4 py-2 rounded-full font-mono text-xs font-bold shadow-[0_0_15px_rgba(0, 141, 210, 0.15)] active:scale-95 transition-all"
            >
              <span>☰</span>
              <span>MENU</span>
            </button>
            <a 
              href="tel:7225030303" 
              className="hidden xl:flex items-center gap-2 text-xs text-[#29A9E8] bg-[#29A9E8]/10 px-4 py-2 rounded-full border border-[#29A9E8]/30 hover:bg-[#29A9E8]/20 transition-all font-mono font-bold shadow-[0_0_15px_rgba(0, 141, 210, 0.1)]"
            >
              <Icon name="phone" className="w-4 h-4" />
              <span>72250 30303</span>
            </a>

            <button 
              onClick={() => setIsBookingOpen(true)}
              className="btn-primary text-xs !py-2 !px-5 font-bold shadow-[0_0_20px_rgba(0, 141, 210, 0.2)]"
            >
              Book Appointment
            </button>
          </div>
        </div>
      </header>

      {/* ================= MAIN VIEWS ================= */}
      <main className="flex-1 relative z-10">

        {/* ---------------- HOME VIEW ---------------- */}
        {currentView === 'home' && (
          <div className="space-y-28 sm:space-y-36 pb-28">
            
            {/* 1. UNOBSTRUCTED 4K HERO VIDEO STAGE */}
            <section className="relative w-full overflow-hidden">
              <div className="hero-video-stage-clear min-h-[85vh] sm:min-h-[90vh]">
                
                <video 
                  src="assets/hero_web.mp4"
                  poster="assets/hero_poster.webp"
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="hero-video-bg-clear"
                ></video>

                <div className="hero-video-overlay-light"></div>

                <div className="gsap-hero-copy absolute bottom-10 left-0 right-0 z-20 w-full px-4 sm:px-8 lg:px-12 flex flex-col md:flex-row md:items-end justify-between gap-6 pointer-events-none">
                  
                  <div className="space-y-3 max-w-lg text-left pointer-events-auto">
                    <div className="pill-capsule bg-[#05070c]/70 border-[#cae8e8]/40 shadow-2xl !py-1 !px-3.5 !text-[11px]">
                      <span className="font-bold">13+ Years Detailing Expertise</span>
                      <span className="text-[#cae8e8]/40">|</span>
                      <span className="font-mono text-emerald-400 font-semibold">Sharanpal Sodhi</span>
                    </div>

                    <h1 className="gsap-hero-title text-shadow-hero text-4xl sm:text-6xl font-extrabold text-white leading-[1.08] tracking-tight">
                      Exclusive Coatings for <span className="text-gradient-ocean font-black">Cars That Deserve More.</span>
                    </h1>

                    <p className="text-shadow-hero text-xs sm:text-sm text-slate-200 font-light leading-relaxed max-w-md">
                      Precision detailing for people who care about every inch of their car. Glass Coating · Ceramic Coating · Acrylic Coating
                    </p>                  </div>

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

            {/* SCROLL-VELOCITY MARQUEE */}
            <VelocityMarquee />

            {/* INDIAN GARAGE: PICK YOUR CAR */}
            <IndianGarageShowcase services={allServicesData} onBookService={handleOpenBookingWithService} />

            {/* 9. CUSTOMER REVIEWS & TESTIMONIALS HIGHLIGHT */}
            <section id="reviews" className="scroll-mt-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-[#cae8e8]/20">
                <div>
                  <span className="text-xs uppercase tracking-widest text-amber-400 font-mono font-bold">REVIEWS HIGHLIGHT</span>
                  <div className="overflow-hidden py-3">
                    <h2 className="gsap-stagger-title text-3xl font-extrabold text-white">5.0 ★ Google Rating & Verified Stories</h2>
                  </div>
                </div>
                <button onClick={() => setShowAllReviews(v => !v)} className="btn-secondary text-xs mt-4 md:mt-0">
                  {showAllReviews ? 'Show fewer reviews' : `Read all ${realReviews.length} reviews`}
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {(showAllReviews ? realReviews : realReviews.slice(0, 3)).map((rev) => (
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

            {/* REAL REELS FILM-STRIP */}
            <ReelFilmStrip onOpenGallery={() => navigateTo('gallery')} />

            {/* PINNED HORIZONTAL PROCESS */}
            <PinnedProcessScroller />

            {/* CERAMIC vs GRAPHENE vs PPF */}
            <CoatingCompare services={allServicesData} onBook={handleOpenBookingWithService} />

            {/* SCROLL-SCRUBBED SWIRL CORRECTION */}
            <SwirlCorrectionReveal onBook={handleOpenBookingWithService} />

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
                    <img src="assets/sharanpal_sodhi_founder.webp" alt="Founder Mr. Sharanpal Sodhi" className="w-full h-80 object-cover rounded-3xl border border-[#cae8e8]/30 shadow-2xl"  loading="lazy" decoding="async" />
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-white">Mr. Sharanpal Sodhi</h3>
                      <p className="text-xs text-[#cae8e8] font-mono">Founder & Master Detailer (Sharanpal Sir)</p>
                    </div>
                  </div>

                  <div className="lg:col-span-7 space-y-5">
                    <div className="relative rounded-3xl overflow-hidden border border-[#cae8e8]/30 shadow-2xl h-72">
                      <video src="assets/reels/scorpio-polish.mp4" poster="assets/reels/scorpio-polish.webp" data-autoplay loop muted playsInline preload="none" className="w-full h-full object-cover rounded-2xl"></video>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      "At O3 Car Spa, detailing is an exact science. From daily drivers to premium SUVs, every panel gets multi-stage polishing and coating under bright 6500K inspection lights."
                    </p>
                  </div>
                </div>
              </div>
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
                    <img src="assets/brand/o3-on-wheels.webp" alt="O3 On Wheels doorstep detailing: a freshly detailed Mahindra Scorpio-N on a customer driveway" className="w-full aspect-[16/10] object-cover rounded-3xl border border-[#cae8e8]/30"  loading="lazy" decoding="async" />
                  </div>
                </div>
              </div>
            </section>

            {/* 12. REDESIGNED BEAUTIFUL GLASS FAQ HIGHLIGHT SECTION */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <div className="glass-surface p-8 sm:p-12 border border-[#cae8e8]/30 bg-gradient-to-br from-[#0d111a] via-[#101726] to-[#05070c] space-y-8 shadow-2xl">
                
                <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#cae8e8]/20 pb-6">
                  <div className="space-y-1">
                    <span className="text-xs uppercase tracking-widest text-[#cae8e8] font-mono font-bold">
                      KNOWLEDGE BASE & FREQUENTLY ASKED QUESTIONS
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
                  <span className="pill-capsule font-mono">Studio Location & Direct API Hub</span>
                  <div className="overflow-hidden py-3">
                    <h2 className="gsap-stagger-title text-3xl sm:text-4xl font-extrabold text-white">Find Our Studio & Connect Direct</h2>
                  </div>
                  <p className="text-xs text-slate-300">Directions to our studio, plus direct WhatsApp, phone and social links.</p>
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
                        <span className="text-lg text-[#29A9E8] pt-0.5"><Icon name="pin" className="w-5 h-5" /></span>
                        <div>
                          <strong className="text-white block">Full Studio Address:</strong>
                          Plot No. 37, Zone No. D5, Opp. Bank of Baroda, GIDC, Vitthal Udyognagar, Anand, Gujarat (388121)
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <span className="text-lg text-[#29A9E8] pt-0.5"><Icon name="clock" className="w-5 h-5" /></span>
                        <div>
                          <strong className="text-white block">Studio Working Hours:</strong>
                          Monday – Sunday: 9:00 AM – 8:00 PM
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <span className="text-lg text-[#29A9E8] pt-0.5"><Icon name="phone" className="w-5 h-5" /></span>
                        <div>
                          <strong className="text-white block">Direct Booking / Query Line:</strong>
                          <a href="tel:7225030303" className="text-[#29A9E8] hover:underline font-mono font-bold">72250 30303</a>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <span className="text-lg text-[#29A9E8] pt-0.5"><Icon name="mail" className="w-5 h-5" /></span>
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
                      Open Turn-By-Turn GPS Directions
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
                    <div className="text-emerald-400 flex justify-center"><Icon name="whatsapp" className="w-8 h-8" /></div>
                    <div className="text-xs font-bold text-white group-hover:text-emerald-400">WhatsApp Chat</div>
                    <div className="text-[10px] font-mono text-emerald-400">72250 30303</div>
                  </a>

                  {/* Phone Direct */}
                  <a 
                    href="tel:7225030303" 
                    className="p-5 rounded-2xl bg-[#091524] border border-cyan-500/30 hover:border-cyan-400 text-center space-y-2 transition-all hover:-translate-y-1 group"
                  >
                    <div className="text-cyan-400 flex justify-center"><Icon name="phone" className="w-8 h-8" /></div>
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
                    <div className="text-amber-400 flex justify-center"><Icon name="pin" className="w-8 h-8" /></div>
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
                    <div className="text-pink-400 flex justify-center"><Icon name="instagram" className="w-8 h-8" /></div>
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
                    <div className="text-blue-400 flex justify-center"><Icon name="facebook" className="w-8 h-8" /></div>
                    <div className="text-xs font-bold text-white group-hover:text-blue-400">Facebook</div>
                    <div className="text-[10px] font-mono text-blue-400">O3 Car Spa</div>
                  </a>
                </div>

              </div>
            </section>

          </div>
        )}

        
        {/* ---------------- ABOUT VIEW (EXPANDED & IN-DEPTH) ---------------- */}
        {currentView === 'about' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
            
            {/* BRAND VISION HEADER */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <img src="assets/brand/o3-logo-white.svg" alt="O3 CAR-SPA Logo" className="logo-blend h-16 w-auto mx-auto mb-2"  loading="lazy" decoding="async" />
              <span className="text-xs uppercase tracking-widest text-[#29A9E8] font-mono font-bold">WE ADD AN ATOM OF OXYGEN TO YOUR AUTOMOBILES · SINCE 2013</span>
              <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
                About <span className="text-gradient-ocean font-black">O3 Car Spa</span>
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                O3 Car Spa is changing the way people think about car care. We built a cleaning studio around one core idea — your car should feel brand new, every time you drive it. Using high-pressure cleaning machines, steam cleaners, powerful vacuums, and precise spray equipment, we treat every car like it's the only one in the shop.
              </p>
            </div>

            {/* OUR STORY: 3 CHAPTERS (merged from the old Story page) */}
            <div className="grid md:grid-cols-3 gap-8">
              
              <div className="glass-surface p-6 border border-[#cae8e8]/25 space-y-4 bg-[#0d111a] hover:border-[#29A9E8] transition-all duration-300 group">
                <div className="relative h-56 rounded-2xl overflow-hidden bg-black border border-[#cae8e8]/20">
                  <img src="assets/stills/finish-2.webp" alt="A Scorpio-N detailed at the original O3 studio" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"  loading="lazy" decoding="async" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d111a] via-transparent to-transparent opacity-80"></div>
                  <span className="absolute top-3 left-3 bg-[#05070c]/90 border border-[#cae8e8]/30 text-[#29A9E8] text-[10px] font-mono px-3 py-1 rounded-full font-bold">
                    Chapter 01 · Origin
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-extrabold text-white group-hover:text-[#29A9E8] transition-colors">How It Started</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    O3 Car Spa began with a simple frustration — most car washes rush through the job, and cars come out looking barely better than before. We wanted to build something different: a studio where every car gets time, attention, and the right products, not just a quick rinse.
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed font-mono">
                    What started as a single unit in Vallabh Vidyanagar has grown into a name car owners across Anand trust — built one careful detail at a time.
                  </p>
                </div>
              </div>

              <div className="glass-surface p-6 border border-[#cae8e8]/25 space-y-4 bg-[#0d111a] hover:border-[#29A9E8] transition-all duration-300 group">
                <div className="relative h-56 rounded-2xl overflow-hidden bg-black border border-[#cae8e8]/20">
                  <img src="assets/stills/ppf-2.webp" alt="The O3 hex-LED studio bay" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"  loading="lazy" decoding="async" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d111a] via-transparent to-transparent opacity-80"></div>
                  <span className="absolute top-3 left-3 bg-[#05070c]/90 border border-[#cae8e8]/30 text-[#29A9E8] text-[10px] font-mono px-3 py-1 rounded-full font-bold">
                    Chapter 02 · Identity
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-extrabold text-white group-hover:text-[#29A9E8] transition-colors">The Meaning Behind O3</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Ozone — O3 — adds an extra layer of protection to the air around us. That's exactly what we do for your car.
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed font-mono">
                    Every service we offer adds a real layer of care, protection and gloss that goes beyond a regular wash. We add an atom of oxygen to your car.
                  </p>
                </div>
              </div>

              <div className="glass-surface p-6 border border-[#cae8e8]/25 space-y-4 bg-[#0d111a] hover:border-[#29A9E8] transition-all duration-300 group">
                <div className="relative h-56 rounded-2xl overflow-hidden bg-black border border-[#cae8e8]/20">
                  <img src="assets/process/deliver.webp" alt="A Toyota Fortuner finished in the O3 studio today" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"  loading="lazy" decoding="async" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d111a] via-transparent to-transparent opacity-80"></div>
                  <span className="absolute top-3 left-3 bg-[#05070c]/90 border border-[#cae8e8]/30 text-[#29A9E8] text-[10px] font-mono px-3 py-1 rounded-full font-bold">
                    Chapter 03 · Excellence
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-extrabold text-white group-hover:text-[#29A9E8] transition-colors">Where We Are Today</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Today, O3 Car Spa runs a full studio with modern equipment, trained detailers, and a growing list of customers who trust us with their cars — from daily drivers to premium rides.
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed font-mono">
                    Equipped with hexagonal LED inspection lighting, infrared curing lamps, and trusted products from Germany, Italy and Japan.
                  </p>
                </div>
              </div>

            </div>

            {/* FOUNDER SPOTLIGHT CARD */}
            <div className="glass-surface p-8 sm:p-12 border border-[#cae8e8]/30 bg-gradient-to-br from-[#0a0e17] via-[#0f1726] to-[#05070c] space-y-6">
              <span className="text-xs uppercase tracking-widest text-[#29A9E8] font-mono font-bold">MEET THE FOUNDER</span>
              <div className="grid lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-4 space-y-3">
                  <img src="assets/sharanpal_sodhi_founder.webp" alt="Sharanpal Sodhi — Founder, O3 Car Spa" className="w-full h-80 object-cover rounded-3xl border border-[#cae8e8]/30 shadow-2xl"  loading="lazy" decoding="async" />
                  <div>
                    <h3 className="text-2xl font-bold text-white">Sharanpal Sodhi</h3>
                    <p className="text-xs text-[#29A9E8] font-mono">Founder, O3 Car Spa</p>
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

            {/* IN-DEPTH 13-YEAR TIMELINE */}
            <div className="glass-surface p-8 sm:p-12 border border-[#cae8e8]/30 space-y-8 bg-[#0d111a]">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-xs uppercase tracking-widest text-[#29A9E8] font-mono font-bold">HERITAGE TIMELINE</span>
                <h2 className="text-3xl font-extrabold text-white">Our 13-Year Milestone Journey</h2>
              </div>

              <div className="grid md:grid-cols-4 gap-6 text-left">
                <div className="p-5 rounded-2xl bg-[#05070c] border border-[#cae8e8]/20 space-y-2 hover:border-[#29A9E8] transition-all">
                  <span className="text-xs font-mono text-[#29A9E8] font-bold">2013 — FOUNDATION</span>
                  <h4 className="text-base font-bold text-white">First Studio Opening</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">Sharanpal Sir establishes Anand's first specialized car spa bay in GIDC, Vallabh Vidyanagar.</p>
                </div>
                <div className="p-5 rounded-2xl bg-[#05070c] border border-[#cae8e8]/20 space-y-2 hover:border-[#29A9E8] transition-all">
                  <span className="text-xs font-mono text-[#29A9E8] font-bold">2016 — INNOVATION</span>
                  <h4 className="text-base font-bold text-white">9H Silica Ceramic Pass</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">Introduces liquid silica quartz ceramic coating and infrared curing lamps to Anand.</p>
                </div>
                <div className="p-5 rounded-2xl bg-[#05070c] border border-[#cae8e8]/20 space-y-2 hover:border-[#29A9E8] transition-all">
                  <span className="text-xs font-mono text-[#29A9E8] font-bold">2020 — EXPANSION</span>
                  <h4 className="text-base font-bold text-white">O3 On Wheels Concierge</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">Launches fully equipped mobile detailing truck unit for doorstep visits.</p>
                </div>
                <div className="p-5 rounded-2xl bg-[#05070c] border border-[#cae8e8]/20 space-y-2 hover:border-[#29A9E8] transition-all">
                  <span className="text-xs font-mono text-[#29A9E8] font-bold">PRESENT — FLAGSHIP</span>
                  <h4 className="text-base font-bold text-white">Hex-LED Studio Bay</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">A hexagonal LED-lit bay where every car, from daily drivers to premium SUVs, is inspected and finished.</p>
                </div>
              </div>
            </div>

            {/* MISSION & 3 DIFFERENTIATORS */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass-surface p-8 border border-[#cae8e8]/30 space-y-4 bg-[#0d111a]">
                <span className="text-xs font-mono text-[#29A9E8] uppercase font-bold">Our Mission</span>
                <h3 className="text-2xl font-bold text-white">Honest, Thorough & Done Right</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  To give every car the kind of care it deserves — honest, thorough, and done right the first time. We treat detailing as a precision craft rather than a volume business.
                </p>
              </div>

              <div className="glass-surface p-8 border border-[#cae8e8]/30 space-y-4 bg-[#0d111a]">
                <span className="text-xs font-mono text-[#29A9E8] uppercase font-bold">What Makes Us Different</span>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-[#29A9E8] font-bold">✓</span>
                    <span><strong>No shortcuts:</strong> Every wash, every coat, every polish is done the full way — not the fast way.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#29A9E8] font-bold">✓</span>
                    <span><strong>Global-standard products:</strong> We only use brands trusted by detailers worldwide.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#29A9E8] font-bold">✓</span>
                    <span><strong>Real training:</strong> Our team isn't just taught to clean — they're taught to care.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* 4 STUDIO CORE VALUES */}
            <div className="glass-surface p-8 sm:p-12 border border-[#cae8e8]/30 space-y-8 bg-[#0d111a]">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-xs uppercase tracking-widest text-[#29A9E8] font-mono font-bold">STUDIO STANDARDS</span>
                <h2 className="text-3xl font-extrabold text-white">Our 4 Core Studio Pillars</h2>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { num: '01', title: 'Precision over Speed', desc: 'Zero rushed jobs. Multi-stage polish and proper curing time, every time.' },
                  { num: '02', title: 'Pure De-Ionized Wash', desc: 'Pure mineral-free water and high-glow foam washes eliminating micro-swirls.' },
                  { num: '03', title: '6500K Inspection', desc: 'Bright daylight LEDs reveal swirls and haze that normal light hides.' },
                  { num: '04', title: 'Lifetime Support', desc: 'Continuous ceramic maintenance support, annual check-ups, and warranties.' },
                ].map((p, pIdx) => (
                  <div key={pIdx} className="p-5 rounded-2xl bg-[#05070c] border border-[#cae8e8]/20 space-y-2 hover:border-[#29A9E8] transition-all">
                    <span className="text-xs font-mono text-[#29A9E8] font-bold">{p.num}</span>
                    <h4 className="text-base font-bold text-white">{p.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* TEAM & TOOLS */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass-surface p-6 border border-[#cae8e8]/30 space-y-4 text-center">
                <img src="assets/process/correct.webp" alt="An O3 detailer machine-polishing a Mahindra Scorpio-N" className="w-full h-64 object-cover rounded-2xl border border-[#cae8e8]/20"  loading="lazy" decoding="async" />
                <div>
                  <h3 className="text-xl font-bold text-white">Our Detailers</h3>
                  <span className="text-xs text-[#29A9E8] font-mono">Trained in-house by Sharanpal Sir</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Trained in multi-stage machine polishing, steam cleaning, coating application and PPF edge tucking.
                </p>
              </div>

              <div className="glass-surface p-6 border border-[#cae8e8]/30 space-y-4 text-center">
                <img src="assets/stills/coat-1.webp" alt="Applying graphene coating on a Maruti Brezza" className="w-full h-64 object-cover rounded-2xl border border-[#cae8e8]/20"  loading="lazy" decoding="async" />
                <div>
                  <h3 className="text-xl font-bold text-white">Tools & Products</h3>
                  <span className="text-xs text-[#29A9E8] font-mono">Trusted brands, proper machines</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Equipped with infra-red curing lamps, 6500K daylight LED lights, machine polishers and steam cleaners.
                </p>
              </div>
            </div>

            {/* BRANDS WE TRUST SECTION */}
            <div className="glass-surface p-8 sm:p-12 border border-[#cae8e8]/30 space-y-8 bg-[#0d111a]">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-xs uppercase tracking-widest text-[#29A9E8] font-mono font-bold">AUTHENTIC PRODUCTS ONLY</span>
                <h2 className="text-3xl font-extrabold text-white">Brands We Trust</h2>
                <p className="text-xs text-slate-300">Every product on your car is a trusted, industry-leading global brand.</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 text-left text-xs">
                {[
                  { name: "Meguiar's", note: "Trusted since 1901" },
                  { name: "Menzerna", note: "Polishing compounds" },
                  { name: "Paicristal Italia", note: "Masters in polishing since 1965" },
                  { name: "Kisho", note: "Japanese craftsmanship since 1965" },
                  { name: "Würth", note: "German car care compounds" },
                  { name: "Ma-Fra", note: "Cosmetics for your car" },
                  { name: "3M Car Care", note: "Keep your car looking new" },
                  { name: "Vista Car Care", note: "Surface protection" },
                  { name: "Chem-Verse Consultants", note: "ISO 9001 Certified" },
                ].map((b, bIdx) => (
                  <div key={bIdx} className="p-4 rounded-2xl bg-[#05070c] border border-[#cae8e8]/20 space-y-3 hover:border-[#29A9E8] transition-all flex flex-col justify-between group hover:-translate-y-1">
                    <BrandMark brand={b.name} />
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

            {/* 4 FEATURED CATEGORY BANNER CARDS (real studio photos) */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Exterior Care', desc: 'pH-balanced shampoos, snow foam cleaners, synthetic sealant waxes', img: 'assets/reels/foam-wash.webp', cat: 'Exterior Care' },
                { title: 'Interior Care', desc: 'Leather nourishers, dashboard UV polish, anti-bacterial sanitizers', img: 'assets/stills/interior-1.webp', cat: 'Interior Care' },
                { title: 'Coating Kits', desc: 'DIY 9H quartz ceramic, hydrophobic glass & graphene booster kits', img: 'assets/process/protect.webp', cat: 'Coating Kits' },
                { title: 'Tools & Towels', desc: 'Plush edgeless microfibers, Rupes foam pads, detailing brushes', img: 'assets/process/correct.webp', cat: 'Tools & Accessories' },
              ].map((cItem, cIdx) => (
                <div 
                  key={cIdx} 
                  onClick={() => setProductCategory(cItem.cat)}
                  className="glass-surface p-4 border border-[#cae8e8]/25 hover:border-[#29A9E8] space-y-3 cursor-pointer group transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-44 rounded-2xl overflow-hidden bg-black border border-[#cae8e8]/20">
                    <img src={cItem.img} alt={cItem.title} className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"  loading="lazy" decoding="async" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#05070c] via-transparent to-transparent opacity-80"></div>
                    <span className="absolute bottom-3 left-3 text-xs font-mono font-bold text-[#29A9E8] bg-[#05070c]/80 px-2.5 py-1 rounded-full border border-[#29A9E8]/30">
                      Explore SKU Grid →
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-[#29A9E8] transition-colors">{cItem.title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-2 mt-1">{cItem.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* PRODUCT FILTER TABS */}
            <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto pt-4 border-t border-[#cae8e8]/20">
              {[
                { id: 'all', label: 'All Products (12)' },
                { id: 'Exterior Care', label: 'Exterior Care' },
                { id: 'Interior Care', label: 'Interior Care' },
                { id: 'Coating Kits', label: 'Coating Kits' },
                { id: 'Tools & Accessories', label: 'Tools & Accessories' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setProductCategory(tab.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    productCategory === tab.id
                      ? 'bg-[#29A9E8] text-[#05070c] shadow-[0_0_20px_rgba(0, 141, 210, 0.2)] font-bold'
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
                  img: "",
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
                  img: "",
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
                  img: "",
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
                  img: "",
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
                  img: "",
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
                  img: "",
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
                  img: "",
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
                  img: "",
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
                  img: "",
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
                  img: "",
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
                  img: "",
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
                  img: "assets/process/correct.webp",
                  desc: "Authentic Italian open-cell foam polishing pads engineered for Rupes dual-action random orbital polishers.",
                  specs: "Diameter: 150mm (6 in) · Pattern: Beveled Edge · Set of 2 · Origin: Italy",
                  inStock: true
                }
              ].filter(item => productCategory === 'all' || item.category === productCategory).map((prod) => (
                <div key={prod.id} className="glass-surface p-6 border border-[#cae8e8]/25 flex flex-col justify-between space-y-4 group hover:border-[#29A9E8] transition-all">
                  
                  <div className="space-y-4">
                    <div className="relative rounded-2xl overflow-hidden bg-black border border-[#cae8e8]/20 aspect-video">
                      {prod.img
                        ? <img src={prod.img} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" />
                        : <div className="w-full h-full bg-[#0d111a] flex items-center justify-center p-8"><BrandMark brand={prod.brand} className="h-28" pad="p-5" /></div>}
                      <span className="absolute top-3 left-3 bg-[#05070c]/90 border border-[#cae8e8]/30 text-[#29A9E8] text-[10px] font-mono px-3 py-1 rounded-full font-bold">
                        {prod.brand}
                      </span>
                      <span className="absolute bottom-3 right-3 bg-[#29A9E8] text-[#05070c] font-extrabold text-xs font-mono px-3 py-1 rounded-full shadow-[0_0_15px_rgba(0, 141, 210, 0.25)]">
                        {prod.price}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-[#cae8e8] uppercase font-bold">{prod.category}</span>
                      <h3 className="text-lg font-bold text-white group-hover:text-[#29A9E8] transition-colors leading-snug">{prod.name}</h3>
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
                      <span>View Details</span>
                    </button>
                    <a 
                      href={`https://wa.me/917225030303?text=Hello%20O3%20Car-Spa!%20I%20want%20to%20order%20product:%20${encodeURIComponent(prod.name)}%20(${prod.price})`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary text-xs flex-1 justify-center py-2.5"
                    >
                      <span>Order Now</span>
                    </a>
                  </div>

                </div>
              ))}
            </div>

            {/* FEATURED GLOBAL DETAILING BRANDS SHOWCASE */}
            <div className="glass-surface p-8 sm:p-12 border border-[#cae8e8]/30 space-y-8 bg-[#0d111a]">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-xs uppercase tracking-widest text-[#29A9E8] font-mono font-bold">100% AUTHENTIC FORMULATIONS</span>
                <h2 className="text-3xl font-extrabold text-white">Global Brands We Stock</h2>
                <p className="text-xs text-slate-300">We stock the exact imported detailing brands used in our Vallabh Vidyanagar studio bay.</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 text-left text-xs">
                {[
                  { name: "Meguiar's", note: "Trusted since 1901" },
                  { name: "Menzerna", note: "Polishing compounds" },
                  { name: "Paicristal Italia", note: "Masters in polishing since 1965" },
                  { name: "Kisho", note: "Japanese craftsmanship since 1965" },
                  { name: "Würth", note: "German car care compounds" },
                  { name: "Ma-Fra", note: "Cosmetics for your car" },
                  { name: "3M Car Care", note: "Keep your car looking new" },
                  { name: "Vista Car Care", note: "Surface protection" },
                  { name: "Chem-Verse Consultants", note: "ISO 9001 Certified" },
                ].map((b, bIdx) => (
                  <div key={bIdx} className="p-4 rounded-2xl bg-[#05070c] border border-[#cae8e8]/20 space-y-3 hover:border-[#29A9E8] transition-all flex flex-col justify-between group hover:-translate-y-1">
                    <BrandMark brand={b.name} />
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
                    <span className="text-xs font-mono text-[#29A9E8] font-bold uppercase">{selectedProduct.category} · {selectedProduct.brand}</span>
                    <h2 className="text-2xl font-extrabold text-white">{selectedProduct.name}</h2>
                    <div className="gsap-counter text-3xl font-extrabold text-[#29A9E8] font-mono">{selectedProduct.price}</div>
                  </div>

                  <div className="rounded-2xl overflow-hidden border border-[#cae8e8]/20 bg-black h-56">
                    {selectedProduct.img
                      ? <img src={selectedProduct.img} alt={selectedProduct.name} className="w-full h-full object-cover" decoding="async" />
                      : <div className="w-full h-full bg-[#0d111a] flex items-center justify-center p-10"><BrandMark brand={selectedProduct.brand} className="h-32" pad="p-6" /></div>}
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
                      Instant Order via WhatsApp
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
                      ? 'bg-[#29A9E8] text-[#05070c] border-[#29A9E8] shadow-[0_0_20px_rgba(0, 141, 210, 0.2)] scale-105'
                      : 'bg-[#0d111a]/80 text-slate-300 border-[#cae8e8]/20 hover:border-[#29A9E8]/50 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* 47 EXHAUSTIVE OFFICIAL VISUAL SERVICE CARDS GRID */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#cae8e8]/20 pb-4">
                <span className="text-xs font-mono font-bold text-[#29A9E8] uppercase tracking-wider">
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
                    className="gsap-service-card glass-surface p-6 border border-[#cae8e8]/25 flex flex-col justify-between space-y-4 group bg-[#0d111a] hover:border-[#29A9E8] transition-[transform,border-color] duration-300 hover:-translate-y-1.5 cursor-pointer"
                  >
                    <div className="space-y-3">
                      {/* CARD IMAGE & BADGES */}
                      <div className="relative overflow-hidden rounded-2xl bg-black border border-[#cae8e8]/20 h-52">
                        <img 
                          src={s.img} 
                          alt={s.title} 
                          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"  
                          loading="lazy" 
                          decoding="async" 
                        />
                        
                        {/* Warranty Badge (Top Right) */}
                        <span className="absolute top-3 right-3 bg-[#05070c]/90 border border-[#cae8e8]/30 text-[#cae8e8] text-[10px] font-mono font-bold px-3 py-1 rounded-full">
                          {s.warranty}
                        </span>

                        {/* Official Tariff Price Badge (bottom right, clear of the image title) */}
                        <span className="absolute bottom-3 right-3 bg-[#05070c]/90 border border-[#29A9E8]/60 text-[#29A9E8] text-sm font-mono font-extrabold px-3.5 py-1.5 rounded-full shadow-[0_0_20px_rgba(0, 141, 210, 0.25)]">
                          {s.price}
                        </span>
                      </div>

                      {/* CATEGORY & ICON */}
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-[#29A9E8] uppercase font-bold tracking-wider">{s.category}</span>
                      </div>

                      {/* TITLE & TAGLINE */}
                      <h3 className="text-xl font-bold text-white group-hover:text-[#29A9E8] transition-colors leading-snug">{s.title}</h3>
                      <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">{s.tagline}</p>

                      {/* Price is on the image chip; full specs live in Open Details */}
                      <p className="text-[11px] text-slate-400">Lasts: <span className="text-slate-200">{s.durability}</span></p>
                    </div>

                    {/* CARD ACTIONS */}
                    <div className="pt-3 border-t border-[#cae8e8]/15 flex items-center gap-3">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setActiveServiceDetail(s); }} 
                        className="btn-secondary text-xs flex-1 justify-center py-2.5 font-bold"
                      >
                        <span>Open Details</span>
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

            {/* DOORSTEP SERVICE (merged from the old Concierge page) */}
            <div id="doorstep" className="scroll-mt-28">
            <div className="glass-surface p-8 sm:p-12 bg-gradient-to-r from-[#0d111a] via-[#101726] to-[#05070c] border border-[#cae8e8]/30">
              <div className="grid lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <span className="inline-block bg-[#cae8e8]/15 text-[#cae8e8] px-4 py-1.5 rounded-full text-xs font-mono font-bold border border-[#cae8e8]/30">
                    Sub-Brand: O3 On Wheels
                  </span>
                  <h2 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
                    Doorstep Mobile Detailing <br />
                    <span className="text-gradient-ocean">Concierge Unit.</span>
                  </h2>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    Can't make it to our studio? O3 On Wheels delivers the complete studio experience directly to your doorstep, residential garage, or office park in Anand and surrounding areas.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 text-xs text-slate-300 pt-2">
                    <div className="p-3 rounded-2xl bg-[#05070c] border border-[#cae8e8]/20">
                      <strong className="text-white block">Onboard Silent Generator</strong>
                      100% self-powered mobile detailing.
                    </div>
                    <div className="p-3 rounded-2xl bg-[#05070c] border border-[#cae8e8]/20">
                      <strong className="text-white block">Purified Water Tank</strong>
                      Zero mineral water spots on your finish.
                    </div>
                  </div>

                  <div className="flex gap-4 pt-2">
                    <button onClick={() => setIsBookingOpen(true)} className="btn-primary">
                      Book Doorstep Visit Now
                    </button>
                    <a href="tel:9033088869" className="btn-secondary">
                      Call 90330 88869
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <img src="assets/brand/o3-on-wheels.webp" alt="O3 On Wheels doorstep detailing: a freshly detailed Mahindra Scorpio-N on a customer driveway" className="w-full aspect-[16/10] object-cover rounded-3xl border border-[#cae8e8]/30"  loading="lazy" decoding="async" />
                </div>
              </div>
            </div>
            </div>

            {/* FAQ (merged from the old FAQ page) */}
            <div id="faq" className="scroll-mt-28 max-w-5xl mx-auto space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs uppercase tracking-widest text-[#cae8e8] font-bold font-mono">Knowledge Base</span>
              <h2 className="text-4xl font-extrabold text-white">Frequently Asked Questions</h2>
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
                  a: "We use trusted brands such as Würth, Menzerna, Meguiar's, 3M and Kisho. The full list is on our About page."
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
                  img: 'assets/stills/interior-1.webp',
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
                  badge: 'MOST POPULAR',
                  highlight: true,
                  img: 'assets/process/protect.webp',
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
                  img: 'assets/process/deliver.webp',
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
                  img: 'assets/gallery/35_44_services_design_extra_services_also_mentioned_18_ppf_design.webp',
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
                <div key={idx} className={`glass-surface p-5 border flex flex-col justify-between space-y-6 transition-all duration-300 hover:-translate-y-1 ${plan.highlight ? 'border-[#29A9E8] bg-[#0d1726] shadow-[0_0_30px_rgba(0, 141, 210, 0.13)]' : 'border-[#cae8e8]/25 bg-[#0d111a]'}`}>
                  
                  <div className="space-y-4">
                    <div className="relative rounded-2xl overflow-hidden h-36 bg-black border border-[#cae8e8]/20">
                      <img src={plan.img} alt={plan.name} className="w-full h-full object-cover"  loading="lazy" decoding="async" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d111a] via-transparent to-transparent opacity-90"></div>
                      <span className={`absolute top-3 left-3 text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-full border ${plan.highlight ? 'bg-[#29A9E8] text-[#05070c] border-[#29A9E8]' : 'bg-[#05070c]/80 text-[#29A9E8] border-[#29A9E8]/30'}`}>
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
                          <span className="text-[#29A9E8] font-bold text-sm leading-none">✓</span>
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
                { id: 'all', label: 'All Media (44)' },
                { id: 'videos', label: 'Videos (14)' },
                { id: 'PPF Armor', label: 'PPF Armor' },
                { id: 'Ceramic & Graphene', label: 'Ceramic & Graphene' },
                { id: 'Interior & Steam', label: 'Interior & Steam' },
                { id: 'Customer Reels', label: 'Customer Reels' },
                { id: 'Service Design Specs', label: 'Service Specs' },
                { id: 'Studio Photos', label: 'Studio Photos' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setGalleryCategory(tab.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    galleryCategory === tab.id
                      ? 'bg-[#29A9E8] text-[#05070c] shadow-[0_0_20px_rgba(0, 141, 210, 0.2)] font-bold'
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
    "src": "assets/gallery/web/13_wash_coat_ppf.mp4",
    "category": "PPF Armor",
    "badge": "PPF Prep",
    "type": "video"
  },
  {
    "id": "v2",
    "title": "BMW Studio Detailing & Polish Showcase",
    "desc": "Multi-stage compounding and mirror finish polish on BMW.",
    "src": "assets/gallery/web/26_bmw_edit.mp4",
    "category": "Ceramic & Graphene",
    "badge": "BMW Detailing",
    "type": "video"
  },
  {
    "id": "v3",
    "title": "Intensive Interior High-Pressure Steam Sanitization",
    "desc": "High-temperature steam cleaning for seats, carpets and upholstery.",
    "src": "assets/gallery/web/8_interior_steam_cleaning.mp4",
    "category": "Interior & Steam",
    "badge": "Steam Sanitization",
    "type": "video"
  },
  {
    "id": "v4",
    "title": "Mahindra Scorpio Compounding & Ceramic Pass",
    "desc": "Paint defect removal and silica quartz coating application on Scorpio.",
    "src": "assets/gallery/web/graphene_and_normal_coating_25_scorpio_polish_and_coating.mp4",
    "category": "Ceramic & Graphene",
    "badge": "Scorpio Ceramic",
    "type": "video"
  },
  {
    "id": "v5",
    "title": "Toyota Fortuner 9H Graphene Armor Application",
    "desc": "Extreme hydrophobic matrix bonding on Fortuner clear coat.",
    "src": "assets/gallery/web/graphene_and_normal_coating_27_fortuner_coating.mp4",
    "category": "Ceramic & Graphene",
    "badge": "Fortuner Graphene",
    "type": "video"
  },
  {
    "id": "v6",
    "title": "Kia Carens Multi-Stage Polish & Coating",
    "desc": "Machine polish and coating on a Kia Carens.",
    "src": "assets/gallery/web/graphene_and_normal_coating_29_kia_coating.mp4",
    "category": "Ceramic & Graphene",
    "badge": "Kia Carens Coating",
    "type": "video"
  },
  {
    "id": "v7",
    "title": "Mahindra Scorpio Graphene Matrix Coating",
    "desc": "Dual-layer graphene heat resistance and deep mirror gloss.",
    "src": "assets/gallery/web/graphene_and_normal_coating_30_scorpio_graphene_coating.mp4",
    "category": "Ceramic & Graphene",
    "badge": "Graphene Shield",
    "type": "video"
  },
  {
    "id": "v8",
    "title": "Maruti Brezza Graphene Shield Treatment",
    "desc": "Ultra-durable hydrophobic coat protecting paint against tropical UV.",
    "src": "assets/gallery/web/graphene_and_normal_coating_33_brezza_graphene_coating.mp4",
    "category": "Ceramic & Graphene",
    "badge": "Brezza Graphene",
    "type": "video"
  },
  {
    "id": "v9",
    "title": "Optical TPU Self-Healing PPF Hand Installation",
    "desc": "Squeegee pass and bubble-free optical TPU film wrap on vehicle panel.",
    "src": "assets/gallery/web/ppf_11_ppf_application.mp4",
    "category": "PPF Armor",
    "badge": "Optical TPU Pass",
    "type": "video"
  },
  {
    "id": "v10",
    "title": "Precision Edge-Tucked Paint Protection Film",
    "desc": "Corner tucking and seamless edge application of self-healing TPU.",
    "src": "assets/gallery/web/ppf_14_ppf_nice_video.mp4",
    "category": "PPF Armor",
    "badge": "Edge Tucking",
    "type": "video"
  },
  {
    "id": "v11",
    "title": "Mahindra Thar Full Body TPU PPF Armor",
    "desc": "Rugged off-road impact energy absorption film installed on Thar.",
    "src": "assets/gallery/web/ppf_28_thar_ppf.mp4",
    "category": "PPF Armor",
    "badge": "Thar PPF Armor",
    "type": "video"
  },
  {
    "id": "v12",
    "title": "Mercedes-Benz Full Body TPU PPF",
    "desc": "Self-healing TPU film hand-applied on a Mercedes-Benz.",
    "src": "assets/gallery/web/ppf_34_mercedes_ppf_very_nice.mp4",
    "category": "PPF Armor",
    "badge": "Mercedes-Benz PPF",
    "type": "video"
  },
  {
    "id": "v13",
    "title": "Client Reel: PPF Stone Chip Resistance Test",
    "desc": "Real customer video showing optical clarity and self-healing properties.",
    "src": "assets/gallery/web/ugc_12_ugc_ppf.mp4",
    "category": "Customer Reels",
    "badge": "Client Review",
    "type": "video"
  },
  {
    "id": "v14",
    "title": "High-Energy Studio Detailing Reel & Gloss Reveal",
    "desc": "Studio transformations inside the O3 detailing bay.",
    "src": "assets/gallery/web/ugc_21_high_energy_ugc.mp4",
    "category": "Customer Reels",
    "badge": "High Energy Reel",
    "type": "video"
  },
  {
    "id": "p1",
    "title": "Exterior Wash & Interior Vacuum",
    "desc": "O3 service poster: foam wash, shampoo and full interior vacuum.",
    "src": "assets/gallery/35_44_services_design_extra_services_also_mentioned_17_cute_wash_design.webp",
    "category": "Service Design Specs",
    "badge": "Service Spec",
    "type": "photo"
  },
  {
    "id": "p2",
    "title": "Paint Protection Film (PPF)",
    "desc": "O3 service poster: self-healing film that guards paint against chips and scratches.",
    "src": "assets/gallery/35_44_services_design_extra_services_also_mentioned_18_ppf_design.webp",
    "category": "Service Design Specs",
    "badge": "Service Spec",
    "type": "photo"
  },
  {
    "id": "p3",
    "title": "Graphene Coating",
    "desc": "O3 service poster: graphene coating for gloss and easy-wash protection.",
    "src": "assets/gallery/35_44_services_design_extra_services_also_mentioned_19_graphene_design.webp",
    "category": "Service Design Specs",
    "badge": "Service Spec",
    "type": "photo"
  },
  {
    "id": "p4",
    "title": "Paint Protection Film",
    "desc": "O3 service poster: full or partial PPF wraps.",
    "src": "assets/gallery/35_44_services_design_extra_services_also_mentioned_image-17244.webp",
    "category": "Service Design Specs",
    "badge": "Service Spec",
    "type": "photo"
  },
  {
    "id": "p5",
    "title": "Headlight Restoration",
    "desc": "O3 service poster: restoring yellowed, hazy headlights instead of replacing them.",
    "src": "assets/gallery/35_44_services_design_extra_services_also_mentioned_image-35242.webp",
    "category": "Service Design Specs",
    "badge": "Service Spec",
    "type": "photo"
  },
  {
    "id": "p6",
    "title": "Ceramic Coating",
    "desc": "O3 service poster: low-maintenance ceramic coating for lasting shine.",
    "src": "assets/gallery/35_44_services_design_extra_services_also_mentioned_image-35330.webp",
    "category": "Service Design Specs",
    "badge": "Service Spec",
    "type": "photo"
  },
  {
    "id": "p7",
    "title": "Windshield Coating",
    "desc": "O3 service poster: water-repellent glass coating for clearer rainy-day driving.",
    "src": "assets/gallery/35_44_services_design_extra_services_also_mentioned_image-46627.webp",
    "category": "Service Design Specs",
    "badge": "Service Spec",
    "type": "photo"
  },
  {
    "id": "p8",
    "title": "Exterior Wash + Shampoo & Vacuum",
    "desc": "O3 service poster: our standard wash package.",
    "src": "assets/gallery/35_44_services_design_extra_services_also_mentioned_image-49803.webp",
    "category": "Service Design Specs",
    "badge": "Service Spec",
    "type": "photo"
  },
  {
    "id": "p9",
    "title": "Engine Bay Coating",
    "desc": "O3 service poster: engine bay cleaned and coated, before and after.",
    "src": "assets/gallery/35_44_services_design_extra_services_also_mentioned_image-67602.webp",
    "category": "Service Design Specs",
    "badge": "Service Spec",
    "type": "photo"
  },
  {
    "id": "p10",
    "title": "Ozone Treatment & Odour Removal",
    "desc": "O3 service poster: ozone treatment that removes smoke, food and damp odours.",
    "src": "assets/gallery/35_44_services_design_extra_services_also_mentioned_image-77137.webp",
    "category": "Service Design Specs",
    "badge": "Service Spec",
    "type": "photo"
  },
  {
    "id": "p11",
    "title": "Alloy Wheel Coating",
    "desc": "O3 service poster: protective coating that keeps alloys cleaner for longer.",
    "src": "assets/gallery/35_44_services_design_extra_services_also_mentioned_image-84181.webp",
    "category": "Service Design Specs",
    "badge": "Service Spec",
    "type": "photo"
  },
  {
    "id": "p12",
    "title": "Rodent Repellent Coating",
    "desc": "O3 service poster: protection against rats chewing wires under the bonnet.",
    "src": "assets/gallery/35_44_services_design_extra_services_also_mentioned_image-88692.webp",
    "category": "Service Design Specs",
    "badge": "Service Spec",
    "type": "photo"
  },
  {
    "id": "p13",
    "title": "Leather Care Treatment",
    "desc": "O3 service poster: cleaning and conditioning leather seats.",
    "src": "assets/gallery/35_44_services_design_extra_services_also_mentioned_image-91501.webp",
    "category": "Service Design Specs",
    "badge": "Service Spec",
    "type": "photo"
  },
  {
    "id": "p14",
    "title": "Why PPF Is a Must",
    "desc": "Why paint protection film is worth it, explained.",
    "src": "assets/gallery/6__ppf_why_carousel_image-262.webp",
    "category": "Studio Photos",
    "badge": "Studio Craft",
    "type": "photo"
  },
  {
    "id": "p15",
    "title": "PPF: Long-Lasting Protection",
    "desc": "PPF keeps the showroom shine for years.",
    "src": "assets/gallery/6__ppf_why_carousel_image-29722.webp",
    "category": "Studio Photos",
    "badge": "Studio Craft",
    "type": "photo"
  },
  {
    "id": "p16",
    "title": "PPF: UV Protection",
    "desc": "PPF helps prevent paint fading from harsh sun.",
    "src": "assets/gallery/6__ppf_why_carousel_image-70233.webp",
    "category": "Studio Photos",
    "badge": "Studio Craft",
    "type": "photo"
  },
  {
    "id": "p17",
    "title": "Invest in Your Car, Not Repairs",
    "desc": "Call O3 Car-Spa: 72250 30303 | 97279 03038.",
    "src": "assets/gallery/6__ppf_why_carousel_image-76627.webp",
    "category": "Studio Photos",
    "badge": "Studio Craft",
    "type": "photo"
  },
  {
    "id": "p18",
    "title": "PPF: Scratch & Chip Resistance",
    "desc": "PPF absorbs stone chips and light scratches.",
    "src": "assets/gallery/6__ppf_why_carousel_image-94354.webp",
    "category": "Studio Photos",
    "badge": "Studio Craft",
    "type": "photo"
  },
  {
    "id": "p19",
    "title": "PPF: Hydrophobic Finish",
    "desc": "PPF repels water, dirt and grime.",
    "src": "assets/gallery/6__ppf_why_carousel_image-97038.webp",
    "category": "Studio Photos",
    "badge": "Studio Craft",
    "type": "photo"
  },
  {
    "id": "p20",
    "title": "Graphene Coating: Step by Step",
    "desc": "Deep wash, clay bar, paint correction, graphene application, curing and final inspection.",
    "src": "assets/gallery/graphene_and_normal_coating_31_graphene_coating_steps.webp",
    "category": "Ceramic & Graphene",
    "badge": "Graphene Process",
    "type": "photo"
  },
  {
    "id": "p21",
    "title": "Our Legacy",
    "desc": "From the O3 Car-Spa Instagram.",
    "src": "assets/gallery/insta_pinned_main_theme_very_nice_image-27511.webp",
    "category": "Studio Photos",
    "badge": "Studio Craft",
    "type": "photo"
  },
  {
    "id": "p22",
    "title": "Our Perfection",
    "desc": "From the O3 Car-Spa Instagram.",
    "src": "assets/gallery/insta_pinned_main_theme_very_nice_image-82021.webp",
    "category": "Studio Photos",
    "badge": "Studio Craft",
    "type": "photo"
  },
  {
    "id": "p23",
    "title": "Our Customers",
    "desc": "From the O3 Car-Spa Instagram.",
    "src": "assets/gallery/insta_pinned_main_theme_very_nice_image-86981.webp",
    "category": "Studio Photos",
    "badge": "Studio Craft",
    "type": "photo"
  },
  {
    "id": "p24",
    "title": "BMW X1 in the Studio Bay",
    "desc": "Freshly detailed BMW X1 under the hex-LED lights.",
    "src": "assets/gallery/only_images_good_ones_1.2.webp",
    "category": "Studio Photos",
    "badge": "Studio Showcase",
    "type": "photo"
  },
  {
    "id": "p25",
    "title": "BMW X1, Front View",
    "desc": "Gloss and reflections after detailing.",
    "src": "assets/gallery/only_images_good_ones_1.webp",
    "category": "Studio Photos",
    "badge": "Studio Showcase",
    "type": "photo"
  },
  {
    "id": "p26",
    "title": "Mercedes-Benz GLA",
    "desc": "Delivered outside the O3 Car-Spa studio.",
    "src": "assets/gallery/only_images_good_ones_3.1.webp",
    "category": "Studio Photos",
    "badge": "Studio Showcase",
    "type": "photo"
  },
  {
    "id": "p27",
    "title": "Mercedes-Benz GLA, Side View",
    "desc": "Finished and ready for handover.",
    "src": "assets/gallery/only_images_good_ones_3.2.webp",
    "category": "Studio Photos",
    "badge": "Studio Showcase",
    "type": "photo"
  },
  {
    "id": "p28",
    "title": "Mercedes-Benz GLA, Rear View",
    "desc": "Clean, glossy finish after detailing.",
    "src": "assets/gallery/only_images_good_ones_3.3.webp",
    "category": "Studio Photos",
    "badge": "Studio Showcase",
    "type": "photo"
  },
  {
    "id": "p29",
    "title": "Pressure Wash in Progress",
    "desc": "Pre-wash on a white saloon in the wash bay.",
    "src": "assets/gallery/only_images_good_ones_4.webp",
    "category": "Studio Photos",
    "badge": "Studio Showcase",
    "type": "photo"
  },
  {
    "id": "p30",
    "title": "Jeep Wrangler",
    "desc": "Customer Jeep Wrangler outside the O3 Car-Spa studio.",
    "src": "assets/gallery/only_images_good_ones_5.webp",
    "category": "Studio Photos",
    "badge": "Studio Showcase",
    "type": "photo"
  }
].filter(item => {
                if (galleryCategory === 'all') return true;
                if (galleryCategory === 'videos') return item.type === 'video';
                return item.category === galleryCategory;
              }).map((item) => (
                <div key={item.id} className="glass-surface p-5 border border-[#cae8e8]/25 flex flex-col justify-between space-y-4 group hover:border-[#29A9E8]/50 transition-all">
                  
                  <div className="space-y-3">
                    <div className="relative rounded-2xl overflow-hidden bg-black border border-[#cae8e8]/20 aspect-video flex items-center justify-center">
                      {item.type === 'video' ? (
                        <div 
                          onClick={() => setLightboxMedia(item)}
                          className="relative w-full h-full bg-[#0a0e17] flex flex-col items-center justify-center cursor-pointer group/vid"
                        >
                          <img src={item.src.endsWith('.mp4') ? item.src.replace('.mp4', '.webp') : item.src} 
                            alt={item.title} 
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover opacity-60 group-hover/vid:opacity-80 transition-opacity" 
                           loading="lazy" decoding="async" />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#05070c] via-transparent to-transparent"></div>
                          <div className="absolute w-12 h-12 rounded-full bg-[#29A9E8]/90 text-[#05070c] font-bold flex items-center justify-center text-lg shadow-[0_0_20px_rgba(0, 141, 210, 0.4)] group-hover/vid:scale-110 transition-transform">
                            ▶
                          </div>
                          <span className="absolute bottom-2 text-[10px] font-mono text-white bg-black/80 px-2 py-0.5 rounded-full border border-[#29A9E8]/30">
                            Click to Watch Video Reel
                          </span>
                        </div>
                      ) : (
                        <img src={item.src} 
                          alt={item.title} 
                          loading="lazy" decoding="async"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                          onClick={() => setLightboxMedia(item)}
                        />
                      )}

                      <span className="absolute top-3 left-3 bg-[#05070c]/90 border border-[#cae8e8]/30 text-[#29A9E8] text-[10px] font-mono px-3 py-1 rounded-full font-bold">
                        {item.badge}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-[#cae8e8] uppercase font-bold block">{item.category}</span>
                      <h3 className="text-lg font-bold text-white group-hover:text-[#29A9E8] transition-colors leading-snug">{item.title}</h3>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>

                  {item.type === 'photo' && (
                    <button 
                      onClick={() => setLightboxMedia(item)}
                      className="btn-secondary text-xs w-full justify-center py-2.5"
                    >
                      Enlarge Photo
                    </button>
                  )}

                </div>
              ))}
            </div>

            {/* LIGHTBOX FOR PHOTOS AND VIDEOS */}
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
                    <span className="text-xs font-mono text-[#29A9E8] font-bold">{lightboxMedia.badge}</span>
                    <h3 className="text-2xl font-bold text-white">{lightboxMedia.title}</h3>
                    <p className="text-xs text-slate-300">{lightboxMedia.desc}</p>
                  </div>

                  <div className="rounded-2xl overflow-hidden border border-[#cae8e8]/20 bg-black max-h-[75vh] flex items-center justify-center">
                    {lightboxMedia.type === 'video' ? (
                      <video src={lightboxMedia.src} poster={lightboxMedia.src.replace('.mp4', '.webp')} controls autoPlay playsInline className="max-h-[70vh] w-auto"></video>
                    ) : (
                      <img src={lightboxMedia.src} alt={lightboxMedia.title} className="max-h-[70vh] w-auto object-contain" decoding="async" />
                    )}
                  </div>
                </div>
              </div>
            )}

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
                <img src="assets/brand/o3-on-wheels.webp" alt="O3 On Wheels doorstep detailing: a freshly detailed Mahindra Scorpio-N on a customer driveway" className="w-full aspect-[16/10] object-cover rounded-2xl border border-[#cae8e8]/20"  loading="lazy" decoding="async" />
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
                <img src="assets/stills/ppf-2.webp" alt="The O3 hex-LED studio bay" className="w-full h-48 object-cover rounded-2xl border border-[#cae8e8]/20"  loading="lazy" decoding="async" />
                <div className="space-y-2">
                  <span className="text-xs font-mono text-[#cae8e8] uppercase font-bold">Model 2: Full Studio</span>
                  <h3 className="text-2xl font-bold text-white">Precision Detailing Studio</h3>
                  <div className="text-3xl font-extrabold text-white mt-2">
                    ₹ 10,00,000 <span className="text-xs text-slate-400 font-normal">Complete Turnkey Studio</span>
                  </div>
                </div>

                <ul className="space-y-3 text-xs text-slate-300">
                  <li className="flex items-center gap-2"><span className="text-[#cae8e8]">✓</span> Complete studio design & 6500K ceiling LED light rig</li>
                  <li className="flex items-center gap-2"><span className="text-[#cae8e8]">✓</span> Hex-LED ceramic application bay setup</li>
                  <li className="flex items-center gap-2"><span className="text-[#cae8e8]">✓</span> Professional machine polishers & detailing tools</li>
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
                <img src="assets/brand/o3-logo-white.svg" alt="O3 CAR-SPA Logo" className="logo-blend h-12 w-auto mb-2"  loading="lazy" decoding="async" />
                <h3 className="text-2xl font-bold text-white">O3 Car-Spa Studio</h3>
                <p className="text-xs text-[#cae8e8] font-mono">Managed by Mr. Sharanpal Sodhi</p>

                <img src="assets/gallery/only_images_good_ones_3.1.webp" alt="A customer car outside the O3 Car-Spa studio sign" className="w-full h-44 object-cover rounded-2xl border border-[#cae8e8]/20"  loading="lazy" decoding="async" />

                <div className="space-y-4 text-sm text-slate-300">
                  <div className="flex gap-3">
                    <span className="text-[#cae8e8] pt-0.5"><Icon name="pin" className="w-5 h-5" /></span>
                    <div>
                      <strong className="text-white block">Studio Address:</strong>
                      No. 444/2, Phase 4, Opp. Swiss Glass Coat, Plot VU Nagar, New Vallabh Vidyanagar, GIDC, Anand, Gujarat 388121
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <span className="text-[#cae8e8] pt-0.5"><Icon name="phone" className="w-5 h-5" /></span>
                    <div>
                      <strong className="text-white block">Direct Phone Lines:</strong>
                      <a href="tel:9033088869" className="hover:underline font-mono text-[#cae8e8]">90330 88869</a> · <a href="tel:7225030303" className="hover:underline font-mono text-[#cae8e8]">72250 30303</a>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <span className="text-[#cae8e8] pt-0.5"><Icon name="mail" className="w-5 h-5" /></span>
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
                <strong className="text-[#29A9E8] text-sm sm:text-base font-extrabold font-mono">{activeServiceDetail.price}</strong>
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
                    <span className="text-[#29A9E8] font-bold">▸</span>
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
                Instant WhatsApp Inquiry
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ================= FINAL CTA BAND ================= */}
      <section className="bg-gradient-to-r from-[#0d111a] via-[#101827] to-[#0d111a] border-t border-b border-[#cae8e8]/20 py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <img src="assets/brand/o3-logo-white.svg" alt="O3 CAR-SPA Logo" className="logo-blend h-14 w-auto mx-auto mb-2"  loading="lazy" decoding="async" />
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">Ready for Perfection?</h2>
          <p className="text-slate-[#cae8e8] max-w-xl mx-auto text-sm sm:text-base">
            Schedule a consultation with Sharanpal Sir and team at our studio, or request doorstep concierge service.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button onClick={() => setIsBookingOpen(true)} className="btn-primary">
              Book Appointment
            </button>
            <a href="tel:9033088869" className="btn-secondary">
              Call 90330 88869
            </a>
          </div>
        </div>
      </section>

      {/* ================= FOOTER (WITH SEAMLESS TRANSPARENT LOGO MARK) ================= */}
      <footer className="bg-[#040609] border-t border-[#cae8e8]/15 pt-16 pb-12 text-slate-400 text-xs relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            <div className="space-y-4">
              <img src="assets/brand/o3-logo-white.svg" alt="O3 CAR-SPA Premium Detailing Studio Official Logo" className="logo-blend h-12 w-auto"  loading="lazy" decoding="async" />
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
                {[{id:'home',l:'Home'},{id:'about',l:'About'},{id:'gallery',l:'Work'},{id:'services',l:'Services'},{id:'products',l:'Products'},{id:'plans',l:'Plans'},{id:'franchise',l:'Franchise'},{id:'contact',l:'Contact'}].map((item) => (
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
              <p className="flex gap-2"><Icon name="pin" className="w-4 h-4 shrink-0 mt-1" /><span>Plot No. 37, Zone No. D5, Opp. Bank of Baroda, GIDC, Vitthal Udyognagar, Anand, Gujarat (388121)</span></p>
              <p className="flex gap-2 items-center"><Icon name="phone" className="w-4 h-4 shrink-0" /><a href="tel:7225030303" className="hover:underline text-[#29A9E8]">72250 30303</a></p>
              <p className="flex gap-2 items-center"><Icon name="mail" className="w-4 h-4 shrink-0" /><a href="mailto:o3carspavvn@gmail.com" className="hover:underline text-[#cae8e8]">o3carspavvn@gmail.com</a></p>
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
              <img src="assets/brand/o3-logo-white.svg" alt="O3 CAR-SPA Logo" className="logo-blend h-10 w-auto mb-1"  loading="lazy" decoding="async" />
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
              <img src="assets/brand/o3-logo-white.svg" alt="O3 CAR-SPA Logo" className="logo-blend h-10 w-auto mb-1"  loading="lazy" decoding="async" />
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
              <img src="assets/brand/o3-logo-white.svg" alt="O3 CAR-SPA Logo" className="logo-blend h-8 w-auto mb-1"  loading="lazy" decoding="async" />
              <p className="text-xs text-[#cae8e8] font-mono">Official O3 Brand Tokens</p>
            </div>
            <button onClick={() => setIsDrawerOpen(false)} className="text-[#cae8e8] hover:text-[#29A9E8] font-bold">
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
                <div className="flex items-center justify-between p-2 rounded-2xl bg-[#29A9E8] text-[#05070c] font-bold">
                  <span>Oxygen Cyan</span>
                  <span>#29A9E8</span>
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
        <div className="fixed inset-0 z-[99999] bg-[#05070c]/95 flex flex-col justify-between p-6 overflow-y-auto animate-in fade-in duration-200">
          
          {/* Drawer Header */}
          <div className="flex items-center justify-between pb-6 border-b border-[#cae8e8]/20">
            <div className="flex items-center gap-3">
              <img src="assets/brand/o3-logo-white.svg" 
                alt="O3 CAR-SPA Logo" 
                className="logo-blend h-10 w-auto" 
               loading="lazy" decoding="async" />
              <div>
                <span className="text-[10px] font-mono font-bold text-[#29A9E8] uppercase block">PREMIUM STUDIO</span>
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
              { id: 'home', label: 'Home', icon: '' },
              { id: 'about', label: 'About', icon: '' },
              { id: 'gallery', label: 'Work & Media', icon: '' },
              { id: 'services', label: 'Services Menu', icon: '' },
              { id: 'products', label: 'Products Store', icon: '' },
              { id: 'plans', label: 'Plans & AMC', icon: '' },
              { id: 'franchise', label: 'Franchise', icon: '' },
              { id: 'contact', label: 'Contact Us', icon: '' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`w-full p-3.5 rounded-2xl text-left flex items-center justify-between font-bold text-sm transition-all ${
                  currentView === item.id
                    ? 'bg-gradient-to-r from-[#29A9E8] to-[#cae8e8] text-[#05070c] shadow-[0_0_20px_rgba(0, 141, 210, 0.2)]'
                    : 'bg-[#0d111a] text-slate-200 border border-[#cae8e8]/15 hover:border-[#29A9E8]/50'
                }`}
              >
                <div className="flex items-center gap-3">
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
              className="btn-primary text-xs w-full justify-center py-3.5 font-bold shadow-[0_0_20px_rgba(0, 141, 210, 0.25)]"
            >
              Book Studio Appointment Now
            </button>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <a 
                href="tel:9033088869" 
                className="p-3 rounded-2xl bg-[#091524] border border-[#29A9E8]/30 text-[#29A9E8] font-mono font-bold flex items-center justify-center gap-2"
              >
                <Icon name="phone" className="w-4 h-4" />
                <span>Call Us</span>
              </a>

              <a 
                href="https://wa.me/919033088869?text=Hello%20O3%20Car-Spa!%20I%20want%20to%20inquire%20about%20detailing."
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-2xl bg-[#0d1a14] border border-emerald-500/30 text-emerald-400 font-mono font-bold flex items-center justify-center gap-2"
              >
                <Icon name="whatsapp" className="w-4 h-4" />
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
