import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RouteService } from '../../services/route/route.service'
import { LoginnavComponent } from './loginnav.component'

describe('LoginnavComponent', () => {
  let component: LoginnavComponent
  let fixture: ComponentFixture<LoginnavComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginnavComponent],
      providers: [{ provide: RouteService, useValue: true }],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginnavComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should have route service', () => {
    expect(component.url).toBeDefined()
  })
})
