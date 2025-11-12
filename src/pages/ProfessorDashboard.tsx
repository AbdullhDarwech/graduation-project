import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getCurrentUser, logout, getProjects, updateProject } from '@/lib/storage';
import ProjectCard from '@/components/ProjectCard';
import { LogOut, Inbox, CheckCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function ProfessorDashboard() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const [allProjects, setAllProjects] = useState(getProjects());
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [meetingDate, setMeetingDate] = useState('');

  const myProjects = allProjects.filter(p => p.professorName === currentUser?.name);
  const pendingProjects = myProjects.filter(p => p.status === 'pending');
  const acceptedProjects = myProjects.filter(p => p.status === 'accepted');

  useEffect(() => {
    if (!currentUser || currentUser.role !== 'professor') {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleAccept = (id: string) => {
    updateProject(id, { status: 'accepted' });
    setAllProjects(getProjects());
    toast.success('تم قبول المشروع');
  };

  const handleReject = (id: string) => {
    updateProject(id, { status: 'rejected' });
    setAllProjects(getProjects());
    toast.success('تم رفض المشروع');
  };

  const handleSetDate = (id: string) => {
    setSelectedProjectId(id);
  };

  const handleSubmitDate = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedProjectId && meetingDate) {
      updateProject(selectedProjectId, { meetingDate });
      setAllProjects(getProjects());
      setSelectedProjectId(null);
      setMeetingDate('');
      toast.success('تم تحديد موعد الاجتماع');
    }
  };

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">لوحة تحكم الأستاذ</h1>
              <p className="text-sm text-gray-600">مرحباً، د. {currentUser.name}</p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              تسجيل الخروج
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="pending">
              <Inbox className="mr-2 h-4 w-4" />
              الطلبات الجديدة ({pendingProjects.length})
            </TabsTrigger>
            <TabsTrigger value="accepted">
              <CheckCircle className="mr-2 h-4 w-4" />
              المشاريع المقبولة ({acceptedProjects.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">طلبات المشاريع الجديدة</h2>
              {pendingProjects.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Inbox className="mx-auto h-12 w-12 mb-4 opacity-50" />
                  <p>لا توجد طلبات جديدة</p>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {pendingProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      showActions
                      onAccept={handleAccept}
                      onReject={handleReject}
                    />
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="accepted">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">المشاريع المقبولة</h2>
              {acceptedProjects.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <CheckCircle className="mx-auto h-12 w-12 mb-4 opacity-50" />
                  <p>لا توجد مشاريع مقبولة بعد</p>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {acceptedProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      showActions
                      onSetDate={handleSetDate}
                    />
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Dialog open={!!selectedProjectId} onOpenChange={() => setSelectedProjectId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>تحديد موعد الاجتماع</DialogTitle>
            <DialogDescription>
              اختر التاريخ والوقت المناسب للاجتماع مع الطالب
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitDate} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="meeting-date">التاريخ والوقت</Label>
              <Input
                id="meeting-date"
                type="datetime-local"
                value={meetingDate}
                onChange={(e) => setMeetingDate(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">
              تأكيد الموعد
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}