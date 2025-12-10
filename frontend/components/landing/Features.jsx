'use client';
import { motion } from 'framer-motion';
import { FileText, Linkedin, Github, CheckCircle, Zap, Shield, TrendingUp } from 'lucide-react';

const features = [
    {
        icon: <FileText className="w-8 h-8 text-blue-600" />,
        title: "Smart CV Optimization",
        description: "Our AI analyzes your resume against job descriptions, corrects formatting, highlights key achievements, and boosts your ATS score to 90+.",
        color: "bg-blue-50",
        points: ["ATS Score Analysis", "Keyword Optimization", "Grammar & Tone Check"]
    },
    {
        icon: <Linkedin className="w-8 h-8 text-blue-700" />,
        title: "LinkedIn Profile Booster",
        description: "Revamp your 'About' section, optimize headlines for SEO, and get personalized suggestions to rank higher in recruiter searches.",
        color: "bg-indigo-50",
        points: ["SEO Headlines", "Viral Post Suggestions", "Experience Rewrite"]
    },
    {
        icon: <Github className="w-8 h-8 text-gray-800" />,
        title: "GitHub Portfolio Audit",
        description: "Turn your code repositories into a professional portfolio. We analyze your tech stack, projects, and generate a stunning README.",
        color: "bg-gray-50",
        points: ["Repo Analysis", "Tech Stack Detection", "Markdown Portfolio"]
    }
];

export default function Features() {
    return (
        <section id="features" className="py-24 bg-white relative">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900">Everything you need to <span className="text-primary-600">stand out</span></h2>
                    <p className="text-xl text-gray-500">
                        A complete suite of AI tools designed to accelerate your career growth and land your dream tech role.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="p-8 rounded-2xl border border-gray-100 hover:border-primary-100 bg-white shadow-lg shadow-gray-200/50 hover:shadow-xl hover:shadow-primary-500/10 transition-all text-left group"
                        >
                            <div className={`w-16 h-16 rounded-xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                {feature.icon}
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-slate-800">{feature.title}</h3>
                            <p className="text-slate-600 leading-relaxed mb-6">{feature.description}</p>
                            <ul className="space-y-3">
                                {feature.points.map((point, i) => (
                                    <li key={i} className="flex items-center text-sm text-slate-500 font-medium">
                                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
