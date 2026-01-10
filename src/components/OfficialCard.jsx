export default function OfficialCard({ official }) {
    const { name, title, role, image } = official;

    return (
        <article
            className="
                group relative bg-white rounded-lg p-4
                shadow-sm
                border border-amber-200
                text-center
            "
        >
            {/* Photo */}
            <div className="relative w-20 h-20 md:w-24 md:h-24 mx-auto mb-3">
                <div
                    className="
                        w-full h-full rounded-lg overflow-hidden
                        border-2 border-amber-300
                    "
                >
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-cover object-top"
                        loading="lazy"
                        onError={(e) => {
                            // Fallback for missing images
                            e.target.style.display = 'none';
                            e.target.parentElement.innerHTML = `<div class="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-xs">Photo</div>`;
                        }}
                    />
                </div>
            </div>

            {/* Name Badge */}
            <div className="bg-gray-50 rounded-lg px-3 py-2 mb-2">
                <h3 className="text-gray-800 font-bold text-sm md:text-base leading-tight">
                    {name}
                </h3>
                <p className="text-gray-500 text-xs mt-0.5">
                    {title}
                </p>
            </div>

            {/* Role Badge */}
            <span className="inline-block text-amber-600 text-xs font-semibold tracking-wide uppercase">
                {role}
            </span>
        </article>
    );
}
