"use client";

import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Menu, X, Mail } from 'lucide-react';
import { WhatsAppOutlined, InstagramOutlined } from '@ant-design/icons';
import { motion, useAnimation } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function LandingPagePulse() {
  const carouselRef = useRef<HTMLDivElement>(null);

  const [isScrolled, setIsScrolled] = useState(false);
  const [width, setWidth] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const controls = useAnimation();

  const whatsappLink = "https://wa.me/5519991200074?text=Olá!%20Vim%20da%20landing%20page%20e%20quero%20entender%20como%20a%20Pulse%20pode%20me%20ajudar%20com%20posicionamento%20estratégico.";

  const marcasParceiras = [
    "/images/logo1.PNG",
    "/images/logo2.png",
    "/images/logo3.PNG",
    "/images/logo4.PNG",
  ];

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

  const nextStep = () => {
    setCurrentStep((prev) => (prev === passos.length - 1 ? 0 : prev + 1));
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev === 0 ? passos.length - 1 : prev - 1));
  };

  const goToStep = (index: number) => {
    setCurrentStep(index);
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

    let xPos = 0;
    const interval = setInterval(() => {
      xPos = xPos <= -width ? 0 : xPos - 350;
      controls.start({
        x: xPos,
        transition: { duration: 1, ease: "easeInOut" }
      });
    }, 5000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, [width, controls]);

  return (
    <div className="bg-[#F4EDE3] text-[#0C323B] font-sans selection:bg-[#0C323B] selection:text-white overflow-x-hidden">

      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        html { scroll-behavior: smooth; }
      `}} />

      {/* MENU MOBILE CORRIGIDO */}
      {menuOpen && (
        <div className="fixed inset-0 bg-[#0C323B] z-[100] flex flex-col items-center justify-center gap-10 overflow-hidden">
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-8 right-8 text-white p-2"
            aria-label="Fechar menu"
          >
            <X size={32} />
          </button>
          <nav className="flex flex-col items-center gap-8 text-white text-lg tracking-widest font-light">
            {[
              { href: '#inicio', label: 'INÍCIO' },
              { href: '#metodo-mobile', label: 'MÉTODO' },
              { href: '#depoimentos', label: 'DEPOIMENTOS' },
              { href: '#sobre', label: 'SOBRE' },
            ].map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="hover:opacity-60 transition-opacity p-2"
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
            className="bg-[#60170E] text-[#F4EDE3] px-8 py-4 rounded-[8px] inline-flex items-center gap-3 text-xs tracking-widest mt-4"
          >
            <WhatsAppOutlined style={{ fontSize: '18px' }} /> FALAR NO WHATSAPP
          </a>
        </div>
      )}

      <header className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 sm:px-6 md:px-12 transition-all duration-300 ${isScrolled ? 'bg-[#0C323B]/60 backdrop-blur-md py-3' : 'bg-transparent py-5 sm:py-6'}`}>
        <div>
          <img src="/images/pulselogo.png" alt="Pulse Logo" className="h-7 sm:h-8 w-auto object-contain" />
        </div>

        <nav className="hidden md:flex items-center gap-8 text-white text-xs tracking-widest">
          <a href="#inicio" className="hover:opacity-60 transition-opacity">Início</a>
          <a href="#metodo" className="hover:opacity-60 transition-opacity">Método</a>
          <a href="#depoimentos" className="hover:opacity-60 transition-opacity">Depoimentos</a>
          <a href="#sobre" className="hover:opacity-60 transition-opacity">Sobre</a>
        </nav>

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
            className="md:hidden text-white p-2"
            aria-label="Abrir menu"
          >
            <Menu size={28} />
          </button>
        </div>
      </header>

      <section
        id="inicio"
        className="relative flex flex-col items-center md:items-start min-h-screen px-6 sm:px-8 md:px-20 overflow-hidden z-10"
        style={{ justifyContent: 'center' }}
      >
        <img
          src="/images/bghero.png"
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ objectPosition: isMobile ? '70% center' : 'left center' }}
          alt=""
        />
        <div className="absolute inset-0 bg-black/35 z-[1]" />
        <div
          className="absolute bottom-0 left-0 w-full md:w-[55%] h-[60%] z-[2] pointer-events-none"
          style={{
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            maskImage: isMobile 
              ? 'radial-gradient(ellipse 100% 100% at 50% 100%, black 0%, transparent 80%)' 
              : 'radial-gradient(ellipse 80% 80% at 0% 100%, black 0%, transparent 70%)',
            WebkitMaskImage: isMobile 
              ? 'radial-gradient(ellipse 100% 100% at 50% 100%, black 0%, transparent 80%)' 
              : 'radial-gradient(ellipse 80% 80% at 0% 100%, black 0%, transparent 70%)',
          }}
        />
        <div className="relative z-10 w-full max-w-xs sm:max-w-xl md:max-w-3xl flex flex-col items-center md:items-start text-center md:text-left pt-20 md:pt-0" style={{ marginTop: isMobile ? '40px' : '-50px' }}>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl mb-6 sm:mb-8 text-[#F4EDE3] leading-tight">
            Posicionamento <span className="italic">estratégico</span> transforma visitante em <span className="italic">cliente</span>.
          </h1>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#60170E] text-[#F4EDE3] px-6 py-4 sm:px-10 sm:py-5 rounded-[8px] inline-flex items-center gap-2 sm:gap-3 hover:brightness-110 transition-all mb-6 text-xs sm:text-sm tracking-widest"
          >
            <WhatsAppOutlined style={{ fontSize: '16px' }} /> Quero ser cliente Pulse <ArrowRight size={15} />
          </a>
          <p className="text-[#F4EDE3]/50 text-[9px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] font-medium block uppercase">
            Especialistas em posicionamento para marcas premium
          </p>
        </div>
      </section>

      <section className="py-16 bg-[#F4EDE3] border-b border-[#0C323B]/5 relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-[11px] tracking-[0.3em] text-[#0C323B]/50 uppercase mb-12 font-bold">
            Marcas que confiam na Pulse
          </p>
          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20">
            {marcasParceiras.map((logo, index) => (
              <div 
                key={index} 
                className="flex items-center justify-center w-32 h-16 md:w-48 md:h-20"
              >
                <img
                  src={logo}
                  alt={`Logo da marca parceira ${index + 1}`}
                  className="max-w-full max-h-full object-contain grayscale opacity-70 mix-blend-multiply hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-32 px-6 flex justify-center bg-[#F4EDE3] relative z-20">
        <div className="max-w-3xl text-center">
          <span className="text-xs tracking-widest text-[#0C323B]/40 mb-4 block uppercase">Especialização</span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-light leading-snug text-[#0C323B]">
            Não atendemos qualquer perfil. <br /> Trabalhamos exclusivamente com marcas de alto padrão que buscam o <span className="italic">cliente</span> ideal, não volume.
          </h2>
        </div>
      </section>

      <div id="metodo" className="bg-[#0C323B] py-24 hidden md:block overflow-hidden">
        <div className="max-w-7xl mx-auto px-12 mb-16">
           <span className="text-xs tracking-[0.3em] text-[#F4EDE3]/40 block mb-2 uppercase">Nossa Metodologia</span>
           <h2 className="text-4xl md:text-6xl text-[#F4EDE3] font-light italic">Método Pulse</h2>
        </div>

        <div className="relative w-full max-w-7xl mx-auto px-12">
          <button 
            onClick={prevStep}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-50 bg-[#F4EDE3]/5 hover:bg-[#F4EDE3] hover:text-[#0C323B] text-[#F4EDE3] p-4 rounded-full border border-[#F4EDE3]/20 transition-all duration-300"
          >
            <ArrowLeft size={24} />
          </button>
          
          <button 
            onClick={nextStep}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-50 bg-[#F4EDE3]/5 hover:bg-[#F4EDE3] hover:text-[#0C323B] text-[#F4EDE3] p-4 rounded-full border border-[#F4EDE3]/20 transition-all duration-300"
          >
            <ArrowRight size={24} />
          </button>

          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentStep * 100}%)` }}
            >
              {passos.map((item, index) => (
                <div key={index} className="min-w-full px-16">
                  <div className="grid grid-cols-2 gap-16 items-center w-full">
                    <div>
                      <span className="text-[#F4EDE3] text-8xl font-black opacity-10 block mb-4 italic">{item.step}</span>
                      <h3 className="text-[#F4EDE3] text-3xl md:text-5xl mb-6">{item.title}</h3>
                      <p className="text-[#F4EDE3]/70 text-lg md:text-xl leading-relaxed font-light">{item.desc}</p>
                    </div>
                    <div className="aspect-square bg-white/5 overflow-hidden rounded-lg shadow-2xl">
                      <img src={item.img} alt={item.title} className="w-full h-full object-cover opacity-80" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-3 mt-12">
            {passos.map((_, index) => (
              <button
                key={index}
                onClick={() => goToStep(index)}
                className={`h-2 transition-all duration-300 rounded-full ${currentStep === index ? 'w-8 bg-[#F4EDE3]' : 'w-2 bg-[#F4EDE3]/20 hover:bg-[#F4EDE3]/40'}`}
                aria-label={`Ir para passo ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#0C323B] md:hidden py-16" id="metodo-mobile">
        <div className="px-6 mb-12">
           <h2 className="text-3xl text-[#F4EDE3] font-light italic">Método Pulse</h2>
        </div>
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

      <footer className="py-20 px-6 sm:px-10 border-t border-[#0C323B]/10 bg-[#F4EDE3] relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
            
            <div className="md:col-span-1">
              <img src="/images/pulselogo.png" alt="Pulse Logo" className="h-8 w-auto object-contain brightness-0 mb-6" />
            </div>

            <div>
              <h4 className="text-[10px] tracking-[0.2em] font-bold uppercase text-[#0C323B] mb-6">Navegação</h4>
              <nav className="flex flex-col gap-4 text-xs tracking-widest text-[#0C323B]/70">
                <a href="#inicio" className="hover:text-[#60170E] transition-colors">Início</a>
                <a href="#metodo" className="hover:text-[#60170E] transition-colors">Método Pulse</a>
                <a href="#depoimentos" className="hover:text-[#60170E] transition-colors">Resultados</a>
                <a href="#sobre" className="hover:text-[#60170E] transition-colors">Sobre</a>
              </nav>
            </div>

            <div>
              <h4 className="text-[10px] tracking-[0.2em] font-bold uppercase text-[#0C323B] mb-6">Contato</h4>
              <div className="flex flex-col gap-4 text-xs tracking-widest text-[#0C323B]/70">
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#60170E] transition-colors">
                  <WhatsAppOutlined /> WhatsApp
                </a>
                <a className="flex items-center gap-2 hover:text-[#60170E] transition-colors">
                  <Mail size={14} /> Socialmpulse@gmail.com
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-[10px] tracking-[0.2em] font-bold uppercase text-[#0C323B] mb-6">Social</h4>
              <div className="flex flex-col gap-4 text-xs tracking-widest text-[#0C323B]/70">
                <a 
                  href="https://www.instagram.com/socialmedia_pulse/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 hover:text-[#60170E] transition-colors"
                >
                  <InstagramOutlined /> @socialmedia_pulse
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-[#0C323B]/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-[9px] tracking-[0.1em] text-[#0C323B]/40 uppercase font-medium">
            <div className="flex gap-6">
              <span>© 2026 Pulse Social Media</span>
              <span className="hidden sm:inline">•</span>
              <span>Todos os direitos reservados</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}