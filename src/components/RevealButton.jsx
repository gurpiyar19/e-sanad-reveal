import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function RevealButton({ onClick, children }) {
  const buttonRef = useRef(null);

  // Subtle breathing animation for attention
  useGSAP(() => {
    const button = buttonRef.current;
    if (!button) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Gentle pulse effect
    gsap.to(button, {
      boxShadow: '0 8px 25px rgba(255, 20, 147, 0.5), 0 4px 10px rgba(0, 0, 0, 0.15)',
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });

    return () => {
      gsap.killTweensOf(button);
    };
  }, { scope: buttonRef });

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      type="button"
      aria-label="Click to Launch e-Sanad System"
      className="
        relative inline-flex items-center justify-center
        px-8 py-4 min-w-[220px]
        text-lg md:text-xl font-semibold italic text-pink-700
        btn-pink-gradient
        border-none rounded-xl cursor-pointer
        shadow-[0_6px_20px_rgba(255,20,147,0.35),0_3px_8px_rgba(0,0,0,0.15),inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.1)]
        transition-all duration-200 ease-out
        hover:translate-y-[-2px] hover:scale-[1.02]
        hover:shadow-[0_10px_30px_rgba(255,20,147,0.4),0_5px_12px_rgba(0,0,0,0.15)]
        active:translate-y-0 active:scale-[0.98]
        focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-pink-300 focus-visible:ring-offset-2
        before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-1/2
        before:bg-gradient-to-b before:from-white/35 before:to-white/10
        before:rounded-t-xl before:pointer-events-none
      "
    >
      {children || 'Click to Launch'}
    </button>
  );
}
