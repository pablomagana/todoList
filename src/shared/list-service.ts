import { Injectable } from '@angular/core';
import { ListModel } from './list-model';

@Injectable()
export class ListService {

  public lists:ListModel[]= [];
  constructor() {
    this.getLists();
  }

  getLists(){
    this.lists = [
      new ListModel("Lista 1" ,0),
      new ListModel("Lista 2" ,1),
      new ListModel("Lista 3" ,2),
      new ListModel("Lista 4" ,3),
      new ListModel("Lista 5" ,4),
    ]
  }

  public addList(name:string){
    let list = new ListModel(name, this.lists.length);
    this.lists = [...this.lists,list];
  }
}
