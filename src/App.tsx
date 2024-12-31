import React from 'react';
import 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';

import {stores} from './store';
import AppRoute from './AppRoute';

export default function App() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <Provider store={stores}>
        <AppRoute />
      </Provider>
    </SafeAreaView>
  );
}
