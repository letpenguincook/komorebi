import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardProduto } from './CardProduto';
import { FiltrosLaterais } from './FiltrosLaterais';
import { BarraBuscaOrdenacao } from './BarraBuscaOrdenacao';
import type { Produto } from '../types/produto';
import {
  formatarParaUrl,
  formatarParaExibicao,
} from '../utils/produtoFormatadores'
import { useFiltrosUniverso } from '../utils/useFiltrosUniverso';

interface PaginaUniversoProps {
  universoId: string;
  grupoId: string | null;
  subItemId: string | null;
  produtos: Produto[];
  onMudarFiltros: (grupoId: string | null, subItemId: string | null) => void;
}

export const PaginaUniverso: React.FC<PaginaUniversoProps> = ({
  universoId,
  grupoId,
  subItemId,
  produtos,
}) => {

  const navigate = useNavigate();

  React.useEffect(() => {
    document.title = `Komorebi | ${universoId} - ${grupoId || 'Todos'}`;
  }, [universoId, grupoId]);

  const {
    buscaInterna, setBuscaInterna,
    produtosProcessados,
    isMobileFiltersOpen, setIsMobileFiltersOpen,
    setFiltroEstado, setFiltroTipoItem,
    gruposDisponiveis,
    gruposFiltradosLateral,
    subItensDisponiveis,
    metadadosFiltros,
    buscaGrupoLateral,
    setBuscaGrupoLateral,
    filtroTipoItem,
    filtroEstado,
    ordenacao, setOrdenacao,
    termoEscopoBusca,
    sugestaoRedirecionamento,
  } = useFiltrosUniverso(universoId, grupoId, subItemId, produtos);

  const ITENS_POR_PAGINA = 12;
  const [paginaAtual, setPaginaAtual] = useState(1);

  useEffect(() => {
    setPaginaAtual(1);
  }, [buscaInterna, grupoId, subItemId, filtroTipoItem, filtroEstado, ordenacao]);

  // Cálculo da paginação
  const totalProdutos = produtosProcessados.length;
  const totalPaginas = Math.ceil(totalProdutos / ITENS_POR_PAGINA);
  const indexInicial = (paginaAtual - 1) * ITENS_POR_PAGINA;
  const indexFinal = Math.min(indexInicial + ITENS_POR_PAGINA, totalProdutos);

  // Lista de produtos p/ paginar
  const produtosPaginados = useMemo(() => {
    return produtosProcessados.slice(indexInicial, indexFinal);
  }, [produtosProcessados, indexInicial, indexFinal]);

  const configsUniverso: Record<string, { termoGrupo: string; termoSubItem: string }> = {
    kpop: { termoGrupo: 'Grupo', termoSubItem: 'Idol / Bias' },
    anime: { termoGrupo: 'Obra', termoSubItem: 'Personagem' },
    cartoon: { termoGrupo: 'Obra', termoSubItem: 'Personagem' },
    papelaria: { termoGrupo: 'Marca', termoSubItem: 'Tipo de Item' },
    series: { termoGrupo: 'Obra', termoSubItem: 'Personagem' },
    games: { termoGrupo: 'Obra', termoSubItem: 'Personagem' },
  };
  const config = configsUniverso[universoId.toLowerCase()] || { termoGrupo: 'Categoria', termoSubItem: 'Sub-item' };

  const navegarLimpo = (url: string) => {
    setFiltroTipoItem('');
    setFiltroEstado('');
    setBuscaInterna('');
    setIsMobileFiltersOpen(false);
    navigate(url);
  };

  const filtrosProps = {
    universoId,
    grupoId,
    subItemId,
    config,
    gruposDisponiveis,
    gruposFiltradosLateral,
    subItensDisponiveis,
    metadadosFiltros,
    buscaGrupoLateral,
    setBuscaGrupoLateral,
    filtroTipoItem,
    setFiltroTipoItem,
    filtroEstado,
    setFiltroEstado,
    navegarLimpo,
  };

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] dark:bg-slate-950 relative">

      <header className="bg-transparent px-6 pt-8 pb-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500 cursor-pointer hover:text-slate-600 dark:hover:text-slate-300" onClick={() => navigate('/')}>home</span>
            <span className="text-slate-300 dark:text-slate-700 text-xs">/</span>
            <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tight lowercase">
              k/
              <span className={`font-extrabold cursor-pointer ${(!grupoId && !subItemId) ? 'text-[#0284C7]' : 'text-slate-800 dark:text-slate-200'}`} onClick={() => navegarLimpo(`/${formatarParaUrl(universoId)}`)}>
                {formatarParaUrl(universoId)}
              </span>
              {grupoId && (
                <>
                  <span className="text-slate-300 dark:text-slate-700 font-normal">/</span>
                  <span className={`font-bold cursor-pointer ${!subItemId ? 'text-[#0284C7]' : 'text-slate-500 dark:text-slate-400'}`} onClick={() => navegarLimpo(`/${formatarParaUrl(universoId)}/${formatarParaUrl(grupoId)}`)}>
                    {formatarParaUrl(grupoId)}
                  </span>
                </>
              )}
              {subItemId && (
                <>
                  <span className="text-slate-300 dark:text-slate-700 font-normal">/</span>
                  <span className="text-[#0284C7] font-semibold">{formatarParaUrl(subItemId)}</span>
                </>
              )}
            </h1>
          </div>
        </div>
      </header>

      {isMobileFiltersOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 md:hidden transition-opacity"
          onClick={() => setIsMobileFiltersOpen(false)}
        />
      )}

      <div className={`
        fixed top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-[#F8FAFC] dark:bg-slate-950 z-50 p-6 
        shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden
        overflow-y-auto border-r border-slate-200 dark:border-slate-800
        ${isMobileFiltersOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 font-mono flex items-center gap-2">
            <i className="fa-solid fa-sliders text-slate-400 dark:text-slate-500" /> Filtros Avançados
          </h2>
          <button
            onClick={() => setIsMobileFiltersOpen(false)}
            className="w-7 h-7 flex items-center justify-center rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-300 text-sm font-bold hover:text-slate-600 shadow-sm"
          >
            ×
          </button>
        </div>
        <FiltrosLaterais {...filtrosProps} />
      </div>

     <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-12 gap-8">

        <div className="hidden md:block md:col-span-3">
          <FiltrosLaterais {...filtrosProps} />
        </div>

        <main className="md:col-span-9 space-y-4">
          <div className="bg-[#F8FAFC]/95 dark:bg-slate-950/95 backdrop-blur-sm pb-2 pt-2">
            <BarraBuscaOrdenacao
              termoEscopoBusca={termoEscopoBusca}
              buscaInterna={buscaInterna}
              setBuscaInterna={setBuscaInterna}
              ordenacao={ordenacao}
              setOrdenacao={setOrdenacao}
            />
          </div>

        <button
            onClick={() => setIsMobileFiltersOpen(true)}
            className="w-full md:hidden flex items-center justify-center gap-2 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition"
          >
            <i className="fa-solid fa-sliders text-[10px]" />
            Filtrar por {config.termoGrupo} ou tipo
          </button>

         {produtosPaginados.length > 0 ? (
            <div className="space-y-12">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 items-stretch">
                {produtosPaginados.map((p) => (
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
                      className="p-2 text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-white dark:disabled:hover:bg-slate-900 transition-colors"
                    >
                      <i className="fa-solid fa-chevron-left"></i>
                    </button>

                   <span className="text-xs text-slate-500 dark:text-slate-400 min-w-[80px]">
                      Pág. <span className="font-bold text-slate-800 dark:text-slate-200">{paginaAtual}</span> de {totalPaginas}
                    </span>

                   <button
                      disabled={paginaAtual === totalPaginas}
                      onClick={() => setPaginaAtual(prev => prev + 1)}
                      className="p-2 text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-white dark:disabled:hover:bg-slate-900 transition-colors"
                    >
                      <i className="fa-solid fa-chevron-right"></i>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
           <div className="flex flex-col items-center justify-center text-center py-20 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl bg-white dark:bg-slate-900 p-6"> 
              <i className="fa-solid fa-magnifying-glass-blur text-2xl text-slate-300 dark:text-slate-700 mb-3" />
              <h3 className="text-xs font-semibold text-slate-700 dark:text-slate-200">Nenhum mimo encontrado aqui</h3>

              {sugestaoRedirecionamento ? (
               <div className="mt-4 p-4 bg-[#0284C7]/5 dark:bg-[#0284C7]/10 border border-[#0284C7]/20 rounded-2xl max-w-sm">
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                    {sugestaoRedirecionamento.tipo === 'grupo' ? (
                      <>Não encontramos isso em <span className="font-semibold">{formatarParaExibicao(grupoId || '')}</span>, mas temos mimos correspondentes na aba da obra <span className="font-bold text-[#0F172A] dark:text-white">{formatarParaExibicao(sugestaoRedirecionamento.nome)}</span>!</>
                    ) : (
                      <>Não encontramos isso em {formatarParaExibicao(universoId)}, mas achamos itens correspondentes lá no universo <span className="font-bold text-[#0F172A] dark:text-white">k/{sugestaoRedirecionamento.nome}</span>!</>
                    )}
                  </p>
                 <button
                    onClick={() => navegarLimpo(`${sugestaoRedirecionamento.url}?q=${encodeURIComponent(buscaInterna)}`)}
                    className="mt-3 w-full bg-[#0284C7] text-white text-[11px] font-bold py-2 px-4 rounded-xl shadow-sm hover:bg-[#0369A1] transition"
                  >
                    {sugestaoRedirecionamento.tipo === 'grupo' ? `Ir para ${formatarParaExibicao(sugestaoRedirecionamento.nome)} →` : `Ir para o Universo ${formatarParaExibicao(sugestaoRedirecionamento.nome)} →`}
                  </button>
                </div>
              ) : (
            <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 max-w-xs">Não encontramos nenhum produto com o termo "{buscaInterna}".</p>
              )}
            </div>
          )
          }
        </main>
      </div >
    </div >
  );
};