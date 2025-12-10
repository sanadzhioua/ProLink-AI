'use client';
import { useState } from 'react';
import { Linkedin, Sparkles, Copy, Check, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';

export default function LinkedInOptimizer() {
    const [activeTab, setActiveTab] = useState('about');
    const [linkedinUrl, setLinkedinUrl] = useState('');
    const [aboutText, setAboutText] = useState('');
    const [optimizedText, setOptimizedText] = useState('');
    const [reviewReport, setReviewReport] = useState('');
    const [copied, setCopied] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleOptimize = async () => {
        if ((!aboutText && !linkedinUrl) || loading) return;
        setLoading(true);
        setOptimizedText('');
        setReviewReport('');

        try {
            let response;
            if (linkedinUrl) {
                // Optimize via URL
                response = await axios.post('http://localhost:5000/api/linkedin/analyze', {
                    linkedinUrl
                });
            } else {
                // Optimize via Text
                response = await axios.post('http://localhost:5000/api/linkedin/optimize-about', {
                    currentAbout: aboutText,
                    jobTitle: "Professional"
                });
            }

            setOptimizedText(response.data.optimized_about);
            setReviewReport(response.data.markdown_report);
        } catch (err) {
            console.error(err);
            const errorMsg = err.response?.data?.error || err.message;
            alert(`Optimization failed: ${errorMsg}`);
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(optimizedText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden h-full flex flex-col">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Linkedin className="w-5 h-5 text-[#0077b5]" />
                    LinkedIn Profile Booster
                </h2>
                <div className="flex bg-slate-200 rounded-lg p-1 text-xs font-semibold">
                    <button
                        onClick={() => setActiveTab('about')}
                        className={`px-3 py-1.5 rounded-md transition-all ${activeTab === 'about' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        About
                    </button>
                    <button
                        onClick={() => setActiveTab('experience')}
                        className={`px-3 py-1.5 rounded-md transition-all ${activeTab === 'experience' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        Experience
                    </button>
                </div>
            </div>

            <div className="p-6 flex-1 flex flex-col gap-4 overflow-y-auto">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">LinkedIn Profile URL (Optional)</label>
                            <div className="relative">
                                <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="https://linkedin.com/in/username"
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-mono text-sm"
                                    value={linkedinUrl}
                                    onChange={(e) => setLinkedinUrl(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 flex-1">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Or Paste Your Content</label>
                            <textarea
                                className="flex-1 min-h-[200px] w-full p-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all resize-none text-sm leading-relaxed"
                                placeholder={activeTab === 'about' ? "Paste your current LinkedIn 'About' section here..." : "Describe your work experience..."}
                                value={aboutText}
                                onChange={(e) => setAboutText(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                            <label className="text-xs font-semibold text-primary-600 uppercase tracking-wider flex items-center gap-1">
                                <Sparkles className="w-3 h-3" /> AI Suggestion
                            </label>
                            {optimizedText && (
                                <button
                                    onClick={copyToClipboard}
                                    className="text-xs flex items-center gap-1 text-slate-500 hover:text-primary-600 transition-colors"
                                >
                                    {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                    {copied ? "Copied" : "Copy"}
                                </button>
                            )}
                        </div>
                        <div className="flex-1 min-h-[300px] w-full p-4 rounded-xl border border-primary-100 bg-primary-50/30 text-slate-700 text-sm leading-relaxed overflow-y-auto">
                            {loading ? (
                                <div className="h-full flex items-center justify-center text-slate-400 gap-2">
                                    <Loader2 className="w-4 h-4 animate-spin" /> Generating magic...
                                </div>
                            ) : optimizedText ? (
                                <div className="whitespace-pre-line">{optimizedText}</div>
                            ) : (
                                <div className="h-full flex items-center justify-center text-slate-400 italic text-center px-4">
                                    Click optimize to generate a professional version
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {reviewReport && (
                    <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200 text-sm prose prose-sm max-w-none">
                        <h3 className="font-bold text-slate-700 mb-2">Analysis Report</h3>
                        <ReactMarkdown>{reviewReport}</ReactMarkdown>
                    </div>
                )}

                <button
                    onClick={handleOptimize}
                    disabled={(!aboutText && !linkedinUrl) || loading}
                    className="w-full py-3 rounded-xl bg-[#0077b5] hover:bg-[#006097] text-white font-bold shadow-lg shadow-blue-900/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <Sparkles className="w-4 h-4" />} Optimize LinkedIn Profile
                </button>
            </div>
        </div>
    )
}
