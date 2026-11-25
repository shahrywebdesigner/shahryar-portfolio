import type { MotionStyle } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import { emailjsConfig } from './config';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code,
  Github,
  Linkedin,
  Mail,
  MapPin,
  ExternalLink,
  Zap,
  GraduationCap,
  ArrowUp,
  Heart,
  Clock,
  Calendar,
  Phone,
  ShoppingBag,
  Briefcase,
  Database,
  Wrench,
  Layers,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { CustomCursor } from './components/CustomCursor';
import { ScrollProgress } from './components/ScrollProgress';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { ProjectCard } from './components/ProjectCard';
import type { Project } from './components/ProjectCard';
import { ProjectModal } from './components/ProjectModal';
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  staggerContainer,
  viewportOnce,
} from './lib/motionVariants';
import { useScrollspy } from './hooks/useScrollspy';

const SECTION_IDS = [
  'home',
  'about',
  'education',
  'experience',
  'projects',
  'skills',
  'contact',
];

const sectionStyle: React.CSSProperties = {
  backgroundColor: 'var(--color-base)',
  color: 'var(--color-text)',
};

const alternateSectionStyle: React.CSSProperties = {
  backgroundColor: 'var(--color-surface)',
  color: 'var(--color-text)',
};

const cardStyle: MotionStyle = {
  backgroundColor: 'var(--color-card)',
  border: '1px solid var(--color-border)',
  color: 'var(--color-text)',
};

function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <motion.div
      className="text-center mb-16"
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <h2
        className="font-display text-4xl md:text-5xl font-bold mb-4"
        style={{ color: 'var(--color-text)' }}
      >
        {title}
      </h2>

      <p
        className="text-lg md:text-xl"
        style={{ color: 'var(--color-muted)' }}
      >
        {subtitle}
      </p>

      <div
        className="w-16 h-px mx-auto mt-4"
        style={{ backgroundColor: 'var(--color-accent)' }}
      />
    </motion.div>
  );
}

function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggle = () => setIsVisible(window.scrollY > 300);

    window.addEventListener('scroll', toggle, { passive: true });

    return () => window.removeEventListener('scroll', toggle);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full flex items-center justify-center shadow-2xl"
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

