<template>
    <div class="content-wrap  courses-grid-v3-page">
        <section class="flat-title-page parallax parallax8 style4">
            <div class="overlay style2"></div>
            <div class="container wrap-title-page bg-img ">
                <div class="title-page">
                    <h3 class="title font-weight-700">{{searchText}}</h3>
                </div>
            </div>
        </section>

        <div class="content-page-fullwidth-wrap clearfix pd-top-45">
            <div class="container-fluid ">
                <!-- /.sidebar-left -->
                <div class="sidebar-left">
                    <div class="widget-categories border-f-e6f3ff">
                        <h6 class="title-widget">Categories</h6>
                        <div class="content">
                            <ul>
                                <li v-for="category in categories"><a href="javascript:void(0)" @click="setCategory(category.id)">{{category.title}} <span>({{category.count}})</span></a></li>
                            </ul>
                        </div>
                    </div> <!-- /.widget-categories -->
                </div>
                <div class="content-page">
                    <div class="heading clearfix border-f-e6f3ff border-ra4">
                        <div class="taskbar">
                            <ul class="list">
                                <li><span class="color-f3728b font-Poppins font-weight-700"> {{totalCourses}}</span> Courses</li>
                            </ul>
                        </div>
                        <div class="select-order flat-text-right">
                            <div class="wrap-select">
                                <select class="order-by">
                                    <option>Sort By: release date</option>
                                </select>
                            </div>
                        </div>
                    </div> <!--  /.heading -->
                    <div class="flat-courses style4">
                        <div :class="'course style4 text-'+color(colors)" v-for="course in courses">
                            <div class="course-border border-f-e6f3ff border-ra4 clear-sub-columns transition-vline">
                                <div class="course-img-box">
                                    <div class="course-img img-vline">
                                        <a href="#"><img :src="course.course_image_preview" style="max-height: 213px;" alt="openacademi"></a>
                                        <div class="overlay">
                                            <span class="vline"></span>
                                            <span class="vline vline-bottom"></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="course-content">
                                    <div class="text-wrap border-bt-e6f3ff">
                                        <h6 class="title"><a href="#">{{course.title}}</a></h6>
                                        <p class="teacher"><a href="#">{{course.instructor.full_name}}</a></p>
                                        <p class="description">{{course.summary}}</p>
                                    </div>
                                    <div class="wrap-rating-price">
                                        <ul class="list meta-rate">
                                            <li>

                                                <star-rating :rating="Number(course.rating.split(';')[0])" :increment="0.01" :read-only="true" :star-size="13" :show-rating="false"></star-rating>
                                                <span>{{Number(course.rating.split(';')[0])}}
                                                ({{Number(course.rating.split(';')[1])}})</span>

                                            </li>
                                            <li>
                                                <span> {{course.course_cat}}</span>
                                            </li>
                                            <li>
                                                <span> Updated {{course.last_updated}}</span>
                                            </li>
                                            <!--<li>
                                                Views <span class="color-2ebd59">1,547,932</span>
                                            </li>-->
                                        </ul>
                                        <span class="price">&#8358;{{course.price.toLocaleString('en', {maximumSignificantDigits: 2})}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flat-paginations style2">
                        <paginate
                                :page-count="pageCount"
                                :click-handler="searchCourses"
                                :prev-text="'Prev'"
                                :next-text="'Next'"
                                container-class="list flat-text-center pagination-wrap"
                                active-class=" active"
                                disabled-class="disabled"
                        >
                        </paginate>
                    </div>
                </div> <!-- /.content-page -->
            </div>
        </div>
    </div> <!-- /.container -->
    <!-- /.content-wrap -->
</template>
<script>
    import Paginate from 'vuejs-paginate'
    import axios from 'axios';

    export default {
        data() {
            return {
                category:   0,
                categories: [],
                courses:    [],
                pageCount:  1,
                searchText: null,
                totalCourses:      0
            }
        },
        components: {
            'paginate': Paginate
        },
        computed:   {},
        created() {
            this.getCategories();
            this.searchCourses();
        },
        methods:    {
            color(colors) {
                return this.colors[Math.floor(Math.random() * colors.length)];
            },
            getCategories() {
                let count = 0;
                let query = this.searchText ? this.searchText : this.searching;
                axios.get(`/api/home/courses/search/categories?q=${query}`)
                    .then(({data}) => {
                        this.categories = data;
                    });

            },
            searchCourses(page = 1) {
                let query = this.searchText ? this.searchText : this.searching;
                let courses = [];
                axios.get(`/api/home/courses/search?q=${query}&count=8&page=${page}&category=${this.category}`)
                    .then(({data}) => {
                        courses = data.courses.data;
                        this.courses = data.courses.data;
                        this.pageCount = data.courses.last_page;
                        this.searchText = data.search;
                        this.totalCourses = data.courses.total;
                    });
            },
            setCategory(id) {
                this.category = id;
                this.searchCourses();
            }
        },
        props:      {
            colors:    Array,
            searching: String
        }
    }
</script>