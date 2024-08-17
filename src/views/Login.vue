<template>
    <div>
        <h2>Login</h2>
        <form @submit.prevent="login">
            <input v-model="email" type="email" placeholder="Email" required/>
            <input v-model="password" type="password" placeholder="Password" required/>
            <button type="submit">Login</button>
        </form>
    </div>
</template>

<script>
import api from '@/api/api';

export default{
    data(){
        return{
            email:'',
            password:''
            };
        },
    methods:{
        async login(){
            try{ 
                const response= await api.post('/login',{
                    email: this.email,
                    password: this.password
                });
                localStorage.setItem('token', response.data.content.token);
                this.$route.push('/tasks');
            }catch(error){
                alert('Login failed: '+ error.response.data);
            }
        
        }
    }
};
</script>
