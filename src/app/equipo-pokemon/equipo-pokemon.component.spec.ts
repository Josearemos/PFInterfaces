import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EquipoPokemonComponent } from './equipo-pokemon.component';

describe('EquipoPokemonComponent', () => {
  let component: EquipoPokemonComponent;
  let fixture: ComponentFixture<EquipoPokemonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipoPokemonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipoPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
