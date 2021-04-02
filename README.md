# command-pattern-queue

### Basic implementation of command-pattern queue

## Usage:

```typescript
// command interface
export interface ICommand {
    execute(): void
    unexecute(): void
}

const commandQueue = new CommandQueue(); // create queue

// execute ICommand-s
await commandQueue.executeCommand(Command1);
await commandQueue.executeCommand(Command2);

await commandQueue.executeCommands([Command3, Command4, Command5, Command6]);

// undo command
await commandQueue.undoCommand() // undo 1 command
await commandQueue.undoCommand(3) // undo 3 command

// redo commands
await commandQueue.redoCommand(); // redo 1 command
await commandQueue.redoCommand(2); // redo 2 command
```
