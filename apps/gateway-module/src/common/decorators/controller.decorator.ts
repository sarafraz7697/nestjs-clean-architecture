import {
  applyDecorators,
  Controller,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards';
import { HttpInterceptor } from '../interceptor';

type IControllerOptions = {
  isProtected?: boolean;
  emptyRouteName?: boolean;
};

export const AppController = (
  routeName: string,
  opts: IControllerOptions = {
    isProtected: true,
    emptyRouteName: false,
  },
) => {
  const decorators: Array<
    ClassDecorator | MethodDecorator | PropertyDecorator
  > = [ApiTags(routeName), UseInterceptors(HttpInterceptor)];

  if (opts.isProtected) {
    decorators.push(UseGuards(JwtAuthGuard));
    decorators.push(ApiBearerAuth());
  }

  if (opts.emptyRouteName) {
    decorators.push(Controller());
  } else {
    decorators.push(Controller(routeName));
  }

  return applyDecorators(...decorators);
};
