// app/app/admin/points/page.tsx - Points admin (igual ao cursor)
'use client';

import { useEffect, useState } from 'react';
import { pointService } from '@/services/agendamentoService';
import type { Point, CriarPointPayload } from '@/types/agendamento';
import { Plus, Edit, Trash2, MapPin, Phone, Mail, CheckCircle, XCircle } from 'lucide-react';

export default function AdminPointsPage() {
  const [points, setPoints] = useState<Point[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalAberto, setModalAberto] = useState(false);
  const [pointEditando, setPointEditando] = useState<Point | null>(null);
  const [form, setForm] = useState<CriarPointPayload>({
    nome: '',
    endereco: '',
    telefone: '',
    email: '',
    descricao: '',
    ativo: true,
  });
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');

  useEffect(() => {
    carregarPoints();
  }, []);

  const carregarPoints = async () => {
    try {
      setLoading(true);
      const data = await pointService.listar();
      setPoints(data);
    } catch (error) {
      console.error('Erro ao carregar points:', error);
    } finally {
      setLoading(false);
    }
  };

  const abrirModal = (point?: Point) => {
    if (point) {
      setPointEditando(point);
      setForm({
        nome: point.nome,
        endereco: point.endereco || '',
        telefone: point.telefone || '',
        email: point.email || '',
        descricao: point.descricao || '',
        ativo: point.ativo,
      });
    } else {
      setPointEditando(null);
      setForm({
        nome: '',
        endereco: '',
        telefone: '',
        email: '',
        descricao: '',
        ativo: true,
      });
    }
    setErro('');
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setPointEditando(null);
    setErro('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setSalvando(true);

    try {
      if (pointEditando) {
        await pointService.atualizar(pointEditando.id, form);
      } else {
        await pointService.criar(form);
      }
      fecharModal();
      carregarPoints();
    } catch (error: any) {
      console.error('Erro ao salvar point:', error);
      const mensagem =
        error?.response?.data?.mensagem ||
        error?.response?.data?.error ||
        error?.message ||
        'Erro ao salvar estabelecimento. Verifique os dados e tente novamente.';
      setErro(mensagem);
    } finally {
      setSalvando(false);
    }
  };

  const handleDeletar = async (id: string) => {
    if (!confirm('Tem certeza que deseja deletar este estabelecimento?')) return;

    try {
      await pointService.deletar(id);
      carregarPoints();
    } catch (error: any) {
      alert(error?.response?.data?.mensagem || 'Erro ao deletar estabelecimento');
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse bg-white rounded-xl shadow-lg p-8">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="h-32 bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Gerenciar Estabelecimentos</h1>
          <p className="text-gray-600">Administre os estabelecimentos e suas quadras</p>
        </div>
        <button
          onClick={() => abrirModal()}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
        >
          <Plus className="w-5 h-5" />
          Novo Estabelecimento
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        {points.length === 0 ? (
          <div className="text-center py-12">
            <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">Nenhum estabelecimento cadastrado</p>
            <button
              onClick={() => abrirModal()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Criar Primeiro Estabelecimento
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {points.map((point) => (
              <div
                key={point.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-gray-900 text-lg">{point.nome}</h3>
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                      point.ativo
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {point.ativo ? (
                      <>
                        <CheckCircle className="w-3 h-3" />
                        Ativo
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3 h-3" />
                        Inativo
                      </>
                    )}
                  </span>
                </div>

                {point.endereco && (
                  <p className="text-sm text-gray-600 mb-2 flex items-start gap-1">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    {point.endereco}
                  </p>
                )}

                {point.telefone && (
                  <p className="text-sm text-gray-600 mb-2 flex items-center gap-1">
                    <Phone className="w-4 h-4 text-gray-400" />
                    {point.telefone}
                  </p>
                )}

                {point.email && (
                  <p className="text-sm text-gray-600 mb-2 flex items-center gap-1">
                    <Mail className="w-4 h-4 text-gray-400" />
                    {point.email}
                  </p>
                )}

                {point.descricao && (
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{point.descricao}</p>
                )}

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => abrirModal(point)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
                  >
                    <Edit className="w-4 h-4" />
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeletar(point.id)}
                    className="flex items-center justify-center gap-2 px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {modalAberto && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl p-6 sm:p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {pointEditando ? 'Editar Estabelecimento' : 'Novo Estabelecimento'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nome *</label>
                <input
                  type="text"
                  value={form.nome}
                  onChange={(e) => setForm({ ...form, nome: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Endereço</label>
                <input
                  type="text"
                  value={form.endereco}
                  onChange={(e) => setForm({ ...form, endereco: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
                  <input
                    type="text"
                    value={form.telefone}
                    onChange={(e) => setForm({ ...form, telefone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
                <textarea
                  value={form.descricao}
                  onChange={(e) => setForm({ ...form, descricao: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="ativo"
                  checked={form.ativo}
                  onChange={(e) => setForm({ ...form, ativo: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <label htmlFor="ativo" className="text-sm font-medium text-gray-700">
                  Estabelecimento ativo
                </label>
              </div>

              {erro && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                  {erro}
                </div>
              )}

              <div className="flex gap-3 justify-end pt-4">
                <button
                  type="button"
                  onClick={fecharModal}
                  disabled={salvando}
                  className="px-6 py-3 bg-gray-200 rounded-lg hover:bg-gray-300 text-gray-800 font-medium transition-colors disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={salvando}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {salvando ? 'Salvando...' : 'Salvar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
