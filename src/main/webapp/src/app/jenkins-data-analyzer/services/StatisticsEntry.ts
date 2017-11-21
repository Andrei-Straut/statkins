export class StatisticsEntry {
    private _title: string;
    private _subTitle: string;
    private _url: string;
    
    constructor(title:string, subTitle: string, url: string) {
        this._title = title;
        this._subTitle = subTitle;
        this._url = url;
    }
    
    get title():string {
        return this._title;
    }
    
    get subTitle():string {
        return this._subTitle;
    }
    
    get url():string {
        return this._url;
    }
    
    hasUrl(): boolean {
        return this._url !== undefined && this._url !== null;
    }
}