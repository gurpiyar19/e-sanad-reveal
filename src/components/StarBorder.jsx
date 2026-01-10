import { useRef, useEffect } from 'react';

/**
 * StarBorder - An animated star-themed border component from ReactBits
 * Wraps children with an animated glowing star border effect
 * Perfect for cards and containers that need a premium animated border
 */
export default function StarBorder({
    as: Component = 'div',
    className = '',
    color = '#fbbf24',
    secondaryColor = '#f59e0b',
    speed = '4s',
    borderWidth = '2px',
    borderRadius = '32px',
    children,
    ...props
}) {
    const containerRef = useRef(null);

    useEffect(() => {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion && containerRef.current) {
            containerRef.current.style.setProperty('--star-animation-speed', '0s');
        }
    }, []);

    return (
        <Component
            ref={containerRef}
            className={`star-border-container ${className}`}
            style={{
                '--star-color': color,
                '--star-secondary-color': secondaryColor,
                '--star-animation-speed': speed,
                '--star-border-width': borderWidth,
                '--star-border-radius': borderRadius,
                position: 'relative',
            }}
            {...props}
        >
            {/* Animated star border gradient */}
            <div
                className="star-border-glow"
                style={{
                    position: 'absolute',
                    inset: '0',
                    borderRadius: borderRadius,
                    overflow: 'hidden',
                    zIndex: 0,
                    pointerEvents: 'none',
                }}
            >
                {/* Rotating conic gradient for star effect */}
                <div
                    className="star-border-rotate"
                    style={{
                        position: 'absolute',
                        inset: '-150%',
                        background: `conic-gradient(
                            from 0deg,
                            transparent 0deg,
                            ${color} 30deg,
                            ${secondaryColor} 60deg,
                            transparent 90deg,
                            transparent 120deg,
                            ${color} 150deg,
                            ${secondaryColor} 180deg,
                            transparent 210deg,
                            transparent 240deg,
                            ${color} 270deg,
                            ${secondaryColor} 300deg,
                            transparent 330deg,
                            transparent 360deg
                        )`,
                        animation: `starBorderSpin var(--star-animation-speed) linear infinite`,
                    }}
                />
            </div>

            {/* Outer glow effect on hover */}
            <div
                className="star-border-outer-glow"
                style={{
                    position: 'absolute',
                    inset: '-4px',
                    borderRadius: `calc(${borderRadius} + 4px)`,
                    background: `linear-gradient(135deg, ${color}40, ${secondaryColor}40, ${color}40)`,
                    filter: 'blur(12px)',
                    opacity: 0,
                    transition: 'opacity 0.4s ease',
                    zIndex: -1,
                    pointerEvents: 'none',
                }}
            />

            {/* Inner content wrapper - masks the rotating gradient to create border */}
            <div
                className="star-border-inner"
                style={{
                    position: 'relative',
                    borderRadius: `calc(${borderRadius} - ${borderWidth})`,
                    zIndex: 1,
                }}
            >
                {children}
            </div>

            <style>{`
                @keyframes starBorderSpin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                
                .star-border-container:hover .star-border-outer-glow {
                    opacity: 1;
                }
                
                .star-border-container:hover .star-border-rotate {
                    animation-duration: calc(var(--star-animation-speed) / 1.5);
                }
            `}</style>
        </Component>
    );
}
