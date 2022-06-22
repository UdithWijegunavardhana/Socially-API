import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publisher } from './publisher.entity';
import { PublisherController } from './publisher.controller';
import { PublisherService } from './publisher.service';
import { OtpService } from 'src/OTP/otp.service';
import { StripeService } from 'src/stripe-publisher/stripe.service';

@Module({
    imports:[TypeOrmModule.forFeature([Publisher])],
    controllers: [PublisherController],
    providers:[PublisherService,OtpService , StripeService],
    exports : [PublisherService ]
})

export class PublisherModule {}
