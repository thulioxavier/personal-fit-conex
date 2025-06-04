
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Users, 
  Dumbbell, 
  Activity, 
  BarChart3,
  X,
  Menu
} from 'lucide-react';

interface SidebarProps {
  userType: 'personal' | 'student';
  activeSection: string;
  onSectionChange: (section: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar = ({ userType, activeSection, onSectionChange, isOpen, onToggle }: SidebarProps) => {
  const personalMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'students', label: 'Alunos', icon: Users },
    { id: 'workouts', label: 'Treinos', icon: Dumbbell },
    { id: 'exercises', label: 'Exercícios', icon: Activity },
  ];

  const studentMenuItems = [
    { id: 'dashboard', label: 'Meus Treinos', icon: Home },
    { id: 'progress', label: 'Progresso', icon: BarChart3 },
  ];

  const menuItems = userType === 'personal' ? personalMenuItems : studentMenuItems;

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 bg-white border-r border-gray-200">
        <div className="flex flex-col flex-1 min-h-0">
          {/* Logo */}
          <div className="flex items-center h-16 px-6 border-b border-gray-200 bg-white">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Dumbbell size={20} className="text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">FitManager</h1>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  onClick={() => onSectionChange(item.id)}
                  className={`w-full justify-start h-11 px-3 ${
                    isActive 
                      ? 'bg-primary/10 text-primary font-medium border border-primary/20' 
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon size={20} className="mr-3" />
                  {item.label}
                </Button>
              );
            })}
          </nav>

          {/* User Info */}
          <div className="p-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
              {userType === 'personal' ? 'Personal Trainer' : 'Aluno'}
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`lg:hidden fixed inset-0 z-50 ${isOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-black/20" onClick={onToggle} />
        <div className="relative flex w-full max-w-xs flex-col bg-white h-full shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Dumbbell size={20} className="text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">FitManager</h1>
            </div>
            <Button variant="ghost" size="sm" onClick={onToggle}>
              <X size={20} />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  onClick={() => {
                    onSectionChange(item.id);
                    onToggle();
                  }}
                  className={`w-full justify-start h-11 px-3 ${
                    isActive 
                      ? 'bg-primary/10 text-primary font-medium border border-primary/20' 
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon size={20} className="mr-3" />
                  {item.label}
                </Button>
              );
            })}
          </nav>

          {/* User Info */}
          <div className="p-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
              {userType === 'personal' ? 'Personal Trainer' : 'Aluno'}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
