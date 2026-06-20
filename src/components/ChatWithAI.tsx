import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaPaperPlane } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
type Message = { sender: "user" | "bot"; text: string };

// ---------- JSON HELPERS ----------
function extractJSON(s: string) {
  if (typeof s !== "string") return null;
  try {
    return JSON.parse(s);
  } catch {}
  try {
    const clean = s
      .replace(/```(?:json)?/gi, "")
      .replace(/```/g, "")
      .trim();
    return JSON.parse(clean);
  } catch {}
  const start = s.indexOf("{");
  const end = s.lastIndexOf("}");
  if (start !== -1 && end > start) {
    try {
      return JSON.parse(s.slice(start, end + 1));
    } catch {}
  }
  return null;
}

// ---------- BOT MESSAGE ----------
const BotMessage = ({ text }: { text: string }) => {
  const data = extractJSON(text);
  if (!data) return <span>{text}</span>;

  const details = data.details || {};
  const sections: Array<[string, any[]]> = Object.entries(details).filter(
    ([, v]) => Array.isArray(v) && v.length > 0
  ) as any;

  return (
    <div style={{ display: "grid", gap: 8 }}>
      {Array.isArray(data.general) && data.general.length > 0 && (
        <div>
          {data.general.map((g: string, i: number) => (
            <p key={i} style={{ margin: "4px 0" }}>
              {g}
            </p>
          ))}
        </div>
      )}
      {sections.map(([label, items]) => (
        <div key={label} style={{ marginTop: 6 }}>
          <strong style={{ textTransform: "capitalize" }}>{label}:</strong>
          <div style={{ marginTop: 6, display: "grid", gap: 8 }}>
            {items.map((it: any, i: number) => (
              <div
                key={i}
                style={{
                  padding: "8px 10px",
                  borderRadius: "10px",
                  background: "var(--glass-bg)",
                }}
              >
                {it.title && <p style={{ fontWeight: "bold" }}>{it.title}</p>}
                {it.role && (
                  <p>
                    {it.role} @ {it.company}
                  </p>
                )}
                {it.degree && (
                  <p>
                    {it.degree} – {it.institution}
                  </p>
                )}
                {it.date && (
                  <p style={{ fontSize: "0.8rem", opacity: 0.7 }}>{it.date}</p>
                )}
                {it.description && (
                  <p style={{ marginTop: 4 }}>{it.description}</p>
                )}
                {Array.isArray(it.responsibilities) && (
                  <ul style={{ marginTop: 4, paddingLeft: 16 }}>
                    {it.responsibilities.map((r: string, j: number) => (
                      <li key={j}>{r}</li>
                    ))}
                  </ul>
                )}
                {Array.isArray(it.technologies) && (
                  <p style={{ marginTop: 4 }}>
                    <strong>Tech:</strong> {it.technologies.join(", ")}
                  </p>
                )}
                {Array.isArray(it.skills) && (
                  <ul style={{ marginTop: 4, paddingLeft: 16 }}>
                    {it.skills.map((s: any, j: number) =>
                      typeof s === "string" ? (
                        <li key={j}>{s}</li>
                      ) : (
                        <li key={j}>
                          {s.name} – {s.level}%
                        </li>
                      )
                    )}
                  </ul>
                )}
                {it.liveLink && (
                  <a
                    href={it.liveLink}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "dodgerblue", marginRight: 8 }}
                  >
                    Live
                  </a>
                )}
                {it.githubLink && (
                  <a
                    href={it.githubLink}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "dodgerblue" }}
                  >
                    GitHub
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// ---------- Typing Indicator ----------
const TypingIndicator = () => {
  const colors = ["#FF4C4C", "#4CAF50", "#FFD93D", "#FF8C42", "#3D9CFF"];
  return (
    <div className="typing-indicator">
      {colors.map((c, i) => (
        <span
          key={i}
          className="typing-dot"
          style={{ background: c, animationDelay: `${i * 0.15}s` }}
        ></span>
      ))}
      <style>{`
        .typing-indicator {
          display: flex;
          gap: 6px;
          align-items: flex-end;
          margin: 8px 0;
          height: 16px;
        }
        .typing-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          animation: bounceUpDown 1s infinite ease-in-out;
        }
        @keyframes bounceUpDown {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
};

// ---------- Girl Avatar Button ----------
const GirlAvatar = ({ onClick }: { onClick: () => void }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      onClick={onClick}
      style={{
        width: "80px",
        height: "80px",
        // overflow: "hidden",
        // position: "relative",
        borderRadius: "50%",
        cursor: "pointer",
        boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
        style={{
          position: "absolute",
          bottom: 100,
          left: "50%",
          transform: "translateX(-50%)",
          background: "var(--gradient-primary)",
          color: "white",
          fontSize: "0.8rem",
          padding: "10px 10px",
          borderRadius: "100px",
          whiteSpace: "nowrap",
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        }}
      >
        Chat with me 😊
      </motion.div>
      <img
        src="https://play-lh.googleusercontent.com/pfh4IASs74KV9lEVO5SUp-ZsKasjRMlNLXTtW-bvo932B1yz9iORzul7LVBaN8gGgfw" // 👉 replace with your own image
        alt="Chat Assistant"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "50%",
        }}
      />
      {/* Typing effect overlay */}
    </motion.div>
  );
};

// ---------- MAIN COMPONENT ----------
const ChatWithAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const { isDark } = useTheme();
  const [isMobile, setIsMobile] = useState(false);

  const wsRef = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isBotTyping]);

  // Connect WebSocket
  useEffect(() => {
    if (isOpen) {
      const ws = new WebSocket("wss://dq3x4q2nr1te7.cloudfront.net/ws");
      // const ws = new WebSocket(" ws://13.127.0.49:3000/ws")
      wsRef.current = ws;
      ws.onopen = () => console.log("✅ Connected to WebSocket");
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
      ws.onclose = () => console.log("❌ WebSocket closed");
      return () => ws.close();
    }
  }, [isOpen]);

  // Detect mobile
  useEffect(() => {
    const check = () => window.innerWidth <= 640;
    setIsMobile(check());
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const sendMessage = () => {
    if (!input.trim() || !wsRef.current) return;
    wsRef.current.send(JSON.stringify({ text: input }));
    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setInput("");
    setIsBotTyping(true);
  };

  return (
    <>
      {/* Floating button */}
      {!isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: isMobile ? "1rem" : "2rem",
            right: isMobile ? "1rem" : "2rem",
            zIndex: 1000,
          }}
        >
          <GirlAvatar onClick={() => setIsOpen(true)} />
        </div>
      )}

      {/* Chat Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
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
                background: "rgba(0, 0, 0, 0.6)",
                zIndex: 1998,
              }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              style={{
                position: "fixed",
                ...(isMobile
                  ? { top: 0, height: "100dvh" }
                  : { bottom: 0, height: "600px" }),
                right: 0,
                width: isMobile ? "100vw" : "400px",
                background: "var(--gradient-surface)",
                borderTopLeftRadius: isMobile ? 0 : 20,
                borderTopRightRadius: isMobile ? 0 : 20,
                display: "flex",
                flexDirection: "column",
                zIndex: 1999,
              }}
            >
              {/* Header */}
              <div
                style={{
                  padding: "1rem",
                  background: "var(--gradient-primary)",
                  color: "white",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexShrink: 0,
                  borderTopLeftRadius: isMobile ? 0 : 20,
                  borderTopRightRadius: isMobile ? 0 : 20,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <img
                    src="https://play-lh.googleusercontent.com/pfh4IASs74KV9lEVO5SUp-ZsKasjRMlNLXTtW-bvo932B1yz9iORzul7LVBaN8gGgfw"
                    alt="avatar"
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                  <h3 style={{ margin: 0 }}>AKIRA</h3>
                </div>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  whileHover={{ scale: 1.1 }}
                  style={{
                    background: "rgba(255,255,255,0.2)",
                    border: "none",
                    borderRadius: "50%",
                    width: 32,
                    height: 32,
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  <FaTimes />
                </motion.button>
              </div>

              {/* Messages */}
              <div
                style={{
                  flex: 1,
                  padding: "1rem",
                  overflowY: "auto",
                  background: "transparent",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {messages.length === 0 ? (
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--text-secondary)",
                      fontSize: "1rem",
                      textAlign: "center",
                      padding: "1rem",
                    }}
                  >
                    <p>
                      👋 Hi, I’m Akira. Personal AI Assistant of
                      <br />
                      Mr. Prithviraj. How can I help you today?
                    </p>
                  </div>
                ) : (
                  <>
                    {messages.map((m, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                          marginBottom: "1rem",
                          textAlign: m.sender === "user" ? "right" : "left",
                        }}
                      >
                        <span
                          style={{
                            display: "inline-block",
                            padding: "0.8rem 1.2rem",
                            borderRadius: "18px",
                            background:
                              m.sender === "user"
                                ? "var(--gradient-primary)"
                                : "var(--glass-bg)",
                            color:
                              m.sender === "user"
                                ? "white"
                                : "var(--text-primary)",
                            maxWidth: "70%",
                            wordWrap: "break-word",
                          }}
                        >
                          {m.sender === "bot" ? (
                            <BotMessage text={m.text} />
                          ) : (
                            m.text
                          )}
                        </span>
                      </motion.div>
                    ))}
                    {isBotTyping && <TypingIndicator />}
                    <div ref={messagesEndRef} />
                  </>
                )}
              </div>

              {/* Input */}
              <div
                style={{
                  padding: "0.75rem",
                  display: "flex",
                  gap: "0.5rem",
                  flexShrink: 0,
                  background: "var(--gradient-surface)",
                  paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))",
                }}
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Type your message..."
                  style={{
                    flex: 1,
                    padding: "0.8rem 1rem",
                    borderRadius: "25px",
                    border: "1px solid var(--border-color)",
                  }}
                />
                <motion.button
                  onClick={sendMessage}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    background: "var(--gradient-primary)",
                    color: "white",
                    border: "none",
                    padding: "0.8rem",
                    borderRadius: "50%",
                    cursor: "pointer",
                  }}
                >
                  <FaPaperPlane />
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWithAI;
