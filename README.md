[![SonarCloud](https://sonarcloud.io/images/project_badges/sonarcloud-black.svg)](https://sonarcloud.io/summary/new_code?id=MaurerKrisztian_command-pattern-queue)

[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=MaurerKrisztian_command-pattern-queue&metric=bugs)](https://sonarcloud.io/summary/new_code?id=MaurerKrisztian_command-pattern-queue)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=MaurerKrisztian_command-pattern-queue&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=MaurerKrisztian_command-pattern-queue)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=MaurerKrisztian_command-pattern-queue&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=MaurerKrisztian_command-pattern-queue)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=MaurerKrisztian_command-pattern-queue&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=MaurerKrisztian_command-pattern-queue)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=MaurerKrisztian_command-pattern-queue&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=MaurerKrisztian_command-pattern-queue)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=MaurerKrisztian_command-pattern-queue&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=MaurerKrisztian_command-pattern-queue)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=MaurerKrisztian_command-pattern-queue&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=MaurerKrisztian_command-pattern-queue)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=MaurerKrisztian_command-pattern-queue&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=MaurerKrisztian_command-pattern-queue)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=MaurerKrisztian_command-pattern-queue&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=MaurerKrisztian_command-pattern-queue)


# command-pattern-queue [![npm version](https://badge.fury.io/js/command-pattern-queue.svg)](https://badge.fury.io/js/command-pattern-queue)

### Basic implementation of command-pattern queue

## Usage:
```
npm i command-pattern-queue
```

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
