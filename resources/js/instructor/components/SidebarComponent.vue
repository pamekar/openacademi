<template>
    <div class="mdk-drawer js-mdk-drawer" id="default-drawer">
        <div class="mdk-drawer__content ">
            <div class="sidebar sidebar-left sidebar-dark bg-dark o-hidden" data-perfect-scrollbar>
                <div class="sidebar-p-y">
                    <ul class="sidebar-menu sm-active-button-bg">
                        <li class="sidebar-menu-item" v-for="(item,index) in menu">

                            <router-link :to="{name: item.route,}" class="sidebar-menu-button" v-if="!item.dropdown">
                                <i :class="item.icon"></i> {{item.title}}
                            </router-link>
                            <a v-if="item.dropdown" href="#" class="sidebar-menu-button" data-toggle="collapse">{{item.title}}<span class="ml-auto sidebar-menu-toggle-icon"></span></a>
                            <ul class="sidebar-submenu sm-indent collapse" :id="'menu-'+index" v-if="item.dropdown">
                                <li class="sidebar-menu-item" v-for="dropMenu in item.dropdown">
                                    <router-link class="sidebar-menu-button" :to="{name : item.route,params: {[item.param] : dropMenu.param}}" v-for="dropMenu in item.dropdown" :key="dropMenu.route" v-if="item.param">{{dropMenu.title}}</router-link>
                                    <router-link class="sidebar-menu-button" :to="{name : dropMenu.route}" v-for="dropMenu in item.dropdown" v-if="!item.param" :key="dropMenu.route"><span class="sidebar-menu-text">{{dropMenu.title}}</span></router-link>
                                </li>
                            </ul>
                        </li>
                    </ul>

                </div>
            </div>
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