import {defineStore} from "pinia";
import {computed, ref} from "vue";

export const useAdminStore = defineStore('counter', () => {
    const name = ref('Andy')
    const token = ref('ca4c0bc59653558441aa14386978bd6f')
    const branchId = ref(0)
    const permissions = ref([
        'Branch',
        'Branch.BranchList',
        'Branch.BranchList.Create',
        'Branch.BranchList.Edit',
        'Branch.BranchList.Delete',
        'Branch.BranchList.Password',
        'Branch.BranchStation',
        'Branch.BranchStation.Create',
        'Branch.BranchStation.Edit',
        'Branch.BranchStation.Delete',
        'Branch.BranchTable',
        'Branch.BranchTable.Create',
        'Branch.BranchTable.Edit',
        'Branch.BranchTable.Delete',
        'Liquor',
        'Liquor.LiquorStock',
        'Liquor.LiquorStock.Create',
        'Liquor.LiquorStock.Edit',
        'Liquor.LiquorStock.Delete',
        'Liquor.LiquorStock.Replenish',
        'Liquor.LiquorRecipe',
        'Liquor.LiquorRecipe.Create',
        'Liquor.LiquorRecipe.Edit',
        'Liquor.LiquorRecipe.Delete',
        'Liquor.LiquorRecipe.Category',
        'Liquor.LiquorAddon',
        'Liquor.LiquorAddon.Create',
        'Liquor.LiquorAddon.Edit',
        'Liquor.LiquorAddon.Delete',
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
        'Staff.StaffList',
        'Staff.StaffList.Create',
        'Staff.StaffList.Edit',
        'Staff.StaffList.Delete',
        'Staff.StaffAttendanceRecord',
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
    ])

    const getToken = computed(() => token.value)
    const getName = computed(() => name.value)
    const getBranchId = computed(() => branchId.value)
    const getPermissions = computed(() => permissions.value)

    function setAdmin(info) {
        name.value = info.name
        token.value = info.token
        branchId.value = info.branch_id
        permissions.value = info.permissions
    }

    return { name, token, branchId, getToken, getName, getBranchId, getPermissions, setAdmin }
})
