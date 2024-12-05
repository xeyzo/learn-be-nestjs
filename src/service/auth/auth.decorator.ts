import { SetMetadata, createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

export const User = createParamDecorator(
    (_data: unknown, ctx:ExecutionContext)=>{
        const req = ctx.switchToHttp().getRequest();
        return req.user
    }
)
