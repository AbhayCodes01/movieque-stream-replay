import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Download, BarChart3, PieChart as PieChartIcon, LineChart as LineChartIcon } from "lucide-react";
import { LoadingScreen } from "./LoadingScreen";

const languageData = [
  { name: "English", count: 450 },
  { name: "Hindi", count: 230 },
  { name: "Spanish", count: 190 },
  { name: "Korean", count: 150 },
  { name: "Japanese", count: 120 },
  { name: "French", count: 100 },
];

const genreData = [
  { name: "Action", value: 30, color: "#38BDF8" },
  { name: "Comedy", value: 20, color: "#06B6D4" },
  { name: "Drama", value: 25, color: "#3B82F6" },
  { name: "Sci-Fi", value: 10, color: "#8B5CF6" },
  { name: "Horror", value: 15, color: "#EC4899" },
];

const accessibilityData = [
  { name: "Subtitles", percentage: 90 },
  { name: "Dubbing", percentage: 75 },
  { name: "Audio Description", percentage: 60 },
  { name: "Sign Language", percentage: 40 },
];

type ChartType = "bar" | "pie" | "line";
type DataType = "languages" | "genres" | "accessibility";

export const Statistics = () => {
  const [chartType, setChartType] = useState<ChartType>("bar");
  const [dataType, setDataType] = useState<DataType>("languages");
  const [isLoading, setIsLoading] = useState(false);

  const handleChartChange = (type: ChartType) => {
    setIsLoading(true);
    setTimeout(() => {
      setChartType(type);
      setIsLoading(false);
    }, 3000);
  };

  const getCurrentData = () => {
    switch (dataType) {
      case "languages":
        return languageData;
      case "genres":
        return genreData;
      case "accessibility":
        return accessibilityData;
      default:
        return languageData;
    }
  };

  const downloadData = () => {
    const data = getCurrentData();
    const csv = [
      Object.keys(data[0]).join(","),
      ...data.map(row => Object.values(row).join(","))
    ].join("\n");
    
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${dataType}-data.csv`;
    a.click();
  };

  const renderChart = () => {
    const data = getCurrentData();

    if (chartType === "bar") {
      return (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
            <XAxis dataKey="name" stroke="#F1F5F9" />
            <YAxis stroke="#F1F5F9" />
            <Tooltip 
              contentStyle={{ backgroundColor: "#1E293B", border: "1px solid #38BDF8" }}
              labelStyle={{ color: "#F1F5F9" }}
            />
            <Legend />
            <Bar dataKey={dataType === "accessibility" ? "percentage" : dataType === "genres" ? "value" : "count"} fill="#38BDF8" />
          </BarChart>
        </ResponsiveContainer>
      );
    }

    if (chartType === "pie" && dataType === "genres") {
      return (
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={genreData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={(props: any) => `${props.name} ${(props.percent * 100).toFixed(0)}%`}
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
            >
              {genreData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      );
    }

    if (chartType === "line") {
      return (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
            <XAxis dataKey="name" stroke="#F1F5F9" />
            <YAxis stroke="#F1F5F9" />
            <Tooltip 
              contentStyle={{ backgroundColor: "#1E293B", border: "1px solid #38BDF8" }}
            />
            <Legend />
            <Line type="monotone" dataKey={dataType === "accessibility" ? "percentage" : dataType === "genres" ? "value" : "count"} stroke="#38BDF8" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      );
    }

    return null;
  };

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      
      <section className="py-24 px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl font-bold text-center mb-4">Platform Statistics</h2>
            <p className="text-center text-muted-foreground mb-12 text-lg">
              Data-driven insights into our content library
            </p>
          </motion.div>

          <Card className="p-8 bg-card border-accent/20">
            <div className="flex flex-wrap gap-4 mb-8 justify-between items-center">
              <div className="flex gap-2">
                <Button
                  variant={chartType === "bar" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleChartChange("bar")}
                  className={chartType === "bar" ? "cinema-gradient" : ""}
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Bar Chart
                </Button>
                <Button
                  variant={chartType === "pie" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleChartChange("pie")}
                  disabled={dataType !== "genres"}
                  className={chartType === "pie" ? "cinema-gradient" : ""}
                >
                  <PieChartIcon className="w-4 h-4 mr-2" />
                  Pie Chart
                </Button>
                <Button
                  variant={chartType === "line" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleChartChange("line")}
                  className={chartType === "line" ? "cinema-gradient" : ""}
                >
                  <LineChartIcon className="w-4 h-4 mr-2" />
                  Line Chart
                </Button>
              </div>

              <div className="flex gap-4 items-center">
                <Select value={dataType} onValueChange={(value) => setDataType(value as DataType)}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="languages">Languages</SelectItem>
                    <SelectItem value="genres">Genres</SelectItem>
                    <SelectItem value="accessibility">Accessibility</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" size="sm" onClick={downloadData}>
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>

            <motion.div
              key={chartType}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {renderChart()}
            </motion.div>
          </Card>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[
              { label: "Total Titles", value: "1,200+" },
              { label: "Languages", value: "15+" },
              { label: "Genres", value: "12" },
              { label: "User Rating", value: "4.8/5" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 text-center bg-card border-accent/20 hover:border-accent/50 transition-all hover:glow-accent">
                  <p className="text-4xl font-bold text-accent mb-2">{stat.value}</p>
                  <p className="text-muted-foreground">{stat.label}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
