
import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import DashboardHome from './DashboardHome';
import StudentsManager from './StudentsManager';
import WorkoutsManager from './WorkoutsManager';
import ExercisesManager from './ExercisesManager';
import AnalyticsView from './AnalyticsView';
import ScheduleView from './ScheduleView';
import ProgressView from './ProgressView';

interface DashboardProps {
  user: { id: string; name: string; email: string; type: 'personal' | 'student' };
  onLogout: () => void;
}

const Dashboard = ({ user, onLogout }: DashboardProps) => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardHome user={user} />;
      case 'students':
        return user.type === 'personal' ? <StudentsManager /> : <DashboardHome user={user} />;
      case 'workouts':
        return user.type === 'personal' ? <WorkoutsManager /> : <DashboardHome user={user} />;
      case 'exercises':
        return user.type === 'personal' ? <ExercisesManager /> : <DashboardHome user={user} />;
      case 'analytics':
        return user.type === 'personal' ? <AnalyticsView /> : <ProgressView user={user} />;
      case 'progress':
        return <ProgressView user={user} />;
      case 'schedule':
        return <ScheduleView user={user} />;
      default:
        return <DashboardHome user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="flex w-full">
        <Sidebar 
          userType={user.type}
          activeSection={activeSection}
          onSectionChange={(section) => {
            setActiveSection(section);
            setSidebarOpen(false);
          }}
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />
        
        <div className="flex-1 lg:ml-72 min-h-screen">
          <Header 
            user={user}
            onLogout={onLogout}
            onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          />
          
          <main className="p-4 lg:p-8 max-w-7xl mx-auto">
            <div className="animate-fade-in">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
