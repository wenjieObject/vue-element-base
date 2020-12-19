

## vue配置



格式化代码

安装vuter 快捷键 shift + alt +f





## vuex简单使用



当我们在页面上点击一个按钮，它会触发(dispatch)一个action, action 随后会执行(commit)一个mutation, mutation 立即会改变state, state 改变以后,我们的页面会state 获取数据，页面发生了变化。

Store包含action、mutation、state



store里面写

```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count:0
  },
  //类似组件里的method部分
  mutations: {
    add(state){
      state.count++;
    }
  },
  //触发mutations的事件
  actions: {
    increment (context) {
      context.commit('add')
    }
  },
  //相当于组件的计算属性
  //使用store.getters.doneTodos // -> [{ id: 1, text: '...', done: true }]
  getters: {
    recount: state => {
      return state.count>10?0:1
    }
  },
  modules: {
  }
})
```



 在页面上使用

```vue
<template>
    <div>
        <span>这是vuex：{{count}}</span>
        <span>这是vuex：{{recount}}</span>
<button @click="add">add</button>
    </div>
</template>

<script>

    export default {
        computed: {
            count() {
                return this.$store.state.count
            },
            recount(){
                return this.$store.getters.recount
            }
        },
        methods: {
            add() {
                this.$store.dispatch('increment')
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>
```







## 监视器





## 3.按钮级权限控制





### 3.1.自定义指令



```vue

// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
```



然后可以在组件中使用



```vue
<input v-focus>
```



#### 3.1.1.指令钩子函数



`bind: function (el, binding, vnode)`

自定义指令

```js
Vue.directive('demo', {
  bind: function (el, binding, vnode) {
    var s = JSON.stringify
    el.innerHTML =
      'name: '       + s(binding.name) + '<br>' +
      'value: '      + s(binding.value) + '<br>' +
      'expression: ' + s(binding.expression) + '<br>' +
      'argument: '   + s(binding.arg) + '<br>' +
      'modifiers: '  + s(binding.modifiers) + '<br>' +
      'vnode keys: ' + Object.keys(vnode).join(', ')
  }
})
```

使用指令

```vue
<div id="hook-arguments-example" v-demo:foo.a.b="message"></div>
```

输出结果

```
  'name: demo'       
      'value: hello'      
      'expression: message' 
      'argument: foo'    
      'modifiers: {a:true,b:true}'  
      'vnode keys: '  
```



#### 3.1.2.动态指令



自定义指令，参数动态给出



```js
Vue.directive('pin', {
  bind: function (el, binding, vnode) {
    el.style.position = 'fixed'
    var s = (binding.arg == 'left' ? 'left' : 'top')
    el.style[s] = binding.value + 'px'
  }
})

new Vue({
  el: '#dynamicexample',
  data: function () {
    return {
      direction: 'left'
    }
  }
})
```



使用指令,根据传入的direction。使元素距离左侧或上侧



```vue
<div id="dynamicexample">
  <h3>Scroll down inside this section ↓</h3>
  <p v-pin:[direction]="200">I am pinned onto the page at 200px to the left.</p>
</div>
```





#### 3.1.3.指令传入多个值



```js
<div v-demo="{ color: 'white', text: 'hello!' }"></div>

Vue.directive('demo', function (el, binding) {
  console.log(binding.value.color) // => "white"
  console.log(binding.value.text)  // => "hello!"
})
```



### 3.2. 混入



局部混入

```js
var mixin = {
  methods: {
    foo: function () {
      console.log('foo')
    },
    conflicting: function () {
      console.log('from mixin')
    }
  }
}

var vm = new Vue({
  mixins: [mixin],
  methods: {
    bar: function () {
      console.log('bar')
    },
    conflicting: function () {
      console.log('from self')
    }
  }
})

vm.foo() // => "foo"
vm.bar() // => "bar"
vm.conflicting() // => "from self"
```



全局混入

```js
// 为自定义的选项 'myOption' 注入一个处理器。
Vue.mixin({
  created: function () {
    var myOption = this.$options.myOption
    if (myOption) {
      console.log(myOption)
    }
  }
})

new Vue({
  myOption: 'hello!'
})
// => "hello!"
```



## 4.vue脚手架



安装yarn

```
npm install -g yarn
```



安装vue-cli3

```
npm install -g @vue/cli

//输出版本号
vue -V
```

创建项目

```
vue create project 	或者可视化创建 vue ui
vue init webpack project
```

可视化创建时，需要选择vuex，router等



根目录新建文件 `vue.config.js`

