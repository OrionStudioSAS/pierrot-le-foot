"use client";

import { AnimatePresence, motion } from "motion/react";

/** Bouton flottant de test pour passer en vue admin (pas d'authentification pour l'instant). */
export function AdminToggle({ active, onToggle, onReset }: { active: boolean; onToggle: () => void; onReset: () => void }) {
  return (
    <motion.div layout className={active ? "admin-toggle is-active" : "admin-toggle"} transition={{ type: "spring", stiffness: 400, damping: 34 }}>
      <AnimatePresence initial={false}>
        {active && (
          <motion.div key="bar" className="admin-toggle__bar" initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: "auto" }} exit={{ opacity: 0, width: 0 }}>
            <span className="admin-toggle__label">
              <i className="dot dot--pulse" /> Vue admin
            </span>
            <button type="button" onClick={() => confirm("Revenir à la mise en page d’origine ?") && onReset()}>
              Réinitialiser
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <button type="button" className="admin-toggle__main" onClick={onToggle}>
        {active ? "Quitter" : "Vue admin"}
      </button>
    </motion.div>
  );
}
