<template>
    <div>
        <ol class="breadcrumb">
            <li class="breadcrumb-item" v-for="breadcrumb in breadcrumbs">{{breadcrumb.title}}</li>
        </ol>
        <h1 class="h2">{{title}}</h1></div>
</template>

<script>
    export default {
        props: {
            breadcrumbs: Array,
            title: String
        },
    }
</script>