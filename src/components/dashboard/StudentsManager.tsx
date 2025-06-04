
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Edit, Trash2, User, Dumbbell, Calendar } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';

const StudentsManager = () => {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: 'João Silva',
      email: 'joao@email.com',
      phone: '(11) 99999-9999',
      status: 'Ativo',
      joinDate: '2024-01-15',
      assignedWorkouts: ['Treino A - Peito, Ombro, Tríceps'],
    },
    {
      id: 2,
      name: 'Maria Santos',
      email: 'maria@email.com',
      phone: '(11) 88888-8888',
      status: 'Ativo',
      joinDate: '2024-02-10',
      assignedWorkouts: ['Treino B - Costas, Bíceps', 'Treino C - Pernas'],
    },
    {
      id: 3,
      name: 'Carlos Lima',
      email: 'carlos@email.com',
      phone: '(11) 77777-7777',
      status: 'Inativo',
      joinDate: '2024-01-20',
      assignedWorkouts: [],
    },
  ]);

  const [availableWorkouts] = useState([
    { id: 1, name: 'Treino A - Peito, Ombro, Tríceps' },
    { id: 2, name: 'Treino B - Costas, Bíceps' },
    { id: 3, name: 'Treino C - Pernas, Glúteos' },
    { id: 4, name: 'Treino D - Cardio e Core' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isAssignWorkoutOpen, setIsAssignWorkoutOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [selectedWorkouts, setSelectedWorkouts] = useState<string[]>([]);
  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddStudent = () => {
    if (newStudent.name && newStudent.email) {
      setStudents([...students, {
        id: students.length + 1,
        ...newStudent,
        status: 'Ativo',
        joinDate: new Date().toISOString().split('T')[0],
        assignedWorkouts: [],
      }]);
      setNewStudent({ name: '', email: '', phone: '' });
      setIsAddDialogOpen(false);
    }
  };

  const handleDeleteStudent = (id: number) => {
    setStudents(students.filter(student => student.id !== id));
  };

  const handleAssignWorkouts = (student: any) => {
    setSelectedStudent(student);
    setSelectedWorkouts(student.assignedWorkouts || []);
    setIsAssignWorkoutOpen(true);
  };

  const handleSaveWorkoutAssignment = () => {
    if (selectedStudent) {
      setStudents(students.map(student => 
        student.id === selectedStudent.id 
          ? { ...student, assignedWorkouts: selectedWorkouts }
          : student
      ));
      setIsAssignWorkoutOpen(false);
      setSelectedStudent(null);
      setSelectedWorkouts([]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Gerenciar Alunos</h1>
          <p className="text-slate-600">Adicione e gerencie seus alunos</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus size={16} className="mr-2" />
              Adicionar Aluno
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Aluno</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nome completo</Label>
                <Input
                  id="name"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                  placeholder="Nome do aluno"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newStudent.email}
                  onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                  placeholder="email@exemplo.com"
                />
              </div>
              <div>
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  value={newStudent.phone}
                  onChange={(e) => setNewStudent({...newStudent, phone: e.target.value})}
                  placeholder="(11) 99999-9999"
                />
              </div>
              <Button onClick={handleAddStudent} className="w-full bg-primary hover:bg-primary/90">
                Adicionar Aluno
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
        <Input
          placeholder="Buscar alunos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map((student) => (
          <Card key={student.id} className="hover:shadow-lg transition-all duration-200 border-slate-200">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <User size={24} className="text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-slate-900">{student.name}</CardTitle>
                    <p className="text-sm text-slate-600">{student.email}</p>
                  </div>
                </div>
                <Badge className={
                  student.status === 'Ativo' 
                    ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100' 
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-100'
                }>
                  {student.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-slate-600">
                  <span className="font-medium">Telefone:</span>
                  <span>{student.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Calendar size={14} />
                  <span>Desde {new Date(student.joinDate).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>

              {/* Treinos Atribuídos */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Dumbbell size={14} className="text-primary" />
                  <span className="text-sm font-medium">Treinos Atribuídos</span>
                </div>
                {student.assignedWorkouts && student.assignedWorkouts.length > 0 ? (
                  <div className="space-y-1">
                    {student.assignedWorkouts.slice(0, 2).map((workout, index) => (
                      <Badge key={index} variant="outline" className="text-xs block">
                        {workout}
                      </Badge>
                    ))}
                    {student.assignedWorkouts.length > 2 && (
                      <p className="text-xs text-slate-500">
                        +{student.assignedWorkouts.length - 2} mais
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500">Nenhum treino atribuído</p>
                )}
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit size={14} className="mr-1" />
                  Editar
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleAssignWorkouts(student)}
                  className="flex-1 text-primary hover:text-primary"
                >
                  <Dumbbell size={14} className="mr-1" />
                  Treinos
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleDeleteStudent(student.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <div className="text-center py-12">
          <User size={48} className="mx-auto text-slate-400 mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">Nenhum aluno encontrado</h3>
          <p className="text-slate-600">
            {searchTerm ? 'Tente buscar com outros termos' : 'Comece adicionando seu primeiro aluno'}
          </p>
        </div>
      )}

      {/* Dialog para Atribuir Treinos */}
      <Dialog open={isAssignWorkoutOpen} onOpenChange={setIsAssignWorkoutOpen}>
        <DialogContent className="bg-white max-w-2xl">
          <DialogHeader>
            <DialogTitle>Atribuir Treinos - {selectedStudent?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-slate-600">
              Selecione os treinos que deseja atribuir a este aluno:
            </p>
            
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {availableWorkouts.map((workout) => (
                <div key={workout.id} className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50">
                  <Checkbox
                    checked={selectedWorkouts.includes(workout.name)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedWorkouts([...selectedWorkouts, workout.name]);
                      } else {
                        setSelectedWorkouts(selectedWorkouts.filter(w => w !== workout.name));
                      }
                    }}
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-slate-900">{workout.name}</h4>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsAssignWorkoutOpen(false)}>
                Cancelar
              </Button>
              <Button 
                onClick={handleSaveWorkoutAssignment}
                className="bg-primary hover:bg-primary/90"
              >
                Salvar Atribuições
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentsManager;
