"use client";

import { useState } from "react";
import { Mail, Phone } from "lucide-react";

export default function Footer() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to submit');
            }

            setIsSuccess(true);
            setFormData({ name: "", email: "", phone: "", message: "" });
        } catch (error) {
            console.error('Submission error:', error);
            alert('Något gick fel. Försök igen eller kontakta oss direkt.');
        } finally {
            setIsSubmitting(false);
        }
    };

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
                    {isSuccess ? (
                        <div className="glass-panel border-white/5 border rounded-2xl p-8 text-center">
                            <div className="w-16 h-16 rounded-full bg-[#0A8F6A]/10 border border-[#0A8F6A]/20 flex items-center justify-center mx-auto mb-6">
                                <Mail className="w-8 h-8 text-[#0A8F6A]" />
                            </div>
                            <h3 className="text-xl text-white font-medium mb-4">Tack för ditt meddelande!</h3>
                            <p className="text-neutral-400 text-sm">Vi återkommer till dig så snart som möjligt.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="glass-panel border-white/5 border rounded-2xl pt-8 pr-8 pb-8 pl-8 space-y-5">
                            <div className="">
                                <label className="block text-[10px] uppercase tracking-widest text-neutral-500 font-semibold mb-2 ml-1">Namn</label>
                                <input
                                    type="text"
                                    placeholder="Ditt namn"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-[#0A8F6A] focus:bg-white/[0.05] focus:outline-none transition-all placeholder:text-neutral-700"
                                />
                            </div>
                            <div className="">
                                <label className="block text-[10px] uppercase tracking-widest text-neutral-500 font-semibold mb-2 ml-1">E-post</label>
                                <input
                                    type="email"
                                    placeholder="din@epost.se"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="focus:border-[#0A8F6A] focus:bg-white/[0.05] focus:outline-none transition-all placeholder:text-neutral-700 text-sm text-white w-full border-white/10 border rounded-lg pt-3 pr-4 pb-3 pl-4"
                                />
                            </div>
                            <div className="">
                                <label className="block text-[10px] uppercase font-semibold text-neutral-500 tracking-widest mb-2 ml-1">Telefon</label>
                                <input
                                    type="tel"
                                    placeholder="070-123 45 67"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="focus:border-[#0A8F6A] focus:bg-white/[0.05] focus:outline-none transition-all placeholder:text-neutral-700 text-sm text-white w-full border-white/10 border rounded-lg pt-3 pr-4 pb-3 pl-4"
                                />
                            </div>
                            <div className="">
                                <label className="block text-[10px] uppercase tracking-widest text-neutral-500 font-semibold mb-2 ml-1">Meddelande</label>
                                <textarea
                                    rows={4}
                                    placeholder="Berätta om ditt projekt..."
                                    required
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="focus:border-[#0A8F6A] focus:bg-white/[0.05] focus:outline-none transition-all resize-none placeholder:text-neutral-700 text-sm text-white w-full border-white/10 border rounded-lg pt-3 pr-4 pb-3 pl-4"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-[#0A8F6A] text-white py-3.5 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-[#097a5b] transition-all shadow-lg shadow-[#0A8F6A]/20 hover:shadow-[#0A8F6A]/40 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Skickar...' : 'Skicka meddelande'}
                            </button>
                        </form>
                    )}
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
