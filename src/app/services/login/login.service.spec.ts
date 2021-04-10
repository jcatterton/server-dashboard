import { TestBed } from '@angular/core/testing';
import { LoginService } from './login.service';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MockHttpService } from "../../mocks/services";
import { HttpClient, HttpHeaders } from "@angular/common/http";

describe('LoginService', () => {
  let service: LoginService;
  let httpService: MockHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        { provide: HttpClient, useClass: MockHttpService }
      ]
    });
    service = TestBed.inject(LoginService);
    httpService = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe("generateToken", () => {
    it("should call http post", () => {
      const postSpy = spyOn(httpService, "post");
      service.generateToken({username: "test", password: "test"});
      expect(postSpy).toHaveBeenCalledWith(`${service.baseURL}/loginservice/login`, {username: "test", password: "test"});
    });
  });

  describe("validateToken", () => {
    it("should call http post", () => {
      let header = new HttpHeaders();
      header = header.append("Authorization", `Bearer ${localStorage.getItem("justin-token")}`);
      const postSpy = spyOn(httpService, "post");
      service.validateToken();
      expect(postSpy).toHaveBeenCalledWith(`${service.baseURL}/loginservice/token`, null, {headers: header});
    });
  });
});
