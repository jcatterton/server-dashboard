import { TestBed } from "@angular/core/testing";
import { ApplicationsService } from "./applications.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { MockAppConfig } from "../mocks/app-config";
import { of } from "rxjs";
import { HttpClient } from "@angular/common/http";

describe("ApplicationsService", () => {
  let service: ApplicationsService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(ApplicationsService);
    http = TestBed.inject(HttpClient);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
  
  describe("getAppHealth", () => {
    it("should return true if http response status is 200", () => {
      spyOn(http, "get").and.returnValue(of({ status: 200 }));
      expect(service.getAppHealth(MockAppConfig.validConfig)).toBeTruthy();
    });

    it("should return false if http response status is not 200", () => {
      spyOn(http, "get").and.returnValue(of({ status: 500 }));
      expect(service.getAppHealth(MockAppConfig.validConfig)).toBeFalsy();
    });
  });

  describe("loadApps", () => {
    it("should return array of AppConfigs", () => {
      const result = service.loadApps();
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].appName).toBeTruthy();
    });
  });
});
