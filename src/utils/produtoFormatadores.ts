import type { Produto } from "../types/produto";

export const tratarTexto = (t: string): string =>
  t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();

export const formatarParaUrl = (t: string): string =>
  tratarTexto(t).replace(/[-\s]+/g, '');

export const formatarParaExibicao = (t: string): string => {
  if (!t) return '';
  return t.replace(/-/g, ' ').split(' ').map((p, i) =>
    ['de', 'da', 'do', 'dos', 'das', 'e', 'o', 'a'].includes(p.toLowerCase()) && i !== 0
      ? p.toLowerCase() : p.charAt(0).toUpperCase() + p.slice(1).toLowerCase()
  ).join(' ');
};

export const normalizarPlural = (palavra: string): string => {
  if (palavra.length <= 3) return palavra;
  if (palavra.endsWith('s') && !palavra.endsWith('ss')) {
    return palavra.slice(0, -1);
  }
  return palavra;
};

export const converterPrecoParaNumero = (preco: any): number => {
  if (typeof preco === 'number') return preco;
  if (typeof preco === 'string') {
    const valorLimpo = preco.replace(',', '.').replace(/[^\d.]/g, '');
    const num = parseFloat(valorLimpo);
    return isNaN(num) ? 0 : num;
  }
  return 0;
};

export const formatarPrecoParaReal = (preco: any): string => {
  const numero = converterPrecoParaNumero(preco);
  return numero.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
};

export const filtrarProdutosRobustosGlobal = (produtos: Produto[], stringBusca: string) => {
  const termoTratado = tratarTexto(stringBusca);
  if (!termoTratado) return [];

  const keywords = termoTratado.split(/\s+/).map(p => normalizarPlural(p));

  const filtrados = produtos.filter(produto => {
    const camposProduto = [
      produto.titulo,
      produto.descricao || '', 
      produto.id,
      produto.universo,
      produto.grupo || '',
      produto.subItem || '',
      produto.tipoItem,
      produto.estadoPostagem,
      ...(produto.tags || [])
    ].map(campo => tratarTexto(campo));

    return keywords.some(palavra =>
      camposProduto.some(campo => {
        const campoSingular = normalizarPlural(campo);
        return campo.includes(palavra) || 
               campoSingular.includes(palavra) || 
               palavra.includes(campo) ||
               palavra.includes(campoSingular);
      })
    );
  });

  return filtrados.sort((a, b) => {
    const calcularScore = (produto: Produto) => {
      const textoCompleto = tratarTexto(`${produto.titulo} ${produto.descricao} ${produto.universo} ${produto.grupo} ${(produto.tags || []).join(' ')}`);
      return keywords.filter(palavra => textoCompleto.includes(palavra)).length;
    };

    const scoreA = calcularScore(a);
    const scoreB = calcularScore(b);
    if (scoreB !== scoreA) return scoreB - scoreA;

    if (a.tipo !== b.tipo) return a.tipo === 'colecao' ? -1 : 1;
    if (a.universo !== b.universo) return a.universo.localeCompare(b.universo);
    return a.id.localeCompare(b.id);
  });
};

interface FiltrosUniverso {
  grupoId: string | null;
  subItemId: string | null;
  filtroTipoItem: string;
  filtroEstado: string;
}

export const filtrarEOrdenarProdutosUniverso = (
  produtos: Produto[],
  universoId: string,
  stringBusca: string,
  ordenacao: 'relevancia' | 'precoCrescente' | 'precoDecrescente',
  filtrosLaterais: FiltrosUniverso
) => {
  let resultado = produtos.filter(p => formatarParaUrl(p.universo) === formatarParaUrl(universoId));

  const { grupoId, subItemId, filtroTipoItem, filtroEstado } = filtrosLaterais;
  
  resultado = resultado.filter((p) => {
    const bateGrupo = !grupoId || (p.grupo && formatarParaUrl(p.grupo) === formatarParaUrl(grupoId));
    const bateSubItem = !subItemId || (p.subItem && formatarParaUrl(p.subItem) === formatarParaUrl(subItemId));
    const bateTipo = !filtroTipoItem || p.tipoItem?.toLowerCase() === filtroTipoItem.toLowerCase();
    const bateEstado = !filtroEstado || p.estadoPostagem?.toLowerCase() === filtroEstado.toLowerCase();

    return bateGrupo && bateSubItem && bateTipo && bateEstado;
  });

  const termoTratado = tratarTexto(stringBusca);
  const keywords = termoTratado ? termoTratado.split(/\s+/).map(p => normalizarPlural(p)) : [];

  if (keywords.length > 0) {
    resultado = resultado.filter(produto => {
      const camposProduto = [
        produto.titulo,
        produto.descricao || '', 
        produto.id,
        produto.grupo || '',
        produto.subItem || '',
        produto.tipoItem,
        produto.estadoPostagem,
        ...(produto.tags || [])
      ].map(campo => tratarTexto(campo));

      return keywords.some(palavra =>
        camposProduto.some(campo => {
          const campoSingular = normalizarPlural(campo);
          return campo.includes(palavra) || 
                 campoSingular.includes(palavra) || 
                 palavra.includes(campo) ||
                 palavra.includes(campoSingular);
        })
      );
    });
  }

  return resultado.sort((a, b) => {
    if (ordenacao === 'relevancia' && keywords.length > 0) {
      const calcularScore = (produto: Produto) => {
        const textoCompleto = tratarTexto(`${produto.titulo} ${produto.descricao} ${produto.grupo} ${(produto.tags || []).join(' ')}`);
        return keywords.filter(palavra => textoCompleto.includes(palavra)).length;
      };

      const scoreA = calcularScore(a);
      const scoreB = calcularScore(b);
      if (scoreB !== scoreA) return scoreB - scoreA;
    }

    if (ordenacao === 'precoCrescente') {
      return converterPrecoParaNumero(a.preco) - converterPrecoParaNumero(b.preco);
    }
    if (ordenacao === 'precoDecrescente') {
      return converterPrecoParaNumero(b.preco) - converterPrecoParaNumero(a.preco);
    }

    if (a.tipo !== b.tipo) return a.tipo === 'colecao' ? -1 : 1;
    return a.id.localeCompare(b.id);
  });
};