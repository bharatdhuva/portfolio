import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Component as Keyboard } from "@/components/ui/keyboard";
import { Send, CheckCircle2 } from "lucide-react";

export function KeyboardSection() {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const accessKey =
      import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "cbc78da2-4177-43ea-8c32-702bcc77198b";

    if (!accessKey) {
      // Fallback: Simulate sending message in mock mode
      setIsSending(true);
      setTimeout(() => {
        setIsSending(false);
        setIsSent(true);
        setMessage("");
        setTimeout(() => setIsSent(false), 3000);
      }, 1000);
      return;
    }

    setIsSending(true);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          message: message,
          from_name: "Portfolio Visitor",
          subject: "New Message from Portfolio Keyboard Section",
        }),
      });

      const data = await response.json();
      if (data.success) {
        setIsSent(true);
        setMessage("");
        setTimeout(() => setIsSent(false), 3000);
      } else {
        alert("Failed to send message: " + (data.message || "Unknown error"));
      }
    } catch (error) {
      alert("Error sending message. Please try again later.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section
      id="keyboard"
      className="py-12 md:py-20 border-t border-zinc-200/50 dark:border-zinc-800/30"
    >
      <div className="max-w-4xl mx-auto px-4 text-center flex flex-col items-center">
        {/* Section Header (Visible on both mobile & desktop) */}
        <h2 className="text-[10px] font-medium tracking-[0.2em] text-muted-foreground mb-6 font-mono uppercase text-left w-full max-w-2xl">
          LEAVE YOUR THOUGHTS...
        </h2>

        {/* Desktop-only Keyboard Header & Keys (hidden on mobile, visible on desktop) */}
        <div className="hidden md:flex flex-col items-center w-full">
          <p className="text-sm text-muted-foreground mb-6 text-left w-full max-w-2xl">
            Type on your physical keyboard or click the keys below to test the active key triggers.
          </p>

          {/* Keyboard Container - Fills max-w-2xl 100% */}
          <div className="w-full max-w-2xl mb-8 flex justify-center overflow-visible">
            <Keyboard />
          </div>
        </div>

        {/* Leave a Message Box (Mobile friendly padding and layout) */}
        <div className="w-full max-w-2xl text-left bg-zinc-50/50 dark:bg-zinc-950/20 p-5 sm:p-6 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/30 shadow-sm">
          <h3 className="text-base font-semibold text-foreground mb-1">Leave a Message</h3>
          <p className="text-xs text-muted-foreground mb-4">
            Type anything below to leave a quick message or comment on my portfolio.
          </p>

          <form onSubmit={handleSend} className="space-y-4">
            <div className="relative">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message here..."
                rows={3}
                required
                className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:border-zinc-400 dark:focus:border-zinc-600 focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-600 focus:outline-none rounded-xl p-4 text-sm text-foreground transition-all placeholder:text-muted-foreground/70 resize-none"
              />
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="min-h-6 flex items-center">
                <AnimatePresence>
                  {isSent && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium"
                    >
                      <CheckCircle2 className="h-4 w-4" /> Message sent successfully!
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                type="submit"
                disabled={isSending || !message.trim()}
                className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed text-zinc-100 dark:text-zinc-900 rounded-xl px-4.5 py-2 text-sm font-medium transition-all shadow-[0_2px_8px_rgba(0,0,0,0.08)] dark:shadow-none active:scale-95 cursor-pointer shrink-0"
              >
                {isSending ? (
                  <span className="h-4 w-4 border-2 border-zinc-400 border-t-zinc-900 dark:border-zinc-600 dark:border-t-zinc-100 rounded-full animate-spin" />
                ) : (
                  <Send className="h-3.5 w-3.5" />
                )}
                <span>Send</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
