"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState, type FormEvent } from "react";
import { ArrowRight } from "./icons";

export function NewsletterForm() {
  const [done, setDone] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO Supabase : insérer l'email dans la table newsletter_subscribers.
    setDone(true);
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      {done ? (
        <motion.p key="ok" className="subscribe subscribe--done" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
          C’est noté, à lundi !
        </motion.p>
      ) : (
        <motion.form key="form" className="subscribe" onSubmit={onSubmit} exit={{ opacity: 0, y: -6 }}>
          <input type="email" name="email" required placeholder="Ton email" aria-label="Ton email" />
          <button type="submit" aria-label="S’inscrire">
            <ArrowRight />
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
