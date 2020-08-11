import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-video-body',
  templateUrl: './video-body.component.html',
  styleUrls: ['./video-body.component.css']
})
export class VideoBodyComponent implements OnInit {
  @Input() _video:Array<any>;

  
  constructor(private sanitizer:DomSanitizer) { }

  ngOnInit() {
  }
  getEmbedUrl(item){
    return this.sanitizer.bypassSecurityTrustResourceUrl('//www.youtube.com/embed/'+item);
  }
}
