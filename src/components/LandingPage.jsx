import { useEffect } from 'react';

const base = import.meta.env.BASE_URL;

export default function LandingPage() {
    // Add smooth scroll behavior
    useEffect(() => {
        document.documentElement.style.scrollBehavior = 'smooth';
    }, []);

    return (
        <main className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center">
            {/* Light Blue Background */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    background: 'linear-gradient(180deg, #d4e8ed 0%, #c8e1e8 50%, #bddae3 100%)',
                }}
            />

            {/* Main Content Card */}
            <div className="relative z-10 w-[95%] max-w-[900px] mx-auto px-6 py-10 text-center">

                {/* Header Row: Logo - Content - Logo */}
                <div className="flex items-start justify-between mb-6">
                    {/* Left Logo */}
                    <img
                        src={`${base}logos/punjab-govt.png`}
                        alt="Government of Punjab"
                        className="h-16 md:h-20 w-auto object-contain"
                    />

                    {/* Center Content */}
                    <div className="flex-grow px-4">
                        <h1 className="text-blue-900 text-xl md:text-3xl font-bold leading-tight mb-1">
                            Punjab School Education Board
                        </h1>
                        <h2 className="text-gray-800 text-lg md:text-2xl font-semibold mb-2">
                            Launches
                        </h2>
                        <h3 className="text-gray-900 text-base md:text-xl font-bold leading-relaxed">
                            End To End Online Verification of PSEB Educational Certificates
                            <br />Through
                        </h3>
                    </div>

                    {/* Right Logo */}
                    <img
                        src={`${base}logos/pseb.png`}
                        alt="Punjab School Education Board"
                        className="h-16 md:h-20 w-auto object-contain"
                    />
                </div>

                {/* Stylized e-Sanad Portal Text */}
                <div className="my-4">
                    <span className="font-handwriting text-5xl md:text-7xl text-gray-800 mr-2">e - </span>
                    <span className="font-handwriting text-5xl md:text-7xl text-[#ea580c]">Sanad</span>
                    <span className="font-handwriting text-5xl md:text-7xl text-[#0ea5e9] ml-2">Portal</span>
                </div>

                {/* Sub-text */}
                <p className="text-[#ea580c] text-sm md:text-lg font-bold mb-6">
                    (Online Attestation and Apostille of PSEB Educational Certificates for use Abroad)
                </p>

                {/* Date */}
                <p className="text-gray-800 text-base md:text-lg font-semibold mb-8">
                    Date: 12th January 2026
                </p>

                {/* e-SANAD Logo */}
                <div className="flex justify-center mb-4">
                    <img
                        src={`${base}logos/esanad-logo.png`}
                        alt="e-SANAD"
                        className="h-14 md:h-16 w-auto object-contain"
                        onError={(e) => {
                            e.target.style.display = 'none';
                        }}
                    />
                </div>

                {/* Initiative Text */}
                <p className="text-blue-800 text-sm md:text-base font-bold mb-8">
                    An Initiative of Ministry of External Affairs
                </p>

                {/* Footer Logos */}
                <div className="flex items-center justify-between px-4 md:px-12">
                    {/* MEA Logo */}
                    <img
                        src={`${base}logos/mea-logo.png`}
                        alt="Ministry of External Affairs"
                        className="h-12 md:h-16 w-auto object-contain"
                        onError={(e) => {
                            e.target.style.display = 'none';
                        }}
                    />

                    {/* NIC Logo */}
                    <img
                        src={`${base}logos/nic.png`}
                        alt="NIC"
                        className="h-10 md:h-14 w-auto object-contain"
                    />
                </div>

                {/* Minimal Link to PSEB e-Sanad */}
                <div className="mt-10">
                    <a
                        href="https://www.pseb.ac.in/esanad"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-700 hover:text-blue-900 text-sm underline underline-offset-2 transition-colors"
                    >
                        Visit e-Sanad Portal →
                    </a>
                </div>
            </div>
        </main>
    );
}
