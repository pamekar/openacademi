<template>
    <div>
        <div class="mdk-header-layout js-mdk-header-layout">

            <!-- Header -->


            <!-- // END Header -->

            <!-- Header Layout Content -->
            <!-- // END Header Layout Content -->


            <div id="header" class="mdk-header bg-dark js-mdk-header m-0" data-fixed data-effects="waterfall">
                <header-component></header-component>
            </div>

            <div class="mdk-header-layout__content d-flex flex-column">

                <div class="page__header d-none d-sm-block">
                    <navbar-component :menu="navItems"></navbar-component>
                </div>

                <div class="page">
                    <div class="container page__container">
                        <transition :name="transitionName">
                            <router-view></router-view>
                        </transition>
                    </div>

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

        </div>
        <sidebar-component :menu="sidebarItems"></sidebar-component>
    </div>
</template>

<script>
    import Navbar from './components/NavbarComponent.vue'
    import Sidebar from './components/SidebarComponent.vue'
    import Header from './components/HeaderComponent.vue'

    export default {
        name:       'App',
        data() {
            return {
                transitionName: "",
                menuCategories: [],
                navItems:       [
                    {
                        title:    'Home',
                        category: 'Welcome',
                        icon:     'home',
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
                        title:    "My Courses",
                        category: 'Courses',
                        icon:     'school',
                        route:    "purchased-courses"
                    },
                    {
                        title: "All Courses",
                        icon:  'library_books',
                        route: "all-courses"
                    },
                    {
                        title:    "Categories",
                        icon:     'apps',
                        param:    "slug",
                        route:    "category-courses",
                        dropdown: []
                    },
                    {
                        title: "Quiz Results",
                        icon:  "poll",
                        route: "quizes"
                    },
                    {
                        title:    "Account",
                        icon:     "account_box",
                        dropdown: [
                            {
                                title: "Edit Account",
                                route: "error"
                            }
                        ]
                    }
                ],
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
                                          title:    "My Courses",
                                          category: 'Courses',
                                          icon:     'school',
                                          route:    "purchased-courses"
                                      },
                                      {
                                          title: "All Courses",
                                          icon:  'library_books',
                                          route: "all-courses"
                                      },
                                      {
                                          title:    "Categories",
                                          icon:     'apps',
                                          param:    "slug",
                                          route:    "category-courses",
                                          dropdown: []
                                      },
                                      {
                                          title: "Quiz Results",
                                          icon:  "poll",
                                          route: "error"
                                      }
                                  ]
                    },
                    {
                        category: 'Management',
                        menus:
                                  [

                                      {
                                          title:    "Account",
                                          icon:     "account_box",
                                          dropdown: [
                                              {

                                                  title: "Edit Account",
                                                  route: "error"
                                              }
                                          ]
                                      }
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
                        this.navItems[3].dropdown = data
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
            'navbar-component':  Navbar,
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