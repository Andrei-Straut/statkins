import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {ConfigModule} from '../../config/config.module';
import {ProxyModule} from '../../proxy/proxy.module';
import {UtilModule} from '../../util/util.module';

import {JenkinsJobBuildGraphComponent} from './jenkins-job-build-graph.component';

describe('JenkinsJobBuildGraphComponent', () => {
    let component: JenkinsJobBuildGraphComponent;
    let fixture: ComponentFixture<JenkinsJobBuildGraphComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule, FormsModule, ConfigModule, ProxyModule, UtilModule
            ],
            declarations: [JenkinsJobBuildGraphComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(JenkinsJobBuildGraphComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
