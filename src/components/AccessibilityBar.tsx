import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accessibility, Globe, DollarSign } from "lucide-react";

const languages = ["English", "Spanish", "French", "German", "Hindi", "Japanese", "Korean"];
const currencies = ["USD", "EUR", "GBP", "INR", "JPY"];

export const AccessibilityBar = () => {
  const [colorMode, setColorMode] = useState<"normal" | "colorblind" | "inverted">("normal");
  const [language, setLanguage] = useState("English");
  const [currency, setCurrency] = useState("USD");

  const handleColorModeChange = (mode: "normal" | "colorblind" | "inverted") => {
    setColorMode(mode);
    if (mode === "colorblind") {
      document.documentElement.classList.add("colorblind");
      document.documentElement.classList.remove("inverted");
    } else if (mode === "inverted") {
      document.documentElement.classList.add("inverted");
      document.documentElement.classList.remove("colorblind");
    } else {
      document.documentElement.classList.remove("colorblind", "inverted");
    }
  };

  return (
    <div className="fixed top-4 right-4 z-40 flex gap-3 items-center bg-card/80 backdrop-blur-sm p-3 rounded-lg border border-accent/20">
      <div className="flex gap-2">
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
      </div>

      <Select value={language} onValueChange={setLanguage}>
        <SelectTrigger className="w-[130px]">
          <Globe className="w-4 h-4 mr-2" />
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang} value={lang}>
              {lang}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

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
