<template>
    <div>
        <vue-headful
                :title="pageTitle + ' - OpenAcademi'"
                :description="'all courses created by user'"
        ></vue-headful>
        <breadcrumb-component
                :breadcrumbs="breadcrumbs"
                :title="pageTitle"
                :button="{title:'Add Quiz',link:'add-quiz',class:'btn btn-success'}"
        ></breadcrumb-component>
        <div class="alert alert-light alert-dismissible border-1 border-left-3 border-left-warning" role="alert" v-if="quizes.length<1">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            <div class="text-black-70">Ohh no! No quizes to display. Add some quizes.</div>
        </div>

        <div class="row">
            <quizes-component
                    v-for="quiz in quizes"
                    :quiz="quiz"
                    :key="quiz.id"
            ></quizes-component>
        </div>

        <!-- Pagination -->
        <paginate
                :page-count="pageCount"
                :click-handler="getQuizes"
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
    import {mapState, mapActions} from 'vuex';
    import Quizes from '../components/QuizesComponent.vue';
    
    import Paginate from 'vuejs-paginate'
    
    export default {
        data() {
            return {
                breadcrumbs: [
                    {
                        title: "Dashboard", link: 'dashboard'
                    },
                    {
                        title: "Quizes", link: 'show-quizes'
                    },
                    {
                        title: ""
                    }
                ],
                pageTitle:   'My quizes'
            }
        },
        mounted() {
            this.$store.dispatch('quizes/fetch_all');
        },
        methods:    {
            getQuizes(page = 1) {
                this.$store.dispatch('quizes/fetch_all', page);
            },
        },
        components: {
            'quizes-component': Quizes,
            'paginate': Paginate
        },
        computed:   {
            ...mapState(
                {
                    quizes:     state => state.quizes.quizes,
                    categories: state => state.quizes.categories,
                    pageCount:  state => state.quizes.pageCount,
                    pageFrom:   state => state.quizes.pageFrom,
                    pageTo:     state => state.quizes.pageTo,
                    pageTotal:  state => state.quizes.pageTotal,
                })
        }
    }
</script>