import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Create from './create';
import Edit from './edit';
import IconDelete from '@material-ui/icons/Delete'


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
            user: { userName: '', first: '', mid: '', last: '', email: '', phone: '', active: '' }
        }

    }
    //toggle
    handleToggle = () => {
        this.setState({
            createNew: !this.state.createNew
        })
    }
    //hapus data
    handleDelete = (n) => {
        this.state.users.splice(n,1);
        this.setState(this.state.users)
    }
    //tutup
    handleClose = () => {
        this.setState({
            createNew: !this.state.createNew
        })
    }
    //bisa 
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
        const { user } = this.state;

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

        let users = this.state.users;
        users.push(newUser);
        this.setState({
            createNew: false,
            user: { userName: '', first: '', mid: '', last: '', email: '', phone: '', active: '' },
            users: users
        })
    }



    render() {
        const users = this.state.users;

        return (
            <div>
                <h3>List Of Users</h3>
                <Create createNew={this.state.createNew} handleToggle={this.handleToggle} handleClose={this.handleClose} handleChange={this.handleChange} handleSubmit={this.handleSubmit} user={this.state.user} />
                <Table >
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
                                        <Edit createNew={this.state.createNew} handleToggle={this.handleToggle} handleClose={this.handleClose} handleChange={this.handleChange} handleSubmit={this.handleSubmit} user={this.state.user} /> 
                                        <IconDelete onClick = {() => this.handleDelete(users.indexOf(n))} />
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