import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { AppConfig } from "../../models/app-config";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {
  readonly baseURL = "server";

  constructor(
    private http: HttpClient
  ) {}

  getAppHealth(conf: AppConfig): Observable<HttpResponse<object>> {
    return this.http.get(`${this.baseURL}${this.stripURL(conf.url)}health`, { observe: "response" });
  }

  loadApps(): Observable<object> {
    return this.http.get("assets/apps.json");
  }

  stripURL(url: string): string {
    return url.replace(/.*:[0-9]{5}/, "");
  }

  getAppImage(conf: AppConfig): string {
    return `${this.baseURL}/contentapi/file/${conf.imageLocation}`;
  }
}
