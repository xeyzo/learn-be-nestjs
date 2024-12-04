import { SetMetadata, createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

