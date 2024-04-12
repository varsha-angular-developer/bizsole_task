import { Component, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
myName : any = 'varsha';

  ngOnInit(): void {
    throw new Error('Method not implemented.');
   
  }
  title = 'Bizsole_Ang_Project';

  parentfun(event:any){
console.log(event)
  }
  handleValue(value: string) {
    console.log("Value received from child:", value);
  }
}
