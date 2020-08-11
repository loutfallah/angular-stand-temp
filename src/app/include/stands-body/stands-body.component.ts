import { Component, OnInit } from '@angular/core';
import { StandService } from 'src/app/service/stand.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-stands-body',
  templateUrl: './stands-body.component.html',
  styleUrls: ['./stands-body.component.css']
})
export class StandsBodyComponent implements OnInit {
  _dataStand;
  constructor(
    private standSRV: StandService,
    private formBuilder: FormBuilder,
    private _router:Router
  ) { }

  allStands(){
    
    this.standSRV.selectAllStands().subscribe(
      data => {
        this._dataStand = data;
        console.log(this._dataStand)
      },
      err => {
        console.error(err);
      }
    );
  }
  deleteStand(id){
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Si vous confirmez qu'il sera supprimé!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Non, garde-le'
    }).then((result) => {
      if (result.value) {
        this.standSRV.suprimerStand(id).subscribe(() => location.reload());
        
        Swal.fire({
          title: 'Supprimé!',
          text: 'Il a été supprimé avec succès.',
          icon: 'success',
          timer: 3000
    }).then((result) => {
      
        location.reload();
  
    })
        /* 'Supprimé!',
        'Il a été supprimé avec succès.',
        'success' */
      } 
    })
    
  }

  ngOnInit() {
    this.allStands();
  }

}
