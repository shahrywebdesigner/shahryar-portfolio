
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sun, Moon } from 'lucide-react';
import { fadeInRight, staggerContainer } from '../lib/motionVariants';
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

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (section: string) => void;
  activeSection: string;
}

export function MobileMenu({
  isOpen,
  onClose,
  onNavigate,
  activeSection,
}: MobileMenuProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const colors = {
    text: isDark ? '#D4D4D8' : '#52525B',
    muted: isDark ? '#A1A1AA' : '#71717A',
    border: isDark ? '#303238' : '#E4E4E7',
    surface: isDark ? '#181A1F' : '#FFFFFF',
    activeText: isDark ? '#FFFFFF' : '#18181B',
    activeBackground: isDark
      ? 'rgba(209, 213, 219, 0.12)'
      : 'rgba(113, 113, 122, 0.12)',
    buttonBackground: isDark
      ? 'rgba(255,255,255,0.07)'
      : 'rgba(0,0,0,0.05)',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-50 backdrop-blur-sm"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.55)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            key="drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
            className="fixed top-0 right-0 h-full w-72 max-w-[85vw] z-50 border-l flex flex-col overflow-y-auto"
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
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
            {/* Header */}
            <div
              className="flex items-center justify-between p-6 border-b"
              style={{ borderColor: colors.border }}
            >
              <span className="font-display font-bold text-xl gradient-text-electric">
                Shahryar Arshad
              </span>

              <motion.button
                onClick={onClose}
                className="p-2 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{
                  color: colors.muted,
                  backgroundColor: colors.buttonBackground,
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Close navigation menu"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Navigation Links */}
            <motion.nav
              className="flex flex-col gap-1 p-6"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              aria-label="Mobile navigation"
            >
              {NAV_ITEMS.map((section, i) => {
                const isActive = activeSection === section;

                return (
                  <motion.button
                    key={section}
                    variants={fadeInRight}
                    custom={i * 0.04}
                    onClick={() => {
                      onNavigate(section);
                      onClose();
                    }}
                    className="text-left px-4 py-3 rounded-xl font-display font-medium capitalize transition-colors focus-visible:outline-none focus-visible:ring-2"
                    style={{
                      color: isActive ? colors.activeText : colors.text,
                      backgroundColor: isActive
                        ? colors.activeBackground
                        : 'transparent',
                    }}
                    whileTap={{ scale: 0.97 }}
                    aria-current={isActive ? 'location' : undefined}
                  >
                    {section}
                  </motion.button>
                );
              })}
            </motion.nav>

            {/* Theme Toggle */}
            <div
              className="mt-auto p-6 border-t"
              style={{ borderColor: colors.border }}
            >
              <p
                className="text-xs font-medium uppercase tracking-wider mb-3"
                style={{ color: colors.muted }}
              >
                Appearance
              </p>

              <motion.button
                onClick={toggleTheme}
                className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-colors"
                style={{
                  backgroundColor: colors.buttonBackground,
                  color: colors.text,
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
              >
                <span className="flex items-center gap-3">
                  {isDark ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}

                  <span className="font-medium text-sm">
                    {isDark ? 'Light Mode' : 'Dark Mode'}
                  </span>
                </span>

                <span
                  className="text-xs"
                  style={{ color: colors.muted }}
                >
                  {isDark ? 'Dark' : 'Light'}
                </span>
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
