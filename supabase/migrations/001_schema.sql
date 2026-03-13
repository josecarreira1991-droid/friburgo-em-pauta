CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT,
  email TEXT,
  whatsapp TEXT,
  bairro TEXT,
  cidade TEXT DEFAULT 'Nova Friburgo',
  origem TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo TEXT NOT NULL,
  conteudo TEXT NOT NULL,
  tipo TEXT NOT NULL,
  status TEXT DEFAULT 'publicado',
  canais_publicados TEXT[],
  video_url TEXT,
  imagem_url TEXT,
  instagram_post_id TEXT,
  facebook_post_id TEXT,
  threads_post_id TEXT,
  heygen_video_id TEXT,
  runway_job_id TEXT,
  tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo TEXT NOT NULL,
  tipo TEXT NOT NULL,
  status TEXT DEFAULT 'processando',
  roteiro TEXT,
  prompt_runway TEXT,
  video_url TEXT,
  thumbnail_url TEXT,
  duracao_segundos INTEGER,
  publicado BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS audios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo TEXT NOT NULL,
  descricao TEXT,
  transcricao TEXT,
  arquivo_url TEXT NOT NULL,
  duracao_segundos INTEGER,
  publicado BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS noticias (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo TEXT NOT NULL,
  resumo TEXT,
  link TEXT UNIQUE,
  fonte TEXT,
  imagem_url TEXT,
  publicado_em TIMESTAMPTZ,
  processada BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS projetos_lei (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  numero TEXT NOT NULL,
  ano INTEGER NOT NULL,
  tipo TEXT NOT NULL,
  ementa TEXT NOT NULL,
  status TEXT,
  data_apresentacao DATE,
  link_sapl TEXT,
  temas TEXT[],
  foi_aprovado BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS conquistas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ano INTEGER NOT NULL,
  titulo TEXT NOT NULL,
  descricao TEXT NOT NULL,
  icone TEXT,
  destaque BOOLEAN DEFAULT false,
  ordem INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO conquistas (ano, titulo, descricao, icone, destaque, ordem) VALUES
(2009, 'Eleito vereador', 'Marcos Medeiros eleito vereador pelo PTB', '🗳️', false, 1),
(2010, 'A UPA de Nova Friburgo', 'Marcos luta e consegue a UPA para a cidade', '🏥', true, 2),
(2011, 'Estacio em Friburgo', 'Ensino superior acessivel — Estacio chega a Nova Friburgo', '🎓', true, 3),
(2012, '319 projetos em um ano', '319 PLOs, 1.337 mocoes, 593 indicacoes no mesmo ano', '📜', false, 4),
(2013, 'Hospital do Cancer', 'Compra do predio do Hospital do Cancer garantida', '🏛️', true, 5),
(2020, 'Vereador mais votado da historia', 'O recordista de votos na historia de Nova Friburgo', '🏆', true, 6),
(2026, 'Candidato a Deputado Estadual', 'Nova Friburgo projeta Marcos para a ALERJ', '⭐', true, 7)
ON CONFLICT DO NOTHING;
