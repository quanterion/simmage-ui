/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Response, ResponseOptions } from '@angular/http';

import { <%= classifiedModuleName %>FormComponent } from './<%= dasherizedModuleName %>-form.component';
import { AppModule } from '../../../app.module';
import { <%= classifiedModuleName %>Module } from '../<%= dasherizedModuleName %>.module';
import { <%= classifiedModuleName %>Service } from '../<%= dasherizedModuleName %>.service';

let comp: <%= classifiedModuleName %>FormComponent;
let fixture: ComponentFixture<<%= classifiedModuleName %>FormComponent>;

class Fake<%= classifiedModuleName %>Service {
  load<%= classifiedModuleName %>() {
    return Observable.of([
      {
        id: 1,
        name: 'a name'
      },
      {
        id: 3,
        name: 'another name'
      }
    ]);
  }

  add<%= classifiedModuleName %>() { }
  delete<%= classifiedModuleName %>() { }
  update<%= classifiedModuleName %>() { }
}

const fake<%= classifiedModuleName %>Service = new Fake<%= classifiedModuleName %>Service();

const fakeActivatedRoute = {
  data: Observable.of({
    '<%= camelizedModuleName %>': {
      id: 2,
      name: 'this name'
    }
  }),
  params: Observable.of({})
};

const fakeActivatedRouteNew = {
  data: Observable.of({}),
  params: Observable.of({})
};

