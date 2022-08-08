import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import swal from 'sweetalert2'

@Component({
  selector: 'qrcode-socket',
  templateUrl: './qrcode-socket.component.html',
  styleUrls: ['./qrcode-socket.component.scss']
})
export class QrcodeSocketComponent implements OnInit {
  imageBase64: string = ''
  error: string = ''
  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    // this.qrcode('')

    let uri = "wss://rsu-app-api.71dev.com/uat/ws"
    let socket =  new WebSocket(uri)
    
  
    socket.onopen = (event) => {
      console.log("opened connection to " + uri);
    };

    socket.onclose = (event) => {
      console.log("closed connection from " + uri);
    };

    socket.onmessage = (event) => {
      this.qrcode(event.data)
      console.log(event.data);
    };

    socket.onerror = (event) => {
      this.error =  ` error : ${(event as any).data}`
      console.log("error: " + (event as any).data);
   }; 
  }


  private qrcode(qrcode){
      let prefix = 'data:image/jpeg;base64,'
      let object = JSON.parse(qrcode)
      this.imageBase64 =`${prefix}${object.image}`
      swal.fire({
      html:
        `<img style="width: 100vw;height: 100vh;" src="${this.imageBase64}" alt="">        
        `,
      showConfirmButton: false,
    })
  }

}
