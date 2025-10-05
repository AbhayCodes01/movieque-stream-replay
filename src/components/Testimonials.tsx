import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Quote } from "lucide-react";

const testimonialCategories = {
  organizations: [
    { name: "The Hollywood Reporter", quote: "A game-changing platform that redefines streaming entertainment.", rating: 5 },
    { name: "Variety", quote: "Movieque sets a new standard for content diversity and quality.", rating: 5 },
    { name: "Entertainment Weekly", quote: "The future of streaming is here, and it's brilliant.", rating: 5 },
  ],
  celebrities: [
    { name: "Emma Stone", quote: "I love the vast selection and the seamless experience!", rating: 5 },
    { name: "Ryan Reynolds", quote: "Finally, a streaming service that gets it right. Highly recommend!", rating: 5 },
    { name: "Zendaya", quote: "The interface is gorgeous and the content is unmatched.", rating: 5 },
  ],
  critics: [
    { name: "Roger Ebert Jr.", quote: "A masterclass in digital entertainment delivery.", rating: 5 },
    { name: "Peter Travers", quote: "Exceptional quality meets incredible variety.", rating: 5 },
    { name: "Richard Roeper", quote: "This is how streaming should be done.", rating: 5 },
  ],
  users: [
    { name: "Sarah M.", quote: "Best streaming service I've ever used. Worth every penny!", rating: 5 },
    { name: "James K.", quote: "The content library is massive and always updated!", rating: 5 },
    { name: "Lisa R.", quote: "User-friendly interface and amazing quality. Love it!", rating: 5 },
  ],
};

type CategoryKey = keyof typeof testimonialCategories;

export const Testimonials = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("organizations");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => 
        (prev + 1) % testimonialCategories[activeCategory].length
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [activeCategory, isHovered]);

  const currentTestimonial = testimonialCategories[activeCategory][currentIndex];

  return (
    <section className="py-24 px-6 bg-card/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl font-bold text-center mb-4">What People Say</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Trusted by millions worldwide
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {(Object.keys(testimonialCategories) as CategoryKey[]).map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => {
                setActiveCategory(category);
                setCurrentIndex(0);
              }}
              className={activeCategory === category ? "cinema-gradient" : ""}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Button>
          ))}
        </div>

        <motion.div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeCategory}-${currentIndex}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-12 bg-card border-accent/20 hover:border-accent/50 transition-all glow-accent">
                <Quote className="w-12 h-12 text-accent mb-6" />
                <p className="text-2xl mb-6 italic">{currentTestimonial.quote}</p>
                <div className="flex items-center justify-between">
                  <p className="text-xl font-semibold text-accent">
                    — {currentTestimonial.name}
                  </p>
                  <div className="flex gap-1">
                    {Array.from({ length: currentTestimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-2 mt-8">
            {testimonialCategories[activeCategory].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex 
                    ? "bg-accent w-8" 
                    : "bg-accent/30 hover:bg-accent/50"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
