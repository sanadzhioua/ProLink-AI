'use client';
import Link from 'next/link';
import { ArrowLeft, User, Bell } from 'lucide-react';
import CVUpload from '@/components/dashboard/CVUpload';
import LinkedInOptimizer from '@/components/dashboard/LinkedInOptimizer';
import GitHubAudit from '@/components/dashboard/GitHubAudit';
import AISummary from '@/components/dashboard/AISummary';

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                            <ArrowLeft className="w-5 h-5 text-slate-500" />
                        </Link>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-600 to-secondary-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">CF</div>
                            <span className="font-bold text-slate-900">CareerFlow AI</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                            <Bell className="w-5 h-5" />
                        </button>
                        <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-slate-500 border border-slate-300">
                            <User className="w-4 h-4" />
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                <div className="flex flex-col gap-2 mb-8">
                    <h1 className="text-2xl font-bold text-slate-900">Your Career Workspace</h1>
                    <p className="text-slate-500">Manage and optimize your professional presence.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column (Main Inputs) */}
                    <div className="lg:col-span-2 space-y-6">
                        <section className="h-[400px]">
                            <CVUpload />
                        </section>
                        <section className="h-[600px]">
                            <LinkedInOptimizer />
                        </section>
                    </div>

                    {/* Right Column (Insights & Secondary) */}
                    <div className="space-y-6">
                        <section className="h-[300px]">
                            <AISummary />
                        </section>
                        <section className="h-[500px]">
                            <GitHubAudit />
                        </section>
                    </div>
                </div>
            </main>
        </div>
    )
}
