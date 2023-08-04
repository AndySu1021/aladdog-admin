import {createRouter, createWebHistory} from 'vue-router'
import MainLayout from '@/layout/MainLayout.vue'
import {
  ColdDrink,
  Dish,
  Location,
  Odometer,
  PieChart,
  Setting,
  ShoppingCart,
  User,
  Wallet
} from "@element-plus/icons-vue";
import {useRoutesStore} from "@/stores/routes";
import LoginPage from "@/views/LoginPage.vue";
import NotFoundPage from "@/views/NotFoundPage.vue";
import {useAdminStore} from "@/stores/admin";

export const constRoutes = [
  {
    path: '/login',
    component: LoginPage,
    hidden: true
  },
  {
    path: '/404',
    component: NotFoundPage,
    hidden: true
  },
  {
    path: '/',
    name: 'Root',
    redirect: '/dashboard',
    meta: { title: '首頁', icon: Odometer, key: 'Dashboard' },
    component: MainLayout,
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        meta: { title: '首頁', key: 'Dashboard' },
        component: () => import('@/views/dashboard/MainDashboard.vue'),
      },
    ]
  },
];

export const permRoutes = [
  {
    path: '/branch',
    name: 'Branch',
    meta: { title: '分店', icon: Location, key: 'Branch' },
    component: MainLayout,
    children: [
      {
        path: '/branch',
        name: 'BranchList',
        meta: { title: '分店', key: 'Branch.List.View' },
        component: () => import('@/views/branch/BranchList.vue'),
      },
      {
        path: '/branch/station',
        name: 'BranchStation',
        meta: { title: '崗位', key: 'Branch.Station.View' },
        component: () => import('@/views/branch/BranchStation.vue'),
      },
      {
        path: '/branch/table',
        name: 'BranchTable',
        meta: { title: '桌位', key: 'Branch.Table.View' },
        component: () => import('@/views/branch/BranchTable.vue'),
      },
    ]
  },
  {
    path: '/liquor',
    name: 'Liquor',
    meta: { title: '酒品', icon: ColdDrink, key: 'Liquor' },
    component: MainLayout,
    children: [
      {
        path: '/liquor/stock',
        name: 'LiquorStock',
        meta: { title: '庫存', key: 'Liquor.Stock.View' },
        component: () => import('@/views/liquor/LiquorStock.vue'),
      },
      {
        path: '/liquor/recipe',
        name: 'LiquorRecipe',
        meta: { title: '酒譜', key: 'Liquor.Recipe.View' },
        component: () => import('@/views/liquor/recipe/RecipeList.vue'),
      },
      {
        path: '/liquor/addon',
        name: 'LiquorAddon',
        meta: { title: '加價購', key: 'Liquor.Addon.View' },
        component: () => import('@/views/liquor/LiquorAddon.vue'),
      },
    ]
  },
  {
    path: '/meal',
    name: 'Meal',
    meta: { title: '餐點', icon: Dish, key: 'Meal' },
    component: MainLayout,
    children: [
      {
        path: '/meal',
        name: 'MealList',
        meta: { title: '餐點', key: 'Meal' },
        component: () => import('@/views/meal/MealList.vue'),
      },
    ]
  },
  {
    path: '/order',
    name: 'Order',
    meta: { title: '訂單', icon: ShoppingCart, key: 'Order' },
    component: MainLayout,
    children: [
      {
        path: '/order',
        name: 'Order',
        meta: { title: '訂單', key: 'Order' },
        component: () => import('@/views/order/OrderList.vue'),
      },
    ]
  },
  {
    path: '/report',
    name: 'Report',
    meta: { title: '報表', icon: PieChart, key: 'Report' },
    component: MainLayout,
    children: [
      {
        path: '/report/profit',
        name: 'ReportProfit',
        meta: { title: '營收', key: 'Report.Profit' },
        component: () => import('@/views/report/ProfitReport.vue'),
      },
      {
        path: '/report/meal',
        name: 'ReportMeal',
        meta: { title: '商品', key: 'Report.Meal' },
        component: () => import('@/views/report/MealReport.vue'),
      },
    ]
  },
  {
    path: '/staff',
    name: 'Staff',
    meta: { title: '員工', icon: User, key: 'Staff' },
    component: MainLayout,
    children: [
      {
        path: '/staff/list',
        name: 'StaffList',
        meta: { title: '員工', key: 'Staff.List.View' },
        component: () => import('@/views/staff/StaffList.vue'),
      },
      {
        path: '/staff/attendance',
        name: 'StaffAttendanceRecord',
        meta: { title: '打卡記錄', key: 'Staff.AttendanceRecord' },
        component: () => import('@/views/staff/StaffAttendanceRecord.vue'),
      },
    ]
  },
  {
    path: '/system',
    name: 'System',
    meta: { title: '系統', icon: Setting, key: 'System' },
    component: MainLayout,
    children: [
      {
        path: '/system/role',
        name: 'SystemRole',
        meta: { title: '角色', key: 'System.Role.View' },
        component: () => import('@/views/system/RoleList.vue'),
      },
      {
        path: '/system/admin',
        name: 'SystemAdmin',
        meta: { title: '管理員', key: 'System.Admin.View' },
        component: () => import('@/views/system/AdminList.vue'),
      },
      {
        path: '/system/oplog',
        name: 'SystemOplog',
        meta: { title: '操作日誌', key: 'System.Oplog' },
        component: () => import('@/views/system/SystemOplog.vue'),
      },
      {
        path: '/system/setting',
        name: 'SystemSetting',
        meta: { title: '設定', key: 'System.Setting' },
        component: () => import('@/views/system/SystemSetting.vue'),
      },
    ]
  },
  {
    path: '/bill',
    name: 'Bill',
    meta: { title: '帳單', icon: Wallet, key: 'Bill' },
    component: MainLayout,
    children: [
      {
        path: '/bill/payment',
        name: 'BillPayment',
        meta: { title: '付款設定', key: 'Bill.Payment' },
        component: () => import('@/views/bill/BillPayment.vue'),
      },
      {
        path: '/bill/transaction',
        name: 'BillTransaction',
        meta: { title: '交易紀錄', key: 'Bill.Transaction' },
        component: () => import('@/views/bill/BillTransaction.vue'),
      },
    ]
  },
];

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constRoutes.concat(permRoutes),
})

router.beforeEach((to, from, next) => {
  const routeStore = useRoutesStore()
  const adminStore = useAdminStore()

  if (to.path === '/login') {
    next()
    return
  }

  if (to.path !== '/login' && adminStore.getToken === '') {
    // redirect to login page
    next({ path: '/login' })
    return
  }

  // 如果已經初始化就跳過動態路由
  if (routeStore.getRoutes.length > 0) {
    next()
    return
  }

  const permRouters = routeStore.getPermissionRoutes(adminStore.getPermissions)
  permRouters.forEach(function (route) {
    router.addRoute(route)
    if (route.children.length > 0) {
      route.children.forEach(function (child) {
        router.addRoute(route.name, child)
      })
    }
  })

  next()
})
