import { Injectable } from "@nestjs/common";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { Todo, TodoWithId } from "./schemas/todo.schema";
import { TodoGateway } from "./todos.gateway";
import { TodosRepository } from "./todos.repository";

@Injectable()
export class TodosService {
    constructor(
        private readonly todosRepository: TodosRepository,
        private readonly todoGateway: TodoGateway
        ) {}

    async getTodos(): Promise<TodoWithId[]> {
        return this.todosRepository.find({});
    }

    async getTodoById(id: string): Promise<TodoWithId> {
        return this.todosRepository.findOne({ _id: id });
    }

    async createTodo(text: string): Promise<TodoWithId> {
        const newTodo = await this.todosRepository.create({ isDone: false, text });
        this.todoGateway.ws.emit('newTodo', newTodo);
        return newTodo;
    }

    async updateTodo(id: string, todoUpdates: UpdateTodoDto): Promise<TodoWithId> {
        return this.todosRepository.findOneAndUpdate({ _id: id }, todoUpdates);
    }

    async deleteTodo(id: string) {
        const deletedTodo = await this.todosRepository.findOneAndDelete({ _id: id });
        this.todoGateway.ws.emit('deleteTodo', id);
        return deletedTodo;
    }
}