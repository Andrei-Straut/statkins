import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CommonModule} from '@angular/common';

import {ConfigModule} from '../../config/config.module';
import {ProxyModule} from '../../proxy/proxy.module';
import {UtilModule} from '../../util/util.module';

import {JenkinsDataRetrieverComponent} from './jenkins-data-retriever.component';

describe('JenkinsDataRetrieverComponent', () => {
    let component: JenkinsDataRetrieverComponent;
    let fixture: ComponentFixture<JenkinsDataRetrieverComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, ConfigModule, ProxyModule, UtilModule],
            declarations: [JenkinsDataRetrieverComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(JenkinsDataRetrieverComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
