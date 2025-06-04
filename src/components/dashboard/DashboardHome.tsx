
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Dumbbell, Activity, Plus, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import WorkoutDetails from './WorkoutDetails';
import { useState } from 'react';

interface DashboardHomeProps {
  user: { id: string; name: string; email: string; type: 'personal' | 'student' };
}

const DashboardHome = ({ user }: DashboardHomeProps) => {
  const [selectedWorkout, setSelectedWorkout] = useState<any>(null);
  const [isWorkoutDetailsOpen, setIsWorkoutDetailsOpen] = useState(false);

  // Mock data - would come from API
  const stats = {
    students: 15,
    workouts: 8,
    exercises: 25
  };

  const studentWorkouts = [
    {
      id: 1,
      name: 'Treino A - Peito e Tríceps',
      description: 'Treino focado no desenvolvimento da parte superior',
      duration: '45-60 min',
      difficulty: 'Intermediário',
      totalExercises: 6,
      completedExercises: 4,
      assignedDate: '2024-01-15',
      lastCompleted: '2024-01-18',
      exercises: [
        {
          id: 1,
          name: 'Supino Reto',
          sets: 4,
          reps: '10-12',
          weight: '70kg',
          rest: '90s',
          completed: true,
          description: 'Exercício fundamental para o peitoral maior',
          instructions: [
            'Deite no banco com os pés apoiados no chão',
            'Segure a barra com pegada pronada na largura dos ombros',
            'Desça a barra até o peito de forma controlada',
            'Empurre a barra para cima até a extensão completa dos braços'
          ],
          muscleGroups: ['Peitoral Maior', 'Tríceps', 'Deltóide Anterior'],
          videoUrl: 'https://youtube.com/watch?v=example'
        },
        {
          id: 2,
          name: 'Tríceps Pulley',
          sets: 3,
          reps: '12-15',
          weight: '40kg',
          rest: '60s',
          completed: true,
          description: 'Isolamento do tríceps com cabo',
          instructions: [
            'Fique em pé de frente para o pulley',
            'Segure a barra com pegada pronada',
            'Mantenha os cotovelos fixos ao lado do corpo',
            'Estenda os braços completamente para baixo'
          ],
          muscleGroups: ['Tríceps'],
          videoUrl: 'https://youtube.com/watch?v=example2'
        }
      ],
      objectives: ['Desenvolver força no peito', 'Aumentar massa muscular do tríceps'],
      equipment: ['Banco', 'Barra', 'Anilhas', 'Pulley'],
      tips: [
        'Mantenha sempre a postura correta',
        'Controle o movimento na fase excêntrica',
        'Respire corretamente durante o exercício'
      ],
      warnings: [
        'Não faça movimentos bruscos',
        'Pare se sentir dor nas articulações'
      ]
    },
    {
      id: 2,
      name: 'Treino B - Costas e Bíceps',
      description: 'Fortalecimento das costas e braços',
      duration: '50-65 min',
      difficulty: 'Intermediário',
      totalExercises: 5,
      completedExercises: 2,
      assignedDate: '2024-01-16',
      lastCompleted: '2024-01-19',
      exercises: [
        {
          id: 3,
          name: 'Puxada Frontal',
          sets: 4,
          reps: '8-10',
          weight: '60kg',
          rest: '90s',
          completed: true,
          description: 'Exercício para latíssimo do dorso',
          instructions: [
            'Sente no equipamento com as coxas fixas',
            'Segure a barra com pegada pronada ampla',
            'Puxe a barra até a altura do peito',
            'Retorne de forma controlada'
          ],
          muscleGroups: ['Latíssimo do Dorso', 'Bíceps', 'Romboides']
        }
      ],
      objectives: ['Desenvolver largura das costas', 'Fortalecer bíceps'],
      equipment: ['Pulley Alto', 'Banco'],
      tips: ['Concentre-se na contração das costas', 'Evite usar o impulso'],
      warnings: ['Não force além do limite', 'Mantenha a coluna ereta']
    }
  ];

  const handleViewWorkout = (workout: any) => {
    setSelectedWorkout(workout);
    setIsWorkoutDetailsOpen(true);
  };

  if (user.type === 'personal') {
    return (
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Visão geral dos seus dados</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-blue-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600 mb-1">Total de Alunos</p>
                  <p className="text-3xl font-bold text-blue-700">{stats.students}</p>
                </div>
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Users size={24} className="text-white" />
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full mt-4 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              >
                <Plus size={16} className="mr-2" />
                Adicionar Aluno
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-gradient-to-br from-emerald-50 to-emerald-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-emerald-600 mb-1">Treinos Criados</p>
                  <p className="text-3xl font-bold text-emerald-700">{stats.workouts}</p>
                </div>
                <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center">
                  <Dumbbell size={24} className="text-white" />
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full mt-4 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
              >
                <Plus size={16} className="mr-2" />
                Criar Treino
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-gradient-to-br from-orange-50 to-orange-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-600 mb-1">Exercícios</p>
                  <p className="text-3xl font-bold text-orange-700">{stats.exercises}</p>
                </div>
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                  <Activity size={24} className="text-white" />
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full mt-4 text-orange-600 hover:text-orange-700 hover:bg-orange-50"
              >
                <Plus size={16} className="mr-2" />
                Adicionar Exercício
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Gerenciar Alunos</h3>
                  <p className="text-sm text-gray-600">Visualize e edite informações dos alunos</p>
                </div>
                <ArrowRight size={20} className="text-gray-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Biblioteca de Treinos</h3>
                  <p className="text-sm text-gray-600">Crie e organize seus treinos</p>
                </div>
                <ArrowRight size={20} className="text-gray-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Exercícios</h3>
                  <p className="text-sm text-gray-600">Gerencie sua biblioteca de exercícios</p>
                </div>
                <ArrowRight size={20} className="text-gray-400" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Student view
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Meus Treinos</h1>
        <p className="text-gray-600">Acompanhe seu progresso e execute seus treinos</p>
      </div>

      {/* Student Workouts */}
      <div className="space-y-4">
        {studentWorkouts.map((workout) => {
          const progressPercentage = Math.round((workout.completedExercises / workout.totalExercises) * 100);
          
          return (
            <Card key={workout.id} className="border border-gray-200 hover:shadow-md transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{workout.name}</h3>
                      <Badge variant={progressPercentage === 100 ? "default" : "secondary"} className="text-xs">
                        {progressPercentage === 100 ? 'Concluído' : 'Em andamento'}
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-3">{workout.description}</p>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <Activity size={14} />
                        {workout.totalExercises} exercícios
                      </span>
                      <span>{workout.duration}</span>
                      <span>{workout.difficulty}</span>
                      <span>Atribuído em {new Date(workout.assignedDate).toLocaleDateString('pt-BR')}</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Progresso</span>
                        <span className="text-sm text-gray-600">
                          {workout.completedExercises}/{workout.totalExercises} exercícios
                        </span>
                      </div>
                      <div className="w-full h-3 bg-gray-200 rounded-full">
                        <div 
                          className={`h-full rounded-full transition-all duration-300 ${
                            progressPercentage === 100 ? 'bg-green-500' : 'bg-blue-500'
                          }`}
                          style={{ width: `${progressPercentage}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{progressPercentage}% concluído</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button 
                    onClick={() => handleViewWorkout(workout)}
                    variant="outline" 
                    size="sm"
                    className="flex-1"
                  >
                    Ver Detalhes
                  </Button>
                  <Button 
                    size="sm"
                    className={`flex-1 ${
                      progressPercentage === 100 
                        ? 'bg-green-600 hover:bg-green-700' 
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    {progressPercentage === 100 ? 'Refazer Treino' : progressPercentage > 0 ? 'Continuar' : 'Iniciar Treino'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Workout Details Modal */}
      <WorkoutDetails
        workout={selectedWorkout}
        isOpen={isWorkoutDetailsOpen}
        onClose={() => {
          setIsWorkoutDetailsOpen(false);
          setSelectedWorkout(null);
        }}
        isStudent={true}
      />
    </div>
  );
};

export default DashboardHome;
