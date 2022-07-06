import { creativeService } from './../creative/creative.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { PublisherTransaction } from './publisher-transaction.entity';

@Injectable()
export class PublisherTransactionService {
    constructor(
        @InjectRepository(PublisherTransaction)
        private publisherTransactionRepository: Repository<PublisherTransaction>, private readonly creativeService: creativeService
    ) { }

    async findAll(): Promise<PublisherTransaction[]> {
        return await this.publisherTransactionRepository.find();
    }

    async create(amount: number, date: string, type: string, publisherId: number): Promise<PublisherTransaction> {
        return await this.publisherTransactionRepository.save({ amount, date, type, publisherId });
    }

    async findByPublisherId(publisherId: Number): Promise<PublisherTransaction[]> {
        return await this.publisherTransactionRepository.find({
            where: { publisherId },
        });
    }

    async earning(publisherId: number, creativeId: number, date: string) {
        const creative = await this.creativeService.getCreativeById(creativeId)
        const amountPerClick = creative.costPerSale;
        await this.publisherTransactionRepository.save({ amount: amountPerClick, date, type: 'earning', publisherId: publisherId })
    }

    async balance(publisherId: number): Promise<{ amount: number }> {
        const earn = await getRepository(PublisherTransaction)
            .createQueryBuilder("publisherTransaction")
            .select("SUM(PublisherTransaction.amount)", "sum")
            .where('PublisherTransaction.publisherId = :publisherId AND PublisherTransaction.type = :type', { publisherId: publisherId, type: 'earning' })
            .getRawOne()

        const withdraw = await getRepository(PublisherTransaction)
            .createQueryBuilder("publisherTransaction")
            .select("SUM(PublisherTransaction.amount)", "sum")
            .where('PublisherTransaction.publisherId = :publisherId AND PublisherTransaction.type = :type', { publisherId: publisherId, type: 'withdrawal' })
            .getRawOne()
        console.log(earn, withdraw)
        const balance = (earn.sum - withdraw.sum)
        console.log(balance)
        return { amount: balance };
    }

    // async findOne(id: number): Promise<PublisherTransaction> {
    //     return await this.publisherTransactionRepository.findOne(id);
    // }

    // async update(id: number, publisherTransaction: PublisherTransaction): Promise<PublisherTransaction> {
    //     publisherTransaction.id = id;
    //     return await this.publisherTransactionRepository.save(publisherTransaction);
    // }

    // async delete(id: number): Promise<void> {
    //     await this.publisherTransactionRepository.delete(id);
    // }


    // async findByPublisherIdAndType(publisherId: number, type: string): Promise<PublisherTransaction[]> {
    //     return await this.publisherTransactionRepository.find({
    //         where: { publisherId, type },
    //     });
    // }

}
