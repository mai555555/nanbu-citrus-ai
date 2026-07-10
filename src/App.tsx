import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Scan from "@/pages/Scan";
import Advice from "@/pages/Advice";
import HistoryPage from "@/pages/History";
import Dashboard from "@/pages/Dashboard";
import About from "@/pages/About";

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scan" element={<Scan />} />
          <Route path="/advice/:id" element={<Advice />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Layout>
    </Router>
  );
}
