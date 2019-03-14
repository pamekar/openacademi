<template>
    <div>
        <vue-headful
                :title="pageTitle + ' | OpenAcademi'"
                :description="''"
        ></vue-headful>
        <breadcrumb-component
                :breadcrumbs="breadcrumbs"
                :title="pageTitle"
        ></breadcrumb-component>
        <div class="row">
            <quizes-component
                    v-for="result in results"
                    :quiz="result"
                    :key="result.id"
            ></quizes-component>
        </div>
        <paginate
                :page-count="pageCount"
                :click-handler="getQuizResults"
                :prev-text="'Prev'"
                :next-text="'Next'"
                container-class="pagination justify-content-center pagination-sm"
                active-class="page-item active"
                disabled-class="page-item disabled"
                page-class="page-item"
                next-class="page-item"
                prev-class="page-item"
                page-link-class="page-link"
                next-link-class="page-link"
                prev-link-class="page-link"
        >
        </paginate>
    </div>
</template>
<script>
    import QuizesComponent from '../components/QuizesComponent.vue';
    import Paginate from 'vuejs-paginate';

    export default {
        data() {
            return {
                breadcrumbs: [
                    {
                        title: "Dashboard", link: 'dashboard'
                    },
                    {
                        title: "Courses", link: 'all-courses'
                    },
                    {
                        title: ""
                    }
                ],
                pageTitle:   "",
                pageCount:   0,
                results:     [],
            }
        },
        created() {

        },
        mounted() {
            this.getQuizResults();
        },
        components: {
            'quizes-component': QuizesComponent,
            paginate:           Paginate
        },
        computed:   {},
        methods:    {
            getQuizResults(page = 1) {
                axios.get(`/api/quizes/results?count=12&page=${page}`)
                    .then(({data}) => {
                        this.results = data.data;
                        this.pageCount = data.last_page;
                    });
            },

        },
        props:      ['slug'],
    }
</script>