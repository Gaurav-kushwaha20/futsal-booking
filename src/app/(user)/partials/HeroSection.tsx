"use client"
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const FutsalHeroSection: React.FC = () => {
   const heroRef = useRef<HTMLDivElement | null>(null);
   const titleRef = useRef<HTMLDivElement | null>(null);
   const subtitleRef = useRef<HTMLDivElement | null>(null);
   const ctaRef = useRef<HTMLDivElement | null>(null);
   const statsRef = useRef<HTMLDivElement | null>(null);
   const floatingElementsRef = useRef<HTMLDivElement[]>([]);

   const addToFloatingRefs = (el: HTMLDivElement | null) => {
      if (el && !floatingElementsRef.current.includes(el)) {
         floatingElementsRef.current.push(el);
      }
   };

   useEffect(() => {
      const tl = gsap.timeline();

      // Hero background animation
      if (heroRef.current) {
         tl.fromTo(
            heroRef.current,
            { opacity: 0, scale: 1.1 },
            { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }
         );
      }

      // Title animation
      if (titleRef.current) {
         tl.fromTo(
            titleRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
            "<0.2" // start 0.2s after previous
         );
      }

      // Subtitle animation
      if (subtitleRef.current) {
         tl.fromTo(
            subtitleRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
            "<0.2"
         );
      }

      // CTA animation
      if (ctaRef.current) {
         tl.fromTo(
            ctaRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
            "<0.2"
         );
      }

      // Stats animation
      if (statsRef.current) {
         tl.fromTo(
            statsRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
            "<0.2"
         );
      }

      // Floating elements animation (staggered)
      floatingElementsRef.current.forEach((el, index) => {
         if (!el) return;
         gsap.fromTo(
            el,
            { y: 0, opacity: 0, scale: 0.7 },
            { y: 20, opacity: 1, scale: 1, duration: 1.5, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: index * 0.3 }
         )
      })

      tl.fromTo(
         floatingElementsRef.current,
         { opacity: 0, y: 30, scale: 0.8 },
         {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            repeat: -1,
            ease: "bounce",
         },
         "<0.2"
      );

   }, []);

   return (
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-primary-900 to-emerald-900">
         {/* Hero background */}
         <div ref={heroRef} className="absolute inset-0 opacity-20" />

         {/* Floating elements */}
         <div className="absolute inset-0 pointer-events-none">
            <div
               ref={addToFloatingRefs}
               className="absolute top-20 left-10 w-16 h-16 bg-emerald-400/20 rounded-full blur-xl"
            />
            <div
               ref={addToFloatingRefs}
               className="absolute top-40 right-20 w-24 h-24 bg-blue-400/20 rounded-full blur-xl"
            />
            <div
               ref={addToFloatingRefs}
               className="absolute bottom-40 left-20 w-20 h-20 bg-purple-400/20 rounded-full blur-xl"
            />
            <div
               ref={addToFloatingRefs}
               className="absolute bottom-20 right-10 w-12 h-12 bg-yellow-400/20 rounded-full blur-xl"
            />
         </div>

         {/* Main content */}
         <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto text-center">
               <h1
                  ref={titleRef}
                  className="text-4xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight"
               >
                  Book Your Perfect Futsal Court
               </h1>

               <p
                  ref={subtitleRef}
                  className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
               >
                  Experience premium futsal facilities with instant booking, real-time
                  availability, and seamless payment processing
               </p>

               <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                  <button className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-600 text-white rounded-full shadow-2xl hover:scale-105 transition-all duration-300">
                     Book Now
                  </button>
               </div>

               <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
                  <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                     <h3 className="text-2xl font-bold text-white mb-2">150+</h3>
                     <p className="text-gray-300">Premium Courts</p>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                     <h3 className="text-2xl font-bold text-white mb-2">50K+</h3>
                     <p className="text-gray-300">Happy Players</p>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                     <h3 className="text-2xl font-bold text-white mb-2">4.9/5</h3>
                     <p className="text-gray-300">Average Rating</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default FutsalHeroSection;
