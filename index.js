import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
// import App from './App';
// import Home from './Home';
import Router from './router';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Router);
