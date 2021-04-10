import { AppConfig, AppInfo } from "../models/app-config";

export class MockAppConfig {
  static mockConfig1: AppConfig = {
    appName: "test-app-1",
    url: "000.000.0.00:00000",
    description: "A test application",
    imageLocation: "app/assets/test.png",
    dependencies: []
  };

  static mockConfig2: AppConfig = {
    appName: "test-app-2",
    url: "000.000.0.00:00000",
    description: "A test application",
    imageLocation: "app/assets/test.png",
    dependencies: []
  };

  static mockConfig3: AppConfig = {
    appName: "test-app-3",
    url: "000.000.0.00:00000",
    description: "A test application",
    imageLocation: "app/assets/test.png",
    dependencies: []
  };

  static mockConfigs = [MockAppConfig.mockConfig1, MockAppConfig.mockConfig2, MockAppConfig.mockConfig3];

  static mockAppInfo1: AppInfo = {
    config: MockAppConfig.mockConfig1,
    healthy: true
  };

  static mockAppInfo2: AppInfo = {
    config: MockAppConfig.mockConfig2,
    healthy: true
  };

  static mockAppInfo3: AppInfo = {
    config: MockAppConfig.mockConfig3,
    healthy: true
  };

  static mockAppInfo = [MockAppConfig.mockAppInfo1, MockAppConfig.mockAppInfo2, MockAppConfig.mockAppInfo3];
}
