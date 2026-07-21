export interface Produto {
  id: string; // Código Komorebi único para cada produto
  titulo: string;
  descricao?: string; // Campo opcional para indexação (SEO/Termos técnicos)
  tipo: 'colecao' | 'achadinho';
  universo: string; // Universo pai de produtos. Ex.: "Anime"
  grupo?: string; // Nível 1. Ex: "Naruto", "Stray Kids"
  subItem?: string; // Nível 2. Ex: "Sasuke", "Bang Chan"
  tags: string[];
  preco: number;
  urlShopee: string;
  tipoItem: string; // Ex: "Chaveiro", "Papercraft", "Card"
  estadoPostagem: string; // Ex: "São Paulo", "Internacional"
  imagemUrl?: string;
}

export interface ConfigNicho {
  classe: string;
  bgImage: string;
  termoGrupo: string;
  termoSubItem: string;
}