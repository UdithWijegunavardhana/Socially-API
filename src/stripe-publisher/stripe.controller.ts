import { StripeService } from './stripe.service';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import CreateChargeDto from './createCharge.dto';
import CreateUserDto from './createUser.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('stripe')
export class StripeController {
    constructor(private stripeService: StripeService ) { }

    // @Post('createUser')
    // @UseGuards(JwtAuthGuard)
    // async createStripeUser(@Body() createUser: CreateUserDto , @Req() req){
    //   await this.stripeService.createUser(createUser.name , createUser.phoneNumber);
    // }

    @UseGuards(JwtAuthGuard)
    @Post('charge')
    async createCharge(@Body() charge: CreateChargeDto, @Req() req): Promise<any> { 
      await this.stripeService.charge(charge.amount, charge.paymentMethodId, req.user.stripeCustomerId);
    }

    @Post('createPaymentIntent')
    @UseGuards(JwtAuthGuard)
    async createPaymentIntent(@Body() charge: CreateChargeDto, @Req() req ) {
      const payment_intent = await this.stripeService.createPaymentIntent(charge.amount);
      // const ephemeral_Key = await this.stripeService.createEphemeralKey(req.user.stripeCustomerId);
      return { payment_intent };
    }

    @Post('createPaymentMethod')
    @UseGuards(JwtAuthGuard)
    async createPaymentMethod(@Body() charge: CreateChargeDto, @Req() req) {
      const payment_method = await this.stripeService.createPaymentMethod(charge.paymentMethodId, req.user.stripeCustomerId);
      return {payment_method};
    }

    // @Post('createSubscription')
    // @UseGuards(JwtAuthGuard)
    // async createSubscription(@Body() charge: CreateChargeDto, @Request() req) {
    //   await this.stripeService.createSubscription(charge.amount, charge.paymentMethodId, req.user.stripeCustomerId);
    // }

}

// import { Controller ,Body , Post, Req, UseGuards} from "@nestjs/common";
// import { JwtAuthGuard } from "src/auth/jwt.guard";
// import { StripeService } from "./stripe.service";
// import { CreateChargeDto } from "./createCharge.dto";
// import { Advertiser } from "src/Advertiser/advertiser.entity";
// import { Request } from 'express';

// @Controller('payments')
// export class StripeController {
//     constructor(
//         private readonly stripeService: StripeService
//       ) {}
//       @UseGuards(JwtAuthGuard)
//       @Post()
//       async createCharge(@Body() charge: CreateChargeDto, @Req() request): Promise<any>  {
//         //console.log(request.user.stripeCustomerId)
//        await this.stripeService.charge(charge.amount, charge.paymentMethodId, request.user.stripeCustomerId);
//       } 
// }