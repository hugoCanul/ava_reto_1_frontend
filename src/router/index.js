import {createRouter, createWebHistory} from 'vue-router';
import TaskList from '@/components/TaskList.vue';
import TaskForm from '@/components/TaskForm.vue';
import Login from '@/views/Login.vue';

const routes=[
    {path: '/', redirect:'/login'}, 
    {path: '/login', component: Login} ,
    {path: '/tasks', component: TaskList},
    {path: '/tasks/create', component: TaskForm, name: 'create-task'},
    {path: '/tasks/edit/:id', component: TaskForm, name: 'edit-task'},
];

const router= createRouter({
    history:createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    if(to.path !== '/login' && !token)
    {
        next('/login');
    }else{
        next();
    }
})

export default router;