
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { X, ExternalLink, Github } from 'lucide-react';
import type { Project } from './ProjectCard';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handler);

    return () => {
      document.removeEventListener('keydown', handler);
    };
  }, [project, onClose]);

  useEffect(() => {
    if (!project) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [project]);

  const liveDemo = project?.liveDemo || project?.link;
  const githubLink = project?.githubLink;

  const ProjectIcon = project?.icon;

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-50 backdrop-blur-md"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            className="fixed inset-4 md:inset-12 lg:inset-20 z-50 rounded-2xl overflow-y-auto shadow-2xl border"
            style={{
              backgroundColor: 'var(--color-surface)',
              borderColor: 'var(--color-border)',
            }}
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{
              type: 'spring',
              damping: 28,
              stiffness: 380,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 md:p-12">
              {/* Header */}
              <div className="flex items-start justify-between mb-8">
                {ProjectIcon && (
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
                    style={{
                      background:
                        'linear-gradient(135deg, var(--color-accent), var(--color-accent-secondary))',
                    }}
                  >
                    <ProjectIcon
                      className="w-8 h-8"
                      style={{ color: 'var(--color-base)' }}
                    />
                  </div>
                )}

                <motion.button
                  type="button"
                  onClick={onClose}
                  className="p-2 rounded-xl transition-colors"
                  style={{
                    color: 'var(--color-muted)',
                    backgroundColor: 'var(--color-glass)',
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Close project details"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Project title */}
              <h2
                id="project-modal-title"
                className="font-display text-3xl md:text-4xl font-bold mb-4"
                style={{ color: 'var(--color-text)' }}
              >
                {project.title}
              </h2>

              {/* Description */}
              <p
                className="text-base leading-relaxed mb-8"
                style={{ color: 'var(--color-muted)' }}
              >
                {project.description}
              </p>

              {/* Technologies */}
              <div className="mb-8">
                <h3
                  className="font-display font-semibold mb-4 text-sm uppercase tracking-wider"
                  style={{ color: 'var(--color-muted)' }}
                >
                  Technologies Used
                </h3>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-full text-sm border font-medium"
                      style={{
                        backgroundColor: 'var(--color-glass)',
                        color: 'var(--color-text)',
                        borderColor: 'var(--color-border)',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Links */}
              {(liveDemo || githubLink) && (
                <div className="flex flex-wrap gap-3">
                  {liveDemo && liveDemo !== '#' && (
                    <motion.a
                      href={liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-display font-semibold transition-opacity hover:opacity-85"
                      style={{
                        backgroundColor: 'var(--color-accent)',
                        color: 'var(--color-base)',
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Live Demo
                      <ExternalLink className="w-4 h-4" />
                    </motion.a>
                  )}

                  {githubLink && githubLink !== '#' && (
                    <motion.a
                      href={githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border font-display font-semibold transition-colors"
                      style={{
                        color: 'var(--color-text)',
                        borderColor: 'var(--color-border)',
                        backgroundColor: 'var(--color-glass)',
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Github className="w-4 h-4" />
                      GitHub
                      <ExternalLink className="w-4 h-4" />
                    </motion.a>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
