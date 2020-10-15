import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  
  {
    path: '/',
    component: Layout,
    redirect: '/afcbdindex',
    children: [
      {
        path: 'afcbdindex',
        component: () => import('@/views/afcbdindex/index'),
        name: '首页',
        meta: { title: '首页', icon: 'documentation', affix: true }
      }
    ]
  },
  {
    path: '/afcbdztj',
    component: Layout,
    children: [
      {
        path: 'ztj',
        component: () => import('@/views/afcbdztj/ztj'),
        name: '总统计页',
        meta: { title: '总统计页', icon: 'documentation', affix: true }
      }
    ]
  },
  
  {
    path: '/afcbdyyqd',
    component: Layout,
    children: [
      {
        path: 'afcbdyyqd',
        component: () => import('@/views/afcbdyyqd/afcbdyyqd'),
        name: '预约签到',
        meta: { title: '预约签到', icon: 'documentation', affix: true }
      },
      {
        path: 'yy',
        component: () => import('@/views/afcbdyyqd/yy'),
        name: '预约',
        meta: { title: '预约', icon: 'documentation', affix: true },
        hidden:true
      }
    ]
  },
  {
    path: '/afcbdkcgl',
    component: Layout,
    redirect: '/excel/kcfx',
    name: '课程管理',
    meta: {
      title: '课程管理',
      icon: 'excel'
    },
    children: [
      {
        path: 'kcfx',
        component: () => import('@/views/afcbdkcgl/kcfx'),
        name: '课程分析',
        meta: { title: '课程分析' }
      },
      {
        path: 'tkgl',
        component: () => import('@/views/afcbdkcgl/tkgl'),
        name: '团课管理',
        meta: { title: '团课管理' }
      },
      {
        path: 'sjgl',
        component: () => import('@/views/afcbdkcgl/sjgl'),
        name: '私教管理',
        meta: { title: '私教管理' }
      },
      {
        path: 'kcja',
        component: () => import('@/views/afcbdkcgl/kcja'),
        name: '课程教案',
        meta: { title: '课程教案' }
      },
      {
        path: 'pjgl',
        component: () => import('@/views/afcbdkcgl/pjgl'),
        name: '评价管理',
        meta: { title: '评价管理' }
      },
      {
        path: 'qdlist',
        component: () => import('@/views/afcbdkcgl/qdlist'),
        name: '课程强度',
        meta: { title: '课程强度' },
        hidden:true
      },
      {
        path: 'dzkgl',
        component: () => import('@/views/afcbdkcgl/dzkgl'),
        name: '动作库管理',
        meta: { title: '动作库管理' }
      },
      {
        path: 'zhmgl',
        component: () => import('@/views/afcbdkcgl/zhmgl'),
        name: '组合名管理',
        meta: { title: '组合名管理' }
      },
      {
        path: 'jly',
        component: () => import('@/views/afcbdkcgl/jly'),
        name: '教练页',
        meta: { title: '教练页' },
        hidden:true
      },
      {
        path: 'sjjh',
        component: () => import('@/views/afcbdkcgl/sjjh'),
        name: '私教计划',
        meta: { title: '私教计划' }
      },
      {
        path: 'grsj',
        component: () => import('@/views/afcbdkcgl/grsj'),
        name: '个人私教',
        meta: { title: '个人私教' },
        hidden:true
      },
      {
        path: 'updatesj',
        component: () => import('@/views/afcbdkcgl/updatesj'),
        name: '私教编辑',
        meta: { title: '私教编辑' },
        hidden:true
      }
    ]
  },
  {
    path: '/afcbdhygl',
    component: Layout,
    redirect: '/excel/kcfx',
    name: '会员管理',
    meta: {
      title: '会员管理',
      icon: 'excel'
    },
    children: [
      {
        path: 'hy',
        component: () => import('@/views/afcbdhygl/hy'),
        name: '会员',
        meta: { title: '会员' }
      },
      {
        path: 'hyk',
        component: () => import('@/views/afcbdhygl/hyk'),
        name: '会员卡',
        meta: { title: '会员卡' }
      },
      {
        path: 'hybk',
        component: () => import('@/views/afcbdhygl/hybk'),
        name: '会员绑卡',
        meta: { title: '会员绑卡' }
      },
      {
        path: 'hyxq',
        component: () => import('@/views/afcbdhygl/hyxq'),
        name: '会员详情',
        meta: { title: '会员详情' }
      },
      {
        path: 'tohybk',
        component: () => import('@/views/afcbdhygl/tohybk'),
        name: '绑卡',
        meta: { title: '绑卡' },
        hidden:true
      }
    ]
  },
  {
    path: '/afcbdysgl',
    component: Layout,
    redirect: '/excel/kcfx',
    name: '营收管理',
    meta: {
      title: '营收管理',
      icon: 'excel'
    },
    children: [
      {
        path: 'ysfx',
        component: () => import('@/views/afcbdysgl/ysfx'),
        name: '营收分析',
        meta: { title: '营收分析' }
      },
      {
        path: 'ysbb',
        component: () => import('@/views/afcbdysgl/ysbb'),
        name: '营收报表',
        meta: { title: '营收报表' }
      },
      {
        path: 'baobiao',
        component: () => import('@/views/afcbdysgl/baobiao'),
        name: '报表',
        meta: { title: '报表' }
      }
      ,
      {
        path: 'cs',
        component: () => import('@/views/afcbdysgl/cs'),
        name: '报表',
        meta: { title: '报表' }
      }

    ]
  },
  {
    path: '/afcbdyggl',
    component: Layout,
    redirect: '/excel/kcfx',
    name: '员工管理',
    meta: {
      title: '员工管理',
      icon: 'excel'
    },
    children: [
      {
        path: 'yglb',
        component: () => import('@/views/afcbdyggl/yglb'),
        name: '员工列表',
        meta: { title: '员工列表' }
      },
      {
        path: 'jlsz',
        component: () => import('@/views/afcbdyggl/jlsz'),
        name: '教练设置',
        meta: { title: '教练设置' }
      }
    ]
  },
  {
    path: '/afcbdcggl',
    component: Layout,
    children: [
      {
        path: 'cggl',
        component: () => import('@/views/afcbdcggl/cggl'),
        name: '场馆管理',
        meta: { title: '场馆管理', icon: 'documentation', affix: true }
      }
    ]
  },
  {
    path: '/afcbdtzgl',
    component: Layout,
    redirect: '/excel/kcfx',
    name: '通知管理',
    meta: {
      title: '通知管理',
      icon: 'excel'
    },
    children: [
      {
        path: 'qfcz',
        component: () => import('@/views/afcbdtzgl/qfcz'),
        name: '群发操作',
        meta: { title: '群发操作' }
      },
      {
        path: 'tzmb',
        component: () => import('@/views/afcbdtzgl/tzmb'),
        name: '通知模板',
        meta: { title: '通知模板' }
      },
      {
        path: 'xlbx',
        component: () => import('@/views/afcbdtzgl/xlbx'),
        name: '训练表现',
        meta: { title: '训练表现' }
      }
    ]
  },
  {
    path: '/afcbdlsgl',
    component: Layout,
    redirect: '/excel/kcfx',
    name: '零售管理',
    meta: {
      title: '零售管理',
      icon: 'excel'
    },
    children: [
      {
        path: 'lssp',
        component: () => import('@/views/afcbdlsgl/lssp'),
        name: '零售商品',
        meta: { title: '零售商品' }
      },
      {
        path: 'dhjl',
        component: () => import('@/views/afcbdlsgl/dhjl'),
        name: '调货记录',
        meta: { title: '调货记录' }
      },
      {
        path: 'ddlb',
        component: () => import('@/views/afcbdlsgl/ddlb'),
        name: '订单列表',
        meta: { title: '订单列表' }
      },
      {
        path: 'pllb',
        component: () => import('@/views/afcbdlsgl/pllb'),
        name: '品类管理',
        meta: { title: '品类管理' }
      }
    ]
  }, {
    path: '/afcbdjfsc',
    component: Layout,
    redirect: '/excel/kcfx',
    name: '积分商城',
    meta: {
      title: '积分商城',
      icon: 'excel'
    },
    children: [
      {
        path: 'splb',
        component: () => import('@/views/afcbdjfsc/splb'),
        name: '商品列表',
        meta: { title: '商品列表' }
      },
      {
        path: 'dydx',
        component: () => import('@/views/afcbdjfsc/dydx'),
        name: '店员兑现',
        meta: { title: '店员兑现' }
      },
      {
        path: 'dxjl',
        component: () => import('@/views/afcbdjfsc/dxjl'),
        name: '兑现记录',
        meta: { title: '兑现记录'}
      }
    ]
  }, {
    path: '/afcbdhdgl',
    component: Layout,
    redirect: '/excel/hdgl',
    name: '活动管理',
    meta: {
      title: '活动管理',
      icon: 'excel'
    },
    children: [
      {
        path: 'hdlb',
        component: () => import('@/views/afcbdhdgl/hdlb'),
        name: '活动列表',
        meta: { title: '活动列表' }
      },
      {
        path: 'hdbanner',
        component: () => import('@/views/afcbdhdgl/hdbanner'),
        name: '活动banner',
        meta: { title: '活动banner' }
      },
      {
        path: 'bmlb',
        component: () => import('@/views/afcbdhdgl/bmlb'),
        name: '报名列表',
        meta: { title: '报名列表' },
        hidden:true
      }
    ]
  }, {
    path: '/afcbdxtsz',
    component: Layout,
    redirect: '/excel/kcfx',
    name: '系统设置',
    meta: {
      title: '系统设置',
      icon: 'excel'
    },
    children: [
      {
        path: 'qxsz',
        component: () => import('@/views/afcbdxtsz/qxsz'),
        name: '权限设置',
        meta: { title: '权限设置' }
      },
      {
        path: 'yyqdsz',
        component: () => import('@/views/afcbdxtsz/yyqdsz'),
        name: '预约签到设置',
        meta: { title: '预约签到设置' }
      },
      // {
      //   path: 'bannersz',
      //   component: () => import('@/views/afcbdxtsz/bannersz'),
      //   name: 'Banner设置',
      //   meta: { title: 'Banner设置'}
      // },
      {
        path: 'tcsj',
        component: () => import('@/views/afcbdxtsz/tcsj'),
        name: '体测数据',
        meta: { title: '体测数据'}
      },
      {
        path: 'hyxy',
        component: () => import('@/views/afcbdxtsz/hyxy'),
        name: '会员协议',
        meta: { title: '会员协议'}
      },
      {
        path: 'jfgl',
        component: () => import('@/views/afcbdxtsz/jfgl'),
        name: '积分管理',
        meta: { title: '积分管理'}
      },
      {
        path: 'glysz',
        component: () => import('@/views/afcbdxtsz/glysz'),
        name: '管理员设置',
        meta: { title: '管理员设置'}
      },
      {
        path: 'okr',
        component: () => import('@/views/afcbdxtsz/okr'),
        name: 'OKR',
        meta: { title: 'OKR'}
      },
      {
        path: 'updateokr',
        component: () => import('@/views/afcbdxtsz/updateokr'),
        name: 'OKR修改',
        meta: { title: 'OKR修改'},
        hidden:true
      },
      {
        path: 'gzhlist',
        component: () => import('@/views/afcbdxtsz/gzhlist'),
        name: '合伙申请列表',
        meta: { title: '合伙申请列表'}
      }
    ]
  },
  {
    path: '/afcbhypm',
    component: Layout,
    redirect: '/afcbhypm/hypm',
    name: '会员排名',
    meta: {
      title: '会员排名',
      icon: 'excel'
    },
    children: [
      {
        path: 'hypm',
        component: () => import('@/views/afcbhypm/hypm'),
        name: '会员排名',
        meta: { title: '会员排名' }
      },
      {
        path: 'cjtd',
        component: () => import('@/views/afcbhypm/cjtd'),
        name: '创建团队',
        meta: { title: '创建团队' }
      },
      {
        path: 'fzbg',
        component: () => import('@/views/afcbhypm/fzbg'),
        name: '分值变更',
        meta: { title: '分值变更' }
      }
    ]
  },
  {
    path: '/afcbdwebsite',
    component: Layout,
    redirect: '/afcbdwebsite/afcbdvideo',
    name: '网站设置',
    meta: {
      title: '网站设置',
      icon: 'excel'
    },
    children: [
      {
        path: 'afcbdvideo',
        component: () => import('@/views/afcbdwebsite/afcbdvideo'),
        name: '首页视频',
        meta: { title: '首页视频' }
      },
      {
        path: 'afcbdcourse',
        component: () => import('@/views/afcbdwebsite/afcbdcourse'),
        name: '网站课程',
        meta: { title: '网站课程' }
      },
      {
        path: 'afcbdshequn',
        component: () => import('@/views/afcbdwebsite/afcbdshequn'),
        name: '网站社群',
        meta: { title: '网站社群' }
      },
      {
        path: 'afcbdlicheng',
        component: () => import('@/views/afcbdwebsite/afcbdlicheng'),
        name: 'facebody里程',
        meta: { title: 'facebody里程' }
      }
    ]
  },
  {
    path: '/afcbdyhqgl',
    component: Layout,
    redirect: '/afcbdyhqgl/yhqlb',
    name: '优惠券管理',
    meta: {
      title: '优惠券管理',
      icon: 'excel'
    },
    children: [
      {
        path: 'yhqlb',
        component: () => import('@/views/afcbdyhqgl/yhqlb'),
        name: '优惠券列表',
        meta: { title: '优惠券列表' }
      },
      {
        path: 'ffyhq',
        component: () => import('@/views/afcbdyhqgl/ffyhq'),
        name: '分发优惠券',
        meta: { title: '分发优惠券' },
        hidden:true
      },
      {
        path: 'ffjl',
        component: () => import('@/views/afcbdyhqgl/ffjl'),
        name: '分发记录',
        meta: { title: '分发记录' },
        hidden:true
      }
    ]
  },
  {
    path: '/afcbdtggl',
    component: Layout,
    redirect: '/afcbdtggl/pthdlb',
    name: '拼团管理',
    meta: {
      title: '拼团管理',
      icon: 'excel'
    },
    children: [
      {
        path: 'pthdlb',
        component: () => import('@/views/afcbdtggl/pthdlb'),
        name: '拼团活动列表',
        meta: { title: '拼团活动列表' }
      },
      {
        path: 'ptjl',
        component: () => import('@/views/afcbdtggl/ptjl'),
        name: '拼团记录',
        meta: { title: '拼团记录' }
      }
    ]
  },
  {
    path: '/afcbdcjgl',
    component: Layout,
    redirect: '/afcbdcjgl/cjhdlb',
    name: '抽奖管理',
    meta: {
      title: '抽奖管理',
      icon: 'excel'
    },
    children: [
      {
        path: 'cjhdlb',
        component: () => import('@/views/afcbdcjgl/cjhdlb'),
        name: '抽奖活动列表',
        meta: { title: '抽奖活动列表' }
      },
      {
        path: 'cjjl',
        component: () => import('@/views/afcbdcjgl/cjjl'),
        name: '抽奖记录',
        meta: { title: '抽奖记录' }
      },
      {
        path: 'xjcj',
        component: () => import('@/views/afcbdcjgl/xjcj'),
        name: '新建抽奖',
        meta: { title: '新建抽奖' },
        hidden:true
      },
      {
        path: 'bjcj',
        component: () => import('@/views/afcbdcjgl/bjcj'),
        name: '编辑抽奖',
        meta: { title: '编辑抽奖' },
        hidden:true
      }
    ]
  },
  {
    path: '/afcbdmshd',
    component: Layout,
    redirect: '/afcbdmshd/mshdlb',
    name: '秒杀管理',
    meta: {
      title: '秒杀管理',
      icon: 'excel'
    },
    children: [
      {
        path: 'mshdlb',
        component: () => import('@/views/afcbdmshd/mshdlb'),
        name: '秒杀活动列表',
        meta: { title: '秒杀活动列表' }
      },
      {
        path: 'msjl',
        component: () => import('@/views/afcbdmshd/msjl'),
        name: '秒杀记录',
        meta: { title: '秒杀记录' },
        hidden:true
      }
    ]
  },
  {
    path: '/afcbdkjhd',
    component: Layout,
    redirect: '/afcbdkjhd/kjhdlb',
    name: '砍价活动',
    meta: {
      title: '砍价活动',
      icon: 'excel'
    },
    children: [
      {
        path: 'kjhdlb',
        component: () => import('@/views/afcbdkjhd/kjhdlb'),
        name: '砍价活动列表',
        meta: { title: '砍价活动列表' }
      },
      {
        path: 'kjjl',
        component: () => import('@/views/afcbdkjhd/kjjl'),
        name: '砍价记录',
        meta: { title: '砍价记录' }
      }
    ]
  },
  // {
  //   path: '/documentation',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/documentation/index'),
  //       name: 'Documentation',
  //       meta: { title: 'Documentation', icon: 'documentation', affix: true }
  //     }
  //   ]
  // },
  // {
  //   path: '/guide',
  //   component: Layout,
  //   redirect: '/guide/index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/guide/index'),
  //       name: 'Guide',
  //       meta: { title: 'Guide', icon: 'guide', noCache: true }
  //     }
  //   ]
  // },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  }
] 

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [

  // {
  //   path: '/error',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   name: 'ErrorPages',
  //   meta: {
  //     title: 'Error Pages',
  //     icon: '404'
  //   },
  //   children: [
  //     {
  //       path: '401',
  //       component: () => import('@/views/error-page/401'),
  //       name: 'Page401',
  //       meta: { title: '401', noCache: true }
  //     },
  //     {
  //       path: '404',
  //       component: () => import('@/views/error-page/404'),
  //       name: 'Page404',
  //       meta: { title: '404', noCache: true }
  //     }
  //   ]
  // },

  // {
  //   path: '/error-log',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'log',
  //       component: () => import('@/views/error-log/index'),
  //       name: 'ErrorLog',
  //       meta: { title: 'Error Log', icon: 'bug' }
  //     }
  //   ]
  // },

  // {
  //   path: '/excel',
  //   component: Layout,
  //   redirect: '/excel/export-excel',
  //   name: 'Excel',
  //   meta: {
  //     title: 'Excel',
  //     icon: 'excel'
  //   },
  //   children: [
  //     {
  //       path: 'export-excel',
  //       component: () => import('@/views/excel/export-excel'),
  //       name: 'ExportExcel',
  //       meta: { title: 'Export Excel' }
  //     },
  //     {
  //       path: 'export-selected-excel',
  //       component: () => import('@/views/excel/select-excel'),
  //       name: 'SelectExcel',
  //       meta: { title: 'Export Selected' }
  //     },
  //     {
  //       path: 'export-merge-header',
  //       component: () => import('@/views/excel/merge-header'),
  //       name: 'MergeHeader',
  //       meta: { title: 'Merge Header' }
  //     },
  //     {
  //       path: 'upload-excel',
  //       component: () => import('@/views/excel/upload-excel'),
  //       name: 'UploadExcel',
  //       meta: { title: 'Upload Excel' }
  //     }
  //   ]
  // },

  // {
  //   path: '/zip',
  //   component: Layout,
  //   redirect: '/zip/download',
  //   alwaysShow: true,
  //   name: 'Zip',
  //   meta: { title: 'Zip', icon: 'zip' },
  //   children: [
  //     {
  //       path: 'download',
  //       component: () => import('@/views/zip/index'),
  //       name: 'ExportZip',
  //       meta: { title: 'Export Zip' }
  //     }
  //   ]
  // },

  // {
  //   path: '/pdf',
  //   component: Layout,
  //   redirect: '/pdf/index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/pdf/index'),
  //       name: 'PDF',
  //       meta: { title: 'PDF', icon: 'pdf' }
  //     }
  //   ]
  // },
  // {
  //   path: '/pdf/download',
  //   component: () => import('@/views/pdf/download'),
  //   hidden: true
  // },

  // {
  //   path: '/theme',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/theme/index'),
  //       name: 'Theme',
  //       meta: { title: 'Theme', icon: 'theme' }
  //     }
  //   ]
  // },

  // {
  //   path: '/clipboard',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/clipboard/index'),
  //       name: 'ClipboardDemo',
  //       meta: { title: 'Clipboard', icon: 'clipboard' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://github.com/PanJiaChen/vue-element-admin',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
