import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { LoadingScreen } from "./LoadingScreen";
import { useNavigate } from "react-router-dom";
import heroBackground from "@/assets/hero-bg.jpg";

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
        className="relative min-h-screen flex items-center justify-center parallax-bg overflow-hidden"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-8xl md:text-9xl font-bold mb-6 text-glow leading-none">
              MOVIEQUE
            </h1>
            
            <motion.p 
              className="text-3xl md:text-4xl mb-12 cinema-gradient bg-clip-text text-transparent font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Stream.Binge.Repeat
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Button 
                size="lg"
                onClick={handleNavigate}
                className="cinema-gradient text-xl px-12 py-6 rounded-full hover:scale-105 transition-transform glow-accent"
              >
                Explore Services <ArrowRight className="ml-2" />
              </Button>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 border-2 border-accent rounded-full flex items-start justify-center p-2">
            <motion.div 
              className="w-1.5 h-2 bg-accent rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </div>
      </section>
    </>
  );
};
