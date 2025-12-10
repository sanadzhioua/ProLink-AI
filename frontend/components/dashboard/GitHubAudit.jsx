'use client';
import { useState } from 'react';
import { Github, Search, Code, Star, GitFork, Download, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';

export default function GitHubAudit() {
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const [auditData, setAuditData] = useState(null);

    const handleAudit = async () => {
        if (!username || loading) return;
        setLoading(true);
        setAuditData(null);

        try {
            const response = await axios.post('http://localhost:5000/api/github/audit', { username });
            setAuditData(response.data);
        } catch (err) {
            console.error(err);
            const errorMsg = err.response?.data?.error || err.message;
            alert(err.response?.status === 404 ? "User not found" : `Audit failed: ${errorMsg}`);
        } finally {
            setLoading(false);
        }
    };

    const downloadPortfolio = () => {
        if (!auditData?.portfolio_md) return;
        const blob = new Blob([auditData.portfolio_md], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${username}-portfolio.md`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden h-full flex flex-col">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Github className="w-5 h-5 text-slate-900" />
                    GitHub Portfolio Audit
                </h2>
            </div>

            <div className="p-6 flex-1 flex flex-col gap-6 overflow-y-auto">
                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <Github className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Enter GitHub username"
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all font-mono text-sm"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAudit()}
                        />
                    </div>
                    <button
                        onClick={handleAudit}
                        disabled={!username || loading}
                        className="px-6 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors disabled:opacity-70 flex items-center gap-2"
                    >
                        {loading && <Loader2 className="animate-spin w-4 h-4" />}
                        {loading ? "Scanning..." : "Audit"}
                    </button>
                </div>

                {auditData && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
                        {/* Tech Stack Bar */}
                        {auditData.top_skills && (
                            <div>
                                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Inferred Tech Stack</h3>
                                <div className="flex flex-wrap gap-2">
                                    {auditData.top_skills.map((skill, i) => (
                                        <span key={i} className="px-2 py-1 bg-slate-100 text-slate-600 rounded-md text-xs font-semibold">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Markdown Report */}
                        {auditData.markdown_report && (
                            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 prose prose-sm max-w-none prose-headings:text-slate-800">
                                <ReactMarkdown>{auditData.markdown_report}</ReactMarkdown>
                            </div>
                        )}

                        <button
                            onClick={downloadPortfolio}
                            className="w-full py-3 rounded-xl border-2 border-slate-900 text-slate-900 font-bold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                        >
                            <Download className="w-4 h-4" /> Download Portfolio.md
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
