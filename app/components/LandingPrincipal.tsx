"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Interfaz para las características
interface Feature {
  title: string;
  desc: string;
  icon: string;
}

// Registrar plugins de GSAP
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function LandingPrincipal() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLElement>(null);
  const decorativeCirclesRef = useRef<HTMLDivElement[]>([]);
  const featuresRef = useRef<HTMLDivElement[]>([]);
  
  // Estado para controlar la hidratación
  const [isClient, setIsClient] = useState(false);

  // Asegurar scroll al inicio al montar el componente
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  // Función para agregar referencias a arrays
  const addToCirclesRef = (el: HTMLDivElement | null) => {
    if (el && !decorativeCirclesRef.current.includes(el)) {
      decorativeCirclesRef.current.push(el);
    }
  };

  const addToFeaturesRef = (el: HTMLDivElement | null) => {
    if (el && !featuresRef.current.includes(el)) {
      featuresRef.current.push(el);
    }
  };

  useEffect(() => {
    // Marcar como cliente
    setIsClient(true);

    // Asegurar que la página esté en la parte superior al cargar
    window.scrollTo(0, 0);

    // Pequeño delay para asegurar renderizado completo
    const timer = setTimeout(() => {
      // Configuración inicial - ocultar elementos
      const elementsToHide = [
        titleRef.current,
        subtitleRef.current,
        buttonRef.current,
        cardRef.current,
      ];
      gsap.set(elementsToHide, { opacity: 0, y: 30 });
      gsap.set(navbarRef.current, { opacity: 0, y: -30 });

    // Timeline principal para la animación de entrada
    const masterTimeline = gsap.timeline({ delay: 0.3 });

    // Animación del navbar
    masterTimeline.to(navbarRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
    });

    // Animación de la tarjeta principal
    masterTimeline.to(
      cardRef.current,
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power3.out",
      },
      "-=0.3"
    );

    // Animación del título
    masterTimeline.to(
      titleRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.6"
    );

    // Animación del subtítulo
    masterTimeline.to(
      subtitleRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
      },
      "-=0.5"
    );

    // Animación del botón
    masterTimeline.to(
      buttonRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      },
      "-=0.4"
    );

    // Animaciones de los círculos decorativos
    decorativeCirclesRef.current.forEach((circle, index) => {
      gsap.to(circle, {
        scale: "random(0.8, 1.2)",
        rotation: 360,
        duration: "random(8, 12)",
        repeat: -1,
        ease: "none",
        delay: index * 2,
      });
    });

    // Efecto parallax con ScrollTrigger
    gsap.to(heroRef.current, {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    // Animación de las características al hacer scroll
    featuresRef.current.forEach((feature, index) => {
      gsap.fromTo(
        feature,
        {
          opacity: 0,
          y: 50,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: feature,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
          delay: index * 0.2,
        }
      );
    });

    // Animación sutil del gradiente de fondo (más lenta y menos notoria)
    gsap.to(".animated-bg", {
      backgroundPosition: "120% center",
      duration: 30,
      repeat: -1,
      ease: "none",
    });
    }, 100); // Delay de 100ms para renderizado completo

    // Cleanup function
    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.killTweensOf("*");
    };
  }, []);

  // Función para manejar hover del botón
  const handleButtonHover = (isHovering: boolean) => {
    gsap.to(buttonRef.current, {
      scale: isHovering ? 1.1 : 1,
      rotation: isHovering ? 2 : 0,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  // Función para manejar hover de la tarjeta
  const handleCardHover = (isHovering: boolean) => {
    gsap.to(cardRef.current, {
      scale: isHovering ? 1.02 : 1,
      y: isHovering ? -5 : 0,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const features: Feature[] = [
    {
      title: "Analytics Avanzados",
      desc: "Dashboards intuitivos con métricas clave para optimizar procesos",
      icon: "📊",
    },
    {
      title: "Automatización IA",
      desc: "Flujos inteligentes que ahorran tiempo y mejoran la eficiencia",
      icon: "⚡",
    },
    {
      title: "Gestión Centralizada",
      desc: "Panel unificado para candidatos, clientes y proyectos completos",
      icon: "🎯",
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ scrollBehavior: 'auto' }}>
      {/* Fondo animado con gradiente optimizado */}
      <div
        className="fixed inset-0 animated-bg bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"
        style={{
          backgroundSize: "300% 300%",
          backgroundImage:
            "linear-gradient(-45deg, #0f172a, #1e3a8a, #1e40af, #7c3aed, #0ea5e9)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-teal-500/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-purple-900/40 to-indigo-900/60" />
      </div>

      {/* Navbar con glassmorphism */}
      <nav
        ref={navbarRef}
        className="flex justify-between items-center px-6 py-4 fixed w-full z-50 backdrop-blur-lg bg-white/10 border-b border-white/20"
      >
        <div className="text-2xl font-bold text-white">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Runakuna
          </span>
        </div>
        <button
          className="group relative px-6 py-2 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-full overflow-hidden transition-all duration-300"
          onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) =>
            gsap.to(e.target, { scale: 1.05, duration: 0.2 })
          }
          onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) =>
            gsap.to(e.target, { scale: 1, duration: 0.2 })
          }
        >
          <span className="relative z-10">Iniciar sesión</span>
          <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
      </nav>

      {/* Hero con efectos optimizados - mejor balance vertical */}
      <section
        ref={heroRef}
        className="relative flex flex-col justify-center items-center text-center h-screen px-6 pt-80"
      >
        {/* Círculos decorativos animados - posicionados mejor */}
        <div
          ref={addToCirclesRef}
          className="absolute top-32 left-20 w-32 h-32 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-xl"
        />
        <div
          ref={addToCirclesRef}
          className="absolute bottom-32 right-20 w-24 h-24 bg-gradient-to-r from-purple-400/20 to-blue-500/20 rounded-full blur-xl"
        />
        <div
          ref={addToCirclesRef}
          className="absolute top-1/2 left-10 w-16 h-16 bg-gradient-to-r from-teal-400/20 to-emerald-400/20 rounded-full blur-xl"
        />

        {/* Tarjeta principal con glassmorphism avanzado */}
        <div
          ref={cardRef}
          className="relative backdrop-blur-xl bg-white/10 p-8 md:p-12 rounded-3xl shadow-2xl max-w-4xl border border-white/20 cursor-pointer group"
          onMouseEnter={() => handleCardHover(true)}
          onMouseLeave={() => handleCardHover(false)}
        >
          {/* Bordes luminosos */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

          <div className="relative z-10">
            <h1
              ref={titleRef}
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
            >
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400 bg-clip-text text-transparent">
                Gestión de Reclutamiento
              </span>
              <br />
              <span className="text-white">Personalizable</span>
            </h1>

            <p
              ref={subtitleRef}
              className="text-lg md:text-xl mb-8 text-gray-200 leading-relaxed max-w-3xl"
            >
              Optimiza tu proceso de reclutamiento con una plataforma empresarial. 
              Gestiona candidatos, automatiza flujos y obtén insights de alto valor para tu consultora.
            </p>

            <button
              ref={buttonRef}
              className="group relative px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-lg font-semibold rounded-full overflow-hidden transition-all duration-300"
              onMouseEnter={() => handleButtonHover(true)}
              onMouseLeave={() => handleButtonHover(false)}
            >
              <span className="relative z-10 flex items-center gap-2">
                Comenzar ahora
                <svg
                  className="w-5 h-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>

          {/* Elementos decorativos internos */}
          <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full opacity-60 animate-pulse" />
          <div className="absolute bottom-4 left-4 w-6 h-6 bg-gradient-to-r from-teal-400 to-blue-400 rounded-full opacity-40 animate-pulse" />
        </div>

        {/* Indicador de scroll animado - mejor posicionado */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Sección de características */}
      <section className="relative py-20 backdrop-blur-sm bg-black/20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Potencia tu Consultora
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Herramientas profesionales diseñadas para el éxito empresarial
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((item, index) => (
              <div
                key={index}
                ref={addToFeaturesRef}
                className="backdrop-blur-lg bg-white/10 p-8 rounded-2xl border border-white/20 hover:shadow-lg hover:shadow-blue-500/25 cursor-pointer transition-all duration-300 hover:border-cyan-400/30 hover:scale-105"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-300 text-lg">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}