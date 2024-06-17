import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server } from 'socket.io';
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