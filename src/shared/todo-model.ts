export class TodoModel{
  constructor(
    public listId:number,
    public description: string,
    public id:number = 0,
    public isDone:boolean = false,
    public isImportant:boolean = false
  ){}

  static clone(todo:TodoModel){
    return new TodoModel(todo.listId, todo.description,todo.id, todo.isDone,todo.isImportant);
  }

  static fromJson(data:any): TodoModel{
    if(!data.description || !data.id || !data.listId){
      throw (new Error("Invalid argument: argument structure do not match with model fields"));
    }

    return new TodoModel(data.listId, data.description,data.id,data.isDone,data.isImportant);
  }
}
