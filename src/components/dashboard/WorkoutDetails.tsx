
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Clock, 
  Target, 
  Activity, 
  CheckCircle2, 
  Circle,
  Play,
  Pause,
  RotateCcw,
  Info,
  Video,
  Image as ImageIcon,
  Users,
  Calendar,
  Star
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';

interface Exercise {
  id: number;
  name: string;
  sets: number;
  reps: string;
  weight?: string;
  rest: string;
  notes?: string;
  completed?: boolean;
  description?: string;
  instructions?: string[];
  videoUrl?: string;
  imageUrl?: string;
  muscleGroups?: string[];
  difficulty?: 'Fácil' | 'Intermediário' | 'Avançado';
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
    category?: string;
    objectives?: string[];
    equipment?: string[];
    tips?: string[];
    warnings?: string[];
  };
  isOpen: boolean;
  onClose: () => void;
  isStudent?: boolean;
}

const WorkoutDetails = ({ workout, isOpen, onClose, isStudent = false }: WorkoutDetailsProps) => {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  if (!workout) return null;

  const completedExercises = workout.exercises?.filter(ex => ex.completed).length || 0;
  const progressPercentage = workout.exercises?.length > 0 
    ? Math.round((completedExercises / workout.exercises.length) * 100) 
    : 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white max-w-6xl max-h-[95vh] overflow-hidden p-0">
        {/* Header */}
        <div className="border-b border-gray-200 p-6 bg-gradient-to-r from-primary/5 to-primary/10">
          <DialogHeader>
            <div className="flex items-start gap-4">
              <Button variant="ghost" size="sm" onClick={onClose} className="shrink-0">
                <ArrowLeft size={18} />
              </Button>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <DialogTitle className="text-2xl font-bold text-gray-900 mb-2">
                      {workout.name}
                    </DialogTitle>
                    <p className="text-gray-600 mb-4">{workout.description}</p>
                    
                    {/* Quick Info Pills */}
                    <div className="flex flex-wrap gap-3">
                      <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm border">
                        <Clock size={16} className="text-primary" />
                        <span className="text-sm font-medium">{workout.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm border">
                        <Target size={16} className="text-primary" />
                        <span className="text-sm font-medium">{workout.difficulty}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm border">
                        <Activity size={16} className="text-primary" />
                        <span className="text-sm font-medium">{workout.totalExercises} exercícios</span>
                      </div>
                      {workout.category && (
                        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm border">
                          <Users size={16} className="text-primary" />
                          <span className="text-sm font-medium">{workout.category}</span>
                        </div>
                      )}
                      {isStudent && (
                        <div className="flex items-center gap-2 bg-primary/10 px-3 py-2 rounded-lg border border-primary/20">
                          <span className="text-sm font-medium text-primary">
                            {progressPercentage}% concluído
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {isStudent && (
                    <div className="shrink-0">
                      <Button className="bg-primary hover:bg-primary/90 text-white px-6">
                        <Play size={16} className="mr-2" />
                        {progressPercentage > 0 ? 'Continuar Treino' : 'Iniciar Treino'}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </DialogHeader>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
            <TabsList className="grid grid-cols-4 w-full mx-6 mt-4 bg-gray-100">
              <TabsTrigger value="overview" className="text-sm">Visão Geral</TabsTrigger>
              <TabsTrigger value="exercises" className="text-sm">Exercícios</TabsTrigger>
              <TabsTrigger value="instructions" className="text-sm">Instruções</TabsTrigger>
              <TabsTrigger value="progress" className="text-sm">Progresso</TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-y-auto p-6">
              <TabsContent value="overview" className="mt-0 space-y-6">
                {/* Progress Bar for Students */}
                {isStudent && workout.exercises && workout.exercises.length > 0 && (
                  <Card className="border-primary/20 bg-primary/5">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-3">
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
                    </CardContent>
                  </Card>
                )}

                {/* Objectives */}
                {workout.objectives && workout.objectives.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Target size={20} className="text-primary" />
                        Objetivos do Treino
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {workout.objectives.map((objective, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <Star size={16} className="text-yellow-500 mt-0.5 shrink-0" />
                            <span className="text-gray-700">{objective}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                {/* Equipment */}
                {workout.equipment && workout.equipment.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Activity size={20} className="text-primary" />
                        Equipamentos Necessários
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {workout.equipment.map((item, index) => (
                          <Badge key={index} variant="outline" className="px-3 py-1">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="exercises" className="mt-0 space-y-4">
                {workout.exercises && workout.exercises.length > 0 ? (
                  workout.exercises.map((exercise, index) => (
                    <Card 
                      key={exercise.id || index} 
                      className={`border transition-all cursor-pointer hover:shadow-md ${
                        selectedExercise?.id === exercise.id ? 'ring-2 ring-primary border-primary' : 'border-gray-200'
                      }`}
                      onClick={() => setSelectedExercise(selectedExercise?.id === exercise.id ? null : exercise)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
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
                            <div className="flex items-center gap-3 mb-3">
                              <span className="w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center text-sm font-bold">
                                {index + 1}
                              </span>
                              <h4 className="font-semibold text-gray-900 flex-1">{exercise.name}</h4>
                              <div className="flex items-center gap-2">
                                {exercise.videoUrl && (
                                  <div className="w-6 h-6 bg-red-100 rounded flex items-center justify-center">
                                    <Video size={14} className="text-red-600" />
                                  </div>
                                )}
                                {exercise.imageUrl && (
                                  <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
                                    <ImageIcon size={14} className="text-blue-600" />
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                              <div>
                                <span className="text-gray-500 block">Séries</span>
                                <p className="font-medium">{exercise.sets}</p>
                              </div>
                              <div>
                                <span className="text-gray-500 block">Repetições</span>
                                <p className="font-medium">{exercise.reps}</p>
                              </div>
                              {exercise.weight && (
                                <div>
                                  <span className="text-gray-500 block">Peso</span>
                                  <p className="font-medium">{exercise.weight}</p>
                                </div>
                              )}
                              <div>
                                <span className="text-gray-500 block">Descanso</span>
                                <p className="font-medium">{exercise.rest}</p>
                              </div>
                            </div>

                            {/* Expanded Details */}
                            {selectedExercise?.id === exercise.id && (
                              <div className="mt-4 pt-4 border-t border-gray-100 space-y-4">
                                {exercise.description && (
                                  <div>
                                    <h5 className="font-medium text-gray-900 mb-2">Descrição</h5>
                                    <p className="text-gray-700 text-sm">{exercise.description}</p>
                                  </div>
                                )}
                                
                                {exercise.instructions && exercise.instructions.length > 0 && (
                                  <div>
                                    <h5 className="font-medium text-gray-900 mb-2">Instruções</h5>
                                    <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
                                      {exercise.instructions.map((instruction, idx) => (
                                        <li key={idx}>{instruction}</li>
                                      ))}
                                    </ol>
                                  </div>
                                )}

                                {exercise.muscleGroups && exercise.muscleGroups.length > 0 && (
                                  <div>
                                    <h5 className="font-medium text-gray-900 mb-2">Grupos Musculares</h5>
                                    <div className="flex flex-wrap gap-2">
                                      {exercise.muscleGroups.map((muscle, idx) => (
                                        <Badge key={idx} variant="secondary" className="text-xs">
                                          {muscle}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {(exercise.videoUrl || exercise.imageUrl) && (
                                  <div>
                                    <h5 className="font-medium text-gray-900 mb-2">Mídia de Apoio</h5>
                                    <div className="flex gap-2">
                                      {exercise.videoUrl && (
                                        <Button variant="outline" size="sm">
                                          <Video size={16} className="mr-2" />
                                          Ver Vídeo
                                        </Button>
                                      )}
                                      {exercise.imageUrl && (
                                        <Button variant="outline" size="sm">
                                          <ImageIcon size={16} className="mr-2" />
                                          Ver Imagem
                                        </Button>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
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
                  <div className="text-center py-12">
                    <Activity size={48} className="mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600">Nenhum exercício cadastrado para este treino</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="instructions" className="mt-0 space-y-6">
                {/* Tips */}
                {workout.tips && workout.tips.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Info size={20} className="text-blue-500" />
                        Dicas Importantes
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {workout.tips.map((tip, index) => (
                          <li key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                              <span className="text-white text-xs font-bold">{index + 1}</span>
                            </div>
                            <span className="text-blue-800">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                {/* Warnings */}
                {workout.warnings && workout.warnings.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Info size={20} className="text-orange-500" />
                        Cuidados e Avisos
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {workout.warnings.map((warning, index) => (
                          <li key={index} className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                            <Info size={16} className="text-orange-500 mt-1 shrink-0" />
                            <span className="text-orange-800">{warning}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="progress" className="mt-0">
                {isStudent ? (
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Estatísticas do Treino</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="text-center p-4 bg-green-50 rounded-lg">
                            <div className="text-2xl font-bold text-green-600">{completedExercises}</div>
                            <div className="text-sm text-green-700">Exercícios Concluídos</div>
                          </div>
                          <div className="text-center p-4 bg-blue-50 rounded-lg">
                            <div className="text-2xl font-bold text-blue-600">{progressPercentage}%</div>
                            <div className="text-sm text-blue-700">Progresso Total</div>
                          </div>
                          <div className="text-center p-4 bg-orange-50 rounded-lg">
                            <div className="text-2xl font-bold text-orange-600">{workout.exercises?.length - completedExercises}</div>
                            <div className="text-sm text-orange-700">Exercícios Restantes</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600">Estatísticas de progresso disponíveis apenas para alunos</p>
                  </div>
                )}
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WorkoutDetails;
