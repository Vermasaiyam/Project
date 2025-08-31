// colors/theme.ts
export const colors = {
  // Primary brand colors
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    900: '#1e3a8a',
  },
  
  // Secondary colors
  secondary: {
    50: '#faf5ff',
    100: '#f3e8ff',
    500: '#a855f7',
    600: '#9333ea',
    700: '#7c3aed',
    900: '#581c87',
  },
  
  // Success colors
  success: {
    50: '#ecfdf5',
    100: '#d1fae5',
    500: '#10b981',
    600: '#059669',
    700: '#047857',
    900: '#064e3b',
  },
  
  // Error colors
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    900: '#7f1d1d',
  },
  
  // Warning colors
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    900: '#78350f',
  },
  
  // Neutral colors
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  
  // HR Portal specific colors
  hrPortal: {
    background: {
      light: 'linear-gradient(135deg, #eff6ff 0%, #ffffff 50%, #faf5ff 100%)',
      dark: 'linear-gradient(135deg, #111827 0%, #1f2937 50%, #111827 100%)',
    },
    card: {
      light: '#ffffff',
      dark: '#1f2937',
      border: {
        light: '#e5e7eb',
        dark: '#374151',
      }
    },
    button: {
      primary: 'linear-gradient(135deg, #3b82f6 0%, #a855f7 100%)',
      primaryHover: 'linear-gradient(135deg, #2563eb 0%, #9333ea 100%)',
      success: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      successHover: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
    },
    accent: {
      blue: '#3b82f6',
      purple: '#a855f7',
      green: '#10b981',
    }
  }
};

// Utility function to get CSS custom properties
export const getCSSVariables = () => ({
  '--color-primary': colors.primary[500],
  '--color-primary-hover': colors.primary[600],
  '--color-secondary': colors.secondary[500],
  '--color-secondary-hover': colors.secondary[600],
  '--color-success': colors.success[500],
  '--color-success-hover': colors.success[600],
  '--color-error': colors.error[500],
  '--color-warning': colors.warning[500],
});

// Theme configuration
export const theme = {
  light: {
    background: colors.hrPortal.background.light,
    card: colors.hrPortal.card.light,
    cardBorder: colors.hrPortal.card.border.light,
    text: colors.gray[900],
    textSecondary: colors.gray[600],
    textMuted: colors.gray[400],
  },
  dark: {
    background: colors.hrPortal.background.dark,
    card: colors.hrPortal.card.dark,
    cardBorder: colors.hrPortal.card.border.dark,
    text: colors.gray[50],
    textSecondary: colors.gray[300],
    textMuted: colors.gray[400],
  }
};