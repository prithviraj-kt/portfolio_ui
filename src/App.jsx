import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import BubbleBackground from "./components/BubbleBackground";
import Loader from "./components/Loader";
import CursorFollower from "./components/CursorFollower";
import ChatWithAI from "./components/ChatWithAI";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for demonstration purposes
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <div className="app">
        <AnimatePresence mode="wait">
          {loading ? (
            <Loader key="loader" />
          ) : (
            <>
              <CursorFollower />
              <BubbleBackground />
              <Navbar />
              <ChatWithAI />
              <main className="">
                {" "}
                {/* pt-20 = 80px top padding */}
                <Routes>
                  <Route path="*" element={<Home />} />
                </Routes>
              </main>
            </>
          )}
        </AnimatePresence>
      </div>
    </ThemeProvider>
  );
}

export default App;
