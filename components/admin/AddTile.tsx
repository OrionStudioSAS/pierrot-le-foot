"use client";

import { AnimatePresence, motion } from "motion/react";
import type { CSSProperties } from "react";
import { MAX_COLS, MAX_ROWS } from "@/lib/blocks";
import { ArrowRight } from "../icons";

type Props = {
  draft: { cols: number; rows: number } | null;
  onStart: () => void;
  onResize: (cols: number, rows: number) => void;
  onCancel: () => void;
  onConfirm: () => void;
};

const spring = { type: "spring", stiffness: 380, damping: 32 } as const;

/** Case grise « + » en fin de rubrique. Au clic, on l'agrandit vers la droite / le bas, puis on choisit le type. */
export function AddTile({ draft, onStart, onResize, onCancel, onConfirm }: Props) {
  const cols = draft?.cols ?? 1;
  const rows = draft?.rows ?? 1;

  return (
    <motion.div
      layout
      className="block add-tile"
      data-cols={cols}
      data-rows={rows}
      style={{ "--cols": cols, "--rows": rows } as CSSProperties}
      transition={{ layout: spring }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {!draft ? (
          <motion.button
            key="idle"
            type="button"
            className="add-tile__idle"
            onClick={onStart}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
          >
            <span className="add-tile__plus">+</span>
            <span>Ajouter un bloc</span>
          </motion.button>
        ) : (
          <motion.div
            key="sizing"
            className="add-tile__sizing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button type="button" className="add-tile__cancel" onClick={onCancel} aria-label="Annuler">
              ×
            </button>

            <motion.span key={`${cols}x${rows}`} className="add-tile__size" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={spring}>
              {cols} × {rows}
            </motion.span>
            <span className="add-tile__legend">
              {cols} colonne{cols > 1 ? "s" : ""} · {rows} ligne{rows > 1 ? "s" : ""}
            </span>
            <button type="button" className="btn btn--dark btn--sm add-tile__next" onClick={onConfirm}>
              Choisir le bloc <ArrowRight />
            </button>

            {/* Poignées : à droite = largeur, en bas = hauteur */}
            <div className="handle handle--right">
              <button type="button" onClick={() => onResize(cols + 1, rows)} disabled={cols >= MAX_COLS} aria-label="Élargir">
                +
              </button>
              <button type="button" onClick={() => onResize(cols - 1, rows)} disabled={cols <= 1} aria-label="Réduire la largeur">
                −
              </button>
            </div>
            <div className="handle handle--bottom">
              <button type="button" onClick={() => onResize(cols, rows + 1)} disabled={rows >= MAX_ROWS} aria-label="Agrandir vers le bas">
                +
              </button>
              <button type="button" onClick={() => onResize(cols, rows - 1)} disabled={rows <= 1} aria-label="Réduire la hauteur">
                −
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