describe('Component: <%= classifiedModuleName %>Form', () => {
  it('should display <%= classifiedModuleName %>', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, <%= classifiedModuleName %>Module, RouterTestingModule],
      providers: [
        { provide: <%= classifiedModuleName %>Service, useValue: fake<%= classifiedModuleName %>Service },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    });
    fixture = TestBed.createComponent(<%= classifiedModuleName %>FormComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    expect(comp.nameCtrl.value).toEqual('this name');
  });

  it('should call doCancel when clicking on cancel button', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, <%= classifiedModuleName %>Module, RouterTestingModule],
      providers: [
        { provide: <%= classifiedModuleName %>Service, useValue: fake<%= classifiedModuleName %>Service },
        { provide: ActivatedRoute, useValue: fakeActivatedRouteNew }
      ]
    });
    fixture = TestBed.createComponent(<%= classifiedModuleName %>FormComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    const element = fixture.nativeElement;
    const cancelButton = element.querySelectorAll('button')[0];
    expect(cancelButton).not.toBeNull('You should have a `button` element');
    expect(cancelButton.textContent).toContain('Cancel');

    spyOn(comp, 'doCancel');
    cancelButton.dispatchEvent(new Event('click'));
    expect(comp.doCancel).toHaveBeenCalled();
  });

  it('should call doCancel then goBakctoList when clicking on cancel button', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, <%= classifiedModuleName %>Module, RouterTestingModule],
      providers: [
        { provide: <%= classifiedModuleName %>Service, useValue: fake<%= classifiedModuleName %>Service },
        { provide: ActivatedRoute, useValue: fakeActivatedRouteNew }
      ]
    });
    fixture = TestBed.createComponent(<%= classifiedModuleName %>FormComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    const element = fixture.nativeElement;
    const cancelButton = element.querySelectorAll('button')[0];
    expect(cancelButton).not.toBeNull('You should have a `button` element');
    expect(cancelButton.textContent).toContain('Cancel');

    spyOn(comp, 'goBackToList');
    cancelButton.dispatchEvent(new Event('click'));
    expect(comp.goBackToList).toHaveBeenCalled();
  });

  it('should call doDelete when clicking on delete button', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, <%= classifiedModuleName %>Module, RouterTestingModule],
      providers: [
        { provide: <%= classifiedModuleName %>Service, useValue: fake<%= classifiedModuleName %>Service },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    });
    fixture = TestBed.createComponent(<%= classifiedModuleName %>FormComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    const element = fixture.nativeElement;
    const deleteButton = element.querySelectorAll('button')[0];
    expect(deleteButton).not.toBeNull('You should have a `button` element');
    expect(deleteButton.textContent).toContain('Delete');

    spyOn(comp, 'doDelete');
    deleteButton.dispatchEvent(new Event('click'));
    expect(comp.doDelete).toHaveBeenCalled();
  });

  it('should call doDelete then goBackToList when clicking on delete button', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, <%= classifiedModuleName %>Module, RouterTestingModule],
      providers: [
        { provide: <%= classifiedModuleName %>Service, useValue: fake<%= classifiedModuleName %>Service },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    });
    fixture = TestBed.createComponent(<%= classifiedModuleName %>FormComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    const element = fixture.nativeElement;
    const deleteButton = element.querySelectorAll('button')[0];
    expect(deleteButton).not.toBeNull('You should have a `button` element');
    expect(deleteButton.textContent).toContain('Delete');

    spyOn(comp.service, 'delete<%= classifiedModuleName %>').and.returnValue(Observable.of(true));
    spyOn(comp, 'goBackToList');
    deleteButton.dispatchEvent(new Event('click'));
    expect(comp.goBackToList).toHaveBeenCalled();
  });

  it('should display error on delete error', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, <%= classifiedModuleName %>Module, RouterTestingModule],
      providers: [
        { provide: <%= classifiedModuleName %>Service, useValue: fake<%= classifiedModuleName %>Service },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    });
    fixture = TestBed.createComponent(<%= classifiedModuleName %>FormComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    const element = fixture.nativeElement;
    const deleteButton = element.querySelectorAll('button')[0];
    expect(deleteButton).not.toBeNull('You should have a `button` element');
    expect(deleteButton.textContent).toContain('Delete');

    const resp = new Response(new ResponseOptions());
    const subj = new Subject();
    spyOn(comp.service, 'delete<%= classifiedModuleName %>').and.returnValue(subj);
    subj.error(resp);

    spyOn(comp, 'goBackToList');
    deleteButton.dispatchEvent(new Event('click'));
    expect(comp.errorMsg).toEqual('Error deleting <%= dasherizedModuleName %>');
  });

  it('canDeactivate should return true if no changes where done', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, <%= classifiedModuleName %>Module, RouterTestingModule],
      providers: [
        { provide: <%= classifiedModuleName %>Service, useValue: fake<%= classifiedModuleName %>Service },
        { provide: ActivatedRoute, useValue: fakeActivatedRouteNew }
      ]
    });
    fixture = TestBed.createComponent(<%= classifiedModuleName %>FormComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    let ret = comp.canDeactivate();
    fixture.detectChanges();

    expect(ret).toEqual(true);
    expect(comp.pleaseSave).toEqual(false);
  });

  it('canDeactivate should return false if changes where done', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, <%= classifiedModuleName %>Module, RouterTestingModule],
      providers: [
        { provide: <%= classifiedModuleName %>Service, useValue: fake<%= classifiedModuleName %>Service },
        { provide: ActivatedRoute, useValue: fakeActivatedRouteNew }
      ]
    });
    fixture = TestBed.createComponent(<%= classifiedModuleName %>FormComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();
    comp.nameCtrl.setValue('Value changed');

    let ret = comp.canDeactivate();
    fixture.detectChanges();

    expect(ret).toEqual(false);
    expect(comp.pleaseSave).toEqual(true);
  });

  it('should add a new <%= classifiedModuleName %> and return its new id on sumbit', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, <%= classifiedModuleName %>Module, RouterTestingModule],
      providers: [
        { provide: <%= classifiedModuleName %>Service, useValue: fake<%= classifiedModuleName %>Service },
        { provide: ActivatedRoute, useValue: fakeActivatedRouteNew }
      ]
    });
    fixture = TestBed.createComponent(<%= classifiedModuleName %>FormComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    spyOn(comp.service, 'add<%= classifiedModuleName %>').and.returnValue(Observable.of(1));

    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit'));

    fixture.detectChanges();
    expect(comp.id).toEqual(1);
  });

  it('should display an error message when error occurs on add submit', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, <%= classifiedModuleName %>Module, RouterTestingModule],
      providers: [
        { provide: <%= classifiedModuleName %>Service, useValue: fake<%= classifiedModuleName %>Service },
        { provide: ActivatedRoute, useValue: fakeActivatedRouteNew }
      ]
    });
    fixture = TestBed.createComponent(<%= classifiedModuleName %>FormComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    const resp = new Response(new ResponseOptions({ body: 'error !'}));
    const subj = new Subject();
    spyOn(comp.service, 'add<%= classifiedModuleName %>').and.returnValue(subj);
    subj.error(resp);

    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit'));
    fixture.detectChanges();
    expect(comp.errorDetails).toEqual('error !');
    expect(comp.errorMsg).toEqual('Error adding <%= dasherizedModuleName %>');
  });

  it('should update a <%= classifiedModuleName %> and call goBakctoList on submit', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, <%= classifiedModuleName %>Module, RouterTestingModule],
      providers: [
        { provide: <%= classifiedModuleName %>Service, useValue: fake<%= classifiedModuleName %>Service },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    });
    fixture = TestBed.createComponent(<%= classifiedModuleName %>FormComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    spyOn(comp.service, 'update<%= classifiedModuleName %>').and.returnValue(Observable.of(1));
    spyOn(comp, 'goBackToList');

    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit'));

    fixture.detectChanges();
    expect(comp.goBackToList).toHaveBeenCalled();
  });

  it('should display an error message on when error occurs while submiting form', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, <%= classifiedModuleName %>Module, RouterTestingModule],
      providers: [
        { provide: <%= classifiedModuleName %>Service, useValue: fake<%= classifiedModuleName %>Service },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    });
    fixture = TestBed.createComponent(<%= classifiedModuleName %>FormComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    const resp = new Response(new ResponseOptions({ body: 'error !'}));
    const subj = new Subject();
    spyOn(comp.service, 'update<%= classifiedModuleName %>').and.returnValue(subj);
    subj.error(resp);

    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit'));
    fixture.detectChanges();
    expect(comp.errorDetails).toEqual('error !');
    expect(comp.errorMsg).toEqual('Error updating <%= dasherizedModuleName %>');
  });

  it('should should navigate to portal list when gobakctolist function is called', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, <%= classifiedModuleName %>Module, RouterTestingModule],
      providers: [
        { provide: <%= classifiedModuleName %>Service, useValue: fake<%= classifiedModuleName %>Service },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    });
    fixture = TestBed.createComponent(<%= classifiedModuleName %>FormComponent);
    comp = fixture.componentInstance;
    spyOn(comp.router, 'navigate');
    comp.goBackToList();
    expect(comp.router.navigate).toHaveBeenCalledWith(['/admin/<%= dasherizedModuleName %>']);
  });
});
