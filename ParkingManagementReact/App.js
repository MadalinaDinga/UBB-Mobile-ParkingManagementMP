import React, {Component} from 'react';
import {
    StackNavigator,
    TabNavigator,
    DrawerNavigator,
} from 'react-navigation';
import RequestListScreen from "./src/screens/RequestList";
import CreateRequest from "./src/screens/CreateRequest";
import {Login} from "./src/authentication/Login";
import DetailsRequest from "./src/screens/DetailsRequest";
import ChartsScreen from "./src/screens/Charts";

const mapNavigationStateParamsToProps = (MyComponent) => {
    return class extends Component {
        render() {
            const {navigation: {state: {params}}} = this.props;
            return <MyComponent {...params}  requestsList="ceva" {...this.props} />
        }
    }
};

// //used to set up a screen with several tabs
// const MainScreenNavigator = TabNavigator({
//     'Requests': {screen: RequestListScreen},
//     'Create Request': {screen: CreateRequest},
//     // 'Login': {screen: Login},
// });

//used to set up a screen with several tabs
const NormalUserScreenNavigator = TabNavigator({
    'Requests': {screen: RequestListScreen},
    'Create Request': {screen: mapNavigationStateParamsToProps(CreateRequest)},
});
const AdminScreenNavigator = TabNavigator({
    'Requests': {screen: RequestListScreen},
    'Create Request': {screen: mapNavigationStateParamsToProps(CreateRequest)},
    'Statistics': {screen: ChartsScreen},
});

//provides a way for your app to transition between screens where each new screen is placed on top of a stack
//when you register a component with a navigator that component will then have a navigation prop added to it.
//this navigation prop drives how we use move between different screens.
const MainApp = StackNavigator({
    Home: {
        screen: Login,
        navigationOptions: ({navigation}) => ({
            title: `Login`,
            path: 'login/',
        }),
    },

    // MainScreenNavigator: {
    //     screen: MainScreenNavigator,
    //     navigationOptions: {
    //         title: 'Parking System',
    //         path: 'mainScreenNavigator/'
    //     },
    // },

    // tab navigator for normal auth users
    NormalUserScreenNavigator: {
        screen: NormalUserScreenNavigator,
        navigationOptions: {
            title: 'Parking System',
            path: 'normalUserScreenNavigator/'
        },
    },

    // tab navigator for admin users
    AdminScreenNavigator: {
        screen: AdminScreenNavigator,
        navigationOptions: {
            title: 'Parking System',
            path: 'adminScreenNavigator/'
        },
    },

    Details: {
        screen: DetailsRequest,
        navigationOptions: ({navigation}) => ({
            title: `View Request`,
            path: 'request/:id',
        }),
    },
});

export default class App extends Component {
    render() {
        return (
            <MainApp/>
        );
    }
}
