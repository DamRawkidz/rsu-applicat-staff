import { AfterViewInit, ComponentFactoryResolver, Directive, ElementRef, Input, OnDestroy, OnInit, Optional, Self, TemplateRef, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Directive({
  selector: '[displayViewByRole]',
})
export class RoleDirective implements OnInit{
  private role = []
  @Input('displayViewByRole') 
  public set getRole(role: any) {
      this.role = [...role]
  }

  private url: string = ''
  @Input('displayViewByRoleTargetUrl')
  public set getTargetUrl(url: string){
    this.url = url
  }

  

  constructor(
    public _templateRef: TemplateRef<any>,
    public _viewContainer: ViewContainerRef,
    private router: Router,
  ) {}

  ngOnInit(): void {

    let componentChildren = this.router.config.find(router => router.children)
    let role = componentChildren.children.find(x => x.path === this.url).data.role
    if(typeof role === 'string') return this.singleRole(role)
    if(typeof role === 'object') return this.moreRole(role)
  }

  private singleRole(role: string){
    if(this.role.some(x => x.object_code == role)) {
      this._viewContainer.createEmbeddedView(this._templateRef)
    } else {
      this._viewContainer.remove()
    }
  }

  private moreRole(role: string[]){
      let haveRole =  role.some(code => this.role.some(x => x.object_code == code))
      if(haveRole) {
        this._viewContainer.createEmbeddedView(this._templateRef)
      } else {
        this._viewContainer.remove()
      }
  }



}
