class ObjectPool<T extends IPoolable>
{
    private readonly pool: T[] = []
    private readonly createFunction: () => T

    constructor(initialSize: number, createFunction: () => T) {
        this.createFunction = createFunction

        for (let i = 0; i < initialSize; i++)
        {
            this.createNewInstance(false)
        }
    }

    private createNewInstance(startAsAwake: boolean): T {
        const instance = this.createFunction()
        instance.isAwake = startAsAwake
        if (!startAsAwake) instance.sleep()
        this.pool.push(instance)
        return instance
    }

    private getInstance(): T {
        for (let i = 0; i < this.pool.length; i++)
        {
            if (this.pool[i].isAwake) continue
            this.pool[i].wake()
            this.pool[i].isAwake = true
            return this.pool[i]
        }

        return this.createNewInstance(true)
    }

    private returnInstance(instance: T) {
        instance.sleep()
        instance.isAwake = false
    }
}

interface IPoolable
{
    isAwake: boolean

    wake(): void

    sleep(): void
}

export {ObjectPool, IPoolable}