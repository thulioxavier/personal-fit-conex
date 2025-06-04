import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Edit, Trash2, Dumbbell } from 'lucide-react';
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

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

      {/* Students Table */}
      <div className="bg-white rounded-lg border border-slate-200">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-200">
              <TableHead className="font-semibold text-slate-900">Nome</TableHead>
              <TableHead className="font-semibold text-slate-900">Email</TableHead>
              <TableHead className="font-semibold text-slate-900">Telefone</TableHead>
              <TableHead className="font-semibold text-slate-900">Status</TableHead>
              <TableHead className="font-semibold text-slate-900">Data de Cadastro</TableHead>
              <TableHead className="font-semibold text-slate-900">Treinos</TableHead>
              <TableHead className="font-semibold text-slate-900 text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.id} className="border-slate-100 hover:bg-slate-50">
                <TableCell className="font-medium text-slate-900">{student.name}</TableCell>
                <TableCell className="text-slate-600">{student.email}</TableCell>
                <TableCell className="text-slate-600">{student.phone}</TableCell>
                <TableCell>
                  <Badge className={
                    student.status === 'Ativo' 
                      ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100' 
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-100'
                  }>
                    {student.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-slate-600">
                  {new Date(student.joinDate).toLocaleDateString('pt-BR')}
                </TableCell>
                <TableCell>
                  {student.assignedWorkouts && student.assignedWorkouts.length > 0 ? (
                    <div className="space-y-1">
                      {student.assignedWorkouts.slice(0, 2).map((workout, index) => (
                        <div key={index} className="text-xs text-slate-600 bg-slate-100 px-2 py-1 rounded">
                          {workout.length > 25 ? workout.substring(0, 25) + '...' : workout}
                        </div>
                      ))}
                      {student.assignedWorkouts.length > 2 && (
                        <p className="text-xs text-slate-500">
                          +{student.assignedWorkouts.length - 2} mais
                        </p>
                      )}
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400">Nenhum treino</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm">
                      <Edit size={14} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleAssignWorkouts(student)}
                      className="text-primary hover:text-primary"
                    >
                      <Dumbbell size={14} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDeleteStudent(student.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-600">
              {searchTerm ? 'Nenhum aluno encontrado com esse termo' : 'Nenhum aluno cadastrado'}
            </p>
          </div>
        )}
      </div>

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
