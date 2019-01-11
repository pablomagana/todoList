import { Component } from "@angular/core";
import {
  AlertController,
  IonicPage,
  NavController,
  NavParams,
  LoadingController
} from "ionic-angular";
import { TodosPage } from "../todos/todos";
import { ListService } from "../../shared/list-service";
import { ListModel } from "../../shared/list-model";

@IonicPage()
@Component({
  selector: "page-lists",
  templateUrl: "lists.html"
})
export class ListsPage {
  public selectedList: ListModel = null;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public listsService: ListService,
    private loadCtrl: LoadingController
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad ListsPage");
  }

  goToList(list: ListModel) {
    this.clearSelectedList();
    this.navCtrl.push(TodosPage, { list });
  }

  addNewList(name: string) {
    let loader = this.loadCtrl.create();
    loader.present();
    this.listsService.addList(name).subscribe(
      list => {
        this.goToList(list);
        loader.dismiss();
      },
      () => {
        loader.dismiss();
      }
    );
  }

  removeList(listToRemove:ListModel){
    this.listsService.removeList(listToRemove);
  }

  showAddList() {
    let addListAlert = this.alertCtrl.create({
      title: "new list",
      message: "nombre de la nueva lista",
      inputs: [
        {
          name: "name",
          placeholder: "name"
        }
      ],
      buttons: [
        {
          text: "cancelar",
          handler: data => {}
        },
        {
          text: "añadir",
          handler: data => {
            this.addNewList(data.name);
          }
        }
      ]
    });

    addListAlert.present();
  }

  showRemoveList(id){
    let alert = this.alertCtrl.create({
      title: 'Eliminar lista',
      message: 'estas seguro?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.removeList(id);
            this.selectedList = null;
          }
        }
      ]
    });
    alert.present();
  }

  clearSelectedList() {
    this.selectedList = null;
  }
  selectList(list: ListModel) {
    if (this.selectedList != list) {
      this.selectedList = list;
    } else {
      this.clearSelectedList();
    }
  }
}
