"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CircleDot } from "lucide-react";

export default function ProjectDNA({ architecture }: { architecture: string[] }) {
  const reducedMotion = useReducedMotion();
  const nodes = architecture.map((line, index) => {
    const [name, ...details] = line.split(" — ");
    return { name, detail: details.join(" — "), index };
  });

  return <div className="project-dna" aria-label="Project architecture flow">
    <div className="project-dna-track" aria-hidden="true" />
    <ol>{nodes.map((node, index) => <motion.li key={`${node.name}-${index}`} initial={reducedMotion ? false : { opacity: 0, y: 14, scale: .98 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: .2 }} transition={{ duration: reducedMotion ? 0 : .45, delay: reducedMotion ? 0 : index * .07, ease: [.22, 1, .36, 1] }}>
      <span className="project-dna-node"><CircleDot size={18} aria-hidden="true" /><span>{String(index + 1).padStart(2, "0")}</span></span>
      <h3>{node.name}</h3>{node.detail && <p>{node.detail}</p>}
      {index < nodes.length - 1 && <ArrowRight className="project-dna-arrow" size={15} aria-hidden="true" />}
    </motion.li>)}</ol>
    <p className="project-dna-caption">SYSTEM FLOW / {nodes.length} CONNECTED LAYERS</p>
  </div>;
}
