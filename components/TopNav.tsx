"use client";

import { AnimatePresence, motion } from "motion/react";
import clsx from "clsx";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { SearchIcon } from "./icons";

export type NavItem = { id: string; label: string; count?: number };

const spring = { type: "spring", stiffness: 380, damping: 36 } as const;

/** Onglets d'ancre avec suivi de la section visible (scroll spy) et recherche dépliable. */
export function TopNav({ items }: { items: NavItem[] }) {
  const [active, setActive] = useState(items[0]?.id);
  const [searchOpen, setSearchOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const sections = items.map((i) => document.getElementById(i.id)).filter((el): el is HTMLElement => !!el);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [items]);

  // ⌘K / Ctrl+K pour ouvrir, Échap pour fermer
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      } else if (e.key === "Escape") {
        setSearchOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO Supabase : recherche plein texte sur les contenus.
  }

  return (
    <nav className="topnav">
      <AnimatePresence initial={false}>
        {!searchOpen && (
          <motion.ul
            key="tabs"
            className="tabs"
            initial={{ opacity: 0, x: -16, filter: "blur(6px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)", transition: { delay: 0.12, duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
            exit={{ opacity: 0, x: -24, filter: "blur(6px)" }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {items.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className={clsx("tab", active === item.id && "is-active")} onClick={() => setActive(item.id)}>
                  {active === item.id && <motion.span layoutId="tab-pill" className="tab__pill" transition={spring} />}
                  <span className="tab__label">
                    {item.label}
                    {item.count !== undefined && <small>{item.count}</small>}
                  </span>
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      <motion.form
        role="search"
        className={clsx("search", searchOpen && "is-open")}
        onSubmit={onSubmit}
        initial={false}
        animate={{ width: searchOpen ? "100%" : 46 }}
        transition={spring}
        onAnimationComplete={() => searchOpen && inputRef.current?.focus()}
      >
        <button
          type={searchOpen ? "submit" : "button"}
          className="search__icon"
          aria-label={searchOpen ? "Lancer la recherche" : "Ouvrir la recherche"}
          onClick={searchOpen ? undefined : () => setSearchOpen(true)}
        >
          <SearchIcon />
        </button>

        <AnimatePresence>
          {searchOpen && (
            <>
              <motion.input
                key="input"
                ref={inputRef}
                type="search"
                name="q"
                className="search__input"
                placeholder="Rechercher un débrief, un joueur, un club…"
                aria-label="Rechercher"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0, transition: { delay: 0.12, duration: 0.3 } }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
              />
              <motion.kbd
                key="kbd"
                className="search__kbd"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.2 } }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
              >
                Échap
              </motion.kbd>
              <motion.button
                key="close"
                type="button"
                className="search__close"
                aria-label="Fermer la recherche"
                onClick={() => setSearchOpen(false)}
                initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                animate={{ opacity: 1, rotate: 0, scale: 1, transition: { delay: 0.1, ...spring } }}
                exit={{ opacity: 0, rotate: 90, scale: 0.6, transition: { duration: 0.15 } }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </motion.button>
            </>
          )}
        </AnimatePresence>
      </motion.form>
    </nav>
  );
}
