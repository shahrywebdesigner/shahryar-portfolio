import type { MotionStyle } from 'framer-motion';
import { motion, useMotionValue, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import type { ReactNode, MouseEvent } from 'react';
import {
  Code,
  Server,
  Database,
  Braces,
  Layers,
  Globe,
  ChevronDown,
} from 'lucide-react';
import { fadeInUp } from '../lib/motionVariants';

interface HeroSectionProps {
  onNavigate: (section: string) => void;
}

const SKILLS = [
  { label: 'React.js', Icon: Code },
  { label: 'Node.js', Icon: Server },
  { label: 'Express.js', Icon: Layers },
  { label: 'MongoDB', Icon: Database },
  { label: 'JavaScript', Icon: Braces },
  { label: 'REST APIs', Icon: Globe },
];

function SkillCycler() {
  const [index, setIndex] = useState(0);
  const current = SKILLS[index];

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % SKILLS.length);
    }, 2800);

    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-52 h-52">
        {/* Dynamic silver glow */}
        <div
          className="absolute inset-0 rounded-full blur-2xl"
          style={{
            backgroundColor: 'var(--color-accent)',
            opacity: 0.16,
          }}
        />

        {/* Platinum border ring */}
        <div
          className="relative w-full h-full rounded-full p-[2px]"
          style={{
            background:
              'linear-gradient(135deg, var(--color-accent), var(--color-accent-secondary))',
          }}
        >
          {/* Inner circle */}
          <div
            className="w-full h-full rounded-full flex flex-col items-center justify-center gap-2 overflow-hidden"
            style={{ backgroundColor: 'var(--color-base)' }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  scale: 0.5,
                  filter: 'blur(10px)',
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  filter: 'blur(0px)',
                }}
                exit={{
                  opacity: 0,
                  scale: 1.4,
                  filter: 'blur(10px)',
                }}
                transition={{
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex flex-col items-center gap-3"
              >
                <current.Icon
                  className="w-16 h-16"
                  strokeWidth={1.5}
                  style={{ color: 'var(--color-accent)' }}
                />

                <span
                  className="text-sm font-display font-semibold tracking-wide"
                  style={{ color: 'var(--color-text)' }}
                >
                  {current.label}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

const badges = [
  { label: 'React.js', Icon: Code, delay: 0 },
  { label: 'Node.js', Icon: Server, delay: 1.2 },
  { label: 'Express.js', Icon: Layers, delay: 0.4 },
  { label: 'MongoDB', Icon: Database, delay: 0.8 },
  { label: 'JavaScript', Icon: Braces, delay: 1.6 },
  { label: 'REST APIs', Icon: Globe, delay: 0.6 },
];


function MagneticButton({
  children,
  className,
  onClick,
  style,
}: {
  children: ReactNode;
  className: string;
  onClick: () => void;
  style?: MotionStyle;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    const rect = ref.current?.getBoundingClientRect();

    if (!rect) return;

    x.set((e.clientX - rect.left - rect.width / 2) * 0.3);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{ ...style, x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.button>
  );
}


export function HeroSection({ onNavigate }: HeroSectionProps) {
  const heroContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      {/* Background layers */}
      <div className="absolute inset-0 aurora-bg" />
      <div className="absolute inset-0 grid-overlay opacity-40" />

      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% -20%, var(--color-electric-glow), transparent)',
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 80% 80%, var(--color-violet-glow), transparent)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* Left: Text content */}
        <motion.div
          variants={heroContainer}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Availability */}
          <motion.div variants={fadeInUp} custom={0}>
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border"
              style={{
                color: 'var(--color-text)',
                backgroundColor: 'var(--color-glass)',
                borderColor: 'var(--color-glass-border)',
              }}
            >
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: 'var(--color-accent)' }}
              />
              Open to Entry-Level Opportunities
            </span>
          </motion.div>

          {/* Name and title */}
          <motion.div
            variants={fadeInUp}
            custom={0.1}
            className="space-y-4"
          >
            <h1 className="text-5xl lg:text-7xl font-display font-bold leading-tight gradient-text-electric">
              Shahryar Arshad
            </h1>

            <div
              className="text-xl lg:text-2xl font-display font-semibold tracking-wide"
              style={{ color: 'var(--color-text)' }}
            >
              MERN Stack{' '}
              <span style={{ color: 'var(--color-accent-secondary)' }}>
                Developer
              </span>
            </div>
          </motion.div>

          {/* Introduction */}
          <motion.p
            variants={fadeInUp}
            custom={0.2}
            className="text-lg leading-relaxed max-w-xl"
            style={{ color: 'var(--color-muted)' }}
          >
            Mathematics graduate and aspiring MERN Stack Developer with
            hands-on experience building full-stack web applications using
            React.js, Node.js, Express.js, and MongoDB. Interested in creating
            practical web solutions, writing clean code, and growing through
            real-world development experience.
          </motion.p>

          {/* Action buttons */}
          <motion.div
            variants={fadeInUp}
            custom={0.3}
            className="flex flex-col sm:flex-row gap-4 pt-2"
          >

