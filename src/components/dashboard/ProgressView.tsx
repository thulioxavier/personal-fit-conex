
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Target, Award, Calendar } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface ProgressViewProps {
  user: { id: string; name: string; email: string; type: 'personal' | 'student' };
}

const ProgressView = ({ user }: ProgressViewProps) => {
  const progressStats = [
    {
      title: 'Treinos Concluídos',
      current: 28,
      target: 30,
      unit: 'treinos',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      icon: Target,
    },
    {
      title: 'Peso Perdido',
      current: 3.5,
      target: 5,
      unit: 'kg',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      icon: TrendingUp,
    },
    {
      title: 'Conquistas',
      current: 12,
      target: 15,
      unit: 'badges',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      icon: Award,
    },
    {
      title: 'Dias Ativos',
      current: 22,
      target: 25,
      unit: 'dias',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      icon: Calendar,
    },
  ];

  const achievements = [
    { title: 'Primeira Semana', description: 'Complete 7 dias consecutivos', earned: true },
    { title: 'Força Superior', description: 'Aumente 50% na carga do supino', earned: true },
    { title: 'Resistência', description: 'Complete 30 min de cardio', earned: false },
    { title: 'Dedicação', description: 'Complete 30 treinos', earned: false },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Meu Progresso</h1>
        <p className="text-gray-600 mt-2">Acompanhe sua evolução e conquistas</p>
      </div>

      {/* Progress Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {progressStats.map((stat, index) => (
          <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.current}/{stat.target}
                  </p>
                  <p className="text-xs text-gray-500">{stat.unit}</p>
                </div>
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-2">{stat.title}</h3>
              <Progress 
                value={(stat.current / stat.target) * 100} 
                className="h-2"
              />
              <p className="text-xs text-gray-500 mt-1">
                {Math.round((stat.current / stat.target) * 100)}% concluído
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Progress Chart */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span>Evolução do Peso</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl">
              <p className="text-gray-500">Gráfico de evolução será implementado</p>
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-primary" />
              <span>Conquistas</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                    achievement.earned 
                      ? 'bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20' 
                      : 'bg-gray-50'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    achievement.earned ? 'bg-primary text-white' : 'bg-gray-300 text-gray-500'
                  }`}>
                    <Award size={18} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </div>
                  {achievement.earned && (
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProgressView;
