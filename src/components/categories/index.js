import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CreateCategory from './create';
import EditCategory from './edit';
import DeleteCategory from './delete';
import { Button } from '../../../node_modules/@material-ui/core';
import { config } from '../configurations/config';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Checkbox from '@material-ui/core/Checkbox';


class Categories extends React.Component {

    categoryModel =
        {
            _id: '',
            initial: '',
            name: '',
            active: true,
            createDate: '',
            modifyDate: ''
        }

    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            createNew: false,
            editCategory: false,
            deleteCategory : false,
            loading: true,
            category: this.categoryModel,
        }
    }

    reloadCategoryData = () => {
        axios.get(config.url + '/categories')
        .then(res => {
            this.setState({
                categories : res.data,
                createNew : false,
                editCategory : false,
                deleteCategory : false, 
                category : this.categoryModel,
                loading : false
            })
        })
        .catch((error) => {
            alert(error);
        })
    }

    componentDidMout() {
        this.reloadCategoryData();
    }

    //API connect ke cloud
    componentDidMount() {
        axios.get(config.url + '/categories')
            .then(res => {
                this.setState({
                    categories: res.data,
                    loading: false
                })
            })

            .catch((error) => {
                alert(error)
            })
    }

    //toggle
    handleToggle = () => {
        this.setState({
            createNew: true,

        });
    }


    //tutup
    handleClose = () => {
        this.setState({
            createNew: false,
            editCategory: false,
            deleteCategory: false,
            category : this.categoryModel
        });
    }
    //bisa diketik
    handleChange = name => ({ target: { value } }) => {
        this.setState({
            category: {
                ...this.state.category,
                [name]: value
            }
        })
    };

    handleChangeCheckBox = name => event => {
        this.setState({
            category: {
                ...this.state.category,
                [name]: event.target.checked
            }
        })
    }
    

    handleSubmit = () => {
        const { category, createNew } = this.state;

        let newCategory = {
            initial: category.initial,
            name: category.name,
            active: category.active,
            createBy : category.createBy,
            modifyDate : category.modifyDate
        }

        if (createNew) {
            axios.post(config.url + '/categories', newCategory)
                .then(res => {
                    this.reloadCategoryData();
                    alert('User has been saved');
                })
                .catch((error) => {
                    alert(error)
                })
        } else {
            axios.put(config.url + '/categories/' + category._id , newCategory)
            .then(res => {
                this.reloadCategoryData();
                alert ('User has been saved');
            })
            .catch((error) => {
                alert(error)
            })

      
        }
    }

    handleEdit = (_id) => {
        const { categories } = this.state;
        const category = categories.find(u => u._id === _id);
        this.setState({
            editCategory: true,
            category: {
                _id: category._id,
                initial: category.initial,
                name: category.name,
                active: category.active,
                createDate: category.createDate,
                modifyDate: category.modifyDate
            }
        });
    }


    handleDelete = (_id) => {
        const { categories } = this.state;
        const category = categories.find(u => u._id === _id);
        // console.log(user);
        this.setState({
            deleteCategory: true,
            category: {
                _id: category._id,
                initial: category.initial,
                name: category.name,
                active: category.active,
                createDate: category.createDate,
                modifyDate: category.modifyDate
            }
        });
    }

    handleDeleteConfirm = () => {
        const { category } = this.state;
        axios.delete(config.url + '/categories/' + category._id)
            .then(res => {
                this.reloadCategoryData();
                alert ('User has been deleted');
            })
            .catch((error) => {
                alert(error);
            })
    }

    render() {
        const { categories, loading } = this.state;
        const { classes } = this.props;
        return (
            <div>
                <h3><center>List of Categories</center></h3>

                <CreateCategory createNew={this.state.createNew} handleToggle={this.handleToggle} handleClose={this.handleClose} handleChange={this.handleChange} handleSubmit={this.handleSubmit} 
                handleChangeCheckBox = {this.handleChangeCheckBox}
                category={this.state.category} />

                <EditCategory editCategory={this.state.editCategory} handleToggle={this.handleToggle} handleClose={this.handleClose} handleChange={this.handleChange} handleSubmit={this.handleSubmit} handleChangeCheckBox = {this.handleChangeCheckBox}  user={this.state.user} category={this.state.category} />

                <DeleteCategory deleteCategory={this.state.deleteCategory} handleChange={this.handleChange} handleDelete={this.handleDeleteConfirm} category={this.state.category} handleClose={this.handleClose}/>

                <CircularProgress className={classes.progress} style={{ visibility: (loading ? 'visible' : 'hidden') }} color="secondary" />

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Initial</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Active</TableCell>
                            <TableCell>Create Date</TableCell>
                            <TableCell>Modify Date</TableCell>
                            <TableCell>Edit</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories.map(n => {
                            return (
                                <TableRow key={n._id}>
                                    <TableCell component="th" scope="row">
                                        {n.initial}
                                    </TableCell>
                                    <TableCell>{n.name}</TableCell>
                                    <TableCell>
                                    <Checkbox checked= {n.active} value = "active"/>
                                    </TableCell>
                                    <TableCell>{n.createDate}</TableCell>
                                    <TableCell>{n.modifyDate}</TableCell>
                                    <TableCell>
                                        <Button onClick={() => this.handleEdit(n._id)} variant="contained" color="primary">Edit</Button>
                                    </TableCell>

                                    <TableCell>
                                        <Button onClick={() => this.handleDelete(n._id)} variant="contained" color="secondary">Delete</Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        )
    }
}


const styles = theme => ({
    progress: {
        position: 'absolute',
        alignSelf: 'center',
        top: '50%',
        left: '50%',
        alignItem: 'center'
    },
});

Categories.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Categories);