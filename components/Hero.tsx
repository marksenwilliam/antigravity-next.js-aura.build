"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";

export default function Hero() {
    const [bgLoaded, setBgLoaded] = useState(false);
    const heroRef = useRef<HTMLElement>(null);

    // Video background auto-handles playing, but we can verify it's loaded
    useEffect(() => {
        // Optional: Any additional setup if needed, otherwise this can be empty or removed
        // For now, checks are handled in onCanPlay
    }, []);

    // We can initialize the unicorn studio script here or in layout. keeping it simple.
    return (
        <section ref={heroRef} className="md:pt-48 md:pb-36 flex flex-col overflow-hidden text-center pt-32 pr-6 pb-24 pl-6 relative items-center">
            {/* Background Layers */}
            <div className="aura-background-component fixed top-0 w-full h-[50vh] md:h-screen -z-10 opacity-100 bg-black"
                style={{ maskImage: "linear-gradient(to bottom, transparent, black 0%, black 80%, transparent)", WebkitMaskImage: "linear-gradient(to bottom, transparent, black 0%, black 80%, transparent)" }}
            >
                {/* CSS Fallback gradient - always visible as base layer */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-tr from-[#8C57EF]/30 via-[#E65CB8]/20 to-[#8C57EF]/30 animate-pulse pointer-events-none" style={{ animationDuration: '4s' }}></div>

                <div className={`aura-background-component top-0 w-full -z-10 absolute h-full transition-opacity duration-1000 ${bgLoaded ? 'opacity-100' : 'opacity-0'}`}>
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="absolute w-full h-full left-0 top-0 -z-10 object-cover opacity-100"
                        onCanPlay={() => setBgLoaded(true)}
                    >
                        <source src="/black_hole_remix_remix.mp4" type="video/mp4" />
                    </video>
                </div>
            </div>

            <div className="relative z-10 flex flex-col items-center">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium text-white tracking-tighter mb-8 max-w-5xl mx-auto leading-[0.95] drop-shadow-2xl font-montserrat">
                    Bygg ett varumärke
                    <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-400 to-neutral-700">
                        som dominerar din marknad
                    </span>
                </h1>

                <p className="text-neutral-400 text-sm md:text-base max-w-xl mx-auto mb-12 leading-relaxed font-light tracking-wide">
                    Webbdesign, SEO & digital annonsering, vi har allt du behöver för att
                    växa
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-center justify-center">
                    <Link
                        href="#strategic-analysis"
                        className="group isolate inline-flex cursor-pointer overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_8px_rgba(10,143,106,0.35)] rounded-full relative shadow-[0_8px_40px_rgba(10,143,106,0.25)] w-full sm:w-auto justify-center"
                        style={{
                            // @ts-expect-error custom properties
                            "--spread": "90deg", "--shimmer-color": "rgba(255,255,255,0.4)", "--radius": "9999px", "--speed": "10s", "--cut": "1px", "--bg": "rgba(255, 255, 255, 0.05)"
                        }}
                    >
                        <div className="absolute inset-0">
                            <div className="absolute inset-[-200%] w-[400%] h-[400%] [animation:rotate-gradient_var(--speed)_linear_infinite]" style={{ willChange: 'transform' }}>
                                <div className="absolute inset-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))]"></div>
                            </div>
                        </div>
                        <div className="absolute rounded-full [background:var(--bg)] [inset:var(--cut)]"></div>
                        <div
                            className="z-10 flex gap-2 sm:w-auto overflow-hidden text-xs uppercase font-semibold tracking-wider text-white w-full py-3.5 px-8 relative items-center justify-center"
                            style={{ borderRadius: "9999px" }}
                        >
                            <div
                                style={{
                                    position: "absolute",
                                    inset: "1px",
                                    background: "rgba(10, 143, 106, 0.9)",
                                    borderRadius: "9999px",
                                }}
                            ></div>
                            <span className="whitespace-nowrap z-10 relative">ta quiz</span>
                        </div>
                    </Link>
                    <Link
                        href="#services"
                        className="flex items-center justify-center gap-2 glass-panel hover:text-white uppercase transition-colors sm:w-auto group text-xs font-medium text-neutral-300 tracking-wider w-full rounded-lg pt-3.5 pr-8 pb-3.5 pl-8"
                    >
                        se tjänster
                    </Link>
                </div>
            </div>

            <div className="mt-32 h-px w-full max-w-[200px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        </section>
    );
}
