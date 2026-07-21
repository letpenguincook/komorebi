import React from 'react';

export const ApresentacaoKomorebi: React.FC = () => {

    const irParaUniversos = () => {
        const secao = document.getElementById('exploracao-guiada');
        if (secao) {
            secao.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const topicos = [
        {
            icone: "fa-solid fa-layer-group",
            cor: "text-[#0284C7] bg-[#0284C7]/5",
            titulo: "Navegação por Hubs",
            descricao: "Organizamos tudo em k/Fandoms. Navegue pelo seu universo favorito sem distrações.",
        },
        {
            icone: "fa-solid fa-sliders",
            cor: "text-[#EC4899] bg-[#EC4899]/5",
            titulo: "Busca Ultra Específica",
            descricao: "Encontre exatamente o produto do seu personagem ou bias.",
        },
        {
            icone: "fa-solid fa-bolt",
            cor: "text-[#10B981] bg-[#10B981]/5",
            titulo: "Descoberta e Postagem Rápida",
            descricao: "Explore o que existe dos seus favs. Filtre produtos pelo seu estado e encontre o que está mais perto de você.",
        },
        {
            icone: "fa-solid fa-gem",
            cor: "text-[#F59E0B] bg-[#F59E0B]/5",
            titulo: "Curadoria Humana",
            descricao: "Os Achadinhos da Komorebi são avaliados e selecionados a dedo.",
        }
    ];

    return (
        <section className="w-full bg-white dark:bg-slate-950 px-6 py-12 md:py-20">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
                    <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white tracking-tight leading-tight">
                        A conveniência que você não encontra buscando solto na Shopee.
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-md">
                        Sabemos que achar algo do seu fav na Shopee cansa. Por isso, criamos os nossos hubs: atalhos diretos para o coração do seu fandom, sem bagunça e sem misturebas.
                    </p>

                    <button
                        onClick={irParaUniversos}
                        className="group inline-flex items-center gap-3 bg-[#0F172A] dark:bg-sky-600 text-white px-5 py-3 rounded-xl text-xs font-bold font-mono uppercase tracking-wider hover:bg-[#0284C7] transition-colors duration-300 shadow-sm"
                    >
                        <span>Explorar os Portais</span>
                        <i className="fa-solid fa-arrow-right text-[11px] transition-transform group-hover:translate-y-0.5"></i>
                    </button>
                </div>

                <div className="lg:col-span-7 border-t lg:border-t-0 lg:border-l border-slate-200/80 dark:border-slate-800 pt-10 lg:pt-0 lg:pl-12 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
                    {topicos.map((topico, index) => (
                        <div key={index} className="space-y-2.5 p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors group">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs ${topico.cor} dark:bg-slate-800 transition-transform group-hover:scale-105`}>
                                <i className={topico.icone}></i>
                            </div>
                            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-sans">
                                {topico.titulo}
                            </h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                                {topico.descricao}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};