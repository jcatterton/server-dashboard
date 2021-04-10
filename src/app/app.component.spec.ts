import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { of, throwError} from "rxjs";
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { LoginService } from "./services/login/login.service";
import { MockLoginService } from "./mocks/services";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe('AppComponent', () => {
  let dialogService: MatDialog;
  let loginService: LoginService;
  let app;
  let fixture;
  let router: Router;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatDialogModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: MatDialog, useClass: MatDialog },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: LoginService, useClass: MockLoginService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
    loginService = TestBed.inject(LoginService);
    dialogService = TestBed.inject(MatDialog);

    const store = {};
    spyOn(localStorage, "getItem").and.callFake(function(key): any { return store[key] });
    spyOn(localStorage, "setItem").and.callFake(function(key, value): void { store[key] = value });
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'server-dashboard'`, () => {
    expect(app.title).toEqual('server-dashboard');
  });

  describe("ngOnInit", () => {
    it("should call handleLogin()", () => {
      const handleLoginSpy = spyOn(app, "handleLogin");
      app.ngOnInit();
      expect(handleLoginSpy).toHaveBeenCalled();
    });
  });

  describe("handleLogin", () => {
    it("should call router navigate if token is exists and is valid", () => {
      localStorage.setItem("justin-token", "test");
      spyOn(loginService, "validateToken").and.returnValue(of(null));
      const navigateSpy = spyOn(router, "navigate");
      app.handleLogin();
      expect(navigateSpy).toHaveBeenCalledWith(["dashboard"]);
    });

    it("should call showLoginDialog if token exists but is not valid", () => {
      localStorage.setItem("justin-token", "test");
      spyOn(loginService, "validateToken").and.returnValue(throwError("test"));
      const showLoginSpy = spyOn(app, "showLoginDialog");
      dialogService.closeAll();
      app.handleLogin();
      expect(showLoginSpy).toHaveBeenCalled();
    });

    it("should call showLoginDialog if token does not exist", () => {
      localStorage.setItem("justin-token", null);
      const showLoginSpy = spyOn(app, "showLoginDialog");
      dialogService.closeAll();
      app.handleLogin();
      expect(showLoginSpy).toHaveBeenCalled();
    });
  });

  describe("showLoginDialog", () => {
    it("should call navigate if login is successful", () => {
      const dialogRef = jasmine.createSpyObj({
        afterClosed: of(true),
        componentInstance: {}
      });
      spyOn(dialogService, "open").and.returnValue(dialogRef);
      spyOn(loginService, "generateToken").and.returnValue(of("testToken"));
      const navigateSpy = spyOn(router, "navigate");
      app.showLoginDialog();
      expect(navigateSpy).toHaveBeenCalledWith(["dashboard"]);
      expect(localStorage.getItem("justin-token")).toEqual("testToken");
    });

    it("should call showLoginDialog if login fails", () => {
      const dialogRef = jasmine.createSpyObj({
        afterClosed: of(true),
        componentInstance: {}
      });
      spyOn(dialogService, "open").and.returnValue(dialogRef);
      spyOn(loginService, "generateToken").and.returnValue(throwError("test"));
      const showLoginSpy = spyOn(app, "showLoginDialog").and.callThrough();
      app.showLoginDialog();
      expect(showLoginSpy).toHaveBeenCalled();
    });
  });
});
