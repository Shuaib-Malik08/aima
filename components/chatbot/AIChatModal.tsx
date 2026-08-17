// "use client";

// import { useState, useRef, useEffect, useCallback, KeyboardEvent } from "react";
// import {
//   Sparkles,
//   SendHorizontal,
//   X,
//   RotateCcw,
//   Copy,
//   Check,
//   Paperclip,
//   Code2,
//   Atom,
//   PenLine,
//   Layers,
//   AlertTriangle,
//   Square,
//   BotMessageSquare,
// } from "lucide-react";

// // ─── Types ────────────────────────────────────────────────────────────────────

// type Role = "user" | "assistant";

// interface Message {
//   id: string;
//   role: Role;
//   content: string;
//   timestamp: string;
//   isStreaming?: boolean;
// }

// interface SuggestedPrompt {
//   icon: React.ReactNode;
//   label: string;
//   prompt: string;
// }

// // ─── Constants ────────────────────────────────────────────────────────────────

// const API_URL = process.env.NEXT_PUBLIC_OPENAI_KEY ? `https://api.openai.com/v1/chat/completions` : "https://api.openai.com/v1/chat/completions";
// const MODEL = "gpt-4-turbo";
// const MAX_TOKENS = 1024;

// const SUGGESTED_PROMPTS: SuggestedPrompt[] = [
//   {
//     icon: <Code2 size={12} />,
//     label: "Reverse a linked list",
//     prompt: "Write a Python function to reverse a linked list",
//   },
//   {
//     icon: <Atom size={12} />,
//     label: "Quantum entanglement",
//     prompt: "Explain quantum entanglement in simple terms",
//   },
//   {
//     icon: <PenLine size={12} />,
//     label: "Haiku about coding",
//     prompt: "Write a haiku about programming",
//   },
//   {
//     icon: <Layers size={12} />,
//     label: "React 19 best practices",
//     prompt: "What are the best practices in React 19?",
//   },
// ];

// // ─── Helpers ──────────────────────────────────────────────────────────────────

// function uid(): string {
//   return Math.random().toString(36).slice(2, 9);
// }

// function getTime(): string {
//   return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
// }

// function escapeHtml(text: string): string {
//   return text
//     .replace(/&/g, "&amp;")
//     .replace(/</g, "&lt;")
//     .replace(/>/g, "&gt;");
// }

// function formatMarkdown(raw: string): string {
//   let text = escapeHtml(raw);
//   // fenced code blocks
//   text = text.replace(
//     /```(\w+)?\n?([\s\S]*?)```/g,
//     (_, lang, code) =>
//       `<pre class="ai-pre"><code class="language-${lang ?? "text"}">${code.trim()}</code></pre>`
//   );
//   // inline code
//   text = text.replace(/`([^`]+)`/g, '<code class="ai-code">$1</code>');
//   // bold
//   text = text.replace(
//     /\*\*(.*?)\*\*/g,
//     '<strong class="text-gray-200 font-semibold">$1</strong>'
//   );
//   // italic
//   text = text.replace(/\*(.*?)\*/g, '<em class="text-gray-300">$1</em>');
//   // newlines
//   text = text.replace(/\n/g, "<br />");
//   return text;
// }

// // ─── Sub-components ───────────────────────────────────────────────────────────

// function TypingDots() {
//   return (
//     <span className="flex items-center gap-1 h-4">
//       {[0, 1, 2].map((i) => (
//         <span
//           key={i}
//           className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce"
//           style={{ animationDelay: `${i * 150}ms`, animationDuration: "1s" }}
//         />
//       ))}
//     </span>
//   );
// }

// interface CopyButtonProps {
//   text: string;
// }

// function CopyButton({ text }: CopyButtonProps) {
//   const [copied, setCopied] = useState(false);

//   const handleCopy = async () => {
//     await navigator.clipboard.writeText(text);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   return (
//     <button
//       onClick={handleCopy}
//       className="flex items-center gap-1 text-xs text-gray-600 hover:text-gray-300 transition-colors"
//     >
//       {copied ? <Check size={11} /> : <Copy size={11} />}
//       {copied ? "Copied!" : "Copy"}
//     </button>
//   );
// }

// interface UserBubbleProps {
//   message: Message;
// }

// function UserBubble({ message }: UserBubbleProps) {
//   return (
//     <div className="flex justify-end animate-fadeUp">
//       <div className="max-w-[75%]">
//         <div
//           className="px-4 py-3 rounded-2xl rounded-br-sm text-sm leading-relaxed text-white break-words"
//           style={{
//             background: "linear-gradient(135deg, #7c6af7, #8b5cf6)",
//           }}
//         >
//           {message.content.split("\n").map((line, i) => (
//             <span key={i}>
//               {line}
//               {i < message.content.split("\n").length - 1 && <br />}
//             </span>
//           ))}
//         </div>
//         <p className="text-right text-xs mt-1 text-gray-700">{message.timestamp}</p>
//       </div>
//     </div>
//   );
// }

