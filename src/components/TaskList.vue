<template>
    <div>
        <h2>
            <button @click="createTask">Create Task</button>
            <ul>
                <li v-for="task in task" :key="task.id">
                    {{task.tittle}} - {{ task.status }}
                    <button @click="editTask(task)"> Edit</button>
                    <button @click="deleteTask(task.id)">Delete</button>
                </li>
            </ul>
        </h2>
    </div>
</template>

<script>
import api from '../api/api'
import TaskForm from './TaskForm.vue'

export default {
    components : { TaskForm},
    data() {
        return {
            task:[],
        };

        },
        async created(){
            await this.fetchTask();
        },
        methods:{
            async fetchTask(){
                try{
                    const response = await api.get('/task');
                    this.tasks= response.data.content; // Obtenido las tareas del API
                }catch (error) {
                    alert('Error fetching tasks');
                }
            },
            createTask(){
                this.$route.push({name:'create-task'});
            },
            editTask(task){
                this.$route.push({name:'edit-task', params:{id:task.id}});
            },
            async deletedTask(id){
                try{
                    await api.delete('/tasks/${id}');
                    this.fetchTasks();
                }catch (error){
                    alert('Error deleting task');
                }
            }
        }
    };
</script>