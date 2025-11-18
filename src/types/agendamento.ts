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
export type TipoRecorrencia = "DIARIO" | "SEMANAL" | "MENSAL" | null;

export interface RecorrenciaConfig {
  tipo: TipoRecorrencia;
  intervalo?: number; // Para SEMANAL: 1 = toda semana, 2 = a cada 2 semanas, etc.
  diasSemana?: number[]; // Para SEMANAL: [1,3,5] = segunda, quarta, sexta (0=domingo, 1=segunda, etc)
  diaMes?: number; // Para MENSAL: dia do mês (1-31)
  dataFim?: string; // Data de término da recorrência (ISO string)
  quantidadeOcorrencias?: number; // Número máximo de ocorrências
}

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
  // Recorrência
  recorrenciaId?: string | null; // ID que agrupa agendamentos da mesma recorrência
  recorrenciaConfig?: RecorrenciaConfig | null; // Configuração da recorrência
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
  recorrencia?: RecorrenciaConfig;
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
  // Opções de recorrência
  aplicarARecorrencia?: boolean; // true = aplicar a este e todos futuros, false = apenas este
}

export interface FiltrosAgendamento {
  quadraId?: string;
  pointId?: string;
  dataInicio?: string;
  dataFim?: string;
  status?: StatusAgendamento;
  apenasMeus?: boolean;
}


