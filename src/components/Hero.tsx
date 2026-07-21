import React, { useState } from 'react';
import { DADOS_PRODUTOS } from '../data/produtos';

export const Hero: React.FC = () => {
  const [buscaCodigo, setBuscaCodigo] = useState('');

  const codigoLimpo = buscaCodigo.trim().toLowerCase();

  // Procura se existe um produto com o ID Komorebi exato digitado
  const produtoEncontrado = DADOS_PRODUTOS.find(
    (p) => p.id.toLowerCase() === codigoLimpo
  );

  const digitouCodigoCompleto = codigoLimpo.length >= 3;

  return (
    <section className="w-full bg-[#FAFAFA] border-b border-[#F1F5F9] px-6 py-12 md:py-24 mb-16 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#0284C7]/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10">

        <div className="md:col-span-6 space-y-4 text-center md:text-left">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#0F172A] leading-tight">
            Seu portal para <br />
            <span className="text-[#0284C7] relative">
              artesanatos personalizados
              <span className="absolute bottom-1 left-0 w-full h-[4px] bg-[#0284C7]/10 -z-10 rounded"></span>
            </span>
          </h2>

          <p className="text-sm text-[#64748B] max-w-md leading-relaxed mx-auto md:mx-0">
            O hub definitivo do seu fandom. Reunimos o melhor da internet em uma curadoria rigorosa de achadinhos e criamos marca-páginas, chaveiros de miçanga e photocards artesanais sob encomenda. Tudo em um só lugar.
          </p>
        </div>

        <div className="md:col-span-6 w-full">
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] max-w-md mx-auto md:ml-auto space-y-6">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <span className="text-[10px] tracking-widest uppercase font-bold text-[#0284C7] bg-[#0284C7]/5 px-2 py-0.5 rounded font-mono">
                  Buscar produto por código
                </span>
                <h3 className="text-lg font-bold text-[#0F172A] mt-1">Viu algum produto no TikTok ou Reels?</h3>
              </div>
            </div>

            <div className="space-y-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Digite o código do produto (Ex: MAO01)"
                  value={buscaCodigo}
                  onChange={(e) => setBuscaCodigo(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-[#FAFAFA] border border-[#E2E8F0] rounded-xl text-sm font-mono tracking-wider text-[#0F172A] uppercase placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#0284C7]/15 focus:border-[#0284C7] focus:bg-white transition"
                />
                <i className="fa-brands fa-tiktok absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8] text-sm"></i>
              </div>
            </div>

            {produtoEncontrado && (
              <div className="p-5 bg-gradient-to-br from-indigo-50/40 to-indigo-50/10 border border-[#0284C7]/20 rounded-2xl space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#0284C7]/10 flex items-center justify-center text-[#0284C7] shrink-0">
                    <i className="fa-solid fa-star text-xs"></i>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-medium uppercase tracking-wider text-[#0284C7] font-mono">Mimo Encontrado!</p>
                    <h4 className="text-sm font-semibold text-[#0F172A] truncate">
                      {produtoEncontrado.titulo}
                    </h4>
                  </div>
                </div>

                <a
                  href={produtoEncontrado.urlShopee || "https://shopee.com.br"}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-[#0F172A] hover:bg-[#0284C7] text-white text-xs font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-md shadow-slate-900/10 hover:shadow-[#0284C7]/20 hover:-translate-y-0.5 tracking-wider uppercase font-mono group"
                >
                  <i className="fa-solid fa-bag-shopping text-sm opacity-90"></i>
                  Ver Detalhes do Produto
                  <i className="fa-solid fa-arrow-right text-[10px] opacity-70 group-hover:translate-x-0.5 transition-transform ml-1"></i>
                </a>
              </div>
            )}

            {digitouCodigoCompleto && !produtoEncontrado && (
              <div className="p-5 bg-gradient-to-br from-amber-50/40 to-amber-50/10 border border-amber-500/20 rounded-2xl flex gap-3.5 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-600 shrink-0 mt-0.5">
                  <i className="fa-solid fa-magnifying-glass-minus text-xs"></i>
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-amber-900 tracking-tight">Código não localizado</h4>
                  <p className="text-[11px] text-amber-800/80 leading-relaxed">
                    Não achamos esse ID exato. Verifique erros de digitação ou busque o nome do produto na barra superior!
                  </p>
                </div>
              </div>
            )}

            {!digitouCodigoCompleto && (
              <div className="flex items-center gap-3 px-4 py-3.5 bg-[#FAFAFA] border border-[#F1F5F9] rounded-xl text-[11px] text-[#94A3B8] transition-all duration-200">
                <div className="w-5 h-5 rounded-md bg-[#0284C7]/5 flex items-center justify-center text-[#0284C7]">
                  <i className="fa-solid fa-sparkles text-[9px]"></i>
                </div>
                <span className="leading-normal">Digite o ID exato das redes sociais para abrir o link do produto.</span>
              </div>
            )}

          </div>
        </div>

      </div>
    </section>
  );
};