<template>
    <div>
        <div class="page__header">
            <navbar-component :menu="menuItems"></navbar-component>
        </div>

        <div class="page">
            <div class="container page__container">
                <transition :name="transitionName">
                    <router-view></router-view>
                </transition>
            </div>

        </div>

    </div>
</template>

<script>
    import Navbar from './components/NavbarComponent.vue'

    export default {
        name:       'App',
        data() {
            return {
                transitionName: "",
                menuCategories: [],
                menuItems:      [
                    {
                        title:    'Home',
                        dropdown: [
                            {
                                title: 'Home Page',
                                route: 'home'
                            },
                            {
                                title: 'Dashboard',
                                route: 'dashboard'
                            }
                        ]
                    },
                    {
                        title: "My Courses",
                        route: "purchased-courses"
                    },
                    {
                        title: "All Courses",
                        route: "all-courses"
                    },
                    {
                        title:    "Categories",
                        param:    "slug",
                        route:    "category-courses",
                        dropdown: []
                    },
                    /*{
                        title: "Quiz Results",
                        route: "error"
                    },
                    {
                        title:    "Account",
                        dropdown: [
                            {
                                title: "Edit Account",
                                route: "error"
                            }
                        ]
                    }*/
                ]
            }
        },
        created() {
            this.getCategories();
        },
        methods:    {
            getCategories() {
                axios.get("/api/courses/categories")
                    .then(({data}) => {
                        this.menuItems[3].dropdown = data
                    });
            }
        },
        watch:      {
            '$route'(to, from) {
                const toDepth = to.path.split('/').length
                const fromDepth = from.path.split('/').length
                this.transitionName = toDepth < fromDepth ? 'fade-in' : 'fade-out'
            }
        },
        components: {
            'navbar-component': Navbar
        }
    }
</script>

<style>
    .course-price {
        font-size: 17px;
        font-weight: 600;
        right: 0;
        padding: 12px 25px 13px 15px;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        position: absolute;
        bottom: 150px;
        background-color: rgba(246, 247, 249, 0.7);
    }

    .course-price:before {
        border-top-width: 24px
    }

    .course-price:after {
        border-bottom-width: 24px
    }
</style>