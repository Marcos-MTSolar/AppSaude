// Paletas de cores por perfil — usada em todos os componentes do app
export type ProfileId = 'marcos' | 'sandra';

export interface AppTheme {
  // Layout principal
  pageBg: string;
  surface: string;       // fundo dos cards
  surface2: string;      // fundo de áreas secundárias (slate-50)
  surfaceBorder: string; // border dos cards

  // Header e Nav
  headerBg: string;
  headerBorder: string;
  navBg: string;
  navBorder: string;
  navActive: string;
  navInactive: string;

  // Texto
  text: string;
  textSecondary: string;
  textMuted: string;

  // Acento primário
  primary: string;           // bg do botão principal
  primaryHover: string;      // hover do botão principal
  primaryText: string;       // texto no tom primário
  primarySubtle: string;     // fundo sutil acento
  primarySubtleText: string; // texto sobre fundo sutil
  primaryBorder: string;     // borda acento

  // Logo, perfil e header
  logoBg: string;
  titleFrom: string;
  titleTo: string;
  profilePillBg: string;
  profilePillBorder: string;
  profileAvatarBg: string;
  profileNameText: string;
  profileBtnText: string;
  profileBtnHover: string;
  profileBtnBorder: string;
  switchBtnText: string;
  switchBtnHover: string;
  switchBtnBorder: string;

  // Elementos funcionais
  progressBar: string;
  checkOn: string;
  inputBg: string;
  inputBorder: string;
  inputFocusRing: string;
  sectionDark: string;   // cards escuros internos (ex: timeline)
  sectionDarkBorder: string;
}

const marcos: AppTheme = {
  pageBg: 'bg-slate-900',
  surface: 'bg-slate-800',
  surface2: 'bg-slate-700/60',
  surfaceBorder: 'border-slate-700',

  headerBg: 'bg-slate-900',
  headerBorder: 'border-slate-700',
  navBg: 'bg-slate-900',
  navBorder: 'border-slate-700',
  navActive: 'text-cyan-400',
  navInactive: 'text-slate-500',

  text: 'text-slate-100',
  textSecondary: 'text-slate-300',
  textMuted: 'text-slate-400',

  primary: 'bg-cyan-500',
  primaryHover: 'hover:bg-cyan-400',
  primaryText: 'text-cyan-400',
  primarySubtle: 'bg-cyan-900/40',
  primarySubtleText: 'text-cyan-300',
  primaryBorder: 'border-cyan-800',

  logoBg: 'bg-cyan-600',
  titleFrom: 'from-cyan-400',
  titleTo: 'to-sky-300',
  profilePillBg: 'bg-slate-800',
  profilePillBorder: 'border-slate-600',
  profileAvatarBg: 'bg-cyan-600',
  profileNameText: 'text-cyan-300',
  profileBtnText: 'text-slate-400',
  profileBtnHover: 'hover:bg-slate-700',
  profileBtnBorder: 'border-slate-600',
  switchBtnText: 'text-cyan-400',
  switchBtnHover: 'hover:bg-slate-700',
  switchBtnBorder: 'border-slate-600',

  progressBar: 'bg-cyan-500',
  checkOn: 'bg-cyan-500 border-cyan-500',
  inputBg: 'bg-slate-700',
  inputBorder: 'border-slate-600',
  inputFocusRing: 'focus:ring-cyan-500',
  sectionDark: 'bg-slate-800',
  sectionDarkBorder: 'border-slate-700',
};

const sandra: AppTheme = {
  pageBg: 'bg-pink-50',
  surface: 'bg-white',
  surface2: 'bg-pink-50',
  surfaceBorder: 'border-pink-100',

  headerBg: 'bg-white',
  headerBorder: 'border-pink-100',
  navBg: 'bg-white',
  navBorder: 'border-pink-100',
  navActive: 'text-pink-500',
  navInactive: 'text-slate-400',

  text: 'text-slate-800',
  textSecondary: 'text-slate-600',
  textMuted: 'text-slate-500',

  primary: 'bg-pink-500',
  primaryHover: 'hover:bg-pink-400',
  primaryText: 'text-pink-500',
  primarySubtle: 'bg-pink-50',
  primarySubtleText: 'text-pink-700',
  primaryBorder: 'border-pink-200',

  logoBg: 'bg-pink-500',
  titleFrom: 'from-pink-500',
  titleTo: 'to-rose-400',
  profilePillBg: 'bg-pink-50',
  profilePillBorder: 'border-pink-200',
  profileAvatarBg: 'bg-pink-500',
  profileNameText: 'text-pink-700',
  profileBtnText: 'text-pink-600',
  profileBtnHover: 'hover:bg-pink-100',
  profileBtnBorder: 'border-pink-200',
  switchBtnText: 'text-pink-600',
  switchBtnHover: 'hover:bg-pink-100',
  switchBtnBorder: 'border-pink-200',

  progressBar: 'bg-pink-500',
  checkOn: 'bg-pink-500 border-pink-500',
  inputBg: 'bg-slate-50',
  inputBorder: 'border-slate-200',
  inputFocusRing: 'focus:ring-pink-400',
  sectionDark: 'bg-slate-800',
  sectionDarkBorder: 'border-slate-700',
};

export const themes: Record<ProfileId, AppTheme> = { marcos, sandra };
export const getTheme = (profile: ProfileId): AppTheme => themes[profile];