```js


//vue.config.js 常用配置
module.exports={

    // 部署应用时的基本 URL
  publicPath:  '/',
 
  // build时构建文件的目录 构建时传入 --no-clean 可关闭该行为
  outputDir: 'dist',
 
  // build时放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  assetsDir: '',
 
  // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
  indexPath: 'index.html',
 
  // 默认在生成的静态资源文件名中包含hash以控制缓存
  filenameHashing: true,
 
  // 构建多页面应用，页面的配置
  pages: {
    index: {
      // page 的入口
      entry: 'src/index/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Index Page',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    // 当使用只有入口的字符串格式时，
    // 模板会被推导为 `public/subpage.html`
    // 并且如果找不到的话，就回退到 `public/index.html`。
    // 输出文件名会被推导为 `subpage.html`。
    subpage: 'src/subpage/main.js'
  },
 
  // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码 (在生产构建时禁用 eslint-loader)
  lintOnSave: process.env.NODE_ENV !== 'production',
 
  // 是否使用包含运行时编译器的 Vue 构建版本
  runtimeCompiler: false,
 
  // Babel 显式转译列表
  transpileDependencies: [],
 
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
  //生产环境使用false
  productionSourceMap: true,
 
  // 设置生成的 HTML 中 <link rel="stylesheet"> 和 <script> 标签的 crossorigin 属性（注：仅影响构建时注入的标签）
  crossorigin: '',
 
  // 在生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI)
  integrity: false,
 
  // 如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中
  // 如果你需要基于环境有条件地配置行为，或者想要直接修改配置，那就换成一个函数 (该函数会在环境变量被设置之后懒执行)。该方法的第一个参数会收到已经解析好的配置。在函数内，你可以直接修改配置，或者返回一个将会被合并的对象
  configureWebpack: {},
 
  // 对内部的 webpack 配置（比如修改、增加Loader选项）(链式操作)
  chainWebpack: () =>{
 
  },
 
  // css的处理
  css: {
    // 当为true时，css文件名可省略 module 默认为 false
    modules: true,
    // 是否将组件中的 CSS 提取至一个独立的 CSS 文件中,当作为一个库构建时，你也可以将其设置为 false 免得用户自己导入 CSS
    // 默认生产环境下是 true，开发环境下是 false
    extract: false,
    // 是否为 CSS 开启 source map。设置为 true 之后可能会影响构建的性能
    sourceMap: false,
    //向 CSS 相关的 loader 传递选项(支持 css-loader postcss-loader sass-loader less-loader stylus-loader)
    loaderOptions: {
      css: {},
      less: {}
    }
  },
 
  // 所有 webpack-dev-server 的选项都支持
  //可以用来配置跨域
  devServer: {
    host: '0.0.0.0',
    port: 8080
    
  },
 
  // 是否为 Babel 或 TypeScript 使用 thread-loader
  parallel: require('os').cpus().length > 1,
 
  // 向 PWA 插件传递选项
  pwa: {},
 
  // 可以用来传递任何第三方插件选项
  pluginOptions: {}
}
```



## 5.组件传值



vscode插件

Vue VSCode Snippets 插件命令`vb` `vm` `vd`



```vue
<h1 :msg=" 'message' "></h1> //加上：后面的“”里面的默认是变量所以需要''
<h1 msg=" message"></h1> //不加：后面的“”里面的默认是字符
```



### 5.1.父子组件传值

- props/$emit

父传子

在父组件中给子组件传入属性

```vue
 <m-child msg="this is from parent"></m-child>
```

在子组件中使用prop接收

```vue
<script>
     export default {
        props: {
            msg: {
                type: String,
                default: ''
            },
        },
    }
</script>

//使用
<h4> {{msg}}</h4>
```

子传父

在子组件中添加按钮并触发emit

```vue
<button @click="passMsg">传给父组件</button>

        methods: {
            passMsg() {
                this.$emit("passParent","this is from child")
            }
        },
```



在父组件中的child监听passParent

```vue
        <m-child msg="this is from parent" @passParent="showMsg"></m-child>

        methods: {
            showMsg(val) {
                this.fromParent=val
                console.log(this.fromParent)
            }
        },

        data() {
            return {
                fromParent: ''
            }
        },
```



- $parent/children/$refs



在父组件中使用子组件，加上ref属性，可以获取子组件的值

```
 <m-child msg="this is from parent" @passParent="showMsg" ref="mychild"></m-child>

        mounted () {
            console.log('ref',this.$refs.mychild);
        },

```





### 5.2.非父子传值



- 事件总线

  ```vue
  
  ```

  



## 6.vue-router



- 路由的基本配置

router里面写

```js
import Vue from 'vue'
import VueRouter from 'vue-router'
 

Vue.use(VueRouter)

const routes = [

  {
    path: '/home',
      //懒加载
    component: ()=>import('../views/Home.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
```



