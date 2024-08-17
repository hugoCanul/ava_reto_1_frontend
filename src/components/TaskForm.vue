<template>
    <div>
        <h2>{{ isEditMode ? 'Edit Task': 'Create Task' }}</h2>
        <form @submit.prevent="handleSubmit">
            <input v-model="TaskList.title" type="text" placeholder="Title" required/>
            <textarea v-model="task.description" placeholder="Description"></textarea>
            <select v-model="task.status">
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
            </select>
            <button type="submit">{{ isEditMode ? 'Update' : 'Create' }}</button>
        </form>
    </div>
</template>

<script>
import api from '../api/api';

export default{
    data(){
        return{
            task:{
                title:'',
                description:'',
                status:'pending',
            },
            isEditMode:false,
        };
    },
    async created(){
        if(this.$route.params.id){
            this.isEditMode=true;
            await this.fetchTask(this.$route.params.id);
        }
    },
    methods:{
        async fetchTask(id){
            try{
                const response= await api.get('/tasks/${id}');
                this.task=response.data.content;
            }catch(error){
                alert('Error fetching task');
            }
        },
        async handleSubmit(){
            try{
                if(this.isEditMode){
                    await api.put('/tasks/${this.$route.params.id}', this.task);
                    alert('Task Update succesfully');
                }else{
                    await api.post('tasks', this.task);
                    alert('Task created succesfully');
                }
                this.$route.push('/tasks');
            }catch (error){
                alert('Error saving task')
            }
        }
    }
}
</script>


