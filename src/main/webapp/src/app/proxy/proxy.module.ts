import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProxyService } from './services/proxy.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [ProxyService]
})
export class ProxyModule { }