在APP.vue里面加上标签，`<router-view></router-view>`



- 路由的跳转

  - router-link

  

  ```js
  <router-link to="/home">home</router-link>
  ```

  

  - 编程式导航

    `this.$router.push({path:'/home'})` 来跳转

  ```js
  <button @click="tohome">跳转</button>
  
  
      methods: {
        tohome() {
          this.$router.push({path:'/home'})
        }
      },
  ```

  

- 动态路由



在router里面添加路由,:id是变量

```js
const routes = [

  {
    path: '/home',
    component: ()=>import('../views/Home.vue')
  },
  {
    path: '/dynamic/:id',
    component: ()=>import('../views/Dynamic.vue')
  }
]

//在Dynamic页面中获取参数
 <h2>{{$route.params.id}}</h2>
```





- 嵌套路由



页面头部、底部、菜单栏

在router里面注册路由

```js
  {
    path: '/home',
    component: ()=>import('../views/Home.vue'),
    children: [
      {
        path: '/child',
        component: ()=>import('../views/Foot.vue'),
      }
    ]
  }
        
  //在父组件中使用
        
    <foot></foot>
```







- 导航守卫

路由钩子,在main.js里面写

```js

//to 要访问的路径
//from 原始路径
// next 跳转
router.beforeEach((to,from,next)=>{

  console.log(to)
  console.log(from)
  console.log(next)
  next();
});
```



- 路由懒加载



### 6.1.  router传参



```js
方式一：带参数传值
//传参
    go(){
        that.$router.push({
            path:'/order',//跳转路径
            name: 'Order',//跳转路径的name值，不写跳转后页面取不到参数
            // 参数
            query: {  name: 'name', dataObj: {}  }
        })
    }, 

//跳转后页面取参
        mounted(){
            // 路由参数
            let mm = this.$route.query//query包含传递的所有参数
        },

方式2 在路径中取参数
//传参
       go(){
            let num = '33'
            this.$router.push({ path:'/order' + '/' + num, })
        },

       //路由配置文件
       {
            path: '/order/:id',//路由携带的参数
            name: 'Order',
            component: Order
        },

        //跳转后页面取参
        mounted(){
            // 路由参数
            let mm = this.$route.params//parms包含传递的所有参数
        },
```





## 1.配置文件vue.config.js



在根目录下面新建文件vue.config.js



### 1.1.配置全局样式

注意sass-loader版本不能太新

- npm install --save-dev sass-loader@7.1.0

在assets/scss 下新建文件 `_variable.scss`

写上全局样式

```scss
$theme-color: #33aef0;
```

在vue.config.js上配置全局样式

```js
    css: {
        //配置全局样式
        loaderOptions: {
            sass: {
                data: `@import "@/assets/scss/_variable.scss";`
            }
        }
    }
```

在vue中使用全局样式

```vue
<style lang="scss">
#app {
  color: $theme-color;
}
</style>
```



## 2.路由和左侧导航

安装element-ui

`npm install element-ui -S`

完整引入，在 main.js 中写入以下内容：

```js
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'

Vue.use(ElementUI)

new Vue({
  el: '#app',
  render: h => h(App)
})
```



### 2.1.主体布局

菜单栏、顶部、主体部分分开写组件

```vue
<template>
  <el-container style="height: 100%">
    <el-aside width="200px">
        <common-aside></common-aside>
    </el-aside>
    <el-container>
      <el-header>
          <common-header></common-header>
      </el-header>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommonHeader from "../components/CommonHeader";
import CommonAside from "../components/CommonAside";

export default {
    components: {
        CommonHeader,
        CommonAside
    },
};
</script>

<style lang="scss" scoped>
</style>
```



在路由中注册该主体布局页面



```js
import Vue from 'vue'
import VueRouter from 'vue-router'
 

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: ()=>import('@/views/Main')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

```

### 2.2.侧边菜单栏组件



components下的文件CommonAside.vue 

