'use client';
import { motion } from 'framer-motion';
import { Upload, Cpu, Download } from 'lucide-react';

export default function HowItWorks() {
    const steps = [
        {
            icon: <Upload className="w-6 h-6 text-white" />,
            title: "Upload Data",
            description: "Upload your CV (PDF/DOCX) or paste your LinkedIn/GitHub URL.",
            bg: "bg-blue-600"
        },
        {
            icon: <Cpu className="w-6 h-6 text-white" />,
            title: "AI Analysis",
            description: "Our advanced AI scans your profile, finding gaps and opportunities.",
            bg: "bg-violet-600"
        },
        {
            icon: <Download className="w-6 h-6 text-white" />,
            title: "Get Results",
            description: "Download your optimized CV and improved profile suggestions instantly.",
            bg: "bg-green-600"
        }
    ];

    return (
        <section className="py-20 bg-slate-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">How CareerFlow Works</h2>
                    <p className="text-lg text-slate-600">Simple, fast, and effective optimization in 3 steps.</p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-slate-200 -z-0 transform translate-y-4"></div>

                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                className="relative z-10 flex flex-col items-center text-center"
                            >
                                <div className={`w-16 h-16 rounded-full ${step.bg} flex items-center justify-center shadow-lg mb-6 border-4 border-white`}>
                                    {step.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-slate-800">{step.title}</h3>
                                <p className="text-slate-600 leading-relaxed text-sm px-4">{step.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
