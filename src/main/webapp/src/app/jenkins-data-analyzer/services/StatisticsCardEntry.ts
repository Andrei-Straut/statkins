import { StatisticsEntry } from './StatisticsEntry';

export class StatisticsCardEntry {
    private _title: string;
    private _subTitle: string;
    private _contents: Array<StatisticsEntry>;
    
    constructor(title:string, subTitle: string, contents: Array<StatisticsEntry>) {
        this._title = title;
        this._subTitle = subTitle;
        this._contents = contents !== undefined && contents !== null ? contents : new Array<StatisticsEntry>();
    }
    
    public addContent(key: string, value: string, url: string) {
        this._contents.push(new StatisticsEntry(key, value, url));
    }
    
    get title():string {
        return this._title;
    }
    
    get subTitle():string {
        return this._subTitle;
    }
    
    get contents():Array<StatisticsEntry> {
        return this._contents;
    }
}