import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {ConfigModule} from '../../config/config.module';
import {ProxyModule} from '../../proxy/proxy.module';
import {UtilModule} from '../../util/util.module';

import {JenkinsAverageBuildDurationGraphComponent} from './jenkins-average-build-duration-graph.component';

describe('JenkinsAverageBuildDurationGraphComponent', () => {
    let component: JenkinsAverageBuildDurationGraphComponent;
    let fixture: ComponentFixture<JenkinsAverageBuildDurationGraphComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule, FormsModule, ConfigModule, ProxyModule, UtilModule
            ],
            declarations: [JenkinsAverageBuildDurationGraphComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(JenkinsAverageBuildDurationGraphComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