function App() {
  const navigate = useNavigate();
  const activeSection = useScrollspy(SECTION_IDS);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');

  const isTouchDevice =
    typeof window !== 'undefined' &&
    window.matchMedia('(pointer: coarse)').matches;

  const scrollToSection = (sectionId: string) => {
    document
      .getElementById(sectionId)
      ?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const hash = window.location.hash;

    if (!hash) return;

    const sectionId = hash.slice(1);

    const timer = window.setTimeout(() => {
      document
        .getElementById(sectionId)
        ?.scrollIntoView({ behavior: 'smooth' });
    }, 80);

    return () => window.clearTimeout(timer);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.subject.trim() ||
      !formData.message.trim()
    ) {
      setSubmitStatus('error');
      window.setTimeout(() => setSubmitStatus('idle'), 3000);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const { serviceId, templateId, publicKey } = emailjsConfig;

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: 'shahryararshad333@gmail.com',
        },
        publicKey
      );

      setSubmitStatus('success');

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      console.error('Email sending failed:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      window.setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  const projects: Project[] = [
    {
      title: 'TaskForge',
      description:
        'A MERN Stack and TypeScript-based SaaS project management application. It is being developed with authentication, workspaces, projects, tasks, role-based access, notifications, and subscription management. This project is currently in progress.',
      technologies: [
        'React.js',
        'TypeScript',
        'Node.js',
        'Express.js',
        'MongoDB',
        'Tailwind CSS',
      ],
      icon: Layers,
      gradient: 'bg-gradient-to-br from-slate-500 to-zinc-700',
      githubLink: 'https://github.com/shahrywebdesigner/taskforge',
    },
    {
      title: 'EcommerceShop',
      description:
        'A full-stack MERN eCommerce application with user authentication, product management, shopping cart, order processing, and an admin dashboard for managing products and orders.',
      technologies: [
        'MongoDB',
        'Express.js',
        'React.js',
        'Node.js',
        'REST APIs',
      ],
      icon: ShoppingBag,
      gradient: 'bg-gradient-to-br from-slate-500 to-zinc-700',
      githubLink: 'https://github.com/shahrywebdesigner/ecommerceshop',
    },
    {
      title: 'ZaptroStore',
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
      gradient: 'bg-gradient-to-br from-slate-500 to-zinc-700',
      liveDemo: 'https://zaptrostore.netlify.app/',
    },
    {
      title: 'Edusity',
      description:
        'A responsive educational website built with React. It includes a modern landing page, reusable UI sections, and a contact form with email functionality.',
      technologies: ['React.js', 'JavaScript', 'CSS3', 'Responsive Design'],
      icon: GraduationCap,
      gradient: 'bg-gradient-to-br from-slate-500 to-zinc-700',
      liveDemo: 'https://edusitee.netlify.app/',
    },
    {
      title: 'Software Download Website',
      description:
        'A WordPress website built with Elementor, featuring categorized software listings, organized content, and a responsive layout.',
      technologies: ['WordPress', 'Elementor', 'Responsive Design', 'SEO'],
      icon: Code,
      gradient: 'bg-gradient-to-br from-slate-500 to-zinc-700',
    },
    {
      title: 'Lone Star Roofer',
      description:
        'A WordPress-based roofing business website designed with Elementor, focusing on a mobile-friendly layout and clear service presentation.',
      technologies: ['WordPress', 'Elementor', 'Responsive Design'],
      icon: Briefcase,
      gradient: 'bg-gradient-to-br from-slate-500 to-zinc-700',
    },
    {
      title: 'Prime Legal & Psychiatric Websites',
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
      gradient: 'bg-gradient-to-br from-slate-500 to-zinc-700',
    },
  ];

  
  const skillCategories = [
    {
      title: 'Frontend Development',
      skills: [
        'HTML5',
        'CSS3',
        'JavaScript ES6+',
        'TypeScript',
        'React.js',
        'Tailwind CSS',
        'Bootstrap',
      ],
      icon: Code,
    },
    {
      title: 'Backend Development',
      skills: [
        'Node.js',
        'Express.js',
        'REST APIs',
        'PHP',
        'Mongoose',
      ],
      icon: Zap,
    },
    {
      title: 'Databases',
      skills: [
        'MongoDB',
        'MySQL',
        'PostgreSQL (Basics)',
        'SQLite (Basics)',
      ],
      icon: Database,
    },
    {
      title: 'Authentication & Authorization',
      skills: [
        'JWT Authentication',
        'bcryptjs',
        'HTTP-only Cookies',
        'RBAC (Role-Based Access Control)',
      ],
      icon: Layers,
    },
    {
      title: 'AI Tools',
      skills: [
        'ChatGPT',
        'Claude',
        'Gemini',
      ],
      icon: Zap,
    },
    {
      title: 'DevOps & Developer Tools',
      skills: [
        'Git',
        'GitHub',
        'Postman',
        'Docker (Basics)',
      ],
      icon: Wrench,
    },
    {
      title: 'CMS & Design Tools',
      skills: [
        'WordPress',
        'Elementor',
        'Figma',
        'Canva',
      ],
      icon: Briefcase,
    },
    {
      title: 'Payment Integration & Billing',
      skills: [
        'Stripe (Test Mode)',
        'Subscription Billing',
      ],
      icon: ShoppingBag,
    },
  ];


  
  const education = [
    {
      degree: "Bachelor's Degree in Mathematics",
      university: 'University of the Punjab, Lahore',
      duration: 'December 2020 – December 2024',
    },
    {
      degree: 'F.Sc Pre-Engineering',
      university: 'GHSS',
      duration: '2018 – 2020',
    },
  ];


  const experience = [
    {
      position: 'WordPress Developer',
      company: 'CodiCare Tech',
      duration: 'April 2025 – August 2025',
      isCurrent: false,
    },
    {
      position: 'WordPress Intern',
      company: 'Codenic Tech',
      duration: 'January 2025 – February 2025',
      isCurrent: false,
    },
  ];

  const contactDetails = [
    {
      icon: Mail,
      title: 'Email',
      value: 'shahryararshad333@gmail.com',
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+92 312 0476372',
    },
    {
      icon: Clock,
      title: 'Availability',
      value: 'Open to entry-level opportunities',
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Lahore, Pakistan',
    },
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

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: 'var(--color-base)',
        color: 'var(--color-text)',
      }}
    >
      {!isTouchDevice && <CustomCursor />}

      <ScrollProgress />
      <BackToTopButton />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <Navbar
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      <HeroSection onNavigate={scrollToSection} />

      {/* About */}
      <section id="about" className="py-24" style={alternateSectionStyle}>
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            title="About Me"
            subtitle="A little about my background and what I do"
          />

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-8"
              variants={fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <p
                className="text-lg md:text-xl leading-relaxed"
                style={{ color: 'var(--color-muted)' }}
              >
                I'm a MERN Stack Developer based in Lahore, Pakistan, with
                hands-on experience building web applications using React.js,
                Node.js, Express.js, and MongoDB. I enjoy working on practical
                projects, building responsive interfaces, integrating APIs,
                and developing full-stack functionality. I hold a Bachelor's
                degree in Mathematics from the University of the Punjab and
                am looking to grow as a developer in a professional team.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { number: 'MERN', label: 'Full Stack Development' },
                  { number: 'React', label: 'Frontend Development' },
                  { number: 'REST', label: 'API Integration' },
                  { number: 'WP', label: 'WordPress Experience' },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    variants={scaleIn}
                    custom={index * 0.1}
                    className="rounded-2xl p-5 text-center"
                    style={cardStyle}
                  >
                    <div
                      className="text-2xl md:text-3xl font-display font-bold mb-2"
                      style={{ color: 'var(--color-accent)' }}
                    >
                      {stat.number}
                    </div>

                    <div
                      className="font-medium text-sm"
                      style={{ color: 'var(--color-muted)' }}
                    >
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="flex justify-center"
              variants={fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <div className="relative">
                <div
                  className="absolute inset-0 rounded-full blur-3xl scale-110 opacity-20"
                  style={{ backgroundColor: 'var(--color-accent)' }}
                />

                <div
                  className="relative w-72 h-72 rounded-full p-[2px]"
                  style={{
                    background:
                      'linear-gradient(135deg, var(--color-accent), var(--color-secondary))',
                  }}
                >
                  <div
                    className="w-full h-full rounded-full overflow-hidden"
                    style={{ backgroundColor: 'var(--color-card)' }}
                  >
                    <img
                      src="/image.jpeg"
                      alt="Shahryar Arshad"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Education */}
      <section id="education" className="py-24" style={sectionStyle}>
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            title="Education"
            subtitle="My academic background"
          />

          <div className="max-w-3xl mx-auto grid gap-6">
            {education.map((edu, index) => (
              <motion.div
                key={edu.degree}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                custom={index * 0.1}
                className="rounded-3xl p-8"
                style={cardStyle}
              >
                <div className="flex items-center gap-4 mb-5">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{
                      backgroundColor: 'var(--color-surface)',
                      color: 'var(--color-accent)',
                    }}
                  >
                    <GraduationCap className="w-7 h-7" />
                  </div>

                  <div>
                    <h3 className="font-display text-xl font-bold">
                      {edu.degree}
                    </h3>

                    <p style={{ color: 'var(--color-accent)' }}>
                      {edu.university}
                    </p>
                  </div>
                </div>

                <div
                  className="flex items-center gap-3 text-sm"
                  style={{ color: 'var(--color-muted)' }}
                >
                  <Calendar className="w-4 h-4" />
                  <span>{edu.duration}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section
        id="experience"
        className="py-24"
        style={alternateSectionStyle}
      >
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            title="Professional Experience"
            subtitle="My professional journey"
          />

          <ExperienceTimeline experience={experience} />
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-24" style={sectionStyle}>
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            title="Featured Projects"
            subtitle="A selection of my development work"
          />

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {projects.slice(0, 6).map((project, index) => (
              <motion.div
                key={project.title}
                variants={fadeInUp}
                custom={index * 0.08}
              >
                <ProjectCard
                  project={project}
                  onOpen={setSelectedProject}
                />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="flex flex-col items-center gap-4 mt-14"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <p
              className="text-sm"
              style={{ color: 'var(--color-muted)' }}
            >
              Showing 6 of {projects.length} projects
            </p>

            <motion.button
              type="button"
              onClick={() => navigate('/projects')}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-display font-semibold shadow-xl"
              style={{
                backgroundColor: 'var(--color-accent)',
                color: 'var(--color-base)',
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              View All Projects
              <ExternalLink className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Skills */}
      <section
        id="skills"
        className="py-24"
        style={alternateSectionStyle}
      >
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            title="Skills & Technologies"
            subtitle="Tools and technologies I work with"
          />

          <div className="grid lg:grid-cols-2 gap-8">
            {skillCategories.map((category, index) => (
              <motion.div
                key={category.title}
                variants={index % 2 === 0 ? fadeInLeft : fadeInRight}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                custom={index * 0.1}
                className="rounded-3xl p-8"
                style={cardStyle}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{
                      backgroundColor: 'var(--color-surface)',
                      color: 'var(--color-accent)',
                    }}
                  >
                    <category.icon className="w-6 h-6" />
                  </div>

                  <h3 className="font-display text-xl font-bold">
                    {category.title}
                  </h3>
                </div>

                <motion.div
                  className="grid grid-cols-2 gap-3"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                >
                  {category.skills.map((skill) => (
                    <motion.div
                      key={skill}
                      variants={scaleIn}
                      whileHover={{ scale: 1.04 }}
                      className="rounded-xl p-3 text-center"
                      style={{
                        backgroundColor: 'var(--color-surface)',
                        border: '1px solid var(--color-border)',
                      }}
                    >
                      <span
                        className="font-medium text-sm"
                        style={{ color: 'var(--color-muted)' }}
                      >
                        {skill}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24" style={sectionStyle}>
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            title="Let's Connect"
            subtitle="Have an opportunity or project in mind? Feel free to reach out"
          />

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              className="space-y-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              {contactDetails.map((contact, index) => (
                <motion.div
                  key={contact.title}
                  variants={fadeInLeft}
                  custom={index * 0.1}
                  className="flex items-center gap-6"
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: 'var(--color-card)',
                      border: '1px solid var(--color-border)',
                      color: 'var(--color-accent)',
                    }}
                  >
                    <contact.icon className="w-6 h-6" />
                  </div>

                  <div>
                    <h4 className="font-display text-lg font-semibold mb-1">
                      {contact.title}
                    </h4>

                    <p style={{ color: 'var(--color-muted)' }}>
                      {contact.value}
                    </p>
                  </div>
                </motion.div>
              ))}

              <motion.div
                variants={fadeInLeft}
                custom={0.4}
                className="flex gap-4 pt-2"
              >
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
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200"
                    style={{
                      backgroundColor: 'var(--color-card)',
                      border: '1px solid var(--color-border)',
                      color: 'var(--color-muted)',
                    }}
                    whileHover={{ y: -3, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              variants={fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="rounded-3xl p-8"
              style={cardStyle}
            >
              <form onSubmit={handleSubmit} className="space-y-5">
                {[
                  {
                    name: 'name',
                    type: 'text',
                    placeholder: 'Your Name',
                  },
                  {
                    name: 'email',
                    type: 'email',
                    placeholder: 'Your Email',
                  },
                  {
                    name: 'subject',
                    type: 'text',
                    placeholder: 'Subject',
                  },
                ].map((field) => (
                  <input
                    key={field.name}
                    type={field.type}
                    name={field.name}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={handleInputChange}
                    placeholder={field.placeholder}
                    required
                    className="w-full px-5 py-4 rounded-2xl outline-none transition-all duration-300"
                    style={{
                      backgroundColor: 'var(--color-surface)',
                      border: '1px solid var(--color-border)',
                      color: 'var(--color-text)',
                    }}
                  />
                ))}

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  placeholder="Your Message"
                  required
                  className="w-full px-5 py-4 rounded-2xl outline-none transition-all duration-300 resize-none"
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-text)',
                  }}
                />

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 rounded-2xl font-display font-semibold transition-all shadow-xl disabled:opacity-50"
                  style={{
                    backgroundColor: 'var(--color-accent)',
                    color: 'var(--color-base)',
                  }}
                  whileHover={isSubmitting ? {} : { scale: 1.02 }}
                  whileTap={isSubmitting ? {} : { scale: 0.98 }}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </motion.button>

                <AnimatePresence mode="wait">
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-center text-sm p-3 rounded-xl"
                      style={{
                        color: '#16A34A',
                        backgroundColor: 'rgba(22,163,74,0.1)',
                      }}
                    >
                      Message sent successfully! I'll get back to you soon.
                    </motion.div>
                  )}

                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-center text-sm p-3 rounded-xl"
                      style={{
                        color: '#DC2626',
                        backgroundColor: 'rgba(220,38,38,0.1)',
                      }}
                    >
                      Something went wrong. Please check your details and try
                      again.
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-16 border-t"
        style={{
          backgroundColor: 'var(--color-surface)',
          borderColor: 'var(--color-border)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-10 mb-12">
            <div>
              <div
                className="font-display text-3xl font-bold mb-4"
                style={{ color: 'var(--color-text)' }}
              >
                Shahryar Arshad
              </div>

              <p
                className="leading-relaxed mb-6 text-sm"
                style={{ color: 'var(--color-muted)' }}
              >
                MERN Stack Developer interested in building practical,
                responsive, and user-friendly web applications.
              </p>

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
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
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

            <div>
              <h3 className="font-display text-lg font-bold mb-5">
                Quick Links
              </h3>

              <div className="space-y-3">
                {[
                  { name: 'Home', section: 'home' },
                  { name: 'About', section: 'about' },
                  { name: 'Education', section: 'education' },
                  { name: 'Experience', section: 'experience' },
                  { name: 'Projects', section: 'projects' },
                  { name: 'Skills', section: 'skills' },
                  { name: 'Contact', section: 'contact' },
                ].map((link) => (
                  <button
                    key={link.section}
                    type="button"
                    onClick={() => scrollToSection(link.section)}
                    className="block text-sm transition-colors"
                    style={{ color: 'var(--color-muted)' }}
                  >
                    {link.name}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => navigate('/projects')}
                  className="block text-sm font-medium"
                  style={{ color: 'var(--color-accent)' }}
                >
                  All Projects →
                </button>
              </div>
            </div>

            <div>
              <h3 className="font-display text-lg font-bold mb-5">
                Contact Info
              </h3>

              <div className="space-y-4">
                {[
                  { Icon: Mail, text: 'shahryararshad333@gmail.com' },
                  { Icon: Phone, text: '+92 312 0476372' },
                  { Icon: GraduationCap, text: 'University of the Punjab' },
                  { Icon: MapPin, text: 'Lahore, Pakistan' },
                ].map(({ Icon, text }) => (
                  <div key={text} className="flex items-center gap-3">
                    <Icon
                      className="w-4 h-4 flex-shrink-0"
                      style={{ color: 'var(--color-accent)' }}
                    />

                    <span
                      className="text-sm"
                      style={{ color: 'var(--color-muted)' }}
                    >
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            className="border-t pt-8"
            style={{ borderColor: 'var(--color-border)' }}
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div
                className="flex items-center gap-2 text-sm"
                style={{ color: 'var(--color-muted)' }}
              >
                <span>© {new Date().getFullYear()} Shahryar Arshad. Made with</span>

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

              <span
                className="text-sm"
                style={{ color: 'var(--color-muted)' }}
              >
                Lahore, Pakistan
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
