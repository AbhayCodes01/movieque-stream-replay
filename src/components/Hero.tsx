import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { LoadingScreen } from "./LoadingScreen";
import { useNavigate } from "react-router-dom";
import heroBackground from "@/assets/hero-bg.jpg";
import curtainBg from "@/assets/curtain-bg.jpg";

export const Hero = () => {
  const [showLoading, setShowLoading] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = () => {
    setShowLoading(true);
  };

  const handleLoadingComplete = () => {
    setShowLoading(false);
    navigate("/services");
  };

  return (
    <>
      {showLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      
      <section 
        className="relative min-h-screen flex items-center justify-center parallax-bg overflow-hidden spotlight"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        {/* Film grain overlay */}
        <div className="absolute inset-0 bg-[url('/src/assets/film-grain.png')] opacity-10 pointer-events-none mix-blend-overlay" />
        
        {/* Vignette effect */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/60" />
        
        {/* Main gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
        
        {/* Curtain overlay */}
        <motion.div 
          className="absolute inset-0 z-20 bg-cover bg-center curtain-reveal"
          style={{ backgroundImage: `url(${curtainBg})` }}
          initial={{ clipPath: "inset(0 50% 0 50%)" }}
          animate={{ clipPath: "inset(0 0% 0 0%)" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        
        <div className="relative z-30 max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <motion.h1 
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-6 text-glow leading-none"
              initial={{ letterSpacing: "0.5em", opacity: 0 }}
              animate={{ letterSpacing: "0.05em", opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              MOVIEQUE
            </motion.h1>
            
            <motion.p 
              className="text-2xl sm:text-3xl md:text-4xl mb-12 cinema-gradient bg-clip-text text-transparent font-semibold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
            >
              Stream.Binge.Repeat
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.1, duration: 0.5 }}
            >
              <Button 
                size="lg"
                onClick={handleNavigate}
                className="cinema-gradient text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-6 rounded-full hover:scale-105 transition-transform glow-accent"
              >
                Explore Services <ArrowRight className="ml-2" />
              </Button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
        >
          <div className="w-6 h-10 border-2 border-accent rounded-full flex items-start justify-center p-2">
            <motion.div 
              className="w-1.5 h-2 bg-accent rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>
    </>
  );
};
