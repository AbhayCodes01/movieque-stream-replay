import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Play } from "lucide-react";
import { LoadingScreen } from "./LoadingScreen";
import { useNavigate } from "react-router-dom";
import showcase1 from "@/assets/showcase-1.jpg";
import showcase2 from "@/assets/showcase-2.jpg";
import showcase3 from "@/assets/showcase-3.jpg";

const showcaseItems = [
  {
    title: "Breaking Boundaries",
    genre: "Action Thriller",
    description: "An adrenaline-pumping journey across continents",
    image: showcase1,
  },
  {
    title: "Whispers in Time",
    genre: "Sci-Fi Drama",
    description: "A mind-bending exploration of parallel universes",
    image: showcase2,
  },
  {
    title: "Laugh Factory",
    genre: "Comedy Series",
    description: "The funniest show you'll watch this year",
    image: showcase3,
  },
];

export const Showcase = () => {
  const [showLoading, setShowLoading] = useState(false);
  const navigate = useNavigate();

  const handleViewAll = () => {
    setShowLoading(true);
  };

  const handleLoadingComplete = () => {
    setShowLoading(false);
    navigate("/showcase");
  };

  return (
    <>
      {showLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      
      <section className="py-24 px-6 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/src/assets/film-grain.png')] opacity-5 pointer-events-none"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Featured Showcase</h2>
            <p className="text-center text-muted-foreground mb-12 text-base md:text-lg">
              Discover our handpicked selection
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
            {showcaseItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="group overflow-hidden bg-card border-accent/20 hover:border-accent/50 transition-all hover:glow-accent cursor-pointer h-full">
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.2 }}
                        className="w-16 h-16 rounded-full bg-accent/20 backdrop-blur-sm flex items-center justify-center border-2 border-accent/50"
                      >
                        <Play className="w-8 h-8 text-accent" />
                      </motion.div>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-accent mb-2">{item.genre}</p>
                    <h3 className="text-xl md:text-2xl font-bold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm md:text-base">{item.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Button
              size="lg"
              onClick={handleViewAll}
              className="cinema-gradient px-6 md:px-8 py-4 md:py-6 text-base md:text-lg rounded-full hover:scale-105 transition-transform"
            >
              View Full Showcase <ArrowRight className="ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
};
