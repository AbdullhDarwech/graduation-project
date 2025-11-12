// إدارة البيانات المحلية
export interface User {
    id: string;
    name: string;
    email: string;
    role: 'student' | 'professor';
    specialization?: string;
  }
  
  export interface Project {
    id: string;
    studentId: string;
    studentName: string;
    title: string;
    description: string;
    professorName: string;
    status: 'pending' | 'accepted' | 'rejected';
    meetingDate?: string;
    submittedAt: string;
  }
  
  export interface TeamAd {
    id: string;
    userId: string;
    userName: string;
    type: 'looking-for-team' | 'looking-for-member';
    specialization: string;
    description: string;
    email: string;
    createdAt: string;
  }
  
  // الحصول على المستخدم الحالي
  export const getCurrentUser = (): User | null => {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  };
  
  // تسجيل الدخول
  export const login = (email: string, role: 'student' | 'professor'): User => {
    const users = getUsers();
    let user = users.find(u => u.email === email && u.role === role);
    
    if (!user) {
      user = {
        id: Date.now().toString(),
        name: email.split('@')[0],
        email,
        role,
        specialization: role === 'student' ? 'frontend' : undefined
      };
      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));
    }
    
    localStorage.setItem('currentUser', JSON.stringify(user));
    return user;
  };
  
  // تسجيل الخروج
  export const logout = () => {
    localStorage.removeItem('currentUser');
  };
  
  // المستخدمون
  export const getUsers = (): User[] => {
    const usersStr = localStorage.getItem('users');
    return usersStr ? JSON.parse(usersStr) : [];
  };
  
  // المشاريع
  export const getProjects = (): Project[] => {
    const projectsStr = localStorage.getItem('projects');
    return projectsStr ? JSON.parse(projectsStr) : [];
  };
  
  export const addProject = (project: Omit<Project, 'id' | 'submittedAt'>): Project => {
    const projects = getProjects();
    const newProject: Project = {
      ...project,
      id: Date.now().toString(),
      submittedAt: new Date().toISOString()
    };
    projects.push(newProject);
    localStorage.setItem('projects', JSON.stringify(projects));
    return newProject;
  };
  
  export const updateProject = (id: string, updates: Partial<Project>): void => {
    const projects = getProjects();
    const index = projects.findIndex(p => p.id === id);
    if (index !== -1) {
      projects[index] = { ...projects[index], ...updates };
      localStorage.setItem('projects', JSON.stringify(projects));
    }
  };
  
  // إعلانات الفرق
  export const getTeamAds = (): TeamAd[] => {
    const adsStr = localStorage.getItem('teamAds');
    return adsStr ? JSON.parse(adsStr) : [];
  };
  
  export const addTeamAd = (ad: Omit<TeamAd, 'id' | 'createdAt'>): TeamAd => {
    const ads = getTeamAds();
    const newAd: TeamAd = {
      ...ad,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    ads.push(newAd);
    localStorage.setItem('teamAds', JSON.stringify(ads));
    return newAd;
  };
  
  export const deleteTeamAd = (id: string): void => {
    const ads = getTeamAds();
    const filtered = ads.filter(ad => ad.id !== id);
    localStorage.setItem('teamAds', JSON.stringify(filtered));
  };
  
  // الأساتذة
  export const getProfessors = (): User[] => {
    return getUsers().filter(u => u.role === 'professor');
  };