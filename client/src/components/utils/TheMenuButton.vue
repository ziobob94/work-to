<template>
    <v-menu>

        <template v-slot:activator="{ props }">
            <v-app-bar-nav-icon v-bind="props"></v-app-bar-nav-icon>
        </template>

        <v-list>
            <v-list-item
                v-for="(item, index) in items"
                :key="index"
                :value="index"
                model     class="w-100"
                @click="goTo(item.name)"
                >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>


<script>
export default {
    name: 'TheMenuButton',
    data() {
        return {
            items: [
                { title: 'Permissions', name: 'permissions' },
            ]}
        },
    methods: {
        goTo(name){
            this.$router.push({ name });
        }

    }
}
</script>