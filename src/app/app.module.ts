import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { TodosPage } from '../pages/todos/todos';
import { AddTaskModalPage } from '../pages/add-task-modal/add-task-modal';
import {ListsPage} from '../pages/lists/lists';
import { TodoServiceProvider } from '../shared/todo-service';

import { PriorizedTodosPipe } from  '../pipes/priorized-todos/priorized-todos';
import { DoneTodosPipe } from '../pipes/done-todos/done-todos';
import { ListService} from '../shared/list-service';
@NgModule({
  declarations: [
    MyApp,
    TodosPage,
    AddTaskModalPage,
    PriorizedTodosPipe,
    DoneTodosPipe,
    ListsPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TodosPage,
    AddTaskModalPage,
    ListsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TodoServiceProvider,
    ListService
  ]
})
export class AppModule {}
