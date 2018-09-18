export class TodoModel{
  constructor(
    public description: string,
    public isDone:boolean = false,
    public isImportant:boolean = false
  ){}
}
