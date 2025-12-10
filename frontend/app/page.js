import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden selection:bg-primary-100 selection:text-primary-900">
      <div className="absolute top-0 left-0 w-full z-50 px-6 py-6">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-600 to-secondary-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">CF</div>
            <div className="font-bold text-xl tracking-tight text-slate-900">CareerFlow AI</div>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-primary-600 transition-colors">Features</a>
            <a href="#" className="hover:text-primary-600 transition-colors">Pricing</a>
            <a href="#" className="hover:text-primary-600 transition-colors">About</a>
          </div>
          <div className="flex items-center gap-4">
            <a href="/dashboard" className="text-sm font-semibold text-slate-900 hover:text-primary-600 transition-colors">Sign In</a>
            <a href="/dashboard" className="hidden sm:inline-flex px-5 py-2.5 rounded-full bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl">
              Get Started
            </a>
          </div>
        </div>
      </div>

      <Hero />
      <Features />
      <HowItWorks />
      <Footer />
    </main>
  );
}
