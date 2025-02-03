import { Module } from '@nestjs/common';
import { PaymentsModule } from 'src/components';

@Module({
  imports: [PaymentsModule],
})
export class AppModule {}
