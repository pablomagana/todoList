import { Pipe, PipeTransform } from '@angular/core';
import { TodoModel } from '../../shared/todo-model';

@Pipe({
  name: 'priorizedTodosPipe',
})
export class PriorizedTodosPipe implements PipeTransform {
  transform(todos: TodoModel[]) {
    return todos
    .filter(todo => !todo.isDone)
    .sort((a, b) => (b.isImportant && !a.isImportant) ?  1 : -1);
  }
}
