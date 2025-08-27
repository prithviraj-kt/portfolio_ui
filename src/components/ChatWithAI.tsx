import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaPaperPlane, FaRobot } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

type Message = { sender: "user" | "bot"; text: string };

const ChatWithAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [isRobotHovered, setIsRobotHovered] = useState(false);
  const { isDark } = useTheme();

  const wsRef = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // keep same thread id for memory
  const THREAD_ID = "demo-user"; // could also use uuid()

  // auto-scroll when new message comes
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isBotTyping]);

  // connect websocket when chat opens
  useEffect(() => {
    if (isOpen) {
      const ws = new WebSocket("ws://localhost:3000/ws");
      wsRef.current = ws;

      ws.onopen = () => {
        console.log("✅ Connected to WebSocket");
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.type === "bot_response") {
          setIsBotTyping(false);
          setMessages((prev) => [...prev, { sender: "bot", text: data.text }]);
        }

        if (data.type === "error") {
          setIsBotTyping(false);
          setMessages((prev) => [
            ...prev,
            { sender: "bot", text: "⚠️ " + data.message },
          ]);
        }
      };

      ws.onclose = () => {
        console.log("❌ WebSocket closed");
      };

      return () => {
        ws.close();
      };
    }
  }, [isOpen]);

  const sendMessage = () => {
    if (!input.trim() || !wsRef.current) return;

    // send to backend with thread_id
    wsRef.current.send(JSON.stringify({ text: input, thread_id: THREAD_ID }));

    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setInput("");
    setIsBotTyping(true);
  };

  // Memoized Robot face component to prevent re-rendering
  const RobotFace = useMemo(() => {
    return () => (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.1 }}
        onHoverStart={() => setIsRobotHovered(true)}
        onHoverEnd={() => setIsRobotHovered(false)}
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          background: "var(--gradient-primary)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          boxShadow: "var(--shadow-lg), 0 0 20px rgba(102, 126, 234, 0.3)",
          border: "2px solid rgba(255, 255, 255, 0.2)",
          cursor: "pointer"
        }}
      >
        {/* Eyes */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "4px" }}>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "white",
              boxShadow: "0 0 5px rgba(255, 255, 255, 0.8)"
            }}
          />
          <motion.div
            animate={isRobotHovered ? { scale: 0.1, y: 2 } : { scale: [1, 1.2, 1] }}
            transition={{ duration: isRobotHovered ? 0.2 : 2, repeat: isRobotHovered ? 0 : Infinity, delay: isRobotHovered ? 0 : 0.5 }}
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "white",
              boxShadow: "0 0 5px rgba(255, 255, 255, 0.8)"
            }}
          />
        </div>
        
        {/* Mouth */}
        <motion.div
          animate={{ scaleX: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{
            width: "12px",
            height: "2px",
            background: "white",
            borderRadius: "1px",
            boxShadow: "0 0 3px rgba(255, 255, 255, 0.6)"
          }}
        />
        
        {/* Antenna */}
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{
            position: "absolute",
            top: "-8px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "2px",
            height: "12px",
            background: "var(--gradient-secondary)",
            borderRadius: "1px"
          }}
        />
      </motion.div>
    );
  }, [isRobotHovered]);

  // Memoized small robot face for messages
  const SmallRobotFace = useMemo(() => {
    return () => (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        style={{
          width: "30px",
          height: "30px",
          borderRadius: "50%",
          background: "var(--gradient-primary)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          boxShadow: "var(--shadow-sm)"
        }}
      >
        {/* Eyes */}
        <div style={{ display: "flex", gap: "3px", marginBottom: "2px" }}>
          <div
            style={{
              width: "4px",
              height: "4px",
              borderRadius: "50%",
              background: "white"
            }}
          />
          <div
            style={{
              width: "4px",
              height: "4px",
              borderRadius: "50%",
              background: "white"
            }}
          />
        </div>
        
        {/* Mouth */}
        <div
          style={{
            width: "6px",
            height: "1px",
            background: "white",
            borderRadius: "1px"
          }}
        />
      </motion.div>
    );
  }, []);

  return (
    <>
      {/* Floating button with robot face */}
      {!isOpen && (
        <motion.button
          onClick={() => setIsOpen(true)}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ 
            scale: 1.1,
            boxShadow: "var(--shadow-xl), 0 0 30px rgba(102, 126, 234, 0.4)"
          }}
          whileTap={{ scale: 0.9 }}
          style={{
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            width: "70px",
            height: "70px",
            borderRadius: "50%",
            background: "var(--gradient-primary)",
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            // border: "none",
            boxShadow: "var(--shadow-lg), 0 0 20px rgba(102, 126, 234, 0.3)",
            zIndex: 1000,
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "2px solid rgba(255, 255, 255, 0.2)"
          }}
        >
          <RobotFace />
        </motion.button>
      )}

      {/* Chat Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Background dim */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0, 0, 0, 0.8)",
                backdropFilter: "blur(5px)",
                WebkitBackdropFilter: "blur(5px)",
                zIndex: 998,
              }}
              onClick={() => setIsOpen(false)}
            />

            {/* Chatbox */}
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              style={{
                position: "fixed",
                bottom: 0,
                right: 0,
                width: "450px",
                height: "600px",
                background: "var(--gradient-surface)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                borderTopLeftRadius: "20px",
                borderTopRightRadius: "20px",
                display: "flex",
                flexDirection: "column",
                zIndex: 999,
                boxShadow: "var(--shadow-xl), 0 0 40px rgba(102, 126, 234, 0.2)",
                border: "1px solid var(--glass-border)"
              }}
            >
              {/* Header */}
              <div
                style={{
                  padding: "1.5rem",
                  background: "var(--gradient-primary)",
                  color: "white",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderTopLeftRadius: "20px",
                  borderTopRightRadius: "20px",
                  boxShadow: "var(--shadow-md)"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <RobotFace />
                  <div>
                    <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: "600" }}>
                      AI Assistant
                    </h3>
                    <p style={{ margin: 0, fontSize: "0.8rem", opacity: 0.8 }}>
                      Powered by AI
                    </p>
                  </div>
                </div>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    background: "rgba(255, 255, 255, 0.2)",
                    border: "none",
                    borderRadius: "50%",
                    width: "35px",
                    height: "35px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    color: "white",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)"
                  }}
                >
                  <FaTimes />
                </motion.button>
              </div>

              {/* Messages */}
              <div
                style={{
                  flex: 1,
                  padding: "1.5rem",
                  overflowY: "auto",
                  background: "transparent"
                }}
              >
                {messages.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      textAlign: "center",
                      color: "var(--text-secondary)",
                      marginTop: "2rem"
                    }}
                  >
                    <RobotFace />
                    <p style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
                      Hi! I am Akira, Mr. Prithvi's personal AI assistant. I am under construction, please be patient. 🙏
                    </p>
                  </motion.div>
                )}
                
                {messages.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    style={{
                      marginBottom: "1rem",
                      textAlign: m.sender === "user" ? "right" : "left",
                    }}
                  >
                    <div style={{ 
                      display: "flex", 
                      alignItems: "flex-end", 
                      gap: "8px",
                      justifyContent: m.sender === "user" ? "flex-end" : "flex-start"
                    }}>
                      {m.sender === "bot" && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          style={{ width: "30px", height: "30px" }}
                        >
                          <SmallRobotFace />
                        </motion.div>
                      )}
                      <span
                        style={{
                          display: "inline-block",
                          padding: "0.8rem 1.2rem",
                          borderRadius: "18px",
                          background: m.sender === "user" 
                            ? "var(--gradient-primary)" 
                            : "var(--glass-bg)",
                          color: m.sender === "user" ? "white" : "var(--text-primary)",
                          maxWidth: "70%",
                          wordWrap: "break-word",
                          boxShadow: "var(--shadow-sm)",
                          border: m.sender === "user" ? "none" : "1px solid var(--glass-border)"
                        }}
                      >
                        {m.text}
                      </span>
                      {m.sender === "user" && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          style={{ width: "30px", height: "30px" }}
                        >
                          <div style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                            background: "var(--gradient-secondary)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "white",
                            fontSize: "0.8rem",
                            fontWeight: "bold"
                          }}>
                            U
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}

                {/* typing indicator */}
                {isBotTyping && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{ 
                      display: "flex", 
                      alignItems: "flex-end", 
                      gap: "8px",
                      marginTop: "1rem",
                      justifyContent: "flex-start"
                    }}
                  >
                    <div style={{ width: "30px", height: "30px" }}>
                      <SmallRobotFace />
                    </div>
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      style={{
                        padding: "0.8rem 1.2rem",
                        borderRadius: "18px",
                        background: "var(--glass-bg)",
                        border: "1px solid var(--glass-border)",
                        boxShadow: "var(--shadow-sm)"
                      }}
                    >
                      <div style={{ display: "flex", gap: "4px" }}>
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                          style={{
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            background: "var(--text-secondary)"
                          }}
                        />
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                          style={{
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            background: "var(--text-secondary)"
                          }}
                        />
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                          style={{
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            background: "var(--text-secondary)"
                          }}
                        />
                      </div>
                    </motion.div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div
                style={{
                  padding: "1rem",
                  borderTop: "1px solid var(--border-color)",
                  background: "var(--glass-bg)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  borderBottomLeftRadius: "20px",
                  borderBottomRightRadius: "20px"
                }}
              >
                <div style={{ display: "flex", gap: "0.8rem", alignItems: "center" }}>
                  {/* <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Type your message..."
                    style={{
                      flex: 1,
                      padding: "0.8rem 1rem",
                      borderRadius: "25px",
                      border: "2px solid var(--border-color)",
                      background: "var(--bg-primary)",
                      color: "var(--text-primary)",
                      fontSize: "0.9rem",
                      transition: "all 0.3s ease",
                      boxShadow: "var(--shadow-sm)"
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "var(--primary-500)";
                      e.target.style.boxShadow = "var(--shadow-md), 0 0 0 3px rgba(59, 130, 246, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "var(--border-color)";
                      e.target.style.boxShadow = "var(--shadow-sm)";
                    }}
                  /> */}


                  {/* <motion.button
                    onClick={sendMessage}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                      background: "var(--gradient-primary)",
                      color: "white",
                      border: "none",
                      padding: "0.8rem",
                      borderRadius: "50%",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      boxShadow: "var(--shadow-md)",
                      width: "45px",
                      height: "45px"
                    }}
                  >
                    <FaPaperPlane />
                  </motion.button> */}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWithAI;