// interface AssistantBubbleProps {
//   message: Message;
// }

// function AssistantBubble({ message }: AssistantBubbleProps) {
//   return (
//     <div className="flex gap-3 animate-fadeUp">
//       {/* Avatar */}
//       <div
//         className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center self-start mt-0.5"
//         style={{ background: "linear-gradient(135deg, #7c6af7, #a855f7)" }}
//       >
//         <Sparkles size={12} className="text-white" />
//       </div>

//       {/* Bubble */}
//       <div className="flex-1 min-w-0">
//         <div
//           className="rounded-2xl rounded-tl-sm px-4 py-3 text-sm leading-relaxed text-gray-300 break-words"
//           style={{
//             background: "rgba(255,255,255,0.04)",
//             border: "1px solid rgba(255,255,255,0.07)",
//           }}
//         >
//           {message.isStreaming ? (
//             <span className="flex items-start gap-1">
//               <span
//                 dangerouslySetInnerHTML={{
//                   __html: formatMarkdown(message.content),
//                 }}
//               />
//               <span className="inline-block w-0.5 h-4 bg-violet-400 ml-0.5 animate-blink flex-shrink-0" />
//             </span>
//           ) : (
//             <span
//               dangerouslySetInnerHTML={{ __html: formatMarkdown(message.content) }}
//             />
//           )}

//           {/* Typing dots when empty + streaming */}
//           {message.isStreaming && message.content === "" && <TypingDots />}
//         </div>

//         <div className="flex items-center gap-2 mt-1">
//           <p className="text-xs text-gray-700">{message.timestamp}</p>
//           {!message.isStreaming && <CopyButton text={message.content} />}
//         </div>
//       </div>
//     </div>
//   );
// }

// interface WelcomeScreenProps {
//   onPromptSelect: (prompt: string) => void;
// }

// function WelcomeScreen({ onPromptSelect }: WelcomeScreenProps) {
//   return (
//     <div className="flex flex-col items-center justify-center py-10 text-center gap-3">
//       <div
//         className="w-14 h-14 rounded-2xl flex items-center justify-center mb-1"
//         style={{
//           background:
//             "linear-gradient(135deg, rgba(124,106,247,0.2), rgba(168,85,247,0.15))",
//           border: "1px solid rgba(124,106,247,0.2)",
//         }}
//       >
//         <BotMessageSquare size={26} className="text-violet-400" />
//       </div>
//       <p className="text-base font-semibold text-white">How can I help you today?</p>
//       <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
//         Ask me anything — code, writing, analysis, or just a conversation.
//       </p>

//       <div className="grid grid-cols-2 gap-2 mt-2 w-full max-w-sm">
//         {SUGGESTED_PROMPTS.map((item) => (
//           <button
//             key={item.prompt}
//             onClick={() => onPromptSelect(item.prompt)}
//             className="flex items-center gap-1.5 text-left px-3 py-2.5 rounded-xl text-xs text-gray-400 transition-all hover:bg-white/[0.07] hover:text-gray-200"
//             style={{
//               background: "rgba(255,255,255,0.04)",
//               border: "1px solid rgba(255,255,255,0.07)",
//             }}
//           >
//             <span className="flex-shrink-0 opacity-60">{item.icon}</span>
//             {item.label}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

// interface ToastProps {
//   message: string;
//   onClose: () => void;
// }

// function Toast({ message, onClose }: ToastProps) {
//   useEffect(() => {
//     const t = setTimeout(onClose, 4000);
//     return () => clearTimeout(t);
//   }, [onClose]);

//   return (
//     <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 animate-fadeUp">
//       <div
//         className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm"
//         style={{
//           background: "rgba(239,68,68,0.15)",
//           border: "1px solid rgba(239,68,68,0.25)",
//           color: "#fca5a5",
//         }}
//       >
//         <AlertTriangle size={14} />
//         <span>{message.length > 70 ? message.slice(0, 70) + "…" : message}</span>
//       </div>
//     </div>
//   );
// }

// // ─── Main Component ───────────────────────────────────────────────────────────

// interface AIChatModalProps {
//   apiKey?: string;        // pass from env or server prop
//   isOpen?: boolean;
//   onClose?: () => void;
// }

// export default function AIChatModal({
//   apiKey = "",
//   isOpen = true,
//   onClose,
// }: AIChatModalProps) {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState("");
//   const [isStreaming, setIsStreaming] = useState(false);
//   const [toast, setToast] = useState<string | null>(null);
//   const [visible, setVisible] = useState(isOpen);

//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const textareaRef = useRef<HTMLTextAreaElement>(null);
//   const historyRef = useRef<Array<{ role: Role; content: string }>>([]);

//   // ── Sync visible state with isOpen prop ─────────────────────────────────────

