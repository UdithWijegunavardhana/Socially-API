import Stripe from 'stripe'; 
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateUserDto from './createUser.dto';
import { Publisher } from 'src/Publisher/publisher.entity';

@Injectable()
export class StripeService {
    private stripe: Stripe;
    
    constructor(
        private configService: ConfigService){
        this.stripe = new Stripe(configService.get('STRIPE_SECRET_KEY'), {
        apiVersion: '2020-08-27',
        });
    }

    public async createCustomer(userName: string, phoneNumber: string) {
        return this.stripe.customers.create({
            email: userName,
            phone: phoneNumber,
        });
    }

    public async charge(amount: number, paymentMethodId: string, customerId: string) {
      return this.stripe.paymentIntents.create({
        amount,
        customer: customerId,
        payment_method: paymentMethodId,
        payment_method_types: [ 'card'],
        currency: this.configService.get('STRIPE_CURRENCY'),
        confirm: true
      })
      
  }
    
    async createPaymentIntent(amount: number) {
        const paymentIntent = await this.stripe.paymentIntents.create({
        amount,
        currency: 'usd',
        // customer: customer.id,
        automatic_payment_methods: {
            enabled: true,
        },
        });
        return paymentIntent;
    }

    async createEphemeralKey(customerID: string) {
        const ephemeralKey = await this.stripe.ephemeralKeys.create(
            {customer: customerID},
            {apiVersion: '2020-08-27'}
        );
        return  ephemeralKey;
    }

    async createPaymentMethod(paymentMethodId: string, customerId: string) {
        const paymentMethod = await this.stripe.paymentMethods.attach(paymentMethodId, {
        customer: customerId,
        });
    }

    // async createUser(name : string , phoneNumber : string) {
    //     const stripeCustomer = await this.StripeService.createCustomer(name, phoneNumber);
    //     const newUser = await this.publisherRepository.create({
    //       stripeCustomerId: stripeCustomer.id
    //     });
    //     await this.publisherRepository.save(newUser);
    //     return newUser;
    // }

    // public async createSubscription(amount: number, paymentMethodId: string, customerId: string) {
    //     return this.stripe.subscriptions.create({
    //       customer: customerId,
    //       items: [{
    //         plan: this.configService.get('STRIPE_PLAN_ID'),
    //         quantity: 1,
    //       }],
    //       // payment_method: paymentMethodId,
    //       expand: ['latest_invoice.payment_intent'],
    //     })
    // }

}


// //create Advertiser Temporary
// async createAdvertiser(advertiserDto:AdvertiserCreateDto):Promise<AdvertiserDto>{
//   const{name,email,password} =advertiserDto;

//   const stripeCustomer = await this.stripeService.createCustomer(advertiserDto.name, advertiserDto.email);

//   //Check if user already registered
//   const searchAdvertiser = await this.advertiserRepository.findOne({where: {email}});
//   if(searchAdvertiser){
//       throw new HttpException('Advertiser already exists', HttpStatus.BAD_REQUEST);
//   }

//   //Genarate OTP
//   const generatedOTP=(Math.floor(Math.random() * (9 * Math.pow(10, 3))) + Math.pow(10, 3));

//   //creating stripe customer
//   const advertiser: Advertiser = await this.advertiserRepository.create({ name,email,password, generatedOTP, otpSentTime: new Date(), isActive: false, stripeCustomerId: stripeCustomer.id});

//   //send Email
//   await this.mailService.sendUserConfirmation(advertiser, generatedOTP);
  
//   await this.advertiserRepository.save(advertiser);
//   return toAdvertiserDto(advertiser);  
// }