import {Counter} from "./testClass/Counter";
import {AddFiveN1Command, AddOneN1Command, AddTenN1Command} from "./testClass/CunterN1Commands";
import {CommandQueue} from "../lib/CommandQueue";


describe("Command test", () => {
    test("execute command", async () => {
        const counter = new Counter();

        const add1command = new AddOneN1Command(counter);
        const add5command = new AddFiveN1Command(counter)
        const add10command = new AddTenN1Command(counter)

        add1command.execute();
        expect(counter.n1).toBe(1);
        add1command.execute();
        add5command.execute();
        expect(counter.n1).toBe(7);
        add10command.execute();
        expect(counter.n1).toBe(17);
    })
})


describe("execute command queue test", () => {
    test("execute command with queue", async () => {
        const counter = new Counter();

        const add1command = new AddOneN1Command(counter);
        const add5command = new AddFiveN1Command(counter)
        const add10command = new AddTenN1Command(counter)

        const commandQueue = new CommandQueue();

        await commandQueue.executeCommand(add1command);
        expect(counter.n1).toBe(1);
        await commandQueue.executeCommand(add10command);
        await commandQueue.executeCommand(add5command);
        expect(counter.n1).toBe(16);
        await commandQueue.executeCommand(add5command);
        expect(counter.n1).toBe(21);

    })

    test("execute commands with queue", async () => {
        const counter = new Counter();

        const add1command = new AddOneN1Command(counter);
        const add5command = new AddFiveN1Command(counter)
        const add10command = new AddTenN1Command(counter)

        const commandQueue = new CommandQueue();

        await commandQueue.executeCommands([add5command, add10command]);
        expect(counter.n1).toBe(15);
        await commandQueue.executeCommands([add1command]);
        expect(counter.n1).toBe(16);

    })

})


describe("undo-redo command queue test", () => {
    test("undo command with queue", async () => {
        const counter = new Counter();

        const add1command = new AddOneN1Command(counter);
        const add5command = new AddFiveN1Command(counter)
        const add10command = new AddTenN1Command(counter)

        const commandQueue = new CommandQueue();

        await commandQueue.executeCommand(add1command);
        await commandQueue.executeCommand(add10command);
        await commandQueue.executeCommand(add5command);
        await commandQueue.executeCommand(add5command);
        expect(counter.n1).toBe(21);
        await commandQueue.undoCommand()
        expect(counter.n1).toBe(16);
        await commandQueue.undoCommand(2)
        expect(counter.n1).toBe(1);
    })

    test("undo-redo command with queue", async () => {
        const counter = new Counter();

        const add1command = new AddOneN1Command(counter);
        const add5command = new AddFiveN1Command(counter)
        const add10command = new AddTenN1Command(counter)

        const commandQueue = new CommandQueue();

        await commandQueue.executeCommand(add1command);
        await commandQueue.executeCommand(add10command);
        await commandQueue.executeCommand(add5command);
        await commandQueue.executeCommand(add5command);
        expect(counter.n1).toBe(21);
        await commandQueue.undoCommand()
        expect(counter.n1).toBe(16);
        await commandQueue.redoCommand();
        expect(counter.n1).toBe(21);
        await commandQueue.undoCommand(3);
        expect(counter.n1).toBe(1);
    })

})
