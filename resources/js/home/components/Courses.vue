<template>
    <div class="content-wrap  courses-grid-v1-page">
        <div class="container-fluid">
            <div class="flat-title flat-text-center">
                <h2 class="title">Our Courses</h2>
            </div>
            <div class="content-page-wrap">
                <div class="flat-courses clearfix isotope-courses">
                    <div :class="'course one-of-four text-'+color(colors)" v-for="course in courses">
                        <div class="course-border border-f-e6f3ff border-ra4 transition-vline">
                            <div class="course-img img-vline">
                                <a href="#"><img :src="course.course_image_preview"
                                                 alt="bookflare"></a>
                                <div class="overlay">
                                    <span class="vline"></span>
                                    <span class="vline vline-bottom"></span>
                                </div>
                            </div>
                            <div class="course-content">
                                <div class="text-wrap border-bt-e6f3ff">
                                    <h6 class="title"><a href="#">{{course.title}}</a></h6>
                                    <p class="teacher"><a href="#">{{course.instructor.full_name}}</a></p>
                                    <p class="description">{{course.summary}}</p>
                                </div>

                                <div class="wrap-rating-price">

                                    <div class="wrap-rating">
                                        <star-rating :rating="Number(course.rating.split(';')[0])" :increment="0.01" :read-only="true" :star-size="13" :show-rating="false"></star-rating>
                                        <span>{{Number(course.rating.split(';')[0])}}
                                                ({{Number(course.rating.split(';')[1])}})</span>
                                    </div>
                                    <span class="price">&#8358;{{course.price.toLocaleString('en', {maximumSignificantDigits: 2})}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> <!-- /.course -->
            </div> <!-- /.flat-courses -->
        </div> <!-- /.content-page-wrap -->
        <div class="flat-paginations style2">
            <paginate
                    :page-count="pageCount"
                    :click-handler="getAllCourses"
                    :prev-text="'Prev'"
                    :next-text="'Next'"
                    container-class="list flat-text-center pagination-wrap"
                    active-class=" active"
                    disabled-class="disabled"
            >
            </paginate>
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
                pageCount: 1,
                courses:   []
            }
        },
        components: {
            'paginate': Paginate
        },
        computed:   {},
        created() {
            this.getAllCourses();
        },
        methods:    {
            color(colors) {
                return this.colors[Math.floor(Math.random() * colors.length)];
            },
            getAllCourses(page = 1) {
                axios.get(`/api/courses/${this.category}?count=8&page=${page}`)
                    .then(({data}) => {
                        this.courses = data.data;
                        this.pageCount = data.last_page;
                    });
            }
        },
        props:      {
            colors:   Array,
            category: String
        }
    }
</script>