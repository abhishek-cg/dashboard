<template>
    <DashboardLayout>
        <v-container fluid>
            <v-card>
                <v-card-title>
                    <div class="d-flex justify-space-between align-center w-100">
                        <span class="text-h6">Task List</span>
                        <v-select v-model="selectedStatus" :items="['All', 'To Do', 'In Progress', 'Completed']"
                            label="Status" dense class="mr-2" style="max-width: 150px" />

                        <v-select v-model="selectedPriority" :items="['All', 'Low', 'Medium', 'High']" label="Priority"
                            dense class="mr-4" style="max-width: 150px" />

                        <v-btn color="primary" @click="openAddDialog">Add Task</v-btn>
                    </div>
                </v-card-title>

                <v-data-table :headers="headers" :items="filteredTasks" item-value="id" class="elevation-1"
                    density="comfortable">
                    <template #item.status="{ item }">
                        <v-chip :color="getStatusColor(item.status)" dark>
                            {{ item.status }}
                        </v-chip>
                    </template>

                    <template #item.priority="{ item }">
                        <v-chip :color="getPriorityColor(item.priority)" dark>
                            {{ item.priority }}
                        </v-chip>
                    </template>
                    <template #item.actions="{ item }">
                        <v-btn icon="mdi-pencil" color="blue" @click="openEditDialog(item)">

                        </v-btn>
                        <v-btn icon="mdi-delete" color="red" @click="deleteTask(item.id)">

                        </v-btn>
                    </template>

                    <template #no-data>
                        <v-alert type="info" border="start" class="ma-4">
                            No tasks available.
                        </v-alert>
                    </template>
                </v-data-table>
                <v-dialog v-model="showDialog" max-width="600px">
                    <v-card>
                        <v-card-title>
                            <span class="text-h6">{{ isEditing ? 'Edit Task' : 'Add Task' }}</span>
                        </v-card-title>

                        <v-card-text>
                            <v-form ref="formRef" v-model="formValid" @submit.prevent="submitForm">
                                <v-text-field v-model="form.title" label="Title" :rules="[rules.required]" />
                                <v-textarea v-model="form.description" label="Description" :rules="[rules.required]" />
                                <v-text-field v-model="form.dueDate" type="date" label="Due Date"
                                    :rules="[rules.required]" />
                                <v-select v-model="form.status" :items="['To Do', 'In Progress', 'Completed']"
                                    label="Status" :rules="[rules.required]" />
                                <v-select v-model="form.priority" :items="['Low', 'Medium', 'High']" label="Priority"
                                    :rules="[rules.required]" />
                            </v-form>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer />
                            <v-btn text @click="closeDialog">Cancel</v-btn>
                            <v-btn color="primary" :disabled="!formValid" @click="submitForm">
                                {{ isEditing ? 'Update' : 'Add' }}
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-card>
        </v-container>
    </DashboardLayout>
</template>
<script setup>
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import { ref, reactive, computed } from 'vue'
import { useTaskStore } from '@/stores/taskStore'

const taskStore = useTaskStore()
const tasks = computed(() => taskStore.tasks)

// Table headers
const headers = [
    { text: 'Title', value: 'title' },
    { text: 'Description', value: 'description' },
    { text: 'Due Date', value: 'dueDate' },
    { text: 'Status', value: 'status' },
    { text: 'Priority', value: 'priority' },
    { text: 'Actions', value: 'actions', sortable: false },
]

// Modal state
const showDialog = ref(false)
const isEditing = ref(false)
const formValid = ref(false)
const formRef = ref(null)

// Task form
const form = reactive({
    id: null,
    title: '',
    description: '',
    dueDate: '',
    status: '',
    priority: '',
})

// Form rules
const rules = {
    required: v => !!v || 'Required field',
}
const selectedStatus = ref('All')
const selectedPriority = ref('All')

const filteredTasks = computed(() => {
    return taskStore.tasks.filter(task => {
        const statusMatch = selectedStatus.value === 'All' || task.status === selectedStatus.value
        const priorityMatch = selectedPriority.value === 'All' || task.priority === selectedPriority.value
        return statusMatch && priorityMatch
    })
})

// Dialog controls
const openAddDialog = () => {
    resetForm()
    showDialog.value = true
    isEditing.value = false
}

const openEditDialog = (task) => {
    Object.assign(form, task)
    showDialog.value = true
    isEditing.value = true
}

const closeDialog = () => {
    showDialog.value = false
}

const resetForm = () => {
    form.id = null
    form.title = ''
    form.description = ''
    form.dueDate = ''
    form.status = ''
    form.priority = ''
    formValid.value = false
}

// Submit form
const submitForm = () => {
    if (!formRef.value?.validate()) return

    if (isEditing.value) {
        taskStore.updateTask({ ...form })
    } else {
        taskStore.addTask({ ...form, id: Date.now() })
    }

    closeDialog()
}

// Delete task
const deleteTask = (id) => {
    taskStore.deleteTask(id)
}

// UI color helpers
const getStatusColor = (status) => {
    switch (status) {
        case 'To Do': return 'grey'
        case 'In Progress': return 'blue'
        case 'Completed': return 'green'
        default: return 'grey'
    }
}

const getPriorityColor = (priority) => {
    switch (priority) {
        case 'Low': return 'green'
        case 'Medium': return 'orange'
        case 'High': return 'red'
        default: return 'grey'
    }
}
</script>
