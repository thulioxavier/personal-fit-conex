
import { Home, Users, Dumbbell, Activity, Settings } from 'lucide-react';
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
    { id: 'dashboard', label: 'Visão Geral', icon: Home },
    { id: 'students', label: 'Alunos', icon: Users },
    { id: 'workouts', label: 'Treinos', icon: Dumbbell },
    { id: 'exercises', label: 'Exercícios', icon: Activity },
    { id: 'settings', label: 'Configurações', icon: Settings },
  ];

  const studentMenuItems = [
    { id: 'dashboard', label: 'Meus Treinos', icon: Home },
    { id: 'settings', label: 'Configurações', icon: Settings },
  ];

  const menuItems = userType === 'personal' ? personalMenuItems : studentMenuItems;

  return (
    <>
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
              F
            </div>
            <span className="font-semibold text-gray-900">FitnessPro</span>
          </div>
        </div>

        <nav className="mt-6">
          <div className="px-4 mb-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              {userType === 'personal' ? 'PAINEL ADMINISTRATIVO' : 'ÁREA DO ALUNO'}
            </h3>
          </div>

          <div className="space-y-1 px-4">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={cn(
                  "w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                  activeSection === item.id
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <item.icon size={18} className="mr-3" />
                {item.label}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
