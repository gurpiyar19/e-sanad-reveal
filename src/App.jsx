import { useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import CurtainOverlay from './components/CurtainOverlay';
import LandingPage from './components/LandingPage';
import 'locomotive-scroll/dist/locomotive-scroll.css';

// Register GSAP plugins
gsap.registerPlugin(useGSAP);

function App() {
  const [isRevealed, setIsRevealed] = useState(false);

  const handleRevealComplete = () => {
    setIsRevealed(true);
    // Enable normal scrolling on body after reveal
    document.documentElement.classList.remove('has-scroll-smooth');
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="relative min-h-screen">
      {/* Landing Page (behind curtains) */}
      <LandingPage />

      {/* Curtain Overlay (on top) */}
      {!isRevealed && (
        <CurtainOverlay onRevealComplete={handleRevealComplete} />
      )}
    </div>
  );
}

export default App;
