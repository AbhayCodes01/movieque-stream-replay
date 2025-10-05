import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Play } from "lucide-react";
import { LoadingScreen } from "./LoadingScreen";
import { useNavigate } from "react-router-dom";

const showcaseItems = [
  {
    title: "Breaking Boundaries",
    genre: "Action Thriller",
    description: "An adrenaline-pumping journey across continents",
  },
  {
    title: "Whispers in Time",
    genre: "Sci-Fi Drama",
    description: "A mind-bending exploration of parallel universes",
  },
  {
    title: "Laugh Factory",
    genre: "Comedy Series",
    description: "The funniest show you'll watch this year",
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
      
      <section className="py-24 px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl font-bold text-center mb-4">Featured Showcase</h2>
            <p className="text-center text-muted-foreground mb-12 text-lg">
              Discover our handpicked selection
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {showcaseItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="group overflow-hidden bg-card border-accent/20 hover:border-accent/50 transition-all hover:glow-accent cursor-pointer">
                  <div className="aspect-video bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center group-hover:from-accent/30 group-hover:to-accent/10 transition-all">
                    <Play className="w-16 h-16 text-accent opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-accent mb-2">{item.genre}</p>
                    <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
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
              className="cinema-gradient px-8 py-6 text-lg rounded-full hover:scale-105 transition-transform"
            >
              View Full Showcase <ArrowRight className="ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
};
