export default [
  {
    title: '首页',
    path: '/',
    file: 'home.md'
  },
  {
    title: '食用指南',
    path: '/eat',
    file: 'eat.md'
  },
  {
    title: '饮食篇',
    path: '/food',
    children: [
      {
        title: '食物',
        path: '/food/food-list',
        file: 'food-list.md'
      },
      {
        title: '热量表',
        path: '/food/calorie-table',
        file: 'calorie-table.md'
      },
      {
        title: '饮料',
        path: '/food/drinks',
        file: 'drinks.md'
      }
    ]
  },
  {
    title: '减脂篇',
    path: '/short',
    children: [
      {
        title: '作息',
        path: '/short/schedule',
        file: 'schedule.md'
      },
      {
        title: '减脂',
        path: '/short/fat-loss',
        file: 'fat-loss.md'
      }
    ]
  },
  {
    title: '增肌篇',
    path: '/strong',
    children: [
      {
        title: '增肌篇',
        path: '/strong/muscle-gain',
        file: 'muscle-gain.md'
      }
    ]
  },
  {
    title: '常见问题',
    path: '/faq',
    file: 'faq.md'
  }
]
