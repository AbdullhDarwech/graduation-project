import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Project } from '@/lib/storage';
import { Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onAccept?: (id: string) => void;
  onReject?: (id: string) => void;
  onSetDate?: (id: string) => void;
  showActions?: boolean;
}

export default function ProjectCard({ project, onAccept, onReject, onSetDate, showActions = false }: ProjectCardProps) {
  const getStatusBadge = () => {
    switch (project.status) {
      case 'accepted':
        return <Badge className="bg-green-500"><CheckCircle className="mr-1 h-3 w-3" />مقبول</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500"><XCircle className="mr-1 h-3 w-3" />مرفوض</Badge>;
      default:
        return <Badge className="bg-yellow-500"><Clock className="mr-1 h-3 w-3" />قيد الانتظار</Badge>;
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="text-xl">{project.title}</CardTitle>
            <CardDescription>الطالب: {project.studentName}</CardDescription>
          </div>
          {getStatusBadge()}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-gray-600 mb-2">وصف المشروع:</p>
          <p className="text-sm">{project.description}</p>
        </div>

        <div className="text-sm text-gray-600">
          <p>الأستاذ المشرف: <span className="font-semibold text-gray-900">{project.professorName}</span></p>
          <p>تاريخ التقديم: {new Date(project.submittedAt).toLocaleDateString('ar-SA')}</p>
          {project.meetingDate && (
            <p className="flex items-center mt-2 text-indigo-600">
              <Calendar className="mr-2 h-4 w-4" />
              موعد الاجتماع: {new Date(project.meetingDate).toLocaleString('ar-SA')}
            </p>
          )}
        </div>

        {showActions && project.status === 'pending' && (
          <div className="flex gap-2 pt-2">
            <Button
              onClick={() => onAccept?.(project.id)}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              قبول
            </Button>
            <Button
              onClick={() => onReject?.(project.id)}
              variant="destructive"
              className="flex-1"
            >
              <XCircle className="mr-2 h-4 w-4" />
              رفض
            </Button>
          </div>
        )}

        {showActions && project.status === 'accepted' && !project.meetingDate && (
          <Button
            onClick={() => onSetDate?.(project.id)}
            className="w-full bg-indigo-600 hover:bg-indigo-700"
          >
            <Calendar className="mr-2 h-4 w-4" />
            تحديد موعد
          </Button>
        )}
      </CardContent>
    </Card>
  );
}