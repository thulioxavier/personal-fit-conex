
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Dumbbell, TrendingUp, Activity, Plus, Eye, BarChart3, User } from 'lucide-react';

interface DashboardHomeProps {
  user: { id: string; name: string; email: string; type: 'personal' | 'student' };
}

const DashboardHome = ({ user }: DashboardHomeProps) => {
  if (user.type === 'student') {
    return <StudentDashboard user={user} />;
  }

  return <PersonalDashboard user={user} />;
};

const PersonalDashboard = ({ user }: { user: any }) => {
  const stats = [
    {
      title: 'Total de Alunos',
      value: '15',
      subtitle: '5 ativos',
      icon: Users,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      title: 'Treinos Ativos',
      value: '8',
      subtitle: '3 pendentes',
      icon: Dumbbell,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      title: 'Taxa de Conclusão',
      value: '87%',
      subtitle: 'Baseado em treinos concluídos',
      icon: TrendingUp,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      title: 'Exercícios',
      value: '45',
      subtitle: '12 categorias',
      icon: Activity,
      color: 'bg-blue-100 text-blue-600',
    },
  ];

  const recentStudents = [
    { name: 'João Silva', days: '2 dias atrás', status: 'Ativo' },
    { name: 'Maria Santos', days: '3 dias atrás', status: 'Ativo' },
    { name: 'Carlos Lima', days: '5 dias atrás', status: 'Pendente' },
  ];

  const quickActions = [
    { label: 'Adicionar Novo Aluno', icon: Plus, action: 'students' },
    { label: 'Criar Novo Treino', icon: Dumbbell, action: 'workouts' },
    { label: 'Ver Todos os Alunos', icon: Users, action: 'students' },
    { label: 'Relatórios de Progresso', icon: BarChart3, action: 'reports' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Visão geral da sua academia</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50">
            <Eye size={16} className="mr-2" />
            Ver Catálogo
          </Button>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white">
            <Plus size={16} className="mr-2" />
            Novo Produto
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className="text-sm text-gray-500 mt-1">{stat.subtitle}</p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Students */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Alunos Recentes</CardTitle>
            <p className="text-sm text-gray-600">Alunos cadastrados recentemente</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentStudents.map((student, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User size={16} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{student.name}</p>
                      <p className="text-sm text-gray-500">{student.days}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    student.status === 'Ativo' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {student.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Ações Rápidas</CardTitle>
            <p className="text-sm text-gray-600">Acesso rápido às principais funcionalidades</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start h-auto py-3 text-left hover:bg-blue-50"
                >
                  <action.icon size={18} className="mr-3 text-blue-600" />
                  <span className="text-gray-700">{action.label}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const StudentDashboard = ({ user }: { user: any }) => {
  const myWorkouts = [
    {
      id: 1,
      name: 'Treino A - Peito, Ombro, Tríceps',
      exercises: 8,
      duration: '45 min',
      difficulty: 'Intermediário',
      completed: false,
    },
    {
      id: 2,
      name: 'Treino B - Costas, Bíceps',
      exercises: 6,
      duration: '40 min',
      difficulty: 'Intermediário',
      completed: true,
    },
    {
      id: 3,
      name: 'Treino C - Pernas, Glúteos',
      exercises: 10,
      duration: '50 min',
      difficulty: 'Avançado',
      completed: false,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Meus Treinos</h1>
        <p className="text-gray-600">Seus treinos disponíveis</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {myWorkouts.map((workout) => (
          <Card key={workout.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Dumbbell size={24} className="text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg leading-tight">{workout.name}</CardTitle>
                    <span className={`inline-block px-2 py-1 text-xs rounded-full mt-1 ${
                      workout.completed 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {workout.completed ? 'Concluído' : 'Pendente'}
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Exercícios:</span>
                  <span className="font-medium">{workout.exercises}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duração:</span>
                  <span className="font-medium">{workout.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Dificuldade:</span>
                  <span className="font-medium">{workout.difficulty}</span>
                </div>
              </div>

              <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                Ver Detalhes
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardHome;
