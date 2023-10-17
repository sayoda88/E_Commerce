import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  @Input() title: string = '';
  @Input() recData:any[]=[];
  @Output() selectedCateName=new EventEmitter;
  constructor() {

  }

  ngOnInit(): void {

  }


  detectChanges(event: any) {
    this.selectedCateName.emit(event)
  }
}
