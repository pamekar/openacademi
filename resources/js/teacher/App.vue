<template>
    <div>
        <div class="mdk-header-layout js-mdk-header-layout">

            <div id="header" data-fixed class="mdk-header js-mdk-header mb-0">
                <header-component></header-component>
            </div>

            <div class="mdk-header-layout__content">

                <div data-push data-responsive-width="992px" class="mdk-drawer-layout js-mdk-drawer-layout">
                    <div class="mdk-drawer-layout__content page">

                        <div class="container-fluid page__container">

                            <transition :name="transitionName">
                                <router-view></router-view>
                            </transition>
                        </div>

                        <div class="page">
                            <div class="container page__container">
                                <div class="footer">
                                    Copyright &copy;  - <a
                                        href="/">OpenAcademi</a>
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
        <modals-component></modals-component>
    </div>
</template>

<script>
    import Sidebar from './components/SidebarComponent.vue'
    import Header from './components/HeaderComponent.vue'
    import Modals from './components/ModalsComponent.vue'
    
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
                                      {
                                          title: "Add New Lesson",
                                          icon:  'add_box',
                                          route: "add-lesson"
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
                                          icon:  "add_to_queue",
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
                                          route: "dashboard"
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
            
        },
        methods:    {},
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
            'modals-component':  Modals,
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