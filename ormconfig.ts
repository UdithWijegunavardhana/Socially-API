import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";
import { Campaign } from "src/campaign/campaign.entity";
import { Creative } from "src/creative/creative.entity";
// import { CreativeType } from "src/creative/creativeType.entity";
import { CreativeLibrary } from "src/creativeLibrary/creativeLibrary.entity";
import { uploadMdata } from "src/UploadMedia/metaData.entity";
import { Advertiser } from "./src/advertiser/advertiser.entity";
import { Publisher } from './src/Publisher/publisher.entity';
import { PublisherTransaction } from './src/publisher-transaction/publisher-transaction.entity';

const config: MysqlConnectionOptions = {
  type: 'mysql',
  host: 'us-cdbr-east-05.cleardb.net',
  port: 3306,
  username: 'b17b4699060175',
  password: 'c3cdad1f',
  database: 'heroku_7a6e5d946234c04',
  entities: [
    Campaign,
    Creative,
    Advertiser,
    Publisher,
    CreativeLibrary,
    uploadMdata,
    PublisherTransaction
  ],
  //entities: ['**/src/entity/*{.ts,.js}'],
  synchronize: true,
  // dropSchema: true
}

export default config;
