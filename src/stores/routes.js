import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { constRoutes, permRoutes } from '@/router'

export const useRoutesStore = defineStore('routes', () => {
  const routes = ref([])

  const getRoutes = computed(function () {
    return routes.value
  })

  function getPermissionRoutes(permissionData) {
    const result = []
    permRoutes.forEach(function (route) {
      if (permissionData[route.meta.key]) {
        const tmp = {
          path: route.path,
          name: route.name,
          meta: route.meta,
          component: route.component,
          children: []
        }
        if (route.children.length > 0) {
          route.children.forEach(function (child) {
            if (permissionData[child.meta.key]) {
              tmp.children.push({
                path: child.path,
                name: child.name,
                meta: child.meta,
                component: child.component
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

  return { routes, getRoutes, getPermissionRoutes }
})
