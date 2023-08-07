import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useBranchStore = defineStore(
  'branch',
  () => {
    const branches = ref([
      { id: 1, name: '中華一店' },
      { id: 2, name: '成功二店' },
      { id: 3, name: '西門三店' }
    ])
    const codePrefix = ref('PX')

    const getBranches = computed(() => branches.value)
    const getCodePrefix = computed(() => codePrefix.value)

    function fetchBranches() {
      branches.value = [
        { id: 1, name: '中華一店' },
        { id: 2, name: '成功二店' },
        { id: 3, name: '西門三店' }
      ]
    }

    function setCodePrefix(prefix) {
      codePrefix.value = prefix
    }

    return { branches, codePrefix, getBranches, getCodePrefix, fetchBranches, setCodePrefix }
  },
  {
    persist: {
      enabled: true
    }
  }
)
