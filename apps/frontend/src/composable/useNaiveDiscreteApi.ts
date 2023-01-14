// https://www.naiveui.com/zh-CN/light/components/discrete
import type { ConfigProviderProps, DiscreteApi } from 'naive-ui'
import { createDiscreteApi, darkTheme } from 'naive-ui'
import { computed } from 'vue'

let discreteApi: DiscreteApi

const discreteConfigure = computed<ConfigProviderProps>(() => ({
  // TODO theme follow themeStore
  // Cannot use getGlobalThemeStore here, cause pinia will call `onMounted` hook when using it.
  // We use this api in `RouterGuard`, at that time there has no active component
  // then vue throws a warning.
  // To avoid the warning, just fixed theme here.
  theme: darkTheme,
}))

export const getDiscreteApi = () => {
  if (!discreteApi) {
    discreteApi = createDiscreteApi(['loadingBar'], {
      configProviderProps: discreteConfigure,
    })
  }
  return discreteApi
}
