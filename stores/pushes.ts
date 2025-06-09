import {defineStore} from 'pinia'

export const usePushesStore = defineStore('pushes', {
    state: (): {pushes: any[]} => ({
        pushes: [],
    }),
    getters: {
        firstPush: (state) => state.pushes ? state.pushes[0] : null,
    },
    actions: {
        create(title: string, content: string) {
            this.pushes.push({
                title,
                content,
            })

            const pushes = this.pushes;
            setTimeout(() => {
                pushes.shift();
            }, 1000 * 8)
        }
    }
})
