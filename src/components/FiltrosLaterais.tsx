import React, { useState } from 'react';
import { formatarParaUrl, formatarParaExibicao } from '../utils/produtoFormatadores';

interface FiltrosLateraisProps {
  universoId: string;
  grupoId: string | null;
  subItemId: string | null;
  config: { termoGrupo: string; termoSubItem: string };
  gruposDisponiveis: string[];
  gruposFiltradosLateral: string[];
  subItensDisponiveis: string[];
  metadadosFiltros: { tipos: string[]; estados: string[] };
  buscaGrupoLateral: string;
  setBuscaGrupoLateral: (val: string) => void;
  filtroTipoItem: string;
  setFiltroTipoItem: (val: string) => void;
  filtroEstado: string;
  setFiltroEstado: (val: string) => void;
  navegarLimpo: (url: string) => void;
}

export const FiltrosLaterais: React.FC<FiltrosLateraisProps> = ({
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
}) => {
  const [expandidoGrupos, setExpandidoGrupos] = useState(false);
  const [expandidoTipos, setExpandidoTipos] = useState(false);
  const [expandidoSubItens, setExpandidoSubItens] = useState(false);

  const LIMITE_VISIVEL = 5;

  return (
    <aside className="space-y-5">

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 space-y-3 shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-mono">
          {config.termoGrupo}
        </h3>

        {gruposDisponiveis.length > 8 && (
          <div className="relative w-full">
            <input
              type="text"
              placeholder={`Filtrar ${config.termoGrupo.toLowerCase()}...`}
              value={buscaGrupoLateral}
              onChange={(e) => setBuscaGrupoLateral(e.target.value)}
              className="w-full pl-7 pr-6 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-[11px] focus:outline-none focus:border-[#0284C7] dark:text-slate-300"
            />
            <i className="fa-solid fa-magnifying-glass absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-[10px]" />
          </div>
        )}

        <div className="flex flex-col gap-1">
          <button
            onClick={() => navegarLimpo(`/${formatarParaUrl(universoId)}`)}
            className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${!grupoId ? 'bg-slate-900 dark:bg-sky-600 text-white' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
          >
            Ver todos
          </button>

          {gruposFiltradosLateral
            .slice(0, expandidoGrupos || buscaGrupoLateral ? gruposFiltradosLateral.length : LIMITE_VISIVEL)
            .map((g) => (
              <button
                key={g}
                onClick={() => navegarLimpo(`/${formatarParaUrl(universoId)}/${formatarParaUrl(g)}`)}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors truncate ${grupoId && formatarParaUrl(grupoId) === formatarParaUrl(g) ? 'bg-slate-900 dark:bg-sky-600 text-white' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
              >
                {formatarParaExibicao(g)}
              </button>
            ))}

          {gruposFiltradosLateral.length > LIMITE_VISIVEL && !buscaGrupoLateral && (
            <button
              onClick={() => setExpandidoGrupos(!expandidoGrupos)}
              className="text-left px-3 py-1 text-[11px] font-bold text-[#0284C7] dark:text-sky-400 hover:text-[#0369A1] transition-colors mt-1"
            >
              {expandidoGrupos ? '↑ Ver menos' : `↓ Ver mais (+${gruposFiltradosLateral.length - LIMITE_VISIVEL})`}
            </button>
          )}
        </div>
      </div>

      {grupoId && subItensDisponiveis.length > 0 && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 space-y-3 shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-mono">
            {config.termoSubItem}
          </h3>
          <div
            className={`flex flex-wrap gap-1.5 transition-all overflow-hidden ${!expandidoSubItens && subItensDisponiveis.length > 12 ? 'max-h-24' : 'max-h-none'
              }`}
          >
            <button
              onClick={() => navegarLimpo(`/${formatarParaUrl(universoId)}/${formatarParaUrl(grupoId)}`)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${!subItemId ? 'bg-slate-900 dark:bg-sky-600 text-white' : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
            >
              Todos
            </button>
            {subItensDisponiveis.map((s) => (
              <button
                key={s}
                onClick={() => navegarLimpo(`/${formatarParaUrl(universoId)}/${formatarParaUrl(grupoId)}/${formatarParaUrl(s)}`)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${subItemId && formatarParaUrl(subItemId) === formatarParaUrl(s) ? 'bg-[#0284C7]/10 dark:bg-sky-500/20 text-[#0284C7] dark:text-sky-400 font-semibold' : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
              >
                {formatarParaExibicao(s)}
              </button>
            ))}
          </div>

          {subItensDisponiveis.length > 12 && (
            <button
              onClick={() => setExpandidoSubItens(!expandidoSubItens)}
              className="text-left text-[11px] font-bold text-[#0284C7] dark:text-sky-400 hover:text-[#0369A1] transition-colors block pt-1"
            >
              {expandidoSubItens ? '↑ Recolher tags' : `↓ Mostrar todas as tags (+${subItensDisponiveis.length - 12})`}
            </button>
          )}
        </div>
      )}

      {metadadosFiltros.tipos.length > 0 && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 space-y-3 shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-mono">
            Tipo de Mimo
          </h3>
          <div className="flex flex-col gap-1">
            <button
              onClick={() => setFiltroTipoItem('')}
              className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${!filtroTipoItem ? 'bg-slate-900 dark:bg-sky-600 text-white' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
            >
              Todos os tipos
            </button>
            {metadadosFiltros.tipos
              .slice(0, expandidoTipos ? metadadosFiltros.tipos.length : LIMITE_VISIVEL)
              .map(tipo => (
                <button
                  key={tipo}
                  onClick={() => setFiltroTipoItem(tipo)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors truncate ${filtroTipoItem === tipo ? 'bg-slate-900 dark:bg-sky-600 text-white' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                >
                  {tipo}
                </button>
              ))}

            {metadadosFiltros.tipos.length > LIMITE_VISIVEL && (
              <button
                onClick={() => setExpandidoTipos(!expandidoTipos)}
                className="text-left px-3 py-1 text-[11px] font-bold text-[#0284C7] dark:text-sky-400 hover:text-[#0369A1] transition-colors mt-1"
              >
                {expandidoTipos ? '↑ Ver menos' : `↓ Ver mais (+${metadadosFiltros.tipos.length - LIMITE_VISIVEL})`}
              </button>
            )}
          </div>
        </div>
      )}

      {metadadosFiltros.estados.length > 0 && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 space-y-3 shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-mono">
            Postado em
          </h3>
          <div className="flex flex-col gap-1">
            <button
              onClick={() => setFiltroEstado('')}
              className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${!filtroEstado ? 'bg-slate-900 dark:bg-sky-600 text-white' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
            >
              Qualquer lugar
            </button>
            {metadadosFiltros.estados.map(estado => {
              const nomeExibicao = estado.toUpperCase() === 'INTERNACIONAL'
                ? 'Internacional'
                : estado.length === 2
                  ? estado.toUpperCase()
                  : estado.charAt(0).toUpperCase() + estado.slice(1).toLowerCase();

              return (
                <button
                  key={estado}
                  onClick={() => setFiltroEstado(estado)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors truncate ${filtroEstado.toLowerCase() === estado.toLowerCase() ? 'bg-slate-900 dark:bg-sky-600 text-white' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                >
                  {nomeExibicao}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </aside>
  );
};