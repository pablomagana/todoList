import { Pipe, PipeTransform } from '@angular/core';
import { TodoModel } from '../../shared/todo-model';

@Pipe({
  name: 'doneTodosPipe',
})
export class DoneTodosPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(todos: TodoModel[]) {
    return todos.filter(todo=>todo.isDone);
  }
}
