import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

export default ({editUser, handleClose , handleChange, handleSubmit, user : {userName, first, mid, last, email, phone, active}}) => {
    return <Fragment>
        <Dialog
            open={editUser}
            onClose={handleClose}
        >
            <DialogTitle id="alert-dialog-title">{"Update User"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Please edit the data
            </DialogContentText>
            <form>
                <TextField label = 'User Name' value = {userName} onChange = {handleChange('userName')} margin = 'normal'/>
                &nbsp;
                <TextField label = 'First Name' value = {first} onChange = {handleChange('first')}  margin = 'normal'/>
                <br/>
                <TextField label = 'Mid Name' value = {mid} onChange = {handleChange('mid')} margin = 'normal'/>
                &nbsp;
                <TextField label = 'Last Name' value = {last} onChange = {handleChange('last')} margin = 'normal'/>
                <br/>
                <TextField label = 'Email' value = {email} onChange = {handleChange('email')} margin = 'normal'/>
                &nbsp;
                <TextField label = 'Phone' value = {phone} onChange = {handleChange('phone')} margin = 'normal'/>
                <br/>
                <TextField label = 'Active' value = {active} onChange = {handleChange('active')} margin = 'normal'/>
                &nbsp;
            </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
            </Button>
                <Button onClick={handleSubmit} color="primary" autoFocus>
                    Save
            </Button>
            </DialogActions>
        </Dialog>
    </Fragment>
}