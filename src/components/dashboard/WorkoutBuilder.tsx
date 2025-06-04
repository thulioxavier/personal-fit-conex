
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, X, Search, Dumbbell, GripVertical } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';

interface Exercise {
  id: number;
  name: string;
  category: string;
  description: string;
  sets?: string;
  rest?: string;
  reps?: string;
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
    { id: 1, name: 'Supino Reto', category: 'Peito', description: 'Exercício básico para desenvolvimento do peitoral maior' },
    { id: 2, name: 'Agachamento', category: 'Pernas', description: 'Exercício fundamental para quadríceps e glúteos' },
    { id: 3, name: 'Puxada Frontal', category: 'Costas', description: 'Exercício para desenvolvimento do latíssimo do dorso' },
    { id: 4, name: 'Desenvolvimento Ombros', category: 'Ombros', description: 'Fortalecimento dos deltoides' },
    { id: 5, name: 'Rosca Direta', category: 'Braços', description: 'Exercício para bíceps' },
    { id: 6, name: 'Leg Press', category: 'Pernas', description: 'Exercício para quadríceps e glúteos' },
    { id: 7, name: 'Remada Curvada', category: 'Costas', description: 'Fortalecimento das costas' },
    { id: 8, name: 'Tríceps Testa', category: 'Braços', description: 'Exercício para tríceps' },
  ];

  const filteredExercises = availableExercises.filter(exercise =>
    exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exercise.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddExercise = (exercise: Exercise) => {
    if (!selectedExercises.find(ex => ex.id === exercise.id)) {
      setSelectedExercises([...selectedExercises, { 
        ...exercise, 
        sets: '3', 
        reps: '12',
        rest: '60s' 
      }]);
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

  const handleClose = () => {
    setWorkoutName('');
    setWorkoutDescription('');
    setSelectedExercises([]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white max-w-5xl max-h-[90vh] overflow-hidden">
        <DialogHeader className="pb-4 border-b">
          <DialogTitle className="text-xl font-semibold">Criar Novo Treino</DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto space-y-6 p-1">
          {/* Informações básicas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="workoutName" className="text-sm font-medium">Nome do treino</Label>
              <Input
                id="workoutName"
                value={workoutName}
                onChange={(e) => setWorkoutName(e.target.value)}
                placeholder="Ex: Treino A - Peito, Ombro, Tríceps"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="workoutDescription" className="text-sm font-medium">Descrição</Label>
              <Textarea
                id="workoutDescription"
                value={workoutDescription}
                onChange={(e) => setWorkoutDescription(e.target.value)}
                placeholder="Objetivo do treino"
                rows={2}
                className="mt-1"
              />
            </div>
          </div>

          {/* Exercícios selecionados */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium">Exercícios do Treino</h3>
                <p className="text-sm text-slate-500">{selectedExercises.length} exercícios adicionados</p>
              </div>
              <Button 
                onClick={() => setShowExerciseDialog(true)}
                className="bg-primary hover:bg-primary/90"
              >
                <Plus size={16} className="mr-2" />
                Adicionar Exercício
              </Button>
            </div>

            {selectedExercises.length === 0 ? (
              <Card className="p-8 text-center border-dashed border-2">
                <Dumbbell size={48} className="mx-auto text-slate-400 mb-4" />
                <p className="text-slate-600 font-medium">Nenhum exercício adicionado</p>
                <p className="text-sm text-slate-500">Comece adicionando exercícios ao seu treino</p>
              </Card>
            ) : (
              <div className="space-y-3">
                {selectedExercises.map((exercise, index) => (
                  <Card key={exercise.id} className="border border-slate-200">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="flex items-center gap-2">
                          <GripVertical size={16} className="text-slate-400" />
                          <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-medium">
                            {index + 1}
                          </span>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-medium text-slate-900">{exercise.name}</h4>
                              <Badge variant="outline" className="mt-1">
                                {exercise.category}
                              </Badge>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveExercise(exercise.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <X size={16} />
                            </Button>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-3">
                            <div>
                              <Label className="text-xs font-medium text-slate-600">Séries</Label>
                              <Input
                                value={exercise.sets}
                                onChange={(e) => handleUpdateExercise(exercise.id, 'sets', e.target.value)}
                                placeholder="3"
                                className="h-8 mt-1"
                              />
                            </div>
                            <div>
                              <Label className="text-xs font-medium text-slate-600">Repetições</Label>
                              <Input
                                value={exercise.reps}
                                onChange={(e) => handleUpdateExercise(exercise.id, 'reps', e.target.value)}
                                placeholder="12"
                                className="h-8 mt-1"
                              />
                            </div>
                            <div>
                              <Label className="text-xs font-medium text-slate-600">Descanso</Label>
                              <Input
                                value={exercise.rest}
                                onChange={(e) => handleUpdateExercise(exercise.id, 'rest', e.target.value)}
                                placeholder="60s"
                                className="h-8 mt-1"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Botões de ação */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={handleClose}>
            Cancelar
          </Button>
          <Button 
            onClick={handleSaveWorkout}
            className="bg-primary hover:bg-primary/90"
            disabled={!workoutName || selectedExercises.length === 0}
          >
            Salvar Treino
          </Button>
        </div>

        {/* Dialog para adicionar exercícios */}
        <Dialog open={showExerciseDialog} onOpenChange={setShowExerciseDialog}>
          <DialogContent className="bg-white max-w-3xl max-h-[80vh]">
            <DialogHeader>
              <DialogTitle>Adicionar Exercícios</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <Input
                  placeholder="Buscar exercícios..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>

              <div className="max-h-96 overflow-y-auto space-y-2">
                {filteredExercises.map((exercise) => (
                  <div
                    key={exercise.id}
                    className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
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
                      <h4 className="font-medium text-slate-900">{exercise.name}</h4>
                      <p className="text-sm text-slate-600">{exercise.description}</p>
                      <Badge variant="outline" className="mt-1">
                        {exercise.category}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end">
                <Button onClick={() => setShowExerciseDialog(false)}>
                  Finalizar Seleção
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
