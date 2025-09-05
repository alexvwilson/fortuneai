/**
 * Responsive design utilities and breakpoint management
 */

// Breakpoint definitions matching Tailwind CSS
export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

// Responsive utility functions
export const ResponsiveUtils = {
  // Check if current viewport matches breakpoint
  isBreakpoint: (breakpoint: keyof typeof breakpoints): boolean => {
    if (typeof window === "undefined") return false;
    const width = window.innerWidth;
    const breakpointValue = parseInt(breakpoints[breakpoint]);
    return width >= breakpointValue;
  },

  // Get current breakpoint
  getCurrentBreakpoint: (): keyof typeof breakpoints | "xs" => {
    if (typeof window === "undefined") return "xs";
    const width = window.innerWidth;

    if (width >= parseInt(breakpoints["2xl"])) return "2xl";
    if (width >= parseInt(breakpoints.xl)) return "xl";
    if (width >= parseInt(breakpoints.lg)) return "lg";
    if (width >= parseInt(breakpoints.md)) return "md";
    if (width >= parseInt(breakpoints.sm)) return "sm";
    return "xs";
  },

  // Responsive class generators
  getResponsiveClasses: (classes: {
    xs?: string;
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
    "2xl"?: string;
  }): string => {
    return Object.entries(classes)
      .map(([breakpoint, className]) => {
        if (breakpoint === "xs") return className;
        return `${breakpoint}:${className}`;
      })
      .filter(Boolean)
      .join(" ");
  },
};

// Container utilities
export const ContainerUtils = {
  // Standard container classes
  container: "container mx-auto px-4 sm:px-6 lg:px-8",
  containerSm: "container mx-auto px-4 sm:px-6",
  containerLg: "container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12",

  // Content width utilities
  contentWidth: {
    narrow: "max-w-2xl mx-auto",
    medium: "max-w-4xl mx-auto",
    wide: "max-w-6xl mx-auto",
    full: "max-w-full",
  },
};

// Grid utilities
export const GridUtils = {
  // Responsive grid classes
  grid: {
    "1": "grid grid-cols-1",
    "2": "grid grid-cols-1 md:grid-cols-2",
    "3": "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    "4": "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    auto: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  },

  // Gap utilities
  gap: {
    sm: "gap-2 sm:gap-4",
    md: "gap-4 sm:gap-6",
    lg: "gap-6 sm:gap-8",
  },
};

// Typography utilities
export const TypographyUtils = {
  // Responsive text sizes
  heading: {
    h1: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl",
    h2: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl",
    h3: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl",
    h4: "text-xl sm:text-2xl md:text-3xl lg:text-4xl",
    h5: "text-lg sm:text-xl md:text-2xl lg:text-3xl",
    h6: "text-base sm:text-lg md:text-xl lg:text-2xl",
  },

  // Responsive body text
  body: {
    large: "text-lg sm:text-xl md:text-2xl",
    medium: "text-base sm:text-lg md:text-xl",
    small: "text-sm sm:text-base md:text-lg",
    xs: "text-xs sm:text-sm md:text-base",
  },
};

// Spacing utilities
export const SpacingUtils = {
  // Responsive padding
  padding: {
    section: "py-8 sm:py-12 md:py-16 lg:py-20",
    container: "px-4 sm:px-6 lg:px-8",
    card: "p-4 sm:p-6 md:p-8",
  },

  // Responsive margins
  margin: {
    section: "my-8 sm:my-12 md:my-16 lg:my-20",
    element: "mb-4 sm:mb-6 md:mb-8",
  },
};

// Layout utilities
export const LayoutUtils = {
  // Flexbox utilities
  flex: {
    center: "flex items-center justify-center",
    between: "flex items-center justify-between",
    start: "flex items-center justify-start",
    end: "flex items-center justify-end",
    column: "flex flex-col items-center",
    row: "flex flex-row items-center",
  },

  // Responsive flex direction
  flexDirection: {
    responsive: "flex flex-col sm:flex-row",
    column: "flex flex-col",
    row: "flex flex-row",
  },

  // Responsive visibility
  visibility: {
    mobileOnly: "block sm:hidden",
    desktopOnly: "hidden sm:block",
    tabletOnly: "hidden md:block lg:hidden",
    mobileTablet: "block lg:hidden",
    tabletDesktop: "hidden sm:block",
  },
};

