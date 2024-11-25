import { Test } from "@nestjs/testing";
import { TasksService } from "./tasks.service"
import { TaskStatus } from "./task.entity";


const mockTasks = () => ({
    get: jest.fn(),
    find: jest.fn()
})

describe('',()=>{
    let taskService : TasksService;

    beforeEach(async ()=>{
        const module = await Test.createTestingModule({
            providers: [
                TasksService,
                {provide: TasksService, useFactory: mockTasks}
            ]
        }).compile()

        taskService = module.get(TasksService)
    });

    describe('getTasks', ()=>{
        it('call all data in task table', ()=>{
            taskService.get(null)

            expect(taskService.get).toHaveBeenCalled();
            expect(taskService.get).toHaveBeenCalledWith(null);
        })
    })


    describe('when find tasks return not null', ()=>{
        it('find data task', ()=>{
            taskService.find(null),

            expect(taskService.find).toHaveBeenCalled();
            expect(taskService.find).toHaveBeenCalledWith(null);
        })
    })
})