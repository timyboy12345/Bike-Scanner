import {defineStore} from 'pinia'

export const useScanStore = defineStore('scans', {
    state: (): {scans: null | any[]} => ({
        scans: null,
    }),
    getters: {
        latestScan: (state) => state.scans ? state.scans[0] : null,
        isReady: (state) => Boolean(state.scans)
    },
})
