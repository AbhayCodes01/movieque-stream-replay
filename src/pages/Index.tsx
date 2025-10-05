import { Hero } from "@/components/Hero";
import { Testimonials } from "@/components/Testimonials";
import { Statistics } from "@/components/Statistics";
import { Customers } from "@/components/Customers";
import { Showcase } from "@/components/Showcase";
import { AccessibilityBar } from "@/components/AccessibilityBar";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <AccessibilityBar />
      <Hero />
      <Testimonials />
      <Statistics />
      <Showcase />
      <Customers />
    </div>
  );
};

export default Index;
