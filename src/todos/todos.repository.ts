import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Todo, TodoDocument, TodoWithId } from "./schemas/todo.schema";
import { FilterQuery, Model } from 'mongoose';

@Injectable()
export class TodosRepository {
    constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

    async findOne(todoFilterQuery: FilterQuery<Todo>): Promise<TodoWithId> {
        return this.todoModel.findOne(todoFilterQuery).exec();
    }

    async find(todosFilterQuery: FilterQuery<Todo>): Promise<TodoWithId[]> {
        return this.todoModel.find(todosFilterQuery).exec();
    }

    async create(todo: Todo): Promise<TodoWithId> {
        const newTodo = new this.todoModel(todo);
        return newTodo.save();
    }

    async findOneAndUpdate(todoFilterQuery: FilterQuery<Todo>, todo: Partial<Todo>): Promise<TodoWithId> {
        return this.todoModel.findOneAndUpdate(todoFilterQuery, todo, { new: true }).exec();
    }

    async findOneAndDelete(todoFilterQuery: FilterQuery<Todo>): Promise<TodoWithId> {
        return this.todoModel.findOneAndDelete(todoFilterQuery).exec();
    }
}