import type { MotionStyle } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ArrowUp,
  Heart,
  Menu,
  X,
  ArrowLeft,
  Sun,
  Moon,
  ShoppingBag,
  GraduationCap,
  Layers,
  Briefcase,
  Code,
} from 'lucide-react';

import type { LucideIcon } from 'lucide-react';
import { useTheme } from '../context/useTheme';
import { ScrollProgress } from '../components/ScrollProgress';
import {
  fadeInUp,
  scaleIn,
  staggerContainer,
  viewportOnce,
} from '../lib/motionVariants';

type ProjectCategory = 'Full Stack' | 'React' | 'WordPress';
type FilterType = 'All' | ProjectCategory;
type ProjectStatus = 'In Progress' | 'Completed';

interface PortfolioProject {
  title: string;
  category: ProjectCategory;
  status: ProjectStatus;
  description: string;
  technologies: string[];
  icon: LucideIcon;
  liveDemo?: string;
  githubLink?: string;
}

const allProjects: PortfolioProject[] = [
  {
    title: 'TaskForge',
    category: 'Full Stack',
    status: 'In Progress',
    description:
      'A MERN Stack and TypeScript-based SaaS project management application. It is being developed with authentication, workspaces, projects, tasks, role-based access, notifications, and subscription management.',
    technologies: [
      'React.js',
      'TypeScript',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Tailwind CSS',
    ],
    icon: Layers,
    githubLink: 'https://github.com/shahrywebdesigner/taskforge',
  },
  {
    title: 'EcommerceShop',
    category: 'Full Stack',
    status: 'Completed',
    description:
      'A full-stack MERN eCommerce application featuring user authentication, product management, shopping cart, order processing, and an admin dashboard for managing products and orders.',
    technologies: [
      'MongoDB',
      'Express.js',
      'React.js',
      'Node.js',
      'REST APIs',
    ],
    icon: ShoppingBag,
    githubLink: 'https://github.com/shahrywebdesigner/ecommerceshop',
  },
  {
    title: 'ZaptroStore',
    category: 'React',
    status: 'Completed',
    description:
      'A React-based eCommerce application featuring product browsing, authentication, protected routes, cart functionality, API integration, and responsive layouts.',
    technologies: [
      'React.js',
      'Tailwind CSS',
      'Context API',
      'Clerk',
      'REST API',
    ],
    icon: ShoppingBag,
    liveDemo: 'https://zaptrostore.netlify.app/',
  },
  {
    title: 'Edusity',
    category: 'React',
    status: 'Completed',
    description:
      'A responsive educational website built with React. It includes a modern landing page, reusable UI sections, and a contact form with email functionality.',
    technologies: [
      'React.js',
      'JavaScript',
      'CSS3',
      'Responsive Design',
    ],
    icon: GraduationCap,
    liveDemo: 'https://edusitee.netlify.app/',
  },
  {
    title: 'Software Download Website',
    category: 'WordPress',
    status: 'Completed',
    description:
      'A WordPress website built with Elementor, featuring categorized software listings, organized content, and a responsive layout.',
    technologies: [
      'WordPress',
      'Elementor',
      'Responsive Design',
      'SEO',
    ],
    icon: Code,
  },
  {
    title: 'Lone Star Roofer',
    category: 'WordPress',
    status: 'Completed',
    description:
      'A WordPress-based roofing business website designed with Elementor, focusing on a mobile-friendly layout and clear service presentation.',
    technologies: [
      'WordPress',
      'Elementor',
      'Responsive Design',
    ],
    icon: Briefcase,
  },
  {
    title: 'Prime Legal & Psychiatric Websites',
    category: 'WordPress',
    status: 'Completed',
    description:
      'Client website projects built using WordPress and Elementor, with responsive page layouts, service sections, and contact forms.',
    technologies: [
      'WordPress',
      'Elementor',
      'WPForms',
      'Contact Form 7',
      'Rank Math SEO',
    ],
    icon: Briefcase,
  },
];

const FILTERS: FilterType[] = [
  'All',
  'Full Stack',
  'React',
  'WordPress',
];

const socialLinks = [
  {
    href: 'https://github.com/shahrywebdesigner',
    Icon: Github,
    label: 'GitHub',
  },
  {
    href: 'https://www.linkedin.com/in/shahryararshad/',
    Icon: Linkedin,
    label: 'LinkedIn',
  },
  {
    href: 'mailto:shahryararshad333@gmail.com',
    Icon: Mail,
    label: 'Email',
  },
];

const surfaceStyle: MotionStyle = {
  backgroundColor: 'var(--color-card)',
  border: '1px solid var(--color-border)',
  color: 'var(--color-text)',
};

