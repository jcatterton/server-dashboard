import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { MockApplicationsService, MockLoginService, MockSnackBarService } from "../../mocks/services";
import { SnackBarPanelClass, SnackbarService } from "../../services/snackbar/snackbar.service";
import { LoginService } from "../../services/login/login.service";
import { ApplicationsService } from "../../services/applications/applications.service";
import { of, throwError } from "rxjs";
import { MockAppConfig } from "../../mocks/app-config";
import { SecurePipe } from "../../pipes/secure.pipe";

describe('DashboardComponent', () => {
  let router: Router;
  let snackBarService: MockSnackBarService;
  let loginService: MockLoginService;
  let applicationsService: MockApplicationsService;
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([{ path: "**", component: class {} }]),
      ],
      declarations: [
        DashboardComponent,
        SecurePipe
      ],
      providers: [
        { provide: SnackbarService, useClass: MockSnackBarService },
        { provide: LoginService, useClass: MockLoginService },
        { provide: ApplicationsService, useClass: MockApplicationsService },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
    snackBarService = TestBed.inject(SnackbarService);
    loginService = TestBed.inject(LoginService);
    applicationsService = TestBed.inject(ApplicationsService);
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("ngOnInit", () => {
    it("should call loadApps if token is valid", () => {
      spyOn(applicationsService, "loadApps").and.returnValue(of([MockAppConfig.mockConfig1]));
      const loadAppsSpy = spyOn(component, "loadApps");
      component.ngOnInit();
      expect(loadAppsSpy).toHaveBeenCalled();
    });

    it("should call navigate if token is invalid", () => {
      spyOn(loginService, "validateToken").and.returnValue(throwError("test"));
      const redirectSpy = spyOn(router, "navigate");
      component.ngOnInit();
      expect(redirectSpy).toHaveBeenCalledWith([""]);
    });
  });

  describe("loadApps", () => {
    it("should call applicationsService loadApps", () => {
      const loadAppsSpy = spyOn(applicationsService, "loadApps").and.returnValue(of([MockAppConfig.mockConfig1]));
      component.loadApps();
      expect(loadAppsSpy).toHaveBeenCalled();
    });

    it("should call getAppHealth if valid app configs are received", () => {
      spyOn(applicationsService, "loadApps").and.returnValue(of([MockAppConfig.mockConfig1]));
      const healthSpy = spyOn(applicationsService, "getAppHealth").and.returnValue(of({ status: 200 }));
      component.loadApps();
      expect(healthSpy).toHaveBeenCalled();
    });

    it("should set loading to false if error is received from getAppHealth", () => {
      spyOn(applicationsService, "loadApps").and.returnValue(of([MockAppConfig.mockConfig1]));
      spyOn(applicationsService, "getAppHealth").and.returnValue(throwError({ status: 200 }));
      component.loadApps();
      expect(component.loading).toBeFalsy();
    });

    it("should call snackBarService showMessage if error occurs loading apps", () => {
      spyOn(applicationsService, "loadApps").and.returnValue(throwError("test"));
      const snackBarSpy = spyOn(snackBarService, "showMessage");
      component.loadApps();
      expect(snackBarSpy).toHaveBeenCalledWith("Error loading application information", SnackBarPanelClass.fail);
    });
  });

  describe("sortApps", () => {
    it("should sort apps by app name", () => {
      component.apps = [MockAppConfig.mockAppInfo3, MockAppConfig.mockAppInfo2, MockAppConfig.mockAppInfo1];
      component.sortApps();
      expect(component.apps[0].config.appName).toEqual(MockAppConfig.mockAppInfo1.config.appName);
      expect(component.apps[1].config.appName).toEqual(MockAppConfig.mockAppInfo2.config.appName);
      expect(component.apps[2].config.appName).toEqual(MockAppConfig.mockAppInfo3.config.appName);
    });
  });

  describe("getImageURL", () => {
    it("should call appService getAppImage", () => {
      const appSpy = spyOn(applicationsService, "getAppImage");
      component.getImageUrl(MockAppConfig.mockAppInfo1);
      expect(appSpy).toHaveBeenCalled();
    });
  });

  describe("setHoverAppInfo", () => {
    it("should set hoverAppInfo according to specified app", () => {
      component.setHoverAppInfo(MockAppConfig.mockAppInfo1);
      expect(component.hoverAppInfo[0]).toEqual(MockAppConfig.mockAppInfo1.config.description);
      expect(component.hoverAppInfo[1]).toEqual(
        `Dependencies: ${MockAppConfig.mockAppInfo1.config.dependencies.length === 0 ? "None" : MockAppConfig.mockAppInfo1.config.dependencies.join(", ")}`
      );
    });
  });
});
