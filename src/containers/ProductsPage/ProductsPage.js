import React, {Component} from 'react';
import {connect} from "react-redux";
import {Button, Card, CardBody, CardImg, CardSubtitle, CardTitle, Col, Row} from "reactstrap";
import {NavLink as RouterNavLink} from 'react-router-dom';

import {fetchProducts} from "../../store/actions/productsActions";
import {apiURL} from "../../constants";
import Spinner from "../../components/UI/Spinner/Spinner";

import './ProductsPage.css';
import Sidebar from "../../components/UI/Sidebar/Sidebar";

class ProductsPage extends Component {
    componentDidMount() {
        this.props.fetchProducts(this.props.location.search);
    };

    render() {
        if (!this.props.products) {
            return <Spinner />
        }

        return (
              <Row>
                <Col md={3} sm={12}>
                    <Sidebar categories={this.props.categories} fetchHandler={this.props.fetchProducts}/>
                </Col>
              <Col md={9} sm={12}>

              <div className="Products">
                    {this.props.products.map(item => (
                        <Card key={item._id}>
                            <CardImg top width="150px" src={apiURL + '/uploads/' + item.image} alt="Card image cap" />
                            <CardBody>
                                <CardTitle>{item.title}</CardTitle>
                                <CardSubtitle>{item.price} USD</CardSubtitle>
                                <Button color="success"  className="btn-buy" tag={RouterNavLink} to={/products/ + item._id}>Buy now !</Button>
                            </CardBody>
                        </Card>
                    ))}
                </div>
              </Col>
              </Row>
        );
    }
}

const mapStateToProps = state => ({
    products: state.products.products,
    categories: state.categories.categories,
});

const mapDispatchToProps = dispatch => ({
    fetchProducts: (query) => dispatch(fetchProducts(query))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsPage);