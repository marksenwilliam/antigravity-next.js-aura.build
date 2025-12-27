"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, ChevronLeft } from "lucide-react";
import clsx from "clsx";

type FormData = {
    scope?: string;
    seo?: string;
    gbp?: string;
    domain_type?: string;
    domain_name?: string;
    reach?: string;
    ecommerce?: string;
    ecommerce_priority?: 'essential' | 'addon';
    product_count?: string;
    product_type?: string;
    updates?: string;
    mail?: string;
    mail_count?: number;
    email_names?: string[];
    services?: string[];
    company?: string;
    name?: string;
    email?: string;
    phone?: string;
    domainUnknown?: boolean;
};

export default function Quiz() {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<FormData>({});
    const [sliderValue, setSliderValue] = useState(0);
    const [selectedServices, setSelectedServices] = useState<Set<string>>(new Set());
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Helper to update form data
    const updateData = (key: keyof FormData, value: string | string[] | boolean | number) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    // Smart Domain Suggestion Logic
    const generateSmartSuggestions = (input: string): string[] => {
        if (!input || input.length < 2) return [];

        const cleanInput = input.toLowerCase().replace(/\s+/g, '').replace(/\.se$/, '').replace(/\.com$/, '');
        const suffixes: string[] = [];

        // Keywords
        const construction = ['bygg', 'snick', 'mål', 'tak', 'mark', 'entreprenad', 'renovering', 'hus', 'montage'];
        const beauty = ['frisör', 'hair', 'salong', 'beauty', 'hud', 'klinik', 'dental', 'massage', 'spa', 'naglar', 'lash'];
        const tech = ['tech', 'data', 'it', 'web', 'app', 'code', 'soft', 'sys', 'dev'];
        const consulting = ['konsult', 'jurist', 'ekonomi', 'redovisning', 'advokat', 'law', 'finance', 'consult'];

        // Logic
        if (construction.some(k => cleanInput.includes(k))) {
            suffixes.push('entreprenad', 'bygg', 'projekt', 'service', 'gruppen');
        } else if (beauty.some(k => cleanInput.includes(k))) {
            suffixes.push('studio', 'klink', 'beauty', 'sthlm', 'care');
        } else if (tech.some(k => cleanInput.includes(k))) {
            suffixes.push('lab', 'digital', 'io', 'studio', 'solutions');
        } else if (consulting.some(k => cleanInput.includes(k))) {
            suffixes.push('partner', 'gruppen', 'konsult', 'associates', 'rådgivning');
        } else {
            // General
            suffixes.push('group', 'ab', 'sverige', 'hq', 'official');
        }

        return suffixes.map(s => `${cleanInput}${s}.se`);
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

    // Step 8: Mail
    const [mailChoice, setMailChoice] = useState<"yes" | "no" | null>(null);
    const [emailCount, setEmailCount] = useState(1);
    const [emailNames, setEmailNames] = useState<string[]>([""]);

    const handleEmailCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const count = parseInt(e.target.value);
        setEmailCount(count);
        updateData("mail_count", count);
        // Resize email names array
        const newNames = [...emailNames];
        while (newNames.length < count) newNames.push("");
        while (newNames.length > count) newNames.pop();
        setEmailNames(newNames);
        updateData("email_names", newNames);
    };

    const handleEmailNameChange = (index: number, value: string) => {
        const newNames = [...emailNames];
        newNames[index] = value;
        setEmailNames(newNames);
        updateData("email_names", newNames);
    };

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
        if (step === 3) return !!formData.gbp;
        if (step === 4) {
            if (!domainChoice) return false;
            if (domainChoice === 'yes' && !formData.domain_name) return false;
            // if choice is 'no', we allow empty if "Vet ej" is checked
            if (domainChoice === 'no') {
                if (formData.domainUnknown) return true;
                if (!formData.domain_name) return false;
            }
            return true;
        }
        if (step === 5) return !!formData.reach;
        if (step === 6) {
            if (!formData.ecommerce) return false;
            if (formData.ecommerce === 'yes') {
                if (!formData.ecommerce_priority) return false;
                if (!formData.product_count) return false;
                if (!formData.product_type) return false;
            }
            return true;
        }
        if (step === 7) return !!formData.updates;
        if (step === 8) return !!formData.mail; // Mail yes/no
        if (step === 9) return true; // Optional? Or at least "selectedServices"
        if (step === 10) {
            return !!formData.company && !!formData.name && !!formData.email && !!formData.phone;
        }
        return true;
    };

    const handleNext = () => {
        const isValid = validateStep(currentStep);

        if (isValid) {
            if (currentStep === 9) {
                // Commit services to formData
                updateData("services", Array.from(selectedServices));
            }
            if (currentStep < 10) {
                setCurrentStep((prev) => prev + 1);
            } else {
                handleSubmit();
            }
        } else {
            alert("Fyll i de obligatoriska fälten.");
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
    const getProgress = () => ((currentStep / 10) * 100) + "%";

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
                                                <h3 className="text-xl text-white font-medium mb-2 font-montserrat">Är SEO en viktig del av din tillväxt?</h3>
                                                <p className="text-neutral-400 text-sm font-light mb-8 max-w-2xl">
                                                    SEO = sökmotor optimering, eller med andra ord det som gör att du syns högst upp i sökresultaten när folk googlar efter dina tjänster.
                                                </p>
                                                <div className="space-y-4">
                                                    {[
                                                        { val: "primary", label: "Ja, jätte viktigt!" },
                                                        { val: "complementary", label: "Ja, lite viktigt" },
                                                        { val: "none", label: "Nej, inte så viktigt" },
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
                                                <h3 className="text-xl text-white font-medium mb-2 font-montserrat">Vill du att vi sätter upp och/eller optimerar din Google Business Profile?</h3>
                                                <p className="text-neutral-400 text-sm font-light mb-8 max-w-2xl">
                                                    Detta är avgörande för lokala företag (verksamheter som gör affärer i sin stad/närområde snarare än nationellt) för att synas på kartor och lokala sökningar.
                                                </p>
                                                <div className="space-y-4">
                                                    {[
                                                        { val: "yes", label: "Ja" },
                                                        { val: "no", label: "Nej" },
                                                        { val: "consulting", label: "Vet ej - öppen för förslag / rådgivning" }
                                                    ].map(opt => (
                                                        <div key={opt.val} onClick={() => updateData("gbp", opt.val)} className={listOptionClass(formData.gbp === opt.val)}>
                                                            <div className={dotClass(formData.gbp === opt.val)}></div>
                                                            <span className="text-sm text-white">{opt.label}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Step 4: Domain */}
                                        {currentStep === 4 && (
                                            <div>
                                                <h3 className="text-xl text-white font-medium mb-2 font-montserrat">Har du redan en domän?</h3>
                                                <p className="text-neutral-400 text-sm font-light mb-8 max-w-2xl">
                                                    En domän = nike.com, eller aftonbladet.se.
                                                    <br />
                                                    Din domän är adressen som din hemsida kommer leva på och förknippas med, namnet på din hemsida.
                                                </p>
                                                <div className="grid grid-cols-2 gap-6 mb-8">
                                                    {([{ val: "yes", label: "Ja" }, { val: "no", label: "Nej" }] as const).map(opt => (
                                                        <div key={opt.val}
                                                            onClick={() => { setDomainChoice(opt.val); updateData("domain_type", opt.val); updateData("domainUnknown", false); }}
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
                                                    <div className="animate-in fade-in slide-in-from-top-4 space-y-6">
                                                        <div className="relative">
                                                            <input
                                                                type="text"
                                                                placeholder={formData.domainUnknown ? "Vet ej valt" : "Önskad domän (t.ex. nymarks.se)"}
                                                                disabled={!!formData.domainUnknown}
                                                                value={formData.domain_name || ""}
                                                                onChange={(e) => {
                                                                    const val = e.target.value;
                                                                    updateData("domain_name", val);
                                                                    // Simple suggestion logic
                                                                    if (val.length > 2) {
                                                                        // Simple suggestion logic - handled in render for specific suggestions
                                                                    }
                                                                }}
                                                                className={clsx(
                                                                    "w-full bg-neutral-900/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0A8F6A] transition-opacity",
                                                                    formData.domainUnknown && "opacity-50 cursor-not-allowed"
                                                                )}
                                                            />
                                                            {/* Suggestions - Derived from current input */}
                                                            {!formData.domainUnknown && formData.domain_name && formData.domain_name.length > 2 && (
                                                                <div className="mt-3 flex flex-wrap gap-2 animate-in fade-in slide-in-from-top-2">
                                                                    {(() => {
                                                                        const smartSugs = generateSmartSuggestions(formData.domain_name || "");
                                                                        return smartSugs.map(s => (
                                                                            <span key={s}
                                                                                onClick={() => updateData("domain_name", s)}
                                                                                className="cursor-pointer px-3 py-1.5 rounded-full bg-[#0A8F6A]/10 border border-[#0A8F6A]/20 text-[#0A8F6A] text-xs font-medium hover:bg-[#0A8F6A]/20 transition-colors"
                                                                            >
                                                                                {s}
                                                                            </span>
                                                                        ));
                                                                    })()}
                                                                </div>
                                                            )}
                                                        </div>

                                                        <div
                                                            onClick={() => {
                                                                const newVal = !formData.domainUnknown;
                                                                updateData("domainUnknown", newVal);
                                                                if (newVal) updateData("domain_name", "");
                                                            }}
                                                            className="flex items-center gap-3 cursor-pointer group"
                                                        >
                                                            <div className={clsx(
                                                                "w-5 h-5 rounded border flex items-center justify-center transition-colors",
                                                                formData.domainUnknown ? "bg-[#0A8F6A] border-[#0A8F6A]" : "border-white/20 group-hover:border-white/40"
                                                            )}>
                                                                {formData.domainUnknown && <Check className="w-3 h-3 text-white" />}
                                                            </div>
                                                            <span className="text-sm text-neutral-400 group-hover:text-white transition-colors">
                                                                Vet ej - öppen för förslag / rådgivning
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* Step 5: Reach */}
                                        {currentStep === 5 && (
                                            <div>
                                                <h3 className="text-xl text-white font-medium mb-2 font-montserrat">Var finns dina kunder?</h3>
                                                <p className="text-neutral-400 text-sm font-light mb-8 max-w-2xl">
                                                    Beroende på din marknad (lokal / nationell / internationell) så avgör det väldigt mycket hur din hemsida behöver byggas upp.
                                                </p>
                                                <div className="grid grid-cols-1 gap-4">
                                                    {['Lokalt', 'Nationellt', 'Internationellt'].map((opt) => (
                                                        <div key={opt}
                                                            onClick={() => updateData("reach", opt)}
                                                            className={clsx(
                                                                "quiz-option cursor-pointer p-6 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all flex items-center justify-between group",
                                                                formData.reach === opt && "selected border-[#0A8F6A] bg-[#0A8F6A]/10"
                                                            )}
                                                        >
                                                            <span className="text-white font-medium group-hover:translate-x-1 transition-transform">{opt}</span>
                                                            {formData.reach === opt && <div className="w-2 h-2 rounded-full bg-[#0A8F6A] shadow-[0_0_10px_#0A8F6A]" />}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Step 6: Ecommerce */}
                                        {currentStep === 6 && (
                                            <div>
                                                <h3 className="text-xl text-white font-medium mb-2 font-montserrat">Behöver du e-handel?</h3>
                                                <p className="text-neutral-400 text-sm font-light mb-8 max-w-2xl">
                                                    Vill du sälja produkter och/eller tjänster på din hemsida med möjlighet för utcheckning och betalning direkt på hemsidan?
                                                </p>
                                                <div className="grid grid-cols-2 gap-6 mb-8">
                                                    {([{ val: "yes", label: "Ja" }, { val: "no", label: "Nej" }] as const).map(opt => (
                                                        <div key={opt.val}
                                                            onClick={() => {
                                                                updateData("ecommerce", opt.val);
                                                                // Clear sub-fields if switching to no
                                                                if (opt.val === 'no') {
                                                                    updateData("ecommerce_priority", "");
                                                                    updateData("product_count", "");
                                                                    updateData("product_type", "");
                                                                }
                                                            }}
                                                            className={clsx(
                                                                "quiz-option cursor-pointer p-8 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all text-center flex flex-col items-center justify-center gap-4 h-32",
                                                                formData.ecommerce === opt.val && "selected border-[#0A8F6A] bg-[#0A8F6A]/10"
                                                            )}
                                                        >
                                                            <span className="text-white font-medium">{opt.label}</span>
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* Conditional Sub-questions for Ecommerce = Yes */}
                                                {formData.ecommerce === 'yes' && (
                                                    <div className="animate-in fade-in slide-in-from-top-4 space-y-8 border-t border-white/10 pt-8 mt-8">

                                                        {/* Priority */}
                                                        <div className="space-y-4">
                                                            <h4 className="text-white text-sm font-medium opacity-90">Hur viktig är e-handeln?</h4>
                                                            <div className="grid grid-cols-1 gap-3">
                                                                {[
                                                                    { id: 'essential', label: 'E-handel är väsentligt för min hemsida' },
                                                                    { id: 'addon', label: 'E-handel är en liten del av min hemsida' }
                                                                ].map((p) => (
                                                                    <div key={p.id}
                                                                        onClick={() => updateData("ecommerce_priority", p.id)}
                                                                        className={clsx(
                                                                            "cursor-pointer p-4 rounded-lg border transition-all flex items-center gap-3",
                                                                            formData.ecommerce_priority === p.id
                                                                                ? "border-[#0A8F6A] bg-[#0A8F6A]/10"
                                                                                : "border-white/10 bg-white/5 hover:bg-white/10"
                                                                        )}
                                                                    >
                                                                        <div className={clsx(
                                                                            "w-4 h-4 rounded-full border flex items-center justify-center",
                                                                            formData.ecommerce_priority === p.id ? "border-[#0A8F6A]" : "border-white/30"
                                                                        )}>
                                                                            {formData.ecommerce_priority === p.id && <div className="w-2 h-2 rounded-full bg-[#0A8F6A]" />}
                                                                        </div>
                                                                        <span className="text-sm text-white/90">{p.label}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        {/* Product Count */}
                                                        <div className="space-y-3">
                                                            <label className="text-white text-sm font-medium opacity-90">
                                                                Hur många produkter/tjänster har du tänkt inkludera?
                                                            </label>
                                                            <input
                                                                type="text"
                                                                placeholder="t.ex. 10-20 st, eller ca 500 st"
                                                                value={formData.product_count || ""}
                                                                onChange={(e) => updateData("product_count", e.target.value)}
                                                                className="w-full bg-neutral-900/50 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#0A8F6A]"
                                                            />
                                                        </div>

                                                        {/* Product Type */}
                                                        <div className="space-y-3">
                                                            <label className="text-white text-sm font-medium opacity-90">
                                                                Vad säljer du för typ av produkter/tjänster?
                                                            </label>
                                                            <input
                                                                type="text"
                                                                placeholder="t.ex. Kläder, Digitala kurser, Hantverk..."
                                                                value={formData.product_type || ""}
                                                                onChange={(e) => updateData("product_type", e.target.value)}
                                                                className="w-full bg-neutral-900/50 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#0A8F6A]"
                                                            />
                                                        </div>

                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* Step 7: Updates - Renumbered from 8 (Blog removed) */}
                                        {currentStep === 7 && (
                                            <div>
                                                <h3 className="text-xl text-white font-medium mb-8 font-montserrat">Hur ofta kommer din hemsida behöva uppdateras och underhållas?</h3>
                                                <div className="space-y-4">
                                                    {[
                                                        { val: "rarely", label: "Sällan, 1-2 gånger per år" },
                                                        { val: "occasionally", label: "Ibland, 1-2 gånger i månaden" },
                                                        { val: "regularly", label: "Ofta, 1-2+ gånger i veckan" }
                                                    ].map(opt => (
                                                        <div key={opt.val} onClick={() => updateData("updates", opt.val)} className={listOptionClass(formData.updates === opt.val)}>
                                                            <div className={dotClass(formData.updates === opt.val)}></div>
                                                            <span className="text-sm text-white text-left leading-relaxed">{opt.label}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Step 8: Mail */}
                                        {currentStep === 8 && (
                                            <div>
                                                <h3 className="text-xl text-white font-medium mb-2 font-montserrat">Behöver du företagsmail?</h3>
                                                <p className="text-neutral-400 text-sm font-light mb-8 max-w-2xl">
                                                    Behöver du en "info@dittforetag.se" eller "david@dittforetag.se"? Vi hjälper dig sätta upp professionella emailkonton.
                                                </p>
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
                                                    <div className="animate-in fade-in slide-in-from-top-4 space-y-6">
                                                        {/* Slider */}
                                                        <div className="bg-neutral-900/30 border border-white/10 rounded-xl p-6">
                                                            <div className="flex justify-between mb-4">
                                                                <label className="text-xs text-neutral-400 font-medium uppercase">Hur många e-postkonton behöver du?</label>
                                                                <span className="text-[#0A8F6A] font-bold text-sm">{emailCount} st</span>
                                                            </div>
                                                            <input
                                                                type="range"
                                                                min="1"
                                                                max="10"
                                                                value={emailCount}
                                                                onChange={handleEmailCountChange}
                                                            />
                                                        </div>

                                                        {/* Dynamic Email Name Inputs */}
                                                        <div className="space-y-3">
                                                            <p className="text-neutral-400 text-sm font-light">Vad ska e-postkontona heta?</p>
                                                            {emailNames.map((name, index) => (
                                                                <div key={index} className="flex items-center gap-3">
                                                                    <span className="text-[#0A8F6A] font-bold text-sm w-6">{index + 1}.</span>
                                                                    <input
                                                                        type="text"
                                                                        placeholder={`t.ex. ${index === 0 ? 'william' : index === 1 ? 'info' : 'faktura'}@dittforetag.se`}
                                                                        value={name}
                                                                        onChange={(e) => handleEmailNameChange(index, e.target.value)}
                                                                        className="flex-1 bg-neutral-900/50 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#0A8F6A] transition-colors placeholder:text-neutral-600"
                                                                    />
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* Step 9: Other */}
                                        {currentStep === 9 && (
                                            <div>
                                                <h3 className="text-xl text-white font-medium mb-2 font-montserrat">Är du intresserad av våra andra tjänster?</h3>
                                                <p className="text-neutral-400 text-sm font-light mb-8 max-w-2xl">
                                                    Vi gör hela paketet. Allt ifrån hemsida och digital annonsering till professionell videoproduktion med kameraman ute på plats hos dig.
                                                </p>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    {[{ val: "google_ads", label: "Google Ads" }, { val: "meta_ads", label: "Meta Ads" }, { val: "video_content", label: "Videoproduktion & content" }].map(opt => (
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

                                        {/* Step 10: Final */}
                                        {currentStep === 10 && (
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
                                                                <span className="text-rose-500 ml-1">*</span>
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
                                {currentStep < 10 ? (
                                    <button
                                        type="button"
                                        onClick={handleNext}
                                        className="flex items-center gap-2 px-8 py-3 bg-[#0A8F6A] hover:bg-[#097a5b] active:scale-[0.98] hover:scale-[1.02] hover:brightness-110 text-white text-xs uppercase font-semibold tracking-wider rounded transition-all shadow-[0_4px_20px_rgba(10,143,106,0.3)] duration-200"
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
