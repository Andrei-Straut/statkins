
export class ProxyRequest {
    url: string;
    method: string;
    headers: any;
    request: any;
    
    constructor(url: string) {
        this.url = url;
        this.method = "GET";
        this.headers = {
            "Content-Type": "application/json",
            "Server": "GlassFish Server Open Source Edition 4.0"
        };
    }
    
    build():JSON {
        var request: any = {};
        
        request.endpoint = this.url;
        request.method = this.method;
        request.headers = this.headers;
        
        return request as JSON;
    }
}