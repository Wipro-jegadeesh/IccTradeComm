import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { OAuthModule, AuthConfig, OAuthService, OAuthErrorEvent } from 'angular-oauth2-oidc';
import { filter } from 'rxjs/operators';

import { AuthConfigService } from '../../app/service/auth.guard.service';
import { authConfig, OAuthModuleConfig } from './auth.config';

export function init_app(authConfigService: AuthConfigService) {
  return () => authConfigService.initAuth();
}
@NgModule({
  imports: [HttpClientModule, OAuthModule.forRoot()],
  providers: [
    AuthConfigService,
    { provide: AuthConfig, useValue: authConfig },
    OAuthModuleConfig,
    {
      provide: APP_INITIALIZER,
      useFactory: init_app,
      deps: [AuthConfigService],
      multi: true
    }
  ]
})
export class AuthConfigModule {
}