export interface ToDo {
  id: number;
  title: string;
}

export interface ToDoList {
  id: number;
  title: string;
  todos: ToDo[];
}
