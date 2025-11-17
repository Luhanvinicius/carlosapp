// src/types/agendamento.ts

export interface Point {
  id: string;
  nome: string;
  endereco?: string;
  telefone?: string;
  email?: string;
  descricao?: string;
  ativo: boolean;
  createdAt: string;
  updatedAt: string;
  quadras?: Quadra[];
}

export interface Quadra {
  id: string;
  nome: string;
  pointId: string;
  point?: Point;
  tipo?: string;
  capacidade?: number;
  ativo: boolean;
  createdAt: string;
  updatedAt: string;
}

export type StatusAgendamento = "CONFIRMADO" | "CANCELADO" | "CONCLUIDO";

export interface Agendamento {
  id: string;
  quadraId: string;
  quadra: Quadra & { point: Point };
  usuarioId: string | null; // null para avulsos
  usuario?: {
    id: string;
    name: string;
    email: string;
  } | null;
  atletaId: string | null;
  atleta?: {
    id: string;
    nome: string;
    fone?: string;
  } | null;
  nomeAvulso: string | null;
  telefoneAvulso: string | null;
  dataHora: string; // ISO string
  duracao: number; // minutos, padrão 60
  // Valores financeiros
  valorHora: number | null;
  valorCalculado: number | null;
  valorNegociado: number | null;
  status: StatusAgendamento;
  observacoes?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CriarPointPayload {
  nome: string;
  endereco?: string;
  telefone?: string;
  email?: string;
  descricao?: string;
  ativo?: boolean;
}

export interface CriarQuadraPayload {
  nome: string;
  pointId: string;
  tipo?: string;
  capacidade?: number;
  ativo?: boolean;
}

export interface TabelaPreco {
  id: string;
  quadraId: string;
  quadra?: {
    id: string;
    nome: string;
    pointId: string;
  };
  inicioMinutoDia: number; // minutos desde 00:00
  fimMinutoDia: number;
  valorHora: number;
  ativo: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CriarAgendamentoPayload {
  quadraId: string;
  dataHora: string; // ISO string
  duracao?: number; // minutos, padrão 60
  observacoes?: string;
  // Modo Atleta (admin)
  atletaId?: string;
  // Modo Avulso (admin)
  nomeAvulso?: string;
  telefoneAvulso?: string;
  // Valor negociado (opcional, admin)
  valorNegociado?: number;
}

export type ModoAgendamento = "normal" | "atleta" | "avulso";

export interface AtualizarAgendamentoPayload {
  dataHora?: string;
  duracao?: number;
  observacoes?: string;
  // Modo Atleta (admin)
  atletaId?: string | null;
  // Modo Avulso (admin)
  nomeAvulso?: string | null;
  telefoneAvulso?: string | null;
  // Valor negociado (opcional, admin)
  valorNegociado?: number | null;
}

export interface FiltrosAgendamento {
  quadraId?: string;
  pointId?: string;
  dataInicio?: string;
  dataFim?: string;
  status?: StatusAgendamento;
  apenasMeus?: boolean;
}


