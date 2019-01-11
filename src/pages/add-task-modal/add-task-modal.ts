import { Component } from '@angular/core';
import { IonicPage, NavParams ,ViewController} from 'ionic-angular';
import { TodoModel } from '../../shared/todo-model';

@IonicPage()
@Component({
  selector: 'page-add-task-modal',
  templateUrl: 'add-task-modal.html',
})
export class AddTaskModalPage {

  public model:TodoModel;
  public title:string = "Add new task";
  public buttonText:string = "ADD";

  constructor( public navParams: NavParams, public viewCtrl: ViewController) {
    if(this.navParams.get('todo')){
      this.model = TodoModel.clone(this.navParams.get('todo'));
      this.title = "Edit task";
      this.buttonText = "save changes";
    }else{
      let listId = this.navParams.get('listId');
      console.log(listId);
      this.model = new TodoModel(listId, '');
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddTaskModalPage');
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  submit(){
    this.viewCtrl.dismiss(this.model);
  }

}
