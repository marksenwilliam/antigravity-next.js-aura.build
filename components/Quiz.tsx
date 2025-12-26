"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, ChevronLeft } from "lucide-react";
import clsx from "clsx";

type FormData = {
    scope?: string;
    seo?: string;
    gmb?: string;
    domain_type?: string;
    domain_name?: string;
    reach?: string;
    ecom?: string;
    blog?: string;
    updates?: string;
    mail?: string;
    mail_count?: string;
    services?: string[];
    company?: string;
    name?: string;
    email?: string;
    phone?: string;
};

export default function Quiz() {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<FormData>({});
    const [sliderValue, setSliderValue] = useState(0);
    const [selectedServices, setSelectedServices] = useState<Set<string>>(new Set());
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Helper to update form data
    const updateData = (key: keyof FormData, value: string | string[]) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    // Step 1: Scope
    const handleScopeSelect = (scope: string) => {
        updateData("scope", scope);
        setSliderValue(0); // Reset slider if preset selected
    };

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(e.target.value);
        setSliderValue(val);
        updateData("scope", `${val} undersidor`);
    };

    // Step 4: Domain
    // We need to track the "active" choice (Yes/No) to show the right input
    const [domainChoice, setDomainChoice] = useState<"yes" | "no" | null>(null);

    // Step 9: Mail
    const [mailChoice, setMailChoice] = useState<"yes" | "no" | null>(null);

    // Step 10: Multi-select
    const toggleService = (service: string) => {
        const next = new Set(selectedServices);
        if (next.has(service)) next.delete(service);
        else next.add(service);
        setSelectedServices(next);
    };

    // Validation
    const validateStep = (step: number) => {
        if (step === 1) {
            if (!formData.scope && sliderValue === 0) {
                alert("Vänligen välj ett paket eller använd reglaget för antal undersidor.");
                return false;
            }
            return true;
        }
        if (step === 2) return !!formData.seo;
        if (step === 3) return !!formData.gmb;
        if (step === 4) {
            if (!domainChoice) return false;
            if (domainChoice === 'yes' && !formData.domain_name) return false;
            // if choice is 'no', we allow empty wishlist for now or check it too? 
            // Original code: if 'no', checked 'domain_wish'. Simplified here.
            if (domainChoice === 'no' && !formData.domain_name) return false; // Let's require it
            return true;
        }
        if (step === 5) return !!formData.reach;
        if (step === 6) return !!formData.ecom;
        if (step === 7) return !!formData.blog;
        if (step === 8) return !!formData.updates;
        if (step === 9) return !!formData.mail; // Mail yes/no
        if (step === 10) return true; // Optional? Or at least "selectedServices"
        if (step === 11) {
            return !!formData.company && !!formData.name && !!formData.email && !!formData.phone;
        }
        return true;
    };

    const handleNext = () => {
        const isValid = validateStep(currentStep);

        if (isValid) {
            if (currentStep === 10) {
                // Commit services to formData
                updateData("services", Array.from(selectedServices));
            }
            if (currentStep < 11) {
                setCurrentStep((prev) => prev + 1);
            } else {
                handleSubmit();
            }
        } else {
            alert("Vänligen fyll i alla obligatoriska fält.");
        }
    };

    const handlePrev = () => {
        if (currentStep > 1) setCurrentStep((prev) => prev - 1);
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsSubmitting(false);
        setIsSuccess(true);
        // Scroll element into view if needed
    };

    // Render helpers
    const getProgress = () => ((currentStep / 11) * 100) + "%";

    const cardClass = (selected: boolean) => clsx(
        "quiz-option cursor-pointer p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all text-center flex flex-col items-center justify-center gap-2 h-36",
        selected && "selected border-[#0A8F6A] bg-[#0A8F6A]/10"
    );

    const listOptionClass = (selected: boolean) => clsx(
        "quiz-option cursor-pointer p-5 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all flex items-center gap-4",
        selected && "selected border-[#0A8F6A] bg-[#0A8F6A]/10"
    );

    const dotClass = (selected: boolean) => clsx(
        "w-5 h-5 rounded-full border border-white/20 flex items-center justify-center dot-indicator",
        selected && "bg-[#0A8F6A] border-[#0A8F6A] shadow-[0_0_10px_rgba(10,143,106,0.4)]"
    );

    return (
        <section id="strategic-analysis" className="py-32 px-6 border-b border-white/5 relative z-10">
            <div className="absolute inset-0 bg-[#0A8F6A]/5 blur-[60px] pointer-events-none rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4"></div>
            <div className="max-w-4xl mx-auto relative">
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-medium uppercase tracking-widest text-[#0A8F6A] mb-6"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0A8F6A] animate-pulse"></span>
                        Strategisk Analys
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-4xl font-medium text-white tracking-tighter mb-4 font-montserrat"
                    >
                        Webbdesign frågeformulär
                    </motion.h2>
                    <p className="text-neutral-400 text-sm font-light max-w-lg mx-auto">
                        Gör en kostnadsfri behovsanalys. 10 snabba steg som ger oss
                        underlaget för att skapa en strategi som faktiskt fungerar.
                    </p>
                </div>

                <div className="glass-panel rounded-2xl p-8 md:p-12 relative overflow-hidden min-h-[500px] flex flex-col justify-between" id="quiz-container">
                    {isSuccess ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="h-full flex flex-col items-center justify-center text-center py-10"
                        >
                            <div className="w-16 h-16 rounded-full bg-[#0A8F6A]/10 border border-[#0A8F6A]/20 flex items-center justify-center mb-6 text-[#0A8F6A] shadow-[0_0_30px_-5px_rgba(10,143,106,0.3)]">
                                <Check className="w-8 h-8 stroke-[2]" />
                            </div>
                            <h3 className="text-2xl text-white font-medium mb-6 tracking-tight font-montserrat">Tack</h3>
                            <p className="text-neutral-400 text-sm font-light max-w-md mx-auto leading-relaxed mb-8">
                                Vi har nu en tydlig bild av ditt företag, dina behov och din tillväxtpotential.<br className="hidden md:block" />
                                Vi återkommer inom 24 timmar med ett konkret förslag – inga generiska paket.
                            </p>
                            <div className="pt-8 border-t border-white/5 w-full max-w-xs mx-auto">
                                <p className="text-neutral-500 text-xs mb-3">Du kan också höra av dig på mail</p>
                                <a href="mailto:william@marksendigital.se" className="inline-flex items-center gap-2 text-white hover:text-[#0A8F6A] transition-colors text-sm font-medium">
                                    william@marksendigital.se
                                </a>
                            </div>
                        </motion.div>
                    ) : (
                        <>
                            {/* Progress Bar */}
                            <div className="w-full h-1 bg-white/5 rounded-full mb-10 overflow-hidden relative">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: getProgress() }}
                                    transition={{ duration: 0.5 }}
                                    className="h-full bg-[#0A8F6A] shadow-[0_0_10px_#0A8F6A]"
                                ></motion.div>
                            </div>

                            {/* Form Content */}
                            <div className="flex-grow flex flex-col relative">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentStep}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="w-full"
                                    >
                                        {/* Step 1 */}
                                        {currentStep === 1 && (
                                            <div>
                                                <h3 className="text-xl font-medium text-white mb-2 font-montserrat">Hur stor hemsida behöver du?</h3>
                                                <h4 className="text-sm text-[#0A8F6A] font-medium mb-4 uppercase tracking-wider">Välj antalet undersidor</h4>
                                                <p className="text-neutral-400 text-sm font-light mb-8 max-w-2xl">Oavsett paket får du alltid en startsida. Utöver startsidan kan du välja hur många undersidor du vill ha.</p>
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                                                    {[
                                                        { val: "landing", label: "Startsida", desc: "Jag klarar mig på en startsida.", count: "1" },
                                                        { val: "small", label: "Liten", desc: "4-6 undersidor", count: "4-6" },
                                                        { val: "medium", label: "Medelstor", desc: "6-12 undersidor", count: "6-12" },
                                                        { val: "large", label: "Stor", desc: "12+ undersidor", count: "12+" }
                                                    ].map(opt => (
                                                        <div key={opt.val}
                                                            onClick={() => handleScopeSelect(opt.val)}
                                                            className={cardClass(formData.scope === opt.val)}
                                                        >
                                                            <span className="text-2xl text-[#0A8F6A]">{opt.count}</span>
                                                            <span className="text-xs font-bold text-white uppercase tracking-wide">{opt.label}</span>
                                                            <span className="text-[10px] text-neutral-500 leading-tight">{opt.desc}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="bg-neutral-900/30 border-white/10 border rounded-xl pt-6 pr-4 pb-6 pl-4 relative">
                                                    <div className="flex justify-between mb-4">
                                                        <label className="text-xs text-neutral-400 font-medium uppercase">Eller välj exakt antal undersidor:</label>
                                                        <span className="text-[#0A8F6A] font-bold text-sm">{sliderValue}{sliderValue >= 25 ? "+" : ""} sidor</span>
                                                    </div>
                                                    <input type="range" min="0" max="25" value={sliderValue} onChange={handleSliderChange} className="" />
                                                </div>
                                            </div>
                                        )}

                                        {/* Step 2: SEO */}
                                        {currentStep === 2 && (
                                            <div>
                                                <h3 className="text-xl text-white font-medium mb-8 font-montserrat">Är SEO en viktig del av din tillväxt?</h3>
                                                <div className="space-y-4">
                                                    {[
                                                        { val: "primary", label: "Ja, SEO är min huvudsakliga strategi" },
                                                        { val: "complementary", label: "Ja, men som ett komplement" },
                                                        { val: "none", label: "Nej, jag behöver inte SEO" },
                                                        { val: "consulting", label: "Vet ej – öppen för förslag / rådgivning" }
                                                    ].map(opt => (
                                                        <div key={opt.val} onClick={() => updateData("seo", opt.val)} className={listOptionClass(formData.seo === opt.val)}>
                                                            <div className={dotClass(formData.seo === opt.val)}></div>
                                                            <span className="text-sm text-white">{opt.label}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Step 3: GMB */}
                                        {currentStep === 3 && (
                                            <div>
                                                <h3 className="text-xl text-white font-medium mb-4 font-montserrat">Google Business Profile</h3>
                                                <div className="space-y-4">
                                                    {[
                                                        { val: "yes", label: "Ja" },
                                                        { val: "no", label: "Nej" }
                                                    ].map(opt => (
                                                        <div key={opt.val} onClick={() => updateData("gmb", opt.val)} className={listOptionClass(formData.gmb === opt.val)}>
                                                            <div className={dotClass(formData.gmb === opt.val)}></div>
                                                            <span className="text-sm text-white">{opt.label}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Step 4: Domain */}
                                        {currentStep === 4 && (
                                            <div>
                                                <h3 className="text-xl text-white font-medium mb-8 font-montserrat">Har du redan en domän?</h3>
                                                <div className="grid grid-cols-2 gap-6 mb-8">
                                                    {([{ val: "yes", label: "Ja" }, { val: "no", label: "Nej" }] as const).map(opt => (
                                                        <div key={opt.val}
                                                            onClick={() => { setDomainChoice(opt.val); updateData("domain_type", opt.val); }}
                                                            className={clsx(
                                                                "quiz-option cursor-pointer p-8 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all text-center flex flex-col items-center justify-center gap-4 h-40",
                                                                domainChoice === opt.val && "selected border-[#0A8F6A] bg-[#0A8F6A]/10"
                                                            )}
                                                        >
                                                            <span className="text-white font-medium">{opt.label}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                                {domainChoice === "yes" && (
                                                    <div className="animate-in fade-in slide-in-from-top-4">
                                                        <input type="text" placeholder="Ange din domän (t.ex. foretag.se)" value={formData.domain_name || ""} onChange={(e) => updateData("domain_name", e.target.value)} className="w-full bg-neutral-900/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0A8F6A]" />
                                                    </div>
                                                )}
                                                {domainChoice === "no" && (
                                                    <div className="animate-in fade-in slide-in-from-top-4">
                                                        <input type="text" placeholder="Önskad domän (t.ex. nymarks.se)" value={formData.domain_name || ""} onChange={(e) => updateData("domain_name", e.target.value)} className="w-full bg-neutral-900/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0A8F6A]" />
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* Step 5: Reach */}
                                        {currentStep === 5 && (
                                            <div>
                                                <h3 className="text-xl text-white font-medium mb-8 font-montserrat">Var finns dina kunder?</h3>
                                                <div className="space-y-4">
                                                    {[
                                                        { val: "local", label: "Lokalt" },
                                                        { val: "national", label: "Nationellt" }
                                                    ].map(opt => (
                                                        <div key={opt.val} onClick={() => updateData("reach", opt.val)} className={listOptionClass(formData.reach === opt.val)}>
                                                            <span className="text-sm text-white">{opt.label}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Step 6: Ecom */}
                                        {currentStep === 6 && (
                                            <div>
                                                <h3 className="text-xl text-white font-medium mb-8 font-montserrat">Behöver du e-handel?</h3>
                                                <div className="grid grid-cols-2 gap-6">
                                                    {[{ val: "yes", label: "Ja" }, { val: "no", label: "Nej" }].map(opt => (
                                                        <div key={opt.val} onClick={() => updateData("ecom", opt.val)}
                                                            className={clsx(
                                                                "quiz-option cursor-pointer p-8 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all text-center flex flex-col items-center justify-center gap-4 h-40",
                                                                formData.ecom === opt.val && "selected border-[#0A8F6A] bg-[#0A8F6A]/10"
                                                            )}
                                                        >
                                                            <span className="text-white font-medium">{opt.label}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Step 7: Blog */}
                                        {currentStep === 7 && (
                                            <div>
                                                <h3 className="text-xl text-white font-medium mb-4 font-montserrat">Behöver du en blogg?</h3>
                                                <div className="space-y-4">
                                                    {[
                                                        { val: "yes", label: "Ja" },
                                                        { val: "no", label: "Nej" }
                                                    ].map(opt => (
                                                        <div key={opt.val} onClick={() => updateData("blog", opt.val)} className={listOptionClass(formData.blog === opt.val)}>
                                                            <span className="text-sm text-white">{opt.label}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Step 8: Updates */}
                                        {currentStep === 8 && (
                                            <div>
                                                <h3 className="text-xl text-white font-medium mb-8 font-montserrat">Uppdatering?</h3>
                                                <div className="space-y-4">
                                                    {[
                                                        { val: "static", label: "Nej, statisk" },
                                                        { val: "active", label: "Ja, löpande" }
                                                    ].map(opt => (
                                                        <div key={opt.val} onClick={() => updateData("updates", opt.val)} className={listOptionClass(formData.updates === opt.val)}>
                                                            <span className="text-sm text-white">{opt.label}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Step 9: Mail */}
                                        {currentStep === 9 && (
                                            <div>
                                                <h3 className="text-xl text-white font-medium mb-8 font-montserrat">Företagsmail?</h3>
                                                <div className="grid grid-cols-2 gap-6 mb-8">
                                                    {([{ val: "yes", label: "Ja" }, { val: "no", label: "Nej" }] as const).map(opt => (
                                                        <div key={opt.val} onClick={() => { setMailChoice(opt.val); updateData("mail", opt.val); }}
                                                            className={clsx(
                                                                "quiz-option cursor-pointer p-8 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all text-center flex flex-col items-center justify-center gap-4 h-40",
                                                                mailChoice === opt.val && "selected border-[#0A8F6A] bg-[#0A8F6A]/10"
                                                            )}
                                                        >
                                                            <span className="text-white font-medium">{opt.label}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                                {mailChoice === "yes" && (
                                                    <div className="animate-in fade-in slide-in-from-top-4">
                                                        <select
                                                            className="w-full bg-neutral-900/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0A8F6A]"
                                                            onChange={(e) => updateData("mail_count", e.target.value)}
                                                        >
                                                            <option value="1">1 st</option>
                                                            <option value="2-5">2-5 st</option>
                                                            <option value="5+">5+ st</option>
                                                        </select>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* Step 10: Other */}
                                        {currentStep === 10 && (
                                            <div>
                                                <h3 className="text-xl text-white font-medium mb-2 font-montserrat">Andra tjänster?</h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    {[{ val: "google_ads", label: "Google Ads" }, { val: "meta_ads", label: "Meta Ads" }].map(opt => (
                                                        <div key={opt.val}
                                                            onClick={() => toggleService(opt.val)}
                                                            className={clsx(
                                                                "quiz-option cursor-pointer p-6 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all flex items-start gap-4",
                                                                selectedServices.has(opt.val) && "multi-selected border-[#0A8F6A] bg-[#0A8F6A]/10"
                                                            )}
                                                        >
                                                            <div><span className="block text-white font-medium mb-1">{opt.label}</span></div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Step 11: Final */}
                                        {currentStep === 11 && (
                                            <div>
                                                <h3 className="text-xl text-white font-medium mb-2 font-montserrat">Grundinformation</h3>
                                                <p className="text-rose-400 text-xs font-semibold uppercase tracking-wide mb-8 animate-pulse">
                                                    Observera: Om du inte slutför det här steget så skickas inte frågeformuläret in.
                                                </p>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    {(['company', 'name', 'email', 'phone'] as const).map(field => (
                                                        <div key={field} className="space-y-2">
                                                            <label className="text-xs text-neutral-400 font-medium uppercase tracking-wide">
                                                                {field === 'company' && "Företag"}
                                                                {field === 'name' && "Namn"}
                                                                {field === 'email' && "E-post"}
                                                                {field === 'phone' && "Telefon"}
                                                            </label>
                                                            <input
                                                                type={field === 'email' ? 'email' : 'text'}
                                                                required
                                                                value={formData[field] || ""}
                                                                onChange={(e) => updateData(field, e.target.value)}
                                                                className="w-full bg-neutral-900/50 border-b border-white/20 py-3 text-white focus:outline-none focus:border-[#0A8F6A] transition-colors placeholder:text-neutral-700 font-light"
                                                                placeholder={
                                                                    field === 'company' ? "Ditt företagsnamn" :
                                                                        field === 'name' ? "För- och efternamn" :
                                                                            field === 'email' ? "name@company.com" :
                                                                                "070-123 45 67"
                                                                }
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Navigation */}
                            <div className="flex justify-between items-center mt-12 pt-6 border-t border-white/5">
                                <button
                                    type="button"
                                    onClick={handlePrev}
                                    className={clsx(
                                        "px-6 py-2 text-neutral-500 hover:text-white text-xs uppercase font-medium tracking-wider transition-colors",
                                        currentStep === 1 && "opacity-0 pointer-events-none"
                                    )}
                                >
                                    Tillbaka
                                </button>
                                {currentStep < 11 ? (
                                    <button
                                        type="button"
                                        onClick={handleNext}
                                        className="flex items-center gap-2 px-8 py-3 bg-[#0A8F6A] hover:bg-[#097a5b] text-white text-xs uppercase font-semibold tracking-wider rounded transition-all shadow-[0_4px_20px_rgba(10,143,106,0.3)]"
                                    >
                                        <span>Fortsätt</span>
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={handleNext}
                                        disabled={isSubmitting}
                                        className="flex items-center gap-2 px-8 py-3 bg-white text-black hover:bg-neutral-200 text-xs uppercase font-bold tracking-wider rounded transition-all shadow-[0_4px_20px_rgba(255,255,255,0.15)] disabled:opacity-50"
                                    >
                                        <span>{isSubmitting ? "Skickar..." : "Skicka in"}</span>
                                    </button>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}
