import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Play, 
  Download, 
  Users, 
  Shield, 
  Globe, 
  Smartphone,
  Tv,
  Languages,
  Clock,
  Star,
  Check
} from "lucide-react";
import { AccessibilityBar } from "@/components/AccessibilityBar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const features = [
  {
    icon: Play,
    title: "Unlimited Streaming",
    description: "Watch as much as you want, anytime you want",
  },
  {
    icon: Download,
    title: "Offline Viewing",
    description: "Download your favorite shows and movies",
  },
  {
    icon: Users,
    title: "Multiple Profiles",
    description: "Create profiles for different family members",
  },
  {
    icon: Shield,
    title: "Parental Controls",
    description: "Keep your kids safe with age restrictions",
  },
  {
    icon: Globe,
    title: "Global Content",
    description: "Access content from around the world",
  },
  {
    icon: Smartphone,
    title: "Multi-Device Support",
    description: "Stream on phone, tablet, laptop, or TV",
  },
  {
    icon: Tv,
    title: "4K Ultra HD",
    description: "Enjoy crystal-clear picture quality",
  },
  {
    icon: Languages,
    title: "15+ Languages",
    description: "Content available in multiple languages",
  },
  {
    icon: Clock,
    title: "Watch Anytime",
    description: "24/7 access to your entertainment",
  },
];

const plans = [
  {
    name: "Basic",
    price: { USD: 9.99, EUR: 8.99, GBP: 7.99, INR: 799, JPY: 990 },
    features: [
      "HD streaming",
      "1 device at a time",
      "Limited downloads",
      "Basic support",
    ],
  },
  {
    name: "Standard",
    price: { USD: 14.99, EUR: 13.99, GBP: 11.99, INR: 1199, JPY: 1490 },
    features: [
      "Full HD streaming",
      "2 devices at a time",
      "Unlimited downloads",
      "Priority support",
      "Early access to new content",
    ],
    popular: true,
  },
  {
    name: "Premium",
    price: { USD: 19.99, EUR: 17.99, GBP: 15.99, INR: 1599, JPY: 1990 },
    features: [
      "4K Ultra HD streaming",
      "4 devices at a time",
      "Unlimited downloads",
      "24/7 VIP support",
      "Early access to new content",
      "Exclusive behind-the-scenes content",
    ],
  },
];

type Currency = "USD" | "EUR" | "GBP" | "INR" | "JPY";

const Services = () => {
  const [currency, setCurrency] = useState<Currency>("USD");

  const formatPrice = (price: number) => {
    const symbols = { USD: "$", EUR: "€", GBP: "£", INR: "₹", JPY: "¥" };
    return `${symbols[currency]}${price}`;
  };

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
          <h1 className="text-6xl font-bold mb-4">Services & Features</h1>
          <p className="text-xl text-muted-foreground">
            Everything you need for the ultimate streaming experience
          </p>
        </motion.div>

        {/* Features Grid */}
        <section className="max-w-6xl mx-auto mb-24">
          <h2 className="text-4xl font-bold text-center mb-12">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 bg-card border-accent/20 hover:border-accent/50 transition-all hover:glow-accent group cursor-pointer h-full">
                  <feature.icon className="w-12 h-12 text-accent mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Animated Stats */}
        <section className="max-w-6xl mx-auto mb-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "99.9%", label: "Uptime" },
              { value: "1200+", label: "Titles" },
              { value: "15+", label: "Languages" },
              { value: "4.8", label: "User Rating" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring" }}
              >
                <Card className="p-8 text-center bg-card border-accent/20">
                  <motion.p
                    className="text-5xl font-bold text-accent mb-2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 200 }}
                  >
                    {stat.value}
                  </motion.p>
                  <p className="text-muted-foreground">{stat.label}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Subscription Plans */}
        <section className="max-w-6xl mx-auto mb-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Choose Your Plan</h2>
            <div className="flex justify-center items-center gap-4">
              <p className="text-muted-foreground">Select your currency:</p>
              <Select value={currency} onValueChange={(value) => setCurrency(value as Currency)}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                  <SelectItem value="GBP">GBP (£)</SelectItem>
                  <SelectItem value="INR">INR (₹)</SelectItem>
                  <SelectItem value="JPY">JPY (¥)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={plan.popular ? "md:scale-105" : ""}
              >
                <Card className={`p-8 bg-card border-accent/20 hover:border-accent/50 transition-all hover:glow-accent relative ${
                  plan.popular ? "border-accent/50 glow-accent" : ""
                }`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 cinema-gradient px-6 py-2 rounded-full">
                      <Star className="w-4 h-4 inline mr-2" />
                      Most Popular
                    </div>
                  )}
                  
                  <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                  <p className="text-5xl font-bold text-accent mb-6">
                    {formatPrice(plan.price[currency])}
                    <span className="text-lg text-muted-foreground">/month</span>
                  </p>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full ${plan.popular ? "cinema-gradient" : ""}`}
                    variant={plan.popular ? "default" : "outline"}
                    size="lg"
                  >
                    Get Started
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Demo Video Section */}
        <section className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-12 bg-card border-accent/20 text-center">
              <h2 className="text-4xl font-bold mb-4">See It In Action</h2>
              <p className="text-muted-foreground mb-8">
                Watch how Movieque transforms your streaming experience
              </p>
              <div className="aspect-video bg-gradient-to-br from-accent/20 to-accent/5 rounded-lg flex items-center justify-center hover:from-accent/30 hover:to-accent/10 transition-all cursor-pointer group">
                <Play className="w-24 h-24 text-accent group-hover:scale-110 transition-transform" />
              </div>
            </Card>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default Services;