function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 300);

    window.addEventListener('scroll', handler, { passive: true });

    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-40 w-12 h-12 rounded-full flex items-center justify-center shadow-xl"
          style={{
            backgroundColor: 'var(--color-accent)',
            color: 'var(--color-base)',
          }}
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

function ProjectDetailCard({
  project,
}: {
  project: PortfolioProject;
}) {
  const Icon = project.icon;
  const isInProgress = project.status === 'In Progress';

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.88 }}
      transition={{
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -5 }}
      className="group rounded-3xl p-7 flex flex-col h-full transition-colors duration-300"
      style={surfaceStyle}
    >
      <div className="flex items-start justify-between gap-3 mb-6">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{
            backgroundColor: 'var(--color-surface)',
            color: 'var(--color-accent)',
            border: '1px solid var(--color-border)',
          }}
        >
          <Icon className="w-7 h-7" />
        </div>

        <span
          className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
          style={{
            backgroundColor: isInProgress
              ? 'rgba(217, 119, 6, 0.12)'
              : 'var(--color-surface)',
            color: isInProgress
              ? '#D97706'
              : 'var(--color-muted)',
            border: `1px solid ${
              isInProgress
                ? 'rgba(217, 119, 6, 0.25)'
                : 'var(--color-border)'
            }`,
          }}
        >
          {isInProgress && (
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
          )}
          {project.status}
        </span>
      </div>

      <div className="mb-3">
        <span
          className="text-xs font-semibold uppercase tracking-wider"
          style={{ color: 'var(--color-secondary)' }}
        >
          {project.category}
        </span>

        <h3
          className="font-display text-xl font-bold mt-2 transition-colors duration-200"
          style={{ color: 'var(--color-text)' }}
        >
          {project.title}
        </h3>
      </div>

      <p
        className="text-sm leading-relaxed mb-6 flex-grow"
        style={{ color: 'var(--color-muted)' }}
      >
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {project.technologies.map((technology) => (
          <span
            key={technology}
            className="px-2.5 py-1 rounded-full text-xs font-medium"
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-muted)',
            }}
          >
            {technology}
          </span>
        ))}
      </div>

      {(project.liveDemo || project.githubLink) && (
        <div
          className="flex items-center gap-4 pt-5 border-t"
          style={{ borderColor: 'var(--color-border)' }}
        >
          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-70"
              style={{ color: 'var(--color-text)' }}
            >
              Live Demo
              <ExternalLink className="w-4 h-4" />
            </a>
          )}

          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-70"
              style={{ color: 'var(--color-muted)' }}
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
          )}
        </div>
      )}
    </motion.article>
  );
}

