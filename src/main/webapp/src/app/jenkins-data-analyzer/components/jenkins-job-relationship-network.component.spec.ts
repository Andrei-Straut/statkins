import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {ConfigModule} from '../../config/config.module';
import {ProxyModule} from '../../proxy/proxy.module';
import {UtilModule} from '../../util/util.module';

import {JenkinsJobRelationshipNetworkComponent} from './jenkins-job-relationship-network.component';

describe('JenkinsJobRelationshipNetworkComponent', () => {
    let component: JenkinsJobRelationshipNetworkComponent;
    let fixture: ComponentFixture<JenkinsJobRelationshipNetworkComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule, FormsModule, ConfigModule, ProxyModule, UtilModule
            ],
            declarations: [JenkinsJobRelationshipNetworkComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(JenkinsJobRelationshipNetworkComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
