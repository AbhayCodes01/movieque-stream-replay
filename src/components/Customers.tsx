import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import paramountLogo from "@/assets/logos/paramount.png";
import warnerLogo from "@/assets/logos/warner.png";
import universalLogo from "@/assets/logos/universal.png";
import sonyLogo from "@/assets/logos/sony.png";
import netflixLogo from "@/assets/logos/netflix.png";
import disneyLogo from "@/assets/logos/disney.png";

const customers = [
  { name: "Paramount Pictures", logo: paramountLogo },
  { name: "Warner Bros", logo: warnerLogo },
  { name: "Universal Studios", logo: universalLogo },
  { name: "Sony Pictures", logo: sonyLogo },
  { name: "20th Century Studios", logo: null },
  { name: "Lionsgate", logo: null },
  { name: "MGM Studios", logo: null },
  { name: "A24", logo: null },
  { name: "Netflix Originals", logo: netflixLogo },
  { name: "Amazon Studios", logo: null },
  { name: "Apple TV+", logo: null },
  { name: "HBO Max", logo: null },
  { name: "Hulu", logo: null },
  { name: "Disney+", logo: disneyLogo },
  { name: "Peacock", logo: null },
];

interface CustomerCardProps {
  customer: { name: string; logo: string | null };
  index: number;
}

const CustomerCard = ({ customer, index }: CustomerCardProps) => {
  const [isNear, setIsNear] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;
      
      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.sqrt(
        Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
      );
      
      // Trigger when cursor is within 200px
      setIsNear(distance < 200);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="group"
    >
      <div className="p-8 border border-accent/20 rounded-lg hover:border-accent/50 transition-all hover:glow-accent bg-card/50 flex items-center justify-center min-h-[120px] overflow-hidden relative">
        {customer.logo ? (
          <>
            <p className={`text-xl font-semibold text-foreground/70 transition-all duration-500 text-center absolute inset-0 flex items-center justify-center ${
              isNear ? "opacity-0 scale-90" : "opacity-100 scale-100"
            }`}>
              {customer.name}
            </p>
            <motion.img
              src={customer.logo}
              alt={customer.name}
              className={`h-20 w-auto object-contain transition-all duration-500 ${
                isNear ? "opacity-100 scale-100 grayscale-0" : "opacity-0 scale-75 grayscale"
              }`}
              initial={{ filter: "grayscale(100%)" }}
              animate={{ 
                filter: isNear ? "grayscale(0%)" : "grayscale(100%)",
                scale: isNear ? 1.1 : 1
              }}
            />
          </>
        ) : (
          <p className="text-xl font-semibold text-foreground/70 group-hover:text-foreground transition-colors text-center">
            {customer.name}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export const Customers = () => {
  return (
    <section className="py-24 px-6 bg-card/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/src/assets/film-grain.png')] opacity-5 pointer-events-none"></div>
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Content Partners</h2>
          <p className="text-center text-muted-foreground mb-16 text-base md:text-lg">
            Partnering with the biggest names in entertainment
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {customers.map((customer, index) => (
            <CustomerCard key={customer.name} customer={customer} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
