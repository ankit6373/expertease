import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

    transform(items: any[], args?: any): any {
    
        if(!args){
		    return items;
	    }
		
		return items.filter(item => {
		    return item.project.toLowerCase().includes(args.toLowerCase() )   ;
	    });	
	
    }

}
