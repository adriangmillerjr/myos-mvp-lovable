
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route index element={<Navigate to="/dashboard/projects" replace />} />
              <Route path="projects" element={<div className="p-8 text-center text-muted-foreground">Projects view coming soon...</div>} />
              <Route path="kpi" element={<div className="p-8 text-center text-muted-foreground">KPI Dashboard coming soon...</div>} />
              <Route path="weekly" element={<div className="p-8 text-center text-muted-foreground">Weekly Report coming soon...</div>} />
              <Route path="daily" element={<div className="p-8 text-center text-muted-foreground">Daily Summary coming soon...</div>} />
              <Route path="tasks" element={<div className="p-8 text-center text-muted-foreground">Master Tasks coming soon...</div>} />
              <Route path="journal" element={<div className="p-8 text-center text-muted-foreground">Journal coming soon...</div>} />
              <Route path="chat/:projectId?" element={<div />} />
              <Route path="chat" element={<div />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
