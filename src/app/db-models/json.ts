export interface GroupJson {
  grp_id: number;
  grp_name: string;
}
export interface PortalJson {
  por_id: number;
  por_name: string;
}
export interface TopicJson {
  top_id: number;
  top_name: string;
  top_description: string;
  top_icon: string;
  top_color: string;
  ugt_rights: string[];
}
export interface OrganizationJson {
  org_id: number;
  org_name: string;
  org_description: string;
}
export interface UsergroupJson {
  ugr_id: number;
  ugr_name: string;
  ugr_rights: string[];
  ugr_statuses: string[];
  groups: GroupJson[];
  portals: PortalJson[];
  topics: TopicJson[];
}
export interface UserLoginJson {
  usr_token: number;
  usr_rights: string[];
  usergroup: UsergroupJson;
  participant: {
    par_id: number;
    par_firstname: string;
    par_lastname: string;
  };
}
export interface EventTypeJson {
  ety_id: number;
  ety_name: string;
  ety_category: string;
  ety_individual_name: boolean;
  topics: TopicJson[];
  organizations: OrganizationJson[];
}
export interface DocumentTypeJson {
  dty_id: number;
  dty_name: string;
  dty_individual_name: string;
  topics: TopicJson[];
  organizations: OrganizationJson[];
}

export interface DossierJson {
  dos_id: number;
  dos_firstname: string;
  dos_lastname: string;
  dos_birthdate: string;
  dos_gender: string;
  dos_grouped: boolean;
  dos_external: boolean;
  dos_groupname: string;
}

export interface DocumentJson {
  doc_id: number;
  par_id_responsible: number;
  dty_id: number;
  dty_name: string;
  doc_title: string;
  doc_description: string;
  doc_status: string;
  doc_obtainment_date: string;
  doc_execution_date: string;
  doc_validity_date: string;
  doc_file: string;
  topics: TopicJson[];
  dossiers: DossierJson[];
}

export interface EventJson {
  eve_id: number;
  eve_title: string;
  ety_id: number;
  ety_name: string;
  eve_duration: string;
  eve_start_time: string;
  eve_end_time: string;
  eve_place: string;
  eve_cost: number;
  eve_description: string;
  eve_sumup: string;
  topics: TopicJson[];
  dossiers: DossierJson[];
}

export interface NoteJson {
  not_id: number;
  not_text: string;
  not_creation_date: string;
  not_event_date: string;
  not_object: string;
  topics: TopicJson[];
  dossiers: DossierJson[];
  author: {
    par_id: number;
    par_firstname: string;
    par_lastname: string;
  };
  recipients: {
    nor_for_action: boolean;
    par_id: number;
    par_firstname: string;
    par_lastname: string;
    par_email: string;
  }[];
}

export interface ResourceJson {
  res_id: number;
  res_name: string;
  topics: TopicJson[];
}

export interface ObjectiveJson {
  obj_id: number;
  obj_name: string;
  obj_open: boolean;
  obj_deadline: string;
  topics: TopicJson[];
  dossiers: DossierJson[];
}