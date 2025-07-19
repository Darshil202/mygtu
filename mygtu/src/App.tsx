import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Mail,
  BookOpen,
  Calendar,
  FileText,
  GraduationCap,
  UserCircle,
  FileSearch,
  Bot,
  Home,
  Search,
  SendHorizontal
} from "lucide-react";
import { SpeedInsights } from "@vercel/speed-insights/react";

export default function MYGTU() {
  const [showDashboard, setShowDashboard] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [chatVisible, setChatVisible] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<string[]>([]);

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#111827" : "#ffffff";
  }, [darkMode]);

  const handleChatSubmit = () => {
    if (chatInput.trim()) {
      setChatMessages([...chatMessages, chatInput]);
      setChatInput("");
    }
  };

  const resources = [
    { tab: "syllabus", title: "GTU Syllabus", icon: <BookOpen />, url: "https://gtu.ac.in/syllabus/syllabus.aspx" },
    { tab: "calendar", title: "Academic Calendar", icon: <Calendar />, url: "https://www.gtu.ac.in/AcademicCal.aspx" },
    { tab: "calendar", title: "Exam Timetable", icon: <Calendar />, url: "https://timetable.gtu.ac.in/" },
    { tab: "moocs", title: "MOOCs Offered", icon: <GraduationCap />, url: "https://www.gtu.ac.in/ListofMOOCsOfferedbyGTu.aspx" },
    { tab: "papers", title: "Old Question Papers", icon: <FileText />, url: "https://gtu.ac.in/Download1.aspx" },
    { tab: "papers", title: "Question Paper Format", icon: <FileText />, url: "https://www.gtu.ac.in/QPFormat.aspx" },
    { tab: "grades", title: "Individual Results", icon: <FileSearch />, url: "https://www.gturesults.in/" },
    { tab: "grades", title: "Result List", icon: <FileSearch />, url: "https://www.gtu.ac.in/result.aspx" },
    { tab: "portal", title: "Student Portal Login", icon: <UserCircle />, url: "https://student.gtu.ac.in/login.aspx" },
  ];

  if (!showDashboard) {
    return (
      <main className={`min-h-screen flex flex-col items-center justify-center text-center p-6 ${darkMode ? "bg-gray-900 text-white" : "text-gray-900"}`}>
        <motion.h1 className="text-6xl font-extrabold text-blue-700 mb-4 tracking-tight" initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>🎓 MYGTU</motion.h1>
        <motion.p className="text-lg max-w-2xl mb-6 text-gray-700 dark:text-gray-300" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>Your one-stop hub for GTU syllabus, results, old papers, academic calendar, MOOCs, and more — all in one student-friendly dashboard.</motion.p>
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.5 }}>
          <Button onClick={() => setShowDashboard(true)} className="px-8 py-3 text-lg rounded-2xl shadow-md">🚀 Enter Dashboard</Button>
        </motion.div>
        <footer className="mt-10 text-gray-500 text-sm">Made with ❤️ for GTU Students</footer>
        <SpeedInsights />
      </main>
    );
  }

  return (
    <main className={`pb-24 px-6 py-10 min-h-screen ${darkMode ? "bg-gray-900 text-white" : "text-gray-900"}`}>
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-4xl font-bold text-blue-700 tracking-tight">MYGTU – All GTU Resources in One Place</h1>
        <div className="hidden md:flex items-center gap-2">
          <span className="text-sm">🌙 Dark Mode</span>
          <Switch checked={darkMode} onCheckedChange={setDarkMode} />
        </div>
      </div>

      <Input type="text" placeholder="🔍 Search resources..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="mb-8 max-w-xl mx-auto" />

      <Tabs defaultValue="syllabus" className="w-full">
        <TabsList className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 mb-6">
          <TabsTrigger value="syllabus">📘 Syllabus</TabsTrigger>
          <TabsTrigger value="calendar">📅 Calendar</TabsTrigger>
          <TabsTrigger value="moocs">🎓 MOOCs</TabsTrigger>
          <TabsTrigger value="papers">📄 Papers</TabsTrigger>
          <TabsTrigger value="grades">📊 Results</TabsTrigger>
          <TabsTrigger value="portal">🧑‍🎓 Portal</TabsTrigger>
        </TabsList>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {resources
            .filter((r) => r.title.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((r, index) => (
              <TabsContent key={index} value={r.tab} asChild>
                <CardInView title={r.title} url={r.url} icon={r.icon} index={index} />
              </TabsContent>
            ))}
        </div>
      </Tabs>

      {chatVisible && (
        <div className="fixed bottom-20 right-6 bg-white text-black dark:bg-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg p-4 w-80 shadow-xl z-50">
          <p className="text-sm mb-2 font-semibold">💬 Ask me anything about GTU</p>
          <div className="max-h-40 overflow-y-auto text-xs space-y-1 mb-2">
            {chatMessages.map((msg, idx) => (
              <div key={idx} className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-md">{msg}</div>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Input type="text" placeholder="Type a question..." value={chatInput} onChange={(e) => setChatInput(e.target.value)} className="text-xs" />
            <Button size="icon" onClick={handleChatSubmit}><SendHorizontal size={16} /></Button>
          </div>
        </div>
      )}

      <footer className="mt-20">
        <p className="text-center text-gray-500 text-xs mt-6">Made with ❤️ for GTU Students</p>
      </footer>

      <nav className="fixed md:hidden bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-t dark:border-gray-700 flex justify-around items-center py-2">
        <Button variant="ghost" size="icon" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><Home /></Button>
        <Button variant="ghost" size="icon" onClick={() => document.querySelector('input[type="text"]')?.focus()}><Search /></Button>
        <Button variant="ghost" size="icon" onClick={() => setChatVisible(!chatVisible)}><Bot /></Button>
        <Switch checked={darkMode} onCheckedChange={setDarkMode} />
      </nav>

      <SpeedInsights />
    </main>
  );
}

function CardInView({ title, url, icon, index }: { title: string; url: string; icon: React.ReactNode; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: index * 0.1, duration: 0.5 }}>
      <ContentCard title={title} url={url} icon={icon} />
    </motion.div>
  );
}

function ContentCard({ title, url, icon }: { title: string; url: string; icon: React.ReactNode }) {
  return (
    <Card className="hover:shadow-xl transition-all duration-300 transform hover:scale-105">
      <CardContent className="p-4 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="text-blue-500 text-xl">{icon}</div>
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-medium">👉 Click here to open</a>
      </CardContent>
    </Card>
  );
}

