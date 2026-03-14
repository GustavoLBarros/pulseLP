"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Instagram, ArrowRight } from 'lucide-react';
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
    { id: 1, marca: "Marca Cliente 01", img: "/images/depoimento-01.jpg" },
    { id: 2, marca: "Marca Cliente 02", img: "/images/depoimento-02.jpg" },
    { id: 3, marca: "Marca Cliente 03", img: "/images/depoimento-03.jpg" },
    { id: 4, marca: "Marca Cliente 04", img: "/images/depoimento-04.jpg" },
    { id: 5, marca: "Marca Cliente 05", img: "/images/depoimento-05.jpg" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }

    const pin = gsap.fromTo(
      sectionRef.current,
      { translateX: 0 },
      {
        translateX: "-500vw",
        ease: "none",
        duration: 1,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "2000 top",
          scrub: 0.6,
          pin: true,
          snap: 1 / (passos.length - 1),
        },
      }
    );

    let xPos = 0;
    const interval = setInterval(() => {
      xPos = xPos <= -width ? 0 : xPos - 350;
      controls.start({
        x: xPos,
        transition: { duration: 1, ease: "easeInOut" }
      });
    }, 5000);

    return () => {
      pin.kill();
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

      {/* HEADER */}
      <header className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4 md:px-12 transition-all duration-300 ${isScrolled ? 'bg-[#0C323B]/90 backdrop-blur-md py-3' : 'bg-transparent py-6'}`}>
        <div>
          <img src="/images/pulselogo.png" alt="Pulse Logo" className="h-8 md:h-8 w-auto object-contain" />
        </div>
        <nav className="hidden md:flex items-center gap-8 text-white text-xs tracking-widest">
          <a href="#inicio" className="hover:opacity-60 transition-opacity">Início</a>
          <a href="#metodo" className="hover:opacity-60 transition-opacity">Método</a>
          <a href="#depoimentos" className="hover:opacity-60 transition-opacity">Depoimentos</a>
          <a href="#sobre" className="hover:opacity-60 transition-opacity">Sobre</a>
        </nav>
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-white border border-white/30 px-5 py-2 rounded-full text-[10px] tracking-widest hover:bg-white hover:text-black transition-all">
          Contato
        </a>
      </header>

      {/* 1. HERO */}
      <section id="inicio" className="relative flex flex-col items-center justify-center min-h-screen px-6 py-20 text-center bg-[#0C323B]">
        <img 
          src="/images/bghero.png" 
          className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay"
          alt=""
        />
        <div className="relative z-10">
          <h1 className="text-4xl md:text-7xl mb-8 max-w-5xl text-[#F4EDE3]">
            Posicionamento <span className="italic">estratégico</span> transforma visitante em <span className="italic">cliente</span>.
          </h1>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="bg-[#60170E] text-[#F4EDE3] px-10 py-5 rounded-[8px] inline-flex items-center gap-3 hover:brightness-110 transition-all mb-4 text-sm tracking-widest">
            <WhatsAppOutlined style={{ fontSize: '18px' }} /> Quero ser cliente Pulse <ArrowRight size={18} />
          </a>
          <p className="text-[#F4EDE3]/50 text-xs tracking-[0.3em] font-medium block uppercase">Especialistas em posicionamento para marcas premium</p>
        </div>
      </section>

      {/* 2. SEÇÃO PREMIUM */}
      <section className="py-32 px-6 flex justify-center bg-[#F4EDE3]">
        <div className="max-w-3xl text-center">
          <span className="text-xs tracking-widest text-[#0C323B]/40 mb-4 block uppercase">Especialização</span>
          <h2 className="text-3xl md:text-5xl font-light leading-snug text-[#0C323B]">
            Não atendemos qualquer perfil. Trabalhamos exclusivamente com marcas de alto padrão que buscam o <span className="italic">cliente</span> ideal, não volume.
          </h2>
        </div>
      </section>

      {/* 3. MÉTODO PULSE (HORIZONTAL) */}
      <div id="metodo" className="overflow-hidden">
        <div ref={triggerRef}>
          <div ref={sectionRef} className="flex h-screen w-[600vw] items-center bg-[#0C323B]">
            {passos.map((item, index) => (
              <section key={index} className="h-screen w-screen flex items-center justify-center px-10 md:px-20 border-r border-[#F4EDE3]/10">
                <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <span className="text-[#F4EDE3] text-8xl font-black opacity-10 block mb-4 italic">{item.step}</span>
                    <h3 className="text-[#F4EDE3] text-3xl md:text-5xl mb-6">{item.title}</h3>
                    <p className="text-[#F4EDE3]/70 text-lg md:text-xl leading-relaxed font-light">{item.desc}</p>
                  </div>
                  <div className="aspect-video md:aspect-square bg-white/5 overflow-hidden rounded-lg">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover opacity-80" />
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>

      {/* 4. DEPOIMENTOS (CARROSSEL ARRASTE + TEMPO) */}
      <section id="depoimentos" className="py-32 bg-[#F4EDE3] border-y border-[#0C323B]/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-16">
          <span className="text-xs tracking-[0.3em] text-[#0C323B]/40 block mb-2 uppercase">Resultados</span>
          <h2 className="text-4xl text-[#0C323B]">Depoimentos</h2>
        </div>

        <motion.div ref={carouselRef} className="cursor-grab active:cursor-grabbing px-6 md:px-10">
          <motion.div 
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
            animate={controls}
            className="flex gap-6 no-scrollbar"
            style={{ width: 'max-content' }}
          >
            {depoimentos.map((item) => (
              <div key={item.id} className="min-w-[350px] md:min-w-[450px] bg-white border border-[#0C323B]/10 p-8 flex flex-col justify-between select-none">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, star) => (
                    <div key={star} className="w-3 h-3 bg-[#0C323B]"></div>
                  ))}
                </div>
                <div className="w-full aspect-video bg-[#0C323B]/5 border border-[#0C323B]/10 mb-6 overflow-hidden">
                  <img src={item.img} alt={item.marca} className="w-full h-full object-cover pointer-events-none" />
                </div>
                <div className="border-t border-[#0C323B]/5 pt-6">
                  <p className="text-sm text-[#0C323B]">{item.marca}</p>
                  <p className="text-[#0C323B]/50 text-[11px] tracking-widest mt-1 uppercase">Estratégia Pulse</p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* 5. SOBRE */}
      <section id="sobre" className="py-32 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        <div className="aspect-[4/5] w-full bg-[#0C323B]/5 border border-[#0C323B]/10 overflow-hidden">
          <img src="/images/laira-perfil.jpeg" alt="Laira" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
        </div>
        <div>
          <h2 className="text-4xl md:text-5xl mb-10 text-[#0C323B]">Quem está por trás da Pulse.</h2>
          <div className="space-y-6 text-[#0C323B]/80 text-lg leading-relaxed font-light">
            <p>Eu sou <span className="text-[#0C323B] font-semibold">Laira</span>, fundadora da Pulse Social Media.</p>
            <p>Comecei criando conteúdo de gastronomia para o Instagram. Testava enquadramentos, escrevia legendas, entendia o que fazia as pessoas pararem no scroll.</p>
            <p>A Pulse nasceu dessa clareza: não basta postar, é preciso posicionar.</p>
            <p>Hoje somos especializados em marcas premium que querem parar de competir por preço e começar a construir presença que vende naturalmente.</p>
          </div>
        </div>
      </section>

      {/* 6. CTA FINAL */}
      <section className="py-40 px-6 bg-[#0C323B] text-[#F4EDE3] text-center flex flex-col items-center">
        <h2 className="text-4xl md:text-6xl mb-6 max-w-4xl">
          Pronto para parar de perder <span className="italic">cliente </span>para Instagram de concorrente?
        </h2>
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="bg-[#60170E] text-[#F4EDE3] px-12 py-6 tracking-widest hover:brightness-110 transition-all flex items-center gap-4 rounded-[8px]">
          <WhatsAppOutlined style={{ fontSize: '24px' }} />
          Falar com a Pulse no WhatsApp
        </a>
      </section>

      {/* 7. FOOTER */}
      <footer className="py-16 px-10 border-t border-[#0C323B]/10 bg-[#F4EDE3]">
        <div className="flex flex-col md:flex-row justify-between items-end gap-10">
          <div>
            <div className="mb-2">
              <img src="/images/pulselogo.png" alt="Pulse Logo" className="h-8 w-auto object-contain brightness-0" />
            </div>
            <p className="text-xs text-[#0C323B]/40 tracking-widest">Posicionamento estratégico</p>
          </div>
          <div className="text-right space-y-2 text-xs tracking-widest text-[#0C323B]">
            <a href="https://www.instagram.com/socialmedia_pulse/" target='_blank' rel="noopener noreferrer" className="block hover:opacity-70 transition-opacity">Instagram: @socialmedia_pulse</a>
          </div>
        </div>
        <div className="mt-20 text-[10px] text-[#0C323B]/30 flex justify-between">
          <span>© 2026 Pulse Social Media</span>
          <span>Todos os direitos reservados</span>
        </div>
      </footer>
    </div>
  );
}