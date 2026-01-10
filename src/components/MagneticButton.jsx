import { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import './MagneticButton.css';

/**
 * MagneticButton - Premium magnetic button with shimmer effect
 * Button follows cursor within radius, has 3D shadows and shimmer animation
 */
export default function MagneticButton({
    children,
    onClick,
    className = '',
    magneticRadius = 120,
    magneticStrength = 0.3,
}) {
    const buttonRef = useRef(null);
    const xTo = useRef(null);
    const yTo = useRef(null);

    // Initialize GSAP quickTo for smooth magnetic effect
    useGSAP(() => {
        if (!buttonRef.current) return;

        xTo.current = gsap.quickTo(buttonRef.current, "x", {
            duration: 0.6,
            ease: "power3.out"
        });
        yTo.current = gsap.quickTo(buttonRef.current, "y", {
            duration: 0.6,
            ease: "power3.out"
        });
    }, []);

    const handleMouseMove = (e) => {
        if (!buttonRef.current || !xTo.current || !yTo.current) return;

        const rect = buttonRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        if (distance < magneticRadius) {
            xTo.current(deltaX * magneticStrength);
            yTo.current(deltaY * magneticStrength);
        }
    };

    const handleMouseLeave = () => {
        if (xTo.current && yTo.current) {
            xTo.current(0);
            yTo.current(0);
        }
    };

    // Add document-level mouse tracking for magnetic effect
    useEffect(() => {
        const handleDocumentMouseMove = (e) => {
            if (!buttonRef.current) return;

            const rect = buttonRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const deltaX = e.clientX - centerX;
            const deltaY = e.clientY - centerY;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

            if (distance < magneticRadius && xTo.current && yTo.current) {
                xTo.current(deltaX * magneticStrength);
                yTo.current(deltaY * magneticStrength);
            } else if (xTo.current && yTo.current) {
                xTo.current(0);
                yTo.current(0);
            }
        };

        document.addEventListener('mousemove', handleDocumentMouseMove);
        return () => document.removeEventListener('mousemove', handleDocumentMouseMove);
    }, [magneticRadius, magneticStrength]);

    return (
        <button
            ref={buttonRef}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`magnetic-button ${className}`}
        >
            {/* Shimmer overlay */}
            <span className="magnetic-button__shimmer" aria-hidden="true" />

            {/* Button content */}
            <span className="magnetic-button__content">
                {children}
            </span>
        </button>
    );
}
