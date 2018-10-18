import { NgModule } from '@angular/core';
import { PriorizedTodosPipe } from './priorized-todos/priorized-todos';
import { DoneTodosPipe } from './done-todos/done-todos';
@NgModule({
	declarations: [PriorizedTodosPipe,
    DoneTodosPipe],
	imports: [],
	exports: [PriorizedTodosPipe,
    DoneTodosPipe]
})
export class PipesModule {}
