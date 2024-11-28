import { Test } from "@nestjs/testing/test";
import { AuthService } from "./auth.service";
import { LoginDto } from "./auth-dto/login-dto";

const mockAuth = () => ({
    login: jest.fn(),
    encode: jest.fn()
})

describe('Auth test', ()=>{
    let authService : AuthService;

    beforeEach(async ()=>{
        const module = await Test.createTestingModule({
            providers: [
                AuthService,
                {provide: AuthService, useFactory: mockAuth}
            ]
        }).compile()

        authService = module.get(AuthService)
    });

    describe('login user', ()=>{
        it('when login using user true',async ()=>{
            const email = 'example@mail.com'
            const password = 'p@ssw0rd'

            let data : LoginDto = {
                email,
                password
            }


            jest.spyOn(authService, 'login').mockImplementation(() => {
                return Promise.reject(new Error('Invalid Credential'));
            });
            
            await expect(authService.login(data)).rejects.toThrow('Invalid Credential')
        })
    });

    describe('encode token',()=>{
        it('checking return encode token', async()=>{
            const payload = {
                id: '123124awejk123',
                email: 'example@mail.com',
                role: 'Admin' 
            }

            const result = await authService.encode(payload)
            console.log(result) 

            jest.spyOn(authService, 'encode').mockImplementation(()=> Promise.resolve(payload))
            expect(result).not.toEqual('')
        })
    })
})