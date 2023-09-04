import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,ImageBackground } from 'react-native';

import Routes from './src/routes';
import Header from './src/components/Header';
import Footer from './src/components/Footer';
export default function App() {

  return (
    <View style={styles.container}>
      
      {/* <Header /> */}
      <Routes />
      {/* <Footer /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    // alignItems: 'center',
    // justifyContent: 'center',
    // height: '100%',
  },

});
