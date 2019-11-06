const ManagerGift = () =>
    import ('@/views/manager/gift');
const ManagerBanner = () =>
    import('@/views/manager/banner');
const ManagerOrder = () =>
    import ('@/views/manager/order');
const MagDetail = () =>
    import ('@/views/manager/magDetail');
const Tabbar = () =>
    import ('@/components/Tabbar/');


export default [{
        path: '/manager',
        name: 'manager',
        meta: {
            keepAlive: false
        },
        components: {
            default: () =>
                import ('@/views/manager/manager'),
            tabbar: Tabbar
        }
    },
    {
        path: '/manager/gift',
        name: 'manager_gift',
        component: ManagerGift
    },

    //轮播图详情页
    {
        path: '/manager/banner',
        name: 'manager_banner',
        component: ManagerBanner
    },
    // 会员中心商品详情
    {
        path: '/manager/magDetail',
        name: 'magDetail',
        component: MagDetail
    },
    {
        path: '/manager/order',
        name: 'manager_order',
        component: ManagerOrder
    }
];