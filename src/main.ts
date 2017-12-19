import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { WEBRTC_SUPPORT } from 'simple-peer';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

if (WEBRTC_SUPPORT) {
  platformBrowserDynamic().bootstrapModule(AppModule);
} else {
  console.error('WebRTC is not support');
}

