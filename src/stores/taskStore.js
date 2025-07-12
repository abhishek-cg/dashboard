import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useTaskStore = defineStore('task', () => {
  const tasks = ref([])

  const loadTasks = () => {
    const stored = localStorage.getItem('tasks')
    if (stored) {
      tasks.value = JSON.parse(stored)
    }
  }

  const addTask = (task) => {
    tasks.value.push(task)
  }

  const updateTask = (updatedTask) => {
    const index = tasks.value.findIndex(t => t.id === updatedTask.id)
    if (index !== -1) tasks.value[index] = updatedTask
  }

  const deleteTask = (id) => {
    tasks.value = tasks.value.filter(task => task.id !== id)
  }

  watch(tasks, (val) => {
    localStorage.setItem('tasks', JSON.stringify(val))
  }, { deep: true })

  loadTasks()

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask
  }
})
