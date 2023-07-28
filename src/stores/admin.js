import {defineStore} from "pinia";
import {computed, ref} from "vue";

export const useAdminStore = defineStore('counter', () => {
    const name = ref('Andy')
    const token = ref('ca4c0bc59653558441aa14386978bd6f')
    const branchId = ref(0)
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

    const getToken = computed(() => token.value)
    const getName = computed(() => name.value)
    const getBranchId = computed(() => branchId.value)

    function setAdmin(info) {
        name.value = info.name
        token.value = info.token
        branchId.value = info.branch_id
        permissions.value = info.permissions.reduce((a, v) => ({ ...a, [v]: true}), {})
    }

    function checkPermission(permission) {
        return !!permissions.value[permission]
    }

    return { name, token, branchId, permissions, getToken, getName, getBranchId, setAdmin, checkPermission }
})
