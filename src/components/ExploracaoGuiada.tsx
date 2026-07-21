import React, { useMemo } from 'react';
import { DADOS_PRODUTOS } from '../data/produtos';
import { CONFIG_UNIVERSOS } from '../utils/constantesUniversos';

interface ExploracaoGuiadaProps {
    onSelecionarUniverso: (id: string) => void;
}

export const ExploracaoGuiada: React.FC<ExploracaoGuiadaProps> = ({ onSelecionarUniverso }) => {

    const universosVisiveis = useMemo(() => {
        const mapeamento = new Map<string, Set<string>>();

        DADOS_PRODUTOS.forEach((produto) => {
            if (!mapeamento.has(produto.universo)) {
                mapeamento.set(produto.universo, new Set());
            }
            if (produto.grupo) {
                mapeamento.get(produto.universo)?.add(produto.grupo);
            }
        });

        return Object.values(CONFIG_UNIVERSOS).map((config) => {
            const gruposDoUniverso = Array.from(mapeamento.get(config.id) || []);
            const hubsPopulares = gruposDoUniverso.slice(0, 4);

            return {
                ...config,
                tags: hubsPopulares.length > 0 ? hubsPopulares : (config.hubsDestaque || [])
            };
        });
    }, []);

    return (
        <>
            <section id="exploracao-guiada" className="max-w-6xl mx-auto px-6 py-12 md:py-16 space-y-12">
                <div className="text-center max-w-xl mx-auto space-y-3">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">
                        Portais de Navegação
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#0F172A] leading-tight">
                        Qual é o seu{' '}
                        <span className="text-[#0284C7] relative inline-block px-1">
                            fandom
                            <span className="absolute bottom-1 left-0 w-full h-[6px] bg-[#0284C7]/15 -z-10 rounded-sm"></span>
                        </span>{' '}
                        hoje?
                    </h2>
                    <p className="text-xs md:text-sm text-slate-500 font-medium leading-relaxed">
                        Escolha seu universo abaixo para explorar uma selection de produtos do seu fandom. Filtre pelas suas obras e personagens favoritos.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {universosVisiveis.map((uni) => (
                        <div
                            key={uni.id}
                            onClick={() => onSelecionarUniverso(uni.id)}
                            className="group relative bg-white border border-slate-200/80 rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.008)] hover:shadow-[0_20px_40px_rgba(15,23,42,0.04)] hover:border-slate-300 transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden min-h-[220px]"
                        >
                            <div className="absolute top-0 right-0 w-2/5 h-full pointer-events-none select-none overflow-hidden opacity-45 group-hover:opacity-65 transition-opacity duration-300">
                                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/20 to-transparent z-10" />
                                <img
                                    src={uni.imagemUrl}
                                    alt=""
                                    className="w-full h-full object-cover object-center scale-105 group-hover:scale-100 transition-all duration-500"
                                />
                            </div>

                            <div className="space-y-4 relative z-20 max-w-[82%]">
                                <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs transition-transform group-hover:scale-105 ${uni.corIcone}`}>
                                        <i className={uni.icone}></i>
                                    </div>
                                    <span className={`text-[9px] font-mono font-bold tracking-wider uppercase px-1.5 py-0.5 rounded border ${uni.corEtiqueta}`}>
                                        {uni.badge}
                                    </span>
                                </div>

                                <div className="space-y-1.5">
                                    <h4 className="text-sm md:text-base font-bold text-slate-900 group-hover:text-sky-600 transition-colors flex items-center gap-1.5">
                                        {uni.titulo}
                                        <i className="fa-solid fa-arrow-right text-[10px] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-sky-600"></i>
                                    </h4>
                                    <p className="text-xs text-slate-500 leading-relaxed font-normal">
                                        {uni.descricao}
                                    </p>
                                </div>

                                {uni.hubsDestaque.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5 pt-1">
                                        <span className="text-[10px] text-slate-400 font-mono self-center mr-1">Hubs populares:</span>
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

                            <div className="mt-5 pt-3 border-t border-slate-100/80 relative z-20 flex items-center justify-between text-[10px] font-mono text-slate-400 group-hover:text-slate-500 transition-colors">
                                <div className="flex items-center gap-1">
                                    <span className="text-slate-300">/</span> k/{uni.id}
                                </div>
                                <span className="text-[9px] font-sans font-medium text-slate-300 group-hover:text-sky-500 opacity-0 group-hover:opacity-100 transition-all">
                                    Acessar portal
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="max-w-5xl mx-auto px-6 py-12 md:py-16 border-t border-slate-100/80">
                <div className="text-center space-y-2 mb-12">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">
                        Perguntas Frequentes
                    </span>
                    <h3 className="text-xl md:text-2xl font-black text-[#0F172A] tracking-tight">
                        Como funciona o portal Komorebi?
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 text-left">
                    <div className="space-y-1.5">
                        <h4 className="text-xs font-bold font-mono text-slate-800 uppercase tracking-wider flex items-center gap-2">
                            <span className="text-sky-500">✦</span> Onde faço o pagamento?
                        </h4>
                        <p className="text-xs text-slate-500 leading-relaxed pl-4">
                            Nossos links te levam direto para os anúncios oficiais dentro da Shopee. Toda a transação, pagamento e a garantia da entrega são processados de forma segura pela própria plataforma da Shopee.
                        </p>
                    </div>

                    <div className="space-y-1.5">
                        <h4 className="text-xs font-bold font-mono text-slate-800 uppercase tracking-wider flex items-center gap-2">
                            <span className="text-pink-500">✦</span> Os produtos têm rastreio?
                        </h4>
                        <p className="text-xs text-slate-500 leading-relaxed pl-4">
                            Sim! Como as compras são finalizadas na Shopee, você recebe o código de rastreamento oficial da transportadora direto no seu app ou e-mail cadastrado na plataforma assim que o envio for feito.
                        </p>
                    </div>

                    <div className="space-y-1.5">
                        <h4 className="text-xs font-bold font-mono text-slate-800 uppercase tracking-wider flex items-center gap-2">
                            <span className="text-emerald-500">✦</span> Como funciona o frete?
                        </h4>
                        <p className="text-xs text-slate-500 leading-relaxed pl-4">
                            Fazemos uma curadoria ativa priorizando lojas nacionais com postagem rápida e anúncios elegíveis aos cupons de frete grátis da plataforma, garantindo economia no envio dos seus mimos.
                        </p>
                    </div>

                    <div className="space-y-1.5">
                        <h4 className="text-xs font-bold font-mono text-slate-800 uppercase tracking-wider flex items-center gap-2">
                            <span className="text-amber-500">✦</span> Posso pedir itens personalizados?
                        </h4>
                        <p className="text-xs text-slate-500 leading-relaxed pl-4">
                            Sim! Se você busca um mimo exclusivo em pequenas quantidades (como um presente individual ou de datas comemorativas), aceitamos encomendas. Entre em contato conosco pelas redes para consultar a agenda de produção.
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
};