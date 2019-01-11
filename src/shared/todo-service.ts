import { Http } from "@angular/http";
import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { TodoModel } from "./todo-model";
import { URLSERVER } from "./constants";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/map";
import "rxjs/add/operator/share";

@Injectable()
export class TodoServiceProvider {
  private todos: TodoModel[] = [];

  constructor(public http: Http, public local: Storage) {}

  public loadFromList(id: number) {
    this.getFromLocal(id).then(() => {
      this.loadFromServer(id);
    });
  }
  private getFromLocal(id: number) {
    return this.local.ready().then(() => {
      return this.local.get(`list-${id}`).then(data => {
        if (!data) {
          this.todos = [];
          return;
        }
        let localTodos: TodoModel[] = [];
        for (let todo of data) {
          localTodos.push(TodoModel.clone(todo));
        }
        this.todos = localTodos;
      });
    });
  }

  private loadFromServer(id: number) {
    this.http
      .get(`${URLSERVER}/lists/${id}/todos`)
      .map(response => {
        return response.json();
      })
      .map(todos => {
        return todos.map(item => TodoModel.fromJson(item));
      })
      .subscribe(
        (result: TodoModel[]) => {
          this.todos = result;
          this.saveLocally(id);
        },
        error => {
          console.log("Error loading lists from server", error);
        }
      );
  }

  private postNewTodoToServer(todo: TodoModel): Observable<TodoModel> {
    let observable = this.http
      .post(`${URLSERVER}/lists/${todo.listId}/todos`, {
        description: todo.description,
        isDone: todo.isDone,
        isImportant: todo.isImportant
      })
      .map(response => {
        return response.json();
      })
      .map(todo => {
        return TodoModel.fromJson(todo);
      })
      .share();

    return observable;
  }

  private updateTotoInServer(todo: TodoModel): Observable<TodoModel> {
    let observable = this.http
      .put(`${URLSERVER}/todos/${todo.id}`, {
        description: todo.description,
        isDone: todo.isDone,
        isImportant: todo.isImportant,
        listId: todo.listId
      })
      .map(response => {
        response.json();
      })
      .map(todo => {
        return TodoModel.fromJson(todo);
      })
      .share();

    return observable;
  }

  public saveLocally(id: number) {
    this.local.ready().then(() => {
      this.local.set(`list-${id}`, this.todos);
    });
  }

  updateTodo(originalTodo: TodoModel, modifiedTodo: TodoModel) {
    let observable = this.updateTotoInServer(modifiedTodo);

    observable.subscribe(
      (todo: TodoModel) => {
        const index = this.todos.indexOf(originalTodo);
        this.todos = [
          ...this.todos.slice(0, index),
          modifiedTodo,
          ...this.todos.slice(index + 1)
        ];
      },
      error => console.log("Error trying to update todo item")
    );

    return observable;
  }

  toogleTodo(todo: TodoModel) {
    let updatedTodo = TodoModel.clone(todo);
    todo.isDone = !todo.isDone;

    return this.updateTodo(todo,updatedTodo).subscribe(()=>{},()=>{this.loadFromList(todo.listId)});
  }

  addTodo(todo: TodoModel) {
    let observable = this.postNewTodoToServer(todo);

    observable.subscribe(
      (todo: TodoModel) => {
        this.todos = [...this.todos, todo];
        this.saveLocally(todo.listId);
      },
      error => console.log("Error trying to post a new list")
    );

    return observable;
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
