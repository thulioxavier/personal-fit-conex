
import { Home, Users, Dumbbell, Activity, Settings, TrendingUp, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  userType: 'personal' | 'student';
  activeSection: string;
  onSectionChange: (section: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar = ({ userType, activeSection, onSectionChange, isOpen }: SidebarProps) => {
  const personalMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'students', label: 'Alunos', icon: Users },
    { id: 'workouts', label: 'Treinos', icon: Dumbbell },
    { id: 'exercises', label: 'Exercícios', icon: Activity },
    { id: 'analytics', label: 'Relatórios', icon: TrendingUp },
    { id: 'schedule', label: 'Agenda', icon: Calendar },
    { id: 'settings', label: 'Configurações', icon: Settings },
  ];

  const studentMenuItems = [
    { id: 'dashboard', label: 'Meus Treinos', icon: Home },
    { id: 'progress', label: 'Progresso', icon: TrendingUp },
    { id: 'schedule', label: 'Agenda', icon: Calendar },
    { id: 'settings', label: 'Configurações', icon: Settings },
  ];

  const menuItems = userType === 'personal' ? personalMenuItems : studentMenuItems;

  return (
    <>
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-primary to-primary/90 shadow-2xl transform transition-all duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-center p-6 border-b border-white/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <Dumbbell className="w-6 h-6 text-primary" />
            </div>
            <div className="text-white">
              <h1 className="text-xl font-bold">FitnessPro</h1>
              <p className="text-xs text-white/80">
                {userType === 'personal' ? 'Personal Trainer' : 'Área do Aluno'}
              </p>
            </div>
          </div>
        </div>

        <nav className="mt-8 px-4">
          <div className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={cn(
                  "w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group",
                  activeSection === item.id
                    ? "bg-white text-primary shadow-lg transform scale-105"
                    : "text-white/90 hover:bg-white/10 hover:text-white hover:transform hover:scale-105"
                )}
              >
                <item.icon size={20} className={cn(
                  "mr-3 transition-colors",
                  activeSection === item.id ? "text-primary" : "text-white/80 group-hover:text-white"
                )} />
                {item.label}
              </button>
            ))}
          </div>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="bg-white/10 rounded-xl p-4 text-center">
            <p className="text-white/80 text-xs">
              Versão 2.0.1
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
