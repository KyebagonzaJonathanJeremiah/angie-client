import React, {Fragment} from 'react';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AppsIcon from '@material-ui/icons/Apps';
import PeopleIcon from '@material-ui/icons/People';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import SettingsIcon from '@material-ui/icons/Settings';
import HelpIcon from '@material-ui/icons/Help';
import { useHistory, useLocation } from 'react-router-dom'
import { localRoutes } from "../../data/constants";
import appLogo from "../../assets/cool.png";
import { navBackgroundColor } from "./styles";
import { createStyles, makeStyles, Theme, withStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import grey from '@material-ui/core/colors/grey';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import AssignmentIcon from '@material-ui/icons/Assignment';
import EventNoteIcon from '@material-ui/icons/EventNote';
import { appRoles} from "../../data/constants";
import { useSelector } from 'react-redux';
import { IState } from '../../data/types';
import { hasAnyRole } from '../../utils/userHelpers';

interface IProps {
}
const routes = [
    {
        name: "Dashboard",
        requiredRoles: [appRoles.roleCrmView, appRoles.roleAuthUserView, appRoles.roleAuthUserEdit, appRoles.roleAuthGroupView, appRoles.roleAuthGroupEdit, appRoles.roleTagView, appRoles.roleTagEdit, appRoles.roleGroupView, appRoles.roleGroupEdit, appRoles.roleCrmEdit, appRoles.roleVolunteer],
        route: localRoutes.dashboard,
        icon: AppsIcon
    },
    {
        name: "People",
        requiredRoles: [appRoles.roleCrmView, appRoles.roleAuthUserView, appRoles.roleAuthUserEdit, appRoles.roleAuthGroupView, appRoles.roleAuthGroupEdit, appRoles.roleTagView, appRoles.roleTagEdit, appRoles.roleGroupView, appRoles.roleGroupEdit, appRoles.roleCrmEdit],
        icon: PeopleIcon,
        items: [
            {
                name: "Contacts",
                route: localRoutes.contacts
            },
            {
                name: "Groups",
                route: localRoutes.groups
            },  
        ] 
    },
    {
        name: "Admin",
        requiredRoles: [appRoles.roleCrmView, appRoles.roleAuthUserView, appRoles.roleAuthUserEdit, appRoles.roleAuthGroupView, appRoles.roleAuthGroupEdit, appRoles.roleTagView, appRoles.roleTagEdit, appRoles.roleGroupView, appRoles.roleGroupEdit, appRoles.roleCrmEdit],
        route: localRoutes.settings,
        icon: SettingsIcon,
        items: [
            {
                name: "Users",
                route: localRoutes.users
            },
            {
                name: "Settings",
                route: localRoutes.settings
            },
        ]
    },
    {
        name: "Tasks",
        requiredRoles: [appRoles.roleCrmView, appRoles.roleAuthUserView, appRoles.roleAuthUserEdit, appRoles.roleAuthGroupView, appRoles.roleAuthGroupEdit, appRoles.roleTagView, appRoles.roleTagEdit, appRoles.roleGroupView, appRoles.roleGroupEdit, appRoles.roleCrmEdit],
        icon: PeopleIcon,
        items: [
            {
                name: "Add tasks",
                route: localRoutes.addTasks
            },
            {
                name: "View tasks",
                route: localRoutes.viewTasks
            }
        ]
    },
    // Beginning of Team Lead's menu items
    {
        name: "Volunteers",
        requiredRoles: [appRoles.roleCrmView, appRoles.roleAuthUserView, appRoles.roleAuthUserEdit, appRoles.roleAuthGroupView, appRoles.roleAuthGroupEdit, appRoles.roleTagView, appRoles.roleTagEdit, appRoles.roleGroupView, appRoles.roleGroupEdit, appRoles.roleCrmEdit],
        icon: EmojiPeopleIcon,
        items: [
            {
                name: "Add volunteers",
                route: localRoutes.addVolunteers
            },
            {
                name: "View volunteers",
                route: localRoutes.viewVolunteers
            }
        ]
    },
    {
        name: "Teamlead",
        requiredRoles: [appRoles.roleCrmView, appRoles.roleCrmEdit],
        icon: AssignmentIcon,
        items: [
            {
                name: "Teamlead Calendar",
                route: localRoutes.teamleadcalendar
            },
            {
                name: "View Assigned Tasks",
                route: localRoutes.assignedtasks
            }
        ]
    },
    {
        name: "Volunteer Calendar",
        requiredRoles: [appRoles.roleVolunteer],
        route: localRoutes.volcalendar,
        icon: EventNoteIcon
    },
    {
        name: "Help",
        requiredRoles: [appRoles.roleCrmView, appRoles.roleAuthUserView, appRoles.roleAuthUserEdit, appRoles.roleAuthGroupView, appRoles.roleAuthGroupEdit, appRoles.roleTagView, appRoles.roleTagEdit, appRoles.roleGroupView, appRoles.roleGroupEdit, appRoles.roleCrmEdit, appRoles.roleVolunteer],
        route: localRoutes.help,
        icon: HelpIcon
    }
]
const menBackgroundColor = grey[800]
const useStyles = makeStyles((theme: Theme) =>
    createStyles({

        logoHolder: {
            height: 140
        },
        logo: {
            [theme.breakpoints.only('xs')]: {
                height: 50,
                width: 'auto',
            },
            height: 58,
            width: 'auto',
        },
        whiteText: {
            color: 'white'
        },
        menuItem: {
            "&:hover": {
                backgroundColor: menBackgroundColor,
            }
        },
        nested: {
            paddingLeft: theme.spacing(4),
        },
    }),
);


const StyledListItem = withStyles({
    root: {
        "&$selected": {
            backgroundColor: menBackgroundColor
        }
    },
    selected: {}
})(ListItem)

const NavMenu = (props: any) => {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const [open, setOpen] = React.useState<any>({});

    const handleMenuClick = (name: string) => () => {
        const menuData = { ...open, [name]: !open[name] }
        setOpen(menuData);
    };

    const onClick = (path: string) => () => {
        const { onClose } = props
        history.push(path)
        if (onClose)
            onClose()
    }
    const pathMatches = (path: string, str: string) => path.indexOf(str) > -1
    const user = useSelector((state: IState) => state.core.user)
    const isSelected = (pathStr: string): boolean => {
        const { pathname } = location
        return pathMatches(pathname, pathStr)
    }
    return (
        <div style={{ backgroundColor: navBackgroundColor }}>
            <Grid className={classes.logoHolder}
                container
                spacing={0}
                alignContent='center'
                justify='center'>
                <img src={appLogo} alt="logo" className={classes.logo} />
            </Grid>
            <Divider />
            <List style={{ paddingTop: 0 }}>
                {
                    routes.map(it => {
                        if (it.requiredRoles && it.requiredRoles.length > 0 && hasAnyRole(user, it.requiredRoles)){    
                        const Icon = it.icon
                        if (it.items) {
                            return <Fragment key={it.name}>
                                <StyledListItem button onClick={handleMenuClick(it.name)}>
                                    <ListItemIcon>
                                        <Icon className={classes.whiteText} />
                                    </ListItemIcon>
                                    <ListItemText primary={it.name} className={classes.whiteText} />
                                    {open[it.name] ? <ExpandLess className={classes.whiteText} /> :
                                        <ExpandMore className={classes.whiteText} />}
                                </StyledListItem>
                                <Collapse in={open[it.name] || isSelected(it.name.toLocaleLowerCase())} timeout="auto"
                                          unmountOnExit>
                                    <List component="div" disablePadding>
                                        {
                                            it.items.map(ch => <StyledListItem
                                                button
                                                onClick={onClick(ch.route)}
                                                selected={isSelected(ch.route)}
                                                key={ch.name}
                                                className={classes.menuItem}
                                                classes={{
                                                    selected: classes.menuItem
                                                }}
                                            >
                                                <ListItemText inset primary={ch.name} className={classes.whiteText} />
                                            </StyledListItem>)
                                        }
                                    </List>
                                </Collapse>
                            </Fragment>
                        }
                        return <StyledListItem
                            button
                            onClick={onClick(it.route)}
                            selected={isSelected(it.route)}
                            key={it.name}
                            className={classes.menuItem}
                            classes={{
                                selected: classes.menuItem
                            }}
                        >
                            <ListItemIcon>
                                <Icon className={classes.whiteText} />
                            </ListItemIcon>
                            <ListItemText primary={it.name} className={classes.whiteText} />
                        </StyledListItem>
                        }
                    })
                }
            </List>
        </div>
    );
}


export default NavMenu;