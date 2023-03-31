"use strict";

import React, { useCallback, useMemo, useRef, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, PermissionsAndroid } from 'react-native';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { getDistance, findNearest } from 'geolib';
import Geolocation from 'react-native-geolocation-service';

import NextStation from '../../components/nextStation';
import AllRoute from '../../components/allRoute';
import RailMap from '../../components/RailMap';

import stationInfo from '../../../data/station_info'
import stationLocation from '../../../data/station_location'

const Navigate = (props) => {
  /********************BottomSeet********************/
  const sheetRef = useRef(null);
  const snapPoints = useMemo(() => ["10%", "40%", "70%"], []);
  const [fullScreenMap, setFullScreenMap] = useState(false);
  const handleSheetChange = useCallback((index) => {
    if(index === 0) setFullScreenMap(true);
    else setFullScreenMap(false);
  }, []);
  /********************Geolocation********************/
  //Check if the user has allowed the app to use the location
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then(response => setHasLocationPermission(response))
  const beginingStation = props.route.params.routes[0].path[0][0]; 
  const [stationGPS, setStationGPS] = useState(beginingStation); //set the station code of the nearest station
  const [stationDistance, setStationDistance] = useState(false); //set the distance between the nearest station and the user
  const [stationInterchanges, setStationInterchanges] = useState([]); //set the station code of the nearest station

  // filter all station interchanges (on iOS)
  // const interchangeStation = [... new Set([].concat(...props.route.params.routes).map(obj => obj.path).flat().map(subarray => subarray[subarray.length-1]))];
  // console.log(interchangeStation)

  //filter for the latitude and longitude of the station in this path
  const filteredStation = stationLocation.filter(obj => [... new Set([].concat(...props.route.params.routes.map(obj => obj.path).flat()))].includes(obj.code));

  useEffect(() => {
    if(props.route.params.routes.length === 1) {
      let stopStation = [];
      for (let i = 0; i < props.route.params.routes[0].path.length; i++) {
        stopStation.push(props.route.params.routes[0].path[i][0]);
      }
      setStationInterchanges(stopStation);
    }
    else{
      setStationInterchanges([]);
    }
  }, [props.route.params.routes])

  const stationPath = props.route.params.stationPath;
  return (
    <SafeAreaView style={Styles.container}> 
    <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={Styles.header_view}/>
        <View style={Styles.navigation_view}>
          <NextStation 
            navigate={hasLocationPermission} 
            isNearestOnly={false}
            beginingStation={beginingStation}
            filteredStation={filteredStation}
            stationInterchanges={stationInterchanges}/>
        </View>
        
        <View style={{marginTop: fullScreenMap ? 0 : -80 }}>
          <RailMap 
            cannotClicked={true}
            oriStationCode={stationPath[0]}
            destStationCode={stationPath[stationPath.length-1]}
            itemsCode={stationPath.slice(1, stationPath.length - 1)}
            />
        </View>
        
          <BottomSheet 
            ref={sheetRef} 
            index={1} 
            snapPoints={snapPoints} 
            onChange={handleSheetChange} 
            overDragResistanceFactor={10}
            handleComponent={() => <></>}
            style={Styles.bottom_sheet}
            enableOverDrag={false}
            >
            <BottomSheetScrollView contentContainerStyle={Styles.content_bottom_sheet_scroll_view}>
              <AllRoute moreDetail={true} path={props.route.params.path} routes={props.route.params.routes}/>
            </BottomSheetScrollView>
          </BottomSheet> 
        </GestureHandlerRootView>
    </SafeAreaView>
    
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header_view: {
    zIndex:1,
    height: 120,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    backgroundColor: 'black',
    width: '100%'
  },
  navigation_view: {
    zIndex:1,
    height: 100,
    marginTop: -50,
    // position: 'absolute',
    // top: 10,
    // left: 0,
    // right: 0,
    paddingHorizontal: '5%',
    // marginTop: 60,
  },
  header_text:{
    color: 'white',
    fontSize: 24,
    fontFamily: 'LINESeedSans_A_Bd',
  },
  content_bottom_sheet_scroll_view: {
    backgroundColor: "white",
    paddingTop: 20,
    paddingBottom: 10
  },
  bottom_sheet: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 10,
  }
});

export default Navigate;