```vue
<template>
  <el-menu
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-menu-item
      :index="item.path"
      v-for="item in noChildMenus"
      :key="item.path"
    >
      <i :class="item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>

    <el-submenu
      :index="index + ''"
      v-for="(item, index) in this.hasChildMenus"
      :key="index"
    >
      <template slot="title">
        <i :class="item.icon"></i>
        <span>{{ item.label }}</span>
      </template>
      <el-menu-item
        :index="subItem.path"
        v-for="subItem in item.children"
        :key="subItem.path"
      >
       <i :class="subItem.icon"></i>
        {{ subItem.label }}
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      asideMenus: [
        {
          path: "/",
          label: "首页",
          icon: "el-icon-s-home",
        },
        {
          path: "/video",
          label: "视频管理",
          icon: "el-icon-video-play",
        },
        {
          path: "/user",
          label: "人员管理",
          icon: "el-icon-user",
        },
        {
          label: "其他页面",
          icon: "el-icon-user",
          children: [
            {
              path: "/page1",
              label: "页面1",
              icon: "el-icon-delete",
            },
            {
              path: "/page2",
              label: "页面2",
              icon: "el-icon-delete-solid",
            },
          ],
        },
      ],
    };
  },
  computed: {
    hasChildMenus() {
      return this.$data.asideMenus.filter((item) => item.children);
    },
    noChildMenus() {
      return this.$data.asideMenus.filter((item) => !item.children);
    },
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.el-menu {
  height: 100%;
}
</style>
```



## 3.左侧导航与面包屑联动



左侧导航栏修改，点击菜单时触发vuex的事件，调用事件将选中的菜单传输到store中,头部面包屑获取选中的菜单，更新面包屑导航



左侧导航栏CommonAside.vue

```vue
<template>
  <el-menu
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-menu-item
      :index="item.path"
      v-for="item in noChildMenus"
      :key="item.path"
      @click="clickMenu(item)"
    >
      <i :class="item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>

    <el-submenu
      :index="index + ''"
      v-for="(item, index) in hasChildMenus"
      :key="index"
    >
      <template slot="title">
        <i :class="item.icon"></i>
        <span>{{ item.label }}</span>
      </template>
      <el-menu-item
        :index="subItem.path"
        v-for="subItem in item.children"
        :key="subItem.path"
        @click="clickMenu(subItem)"
      >
       <i :class="subItem.icon"></i>
        {{ subItem.label }}
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      asideMenus: [
        {
          path: "/",
          label: "首页",
          name: "home",
          icon: "el-icon-s-home",
        },
        {
          path: "/video",
          label: "视频管理",
          name: "video",
          icon: "el-icon-video-play",
        },
        {
          path: "/user",
          label: "人员管理",
           name: "user",
          icon: "el-icon-user",
        },
        {
          label: "其他页面",
          icon: "el-icon-user",
          children: [
            {
              path: "/page1",
              label: "页面1",
               name: "page1",
              icon: "el-icon-delete",
            },
            {
              path: "/page2",
              label: "页面2",
                name: "page2",
              icon: "el-icon-delete-solid",
            },
          ],
        },
      ],
    };
  },
  computed: {
    hasChildMenus() {
      return this.$data.asideMenus.filter((item) => item.children);
    },
    noChildMenus() {
      return this.$data.asideMenus.filter((item) => !item.children);
    },
  },
  mounted() {},
  methods: {
    clickMenu(item){
      this.$store.commit('selectMenu',item)
    }
  },
};
</script>

<style lang="scss" scoped>
.el-menu {
  height: 100%;
  border: none;
}
</style>
```



新增store下的文件tab.js,用于保存菜单相关数据

```js
export default{
    state: {
        menu: [],
        currentMenu: null
    },
    mutations: {
        selectMenu(state,val){
            state.currentMenu=val;
        }
    },
    actions: {},
   
}
```

在store下的index.js引入tab

```js
import Vue from 'vue'
import Vuex from 'vuex'
import tab from './tab'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    tab
  }
})
```

头部文件修改

`CommonHeader.vue`

```vue
<template>
  <header>
    <div class="l-content">
      <el-button type="primary" icon="el-icon-menu" size="mini"></el-button>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-if="currentMenu.name!=='home'">{{currentMenu.label}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <img :src="src" class="userImg" />
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-user">个人中心</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-plus">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      currentMenu: (state) => state.tab.currentMenu,
    }),
  },
  data() {
    return {
      src: require("@/assets/images/boy.png"),
    };
  },
  updated () {
      console.log(this.currentMenu);
  },
  
};
</script>

<style lang="scss" scoped>
header {
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: space-between;
  .l-content {
    display: flex;
    align-items: center;
    .el-button {
      margin-right: 18px;
    }
  }
}

.userImg {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
</style>

<style lang="scss">
.el-breadcrumb__inner a,
.el-breadcrumb__inner.is-link {
  color: cornsilk;
}
.el-breadcrumb__item:last-child .el-breadcrumb__inner,
.el-breadcrumb__item:last-child .el-breadcrumb__inner a,
.el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover,
.el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
  color: cornsilk;
}
</style>
```



## 4.使用vuex切换tab页签



