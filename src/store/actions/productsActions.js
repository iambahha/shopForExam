import axiosApi from '../../axios-api';
import {push} from "connected-react-router";

import {NotificationManager} from "react-notifications";

export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

export const FETCH_SINGLE_PRODUCT_REQUEST = 'FETCH_SINGLE_PRODUCT_REQUEST';
export const FETCH_SINGLE_PRODUCT_SUCCESS = 'FETCH_SINGLE_PRODUCT_SUCCESS';
export const FETCH_SINGLE_PRODUCT_FAILURE = 'FETCH_SINGLE_PRODUCT_FAILURE';

export const CREATE_PRODUCT_REQUEST = 'CREATE_PRODUCT_REQUEST';
export const CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS';
export const CREATE_PRODUCT_FAILURE = 'CREATE_PRODUCT_FAILURE';

export const DELETE_PRODUCT_REQUEST = 'DELETE_PRODUCT_REQUEST';
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
export const DELETE_PRODUCT_FAILURE = 'DELETE_PRODUCT_FAILURE';

export const fetchProductsRequest = () => ({type: FETCH_PRODUCTS_REQUEST});
export const fetchProductsSuccess = products => ({type: FETCH_PRODUCTS_SUCCESS, products});
export const fetchProductsFailure = error => ({type: FETCH_PRODUCTS_FAILURE, error});

export const fetchProductRequest = () => ({type: FETCH_SINGLE_PRODUCT_REQUEST});
export const fetchProductSuccess = product => ({type: FETCH_SINGLE_PRODUCT_SUCCESS, product});
export const fetchProductFailure = error => ({type: FETCH_SINGLE_PRODUCT_FAILURE, error});

export const createProductRequest = () => ({type: CREATE_PRODUCT_REQUEST});
export const createProductSuccess = () => ({type: CREATE_PRODUCT_SUCCESS});
export const createProductFailure = (error) => ({type: CREATE_PRODUCT_FAILURE, error});

export const deleteProductRequest = () => ({type: DELETE_PRODUCT_REQUEST});
export const deleteProductSuccess = () => ({type: DELETE_PRODUCT_SUCCESS});
export const deleteProductFailure = (error) => ({type: DELETE_PRODUCT_FAILURE, error});

export const fetchProducts = (catId) => async dispatch => {
  try {
    let query = '';
    if (catId) {
      query = catId;
    }

    dispatch(fetchProductsRequest());
    const response = await axiosApi.get('/products' + query);
    dispatch(fetchProductsSuccess(response.data));
  } catch (e) {
    dispatch(fetchProductsFailure(e.response.data))
  }
};

export const fetchProduct = (id) => async dispatch => {
  try {
    dispatch(fetchProductRequest());
    const response = await axiosApi.get('/products/' + id);
    dispatch(fetchProductSuccess(response.data));
    console.log(response.data)
  } catch (e) {
    console.log(e.response.data);
    dispatch(fetchProductFailure(e.response.data))
  }
};


export const createProduct = productData => async (dispatch,getState) => {
  try {
    const token = getState().users.user.token;
    const config = {headers: {'Authorization': token}};
    dispatch(createProductRequest());

    await axiosApi.post('/products', productData, config);

    NotificationManager.success('Successfully product created');
    dispatch(createProductSuccess());
    dispatch(push('/'));
  } catch (e) {
    NotificationManager.error('Please fill all required fields');
    if (e.response) {
      dispatch(createProductFailure(e.response.data))
    } else {
      dispatch(createProductFailure({global: 'No connection'}))
    }
  }
};

export const deleteProduct = id => async (dispatch,getState) => {
  try {
    const token = getState().users.user.token;
    const config = {headers: {'Authorization': token}};
    dispatch(deleteProductRequest());
    await axiosApi.delete('/products/' + id, config);
    NotificationManager.success('Product removed');
    dispatch(deleteProductSuccess());
    dispatch(push('/'));
  } catch (e) {
    NotificationManager.error('Something went wrong');
    if (e.response) {
      dispatch(deleteProductFailure(e.response.data))
    } else {
      dispatch(deleteProductFailure({global: 'No connection'}))
    }
  }
};