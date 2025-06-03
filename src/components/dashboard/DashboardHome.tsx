
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Dumbbell, TrendingUp, Plus, Eye } from 'lucide-react';

interface DashboardHomeProps {
  user: { id: string; name: string; email: string; type: 'personal' | 'student' };
}

const DashboardHome = ({ user }: DashboardHomeProps) => {
  if (user.type === 'student') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Meus Treinos</h1>
          <p className="text-gray-600">Acompanhe seu progresso e treinos</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Treino de Hoje</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">Treino A - Peito, Ombro, Tríceps</p>
              <Button className="w-full bg-lime-400 hover:bg-lime-500 text-black">
                Iniciar Treino
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Progresso Semanal</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-lime-600">4/5</p>
              <p className="text-sm text-gray-600">Treinos concluídos</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Próximo Treino</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-2">Treino B - Costas, Bíceps</p>
              <p className="text-xs text-gray-500">Amanhã, 08:00</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Visão geral da sua academia</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Eye size={16} className="mr-2" />
            Ver Catálogo
          </Button>
          <Button className="bg-lime-400 hover:bg-lime-500 text-black" size="sm">
            <Plus size={16} className="mr-2" />
            Novo Produto
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Alunos</p>
                <p className="text-2xl font-bold">15</p>
                <p className="text-xs text-lime-600">5 ativos</p>
              </div>
              <div className="w-12 h-12 bg-lime-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-lime-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Treinos Ativos</p>
                <p className="text-2xl font-bold">8</p>
                <p className="text-xs text-lime-600">3 pendentes</p>
              </div>
              <div className="w-12 h-12 bg-lime-100 rounded-lg flex items-center justify-center">
                <Dumbbell className="w-6 h-6 text-lime-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Taxa de Conclusão</p>
                <p className="text-2xl font-bold">87%</p>
                <p className="text-xs text-lime-600">Baseado em treinos concluídos</p>
              </div>
              <div className="w-12 h-12 bg-lime-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-lime-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Exercícios</p>
                <p className="text-2xl font-bold">45</p>
                <p className="text-xs text-lime-600">12 categorias</p>
              </div>
              <div className="w-12 h-12 bg-lime-100 rounded-lg flex items-center justify-center">
                <Plus className="w-6 h-6 text-lime-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Alunos Recentes</CardTitle>
            <p className="text-sm text-gray-600">Alunos cadastrados recentemente</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'João Silva', status: 'Ativo', date: '2 dias atrás' },
                { name: 'Maria Santos', status: 'Ativo', date: '3 dias atrás' },
                { name: 'Carlos Lima', status: 'Pendente', date: '5 dias atrás' },
              ].map((student, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-gray-600">{student.date}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    student.status === 'Ativo' 
                      ? 'bg-lime-100 text-lime-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {student.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
            <p className="text-sm text-gray-600">Acesso rápido às principais funcionalidades</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Plus size={16} className="mr-2" />
                Adicionar Novo Aluno
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Dumbbell size={16} className="mr-2" />
                Criar Novo Treino
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users size={16} className="mr-2" />
                Ver Todos os Alunos
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <TrendingUp size={16} className="mr-2" />
                Relatórios de Progresso
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardHome;
