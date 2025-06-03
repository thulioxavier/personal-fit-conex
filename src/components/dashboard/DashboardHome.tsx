
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Dumbbell, TrendingUp, Activity, Plus, Eye, BarChart3, User, Play, Clock, Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

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
      title: 'Alunos Ativos',
      value: '15',
      subtitle: '5 novos este mês',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      trend: '+12%'
    },
    {
      title: 'Treinos Ativos',
      value: '8',
      subtitle: '3 atualizados hoje',
      icon: Dumbbell,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      trend: '+8%'
    },
    {
      title: 'Taxa de Conclusão',
      value: '92%',
      subtitle: 'Média dos últimos 30 dias',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      trend: '+5%'
    },
    {
      title: 'Exercícios',
      value: '45',
      subtitle: '12 categorias disponíveis',
      icon: Activity,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      trend: '+3'
    },
  ];

  const recentStudents = [
    { name: 'João Silva', lastSeen: '2 horas atrás', status: 'Ativo', progress: 85 },
    { name: 'Maria Santos', lastSeen: '1 dia atrás', status: 'Ativo', progress: 92 },
    { name: 'Carlos Lima', lastSeen: '3 dias atrás', status: 'Pendente', progress: 67 },
    { name: 'Ana Costa', lastSeen: '5 horas atrás', status: 'Ativo', progress: 78 },
  ];

  const quickActions = [
    { label: 'Adicionar Novo Aluno', icon: Plus, action: 'students', color: 'bg-blue-500 hover:bg-blue-600' },
    { label: 'Criar Novo Treino', icon: Dumbbell, action: 'workouts', color: 'bg-green-500 hover:bg-green-600' },
    { label: 'Ver Relatórios', icon: BarChart3, action: 'analytics', color: 'bg-purple-500 hover:bg-purple-600' },
    { label: 'Gerenciar Agenda', icon: Eye, action: 'schedule', color: 'bg-orange-500 hover:bg-orange-600' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Bem-vindo, {user.name}!</h1>
            <p className="text-white/90 text-lg">Aqui está um resumo do seu trabalho hoje</p>
          </div>
          <div className="mt-4 md:mt-0 text-right">
            <p className="text-white/90 text-sm">Hoje</p>
            <p className="text-2xl font-bold">{new Date().toLocaleDateString('pt-BR', { 
              weekday: 'long', 
              day: 'numeric', 
              month: 'long' 
            })}</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-14 h-14 ${stat.bgColor} rounded-2xl flex items-center justify-center`}>
                  <stat.icon className={`w-7 h-7 ${stat.color}`} />
                </div>
                <Badge variant="outline" className={`${stat.color} border-current`}>
                  {stat.trend}
                </Badge>
              </div>
              <h3 className="font-semibold text-gray-600 text-sm mb-1">{stat.title}</h3>
              <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.subtitle}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Students */}
        <Card className="lg:col-span-2 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl flex items-center justify-between">
              <span>Alunos Recentes</span>
              <Button variant="outline" size="sm">Ver Todos</Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentStudents.map((student, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:shadow-md transition-all duration-200">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center">
                      <User size={18} className="text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{student.name}</p>
                      <p className="text-sm text-gray-500">{student.lastSeen}</p>
                      <div className="w-24 h-2 bg-gray-200 rounded-full mt-1">
                        <div 
                          className="h-full bg-primary rounded-full transition-all duration-300"
                          style={{ width: `${student.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <Badge className={
                    student.status === 'Ativo' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }>
                    {student.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  className={`w-full justify-start h-14 text-left ${action.color} text-white shadow-lg hover:shadow-xl transition-all duration-200`}
                >
                  <action.icon size={20} className="mr-3" />
                  <span className="font-medium">{action.label}</span>
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
      progress: 0,
      nextExercise: 'Supino Reto'
    },
    {
      id: 2,
      name: 'Treino B - Costas, Bíceps',
      exercises: 6,
      duration: '40 min',
      difficulty: 'Intermediário',
      completed: true,
      progress: 100,
      lastCompleted: 'Ontem'
    },
    {
      id: 3,
      name: 'Treino C - Pernas, Glúteos',
      exercises: 10,
      duration: '50 min',
      difficulty: 'Avançado',
      completed: false,
      progress: 60,
      nextExercise: 'Agachamento Livre'
    },
    {
      id: 4,
      name: 'Treino D - Cardio e Core',
      exercises: 12,
      duration: '35 min',
      difficulty: 'Iniciante',
      completed: false,
      progress: 25,
      nextExercise: 'Esteira'
    },
  ];

  const weeklyStats = [
    { label: 'Treinos Realizados', value: '4/5', color: 'text-green-600' },
    { label: 'Tempo Total', value: '3h 20min', color: 'text-blue-600' },
    { label: 'Calorias Queimadas', value: '1,240', color: 'text-orange-600' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Olá, {user.name}!</h1>
            <p className="text-white/90 text-lg">Pronto para treinar hoje?</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-6">
            {weeklyStats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-white/80 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Meus Treinos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {myWorkouts.map((workout) => (
            <Card key={workout.id} className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg group">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-lg">
                      <Dumbbell size={24} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg leading-tight mb-2">{workout.name}</CardTitle>
                      <Badge className={
                        workout.completed 
                          ? 'bg-green-100 text-green-700' 
                          : workout.progress > 0
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700'
                      }>
                        {workout.completed ? 'Concluído' : workout.progress > 0 ? 'Em Andamento' : 'Não Iniciado'}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Activity size={16} className="text-gray-400" />
                    <span>{workout.exercises} exercícios</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock size={16} className="text-gray-400" />
                    <span>{workout.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Target size={16} className="text-gray-400" />
                    <span>{workout.difficulty}</span>
                  </div>
                  {workout.progress > 0 && !workout.completed && (
                    <div className="flex items-center space-x-2">
                      <Play size={16} className="text-gray-400" />
                      <span className="text-xs">{workout.nextExercise}</span>
                    </div>
                  )}
                </div>

                {/* Progress Bar */}
                {!workout.completed && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progresso</span>
                      <span className="font-medium">{workout.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-full bg-primary rounded-full transition-all duration-300"
                        style={{ width: `${workout.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                <Button 
                  className={`w-full transition-all duration-200 ${
                    workout.completed 
                      ? 'bg-green-500 hover:bg-green-600' 
                      : workout.progress > 0
                      ? 'bg-blue-500 hover:bg-blue-600'
                      : 'bg-primary hover:bg-primary/90'
                  } text-white shadow-lg`}
                >
                  {workout.completed ? 'Ver Detalhes' : workout.progress > 0 ? 'Continuar Treino' : 'Iniciar Treino'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
