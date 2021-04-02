import {ICommand} from "./ICommand";

export class CommandQueue {
    executed: ICommand[] = [];
    redo: ICommand[] = [];

    async executeCommand(command: ICommand) {
        await command.execute();
        this.executed.push(command);
    }

    async executeCommands(commands: ICommand[]) {
        for (const command of commands) {
            await this.executeCommand(command);
        }
    }



    async undoCommand(numberOfCommands: number = 1): Promise<void> {

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
    }

    async redoCommand(numberOfCommands: number = 1): Promise<void> {

        if (this.getMaxRedo() < numberOfCommands) {
            throw new Error(`Reduable commands is ${this.getMaxRedo()}, you try to redo ${numberOfCommands}`);
        }

        for (let i = 0; i < numberOfCommands; i++) {
            if (this.executed.length == 0) {
                throw new Error("there is no reduable command");
            }
            await this.redo[this.redo.length - 1].execute()
            this.executed.push(this.executed[this.executed.length - 1])
            this.redo.pop();
        }
    }

    getMaxUndo(): number {
        return this.executed.length;
    }

    getMaxRedo() {
        return this.redo.length;
    }

}
