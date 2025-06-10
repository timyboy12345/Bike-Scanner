import {defineStore} from 'pinia'

export const useScanStore = defineStore('scans', {
    state: (): { scans: null | any[] } => ({
        scans: null,
    }),
    actions: {
        init(scans: any[]) {
            this.scans = scans;
        },
        addScan(scan: any) {
            this.scans?.unshift(scan)
        },
        reset() {
            this.scans = null
        },
        deleteScan(id: string) {
            this.scans = this.scans ? this.scans.filter((s) => s.id !== id) : null
        }
    },
    getters: {
        latestScan: (state) => state.scans ? state.scans[0] : null,
        isReady: (state) => Boolean(state.scans)
    },
})
