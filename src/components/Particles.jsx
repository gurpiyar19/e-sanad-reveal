import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

/**
 * Particles - Floating golden particles for ceremonial atmosphere
 * Creates 30 particles with random movement patterns
 */
export default function Particles({ count = 30 }) {
    const particlesRef = useRef([]);

    useGSAP(() => {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        particlesRef.current.forEach((particle) => {
            if (!particle) return;

            // Random initial position is set in style, animate from there
            gsap.to(particle, {
                y: `random(-150, 150)`,
                x: `random(-80, 80)`,
                opacity: `random(0.2, 0.5)`,
                scale: `random(0.5, 1.5)`,
                duration: `random(8, 15)`,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: `random(0, 3)`,
            });
        });
    }, [count]);

    return (
        <div className="particles-container" aria-hidden="true">
            {Array.from({ length: count }).map((_, i) => (
                <div
                    key={i}
                    ref={(el) => (particlesRef.current[i] = el)}
                    className="particle"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        opacity: Math.random() * 0.3 + 0.2,
                    }}
                />
            ))}
        </div>
    );
}