- 新建CommonTab组件，标签页
- 在Main.vue中引入CommonTab组件
- 在vuex里定义tabList，存取标签
- 在单击侧边栏菜单，通过vuex将菜单加入tabList
- 在vuex中定义移除菜单的方法，单击tab标签删除时调用



修改tab.js，新增vuex方法

```js
export default {
    state: {
        menu: [],
        currentMenu: null,
        tabList: [
            {
                path: "/",
                label: "首页",
                name: "home",
                icon: "el-icon-s-home",
              }
        ]
        
    },
    mutations: {
        selectMenu(state, val) {
            if (val.name !== "home") {
                state.currentMenu = val;
                let result = state.tabList.findIndex(item => item.name === val.name)
                result === -1 ? state.tabList.push(val) : ""
            } else {
                state.currentMenu = null;
            }
        },
        closeTab(state,val){
            let result = state.tabList.findIndex(item => item.name === val.name)
            state.tabList.splice(result,1)
        }
    },
    actions: {},

}
```



新建CommonTab.vue 



```vue
<template>
  <div class="tagdiv">
    <el-tag
      :key="tag.name"
      v-for="tag in tags"
      :closable="tag.name!=='home'"
      :disable-transitions="false"
      @close="handleClose(tag)"
      size="medium"
    >
      {{ tag.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabList,
    }),
  },
  data() {
    return {};
  },
  methods: {
    handleClose(tag) {
      this.$store.commit("closeTab", tag);
    },
  },
};
</script>

<style lang="scss" scoped>
.el-tag + .el-tag {
  margin-left: 5px;
}
.tagdiv {
  padding-top: 5px;
  padding-left: 5px;
}
</style>
```



在Main.vue中引入



```vue
<template>
  <el-container style="height: 100%">
    <el-aside width="200px">
        <common-aside></common-aside>
    </el-aside>
    <el-container>
      <el-header>
          <common-header></common-header>
      </el-header>
     
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommonHeader from "../components/CommonHeader";
import CommonAside from "../components/CommonAside";
import CommonTab from '../components/CommonTab'

export default {
    components: {
        CommonHeader,
        CommonAside,
        CommonTab
        
    },
};
</script>

<style lang="scss" scoped>
.el-header{
    background-color: rgb(84, 92, 90);
    padding: 0 5px;
}
</style>
```



## 5.选中菜单，展示主体内容



在main.vue的主体部分添加`<router-view></router-view>`,子路由页面会展示在这里

```vue
<template>
  <el-container style="height: 100%">
    <el-aside width="200px">
        <common-aside></common-aside>
    </el-aside>
    <el-container>
      <el-header>
          <common-header></common-header>
      </el-header>
      <common-tab></common-tab>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommonHeader from "../components/CommonHeader";
import CommonAside from "../components/CommonAside";
import CommonTab from '../components/CommonTab'

export default {
    components: {
        CommonHeader,
        CommonAside,
        CommonTab
        
    },
};
</script>

<style lang="scss" scoped>
.el-header{
    background-color: rgb(84, 92, 90);
    padding: 0 5px;
}
</style>
```





在router的index.js添加子路由

```js
import Vue from 'vue'
import VueRouter from 'vue-router'
 

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: ()=>import('@/views/Main'),
    children: [
      {
        path: '/',
        component: ()=>import('@/views/Home'),
        name: 'home'
      },
      {
        path: '/video',
        component: ()=>import('@/views/video/Video'),
        name: 'video'
      },
      {
        path: '/page1',
        component: ()=>import('@/views/other/Page1'),
        name: 'page1'
      },
      {
        path: '/page2',
        component: ()=>import('@/views/other/Page2'),
        name: 'page2'
      },
      {
        path: '/user',
        component: ()=>import('@/views/user/User'),
        name: 'user'
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

```



新建子路由页面比如在view下面的user文件夹下新建User.vue页面等



在CommonAside.vue中，选中左侧菜单栏，打开页面

```vue
    clickMenu(item) {
      this.$router.push({ name: item.name });
      this.$store.commit("selectMenu", item);
    },
```



在CommonTab.vue中，选中tab页面，打开页面

新增`@click`方法

```vue
<template>
  <div class="tagdiv">
    <el-tag
      :key="tag.name"
      v-for="tag in tags"
      :closable="tag.name!=='home'"
      :disable-transitions="false"
      @close="handleClose(tag)"
      size="medium"
      @click="clickTag(tag)"
    >
      {{ tag.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabList,
    }),
  },
  data() {
    return {};
  },
  methods: {
    handleClose(tag) {
      this.$store.commit("closeTab", tag);
    },
    clickTag(tag){
      this.$router.push({name:tag.name})
      this.$store.commit('selectMenu',tag)
    }
  },
};
</script>

<style lang="scss" scoped>
.el-tag + .el-tag {
  margin-left: 5px;
}
.tagdiv {
  padding-top: 5px;
  padding-left: 5px;
}
</style>
```



