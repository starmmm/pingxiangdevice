import Router from "vue-router";

import Layout from "@/layout";

export const routes = [{
        path: "/",
        component: Layout,
        redirect: "/mainPage",
        name: "mainPage",
        children: [{
            path: "/mainPage",
            component: () =>
                import ("@/views/indexPieChart/indexWithPie"),
            meta: { title: "主页", icon: "el-icon-s-home" },
        }]

    },
    {
        path: "/basicInfo",
        component: Layout,
        redirect: "/staff",
        name: "Basic",
        meta: { title: "基本信息管理", icon: "el-icon-s-management" }, // 使用 element 自带 icon，参见https://element.eleme.cn/#/zh-CN/component/icon
        children: [{
                path: "staff",
                name: "Staff",
                component: () =>
                    import ("@/views/staff"),
                meta: { title: "人员信息管理", icon: "el-icon-user", roles: [0, 1, 2] },
            },
            {
                path: "check",
                name: "Check",
                component: () =>
                    import ("@/views/check"),
                meta: { title: "数据核查", icon: "el-icon-s-data", roles: [0, 1, 2] },
            },
            {
                path: "info/:id",
                name: "Info",
                component: () =>
                    import ("@/views/asPoliceInfo/index.vue"),
                meta: { title: "基本信息" },
                hidden: true,
            },
        ],
    },
    // {
    //   path: "/rank",
    //   component: Layout,
    //   children: [{
    //     path: "",
    //     name: "Rank",
    //     component: () =>
    //       import ("@/views/rank"),
    //     meta: { title: "警衔管理", icon: "el-icon-star-on" },
    //   },],
    // },
    {
        path: "/1",
        component: Layout,
        redirect: "/position",
        meta: { title: "部门调整", icon: "el-icon-star-on" },
        children: [{
                path: "position",
                name: "Position",
                component: () =>
                    import ("@/views/institution/position.vue"),
                meta: { title: "人员查询", icon: "el-icon-search", roles: [0, 1, 2] },
            },
            {
                path: "positionChange",
                name: "PositionChange",
                component: () =>
                    import ("@/views/positionChange/change.vue"),
                meta: { title: "部门调整", icon: "el-icon-more", roles: [0, 1, 2] },
                hidden: true,
            },
            {
                path: "positionCheck",
                name: "PositionCheck",
                component: () =>
                    import ("@/views/positionChange/check.vue"),
                meta: { title: "调整审核", icon: "el-icon-check", roles: [0, 1] },
            }
        ],
    },
    {
        path: "/2",
        component: Layout,
        redirect: "/rank",
        meta: { title: "职级调整", icon: "el-icon-medal" },
        children: [{
                path: "rank",
                name: "Rank",
                component: () =>
                    import ("@/views/institution/rank.vue"),
                meta: { title: "人员查询", icon: "el-icon-search", roles: [0, 1, 2] },
            },
            {
                path: "rankChange",
                name: "RankChange",
                component: () =>
                    import ("@/views/rankChange/change.vue"),
                meta: { title: "职级调整", icon: "el-icon-more", roles: [0, 1, 2] },
                hidden: true,
            },
            {
                path: "rankCheck",
                name: "RankCheck",
                component: () =>
                    import ("@/views/rankChange/check.vue"),
                meta: { title: "调整审核", icon: "el-icon-check", roles: [0, 1] },
            },
        ],
    },
    {
        path: "/3",
        component: Layout,
        redirect: "/document",
        meta: { title: "警察证管理", icon: "el-icon-document" },
        children: [{
                path: "document",
                name: "Document",
                component: () =>
                    import ("@/views/document/document.vue"),
                meta: { title: "人员查询", icon: "el-icon-search ", roles: [0, 1, 2] },
            },
            {
                path: "documentProcess",
                name: "DocumentProcess",
                component: () =>
                    import ("@/views/document/documentProcess.vue"),
                meta: { title: "警察证办理", icon: "el-icon-tickets", roles: [0, 1, 2] },
                hidden: true
            },
            {
                path: "recordQuery",
                name: "RecordQuery",
                component: () =>
                    import ("@/views/document/recordQuery"),
                meta: { title: "办理记录查询", icon: "el-icon-time", roles: [0, 1, 2] },
            },
        ]
    },
    {
        path: "/4",
        component: Layout,
        redirect: "/admin",
        meta: { title: "设备管理", icon: "el-icon-medal" },
        children: [{
                path: "admin0",
                name: "Admin0",
                component: () =>
                    import ("@/views/admin0"),
                meta: { title: "设备管理-管理页面", icon: "el-icon-user", roles: [0, 1, 2] },
            },
            {
                path: "admin1",
                name: "Admin1",
                component: () =>
                    import ("@/views/admin1"),
                meta: { title: "设备管理-普通页面", icon: "el-icon-user-solid", roles: [0, 1, 2] },
            },
            {
                path: "chart",
                name: "Chart",
                component: () =>
                    import ("@/views/charts/KeyBoard"),
                meta: { title: "KeyBoard", icon: "el-icon-user-solid", roles: [0, 1, 2] },
                hidden: true,
            }
        ]
    }, {
        path: "/myinfo",
        component: Layout,
        children: [{
            path: "",
            name: "Myinfo",
            component: () =>
                import ("@/views/myinfo"),
            meta: { title: "个人信息" },
            hidden: true,
        }, ],
    },
    {
        path: "/userControl",
        component: Layout,
        children: [{
            path: "",
            name: "UserControl",
            component: () =>
                import ("@/views/userControl"),
            meta: { title: "用户管理" },
            hidden: true,
        }, ],
    },
    {
        path: "/login",
        component: () =>
            import ("@/views/login"),
        hidden: true,
    },
    {
        path: "/404",
        component: () =>
            import ("@/views/404"),
        hidden: true,
    },
    {
        path: "/5",
        component: Layout,
        redirect: "/Search",
        meta: { title: "图", icon: "el-icon-medal", },
        hidden: true,
        children: [{
            path: "search1",
            name: "Search1",
            component: () =>
                import ("@/views/adminSearch/search1"),
            meta: { title: "图1", icon: "el-icon-medal", roles: [0, 1, 2] },
            // hidden: true,
        }, {
            path: "search2",
            name: "Search2",
            component: () =>
                import ("@/views/adminSearch/search2"),
            meta: { title: "图2", icon: "el-icon-medal", roles: [0, 1, 2] },
            // hidden: true,
        }, {
            path: "search3",
            name: "Search3",
            component: () =>
                import ("@/views/adminSearch/search3"),
            meta: { title: "图3", icon: "el-icon-medal", roles: [0, 1, 2] },
            // hidden: true,
        }, {
            path: "search4",
            name: "Search4",
            component: () =>
                import ("@/views/adminSearch/search4"),
            meta: { title: "图4", icon: "el-icon-medal", roles: [0, 1, 2] },
            // hidden: true,
        }, ]
    },


    { path: "*", redirect: "/404", hidden: true },
];

export default new Router({
    routes,
});