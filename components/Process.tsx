"use client";

import { motion } from "framer-motion";

export function Process() {
    const fadeInUp = {
        hidden: { opacity: 0, y: 30, filter: "blur(12px)" },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
        }
    };

    return (
        <section id="process" className="py-32 px-6 border-t border-white/5 bg-neutral-900/10 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="text-3xl md:text-4xl font-medium text-white tracking-tighter mb-16 text-center font-montserrat"
                >
                    Process: Webbdesign
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
                    {/* Connecting Line */}
                    <div className="hidden md:block absolute top-6 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent -z-10"></div>

                    {/* Step 1 */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="flex flex-col md:items-center md:text-center"
                    >
                        <div className="w-12 h-12 glass-panel rounded-full flex items-center justify-center text-sm font-bold text-white mb-6 z-10 shadow-[0_0_20px_rgba(0,0,0,0.5)] bg-black/50">
                            01
                        </div>
                        <h3 className="text-sm font-semibold text-white mb-3 uppercase tracking-wide font-montserrat">
                            Inledning
                        </h3>
                        <p className="text-xs text-neutral-400 leading-relaxed max-w-[220px]">
                            Vi går igenom ditt företag, dina mål och vad hemsidan ska uppnå, så att arbetet utgår från rätt helhet redan från start.
                        </p>
                    </motion.div>

                    {/* Step 2 */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        transition={{ delay: 0.075 }}
                        className="flex flex-col md:items-center md:text-center"
                    >
                        <div className="w-12 h-12 glass-panel rounded-full flex items-center justify-center text-sm font-bold text-white mb-6 z-10 shadow-[0_0_20px_rgba(0,0,0,0.5)] bg-black/50">
                            02
                        </div>
                        <h3 className="text-sm font-semibold text-white mb-3 uppercase tracking-wide font-montserrat">
                            Första utkast
                        </h3>
                        <p className="text-xs text-neutral-400 leading-relaxed max-w-[220px]">
                            Ett första designutkast tas fram med fokus på struktur, uttryck och helhetskänsla.
                        </p>
                    </motion.div>

                    {/* Step 3 */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        transition={{ delay: 0.150 }}
                        className="flex flex-col md:items-center md:text-center"
                    >
                        <div className="w-12 h-12 glass-panel rounded-full flex items-center justify-center text-sm font-bold text-white mb-6 z-10 shadow-[0_0_20px_rgba(0,0,0,0.5)] bg-black/50">
                            03
                        </div>
                        <h3 className="text-sm font-semibold text-white mb-3 uppercase tracking-wide font-montserrat">
                            Revisioner
                        </h3>
                        <p className="text-xs text-neutral-400 leading-relaxed max-w-[220px]">
                            Design och innehåll justeras utifrån din feedback tills helheten sitter.
                        </p>
                    </motion.div>

                    {/* Step 4 */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col md:items-center md:text-center"
                    >
                        <div className="w-12 h-12 glass-panel rounded-full flex items-center justify-center text-sm font-bold text-white mb-6 z-10 shadow-[0_0_20px_rgba(0,0,0,0.5)] bg-black/50">
                            04
                        </div>
                        <h3 className="text-sm font-semibold text-white mb-3 uppercase tracking-wide font-montserrat">
                            Ditt godkännande
                        </h3>
                        <p className="text-xs text-neutral-400 leading-relaxed max-w-[220px]">
                            Vi gör en sista genomgång och säkerställer att allt känns rätt innan publicering.
                        </p>
                    </motion.div>

                    {/* Step 5 */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col md:items-center md:text-center"
                    >
                        <div className="w-12 h-12 bg-[#0A8F6A] rounded-full flex items-center justify-center text-sm font-bold text-white mb-6 z-10 shadow-[0_0_25px_rgba(10,143,106,0.4)] ring-4 ring-black/50">
                            05
                        </div>
                        <h3 className="text-sm font-semibold text-white mb-3 uppercase tracking-wide font-montserrat">
                            Publicering
                        </h3>
                        <p className="text-xs text-neutral-400 leading-relaxed max-w-[220px]">
                            Hemsidan publiceras och är redo att användas och visas upp direkt.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export function About() {
    const fadeInUp = {
        hidden: { opacity: 0, y: 30, filter: "blur(12px)" },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
        }
    };

    return (
        <section id="about" className="py-32 px-6 border-t border-white/5 relative z-10 overflow-hidden">
            {/* Background effects to match style */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-[#0A8F6A]/10 blur-[100px] rounded-full pointer-events-none -z-10"></div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="max-w-3xl mx-auto text-center"
            >
                {/* Label */}
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-medium uppercase tracking-widest text-[#0A8F6A] mb-8">
                    Om oss
                </span>

                {/* Title */}
                <h2 className="text-4xl md:text-5xl font-medium text-white tracking-tighter mb-8 font-montserrat">
                    Marksen Media
                </h2>

                {/* Body */}
                <p className="text-neutral-400 text-base md:text-lg font-light leading-relaxed">
                    Vi är ett litet men effektivt team som brinner för att leverera marknadsföring, webbdesign och videoproduktion. Vi jobbar med kunder över hela Sverige med bred variation i branch & industri. Det är ingen hyperbol när vi säger att vi är passionerade över att producera resultat som ger wow känsla... och när vi inte uppnår det, ja då jobbar vi vidare tills det är uppnått.
                </p>
            </motion.div>
        </section>
    );
}
