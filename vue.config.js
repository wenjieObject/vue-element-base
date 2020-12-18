module.exports={

    devServer: {
        port: 3000,
        //自动打开项目
        open: true,
        //proxy: {}
    },
    css: {
        //配置全局样式
        loaderOptions: {
            sass: {
                data: `@import "@/assets/scss/_variable.scss";`
            }
        }
    }
}