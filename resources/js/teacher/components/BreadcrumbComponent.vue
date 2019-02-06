<template>
    <div>
        <ol class="breadcrumb">
            <li class="breadcrumb-item" v-for="breadcrumb in breadcrumbs">
                <router-link :to="{name:breadcrumb.link}" v-if="breadcrumb.link && !breadcrumb.params">{{breadcrumb.title}}</router-link>
                <router-link :to="{name:breadcrumb.link, params:breadcrumb.params}" v-if="breadcrumb.link && breadcrumb.params">{{breadcrumb.title}}</router-link>
                <span v-if="!breadcrumb.link && breadcrumb.title.length>0">{{breadcrumb.title}}</span>
                <span v-if="!breadcrumb.link && breadcrumb.title.length===0">{{title}}</span>
            </li>
        </ol>
        <div class="d-flex flex-column flex-sm-row flex-wrap mb-headings align-items-start align-items-sm-center">
            <div class="flex mb-2 mb-sm-0">
                <h1 class="h2" v-html="title"></h1>
            </div>
            <router-link :to="{name:button.link}" v-if="button && button.link && !button.params" :class="button.class">{{button.title}}</router-link>
            <router-link :to="{name:button.link, params:button.params}" v-else-if="button && button.link && button.params" :class="button.class">{{button.title}}</router-link>
            <button v-on:click="button.method" v-else-if="button && !button.link && !button.params && button.method" :class="button.class">{{button.title}}</button>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            breadcrumbs: Array,
            title:       String,
            button:      Object
        },
    }
</script>