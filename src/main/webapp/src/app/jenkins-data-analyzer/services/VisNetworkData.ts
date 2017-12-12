import { DataSet } from 'vis';

export interface VisNetworkData {
    nodes: DataSet<any>;
    edges: DataSet<any>;
}