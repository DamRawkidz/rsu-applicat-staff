import { environment } from './../../../environments/environment';
import { tap } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

export class BaseForm {
    isHideForm: boolean = environment.hideForm
    form:FormGroup
    baseFormBuilder: FormBuilder
    public state: string 
    protected id:number
    isProduction = environment.production
    constructor(
        public baseForm:FormBuilder,
        public BaseFormActiveRoute: ActivatedRoute,
    ) { 
        this.baseFormBuilder = this.baseForm
        this.form = this.createForm()
        this.BaseFormActiveRoute.params.pipe(
            tap(x => console.log('log from BaseForm', x)),
            tap(x => console.log(x.id) ),
            tap(x => x.id ? this.state = 'edit': this.state = 'add'),
            tap(x => this.id = x.id),
    ).subscribe()
    }
    createForm(){
        return this.baseFormBuilder.group({})
    }

    back(){
        window.history.back()
    }
    
}
export var sortByProperty = function (property) { 

    return function (x, y) { 

        return ((x[property] === y[property]) ? 0 : ((x[property] > y[property]) ? 1 : -1)); 

    }; 

};  