
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User, Plus, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ScheduleViewProps {
  user: { id: string; name: string; email: string; type: 'personal' | 'student' };
}

const ScheduleView = ({ user }: ScheduleViewProps) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const personalSchedule = [
    {
      id: 1,
      time: '08:00',
      student: 'João Silva',
      type: 'Treino Individual',
      duration: '1h',
      location: 'Sala 1',
      status: 'confirmed'
    },
    {
      id: 2,
      time: '10:00',
      student: 'Maria Santos',
      type: 'Avaliação Física',
      duration: '45min',
      location: 'Sala 2',
      status: 'pending'
    },
    {
      id: 3,
      time: '14:00',
      student: 'Carlos Lima',
      type: 'Treino Individual',
      duration: '1h',
      location: 'Sala 1',
      status: 'confirmed'
    },
  ];

  const studentSchedule = [
    {
      id: 1,
      time: '08:00',
      trainer: 'Prof. Ana Costa',
      type: 'Treino A - Peito, Ombro, Tríceps',
      duration: '1h',
      location: 'Academia FitnessPro',
      status: 'confirmed'
    },
    {
      id: 2,
      time: '14:00',
      trainer: 'Prof. Ana Costa',
      type: 'Avaliação de Progresso',
      duration: '30min',
      location: 'Sala de Avaliação',
      status: 'pending'
    },
  ];

  const schedule = user.type === 'personal' ? personalSchedule : studentSchedule;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Agenda</h1>
          <p className="text-gray-600 mt-2">
            {user.type === 'personal' 
              ? 'Gerencie seus horários e atendimentos' 
              : 'Seus próximos treinos e compromissos'
            }
          </p>
        </div>
        {user.type === 'personal' && (
          <Button className="bg-primary hover:bg-primary/90">
            <Plus size={16} className="mr-2" />
            Novo Agendamento
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar */}
        <Card className="lg:col-span-1 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-primary" />
              <span>Calendário</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl">
              <p className="text-gray-500 text-center">
                Calendário interativo<br />será implementado
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Schedule List */}
        <Card className="lg:col-span-2 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-primary" />
                <span>Agenda de Hoje</span>
              </div>
              <Badge variant="outline" className="text-primary border-primary">
                {schedule.length} agendamentos
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {schedule.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-lg font-bold text-primary">{item.time}</p>
                      <p className="text-xs text-gray-500">{item.duration}</p>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.type}</h3>
                      <div className="flex items-center space-x-3 mt-1">
                        <div className="flex items-center space-x-1 text-sm text-gray-600">
                          <User size={14} />
                          <span>
                            {user.type === 'personal' ? item.student : item.trainer}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1 text-sm text-gray-600">
                          <MapPin size={14} />
                          <span>{item.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Badge className={getStatusColor(item.status)}>
                      {item.status === 'confirmed' ? 'Confirmado' : 
                       item.status === 'pending' ? 'Pendente' : 'Cancelado'}
                    </Badge>
                    
                    {user.type === 'personal' && (
                      <Button variant="outline" size="sm">
                        Editar
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ScheduleView;
