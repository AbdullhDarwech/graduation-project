import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { login } from '@/lib/storage';
import { GraduationCap, Users } from 'lucide-react';
// import { Input } from '@/components/ui/input';

export default function Index() {
  const navigate = useNavigate();
  const [studentEmail, setStudentEmail] = useState('');
  const [professorEmail, setProfessorEmail] = useState('');

  const handleStudentLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentEmail) {
      login(studentEmail, 'student');
      navigate('/student');
    }
  };

  const handleProfessorLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (professorEmail) {
      login(professorEmail, 'professor');
      navigate('/professor');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <GraduationCap className="h-16 w-16 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">نظام مشاريع التخرج</h1>
          <p className="text-gray-600">إدارة مشاريع التخرج والبحث عن فرق العمل</p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>تسجيل الدخول</CardTitle>
            <CardDescription>اختر نوع الحساب وأدخل البريد الإلكتروني</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="student" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="student">طالب</TabsTrigger>
                <TabsTrigger value="professor">أستاذ</TabsTrigger>
              </TabsList>

              <TabsContent value="student">
                <form onSubmit={handleStudentLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="student-email">البريد الإلكتروني</Label>
                    <Input
                      id="student-email"
                      type="email"
                      placeholder="student@example.com"
                      value={studentEmail}
                      onChange={(e) => setStudentEmail(e.target.value)}
                      required
                      dir="ltr"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">
                    <Users className="mr-2 h-4 w-4" />
                    دخول كطالب
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="professor">
                <form onSubmit={handleProfessorLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="professor-email">البريد الإلكتروني</Label>
                    <Input
                      id="professor-email"
                      type="email"
                      placeholder="professor@example.com"
                      value={professorEmail}
                      onChange={(e) => setProfessorEmail(e.target.value)}
                      required
                      dir="ltr"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                    <GraduationCap className="mr-2 h-4 w-4" />
                    دخول كأستاذ
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-gray-600">
          <p>نظام متكامل لإدارة مشاريع التخرج والتواصل بين الطلاب والأساتذة</p>
        </div>
      </div>
    </div>
  );
}