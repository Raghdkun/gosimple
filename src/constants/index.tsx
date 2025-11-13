import { useMediaQuery } from 'react-responsive';

// Responsive breakpoints
export const breakpoints = {
    mobile: '(max-width: 767px)',
    tablet: '(min-width: 768px) and (max-width: 1023px)',
    desktop: '(min-width: 1024px) and (max-width: 1439px)',
    large: '(min-width: 1440px)'
};


export const ourWork = [
    {
        title: 'Logistics Dashboard',
        theChallenges: "Our client's team was overwhelmed by data scattered across reports and tools. Managers spent hours each week collecting updates and tracking performance manually, struggling to get accurate, real-time insights.",
        ourSolution: "We built a centralized dashboard that automates data collection, visualizes key metrics, and organizes everything in one place. Managers can now access real-time performance data, track progress, and make data-driven decisions with ease.",
        imageLink: '/dashboard.png'
    },
    {
        title: 'Logistics Website',
        theChallenges: "Our customers needed more than just an online presence, they needed a website that performs. Many struggled with platforms that were slow, hard to manage, and failed to convert visitors into real opportunities.",
        ourSolution: "We build high-performing websites that are fast, responsive, and simple to manage. Each one is tailored to the brand, optimized for results, and built to support growth with a seamless user experience.",
        imageLink: '/website.png'
    },
    {
        title: 'Learning Platform',
        theChallenges: "Our customer's team needed a smarter way to manage employee development. Tracking courses, attendance, and evaluations across multiple tools caused confusion, missed sessions, and wasted time.",
        ourSolution: "We built a centralized learning and attendance system that automates assignments, tracking, and progress. It features email alerts, flexible scheduling, built-in quizzes, and personalized dashboards.",
        imageLink: '/learning.png'
    }
]






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
