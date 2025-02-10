import { Module } from '@nestjs/common';
import { PaymentsModule } from 'src/components';
import { AppController } from './app.controller';

@Module({
  imports: [PaymentsModule],
  controllers: [AppController],
})
export class AppModule {}
