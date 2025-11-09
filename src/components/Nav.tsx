"use client";

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-gray-800/60 border-b border-white/5">
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <a href="#home" className="logo-text">DrMcGi’s SaaS Co.</a>
        <div className="flex items-center gap-6 text-sm text-white/80">
          <a href="#home" className="hover:text-white">Home</a>
          <a href="#packages" className="hover:text-white">Packages</a>
          <a href="#pricing" className="hover:text-white">Pricing</a>
          <a href="#case-studies" className="hover:text-white">Case Studies</a>
          <a href="#contact" className="hover:text-white">Contact</a>
        </div>
      </div>
    </nav>
  );
}