<MagneticButton
  onClick={() => onNavigate('projects')}
  className="px-8 py-4 rounded-2xl font-display font-semibold text-center transition-all hover:opacity-85"
  style={{
    backgroundColor: 'var(--color-accent)',
    color: 'var(--color-base)',
  }}
>
  View My Work
</MagneticButton>

<MagneticButton
  onClick={() => onNavigate('contact')}
  className="px-8 py-4 rounded-2xl font-display font-semibold border transition-all text-center hover-lift"
  style={{
    color: 'var(--color-text)',
    borderColor: 'var(--color-border)',
    backgroundColor: 'var(--color-glass)',
  }}
>
  Get In Touch
</MagneticButton>

          </motion.div>
        </motion.div>

        {/* Right: Skill cycler + orbital badges */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative h-[420px] lg:h-[500px] flex items-center justify-center"
        >
          {/* Ambient glow */}
          <div
            className="absolute w-72 h-72 rounded-full blur-3xl"
            style={{ backgroundColor: 'var(--color-electric-glow)' }}
          />

          {/* Center skill cycler */}
          <div className="relative z-10">
            <SkillCycler />
          </div>

          {/* Floating skill badges */}
          {badges.map(({ label, Icon, delay }, i) => {
            const angle = (i / badges.length) * 360 - 90;
            const radius = 170;
            const rad = (angle * Math.PI) / 180;
            const cx = Math.cos(rad) * radius;
            const cy = Math.sin(rad) * radius;

            return (
              <motion.div
                key={label}
                className="absolute backdrop-blur-sm border rounded-xl px-3 py-2 flex items-center gap-2 shadow-lg"
                style={{
                  left: '50%',
                  top: '50%',
                  backgroundColor: 'var(--color-card)',
                  borderColor: 'var(--color-border)',
                }}
                initial={{
                  opacity: 0,
                  x: cx,
                  y: cy,
                  scale: 0.8,
                }}
                animate={{
                  opacity: 1,
                  x: cx,
                  y: cy,
                  scale: 1,
                  translateX: '-50%',
                  translateY: '-50%',
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.6 + delay,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    duration: 2.5 + i * 0.3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="flex items-center gap-2"
                >
                  <Icon
                    className="w-4 h-4"
                    style={{ color: 'var(--color-accent)' }}
                  />

                  <span
                    className="text-xs font-medium whitespace-nowrap"
                    style={{ color: 'var(--color-text)' }}
                  >
                    {label}
                  </span>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        style={{ color: 'var(--color-muted)' }}
        animate={{ y: [0, 8, 0] }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <ChevronDown className="w-6 h-6" />
      </motion.div>
    </section>
  );
}
