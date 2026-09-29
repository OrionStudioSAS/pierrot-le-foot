"use client";

import { AnimatePresence, motion } from "motion/react";
import clsx from "clsx";
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { createBlock, SECTIONS, type Block, type BlockType, type HomeLayout, type SectionId } from "@/lib/blocks";
import type { SectionCounts } from "@/lib/types";
import { formatNumber } from "@/lib/format";
import { BlockView } from "./blocks/BlockView";
import { AddTile } from "./admin/AddTile";
import { AdminToggle } from "./admin/AdminToggle";
import { BlockEditor } from "./admin/BlockEditor";
import { BlockToolbar } from "./admin/BlockToolbar";
import { TypePicker } from "./admin/TypePicker";
import { SectionHeader } from "./ui";

const STORAGE_KEY = "plf-home-layout-v1";

type Draft = { section: SectionId; cols: number; rows: number };
type Where = { list: "featured" | SectionId; index: number };

export function HomeBuilder({ initialLayout, counts }: { initialLayout: HomeLayout; counts: SectionCounts }) {
  const [layout, setLayout] = useState(initialLayout);
  const [admin, setAdmin] = useState(false);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [picking, setPicking] = useState<Draft | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const loaded = useRef(false);

  // Test sans base : la mise en page modifiée est gardée dans le navigateur.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setLayout(JSON.parse(saved));
    } catch {}
    loaded.current = true;
  }, []);

  useEffect(() => {
    if (!loaded.current) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(layout));
    } catch {}
  }, [layout]);

  const blocksById = useMemo(() => {
    const map = new Map<string, { block: Block; section: SectionId }>();
    for (const s of SECTIONS) for (const b of layout.sections[s.id]) map.set(b.id, { block: b, section: s.id });
    return map;
  }, [layout]);

  const featuredSet = useMemo(() => new Set(layout.featured), [layout.featured]);
  const featuredBlocks = layout.featured.map((id) => blocksById.get(id)?.block).filter((b): b is Block => !!b);

  // --- Actions -------------------------------------------------------------

  const updateBlock = useCallback((id: string, next: Block) => {
    setLayout((l) => {
      const sections = { ...l.sections };
      for (const key of Object.keys(sections) as SectionId[]) {
        if (sections[key].some((b) => b.id === id)) sections[key] = sections[key].map((b) => (b.id === id ? next : b));
      }
      return { ...l, sections };
    });
  }, []);

  const deleteBlock = useCallback((id: string) => {
    setLayout((l) => {
      const sections = { ...l.sections };
      for (const key of Object.keys(sections) as SectionId[]) sections[key] = sections[key].filter((b) => b.id !== id);
      return { sections, featured: l.featured.filter((f) => f !== id) };
    });
    setEditingId((e) => (e === id ? null : e));
  }, []);

  const toggleFeatured = useCallback((id: string) => {
    setLayout((l) => ({ ...l, featured: l.featured.includes(id) ? l.featured.filter((f) => f !== id) : [...l.featured, id] }));
  }, []);

  const move = useCallback((where: Where, dir: -1 | 1) => {
    setLayout((l) => {
      const list = where.list === "featured" ? [...l.featured] : [...l.sections[where.list]];
      // Dans une rubrique, on saute les blocs affichés « À la une ».
      const hidden = (item: string | Block) => where.list !== "featured" && l.featured.includes((item as Block).id);
      let to = where.index + dir;
      while (to >= 0 && to < list.length && hidden(list[to])) to += dir;
      if (to < 0 || to >= list.length) return l;
      [list[where.index], list[to]] = [list[to], list[where.index]];
      return where.list === "featured"
        ? { ...l, featured: list as string[] }
        : { ...l, sections: { ...l.sections, [where.list]: list as Block[] } };
    });
  }, []);

  function addBlock(type: BlockType) {
    if (!picking) return;
    const block = createBlock(type, picking.cols, picking.rows);
    setLayout((l) => ({ ...l, sections: { ...l.sections, [picking.section]: [...l.sections[picking.section], block] } }));
    setPicking(null);
    setDraft(null);
    setEditingId(block.id);
  }

  function reset() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    setLayout(initialLayout);
    setEditingId(null);
    setDraft(null);
  }

  function toggleAdmin() {
    setAdmin((a) => !a);
    setDraft(null);
    setEditingId(null);
  }

  // --- Rendu ---------------------------------------------------------------

  function renderBlock(block: Block, where: Where, i: number, count: number) {
    return (
      <motion.div
        key={block.id}
        layout
        className={clsx("block", admin && "block--admin", editingId === block.id && "is-editing")}
        data-cols={block.cols}
        data-rows={block.rows}
        style={{ "--cols": block.cols, "--rows": block.rows } as CSSProperties}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -60px 0px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: Math.min(i, 6) * 0.04, layout: { type: "spring", stiffness: 380, damping: 36 } }}
      >
        <BlockView block={block} />
        {admin && (
          <BlockToolbar
            featured={featuredSet.has(block.id)}
            canPrev={i > 0}
            canNext={i < count - 1}
            onToggleFeatured={() => toggleFeatured(block.id)}
            onPrev={() => move(where, -1)}
            onNext={() => move(where, 1)}
            onEdit={() => setEditingId(block.id)}
            onDelete={() => deleteBlock(block.id)}
          />
        )}
      </motion.div>
    );
  }

  const editing = editingId ? blocksById.get(editingId)?.block : undefined;

  return (
    <div className={clsx("builder", admin && "is-admin")}>
      <section id="une" className="section">
        <SectionHeader index={1} title="À la une" />
        {admin && <p className="admin-hint">Coche « À la une » sur un bloc d’une rubrique pour l’afficher ici.</p>}
        <div className="grid">
          {featuredBlocks.map((b, i) => renderBlock(b, { list: "featured", index: i }, i, featuredBlocks.length))}
        </div>
      </section>

      {SECTIONS.map((section, sIndex) => {
        const all = layout.sections[section.id];
        const visible = all.filter((b) => !featuredSet.has(b.id));
        if (!admin && visible.length === 0) return null;

        const count = section.countKey ? counts[section.countKey] : undefined;
        const linkLabel = count !== undefined ? `${formatNumber(count)} ${section.linkLabel}` : section.linkLabel;

        return (
          <section key={section.id} id={section.id} className="section">
            <SectionHeader index={sIndex + 2} title={section.title} link={linkLabel ? { label: linkLabel, href: "#" } : undefined} />
            <div className="grid">
              {visible.map((b, i) => renderBlock(b, { list: section.id, index: all.indexOf(b) }, i, visible.length))}
              {admin && (
                <AddTile
                  draft={draft?.section === section.id ? draft : null}
                  onStart={() => setDraft({ section: section.id, cols: 1, rows: 1 })}
                  onResize={(cols, rows) => setDraft({ section: section.id, cols, rows })}
                  onCancel={() => setDraft(null)}
                  onConfirm={() => draft && setPicking(draft)}
                />
              )}
            </div>
          </section>
        );
      })}

      <TypePicker open={!!picking} cols={picking?.cols ?? 1} rows={picking?.rows ?? 1} onPick={addBlock} onClose={() => setPicking(null)} />

      <AnimatePresence>
        {admin && editing && (
          <BlockEditor
            key={editing.id}
            block={editing}
            featured={featuredSet.has(editing.id)}
            onChange={(next) => updateBlock(editing.id, next)}
            onToggleFeatured={() => toggleFeatured(editing.id)}
            onDelete={() => deleteBlock(editing.id)}
            onClose={() => setEditingId(null)}
          />
        )}
      </AnimatePresence>

      <AdminToggle active={admin} onToggle={toggleAdmin} onReset={reset} />
    </div>
  );
}
