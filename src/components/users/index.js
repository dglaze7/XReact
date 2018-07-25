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



export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [
                {
                    "_id": "1",
                    "userName": "Doni",
                    "password": "DoniAja",
                    "email": "rama_doni17@ymail.commm",
                    "name": {
                        "first": "Ramadhoni",
                        "mid": "Suryo",
                        "last": "Suharto"
                    },
                    "phone": "08123123123",
                    "active": "1"

                },

                {
                    "_id": "2",
                    "userName": "Mbappe",
                    "password": "MbappeAja",
                    "email": "mbappeaja@yahoo.com",
                    "name": {
                        "first": "Kylian",
                        "mid": "M",
                        "last": "Mbappe"
                    },
                    "phone": "0812381283",
                    "active": "1"
                },

                {
                    "_id": "3",
                    "userName": "iningasal",
                    "password": "asalaja",
                    "email": "asalaja.com",
                    "name": {
                        "first": "Ngasal",
                        "mid": "M",
                        "last": "Com"
                    },
                    "phone": "53512421312",
                    "active": "1"
                },

            ],
            createNew: false,
            editUser: false,
            deletUser : false,
            user: { _id: 0, userName: '', first: '', mid: '', last: '', email: '', phone: '', active: '' }
        }

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
            createNew: false ,
            editUser : false,
            deleteUser : false,
            user: { _id: 0, userName: '', first: '', mid: '', last: '', email: '', phone: '', active: '' }
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
    //submit data

    handleSubmit = () => {
        const { user, users, createNew } = this.state;
        const newId = parseInt(users[users.length -1]._id) + 1;

        let newUser =
        {
            _id: createNew ? newId : user._id,
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

        if(createNew){
            users.push(newUser)
        }else{
            let idx = users.findIndex( u => u._id === newUser._id);
            users[idx] = newUser;
        }
        
        this.setState({
            createNew: false,
            editUser : false,
            user: { _id: 0, userName: '', first: '', mid: '', last: '', email: '', phone: '', active: '' },
            users: users
        })

        
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
        const {users , user} = this.state;
        let idx = users.findIndex(u => u._id === user._id)
        users.splice(idx,1);
        this.setState({
            deleteUser: false,
            user: { _id: 0, userName: '', first: '', mid: '', last: '', email: '', phone: '', active: '' }
        })

    }

    render() {
        const users = this.state.users;
        return (
            <div>
                <h3><center>List Of Users</center></h3>

                <CreateUser createNew={this.state.createNew} handleToggle={this.handleToggle} handleClose={this.handleClose} handleChange={this.handleChange} handleSubmit={this.handleSubmit} user={this.state.user} />

                <Edit editUser={this.state.editUser} handleToggle={this.handleToggle} handleClose={this.handleClose} handleChange={this.handleChange} handleSubmit={this.handleSubmit} user={this.state.user} />

                <DeleteUser deleteUser={this.state.deleteUser} handleClose={this.handleClose} handleDelete={this.handleDeleteConfirm} user={this.state.user} />

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
                                    <TableCell>{n.active}</TableCell>
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