//   useEffect(() => {
//     setVisible(isOpen);
//   }, [isOpen]);

//   // ── Scroll ──────────────────────────────────────────────────────────────────

//   const scrollToBottom = useCallback((smooth = true) => {
//     messagesEndRef.current?.scrollIntoView({
//       behavior: smooth ? "smooth" : "instant",
//     });
//   }, []);

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages, scrollToBottom]);

//   // ── Textarea auto-resize ─────────────────────────────────────────────────────

//   const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setInput(e.target.value);
//     const el = e.target;
//     el.style.height = "auto";
//     el.style.height = Math.min(el.scrollHeight, 160) + "px";
//   };

//   const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       sendMessage();
//     }
//   };

//   // ── Clear ────────────────────────────────────────────────────────────────────

//   const clearChat = () => {
//     if (isStreaming) return;
//     setMessages([]);
//     historyRef.current = [];
//   };

//   // ── Close ─────────────────────────────────────────────────────────────────────

//   const handleClose = () => {
//     setVisible(false);
//     onClose?.();
//   };

//   // ── Send & Stream ────────────────────────────────────────────────────────────

//   const sendMessage = useCallback(async (overrideText?: string) => {
//     const text = (overrideText ?? input).trim();
//     if (!text || isStreaming) return;

//     setInput("");
//     if (textareaRef.current) {
//       textareaRef.current.style.height = "auto";
//     }

//     const userMsg: Message = {
//       id: uid(),
//       role: "user",
//       content: text,
//       timestamp: getTime(),
//     };

//     const assistantId = uid();
//     const assistantMsg: Message = {
//       id: assistantId,
//       role: "assistant",
//       content: "",
//       timestamp: getTime(),
//       isStreaming: true,
//     };

//     historyRef.current = [...historyRef.current, { role: "user", content: text }];
//     setMessages((prev) => [...prev, userMsg, assistantMsg]);
//     setIsStreaming(true);

//     let fullText = "";

//     try {
//       const res = await fetch(API_URL, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${apiKey}`,
//         },
//         body: JSON.stringify({
//           model: MODEL,
//           max_tokens: MAX_TOKENS,
//           stream: true,
//           messages: [
//             {
//               role: "system",
//               content: "You are a helpful, harmless, and honest AI assistant. Be concise and use markdown for code.",
//             },
//             ...historyRef.current,
//           ],
//         }),
//       });

//       if (!res.ok) {
//         const err = await res.json();
//         throw new Error(err?.error?.message ?? `HTTP ${res.status}`);
//       }

//       const reader = res.body!.getReader();
//       const decoder = new TextDecoder();
//       let buffer = "";

//       while (true) {
//         const { done, value } = await reader.read();
//         if (done) break;

//         buffer += decoder.decode(value, { stream: true });
//         const lines = buffer.split("\n");
//         buffer = lines.pop() ?? "";

//         for (const line of lines) {
//           if (!line.startsWith("data: ")) continue;
//           const raw = line.slice(6).trim();
//           if (raw === "[DONE]") break;

//           try {
//             const parsed = JSON.parse(raw);
//             const delta = parsed.choices?.[0]?.delta;
//             if (delta?.content) {
//               fullText += delta.content;
//               setMessages((prev) =>
//                 prev.map((m) =>
//                   m.id === assistantId
//                     ? { ...m, content: fullText }
//                     : m
//                 )
//               );
//               scrollToBottom(false);
//             }
//           } catch {
//             // skip malformed chunks
//           }
//         }
//       }

//       historyRef.current = [
//         ...historyRef.current,
//         { role: "assistant", content: fullText },
//       ];

//       setMessages((prev) =>
//         prev.map((m) =>
//           m.id === assistantId ? { ...m, isStreaming: false } : m
//         )
//       );
//     } catch (err) {
//       const msg = err instanceof Error ? err.message : "Unknown error";
//       setToast(msg);
//       setMessages((prev) =>
//         prev.map((m) =>
//           m.id === assistantId
//             ? {
//                 ...m,
//                 content: apiKey
//                   ? msg
//                   : "⚠ No API key — pass `apiKey` prop or set NEXT_PUBLIC_OPENAI_KEY.",
//                 isStreaming: false,
//               }
//             : m
//         )
//       );
//       historyRef.current = historyRef.current.slice(0, -1);
//     } finally {
//       setIsStreaming(false);
//     }
//   }, [input, isStreaming, apiKey, scrollToBottom]);

//   const handlePromptSelect = (prompt: string) => {
//     sendMessage(prompt);
//   };

//   // ── Render ───────────────────────────────────────────────────────────────────

//   if (!visible) return null;

