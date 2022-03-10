import { forwardRef, Inject } from "@nestjs/common";
import { OnGatewayConnection, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";
import { TodosService } from "./todos.service";

@WebSocketGateway({ cors: { origin: '*' } })
export class TodoGateway implements OnGatewayConnection {
    @WebSocketServer()
    ws: Server;

    constructor(@Inject(forwardRef(() => TodosService))private readonly todosService: TodosService) {}

    async handleConnection(client: any) {
        client.emit('connection', await this.todosService.getTodos());
    }
}