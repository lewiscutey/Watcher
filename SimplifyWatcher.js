let data = {price: 10, quantity: 2};
let target = null;

class Dep {
    constructor () {
        this.subscribers = [];
    }

    depend() {
        if (target && !this.subscribers.includes(target)) {
            this.subscribers.push(target);
        }
    }

    notify() {
        this.subscribers.forEach(sub => sub());
    }
}

Object.keys(data).forEach(key => {
    let internalValue = data[key];
    const dep = new Dep();

    Object.defineProperty(data, key, {
        get() {
            dep.depend();
            return internalValue;
        },
        set(newVal) {
            internalValue = newVal;
            dep.notify();
        }
    })
})

function Watcher(fun) {
    target = fun;
    target();
    target = null;
}

Watcher(() => {
    data.total = data.price * data.quantity;
})