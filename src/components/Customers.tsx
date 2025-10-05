import { motion } from "framer-motion";

const customers = [
  "Paramount Pictures",
  "Warner Bros",
  "Universal Studios",
  "Sony Pictures",
  "20th Century Studios",
  "Lionsgate",
  "MGM Studios",
  "A24",
  "Netflix Originals",
  "Amazon Studios",
  "Apple TV+",
  "HBO Max",
  "Hulu",
  "Disney+",
  "Peacock",
];

export const Customers = () => {
  return (
    <section className="py-24 px-6 bg-card/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl font-bold text-center mb-4">Content Partners</h2>
          <p className="text-center text-muted-foreground mb-16 text-lg">
            Partnering with the biggest names in entertainment
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {customers.map((customer, index) => (
            <motion.div
              key={customer}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group"
            >
              <div className="p-8 border border-accent/20 rounded-lg hover:border-accent/50 transition-all hover:glow-accent bg-card/50 flex items-center justify-center min-h-[120px]">
                <p className="text-xl font-semibold text-foreground/70 group-hover:text-foreground transition-colors text-center filter grayscale group-hover:grayscale-0">
                  {customer}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
