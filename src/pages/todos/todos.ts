import { Component } from '@angular/core';
import { IonicPage,ModalController, NavController, NavParams } from 'ionic-angular';

import { TodoModel } from '../../shared/todo-model';
import { AddTaskModalPage } from '../add-task-modal/add-task-modal';

import { TodoServiceProvider } from '../../shared/todo-service';
@IonicPage()
@Component({
  selector: 'page-todos',
  templateUrl: 'todos.html',
})
export class TodosPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public todoService: TodoServiceProvider) {}

  ionViewDidLoad() {}


  setTodoStyles(item:TodoModel){
    let styles = {
      'text-decoration': item.isDone ? 'line-through': 'none',
      'font-weight': item.isImportant ? "600" : 'normal'
    };
    return styles;
  }

  toogleTodo(todo: TodoModel){
    this.todoService.toogleTodo(todo);
  }

  editTodo(todo:TodoModel){
    let modal = this.modalCtrl.create(AddTaskModalPage,{todo});
    modal.present();

    modal.onDidDismiss(data=>{
      if(data){
        this.todoService.edit(todo,data);
      }
    });
  }

  removeTodo(todo:TodoModel){
    this.todoService.remove(todo);
  }

  showAddTodo(){
    let modal = this.modalCtrl.create(AddTaskModalPage);
    modal.present();

    modal.onDidDismiss(data=>{
      if(data){
        this.todoService.addTodo(data);
      }
    });
  }
}
