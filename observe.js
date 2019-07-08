class Vue {
  constructor(options) {
    this.data = options.data;
    this.observe(options.data, options.render);
    let watcher = new Watcher(this);
  }
  observe(data, cb) {
    Object.keys(data).forEach(key => this.defineReactive(data, key, data[key], cb));
  }
  defineReactive(obj, key, val, cb) {
    let dep = new dep();
    Object.defineProperty(obj, key, {
      get: () => {
        if(dep.target) {
          dep.addSub(dep.target);
        }
        return val;
      },
      set: newVal => {
        val = newVal;
        dep.notify();
      }
    })
  }
};

class dep {
  constructor() {
    this.subs = [];
  }
  addSub(watcher) {
    this.subs.push(watcher);
  }
  removeSub(sub) {
    let index = this.subs.indexOf(sub);
    this.splice(index, 1);
  }
  notify() {
    this.subs.forEach(sub => sub.update());
  }
}

class Watcher {
  constructor(vm, cb) {
    this.cb = cb;
    this.vm = vm;

    /*在这里将观察者本身赋值给全局的target，只有被target标记过的才会进行依赖收集*/
    Dep.target = this;
    /*Github:https://github.com/answershuto*/
    /*触发渲染操作进行依赖收集*/
    this.cb.call(this.vm);
  }
  update() {
    this.cb.call(this.vm);
  }
}

let app = new Vue({
  el: '#app',
  data: {
    text: 'text',
    text2: 'text2'
  },
  render(){
    console.log("render");
  }
})