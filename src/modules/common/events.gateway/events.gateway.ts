import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server, Socket } from 'socket.io';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { Inject } from '@nestjs/common';
import CustomerEventType from './events/customer.events';
import StaffEventType from './events/staff.events';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class EventsGateway {
    @WebSocketServer()
    server: Server;

    constructor(
        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly logger: Logger,
    ) { }

    handleConnection(client: Socket): void {
        console.debug(`Client connected: ${client.id}`);

        // TODO: reimpliment this but I dont know how
        // this.eventEmitter.emit("order.updated");
    }

    handleDisconnect(client: Socket): void {
        console.debug(`Client disconnected: ${client.id}`);
    }

    @SubscribeMessage('events')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
        return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })));
    }

    public emitCustomer(event: CustomerEventType, data: any) {
        this.server.emit(event, data);
    }

    public emitStaff(event: StaffEventType, data: any) {
        this.server.emit(event, data);
    }
}