export default function ProjectsPage() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const [activeFilter, setActiveFilter] = useState<FilterType>('All');
  const [mobileOpen, setMobileOpen] = useState(false);

  const filteredProjects = allProjects.filter((project) => {
    if (activeFilter === 'All') return true;
    return project.category === activeFilter;
  });

  const getCount = (filter: FilterType) => {
    if (filter === 'All') return allProjects.length;

    return allProjects.filter(
      (project) => project.category === filter
    ).length;
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const navigationLinks = [
    { label: 'Home', href: '/#home' },
    { label: 'About', href: '/#about' },
    { label: 'Education', href: '/#education' },
    { label: 'Experience', href: '/#experience' },
    { label: 'Skills', href: '/#skills' },
    { label: 'Contact', href: '/#contact' },
  ];

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: 'var(--color-base)',
        color: 'var(--color-text)',
      }}
    >
      <ScrollProgress />
      <BackToTopButton />

      {/* Navbar */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-40 border-b"
        style={{
          backgroundColor: 'var(--color-surface)',
          borderColor: 'var(--color-border)',
        }}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.button
            type="button"
            onClick={() => navigate('/')}
            className="font-display font-bold text-xl md:text-2xl"
            style={{ color: 'var(--color-text)' }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Shahryar Arshad
          </motion.button>

          <div className="hidden md:flex items-center gap-1">
            {navigationLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3 py-2 text-sm font-medium transition-colors hover:opacity-70"
                style={{ color: 'var(--color-muted)' }}
              >
                {link.label}
              </a>
            ))}

            <span
              className="px-3 py-2 text-sm font-semibold"
              style={{ color: 'var(--color-text)' }}
            >
              Projects
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
              style={{
                backgroundColor: 'var(--color-card)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text)',
              }}
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            <button
              type="button"
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
              className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                backgroundColor: 'var(--color-card)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text)',
              }}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close navigation menu"
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 cursor-default"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />

            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              className="fixed top-0 right-0 h-full w-72 max-w-[85vw] z-50 border-l p-6"
              style={{
                backgroundColor: 'var(--color-surface)',
                borderColor: 'var(--color-border)',
              }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{
                type: 'spring',
                damping: 30,
                stiffness: 300,
              }}
            >
              <div
                className="flex items-center justify-between pb-5 border-b"
                style={{ borderColor: 'var(--color-border)' }}
              >
                <span className="font-display font-bold text-lg">
                  Navigation
                </span>

                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setMobileOpen(false)}
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{
                    backgroundColor: 'var(--color-card)',
                    color: 'var(--color-text)',
                  }}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex flex-col gap-2 pt-5">
                {navigationLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 rounded-xl font-medium transition-colors"
                    style={{ color: 'var(--color-muted)' }}
                  >
                    {link.label}
                  </a>
                ))}

                <span
                  className="px-4 py-3 rounded-xl font-semibold"
                  style={{
                    backgroundColor: 'var(--color-card)',
                    color: 'var(--color-text)',
                  }}
                >
                  Projects
                </span>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Hero */}
      <section
        className="pt-36 pb-20 px-6 text-center relative overflow-hidden"
        style={{ backgroundColor: 'var(--color-base)' }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-3xl opacity-10"
            style={{ backgroundColor: 'var(--color-accent)' }}
          />
        </div>

        <motion.div
          className="relative max-w-4xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeInUp}>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 mb-8 px-5 py-2.5 rounded-full text-sm font-medium transition-colors"
              style={{
                backgroundColor: 'var(--color-card)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-muted)',
              }}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </button>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            custom={0.1}
            className="font-display text-5xl lg:text-7xl font-bold mb-6"
            style={{ color: 'var(--color-text)' }}
          >
            My Projects
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            custom={0.2}
            className="text-lg md:text-xl mb-3"
            style={{ color: 'var(--color-muted)' }}
          >
            A selection of projects I've worked on
          </motion.p>

          <motion.p
            variants={fadeInUp}
            custom={0.25}
            className="text-sm mb-10"
            style={{ color: 'var(--color-secondary)' }}
          >
            {allProjects.length} projects across Full Stack, React and WordPress
          </motion.p>

          {/* Project counts */}
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {FILTERS.map((filter, index) => (
              <motion.button
                key={filter}
                type="button"
                variants={scaleIn}
                custom={index * 0.08}
                onClick={() => setActiveFilter(filter)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="rounded-2xl px-6 py-4 text-center transition-colors duration-300"
                style={{
                  backgroundColor:
                    activeFilter === filter
                      ? 'var(--color-surface)'
                      : 'var(--color-card)',
                  border: `1px solid ${
                    activeFilter === filter
                      ? 'var(--color-accent)'
                      : 'var(--color-border)'
                  }`,
                }}
              >
                <div
                  className="font-display text-2xl font-bold"
                  style={{ color: 'var(--color-text)' }}
                >
                  {getCount(filter)}
                </div>

                <div
                  className="text-xs mt-1"
                  style={{ color: 'var(--color-muted)' }}
                >
                  {filter === 'All' ? 'Total Projects' : filter}
                </div>
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Projects Grid */}
      <section
        className="pb-24 px-6"
        style={{ backgroundColor: 'var(--color-base)' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between gap-4 mb-8">
            <p
              className="text-sm"
              style={{ color: 'var(--color-muted)' }}
            >
              Showing {filteredProjects.length} of {allProjects.length} projects
            </p>

            {activeFilter !== 'All' && (
              <button
                type="button"
                onClick={() => setActiveFilter('All')}
                className="text-sm font-semibold hover:opacity-70"
                style={{ color: 'var(--color-text)' }}
              >
                Clear filter
              </button>
            )}
          </div>

          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-7"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <ProjectDetailCard
                  key={project.title}
                  project={project}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <p style={{ color: 'var(--color-muted)' }}>
                No projects found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-10 border-t"
        style={{
          backgroundColor: 'var(--color-surface)',
          borderColor: 'var(--color-border)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-5">
            <div
              className="flex items-center gap-2 text-sm"
              style={{ color: 'var(--color-muted)' }}
            >
              <span>
                © {new Date().getFullYear()} Shahryar Arshad. Made with
              </span>

              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
              >
                <Heart className="w-4 h-4 text-red-500" />
              </motion.span>
            </div>

            <div className="flex gap-3">
              {socialLinks.map(({ href, Icon, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={
                    href.startsWith('http')
                      ? 'noopener noreferrer'
                      : undefined
                  }
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    backgroundColor: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-muted)',
                  }}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
