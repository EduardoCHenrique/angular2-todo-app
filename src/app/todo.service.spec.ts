import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { TodoService } from './todo.service';
import {Todo} from './todo';

describe('Todo Service', () => {
  beforeEachProviders(() => [TodoService]);

  describe('#getAllTodos()', () => {
    it('should return an empty array by default', inject([TodoService], (service: TodoService) => {
      expect(service.getAllTodos()).toEqual([]);
    }));

    it('should return all todos', inject([TodoService], (service: TodoService) => {
      //given
      let todo1 = new Todo({title: 'Hello 1', complete: false});
      let todo2 = new Todo({title: 'Hello 2', complete: true});
      //when
      service.addTodo(todo1);
      service.addTodo(todo2);
      //then
      expect(service.getAllTodos()).toEqual([todo1, todo2]);
    }));
  });

  describe('#saveTodo(todo)',() => {
    it('should automatically assign an incrementing id', inject([TodoService], (service: TodoService) => {
      //given
      let todo1 = new Todo({title: 'Hello 1', complete: false});
      let todo2 = new Todo({title: 'Hello 2', complete: true});
      //when
      service.addTodo(todo1);
      service.addTodo(todo2);
      //then
      expect(service.getTodoById(1)).toEqual(todo1);
      expect(service.getTodoById(2)).toEqual(todo2);
    }));
  });

  describe('#deleteTodoById(todo)',() => {
    it('should remove todo with the corresponding id', inject([TodoService], (service: TodoService) => {
      //given
      let todo1 = new Todo({title: 'Hello 1', complete: false});
      let todo2 = new Todo({title: 'Hello 2', complete: true});
      //when
      service.addTodo(todo1);
      service.addTodo(todo2);
      //then
      expect(service.getAllTodos()).toEqual([todo1, todo2]);
      service.deleteTodoById(1)
      expect(service.getAllTodos()).toEqual([todo2]);
      service.deleteTodoById(2)
      expect(service.getAllTodos()).toEqual([]);
    }));

    it('should not remove anything if todo with corresponding id is not found', inject([TodoService], (service: TodoService) => {
      //given
      let todo1 = new Todo({title: 'Hello 1', complete: false});
      let todo2 = new Todo({title: 'Hello 2', complete: true});
      //when
      service.addTodo(todo1);
      service.addTodo(todo2);
      //then
      expect(service.getAllTodos()).toEqual([todo1, todo2]);
      service.deleteTodoById(3);
      expect(service.getAllTodos()).toEqual([todo1, todo2]);
    }));
  });


  describe('#updateTodoById(id)',() => {
    it('should return todo with the corresponding id and updated data', inject([TodoService], (service: TodoService) => {
      //given
      let todo1 = new Todo({title: 'Hello 1', complete: false});
      service.addTodo(todo1);
      //when
      let updatedTodo = service.updateTodoById(1, {title: 'new title'});
      //then
      expect(updatedTodo.title).toEqual('new title');
    }));

    it('should return null if todo is not found', inject([TodoService], (service: TodoService) => {
      //given
      let todo1 = new Todo({title: 'Hello 1', complete: false});
      service.addTodo(todo1);
      //when
      let updatedTodo = service.updateTodoById(5, {title: 'new title'});
      //then
      expect(updatedTodo).toEqual(null);
    }));
  });


  describe('#toggleTodoComplete(todo)',() => {
    it('should return the updated todo with inverse complete status', inject([TodoService], (service: TodoService) => {
      //given
      let todo1 = new Todo({title: 'Hello 1', complete: false});
      service.addTodo(todo1);
      //when
      let updatedTodo = service.toggleTodoComplete(todo1);
      //then
      expect(todo1.complete).toEqual(true);

      service.toggleTodoComplete(todo1);
      expect(todo1.complete).toEqual(false);
    }));
  });

});
