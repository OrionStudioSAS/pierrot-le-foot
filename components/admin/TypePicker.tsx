"use client";

import { AnimatePresence, motion } from "motion/react";
import clsx from "clsx";
import { TEMPLATE_LIST, type BlockType } from "@/lib/blocks";

type Props = { open: boolean; cols: number; rows: number; onPick: (type: BlockType) => void; onClose: () => void };

/** Catalogue des templates de blocs. */
export function TypePicker({ open, cols, rows, onPick, onClose }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <motion.div
            className="modal__panel"
            role="dialog"
            aria-label="Choisir un type de bloc"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 380, damping: 34 }}
          >
            <header className="modal__head">
              <div>
                <span className="eyebrow eyebrow--muted">Nouveau bloc · {cols} × {rows}</span>
                <h2 className="display display--md">Choisis un type de bloc</h2>
              </div>
              <button type="button" className="search__close" onClick={onClose} aria-label="Fermer">
                ×
              </button>
            </header>

            <div className="picker">
              {TEMPLATE_LIST.map((t, i) => {
                const fits = t.cols === cols && t.rows === rows;
                return (
                  <motion.button
                    key={t.type}
                    type="button"
                    className={clsx("picker__item", fits && "is-fit")}
                    onClick={() => onPick(t.type)}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: 0.05 + i * 0.02 } }}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span className={`picker__icon picker__icon--${t.type}`}>{t.icon}</span>
                    <strong>{t.label}</strong>
                    <small>{t.description}</small>
                    <span className="picker__size">
                      {fits ? "Taille idéale" : `Idéal : ${t.cols} × ${t.rows}`}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
