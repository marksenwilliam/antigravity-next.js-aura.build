"use client";

import { motion } from "framer-motion";

export default function WhyUs() {
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }
        }
    };

    return (
        <section className="py-32 px-6 border-b border-white/5 relative z-10">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-10%" }}
                    variants={fadeInUp}
                    className="space-y-8 top-32 lg:sticky"
                >
                    <h2 className="text-3xl md:text-5xl font-medium text-white tracking-tighter leading-[1.1] font-montserrat">
                        Ditt varumärke jobbar inte lika hårt som du gör.
                    </h2>
                    <div className="space-y-6">
                        <p className="text-neutral-400 text-sm md:text-base font-light leading-relaxed">
                            Du lägger tid, energi och ansvar på att bygga ditt företag. Men om
                            ditt varumärke och din digitala profil inte når ut och speglar
                            kvalitén på ditt arbete riskerar du att bli förbisedd,
                            undervärderad eller bortvald.
                        </p>
                        <p className="text-neutral-400 text-sm md:text-base font-light leading-relaxed">
                            Ens digitala profil och varumärke ska inte bara se bra ut. Det ska
                            arbeta för dig – varje dag.
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-10%" }}
                    variants={fadeInUp}
                    transition={{ delay: 0.1 }}
                >
                    <h3 className="text-white font-medium mb-10 text-lg tracking-tight flex items-center gap-3 font-montserrat">
                        <span className="w-1.5 h-1.5 bg-[#0A8F6A] rounded-full shadow-[0_0_10px_#0A8F6A]"></span>
                        Vi hjälper ditt varumärke att:
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-x-8 gap-y-12">
                        {[
                            {
                                title: "Bli bättre",
                                desc: "Genom tydligare struktur, skarpare budskap och en genomtänkt helhet."
                            },
                            {
                                title: "Synas mer",
                                desc: "Med rätt grund för SEO och annonsering som faktiskt leder till uppmärksamhet."
                            },
                            {
                                title: "Se mer professionellt ut",
                                desc: "Så att kunder direkt känner förtroende och tar dig på allvar."
                            },
                            {
                                title: "Vara unikt",
                                desc: "Inte som alla andra i branschen – utan tydligt ditt."
                            },
                            {
                                title: "Se ut som det bästa alternativet",
                                desc: "Oavsett om kunden jämför tre eller tio aktörer."
                            },
                            {
                                title: "Få blickar att vändas mot just dig",
                                desc: "När ditt varumärke sticker ut, minns man dig – och väljer dig."
                            }
                        ].map((item, index) => (
                            <div key={index} className="flex flex-col gap-3 group">
                                <h4 className="text-white text-sm font-medium border-l-2 border-neutral-800 group-hover:border-[#0A8F6A] pl-4 transition-colors font-montserrat">
                                    {item.title}
                                </h4>
                                <p className="text-neutral-500 text-sm font-light leading-relaxed pl-4.5">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
