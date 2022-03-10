import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Todo, TodoSchema } from "./schemas/todo.schema";
import { TodosController } from "./todos.controller";
import { TodoGateway } from "./todos.gateway";
import { TodosRepository } from "./todos.repository";
import { TodosService } from "./todos.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }])],
    controllers: [TodosController],
    providers: [TodosService, TodosRepository, TodoGateway],
})

export class TodosModule {}