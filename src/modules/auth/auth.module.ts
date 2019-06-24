import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../../modules/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secretOrPrivateKey: 'qHqPHVPasjfHDCrcX7Ao7Ao7x505W098RU3i6lloVgWZFY=',
      signOptions: {
        expiresIn: '12h'
      }
    }),
    PassportModule.register({
      defaultStrategy: 'jwt'
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
