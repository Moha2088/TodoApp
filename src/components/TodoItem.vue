<template>
  <li :class="[isCompleted ? 'hidden' : 'visible']">
    <h3>{{ name }}</h3>
    <p :class="[isCompleted ? 'completed' : 'notCompleted']">
      {{ isCompleted ? "completed" : "Not completed" }}
    </p>
    <button @click="changeStatus">Change Status</button>
    <button class="deleteBtn" @click="deleteTask">Delete Task</button>
    <div>
    <button v-if="!isCompleted" @click="toggleEdit">{{ canEdit ? 'Hide' : 'Edit' }}</button>
    </div>
    <div v-if="canEdit && !isCompleted">
      <label><strong>Task</strong></label>
      <input type="text" v-model="updatedTask">
      <button @click="editTask">Save</button>
      </div>
  </li>
</template>

<script>
export default {

  props: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },

    isCompleted: {
      type: Boolean,
      default: false,
    },
  },

  emits: ["change-status", "delete-task", "edit-task"],

  data(){
    return{
      canEdit: false,
      updatedTask: ''
    }
  },

  watch: {
    name(){
      if (this.canEdit){
        this.toggleEdit();
        this.updatedTask = '';
      }
    }
  },

  methods: {
    changeStatus() {
      this.$emit("change-status", this.id, this.isCompleted);
    },

    deleteTask() {
      this.$emit("delete-task", this.id);
    },

    editTask(){
      this.$emit("edit-task", this.id, this.updatedTask);
    },

    toggleEdit(){
      this.canEdit = !this.canEdit;
    }
  }
};

</script>

<style>
.hidden {
  opacity: 0.2;
}

.visible {
  opacity: 1;
}

.completed {
  color: green;
}

.notCompleted {
  color: red;
}

button{
  margin-right: 20px;
}

div{
  margin-top: 10px;
}

</style>