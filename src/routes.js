import Dashboard from 'views/Dashboard/Dashboard.jsx';
import LoginPage from 'views/Pages/LoginPage.jsx';
import UserProfile from 'views/Pages/UserProfile.jsx';
import ConfirmationNumber from '@material-ui/icons/ConfirmationNumber';
import TaskIcon from '@material-ui/icons/AssignmentLate';;

import AssignmentIcon from '@mui/icons-material/Assignment';
import PersonIcon from '@mui/icons-material/Person';
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';
import ScheduleIcon from '@mui/icons-material/Schedule';
import Diversity1Icon from '@mui/icons-material/Diversity1';

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
import timeCardTable from 'core-components/timeCardSearch/timeCardTable';
import allocationRuleSet from 'core-components/allocation/allocationRuleSet'
import ContactPerson from 'core-components/person/contact';
import AlLocationRuleSetTable from 'core-components/alLocationRuleSet/alLocationRuleSetTable';


var dashRoutes = [
  {
    path: '/timeCard',
    name: 'Time Cards',
    rtlName: '',
    mini: 'S',
    rtlMini: '',
    icon: ScheduleIcon,
    component: timeCardTable,
    layout: '/admin'
  },
  {
    path: '/organization',
    name: 'Organizations',
    rtlName: '',
    mini: 'S',
    rtlMini: '',
    icon: SensorOccupiedIcon,
    component: OrganizationTable,
    layout: '/admin'
  },
  {
    path: '/person',
    name: 'Persons',
    rtlName: '',
    mini: 'S',
    rtlMini: '',
    icon: PersonIcon,
    component: PersonTable,
    layout: '/admin'
  },
    {
    path: '/project',
    name: 'Projects',
    rtlName: '',
    mini: 'S',
    rtlMini: '',
    icon: AssignmentIcon,
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
    name: 'Edit Organization',
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
    name: 'Edit Person',
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
    name: 'Edit Project',
    rtlName: '',
    mini: 'S',
    rtlMini: '',
    icon: ConfirmationNumber,
    component: EditProject,
    redirect: true,
    layout: '/admin'
  },  {
    path: '/editTask',
    name: 'Edit Task',
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
    name: 'Contact',
    rtlName: '',
    mini: 'S',
    rtlMini: '',
    icon: ConfirmationNumber,
    component: Contact,
    redirect: true,
    layout: '/admin'
  },
  
    {
    path: '/contactPerson',
    name: 'Contact Person',
    rtlName: '',
    mini: 'S',
    rtlMini: '',
    icon: ConfirmationNumber,
    component: ContactPerson,
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
    path: '/allocation',
    name: 'Al-Location',
    rtlName: '',
    mini: 'S',
    rtlMini: '',
    icon: Diversity1Icon,
    component: AlLocationRuleSetTable,
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


