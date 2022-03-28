export const CONSTANTS = {
  COMPLETE: 'Complete',
  ERROR: 'error',
  INCOMPLETE: 'Incomplete',
  INFO: 'info',
  NEEDS_REVIEW: 'Needs review',
  NOT_READY: 'Not ready'
};

export const COMPONENTS = {
  CHECKLIST: 'checklist',
  DASHBOARD: 'Dashboard',
  CONTAINER: 'container',
  EMBEDDED: 'embedded',
  FORM: 'form',
  LIST: 'list',
  PLAINLIST: 'plain',
  TABLE: 'table',
  TESTRAIL: 'testrail',
  TIPS: 'tips',
  CARD: 'card'
};

export const PAGES = {
  AUTOMATED: 'Automated Testing',
  COMPONENT: 'Components',
  CONTROL: 'Control Tower',
  DASHBOARD: 'Dashboard',
  DOCUMENTATION: 'Documentation',
  LICENSES: 'Licenses',
  LOG: 'Logging',
  SECURITY: 'Security',
  QUALITY: 'Quality Assurance'
};

export type CheckListType = {
  [key: string]: {
    name: string;
    reference: string;
  };
}[];
