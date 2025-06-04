import { 
  Users, 
  Dumbbell, 
  Activity, 
  Zap,
  Plus,
  Clock,
  Play
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface DashboardHomeProps {
  userType: 'personal' | 'student';
  onSectionChange: (section: string) => void;
}

const DashboardHome = ({ userType, onSectionChange }: DashboardHomeProps) => {
  const [students] = useState([
    { id: 1, name: 'João Silva', email: 'joao@email.com' },
    { id: 2, name: 'Maria Santos', email: 'maria@email.com' },
    { id: 3, name: 'Carlos Lima', email: 'carlos@email.com' },
    { id: 4, name: 'Ana Costa', email: 'ana@email.com' },
  ]);

  const [mockWorkouts] = useState([
    { id: 1, name: 'Treino A - Peito, Ombro, Tríceps', duration: '45-60 min', exercises: 8 },
    { id: 2, name: 'Treino B - Costas, Bíceps', duration: '50-65 min', exercises: 6 },
    { id: 3, name: 'Treino C - Pernas, Glúteos', duration: '60-75 min', exercises: 10 },
  ]);

  const [studentWorkouts] = useState([
    { id: 1, name: 'Treino A - Peito, Ombro, Tríceps', duration: '45-60 min', exercises: 8 },
    { id: 2, name: 'Treino B - Costas, Bíceps', duration: '50-65 min', exercises: 6 },
  ]);

  const [isWorkoutModalOpen, setIsWorkoutModalOpen] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState<any>(null);

  if (userType === 'personal') {
    return (
      <div className="space-y-8 animate-slide-in-up">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="modern-card metric-card border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-gray-600 uppercase tracking-wider">Total de Alunos</p>
                  <p className="text-4xl font-black text-gray-900">{students.length}</p>
                </div>
                <div className="icon-container bg-blue-100 text-blue-600 rounded-sm">
                  <Users size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="modern-card metric-card border-l-4 border-l-green-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-gray-600 uppercase tracking-wider">Treinos Criados</p>
                  <p className="text-4xl font-black text-gray-900">{mockWorkouts.length}</p>
                </div>
                <div className="icon-container bg-green-100 text-green-600 rounded-sm">
                  <Dumbbell size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="modern-card metric-card border-l-4 border-l-purple-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-gray-600 uppercase tracking-wider">Exercícios</p>
                  <p className="text-4xl font-black text-gray-900">24</p>
                </div>
                <div className="icon-container bg-purple-100 text-purple-600 rounded-sm">
                  <Activity size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="modern-card">
          <CardHeader className="border-b-2 border-gray-100">
            <CardTitle className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
                <Zap size={18} className="text-white" />
              </div>
              Ações Rápidas
            </CardTitle>
            <CardDescription>Acesse rapidamente as principais funcionalidades</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                onClick={() => onSectionChange('students')}
                className="h-16 text-left justify-start bg-blue-500 hover:bg-blue-600 shadow-lg"
              >
                <Plus size={20} className="mr-3" />
                <div>
                  <div className="font-bold">Novo Aluno</div>
                  <div className="text-xs opacity-90 normal-case">Cadastrar aluno</div>
                </div>
              </Button>
              
              <Button 
                onClick={() => onSectionChange('workouts')}
                className="h-16 text-left justify-start bg-green-500 hover:bg-green-600 shadow-lg"
              >
                <Plus size={20} className="mr-3" />
                <div>
                  <div className="font-bold">Novo Treino</div>
                  <div className="text-xs opacity-90 normal-case">Criar treino</div>
                </div>
              </Button>
              
              <Button 
                onClick={() => onSectionChange('exercises')}
                className="h-16 text-left justify-start bg-purple-500 hover:bg-purple-600 shadow-lg"
              >
                <Plus size={20} className="mr-3" />
                <div>
                  <div className="font-bold">Novo Exercício</div>
                  <div className="text-xs opacity-90 normal-case">Cadastrar exercício</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="modern-card">
          <CardHeader className="border-b-2 border-gray-100">
            <CardTitle className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-800 rounded-sm flex items-center justify-center">
                <Clock size={18} className="text-white" />
              </div>
              Atividade Recente
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {[
                { action: 'Novo aluno cadastrado', name: 'João Silva', time: '2 min atrás', type: 'user' },
                { action: 'Treino criado', name: 'Treino A - Peito/Ombro', time: '15 min atrás', type: 'workout' },
                { action: 'Exercício adicionado', name: 'Supino Inclinado', time: '1 hora atrás', type: 'exercise' },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-sm border-l-4 border-l-primary">
                  <div className={`w-10 h-10 rounded-sm flex items-center justify-center ${
                    item.type === 'user' ? 'bg-blue-100 text-blue-600' :
                    item.type === 'workout' ? 'bg-green-100 text-green-600' :
                    'bg-purple-100 text-purple-600'
                  }`}>
                    {item.type === 'user' ? <Users size={16} /> :
                     item.type === 'workout' ? <Dumbbell size={16} /> :
                     <Activity size={16} />}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900">{item.action}</p>
                    <p className="text-sm text-gray-600">{item.name}</p>
                  </div>
                  <p className="text-xs text-gray-500 font-medium">{item.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Student view
  return (
    <div className="space-y-8 animate-slide-in-up">
      {/* Welcome Card */}
      <Card className="modern-card-gradient">
        <CardContent className="p-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary rounded-sm flex items-center justify-center">
              <Dumbbell size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-gray-900">Bem-vindo de volta!</h1>
              <p className="text-gray-600 font-medium">Pronto para o próximo treino?</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Workout Status */}
      <Card className="modern-card border-l-4 border-l-green-500">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Próximo Treino</h3>
              <p className="text-2xl font-black text-green-600 mt-1">Treino A - Peito, Ombro, Tríceps</p>
              <p className="text-sm text-gray-600 font-medium mt-2">Hoje • 45-60 min</p>
            </div>
            <Button size="lg" className="bg-green-500 hover:bg-green-600 shadow-lg">
              <Play size={20} className="mr-2" />
              Iniciar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Meus Treinos */}
      <Card className="modern-card">
        <CardHeader className="border-b-2 border-gray-100">
          <CardTitle className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
              <Dumbbell size={18} className="text-white" />
            </div>
            Meus Treinos
          </CardTitle>
          <CardDescription>Seus treinos atribuídos pelo personal trainer</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-4">
            {studentWorkouts.map((workout) => (
              <div
                key={workout.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-sm border-2 border-gray-100 hover:border-primary/20 transition-all duration-200 hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary rounded-sm flex items-center justify-center">
                    <Dumbbell size={20} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{workout.name}</h4>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-sm text-gray-600 font-medium">
                        <Clock size={14} className="inline mr-1" />
                        {workout.duration}
                      </span>
                      <span className="text-sm text-gray-600 font-medium">
                        <Activity size={14} className="inline mr-1" />
                        {workout.exercises} exercícios
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setSelectedWorkout(workout);
                      setIsWorkoutModalOpen(true);
                    }}
                    className="border-2"
                  >
                    Ver Detalhes
                  </Button>
                  <Button size="sm" className="bg-green-500 hover:bg-green-600">
                    <Play size={16} className="mr-1" />
                    Iniciar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Workout Details Modal */}
      <Dialog open={isWorkoutModalOpen} onOpenChange={setIsWorkoutModalOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>{selectedWorkout?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Detalhes do treino {selectedWorkout?.name}:
            </p>
            {selectedWorkout && (
              <div>
                <p>Duração: {selectedWorkout.duration}</p>
                <p>Exercícios: {selectedWorkout.exercises}</p>
                {/* Adicione mais detalhes conforme necessário */}
              </div>
            )}
            <Button onClick={() => setIsWorkoutModalOpen(false)}>Fechar</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DashboardHome;
