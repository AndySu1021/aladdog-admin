import {defineStore} from "pinia";
import {computed, ref} from "vue";

export const useBranchStore = defineStore('branch', () => {
    const branches = ref([
        {id: 1, name: '中華一店'},
        {id: 2, name: '成功二店'},
        {id: 3, name: '西門三店'},
    ])

    const getBranches = computed(() => branches.value)

    function fetchBranches() {
        branches.value = [
            {id: 1, name: '中華一店'},
            {id: 2, name: '成功二店'},
            {id: 3, name: '西門三店'},
        ]
    }


    return { branches, getBranches, fetchBranches}
}, {
    persist: {
        enabled: true,
    }
})
