export interface Lead {
  id: string;
  nome: string | null;
  email: string | null;
  whatsapp: string | null;
  bairro: string | null;
  cidade: string;
  origem: string | null;
  created_at: string;
}

export interface Post {
  id: string;
  titulo: string;
  conteudo: string;
  tipo: "texto" | "video_avatar" | "video_broll" | "audio" | "projeto";
  status: string;
  canais_publicados: string[];
  video_url: string | null;
  imagem_url: string | null;
  tags: string[];
  created_at: string;
}

export interface Video {
  id: string;
  titulo: string;
  tipo: "avatar_heygen" | "broll_runway";
  status: string;
  roteiro: string | null;
  video_url: string | null;
  thumbnail_url: string | null;
  duracao_segundos: number | null;
  publicado: boolean;
  created_at: string;
}

export interface Audio {
  id: string;
  titulo: string;
  descricao: string | null;
  transcricao: string | null;
  arquivo_url: string;
  duracao_segundos: number | null;
  publicado: boolean;
  created_at: string;
}

export interface Noticia {
  id: string;
  titulo: string;
  resumo: string | null;
  link: string;
  fonte: string | null;
  imagem_url: string | null;
  publicado_em: string | null;
  processada: boolean;
  created_at: string;
}

export interface ProjetoLei {
  id: string;
  numero: string;
  ano: number;
  tipo: string;
  ementa: string;
  status: string | null;
  data_apresentacao: string | null;
  link_sapl: string | null;
  temas: string[];
  foi_aprovado: boolean;
  created_at: string;
}

export interface Conquista {
  id: string;
  ano: number;
  titulo: string;
  descricao: string;
  icone: string | null;
  destaque: boolean;
  ordem: number;
  created_at: string;
}
