import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  name:string="India";
  title:string = 'bankingapp-ui';
  message:string="";

  public auth(userInput:any,passwordInput:any):void {
    if("jack"===userInput.value && "jill"===passwordInput.value){
          this.message="Hey! username and password are correct!";
    }else{
      this.message="Sorry! username and password are not correct!";
    }
  }
}
