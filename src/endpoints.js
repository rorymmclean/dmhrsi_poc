export const HTTP_METHOD_GET = 'get';
export const HTTP_METHOD_POST = 'post';
export const HTTP_METHOD_DELETE = 'delete';
export const HTTP_METHOD_PUT = 'put';
export const HTTP_PUT_FILE = 'HTTP_PUT_FILE';

export const END_POINTS = {
  organization: {
    getOrganization: {
      url: 'org/ft?search_string={search_string}',
      method: HTTP_METHOD_GET
    },
    addOrganization: {
      url: 'org',
      method: HTTP_METHOD_PUT
    },
    getOrganizationDetails: {
      url: 'org?id={id}',
      method: HTTP_METHOD_GET
    },
    editOrganization: {
      url: 'org',
      method: HTTP_METHOD_POST
    }
  },
  person: {
    getPerson: {
      url: '/people/ft?search_string={search_string}',
      method: HTTP_METHOD_GET
    },
    addPerson: {
      url: 'people',
      method: HTTP_METHOD_PUT
    },
    getPersonDetails: {
      url: 'people?id={id}',
      method: HTTP_METHOD_GET
    },
    editPerson: {
      url: 'people',
      method: HTTP_METHOD_POST
    }
  },
  project: {
    getProject: {
      url: '/project/search?search_string={search_string}',
      method: HTTP_METHOD_GET
    },
    addProject: {
      url: 'project',
      method: HTTP_METHOD_PUT
    },
    getProjectDetails: {
      url: 'project?id={id}',
      method: HTTP_METHOD_GET
    },
    editProject: {
      url: 'project',
      method: HTTP_METHOD_POST
    }
  },
  contact: {
    addContact: {
      url: 'contacts',
      method: HTTP_METHOD_PUT
    },
    getContactDetails: {
      url: 'contacts/search?search_string={id}',
      method: HTTP_METHOD_GET
    },
    editContact: {
      url: 'contacts',
      method: HTTP_METHOD_POST
    }
  },
  task: {
    getTask: {
      url: '/task/search?search_string={search_string}',
      method: HTTP_METHOD_GET
    },
    addTask: {
      url: 'task',
      method: HTTP_METHOD_PUT
    },
    getTaskDetails: {
      url: 'task?id={id}',
      method: HTTP_METHOD_GET
    },
    editTask: {
      url: 'task',
      method: HTTP_METHOD_POST
    }
  },
  assignment: {
    addAssignment: {
      url: 'assignment',
      method: HTTP_METHOD_PUT
    },
    getAssignmentDetails: {
      url: 'assignment/search?search_string={search_string}',
      method: HTTP_METHOD_GET
    },
    editAssignment: {
      url: 'assignment',
      method: HTTP_METHOD_POST
    }
  },

  timeCard: {
    getTimeCard: {
      url: 'timecard/search?search_string={search_string}',
      method: HTTP_METHOD_GET
    },
    addTimeCard: {
      url: 'timecard',
      method: HTTP_METHOD_PUT
    },
    getTimeCardDetails: {
      url: 'timecard?id={id}',
      method: HTTP_METHOD_GET
    },
    editTimeCard: {
      url: 'timecard',
      method: HTTP_METHOD_POST
    }
  },

  timeEntry: {
    getTimeEntry: {
      url: 'timeentry/search?search_string={search_string}&startdate={startdate}&enddate={enddate}',
      method: HTTP_METHOD_GET
    },
    addTimeEntry: {
      url: 'timeentry',
      method: HTTP_METHOD_PUT
    },
    editTimeEntry: {
      url: 'timeentry',
      method: HTTP_METHOD_POST
    },
    editTimeEntryTask: {
      url: 'timeentry/change-task',
      method: HTTP_METHOD_POST
    }
  },
  alLocationRuleSet: {
    allocengine: {
      url: 'allocengine?id={id}',
      method: HTTP_METHOD_GET
    },
    getArsetList: {
      url: 'arset/search?search_string={search_string}',
      method: HTTP_METHOD_GET
    },
    getAlLocationRuleSet: {
      url: 'allrule/search?search_string={search_string}',
      method: HTTP_METHOD_GET
    },
    addAlLocationRuleSet: {
      url: 'arset',
      method: HTTP_METHOD_PUT
    },
    getRuleDetails: {
      url: 'arset/arsetbyid?id={id}',
      method: HTTP_METHOD_GET
    },
    getAlLocationRuleSetDetails: {
      url: 'arset?id={id}&RECORD_TYPE={RECORD_TYPE}',
      method: HTTP_METHOD_GET
    },
    editAlLocationRuleSet: {
      url: 'arset',
      method: HTTP_METHOD_POST
    },
    editRuleSet: {
      url: 'allrule',
      method: HTTP_METHOD_POST
    },
    addRuleSet: {
      url: 'allrule',
      method: HTTP_METHOD_PUT
    },
    editTask: {
      url: 'allrule/change-task',
      method: HTTP_METHOD_POST
    }
  },

  laborcosts: {
    url: 'laborcosts',
    method: HTTP_METHOD_GET
  }
};
