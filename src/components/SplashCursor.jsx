import { useEffect, useRef } from 'react';

function SplashCursor() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        let ctx = canvas.getContext('2d');
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        let pointers = [];
        let splatStack = [];

        // WebGL context setup would go here for a true fluid sim.
        // Since this is a "best effort" before you paste the exact code,
        // I will implement a high-quality 2D ripple/trail effect that looks like a splash.

        // ... Actually, for the USER to paste the code, it's better if I provide
        // a clean file. But I want it to work NOW.

        // Let's implement a simple "Splash" effect using 2D canvas 
        // to verify integration, then the user can swap it.

        let particles = [];

        const colors = ['#f59e0b', '#d97706', '#fbbf24']; // Gold/Amber colors

        class Particle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.size = Math.random() * 5 + 1;
                this.speedX = Math.random() * 3 - 1.5;
                this.speedY = Math.random() * 3 - 1.5;
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.life = 1;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.life -= 0.02;
            }

            draw(ctx) {
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.life;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            particles.forEach((p, index) => {
                p.update();
                p.draw(ctx);
                if (p.life <= 0) particles.splice(index, 1);
            });

            requestAnimationFrame(animate);
        };

        const handleMouseMove = (e) => {
            // Create splash on move
            for (let i = 0; i < 3; i++) {
                particles.push(new Particle(e.clientX, e.clientY));
            }
        };

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);

        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[1001]"
            style={{ mixBlendMode: 'screen' }}
        />
    );
}

export default SplashCursor;
