import axiosApi from '../../axios-api';

export const FETCH_CATEGORIES_REQUEST = 'FETCH_CATEGORIES_REQUEST';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE';

const fetchCategoriesRequest = () => ({type: FETCH_CATEGORIES_REQUEST});
const fetchCategoriesSuccess = (categories) => ({type: FETCH_CATEGORIES_SUCCESS, categories});
const fetchCategoriesFailure = (error) => ({type: FETCH_CATEGORIES_FAILURE, error});


export const fetchCategories = () => async dispatch => {
    try {
        dispatch(fetchCategoriesRequest());
        const response = await axiosApi.get('/categories');
        dispatch(fetchCategoriesSuccess(response.data));
    } catch (e) {
        console.log(e.response.data);
        dispatch(fetchCategoriesFailure(e.response.data))
    }
};