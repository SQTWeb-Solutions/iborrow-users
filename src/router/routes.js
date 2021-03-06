/*
* This is a file to save all routs used by app, each routes is group accoridng the routes group and types
 */
export default [
  {
    path: '/',
    name: 'landing-page',
    component: require('@/pages/Welcome/Page').default
  },
  // routes for authentication with the guest middleware to check if teh user is logged in or not
  ...middleware('guest', [
    { path: '/auth',
      component: () => import('@/pages/Auth/Template'),
      children: [
        { path: '', redirect: { name: 'auth.login' } },
        { path: 'login', name: 'auth.login', component: require('@/pages/Auth/Login').default, meta: { layout: 'auth' } },
        { path: 'register', name: 'auth.register', component: require('@/pages/Auth/Register').default, meta: { layout: 'register' } },
        { path: 'register/investors', name: 'auth.register.investors', component: require('@/pages/Auth/Registration/Investors').default, meta: { layout: 'auth' } },
        { path: 'register/borrowers', name: 'auth.register.borrowers', component: require('@/pages/Auth/Registration/Borrowers').default, meta: { layout: 'auth' } },
        { path: 'password/forgot', name: 'auth.password.forgot', component: require('@/pages/Auth/Password/Forgot').default, meta: { layout: 'auth' } },
        { path: 'password/reset/:token', name: 'auth.password.reset', component: require('@/pages/Auth/Password/Reset').default, meta: { layout: 'auth' } }
      ]
    },
    { path: '/welcome/:userId', name: 'registered.welcome', component: require('@/pages/Auth/Confirm/Welcome').default, meta: { layout: 'register' } }
  ]),
  ...middleware('investors', [
    { path: '/in',
      component: () => import('@/pages/Investors/Template'),
      children: [
        { path: '', redirect: { name: 'investors.home' } },
        { path: 'dashboard', name: 'investors.home', component: require('@/pages/Home/Page').default, meta: { layout: 'investors' } },
        { path: 'welcome', name: 'investors.main', component: require('@/pages/Main/Page').default },
        { path: 'profile',
          component: () => import('@/pages/Investors/Profile/Template'),
          children: [
            { path: '', name: 'investors.profile', component: require('@/pages/Investors/Profile/ProfilePage').default, meta: { layout: 'investors' } }
          ]
        },
        { path: 'onboard',
          component: () => import('@/pages/Investors/Onboard/Template'),
          children: [
            { path: '', redirect: { name: 'investors.onboard.stepone' } },
            { path: '', name: 'investors.onboard.stepone', component: require('@/pages/Investors/Onboard/StepOne').default, meta: { layout: 'onboard' } }
          ]
        }
      ]
    }
  ]),
  ...middleware('borrowers', [
    { path: '/br',
      component: () => import('@/pages/Borrowers/Template'),
      children: [
        { path: '', redirect: { name: 'borrowers.home' } },
        { path: 'dashboard', name: 'borrowers.home', component: require('@/pages/Home/Page').default, meta: { layout: 'borrowers' } },
        { path: 'welcome', name: 'borrowers.main', component: require('@/pages/Main/Page').default },
        { path: 'profile',
          component: () => import('@/pages/Borrowers/Profile/Template'),
          children: [
            { path: '', name: 'borrowers.profile', component: require('@/pages/Borrowers/Profile/ProfilePage').default, meta: { layout: 'borrowers' } }
          ]
        }
      ]
    }
  ]),
  { path: '/error/registration', name: 'error.registration', component: () => import('@/pages/Error/RegistrationError') },
  {path: '*', component: () => import('@/pages/Error/NotFound')}
]

/**
 * @param  {String|Function} middleware
 * @param  {Array} routes
 * @return {Array}
 */
// eslint-disable-next-line
function middleware (middleware, routes) {
  routes.forEach(route =>
    (route.middleware || (route.middleware = [])).unshift(middleware)
  )

  return routes
}
