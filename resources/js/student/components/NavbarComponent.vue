<template>
    <div class="navbar bg-dark navbar-dark navbar-expand-sm d-none2 d-md-flex2">
        <div class="container">

            <div class="navbar-collapse collapse" id="navbarMenu">
                <ul class="nav navbar-nav">
                    <li :class="item.dropdown ? 'nav-item dropdown' : 'nav-item'" v-for="item in menu">
                        <router-link :to="{name: item.route,}" class="nav-link" v-if="!item.dropdown">{{item.title}}</router-link>
                        <a v-if="item.dropdown" href="javascript:void(0)" class="nav-link dropdown-toggle" data-toggle="dropdown">{{item.title}}</a>
                        <div class="dropdown-menu" v-if="item.dropdown">
                            <router-link class="dropdown-item" :to="{name : item.route,params: {[item.param] : dropMenu.param}}" v-for="dropMenu in item.dropdown" :key="dropMenu.route" v-if="item.param">{{dropMenu.title}}</router-link>
                            <router-link class="dropdown-item" :to="{name : dropMenu.route}" v-for="dropMenu in item.dropdown" v-if="!item.param" :key="dropMenu.route">{{dropMenu.title}}</router-link>
                        </div>
                    </li>
                </ul>
            </div>

            <button class="navbar-toggler" data-toggle="collapse" data-target="#navbarMenu" type="button">
                <span class="material-icons">menu</span>
            </button>

        </div>
    </div>
</template>

<script>
    export default {
        props: {
            menu: Array
        }
    }
</script>