//   return (
//     <>
//       {/* Global styles injected once */}
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
//         .ai-chat-root { font-family: 'DM Sans', sans-serif; }
//         .ai-chat-root * { box-sizing: border-box; }
//         @keyframes fadeUp {
//           from { opacity: 0; transform: translateY(8px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes blink {
//           0%, 100% { opacity: 1; }
//           50%       { opacity: 0; }
//         }
//         .animate-fadeUp { animation: fadeUp 0.22s ease-out forwards; }
//         .animate-blink  { animation: blink 0.9s step-end infinite; }
//         .ai-pre {
//           background: rgba(0,0,0,0.4);
//           border: 1px solid rgba(255,255,255,0.08);
//           border-radius: 8px;
//           padding: 12px 14px;
//           overflow-x: auto;
//           margin: 8px 0;
//           font-family: 'JetBrains Mono', monospace;
//           font-size: 0.78em;
//           line-height: 1.65;
//           color: #c5c5d9;
//         }
//         .ai-code {
//           background: rgba(124,106,247,0.12);
//           border: 1px solid rgba(124,106,247,0.2);
//           border-radius: 4px;
//           padding: 1px 5px;
//           font-family: 'JetBrains Mono', monospace;
//           font-size: 0.8em;
//           color: #a899ff;
//         }
//         .chat-messages::-webkit-scrollbar { width: 4px; }
//         .chat-messages::-webkit-scrollbar-track { background: transparent; }
//         .chat-messages::-webkit-scrollbar-thumb { background: #2c2c3d; border-radius: 99px; }
//         .chat-textarea { resize: none; font-family: 'DM Sans', sans-serif; }
//         .chat-textarea:focus { outline: none; }
//         .send-btn-active:hover { transform: scale(1.07); box-shadow: 0 0 16px rgba(124,106,247,0.4); }
//         .send-btn-active:active { transform: scale(0.95); }
//       `}</style>

//       {/* Backdrop */}
//       <div
//         className="fixed inset-0 z-40"
//         // style={{ background: "rgba(0,0,0,0.3)", backdropFilter: "blur(2px)" }}
//         onClick={(e) => e.target === e.currentTarget && handleClose()}
//       >
//         {/* Ambient blobs */}
//         <div
//           className="pointer-events-none fixed"
//           style={{
//             width: 300,
//             height: 300,
//             borderRadius: "50%",
//             background:
//               "radial-gradient(circle, rgba(124,106,247,0.07) 0%, transparent 70%)",
//             // top: -150,
//             // left: -80,
//           }}
//         />
//         <div
//           className="pointer-events-none fixed"
//           style={{
//             width: 200,
//             height: 200,
//             borderRadius: "50%",
//             background:
//               "radial-gradient(circle, rgba(79,209,160,0.04) 0%, transparent 70%)",
//             bottom: -100,
//             right: -60,
//           }}
//         />

//         {/* Modal - Bottom Right Position */}
//         <div
//           className="ai-chat-root absolute z-50 flex flex-col rounded-2xl shadow-2xl animate-fadeUp"
//           style={{
//             width: 420,
//             height: "min(600px, 85vh)",
//             background: "rgba(19,19,26,0.95)",
//             backdropFilter: "blur(24px) saturate(1.4)",
//             border: "1px solid rgba(255,255,255,0.07)",
//             bottom: 24,
//             right: 24,
//           }}
//         >
//           {/* Toast */}
//           {toast && (
//             <Toast message={toast} onClose={() => setToast(null)} />
//           )}

//           {/* ── Header ─────────────────────────────────────────────────────── */}
//           <div
//             className="flex items-center justify-between px-5 py-4 flex-shrink-0"
//             style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
//           >
//             <div className="flex items-center gap-3">
//               {/* Avatar */}
           

//               {/* Name + status */}
//               <div>
//                 <p className="text-sm font-semibold text-white leading-tight">
//                   Aiima AI
//                 </p>
//                 <div className="flex items-center gap-1.5 mt-0.5">
//                   {/* <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> */}
//                   {/* <span
//                     className="text-xs text-gray-500"
//                     style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10 }}
//                   >
//                     {MODEL}
//                   </span> */}
//                 </div>
//               </div>
//             </div>

//             {/* Actions */}
//             <div className="flex items-center gap-1">
//               <button
//                 onClick={clearChat}
//                 disabled={isStreaming}
//                 className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-white/5 disabled:opacity-30"
//                 title="Clear chat"
//               >
//                 <RotateCcw size={15} className="text-gray-500" />
//               </button>
//               <button
//                 onClick={handleClose}
//                 className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-white/5"
//                 title="Close"
//               >
//                 <X size={15} className="text-gray-500" />
//               </button>
//             </div>
//           </div>

