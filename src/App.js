import React, { useState, useEffect, useRef } from 'react';
import { 
  Zap, MapPin, Calendar, Users, Cpu, ArrowUpRight, 
  X, Globe, Shield, MessageSquare, Linkedin, Twitter, Clock, 
  ChevronRight, Code, Lightbulb, Smartphone, Instagram, Mail, Menu, Terminal, Ticket, CheckCircle
} from 'lucide-react';

const BrownRoofSummit = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);
  const [activeDay, setActiveDay] = useState(1);
  const [scrolled, setScrolled] = useState(false);
  const [bootSequence, setBootSequence] = useState(true); 
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const canvasRef = useRef(null);

  // --- 1. COUNTDOWN TIMER LOGIC ---
  const calculateTimeLeft = () => {
    const difference = +new Date("2026-04-15T09:00:00") - +new Date();
    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        D: Math.floor(difference / (1000 * 60 * 60 * 24)),
        H: Math.floor((difference / (1000 * 60 * 60)) % 24),
        M: Math.floor((difference / 1000 / 60) % 60),
        S: Math.floor((difference / 1000) % 60)
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    // Timer Loop
    const timer = setTimeout(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearTimeout(timer);
  });

  useEffect(() => {
    // Bootloader Animation
    const bootTimer = setTimeout(() => {
      setBootSequence(false);
    }, 1500);

    const handleScroll = () => setScrolled(window.scrollY > 50);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(bootTimer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // --- 4. P2P NETWORK CANVAS LOGIC ---
  useEffect(() => {
    if (bootSequence || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resize = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    // Initialize Particles
    for (let i = 0; i < (isMobile ? 30 : 60); i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        
        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 242, 255, 0.4)'; // Teal dots
        ctx.fill();
      });

      // Draw Connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(227, 100, 20, ${0.3 - dist / 400})`; // Roof colored lines
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [bootSequence, isMobile]);

  const theme = {
    bg: '#050507', 
    roof: '#E36414', 
    teal: '#00F2FF',
    card: 'rgba(20, 20, 25, 0.7)', 
    border: 'rgba(255, 255, 255, 0.1)',
    text: '#F0F0F0',
    glass: 'rgba(5, 5, 7, 0.85)',
    mono: "'Space Mono', 'Fira Code', 'Courier New', monospace" 
  };

  const brandLogos = {
    navMain: "./logo/brts.png", 
    footer: "./logo/brts.png"
  };

  const sponsors = [
    { name: "Zirkon Gadgets Planet", tier: "Platinum", logo: "https://via.placeholder.com/200x80/111111/FFFFFF?text=Oyo+State" },
    { name: "Tictify", tier: "Platinum", logo: "./logo/Tictify.png" },
    { name: "Shopy", tier: "Gold", logo: "./logo/shopy.png" },
    { name: "The Dreamers", tier: "Gold", logo: "./logo/dreamers.png" },
    { name: "OGD Delivery", tier: "Silver", logo: "./logo/odg.png" },
    { name: "Vodium", tier: "Silver", logo: "./logo/Vodium-logo.png" },
  ];

  const speakers = [
    {
      id: 1, name: "Afatakpa Onoseme Fortune, PhD, FIPMA", role: "// Leadership Facilitator",
      bio: "An expert in building localized AI models for African markets. Fortune has pioneered digital transformation strategies for several state governments.",
      experience: "PostDoctoral Research Associate (Security Democratisation and Elite Politics in the Sahel) hosted by University of Nottingham", img: "./logo/afatakpa.png"
    },
    {
      id: 2, name: "Victor Kalejaye Ayomide", role: "// Software Engineer, Business Strategist",
      bio: "Victor Kalejaye Ayomide is a Software Engineer focused on building scalable, product-driven digital systems. With experience developing immersive technology solutions at VR Fashion (RHEA), he has worked across web applications, decentralized platforms, and system-focused digital products. He specializes in software architecture and structured system design, with a strong interest in creating technology that solves real-world operational challenges. Victor is currently building Vodium, a venture focused on developing structured digital platforms for emerging markets. Passionate about practical innovation and long-term impact, he is committed to advancing both the African and global tech ecosystem.",
      experience: "CEO, Vodium_X.", img: "./logo/kj.png"
    },
    {
      id: 3, name: "Chima Kanu Favour", role: "// Branding Workshop Facilitator",
      bio: "An expert in building localized AI models for African markets. Fortune has pioneered digital transformation strategies for several state governments.",
      experience: "Creative Designer/ Director", img: "./logo/chima.png"
    },
    {
      id: 4, name: "Glorious Oluwadara", role: "// Forex Workshop Facilitator",
      bio: "Samuel focuses on IoT-driven power grids. He is currently scaling smart energy solutions across Oyo State.",
      experience: "CEO, ODG Delivery.", img: "./logo/dara.png"
    }
  ];

  const schedule = {
    day1: [
      { time: "10:00", title: "Keynote: The Future of Ibadan Tech", desc: "Opening remarks on the digital roadmap of Oyo State." },
      { time: "11:00", title: "<AI & Software Dev />", desc: "Technical workshop on scaling African SaaS products." },
      { time: "14:00", title: "Renewable Energy Panel", desc: "Discussing the power problem and tech-driven solutions." }
    ],
    day2: [
      { time: "10:00", title: "Startup Showcase [Pitch]", desc: "Local founders pitch to regional investors." },
      { time: "13:00", title: "sys.Digital_Transformation", desc: "How traditional industries are adopting tech in Ibadan." },
      { time: "16:00", title: "Closing Mixer", desc: "Networking & Award ceremony.", icon: <MessageSquare size={14}/> } 
    ]
  };

  const pricingTiers = [
    { name: "Student_Tier", price: "₦5,000", desc: "For undergraduates with valid ID.", features: ["Keynote Access", "Expo Floor", "Student Mixer"] },
    { name: "Professional", price: "₦25,000", desc: "Standard access for tech professionals.", features: ["All Sessions", "Amala Lunch", "Networking App", "Afterparty"], popular: true },
    { name: "VIP_Exec", price: "₦100,000", desc: "Premium experience for founders & investors.", features: ["Everything in Pro", "VIP Lounge", "Speaker Dinner", "Investor Matchmaking"] }
  ];

  const faqs = [
    { cmd: "fetch --venue-wifi", ans: "Yes. High-speed, unthrottled Wi-Fi is provided for all attendees via our infrastructure partners." },
    { cmd: "execute refund_policy.sh", ans: "Tickets are non-refundable but can be transferred to another user up to 48 hours before the event." },
    { cmd: "locate parking", ans: "Ample parking is available at the International Conference Centre, UI. VIP tickets include reserved spots close to the entrance." },
    { cmd: "cat dress_code.txt", ans: "Tech casual. Bring a hoodie; the halls are heavily air-conditioned to keep the hardware (and you) cool." }
  ];

  const customCSS = `
    @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
    @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
    @keyframes neonPulse { 0%, 100% { text-shadow: 0 0 15px ${theme.teal}66; } 50% { text-shadow: 0 0 25px ${theme.teal}, 0 0 10px ${theme.teal}; } }
    @keyframes roofPulse { 0%, 100% { box-shadow: 0 0 15px ${theme.roof}44; } 50% { box-shadow: 0 0 25px ${theme.roof}88; } }
    @keyframes scanline { 0% { top: -10%; opacity: 0; } 10% { opacity: 0.8; } 90% { opacity: 0.8; } 100% { top: 110%; opacity: 0; } }
    @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
    
    .cursor-blink { animation: blink 1s step-end infinite; }
    .float-icon { animation: float 4s ease-in-out infinite; }
    .neon-text { animation: neonPulse 3s infinite; }
    .btn-pulse:hover { animation: roofPulse 1.5s infinite; transform: translateY(-2px); }
    
    .scan-overlay { position: absolute; left: 0; width: 100%; height: 2px; background: linear-gradient(to right, transparent, ${theme.teal}, transparent); animation: scanline 4s linear infinite; pointer-events: none; z-index: 10; }
    .sys-boot { opacity: 0; animation: fadeInUp 0.8s ease-out forwards; }
    .sys-boot-1 { animation-delay: 0.1s; } .sys-boot-2 { animation-delay: 0.3s; }
    .sys-boot-3 { animation-delay: 0.5s; } .sys-boot-4 { animation-delay: 0.7s; }
    .glitch-card:hover { transform: translateY(-5px) scale(1.01); filter: contrast(110%); }
  `;

  const styles = {
    app: { backgroundColor: theme.bg, color: theme.text, fontFamily: "'Inter', sans-serif", minHeight: '100vh', scrollBehavior: 'smooth', overflowX: 'hidden' },
    nav: {
      display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: isMobile ? '15px 5%' : '15px 8%',
      position: 'fixed', width: '100%', top: 0, zIndex: 1000, transition: '0.4s', boxSizing: 'border-box',
      background: scrolled || mobileMenuOpen ? theme.glass : 'transparent', backdropFilter: scrolled || mobileMenuOpen ? 'blur(10px)' : 'none', borderBottom: scrolled || mobileMenuOpen ? `1px solid ${theme.border}` : 'none'
    },
    mobileMenu: { position: 'absolute', top: '100%', left: 0, width: '100%', background: theme.glass, backdropFilter: 'blur(20px)', borderBottom: `1px solid ${theme.border}`, padding: '20px 5%', display: mobileMenuOpen ? 'flex' : 'none', flexDirection: 'column', gap: '20px', boxSizing: 'border-box' },
    hero: { padding: '200px 8% 100px 8%', textAlign: 'center', position: 'relative', overflow: 'hidden', backgroundImage: `radial-gradient(circle at 50% 0%, ${theme.roof}22, transparent 50%), linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`, backgroundSize: '100% 100%, 30px 30px, 30px 30px' },
    bento: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', padding: '0 8%', maxWidth: '1300px', margin: '0 auto' },
    card: (idx) => ({ background: theme.card, border: `1px solid ${hoveredIndex === idx ? theme.roof : theme.border}`, borderRadius: '8px', padding: '30px', transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)', cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: hoveredIndex === idx ? `0 0 20px ${theme.roof}33` : 'none', position: 'relative', overflow: 'hidden' }),
    btn: { background: theme.roof, color: 'white', padding: '14px 28px', borderRadius: '4px', fontFamily: theme.mono, fontWeight: 'bold', border: '1px solid transparent', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', textDecoration: 'none', transition: 'all 0.3s', textTransform: 'uppercase', letterSpacing: '1px' },
    btnGhost: { background: 'transparent', color: theme.teal, padding: '14px 28px', borderRadius: '4px', fontFamily: theme.mono, fontWeight: 'bold', border: `1px solid ${theme.teal}`, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', textDecoration: 'none', transition: 'all 0.3s', textTransform: 'uppercase', letterSpacing: '1px' },
    modalOverlay: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(5px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' },
    footerLink: { color: 'white', opacity: 0.6, textDecoration: 'none', display: 'block', marginBottom: '10px', fontSize: '14px', fontFamily: theme.mono }
  };

  if (bootSequence) {
    return (
      <div style={{ backgroundColor: theme.bg, height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.teal, fontFamily: theme.mono, flexDirection: 'column' }}>
        <Terminal size={48} color={theme.roof} style={{ marginBottom: '20px' }} />
        <div style={{ textAlign: 'left', width: '300px' }}>
          <p>{`> INIT_SYSTEM()`}</p>
          <p>{`> LOADING_MODULES [||||||||||] 100%`}</p>
          <p>{`> MOUNTING_IBADAN.OS`}<span className="cursor-blink">_</span></p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.app}>
      <style>{customCSS}</style>

      {/* 1. NAVIGATION */}
      <nav style={styles.nav}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src={brandLogos.navMain} alt="BRTS Logo" style={{ height: '35px', width: '35px', borderRadius: '4px', objectFit: 'cover' }} />
          <div style={{ fontSize: '22px', fontWeight: '900', letterSpacing: '-1px' }}>BROWN<span style={{ color: theme.roof }}>ROOF</span></div>
        </div>
        {!isMobile && (
          <div style={{ display: 'flex', gap: '30px', alignItems: 'center', fontFamily: theme.mono, fontSize: '13px' }}>
            {['About', 'Agenda', 'Speakers', 'Pricing', 'FAQ'].map((item, idx) => (
              <a key={item} href={`#${item.toLowerCase()}`} className={`sys-boot sys-boot-${idx + 1}`} style={{ color: 'white', textDecoration: 'none', opacity: 0.7, transition: '0.3s' }} onMouseOver={(e) => {e.target.style.opacity = 1; e.target.style.color = theme.teal}} onMouseOut={(e) => {e.target.style.opacity = 0.7; e.target.style.color = 'white'}}>{'<'+item+'/>'}</a>
            ))}
            <a href="https://tictify.ng" className="sys-boot sys-boot-4 btn-pulse" style={{ ...styles.btn, padding: '8px 16px', fontSize: '12px' }}>[ Register ]</a>
          </div>
        )}
        {isMobile && (
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ background: 'none', border: 'none', color: theme.teal, cursor: 'pointer', padding: '5px' }}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        )}
        {isMobile && (
          <div style={styles.mobileMenu}>
            {['About', 'Agenda', 'Speakers', 'Pricing', 'FAQ'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)} style={{ color: theme.teal, textDecoration: 'none', fontSize: '16px', fontFamily: theme.mono }}>{`> ${item}`}</a>
            ))}
            <a href="https://tictify.ng" style={{ ...styles.btn, width: '100%', marginTop: '10px' }}>[ Register ]</a>
          </div>
        )}
      </nav>

      {/* 2. HERO */}
      <header style={styles.hero}>
        <div className="scan-overlay"></div> 
        {/* UPGRADE 4: P2P Network Canvas */}
        <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, opacity: 0.6 }} />
        
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap', marginBottom: '20px' }}>
            <div className="sys-boot sys-boot-1" style={{ background: '#000', border: `1px solid ${theme.border}`, color: theme.roof, padding: '6px 12px', borderRadius: '4px', fontSize: '12px', fontFamily: theme.mono, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Terminal size={12}/> SYSTEM.INIT<span className="cursor-blink">_</span>
            </div>
            <div className="sys-boot sys-boot-1" style={{ background: '#000', border: `1px solid ${theme.border}`, color: theme.teal, padding: '6px 12px', borderRadius: '4px', fontSize: '12px', fontFamily: theme.mono, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MapPin size={12}/> IBADAN_NG
            </div>
            <div className="sys-boot sys-boot-1" style={{ background: '#000', border: `1px solid ${theme.border}`, color: theme.text, padding: '6px 12px', borderRadius: '4px', fontSize: '12px', fontFamily: theme.mono, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Calendar size={12}/> APR 15-18, 2026
            </div>
          </div>
          
          <h1 className="sys-boot sys-boot-2" style={{ fontSize: 'clamp(40px, 8vw, 85px)', fontWeight: 900, lineHeight: 1, marginBottom: '25px', letterSpacing: '-2px' }}>
            SHAPING THE FUTURE <br/><span className="neon-text" style={{ color: theme.teal }}>OF TECHNOLOGY.</span>
          </h1>
          
          <p className="sys-boot sys-boot-3" style={{ maxWidth: '650px', margin: '0 auto 40px auto', fontSize: '1.2rem', opacity: 0.6, lineHeight: 1.6 }}>
            Join the brightest minds in software architecture, AI, and renewable engineering under the historic skyline of Ibadan.
          </p>

          {/* UPGRADE 1: Countdown Timer */}
          <div className="sys-boot sys-boot-3" style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '40px', fontFamily: theme.mono }}>
            {Object.keys(timeLeft).map((interval) => (
              <div key={interval} style={{ background: 'rgba(0,0,0,0.5)', border: `1px solid ${theme.border}`, padding: '10px 15px', borderRadius: '4px', minWidth: '60px' }}>
                <div style={{ fontSize: '24px', color: theme.teal, fontWeight: 'bold' }}>{timeLeft[interval] || "00"}</div>
                <div style={{ fontSize: '10px', color: theme.roof }}>{interval}</div>
              </div>
            ))}
          </div>
          
          <div className="sys-boot sys-boot-4" style={{display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap'}}>
            <a href="https://tictify.ng" className="btn-pulse" style={{...styles.btn, boxShadow: `0 0 15px ${theme.roof}44`}}>Get Tickets <Zap size={18} fill="currentColor"/></a>
            <a href="#agenda" style={styles.btnGhost} onMouseOver={(e) => {e.target.style.background = `${theme.teal}22`}} onMouseOut={(e) => {e.target.style.background = 'transparent'}}>View Docs</a>
          </div>
        </div>
      </header>

      {/* 3. BENTO - ABOUT SECTION */}
      <section id="about" style={{ padding: '60px 0' }}>
        <div style={styles.bento}>
          <div className="glitch-card" style={{...styles.card(1), gridColumn: isMobile ? 'span 1' : 'span 2'}} onMouseEnter={() => setHoveredIndex(1)} onMouseLeave={() => setHoveredIndex(null)}>
            <div style={{position: 'absolute', top: '10px', right: '10px', fontFamily: theme.mono, fontSize: '10px', opacity: 0.3}}>01.</div>
            <div className="float-icon"><Code size={40} color={theme.teal} /></div>
            <div style={{marginTop: '40px'}}><h2 style={{ fontSize: '32px', marginBottom: '10px' }}>{'<Software Dev/>'}</h2><p style={{ opacity: 0.5 }}>Scaling African SaaS products for the next billion users. Architecture & Code.</p></div>
          </div>
          <div className="glitch-card" style={{ ...styles.card(2), background: `linear-gradient(135deg, ${theme.roof}, #A3430A)`, border: 'none' }}>
            <div className="float-icon" style={{ display: 'flex', gap: '10px' }}><Globe size={32} color="#FFF" /> <Users size={32} color="rgba(255,255,255,0.5)" /></div>
            <div style={{marginTop: '40px'}}><h3 style={{color: '#FFF'}}>Global Networking</h3><p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>Establish handshakes with peers and mentors.</p></div>
          </div>
          <div className="glitch-card" style={styles.card(3)} onMouseEnter={() => setHoveredIndex(3)} onMouseLeave={() => setHoveredIndex(null)}>
            <div className="float-icon"><Lightbulb color={theme.teal} /></div>
            <div style={{marginTop: '40px'}}><h3>Tech Showcase</h3><p style={{ fontSize: '14px', opacity: 0.6 }}>Discover beta projects and regional hardware startups.</p></div>
          </div>
          <div className="glitch-card" style={styles.card(4)} onMouseEnter={() => setHoveredIndex(4)} onMouseLeave={() => setHoveredIndex(null)}>
            <div className="float-icon" style={{ display: 'flex', gap: '10px' }}><Cpu color={theme.roof} /> <Smartphone color={theme.roof} /></div>
            <div style={{marginTop: '40px'}}><h3>Gov.OS & Mobile</h3><p style={{ fontSize: '14px', opacity: 0.6 }}>Modernizing the digital infrastructure of Oyo State.</p></div>
          </div>
        </div>
      </section>

      {/* 4. AGENDA SECTION */}
      <section id="agenda" style={{ padding: '100px 8%', backgroundImage: `linear-gradient(${theme.border} 1px, transparent 1px), linear-gradient(90deg, ${theme.border} 1px, transparent 1px)`, backgroundSize: '40px 40px' }}>
        <h2 style={{ fontSize: '40px', marginBottom: '10px', textAlign: 'center' }}>Execution <span className="neon-text" style={{ color: theme.teal }}>Schedule</span></h2>
        <p style={{fontFamily: theme.mono, textAlign: 'center', opacity: 0.5, marginBottom: '40px'}}>{`/* TIMETABLE FOR COMPILED EVENTS */`}</p>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '40px' }}>
          <button onClick={() => setActiveDay(1)} style={{ ...styles.btnGhost, background: activeDay === 1 ? `${theme.teal}22` : 'transparent', color: activeDay === 1 ? theme.teal : 'white', borderColor: activeDay === 1 ? theme.teal : theme.border, transition: '0.3s' }}>[ Day 01 ]</button>
          <button onClick={() => setActiveDay(2)} style={{ ...styles.btnGhost, background: activeDay === 2 ? `${theme.teal}22` : 'transparent', color: activeDay === 2 ? theme.teal : 'white', borderColor: activeDay === 2 ? theme.teal : theme.border, transition: '0.3s' }}>[ Day 02 ]</button>
        </div>
        <div style={{ maxWidth: '800px', margin: '0 auto', background: '#000', border: `1px solid ${theme.border}`, borderRadius: '8px', padding: '20px', position: 'relative', overflow: 'hidden' }}>
          {(activeDay === 1 ? schedule.day1 : schedule.day2).map((item, i) => (
            <div key={i} className="sys-boot" style={{ animationDelay: `${i * 0.15}s`, display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '10px' : '30px', padding: '20px', borderBottom: `1px solid ${theme.border}`, marginBottom: '10px' }}>
              <div style={{ color: theme.teal, fontFamily: theme.mono, fontSize: '14px', minWidth: '120px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={14} className="cursor-blink" style={{animationDuration: '2s'}}/> [{item.time}]
              </div>
              <div>
                <h4 style={{ margin: '0 0 5px 0', fontSize: '18px', fontFamily: theme.mono, display: 'flex', alignItems: 'center', gap: '8px' }}>{item.title} {item.icon}</h4>
                <p style={{ margin: 0, opacity: 0.6, fontSize: '14px' }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SPEAKERS SECTION */}
      <section id="speakers" style={{ padding: '100px 8%' }}>
        <h2 style={{ fontSize: '40px', textAlign: 'center', marginBottom: '10px' }}>Root <span style={{ color: theme.roof }}>Admins</span></h2>
        <p style={{fontFamily: theme.mono, textAlign: 'center', opacity: 0.5, marginBottom: '60px'}}>{`// SPEAKERS & KEYNOTES`}</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', maxWidth: '1200px', margin: '0 auto' }}>
          {speakers.map((s) => (
            <div key={s.id} onClick={() => setSelectedSpeaker(s)} className="glitch-card" style={{ ...styles.card(s.id + 10), textAlign: 'left' }} onMouseEnter={() => setHoveredIndex(s.id + 10)} onMouseLeave={() => setHoveredIndex(null)}>
              <img src={s.img} alt={s.name} style={{ width: '80px', height: '80px', borderRadius: '4px', marginBottom: '20px', border: `1px solid ${theme.border}`, objectFit: 'cover', filter: hoveredIndex === s.id + 10 ? 'none' : 'grayscale(100%)', transition: '0.4s' }} />
              <h3 style={{ margin: 0 }}>{s.name}</h3>
              <p style={{ color: theme.teal, fontSize: '12px', fontFamily: theme.mono, marginTop: '5px' }}>{s.role}</p>
              <div style={{ marginTop: '30px', fontSize: '12px', fontFamily: theme.mono, opacity: hoveredIndex === s.id + 10 ? 1 : 0.5, color: hoveredIndex === s.id + 10 ? theme.teal : theme.text, display: 'flex', alignItems: 'center', gap: '5px', transition: '0.3s' }}>
                {`> read_bio()`} <span className={hoveredIndex === s.id + 10 ? "cursor-blink" : ""}><ChevronRight size={14}/></span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* UPGRADE 3: PRICING SECTION */}
      <section id="pricing" style={{ padding: '100px 8%', background: '#020202', borderTop: `1px solid ${theme.border}` }}>
        <h2 style={{ fontSize: '40px', textAlign: 'center', marginBottom: '10px' }}>System <span style={{ color: theme.teal }}>Access</span></h2>
        <p style={{fontFamily: theme.mono, textAlign: 'center', opacity: 0.5, marginBottom: '60px'}}>{`// CHOOSE YOUR TIER`}</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', maxWidth: '1200px', margin: '0 auto' }}>
          {pricingTiers.map((tier, idx) => (
            <div key={tier.name} className="glitch-card" style={{ background: theme.card, border: `1px solid ${tier.popular ? theme.roof : theme.border}`, borderRadius: '8px', padding: '40px 30px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
              {tier.popular && <div style={{ position: 'absolute', top: 0, right: 0, background: theme.roof, color: 'white', fontSize: '10px', fontFamily: theme.mono, padding: '5px 15px', borderBottomLeftRadius: '8px', fontWeight: 'bold' }}>POPULAR</div>}
              <div style={{ fontFamily: theme.mono, color: tier.popular ? theme.roof : theme.teal, fontSize: '14px', marginBottom: '10px' }}>{`<${tier.name} />`}</div>
              <div style={{ fontSize: '40px', fontWeight: 'bold', marginBottom: '10px' }}>{tier.price}</div>
              <p style={{ opacity: 0.6, fontSize: '14px', marginBottom: '30px', minHeight: '40px' }}>{tier.desc}</p>
              <div style={{ flexGrow: 1, marginBottom: '40px' }}>
                {tier.features.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px', fontSize: '14px', opacity: 0.8 }}>
                    <CheckCircle size={16} color={tier.popular ? theme.roof : theme.teal} /> {f}
                  </div>
                ))}
              </div>
              <a href="https://tictify.ng" style={{ ...styles.btnGhost, borderColor: tier.popular ? theme.roof : theme.border, color: tier.popular ? theme.roof : 'white', width: '100%' }} onMouseOver={(e) => {e.target.style.background = tier.popular ? `${theme.roof}22` : `${theme.teal}22`}} onMouseOut={(e) => {e.target.style.background = 'transparent'}}>
                 <Ticket size={16}/> {`[ BUY TICKET ]`}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* UPGRADE 2: COMMAND LINE FAQ */}
      <section id="faq" style={{ padding: '100px 8%' }}>
        <h2 style={{ fontSize: '40px', textAlign: 'center', marginBottom: '10px' }}>Help <span style={{ color: theme.roof }}>Docs</span></h2>
        <p style={{fontFamily: theme.mono, textAlign: 'center', opacity: 0.5, marginBottom: '60px'}}>{`// FREQUENTLY ASKED QUERIES`}</p>

        <div style={{ maxWidth: '800px', margin: '0 auto', background: '#000', border: `1px solid ${theme.border}`, borderRadius: '8px', padding: '20px', fontFamily: theme.mono }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', borderBottom: `1px solid ${theme.border}`, paddingBottom: '10px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }}></div>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }}></div>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }}></div>
          </div>
          {faqs.map((faq, idx) => (
            <div key={idx} style={{ marginBottom: '15px' }}>
              <div 
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)} 
                style={{ color: theme.teal, cursor: 'pointer', display: 'flex', gap: '10px', alignItems: 'center' }}
              >
                <span style={{ color: theme.roof }}>root@ibadan:~#</span> {faq.cmd}
              </div>
              {activeFaq === idx && (
                <div style={{ color: theme.text, opacity: 0.8, marginTop: '10px', paddingLeft: '20px', borderLeft: `2px solid ${theme.border}`, animation: 'fadeInUp 0.3s ease-out' }}>
                  {faq.ans}
                </div>
              )}
            </div>
          ))}
          <div style={{ color: theme.roof, marginTop: '20px' }}>root@ibadan:~# <span className="cursor-blink">_</span></div>
        </div>
      </section>

      {/* SPONSORS SECTION */}
      <section id="sponsors" style={{ padding: '100px 8%', background: '#020202', borderTop: `1px solid ${theme.border}` }}>
        <h2 style={{ fontSize: '40px', textAlign: 'center', marginBottom: '10px' }}>System <span style={{ color: theme.roof }}>Partners</span></h2>
        <p style={{fontFamily: theme.mono, textAlign: 'center', opacity: 0.5, marginBottom: '60px'}}>{`// INFRASTRUCTURE SUPPORTERS`}</p>
        
        <h4 style={{textAlign: 'center', color: theme.roof, fontFamily: theme.mono, fontSize: '12px', marginBottom: '30px'}}>[ TIER: PLATINUM ]</h4>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap', marginBottom: '80px' }}>
          {sponsors.filter(s => s.tier === "Platinum").map(s => (
            <div key={s.name} className="glitch-card" style={{ background: '#000', padding: '40px', borderRadius: '8px', border: `1px solid ${theme.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '250px', boxShadow: `inset 0 0 20px rgba(255,255,255,0.02)`, transition: '0.3s' }}>
              <img src={s.logo} alt={`${s.name} Logo`} style={{ maxHeight: '120px', maxWidth: '100%', objectFit: 'contain', filter: 'grayscale(100%) brightness(200%)', transition: '0.3s' }} onMouseOver={(e) => e.target.style.filter = 'none'} onMouseOut={(e) => e.target.style.filter = 'grayscale(100%) brightness(200%)'} />
            </div>
          ))}
        </div>

        <h4 style={{textAlign: 'center', opacity: 0.5, fontFamily: theme.mono, fontSize: '12px', marginBottom: '30px'}}>[ TIER: GOLD ]</h4>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap', opacity: 0.8 }}>
          {sponsors.filter(s => s.tier === "Gold").map(s => (
            <div key={s.name} className="glitch-card" style={{ background: 'transparent', padding: '20px', borderRadius: '8px', border: `1px dashed ${theme.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '180px', transition: '0.3s' }}>
               <img src={s.logo} alt={`${s.name} Logo`} style={{ maxHeight: '120px', maxWidth: '100%', objectFit: 'contain', filter: 'grayscale(100%) brightness(200%)', transition: '0.3s' }} onMouseOver={(e) => e.target.style.filter = 'none'} onMouseOut={(e) => e.target.style.filter = 'grayscale(100%) brightness(200%)'} />
            </div>
          ))}
        </div>
        <h4 style={{textAlign: 'center', opacity: 0.5, fontFamily: theme.mono, fontSize: '12px', marginBottom: '30px'}}>[ TIER: SILVER ]</h4>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap', opacity: 0.8 }}>
          {sponsors.filter(s => s.tier === "Silver").map(s => (
            <div key={s.name} className="glitch-card" style={{ background: 'transparent', padding: '20px', borderRadius: '8px', border: `1px dashed ${theme.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '180px', transition: '0.3s' }}>
               <img src={s.logo} alt={`${s.name} Logo`} style={{ maxHeight: '120px', maxWidth: '100%', objectFit: 'contain', filter: 'grayscale(100%) brightness(200%)', transition: '0.3s' }} onMouseOver={(e) => e.target.style.filter = 'none'} onMouseOut={(e) => e.target.style.filter = 'grayscale(100%) brightness(200%)'} />
            </div>
          ))}
        </div>

        <div style={{ marginTop: '100px', background: '#000', padding: isMobile ? '40px 20px' : '60px', borderRadius: '8px', textAlign: 'center', border: `1px solid ${theme.roof}`, position: 'relative', overflow: 'hidden' }}>
          <div className="float-icon"><Terminal size={30} color={theme.roof} style={{marginBottom: '20px'}}/></div>
          <h3 style={{fontSize: '24px', marginBottom: '15px'}}>Initialize Partnership</h3>
          <p style={{ opacity: 0.7, marginBottom: '30px', fontSize: '16px', fontFamily: theme.mono }}>Position your brand in front of 3,000+ engineers and founders.</p>
          <a href="mailto:partners@brownrooftech.com" style={styles.btnGhost} onMouseOver={(e) => {e.target.style.background = `${theme.teal}22`}} onMouseOut={(e) => {e.target.style.background = 'transparent'}}>[ Download Prospectus ]</a>
        </div>
      </section>

      {/* SPEAKER MODAL */}
      {selectedSpeaker && (
        <div style={styles.modalOverlay} onClick={() => setSelectedSpeaker(null)}>
          <div className="sys-boot" style={{ background: '#050507', padding: isMobile ? '30px 20px' : '40px', borderRadius: '8px', maxWidth: '500px', width: '90%', position: 'relative', border: `1px solid ${theme.teal}`, boxShadow: `0 0 30px ${theme.teal}44`, maxHeight: '90vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedSpeaker(null)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: `1px solid ${theme.border}`, color: 'white', cursor: 'pointer', padding: '8px', borderRadius: '4px', display: 'flex', transition: '0.2s' }} onMouseOver={(e) => {e.currentTarget.style.borderColor = theme.teal; e.currentTarget.style.color = theme.teal}} onMouseOut={(e) => {e.currentTarget.style.borderColor = theme.border; e.currentTarget.style.color = 'white'}}><X size={16}/></button>
            <div style={{fontFamily: theme.mono, color: theme.teal, fontSize: '12px', marginBottom: '20px'}}>{`USER_PROFILE: ${selectedSpeaker.id}`}<span className="cursor-blink">_</span></div>
            <img src={selectedSpeaker.img} alt="" style={{ width: '80px', height: '80px', borderRadius: '4px', border: `1px solid ${theme.border}`, marginBottom: '20px', objectFit: 'cover' }} />
            <h2 style={{ margin: '0 0 5px 0' }}>{selectedSpeaker.name}</h2>
            <p style={{ color: theme.teal, fontFamily: theme.mono, fontSize: '12px', margin: 0 }}>{selectedSpeaker.role}</p>
            <p style={{ opacity: 0.8, lineHeight: 1.6, margin: '25px 0' }}>{selectedSpeaker.bio}</p>
            <div style={{ background: '#000', padding: '15px', borderRadius: '4px', fontSize: '12px', border: `1px solid ${theme.border}`, fontFamily: theme.mono }}>
              <span style={{color: theme.roof}}>{`> EXP: `}</span>{selectedSpeaker.experience}
            </div>
          </div>
        </div>
      )}

      {/* MEGA FOOTER */}
      <footer style={{ background: '#000', borderTop: `1px solid ${theme.border}`, padding: '80px 8% 40px 8%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '50px', textAlign: 'left', marginBottom: '60px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <img src={brandLogos.footer} alt="BRTS Footer Logo" style={{ height: '30px', width: '30px', borderRadius: '4px', objectFit: 'cover' }} />
              <div style={{ fontSize: '20px', fontWeight: '900', letterSpacing: '-1px' }}>BROWN<span style={{ color: theme.roof }}>ROOF</span></div>
            </div>
            <p style={{ opacity: 0.5, fontSize: '14px', lineHeight: 1.6 }}>Bringing tech, code, and innovation to the heart of West Africa.</p>
          </div>
          <div>
            <h4 style={{ marginBottom: '20px', fontSize: '14px', color: theme.roof, fontFamily: theme.mono }}>{`// Quick Links`}</h4>
            <a href="#about" style={styles.footerLink}>About</a>
            <a href="#speakers" style={styles.footerLink}>Speakers</a>
            <a href="#agenda" style={styles.footerLink}>Agenda</a>
            <a href="https://tictify.ng" style={styles.footerLink}>Tickets</a>
          </div>
          <div>
            <h4 style={{ marginBottom: '20px', fontSize: '14px', color: theme.roof, fontFamily: theme.mono, display: 'flex', alignItems: 'center', gap: '8px' }}><Shield size={14}/> {`// Legal`}</h4>
            <a href="#/" style={styles.footerLink}>Privacy.txt</a>
            <a href="#/" style={styles.footerLink}>Terms.md</a>
            <a href="#/" style={styles.footerLink}>Code_of_Conduct</a>
          </div>
          <div>
            <h4 style={{ marginBottom: '20px', fontSize: '14px', color: theme.roof, fontFamily: theme.mono, display: 'flex', alignItems: 'center', gap: '8px' }}><Mail size={14}/> {`// Subscribe`}</h4>
            <div style={{ display: 'flex', gap: '5px' }}>
              <input type="email" placeholder="user@domain.com" style={{ background: '#050507', border: `1px solid ${theme.border}`, padding: '12px', borderRadius: '4px', color: 'white', width: '100%', outline: 'none', fontFamily: theme.mono, fontSize: '12px', transition: '0.3s' }} onFocus={(e) => e.target.style.borderColor = theme.teal} onBlur={(e) => e.target.style.borderColor = theme.border} />
              <button className="btn-pulse" style={{ ...styles.btn, padding: '10px 15px' }}><ChevronRight size={18} /></button>
            </div>
            <div style={{ display: 'flex', gap: '15px', marginTop: '25px' }}>
              <a href="#/" className="float-icon" style={{color: theme.teal, opacity: 0.8, animationDelay: '0s'}}><Twitter size={20} /></a>
              <a href="#/" className="float-icon" style={{color: theme.teal, opacity: 0.8, animationDelay: '0.2s'}}><Linkedin size={20} /></a>
              <a href="#/" className="float-icon" style={{color: theme.teal, opacity: 0.8, animationDelay: '0.4s'}}><Instagram size={20} /></a>
            </div>
          </div>
        </div>
        <div style={{ borderTop: `1px dashed ${theme.border}`, paddingTop: '30px', textAlign: 'center', opacity: 0.3, fontSize: '12px', fontFamily: theme.mono, display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
          <span>LOC: INT. CONFERENCE CENTRE, UI, IBADAN</span>
          <span>SYS.VER: 2026.1 &copy; BROWN ROOF TECH SUMMIT</span>
          <span style={{ opacity: 0.6 }}>
            CREATED BY:{' '}
            <a 
              href="https://olamilekan-adeyanju-ogunyade.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: theme.teal, textDecoration: 'none', transition: '0.3s' }}
              onMouseOver={(e) => { e.target.style.color = theme.roof; e.target.style.textShadow = `0 0 8px ${theme.roof}66`; }}
              onMouseOut={(e) => { e.target.style.color = theme.teal; e.target.style.textShadow = 'none'; }}
            >
              OGUNYADE OLAMILEKAN ADEYANJU
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
};

export default BrownRoofSummit;