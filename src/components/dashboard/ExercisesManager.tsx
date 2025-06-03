import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Edit, Trash2, Activity, Upload, Link, Play } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ExercisesManager = () => {
  const [exercises, setExercises] = useState([
    {
      id: 1,
      name: 'Supino Reto',
      category: 'Peito',
      description: 'Exercício básico para desenvolvimento do peitoral maior',
      videoUrl: 'https://youtube.com/watch?v=example1',
      imageUrl: '/placeholder.svg',
      instructions: 'Deite no banco, segure a barra com pegada pronada...',
      sets: '4x12',
      rest: '60-90s',
    },
    {
      id: 2,
      name: 'Agachamento',
      category: 'Pernas',
      description: 'Exercício fundamental para quadríceps e glúteos',
      videoUrl: 'https://youtube.com/watch?v=example2',
      imageUrl: '/placeholder.svg',
      instructions: 'Fique em pé, pés na largura dos ombros...',
      sets: '4x15',
      rest: '90s',
    },
    {
      id: 3,
      name: 'Puxada Frontal',
      category: 'Costas',
      description: 'Exercício para desenvolvimento do latíssimo do dorso',
      videoUrl: '',
      imageUrl: '/placeholder.svg',
      instructions: 'Sente no equipamento, segure a barra...',
      sets: '3x12',
      rest: '60s',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newExercise, setNewExercise] = useState({
    name: '',
    category: '',
    description: '',
    videoUrl: '',
    instructions: '',
    sets: '',
    rest: '',
  });

  const categories = ['Peito', 'Costas', 'Pernas', 'Ombros', 'Braços', 'Abdômen', 'Cardio'];

  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercise.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || exercise.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddExercise = () => {
    if (newExercise.name && newExercise.category && newExercise.description) {
      setExercises([...exercises, {
        id: exercises.length + 1,
        ...newExercise,
        imageUrl: '/placeholder.svg',
      }]);
      setNewExercise({
        name: '',
        category: '',
        description: '',
        videoUrl: '',
        instructions: '',
        sets: '',
        rest: '',
      });
      setIsAddDialogOpen(false);
    }
  };

  const handleDeleteExercise = (id: number) => {
    setExercises(exercises.filter(exercise => exercise.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Biblioteca de Exercícios</h1>
          <p className="text-gray-600">Gerencie seus exercícios com vídeos e instruções</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white">
              <Plus size={16} className="mr-2" />
              Adicionar Exercício
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Exercício</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="exerciseName">Nome do exercício</Label>
                  <Input
                    id="exerciseName"
                    value={newExercise.name}
                    onChange={(e) => setNewExercise({...newExercise, name: e.target.value})}
                    placeholder="Ex: Supino Reto"
                  />
                </div>
                <div>
                  <Label htmlFor="exerciseCategory">Categoria</Label>
                  <Select onValueChange={(value) => setNewExercise({...newExercise, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="exerciseDescription">Descrição</Label>
                <Textarea
                  id="exerciseDescription"
                  value={newExercise.description}
                  onChange={(e) => setNewExercise({...newExercise, description: e.target.value})}
                  placeholder="Breve descrição do exercício"
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="exerciseInstructions">Instruções de execução</Label>
                <Textarea
                  id="exerciseInstructions"
                  value={newExercise.instructions}
                  onChange={(e) => setNewExercise({...newExercise, instructions: e.target.value})}
                  placeholder="Descreva como executar o exercício corretamente"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="exerciseSets">Séries e repetições</Label>
                  <Input
                    id="exerciseSets"
                    value={newExercise.sets}
                    onChange={(e) => setNewExercise({...newExercise, sets: e.target.value})}
                    placeholder="Ex: 4x12"
                  />
                </div>
                <div>
                  <Label htmlFor="exerciseRest">Tempo de descanso</Label>
                  <Input
                    id="exerciseRest"
                    value={newExercise.rest}
                    onChange={(e) => setNewExercise({...newExercise, rest: e.target.value})}
                    placeholder="Ex: 60-90s"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="exerciseVideo">URL do vídeo (opcional)</Label>
                <div className="flex space-x-2">
                  <Input
                    id="exerciseVideo"
                    value={newExercise.videoUrl}
                    onChange={(e) => setNewExercise({...newExercise, videoUrl: e.target.value})}
                    placeholder="https://youtube.com/watch?v=..."
                    className="flex-1"
                  />
                  <Button variant="outline" size="sm">
                    <Link size={16} />
                  </Button>
                </div>
              </div>

              <div>
                <Label>Imagem do exercício (opcional)</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload size={24} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 mb-2">Clique para fazer upload ou arraste uma imagem</p>
                  <Button variant="outline" size="sm">
                    Selecionar arquivo
                  </Button>
                </div>
              </div>

              <Button onClick={handleAddExercise} className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                Adicionar Exercício
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Buscar exercícios..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Todas as categorias" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="all">Todas as categorias</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Exercises Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredExercises.map((exercise) => (
          <Card key={exercise.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Activity size={24} className="text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg leading-tight">{exercise.name}</CardTitle>
                    <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full mt-1">
                      {exercise.category}
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{exercise.description}</p>
              
              <div className="space-y-2 text-sm mb-4">
                {exercise.sets && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Séries:</span>
                    <span className="font-medium">{exercise.sets}</span>
                  </div>
                )}
                {exercise.rest && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Descanso:</span>
                    <span className="font-medium">{exercise.rest}</span>
                  </div>
                )}
              </div>

              {exercise.videoUrl && (
                <div className="flex items-center text-sm text-blue-600 mb-3">
                  <Play size={14} className="mr-1" />
                  <span>Vídeo disponível</span>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit size={14} className="mr-1" />
                  Editar
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleDeleteExercise(exercise.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredExercises.length === 0 && (
        <div className="text-center py-12">
          <Activity size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum exercício encontrado</h3>
          <p className="text-gray-600">
            {searchTerm || selectedCategory !== 'all' 
              ? 'Tente ajustar os filtros de busca' 
              : 'Comece adicionando seu primeiro exercício'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default ExercisesManager;
