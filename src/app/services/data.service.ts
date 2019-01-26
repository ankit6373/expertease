import { Injectable } from '@angular/core';
import { Http,Headers,Response } from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Project } from '../models/project.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

    constructor(private http: Http) { }
	
	
	public postProject(project:Project){
		return this.http.post('https://experteasebacky.herokuapp.com/add-project',project);
	}
	
	public getProject(){
		return this.http.get('https://experteasebacky.herokuapp.com/get-projects')
		    .pipe(
			    map(
				    (response:Response) => {
						return response.json();
					}
				)
			);
	}
	
	public getAllUsers(){
		return this.http.get('https://experteasebacky.herokuapp.com/get-all-users')
		    .pipe(
			    map(
				    (response:Response) => {
						return response.json();
					}
				)
			);
	}
	
	public getAllForms(){
		return this.http.get('https://experteasebacky.herokuapp.com/get-all-forms')
		    .pipe(
			    map(
				    (response:Response) => {
						return response.json();
					}
				)
			);
	}
	
}
