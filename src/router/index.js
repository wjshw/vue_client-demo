import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/home/Index'
import Beverage from '@/components/beverage/Beverage'
import Recharge from '@/components/recharge/Recharge'
import Game from '@/components/game/Game'
import Task from '@/components/task/Task'
import More from '@/components/more/More'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {name: 'index'}
    },
    {
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: '/beverage',
      name: 'beverage',
      component: Beverage
    },
    {
      path: '/recharge',
      name: 'recharge',
      component: Recharge
    },
    {
      path: '/game',
      name: 'game',
      component: Game
    },
    {
      path: '/task',
      name: 'task',
      component: Task
    },
    {
      path: '/more',
      name: 'more',
      component: More
    }

  ]
})
