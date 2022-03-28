export interface Ursus {
  general: General;
  categories: Categories;
}

export interface General {
  'project-name': string;
  'ursus-help': string;
  version: string;
}

export interface Categories {
  documentation: Section;
  qa: Section;
  license: Section;
}

export interface Section {
  setting: Setting;
  sections: Component[];
}

export interface Component {
  component: string;
  title: string;
  items: (ChecklistItem | ListItem | TableItem | FieldItem | ContainerItem)[];
  link?: string;
  config?: Config;
  type?: string;
  message?: string;
  content?: LicenseTipContent;
  checklist?: LicenseTableChecklist[];
  status?: string;
  reportLink?: string;
}

/* License */
export interface LicenseTipContent {
  type: string;
  message: string;
}

export type licenseDetails = {
  version: string;
  license: string;
  status: string;
};

export interface LicenseTableChecklist {
  ['']: licenseDetails;
}

/* Other config */
export interface Config {
  columnDirection: boolean;
}

export interface ChecklistItem {
  name: string;
  reference?: string;
  done?: boolean;
  link?: string;
  text?: string;
}

export interface TableItem {
  name: string;
  link?: string;
  text?: string;
}

export interface ListItem {
  name: string;
  link?: string;
  text?: string;
}

export interface FieldItem {
  name: string;
  value?: string;
}

export interface ContainerItem {
  name: string;
  status?: string;
  text?: string;
  reportLink?: string;
}

export interface CardItem {
  name: string;
  text?: string;
  imageLink?: string;
  externLink?: string;
}

export interface QuickLinkType {
  name: string;
  link: string;
}

export interface Setting {
  name: string;
  description: string;
  quicklink?: QuickLinkType[];
  title?: string;
}
