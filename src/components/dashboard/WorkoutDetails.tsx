
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, Target, Activity, CheckCircle2, Circle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Exercise {
  id: number;
  name: string;
  sets: number;
  reps: string;
  weight?: string;
  rest: string;
  notes?: string;
  completed?: boolean;
}

interface WorkoutDetailsProps {
  workout: {
    id: number;
    name: string;
    description: string;
    duration: string;
    difficulty: string;
    exercises: Exercise[];
    totalExercises: number;
  };
  isOpen: boolean;
  onClose: () => void;
  isStudent?: boolean;
}

const WorkoutDetails = ({ workout, isOpen, onClose, isStudent = false }: WorkoutDetailsProps) => {
  if (!workout) return null;

  const completedExercises = workout.exercises?.filter(ex => ex.completed).length || 0;
  const progressPercentage = workout.exercises?.length > 0 
    ? Math.round((completedExercises / workout.exercises.length) * 100) 
    : 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onClose}>
              <ArrowLeft size={18} />
            </Button>
            <div className="flex-1">
              <DialogTitle className="text-2xl font-bold text-gray-900">{workout.name}</DialogTitle>
              <p className="text-gray-600 mt-1">{workout.description}</p>
            </div>
          </div>
          
          {/* Workout Info */}
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
              <Clock size={16} className="text-gray-500" />
              <span className="text-sm font-medium">{workout.duration}</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
              <Target size={16} className="text-gray-500" />
              <span className="text-sm font-medium">{workout.difficulty}</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
              <Activity size={16} className="text-gray-500" />
              <span className="text-sm font-medium">{workout.totalExercises} exercícios</span>
            </div>
            {isStudent && (
              <div className="flex items-center gap-2 bg-primary/10 px-3 py-2 rounded-lg">
                <span className="text-sm font-medium text-primary">
                  {progressPercentage}% concluído
                </span>
              </div>
            )}
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Bar for Students */}
          {isStudent && workout.exercises && workout.exercises.length > 0 && (
            <div className="bg-gray-50 p-4 rounded-xl">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-gray-900">Progresso do Treino</h3>
                <span className="text-sm text-gray-600">
                  {completedExercises} de {workout.exercises.length} exercícios
                </span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          )}

          {/* Exercises List */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Exercícios</h3>
            <div className="space-y-4">
              {workout.exercises && workout.exercises.length > 0 ? (
                workout.exercises.map((exercise, index) => (
                  <Card key={exercise.id || index} className="border border-gray-200 hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          {isStudent && (
                            <div className="mt-1">
                              {exercise.completed ? (
                                <CheckCircle2 size={20} className="text-green-500" />
                              ) : (
                                <Circle size={20} className="text-gray-300" />
                              )}
                            </div>
                          )}
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center text-sm font-bold">
                                {index + 1}
                              </span>
                              <h4 className="font-semibold text-gray-900">{exercise.name}</h4>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <span className="text-gray-500">Séries:</span>
                                <p className="font-medium">{exercise.sets}</p>
                              </div>
                              <div>
                                <span className="text-gray-500">Repetições:</span>
                                <p className="font-medium">{exercise.reps}</p>
                              </div>
                              {exercise.weight && (
                                <div>
                                  <span className="text-gray-500">Peso:</span>
                                  <p className="font-medium">{exercise.weight}</p>
                                </div>
                              )}
                              <div>
                                <span className="text-gray-500">Descanso:</span>
                                <p className="font-medium">{exercise.rest}</p>
                              </div>
                            </div>
                            
                            {exercise.notes && (
                              <div className="mt-3 p-3 bg-yellow-50 rounded-lg">
                                <p className="text-sm text-yellow-800">
                                  <strong>Observações:</strong> {exercise.notes}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {exercise.completed && (
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                            Concluído
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8">
                  <Activity size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600">Nenhum exercício cadastrado para este treino</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WorkoutDetails;
