import { AppConfig } from "../models/app-config";

export class MockAppConfig {
  static validConfig: AppConfig = {
    appName: "test-app",
    url: "000.000.0.00:00000",
    description: "A test application",
    imageLocation: "app/assets/test.png",
    dependencies: []
  }
}
