import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import { TodosPage } from  '../todos/todos';
import { ListService } from  '../../shared/list-service';
import { ListModel} from '../../shared/list-model';
@IonicPage()
@Component({
  selector: 'page-lists',
  templateUrl: 'lists.html',
})
export class ListsPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertController: AlertController,
    public listsService:ListService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListsPage');
  }

  goToList(list:ListModel){
    this.navCtrl.push(TodosPage,
      {
        list
      });
  }

  addNewList(name:string){
    this.listsService.addList(name);
  }

  showAddList(){
    let addListAlert = this.alertController.create({
      title:"new list",
      message:"nombre de la nueva lista",
      inputs:[
        {
          name:"name",
          placeholder:"name"
        }
      ],
      buttons:[
        {
          text: "cancelar",
          handler:data=>{}
        },
        {
          text: "añadir",
          handler: data =>{this.addNewList(data.name);}
        }
      ]
    });

    addListAlert.present();
  }
}
