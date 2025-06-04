
import { Button } from '@/components/ui/button';
import { Bell, Menu, Search, Settings, User, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  user: { id: string; name: string; email: string; type: 'personal' | 'student' };
  onLogout: () => void;
  onMenuToggle: () => void;
}

const Header = ({ user, onLogout, onMenuToggle }: HeaderProps) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 lg:px-6 py-3">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuToggle}
            className="lg:hidden hover:bg-slate-100"
          >
            <Menu size={20} />
          </Button>
          
          <div className="hidden md:flex items-center relative max-w-sm">
            <Search size={16} className="absolute left-3 text-slate-400" />
            <Input
              placeholder="Buscar..."
              className="pl-9 h-9 bg-slate-50 border-slate-200 focus:bg-white text-sm"
            />
          </div>
        </div>

        {/* Center - Quick Stats for Personal */}
        {user.type === 'personal' && (
          <div className="hidden xl:flex items-center gap-8">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">15</p>
              <p className="text-xs text-slate-500 font-medium">Alunos</p>
            </div>
            <div className="w-px h-8 bg-slate-200" />
            <div className="text-center">
              <p className="text-2xl font-bold text-emerald-600">8</p>
              <p className="text-xs text-slate-500 font-medium">Treinos</p>
            </div>
            <div className="w-px h-8 bg-slate-200" />
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-500">92%</p>
              <p className="text-xs text-slate-500 font-medium">Sucesso</p>
            </div>
          </div>
        )}

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Mobile search */}
          <Button variant="ghost" size="sm" className="md:hidden hover:bg-slate-100">
            <Search size={18} />
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative hover:bg-slate-100">
            <Bell size={18} />
            <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 bg-red-500 text-xs border-white">
              3
            </Badge>
          </Button>

          {/* Settings - Hidden on small screens */}
          <Button variant="ghost" size="sm" className="hidden sm:flex hover:bg-slate-100">
            <Settings size={18} />
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-3 hover:bg-slate-100 px-3 py-2 h-auto">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <User size={16} className="text-white" />
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-slate-900">{user.name}</p>
                  <p className="text-xs text-slate-500">
                    {user.type === 'personal' ? 'Personal Trainer' : 'Aluno'}
                  </p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white">
              <div className="px-3 py-2">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-slate-500">{user.email}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="hover:bg-slate-50">
                <User size={16} className="mr-2" />
                Perfil
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-slate-50">
                <Settings size={16} className="mr-2" />
                Configurações
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout} className="text-red-600 hover:bg-red-50">
                <LogOut size={16} className="mr-2" />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
