export const ROUTES = {
  DASHBOARD: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  WORK_EXPERIENCE: '/pengalaman-kerja',
  CREATE_UPDATE_WORK_EXPERIENCE: '/create-update-pengalaman-kerja/:id?',
  SKILLS: '/skills',
  CREATE_UPDATE_SKILL: '/create-update-skill/:id?',
  PROJECT: '/project',
  CREATE_UPDATE_PROJECT: '/create-update-project/:id?',
  EDUCATION: '/education',
  CREATE_UPDATE_EDUCATION: '/create-update-education/:id?',
  SETTINGS: '/settings',
} as const;
