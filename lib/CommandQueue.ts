import {ICommand} from "./ICommand";

export class CommandQueue {
    executed: ICommand[] = [];
    redo: ICommand[] = [];
    locked = false;

    async executeCommand(command: ICommand) {
        await command.execute();
        this.executed.push(command);
    }

    async executeCommands(commands: ICommand[]) {
        for (const command of commands) {
            await this.executeCommand(command);
        }
    }

    async waitForUnlock(ms: number) {
        if (!this.locked) return

        const start = new Date().getTime();
        let time = 0;

        while (time < ms) {
            if (!this.locked) {
                return;
            }
            const end = new Date().getTime();
            time = end - start;
        }
        throw new Error(`timeout ${ms} ms. The queue is locked.`)
    }

    async undoCommand(numberOfCommands: number = 1, timeout: number = 1000): Promise<void> {
        await this.waitForUnlock(timeout)

        this.locked = true;

        if (this.getMaxUndo() < numberOfCommands) {
            throw new Error(`Maximum undo commands is ${this.getMaxRedo()}, you try to undo ${numberOfCommands}`);
        }

        for (let i = 0; i < numberOfCommands; i++) {
            if (this.executed.length == 0) {
                throw new Error("there is no revocable command");
            }
            await this.executed[this.executed.length - 1].unexecute()
            this.redo.push(this.executed[this.executed.length - 1])
            this.executed.pop();
        }

        this.locked = false;
    }

    async redoCommand(numberOfCommands: number = 1, timeout: number = 1000): Promise<void> {
        await this.waitForUnlock(timeout)

        this.locked = true;
        if (this.getMaxRedo() < numberOfCommands) {
            throw new Error(`Reduable commands is ${this.getMaxRedo()}, you try to redo ${numberOfCommands}`);
        }

        for (let i = 0; i < numberOfCommands; i++) {
            if (this.executed.length == 0) {
                throw new Error("there is no reduable command");
            }
            await this.executed[this.executed.length - 1].execute()
            this.executed.push(this.executed[this.executed.length - 1])
            this.redo.pop();
        }
        this.locked = false;
    }

    getMaxUndo(): number {
        return this.executed.length;
    }

    getMaxRedo() {
        return this.redo.length;
    }

}
