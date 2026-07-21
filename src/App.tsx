import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { Header } from './components/Header';
import { ExploracaoGuiada } from './components/ExploracaoGuiada';
import { Hero } from './components/Hero';
import { DADOS_PRODUTOS } from './data/produtos';
import { Footer } from './components/Footer';
import { PaginaUniverso } from './components/PaginaUniverso';
import { PaginaBusca } from './components/PaginaBusca';
import { ApresentacaoKomorebi } from './components/ApresentacaoKomorebi';

const ConteudoApp: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white text-[#334155] font-sans antialiased min-h-screen flex flex-col selection:bg-[#0284C7]/10 selection:text-[#0284C7]">
      <Header />

     <main className="flex-grow pb-16 md:pb-28">
        <Routes>

          <Route path="/" element={
            <div className="space-y-4 md:space-y-6">
              <Hero />
              <ApresentacaoKomorebi />
              <ExploracaoGuiada onSelecionarUniverso={(id) => navigate(`/${id}`)} />
            </div>
          } />

          <Route path="/busca" element={<PaginaBusca produtos={DADOS_PRODUTOS} />} />

          <Route path="/:universoId" element={<ValidadorDeUniverso />} />
          <Route path="/:universoId/:grupoId" element={<ValidadorDeUniverso />} />
          <Route path="/:universoId/:grupoId/:subItemId" element={<ValidadorDeUniverso />} />

        </Routes>
      </main>

      <Footer />
    </div>
  );
};

const ValidadorDeUniverso: React.FC = () => {
  const navigate = useNavigate();
  const { universoId, grupoId, subItemId } = useParams<{ universoId: string; grupoId?: string; subItemId?: string }>();

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [universoId, grupoId, subItemId]);

  return (
    <div className="space-y-6 pb-16">
      <div className="max-w-6xl w-full mx-auto px-6 pt-6 -mb-6">
        <button
          onClick={() => navigate('/')}
          className="text-xs font-mono font-bold text-[#64748B] hover:text-[#0F172A] transition-colors flex items-center gap-2 group"
        >
          <i className="fa-solid fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
          <span className="text-slate-300">/</span> voltar para a Home
        </button>
      </div>

      <PaginaUniverso
        universoId={universoId!}
        grupoId={grupoId || null}
        subItemId={subItemId || null}
        produtos={DADOS_PRODUTOS}
        onMudarFiltros={(g, s) => {
          if (!g) navigate(`/${universoId}`);
          else if (!s) navigate(`/${universoId}/${g}`);
          else navigate(`/${universoId}/${g}/${s}`);
        }}
      />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ConteudoApp />
    </BrowserRouter>
  );
};

export default App;