import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaPaperPlane } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

type Message = { sender: "user" | "bot"; text: any };

const ChatWithAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [isRobotHovered, setIsRobotHovered] = useState(false);
  const { isDark } = useTheme();
  const [isMobile, setIsMobile] = useState(false);

  const wsRef = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const THREAD_ID = "demo-user";

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isBotTyping]);

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

          let content: any = data.text;
          try {
            content = JSON.parse(data.text); // if backend sends JSON string
          } catch {}

          setMessages((prev) => [...prev, { sender: "bot", text: content }]);
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

  useEffect(() => {
    const determineIsMobile = () => {
      try {
        return window.innerWidth <= 640;
      } catch {
        return false;
      }
    };
    const handleResize = () => setIsMobile(determineIsMobile());
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sendMessage = () => {
    if (!input.trim() || !wsRef.current) return;

    wsRef.current.send(JSON.stringify({ text: input, thread_id: THREAD_ID }));

    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setInput("");
    setIsBotTyping(true);
  };

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
          cursor: "pointer",
        }}
      >
        <div style={{ display: "flex", gap: "8px", marginBottom: "4px" }}>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "white",
              boxShadow: "0 0 5px rgba(255, 255, 255, 0.8)",
            }}
          />
          <motion.div
            animate={isRobotHovered ? { scale: 0.1, y: 2 } : { scale: [1, 1.2, 1] }}
            transition={{
              duration: isRobotHovered ? 0.2 : 2,
              repeat: isRobotHovered ? 0 : Infinity,
              delay: isRobotHovered ? 0 : 0.5,
            }}
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "white",
              boxShadow: "0 0 5px rgba(255, 255, 255, 0.8)",
            }}
          />
        </div>
        <motion.div
          animate={{ scaleX: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{
            width: "12px",
            height: "2px",
            background: "white",
            borderRadius: "1px",
            boxShadow: "0 0 3px rgba(255, 255, 255, 0.6)",
          }}
        />
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
            borderRadius: "1px",
          }}
        />
      </motion.div>
    );
  }, [isRobotHovered]);

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
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <div style={{ display: "flex", gap: "3px", marginBottom: "2px" }}>
          <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "white" }} />
          <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "white" }} />
        </div>
        <div style={{ width: "6px", height: "1px", background: "white", borderRadius: "1px" }} />
      </motion.div>
    );
  }, []);

  const renderMessageContent = (m: Message) => {
    if (typeof m.text === "string") return m.text;

    if (m.text?.data && m.text.data[0]?.skills) {
      return (
        <div>
          <h4 style={{ fontWeight: 600, marginBottom: "0.5rem" }}>
            {m.text.instructions?.[0] || "Skills"}
          </h4>
          <ul
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
              gap: "0.5rem",
              padding: 0,
              listStyle: "none",
            }}
          >
            {m.text.data[0].skills.map((skill: string, idx: number) => (
              <li
                key={idx}
                style={{
                  background: "var(--glass-bg)",
                  border: "1px solid var(--glass-border)",
                  borderRadius: "20px",
                  padding: "6px 10px",
                  fontSize: "0.85rem",
                  textAlign: "center",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
      );
    }

    return JSON.stringify(m.text);
  };

  return (
    <>
      {!isOpen && (
        <motion.button
          onClick={() => setIsOpen(true)}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1, boxShadow: "var(--shadow-xl), 0 0 30px rgba(102, 126, 234, 0.4)" }}
          whileTap={{ scale: 0.9 }}
          style={{
            position: "fixed",
            bottom: isMobile ? "max(env(safe-area-inset-bottom), 1rem)" : "2rem",
            right: isMobile ? "max(env(safe-area-inset-right), 1rem)" : "2rem",
            width: isMobile ? "56px" : "70px",
            height: isMobile ? "56px" : "70px",
            borderRadius: "50%",
            background: "var(--gradient-primary)",
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            boxShadow: "var(--shadow-lg), 0 0 20px rgba(102, 126, 234, 0.3)",
            zIndex: 1000,
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "2px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <RobotFace />
        </motion.button>
      )}

      <AnimatePresence>
        {isOpen && (
          <>
            {/* background dim */}
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
                zIndex: 1998,
              }}
              onClick={() => setIsOpen(false)}
            />
            {/* chatbox */}
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              style={{
                position: "fixed",
                bottom: isMobile ? undefined : 0,
                right: isMobile ? undefined : 0,
                left: isMobile ? 0 : undefined,
                top: isMobile ? "max(env(safe-area-inset-top), 12px)" : undefined,
                width: isMobile ? "100vw" : "min(460px, 95vw)",
                height: isMobile ? "calc(100vh - max(env(safe-area-inset-top), 12px))" : "min(620px, 92vh)",
                background: "var(--gradient-surface)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                borderTopLeftRadius: isMobile ? "0px" : "20px",
                borderTopRightRadius: isMobile ? "0px" : "20px",
                display: "flex",
                flexDirection: "column",
                zIndex: 1999,
                boxShadow: "var(--shadow-xl), 0 0 40px rgba(102, 126, 234, 0.2)",
                border: "1px solid var(--glass-border)",
              }}
            >
              {/* header */}
              <div
                style={{
                  padding: isMobile ? "1.25rem 1rem" : "1.5rem",
                  background: "var(--gradient-primary)",
                  color: "white",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderTopLeftRadius: isMobile ? "0px" : "20px",
                  borderTopRightRadius: isMobile ? "0px" : "20px",
                  boxShadow: "var(--shadow-md)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <RobotFace />
                  <div>
                    <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: "600" }}>AKIRA</h3>
                  </div>
                </div>
                <motion.button
                  aria-label="Close chat"
                  onClick={() => setIsOpen(false)}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    background: "rgba(255, 255, 255, 0.22)",
                    border: "none",
                    borderRadius: "50%",
                    width: isMobile ? "32px" : "35px",
                    height: isMobile ? "32px" : "35px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    color: "white",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                  }}
                >
                  <FaTimes />
                </motion.button>
              </div>

              <div
                style={{
                  flex: 1,
                  padding: isMobile ? "1rem" : "1.5rem",
                  overflowY: "auto",
                  background: "transparent",
                }}
              >
                {messages.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      textAlign: "center",
                      color: "var(--text-secondary)",
                      marginTop: "2rem",
                    }}
                  >
                    <RobotFace />
                    <p style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
                      Hello 👋 I’m Akira, the personal AI assistant of Mr.Prithviraj.
                    </p>
                    <p style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
                      I am under construction, please be patient. Thankyou
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
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-end",
                        gap: "8px",
                        justifyContent: m.sender === "user" ? "flex-end" : "flex-start",
                      }}
                    >
                      {m.sender === "bot" && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ width: "30px", height: "30px" }}>
                          <SmallRobotFace />
                        </motion.div>
                      )}
                      <span
                        style={{
                          display: "inline-block",
                          padding: "0.8rem 1.2rem",
                          borderRadius: "18px",
                          background: m.sender === "user" ? "var(--gradient-primary)" : "var(--glass-bg)",
                          color: m.sender === "user" ? "white" : "var(--text-primary)",
                          maxWidth: "70%",
                          wordWrap: "break-word",
                          boxShadow: "var(--shadow-sm)",
                          border: m.sender === "user" ? "none" : "1px solid var(--glass-border)",
                        }}
                      >
                        {renderMessageContent(m)}
                      </span>
                      {m.sender === "user" && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ width: "30px", height: "30px" }}>
                          <div
                            style={{
                              width: "30px",
                              height: "30px",
                              borderRadius: "50%",
                              background: "var(--gradient-secondary)",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              color: "white",
                              fontSize: "0.8rem",
                              fontWeight: "bold",
                            }}
                          >
                            U
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}

                {isBotTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{
                      display: "flex",
                      alignItems: "flex-end",
                      gap: "8px",
                      marginTop: "1rem",
                      justifyContent: "flex-start",
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
                        boxShadow: "var(--shadow-sm)",
                      }}
                    >
                      <div style={{ display: "flex", gap: "4px" }}>
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                          style={{ width: "6px", height: "6px", background: "var(--text-primary)", borderRadius: "50%" }}
                        />
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                          style={{ width: "6px", height: "6px", background: "var(--text-primary)", borderRadius: "50%" }}
                        />
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                          style={{ width: "6px", height: "6px", background: "var(--text-primary)", borderRadius: "50%" }}
                        />
                      </div>
                    </motion.div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div
                style={{
                  padding: isMobile ? "1rem" : "1.25rem",
                  borderTop: "1px solid var(--glass-border)",
                  display: "flex",
                  gap: "10px",
                  background: "var(--gradient-surface)",
                  borderBottomLeftRadius: isMobile ? "0px" : "20px",
                  borderBottomRightRadius: isMobile ? "0px" : "20px",
                }}
              >
                {/* <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Type your message..."
                  style={{
                    flex: 1,
                    padding: "0.8rem 1rem",
                    borderRadius: "12px",
                    border: "1px solid var(--glass-border)",
                    outline: "none",
                    background: "var(--glass-bg)",
                    color: "var(--text-primary)",
                    fontSize: "0.9rem",
                  }}
                /> */}
                {/* <motion.button
                  onClick={sendMessage}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    background: "var(--gradient-primary)",
                    border: "none",
                    borderRadius: "12px",
                    padding: "0.8rem 1rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "white",
                    boxShadow: "var(--shadow-md)",
                  }}
                >
                  <FaPaperPlane />
                </motion.button> */}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWithAI;
