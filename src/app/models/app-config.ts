export interface AppConfig {
  appName: string,
  url: string,
  description: string,
  imageLocation: string,
  dependencies: string[]
}

export interface AppInfo {
  config: AppConfig,
  healthy: boolean
}
