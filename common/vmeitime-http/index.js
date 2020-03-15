import http from './interface'
 
/**
 * 将业务所有接口统一起来便于维护
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 * 
 */

// 单独导出(测试接口) import {test} from '@/common/vmeitime-http/'
export const test = (data) => {
	/* http.config.baseUrl = "http://localhost:8080/api/"
	//设置请求前拦截器
	http.interceptor.request = (config) => {
		config.header = {
			"token": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
		}
	} */
	//设置请求结束后拦截器
	http.interceptor.response = (response) => {
		console.log('个性化response....')
		//判断返回状态 执行相应操作
		return response;
	}
    return http.request({
		baseUrl: 'http://unidemo.dcloud.net.cn/',
        url: 'ajax/echo/text?name=uni-app',
		dataType: 'text',
        data,
    })
}

// 轮播图
export const banner = () => {
    return http.request({
        url: 'banners',
        method: 'GET', 
		// handle:true
    })
}

// 导航
export const navs = () => {
    return http.request({
        url: 'navs',
        method: 'GET', 
		// handle:true
    })
}

// 推荐课程
export const recommendCourse = () => {
    return http.request({
        url: 'online-course/recommend',
        method: 'GET', 
		// handle:true
    })
}
// 推荐课程
export const onlineCourseDetail = (id) => {
    return http.get('online-course/' + id)
}
// 公开课列表
export const onlineCourse = () => {
    return http.get('online-course' )
}
// 热门线下课程课程
export const hotOfflineCourse = () => {
    return http.get('offline-course/hot')
}
// 组织机构
export const organization = () => {
    return http.get('/organization/info')
} 
// 线下课程
export const OfflineCourse = () => {
    return http.get('offline-course')
} 
// 线下课程详情
export const CourseDetail = (id) => {
    return http.get('offline-course/'+ id)
}
// 线下课程分类
export const CourseCategory = () => {
    return http.get('offline-course/categories')
}
// jcode2session
export const login = (code, userInfo) => {
    return http.post('login', {code:code, userInfo:userInfo})
}
// 用户信息
export const userInfo = () => {
    return http.get('user/info')
}
// 老师列表
export const teacherList = () => {
    return http.get('teachers')
}
// 老师详情
export const teacherDetail = (id) => {
    return http.get('teachers/'+id)
}
// 作品列表
export const worksList = () => {
    return http.get('painting')
}
// 作品推荐列表
export const worksRecommend = () => {
    return http.get('painting/recommend')
}
// 作品详情
export const worksDetail = (id) => {
    return http.get('painting/'+id)
}
// 课程报名
export const orders = (data) => {
    return http.post('orders',data)
}
// 我的报名
export const myOrders = () => {
    return http.get('orders')
}
// 最新活动
export const article = (categoryId) => {
    return http.get('article?categoryId='+categoryId)
}
// 最新活动详情
export const articleDetail = (id) => {
    return http.get('article/'+id)
}

// 推荐活动
export const articleRecommend = () => {
    return http.get('article/recommend')
}
// 默认全部导出  import api from '@/common/vmeitime-http/'
export default {
	test,
    banner,
	navs,
	recommendCourse,
	hotOfflineCourse,
	OfflineCourse,
	CourseDetail,
	CourseCategory,
	login,
	userInfo,
	orders,
	myOrders,
	onlineCourseDetail,
	onlineCourse,
	teacherList,
	teacherDetail,
	worksList,
	worksDetail,
	worksRecommend,
	organization,
	article,
	articleDetail,
	articleRecommend
}