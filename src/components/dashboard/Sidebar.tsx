
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
        "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 shadow-sm transform transition-all duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Logo */}
        <div className="flex items-center px-6 py-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Dumbbell className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900">FitnessPro</h1>
              <p className="text-xs text-slate-500">
                {userType === 'personal' ? 'Personal Trainer' : 'Área do Aluno'}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={cn(
                  "w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
                  activeSection === item.id
                    ? "bg-primary text-white shadow-sm"
                    : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                )}
              >
                <item.icon size={18} className="mr-3" />
                {item.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="bg-slate-50 rounded-lg p-3 text-center border border-slate-200">
            <p className="text-slate-600 text-xs font-medium">
              Versão 2.1.0
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
