import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { StripeController } from './stripe.controller';
import { StripeService } from './stripe.service';
import { Publisher } from 'src/Publisher/publisher.entity';
import * as Joi from 'joi';
import  { ConfigModule } from '@nestjs/config';

// @Module({
//   imports: [ AuthModule , TypeOrmModule.forFeature([StripeUser]) ],
//   controllers: [StripeController],
//   providers: [StripeService]
// })
// export class StripeModule {}

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        STRIPE_SECRET_KEY: Joi.string(),
        STRIPE_CURRENCY: Joi.string(),
        FRONTEND_URL: Joi.string(),
        // ...
      })
    }),
   // ...
  ],
  controllers: [StripeController],
  providers: [StripeService]
})
export class StripeModule {}