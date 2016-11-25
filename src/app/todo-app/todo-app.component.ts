import { Component, OnInit } from '@angular/core';

import {TodoService} from '../todo.service';
import {Todo} from '../todo';

@Component({
  moduleId: module.id,
  selector: 'app-todo-app',
  templateUrl: 'todo-app.component.html',
  styleUrls: ['todo-app.component.css'],
  providers: [TodoService]
})
export class TodoAppComponent implements OnInit {

  newTodo: Todo = new Todo();

  constructor(private todoService: TodoService) {}

  addTodo() {
    this.todoService.addTodo(this.newTodo);
    this.newTodo = new Todo();
  }

  removeTodo(todo) {
    this.todoService.deleteTodoById(todo.id);
  }

  updateTodoById(id) {
    this.todoService.updateTodoById(id);
  }

  get todos() {
    return this.todoService.getAllTodos();
  }

  getTodoById(id) {
    this.todoService.getTodoById(id);
  }

  toggleTodoComplete(todo) {
    this.todoService.toggleTodoComplete(todo);
  }

  ngOnInit() {
  }

}
