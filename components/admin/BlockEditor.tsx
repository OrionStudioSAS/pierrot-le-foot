"use client";

import { motion } from "motion/react";
import clsx from "clsx";
import { useState } from "react";
import { getPath, MAX_COLS, MAX_ROWS, setPath, TEMPLATES, type Block, type Field } from "@/lib/blocks";
import { PLATFORM_NAMES, PLATFORMS, TONES, type Platform } from "@/lib/types";

type Props = {
  block: Block;
  featured: boolean;
  onChange: (next: Block) => void;
  onToggleFeatured: () => void;
  onDelete: () => void;
  onClose: () => void;
};

/** Panneau latéral : taille + champs du template, appliqués en direct sur la page. */
export function BlockEditor({ block, featured, onChange, onToggleFeatured, onDelete, onClose }: Props) {
  const template = TEMPLATES[block.type];
  const setData = (key: string, value: unknown) => onChange({ ...block, data: setPath(block.data, key, value) } as Block);

  return (
    <motion.aside
      className="editor"
      aria-label={`Modifier : ${template.label}`}
      initial={{ x: "105%" }}
      animate={{ x: 0 }}
      exit={{ x: "105%" }}
      transition={{ type: "spring", stiffness: 340, damping: 36 }}
    >
      <header className="editor__head">
        <span className={`picker__icon picker__icon--${block.type}`}>{template.icon}</span>
        <div>
          <span className="eyebrow eyebrow--muted">Modifier le bloc</span>
          <h2 className="display display--sm">{template.label}</h2>
        </div>
        <button type="button" className="search__close" onClick={onClose} aria-label="Fermer">
          ×
        </button>
      </header>

      <div className="editor__body">
        <fieldset className="editor__group">
          <legend>Taille</legend>
          <div className="editor__size">
            <Stepper label="Largeur" value={block.cols} min={1} max={MAX_COLS} onChange={(cols) => onChange({ ...block, cols })} />
            <Stepper label="Hauteur" value={block.rows} min={1} max={MAX_ROWS} onChange={(rows) => onChange({ ...block, rows })} />
          </div>
          {(block.cols !== template.cols || block.rows !== template.rows) && (
            <button type="button" className="editor__link" onClick={() => onChange({ ...block, cols: template.cols, rows: template.rows })}>
              Revenir à la taille idéale ({template.cols} × {template.rows})
            </button>
          )}
        </fieldset>

        <label className="editor__toggle">
          <input type="checkbox" checked={featured} onChange={onToggleFeatured} />
          <span className="check" aria-hidden />
          Afficher « À la une »
        </label>

        <fieldset className="editor__group">
          <legend>Contenu</legend>
          {template.fields.map((field) => (
            <FieldInput key={field.key} field={field} value={getPath(block.data, field.key)} onChange={(v) => setData(field.key, v)} />
          ))}
        </fieldset>
      </div>

      <footer className="editor__foot">
        <button type="button" className="btn btn--ghost btn--danger" onClick={() => confirm("Supprimer ce bloc ?") && onDelete()}>
          Supprimer
        </button>
        <button type="button" className="btn btn--dark" onClick={onClose}>
          Terminé
        </button>
      </footer>
    </motion.aside>
  );
}

function Stepper({ label, value, min, max, onChange }: { label: string; value: number; min: number; max: number; onChange: (v: number) => void }) {
  return (
    <div className="stepper">
      <span>{label}</span>
      <div>
        <button type="button" onClick={() => onChange(value - 1)} disabled={value <= min} aria-label={`${label} −`}>
          −
        </button>
        <strong>{value}</strong>
        <button type="button" onClick={() => onChange(value + 1)} disabled={value >= max} aria-label={`${label} +`}>
          +
        </button>
      </div>
    </div>
  );
}

// ISO ↔ valeur d'un <input type="datetime-local"> (heure locale)
function toLocalInput(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function FieldInput({ field, value, onChange }: { field: Field; value: unknown; onChange: (v: unknown) => void }) {
  const id = `f-${field.key}`;
  let input: React.ReactNode;

  switch (field.kind) {
    case "textarea":
      input = <textarea id={id} rows={3} value={String(value ?? "")} onChange={(e) => onChange(e.target.value)} />;
      break;
    case "number":
      input = <input id={id} type="number" min={0} value={Number(value ?? 0)} onChange={(e) => onChange(Number(e.target.value) || 0)} />;
      break;
    case "datetime":
      input = (
        <input
          id={id}
          type="datetime-local"
          value={toLocalInput(String(value ?? ""))}
          onChange={(e) => e.target.value && onChange(new Date(e.target.value).toISOString())}
        />
      );
      break;
    case "checkbox":
      return (
        <label className="editor__toggle">
          <input type="checkbox" checked={!!value} onChange={(e) => onChange(e.target.checked)} />
          <span className="check" aria-hidden />
          {field.label}
        </label>
      );
    case "select":
      input = (
        <select id={id} value={String(value ?? "")} onChange={(e) => onChange(e.target.value)}>
          {field.options?.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      );
      break;
    case "platform":
      input = (
        <select id={id} value={String(value ?? "")} onChange={(e) => onChange(e.target.value)}>
          {PLATFORMS.map((p) => (
            <option key={p} value={p}>
              {PLATFORM_NAMES[p]}
            </option>
          ))}
        </select>
      );
      break;
    case "platforms": {
      const list = (value as Platform[]) ?? [];
      input = (
        <div className="pills">
          {PLATFORMS.map((p) => (
            <button
              key={p}
              type="button"
              className={clsx("pill", list.includes(p) && "is-on")}
              onClick={() => onChange(list.includes(p) ? list.filter((x) => x !== p) : [...list, p])}
            >
              {PLATFORM_NAMES[p]}
            </button>
          ))}
        </div>
      );
      break;
    }
    case "tone":
      input = (
        <div className="swatches">
          {TONES.map((t) => (
            <button
              key={t}
              type="button"
              className={clsx("swatch", `tone-${t}`, value === t && "is-on")}
              onClick={() => onChange(t)}
              aria-label={t}
              title={t}
            />
          ))}
        </div>
      );
      break;
    case "lines":
      input = <LinesInput id={id} columns={field.columns ?? []} value={(value as Record<string, string>[]) ?? []} onChange={onChange} />;
      break;
    default:
      input = <input id={id} type={field.kind === "url" ? "url" : "text"} value={String(value ?? "")} onChange={(e) => onChange(e.target.value)} />;
  }

  return (
    <div className="field">
      <label htmlFor={id}>{field.label}</label>
      {input}
      {field.hint && <small>{field.hint}</small>}
    </div>
  );
}

/** Liste éditée en texte : une ligne par élément, colonnes séparées par « | ». */
function LinesInput({ id, columns, value, onChange }: { id: string; columns: string[]; value: Record<string, string>[]; onChange: (v: unknown) => void }) {
  const [text, setText] = useState(() => value.map((row) => columns.map((c) => row[c] ?? "").join(" | ")).join("\n"));

  function update(next: string) {
    setText(next);
    const rows = next
      .split("\n")
      .filter((line) => line.trim())
      .map((line) => {
        const parts = line.split("|").map((p) => p.trim());
        return Object.fromEntries(columns.map((c, i) => [c, parts[i] ?? ""]));
      });
    onChange(rows);
  }

  return <textarea id={id} rows={Math.max(4, value.length + 1)} value={text} onChange={(e) => update(e.target.value)} className="mono" />;
}
