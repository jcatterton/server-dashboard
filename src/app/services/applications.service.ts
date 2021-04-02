import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { AppConfig } from "../models/app-config";
import appData from "../config/apps.json"
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {
  readonly baseURL = "server";

  constructor(
    private http: HttpClient
  ) {}

  getAppHealth(conf: AppConfig): Observable<HttpResponse<Object>> {
    return this.http.get(`${this.baseURL}/${this.stripURL(conf.url)}/health`, { observe: "response" });
  }

  loadApps(): AppConfig[] {
    return appData as AppConfig[];
  }

  stripURL(url: string): string {
    return url.replace(/.*:[0-9]{5}/, "")
  }
}
