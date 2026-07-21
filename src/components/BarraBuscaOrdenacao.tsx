import React from 'react';

interface BarraBuscaOrdenacaoProps {
  termoEscopoBusca: string;
  buscaInterna: string;
  setBuscaInterna: (val: string) => void;
  ordenacao: 'relevancia' | 'precoCrescente' | 'precoDecrescente';
  setOrdenacao: (val: 'relevancia' | 'precoCrescente' | 'precoDecrescente') => void;
}

export const BarraBuscaOrdenacao: React.FC<BarraBuscaOrdenacaoProps> = ({
  termoEscopoBusca,
  buscaInterna,
  setBuscaInterna,
  ordenacao,
  setOrdenacao,
}) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="relative w-full">
        <input
          type="text"
          placeholder={`Buscar em ${termoEscopoBusca}...`}
          value={buscaInterna}
          onChange={(e) => setBuscaInterna(e.target.value)}
          className="w-full pl-9 pr-8 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0284C7]/15 focus:border-[#0284C7] shadow-sm"
        />
        <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[11px]" />
        {buscaInterna && (
          <button onClick={() => setBuscaInterna('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">×</button>
        )}
      </div>

      <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-sm">
        <i className="fa-solid fa-arrow-down-up-wide text-slate-400 text-[10px]" />
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Ordenar:</span>
        <select
          value={ordenacao}
          onChange={(e) => setOrdenacao(e.target.value as any)}
          className="bg-transparent text-xs text-slate-900 font-bold focus:outline-none cursor-pointer flex-1"
        >
          <option value="relevancia">Relevância</option>
          <option value="precoCrescente">Menor Preço</option>
          <option value="precoDecrescente">Maior Preço</option>
        </select>
      </div>
    </div>
  );
};