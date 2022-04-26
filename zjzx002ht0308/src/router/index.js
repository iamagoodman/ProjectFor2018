import { createRouter, createWebHashHistory } from 'vue-router';
import store from '@/store';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { clearCacheRecallData } from 'utils';
import { STORAGE_KEY } from '@/constants';

const routes = [
    {
        path: '/',
        name: 'Home',
        redirect: '/free/give',
        component: () => import('@/layouts/Index.vue'),
        children: [
            {
                path: 'result/:status',
                name: 'Result',
                component: () => import('@/views/Result.vue'),
                meta: {
                    cacheKey: 'successPage'
                }
            },
            {
                path: 'confirm',
                name: 'Confirm',
                component: () => import('@/views/Confirm.vue')
            },
            {
                path: '/free',
                name: 'Free',
                component: () => import('@/layouts/Main.vue'),
                children: [
                    {
                        path: 'give',
                        name: 'FreeGive',
                        component: () => import('@/views/FreeGive.vue'),
                        meta: {
                            cacheKey: 'policyPage'
                        }
                    },
                    {
                        path: 'policy',
                        name: 'FreePolicy',
                        component: () => import('@/views/FreePolicy.vue'),
                        meta: {
                            cacheKey: 'policyPage'
                        }
                    }
                ]
            }
        ]
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    NProgress.start();
    store.commit('changeLoading', { loading: true });
    if (to.name === 'FreeGive' && store.state.firstEnter) {
        clearCacheRecallData();
        sessionStorage.setItem('memoryArray', '[]');
        sessionStorage.setItem('cacheMemory', 'N');
        store.commit('setFirstEnter', { enter: false });
    }
    if (to.name === 'Confirm') {
        sessionStorage.setItem('cacheMemory', 'Y');
    }
    if (to.name === 'FreePolicy' && !sessionStorage[STORAGE_KEY.MOBILE]) {
        next({
            name: 'FreeGive'
        });
    } else {
        next();
    }
});

router.afterEach(() => {
    NProgress.done();
    store.commit('changeLoading', { loading: false });
});

export default router;
