import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PlanoModule } from './plano/plano.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule, UserModule, PlanoModule ],
  controllers: [],
  providers: [],
})
export class AppModule {}
