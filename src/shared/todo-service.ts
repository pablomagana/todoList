import { HttpModule } from "@angular/http";
import { Injectable } from "@angular/core";

import { TodoModel } from "./todo-model";

@Injectable()
export class TodoServiceProvider {
  private todos: TodoModel[];

  constructor(public http: HttpModule) {
    this.getTodos();
  }

  getTodos() {
    this.todos = [
      new TodoModel("this is an element 1"),
      new TodoModel("this is an element 2"),
      new TodoModel("this is an element 3"),
      new TodoModel("this is an element 4")
    ];
  }

  toogleTodo(todo: TodoModel) {
    let isDone = !todo.isDone;
    const todoIndex = this.todos.indexOf(todo);
    let updatedTodo = new TodoModel(todo.description, isDone, todo.isImportant);

    this.todos = [
      ...this.todos.slice(0, todoIndex),
      updatedTodo,
      ...this.todos.slice(todoIndex + 1)
    ];
    todo.isDone = !todo.isDone;
  }

  addTodo(todo: TodoModel) {
    this.todos = [...this.todos, todo];
    //this.todos.push(todo);
  }

  edit(todo: TodoModel, newTodo: TodoModel) {
    const index = this.todos.indexOf(todo);
    this.todos = [
      ...this.todos.slice(0, index),
      newTodo,
      ...this.todos.slice(index + 1)
    ];
  }

  remove(todo: TodoModel) {
    const index = this.todos.indexOf(todo);
    this.todos = [
      ...this.todos.slice(0, index),
      ...this.todos.slice(index + 1)
    ];
  }
}
