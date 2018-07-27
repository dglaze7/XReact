import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Link, Route } from 'react-router-dom';
import { Home, Help } from '../content';
import HomeIcon from '@material-ui/icons/Home';
import HelpIcon from '@material-ui/icons/Help';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@material-ui/core/Divider';
import Users from '../users';
import Categories from '../categories' ;
import Tables from '../tables';

export default class SideBar extends React.Component {
    render() {
        const { classes, onSelected, showMenu } = this.props;
        return (
            <div>
                <Drawer variant='temporary' anchor='left' open={showMenu} onClick={() => onSelected()}>
                    <div className={classes.toolbar} >
                        <IconButton>
                            <ChevronLeftIcon />
                        </IconButton>
                        Menu
                    </div>
                    <Divider />
                    <List onClick={() => onSelected()}>
                        <ListItem className={classes.ListItem}><HomeIcon className={classes.MenuIcon} /><Link to="/home" className={classes.MenuList}>Home</Link></ListItem>

                        <ListItem className={classes.ListItem}><HomeIcon className={classes.MenuIcon} /><Link to="/users" className={classes.MenuList}>Users</Link></ListItem>

                        <ListItem className={classes.ListItem}><HelpIcon className={classes.MenuIcon} /><Link to="/categories" className={classes.MenuList}>Categories</Link></ListItem>

                        
                        <ListItem className={classes.ListItem}><HelpIcon className={classes.MenuIcon} /><Link to="/tables" className={classes.MenuList}>Tables</Link></ListItem>

                        <ListItem className={classes.ListItem}><HelpIcon className={classes.MenuIcon} /><Link to="/help" className={classes.MenuList}>Help</Link></ListItem>
                    </List>
                </Drawer>
                <Route exact path="/home" component={Home} />
                <Route exact path="/users" component={Users} />
                <Route exact path="/categories" component={Categories} />
                <Route exact path="/tables" component={Tables} />
                <Route exact path="/help" component={Help} />

            </div>
        )
    }
}