import { useRef, useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import LocomotiveScroll from 'locomotive-scroll';
import GlareHover from './GlareHover';
import Particles from './ParticlesBackground';
import SplashCursor from './SplashCursor';
import CurtainEdge, { CurtainEdgeRight } from './CurtainEdge';
import StarBorder from './StarBorder';

export default function CurtainOverlay({ onRevealComplete }) {
    const containerRef = useRef(null);
    const overlayRef = useRef(null);
    const leftCurtainRef = useRef(null);
    const rightCurtainRef = useRef(null);
    const centerCardRef = useRef(null);
    const locomotiveRef = useRef(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const hasRevealedRef = useRef(false);

    // Initialize Locomotive Scroll
    useEffect(() => {
        if (!containerRef.current) return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        locomotiveRef.current = new LocomotiveScroll({
            el: containerRef.current,
            smooth: true,
            multiplier: 0.8,
            lerp: 0.08,  // Optimized from 0.1 for smoother performance
        });

        locomotiveRef.current.on('scroll', (args) => {
            const progress = Math.min(args.scroll.y / 300, 1);
            setScrollProgress(progress);

            if (progress >= 1 && !hasRevealedRef.current) {
                hasRevealedRef.current = true;
                onRevealComplete?.();
            }
        });

        return () => {
            locomotiveRef.current?.destroy();
        };
    }, [onRevealComplete]);

    // 3D Tilt effect for glass card
    const handleCardMouseMove = (e) => {
        if (!centerCardRef.current) return;

        const rect = centerCardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const rotateX = ((e.clientY - centerY) / rect.height) * -8;
        const rotateY = ((e.clientX - centerX) / rect.width) * 8;

        gsap.to(centerCardRef.current, {
            rotationX: rotateX,
            rotationY: rotateY,
            transformPerspective: 1000,
            duration: 0.5,
            ease: "power2.out"
        });
    };

    const handleCardMouseLeave = () => {
        if (!centerCardRef.current) return;
        gsap.to(centerCardRef.current, {
            rotationX: 0,
            rotationY: 0,
            duration: 0.5,
            ease: "power2.out"
        });
    };

    // Wind effect animation for curtains
    useGSAP(() => {
        const leftCurtain = leftCurtainRef.current;
        const rightCurtain = rightCurtainRef.current;

        if (!leftCurtain || !rightCurtain) return;

        const windTimeline = gsap.timeline({ repeat: -1, yoyo: true });

        windTimeline.to([leftCurtain, rightCurtain], {
            skewX: 0.7,
            duration: 2,
            ease: 'sine.inOut',
        }).to([leftCurtain, rightCurtain], {
            skewX: -0.7,
            duration: 2.5,
            ease: 'sine.inOut',
        }).to([leftCurtain, rightCurtain], {
            skewX: 0.7,
            duration: 1.8,
            ease: 'sine.inOut',
        });

        return () => {
            windTimeline.kill();
        };
    }, []);

    // Apply scroll-based curtain animation
    useGSAP(() => {
        const leftCurtain = leftCurtainRef.current;
        const rightCurtain = rightCurtainRef.current;
        const centerCard = centerCardRef.current;
        const overlay = overlayRef.current;

        if (!leftCurtain || !rightCurtain || !centerCard || !overlay) return;

        gsap.to(leftCurtain, {
            xPercent: -scrollProgress * 100,
            duration: 0.1,
            ease: 'none',
        });

        gsap.to(rightCurtain, {
            xPercent: scrollProgress * 100,
            duration: 0.1,
            ease: 'none',
        });

        gsap.to(centerCard, {
            opacity: 1 - scrollProgress,
            scale: 1 - (scrollProgress * 0.05),
            duration: 0.1,
            ease: 'none',
        });

        if (scrollProgress >= 1) {
            overlay.style.pointerEvents = 'none';
            gsap.to(overlay, { opacity: 0, duration: 0.3 });
        }
    }, [scrollProgress]);

    // Handle click to trigger reveal
    const handleReveal = () => {
        if (hasRevealedRef.current) return;

        locomotiveRef.current?.destroy();
        hasRevealedRef.current = true;

        // Fade out particles immediately
        const particlesContainer = document.querySelector('.particles-container');
        if (particlesContainer) {
            gsap.to(particlesContainer, {
                opacity: 0,
                duration: 0.5,
                ease: 'power2.out',
            });
        }

        // Fade out StarBorder glow
        const starBorderGlow = document.querySelector('.star-border-glow');
        if (starBorderGlow) {
            gsap.to(starBorderGlow, {
                opacity: 0,
                duration: 0.5,
                ease: 'power2.out',
            });
        }

        const tl = gsap.timeline({
            onComplete: () => {
                overlayRef.current.style.pointerEvents = 'none';
                onRevealComplete?.();
            }
        });

        tl.to(centerCardRef.current, {
            opacity: 0,
            scale: 0.95,
            duration: 0.6,
            ease: 'power2.inOut',
        }, 0);

        tl.to(leftCurtainRef.current, {
            xPercent: -100,
            duration: 2.5,
            ease: 'power2.inOut',
        }, 0.2);

        tl.to(rightCurtainRef.current, {
            xPercent: 100,
            duration: 2.5,
            ease: 'power2.inOut',
        }, 0.2);

        tl.to(overlayRef.current, {
            opacity: 0,
            duration: 0.4,
        }, 2.4);
    };


    return (
        <div
            ref={containerRef}
            data-scroll-container
            className="fixed inset-0 z-[1000] overflow-hidden"
        >
            <SplashCursor />

            {/* Scroll Progress Indicator */}
            <div className="scroll-indicator">
                <div
                    className="progress-bar"
                    style={{ width: `${scrollProgress * 100}%` }}
                />
            </div>

            <div
                ref={overlayRef}
                className="relative w-full h-screen flex items-center justify-center pt-8"
                data-scroll-section
                style={{ background: 'transparent' }}
            >
                {/* Floating Particles - Removed in favor of ParticlesBackground inside curtains */}
                {/* <Particles count={15} /> */}

                {/* Left Curtain - Full height, no header */}
                <div
                    ref={leftCurtainRef}
                    className="absolute top-0 left-0 w-[55%] h-full z-[5] will-change-transform origin-top curtain-depth"
                    data-scroll
                    data-scroll-speed="-2"
                    aria-hidden="true"
                >
                    {/* Enhanced velvet with animated lighting */}
                    <div className="absolute inset-0 curtain-fabric-enhanced" />

                    {/* Particles moving with curtain */}
                    <div className="absolute inset-0 opacity-60 mix-blend-screen">
                        <Particles
                            particleCount={150}
                            particleColors={['#fbbf24', '#d97706', '#ffffff']}
                            speed={0.2}
                        />
                    </div>

                    {/* Folds overlay */}
                    <div className="absolute inset-0 curtain-folds-left" />
                    {/* SVG Edge */}
                    <div className="absolute top-0 right-0 h-full">
                        <CurtainEdge />
                    </div>
                    {/* Gold trim */}
                    <div className="absolute top-0 right-[28px] w-2 h-full gold-trim shadow-[-2px_0_8px_rgba(212,175,55,0.5)]" />
                </div>

                {/* Right Curtain - Full height, no header */}
                <div
                    ref={rightCurtainRef}
                    className="absolute top-0 right-0 w-[55%] h-full z-[5] will-change-transform origin-top curtain-depth"
                    data-scroll
                    data-scroll-speed="2"
                    aria-hidden="true"
                >
                    {/* Enhanced velvet with animated lighting */}
                    <div className="absolute inset-0 curtain-fabric-enhanced" />

                    {/* Particles moving with curtain */}
                    <div className="absolute inset-0 opacity-60 mix-blend-screen">
                        <Particles
                            particleCount={150}
                            particleColors={['#fbbf24', '#d97706', '#ffffff']}
                            speed={0.2}
                        />
                    </div>

                    {/* Folds overlay */}
                    <div className="absolute inset-0 curtain-folds-right" />
                    {/* SVG Edge */}
                    <div className="absolute top-0 left-0 h-full">
                        <CurtainEdgeRight />
                    </div>
                    {/* Gold trim */}
                    <div className="absolute top-0 left-[28px] w-2 h-full gold-trim shadow-[2px_0_8px_rgba(212,175,55,0.5)]" />
                </div>

                {/* Center Content Card - Glassmorphism with 3D tilt + Star Border */}
                <StarBorder
                    as="div"
                    color="#fbbf24"
                    secondaryColor="#f59e0b"
                    speed="5s"
                    borderWidth="3px"
                    borderRadius="32px"
                    className="relative z-[10] w-[85%] max-w-[650px] mx-auto"
                >
                    <div
                        ref={centerCardRef}
                        onMouseMove={handleCardMouseMove}
                        onMouseLeave={handleCardMouseLeave}
                        className="p-6 md:p-8 glass-card text-center flex flex-col items-center w-full relative"
                        style={{ transformStyle: 'preserve-3d' }}
                        role="dialog"
                        aria-label="e-Sanad Launch Screen"
                        aria-modal="true"
                    >
                        {/* Header Row: Logo - Title - Logo */}
                        <div className="w-full flex items-center justify-between mb-4 mt-2 px-2">
                            {/* Left Logo */}
                            <img
                                src={`${import.meta.env.BASE_URL}logos/punjab-govt.png`}
                                alt="Government of Punjab"
                                className="h-16 md:h-20 w-auto object-contain flex-shrink-0"
                            />

                            {/* Center: Digital verification text */}
                            <div className="flex-grow flex flex-col items-center justify-center px-4">
                                <h2 className="text-gray-900 text-base md:text-lg font-bold leading-tight text-center">
                                    Digital verification of PSEB academic certificates
                                    <br />through E-Sanad portal for use abroad
                                </h2>
                            </div>

                            {/* Right Logo */}
                            <img
                                src={`${import.meta.env.BASE_URL}logos/pseb.png`}
                                alt="Punjab School Education Board"
                                className="h-16 md:h-20 w-auto object-contain flex-shrink-0"
                            />
                        </div>

                        {/* Punjabi Inauguration Text - Black */}
                        <p className="font-punjabi text-gray-900 text-2xl md:text-3xl font-bold mt-4 mb-1">
                            ਦਾ ਉਦਘਾਟਨ
                        </p>

                        {/* "ਵੱਲੋਂ" in small letters */}
                        <p className="font-punjabi text-gray-600 text-sm md:text-base font-medium mb-3">
                            ਵੱਲੋਂ
                        </p>

                        {/* Minister's Name - Gold/Amber */}
                        <p className="font-punjabi text-[#d97706] text-xl md:text-2xl font-bold mb-1">
                            ਸ. ਹਰਜੋਤ ਸਿੰਘ ਬੈਂਸ ਜੀ
                        </p>

                        {/* Minister's Title */}
                        <p className="font-punjabi text-gray-800 text-base md:text-lg font-medium mb-6">
                            ਸਿੱਖਿਆ ਮੰਤਰੀ, ਪੰਜਾਬ ਸਰਕਾਰ
                        </p>

                        {/* Launch Button */}
                        <div className="mb-6 relative z-50">
                            <GlareHover
                                onClick={handleReveal}
                                width="auto"
                                height="auto"
                                background="linear-gradient(135deg, #d97706 0%, #f59e0b 50%, #fbbf24 100%)"
                                borderRadius="16px"
                                borderColor="rgba(245, 158, 11, 0.5)"
                                glareColor="#ffffff"
                                glareOpacity={0.5}
                                glareAngle={-45}
                                glareSize={200}
                                transitionDuration={600}
                                className="px-12 py-4 shadow-[0_10px_30px_rgba(245,158,11,0.3)] hover:shadow-[0_15px_40px_rgba(245,158,11,0.4)]"
                            >
                                <span className="text-white text-xl font-bold tracking-wide">
                                    Launch
                                </span>
                            </GlareHover>
                        </div>

                        {/* Date in Punjabi */}
                        <p className="font-punjabi text-gray-700 text-base md:text-lg font-medium mb-2">
                            ਸੋਮਵਾਰ, 12 ਜਨਵਰੀ 2026
                        </p>

                        {/* E-Sanad */}
                        <p className="text-gray-900 text-xl md:text-2xl font-bold mb-8">
                            E-Sanad
                        </p>

                        {/* Footer: NIC Logo + Initiative Text */}
                        <div className="w-full flex items-center justify-center gap-4 border-t border-gray-200 pt-6 mt-auto">
                            <img
                                src={`${import.meta.env.BASE_URL}logos/nic.png`}
                                alt="NIC"
                                className="h-10 md:h-12 w-auto object-contain"
                            />
                            <span className="text-gray-700 text-sm md:text-base font-medium">
                                An initiative of Ministry of External Affairs
                            </span>
                        </div>
                    </div>
                </StarBorder>
            </div>

            {/* Extra scroll space for locomotive */}
            <div data-scroll-section className="h-[50vh]" />
        </div>
    );
}
