import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/Home.vue'
import Down from '../views/down.vue'
import Downapp from '../views/downapp.vue'
import redsEnvelopes from '../views/redsEnvelopes.vue'
import phone from '../views/phone.vue'


Vue.use(VueRouter)

const routes = [
	//单个路由均为对象类型，path代表的是路径，component代表组件
	{
		path: '/',
		name:'home',
		component: home
	},
	{
		path: '/down',
		name:'Down',
		component: Down
	},
	{
		path: '/downapp',
		name:'Downapp',
		component: Downapp
	},
	{
		path: '/redsEnvelopes',
		name:'redsEnvelopes',
		component: redsEnvelopes
	},
	{
		path: '/phone',
		name:'phone',
		component: phone
	},


]

const router = new VueRouter({
	mode: 'hash',
	base: process.env.BASE_URL,
	routes
})

export default router
