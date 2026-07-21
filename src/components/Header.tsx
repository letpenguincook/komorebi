import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [textoBusca, setTextoBusca] = useState('');

  const ocultarBuscaGlobal = location.pathname !== '/' && location.pathname !== '/busca';

  useEffect(() => {
    if (location.pathname === '/busca') {
      const params = new URLSearchParams(location.search);
      setTextoBusca(params.get('q') || '');
    } else {
      setTextoBusca(''); // Limpa se sair da tela de busca (ex: foi p/ Home)
    }
  }, [location.pathname, location.search]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const termo = textoBusca.trim();
      if (termo) {
        navigate(`/busca?q=${encodeURIComponent(termo)}`);
      } else {
        navigate('/');
      }
    }
  };

  return (
    <header className="bg-white dark:bg-slate-950 border-b border-[#F1F5F9] dark:border-slate-800 sticky top-0 z-50 backdrop-blur-md bg-opacity-95 dark:bg-opacity-90 px-6">
      <div className="max-w-6xl mx-auto py-4 flex flex-col sm:flex-row gap-4 justify-between items-center">

        <div className="text-center sm:text-left cursor-pointer" onClick={() => navigate('/')}>
          <h1 className="text-lg font-bold tracking-widest uppercase text-[#0F172A] dark:text-white">Komorebi</h1>
          <p className="text-[10px] text-[#94A3B8] tracking-wider uppercase font-mono mt-0.5">Artesanatos personalizados</p>
        </div>

        {!ocultarBuscaGlobal ? (
          <div className="relative w-full sm:max-w-xs animate-fadeIn">
            <input
              type="text"
              placeholder="Explorar produtos, tags, mimos... (Enter)"
              value={textoBusca}
              onChange={(e) => setTextoBusca(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full pl-9 pr-4 py-2 bg-[#FAFAFA] dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-700 rounded-xl text-xs text-[#0F172A] dark:text-white placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#0284C7]/15 focus:border-[#0284C7] dark:focus:bg-slate-800 transition"
            />
            <i
              className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] text-[11px] cursor-pointer"
              onClick={() => textoBusca.trim() && navigate(`/busca?q=${encodeURIComponent(textoBusca.trim())}`)}
            ></i>
          </div>
        ) : (
          <div className="hidden sm:block flex-1" />
        )}

        <nav className="flex items-center gap-6 text-xs font-medium tracking-wide text-[#64748B] dark:text-[#94A3B8]">
          <button
            onClick={() => navigate('/')}
            className="hover:text-[#0284C7] dark:hover:text-blue-400 transition"
          >
            Início
          </button>
          <a
            href="https://shopee.com.br/9o5s3cf4xu#product_list"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#0F172A] dark:hover:text-white transition flex items-center gap-1"
          >
            Shopee <i className="fa-solid fa-arrow-up-right-from-square text-[9px] opacity-70"></i>
          </a>
        </nav>

      </div>
    </header>
  );
};