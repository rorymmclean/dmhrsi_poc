import Dashboard from 'views/Dashboard/Dashboard.jsx';
import LoginPage from 'views/Pages/LoginPage.jsx';
import UserProfile from 'views/Pages/UserProfile.jsx';
import ConfirmationNumber from '@material-ui/icons/ConfirmationNumber';
import TaskIcon from '@mui/icons-material/Task';


// @material-ui/icons
import DashboardIcon from '@material-ui/icons/Dashboard';
import BusinessIcon from '@mui/icons-material/Business';
import GroupIcon from '@mui/icons-material/Group';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';

import OrganizationTable from 'core-components/organization/organizationTable';
import EditOrganization from 'core-components/organization/editOrganization';
import Contact from 'core-components/organization/contact';
import PersonTable from 'core-components/person/personTable';
import EditPerson from 'core-components/person/editPerson';
import Assignments from 'core-components/person/assignments';
import ProjectTable from 'core-components/project/projectTable';
import EditProject from 'core-components/project/editProject';
import TaskTable from 'core-components/task/taskTable';
import EditTask from 'core-components/task/editTask';

var dashRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    rtlName: '',
    icon: DashboardIcon,
    component: Dashboard,
    layout: '/admin'
  },
  {
    path: '/organization',
    name: 'organizations',
    rtlName: '',
    mini: 'S',
    rtlMini: '',
    icon: BusinessIcon,
    component: OrganizationTable,
    layout: '/admin'
  },
  {
    path: '/person',
    name: 'persons',
    rtlName: '',
    mini: 'S',
    rtlMini: '',
    icon: GroupIcon,
    component: PersonTable,
    layout: '/admin'
  },
    {
    path: '/project',
    name: 'Projects',
    rtlName: '',
    mini: 'S',
    rtlMini: '',
    icon: LeaderboardIcon,
    component: ProjectTable,
    layout: '/admin'
  },   {
    path: '/task',
    name: 'Tasks',
    rtlName: '',
    mini: 'S',
    rtlMini: '',
    icon: TaskIcon,
    component: TaskTable,
    layout: '/admin'
  },
  {
    path: '/edit',
    name: 'edit',
    rtlName: '',
    mini: 'S',
    rtlMini: '',
    icon: ConfirmationNumber,
    component: EditOrganization,
    redirect: true,
    layout: '/admin'
  },
    {
    path: '/editPerson',
    name: 'edit',
    rtlName: '',
    mini: 'S',
    rtlMini: '',
    icon: ConfirmationNumber,
    component: EditPerson,
    redirect: true,
    layout: '/admin'
  },
  {
    path: '/editProject',
    name: 'edit',
    rtlName: '',
    mini: 'S',
    rtlMini: '',
    icon: ConfirmationNumber,
    component: EditProject,
    redirect: true,
    layout: '/admin'
  },  {
    path: '/editTask',
    name: 'edit',
    rtlName: '',
    mini: 'S',
    rtlMini: '',
    icon: ConfirmationNumber,
    component: EditTask,
    redirect: true,
    layout: '/admin'
  },

  
    {
    path: '/contact',
    name: 'contact',
    rtlName: '',
    mini: 'S',
    rtlMini: '',
    icon: ConfirmationNumber,
    component: Contact,
    redirect: true,
    layout: '/admin'
  },
     {
    path: '/assignments',
    name: 'Assignments',
    rtlName: '',
    mini: 'S',
    rtlMini: '',
    icon: ConfirmationNumber,
    component: Assignments,
    redirect: true,
    layout: '/admin'
  },
  {
    path: '/profile',
    name: 'User Profile',
    rtlName: '',
    mini: '',
    rtlMini: '',
    redirect: true,
    component: UserProfile,
    layout: '/admin'
  },
  {
    path: '/login',
    name: 'login',
    rtlName: '',
    mini: '',
    rtlMini: '',
    redirect: true,
    component: LoginPage,
    layout: '/auth'
  }
];
export default dashRoutes;
