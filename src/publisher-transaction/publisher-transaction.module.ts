import { CreativeLibrary } from '../creativeLibrary/creativeLibrary.entity';
import { creativeLibraryService } from '../creativeLibrary/creativeLibrary.service';
import { Creative } from '../creative/creative.entity';
import { creativeService } from '../creative/creative.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublisherTransactionService } from './publisher-transaction.service';
import { PublisherTransactionController } from './publisher-transaction.controller';
import { PublisherTransaction } from './publisher-transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PublisherTransaction, Creative, CreativeLibrary])],
  controllers: [PublisherTransactionController],
  providers: [PublisherTransactionService, creativeService, creativeLibraryService],
  exports: [PublisherTransactionService]
})
export class PublisherTransactionModule { }
