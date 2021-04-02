import { Component, OnInit } from '@angular/core';
import { ApplicationsService } from "../../services/applications.service";
import { AppInfo } from "../../models/app-config";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  apps: AppInfo[] = [];

  constructor(
    private appService: ApplicationsService
  ) {}

  ngOnInit(): void {
    this.loadApps();
    this.sortApps();
  }

  loadApps(): void {
    const apps = this.appService.loadApps();
    apps.forEach(appConfig => {
      const info = { config: appConfig } as AppInfo;
      this.appService.getAppHealth(appConfig).subscribe(response => {
        info.healthy = response.status === 200;
      }, err => {
        info.healthy = err.status === 200;
      });
      this.apps.push(info);
    });
  }

  sortApps(): void {
    this.apps.sort(function(a: AppInfo, b: AppInfo){
      return a.config.appName.localeCompare(b.config.appName);
    })
  }

  navigateToApp(app: AppInfo) {
    if (app.healthy) {
      window.location.href = app.config.url;
    }
  }

  getTooltip(app: AppInfo): string[] {
    return [`Name: ${app.config.appName}`, `Description: ${app.config.description}`, `Status: ${app.healthy ? "Healthy" : "Unhealthy"}`]
  }
}
