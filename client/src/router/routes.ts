/* eslint-disable no-debugger */
import { RouteRecordRaw } from "vue-router";


export const routes : RouteRecordRaw[] = [    
    {
        path: '/',
        redirect: '/home',
        name: 'index',
        children: [
            {
                name: 'home',
                path: '/home',
                component: () => import ("@/components/views/HomePageComponent.vue"),
                meta: { transitionName: '', requiresAuth: true  },
            },
			{
				name: 'login',
				path: '/login',
				component:  () =>  import ("@/components/views/LoginPageComponent.vue"),
				meta: { transitionName: '' }
			},
			{
				name: 'signup',
				path: '/signup',
				component: () => import ("@/components/views/SignupPageComponent.vue"),
				meta: { transitionName: '' }
			}
        ]
    }, 
	{
		name: 'user',
		path: '/user/:id',
		component:  () => import ("@/components/views/ProfilePageComponent.vue"),
		meta: { transitionName: '', requiresAuth: true  },
		children: [
			{
				name: 'profile',
				path: '/profile',
				component:  () => import ("@/components/views/ProfilePageComponent.vue"),
				meta: { transitionName: '', requiresAuth: true  },
				children: [
					{
						name: 'privacy',
						path: '/privacy',
						component:  null, //() => import ("@/components/views/ProfilePageComponent.vue"),
						meta: { transitionName: '', requiresAuth: true  },
					},
					{
						name: 'payments',
						path: "/posts",
						component: null,
						meta: { transitionName: '', requiresAuth: true  },
					}
		
				]
			},
			{
				name: 'posts',
				path: "/posts",
				component: null,
				meta: { transitionName: '', requiresAuth: true  }
			}

		]
	},
	{
        path: '/admin',
        redirect: '/admin/permissions',
        name: 'admin',
        children: [
			{
				name: 'permissions',
				path: '/admin/permissions',
				component:  () =>  import ("@/components/views/PermissionsPageComponent.vue"),
				meta: { transitionName: '', requiresAuth: true , isAdmin: true },
			}
        ]
    }
]

