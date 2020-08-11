import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-liens-externes-body',
  templateUrl: './liens-externes-body.component.html',
  styleUrls: ['./liens-externes-body.component.css']
})
export class LiensExternesBodyComponent implements OnInit {
  @Input() _lien_extern:Array<any>;

  
  constructor() { }

  ngOnInit() {
  }

}
