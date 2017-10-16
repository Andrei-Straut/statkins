import { Injectable } from '@angular/core';

@Injectable()
export class AppDefinitionService {
    readonly appName = 'Statkins';
    readonly developerName = 'Andrei Straut';
    readonly copyright: string;
    
    constructor() {
        this.copyright = '© ' + this.developerName + ' ' + new Date().getFullYear();
    }
}