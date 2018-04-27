import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ExplorerService {
    constructor(private http: HttpClient) {
        
    }

    getFiles(path: string) {
        return this.http.get(`http://localhost:100/api/get${path}`);
    }
}