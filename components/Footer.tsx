export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5 py-12 px-4 md:py-16 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-12">
        {/* Left */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
              <polygon points="14,2 26,26 2,26" fill="#e63624" />
            </svg>
            <span className="text-white font-bold text-lg tracking-widest uppercase">AKRA</span>
          </div>
          <p className="text-white/40 text-sm max-w-xs leading-relaxed">
            An independent digital consultancy — where AI, engineering, design and strategy meet.
          </p>
          <p className="text-white/20 text-xs mt-4">© 2026 AKRA Consultants. All rights reserved.</p>
        </div>

        {/* Center CTA */}
        <div className="flex flex-col gap-4">
          <h3 className="text-white font-black text-xl md:text-2xl uppercase tracking-tight">
            Ready to scale<br />new heights?
          </h3>
          <button className="self-start px-6 py-3 rounded-full bg-[#e63624] text-white text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-[#e63624] transition-all duration-300">
            Talk to an Expert
          </button>
        </div>

        {/* Right */}
        <div className="flex flex-col gap-6 text-sm">
          <div>
            <p className="text-white/30 uppercase tracking-widest text-xs mb-1">New Business</p>
            <a href="mailto:sales@akraconsultants.com" className="text-white/70 hover:text-white transition-colors">
              sales@akraconsultants.com
            </a>
          </div>
          <div>
            <p className="text-white/30 uppercase tracking-widest text-xs mb-1">Partnership</p>
            <a href="mailto:krishnan@akraconsultants.com" className="text-white/70 hover:text-white transition-colors">
              krishnan@akraconsultants.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
