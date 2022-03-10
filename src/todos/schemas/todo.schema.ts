import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type TodoWithId = Todo & { _id: string };
export type TodoDocument = Todo & Document;

@Schema()
export class Todo {
    @Prop()
    isDone: boolean;

    @Prop()
    text: string;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);