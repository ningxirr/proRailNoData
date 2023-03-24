import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ImageBackground, TouchableOpacity, ScrollView, Dimensions} from 'react-native';
import stationInfo from '../../../data/station_info.json';
import NextStation from '../../components/nextStation';
import AlertModel from '../../components/AlertModel';
import StationWithCode from '../../components/stationWithCode'

const {width, height} = Dimensions.get('window');
const image = require('../../../assets/images/choose-direction.png');

const HomeProRailScreen = ({route, navigation}) => {
  const [oriStation, setOriStation] = useState(null);
  const [destStation, setDestStation] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  function checkCollectStation() {
    if (oriStation == null || destStation == null) {
      setModalVisible(true);
    } else {
      navigation.navigate({
        name: 'ResultScreen',
        params: {
          code: [oriStation, destStation],
        },
      });
    }
  }

  useEffect(() => {
    if (route.params?.num == 0) {
      setOriStation(route.params?.code);
    } else {
      setDestStation(route.params?.code);
    }
  }, [route.params]);

  return (
    <View style={{backgroundColor: '#F5F5F5', flex: 1}}>
      <AlertModel
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <ScrollView style={{flex: 1}}>
        <ImageBackground source={image} style={styles.image} resizeMode='cover'>
          <Text style={styles.proRailText}>proRail</Text>
        </ImageBackground>

        <View style={{marginTop: -height*0.3}}>
            <View style={{ marginHorizontal: '5%', marginVertical: 20}}>
              <NextStation navigate={true} navigateText={'Nearest\nStation'} stationName={'Khu Khot'} stationColor={'#71B047'} stationPlatform={'BTS'}/>
            </View>

            <View style={styles.chooseDirView}>
              <View style={{marginVertical: 20}}>
                <Text style={styles.chooseDirText}>{'Choose\nDirection'}</Text>
              </View>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <TouchableOpacity
                  style={styles.choseStTouch}
                  onPress={() => {
                    console.log('destStation '+destStation)
                    navigation.navigate('ChooseDirectionScreen', {
                      header: 'Choose Origin',
                      num: 0,
                      notSelectedStation: [destStation]
                    });
                  }}>
                  {
                    oriStation == null ? 
                    <Text style={styles.choseStText}>Origin</Text>:
                    <StationWithCode code={oriStation}/>
                  }
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.choseStTouch}
                  onPress={() => {
                    navigation.navigate('ChooseDirectionScreen', {
                      header: 'Choose Destination',
                      num: 1,
                      notSelectedStation: [oriStation]
                    });
                  }}>
                  {
                    destStation == null ? 
                    <Text style={styles.choseStText}>Destination</Text>:
                    <StationWithCode code={destStation}/>
                  }
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={styles.letsgoView}
              onPress={() => {
                checkCollectStation();
              }}>
              <Text style={styles.letsgoText}>Let's Go</Text>
            </TouchableOpacity>
          </View>

        <View style={{marginBottom: 20}}>
          <View style={styles.moreInfoSecView}>
            <Text style={styles.moreInfoText}>More Information</Text>
            <ScrollView horizontal={true} style={{marginLeft: 15}}>
              <TouchableOpacity style={styles.moreInfoInScrollTouch}>
                <Text style={styles.moreInfoInScrollText}>
                  {'SRT\nSchedule'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.moreInfoInScrollTouch}
                onPress={() => navigation.navigate('BTSFullScheduleScreen')}>
                <Text style={styles.moreInfoInScrollText}>
                  {'BTS\nSchedule'}
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  proRailText: {
    position: 'absolute',
    fontSize: 36,
    flex: 1,
    color: 'white',
    marginTop: 10,
    padding: 20,
    fontFamily: 'LINESeedSans_A_Bd',
  },
  centerSecView: {
    flex: 5,
    justifyContent: 'center',
  },
  moreInfoSecView: {
    flex: 2,
    marginTop: 15,
    justifyContent: 'center',
  },
  moreInfoInScrollTouch: {
    backgroundColor: '#F2F2F2',
    width: 180,
    height: 110,
    borderRadius: 10,
    justifyContent: 'flex-end',
    marginRight: 15,
  },
  moreInfoText: {
    fontSize: 24,
    color: 'black',
    marginLeft: 30,
    marginVertical: 5,
    fontFamily: 'LINESeedSans_A_Bd',
  },
  chooseDirView: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    height: 220,
  },
  chooseDirText: {
    fontSize: 24,
    color: 'black',
    marginLeft: 20,
    fontFamily: 'LINESeedSans_A_Bd',
    lineHeight: 30,
  },
  choseStTouch: {
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    marginHorizontal: 25,
    marginBottom: 20,
    height: 40,
    justifyContent: 'center',
  },
  letsgoView: {
    backgroundColor: 'black',
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  image: {
    height: height*0.6,
    width: width,
  },
  choseStText: {
    fontSize: 15,
    fontFamily: 'LINESeedSans_A_Rg',
    color: '#404040',
    paddingLeft: 10,
  },
  letsgoText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'LINESeedSans_A_Rg',
  },
  moreInfoInScrollText: {
    margin: 10,
    fontSize: 22,
    color: 'black',
    fontFamily: 'LINESeedSans_A_Rg',
    lineHeight: 30,
  },
});

export default HomeProRailScreen;