## 6.页面布局优化



- 选中的标签颜色变化

在CommonTab.vue的el-tag标签添加` :effect="$route.name===tag.name?'dark':'light'"`



- 修改删除tab页的方法，删除时自动跳转到上一个tab

  修改`CommonTab`的方法handleClose

  ```vue
      handleClose(tag) {
        //获取当前tag之前的tag
        let result = this.tags.findIndex(item => item.name === tag.name)
        if(result>0){
          let newTag=this.tags[result-1]
          this.$router.push({name:newTag.name})
          this.$store.commit('selectMenu',newTag)
        }
        this.$store.commit("closeTab", tag);
      },
  ```

  

  

- 隐藏显示左侧菜单栏

在tab.js中定义isCollapse和collapseMenu方法

```js
export default {
    state: {
        isCollapse: false,
        menu: [],
        currentMenu: null,
        tabList: [
            {
                path: "/",
                label: "首页",
                name: "home",
                icon: "el-icon-s-home",
              }
        ]
        
    },
    mutations: {
        selectMenu(state, val) {
            if (val.name !== "home") {
                state.currentMenu = val;
                let result = state.tabList.findIndex(item => item.name === val.name)
                result === -1 ? state.tabList.push(val) : ""
            } else {
                state.currentMenu = null;
            }
        },
        closeTab(state,val){
            let result = state.tabList.findIndex(item => item.name === val.name)
            state.tabList.splice(result,1)
        },
        collapseMenu(state){
            state.isCollapse=!state.isCollapse
        }
    },
    actions: {},

}
```



在CommonHeader.vue中点击按钮执行collapseMenu，操作tab.js中的方法传递数据



```js
<template>
  <header>
    <div class="l-content">
      <el-button type="plain" @click="collapseMenu" icon="el-icon-menu" size="mini"></el-button>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-if="currentMenu">{{currentMenu.label}}</el-breadcrumb-item>
      </el-breadcrumb>
       
    </div>
    <div class="r-content">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <img :src="src" class="userImg" />
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-user">个人中心</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-plus">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";
 
export default {
 
  computed: {
    ...mapState({
      currentMenu: (state) => state.tab.currentMenu,
    }),
  },
  data() {
    return {
      src: require("@/assets/images/boy.png"),
    };
  },
  methods: {
    collapseMenu() {
        this.$store.commit("collapseMenu");
    }
  },
 
};
</script>

<style lang="scss" scoped>
header {
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: space-between;
  .l-content {
    display: flex;
    align-items: center;
    .el-button {
      margin-right: 18px;
    }
  }
}

.userImg {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
</style>

<style lang="scss">
.el-breadcrumb__inner a,
.el-breadcrumb__inner.is-link {
  color: cornsilk;
}
.el-breadcrumb__item:last-child .el-breadcrumb__inner,
.el-breadcrumb__item:last-child .el-breadcrumb__inner a,
.el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover,
.el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
  color: cornsilk;
}
</style>
```



在main.vue中删除`el-aside`的宽度改为`auto`

在`CommonAside.vue`中加入样式

```css
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
```



## 7.封装服务请求



```
npm install axios --save
```





## 8.封装echart



```
 npm install echarts -S
```

降低到4.9版本重新启动

在main.js引入echarts

```js
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/scss/reset.scss'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import echarts from 'echarts'

Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

```



components下新增文件CommonChart.vue

```vue
<template>
  <div style="height: 100%" ref="chartdiv"></div>
</template>

<script>
export default {
  props: {
    chartData: {
      type: Object,
      default() {
        return {
          //横坐标参数
          xAxis: [],
          //表格数据
          series: [],
          legendData: [],
        };
      },
    },
    //是否含有坐标轴
    isAxisChart: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    option() {
      return this.isAxisChart ? this.axisOption : this.normalOption;
    },
  },
  data() {
    return {
      axisOption: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          data: [],
        },
        xAxis: [],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [],
      },
      normalOption: {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
          data: [],
        },
        series: [],
      },
    };
  },
  watch: {
    //表格数据发生变化后重新渲染
    chartData: {
      handler: function () {
        this.initChart();
      },
      deep: true,
    },
  },
  methods: {
    initChart() {
      let chart = this.$refs.chartdiv;
      if (chart) {
        const myChart = this.$echarts.init(chart);
        this.initChartData();
        myChart.setOption(this.option);
        window.addEventListener("resize", function () {
          myChart.resize();
        });
        this.$on("hook:destroyed", () => {
          window.removeEventListener("resize", function () {
            myChart.resize();
          });
        });
      }
    },
    initChartData() {
      if (this.isAxisChart) {
        this.axisOption.xAxis = this.chartData.xAxis;
        this.axisOption.series = this.chartData.series;
        this.axisOption.legend.data = this.chartData.legendData;
      } else {
        this.normalOption.series = this.chartData.series;
        this.normalOption.legend.data = this.chartData.legendData;
      }
    },
  },
  mounted() {
    this.initChart();
  },
};
</script>

<style lang="scss" scoped>
</style>
```



