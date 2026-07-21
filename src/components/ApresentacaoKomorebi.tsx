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
            titulo: "Filtros por Fandom",
            descricao: "Categorias organizadas de K-pop, Animes, Séries e Cartoons sem misturar as coisas."
        },
        {
            icone: "fa-solid fa-sliders",
            cor: "text-[#EC4899] bg-[#EC4899]/5",
            titulo: "Busca Cirúrgica",
            descricao: "Encontre direto tudo só do seu Bias ou Personagem favorito filtrando por tipo de item."
        },
        {
            icone: "fa-solid fa-bolt",
            cor: "text-[#10B981] bg-[#10B981]/5",
            titulo: "Postagem Rápida",
            descricao: "Filtramos anúncios com estoque nacional ou envio ágil direto do seu estado."
        },
        {
            icone: "fa-solid fa-gem",
            cor: "text-[#F59E0B] bg-[#F59E0B]/5",
            titulo: "Curadoria Humana",
            descricao: "Apenas mimos que foram conferidos e aprovados por quem realmente ama e vive o fandom."
        }
    ];

    return (
        <section className="max-w-6xl mx-auto px-6 py-12 md:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                
                <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
                    <div className="space-y-3">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#64748B] bg-slate-100 px-2 py-0.5 rounded">
                            O Diferencial Komorebi
                        </span>
                        <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] tracking-tight leading-tight">
                            A conveniência que você não encontra buscando solto na Shopee.
                        </h3>
                    </div>
                    
                    <p className="text-sm text-slate-500 leading-relaxed max-w-md">
                        Centralizamos o garimpo visual. Em vez de rolar páginas infinitas com anúncios repetidos ou falsificados, entregamos atalhos prontos para o coração do seu fandom.
                    </p>

                    <button
                        onClick={irParaUniversos}
                        className="group inline-flex items-center gap-3 bg-[#0F172A] text-white px-5 py-3 rounded-xl text-xs font-bold font-mono uppercase tracking-wider hover:bg-[#0284C7] transition-colors duration-300 shadow-sm"
                    >
                        <span>Explorar os Portais</span>
                        <i className="fa-solid fa-arrow-down text-[11px] transition-transform group-hover:translate-y-0.5"></i>
                    </button>
                </div>

                <div className="lg:col-span-7 border-t lg:border-t-0 lg:border-l border-slate-200/80 pt-10 lg:pt-0 lg:pl-12 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
                    {topicos.map((topico, index) => (
                        <div key={index} className="space-y-2.5 p-4 rounded-xl hover:bg-slate-50/60 transition-colors group">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs ${topico.cor} transition-transform group-hover:scale-105`}>
                                <i className={topico.icone}></i>
                            </div>
                            <h4 className="text-sm font-bold text-slate-900 font-sans">
                                {topico.titulo}
                            </h4>
                            <p className="text-xs text-slate-500 leading-relaxed font-normal">
                                {topico.descricao}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};