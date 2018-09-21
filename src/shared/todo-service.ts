import { HttpModule } from '@angular/http';
import { Injectable } from '@angular/core';

import { TodoModel } from './todo-model';

@Injectable()
export class TodoServiceProvider {
  private todos: TodoModel[];

  constructor(public http: HttpModule) {
    this.getTodos();
  }

  getTodos(){
    this.todos = [
      new TodoModel("this is an element"),
      new TodoModel("this is an element", false),
      new TodoModel("this is an element", false, true),
      new TodoModel("this is an element", true, true)
    ]
  }

  toogleTodo(todo:TodoModel){
    todo.isDone = !todo.isDone;
  }

  addTodo(todo:TodoModel){
    this.todos.push(todo);
  }

  edit(todo:TodoModel,newTodo:TodoModel){
    const index = this.todos.indexOf(todo);
    this.todos = [
      ...this.todos.slice(0,index),
      newTodo,
      ...this.todos.slice(index+1)
    ]
  }

  remove(todo:TodoModel){
    const index = this.todos.indexOf(todo);
    this.todos = [
      ...this.todos.slice(0,index),
      ...this.todos.slice(index+1)
    ]
  }

}
