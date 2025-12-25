"use client";

import { motion } from "framer-motion";
import {
    TrendingUp,
    LayoutTemplate,
    MousePointerClick,
    Facebook,
    Film,
    AppWindow
} from "lucide-react";

export default function Services() {
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }
        }
    };

    return (
        <section className="py-24 px-6 border-b border-white/5 relative bg-black/20" id="services">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="text-center mb-20"
                >
                    <h2 className="text-3xl font-medium text-white tracking-tight mb-4 font-montserrat">
                        Strategisk Infrastruktur
                    </h2>
                    <p className="text-neutral-400 text-sm font-light max-w-xl mx-auto">
                        En helhetslösning för företag som vill sluta konkurrera och börja
                        dominera. Vi bygger systemen som driver din tillväxt.
                    </p>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    transition={{ delay: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 items-start"
                >
                    {/* PRIMARY SERVICES (Top Row) */}

                    {/* SEO & Organisk Tillväxt */}
                    <div className="glass-panel p-10 rounded-2xl border border-white/5 bg-white/[0.03] hover:border-[#0A8F6A]/30 transition-all duration-300 group flex flex-col justify-between h-full min-h-[420px]">
                        <div>
                            <div className="w-12 h-12 rounded-lg bg-[#0A8F6A]/5 border border-[#0A8F6A]/10 flex items-center justify-center text-[#0A8F6A] mb-8 group-hover:bg-[#0A8F6A]/10 transition-colors">
                                <TrendingUp className="w-6 h-6 stroke-[1.5]" />
                            </div>
                            <h3 className="text-xl font-medium text-white mb-4 tracking-tight font-montserrat">
                                SEO & Organisk Tillväxt
                            </h3>
                            <p className="text-neutral-400 text-sm font-light leading-relaxed">
                                Sluta jaga kunder – låt dem hitta dig. Vi bygger den digitala
                                auktoritet som krävs för att du ska äga sökresultaten och bli
                                det självklara valet i din bransch.
                            </p>
                        </div>
                        <div className="mt-8 pt-8 border-t border-white/5">
                            <span className="text-[10px] uppercase tracking-widest text-neutral-500 group-hover:text-[#0A8F6A] transition-colors font-medium">
                                Långsiktig Tillgång
                            </span>
                        </div>
                    </div>

                    {/* Webbdesign & Arkitektur (HERO) */}
                    <div className="glass-panel p-10 rounded-2xl border border-[#0A8F6A]/30 bg-gradient-to-b from-white/[0.06] to-transparent hover:border-[#0A8F6A]/60 transition-all duration-300 group relative z-10 shadow-[0_0_50px_-10px_rgba(10,143,106,0.15)] flex flex-col justify-between h-full min-h-[420px]">
                        <div>
                            <div className="w-12 h-12 rounded-lg bg-[#0A8F6A] flex items-center justify-center text-white mb-8 shadow-lg shadow-[#0A8F6A]/20">
                                <LayoutTemplate className="w-6 h-6 stroke-[1.5]" />
                            </div>
                            <h3 className="text-2xl font-medium text-white mb-4 tracking-tight font-montserrat">
                                Webbdesign & Arkitektur
                            </h3>
                            <p className="text-neutral-300 text-sm font-light leading-relaxed">
                                Navet i din affär. Vi skapar en digital närvaro som omedelbart
                                signalerar marknadsledarskap, bygger förtroende och konverterar
                                besökare till lönsamma affärer.
                            </p>
                        </div>
                        <div className="mt-8 pt-8 border-t border-white/10">
                            <span className="text-[10px] uppercase tracking-widest text-[#0A8F6A] font-semibold">
                                Affärskritisk Plattform
                            </span>
                        </div>
                    </div>

                    {/* Google Ads */}
                    <div className="glass-panel p-10 rounded-2xl border border-white/5 bg-white/[0.03] hover:border-[#0A8F6A]/30 transition-all duration-300 group flex flex-col justify-between h-full min-h-[420px]">
                        <div>
                            <div className="w-12 h-12 rounded-lg bg-[#0A8F6A]/5 border border-[#0A8F6A]/10 flex items-center justify-center text-[#0A8F6A] mb-8 group-hover:bg-[#0A8F6A]/10 transition-colors">
                                <MousePointerClick className="w-6 h-6 stroke-[1.5]" />
                            </div>
                            <h3 className="text-xl font-medium text-white mb-4 tracking-tight font-montserrat">
                                Google Ads
                            </h3>
                            <p className="text-neutral-400 text-sm font-light leading-relaxed">
                                Fånga köpintresse i realtid. Vi placerar ditt erbjudande framför
                                rätt kund exakt när köpbeslutet fattas. Mätbar avkastning och
                                omedelbart kassaflöde.
                            </p>
                        </div>
                        <div className="mt-8 pt-8 border-t border-white/5">
                            <span className="text-[10px] uppercase tracking-widest text-neutral-500 group-hover:text-[#0A8F6A] transition-colors font-medium">
                                Omedelbar Effekt
                            </span>
                        </div>
                    </div>

                    {/* SECONDARY SERVICES (Bottom Row - Smaller) */}

                    {/* Meta Ads */}
                    <div className="glass-panel p-6 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] hover:border-white/10 transition-all duration-300 group flex flex-col justify-between h-full">
                        <div>
                            <div className="w-10 h-10 rounded-lg bg-[#0A8F6A]/5 border border-[#0A8F6A]/10 flex items-center justify-center text-[#0A8F6A] mb-5 group-hover:bg-[#0A8F6A]/10 transition-colors">
                                <Facebook className="w-5 h-5 stroke-[1.5]" />
                            </div>
                            <h3 className="text-lg font-medium text-white mb-3 tracking-tight font-montserrat">
                                Meta Ads
                            </h3>
                            <p className="text-neutral-500 text-xs font-light leading-relaxed">
                                Driv omedelbar försäljning och mätbar återbäring (ROAS). Vi skapar träffsäkra kampanjer på Facebook och Instagram som konverterar kalla målgrupper till nya, betalande kunder omgående.
                            </p>
                        </div>
                        <div className="mt-5 pt-5 border-t border-white/5 opacity-60">
                            <span className="text-[9px] uppercase tracking-widest text-neutral-600 group-hover:text-[#0A8F6A] transition-colors font-medium">
                                Skalbar Marknadsföring
                            </span>
                        </div>
                    </div>

                    {/* Videoproduktion */}
                    <div className="glass-panel p-6 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] hover:border-white/10 transition-all duration-300 group flex flex-col justify-between h-full">
                        <div>
                            <div className="w-10 h-10 rounded-lg bg-[#0A8F6A]/5 border border-[#0A8F6A]/10 flex items-center justify-center text-[#0A8F6A] mb-5 group-hover:bg-[#0A8F6A]/10 transition-colors">
                                <Film className="w-5 h-5 stroke-[1.5]" />
                            </div>
                            <h3 className="text-lg font-medium text-white mb-3 tracking-tight font-montserrat">
                                Videoproduktion
                            </h3>
                            <p className="text-neutral-500 text-xs font-light leading-relaxed">
                                Kraftfull varumärkesexponering genom storytelling. Högkvalitativt rörligt material som stärker din position, bygger emotionella band och ökar engagemanget i alla digitala kanaler.
                            </p>
                        </div>
                        <div className="mt-5 pt-5 border-t border-white/5 opacity-60">
                            <span className="text-[9px] uppercase tracking-widest text-neutral-600 group-hover:text-[#0A8F6A] transition-colors font-medium">
                                Varumärkesbyggande
                            </span>
                        </div>
                    </div>

                    {/* Landningssidor */}
                    <div className="glass-panel p-6 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] hover:border-white/10 transition-all duration-300 group flex flex-col justify-between h-full">
                        <div>
                            <div className="w-10 h-10 rounded-lg bg-[#0A8F6A]/5 border border-[#0A8F6A]/10 flex items-center justify-center text-[#0A8F6A] mb-5 group-hover:bg-[#0A8F6A]/10 transition-colors">
                                <AppWindow className="w-5 h-5 stroke-[1.5]" />
                            </div>
                            <h3 className="text-lg font-medium text-white mb-3 tracking-tight font-montserrat">
                                Landningssidor
                            </h3>
                            <p className="text-neutral-500 text-xs font-light leading-relaxed">
                                Psykologiskt optimerade landningssidor (LPs) med ett enda mål: konvertering. Vi förvandlar trafik till försäljning genom skarp copy och distraktionsfri design som maximerar dina resultat.
                            </p>
                        </div>
                        <div className="mt-5 pt-5 border-t border-white/5 opacity-60">
                            <span className="text-[9px] uppercase tracking-widest text-neutral-600 group-hover:text-[#0A8F6A] transition-colors font-medium">
                                Maximal Konvertering
                            </span>
                        </div>
                    </div>

                </motion.div>
            </div>
        </section>
    );
}
