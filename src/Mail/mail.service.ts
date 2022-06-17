import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Advertiser } from '../Advertiser/advertiser.entity';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) { }

    async sendUserConfirmation(advertiser: Advertiser, otp: number) {
        await this.mailerService.sendMail({
            to: advertiser.email,
            subject: 'OTP verification Email',


            text: 'welcome',
            html: `
                    Thank you for registering!
                    <br/><br/>
                    Please verify your email by using the following OTP.
                    <br/><br/>
                    Your OTP is <b>${otp}</b>.
                    <br/><br/>
                    Have a pleasant day.<br/><br/>`


            /* 
            template:'./confirmation',
            context:{
                otp
            }
           */
        })
    }
}