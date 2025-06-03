
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Edit, Trash2, Dumbbell, Users, Calendar } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const WorkoutsManager = () => {
  const [workouts, setWorkouts] = useState([
    {
      id: 1,
      name: 'Treino A - Peito, Ombro, Tríceps',
      description: 'Treino focado no desenvolvimento da parte superior do corpo',
      exercises: 8,
      assignedStudents: 5,
      createdDate: '2024-01-15',
    },
    {
      id: 2,
      name: 'Treino B - Costas, Bíceps',
      description: 'Fortalecimento das costas e braços',
      exercises: 6,
      assignedStudents: 4,
      createdDate: '2024-01-20',
    },
    {
      id: 3,
      name: 'Treino C - Pernas, Glúteos',
      description: 'Treino completo para membros inferiores',
      exercises: 10,
      assignedStudents: 6,
      createdDate: '2024-02-01',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newWorkout, setNewWorkout] = useState({
    name: '',
    description: '',
  });

  const filteredWorkouts = workouts.filter(workout =>
    workout.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    workout.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddWorkout = () => {
    if (newWorkout.name && newWorkout.description) {
      setWorkouts([...workouts, {
        id: workouts.length + 1,
        ...newWorkout,
        exercises: 0,
        assignedStudents: 0,
        createdDate: new Date().toISOString().split('T')[0],
      }]);
      setNewWorkout({ name: '', description: '' });
      setIsAddDialogOpen(false);
    }
  };

  const handleDeleteWorkout = (id: number) => {
    setWorkouts(workouts.filter(workout => workout.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gerenciar Treinos</h1>
          <p className="text-gray-600">Crie e organize treinos para seus alunos</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-lime-400 hover:bg-lime-500 text-black">
              <Plus size={16} className="mr-2" />
              Criar Treino
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogTitle>Criar Novo Treino</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="workoutName">Nome do treino</Label>
                <Input
                  id="workoutName"
                  value={newWorkout.name}
                  onChange={(e) => setNewWorkout({...newWorkout, name: e.target.value})}
                  placeholder="Ex: Treino A - Peito, Ombro, Tríceps"
                />
              </div>
              <div>
                <Label htmlFor="workoutDescription">Descrição</Label>
                <Textarea
                  id="workoutDescription"
                  value={newWorkout.description}
                  onChange={(e) => setNewWorkout({...newWorkout, description: e.target.value})}
                  placeholder="Descreva o objetivo e foco do treino"
                  rows={3}
                />
              </div>
              <Button onClick={handleAddWorkout} className="w-full bg-lime-400 hover:bg-lime-500 text-black">
                Criar Treino
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Buscar treinos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Workouts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredWorkouts.map((workout) => (
          <Card key={workout.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 bg-lime-100 rounded-lg flex items-center justify-center">
                    <Dumbbell size={24} className="text-lime-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg leading-tight">{workout.name}</CardTitle>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{workout.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-center mb-1">
                    <Dumbbell size={16} className="text-gray-600" />
                  </div>
                  <p className="text-lg font-semibold">{workout.exercises}</p>
                  <p className="text-xs text-gray-600">Exercícios</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-center mb-1">
                    <Users size={16} className="text-gray-600" />
                  </div>
                  <p className="text-lg font-semibold">{workout.assignedStudents}</p>
                  <p className="text-xs text-gray-600">Alunos</p>
                </div>
              </div>

              <div className="flex items-center text-xs text-gray-500 mb-4">
                <Calendar size={12} className="mr-1" />
                Criado em {new Date(workout.createdDate).toLocaleDateString('pt-BR')}
              </div>

              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit size={14} className="mr-1" />
                  Editar
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleDeleteWorkout(workout.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredWorkouts.length === 0 && (
        <div className="text-center py-12">
          <Dumbbell size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum treino encontrado</h3>
          <p className="text-gray-600">
            {searchTerm ? 'Tente buscar com outros termos' : 'Comece criando seu primeiro treino'}
          </p>
        </div>
      )}
    </div>
  );
};

export default WorkoutsManager;
