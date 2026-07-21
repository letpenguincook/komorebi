import React, { useMemo } from 'react';
import { DADOS_PRODUTOS } from '../data/produtos';
import { CONFIG_UNIVERSOS } from '../utils/constantesUniversos';

interface ExploracaoGuiadaProps {
    onSelecionarUniverso: (id: string) => void;
}

export const ExploracaoGuiada: React.FC<ExploracaoGuiadaProps> = ({ onSelecionarUniverso }) => {

    const universosVisiveis = useMemo(() => {
        const mapeamento = new Map<string, Set<string>>();

        // Verificando se existe produtos
        DADOS_PRODUTOS.forEach((produto) => {
            if (!mapeamento.has(produto.universo)) {
                mapeamento.set(produto.universo, new Set());
            }
        });

        // Filtra os universos que não têm nenhum produto
        return Object.values(CONFIG_UNIVERSOS)
            .filter((config) => mapeamento.has(config.id))
            .map((config) => ({
                ...config,
                hubsDestaque: config.hubsDestaque || []
            }));
    }, []);

    // Caso não tenha nada para exibir
    if (universosVisiveis.length === 0) return null;

    return (
        <section id="exploracao-guiada" className="max-w-6xl mx-auto px-6 py-12 md:py-16 space-y-12">
            <div className="text-center max-w-xl mx-auto space-y-3">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                    Portais de Navegação
                </span>
                <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#0F172A] dark:text-white leading-tight">
                    Qual é o seu{' '}
                    <span className="text-[#0284C7] relative inline-block px-1">
                        fandom
                        <span className="absolute bottom-1 left-0 w-full h-[6px] bg-[#0284C7]/15 -z-10 rounded-sm"></span>
                    </span>{' '}
                    hoje?
                </h2>
                <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                    Escolha seu universo abaixo para explorar uma selection de produtos do seu fandom. Filtre pelas suas obras e personagens favoritos.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {universosVisiveis.map((uni) => (
                    <div
                        key={uni.id}
                        onClick={() => onSelecionarUniverso(uni.id)}
                        className="group flex flex-col bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.008)] hover:shadow-[0_20px_40px_rgba(15,23,42,0.06)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 cursor-pointer overflow-hidden"
                    >
                        <div className="h-56 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                            <img
                                src={uni.imagemUrl}
                                alt={uni.titulo}
                                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>

                        <div className="p-6 flex-grow space-y-4">
                            <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs transition-transform group-hover:scale-105 ${uni.corIcone}`}>
                                    <i className={uni.icone}></i>
                                </div>
                                <span className={`text-[9px] font-mono font-bold tracking-wider uppercase px-1.5 py-0.5 rounded border ${uni.corEtiqueta}`}>
                                    {uni.badge}
                                </span>
                            </div>

                            <div className="space-y-1.5">
                                <h4 className="text-sm md:text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-sky-600 transition-colors flex items-center gap-1.5">
                                    {uni.titulo}
                                    <i className="fa-solid fa-arrow-right text-[10px] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-sky-600"></i>
                                </h4>
                                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                                    {uni.descricao}
                                </p>
                            </div>

                            {uni.hubsDestaque && uni.hubsDestaque.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 pt-1">
                                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono self-center mr-1">Hubs populares:</span>
                                    {uni.hubsDestaque.map((tag, idx) => (
                                        <span
                                            key={idx}
                                            className={`text-[10px] px-2 py-0.5 rounded-full border transition-colors font-medium ${uni.corTagBg} ${uni.corTagTexto} ${uni.corTagBorda}`}
                                        >
                                            {tag.toLowerCase().replace(/\s+/g, '')}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="px-6 py-4 border-t border-slate-100/80 dark:border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-400 dark:text-slate-500 group-hover:text-slate-500 dark:group-hover:text-slate-400 transition-colors">
                            <div className="flex items-center gap-1">
                                <span className="text-slate-300 dark:text-slate-700">/</span> k/{uni.id}
                            </div>
                            <span className="text-[9px] font-sans font-medium text-slate-300 dark:text-slate-600 group-hover:text-sky-500 opacity-0 group-hover:opacity-100 transition-all">
                                Acessar portal
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};