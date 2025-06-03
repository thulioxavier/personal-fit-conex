
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Edit, Trash2, Dumbbell, Users, Calendar, User } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import WorkoutBuilder from './WorkoutBuilder';

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

  const [students] = useState([
    { id: 1, name: 'João Silva', email: 'joao@email.com' },
    { id: 2, name: 'Maria Santos', email: 'maria@email.com' },
    { id: 3, name: 'Carlos Lima', email: 'carlos@email.com' },
    { id: 4, name: 'Ana Costa', email: 'ana@email.com' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState<any>(null);
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);

  const filteredWorkouts = workouts.filter(workout =>
    workout.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    workout.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveWorkout = (newWorkout: any) => {
    setWorkouts([...workouts, {
      id: workouts.length + 1,
      ...newWorkout,
      exercises: newWorkout.exercises.length,
      assignedStudents: 0,
      createdDate: new Date().toISOString().split('T')[0],
    }]);
  };

  const handleDeleteWorkout = (id: number) => {
    setWorkouts(workouts.filter(workout => workout.id !== id));
  };

  const handleAssignWorkout = (workout: any) => {
    setSelectedWorkout(workout);
    setIsAssignDialogOpen(true);
  };

  const handleConfirmAssignment = () => {
    if (selectedWorkout && selectedStudents.length > 0) {
      console.log(`Atribuindo treino ${selectedWorkout.name} para ${selectedStudents.length} alunos`);
      setIsAssignDialogOpen(false);
      setSelectedStudents([]);
      setSelectedWorkout(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gerenciar Treinos</h1>
          <p className="text-gray-600">Crie e organize treinos para seus alunos</p>
        </div>
        
        <Button 
          onClick={() => setIsBuilderOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          <Plus size={16} className="mr-2" />
          Criar Treino
        </Button>
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
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Dumbbell size={24} className="text-blue-600" />
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
                  onClick={() => handleAssignWorkout(workout)}
                  className="text-blue-600 hover:text-blue-700"
                >
                  <User size={14} className="mr-1" />
                  Atribuir
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

      {/* Workout Builder */}
      <WorkoutBuilder
        isOpen={isBuilderOpen}
        onClose={() => setIsBuilderOpen(false)}
        onSave={handleSaveWorkout}
      />

      {/* Assign Workout Dialog */}
      <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Atribuir Treino: {selectedWorkout?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">Selecione os alunos para atribuir este treino:</p>
            
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {students.map((student) => (
                <div key={student.id} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded">
                  <input
                    type="checkbox"
                    id={`student-${student.id}`}
                    checked={selectedStudents.includes(student.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedStudents([...selectedStudents, student.id]);
                      } else {
                        setSelectedStudents(selectedStudents.filter(id => id !== student.id));
                      }
                    }}
                    className="rounded border-gray-300"
                  />
                  <label htmlFor={`student-${student.id}`} className="flex-1 cursor-pointer">
                    <div className="font-medium">{student.name}</div>
                    <div className="text-sm text-gray-500">{student.email}</div>
                  </label>
                </div>
              ))}
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsAssignDialogOpen(false)}>
                Cancelar
              </Button>
              <Button 
                onClick={handleConfirmAssignment}
                className="bg-blue-500 hover:bg-blue-600 text-white"
                disabled={selectedStudents.length === 0}
              >
                Atribuir ({selectedStudents.length})
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WorkoutsManager;
