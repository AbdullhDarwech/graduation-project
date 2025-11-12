import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getCurrentUser, logout, getProjects, addTeamAd, getTeamAds, deleteTeamAd } from '@/lib/storage';
import ProjectRequestForm from '@/components/ProjectRequestForm';
import ProjectCard from '@/components/ProjectCard';
import TeamAdCard from '@/components/TeamAdCard';
import { LogOut, FileText, Users, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';

export default function StudentDashboard() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const [myProjects, setMyProjects] = useState(getProjects().filter(p => p.studentId === currentUser?.id));
  const [teamAds, setTeamAds] = useState(getTeamAds());
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // نموذج الإعلان
  const [adType, setAdType] = useState<'looking-for-team' | 'looking-for-member'>('looking-for-team');
  const [specialization, setSpecialization] = useState('frontend');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState(currentUser?.email || '');

  useEffect(() => {
    if (!currentUser || currentUser.role !== 'student') {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleAddTeamAd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    addTeamAd({
      userId: currentUser.id,
      userName: currentUser.name,
      type: adType,
      specialization,
      description,
      email
    });

    toast.success('تم إضافة الإعلان بنجاح');
    setTeamAds(getTeamAds());
    setIsDialogOpen(false);
    setDescription('');
  };

  const handleDeleteAd = (id: string) => {
    deleteTeamAd(id);
    setTeamAds(getTeamAds());
    toast.success('تم حذف الإعلان');
  };

  const refreshProjects = () => {
    setMyProjects(getProjects().filter(p => p.studentId === currentUser?.id));
  };

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">لوحة تحكم الطالب</h1>
              <p className="text-sm text-gray-600">مرحباً، {currentUser.name}</p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              تسجيل الخروج
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="submit" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="submit">
              <FileText className="mr-2 h-4 w-4" />
              تقديم مشروع
            </TabsTrigger>
            <TabsTrigger value="myprojects">
              <FileText className="mr-2 h-4 w-4" />
              مشاريعي
            </TabsTrigger>
            <TabsTrigger value="teams">
              <Users className="mr-2 h-4 w-4" />
              البحث عن فريق
            </TabsTrigger>
          </TabsList>

          <TabsContent value="submit">
            <ProjectRequestForm />
          </TabsContent>

          <TabsContent value="myprojects">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">مشاريعي المقدمة</h2>
                <Button variant="outline" size="sm" onClick={refreshProjects}>
                  تحديث
                </Button>
              </div>
              {myProjects.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <FileText className="mx-auto h-12 w-12 mb-4 opacity-50" />
                  <p>لم تقدم أي مشاريع بعد</p>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {myProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="teams">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">إعلانات الفرق</h2>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-indigo-600 hover:bg-indigo-700">
                      <Plus className="mr-2 h-4 w-4" />
                      إضافة إعلان
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>إضافة إعلان جديد</DialogTitle>
                      <DialogDescription>
                        أضف إعلاناً للبحث عن فريق أو عن عضو لفريقك
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleAddTeamAd} className="space-y-4">
                      <div className="space-y-2">
                        <Label>نوع الإعلان</Label>
                        <RadioGroup value={adType} onValueChange={(v) => setAdType(v as 'looking-for-team' | 'looking-for-member')}>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="looking-for-team" id="team" />
                            <Label htmlFor="team">أبحث عن فريق</Label>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="looking-for-member" id="member" />
                            <Label htmlFor="member">نبحث عن عضو</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="spec">التخصص</Label>
                        <Select value={specialization} onValueChange={setSpecialization}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="frontend">Frontend</SelectItem>
                            <SelectItem value="backend">Backend</SelectItem>
                            <SelectItem value="fullstack">Full Stack</SelectItem>
                            <SelectItem value="mobile">Mobile</SelectItem>
                            <SelectItem value="design">Design</SelectItem>
                            <SelectItem value="other">أخرى</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="desc">الوصف</Label>
                        <Textarea
                          id="desc"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="اكتب وصفاً مختصراً"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">البريد الإلكتروني للتواصل</Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          dir="ltr"
                        />
                      </div>

                      <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">
                        نشر الإعلان
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              {teamAds.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Users className="mx-auto h-12 w-12 mb-4 opacity-50" />
                  <p>لا توجد إعلانات حالياً</p>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {teamAds.map((ad) => (
                    <TeamAdCard
                      key={ad.id}
                      ad={ad}
                      canDelete={ad.userId === currentUser.id}
                      onDelete={handleDeleteAd}
                    />
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}