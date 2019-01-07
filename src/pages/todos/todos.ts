import { Component } from "@angular/core";
import {
  IonicPage,
  ModalController,
  NavController,
  NavParams
} from "ionic-angular";

import { TodoModel } from "../../shared/todo-model";
import { AddTaskModalPage } from "../add-task-modal/add-task-modal";

import { TodoServiceProvider } from "../../shared/todo-service";
import { Platform } from "ionic-angular";

import { ListModel } from '../../shared/list-model';
@IonicPage()
@Component({
  selector: "page-todos",
  templateUrl: "todos.html"
})
export class TodosPage {
  private toogleTodoTimeout = null;
  private list:ListModel;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public todoService: TodoServiceProvider,
    private platform: Platform
  ) {
    this.list =  this.navParams.get('list');
    this.todoService.loadFromList(this.list.id);
  }

  ionViewDidLoad() {}

  setTodoStyles(item: TodoModel) {
    let styles = {
      "text-decoration": item.isDone ? "line-through" : "none",
      "font-weight": item.isImportant ? "600" : "normal"
    };
    return styles;
  }

  toogleTodo(todo: TodoModel) {
    if(this.toogleTodoTimeout){
      return;
    }

    this.toogleTodoTimeout = setTimeout(() => {
      this.todoService.toogleTodo(todo);
      this.toogleTodoTimeout=null;
    }, this.platform.is("ios") ? 0 : 300);
  }

  editTodo(todo: TodoModel) {
    let modal = this.modalCtrl.create(AddTaskModalPage, { todo });
    modal.present();

    modal.onDidDismiss(data => {
      if (data) {
        this.todoService.edit(todo, data);
      }
    });
  }

  removeTodo(todo: TodoModel) {
    this.todoService.remove(todo);
  }

  showAddTodo() {
    let modal = this.modalCtrl.create(AddTaskModalPage);
    modal.present();

    modal.onDidDismiss(data => {
      if (data) {
        this.todoService.addTodo(data);
      }
    });
  }
}
