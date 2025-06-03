
import { Button } from '@/components/ui/button';
import { Bell, Menu, Search, Settings, User, LogOut, MessageCircle } from 'lucide-react';
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
    <header className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-100 sticky top-0 z-40">
      <div className="flex items-center justify-between px-4 lg:px-8 py-4">
        {/* Left side - Menu and Search */}
        <div className="flex items-center space-x-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuToggle}
            className="lg:hidden hover:bg-primary/10"
          >
            <Menu size={20} />
          </Button>
          
          <div className="hidden md:flex items-center relative">
            <Search size={18} className="absolute left-3 text-gray-400" />
            <Input
              placeholder="Buscar alunos, treinos, exercícios..."
              className="pl-10 w-80 bg-gray-50 border-0 focus:bg-white focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        {/* Center - Quick Stats for Personal */}
        {user.type === 'personal' && (
          <div className="hidden xl:flex items-center space-x-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">15</p>
              <p className="text-xs text-gray-500">Alunos Ativos</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">8</p>
              <p className="text-xs text-gray-500">Treinos Hoje</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-500">92%</p>
              <p className="text-xs text-gray-500">Taxa Sucesso</p>
            </div>
          </div>
        )}

        {/* Right side - Actions and User */}
        <div className="flex items-center space-x-3">
          {/* Search for mobile */}
          <Button variant="ghost" size="sm" className="md:hidden hover:bg-primary/10">
            <Search size={20} />
          </Button>

          {/* Messages */}
          <Button variant="ghost" size="sm" className="relative hover:bg-primary/10">
            <MessageCircle size={20} />
            <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 bg-green-500 text-xs">3</Badge>
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative hover:bg-primary/10">
            <Bell size={20} />
            <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 bg-red-500 text-xs">5</Badge>
          </Button>

          {/* Settings - Hidden on mobile */}
          <Button variant="ghost" size="sm" className="hidden sm:flex hover:bg-primary/10">
            <Settings size={20} />
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-3 hover:bg-primary/10 px-3 py-2 h-auto">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
                  <User size={18} className="text-white" />
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">
                    {user.type === 'personal' ? 'Personal Trainer' : 'Aluno'}
                  </p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 bg-white shadow-xl border-0">
              <div className="px-4 py-3 bg-gradient-to-r from-primary/5 to-primary/10">
                <p className="text-sm font-semibold">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="hover:bg-primary/5">
                <User size={16} className="mr-3" />
                Meu Perfil
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-primary/5">
                <Settings size={16} className="mr-3" />
                Configurações
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout} className="text-red-600 hover:bg-red-50">
                <LogOut size={16} className="mr-3" />
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
