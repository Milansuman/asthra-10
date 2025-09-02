export function NoiseTexture() {
    return (
        <div className="absolute inset-0 pointer-events-none z-[99] opacity-40">
            <svg
                viewBox="0 0 250 250"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full absolute inset-0"
                preserveAspectRatio="none"
            >
                <filter id="noiseFilter">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="20.95"
                        numOctaves="3"
                        stitchTiles="stitch"
                    />
                </filter>
                <rect width="100%" height="100%" filter="url(#noiseFilter)" />
            </svg>
        </div>
    );
}