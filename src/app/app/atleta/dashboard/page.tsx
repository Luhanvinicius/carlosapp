// app/app/atleta/dashboard/page.tsx - Dashboard do atleta (igual ao cursor)
'use client';

import { useEffect, useMemo, useState } from 'react';
import MinhasPartidasCompacta from '@/components/MinhasPartidasCompacta';
import { api } from '@/lib/api';
import type { Atleta, Partida } from '@/types/domain';

type Periodo = 'all' | '30' | '90' | '365';

export default function AtletaDashboardPage() {
  const [atleta, setAtleta] = useState<Atleta | null>(null);
  const [partidas, setPartidas] = useState<Partida[]>([]);
  const [mostrarPartidas, setMostrarPartidas] = useState(false);
  const [mostrarGrafico, setMostrarGrafico] = useState(false);
  const [modalPlacar, setModalPlacar] = useState(false);
  const [partidaSelecionada, setPartidaSelecionada] = useState<Partida | null>(null);

  // período do gráfico e peso do TB
  const [periodo, setPeriodo] = useState<Periodo>('all');
  const [tbWeight, setTbWeight] = useState<number>(0.1);

  useEffect(() => {
    buscarAtleta();
  }, []);

  useEffect(() => {
    if (atleta?.id) {
      carregarPartidas();
    }
  }, [atleta?.id]);

  const buscarAtleta = async () => {
    try {
      const res = await api.get('/atleta/me/atleta');
      if (res.status === 200 && res.data) {
        setAtleta(res.data as Atleta | null);
      }
    } catch (error) {
      console.error('Erro ao buscar atleta', error);
    }
  };

  const carregarPartidas = async () => {
    if (!atleta?.id) return;
    try {
      const res = await api.get('/partida/listarPartidas');
      const todas = Array.isArray(res.data) ? res.data : [];
      const doAtleta = todas
        .filter((p: Partida) =>
          [p.atleta1?.id, p.atleta2?.id, p.atleta3?.id, p.atleta4?.id].includes(atleta.id)
        )
        .sort((a: Partida, b: Partida) => new Date(b.data).getTime() - new Date(a.data).getTime());
      setPartidas(doAtleta);
    } catch (err) {
      console.error('Erro ao carregar partidas', err);
    }
  };

  // filtra por período para o gráfico
  const partidasPeriodo = useMemo(() => {
    if (periodo === 'all') return partidas;
    const days = Number(periodo);
    const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
    return partidas.filter((p) => new Date(p.data).getTime() >= cutoff);
  }, [partidas, periodo]);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Acompanhe seu desempenho e partidas</p>
      </div>

      {atleta && (
        <>
          <MinhasPartidasCompacta
            partidas={partidas}
            atletaId={atleta.id}
            onAbrirTodas={() => setMostrarPartidas(true)}
            onAtualizarPlacar={(p) => {
              setPartidaSelecionada(p);
              setModalPlacar(true);
            }}
            onNovaPartida={carregarPartidas}
            pageSize={5}
          />

          {/* Controles do gráfico */}
          <div className="flex flex-wrap items-center gap-3 mt-4">
            <button
              onClick={() => setMostrarGrafico((v) => !v)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {mostrarGrafico ? 'Ocultar Desempenho' : 'Ver Desempenho'}
            </button>

            {mostrarGrafico && (
              <>
                <label className="text-sm text-gray-700">
                  Período:{' '}
                  <select
                    value={periodo}
                    onChange={(e) => setPeriodo(e.target.value as Periodo)}
                    className="ml-1 border rounded px-2 py-1"
                  >
                    <option value="all">Todos</option>
                    <option value="30">30 dias</option>
                    <option value="90">90 dias</option>
                    <option value="365">365 dias</option>
                  </select>
                </label>

                <label className="text-sm text-gray-700 flex items-center gap-2">
                  Peso do TB:
                  <input
                    type="range"
                    min={0}
                    max={0.25}
                    step={0.05}
                    value={tbWeight}
                    onChange={(e) => setTbWeight(Number(e.target.value))}
                  />
                  <span className="text-xs text-gray-600 w-10 text-right">
                    {tbWeight.toFixed(2)}
                  </span>
                </label>
              </>
            )}
          </div>

          {mostrarGrafico && partidasPeriodo.length > 0 && (
            <div className="mt-2 bg-white rounded-xl shadow p-4">
              <p className="text-gray-600 mb-4">
                Gráfico de desempenho será implementado em breve...
              </p>
            </div>
          )}

          {mostrarPartidas && (
            <div className="bg-white rounded-xl shadow p-4">
              <h2 className="text-lg font-semibold mb-4">Todas as Partidas</h2>
              <p className="text-gray-600 mb-4">Lista completa será implementada em breve...</p>
              <button
                onClick={() => setMostrarPartidas(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Fechar
              </button>
            </div>
          )}

          {modalPlacar && partidaSelecionada && (
            <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 relative max-w-md w-full">
                <button
                  className="absolute top-2 right-2 text-gray-600 hover:text-black text-lg"
                  onClick={() => {
                    setModalPlacar(false);
                    setPartidaSelecionada(null);
                  }}
                >
                  ✕
                </button>
                <h3 className="text-lg font-semibold mb-4">Atualizar Placar</h3>
                <p className="text-gray-600 mb-4">Modal será implementado em breve...</p>
                <button
                  onClick={() => {
                    setModalPlacar(false);
                    setPartidaSelecionada(null);
                    carregarPartidas();
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Fechar
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

