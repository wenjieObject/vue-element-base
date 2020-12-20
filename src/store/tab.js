
import Cookie from 'js-cookie'

export default {
    state: {
        isCollapse: false,
        menu: [],
        currentMenu: null,
        tabList: [
            {
                path: "/home",
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
        closeTab(state, val) {
            let result = state.tabList.findIndex(item => item.name === val.name)
            state.tabList.splice(result, 1)
        },
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        setMenu(state, val) {
            Cookie.set('menu', JSON.stringify(val))
            state.menu = val
        },
        clearMenu(state) {
            state.menu = [],
                Cookie.remove('menu')
        },
        //动态添加菜单
        addRouter(state, router) {

            if (!Cookie.get('menu')) return
            let menu = JSON.parse(Cookie.get('menu'))

            if (!menu) {
                return
            }
            state.menu = menu;
            let currentRoute = [
                {
                    path: '/',
                    component: () => import('@/views/Main'),
                    children: []
                }
            ]
            menu.forEach(item => {
                if (item.children) {
                    item.children = item.children.map(subItem => {
                        subItem.component = () => import(`@/views/${subItem.url}`)
                        return subItem;
                    })
                    currentRoute[0].children.push(...item.children)
                } else {
                    item.component = () => import(`@/views/${item.url}`)
                    currentRoute[0].children.push(item)
                }
            });

        
            router.addRoutes(currentRoute)

        }

    },
    actions: {},

}