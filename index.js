import { AppRegistry } from 'react-native';
import firebase from '@react-native-firebase/app';

import App from './src/App';
import { name as appName } from './app.json';

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyBTe5epjVWVWY5IU-5At7F7lRSSi4OPV1Q',
    appId: '1:289859620402:android:035db313007d39fe11b62b',
    projectId: 'myapp-8f5ba',
    databaseURL: 'https://myapp-8f5ba-default-rtdb.firebaseio.com/',
    storageBucket: 'gs://myapp-8f5ba.appspot.com',
    messagingSenderId: '289859620402',
  });
}

AppRegistry.registerComponent(appName, () => App);
