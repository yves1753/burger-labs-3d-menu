import { motion } from "framer-motion";
import type { MenuItem } from "@/data/menu";
import { fmt } from "@/data/menu";

export function MenuCard({ item, index = 0 }: { item: MenuItem; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: (index % 8) * 0.04 }}
      whileHover={{ y: -4 }}
      className="group relative rounded-2xl border border-border bg-card p-5 shadow-soft transition-all hover:shadow-burger"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-xl text-foreground">{item.name}</h3>
      </div>
      {item.desc && (
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
      )}
      <div className="mt-4 flex items-end gap-5">
        {item.single != null && (
          <div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Single</div>
            <div className="font-display text-lg text-primary">{fmt(item.single)}</div>
          </div>
        )}
        {item.double != null && (
          <div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Double</div>
            <div className="font-display text-lg text-primary">{fmt(item.double)}</div>
          </div>
        )}
        {item.price != null && (
          <div className="font-display text-lg text-primary">{fmt(item.price)}</div>
        )}
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 scale-x-0 rounded-b-2xl bg-gradient-red transition-transform duration-300 group-hover:scale-x-100" />
    </motion.div>
  );
}