// Card utilities
export const CardUtils = {
  // Standard card classes
  card: "bg-gray-900/50 border border-gray-800 rounded-lg shadow-lg",
  cardHover:
    "bg-gray-900/50 border border-gray-800 rounded-lg shadow-lg hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300",

  // Responsive card padding
  padding: "p-4 sm:p-6 md:p-8",

  // Card variants
  variants: {
    default: "bg-gray-900/50 border-gray-800",
    elevated: "bg-gray-800/50 border-gray-700 shadow-xl",
    glass: "bg-gray-900/30 border-gray-700/50 backdrop-blur-sm",
  },
};

// Button utilities
export const ButtonUtils = {
  // Responsive button sizes
  size: {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
    xl: "px-8 py-4 text-xl",
  },

  // Responsive button groups
  group: {
    horizontal: "flex flex-row gap-2 sm:gap-4",
    vertical: "flex flex-col gap-2 sm:gap-4",
    responsive: "flex flex-col sm:flex-row gap-2 sm:gap-4",
  },
};

// Form utilities
export const FormUtils = {
  // Responsive form layouts
  layout: {
    single: "space-y-4",
    twoColumn: "grid grid-cols-1 md:grid-cols-2 gap-4",
    threeColumn: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
  },

  // Form field spacing
  fieldSpacing: "space-y-4 sm:space-y-6",

  // Form button groups
  buttonGroup: "flex flex-col sm:flex-row gap-2 sm:gap-4",
};

// Navigation utilities
export const NavigationUtils = {
  // Responsive navigation
  nav: {
    horizontal:
      "flex flex-row items-center space-x-4 sm:space-x-6 lg:space-x-8",
    vertical: "flex flex-col space-y-2 sm:space-y-4",
    mobile: "flex flex-col space-y-1 sm:hidden",
    desktop: "hidden sm:flex flex-row items-center space-x-4 lg:space-x-6",
  },

  // Navigation items
  item: "px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors",
  activeItem: "px-3 py-2 rounded-lg bg-purple-600 text-white",
};

// Animation utilities
export const AnimationUtils = {
  // Responsive animations
  fadeIn: "animate-in fade-in duration-300",
  slideIn: "animate-in slide-in-from-bottom-4 duration-300",
  scaleIn: "animate-in zoom-in-95 duration-300",

  // Hover animations
  hover: {
    scale: "transform transition-transform duration-200 hover:scale-105",
    glow: "transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25",
    lift: "transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
  },
};

// Theme utilities
export const ThemeUtils = {
  // Color schemes
  colors: {
    primary: "text-purple-400",
    secondary: "text-gray-300",
    accent: "text-purple-300",
    muted: "text-gray-400",
    success: "text-green-400",
    warning: "text-yellow-400",
    error: "text-red-400",
  },

  // Background colors
  backgrounds: {
    primary: "bg-purple-600",
    secondary: "bg-gray-800",
    accent: "bg-purple-500",
    muted: "bg-gray-700",
    success: "bg-green-600",
    warning: "bg-yellow-600",
    error: "bg-red-600",
  },

  // Border colors
  borders: {
    primary: "border-purple-500",
    secondary: "border-gray-600",
    accent: "border-purple-400",
    muted: "border-gray-700",
  },
};

// Export all utilities
export const Responsive = {
  breakpoints,
  ResponsiveUtils,
  ContainerUtils,
  GridUtils,
  TypographyUtils,
  SpacingUtils,
  LayoutUtils,
  CardUtils,
  ButtonUtils,
  FormUtils,
  NavigationUtils,
  AnimationUtils,
  ThemeUtils,
};