在home.vue中使用,传入数据和参数

```vue
<template>
  <div style="height: 100%">
    <common-chart :chartData="chartData" :isAxisChart="true"></common-chart>
    <common-chart
      :chartData="normalChartData"
      :isAxisChart="false"
    ></common-chart>
  </div>
</template>

<script>
import CommonChart from "../components/CommonChart";
export default {
  components: {
    CommonChart,
  },
  data() {
    return {
      chartData: {
        xAxis: [
          {
            type: "category",
            axisTick: { show: false },
            data: ["2012", "2013", "2014", "2015", "2016"],
          },
        ],
        series: [
          {
            name: "Forest",
            type: "bar",
            barGap: 0,
            data: [320, 332, 301, 334, 390],
          },
          {
            name: "Steppe",
            type: "bar",
            data: [220, 182, 191, 234, 290],
          },
          {
            name: "Desert",
            type: "bar",
            data: [150, 232, 201, 154, 190],
          },
          {
            name: "Wetland",
            type: "bar",
            data: [98, 77, 101, 99, 40],
          },
        ],
        legendData: ["Forest", "Steppe", "Desert", "Wetland"],
      },
      normalChartData: {
        legendData: [
          "直接访问",
          "邮件营销",
          "联盟广告",
          "视频广告",
          "搜索引擎",
        ],
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "30",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
              { value: 234, name: "联盟广告" },
              { value: 135, name: "视频广告" },
              { value: 1548, name: "搜索引擎" },
            ],
          },
        ],
      },
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
```



### 8.1.自适应页面大小

浏览器大小变化

```vue
        window.addEventListener("resize", function () {
          myChart.resize();
        });
        this.$on("hook:destroyed", () => {
          window.removeEventListener("resize", function () {
            myChart.resize();
          });
        });
```

菜单伸缩

在computed 获取isCollapse

```vue
    isCollapse(){
        return this.$store.state.tab.isCollapse
    }
```

在watch下面 见识isCollapse，发生改变时自适应

```vue
  watch: {
    //表格数据发生变化后重新渲染
    chartData: {
      handler: function () {
        this.initChart();
      },
      deep: true,
    },
    //菜单伸缩后重新渲染
    isCollapse() {
      setTimeout(() => {
          this.resizeChart()
      }, 300);
      
    },
  },
```







## 9.表单Form封装



### 9.1.slot插槽的使用

父组件中引入子组件 `common-form`

```vue
  <common-form :inline="true" :formLable="formLable" :formModel="formModel">
    <!-- 子组件插槽，下面这个按钮会替换子组件中的slot -->
    <el-button slot="search" type="primary" @click="onSubmit">查询</el-button>
  </common-form>
```

子组件, <slot name="search"></slot> 这句代码会被 <el-button slot="search" type="primary" @click="onSubmit">查询</el-button> 替换掉

```vue
    <el-form-item>
      <slot name="search"></slot>
    </el-form-item>
```



### 9.2.表单封装



CommonForm  封装

```vue
<template>
  <el-form :inline="inline" :model="formModel">
    <el-form-item
      :label="item.label"
      v-for="item in formProp"
      :key="item.model"
    >
      <el-input
        v-if="item.type === 'input'"
        v-model="formModel[item.model]"
        :placeholder="'请输入' + item.label"
      ></el-input>
      <el-select v-if="item.type === 'select'" v-model="formModel[item.model]">
        <el-option
          :key="subItem.value"
          v-for="subItem in item.options"
          :label="subItem.label"
          :value="subItem.value"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item>
      <slot name="search"></slot>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    inline: {
      type: Boolean,
      default: true,
    },
    //绑定的表单数据
    formModel: {
      type: Object,
      default: {},
    },
    //绑定的表单属性
    formProp: Array,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
</style>
```



在页面中使用封装的表单组件



