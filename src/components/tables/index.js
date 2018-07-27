// import React from 'react';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// // import Createtable from './create';
// // import Edittable from './edit';
// // import Deletetable from './delete';
// import { Button } from '../../../node_modules/@material-ui/core';
// import { config } from '../configurations/config';
// import CircularProgress from '@material-ui/core/CircularProgress';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import axios from 'axios';
// import Checkbox from '@material-ui/core/Checkbox';


// class Tables extends React.Component {

//     tableModel =
//         {
//             _id: '',
//             code: '',
//             seat: '',
//             description: '',
//             activ : true,
//             createDate: '',
//             modifyDate: ''
//         }

//     constructor(props) {
//         super(props);
//         this.state = {
//             tables: [],
//             createNew: false,
//             edittable: false,
//             deletetable : false,
//             loading: true,
//             table: this.tableModel,
//         }
//     }

//     reloadTableData = () => {
//         axios.get(config.url + '/tables')
//         .then(res => {
//             this.setState({
//                 tables : res.data,
//                 createNew : false,
//                 edittable : false,
//                 deletetable : false, 
//                 table : this.tableModel,
//                 loading : false
//             })
//         })
//         .catch((error) => {
//             alert(error);
//         })
//     }

//     componentDidMout() {
//         this.reloadTableData();
//     }

//     //API connect ke cloud
//     componentDidMount() {
//         axios.get(config.url + '/tables')
//             .then(res => {
//                 this.setState({
//                     tables: res.data,
//                     loading: false
//                 })
//             })

//             .catch((error) => {
//                 alert(error)
//             })
//     }

//     //toggle
//     handleToggle = () => {
//         this.setState({
//             createNew: true,

//         });
//     }


//     //tutup
//     handleClose = () => {
//         this.setState({
//             createNew: false,
//             edittable: false,
//             deletetable: false,
//             table : this.tableModel
//         });
//     }
//     //bisa diketik
//     handleChange = name => ({ target: { value } }) => {
//         this.setState({
//             table: {
//                 ...this.state.table,
//                 [name]: value
//             }
//         })
//     };

//     handleChangeCheckBox = name => event => {
//         this.setState({
//             table: {
//                 ...this.state.table,
//                 [name]: event.target.checked
//             }
//         })
//     }
    

//     handleSubmit = () => {
//         const { table, createNew } = this.state;

//         let newTable = {
//             code: table.code,
//             seat: table.seat,
//             description: table.description,
//             active : table.active,
//             createBy : table.createBy,
//             modifyDate : table.modifyDate
//         }

//         if (createNew) {
//             axios.post(config.url + '/tables', newTable)
//                 .then(res => {
//                     this.reloadTableData();
//                     alert('User has been saved');
//                 })
//                 .catch((error) => {
//                     alert(error)
//                 })
//         } else {
//             axios.put(config.url + '/tables/' + table._id , newTable)
//             .then(res => {
//                 this.reloadTableData();
//                 alert ('User has been saved');
//             })
//             .catch((error) => {
//                 alert(error)
//             })

      
//         }
//     }

//     handleEdit = (_id) => {
//         const { tables } = this.state;
//         const table = tables.find(u => u._id === _id);
//         this.setState({
//             editTable: true,
//             table: {
//                 _id: table._id,
//                 code: table.code,
//                 seat: table.seat,
//                 description: table.description,
//                 active : table.active,
//                 createBy : table.createBy,
//                 modifyDate : table.modifyDate
//             }
//         });
//     }


//     handleDelete = (_id) => {
//         const { tables } = this.state;
//         const table = tables.find(u => u._id === _id);
//         // console.log(user);
//         this.setState({
//             deletetable: true,
//             table: {
//                 _id: table._id,
//                 code: table.code,
//                 seat: table.seat,
//                 description: table.description,
//                 active : table.active,
//                 createBy : table.createBy,
//                 modifyDate : table.modifyDate
//             }
//         });
//     }

//     handleDeleteConfirm = () => {
//         const { table } = this.state;
//         axios.delete(config.url + '/tables/' + table._id)
//             .then(res => {
//                 this.reloadTableData();
//                 alert ('User has been deleted');
//             })
//             .catch((error) => {
//                 alert(error);
//             })
//     }

//     render() {
//         const { tables, loading } = this.state;
//         const { classes } = this.props;
//         return (
//             <div>
//                 <h3><center>List of tables</center></h3>

//                 {/* <Createtable createNew={this.state.createNew} handleToggle={this.handleToggle} handleClose={this.handleClose} handleChange={this.handleChange} handleSubmit={this.handleSubmit} 
//                 handleChangeCheckBox = {this.handleChangeCheckBox}
//                 table={this.state.table} /> */}

//                 {/* <Edittable edittable={this.state.edittable} handleToggle={this.handleToggle} handleClose={this.handleClose} handleChange={this.handleChange} handleSubmit={this.handleSubmit} handleChangeCheckBox = {this.handleChangeCheckBox}  user={this.state.user} table={this.state.table} /> */}

//                 {/* <Deletetable deletetable={this.state.deletetable} handleChange={this.handleChange} handleDelete={this.handleDeleteConfirm} table={this.state.table} /> */}

//                 {/* <CircularProgress className={classes.progress} style={{ visibility: (loading ? 'visible' : 'hidden') }} color="secondary" /> */}

//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>Initial</TableCell>
//                             <TableCell>Name</TableCell>
//                             <TableCell>Active</TableCell>
//                             <TableCell>Create Date</TableCell>
//                             <TableCell>Modify Date</TableCell>
//                             <TableCell>Edit</TableCell>
//                             <TableCell>Delete</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {tables.map(n => {
//                             return (
//                                 <TableRow key={n._id}>
//                                     <TableCell component="th" scope="row">
//                                         {n.initial}
//                                     </TableCell>
//                                     <TableCell>{n.name}</TableCell>
//                                     <TableCell>
//                                     <Checkbox checked= {n.active} value = "active"/>
//                                     </TableCell>
//                                     <TableCell>{n.createDate}</TableCell>
//                                     <TableCell>{n.modifyDate}</TableCell>
//                                     <TableCell>
//                                         <Button onClick={() => this.handleEdit(n._id)} variant="contained" color="primary">Edit</Button>
//                                     </TableCell>

//                                     <TableCell>
//                                         <Button onClick={() => this.handleDelete(n._id)} variant="contained" color="secondary">Delete</Button>
//                                     </TableCell>
//                                 </TableRow>
//                             );
//                         })}
//                     </TableBody>
//                 </Table>
//             </div>
//         )
//     }
// }


// const styles = theme => ({
//     progress: {
//         position: 'absolute',
//         alignSelf: 'center',
//         top: '50%',
//         left: '50%',
//         alignItem: 'center'
//     },
// });

// Tables.propTypes = {
//     classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(Tables);