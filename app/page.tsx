"use client";

import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { WhatsAppOutlined } from '@ant-design/icons';
import { motion, useAnimation } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function LandingPagePulse() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const [isScrolled, setIsScrolled] = useState(false);
  const [width, setWidth] = useState(0);
  const [isInMethodSection, setIsInMethodSection] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const controls = useAnimation();

  const whatsappLink = "https://wa.me/5519993775562?text=Olá!%20Vim%20da%20landing%20page%20e%20quero%20entender%20como%20a%20Pulse%20pode%20me%20ajudar%20com%20posicionamento%20estratégico.";

  const passos = [
    { step: "01", title: "DIAGNÓSTICO PROFUNDO", desc: "Analisamos seu Instagram atual, concorrência e oportunidades. Identificamos onde você está perdendo cliente.", img: "/images/metodo-01.jpg" },
    { step: "02", title: "DEFINIÇÃO DE POSICIONAMENTO", desc: "Criamos o DNA estratégico da sua marca. Documento completo que guia toda a sua comunicação.", img: "/images/metodo-02.jpg" },
    { step: "03", title: "ANÁLISE DE CONCORRÊNCIA", desc: "Mapeamos o mercado e identificamos gaps para você ocupar sem precisar competir por preço.", img: "/images/metodo-03.jpg" },
    { step: "04", title: "LINHA EDITORIAL ESTRATÉGICA", desc: "Construímos pilares de conteúdo e calendário mensal com objetivos claros de autoridade e conversão.", img: "/images/metodo-04.jpg" },
    { step: "05", title: "LIBERAÇÃO E IMPLEMENTAÇÃO", desc: "Reestruturação completa de perfil e início da execução com suporte direto via WhatsApp.", img: "/images/metodo-05.jpg" },
    { step: "06", title: "ANÁLISE DE MÉTRICAS E AJUSTES", desc: "Acompanhamento mensal e otimização contínua para construção consistente de autoridade.", img: "/images/metodo-06.jpg" },
  ];

  const depoimentos = [
    { id: 1, marca: "", img: "/images/depoimento-01.jpg" },
    { id: 2, marca: "", img: "/images/depoimento-02.jpg" },
    { id: 3, marca: "", img: "/images/depoimento-03.jpg" },
    { id: 4, marca: "", img: "/images/depoimento-04.jpg" },
    { id: 5, marca: "", img: "/images/depoimento-05.jpg" },
    { id: 6, marca: "", img: "/images/depoimento-06.png" },
    { id: 7, marca: "", img: "/images/depoimento-07.png" },
    { id: 8, marca: "", img: "/images/depoimento-08.jpg" },
  ];

  const handleSkipMethod = () => {
    const depoimentosSection = document.getElementById('depoimentos');
    if (!depoimentosSection) return;
    const targetY = depoimentosSection.getBoundingClientRect().top + window.scrollY;
    if (triggerRef.current) triggerRef.current.style.visibility = 'hidden';
    ScrollTrigger.getAll().forEach(t => t.disable(false));
    window.scrollTo({ top: targetY, behavior: 'instant' });
    setTimeout(() => {
      ScrollTrigger.getAll().forEach(t => t.enable());
      ScrollTrigger.refresh();
      if (triggerRef.current) triggerRef.current.style.visibility = 'visible';
    }, 100);
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }

    // Scroll horizontal GSAP apenas no desktop
    let pin: gsap.core.Tween | null = null;
    if (!isMobile) {
      const totalPassos = passos.length;
      pin = gsap.fromTo(
        sectionRef.current,
        { translateX: 0 },
        {
          translateX: `-${(totalPassos - 1) * 100}vw`,
          ease: "none",
          duration: 1,
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            end: () => `+=${sectionRef.current?.offsetWidth}`,
            scrub: 0.6,
            pin: true,
            invalidateOnRefresh: true,
            onEnter: () => setIsInMethodSection(true),
            onLeave: () => setIsInMethodSection(false),
            onEnterBack: () => setIsInMethodSection(true),
            onLeaveBack: () => setIsInMethodSection(false),
            onUpdate: (self) => {
              if (self.progress > 0 && self.progress < 1) {
                setIsInMethodSection(true);
              } else {
                setIsInMethodSection(false);
              }
            },
          },
        }
      );
    }

    let xPos = 0;
    const interval = setInterval(() => {
      xPos = xPos <= -width ? 0 : xPos - 350;
      controls.start({
        x: xPos,
        transition: { duration: 1, ease: "easeInOut" }
      });
    }, 5000);

    return () => {
      pin?.kill();
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, [width, controls, passos.length, isMobile]);

  return (
    <div className="bg-[#F4EDE3] text-[#0C323B] font-sans selection:bg-[#0C323B] selection:text-white overflow-x-hidden">

      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        html { scroll-behavior: smooth; }
      `}} />

      {/* Botão pular seção — apenas desktop */}
      {isInMethodSection && !isMobile && (
        <button
          onClick={handleSkipMethod}
          className="fixed bottom-8 right-8 z-[100] flex items-center gap-2 bg-[#F4EDE3] text-[#0C323B] px-5 py-3 rounded-full text-[10px] tracking-widest font-semibold shadow-xl hover:bg-white hover:scale-105 transition-all duration-200 border border-[#0C323B]/10"
        >
          Pular seção <ArrowRight size={12} />
        </button>
      )}

      {/* Menu mobile overlay */}
      {menuOpen && (
        <div className="fixed inset-0 bg-[#0C323B] z-[60] flex flex-col items-center justify-center gap-10">
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-5 right-5 text-white"
            aria-label="Fechar menu"
          >
            <X size={28} />
          </button>
          <nav className="flex flex-col items-center gap-8 text-white text-sm tracking-widest">
            {[
              { href: '#inicio', label: 'Início' },
              { href: '#metodo', label: 'Método' },
              { href: '#depoimentos', label: 'Depoimentos' },
              { href: '#sobre', label: 'Sobre' },
            ].map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="hover:opacity-60 transition-opacity"
              >
                {label}
              </a>
            ))}
          </nav>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="bg-[#60170E] text-[#F4EDE3] px-8 py-4 rounded-[8px] inline-flex items-center gap-3 text-xs tracking-widest"
          >
            <WhatsAppOutlined style={{ fontSize: '16px' }} /> Falar no WhatsApp
          </a>
        </div>
      )}

      {/* HEADER */}
      <header className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 sm:px-6 md:px-12 transition-all duration-300 ${isScrolled ? 'bg-[#0C323B]/60 backdrop-blur-md py-3' : 'bg-transparent py-5 sm:py-6'}`}>
        <div>
          <img src="/images/pulselogo.png" alt="Pulse Logo" className="h-7 sm:h-8 w-auto object-contain" />
        </div>

        {/* Nav desktop */}
        <nav className="hidden md:flex items-center gap-8 text-white text-xs tracking-widest">
          <a href="#inicio" className="hover:opacity-60 transition-opacity">Início</a>
          <a href="#metodo" className="hover:opacity-60 transition-opacity">Método</a>
          <a href="#depoimentos" className="hover:opacity-60 transition-opacity">Depoimentos</a>
          <a href="#sobre" className="hover:opacity-60 transition-opacity">Sobre</a>
        </nav>

        {/* Direita: botão contato desktop + hamburguer mobile */}
        <div className="flex items-center gap-3">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex text-white border border-white/30 px-5 py-2 rounded-[4px] text-[10px] tracking-widest hover:bg-white hover:text-black transition-all"
          >
            Contato
          </a>
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden text-white p-1"
            aria-label="Abrir menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* 1. HERO */}
      <section
        id="inicio"
        className="relative flex flex-col items-start min-h-screen px-6 sm:px-8 md:px-20 overflow-hidden z-10"
        style={{ justifyContent: 'center' }}
      >
        <img
          src="/images/bghero.png"
          className="absolute inset-0 w-full h-full object-cover z-0"
          alt=""
        />
        <div className="absolute inset-0 bg-black/35 z-[1]" />
        <div
          className="absolute bottom-0 left-0 w-[55%] h-[60%] z-[2] pointer-events-none"
          style={{
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            maskImage: 'radial-gradient(ellipse 80% 80% at 0% 100%, black 0%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 0% 100%, black 0%, transparent 70%)',
          }}
        />
        <div className="relative z-10 w-full max-w-xs sm:max-w-xl md:max-w-3xl" style={{ marginTop: '-50px' }}>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl mb-6 sm:mb-8 text-[#F4EDE3] text-left leading-tight">
            Posicionamento <span className="italic">estratégico</span> transforma visitante em <span className="italic">cliente</span>.
          </h1>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#60170E] text-[#F4EDE3] px-6 py-4 sm:px-10 sm:py-5 rounded-[8px] inline-flex items-center gap-2 sm:gap-3 hover:brightness-110 transition-all mb-4 text-xs sm:text-sm tracking-widest"
          >
            <WhatsAppOutlined style={{ fontSize: '16px' }} /> Quero ser cliente Pulse <ArrowRight size={15} />
          </a>
          <p className="text-[#F4EDE3]/50 text-[9px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] font-medium block uppercase">
            Especialistas em posicionamento para marcas premium
          </p>
        </div>
      </section>

      {/* 2. SEÇÃO PREMIUM */}
      <section className="py-20 sm:py-32 px-6 flex justify-center bg-[#F4EDE3] relative z-20">
        <div className="max-w-3xl text-center">
          <span className="text-xs tracking-widest text-[#0C323B]/40 mb-4 block uppercase">Especialização</span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-light leading-snug text-[#0C323B]">
            Não atendemos qualquer perfil. Trabalhamos exclusivamente com marcas de alto padrão que buscam o <span className="italic">cliente</span> ideal, não volume.
          </h2>
        </div>
      </section>

      {/* 3. MÉTODO PULSE — Desktop: scroll horizontal pinado */}
      <div id="metodo" ref={triggerRef} className="relative overflow-hidden bg-[#0C323B] hidden md:block">
        <div ref={sectionRef} className="flex h-screen w-[600vw] items-center">
          {passos.map((item, index) => (
            <section
              key={index}
              className="h-screen w-screen flex items-center justify-center px-10 md:px-20 border-r border-[#F4EDE3]/10"
            >
              <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <span className="text-[#F4EDE3] text-8xl font-black opacity-10 block mb-4 italic">{item.step}</span>
                  <h3 className="text-[#F4EDE3] text-3xl md:text-5xl mb-6">{item.title}</h3>
                  <p className="text-[#F4EDE3]/70 text-lg md:text-xl leading-relaxed font-light">{item.desc}</p>
                </div>
                <div className="aspect-square bg-white/5 overflow-hidden rounded-lg">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover opacity-80" />
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* 3. MÉTODO PULSE — Mobile/Tablet: cards verticais */}
      <div className="bg-[#0C323B] md:hidden" id="metodo-mobile">
        {passos.map((item, index) => (
          <div key={index} className="px-6 py-14 sm:py-16 border-b border-[#F4EDE3]/10">
            <span className="text-[#F4EDE3] text-6xl sm:text-7xl font-black opacity-10 block mb-2 italic">{item.step}</span>
            <h3 className="text-[#F4EDE3] text-2xl sm:text-3xl mb-4">{item.title}</h3>
            <p className="text-[#F4EDE3]/70 text-base sm:text-lg leading-relaxed font-light mb-8">{item.desc}</p>
            <div className="aspect-video w-full bg-white/5 overflow-hidden rounded-lg">
              <img src={item.img} alt={item.title} className="w-full h-full object-cover opacity-80" />
            </div>
          </div>
        ))}
      </div>

      {/* 4. DEPOIMENTOS */}
      <section id="depoimentos" className="py-20 sm:py-32 bg-[#F4EDE3] border-y border-[#0C323B]/10 overflow-hidden relative z-20">
        <div className="max-w-7xl mx-auto px-6 mb-10 sm:mb-16">
          <span className="text-xs tracking-[0.3em] text-[#0C323B]/40 block mb-2 uppercase">Resultados</span>
          <h2 className="text-3xl sm:text-4xl text-[#0C323B]">Depoimentos</h2>
        </div>

        <motion.div ref={carouselRef} className="cursor-grab active:cursor-grabbing px-4 sm:px-6 md:px-10">
          <motion.div
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
            animate={controls}
            className="flex gap-4 sm:gap-6 no-scrollbar"
            style={{ width: 'max-content' }}
          >
            {depoimentos.map((item) => (
              <div
                key={item.id}
                className="min-w-[240px] sm:min-w-[350px] md:min-w-[450px] bg-white/80 border border-[#0C323B]/10 flex items-center justify-center select-none p-3 sm:p-4 rounded-[8px]"
              >
                <img
                  src={item.img}
                  alt={item.marca}
                  className="max-w-full max-h-52 sm:max-h-72 object-contain pointer-events-none rounded-[4px]"
                />
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* 5. SOBRE */}
      <section id="sobre" className="py-20 sm:py-32 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center relative z-20">
        <div className="aspect-[4/5] w-full max-w-sm mx-auto md:max-w-none bg-[#0C323B]/5 border border-[#0C323B]/10 overflow-hidden">
          <img src="/images/laira-perfil.jpeg" alt="Laira" className="w-full h-full object-cover" />
        </div>
        <div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-8 sm:mb-10 text-[#0C323B]">Quem está por trás da Pulse.</h2>
          <div className="space-y-5 sm:space-y-6 text-[#0C323B]/80 text-base sm:text-lg leading-relaxed font-light">
            <p>Eu sou <span className="text-[#0C323B] font-semibold">Laira</span>, fundadora da Pulse Social Media.</p>
            <p>Comecei criando conteúdo de gastronomia para o Instagram. Testava enquadramentos, escrevia legendas, entendia o que fazia as pessoas pararem no scroll.</p>
            <p>A Pulse nasceu dessa clareza: não basta postar, é preciso posicionar.</p>
            <p>Hoje somos especializados em marcas premium que querem parar de competir por preço e começar a construir presença que vende naturalmente.</p>
          </div>
        </div>
      </section>

      {/* 6. CTA FINAL */}
      <section className="py-24 sm:py-40 px-6 bg-[#0C323B] text-[#F4EDE3] text-center flex flex-col items-center relative z-20">
        <h2 className="text-3xl sm:text-4xl md:text-6xl mb-6 max-w-4xl leading-tight">
          Pronto para parar de perder <span className="italic">cliente </span>para Instagram de concorrente?
        </h2>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#60170E] text-[#F4EDE3] px-8 py-5 sm:px-12 sm:py-6 tracking-widest hover:brightness-110 transition-all flex items-center gap-3 sm:gap-4 rounded-[8px] text-sm sm:text-base"
        >
          <WhatsAppOutlined style={{ fontSize: '20px' }} />
          Falar com a Pulse no WhatsApp
        </a>
      </section>

      {/* 7. FOOTER */}
      <footer className="py-12 sm:py-16 px-6 sm:px-10 border-t border-[#0C323B]/10 bg-[#F4EDE3] relative z-20">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-8 sm:gap-10">
          <div>
            <img src="/images/pulselogo.png" alt="Pulse Logo" className="h-7 sm:h-8 w-auto object-contain brightness-0" />
          </div>
          <div className="text-left sm:text-right space-y-2 text-xs tracking-widest text-[#0C323B]">
            <a href="https://www.instagram.com/socialmedia_pulse/" target="_blank" rel="noopener noreferrer" className="block hover:opacity-70 transition-opacity">
              Instagram: @socialmedia_pulse
            </a>
          </div>
        </div>
        <div className="mt-12 sm:mt-20 text-[10px] text-[#0C323B]/30 flex flex-col sm:flex-row justify-between gap-2">
          <span>© 2026 Pulse Social Media</span>
          <span>Todos os direitos reservados</span>
        </div>
      </footer>
    </div>
  );
}