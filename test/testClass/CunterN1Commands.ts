import {ICommand} from "../../lib/ICommand";
import {Counter} from "./Counter";

export class AddOneN1Command implements ICommand {
    constructor(private readonly counter: Counter) {
    }

    execute(): void {
        this.counter.n1++;
    }

    unexecute(): void {
        this.counter.n1--;
    }

}


export class AddTenN1Command implements ICommand {
    constructor(private readonly counter: Counter) {
    }

    execute(): void {
        this.counter.n1 += 10;
    }

    unexecute(): void {
        this.counter.n1 -= 10;
    }

}


export class AddFiveN1Command implements ICommand {
    constructor(private readonly counter: Counter) {
    }

    execute(): void {
        this.counter.n1 += 5;
    }

    unexecute(): void {
        this.counter.n1 -= 5;
    }

}
