import { Component, OnInit } from '@angular/core';
import { CreditCard } from '../model/credit.card';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Constant } from 'src/environments/environment';

@Component({
  selector: 'app-credit',
  templateUrl: './credit.component.html',
  styleUrls: ['./credit.component.scss']
})
export class CreditComponent implements OnInit {
  applyCard:boolean=true;
  message:string="";
  creditCard:CreditCard={} as CreditCard;
  constructor(private router:Router,private activatedRoute:ActivatedRoute,private http:HttpClient) {
  }

  ngOnInit(): void {
    //Reading data from query parameter ???
    this.activatedRoute.queryParams.subscribe(params=>{
        this.creditCard.name=params['name'];
        this.creditCard.email=params['email'];
        this.creditCard.cardName=params['cname'];
        this.creditCard.type=params['ctype'];
        this.creditCard.sid=params['cid'];
    });

    //2202/s-202
     this.activatedRoute.params.subscribe(data=>{
       let applicationId=data['applicationId'];
       this.http.get<CreditCard>(`${Constant.BASE_URI}/creditcards/details/${applicationId}`).subscribe((creditCard:CreditCard)=>{
            this.creditCard=creditCard;
            this.creditCard.name = localStorage.getItem('username')??'';
            this.applyCard=false;
       });
      });
  }

  updateCreditCardStatus(status:string){
      //{'attributeName':'email','attributeValue':'Approve'}
      const patchRequest={attribute:this.creditCard.applicationId,value:status};
      this.http.patch(`${Constant.BASE_URI}/creditcards/status`,patchRequest).subscribe(response=>{
        this.router.navigate(['dashboard']);
      });
  }

  applyCreditCard(){
    console.log(this.creditCard);
    ///v1/creditcards/apply
    this.http.post(`${Constant.BASE_URI}/creditcards/apply`,this.creditCard).subscribe(response=>{
          this.router.navigate(['dashboard']);
    });
  }

}