```vue
<template>
  <common-form :inline="true" :formProp="formProp" :formModel="formModel">
    <!-- 子组件插槽，下面这个按钮会替换子组件中的slot -->
    <el-button slot="search" type="primary" @click="onSubmit">查询</el-button>
  </common-form>
</template>

<script>
import CommonForm from "../../components/CommonForm";
export default {
  components: {
    CommonForm,
  },
  data() {
    return {
      formProp: [
        {
          model: "keyword",
          label: "用户名",
          type: "input",
        },
        {
          model: "password",
          label: "密码",
          type: "input",
        },
        {
          model: "sex",
          label: "性别",
          type: "select",
          options: [
            { label: "男", value: 1 },
            { label: "女", value: 0 },
          ],
        },
      ],
      formModel: {
        keyword: "",
        password: "",
        sex: 1,
      },
    };
  },
  methods: {
    onSubmit() {
      console.log(this.formModel);
    },
  },
};
</script>


<style lang="scss" scoped>
</style>
```





## 10.表格Table封装



父组件需要给表格组件传入，表格属性（列名、列展示名、列宽、列样式等），表格数据，分页的时候需要传入，当前页，总数量



- 表格大小的问题暂未解决



分页和编辑，删除等方法，在子组件中触发，在父组件监听后，调用

在子组件的method中触发emit

```vue
    currentChange(page){
        this.$emit("currentChange",page)
    }
```

在父组件中监听currentChange

```vue
    <common-table :tableData="tableData" :tableProp="tableProp" :tableConfig="tableConfig" @currentChange="currentChange"></common-table>


```

然后在父组件中写处理

```vue
    currentChange(page){
        //监听子组件的方法，子组件emit之后调用该方法
        console.log(page)
    }
```



在表格组件CommonTable.vue

```vue
<template>
  <div class="common-table">
    <el-table :data="tableData"  height="90%" border stripe v-loading="tableConfig.loading">
      <el-table-column label="序号" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="item.label"
        :width="item.width ? item.width : 180"
        v-for="item in tableProp"
        :key="item.prop"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      layout="prev, pager, next"
      :total="tableConfig.total"
      @current-change="currentChange"
      :current-page.sync="tableConfig.currentPage"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    tableData: Array,
    tableProp: Array,
    tableConfig: Object,
  },
  data() {
    return {};
  },
  methods: {
    handleEdit(index, row) {
        this.$emit('handleEdit',row)
      //console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    currentChange(page){
        this.$emit("currentChange",page)
    }
  },
};
</script>

<style lang="scss" scoped>
.common-table {
  height: 520px;
  position: relative;
  .el-pagination {
    position: absolute;
    bottom: 0;
    right: 10px;
  }
}
</style>
```



在页面中使用表格组件

```vue
<template>
  <div>
    <common-form :inline="true" :formProp="formProp" :formModel="formModel">
      <!-- 子组件插槽，下面这个按钮会替换子组件中的slot -->
      <el-button slot="search" type="primary" @click="onSubmit">查询</el-button>
    </common-form>

    <common-table
      :tableData="tableData"
      :tableProp="tableProp"
      :tableConfig="tableConfig"
      @currentChange="currentChange"
      @handleEdit="handleEdit"
    ></common-table>
  </div>
</template>

<script>
import CommonForm from "../../components/CommonForm";
import CommonTable from "../../components/CommonTable";

export default {
  components: {
    CommonForm,
    CommonTable,
  },
  data() {
    return {
      formProp: [
        {
          model: "keyword",
          label: "用户名",
          type: "input",
        },
        {
          model: "password",
          label: "密码",
          type: "input",
        },
        {
          model: "sex",
          label: "性别",
          type: "select",
          options: [
            { label: "男", value: 1 },
            { label: "女", value: 0 },
          ],
        },
      ],
      formModel: {
        keyword: "",
        password: "",
        sex: 1,
      },
      tableProp: [
        {
          prop: "date",
          label: "日期",
          width: 150,
        },
        {
          prop: "name",
          label: "姓名",
          width: 120,
        },
        {
          prop: "address",
          label: "地址",
          width: 280,
        },
      ],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        
      ],
      tableConfig: {
        currentPage: 1,
        total: 100,
        loading: false, //控制表格加载
      },
    };
  },
  methods: {
    onSubmit() {
      console.log(this.formModel);
    },
    currentChange(page) {
      //监听子组件的方法，子组件emit之后调用该方法
      console.log(page);
    },
    handleEdit(row){
        console.log(row)
    }
  },
};
</script>


<style lang="scss" scoped>
</style>
```





## 11.权限控制

删除router.index下的路由

删除CommonAside下的路由

登录的时候，从后端获取路由，保存到vuex 的tab.下的menu中，通过动态路由添加上去，

由于页面刷新vuex的数据会丢失，所以token和路由表的数据得保存到cookie中，实例化vue的时候从cookie中获取路由添加到vuex

