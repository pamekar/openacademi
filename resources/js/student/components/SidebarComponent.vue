<template>
    <div class="mdk-drawer js-mdk-drawer" id="default-drawer">
        <div class="mdk-drawer__content ">
            <div class="sidebar sidebar-left sidebar-dark bg-dark o-hidden" data-perfect-scrollbar>
                <div class="sidebar-p-y">
                    <div v-for="(items,bigIndex) in menu">
                        <div class="sidebar-heading">{{items.category}}</div>
                        <ul class="sidebar-menu sm-active-button-bg">
                            <li class="sidebar-menu-item" v-for="(item,index) in items.menus">

                                <router-link :to="{name: item.route,}" class="sidebar-menu-button" v-if="!item.dropdown">
                                    <i class="sidebar-menu-icon sidebar-menu-icon--left material-icons" v-if="item.icon">{{item.icon}}</i> {{item.title}}
                                </router-link>
                                <a v-if="item.dropdown" :href="'#menu-'+bigIndex+'-'+index" class="sidebar-menu-button" data-toggle="collapse"> <i class="sidebar-menu-icon sidebar-menu-icon--left material-icons" v-if="item.icon">{{item.icon}}</i> {{item.title}}<span class="ml-auto sidebar-menu-toggle-icon"></span></a>
                                <ul class="sidebar-submenu sm-indent collapse" :id="'menu-'+bigIndex+'-'+index" v-if="item.dropdown">
                                    <li class="sidebar-menu-item" v-for="dropMenu in item.dropdown">
                                        <router-link class="sidebar-menu-button" :to="{name : item.route,params: {[item.param] : dropMenu.param}}" :key="dropMenu.route" v-if="item.param">{{dropMenu.title}}</router-link>
                                        <router-link class="sidebar-menu-button" :to="{name : dropMenu.route}" v-if="!item.param" :key="dropMenu.route"><span class="sidebar-menu-text">{{dropMenu.title}}</span></router-link>
                                    </li>
                                </ul>
                            </li>
                        </ul>

                    </div>
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