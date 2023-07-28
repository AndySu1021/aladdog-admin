import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {constRoutes, permRoutes} from "@/router";

export const useRoutesStore = defineStore('routes', () =>{
    const routes = ref([])
    const permissions = ref([
        'Branch',
        'Branch.List',
        'Branch.List.Create',
        'Branch.List.Edit',
        'Branch.List.Delete',
        'Branch.List.Password',
        'Branch.Station',
        'Branch.Station.Create',
        'Branch.Station.Edit',
        'Branch.Station.Delete',
        'Branch.Table',
        'Branch.Table.Create',
        'Branch.Table.Edit',
        'Branch.Table.Delete',
        'Liquor',
        'Liquor.Stock',
        'Liquor.Stock.Create',
        'Liquor.Stock.Edit',
        'Liquor.Stock.Delete',
        'Liquor.Stock.Replenish',
        'Liquor.Recipe',
        'Liquor.Recipe.Create',
        'Liquor.Recipe.Edit',
        'Liquor.Recipe.Delete',
        'Liquor.Recipe.Category',
        'Liquor.Addon',
        'Liquor.Addon.Create',
        'Liquor.Addon.Edit',
        'Liquor.Addon.Delete',
        'Product',
        'Product.Create',
        'Product.Edit',
        'Product.Delete',
        'Product.Category',
        'Order',
        'Report',
        'Report.Profit',
        'Report.Product',
        'Staff',
        'Staff.List',
        'Staff.List.Create',
        'Staff.List.Edit',
        'Staff.List.Delete',
        'Staff.AttendanceRecord',
        'System',
        'System.Role',
        'System.Role.Create',
        'System.Role.Edit',
        'System.Role.Delete',
        'System.Admin',
        'System.Admin.Create',
        'System.Admin.Edit',
        'System.Admin.Delete',
        'System.Admin.Password',
        'System.Oplog',
        'System.Setting',
    ].reduce((a, v) => ({ ...a, [v]: true}), {}))

    const getRoutes = computed(function () {
        return routes.value
    })

    function setPermissions(permissionData) {
        permissions.value = permissionData.reduce((a, v) => ({ ...a, [v]: true}), {})
    }

    async function getPermissionRoutes () {
        const result = []
        permRoutes.forEach(function (route) {
            if (permissions.value[route.meta.key]) {
                const tmp = {
                    path: route.path,
                    name: route.name,
                    meta: route.meta,
                    component: route.component,
                    children: [],
                };
                if (route.children.length > 0) {
                    route.children.forEach(function (child) {
                        if (permissions.value[child.meta.key]) {
                            tmp.children.push({
                                path: child.path,
                                name: child.name,
                                meta: child.meta,
                                component: child.component,
                            })
                        }
                    })
                }
                result.push(tmp)
            }
        })
        routes.value = constRoutes.concat(result)
        return result
    }

    return {routes, permissions, getRoutes, setPermissions, getPermissionRoutes}
})
