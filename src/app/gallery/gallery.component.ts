import { Component,HostListener } from '@angular/core';
import { Gallery } from '../model/gallery.model';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Constant } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent {

name:string='';
 // id : any;

 private selectFile:any;

 private gid:number=0;
  
 mapData : any =[];

 sortType:string="name";
 searchText:string='';
 cphoto:any="data:image/jpeg;base64,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";

galleryDetails:Gallery={} as Gallery;  
constructor(private activatedRoute:ActivatedRoute,private http:HttpClient,private sanitizer: DomSanitizer) {

 }

 public  editGallary(item:Gallery) : void {
     this.cphoto='data:image/png;base64,'+item.photo;
     this.gid=item.id;
    // this.selectFile=new File([this.cphoto], item.name,{ type: "image/png" });
 }

 public deleteGallary(id:number){
    ///REST API CALL AND DELETE
    const uri=`${Constant.BASE_URI}/gallery/${id}`;
    this.http.delete(uri).subscribe(data=>{
      this.fetch();
    });

 }
  //  @HostListener('click')
//  ssearchResults() {
//    console.log(this.searchText);
//    this.fetch();
//  }

 public searchResults(searchText:any) : void {
  this.searchText=searchText.value;
  this.fetch();
}

 private fetch(){
      let uri=`${Constant.BASE_URI}/gallery`;
      let queryParams = new HttpParams();
      if(this.sortType!==null || this.sortType!==''){
       
        queryParams = queryParams.append("sortBy",this.sortType);
      }
       
      if(this.searchText!==null || this.searchText!==''){
        queryParams = queryParams.append("text",this.searchText);
      }

      this.http.get(uri, {params:queryParams}).subscribe(data =>{
         this.mapData=data;
          
      });
 }


 public sort(){
 
     
     if(this.sortType==='filesize'){
      this.mapData=this.mapData.sort((s1:any,s2:any)=>{
        return s2.size-s1.size;
     });
     }
     else if(this.sortType==='name'){
      this.mapData=this.mapData.sort((s1:any,s2:any)=>{
        return s1.name.toLowerCase().localeCompare(s2.name.toLowerCase());
     });
     }

     else if(this.sortType==='createdDate'){
      
          this.fetch();
     }
 }

ngOnInit(): void {
 
  this.fetch();

}



onFileChange(event:any) :void {
  if (event.target.files.length > 0) {
    const file = event.target.files[0];
    this.selectFile=file;

  const fileReader = new FileReader()
  fileReader.readAsDataURL(file)

  fileReader.onload = () => {
      // You'll get the base64 string here
      this.cphoto = this.sanitizer.bypassSecurityTrustUrl(fileReader.result+'');
  }

  fileReader.onerror = (error) => {
      console.log("Error reading file :", error)
  }
    
  }
}



uploadFile(){
  //FormData is java script class which is used to send file
  const formData = new FormData();
  formData.append('photo', this.selectFile);
  formData.append('gid', ""+this.gid);
  
  const uri=`${Constant.BASE_URI}/gallery/upload`;

  this.http.post(uri, formData)
    .subscribe(res => {
      this.fetch();
      this.gid=0;
 })
    console.log(formData);

}

}