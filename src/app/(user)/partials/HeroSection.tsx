import React, { useEffect, useRef } from 'react';
import { Calendar, MapPin, Clock, Users, Star, ChevronRight } from 'lucide-react';

const FutsalHeroSection = () => {
   const heroRef = useRef(null);
   const titleRef = useRef(null);
   const subtitleRef = useRef(null);
   const ctaRef = useRef(null);
   const statsRef = useRef(null);
   const floatingElementsRef = useRef([]);

   useEffect(() => {
      // GSAP-style animations using CSS animations and transitions
      const animateElements = () => {
         // Hero background animation
         if (heroRef.current) {
            heroRef.current.style.opacity = '0';
            heroRef.current.style.transform = 'scale(1.1)';
            heroRef.current.style.transition = 'all 1s ease-out';

            setTimeout(() => {
               heroRef.current.style.opacity = '1';
               heroRef.current.style.transform = 'scale(1)';
            }, 100);
         }

         // Title animation
         if (titleRef.current) {
            titleRef.current.style.opacity = '0';
            titleRef.current.style.transform = 'translateY(30px)';
            titleRef.current.style.transition = 'all 0.8s ease-out';

            setTimeout(() => {
               titleRef.current.style.opacity = '1';
               titleRef.current.style.transform = 'translateY(0)';
            }, 300);
         }

         // Subtitle animation
         if (subtitleRef.current) {
            subtitleRef.current.style.opacity = '0';
            subtitleRef.current.style.transform = 'translateY(20px)';
            subtitleRef.current.style.transition = 'all 0.8s ease-out';

            setTimeout(() => {
               subtitleRef.current.style.opacity = '1';
               subtitleRef.current.style.transform = 'translateY(0)';
            }, 500);
         }

         // CTA animation
         if (ctaRef.current) {
            ctaRef.current.style.opacity = '0';
            ctaRef.current.style.transform = 'translateY(20px)';
            ctaRef.current.style.transition = 'all 0.8s ease-out';

            setTimeout(() => {
               ctaRef.current.style.opacity = '1';
               ctaRef.current.style.transform = 'translateY(0)';
            }, 700);
         }

         // Stats animation
         if (statsRef.current) {
            statsRef.current.style.opacity = '0';
            statsRef.current.style.transform = 'translateY(20px)';
            statsRef.current.style.transition = 'all 0.8s ease-out';

            setTimeout(() => {
               statsRef.current.style.opacity = '1';
               statsRef.current.style.transform = 'translateY(0)';
            }, 900);
         }

         // Floating elements animation
         floatingElementsRef.current.forEach((el, index) => {
            if (el) {
               el.style.opacity = '0';
               el.style.transform = `translateY(${30 + index * 10}px) scale(0.8)`;
               el.style.transition = `all 0.6s ease-out`;

               setTimeout(() => {
                  el.style.opacity = '1';
                  el.style.transform = 'translateY(0) scale(1)';
               }, 1100 + index * 200);
            }
         });
      };

      animateElements();

      // Parallax effect on scroll
      const handleScroll = () => {
         const scrollY = window.scrollY;
         if (heroRef.current) {
            heroRef.current.style.transform = `translateY(${scrollY * 0.5}px) scale(${1 + scrollY * 0.0002})`;
         }
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
   }, []);

   const addToFloatingRefs = (el) => {
      if (el && !floatingElementsRef.current.includes(el)) {
         floatingElementsRef.current.push(el);
      }
   };

   return (
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-emerald-900">
         {/* Animated Background */}
         <div
            ref={heroRef}
            className="absolute inset-0 opacity-20"
            style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
         />

         {/* Gradient Overlay */}
         <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

         {/* Floating Elements */}
         <div className="absolute inset-0 pointer-events-none">
            <div
               ref={addToFloatingRefs}
               className="absolute top-20 left-10 w-16 h-16 bg-emerald-400/20 rounded-full blur-xl animate-pulse"
            />
            <div
               ref={addToFloatingRefs}
               className="absolute top-40 right-20 w-24 h-24 bg-blue-400/20 rounded-full blur-xl animate-pulse delay-700"
            />
            <div
               ref={addToFloatingRefs}
               className="absolute bottom-40 left-20 w-20 h-20 bg-purple-400/20 rounded-full blur-xl animate-pulse delay-1000"
            />
            <div
               ref={addToFloatingRefs}
               className="absolute bottom-20 right-10 w-12 h-12 bg-yellow-400/20 rounded-full blur-xl animate-pulse delay-300"
            />
         </div>

         <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto text-center">
               {/* Main Title */}
               <h1
                  ref={titleRef}
                  className="text-4xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight"
               >
                  <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                     Book Your
                  </span>
                  <br />
                  <span className="text-white drop-shadow-2xl">
                     Perfect Futsal Court
                  </span>
               </h1>

               {/* Subtitle */}
               <p
                  ref={subtitleRef}
                  className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
               >
                  Experience premium futsal facilities with instant booking,
                  real-time availability, and seamless payment processing
               </p>

               {/* CTA Buttons */}
               <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                  <button className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-600 text-white text-lg font-semibold rounded-full shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105 hover:from-emerald-400 hover:to-blue-500">
                     <span className="flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        Book Now
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                     </span>
                     <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-blue-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10" />
                  </button>

                  <button className="px-8 py-4 border-2 border-white/30 text-white text-lg font-semibold rounded-full backdrop-blur-sm hover:bg-white/10 hover:border-white/50 transition-all duration-300 hover:scale-105">
                     <span className="flex items-center gap-2">
                        <MapPin className="w-5 h-5" />
                        Find Courts
                     </span>
                  </button>
               </div>

               {/* Stats Section */}
               <div
                  ref={statsRef}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto"
               >
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                     <div className="flex items-center justify-center mb-3">
                        <div className="p-3 bg-emerald-500/20 rounded-full">
                           <MapPin className="w-6 h-6 text-emerald-400" />
                        </div>
                     </div>
                     <h3 className="text-2xl font-bold text-white mb-2">150+</h3>
                     <p className="text-gray-300">Premium Courts</p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                     <div className="flex items-center justify-center mb-3">
                        <div className="p-3 bg-blue-500/20 rounded-full">
                           <Users className="w-6 h-6 text-blue-400" />
                        </div>
                     </div>
                     <h3 className="text-2xl font-bold text-white mb-2">50K+</h3>
                     <p className="text-gray-300">Happy Players</p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                     <div className="flex items-center justify-center mb-3">
                        <div className="p-3 bg-purple-500/20 rounded-full">
                           <Star className="w-6 h-6 text-purple-400" />
                        </div>
                     </div>
                     <h3 className="text-2xl font-bold text-white mb-2">4.9/5</h3>
                     <p className="text-gray-300">Average Rating</p>
                  </div>
               </div>

               {/* Quick Features */}
               <div className="mt-16 flex flex-wrap justify-center gap-6 text-sm text-gray-300">
                  <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
                     <Clock className="w-4 h-4 text-emerald-400" />
                     24/7 Booking
                  </div>
                  <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
                     <Calendar className="w-4 h-4 text-blue-400" />
                     Instant Confirmation
                  </div>
                  <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
                     <Users className="w-4 h-4 text-purple-400" />
                     Team Management
                  </div>
               </div>
            </div>
         </div>

         {/* Scroll Indicator */}
         <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
               <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
            </div>
         </div>
      </div>
   );
};

export default FutsalHeroSection;