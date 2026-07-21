import React, { useMemo, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CardProduto } from './CardProduto';
import type { Produto } from '../types/produto';
import { filtrarProdutosRobustosGlobal } from '../utils/produtoFormatadores';

const ITENS_POR_PAGINA = 12;

interface PaginaBuscaProps {
  produtos: Produto[];
}

export const PaginaBusca: React.FC<PaginaBuscaProps> = ({ produtos }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [paginaAtual, setPaginaAtual] = useState(1);

  const queryParam = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get('q') || '';
  }, [location.search]);

  const produtosFiltrados = useMemo(() => {
    let filtrados = filtrarProdutosRobustosGlobal(produtos, queryParam);

    if (queryParam.trim() !== '') {
      const termo = queryParam.toLowerCase();

      const index = filtrados.findIndex(p => p.titulo.toLowerCase() === termo);

      if (index > 0) {
        const copy = [...filtrados];
        const [itemEncontrado] = copy.splice(index, 1);
        return [itemEncontrado, ...copy];
      }
    }

    return filtrados;
  }, [produtos, queryParam]);

  useEffect(() => {
    setPaginaAtual(1);
  }, [queryParam]);

  const universosSugeridos = useMemo(() => {
    const todos = produtosFiltrados.map(p => p.universo).filter(Boolean);
    return Array.from(new Set(todos));
  }, [produtosFiltrados]);

  const totalProdutos = produtosFiltrados.length;
  const totalPaginas = Math.ceil(totalProdutos / ITENS_POR_PAGINA);

  const indexInicial = (paginaAtual - 1) * ITENS_POR_PAGINA;
  const indexFinal = Math.min(indexInicial + ITENS_POR_PAGINA, totalProdutos);

  const produtosPaginados = useMemo(() => {
    return produtosFiltrados.slice(indexInicial, indexFinal);
  }, [produtosFiltrados, indexInicial, indexFinal]);

  return (
    <div className="max-w-6xl mx-auto px-6 pt-6 pb-20 space-y-8">
      <button
        onClick={() => navigate('/')}
        className="text-xs font-mono font-bold text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-2 group"
      >
        <i className="fa-solid fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
        Voltar para a Home
      </button>

      <div className="space-y-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div className="space-y-1">
          <p className="text-sm font-mono font-black text-slate-900 dark:text-slate-200 uppercase tracking-wide">
            Procurando em k/
          </p>
          <h2 className="text-xl font-black text-slate-950 dark:text-white tracking-tight font-mono">
            <span className="text-sky-600 dark:text-sky-400">"{queryParam}"</span>
          </h2>
        </div>

        {totalProdutos > 0 && universosSugeridos.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 text-xs pt-1">
            <span className="font-mono text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider text-[10px]">
              Hubs sugeridos:
            </span>
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              {universosSugeridos.map(univ => (
                <button
                  key={univ}
                  onClick={() => navigate(`/${univ}`)}
                  className="font-mono text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 font-bold transition-colors text-[11px]"
                >
                  k/{univ}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {produtosPaginados.length > 0 ? (
        <div className="space-y-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {produtosPaginados.map(p => (
              <CardProduto key={p.id} produto={p} />
            ))}
          </div>

          <div className="flex flex-col items-center justify-center gap-4 pt-8 border-t border-slate-100 dark:border-slate-800 font-mono text-center">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Exibindo <span className="font-bold text-slate-800 dark:text-slate-200">{totalProdutos <= ITENS_POR_PAGINA ? totalProdutos : `${indexInicial + 1}-${indexFinal}`}</span> de <span className="font-bold text-slate-800 dark:text-slate-200">{totalProdutos}</span> mimos correspondentes
            </p>

            {totalPaginas > 1 && (
              <div className="flex items-center gap-3 mt-1">
                <button
                  disabled={paginaAtual === 1}
                  onClick={() => setPaginaAtual(prev => prev - 1)}
                  className="p-2 text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-20 transition-colors"
                >
                  <i className="fa-solid fa-chevron-left"></i>
                </button>

                <span className="text-xs text-slate-500 dark:text-slate-400 min-w-[80px]">
                  Pág. <span className="font-bold text-slate-800 dark:text-slate-200">{paginaAtual}</span> de {totalPaginas}
                </span>

                <button
                  disabled={paginaAtual === totalPaginas}
                  onClick={() => setPaginaAtual(prev => prev + 1)}
                  className="p-2 text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-20 transition-colors"
                >
                  <i className="fa-solid fa-chevron-right"></i>
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center py-20 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
          <p className="text-xs font-mono font-bold text-slate-600 dark:text-slate-300">Nenhum mimo correspondente em k/</p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Tente simplificar os termos ou volte para a página inicial.</p>
        </div>
      )}
    </div>
  );
};