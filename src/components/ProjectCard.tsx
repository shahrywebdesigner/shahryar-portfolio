
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { cardHover } from '../lib/motionVariants';
import type { LucideIcon } from 'lucide-react';

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  icon: LucideIcon;
  gradient: string;
  link?: string;
  liveDemo?: string;
  githubLink?: string;
}

interface ProjectCardProps {
  project: Project;
  onOpen: (project: Project) => void;
}

export function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const { title, description, technologies, icon: Icon } = project;

  return (
    <motion.button
      type="button"
      className="group relative text-left backdrop-blur-md rounded-3xl p-7 flex flex-col h-full w-full overflow-hidden border transition-colors duration-300"
      style={{
        backgroundColor: 'var(--color-card)',
        borderColor: 'var(--color-border)',
      }}
      variants={cardHover}
      initial="rest"
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      onClick={() => onOpen(project)}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 60px var(--color-electric-glow)',
        }}
      />

      {/* Icon */}
      <div
        className="relative w-14 h-14 rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-105 transition-transform duration-300"
        style={{
          background:
            'linear-gradient(135deg, var(--color-accent), var(--color-accent-secondary))',
        }}
      >
        <Icon
          className="w-7 h-7"
          style={{ color: 'var(--color-base)' }}
        />
      </div>

      {/* Project title */}
      <h3
        className="relative font-display text-xl font-bold mb-3 transition-colors duration-300 leading-tight"
        style={{ color: 'var(--color-text)' }}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        className="relative leading-relaxed mb-5 text-sm flex-grow line-clamp-3"
        style={{ color: 'var(--color-muted)' }}
      >
        {description}
      </p>

      {/* Technologies */}
      <div className="relative flex flex-wrap gap-1.5 mb-5">
        {technologies.slice(0, 4).map((tech) => (
          <span
            key={tech}
            className="px-2.5 py-1 rounded-full text-xs font-medium border"
            style={{
              backgroundColor: 'var(--color-glass)',
              color: 'var(--color-text)',
              borderColor: 'var(--color-border)',
            }}
          >
            {tech}
          </span>
        ))}

        {technologies.length > 4 && (
          <span
            className="px-2.5 py-1 rounded-full text-xs border"
            style={{
              backgroundColor: 'var(--color-glass)',
              color: 'var(--color-muted)',
              borderColor: 'var(--color-border)',
            }}
          >
            +{technologies.length - 4}
          </span>
        )}
      </div>

      {/* View details */}
      <div
        className="relative flex items-center gap-2 text-sm font-semibold"
        style={{ color: 'var(--color-accent-secondary)' }}
      >
        View Details

        <motion.span
          variants={{
            rest: { x: 0, y: 0 },
            hover: { x: 4, y: -2 },
          }}
          transition={{ duration: 0.2 }}
        >
          <ArrowUpRight className="w-4 h-4" />
        </motion.span>
      </div>
    </motion.button>
  );
}
