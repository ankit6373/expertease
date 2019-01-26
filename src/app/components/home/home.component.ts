import { Component, OnInit,ViewChild } from '@angular/core';

import { DataService }  from '../../services/data.service';
import { FormGroup,FormControl,Validators,AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    showAddproject  : boolean = false;
	showallprojects : boolean = true;

	allUsers  : any[];
	allForms  : any[];
	allProjects : any[];
	
	selectedForms : any[] = [];
	selectedUsers : any[] = [];
	selectedSymbol : any;
	sForm : any;
	sUser : any;
	showRemainder : boolean = true;
	showSuccess   : boolean = false;
	projectForm  : FormGroup;
	selectedProject : any;
	selectedProjectId : any;
	nameSearch: string;
	
    constructor(private dataservice:DataService) {

        this.projectForm = new FormGroup({
			'projectname' : new FormControl('',Validators.required),
			'description' : new FormControl('',Validators.required)
		}); 

	}

    ngOnInit() {
		this.getAllUsers();
		this.getAllForms();
		this.getProject();
    }
	
	public getAllUsers(){
		this.dataservice.getAllUsers()
		        .subscribe(
				    response  => {
						this.allUsers = response;
						//console.log(this.allUsers);
					},
					error     => {
						console.log(error);
					}
				);
	}
	
	public getAllForms(){
		this.dataservice.getAllForms()
		        .subscribe(
				    response  => {
						this.allForms = response;
						//console.log(this.allForms);
					},
					error     => {
						console.log(error);
					}
				);
	}
	
	

	public selectForm() {
		var index = this.allForms.indexOf(this.sForm);
		this.allForms.splice(index,1);
		
		this.selectedForms.push(this.sForm);
		//console.log(this.selectedForms);
		
	}
	
	
	public selectUser(){
		console.log(this.sUser);
		
		var index = this.allUsers.indexOf(this.sUser);
		this.allUsers.splice(index,1);
		/*
		var us = event.target.value;
		this.selectedUsers.push(us);
		console.log(this.selectedUsers);
		*/
		this.selectedUsers.push(this.sUser);
		console.log(this.selectedUsers);
	}
	
	
	
	public selectSymbol(event){
		this.selectedSymbol = event.target.value;
		console.log(this.selectedSymbol);
	}
	
	
	public addProject(value1,value2){
				
		this.dataservice.postProject({
			projectName   : value1,
		    description   : value2,
		    assignedUsers : this.selectedUsers,
		    selectedForms : this.selectedForms,
		    symbol        : this.selectedSymbol
		}).subscribe(
		      response => {
				  console.log(response);
				  this.showSuccess = true;
				  this.showallprojects = true;
		          this.showAddproject  = false;
			  },
			  error    => {
				  console.log(error);
			  }
		);
		
		
	}
	
	public getProject(){
		this.dataservice.getProject()
		    .subscribe(
			    response  => {
					this.allProjects = response;
					console.log(this.allProjects);
				},
				error     => {
					console.log(error);
				}
			);
	}
	
	public selectProject(project){
		this.selectedProject = project;
		this.selectedProjectId = project._id;
		console.log(this.selectedProject);
		console.log(this.selectedProjectId);
	}
	
	public showAddNewForm(id){
		console.log(id);
	}
	
	public showAllProjects(){
		this.showallprojects = true;
		this.showAddproject  = false;
	}
	
	public showAddProjectDiv(){
		this.showallprojects = false;
		this.showAddproject  = true;
	}

}
