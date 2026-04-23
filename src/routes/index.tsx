import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import logo from "@/assets/burgerlab-logo.png";
import heroImg from "@/assets/burger-hero.jpeg";
import chemistryImg from "@/assets/burger-chemistry.jpeg";
import { Burger3D } from "@/components/Burger3D";
import { MenuCard } from "@/components/MenuCard";
import {
  beefBurgers,
  chickenBurgers,
  vegBurger,
  kidsMenu,
  sides,
  sauces,
  drinks,
} from "@/data/menu";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Burger Lab — Burger Chemistry Done Right" },
      {
        name: "description",
        content:
          "Explore the Burger Lab menu in 3D. Smash burgers, crispy chicken, veg, kids meals, sides and sauces — crafted with precision.",
      },
      { property: "og:title", content: "Burger Lab — 3D Menu" },
      { property: "og:description", content: "Burger chemistry done right. Explore the full menu in 3D." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

const CATEGORIES = [
  { id: "beef", label: "Beef" },
  { id: "chicken", label: "Chicken" },
  { id: "veg", label: "Veg" },
  { id: "kids", label: "Kids" },
  { id: "sides", label: "Sides" },
  { id: "sauces", label: "Sauces" },
  { id: "drinks", label: "Drinks" },
] as const;

type Cat = (typeof CATEGORIES)[number]["id"];

function Index() {
  const [cat, setCat] = useState<Cat>("beef");

  const items =
    cat === "beef"
      ? beefBurgers
      : cat === "chicken"
        ? chickenBurgers
        : cat === "veg"
          ? vegBurger
          : cat === "kids"
            ? kidsMenu
            : cat === "sides"
              ? sides
              : cat === "sauces"
                ? sauces
                : drinks;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-3">
            <img src={logo} alt="Burger Lab logo" className="h-16 w-auto md:h-20" />
          </a>
          <nav className="hidden gap-8 text-sm font-semibold uppercase tracking-wider md:flex">
            <a href="#menu" className="hover:text-primary">Menu</a>
            <a href="#about" className="hover:text-primary">About</a>
            <a href="#contact" className="hover:text-primary">Contact</a>
          </nav>
          <a
            href="#menu"
            className="rounded-full bg-gradient-red px-5 py-2 text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-soft transition-transform hover:scale-105"
          >
            Order
          </a>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative overflow-hidden">
        <div className="absolute left-0 top-10 h-24 w-24 checker-pattern opacity-80" />
        <div className="absolute bottom-10 right-0 h-24 w-24 checker-pattern opacity-80" />
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-6 px-6 pb-16 pt-12 md:grid-cols-2 md:pt-20">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary"
            >
              ⚡ New Menu • 2025
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-6 text-5xl uppercase md:text-7xl lg:text-8xl"
            >
              Burger
              <br />
              Chemistry
              <br />
              <span className="text-primary">Done Right.</span>
            </motion.h1>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">
              Smash patties, toasted brioche, layered precision. Spin the stack, then pick your formula.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#menu"
                className="rounded-full bg-gradient-red px-6 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-burger transition-transform hover:scale-105"
              >
                Explore the Menu
              </a>
              <a
                href="#about"
                className="rounded-full border-2 border-foreground/80 px-6 py-3 text-sm font-bold uppercase tracking-wider hover:bg-foreground hover:text-background"
              >
                Our Story
              </a>
            </div>
          </div>

          <div className="relative h-[420px] md:h-[560px]">
            <div className="absolute inset-0 -z-10 flex items-center justify-center">
              <div className="h-[85%] w-[85%] rounded-full bg-gradient-red blur-3xl opacity-40" />
            </div>
            <Burger3D className="h-full w-full" />
          </div>
        </div>
      </section>

      {/* MENU */}
      <section id="menu" className="relative border-t border-border/60 bg-secondary/40 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-primary">The Formula</div>
              <h2 className="mt-2 text-5xl uppercase md:text-6xl">Our Menu.</h2>
            </div>
            <p className="max-w-md text-muted-foreground">
              Every item is calibrated in-lab. Pick a category, then tap a card for the full breakdown.
            </p>
          </div>

          {/* tabs */}
          <div className="mt-10 flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setCat(c.id)}
                className={`rounded-full px-5 py-2 text-sm font-bold uppercase tracking-wider transition-all ${
                  cat === c.id
                    ? "bg-gradient-red text-primary-foreground shadow-soft"
                    : "border border-border bg-card text-foreground hover:border-primary"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* grid */}
          <motion.div
            key={cat}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {items.map((it, i) => (
              <MenuCard key={it.name} item={it} index={i} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative overflow-hidden py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2">
          <div className="relative">
            <img
              src={chemistryImg}
              alt="Signature Burger Lab burger"
              className="w-full rounded-3xl shadow-burger"
              loading="lazy"
            />
            <div className="absolute -right-4 -top-4 h-20 w-20 checker-pattern" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-primary">Our Lab</div>
            <h2 className="mt-2 text-5xl uppercase md:text-6xl">Precision.<br />Flavor.<br />Fire.</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              At Burger Lab we treat every burger like an experiment: fresh brioche, smashed patties,
              sauces tuned to the milligram. No shortcuts — just clean, honest chemistry between
              ingredients you can taste.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { k: "30+", v: "Recipes" },
                { k: "100%", v: "Fresh daily" },
                { k: "24h", v: "Smash fresh" },
              ].map((s) => (
                <div key={s.v} className="rounded-2xl border border-border bg-card p-4 text-center">
                  <div className="font-display text-3xl text-primary">{s.k}</div>
                  <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SIGNATURE STRIP */}
      <section className="relative bg-gradient-red py-20 text-primary-foreground">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-2">
          <div>
            <h2 className="text-5xl uppercase md:text-6xl">Double Beef.<br />Crispy Bacon.<br />No holding back.</h2>
            <p className="mt-6 max-w-md text-lg opacity-90">
              Big flavor, stacked the Burger Lab way. Come taste the formula.
            </p>
          </div>
          <img
            src={heroImg}
            alt="Double beef bacon burger"
            className="animate-float mx-auto max-h-[420px] w-auto rounded-3xl shadow-burger"
            loading="lazy"
          />
        </div>
      </section>

      {/* CONTACT / FOOTER */}
      <footer id="contact" className="border-t border-border bg-background py-14">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 md:grid-cols-3">
          <div>
            <img src={logo} alt="Burger Lab" className="h-14 w-auto" />
            <p className="mt-4 text-sm text-muted-foreground">
              Burger chemistry done right.
            </p>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-primary">Visit</div>
            <p className="mt-2 text-sm text-muted-foreground">Open daily · 11:00 – 23:00</p>
            <p className="text-sm text-muted-foreground">Dar es Salaam, Tanzania</p>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-primary">Follow</div>
            <div className="mt-2 flex gap-4 text-sm">
              <a href="#" className="hover:text-primary">Instagram</a>
              <a href="#" className="hover:text-primary">TikTok</a>
              <a href="#" className="hover:text-primary">Facebook</a>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-7xl px-6 text-xs uppercase tracking-widest text-muted-foreground">
          © {new Date().getFullYear()} Burger Lab™ · All rights reserved
        </div>
      </footer>
    </div>
  );
}
