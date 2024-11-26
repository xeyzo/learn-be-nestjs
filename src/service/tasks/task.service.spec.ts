import { Test } from "@nestjs/testing";
import { TasksService } from "./tasks.service"
import { TaskStatus } from "./task.entity";


const mockTasks = () => ({
    get: jest.fn(),
    find: jest.fn(),
    delete: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
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
        it('call all data in task table',async ()=>{
            taskService.get(null)

            const data = [
                {
                    id:"1239oqowek91239i",
                    title: "belajar membuat sayur lodeh",
                    description: "belajar nganu",
                    status: TaskStatus.Done 
                },
                {
                    id:"1239oqowek91239s",
                    title: "belajar membuat sayur kangkung",
                    description: "belajar nganu",
                    status: TaskStatus.Done
                }
            ]


            jest.spyOn(taskService, 'get').mockImplementation(() =>Promise.resolve(data));
            expect(taskService.get).toHaveBeenCalled();
            expect(taskService.get).toHaveBeenCalledWith(null);
        })
    })


    describe('findTask', ()=>{
        it('find data task',async ()=>{
            await taskService.find(null),

            jest.spyOn(taskService, 'find').mockImplementation(() =>Promise.resolve(null));
            expect(taskService.find).toHaveBeenCalled();
            expect(taskService.find).toHaveBeenCalledWith(null);
        })
    })

    describe('delete', ()=>{
        it('delete data task', ()=>{
            taskService.delete("1")

            expect(taskService.delete).not.toHaveBeenCalledWith(false)
            jest.spyOn(taskService, 'delete').mockImplementation(()=>Promise.resolve(false))
        })
    })

    describe('createTask', () => {
        it('should create a task successfully', async () => {
          const title = 'New Task';
          const description = 'Task Description';
          const mockTask = {
            id:'1',
            title,
            description,
            status: TaskStatus.Open
          };
    
          jest.spyOn(taskService, 'create').mockResolvedValue(Promise.resolve(mockTask));
    
          const result = await taskService.create(mockTask);
    
          expect(taskService.create).toHaveBeenCalledWith(mockTask);
          expect(result).toEqual(mockTask);
        });
      });

      describe('updateTask', () => {
        it('should be update task successfully', async () => {
          const title = 'New Task';
          const id = "1"
          const mockTask = {
            title,
            status: TaskStatus.Open
          };
    
          jest.spyOn(taskService, 'update').mockResolvedValue(Promise.resolve(mockTask));
    
          const result = await taskService.update(id,mockTask);
    
          expect(taskService.update).toHaveBeenCalledWith(id,mockTask);
          expect(result).toEqual(mockTask);
        });
      });
})