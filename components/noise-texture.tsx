export function NoiseTexture() {
    return (
        <div className="fixed top-0 left-0 w-full h-full z-[-1]">
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