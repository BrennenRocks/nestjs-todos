import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { Todo, TodoWithId } from "./schemas/todo.schema";
import { TodosService } from "./todos.service";

@Controller('todos')
export class TodosController {
    constructor(private readonly todosService: TodosService) {}

    @Get()
    async getTodos(): Promise<TodoWithId[]> {
        return this.todosService.getTodos();
    }

    @Get(':id')
    async getTodo(@Param('id') id: string): Promise<TodoWithId> {
        return this.todosService.getTodoById(id);
    }

    @Post()
    async createTodo(@Body() todo: CreateTodoDto): Promise<TodoWithId> {
        return this.todosService.createTodo(todo.text);
    }

    @Put(':id')
    async updateTodo(@Param('id') id: string, @Body() todo: UpdateTodoDto): Promise<TodoWithId> {
        return this.todosService.updateTodo(id, todo);
    }

    @Delete(':id')
    async deleteTodo(@Param('id') id: string): Promise<TodoWithId> {
        return this.todosService.deleteTodo(id);
    }
}