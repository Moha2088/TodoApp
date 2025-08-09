<template>
  <section>
    <h1>Tasks: {{ activeTaskCount }}</h1>
    <add-form @taskAdded="addTask"></add-form>
    <ul v-if="tasks.length > 0">
      <todo-item
        v-for="task in tasks"
        :key="task.id"
        :id="task.id"
        :name="task.name"
        :is-completed="task.isCompleted"
        @change-status="changeCompletionStatus"
        @clear-tasks="clearTasks"
        @delete-task="deleteTask"
        @edit-task="editTask"
      >
      </todo-item>
    </ul>
    <p class="listEmptyMessage" v-else>No tasks added yet.</p>
    <button v-if="tasks.length > 0" class="clearBtn" @click="clearTasks">
      Clear Tasks
    </button>
  </section>
</template>

<script lang="ts">
import TodoItem from "./components/TodoItem.vue";
import { useToast } from "vue-toastification";
import { Task } from "./types/Task";

export default {
  setup() {
    const toast = useToast();
    return { toast };
  },

  name: "App",
  components: {
    TodoItem,
  },

  data() {
    return {
      tasks: [] as Task[],
    };
  },

  computed: {
    activeTaskCount() {
      return this.tasks.length - this.tasks.filter(t => t.isCompleted).length;
    }
  },

  created() {
    const storedTasks = localStorage.getItem("tasks");

    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
      
      setTimeout(() =>{
        this.toast.info("Loaded saved tasks!");
      }, 100);
    }
  },

  methods: {
    addTask(task: string) {
      const newTask: Task = {
        id: new Date().toLocaleString(),
        name: task,
        isCompleted: false,
      };

      if (task.trim() === "") {
        this.toast.error("Task cannot be empty!");
        return;
      }

      if (this.tasks.find((t) => t.name === newTask.name.trim())) {
        this.toast.error("Task: " + newTask.name + " already exists!");
        return;
      } 

      this.tasks.unshift(newTask);
      this.toast.success("Task added successfully!");
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },

    changeCompletionStatus(id:string, isCompleted: boolean) {
      const task = this.tasks.find((t) => t.id === id);
      if (task) {
        task.isCompleted = !isCompleted;
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
        this.toast.success("Task status changed!");
      }
    },

    editTask(id: string, updatedTask: string) {
      if (updatedTask.trim() === "") {
        this.toast.error("Task cannot be empty!");
        return;
      }

      const taskToEdit = this.tasks.find((t) => t.id === id);

      if(this.tasks.find((t) => t.name === updatedTask.trim())){
        this.toast.error("Task: " + updatedTask + " already exists!");
        return;
      }

      if (!taskToEdit){
        this.toast.error("Error finding task");
        return;
      }

      taskToEdit.name = updatedTask;
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
      this.toast.success("Task: " + taskToEdit.name + " was successfully updated!");
    },

    deleteTask(id: string) {
      const taskToDeleteIndex = this.tasks.findIndex((t) => t.id === id);
      const taskToDelete = this.tasks[taskToDeleteIndex];

      if (taskToDelete) {
        this.tasks.splice(taskToDeleteIndex, 1);

        if(this.tasks.length === 0){
          localStorage.removeItem("tasks");
          return;
        }

        localStorage.setItem("tasks", JSON.stringify(this.tasks));
        this.toast.success(
          "Task: " + taskToDelete.name + " was deleted successfully!"
        );
      } else {
        this.toast.error("Error deleting task");
      }
    },

    clearTasks() {
      this.tasks = [];
      localStorage.removeItem("tasks");
      this.toast.success("Tasks cleared!");
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Jost&display=swap");

html {
  font-family: "Jost", sans-serif;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

@keyframes fade-in-bottom {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

#app section{
animation-name: fade-in-bottom;
animation-duration: 1s;
}

#app label {
  text-align: center;
  margin-right: 10px;
}

#app input {
  margin-right: 10px;
  height: 30px;
  font: inherit;
}

#app button {
  padding: 10px;
  background: transparent;
  border: none;
  font: inherit;
  cursor: pointer;
  color: white;
  background-color: #8400ff;
  border-radius: 10px;
}

#app button:hover {
  background-color: #6c00d1;
}

#app h1 {
  color:  white;
  max-width: 150px;
  margin-left: auto;
  margin-right: auto;
  background-color:  #8400ff;
  padding: 12px;
  border-radius: 20px;
}

#app li, form {
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 10px;
  padding: 17px;
  max-width: 400px;
  list-style:none;
}

#app form {
  margin-bottom: 50px;
}

.listEmptyMessage {
  text-align: center;
  color: #ff0000;
}

#app .clearBtn {
  padding: 10px;
  background: transparent;
  border: none;
  font: inherit;
  cursor: pointer;
  color: white;
  background-color: #5162ff;
  border-radius: 10px;
}

#app .clearBtn:hover {
  background-color: #404ec8;
}

#app .deleteBtn {
  padding: 10px;
  background: transparent;
  border: none;
  font: inherit;
  cursor: pointer;
  color: white;
  background-color: #ff4545;
  border-radius: 10px;
}

#app .deleteBtn:hover {
  background-color: #c83f3f;
}
</style>