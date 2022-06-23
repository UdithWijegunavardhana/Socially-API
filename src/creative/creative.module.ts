import { creativeLibraryModule } from '../creativeLibrary/creativeLibrary.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { creativeController } from './creative.controller';
import { creativeService } from './creative.service';
import { Creative } from './creative.entity';
import { AuthModule } from '../auth/auth.module';
import { AdvertiserModule } from '../advertiser/advertiser.module';
import { creativeLibraryService } from 'src/creativeLibrary/creativeLibrary.service';
import { CreativeLibrary } from 'src/creativeLibrary/creativeLibrary.entity';

@Module({
    imports: [AuthModule, AdvertiserModule, creativeLibraryModule, TypeOrmModule.forFeature([Creative,])],
    controllers: [creativeController],
    providers: [creativeService],
    exports: [creativeService]
})
export class creativeModule { }
