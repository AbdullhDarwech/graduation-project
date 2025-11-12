import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { addProject, getCurrentUser, getProfessors } from '@/lib/storage';
import { Send } from 'lucide-react';
import { toast } from 'sonner';

export default function ProjectRequestForm() {
  const currentUser = getCurrentUser();
  const professors = getProfessors();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [professorName, setProfessorName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) return;

    addProject({
      studentId: currentUser.id,
      studentName: currentUser.name,
      title,
      description,
      professorName,
      status: 'pending'
    });

    toast.success('تم إرسال طلب المشروع بنجاح');
    setTitle('');
    setDescription('');
    setProfessorName('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>تقديم طلب مشروع تخرج</CardTitle>
        <CardDescription>املأ المعلومات المطلوبة وحدد الأستاذ المشرف</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">عنوان المشروع</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="أدخل عنوان المشروع"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">وصف المشروع</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="اكتب وصفاً تفصيلياً للمشروع"
              rows={5}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="professor">اسم الأستاذ المشرف</Label>
            {professors.length > 0 ? (
              <Select value={professorName} onValueChange={setProfessorName} required>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الأستاذ المشرف" />
                </SelectTrigger>
                <SelectContent>
                  {professors.map((prof) => (
                    <SelectItem key={prof.id} value={prof.name}>
                      {prof.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                id="professor"
                value={professorName}
                onChange={(e) => setProfessorName(e.target.value)}
                placeholder="أدخل اسم الأستاذ المشرف"
                required
              />
            )}
          </div>

          <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">
            <Send className="mr-2 h-4 w-4" />
            إرسال الطلب
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}