import { Mail, Phone } from "lucide-react";

export default function Footer() {
    return (
        <footer className="z-20 bg-black border-white/10 border-t pt-24 pb-12 relative" id="contact">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-16 items-start">

                    {/* Contact Info */}
                    <div className="">
                        <h2 className="text-3xl font-medium text-white tracking-tight font-[family-name:var(--font-montserrat)] mb-8">Kontakt</h2>
                        <p className="text-neutral-400 text-sm mb-12 font-light max-w-sm leading-relaxed">
                            Redo att ta nästa steg? Hör av dig till oss så bokar vi ett möte och ser hur vi kan hjälpa dig växa.
                        </p>
                        <div className="space-y-6">
                            <a href="mailto:william@marksendigital.se" className="flex items-center gap-5 text-neutral-400 hover:text-white transition-colors group">
                                <div className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center group-hover:bg-[#0A8F6A] group-hover:border-[#0A8F6A] transition-all duration-300">
                                    <Mail className="w-5 h-5 text-neutral-300 group-hover:text-white transition-colors" />
                                </div>
                                <span className="text-sm font-medium">william@marksendigital.se</span>
                            </a>
                            <a href="tel:+46705374628" className="flex items-center gap-5 text-neutral-400 hover:text-white transition-colors group">
                                <div className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center group-hover:bg-[#0A8F6A] group-hover:border-[#0A8F6A] transition-all duration-300">
                                    <Phone className="w-5 h-5 text-neutral-300 group-hover:text-white transition-colors" />
                                </div>
                                <span className="text-sm font-medium">+46 70 537 46 28</span>
                            </a>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <form className="glass-panel border-white/5 border rounded-2xl pt-8 pr-8 pb-8 pl-8 space-y-5">
                        <div className="">
                            <label className="block text-[10px] uppercase tracking-widest text-neutral-500 font-semibold mb-2 ml-1">Namn</label>
                            <input type="text" placeholder="Ditt namn" className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-[#0A8F6A] focus:bg-white/[0.05] focus:outline-none transition-all placeholder:text-neutral-700" />
                        </div>
                        <div className="">
                            <label className="block text-[10px] uppercase tracking-widest text-neutral-500 font-semibold mb-2 ml-1">E-post</label>
                            <input type="email" placeholder="din@epost.se" className="focus:border-[#0A8F6A] focus:bg-white/[0.05] focus:outline-none transition-all placeholder:text-neutral-700 text-sm text-white w-full border-white/10 border rounded-lg pt-3 pr-4 pb-3 pl-4" />
                        </div><div className="">
                            <label className="block text-[10px] uppercase font-semibold text-neutral-500 tracking-widest mb-2 ml-1">Telefon</label>
                            <input type="email" placeholder="din@epost.se" className="focus:border-[#0A8F6A] focus:bg-white/[0.05] focus:outline-none transition-all placeholder:text-neutral-700 text-sm text-white w-full border-white/10 border rounded-lg pt-3 pr-4 pb-3 pl-4" />
                        </div>
                        <div className="">
                            <label className="block text-[10px] uppercase tracking-widest text-neutral-500 font-semibold mb-2 ml-1">Meddelande</label>
                            <textarea rows={4} placeholder="Berätta om ditt projekt..." className="focus:border-[#0A8F6A] focus:bg-white/[0.05] focus:outline-none transition-all resize-none placeholder:text-neutral-700 text-sm text-white w-full border-white/10 border rounded-lg pt-3 pr-4 pb-3 pl-4"></textarea>
                        </div>
                        <button type="button" className="w-full bg-[#0A8F6A] text-white py-3.5 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-[#097a5b] transition-all shadow-lg shadow-[#0A8F6A]/20 hover:shadow-[#0A8F6A]/40 mt-2">
                            Skicka meddelande
                        </button>
                    </form>
                </div>

                {/* Copyright */}
                <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs font-medium text-neutral-600 tracking-wide">© 2025 Marksen Media. Alla rättigheter förbehållna.</p>
                    <div className="flex gap-6 text-[10px] text-neutral-600 uppercase tracking-widest font-medium">


                    </div>
                </div>
            </div>
        </footer>
    );
}
