import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaComments, FaTimes } from "react-icons/fa";

type Message = { sender: "user" | "bot"; text: string };

const ChatWithAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);

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

  return (
    <>
      {/* Floating button */}
      {!isOpen && (
        <motion.button
          onClick={() => setIsOpen(true)}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            width: "55px",
            height: "55px",
            borderRadius: "50%",
            background: "var(--primary-600)",
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            border: "none",
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
            zIndex: 1000,
          }}
        >
          <FaComments />
        </motion.button>
      )}

      {/* Chat Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Background dim */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "black",
                zIndex: 998,
              }}
              onClick={() => setIsOpen(false)}
            />

            {/* Chatbox */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 20 }}
              style={{
                position: "fixed",
                bottom: 0,
                right: 0,
                width: "400px",
                height: "500px",
                background: "white",
                borderTopLeftRadius: "1rem",
                borderTopRightRadius: "1rem",
                display: "flex",
                flexDirection: "column",
                zIndex: 999,
                boxShadow: "0 -4px 20px rgba(0,0,0,0.2)",
              }}
            >
              {/* Header */}
              <div
                style={{
                  padding: "1rem",
                  background: "var(--primary-600)",
                  color: "white",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderTopLeftRadius: "1rem",
                  borderTopRightRadius: "1rem",
                }}
              >
                <span>AI Assistant</span>
                <FaTimes
                  onClick={() => setIsOpen(false)}
                  style={{ cursor: "pointer" }}
                />
              </div>

              {/* Messages */}
              <div
                style={{
                  flex: 1,
                  padding: "1rem",
                  overflowY: "auto",
                  background: "#fafafa",
                }}
              >
                {messages.map((m, i) => (
                  <div
                    key={i}
                    style={{
                      marginBottom: "0.75rem",
                      textAlign: m.sender === "user" ? "right" : "left",
                    }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        padding: "0.6rem 1rem",
                        borderRadius: "1rem",
                        background:
                          m.sender === "user"
                            ? "var(--primary-600)"
                            : "#e5e5e5",
                        color: m.sender === "user" ? "white" : "black",
                        maxWidth: "80%",
                        wordWrap: "break-word",
                      }}
                    >
                      {m.text}
                    </span>
                  </div>
                ))}

                {/* typing dots */}
                {isBotTyping && (
                  <div style={{ textAlign: "left", margin: "0.5rem 0" }}>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "0.5rem 1rem",
                        borderRadius: "1rem",
                        background: "#e5e5e5",
                        color: "#333",
                      }}
                    >
                      ...
                    </span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div
                style={{
                  padding: "0.5rem",
                  borderTop: "1px solid #ddd",
                  display: "flex",
                  gap: "0.5rem",
                }}
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Type a message..."
                  style={{
                    flex: 1,
                    padding: "0.5rem",
                    borderRadius: "0.5rem",
                    border: "1px solid #ccc",
                  }}
                />
                <button
                  onClick={sendMessage}
                  style={{
                    background: "var(--primary-600)",
                    color: "white",
                    border: "none",
                    padding: "0.5rem 1rem",
                    borderRadius: "0.5rem",
                    cursor: "pointer",
                  }}
                >
                  Send
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWithAI;
