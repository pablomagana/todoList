import { Injectable } from "@angular/core";
import { ListModel } from "./list-model";
import { Storage } from "@ionic/storage";
import { Http } from "@angular/http";
import { URLSERVER } from "./constants";
import "rxjs/add/operator/map";
import "rxjs/add/operator/share";
import { Observable } from "rxjs/Observable";
@Injectable()
export class ListService {
  public lists: ListModel[] = [];
  constructor(public local: Storage, public http: Http) {
    this.getLists();
  }

  getLists() {
    this.getFromLocal().then(
      () => {
        this.getFromServer();
      },
      () => {
        this.getFromServer();
      }
    );
  }

  private getFromServer() {
    this.http
      .get(URLSERVER + "/lists")
      .map(response => {
        return response.json();
      })
      .map((lists: Object[]) => {
        return lists.map(item => ListModel.fromJson(item));
      })
      .subscribe(
        (result: ListModel[]) => {
          this.lists = result;
          this.saveLocally();
        },
        error => {
          console.log(error);
        }
      );
  }

  private getFromLocal() {
    return this.local.ready().then(() => {
      return this.local.get("list").then(data => {
        let localList: ListModel[] = [];
        if (data) {
          for (let list of data) {
            localList.push(new ListModel(list.name, list.id));
          }
        }
        this.lists = localList;
      });
    });
  }

  public saveLocally() {
    this.local.ready().then(() => {
      this.local.set("list", this.lists);
    });
  }

  public addList(name: string) {
    let observable = this.postNewListToServer(name);

    observable.subscribe(
      (list: ListModel) => {
        this.lists = [...this.lists, list];
        this.saveLocally();
      },
      () => {
        console.log("Error trying to post a ner list to the server");
      }
    );

    return observable;
  }

  removeList(list: ListModel) {
    let observable = this.deleteListFromServer(list.id);

    observable.subscribe(
      ()=>{
        this.lists = this.lists.filter(l => {
          return l.id != list.id;
        });
        this.saveLocally();
        this.removeToDoList(list.id);
      },
      (error)=>{
        console.log(`an error ocurred while trying to remove list: ${list.name}`)
      }
    );
  }

  private removeToDoList(idList:number){
    this.local.remove(`list-${idList}`);
  }

  private postNewListToServer(name: string): Observable<ListModel> {
    let observable = this.http
      .post(`${URLSERVER}/lists`, { name })
      .share()
      .map(response => {
        return response.json();
      })
      .map(list => ListModel.fromJson(list));
    observable.subscribe(() => {}, () => {});

    return observable;
  }

  private deleteListFromServer(id: number): Observable<ListModel> {
    let observable = this.http
      .delete(`${URLSERVER}/lists/${id}`)
      .share()
      .map(response => {
        return response.json();
      })
    return observable;
  }

}
