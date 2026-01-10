/**
 * CurtainEdge - SVG Bezier curve curtain edge for smooth scallop pattern
 * Replaces the harsh zigzag clipPath with elegant curves
 */
export default function CurtainEdge() {
    // Generate smooth Bezier scallop path
    const generateScallopPath = () => {
        const scallopCount = 20;
        const height = 800;
        const scallopHeight = height / scallopCount;

        let path = 'M0,0 ';

        for (let i = 0; i < scallopCount; i++) {
            const y1 = i * scallopHeight;
            const y2 = y1 + scallopHeight;
            const midY = (y1 + y2) / 2;

            // Quadratic Bezier curve for smooth scallop
            path += `Q 15,${midY} 0,${y2} `;
        }

        // Close the path
        path += `L 100,${height} L 100,0 Z`;

        return path;
    };

    return (
        <svg
            className="curtain-edge"
            viewBox="0 0 100 800"
            preserveAspectRatio="none"
            style={{
                position: 'absolute',
                top: 0,
                width: '30px',
                height: '100%',
                filter: 'drop-shadow(-10px 0 20px rgba(0,0,0,0.5))',
            }}
        >
            <defs>
                <linearGradient id="curtainEdgeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#8B0000" />
                    <stop offset="25%" stopColor="#DC143C" />
                    <stop offset="50%" stopColor="#8B0000" />
                    <stop offset="75%" stopColor="#A52A2A" />
                    <stop offset="100%" stopColor="#8B0000" />
                </linearGradient>
            </defs>
            <path
                d={generateScallopPath()}
                fill="url(#curtainEdgeGradient)"
            />
        </svg>
    );
}

/**
 * CurtainEdgeRight - Mirrored version for right curtain
 */
export function CurtainEdgeRight() {
    const generateScallopPath = () => {
        const scallopCount = 20;
        const height = 800;
        const scallopHeight = height / scallopCount;

        let path = 'M100,0 ';

        for (let i = 0; i < scallopCount; i++) {
            const y1 = i * scallopHeight;
            const y2 = y1 + scallopHeight;
            const midY = (y1 + y2) / 2;

            // Quadratic Bezier curve for smooth scallop (mirrored)
            path += `Q 85,${midY} 100,${y2} `;
        }

        // Close the path
        path += `L 0,${height} L 0,0 Z`;

        return path;
    };

    return (
        <svg
            className="curtain-edge-right"
            viewBox="0 0 100 800"
            preserveAspectRatio="none"
            style={{
                position: 'absolute',
                top: 0,
                width: '30px',
                height: '100%',
                filter: 'drop-shadow(10px 0 20px rgba(0,0,0,0.5))',
            }}
        >
            <defs>
                <linearGradient id="curtainEdgeGradientRight" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#8B0000" />
                    <stop offset="25%" stopColor="#DC143C" />
                    <stop offset="50%" stopColor="#8B0000" />
                    <stop offset="75%" stopColor="#A52A2A" />
                    <stop offset="100%" stopColor="#8B0000" />
                </linearGradient>
            </defs>
            <path
                d={generateScallopPath()}
                fill="url(#curtainEdgeGradientRight)"
            />
        </svg>
    );
}
