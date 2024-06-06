import {
  mdiAccountCircle,
  mdiMonitor,
  mdiGithub,
  mdiLock,
  mdiAlertCircle,
  mdiSquareEditOutline,
  mdiTable,
  mdiViewList,
  mdiTelevisionGuide,
  mdiResponsive,
  mdiPalette,
  mdiVuejs,
  mdiHumanMaleBoard,
  mdiAccountSchool,
  mdiApplicationCogOutline,
  mdiFileDocumentMultipleOutline,
  mdiBookCheckOutline,
} from '@mdi/js'
import { MenuAsideItem } from './interfaces'

const menuAside: MenuAsideItem[] = [
  {
    href: '/dashboard',
    icon: mdiMonitor,
    label: 'Dashboard',
  },
  {
    href: '/lectures',
    icon: mdiHumanMaleBoard,
    label: 'Lectures',
  },
  {
    href: '/students',
    icon: mdiAccountSchool,
    label: 'Students',
  },
  {
    href: '/departments',
    icon: mdiApplicationCogOutline,
    label: 'Departments',
  },
  {
    href: '/class',
    icon: mdiFileDocumentMultipleOutline,
    label: 'Classes',
  },

  {
    href: '/document',
    icon: mdiFileDocumentMultipleOutline,
    label: 'Documents',
  },

  // {
  //   href: '/tables',
  //   label: 'Tables',
  //   icon: mdiTable,
  // },
  // {
  //   href: '/forms',
  //   label: 'Forms',
  //   icon: mdiSquareEditOutline,
  // },
  // {
  //   href: '/ui',
  //   label: 'UI',
  //   icon: mdiTelevisionGuide,
  // },
  // {
  //   href: '/responsive',
  //   label: 'Responsive',
  //   icon: mdiResponsive,
  // },
  // {
  //   href: '/',
  //   label: 'Styles',
  //   icon: mdiPalette,
  // },
  // {
  //   href: '/profile',
  //   label: 'Profile',
  //   icon: mdiAccountCircle,
  // },
  // {
  //   href: '/login',
  //   label: 'Login',
  //   icon: mdiLock,
  // },
  // {
  //   href: '/error',
  //   label: 'Error',
  //   icon: mdiAlertCircle,
  // },
  // {
  //   label: 'Dropdown',
  //   icon: mdiViewList,
  //   menu: [
  //     {
  //       label: 'Item One',
  //     },
  //     {
  //       label: 'Item Two',
  //     },
  //   ],
  // },
]

const menuTeacher: MenuAsideItem[] = [
  {
    href: '/dashboard',
    icon: mdiMonitor,
    label: 'Dashboard',
  },
  {
    href: '/class',
    icon: mdiFileDocumentMultipleOutline,
    label: 'Classes',
  },
]

const menuStudent: MenuAsideItem[] = [
  {
    href: '/dashboard',
    icon: mdiMonitor,
    label: 'Dashboard',
  },
  {
    href: '/class',
    icon: mdiFileDocumentMultipleOutline,
    label: 'Classes',
  },
  {
    href: '/success-class',
    icon: mdiBookCheckOutline,
    label: 'Joining Classes',
  },
]
export { menuAside, menuStudent, menuTeacher }
