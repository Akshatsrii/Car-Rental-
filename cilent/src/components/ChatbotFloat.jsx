import React, { useState, useRef, useEffect } from "react";
import { useAppContext } from "./context/AppContext";
import toast from "react-hot-toast";

const ChatbotFloat = () => {
  const { axios, token } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "model",
      content: "Hello! I am your AI Ride Assistant. I can estimate fares, help you book, or guide you on tracking. how can I help you today? (नमस्ते! मैं आपकी मदद के लिए तैयार हूँ।)",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // 🔊 TEXT TO SPEECH (Voice Output)
  const speakText = (text) => {
    if (isMuted) return;
    try {
      window.speechSynthesis.cancel(); // Stop ongoing speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-IN";
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.error("Speech Synthesis error:", e);
    }
  };

  // 🎙️ SPEECH TO TEXT (Voice Input Recognition)
  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.error("Speech recognition not supported in this browser.");
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.lang = "en-IN";
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
        toast("🎙️ Listening... Speak into your mic!", { icon: "🎤" });
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
      };

      recognition.onerror = (e) => {
        console.error(e);
        toast.error("Voice capture failed. Try again!");
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (error) {
      console.error(error);
      setIsListening(false);
    }
  };

  const handleSendMessage = async (e) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    try {
      const history = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const { data } = await axios.post("/api/user/chatbot", {
        message: userMessage,
        history,
      });

      if (data.success) {
        setMessages((prev) => [...prev, { role: "model", content: data.response }]);
        // Speak response output
        speakText(data.response);
      } else {
        const fallback = "I am having trouble connecting to my brain. Please ask about fare rates or booking steps!";
        setMessages((prev) => [...prev, { role: "model", content: fallback }]);
        speakText(fallback);
      }
    } catch (error) {
      console.error(error);
      const errFallback = "Connection timeout. Please ensure the server is online!";
      setMessages((prev) => [...prev, { role: "model", content: errFallback }]);
      speakText(errFallback);
    } finally {
      setLoading(false);
    }
  };

  const sendQuickPrompt = (promptText) => {
    setInput(promptText);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* CHAT ICON */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-primary hover:bg-primary-dull text-white rounded-full flex items-center justify-center shadow-2xl transition transform hover:scale-110 active:scale-95 animate-bounce"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
      )}

      {/* CHAT WINDOW */}
      {isOpen && (
        <div className="w-80 sm:w-96 h-[500px] bg-white rounded-3xl shadow-[0px_20px_50px_rgba(0,0,0,0.2)] border border-gray-100 flex flex-col overflow-hidden animate-fadeInUp">
          {/* Header */}
          <div className="bg-primary p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-black">AI</div>
              <div>
                <h4 className="font-bold text-sm">RideAssistant AI</h4>
                <span className="text-[10px] text-green-200 font-semibold uppercase tracking-wider">● Online</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* Speaker Voice Toggle Button */}
              <button
                onClick={() => {
                  setIsMuted(!isMuted);
                  toast.success(isMuted ? "Voice speech synthesis enabled!" : "Voice speech synthesis muted!");
                }}
                className="text-white hover:text-gray-200 transition text-sm font-bold bg-white/10 px-2 py-1 rounded"
              >
                {isMuted ? "🔇 Mute" : "🔊 Speak"}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 transition"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Message List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-primary text-white rounded-tr-none shadow-md"
                      : "bg-white text-gray-800 border rounded-tl-none shadow-sm"
                  }`}
                >
                  {m.content.split("\n").map((line, idx) => (
                    <p key={idx}>{line}</p>
                  ))}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border text-gray-400 px-4 py-3 rounded-2xl rounded-tl-none text-sm shadow-sm flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick replies suggestion buttons */}
          <div className="px-4 py-2 bg-gray-50 flex gap-2 overflow-x-auto border-t text-xs">
            <button
              onClick={() => sendQuickPrompt("What are the pricing rates?")}
              className="bg-white hover:bg-gray-100 text-gray-600 border px-3 py-1.5 rounded-full font-semibold flex-shrink-0 transition"
            >
              💵 Fare Rates
            </button>
            <button
              onClick={() => sendQuickPrompt("How to book a ride?")}
              className="bg-white hover:bg-gray-100 text-gray-600 border px-3 py-1.5 rounded-full font-semibold flex-shrink-0 transition"
            >
              🚗 How to Book?
            </button>
            <button
              onClick={() => sendQuickPrompt("Hindi में बात करें")}
              className="bg-white hover:bg-gray-100 text-gray-600 border px-3 py-1.5 rounded-full font-semibold flex-shrink-0 transition"
            >
              🇮🇳 Hindi Support
            </button>
          </div>

          {/* Input Box */}
          <form onSubmit={handleSendMessage} className="p-3 border-t bg-white flex gap-2 items-center">
            {/*🎙️ Voice Dictation Button */}
            <button
              type="button"
              onClick={handleVoiceInput}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition border ${
                isListening ? "bg-red-50 text-red-500 border-red-200 animate-pulse" : "bg-gray-50 text-gray-500 hover:bg-gray-100"
              }`}
            >
              🎤
            </button>
            <input
              type="text"
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-full text-sm outline-none focus:border-primary transition"
            />
            <button
              type="submit"
              className="w-10 h-10 bg-primary hover:bg-primary-dull text-white rounded-full flex items-center justify-center shadow transition active:scale-95"
            >
              <svg className="w-5 h-5 transform rotate-90" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatbotFloat;
