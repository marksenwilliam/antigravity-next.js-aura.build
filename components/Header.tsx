import Link from "next/link";

export default function Header() {
    return (
        <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/70 backdrop-blur-[6px] supports-[backdrop-filter]:bg-black/40">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {/* Logo placeholder if needed, or just text */}
                    <div className="relative flex items-center justify-center w-6 h-6"></div>
                    <span className="uppercase text-xs font-semibold text-white tracking-tighter">
                        Marksen media
                    </span>
                </div>
                <nav className="hidden md:flex gap-8 text-[11px] font-medium tracking-wide uppercase text-neutral-500">
                    <Link
                        href="#about"
                        className="hover:text-white transition-colors duration-300"
                    >
                        OM OSS
                    </Link>
                    <Link
                        href="#services"
                        className="hover:text-white transition-colors duration-300"
                    >
                        TJÄNSTER
                    </Link>
                    <Link
                        href="#strategic-analysis"
                        className="hover:text-white transition-colors duration-300"
                    >
                        QUIZ
                    </Link>
                </nav>
                <Link
                    href="#contact"
                    className="hidden md:flex items-center justify-center text-[11px] hover:bg-white/10 hover:border-white/20 transition-all font-medium text-white bg-white/5 border-white/10 border rounded pt-1.5 pr-4 pb-1.5 pl-4 backdrop-blur-sm"
                >
                    KONTAKT
                </Link>
            </div>
        </header>
    );
}
