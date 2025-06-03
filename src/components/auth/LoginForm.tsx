
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff, ArrowLeft, Mail } from 'lucide-react';

interface LoginFormProps {
  onLogin: (user: { id: string; name: string; email: string; type: 'personal' | 'student' }) => void;
}

const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock login - determine user type based on email
    const userType = email.includes('personal') ? 'personal' : 'student';
    const userName = userType === 'personal' ? 'Personal Trainer' : 'Aluno';
    
    onLogin({
      id: '1',
      name: userName,
      email,
      type: userType
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button className="flex items-center text-gray-600 hover:text-gray-800">
            <ArrowLeft size={20} className="mr-2" />
            Voltar ao início
          </button>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-lime-400 rounded-full flex items-center justify-center text-black font-bold text-sm mr-2">
              C
            </div>
            <span className="font-semibold text-gray-900">FitnessPro</span>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Bem-vindo de volta!</h1>
          <p className="text-gray-600">Entre na sua conta para continuar</p>
        </div>

        {/* Login Form */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Fazer Login</CardTitle>
            <p className="text-sm text-gray-600">Digite suas credenciais para acessar sua conta</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <Label htmlFor="remember" className="text-sm">Lembrar de mim</Label>
                </div>
                <button type="button" className="text-sm text-gray-600 hover:text-gray-800">
                  Esqueceu a senha?
                </button>
              </div>

              <Button type="submit" className="w-full bg-lime-400 hover:bg-lime-500 text-black font-medium">
                Entrar
              </Button>

              <div className="text-center text-sm text-gray-600">
                Não tem uma conta?{' '}
                <button type="button" className="text-lime-600 hover:text-lime-700 font-medium">
                  Cadastre-se aqui
                </button>
              </div>
            </form>

            {/* Demo Info */}
            <div className="mt-6 p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600 mb-2">Para testar:</p>
              <p className="text-xs text-gray-600">• Personal: personal@teste.com</p>
              <p className="text-xs text-gray-600">• Aluno: aluno@teste.com</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;
