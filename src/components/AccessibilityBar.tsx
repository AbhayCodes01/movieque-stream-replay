import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accessibility, DollarSign } from "lucide-react";

const currencies = ["USD", "EUR", "GBP", "INR", "JPY"];

export const AccessibilityBar = () => {
  const [colorMode, setColorMode] = useState<"normal" | "colorblind" | "inverted" | "sepia">("normal");
  const [currency, setCurrency] = useState("USD");

  const handleColorModeChange = (mode: "normal" | "colorblind" | "inverted" | "sepia") => {
    setColorMode(mode);
    document.documentElement.classList.remove("colorblind", "inverted", "sepia");
    
    if (mode !== "normal") {
      document.documentElement.classList.add(mode);
    }
  };

  return (
    <div className="fixed top-4 right-4 z-40 flex flex-wrap gap-2 items-center bg-card/80 backdrop-blur-sm p-3 rounded-lg border border-accent/20 max-w-[95vw] md:max-w-none">
      <div className="flex gap-2 flex-wrap">
        <Button
          size="sm"
          variant={colorMode === "normal" ? "default" : "outline"}
          onClick={() => handleColorModeChange("normal")}
          className={colorMode === "normal" ? "cinema-gradient" : ""}
        >
          <Accessibility className="w-4 h-4 mr-1" />
          Normal
        </Button>
        <Button
          size="sm"
          variant={colorMode === "colorblind" ? "default" : "outline"}
          onClick={() => handleColorModeChange("colorblind")}
          className={colorMode === "colorblind" ? "cinema-gradient" : ""}
        >
          Colorblind
        </Button>
        <Button
          size="sm"
          variant={colorMode === "inverted" ? "default" : "outline"}
          onClick={() => handleColorModeChange("inverted")}
          className={colorMode === "inverted" ? "cinema-gradient" : ""}
        >
          Inverted
        </Button>
        <Button
          size="sm"
          variant={colorMode === "sepia" ? "default" : "outline"}
          onClick={() => handleColorModeChange("sepia")}
          className={colorMode === "sepia" ? "cinema-gradient" : ""}
        >
          Sepia
        </Button>
      </div>

      <Select value={currency} onValueChange={setCurrency}>
        <SelectTrigger className="w-[100px]">
          <DollarSign className="w-4 h-4 mr-2" />
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {currencies.map((curr) => (
            <SelectItem key={curr} value={curr}>
              {curr}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
