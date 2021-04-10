import { Observable, of } from "rxjs";
import { MatDialogConfig } from "@angular/material/dialog";
import { ComponentType } from "@angular/cdk/portal";
import { LoginRequest } from "../models/login";
import { SnackBarPanelClass } from "../services/snackbar/snackbar.service";
import { AppConfig } from "../models/app-config";
import { MockAppConfig } from "./app-config";

export class MockMatDialog {
  open(component: ComponentType<any>, config?: MatDialogConfig): object {
    return{
      afterClosed(): Observable<object> {
        return of({});
      }
    }
  };

  close(dialogResult?: any): void {}

  closeAll(): void {}
}

export class MockHttpService {
  get<T>(url: string): Observable<any> {
    return of(null);
  }

  post<T>(url: string, body: any, options?: any): Observable<any> {
    return of(null);
  }

  put<T>(url: string, body: any): Observable<any> {
    return of(null);
  }

  delete<T>(url: string): Observable<any> {
    return of(null);
  }
}

export class MockLoginService {
  generateToken(user: LoginRequest): Observable<any> {
    return of(null);
  }

  validateToken(): Observable<any> {
    return of(null);
  }
}

export class MockSnackBarService {
  showMessage(msg: string, panelClass: SnackBarPanelClass): void {}
}

export class MockApplicationsService {
  getAppHealth(conf: AppConfig): Observable<any> {
    return of({ status: 200 });
  }

  loadApps(): Observable<object> {
    return of([MockAppConfig.mockConfig1]);
  }

  stripURL(url: string): string {
    return "";
  }

  getAppImage(conf: AppConfig): string {
    return "";
  }
}

export const MockWindow = {
  location: {
    _href: '',
    set href(url: string) {
      this._href = url;
    },
    get href(): string {
      return this._href;
    }
  }
};
