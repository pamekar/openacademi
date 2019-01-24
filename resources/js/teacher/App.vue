<template>

    <div class="mdk-header-layout js-mdk-header-layout">

        <!-- Header -->


        <!-- // END Header -->

        <!-- Header Layout Content -->
        <!-- // END Header Layout Content -->


        <div id="header" data-fixed class="mdk-header js-mdk-header mb-0">
            <header-component></header-component>
        </div>

        <div class="mdk-header-layout__content">

            <div data-push data-responsive-width="992px" class="mdk-drawer-layout js-mdk-drawer-layout">
                <div class="mdk-drawer-layout__content page" style="transform: translate3d(0px, 0px, 0px);">

                    <div class="container-fluid page__container">

                        <transition :name="transitionName">
                            <router-view></router-view>
                        </transition>
                        <div class="page">
                            <div class="container page__container">
                                <div class="footer">
                                    Copyright &copy;  - <a
                                        href="#"></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mdk-drawer js-mdk-drawer" id="default-drawer">
                    <sidebar-component :menu="sidebarItems"></sidebar-component>
                </div>
            </div>
        </div>
    </div>


</template>

<script>
    import Sidebar from './components/SidebarComponent.vue'
    import Header from './components/HeaderComponent.vue'

    export default {
        name:       'App',
        data() {
            return {
                transitionName: "",
                menuCategories: [],
                sidebarItems:   [
                    {
                        category: 'Welcome',
                        menus:
                                  [
                                      {
                                          title: 'Home',
                                          icon:  'home',
                                          route: 'home'
                                      },
                                      {
                                          title: 'Dashboard',
                                          icon:  'dashboard',
                                          route: 'dashboard'
                                      }
                                  ]
                    },
                    {
                        category: 'Courses',
                        menus:
                                  [
                                      {
                                          title: "My Courses",
                                          icon:  'library_books',
                                          route: "show-courses",
                                      },
                                      {
                                          title: "Add New Course",
                                          icon:  'library_add',
                                          route: "add-course"
                                      },
                                      {
                                          title: "My Lessons",
                                          icon:  'collections_bookmark',
                                          route: "show-lessons"
                                      },
                                  ]
                    },
                    {
                        category: 'Quizes',
                        menus:
                                  [
                                      {
                                          title: "My Quizes",
                                          icon:  'dvr',
                                          route: "show-quizes",
                                      },
                                      {
                                          title: "Questions",
                                          icon:  'help',
                                          route: "show-questions",
                                      },
                                      {
                                          title: "Add New Quiz",
                                          icon:  "add_box",
                                          route: "add-quiz"
                                      },
                                  ]
                    },
                    {
                        category: 'Account',
                        menus:
                                  [
                                      {
                                          title: "Messages",
                                          icon:  'message',
                                          route: "messages"
                                      },
                                      {
                                          title: "Edit Account",
                                          icon:  'account_box',
                                          route: "account"
                                      },
                                      {
                                          title: "Logout",
                                          icon:  'lock_open',
                                          route: "logout"
                                      },
                                  ]
                    }
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
                        this.sidebarItems[1].menus[2].dropdown = data
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
            'header-component':  Header,
            'sidebar-component': Sidebar,
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