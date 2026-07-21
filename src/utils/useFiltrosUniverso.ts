import { useState, useMemo } from 'react';
import { tratarTexto, formatarParaUrl, formatarParaExibicao } from '../utils/produtoFormatadores';
import type { Produto } from '../types/produto';
import { filtrarProdutosRobustosGlobal } from '../utils/produtoFormatadores';

export const useFiltrosUniverso = (universoId: string, grupoId: string | null, subItemId: string | null, produtos: Produto[]) => {
    const [buscaInterna, setBuscaInterna] = useState('');
    const [buscaGrupoLateral, setBuscaGrupoLateral] = useState('');
    const [filtroTipoItem, setFiltroTipoItem] = useState('');
    const [filtroEstado, setFiltroEstado] = useState('');
    const [ordenacao, setOrdenacao] = useState<'relevancia' | 'precoCrescente' | 'precoDecrescente'>('relevancia');
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

    const produtosDesteUniverso = useMemo(() => {
        return produtos.filter((p) => formatarParaUrl(p.universo) === formatarParaUrl(universoId));
    }, [universoId, produtos]);

    const gruposDisponiveis = useMemo(() => {
        const mapa = new Map<string, string>();
        produtosDesteUniverso.forEach((p) => { if (p.grupo) mapa.set(formatarParaUrl(p.grupo), p.grupo); });
        return Array.from(mapa.values());
    }, [produtosDesteUniverso]);

    const gruposFiltradosLateral = useMemo(() => {
        const termo = tratarTexto(buscaGrupoLateral);
        if (!termo) return gruposDisponiveis;
        return gruposDisponiveis.filter(g => tratarTexto(g).includes(termo));
    }, [gruposDisponiveis, buscaGrupoLateral]);

    const subItensDisponiveis = useMemo(() => {
        if (!grupoId) return [];
        const mapa = new Map<string, string>();
        produtosDesteUniverso
            .filter((p) => p.grupo && formatarParaUrl(p.grupo) === formatarParaUrl(grupoId))
            .forEach((p) => { if (p.subItem) mapa.set(formatarParaUrl(p.subItem), p.subItem); });
        return Array.from(mapa.values());
    }, [grupoId, produtosDesteUniverso]);

    const metadadosFiltros = useMemo(() => {
        const tipos = new Set<string>();
        const estados = new Set<string>();

        produtosDesteUniverso.forEach(p => {
            const bateGrupo = !grupoId || (p.grupo && formatarParaUrl(p.grupo) === formatarParaUrl(grupoId));
            const bateSubItem = !subItemId || (p.subItem && formatarParaUrl(p.subItem) === formatarParaUrl(subItemId));

            if (bateGrupo && bateSubItem) {
                if (p.tipoItem) tipos.add(p.tipoItem);
                if (p.estadoPostagem) estados.add(p.estadoPostagem.toUpperCase());
            }
        });

        return { tipos: Array.from(tipos).sort(), estados: Array.from(estados).sort() };
    }, [produtosDesteUniverso, grupoId, subItemId]);

    const produtosProcessados = useMemo(() => {
    let resultado = produtosDesteUniverso.filter((p) => {
        const bateGrupo = !grupoId || (p.grupo && formatarParaUrl(p.grupo) === formatarParaUrl(grupoId));
        const bateSubItem = !subItemId || (p.subItem && formatarParaUrl(p.subItem) === formatarParaUrl(subItemId));
        const bateTipo = !filtroTipoItem || p.tipoItem === filtroTipoItem;
        const bateEstado = !filtroEstado || p.estadoPostagem?.toUpperCase() === filtroEstado.toUpperCase();

        return bateGrupo && bateSubItem && bateTipo && bateEstado;
    });

    if (buscaInterna.trim() !== '') {
        resultado = filtrarProdutosRobustosGlobal(resultado, buscaInterna);
    }

    // Definição da ordem de resultados
    if (ordenacao === 'relevancia') {
    resultado.sort((a, b) => {
        // Define os pesos: quanto menor o valor, maior a prioridade
        const obterPeso = (p: Produto) => {
            if (p.tipo === 'colecao') return 1; // Coleção vem primeiro
            if (p.tipo === 'achadinho') return 2; // Achadinhos vem depois
            return 3; // Outros produtos
        };
        return obterPeso(a) - obterPeso(b);
    });
} else if (ordenacao === 'precoCrescente') {
    resultado.sort((a, b) => a.preco - b.preco);
} else if (ordenacao === 'precoDecrescente') {
    resultado.sort((a, b) => b.preco - a.preco);
}

    return resultado;
}, [grupoId, subItemId, buscaInterna, filtroTipoItem, filtroEstado, ordenacao, produtosDesteUniverso]);

    const termoEscopoBusca = useMemo(() => {
        if (subItemId && grupoId) {
            const sub = subItensDisponiveis.find(s => formatarParaUrl(s) === formatarParaUrl(subItemId));
            if (sub) return formatarParaExibicao(sub);
        }
        if (grupoId) {
            const g = gruposDisponiveis.find(g => formatarParaUrl(g) === formatarParaUrl(grupoId));
            if (g) return formatarParaExibicao(g);
        }
        return formatarParaExibicao(universoId);
    }, [universoId, grupoId, subItemId, gruposDisponiveis, subItensDisponiveis]);

    const sugestaoRedirecionamento = useMemo(() => {
        const termoTratado = tratarTexto(buscaInterna);
        if (!termoTratado || produtosProcessados.length > 0) return null;

        const palavrasBusca = termoTratado.split(/\s+/);

        const correspondenciaMesmoUniverso = produtosDesteUniverso.find((p) => {
            if (p.grupo && grupoId && formatarParaUrl(p.grupo) === formatarParaUrl(grupoId)) return false;
            const titulo = tratarTexto(p.titulo);
            const grupo = p.grupo ? tratarTexto(p.grupo) : '';
            const subItem = p.subItem ? tratarTexto(p.subItem) : '';
            const tags = p.tags.map(t => tratarTexto(t));

            return palavrasBusca.every(palavra =>
                titulo.includes(palavra) || grupo.includes(palavra) || subItem.includes(palavra) || tags.some(t => t.includes(palavra))
            );
        });

        if (correspondenciaMesmoUniverso && correspondenciaMesmoUniverso.grupo) {
            return { tipo: 'grupo', url: `/${formatarParaUrl(universoId)}/${formatarParaUrl(correspondenciaMesmoUniverso.grupo)}`, nome: correspondenciaMesmoUniverso.grupo };
        }

        const correspondenciaOutroUniverso = produtos.find((p) => {
            if (formatarParaUrl(p.universo) === formatarParaUrl(universoId)) return false;
            const titulo = tratarTexto(p.titulo);
            const grupo = p.grupo ? tratarTexto(p.grupo) : '';
            const subItem = p.subItem ? tratarTexto(p.subItem) : '';
            const tags = p.tags.map(t => tratarTexto(t));

            return palavrasBusca.every(palavra =>
                titulo.includes(palavra) || grupo.includes(palavra) || subItem.includes(palavra) || tags.some(t => t.includes(palavra))
            );
        });

        if (correspondenciaOutroUniverso) {
            return { tipo: 'universo', url: `/${formatarParaUrl(correspondenciaOutroUniverso.universo)}`, nome: correspondenciaOutroUniverso.universo };
        }

        return null;
    }, [buscaInterna, produtosProcessados, produtos, produtosDesteUniverso, universoId, grupoId]);


    return {
        buscaInterna, setBuscaInterna,
        buscaGrupoLateral, setBuscaGrupoLateral,
        filtroTipoItem, setFiltroTipoItem,
        filtroEstado, setFiltroEstado,
        ordenacao, setOrdenacao,
        isMobileFiltersOpen, setIsMobileFiltersOpen,
        produtosProcessados,
        gruposDisponiveis,
        metadadosFiltros,
        termoEscopoBusca,
        sugestaoRedirecionamento,
        gruposFiltradosLateral,
        subItensDisponiveis
    };
};

export type FiltrosHookReturn = ReturnType<typeof useFiltrosUniverso>;