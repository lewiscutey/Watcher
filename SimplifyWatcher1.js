// 简单的Observer

class Observer {
  constructor(data) {
    // 如果不是对象，则返回
    if (!data || typeof data !== 'object') return;
    this.data = data;
    this.walk();
  }

  // 对传入的数据进行数据劫持
  walk() {
    object.keys(this.data).forEach((item, index) => {
      this.defineReactive(this.data, item, this.data[item]);
    })
  }

  // 创建当前属性的一个发布实例，使用Object.defineProperty来对当前属性进行数据劫持。
  defineReactive(obj, key, val) {
    // 创建当前属性的发布者
    const dep = new Dep();
    /*
    * 递归对子属性的值进行数据劫持，比如说对以下数据
    * let data = {
    *   name: 'cjg',
    *   obj: {
    *     name: 'zht',
    *     age: 22,
    *     obj: {
    *       name: 'cjg',
    *       age: 22,
    *     }
    *   },
    * };
    * 我们先对data最外层的name和obj进行数据劫持，之后再对obj对象的子属性obj.name,obj.age, obj.obj进行数据劫持，层层递归下去，直到所有的数据都完成了数据劫持工作。
    */
    new Observer(val);
    object.defineProperty(obj, key, {
      get() {
        // 若当前有对该属性的依赖项，则将其加入到发布者的订阅者队列里
        if (Dep.target) {
          dep.addSub(Dep.target);
        }
        return val;
      },
      set(newVal) {
        if (val == newVal) return;
        val = newVal;
        new Observer(newVal);
        dep.notify();
      }
    });

  }


}