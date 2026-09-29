"use client";

type Props = {
  featured: boolean;
  canPrev: boolean;
  canNext: boolean;
  onToggleFeatured: () => void;
  onPrev: () => void;
  onNext: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

/** Surcouche admin posée sur chaque bloc existant. */
export function BlockToolbar({ featured, canPrev, canNext, onToggleFeatured, onPrev, onNext, onEdit, onDelete }: Props) {
  return (
    <div className="block-admin">
      <button type="button" className="block-admin__hit" onClick={onEdit} aria-label="Modifier le bloc" />
      <label className="block-admin__feature">
        <input type="checkbox" checked={featured} onChange={onToggleFeatured} />
        <span className="check" aria-hidden />À la une
      </label>
      <div className="block-admin__tools">
        <button type="button" onClick={onPrev} disabled={!canPrev} aria-label="Déplacer avant" title="Déplacer avant">
          ←
        </button>
        <button type="button" onClick={onNext} disabled={!canNext} aria-label="Déplacer après" title="Déplacer après">
          →
        </button>
        <button type="button" onClick={onEdit} aria-label="Modifier" title="Modifier">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M4 20h4L19 9l-4-4L4 16z" />
          </svg>
        </button>
        <button
          type="button"
          className="danger"
          onClick={() => confirm("Supprimer ce bloc ?") && onDelete()}
          aria-label="Supprimer"
          title="Supprimer"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" />
          </svg>
        </button>
      </div>
    </div>
  );
}
