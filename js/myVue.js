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
            console.log('监听值发生变化', val, ' >> ', newVal);
            val = newVal;
            vm.repeat(vm.box)
        }
    });
}
function MyVue(options) {
	this.el = options.el
	this.data = options.data
	this.box
	this.creatFrage()
	var data = this.data , me = this
	observe(data)
}
MyVue.prototype = {
	repeat: function(rep) {
		if(rep.children.length) {
			for(var i = 0; i< rep.children.length; i++) {
				if(rep.children[i].children.length == 0) {
					var text = rep.children[i].innerText	
					var item = rep.children[i]
					this.editor(text,item)
				}
				else {
					this.repeat(rep.children[i])
				}
			}
		}
	},
	editor: function(text,item) {
		var reg = /\{\{(.*)\}\}/;
		var reg2 = /\{|\}|\s/g;
		if(reg.test(text)) {
			text = text.replace(reg2,"")
		}
		if(item.hasAttributes('v-bind')) {
			text = item.getAttribute("v-bind")
		}
		if(this.data.hasOwnProperty(text)) {
			item.innerText = this.data[text];
 			item.setAttribute("v-bind",text)
		}
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
}
