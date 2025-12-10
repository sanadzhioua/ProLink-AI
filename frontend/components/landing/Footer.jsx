'use client';
import Link from 'next/link';
import { Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300 py-12">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-4 text-white">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold">C</div>
                            <span className="text-xl font-bold">CareerFlow AI</span>
                        </div>
                        <p className="text-slate-400 max-w-sm">
                            Empowering developers and professionals to build standout careers with the power of Artificial Intelligence.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Product</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="#features" className="hover:text-blue-400">Features</Link></li>
                            <li><Link href="/pricing" className="hover:text-blue-400">Pricing</Link></li>
                            <li><Link href="/templates" className="hover:text-blue-400">CV Templates</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Company</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/about" className="hover:text-blue-400">About Us</Link></li>
                            <li><Link href="/blog" className="hover:text-blue-400">Blog</Link></li>
                            <li><Link href="/contact" className="hover:text-blue-400">Contact</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-sm">
                    <p>© 2025 CareerFlow AI. All rights reserved.</p>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <Link href="#" className="hover:text-white"><Twitter size={20} /></Link>
                        <Link href="#" className="hover:text-white"><Github size={20} /></Link>
                        <Link href="#" className="hover:text-white"><Linkedin size={20} /></Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
