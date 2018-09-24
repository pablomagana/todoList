import { NgModule } from '@angular/core';
import { PriorizedTodosPipe } from './priorized-todos/priorized-todos';
@NgModule({
	declarations: [PriorizedTodosPipe],
	imports: [],
	exports: [PriorizedTodosPipe]
})
export class PipesModule {}
