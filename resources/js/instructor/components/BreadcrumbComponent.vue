<template>
    <div>
        <ol class="breadcrumb">
            <li class="breadcrumb-item" v-for="breadcrumb in breadcrumbs">
                <router-link :to="{name:breadcrumb.link}" v-if="breadcrumb.link && !breadcrumb.params">{{breadcrumb.title}}</router-link>
                <router-link :to="{name:breadcrumb.link, params:breadcrumb.params}" v-if="breadcrumb.link && breadcrumb.params">{{breadcrumb.title}}</router-link>
                <span v-if="!breadcrumb.link">{{breadcrumb.title}}</span></li>
        </ol>
        <h1 class="h2" v-html="title"></h1>
    </div>
</template>

<script>
    export default {
        props: {
            breadcrumbs: Array,
            title:       String
        },
    }
</script>