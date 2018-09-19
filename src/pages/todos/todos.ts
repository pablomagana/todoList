import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TodoModel } from '../../shared/todo-model';

@IonicPage()
@Component({
  selector: 'page-todos',
  templateUrl: 'todos.html',
})
export class TodosPage {

  public todos: TodoModel[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TodosPage');
    this.todos = [
      new TodoModel("this is an element"),
      new TodoModel("this is an element", false),
      new TodoModel("this is an element", false, true),
      new TodoModel("this is an element", true, true)
    ]
  }


  setTodoStyles(item:TodoModel){
    let styles = {
      'text-decoration': item.isDone ? 'line-through': 'none',
      'font-weight': item.isImportant ? "600" : 'normal'
    };
    return styles;
  }

  toogleTodo(todo:TodoModel){
    todo.isDone = !todo.isDone;
  }

  showAddTodo(){

  }
}
