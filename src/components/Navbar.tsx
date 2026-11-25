
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';
import { Menu, Moon, Sun } from 'lucide-react';
import { MobileMenu } from './MobileMenu';
import { useTheme } from '../context/ThemeContext';

const NAV_ITEMS = [
  'home',
  'about',
  'education',
  'experience',
  'projects',
  'skills',
  'contact',
];

interface NavbarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { scrollY } = useScroll();
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === 'dark';

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 60);
  });

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-40 border-b"
        animate={{
          backgroundColor: isDark
            ? scrolled
              ? 'rgba(9, 10, 12, 0.97)'
              : 'rgba(9, 10, 12, 0.75)'
            : scrolled
              ? 'rgba(245, 245, 245, 0.97)'
              : 'rgba(245, 245, 245, 0.75)',
          paddingTop: scrolled ? '10px' : '16px',
          paddingBottom: scrolled ? '10px' : '16px',
          borderColor: isDark
            ? 'rgba(255, 255, 255, 0.08)'
            : 'rgba(0, 0, 0, 0.08)',
        }}
        transition={{ duration: 0.3 }}
        style={{ backdropFilter: 'blur(20px)' }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <motion.button
            onClick={() => onNavigate('home')}
            className="font-display font-bold text-2xl gradient-text-electric"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Shahryar Arshad
          </motion.button>

          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((section) => (
              <button
                key={section}
                onClick={() => onNavigate(section)}
                className="relative px-3 py-2 capitalize text-sm font-medium group"
              >
                <span
                  className="transition-colors duration-200"
                  style={{
                    color:
                      activeSection === section
                        ? isDark
                          ? '#D1D5DB'
                          : '#52525B'
                        : isDark
                          ? '#A1A1AA'
                          : '#71717A',
                  }}
                >
                  {section}
                </span>

                {activeSection === section && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-px left-3 right-3 h-px"
                    style={{
                      backgroundColor: isDark ? '#D1D5DB' : '#71717A',
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 30,
                    }}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-lg transition-colors"
              style={{
                color: isDark ? '#D1D5DB' : '#52525B',
                backgroundColor: isDark
                  ? 'rgba(255,255,255,0.07)'
                  : 'rgba(0,0,0,0.06)',
              }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
              title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            >
              {isDark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </motion.button>

            <motion.button
              className="md:hidden p-2 rounded-lg transition-colors"
              style={{
                color: isDark ? '#D1D5DB' : '#52525B',
                backgroundColor: isDark
                  ? 'rgba(255,255,255,0.07)'
                  : 'rgba(0,0,0,0.06)',
              }}
              onClick={() => setMobileOpen(true)}
              whileTap={{ scale: 0.95 }}
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onNavigate={onNavigate}
        activeSection={activeSection}
      />
    </>
  );
}
