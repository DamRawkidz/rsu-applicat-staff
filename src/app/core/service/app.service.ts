import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public searchReport$  = new BehaviorSubject(null)
  constructor() { }
  
  swaltAlert(title:string = 'บันทึก',text:string = 'บันทึกสำเร็จ') {
    swal.fire({
      text: text,
      icon: 'success',
      // confirmButtonText: 'Cool'
    })
  }
  swaltAlertError(title:string = 'Error',text:string) {
    swal.fire({
      text: text,
      icon: 'error',
      // confirmButtonText: 'Cool'
    })
  }
}
