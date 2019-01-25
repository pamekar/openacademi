<template>
    <div>
        <ol class="breadcrumb">
            <li class="breadcrumb-item" v-for="breadcrumb in breadcrumbs">
                <router-link :to="{name:breadcrumb.link}" v-if="breadcrumb.link && !breadcrumb.params">{{breadcrumb.title}}</router-link>
                <router-link :to="{name:breadcrumb.link, params:breadcrumb.params}" v-if="breadcrumb.link && breadcrumb.params">{{breadcrumb.title}}</router-link>
                <span v-if="!breadcrumb.link">{{breadcrumb.title}}</span></li>
        </ol>
        <div class="d-flex flex-column flex-sm-row flex-wrap mb-headings align-items-start align-items-sm-center">
            <div class="flex mb-2 mb-sm-0">
                <h1 class="h2" v-html="title"></h1>
            </div>
            <router-link :to="{name:button.link}" v-if="button.link && !button.params" :class="button.class" v-if="button">{{button.title}}</router-link>
            <router-link :to="{name:button.link, params:button.params}" v-if="button.link && button.params" :class="button.class" v-if="button">{{button.title}}</router-link>
        </div>
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