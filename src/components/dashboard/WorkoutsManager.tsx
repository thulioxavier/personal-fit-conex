
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Edit, Trash2, Users, Play } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import WorkoutBuilder from './WorkoutBuilder';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';

const WorkoutsManager = () => {
  const [workouts, setWorkouts] = useState([
    {
      id: 1,
      name: 'Treino A - Peito, Ombro, Tríceps',
      description: 'Treino focado no desenvolvimento da parte superior do corpo',
      exercises: 8,
      assignedStudents: 5,
      createdDate: '2024-01-15',
      duration: '45-60 min',
      difficulty: 'Intermediário',
    },
    {
      id: 2,
      name: 'Treino B - Costas, Bíceps',
      description: 'Fortalecimento das costas e braços',
      exercises: 6,
      assignedStudents: 4,
      createdDate: '2024-01-20',
      duration: '50-65 min',
      difficulty: 'Intermediário',
    },
    {
      id: 3,
      name: 'Treino C - Pernas, Glúteos',
      description: 'Treino completo para membros inferiores',
      exercises: 10,
      assignedStudents: 6,
      createdDate: '2024-02-01',
      duration: '60-75 min',
      difficulty: 'Avançado',
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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Fácil':
        return 'bg-green-100 text-green-700 hover:bg-green-100';
      case 'Intermediário':
        return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100';
      case 'Avançado':
        return 'bg-red-100 text-red-700 hover:bg-red-100';
      default:
        return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
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
      <div className="relative max-w-md">
        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Buscar treinos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Workouts Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-200">
              <TableHead className="font-semibold text-gray-900">Nome do Treino</TableHead>
              <TableHead className="font-semibold text-gray-900">Descrição</TableHead>
              <TableHead className="font-semibold text-gray-900">Duração</TableHead>
              <TableHead className="font-semibold text-gray-900">Dificuldade</TableHead>
              <TableHead className="font-semibold text-gray-900">Exercícios</TableHead>
              <TableHead className="font-semibold text-gray-900">Alunos</TableHead>
              <TableHead className="font-semibold text-gray-900">Criado em</TableHead>
              <TableHead className="font-semibold text-gray-900 text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredWorkouts.map((workout) => (
              <TableRow key={workout.id} className="border-gray-100 hover:bg-gray-50">
                <TableCell className="font-medium text-gray-900">{workout.name}</TableCell>
                <TableCell className="text-gray-600 max-w-xs">
                  <div className="truncate" title={workout.description}>
                    {workout.description}
                  </div>
                </TableCell>
                <TableCell className="text-gray-600">{workout.duration}</TableCell>
                <TableCell>
                  <Badge className={getDifficultyColor(workout.difficulty)}>
                    {workout.difficulty}
                  </Badge>
                </TableCell>
                <TableCell className="text-gray-600">{workout.exercises}</TableCell>
                <TableCell className="text-gray-600">{workout.assignedStudents}</TableCell>
                <TableCell className="text-gray-600">
                  {new Date(workout.createdDate).toLocaleDateString('pt-BR')}
                </TableCell>
                <TableCell>
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm">
                      <Edit size={14} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleAssignWorkout(workout)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Users size={14} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-green-600 hover:text-green-700"
                    >
                      <Play size={14} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDeleteWorkout(workout.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredWorkouts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">
              {searchTerm ? 'Nenhum treino encontrado com esse termo' : 'Nenhum treino cadastrado'}
            </p>
          </div>
        )}
      </div>

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
                  <Checkbox
                    checked={selectedStudents.includes(student.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedStudents([...selectedStudents, student.id]);
                      } else {
                        setSelectedStudents(selectedStudents.filter(id => id !== student.id));
                      }
                    }}
                  />
                  <label className="flex-1 cursor-pointer">
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
