<template>
  <v-app>
    <!-- Top Bar -->
    <v-app-bar app color="primary" dark>
      <v-app-bar-title>Task Dashboard</v-app-bar-title>
      <v-btn icon @click="toggleTheme">
        <v-icon>{{ isDark ? 'mdi-white-balance-sunny' : 'mdi-moon-waning-crescent' }}</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Sidebar -->
    <v-navigation-drawer app permanent>
      <v-list nav dense>
        <v-list-item title="Dashboard" to="/" prepend-icon="mdi-view-dashboard" />
        <!-- Add more nav links here if needed -->
      </v-list>
    </v-navigation-drawer>

    <!-- Main Content Area -->
    <v-main>
      <v-container fluid class="pa-4">
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { useTheme } from 'vuetify'
import { computed } from 'vue'

const theme = useTheme()

const isDark = computed(() => theme.global.current.value.dark)

const toggleTheme = () => {
  theme.global.name.value = isDark.value ? 'light' : 'dark'
}

</script>
