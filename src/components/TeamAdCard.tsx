import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TeamAd } from '@/lib/storage';
import { Mail, Users, UserPlus, Trash2 } from 'lucide-react';

interface TeamAdCardProps {
  ad: TeamAd;
  canDelete?: boolean;
  onDelete?: (id: string) => void;
}

export default function TeamAdCard({ ad, canDelete = false, onDelete }: TeamAdCardProps) {
  const getTypeBadge = () => {
    if (ad.type === 'looking-for-team') {
      return <Badge className="bg-blue-500"><Users className="mr-1 h-3 w-3" />أبحث عن فريق</Badge>;
    }
    return <Badge className="bg-purple-500"><UserPlus className="mr-1 h-3 w-3" />نبحث عن عضو</Badge>;
  };

  const getSpecializationBadge = () => {
    const colors: Record<string, string> = {
      frontend: 'bg-green-500',
      backend: 'bg-orange-500',
      fullstack: 'bg-indigo-500',
      mobile: 'bg-pink-500',
      design: 'bg-yellow-500',
      other: 'bg-gray-500'
    };
    
    const labels: Record<string, string> = {
      frontend: 'Frontend',
      backend: 'Backend',
      fullstack: 'Full Stack',
      mobile: 'Mobile',
      design: 'Design',
      other: 'أخرى'
    };

    return (
      <Badge className={colors[ad.specialization] || colors.other}>
        {labels[ad.specialization] || ad.specialization}
      </Badge>
    );
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <CardTitle className="text-lg">{ad.userName}</CardTitle>
            <div className="flex gap-2">
              {getTypeBadge()}
              {getSpecializationBadge()}
            </div>
          </div>
          {canDelete && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete?.(ad.id)}
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <CardDescription>{ad.description}</CardDescription>
        
        <div className="flex items-center gap-2 text-sm">
          <Mail className="h-4 w-4 text-gray-500" />
          <a href={`mailto:${ad.email}`} className="text-indigo-600 hover:underline" dir="ltr">
            {ad.email}
          </a>
        </div>

        <p className="text-xs text-gray-500">
          نُشر في: {new Date(ad.createdAt).toLocaleDateString('ar-SA')}
        </p>
      </CardContent>
    </Card>
  );
}