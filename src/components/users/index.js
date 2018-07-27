import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CreateUser from './create';
import Edit from './edit';
import DeleteUser from './delete';
import { Button } from '../../../node_modules/@material-ui/core';
import { config } from '../configurations/config';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';



class Users extends React.Component {

    userModel = 
    {
        _id: '',
        userName: '',
        first: '', 
        mid: '',
        last: '',
        email: '',
        phone: '',
        active: true
    }


    constructor(props) {
        super(props);
        this.state = {
            users: [],
            createNew: false,
            editUser: false,
            deletUser: false,
            loading: true,
            user: this.userModel
        }
    }

    reloadUserData = () => {
        axios.get(config.url + '/users')
        .then(res => {
            this.setState({
                users : res.data,
                createNew : false,
                editUser : false,
                deleteUser : false, 
                user : this.userModel,
                loading : false
            })
        })
        .catch((error) => {
            alert(error);
        })
    }

    componentDidMout(){
        this.reloadUserData();
    }

    //API connect ke cloud
    componentDidMount() {
        axios.get(config.url + '/users')
            .then(res => {
                this.setState({
                    users: res.data,
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
            createNew: true
        })
    }


    //tutup
    handleClose = () => {
        this.setState({
            createNew: false,
            editUser: false,
            deleteUser: false,
            user: this.userModel
        })
    }
    //bisa diketik
    handleChange = name => ({ target: { value } }) => {
        this.setState({
            user: {
                ...this.state.user,
                [name]: value
            }
        })
    }

    handleChangeCheckBox = name => event => {
        this.setState({
            user: {
                ...this.state.user,
                [name]: event.target.checked
            }
        })
    }

    //submit data

    handleSubmit = () => {
        const { user, createNew } = this.state;
        let newUser =
        {
         
            userName: user.userName,
            name: {
                first: user.first,
                mid: user.mid,
                last: user.last
            },
            email: user.email,
            phone: user.phone,
            active: user.active
        }

        if (createNew) {
            axios.post(config.url + '/users', newUser)
                .then(res => {
                    this.reloadUserData();
                    alert('User has been saved');
                })
                .catch((error) => {
                    alert(error)
                })


        } else {
            axios.put(config.url + '/users/' + user._id , newUser)
            .then(res => {
                this.reloadUserData();
                alert ('User has been saved');
            })
            .catch((error) => {
                alert(error)
            })

      
        }
    }

    handleEdit = (_id) => {
        const { users } = this.state;
        const user = users.find(u => u._id === _id);
        // console.log(user);
        this.setState({
            editUser: true,
            user: {
                _id: user._id,
                userName: user.userName,
                first: user.name.first,
                mid: user.name.mid,
                last: user.name.last,
                email: user.email,
                phone: user.phone,
                active: user.active
            }
        })
    }
    //hapus data
    handleDelete = (_id) => {
        const { users } = this.state;
        const user = users.find(u => u._id === _id);
        this.setState({
            deleteUser: true,
            user: {
                _id: user._id,
                userName: user.userName,
                first: user.name.first,
                mid: user.name.mid,
                last: user.name.last,
                email: user.email,
                phone: user.phone,
                active: user.active
            }
        })
    }

    handleDeleteConfirm = () => {
        const { user } = this.state;
        axios.delete(config.url + '/users/' + user._id )
        .then(res => {
            this.reloadUserData();
            alert ('User has been deleted');
        })
        .catch((error) => {
            alert(error)
        })
    
    }

    render() {
        const { users, loading } = this.state;
        const { classes } = this.props;

        return (
            <div>
                <h3><center>List Of Users</center></h3>

                <CreateUser createNew={this.state.createNew} handleToggle={this.handleToggle} handleClose={this.handleClose} handleChange={this.handleChange} handleSubmit={this.handleSubmit} handleChangeCheckBox = {this.handleChangeCheckBox} user={this.state.user} />

                <Edit editUser={this.state.editUser} handleToggle={this.handleToggle} handleClose={this.handleClose} handleChange={this.handleChange} handleSubmit={this.handleSubmit} handleChangeCheckBox = {this.handleChangeCheckBox}  user={this.state.user} />

                <DeleteUser deleteUser={this.state.deleteUser} handleClose={this.handleClose} handleDelete={this.handleDeleteConfirm} handleChangeCheckBox = {this.handleChangeCheckBox}  user={this.state.user} />

                <CircularProgress className={classes.progress} style={{ visibility: (loading ? 'visible' : 'hidden') }} color="secondary" />

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Username</TableCell>
                            <TableCell >Name</TableCell>
                            <TableCell >Email </TableCell>
                            <TableCell >Phones </TableCell>
                            <TableCell >Active </TableCell>
                            <TableCell >Action </TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map(n => {
                            return (
                                <TableRow key={n._id}>
                                    <TableCell component="th" scope="row">
                                        {n.userName}
                                    </TableCell>
                                    <TableCell>{(n.name.first ? n.name.first + " " : "") +
                                        (n.name.mid ? n.name.mid + " " : "") +
                                        (n.name.last ? n.name.last + " " : "")}</TableCell>
                                    <TableCell>{n.email}</TableCell>
                                    <TableCell>{n.phone}</TableCell>
                                    <TableCell>
                                    {/* {n.active} */}
                                    <Checkbox checked= {n.active} value = "active"/>
                                    </TableCell>
                                    <TableCell>
                                        <Button onClick={() => this.handleEdit(n._id)} variant="contained" color="primary"> Edit</Button>
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
    },
});

Users.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Users);