//           {/* ── Messages ───────────────────────────────────────────────────── */}
//           <div className="chat-messages flex-1 overflow-y-auto px-5 py-4 space-y-5">
//             {messages.length === 0 ? (
//               <WelcomeScreen onPromptSelect={handlePromptSelect} />
//             ) : (
//               messages.map((msg) =>
//                 msg.role === "user" ? (
//                   <UserBubble key={msg.id} message={msg} />
//                 ) : (
//                   <AssistantBubble key={msg.id} message={msg} />
//                 )
//               )
//             )}
//             <div ref={messagesEndRef} />
//           </div>

//           {/* ── Input ──────────────────────────────────────────────────────── */}
//           <div className="px-4 pb-4 pt-2 flex-shrink-0">
//             <div
//               className="flex items-end gap-3 rounded-xl px-3 py-2.5 transition-all"
//               style={{
//                 background: "rgba(255,255,255,0.04)",
//                 border: "1px solid rgba(255,255,255,0.08)",
//               }}
//             >
//               <textarea
//                 ref={textareaRef}
//                 value={input}
//                 onChange={handleInputChange}
//                 onKeyDown={handleKeyDown}
//                 placeholder="Message…"
//                 rows={1}
//                 className="chat-textarea flex-1 bg-transparent text-sm text-white placeholder-gray-600 py-0.5 leading-relaxed"
//                 style={{ minHeight: 24, maxHeight: 160 }}
//               />

//               <div className="flex items-center gap-2 flex-shrink-0 pb-0.5">
//                 {/* Attach (decorative) */}
//                 <button className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/5 transition-colors">
//                   <Paperclip size={14} className="text-gray-600" />
//                 </button>

//                 {/* Send */}
//                 <button
//                   onClick={() => sendMessage()}
//                   disabled={!input.trim() || isStreaming}
//                   title={isStreaming ? "Generating…" : "Send (Enter)"}
//                   className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${
//                     input.trim() && !isStreaming
//                       ? "send-btn-active cursor-pointer"
//                       : "opacity-40 cursor-not-allowed"
//                   }`}
//                   style={{
//                     background: "linear-gradient(135deg, #7c6af7, #9b6cf7)",
//                   }}
//                 >
//                   {isStreaming ? (
//                     <Square size={12} className="text-white fill-white" />
//                   ) : (
//                     <SendHorizontal size={14} className="text-white" />
//                   )}
//                 </button>
//               </div>
//             </div>

//             <p className="text-center text-xs mt-2 text-gray-700">
//               Press <kbd className="px-1 py-0.5 rounded text-gray-600 text-xs" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>Enter</kbd> to send ·{" "}
//               <kbd className="px-1 py-0.5 rounded text-gray-600 text-xs" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>Shift+Enter</kbd> for newline
//             </p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }


"use client";

