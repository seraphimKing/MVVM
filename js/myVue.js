
function observe(data) {
    if (!data || typeof data !== 'object') {
        return;
    }
    // 取出所有属性遍历
    Object.keys(data).forEach(function(key) {
        defineReactive(data, key, data[key]);
    });
};

function defineReactive(data, key, val) {
    observe(val); // 监听子属性
    Object.defineProperty(data, key, {
        enumerable: true, // 可枚举
        configurable: false, // 不能再define
        get: function() {
            return val;
        },
        set: function(newVal) {
            console.log('监听值发生变化', val, ' --> ', newVal);
            val = newVal;
            vm.review()
        }
    });
}
function MyVue(options) {
	this.el = options.el
	this.data = options.data
	this.box
	this.creatFrage()
	var data = this.data , me = this
	/*Object.keys(data).forEach(function(key) {
		me.watcher(key)
	})*/
	observe(data)
}
MyVue.prototype = {
	review: function() {
		var me = this
		//查找html中的{{}},获取其中的值，如果跟对象中的值有相符合的，就将值渲染到页面中
		/*var frag =  document.createDocumentFragment();
		if(box) {
			frag.appendChild(box)
		}*/
		//循环遍历box的子元素，如果找到{{}}，且内部元素在数据中有相应的键，用值替换
		var reg = /\{\{(.*)\}\}/;
		var reg2 = /\{|\}|\s/g;
	 	[].slice.call(this.box.childNodes).forEach(function(node,index){
	 		var text = node.textContent
	 		if(reg.test(text)) {
	 			text = text.replace(reg2,"")
	 		}
	 		if(me.data.hasOwnProperty(text)) {
	 			me.box.childNodes[index].innerText = me.data[text];
	 		}
	 	})
	},
	creatFrage: function() {
		//获取el中的元素
		var el = this.el
		if(/^#/.test(this.el)) {
			el = el.substring(1)
			var box = document.getElementById(el)
		}
		this.box = box
	}
	/*watcher: function(key) {
		var me = this
		Object.defineProperty(me, key, {
		    configurable: false,
		    enumerable: true,
		    get: function() {
		        return me.data[key]
		    },
		    set: function(newVal) {
		        me.review()
		    }
		})
	}*/
}

var vm = new MyVue({
	el: "#app",
	data: {
		foo: 'bar',
		poo: 'great'
	}
})
vm.review()

setTimeout(function(){
	vm.data['foo'] = 'bar_change'
},3000)
