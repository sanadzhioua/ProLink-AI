'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Upload, FileText, Linkedin, Github } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
    return (
        <section className="relative pt-32 pb-20 overflow-hidden bg-white dark:bg-black">
            {/* Background gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
                <div className="absolute -top-20 left-0 w-[500px] h-[500px] bg-primary-400/10 rounded-full blur-3xl opacity-50" />
                <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-secondary-400/10 rounded-full blur-3xl opacity-50" />
            </div>

            <div className="container mx-auto px-4 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center px-3 py-1 rounded-full border border-primary-200 bg-primary-50 text-primary-700 text-sm font-medium mb-8">
                        <span className="flex h-2 w-2 rounded-full bg-primary-600 mr-2 animate-pulse"></span>
                        Top Rated AI Career Tool 2025
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6 leading-tight">
                        Boost your CV, LinkedIn <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">
                            & GitHub with AI
                        </span>
                    </h1>

                    <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Stop guessing. Let our AI analyze and optimize your professional profile
                        to pass ATS filters and impress recruiters instantly.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
                        <Link href="/dashboard" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transform hover:-translate-y-1">
                            <Upload className="w-5 h-5 mr-2" />
                            Upload your CV
                        </Link>
                        <Link href="#features" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors">
                            Explore Features
                        </Link>
                    </div>
                </motion.div>

                {/* Floating Cards Demo */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative max-w-5xl mx-auto"
                >
                    <div className="relative bg-white/40 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-6 ring-1 ring-gray-900/5 aspect-[16/9] overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary-50/50 to-secondary-50/50" />

                        {/* Simple UI Mockup */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl relative z-10">
                            {/* Card 1: CV */}
                            <motion.div
                                className="bg-white p-4 rounded-xl shadow-lg border border-gray-100"
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600"><FileText size={20} /></div>
                                    <div>
                                        <div className="h-2 w-16 bg-gray-200 rounded mb-1"></div>
                                        <div className="h-2 w-10 bg-gray-100 rounded"></div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="h-2 w-full bg-gray-100 rounded"></div>
                                    <div className="h-2 w-3/4 bg-gray-100 rounded"></div>
                                    <div className="mt-4 inline-flex items-center text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">
                                        ATS Score: 92/100
                                    </div>
                                </div>
                            </motion.div>

                            {/* Card 2: LinkedIn */}
                            <motion.div
                                className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 mt-8 md:mt-0"
                                animate={{ y: [0, -15, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 bg-blue-100 rounded-lg text-blue-700"><Linkedin size={20} /></div>
                                    <div>
                                        <div className="h-2 w-20 bg-gray-200 rounded mb-1"></div>
                                        <div className="h-2 w-12 bg-gray-100 rounded"></div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="p-2 bg-gray-50 rounded text-xs text-gray-500">
                                        "Experienced Software Engineer..."
                                    </div>
                                    <div className="p-2 bg-blue-50 rounded text-xs text-blue-700 border border-blue-100">
                                        ✨ Better: "Senior Full Stack Dev..."
                                    </div>
                                </div>
                            </motion.div>

                            {/* Card 3: GitHub */}
                            <motion.div
                                className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 md:mt-12"
                                animate={{ y: [0, -12, 0] }}
                                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 bg-gray-100 rounded-lg text-gray-800"><Github size={20} /></div>
                                    <div>
                                        <div className="h-2 w-14 bg-gray-200 rounded mb-1"></div>
                                        <div className="h-2 w-8 bg-gray-100 rounded"></div>
                                    </div>
                                </div>
                                <div className="flex gap-2 mt-2">
                                    <div className="h-16 w-1 bg-blue-400 rounded-t"></div>
                                    <div className="h-10 w-1 bg-yellow-400 rounded-t"></div>
                                    <div className="h-12 w-1 bg-purple-400 rounded-t"></div>
                                    <div className="h-8 w-1 bg-green-400 rounded-t"></div>
                                    <div className="h-14 w-1 bg-red-400 rounded-t"></div>
                                </div>
                                <div className="mt-2 text-xs text-gray-500">Top Skill: React</div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
