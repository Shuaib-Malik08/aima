"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import AIChatModal from "./AIChatModal";

export default function ChatButton() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChat = () => {
    setIsOpen(true);
  };

  const handleCloseChat = () => {
    setIsOpen(false);
  };

  const openaiApiKey = process.env.NEXT_PUBLIC_OPENAI_KEY || "";

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={handleOpenChat}
          className="fixed bottom-6 right-6 z-30 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg hover:shadow-xl"
          style={{
            width: 56,
            height: 56,
            background: "linear-gradient(135deg, #7c6af7, #a855f7)",
            borderRadius: "50%",
          }}
          title="Open Chat"
          aria-label="Open AI Chat"
        >
          <MessageCircle size={24} className="text-white" />
        </button>
      )}

      {/* Chat Modal */}
      <AIChatModal isOpen={isOpen} onClose={handleCloseChat} apiKey={openaiApiKey} />
    </>
  );
}
