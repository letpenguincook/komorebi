export interface UniversoConfig {
    id: string;
    titulo: string;
    descricao: string;
    icone: string;
    corEtiqueta: string;
    corIcone: string;
    badge: string;
    corTagBg: string;
    corTagTexto: string;
    corTagBorda: string;
    imagemUrl: string;
    hubsDestaque: string[];
}

export const CONFIG_UNIVERSOS: Record<string, UniversoConfig> = {
    kpop: {
        id: 'kpop',
        titulo: 'Universo K-Pop',
        descricao: 'Cards, photocards originais, decotapes e mimos exclusivos do seu grupo favorito.',
        icone: 'fa-solid fa-compact-disc',
        corEtiqueta: 'bg-purple-50 text-purple-600 border-purple-100',
        corIcone: 'text-purple-500 bg-purple-50',
        badge: 'Música',
        corTagBg: 'bg-purple-50/60 group-hover:bg-purple-50',
        corTagTexto: 'text-purple-700',
        corTagBorda: 'border-purple-100 group-hover:border-purple-200',
        imagemUrl: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=400&auto=format&fit=crop',
        hubsDestaque: ['/bts', '/straykids/hyunjin', '/enhypen']
    },
    anime: {
        id: 'anime',
        titulo: 'Anime & Mangá',
        descricao: 'Chaveiros acrílicos, adesivos premium e papelaria temática inspirada nos melhores arcos.',
        icone: 'fa-solid fa-wand-magic-sparkles',
        corEtiqueta: 'bg-amber-50 text-amber-600 border-amber-100',
        corIcone: 'text-amber-500 bg-amber-50',
        badge: 'Entretenimento',
        corTagBg: 'bg-amber-50/60 group-hover:bg-amber-50',
        corTagTexto: 'text-amber-700',
        corTagBorda: 'border-amber-100 group-hover:border-amber-200',
        imagemUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=400&auto=format&fit=crop',
        hubsDestaque: ['/anime/jujutsukaisen', '/anime/diariodeumaapotecaria']
    },
    cartoon: {
        id: 'cartoon',
        titulo: 'Cartoon e Animações',
        descricao: 'A nostalgia e fofura dos personagens mais marcantes em itens exclusivos.',
        icone: 'fa-solid fa-masks-theater',
        corEtiqueta: 'bg-pink-50 text-pink-600 border-pink-100',
        corIcone: 'text-pink-500 bg-pink-50',
        badge: 'Animação',
        corTagBg: 'bg-pink-50/60 group-hover:bg-pink-50',
        corTagTexto: 'text-pink-700',
        corTagBorda: 'border-pink-100 group-hover:border-pink-200',
        imagemUrl: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?q=80&w=400&auto=format&fit=crop',
        hubsDestaque: ['/sanrio', '/stevenuniverso', '/horadeaventura']
    },
    papelaria: {
        id: 'papelaria',
        titulo: 'Papelaria & Estética',
        descricao: 'Planners minimalistas, cadernos artesanais e utilitários para transformar seu setup.',
        icone: 'fa-solid fa-pen-nib',
        corEtiqueta: 'bg-sky-50 text-sky-600 border-sky-100',
        corIcone: 'text-sky-500 bg-slate-50',
        badge: 'Utilitários',
        corTagBg: 'bg-sky-50/60 group-hover:bg-sky-50',
        corTagTexto: 'text-sky-700',
        corTagBorda: 'border-sky-100 group-hover:border-sky-200',
        imagemUrl: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=400&auto=format&fit=crop',
        hubsDestaque: ['/marcadordepagina', '/cadernos']
    },
    series: {
        id: 'series',
        titulo: 'Séries & TV',
        descricao: 'Posters artísticos, cadernos e mimos colecionáveis de produções aclamadas.',
        icone: 'fa-solid fa-tv',
        corEtiqueta: 'bg-emerald-50 text-emerald-600 border-emerald-100',
        corIcone: 'text-emerald-500 bg-emerald-50',
        badge: 'Entretenimento',
        corTagBg: 'bg-emerald-50/60 group-hover:bg-emerald-50',
        corTagTexto: 'text-emerald-700',
        corTagBorda: 'border-emerald-100 group-hover:border-emerald-200',
        imagemUrl: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=400&auto=format&fit=crop',
       hubsDestaque: ['/strangerthings']
    },
    games: {
        id: 'games',
        titulo: 'Games',
        descricao: 'Mousepads, luminárias e colecionáveis épicos dos seus jogos favoritos.',
        icone: 'fa-solid fa-gamepad',
        corEtiqueta: 'bg-indigo-50 text-indigo-600 border-indigo-100',
        corIcone: 'text-indigo-500 bg-indigo-50',
        badge: 'Entretenimento',
        corTagBg: 'bg-indigo-50/60 group-hover:bg-indigo-50',
        corTagTexto: 'text-indigo-700',
        corTagBorda: 'border-indigo-100 group-hover:border-indigo-200',
        imagemUrl: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=400&auto=format&fit=crop',
        hubsDestaque: ['/genshinimpact', '/stardewvalley', '/valorant']
    }
};