import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import '../../rxjs_operators';

import { UserService } from '../../user.service';
import { PgService } from '../../pg.service';
import { OrganService } from '../../shared/organ.service';

import { DbPortal } from '../../db-models/portal';
import { DbGroupList, DbTopic } from '../../db-models/organ';

import { UsergroupJson } from '../../db-models/json';

@Injectable()
export class UsergroupsService {


  constructor(private user: UserService, private pg: PgService, private organ: OrganService) {
  }

  /** 
   * Load the list of usergroups
   * including related portals and groups for each usergroup
   */
  public loadUsergroups(ugr_id: number): Observable<UsergroupJson[]> {
    let req = {
      ugr_id: true,
      ugr_name: true,
      ugr_rights: true,
      ugr_statuses: true,
      groups: {
        grp_id: true,
        grp_name: true
      },
      portals: {
        por_id: true,
        por_name: true
      },
      topics: {
        top_id: true,
        top_name: true,
        top_icon: true,
        ugt_rights: true,
      }
    };
    return this.pg.pgcall(
      'login/usergroup_json', {
        prm_ugr_id: ugr_id, req: JSON.stringify(req)
      });
  }

  // functions for a specific usergroup

  public loadPortals(): Observable<DbPortal[]> {
    return this.pg.pgcall('portal/portal_list', {
    });
  }

  public loadGroups(): Observable<DbGroupList[]> {
    return this.pg.pgcall('organ/group_list', {
      prm_org_id: null,
      prm_internal: true
    });
  }

  loadTopics(): Observable<DbTopic[]> {
    return this.pg.pgcall('organ/topics_list', {
    });
  }

  public addUsergroup(name: string, rights: string[], dossiers: string[]): Observable<number> {
    return this.pg.pgcall('login/usergroup_add', {
      prm_name: name,
      prm_ugr_rights: rights,
      prm_statuses: dossiers
    });
  }

  public updateUsergroup(
    id: number,
    name: string,
    groups: number[],
    portals: number[],
    topics: any[],
    rights: string[],
    dossiers: string[],
    newUsergroup: boolean) {

    var batch = [
      {
        proc: 'login/usergroup_set_groups',
        args: {
          prm_ugr_id: id,
          prm_grp_ids: groups
        }
      },
      {
        proc: 'login/usergroup_set_portals',
        args: {
          prm_ugr_id: id,
          prm_por_ids: portals
        }
      }
    ];

    if (!newUsergroup) {
      batch.unshift(
      {
        proc: 'login/usergroup_update',
        args: {
          prm_ugr_id: id,
          prm_name: name,
          prm_ugr_rights: rights,
          prm_statuses: dossiers
        } as any
      });
    }

    if (topics) {
      batch.push({
        proc: 'login/usergroup_set_topics',
        args: {
          prm_ugr_id: id,
          prm_top_ids: topics.map(t => t.id)
        } as any
      });

      topics.forEach(t => {
        batch.push({
          proc: 'login/usergroup_topic_set_rights',
          args: {
            prm_ugr_id: id,
            prm_top_id: t.id,
            prm_ugt_rights: t.rights
          } as any
        });
      });
    }

    return this.pg.pgbatch(batch);
  }

  public deleteUsergroup(id: number) {
    return this.pg.pgcall('login/usergroup_delete', {
      prm_ugr_id: id
    });
  }
}
