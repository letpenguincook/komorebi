import React from 'react';
import type { Produto } from '../types/produto';
import { formatarPrecoParaReal } from '../utils/produtoFormatadores';

interface CardProdutoProps {
  produto: Produto;
}

export const CardProduto: React.FC<CardProdutoProps> = ({ produto }) => {
  const isColecao = produto.tipo === 'colecao';

  return (
    <div className="w-full h-full bg-white border border-slate-200/80 rounded-xl p-2.5 flex flex-col justify-between group hover:border-slate-300 transition-all duration-300 select-none">

      <div>
        <div className="relative bg-[#FAFAFA] rounded-lg overflow-hidden aspect-square mb-2.5 flex items-center justify-center border border-slate-100">
          <span className="absolute top-1.5 left-1.5 text-[8px] font-bold uppercase px-1.5 py-0.5 rounded bg-white/90 backdrop-blur-sm border border-slate-200 text-slate-600">
            {isColecao ? 'Coleção' : 'Achadinho'}
          </span>
          <span className="absolute bottom-1.5 right-1.5 text-[8px] font-mono px-1.5 py-0.5 rounded border font-bold bg-white/90 text-slate-500 border-slate-200">
            #{produto.id}
          </span>

          {produto.imagemUrl && (
            <img
              src={produto.imagemUrl}
              alt={produto.titulo}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        <span className="text-[9px] font-bold text-slate-400 block mb-1 uppercase truncate">
          {produto.tipoItem || 'Item'}
        </span>

        <h4 className="text-[11px] font-bold text-slate-700 leading-tight line-clamp-2 mb-2">
          {produto.titulo}
        </h4>
      </div>

      <div className="mt-auto pt-3 border-t border-slate-100">

        <div className="flex items-baseline justify-between mb-2 gap-1">
          <span className="text-xs font-black text-slate-900 truncate">
            {formatarPrecoParaReal(produto.preco)}
          </span>

          {produto.estadoPostagem && (
            <span className="text-[9px] font-bold text-slate-400 flex items-center gap-0.5 truncate shrink-0">
              <i className="fa-solid fa-location-dot text-[8px] text-rose-400"></i>
              {produto.estadoPostagem}
            </span>
          )}
        </div>

        <a
          href={produto.urlShopee}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full text-[10px] py-1.5 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all duration-300 bg-slate-900 text-white group-hover:bg-sky-500"
        >
          Garantir
          <svg
            className="w-3 h-3 opacity-70"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>

    </div>
  );
};