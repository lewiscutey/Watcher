let data={
    name:'zane',
    blog:'https://blog.seosiwei.com/',
    age:20,
    fn:'',
    some:{
    	f:'xiaowang'
    }
}
let watch={
	name: function (val, oldVal) {
		console.log('----------name--------')
      	console.log('new: %s, old: %s', val, oldVal)
    },
    blog:function (val, oldVal) {
    	console.log('----------blog---------')
      	console.log('new: %s, old: %s', val, oldVal)
    },
    age:'doSomething',
    fn:[
      function handle1 (val, oldVal) { console.log('111111') },
      function handle2 (val, oldVal) { console.log('222222') }
    ],
    some:{
      	handler: function (val, oldVal) {
      		console.log('----------some---------')
      		console.log('new: %s, old: %s', val, oldVal)
      	},
      	immediate: true
    },
    'some.f': function (val, oldVal) { 
		console.log(`----some.f-----`)
		console.log('new: %s, old: %s', val, oldVal)
	},
}
 
let vue = new Vue()
vue.data = data
vue.doSomething=()=>{
	console.log(`i will do something`)
}
let updateComponent = (vm)=>{
	// 收集依赖
	data.age
	data.blog
	data.name
	data.some
	data.some.f
	data.fn
}
new Watcher(vue,updateComponent)
observe(data)
new stateWatch(vue, watch)