class StateMachine<E>
{
    private configuringState: E
    private onEntryCallbacks: StateMachineCallbackUnit<E>[] = []
    private onExitCallbacks: StateMachineCallbackUnit<E>[] = []

    constructor(initState: E) {
        this._currentState = initState
    }

    private _currentState: E

    public get currentState(): E {
        return this._currentState
    }

    public changeState(state: E): void {
        for (let i = 0; i < this.onExitCallbacks.length; i++)
        {
            if (this.onExitCallbacks[i].state !== this._currentState) continue
            this.onExitCallbacks[i].callback()
        }

        for (let i = 0; i < this.onEntryCallbacks.length; i++)
        {
            if (this.onEntryCallbacks[i].state !== state) continue
            this.onEntryCallbacks[i].callback()
        }

        this._currentState = state
    }

    public configure(state: E): StateMachine<E> {
        this.configuringState = state
        return this
    }

    public onEntry(guid: number, callback: () => void): StateMachine<E> {
        this.onEntryCallbacks.push(
            new StateMachineCallbackUnit<E>(this.configuringState, guid, callback)
        )
        return this
    }

    public onExit(guid: number, callback: () => void): StateMachine<E> {
        this.onExitCallbacks.push(
            new StateMachineCallbackUnit<E>(this.configuringState, guid, callback)
        )
        return this
    }

    public removeAllOf(guid: number): void {
        this.onEntryCallbacks.filter((unit) => unit.guid === guid)
        this.onExitCallbacks.filter((unit) => unit.guid === guid)
    }
}

class StateMachineCallbackUnit<E>
{
    public state: E
    public guid: number
    public callback: () => void

    constructor(state: E, guid: number, callback: () => void) {
        this.state = state
        this.guid = guid
        this.callback = callback
    }
}

export default StateMachine
