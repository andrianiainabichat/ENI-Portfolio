import { useState, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Loader from "./components/ui/Loader";
import CustomCursor from "./components/ui/CustomCursor";
import "./styles/globals.css";

const Home          = lazy(() => import("./pages/Home"));
const NotFoundPage  = lazy(() => import("./pages/NotFoundPage"));

function Spinner() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{background:"#020c06"}}>
      <div className="w-10 h-10 border-2 border-green-500/30 border-t-green-400 rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      <CustomCursor />
      <Loader onComplete={() => setLoaded(true)} />
      {loaded && (
        <Router>
          <Navbar />
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
          <Footer />
        </Router>
      )}
    </>
  );
}
