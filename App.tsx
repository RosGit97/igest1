import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, SafeAreaView } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Routes from './src/routes';
import Header from './src/components/Header';
import Footer from './src/components/Footer';
export default function App() {

  
  return (


     
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" backgroundColor="#6a51ae"/>
        {/* <Header /> */}
        <Routes />
        {/* <Footer /> */}
      </SafeAreaView>
     

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    // alignItems: 'center',
    // justifyContent: 'center',
    // height: '100%',
    marginTop: '7%'
  },

});
