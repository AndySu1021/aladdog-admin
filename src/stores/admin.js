import {defineStore} from "pinia";
import {computed, ref} from "vue";

export const useAdminStore = defineStore('admin', () => {
    const name = ref('')
    const token = ref('')
    const branchId = ref(0)
    const permissions = ref({})

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

    function checkPermission(permission) {
        return !!permissions.value[permission]
    }

    return { name, token, branchId, permissions, getToken, getName, getBranchId, getPermissions, setAdmin, checkPermission }
}, {
    persist: {
        enabled: true,
    }
})
