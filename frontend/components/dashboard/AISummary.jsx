'use client';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function AISummary() {
    return (
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-xl p-6 text-white h-full relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

            <h2 className="text-lg font-bold mb-4 flex items-center gap-2 relative z-10">
                <Sparkles className="w-5 h-5 text-primary-400" />
                AI Career Consultant
            </h2>

            <div className="space-y-4 relative z-10">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10">
                    <div className="flex justify-between items-end mb-2">
                        <span className="text-sm text-slate-300">Overall Profile Score</span>
                        <span className="text-2xl font-bold text-primary-400">85/100</span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "85%" }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-primary-600 to-secondary-500"
                        />
                    </div>
                </div>

                <div className="text-sm text-slate-300 leading-relaxed font-light">
                    <p className="mb-2">Based on my analysis, your profile is strong but has room for improvement:</p>
                    <ul className="space-y-2 list-disc pl-4 text-slate-200">
                        <li>CV: Quantify your achievements more (e.g. "Increased sales by 20%")</li>
                        <li>LinkedIn: Add more keywords related to "System Design"</li>
                        <li>GitHub: Add a portfolio README to your pinned repositories</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
