"use client";

import { useState, useEffect, FormEvent } from "react";
import {
  Mail,
  MapPin,
  MessageSquare,
  CheckCircle2,
  Clock,
  Trash2,
  X,
  Send,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import BIO_EN from "@/../public/data/workExperience_en.json";
import BIO_ES from "@/../public/data/workExperience_es.json";
import { ContactMessage } from "@/types";
import { useApp } from "@/context/AppContext";

interface ContactProps {
  onShowToast: (text: string) => void;
}

export default function Contact({ onShowToast }: ContactProps) {
  const { messages, lang } = useApp();

  // Contact Form States
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [messagesList, setMessagesList] = useState<ContactMessage[]>([]);
  const [showInbox, setShowInbox] = useState(false);

  // Load message list from localStorage safely
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("emanuel_portfolio_messages");
      if (saved) {
        try {
          setMessagesList(JSON.parse(saved));
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (
      !contactForm.name.trim() ||
      !contactForm.email.trim() ||
      !contactForm.message.trim()
    ) {
      onShowToast(
        messages.alert?.jobTitle ||
          "Por favor completá los campos requeridos ⚠️",
      );
      return;
    }

    setIsSending(true);

    // Simulate sending time in client
    setTimeout(() => {
      const newMessage: ContactMessage = {
        id: "msg-" + Math.random().toString(36).substr(2, 9),
        senderName: contactForm.name,
        senderEmail: contactForm.email,
        subject: contactForm.subject || "Consulta General",
        content: contactForm.message,
        date: new Date().toLocaleString("es-AR"),
        read: false,
      };

      const updated = [newMessage, ...messagesList];
      setMessagesList(updated);

      if (typeof window !== "undefined") {
        localStorage.setItem(
          "emanuel_portfolio_messages",
          JSON.stringify(updated),
        );
      }

      setIsSending(false);
      onShowToast("¡Mensaje enviado con éxito! Guardado en tu buzón local 🚀");
      setContactForm({ name: "", email: "", subject: "", message: "" });
    }, 1800);
  };

  const handleDeleteMessage = (id: string) => {
    const updated = messagesList.filter((msg) => msg.id !== id);
    setMessagesList(updated);

    if (typeof window !== "undefined") {
      localStorage.setItem(
        "emanuel_portfolio_messages",
        JSON.stringify(updated),
      );
    }
    onShowToast('Mensaje eliminado');
  };

  const isEs = lang === "ESP";
  const heading = isEs
    ? "¿Hablamos sobre tu próximo proyecto?"
    : "Let's talk about your next project!";
  const description = isEs
    ? "Estoy disponible para incorporarme a proyectos técnicos innovadores o asumir funciones permanentes como desarrollador Fullstack / Frontend / Backend."
    : "I am available to join innovative technical projects or take on permanent roles as a Fullstack / Frontend / Backend developer.";

  return (
    <footer
      id="contact-footer"
      className="py-16 px-6 lg:px-16 border-t border-border-subtle bg-surface-charcoal relative"
    >
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Brand description / detail info */}
          <div className="space-y-6">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-primary-container tracking-tight">
              {heading}
            </h3>
            <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed max-w-sm">
              {description}
            </p>

            <div className="space-y-4 pt-4 text-xs sm:text-sm">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-surface-slate border border-border-subtle flex items-center justify-center">
                  <Mail className="w-4 h-4 text-primary-container" />
                </div>
                <a
                  href={`mailto:${BIO_ES.email}`}
                  className="text-on-surface hover:text-primary-container transition-colors font-medium font-mono"
                >
                  {BIO_ES.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-surface-slate border border-border-subtle flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-primary-container" />
                </div>
                <span className="text-text-muted">
                  Buenos Aires, Argentina (Híbrido o Remoto)
                </span>
              </div>
            </div>

       {/*      <div className="pt-6">
              <button 
            <div className="pt-6">
              <button
                id="toggle-sent-inbox-btn"
                onClick={() => setShowInbox(!showInbox)}
                className="inline-flex items-center gap-2 text-xs font-bold text-primary-container border-b border-primary-container hover:border-transparent transition-all pb-1 uppercase cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                {showInbox ? 'Ocultar bandeja de enviados' : `Ver bandeja de enviados (${messagesList.length})`}
              </button>
            </div> */}
          </div>

          {/* FORM PANEL */}
          <div className="bg-surface-slate border border-border-subtle p-6 sm:p-8 rounded-3xl relative overflow-hidden">
            {/* Simulated Sent messages overlay drawer */}
            <AnimatePresence>
              {showInbox && (
                <motion.div
                  id="sent-messages-drawer"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  className="absolute inset-0 bg-surface-slate z-10 p-6 flex flex-col justify-between overflow-y-auto custom-scrollbar"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-border-subtle pb-3">
                      <h4 className="font-serif text-base font-bold text-primary-container flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Bandeja Local de Enviados</span>
                      </h4>
                      <button
                        onClick={() => setShowInbox(false)}
                        className="text-text-muted hover:text-primary-container"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {messagesList.length === 0 ? (
                      <div className="text-center py-12 text-text-muted space-y-2">
                        <Clock className="w-10 h-10 text-border-subtle mx-auto" />
                        <p className="text-xs">No enviaste mensajes todavía.</p>
                      </div>
                    ) : (
                      <div className="space-y-4 max-h-[300px] overflow-y-auto custom-scrollbar">
                        {messagesList.map((msg) => (
                          <div
                            key={msg.id}
                            className="p-4 rounded-xl bg-surface-charcoal border border-border-subtle relative group/item"
                          >
                            <button
                              onClick={() => handleDeleteMessage(msg.id)}
                              className="absolute top-3 right-3 text-border-subtle hover:text-red-400 opacity-0 group-hover/item:opacity-100 transition-opacity"
                              title="Eliminar mensaje"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                            <div className="flex items-center justify-between text-[10px] text-text-muted mb-1.5 font-sans">
                              <span>{msg.date}</span>
                              <span className="text-emerald-400 font-bold tracking-widest">
                                ENVIADO ✓
                              </span>
                            </div>
                            <p className="text-xs text-on-surface font-semibold mb-1">
                              {msg.subject}
                            </p>
                            <p className="text-[11px] text-on-surface-variant line-clamp-2">
                              {msg.content}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => setShowInbox(false)}
                    className="w-full mt-4 py-2.5 bg-surface-charcoal hover:bg-surface-charcoal/80 text-xs font-semibold rounded-xl border border-border-subtle cursor-pointer"
                  >
                    Volver al Formulario
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <form
              id="contact-form"
              onSubmit={handleContactSubmit}
              className="space-y-4"
            >
              <h4 className="font-serif text-lg font-bold text-on-surface mb-2">
                Enviar Correo
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-text-muted">
                    {messages.Contact.nameLabel || "Nombre y apellido"} *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, name: e.target.value })
                    }
                    placeholder={
                      messages.Contact.namePlaceholder || "Tu nombre completo"
                    }
                    className="w-full bg-surface-charcoal border-b border-border-subtle focus:border-primary-container outline-hidden p-2 text-xs sm:text-sm text-on-surface transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-text-muted">
                    {messages.Contact.emailLabel || "Tu dirección de correo"} *
                  </label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, email: e.target.value })
                    }
                    placeholder={
                      messages.Contact.emailPlaceholder || "tu@email.com"
                    }
                    className="w-full bg-surface-charcoal border-b border-border-subtle focus:border-primary-container outline-hidden p-2 text-xs sm:text-sm text-on-surface transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-text-muted">
                  Asunto
                </label>
                <input
                  type="text"
                  value={contactForm.subject}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, subject: e.target.value })
                  }
                  placeholder="Motivo de contacto (ej: Propuesta laboral)"
                  className="w-full bg-surface-charcoal border-b border-border-subtle focus:border-primary-container outline-hidden p-2 text-xs sm:text-sm text-on-surface transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-text-muted">
                  {messages.Contact.messageLabel || "Mensaje"} *
                </label>
                <textarea
                  required
                  rows={4}
                  value={contactForm.message}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, message: e.target.value })
                  }
                  placeholder={
                    messages.Contact.messagePlaceholder ||
                    "Contame brevemente tu idea de proyecto..."
                  }
                  className="w-full bg-surface-charcoal border-b border-border-subtle focus:border-primary-container outline-hidden p-2 text-xs sm:text-sm text-on-surface transition-colors resize-none"
                />
              </div>

              <button
                id="contact-submit-btn"
                type="submit"
                disabled={isSending}
                className="flex items-center justify-center gap-2 bg-primary-container text-on-primary py-3.5 w-full rounded-xl font-sans text-xs font-bold tracking-wider hover:shadow-[0_0_20px_rgba(250,204,21,0.25)] active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
              >
                {isSending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-on-primary border-t-transparent rounded-full animate-spin" />
                    <span>ENVIANDO...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>
                      {(
                        messages.Contact.sendButton || "Enviar Mensaje"
                      ).toUpperCase()}
                    </span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* FOOTER METADATA CARD */}
        <div className="pt-16 border-t border-border-subtle/30 mt-16 text-center space-y-4 font-sans">
          <p className="font-serif text-sm font-semibold tracking-wider uppercase text-on-surface">
            Emanuel Rigo
          </p>
          <p className="font-sans text-xs text-text-muted max-w-sm mx-auto leading-relaxed">
            Portfolio del desarrollador Emanuel Rigo, implementado con
            arquitectura reactiva en tiempo real y chateador de IA integrado.{" "}
            {BIO_ES.location}.
          </p>
        </div>
      </div>
    </footer>
  );
}
