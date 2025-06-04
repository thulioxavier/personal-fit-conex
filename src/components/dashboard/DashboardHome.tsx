import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Dumbbell, TrendingUp, Activity, Plus, Eye, BarChart3, User, Play, Clock, Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import WorkoutDetails from './WorkoutDetails';

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
  const [selectedWorkout, setSelectedWorkout] = useState<any>(null);
  const [isWorkoutDetailsOpen, setIsWorkoutDetailsOpen] = useState(false);

  const myWorkouts = [
    {
      id: 1,
      name: 'Treino A - Peito, Ombro, Tríceps',
      description: 'Treino focado no desenvolvimento da parte superior do corpo com ênfase em força e hipertrofia',
      totalExercises: 8,
      duration: '45 min',
      difficulty: 'Intermediário',
      completed: false,
      progress: 0,
      nextExercise: 'Supino Reto',
      category: 'Hipertrofia',
      objectives: [
        'Desenvolver força no peitoral',
        'Aumentar volume muscular dos ombros',
        'Fortalecer os tríceps',
        'Melhorar coordenação e estabilidade'
      ],
      equipment: ['Barra', 'Halteres', 'Banco', 'Polias'],
      tips: [
        'Mantenha a respiração controlada durante toda a execução',
        'Foque na contração muscular e não apenas no peso',
        'Respeite os intervalos de descanso para melhor recuperação',
        'Hidrate-se adequadamente entre as séries'
      ],
      warnings: [
        'Não execute movimentos com cargas excessivas sem supervisão',
        'Pare imediatamente se sentir dor articular',
        'Realize aquecimento adequado antes de iniciar'
      ],
      exercises: [
        { 
          id: 1, 
          name: 'Supino Reto', 
          sets: 4, 
          reps: '8-12', 
          weight: '80kg', 
          rest: '90s', 
          completed: false,
          description: 'Exercício fundamental para desenvolvimento do peitoral maior e menor',
          instructions: [
            'Deite-se no banco com os pés firmemente apoiados no chão',
            'Segure a barra com pegada um pouco mais larga que os ombros',
            'Desça a barra controladamente até tocar o peito',
            'Empurre a barra de volta à posição inicial',
            'Mantenha as escápulas retraídas durante todo o movimento'
          ],
          muscleGroups: ['Peitoral Maior', 'Deltóide Anterior', 'Tríceps'],
          difficulty: 'Intermediário',
          videoUrl: 'https://example.com/supino-reto-video',
          imageUrl: 'https://example.com/supino-reto-image'
        },
        { 
          id: 2, 
          name: 'Supino Inclinado', 
          sets: 3, 
          reps: '10-12', 
          weight: '70kg', 
          rest: '60s', 
          completed: false,
          description: 'Variação do supino que enfatiza a porção superior do peitoral',
          instructions: [
            'Ajuste o banco em inclinação de 30-45 graus',
            'Posicione-se com as costas bem apoiadas',
            'Segure a barra com pegada média',
            'Desça controladamente até a altura do peito superior',
            'Empurre a barra de volta mantendo a trajetória'
          ],
          muscleGroups: ['Peitoral Superior', 'Deltóide Anterior'],
          difficulty: 'Intermediário'
        },
        { 
          id: 3, 
          name: 'Desenvolvimento com Halteres', 
          sets: 3, 
          reps: '12-15', 
          weight: '20kg', 
          rest: '60s', 
          completed: false,
          description: 'Exercício para desenvolvimento completo dos deltóides',
          instructions: [
            'Sente-se no banco com as costas eretas',
            'Segure um halter em cada mão na altura dos ombros',
            'Empurre os halteres para cima até estender os braços',
            'Desça controladamente até a posição inicial',
            'Mantenha o core contraído durante todo o movimento'
          ],
          muscleGroups: ['Deltóide', 'Tríceps'],
          difficulty: 'Intermediário'
        },
        { 
          id: 4, 
          name: 'Elevação Lateral', 
          sets: 3, 
          reps: '12-15', 
          weight: '12kg', 
          rest: '45s', 
          completed: false,
          description: 'Exercício de isolamento para o deltóide médio',
          muscleGroups: ['Deltóide Médio'],
          difficulty: 'Fácil'
        },
        { 
          id: 5, 
          name: 'Tríceps Pulley', 
          sets: 3, 
          reps: '12-15', 
          rest: '45s', 
          completed: false,
          description: 'Exercício para isolamento e definição do tríceps',
          muscleGroups: ['Tríceps'],
          difficulty: 'Fácil'
        },
        { 
          id: 6, 
          name: 'Tríceps Francês', 
          sets: 3, 
          reps: '10-12', 
          weight: '30kg', 
          rest: '60s', 
          completed: false,
          description: 'Exercício para desenvolvimento da cabeça longa do tríceps',
          muscleGroups: ['Tríceps'],
          difficulty: 'Intermediário'
        },
        { 
          id: 7, 
          name: 'Flexão de Braço', 
          sets: 2, 
          reps: '15-20', 
          rest: '45s', 
          completed: false,
          description: 'Exercício funcional usando o peso corporal',
          muscleGroups: ['Peitoral', 'Tríceps', 'Core'],
          difficulty: 'Fácil'
        },
        { 
          id: 8, 
          name: 'Abdominal Supra', 
          sets: 3, 
          reps: '20', 
          rest: '30s', 
          completed: false,
          description: 'Exercício para fortalecimento do reto abdominal',
          muscleGroups: ['Reto Abdominal'],
          difficulty: 'Fácil'
        }
      ]
    },
    {
      id: 2,
      name: 'Treino B - Costas, Bíceps',
      description: 'Fortalecimento das costas e braços',
      totalExercises: 6,
      duration: '40 min',
      difficulty: 'Intermediário',
      completed: true,
      progress: 100,
      lastCompleted: 'Ontem',
      exercises: [
        { id: 1, name: 'Puxada Frontal', sets: 4, reps: '8-12', weight: '70kg', rest: '90s', completed: true },
        { id: 2, name: 'Remada Curvada', sets: 3, reps: '10-12', weight: '60kg', rest: '60s', completed: true },
        { id: 3, name: 'Pulley Costas', sets: 3, reps: '12-15', weight: '50kg', rest: '60s', completed: true },
        { id: 4, name: 'Rosca Direta', sets: 3, reps: '12-15', weight: '15kg', rest: '45s', completed: true },
        { id: 5, name: 'Rosca Martelo', sets: 3, reps: '12-15', weight: '12kg', rest: '45s', completed: true },
        { id: 6, name: 'Rosca Concentrada', sets: 2, reps: '12-15', weight: '10kg', rest: '45s', completed: true }
      ]
    },
    {
      id: 3,
      name: 'Treino C - Pernas, Glúteos',
      description: 'Treino completo para membros inferiores',
      totalExercises: 10,
      duration: '50 min',
      difficulty: 'Avançado',
      completed: false,
      progress: 60,
      nextExercise: 'Agachamento Livre',
      exercises: [
        { id: 1, name: 'Agachamento Livre', sets: 4, reps: '8-12', weight: '100kg', rest: '2min', completed: true },
        { id: 2, name: 'Leg Press', sets: 3, reps: '12-15', weight: '200kg', rest: '90s', completed: true },
        { id: 3, name: 'Stiff', sets: 3, reps: '10-12', weight: '60kg', rest: '60s', completed: true },
        { id: 4, name: 'Cadeira Extensora', sets: 3, reps: '12-15', weight: '50kg', rest: '45s', completed: true },
        { id: 5, name: 'Mesa Flexora', sets: 3, reps: '12-15', weight: '40kg', rest: '45s', completed: true },
        { id: 6, name: 'Elevação Pélvica', sets: 3, reps: '15-20', rest: '45s', completed: true },
        { id: 7, name: 'Panturrilha em Pé', sets: 4, reps: '15-20', weight: '80kg', rest: '45s', completed: false },
        { id: 8, name: 'Panturrilha Sentada', sets: 3, reps: '15-20', weight: '60kg', rest: '45s', completed: false },
        { id: 9, name: 'Abdução de Quadril', sets: 3, reps: '15-20', weight: '30kg', rest: '45s', completed: false },
        { id: 10, name: 'Prancha', sets: 3, reps: '30-60s', rest: '60s', completed: false }
      ]
    },
    {
      id: 4,
      name: 'Treino D - Cardio e Core',
      description: 'Treino cardiovascular e fortalecimento do core',
      totalExercises: 12,
      duration: '35 min',
      difficulty: 'Iniciante',
      completed: false,
      progress: 25,
      nextExercise: 'Esteira',
      exercises: [
        { id: 1, name: 'Esteira', sets: 1, reps: '10 min', rest: '0s', completed: true },
        { id: 2, name: 'Bicicleta Ergométrica', sets: 1, reps: '8 min', rest: '0s', completed: true },
        { id: 3, name: 'Elíptico', sets: 1, reps: '5 min', rest: '0s', completed: true },
        { id: 4, name: 'Abdominal Supra', sets: 3, reps: '20', rest: '30s', completed: false },
        { id: 5, name: 'Prancha Frontal', sets: 3, reps: '30s', rest: '30s', completed: false },
        { id: 6, name: 'Prancha Lateral', sets: 2, reps: '20s cada lado', rest: '30s', completed: false },
        { id: 7, name: 'Mountain Climber', sets: 3, reps: '20', rest: '30s', completed: false },
        { id: 8, name: 'Burpee', sets: 2, reps: '10', rest: '60s', completed: false },
        { id: 9, name: 'Jumping Jack', sets: 3, reps: '30s', rest: '30s', completed: false },
        { id: 10, name: 'Polichinelo', sets: 2, reps: '20', rest: '30s', completed: false },
        { id: 11, name: 'Agachamento Livre', sets: 3, reps: '15', rest: '45s', completed: false },
        { id: 12, name: 'Alongamento', sets: 1, reps: '5 min', rest: '0s', completed: false }
      ]
    },
  ];

  const weeklyStats = [
    { label: 'Treinos Realizados', value: '4/5', color: 'text-green-600' },
    { label: 'Tempo Total', value: '3h 20min', color: 'text-blue-600' },
    { label: 'Calorias Queimadas', value: '1,240', color: 'text-orange-600' },
  ];

  const handleViewWorkout = (workout: any) => {
    setSelectedWorkout(workout);
    setIsWorkoutDetailsOpen(true);
  };

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
                    <span>{workout.totalExercises} exercícios</span>
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

                <div className="flex gap-2">
                  <Button 
                    onClick={() => handleViewWorkout(workout)}
                    variant="outline"
                    className="flex-1"
                  >
                    <Eye size={16} className="mr-2" />
                    Ver Detalhes
                  </Button>
                  <Button 
                    className={`flex-1 transition-all duration-200 ${
                      workout.completed 
                        ? 'bg-green-500 hover:bg-green-600' 
                        : workout.progress > 0
                        ? 'bg-blue-500 hover:bg-blue-600'
                        : 'bg-primary hover:bg-primary/90'
                    } text-white shadow-lg`}
                    disabled={workout.completed}
                  >
                    {workout.completed ? 'Concluído' : workout.progress > 0 ? 'Continuar' : 'Iniciar'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Workout Details Modal */}
      <WorkoutDetails
        workout={selectedWorkout}
        isOpen={isWorkoutDetailsOpen}
        onClose={() => setIsWorkoutDetailsOpen(false)}
        isStudent={true}
      />
    </div>
  );
};

export default DashboardHome;
