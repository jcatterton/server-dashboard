import { Component, OnInit } from '@angular/core';
import { ApplicationsService } from "../../services/applications/applications.service";
import { AppConfig, AppInfo } from "../../models/app-config";
import { Router } from "@angular/router";
import { LoginService } from "../../services/login/login.service";
import { SnackBarPanelClass, SnackbarService } from "../../services/snackbar/snackbar.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  apps: AppInfo[] = [];
  loading = true;
  hoverAppInfo: string[] = ['', ''];

  constructor(
    private appService: ApplicationsService,
    private router: Router,
    private loginService: LoginService,
    private snackBarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.loginService.validateToken().subscribe(() => {
      this.loadApps();
    }, () => {
      this.router.navigate([""]);
    });
  }

  loadApps(): void {
    this.appService.loadApps().subscribe(data => {
      (data as AppConfig[]).forEach(appConfig => {
        const info = { config: appConfig } as AppInfo;
        this.appService.getAppHealth(appConfig).subscribe(response => {
          info.healthy = response.status === 200;
          this.loading = false;
        }, err => {
          info.healthy = err.status === 200;
          this.loading = false;
        });
        this.apps.push(info);
        this.sortApps();
      });
    }, err => {
      this.snackBarService.showMessage("Error loading application information", SnackBarPanelClass.fail);
      console.log(err);
      this.loading = false;
    });
  }

  sortApps(): void {
    this.apps = this.apps.sort(function(a: AppInfo, b: AppInfo): number {
      return a.config.appName.localeCompare(b.config.appName);
    });
  }

  navigateToApp(app: AppInfo): void {
    if (app.healthy) {
      window.location.href = app.config.url;
    }
  }

  getImageUrl(app: AppInfo): string {
    return this.appService.getAppImage(app.config);
  }

  setHoverAppInfo(app: AppInfo): void {
    this.hoverAppInfo[0] = `${app.config.description}`;
    this.hoverAppInfo[1] = `Dependencies: ${app.config.dependencies.length === 0 ? "None" : app.config.dependencies.join(", ")}`;
  }
}
