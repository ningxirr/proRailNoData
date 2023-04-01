import {View, Image, StyleSheet, SafeAreaView} from 'react-native';
import React from 'react';
import Header from '../../components/header';
import {ScrollView} from 'react-native-gesture-handler';

const image = require('../../../assets/images/ServiceTimetable.png');

const BTSFullScheduleScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex:1, backgroundColor: 'black'}}>
      <View style={{backgroundColor: '#FAFAFA', marginBottom: (65)}}>
      <Header haveBackIcon={true} title={'BTS Full Schedule'} function={()=>navigation.goBack()}/>
      <ScrollView>
        <View style={{margin: (10)}}>
          <View style={styles.imageView}>
            <Image source={image} style={styles.fullPicture} />
          </View>
        </View>
      </ScrollView>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fullPicture: {
    width: undefined,
    height: undefined,
    aspectRatio: 4.5 / 15,
  },
  imageView: {
    padding: 5,
    borderRadius: 20,
    backgroundColor: 'white',
    marginBottom: 30
  },
});

export default BTSFullScheduleScreen;