import { useState, useRef, useEffect, useCallback, KeyboardEvent } from "react";
import {
  Sparkles,
  SendHorizontal,
  X,
  RotateCcw,
  Copy,
  Check,
  Paperclip,
  Code2,
  Atom,
  PenLine,
  Layers,
  AlertTriangle,
  Square,
  BotMessageSquare,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Role = "user" | "assistant";

interface Message {
  id: string;
  role: Role;
  content: string;
  timestamp: string;
  isStreaming?: boolean;
}

interface SuggestedPrompt {
  icon: React.ReactNode;
  label: string;
  prompt: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const API_URL = process.env.NEXT_PUBLIC_OPENAI_KEY ? `https://api.openai.com/v1/chat/completions` : "https://api.openai.com/v1/chat/completions";
const MODEL = "gpt-4-turbo";
const MAX_TOKENS = 1024;




const SUGGESTED_PROMPTS: SuggestedPrompt[] = [
  {
    icon: <Atom size={12} />,
    label: "About AIMA",
    prompt: "Tell me about AIMA and its services",
  },
  {
    icon: <Layers size={12} />,
    label: "MAT Exam",
    prompt: "What is MAT and how do I apply?",
  },
  {
    icon: <PenLine size={12} />,
    label: "Membership",
    prompt: "What are the benefits of AIMA membership?",
  },
  {
    icon: <Code2 size={12} />,
    label: "Executive Programs",
    prompt: "Show executive education and leadership programs offered by AIMA",
  },
];


// ─── Helpers ──────────────────────────────────────────────────────────────────

function uid(): string {
  return Math.random().toString(36).slice(2, 9);
}

function getTime(): string {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function formatMarkdown(raw: string): string {
  let text = escapeHtml(raw);
  // fenced code blocks
  text = text.replace(
    /```(\w+)?\n?([\s\S]*?)```/g,
    (_, lang, code) =>
      `<pre class="ai-pre"><code class="language-${lang ?? "text"}">${code.trim()}</code></pre>`
  );
  // inline code
  text = text.replace(/`([^`]+)`/g, '<code class="ai-code">$1</code>');
  // bold
  text = text.replace(
    /\*\*(.*?)\*\*/g,
    '<strong class="text-gray-200 font-semibold">$1</strong>'
  );
  // italic
  text = text.replace(/\*(.*?)\*/g, '<em class="text-gray-300">$1</em>');
  // newlines
  text = text.replace(/\n/g, "<br />");
  return text;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function TypingDots() {
  return (
    <span className="flex items-center gap-1 h-4">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce"
          style={{ animationDelay: `${i * 150}ms`, animationDuration: "1s" }}
        />
      ))}
    </span>
  );
}

interface CopyButtonProps {
  text: string;
}

function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1 text-xs text-gray-600 hover:text-gray-300 transition-colors"
    >
      {copied ? <Check size={11} /> : <Copy size={11} />}
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

interface UserBubbleProps {
  message: Message;
}

function UserBubble({ message }: UserBubbleProps) {
  return (
    <div className="flex justify-end animate-fadeUp">
      <div className="max-w-[75%]">
        <div
          className="px-4 py-3 rounded-2xl rounded-br-sm text-sm leading-relaxed text-white break-words"
          style={{
            background: "linear-gradient(135deg, #7c6af7, #8b5cf6)",
          }}
        >
          {message.content.split("\n").map((line, i) => (
            <span key={i}>
              {line}
              {i < message.content.split("\n").length - 1 && <br />}
            </span>
          ))}
        </div>
        <p className="text-right text-xs mt-1 text-gray-700">{message.timestamp}</p>
      </div>
    </div>
  );
}

interface AssistantBubbleProps {
  message: Message;
}

function AssistantBubble({ message }: AssistantBubbleProps) {
  return (
    <div className="flex gap-3 animate-fadeUp">
      {/* Avatar */}
      <div
        className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center self-start mt-0.5"
        style={{ background: "linear-gradient(135deg, #7c6af7, #a855f7)" }}
      >
        <Sparkles size={12} className="text-white" />
      </div>

      {/* Bubble */}
      <div className="flex-1 min-w-0">
        <div
          className="rounded-2xl rounded-tl-sm px-4 py-3 text-sm leading-relaxed text-gray-300 break-words"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {message.isStreaming ? (
            <span className="flex items-start gap-1">
              <span
                dangerouslySetInnerHTML={{
                  __html: formatMarkdown(message.content),
                }}
              />
              <span className="inline-block w-0.5 h-4 bg-violet-400 ml-0.5 animate-blink flex-shrink-0" />
            </span>
          ) : (
            <span
              dangerouslySetInnerHTML={{ __html: formatMarkdown(message.content) }}
            />
          )}

          {/* Typing dots when empty + streaming */}
          {message.isStreaming && message.content === "" && <TypingDots />}
        </div>

        <div className="flex items-center gap-2 mt-1">
          <p className="text-xs text-gray-700">{message.timestamp}</p>
          {!message.isStreaming && <CopyButton text={message.content} />}
        </div>
      </div>
    </div>
  );
}

interface WelcomeScreenProps {
  onPromptSelect: (prompt: string) => void;
}

function WelcomeScreen({ onPromptSelect }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center gap-3">
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-1"
        style={{
          background:
            "linear-gradient(135deg, rgba(124,106,247,0.2), rgba(168,85,247,0.15))",
          border: "1px solid rgba(124,106,247,0.2)",
        }}
      >
        <BotMessageSquare size={26} className="text-violet-400" />
      </div>





      <p className="text-base font-semibold text-white">
  Welcome to AIMA AI Assistant
</p>

<p className="text-sm text-gray-500 max-w-xs leading-relaxed">
  Explore AIMA programs, memberships, MAT, executive education,
  professional development courses, conferences and training programs.
</p>




      <div className="grid grid-cols-2 gap-2 mt-2 w-full max-w-sm">
        {SUGGESTED_PROMPTS.map((item) => (
          <button
            key={item.prompt}
            onClick={() => onPromptSelect(item.prompt)}
            className="flex items-center gap-1.5 text-left px-3 py-2.5 rounded-xl text-xs text-gray-400 transition-all hover:bg-white/[0.07] hover:text-gray-200"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <span className="flex-shrink-0 opacity-60">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

interface ToastProps {
  message: string;
  onClose: () => void;
}

function Toast({ message, onClose }: ToastProps) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 animate-fadeUp">
      <div
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm"
        style={{
          background: "rgba(239,68,68,0.15)",
          border: "1px solid rgba(239,68,68,0.25)",
          color: "#fca5a5",
        }}
      >
        <AlertTriangle size={14} />
        <span>{message.length > 70 ? message.slice(0, 70) + "…" : message}</span>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

interface AIChatModalProps {
  apiKey?: string;        // pass from env or server prop
  isOpen?: boolean;
  onClose?: () => void;
}

export default function AIChatModal({
  apiKey = "",
  isOpen = true,
  onClose,
}: AIChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [visible, setVisible] = useState(isOpen);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const historyRef = useRef<Array<{ role: Role; content: string }>>([]);

  // ── Sync visible state with isOpen prop ─────────────────────────────────────

  useEffect(() => {
    setVisible(isOpen);
  }, [isOpen]);

  // ── Scroll ──────────────────────────────────────────────────────────────────

  const scrollToBottom = useCallback((smooth = true) => {
    messagesEndRef.current?.scrollIntoView({
      behavior: smooth ? "smooth" : "instant",
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // ── Textarea auto-resize ─────────────────────────────────────────────────────

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    const el = e.target;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 160) + "px";
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // ── Clear ────────────────────────────────────────────────────────────────────

  const clearChat = () => {
    if (isStreaming) return;
    setMessages([]);
    historyRef.current = [];
  };

  // ── Close ─────────────────────────────────────────────────────────────────────

  const handleClose = () => {
    setVisible(false);
    onClose?.();
  };

  // ── Send & Stream ────────────────────────────────────────────────────────────

  const sendMessage = useCallback(async (overrideText?: string) => {
    const text = (overrideText ?? input).trim();
    if (!text || isStreaming) return;

    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    const userMsg: Message = {
      id: uid(),
      role: "user",
      content: text,
      timestamp: getTime(),
    };

    const assistantId = uid();
    const assistantMsg: Message = {
      id: assistantId,
      role: "assistant",
      content: "",
      timestamp: getTime(),
      isStreaming: true,
    };

    historyRef.current = [...historyRef.current, { role: "user", content: text }];
    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setIsStreaming(true);

    let fullText = "";

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: MODEL,
          max_tokens: MAX_TOKENS,
          stream: true,
          messages: [
{
  role: "system",
  content: `
You are AIMA AI Assistant, the official virtual assistant for the All India Management Association (AIMA).

Your role is to assist users with information related to:

• AIMA Memberships
• MAT Examination
• Management Education
• Executive Education
• Leadership Programs
• Professional Certifications
• Conferences and Events
• Training and Development Programs
• Corporate Learning Solutions
• Skill Development Initiatives

Instructions:

1. Always maintain a professional, courteous and positive tone.
2. Focus on official AIMA offerings and services.
3. Highlight opportunities, benefits and educational value.
4. When information is unavailable, politely direct users to the official AIMA website.
5. Never speculate or provide unverified information.
6. For questions about AIMA, prioritize official information.
7. Keep responses concise, professional and informative.
8. Mention relevant AIMA programs when appropriate.

AIMA Overview:

- Established in 1957
- Apex body of management profession in India
- Professional management association
- Provides management education, testing, executive development and training

Official Website:
https://www.aima.in

If asked unrelated questions, answer normally while maintaining a professional tone.
`,
},            ...historyRef.current,
          ],
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.error?.message ?? `HTTP ${res.status}`);
      }

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const raw = line.slice(6).trim();
          if (raw === "[DONE]") break;

          try {
            const parsed = JSON.parse(raw);
            const delta = parsed.choices?.[0]?.delta;
            if (delta?.content) {
              fullText += delta.content;
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantId
                    ? { ...m, content: fullText }
                    : m
                )
              );
              scrollToBottom(false);
            }
          } catch {
            // skip malformed chunks
          }
        }
      }

      historyRef.current = [
        ...historyRef.current,
        { role: "assistant", content: fullText },
      ];

      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId ? { ...m, isStreaming: false } : m
        )
      );
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      setToast(msg);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? {
                ...m,
                content: apiKey
                  ? msg
                  : "⚠ No API key — pass `apiKey` prop or set NEXT_PUBLIC_OPENAI_KEY.",
                isStreaming: false,
              }
            : m
        )
      );
      historyRef.current = historyRef.current.slice(0, -1);
    } finally {
      setIsStreaming(false);
    }
  }, [input, isStreaming, apiKey, scrollToBottom]);

  const handlePromptSelect = (prompt: string) => {
    sendMessage(prompt);
  };

  // ── Render ───────────────────────────────────────────────────────────────────

  if (!visible) return null;

  return (
    <>
      {/* Global styles injected once */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        .ai-chat-root { font-family: 'DM Sans', sans-serif; }
        .ai-chat-root * { box-sizing: border-box; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        .animate-fadeUp { animation: fadeUp 0.22s ease-out forwards; }
        .animate-blink  { animation: blink 0.9s step-end infinite; }
        .ai-pre {
          background: rgba(0,0,0,0.4);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 8px;
          padding: 12px 14px;
          overflow-x: auto;
          margin: 8px 0;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.78em;
          line-height: 1.65;
          color: #c5c5d9;
        }
        .ai-code {
          background: rgba(124,106,247,0.12);
          border: 1px solid rgba(124,106,247,0.2);
          border-radius: 4px;
          padding: 1px 5px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8em;
          color: #a899ff;
        }
        .chat-messages::-webkit-scrollbar { width: 4px; }
        .chat-messages::-webkit-scrollbar-track { background: transparent; }
        .chat-messages::-webkit-scrollbar-thumb { background: #2c2c3d; border-radius: 99px; }
        .chat-textarea { resize: none; font-family: 'DM Sans', sans-serif; }
        .chat-textarea:focus { outline: none; }
        .send-btn-active:hover { transform: scale(1.07); box-shadow: 0 0 16px rgba(124,106,247,0.4); }
        .send-btn-active:active { transform: scale(0.95); }
      `}</style>

      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40"
        // style={{ background: "rgba(0,0,0,0.3)", backdropFilter: "blur(2px)" }}
        onClick={(e) => e.target === e.currentTarget && handleClose()}
      >
        {/* Ambient blobs */}
        <div
          className="pointer-events-none fixed"
          style={{
            width: 300,
            height: 300,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(124,106,247,0.07) 0%, transparent 70%)",
            // top: -150,
            // left: -80,
          }}
        />
        <div
          className="pointer-events-none fixed"
          style={{
            width: 200,
            height: 200,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(79,209,160,0.04) 0%, transparent 70%)",
            bottom: -100,
            right: -60,
          }}
        />

        {/* Modal - Bottom Right Position */}
        <div
          className="ai-chat-root absolute z-50 flex flex-col rounded-2xl shadow-2xl animate-fadeUp"
          style={{
            width: 420,
            height: "min(600px, 85vh)",
            background: "rgba(19,19,26,0.95)",
            backdropFilter: "blur(24px) saturate(1.4)",
            border: "1px solid rgba(255,255,255,0.07)",
            bottom: 24,
            right: 24,
          }}
        >
          {/* Toast */}
          {toast && (
            <Toast message={toast} onClose={() => setToast(null)} />
          )}

          {/* ── Header ─────────────────────────────────────────────────────── */}
          <div
            className="flex items-center justify-between px-5 py-4 flex-shrink-0"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="flex items-center gap-3">
              {/* Avatar */}
           

              {/* Name + status */}
              <div>
                <p className="text-sm font-semibold text-white leading-tight">
                  AIMA AI Assistant
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  {/* <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> */}
                  {/* <span
                    className="text-xs text-gray-500"
                    style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10 }}
                  >
                    {MODEL}
                  </span> */}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1">
              <button
                onClick={clearChat}
                disabled={isStreaming}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-white/5 disabled:opacity-30"
                title="Clear chat"
              >
                <RotateCcw size={15} className="text-gray-500" />
              </button>
              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-white/5"
                title="Close"
              >
                <X size={15} className="text-gray-500" />
              </button>
            </div>
          </div>

          {/* ── Messages ───────────────────────────────────────────────────── */}
          <div className="chat-messages flex-1 overflow-y-auto px-5 py-4 space-y-5">
            {messages.length === 0 ? (
              <WelcomeScreen onPromptSelect={handlePromptSelect} />
            ) : (
              messages.map((msg) =>
                msg.role === "user" ? (
                  <UserBubble key={msg.id} message={msg} />
                ) : (
                  <AssistantBubble key={msg.id} message={msg} />
                )
              )
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* ── Input ──────────────────────────────────────────────────────── */}
          <div className="px-4 pb-4 pt-2 flex-shrink-0">
            <div
              className="flex items-end gap-3 rounded-xl px-3 py-2.5 transition-all"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <textarea
                ref={textareaRef}
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Ask about AIMA programs, MAT, memberships, events or training..."
                rows={1}
                className="chat-textarea flex-1 bg-transparent text-sm text-white placeholder-gray-600 py-0.5 leading-relaxed"
                style={{ minHeight: 24, maxHeight: 160 }}
              />

              <div className="flex items-center gap-2 flex-shrink-0 pb-0.5">
                {/* Attach (decorative) */}
                <button className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/5 transition-colors">
                  <Paperclip size={14} className="text-gray-600" />
                </button>

                {/* Send */}
                <button
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || isStreaming}
                  title={isStreaming ? "Generating…" : "Send (Enter)"}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${
                    input.trim() && !isStreaming
                      ? "send-btn-active cursor-pointer"
                      : "opacity-40 cursor-not-allowed"
                  }`}
                  style={{
                    background: "linear-gradient(135deg, #7c6af7, #9b6cf7)",
                  }}
                >
                  {isStreaming ? (
                    <Square size={12} className="text-white fill-white" />
                  ) : (
                    <SendHorizontal size={14} className="text-white" />
                  )}
                </button>
              </div>
            </div>

            <p className="text-center text-xs mt-2 text-gray-700">
              Press <kbd className="px-1 py-0.5 rounded text-gray-600 text-xs" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>Enter</kbd> to send ·{" "}
              <kbd className="px-1 py-0.5 rounded text-gray-600 text-xs" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>Shift+Enter</kbd> for newline
            </p>
          </div>
        </div>
      </div>
    </>
  );
}