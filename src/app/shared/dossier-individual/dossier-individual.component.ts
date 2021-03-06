import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { DbGroup, DbDossierOrganizationStatus } from '../../db-models/organ';
import { DossiersService } from '../../dossiers.service';

@Component({
  selector: 'app-dossier-individual',
  templateUrl: './dossier-individual.component.html',
  styleUrls: ['./dossier-individual.component.css']
})
export class DossierIndividualComponent implements OnInit {
  @Input() dossier;
  public assignments: Observable<DbGroup[]>;
  public statuses: Observable<DbDossierOrganizationStatus[]>;

  constructor(private dossiersService: DossiersService) { }

  ngOnInit() {
    this.assignments = this.dossiersService.loadDossierAssignments(this.dossier.dos_id);
    this.statuses = this.dossiersService.loadDossierStatuses(this.dossier.dos_id);
  }

  genderSymbol(gender: string) {
    if (gender === 'male') {
      return '♂';
    } else if (gender === 'female') {
      return '♀';
    }
  }
}
