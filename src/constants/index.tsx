import { useMediaQuery } from 'react-responsive';

// Responsive breakpoints
export const breakpoints = {
    mobile: '(max-width: 767px)',
    tablet: '(min-width: 768px) and (max-width: 1023px)',
    desktop: '(min-width: 1024px) and (max-width: 1439px)',
    large: '(min-width: 1440px)'
};

// Custom hooks for responsive design
export const useResponsive = () => {
    const isMobile = useMediaQuery({ query: breakpoints.mobile });
    const isTablet = useMediaQuery({ query: breakpoints.tablet });
    const isDesktop = useMediaQuery({ query: breakpoints.desktop });
    const isLarge = useMediaQuery({ query: breakpoints.large });
    
    return {
        isMobile,
        isTablet,
        isDesktop,
        isLarge,
        isDesktopOrLarger: isDesktop || isLarge,
        isTabletOrLarger: isTablet || isDesktop || isLarge
    };
};
