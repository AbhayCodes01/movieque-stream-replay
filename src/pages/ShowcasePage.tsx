import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Play, Star } from "lucide-react";
import { AccessibilityBar } from "@/components/AccessibilityBar";

const showcaseContent = [
  { title: "Breaking Boundaries", genre: "Action Thriller", rating: 4.8, duration: "2h 15m" },
  { title: "Whispers in Time", genre: "Sci-Fi Drama", rating: 4.9, duration: "1h 55m" },
  { title: "Laugh Factory", genre: "Comedy Series", rating: 4.7, duration: "8 Episodes" },
  { title: "Dark Horizons", genre: "Horror", rating: 4.5, duration: "1h 45m" },
  { title: "Love & Chaos", genre: "Romance", rating: 4.6, duration: "2h 05m" },
  { title: "The Last Stand", genre: "War Drama", rating: 4.9, duration: "2h 30m" },
  { title: "Mystery Manor", genre: "Mystery", rating: 4.7, duration: "10 Episodes" },
  { title: "Speed Demons", genre: "Sports Action", rating: 4.8, duration: "1h 50m" },
  { title: "Chronicles of Magic", genre: "Fantasy", rating: 4.9, duration: "12 Episodes" },
];

const ShowcasePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <AccessibilityBar />
      
      <div className="pt-24 px-6 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto text-center mb-16"
        >
          <h1 className="text-6xl font-bold mb-4">Full Showcase</h1>
          <p className="text-xl text-muted-foreground">
            Explore our complete collection of premium content
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {showcaseContent.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="group overflow-hidden bg-card border-accent/20 hover:border-accent/50 transition-all hover:glow-accent cursor-pointer">
                <div className="aspect-video bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center group-hover:from-accent/30 group-hover:to-accent/10 transition-all">
                  <Play className="w-16 h-16 text-accent opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-accent">{item.genre}</p>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-accent text-accent" />
                      <span className="text-sm">{item.rating}</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.duration}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowcasePage;
