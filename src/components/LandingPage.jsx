import OfficialCard from './OfficialCard';

const officials = [
    {
        id: 1,
        name: 'Sh. Bhagwant Singh Mann',
        title: "Hon'ble Chief Minister",
        role: 'PATRON-IN-CHIEF',
        image: '/officials/cm-punjab.jpg',
        position: 'left',
    },
    {
        id: 2,
        name: 'Shri. Harjot Singh Bains',
        title: "Hon'ble Education Minister",
        role: "HON'BLE MINISTER",
        image: '/officials/education-minister.jpg',
        position: 'right',
    },
    {
        id: 3,
        name: 'Dr. Amarpal Singh, I.A.S. (Retd.)',
        title: 'Punjab School Education Board',
        role: 'CHAIRMAN',
        image: '/officials/chairman.jpeg',
        position: 'left',
    },
    {
        id: 4,
        name: 'Mr. Gurinder Singh Sodhi (PCS)',
        title: 'Punjab School Education Board',
        role: 'SECRETARY',
        image: '/officials/secretary.png',
        position: 'right',
    },
];

export default function LandingPage() {
    return (
        <main className="min-h-screen relative overflow-hidden">
            {/* Gradient Background - White to Yellow, modernized */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    background: 'linear-gradient(135deg, #ffffff 0%, #fefcf3 20%, #fef9e7 40%, #fef3c7 60%, #fde68a 80%, #fcd34d 100%)',
                }}
            />

            {/* Subtle mesh gradient overlay for modern look */}
            <div
                className="absolute inset-0 z-0 opacity-40"
                style={{
                    background: 'radial-gradient(ellipse at 20% 20%, rgba(251, 191, 36, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(245, 158, 11, 0.1) 0%, transparent 40%)',
                }}
            />

            {/* Watermark PSEB logo in center */}
            <div
                className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.07]"
                style={{
                    backgroundImage: 'url(/logos/pseb.png)',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '350px',
                }}
            />

            {/* Header with Punjab Govt logo (left) and PSEB logo (right) */}
            <header className="relative z-10 py-8 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Logos Row - brought closer together */}
                    <div className="flex justify-between items-center mb-4 px-4 md:px-8">
                        <img
                            src="/logos/punjab-govt.png"
                            alt="Government of Punjab"
                            className="h-14 md:h-16 w-auto object-contain"
                        />
                        <img
                            src="/logos/pseb.png"
                            alt="Punjab School Education Board"
                            className="h-14 md:h-16 w-auto object-contain"
                        />
                    </div>
                    {/* Title */}
                    <div className="text-center">
                        <h1 className="text-2xl md:text-3xl font-bold text-blue-900">
                            Punjab School Education Board
                        </h1>
                        <p className="text-gray-600 text-sm md:text-base mt-1">
                            Vidya Bhawan, Phase-8, SAS Nagar (Mohali), India
                        </p>
                    </div>
                </div>
            </header>

            {/* Main Content - Reference Layout */}
            <section className="relative z-10 px-4 py-8">
                <div className="max-w-6xl mx-auto">
                    {/* Grid: 2 officials on left, center content, 2 officials on right */}
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] gap-8 items-center">

                        {/* Left Column - CM and Chairman with yellow gradient */}
                        <div className="flex flex-col gap-6">
                            <div className="rounded-xl bg-gradient-to-br from-amber-50 via-yellow-100 to-amber-200 p-[2px] shadow-lg">
                                <OfficialCard official={officials[0]} />
                            </div>
                            <div className="rounded-xl bg-gradient-to-br from-amber-50 via-yellow-100 to-amber-200 p-[2px] shadow-lg">
                                <OfficialCard official={officials[2]} />
                            </div>
                        </div>

                        {/* Center Column - Main Text and Visit Link */}
                        <div className="text-center px-4">
                            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-orange-600 leading-relaxed mb-8">
                                Punjab School education board launches<br />
                                end to end online verification of<br />
                                documents for foreign country through e-sanad
                            </h2>

                            {/* Visit E-Sanad - Minimal hyperlink */}
                            <a
                                href="https://esanadtrg.punjab.nic.in"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
                                    inline-flex items-center gap-2
                                    text-blue-600 hover:text-blue-800
                                    text-base md:text-lg font-medium
                                    underline underline-offset-4 decoration-1
                                    transition-colors duration-200
                                "
                            >
                                Visit E-Sanad
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                    />
                                </svg>
                            </a>
                        </div>

                        {/* Right Column - Education Minister and Secretary with yellow gradient */}
                        <div className="flex flex-col gap-6">
                            <div className="rounded-xl bg-gradient-to-br from-amber-50 via-yellow-100 to-amber-200 p-[2px] shadow-lg">
                                <OfficialCard official={officials[1]} />
                            </div>
                            <div className="rounded-xl bg-gradient-to-br from-amber-50 via-yellow-100 to-amber-200 p-[2px] shadow-lg">
                                <OfficialCard official={officials[3]} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 py-6 px-4 text-center">
                <p className="text-gray-700 text-sm">
                    © 2026 Punjab School Education Board. All rights reserved.
                </p>
                <p className="text-gray-600 text-xs mt-1">
                    An initiative of Ministry of External Affairs
                </p>
            </footer>
        </main>
    );
}
