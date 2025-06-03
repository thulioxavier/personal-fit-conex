
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, X, Search, Dumbbell } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';

interface Exercise {
  id: number;
  name: string;
  category: string;
  description: string;
  sets?: string;
  rest?: string;
}

interface WorkoutBuilderProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (workout: any) => void;
}

const WorkoutBuilder = ({ isOpen, onClose, onSave }: WorkoutBuilderProps) => {
  const [workoutName, setWorkoutName] = useState('');
  const [workoutDescription, setWorkoutDescription] = useState('');
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
  const [showExerciseDialog, setShowExerciseDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Exercícios disponíveis
  const availableExercises: Exercise[] = [
    {
      id: 1,
      name: 'Supino Reto',
      category: 'Peito',
      description: 'Exercício básico para desenvolvimento do peitoral maior',
    },
    {
      id: 2,
      name: 'Agachamento',
      category: 'Pernas',
      description: 'Exercício fundamental para quadríceps e glúteos',
    },
    {
      id: 3,
      name: 'Puxada Frontal',
      category: 'Costas',
      description: 'Exercício para desenvolvimento do latíssimo do dorso',
    },
    {
      id: 4,
      name: 'Desenvolvimento Ombros',
      category: 'Ombros',
      description: 'Fortalecimento dos deltoides',
    },
    {
      id: 5,
      name: 'Rosca Direta',
      category: 'Braços',
      description: 'Exercício para bíceps',
    },
  ];

  const filteredExercises = availableExercises.filter(exercise =>
    exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exercise.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddExercise = (exercise: Exercise) => {
    if (!selectedExercises.find(ex => ex.id === exercise.id)) {
      setSelectedExercises([...selectedExercises, { ...exercise, sets: '3x12', rest: '60s' }]);
    }
  };

  const handleRemoveExercise = (exerciseId: number) => {
    setSelectedExercises(selectedExercises.filter(ex => ex.id !== exerciseId));
  };

  const handleUpdateExercise = (exerciseId: number, field: string, value: string) => {
    setSelectedExercises(selectedExercises.map(ex => 
      ex.id === exerciseId ? { ...ex, [field]: value } : ex
    ));
  };

  const handleSaveWorkout = () => {
    if (workoutName && selectedExercises.length > 0) {
      onSave({
        name: workoutName,
        description: workoutDescription,
        exercises: selectedExercises,
      });
      // Reset form
      setWorkoutName('');
      setWorkoutDescription('');
      setSelectedExercises([]);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Construir Novo Treino</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Informações básicas do treino */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="workoutName">Nome do treino</Label>
              <Input
                id="workoutName"
                value={workoutName}
                onChange={(e) => setWorkoutName(e.target.value)}
                placeholder="Ex: Treino A - Peito, Ombro, Tríceps"
              />
            </div>
            <div>
              <Label htmlFor="workoutDescription">Descrição</Label>
              <Textarea
                id="workoutDescription"
                value={workoutDescription}
                onChange={(e) => setWorkoutDescription(e.target.value)}
                placeholder="Descreva o objetivo e foco do treino"
                rows={3}
              />
            </div>
          </div>

          {/* Exercícios selecionados */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <Label className="text-lg font-medium">Exercícios do Treino</Label>
              <Button 
                onClick={() => setShowExerciseDialog(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                <Plus size={16} className="mr-2" />
                Adicionar Exercício
              </Button>
            </div>

            {selectedExercises.length === 0 ? (
              <Card className="p-8 text-center border-dashed">
                <Dumbbell size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600">Nenhum exercício adicionado ainda</p>
                <p className="text-sm text-gray-500">Clique em "Adicionar Exercício" para começar</p>
              </Card>
            ) : (
              <div className="space-y-3">
                {selectedExercises.map((exercise, index) => (
                  <Card key={exercise.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="font-medium text-gray-900">{index + 1}.</span>
                            <h4 className="font-medium">{exercise.name}</h4>
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                              {exercise.category}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 mt-3">
                            <div>
                              <Label className="text-xs">Séries x Repetições</Label>
                              <Input
                                value={exercise.sets}
                                onChange={(e) => handleUpdateExercise(exercise.id, 'sets', e.target.value)}
                                placeholder="3x12"
                                className="h-8"
                              />
                            </div>
                            <div>
                              <Label className="text-xs">Descanso</Label>
                              <Input
                                value={exercise.rest}
                                onChange={(e) => handleUpdateExercise(exercise.id, 'rest', e.target.value)}
                                placeholder="60s"
                                className="h-8"
                              />
                            </div>
                          </div>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveExercise(exercise.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X size={16} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Botões de ação */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button 
              onClick={handleSaveWorkout}
              className="bg-blue-500 hover:bg-blue-600 text-white"
              disabled={!workoutName || selectedExercises.length === 0}
            >
              Salvar Treino
            </Button>
          </div>
        </div>

        {/* Dialog para adicionar exercícios */}
        <Dialog open={showExerciseDialog} onOpenChange={setShowExerciseDialog}>
          <DialogContent className="bg-white max-w-2xl">
            <DialogHeader>
              <DialogTitle>Adicionar Exercícios</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Buscar exercícios..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="max-h-64 overflow-y-auto space-y-2">
                {filteredExercises.map((exercise) => (
                  <div
                    key={exercise.id}
                    className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50"
                  >
                    <Checkbox
                      checked={selectedExercises.some(ex => ex.id === exercise.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          handleAddExercise(exercise);
                        } else {
                          handleRemoveExercise(exercise.id);
                        }
                      }}
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{exercise.name}</h4>
                      <p className="text-sm text-gray-600">{exercise.description}</p>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded mt-1 inline-block">
                        {exercise.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end">
                <Button onClick={() => setShowExerciseDialog(false)}>
                  Concluir
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </DialogContent>
    </Dialog>
  );
};

export default WorkoutBuilder;
