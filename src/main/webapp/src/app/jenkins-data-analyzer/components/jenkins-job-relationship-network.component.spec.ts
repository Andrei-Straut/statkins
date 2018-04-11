import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IJenkinsData} from 'jenkins-api-ts-typings';
import {Network} from 'vis';

import {JenkinsDataProviderService} from '../../test-mock/services/jenkins-data-provider.service';

import {ConfigModule} from '../../config/config.module';
import {ProxyModule} from '../../proxy/proxy.module';
import {UtilModule} from '../../util/util.module';
import {UtilMockService} from '../../test-mock/services/util.mock.service';

import {JenkinsJobRelationshipNetworkComponent} from './jenkins-job-relationship-network.component';

describe('JenkinsJobRelationshipNetworkComponent', () => {
    let component: JenkinsJobRelationshipNetworkComponent;
    let fixture: ComponentFixture<JenkinsJobRelationshipNetworkComponent>;
    let data: IJenkinsData = new JenkinsDataProviderService().getData();

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
        component.utilService = new UtilMockService();
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('showNodesWithEdges should be true by default', () => {
        expect(component.showNodesWithEdges).toBeTruthy();
    });

    it('toggleConnectedNodes should toggle node state', () => {
        component.analyze(data);
        component.toggleConnectedNodes();
        expect(component.showNodesWithEdges).toBeFalsy();
    });

    it('showNodesWithoutEdges should be true by default', () => {
        expect(component.showNodesWithoutEdges).toBeTruthy();
    });

    it('toggleUnconnectedNodes should toggle node state', () => {
        component.analyze(data);
        component.toggleUnconnectedNodes();
        expect(component.showNodesWithoutEdges).toBeFalsy();
    });
    
    it('isFullscreen should be false by default', () => {
        expect(component.isFullscreen).toBeFalsy();
    });

    it('toggleFullscreen should toggle fullscreen', () => {
        component.analyze(data);
        component.toggleFullscreen();
        expect(component.isFullscreen).toBeTruthy();
    });
    
    it('analyze should return a valid network', () => {
        component.jenkinsData = data;
        let network: Network = component.analyze(data);
        expect(network).toBeDefined();
    });
});
