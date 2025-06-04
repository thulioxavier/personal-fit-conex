
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Edit, Trash2, Play, Link } from 'lucide-react';
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
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const ExercisesManager = () => {
  const [exercises, setExercises] = useState([
    {
      id: 1,
      name: 'Supino Reto',
      category: 'Peito',
      description: 'Exercício básico para desenvolvimento do peitoral maior',
      videoUrl: 'https://youtube.com/watch?v=example1',
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

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Peito': 'bg-blue-100 text-blue-700 hover:bg-blue-100',
      'Costas': 'bg-green-100 text-green-700 hover:bg-green-100',
      'Pernas': 'bg-purple-100 text-purple-700 hover:bg-purple-100',
      'Ombros': 'bg-orange-100 text-orange-700 hover:bg-orange-100',
      'Braços': 'bg-red-100 text-red-700 hover:bg-red-100',
      'Abdômen': 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100',
      'Cardio': 'bg-pink-100 text-pink-700 hover:bg-pink-100',
    };
    return colors[category] || 'bg-gray-100 text-gray-700 hover:bg-gray-100';
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

      {/* Exercises Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-200">
              <TableHead className="font-semibold text-gray-900">Nome</TableHead>
              <TableHead className="font-semibold text-gray-900">Categoria</TableHead>
              <TableHead className="font-semibold text-gray-900">Descrição</TableHead>
              <TableHead className="font-semibold text-gray-900">Séries</TableHead>
              <TableHead className="font-semibold text-gray-900">Descanso</TableHead>
              <TableHead className="font-semibold text-gray-900">Vídeo</TableHead>
              <TableHead className="font-semibold text-gray-900 text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredExercises.map((exercise) => (
              <TableRow key={exercise.id} className="border-gray-100 hover:bg-gray-50">
                <TableCell className="font-medium text-gray-900">{exercise.name}</TableCell>
                <TableCell>
                  <Badge className={getCategoryColor(exercise.category)}>
                    {exercise.category}
                  </Badge>
                </TableCell>
                <TableCell className="text-gray-600 max-w-xs">
                  <div className="truncate" title={exercise.description}>
                    {exercise.description}
                  </div>
                </TableCell>
                <TableCell className="text-gray-600">{exercise.sets}</TableCell>
                <TableCell className="text-gray-600">{exercise.rest}</TableCell>
                <TableCell>
                  {exercise.videoUrl ? (
                    <div className="flex items-center text-sm text-blue-600">
                      <Play size={14} className="mr-1" />
                      <span>Disponível</span>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-400">Não disponível</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm">
                      <Edit size={14} />
                    </Button>
                    {exercise.videoUrl && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Play size={14} />
                      </Button>
                    )}
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDeleteExercise(exercise.id)}
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

        {filteredExercises.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">
              {searchTerm || selectedCategory !== 'all' 
                ? 'Nenhum exercício encontrado com os filtros aplicados' 
                : 'Nenhum exercício cadastrado'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExercisesManager;
