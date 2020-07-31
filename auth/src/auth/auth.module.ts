import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';

@Module({
  imports: [ClientsModule.register([{
    name: 'USER_CLIENT',
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:4000'],
      queue: 'auth_queue',
      queueOptions: {
        durable: false
      },
    },
  }]), JwtModule.register({
    secret: 'yoursecret',
    signOptions: { expiresIn: '60s' }
  })],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
