export class TodoModel{
  constructor(
    public description: string,
    public isDone:boolean = false,
    public isImportant:boolean = false
  ){}

  static clone(todo:TodoModel){
    return new TodoModel(todo.description, todo.isImportant,todo.isDone);
  }
}
