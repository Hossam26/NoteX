import {NgModule , Component, OnInit } from '@angular/core';
import { NoteService } from "../note.service";
import { AuthGuardService } from "../auth-guard.service";
import jwt_decode from "jwt-decode";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
declare var $:any
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  Id:any;
   decoded:any;
   Notes:any;
   check:boolean= false;
   TOKEN:any= localStorage.getItem("token")
  constructor(private _note:NoteService,private _authGuard:AuthGuardService, private _Router:Router) {
    this.decoded= jwt_decode(this.TOKEN);
    this.getnotes()
   }
   addForm=new FormGroup({
     title:new FormControl(),
     desc:new FormControl('',Validators.required)

   });
   editForm=new FormGroup({ 
      title:new FormControl(),
    desc:new FormControl('',Validators.required)
});
   deleteNote(noteId:any){
    let data={
    NoteID:noteId,
    token:this.TOKEN
    }
    this._note.deleteNote(data).subscribe((res)=>{
      if(res.message=="deleted"){
        if(this.check==true){
              location.reload()
        }
        this.getnotes();
 }
    })
   }
   saveID(id:any){
    this.Id=id;
 }
   updateNote(){
    let data={
      token:this.TOKEN,
      title:this.editForm.controls.title.value,
      desc:this.editForm.controls.desc.value,
      NoteID:this.Id
      }
      
      this._note.updateNote(data).subscribe((res)=>{
        if(res.message=="updated"){

          this.getnotes();
          this.editForm.controls.title.setValue("")
          this.editForm.controls.desc.setValue("")
          $('#editNote').modal('hide')
   }
      })
   }
   reset(){
    this.editForm.controls.title.setValue("")
    this.editForm.controls.desc.setValue("")
    this.addForm.controls.title.setValue("")
    this.addForm.controls.desc.setValue("")
   }
   setCurNote(title:any,desc:any){
    this.editForm.controls.title.setValue(title);
    this.editForm.controls.desc.setValue(desc);


   }
   addNote(){
   let data={
     title:this.addForm.controls.title.value,
     desc:this.addForm.controls.desc.value,
     citizenID:this.decoded._id,
     token:this.TOKEN
   }
   this._note.addeNote(data).subscribe((res)=>{
    if(res.message=="success"){
           this.getnotes();
           this.addForm.controls.title.setValue("")
          this.addForm.controls.desc.setValue("")
           $('#addNote').modal('hide')
    }
   })
   }
   getnotes(){
     let data={
       token:this.TOKEN,
       userID:this.decoded._id
     }
    
     this._note.getUserNotes(data).subscribe((res)=>{
         
           if(res.message=="success"){
             this.Notes=res.Notes;
             if(this.Notes.length==1){
               this.check=true;
              
             }
             else if(this.Notes.length>1){
               this.check=false;
             }
         }
     })
   }
  
  ngOnInit(): void {
  }

}
