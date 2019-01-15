<template>
    <div>
        <div class="container page__container">
            <router-view></router-view>
            <flash></flash>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import Flash from './components/Flash.vue'

    export default {
        name: 'App',
        components: {
            flash: Flash
        }
    }
</script>