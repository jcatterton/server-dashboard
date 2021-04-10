import { TestBed } from "@angular/core/testing";
import { ApplicationsService } from "./applications.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MockAppConfig } from "../../mocks/app-config";
import { HttpClient } from "@angular/common/http";
import { MockHttpService } from "../../mocks/services";

describe("ApplicationsService", () => {
  let service: ApplicationsService;
  let httpMock;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ApplicationsService,
        { provide: HttpClient, useClass: MockHttpService }
      ]
    });

    service = TestBed.inject(ApplicationsService);
    httpMock = TestBed.inject(HttpClient);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  describe("getAppHealth", () => {
    it("should return object with status", () => {
      const getSpy = spyOn(httpMock, "get");
      const conf = MockAppConfig.mockConfig1;
      service.getAppHealth(conf);
      expect(getSpy).toHaveBeenCalledWith(`${service.baseURL}${service.stripURL(conf.url)}health`, { observe: "response" });
    });
  });

  describe("loadApps", () => {
    it("should call http get", () => {
      const getSpy = spyOn(httpMock, "get");
      service.loadApps();
      expect(getSpy).toHaveBeenCalledWith("assets/apps.json");
    });
  });

  describe("stripURL", () => {
    it("should remove address prefix", () => {
      const url = "http://192.168.1.15:12345/testapp";
      expect(service.stripURL(url)).toEqual("/testapp");
    });
  });

  describe("getAppImage", () => {
    it("should return image URL", () => {
      const conf = MockAppConfig.mockConfig1;
      expect(service.getAppImage(conf)).toEqual(`${service.baseURL}/contentapi/file/${conf.imageLocation}`);
    });
  });
});
