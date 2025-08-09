<template>
  <form @submit.prevent="addTask">
    <div>
      <label><strong>Task</strong></label>
      <input type="text" v-model="enteredTask" />
      <button type="submit">Add Task</button>
    </div>
  </form>
</template>

<script>
export default {

    emits: ['task-added'],

  data() {
    return {
        enteredTask: '',
        isCompleted: false,
    };
  },

  methods:{
    addTask () {
        this.$emit('task-added', this.enteredTask, this.completed);
        this.enteredTask = '';
    }
  }
};
</script>

<style>



</style>
