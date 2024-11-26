import { Test } from "@nestjs/testing";
import { UsersService } from "./users.service"
import { Roles } from "./users.entity";


const mockUser= () => ({
    create: jest.fn(),
    getUserByEmail: jest.fn(),
    hashPassword: jest.fn(),
})


describe('',()=>{
    let userService : UsersService

    beforeEach(async ()=>{
        const module = await Test.createTestingModule({
            providers: [
                UsersService,
                {provide:UsersService, useFactory: mockUser}
            ]
        }).compile()

        userService = module.get(UsersService)
    });


    describe('create user', ()=> {
        it('created data succcesfully', async ()=>{

          const mockUser = {
            id:'1',
            username:'sandi',
            password: 'password',
            email: 'example@mail.com',
            phonenumber: '089652553045',
            address:'jl kenanga no.13 rt.09 rw.02',
            role:Roles.staff
          };

          jest.spyOn(userService, 'create').mockResolvedValue(Promise.resolve(mockUser))

          const result = await userService.create(mockUser)

          expect(userService.create).toHaveBeenCalledWith(mockUser);
          expect(result).toEqual(mockUser);
        })
    })


    describe('findbyemail',()=> {
        it('find user by email ', async ()=> {
            jest.spyOn(userService, 'getUserByEmail').mockImplementation(() => Promise.resolve(null));
            const result = await userService.getUserByEmail(null)

            expect(userService.getUserByEmail).toHaveBeenCalledWith(null);
            expect(result).toBe(null)
        }) 
    })

    describe('hash password', ()=>{
        it('hashing password to unique string', async()=>{
            const hashing = await userService.hashPassword(null)

            expect(userService.hashPassword).toHaveBeenCalledWith(null);
            expect(hashing).toBe(undefined)
        })
    })

})