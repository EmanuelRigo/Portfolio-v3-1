"use client";

import { useState, useEffect, useRef, FormEvent } from 'react';
import { Send, X, MessageSquare, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ChatMessage } from '@/types';

interface ChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatWidget({ isOpen, onClose }: ChatWidgetProps) {
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: '¡Buenas!, Soy Emanuel AI 🤖, el gemelo digital de Emanuel Rigo. Estoy listo para contestar tus dudas técnicas sobre mis proyectos, estudios o disponibilidad. ¿En qué te puedo dar una mano?',
      timestamp: '10:00'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isTyping]);

  const selectPrebuiltPrompt = (text: string) => {
    setChatInput(text);
  };

  const handleSendMessage = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim() || isTyping) return;

    const userText = chatInput.trim();
    setChatInput('');

    // Append user message immediately
    const userMsg: ChatMessage = {
      role: 'user',
      content: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChatMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    try {
     const historyPayload = chatMessages
  .slice(-6)
  .map(m => ({
    role: m.role,
    content: m.content
  }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: userText,
          history: historyPayload
        })
      });

      const data = await res.json();
      
      setIsTyping(false);
      const assistantMsg: ChatMessage = {
        role: 'assistant',
        content: data.text || 'Disculpá, che, no logré procesar esa respuesta. ¿Podés volver a intentar?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, assistantMsg]);

    } catch (err) {
      console.error(err);
      setIsTyping(false);
      const errorMsg: ChatMessage = {
        role: 'assistant',
        content: 'Hubo una caída temporal de red, pero recordá que podés contactar directamente a Emanuel Rigo escribiendo a: **emanuel.r-dev@outlook.com**.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, errorMsg]);
    }
  };

  const handleResetChat = () => {
    setChatMessages([
      {
        role: 'assistant',
        content: '¡Buenas!, Soy Emanuel AI 🤖, el gemelo digital de Emanuel Rigo. Estoy listo para contestar tus dudas técnicas sobre mis proyectos, estudios o disponibilidad. ¿En qué te voy de ayuda?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          id="chatbot-wrapper-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-surface-charcoal/85 backdrop-blur-md flex items-center justify-center p-4 z-40"
        >
          <motion.div 
            id="chatbot-container"
            initial={{ scale: 0.95, y: 15 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 15 }}
            className="bg-surface-slate border border-border-subtle w-full max-w-2xl h-[580px] rounded-3xl overflow-hidden flex flex-col shadow-2xl"
          >
            
            {/* Chat Header */}
            <div className="p-5 border-b border-border-subtle bg-surface-charcoal/90 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img 
                    alt="Emanuel Portrait" 
                    className="w-10 h-10 rounded-xl object-cover border border-primary-container/20" 
                    src="https://lh3.googleusercontent.com/aida/AP1WRLuhsL8pA36-K1DwwdFZBuXUBnCBfiu-zM-xdjBVfp4GlnwhKcETVZ9_uesmHWrdggIiYzlLOmMrFCWEUWmJ9z82W0dGY7gzJ2LrIQm12UjvLQlyBoZDOxdtBjPB15AF-9VZ02pAiOLpkiAXHkfJGH_SoyiJKNKKkGZp86CoQ-u5Ol30yyXnrJdnuR9eOxH9qQc9MILeVhrHTb2aUNM_t_jWoFOKhZ6UNiS4wbMATaGpr08diCqM7vc62fc"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-surface-slate rounded-full animate-ping" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-serif text-sm font-bold text-on-surface">Emanuel AI</h4>
                    <span className="text-[9px] bg-primary-container/15 text-primary-container font-mono px-1.5 py-0.5 rounded font-black uppercase tracking-wider">
                      AI Assistant
                    </span>
                  </div>
                  <p className="text-[10px] text-text-muted">Representante Virtual • Interactivo</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={handleResetChat}
                  className="p-1 px-2 border border-border-subtle rounded text-[9px] text-text-muted hover:text-white cursor-pointer"
                  title="Reiniciar chat"
                >
                  REINICIAR
                </button>
                <button 
                  onClick={onClose}
                  className="p-2 border border-border-subtle rounded-xl text-text-muted hover:text-primary-container hover:bg-surface-charcoal transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-grow p-6 overflow-y-auto custom-scrollbar space-y-4 bg-linear-to-b from-transparent to-surface-charcoal/10 font-sans text-xs sm:text-sm">
              {chatMessages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] rounded-2xl p-4 space-y-1 ${
                    msg.role === 'user' 
                      ? 'bg-primary-container text-on-primary rounded-tr-none font-semibold' 
                      : 'bg-surface-slate border border-border-subtle text-on-surface rounded-tl-none'
                  }`}>
                    <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                    <p className={`text-[9px] text-right ${
                      msg.role === 'user' ? 'text-on-primary/70' : 'text-text-muted font-mono'
                    }`}>
                      {msg.timestamp}
                    </p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-surface-slate border border-border-subtle rounded-2xl p-4 rounded-tl-none flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-primary-container rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1.5 h-1.5 bg-primary-container rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1.5 h-1.5 bg-primary-container rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              
              <div ref={chatBottomRef} />
            </div>

            {/* Quick pills prompts */}
            <div className="p-3 bg-surface-charcoal/30 border-t border-border-subtle flex flex-wrap gap-1.5 font-sans">
              {[
               '🚀 ¿Cuáles son tus proyectos destacados?',
  '💻 ¿Qué tecnologías dominás?',
  '📚 ¿Qué estás estudiando actualmente?',
  '💼 ¿Buscás trabajo actualmente?',
  '📧 ¿Cómo te puedo contactar?'
              ].map(pItem => (
                <button 
                  key={pItem}
                  onClick={() => selectPrebuiltPrompt(pItem)}
                  className="text-[10px] bg-surface-slate border border-border-subtle text-on-surface-variant hover:text-primary-container hover:border-primary-container/40 p-1.5 px-3 rounded-full transition-all text-left truncate max-w-[280px] cursor-pointer"
                >
                  {pItem}
                </button>
              ))}
            </div>

            {/* Chat Input Footer */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-border-subtle bg-surface-charcoal flex gap-2 font-sans">
              <input 
                type="text" 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Preguntame sobre Emanuel (ej: Contame sobre el proyecto Clinic Lab)..."
                className="flex-grow bg-surface-slate border border-border-subtle focus:border-primary-container rounded-xl text-xs sm:text-sm text-on-surface p-3 outline-hidden transition-colors"
              />
              <button 
                type="submit"
                disabled={!chatInput.trim() || isTyping}
                className="bg-primary-container text-on-primary hover:shadow-[0_0_12px_rgba(250,204,21,0.25)] hover:scale-105 active:scale-95 p-3 rounded-xl transition-all disabled:opacity-40 cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
