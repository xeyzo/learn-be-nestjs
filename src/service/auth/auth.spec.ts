import { Test } from "@nestjs/testing/test";
import { AuthService } from "./auth.service";
import { LoginDto } from "./auth-dto/login-dto";

const mockAuth = () => ({
    login: jest.fn(),
    encode: jest.fn(),
    decode: jest.fn()
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

            jest.spyOn(authService, 'encode').mockImplementation(()=> Promise.resolve(payload))
            expect(result).not.toEqual('')
        })
    });

    describe('decode token',()=>{
        it('checking return decode token', ()=>{
            const token : string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIzOGM4YzEwLTYxNDEtNDViYS04OTQzLWRkNGFmZTVlODU0MSIsImVtYWlsIjoic3RhZmZAbWFpbC5jb20iLCJyb2xlIjoic3RhZmYiLCJpYXQiOjE3MzI4ODc5MDMsImV4cCI6MTczMjg5MTUwM30.ej-xjZ0CzAXz6gICcrXd1nvtCtnJWaJy7NNPVuPasr4'

            jest.spyOn(authService, 'decode').mockImplementation(()=> Promise.resolve(token))
            expect(token).not.toEqual('')
        })
    });
})