import { Component, Inject, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'petrolstation-app';
  constructor(private modalService: NgbModal, @Inject(DOCUMENT) private document: Document){
  }

  ngOnInit() {
    this.document.documentElement.lang = 'hu'; 
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }
  
}
