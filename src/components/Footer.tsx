import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50/50 border-t border-slate-200/60 py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start text-center md:text-left">

        <div className="space-y-2">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <h4 className="text-xs font-black tracking-widest uppercase text-slate-900">Komorebi</h4>
          </div>
          <p className="text-xs text-slate-500 max-w-xs leading-relaxed font-normal mx-auto md:mx-0">
            Serviços personalizados de artesanatos e curadoria de produtos.
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs font-bold tracking-widest uppercase text-slate-400 font-mono text-[10px]">Acompanhe</h4>
          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 sm:gap-6">
            <a
              href="https://instagram.com/papelariauberaba"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-slate-500 hover:text-pink-600 transition-colors flex items-center justify-center md:justify-start gap-1.5 group"
            >
              <i className="fa-brands fa-instagram text-sm text-slate-400 group-hover:text-pink-500 transition-colors"></i>
              <span className="font-medium">@papelariauberaba</span>
            </a>
            <a
              href="https://www.tiktok.com/@papelariauberaba?_r=1&_t=ZS-98AoUIRlbrp"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-slate-500 hover:text-slate-900 transition-colors flex items-center justify-center md:justify-start gap-1.5 group"
            >
              <i className="fa-brands fa-tiktok text-sm text-slate-400 group-hover:text-slate-900 transition-colors"></i>
              <span className="font-medium">TikTok</span>
            </a>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-xs font-bold tracking-widest uppercase text-slate-400 font-mono text-[10px]">Atuando em</h4>
          <p className="text-xs text-slate-500 flex items-center justify-center md:justify-start gap-1.5 font-medium">
            <i className="fa-solid fa-location-dot text-[10px] text-sky-500"></i> Uberaba - MG, enviando para todo o Brasil
          </p>
        </div>
      </div>

    </footer>
  );
};