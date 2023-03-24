import React from 'react';
import {Dimensions, View, Image} from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import {useState} from 'react';
import SelectedStationModal from './SelectedStationModal';
import StationInfo from '../../data/station_info.json';

const image = require('../../assets/images/railmap2.jpg');
const oriMarkPic = require('../../assets/images/oriMark.png');
const destMarkPic = require('../../assets/images/destMark.png');
const stopMarkPic = require('../../assets/images/stopMark.png');
const {width} = Dimensions.get('window');

const RailMap = ({oriStationCode, destStationCode, itemsCode, cannotClicked}) => {
  const ratioTransform = 3.30527928;
  const [scale, setScale] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCode, setSelectedCode] = useState(0);

  const imageMarkSize = 10;
  const imageMarkReScaleX = 3.275;
  const imageMarkReScaleY = 3.3;

  function between(key, transX, transY, err) {
    const filterIn =
      StationInfo[key].imageCoordinate.coor_x >= transX - err &&
      StationInfo[key].imageCoordinate.coor_x <= transX + err &&
      StationInfo[key].imageCoordinate.coor_y >= transY - err &&
      StationInfo[key].imageCoordinate.coor_y <= transY + err;
    return filterIn;
  }

  function handleClick(e) {
    const transLocationX = e.locationX * ratioTransform;
    const transLocationY = e.locationY * ratioTransform;

    console.log(e.locationX, e.locationY);

    const matchingKeys = Object.keys(StationInfo).filter(key => {
      return between(key, transLocationX, transLocationY, 12);
    });

    if (matchingKeys[0] != undefined) {
      setSelectedCode(matchingKeys[0]);
      setModalVisible(true);
    }
  }

  function isShowOriMark() {
    return oriStationCode != null;
  }

  function isShowDestMark() {
    return destStationCode != null;
  }

  function isItemsCodeZero() {
    return itemsCode != undefined && itemsCode[0] != undefined;
  }

  function isItemsCodeOne() {
    return itemsCode != undefined && itemsCode[1] != undefined;
  }

  function isItemsCodeTwo() {
    return itemsCode != undefined && itemsCode[2] != undefined;
  }

  const markPicFitWithMap = station => {
    const markLocation = [];
    markLocation[0] =
      StationInfo[station].imageCoordinate.coor_x / imageMarkReScaleX -
      imageMarkSize / 2;
    markLocation[1] =
      StationInfo[station].imageCoordinate.coor_y / imageMarkReScaleY -
      imageMarkSize / 2 -
      100;
    return markLocation;
  };

  return (
    <View>
      {
        cannotClicked ? 
        <SelectedStationModal
          code={selectedCode}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />:null
      }
      
      <View style={{position: 'relative'}}>
        <ImageZoom
          cropWidth={width}
          cropHeight={600}
          panToMove={true}
          imageHeight={600}
          imageWidth={600}
          onMove={e => setScale(e.scale)}
          onClick={handleClick}>
          <View style={{position: 'relative'}}>
            <Image
              style={{
                width: 600,
                height: 600,
                marginTop: -100,
              }}
              source={image}
              resizeMode="contain"
            />
            <View style={{position: 'absolute'}}>
              {isShowOriMark() && (
                <View
                  style={{
                    left: markPicFitWithMap(oriStationCode)[0],
                    top: markPicFitWithMap(oriStationCode)[1],
                  }}>
                  <Image
                    style={{
                      width: imageMarkSize,
                      height: imageMarkSize,
                    }}
                    source={oriMarkPic}
                    resizeMode="contain"
                  />
                </View>
              )}
            </View>
            <View style={{position: 'absolute'}}>
              {isShowDestMark() && (
                <View
                  style={{
                    left: markPicFitWithMap(destStationCode)[0],
                    top: markPicFitWithMap(destStationCode)[1],
                  }}>
                  <Image
                    style={{
                      width: imageMarkSize,
                      height: imageMarkSize,
                    }}
                    source={destMarkPic}
                    resizeMode="contain"
                  />
                </View>
              )}
            </View>

            <View style={{position: 'absolute'}}>
              {isItemsCodeZero() && (
                <View
                  style={{
                    left: markPicFitWithMap(itemsCode[0])[0],
                    top: markPicFitWithMap(itemsCode[0])[1],
                  }}>
                  <Image
                    style={{
                      width: imageMarkSize,
                      height: imageMarkSize,
                    }}
                    source={stopMarkPic}
                    resizeMode="contain"
                  />
                </View>
              )}
            </View>

            <View style={{position: 'absolute'}}>
              {isItemsCodeOne() && (
                <View
                  style={{
                    left: markPicFitWithMap(itemsCode[1])[0],
                    top: markPicFitWithMap(itemsCode[1])[1],
                  }}>
                  <Image
                    style={{
                      width: imageMarkSize,
                      height: imageMarkSize,
                    }}
                    source={stopMarkPic}
                    resizeMode="contain"
                  />
                </View>
              )}
            </View>

            <View style={{position: 'absolute'}}>
              {isItemsCodeTwo() && (
                <View
                  style={{
                    left: markPicFitWithMap(itemsCode[2])[0],
                    top: markPicFitWithMap(itemsCode[2])[1],
                  }}>
                  <Image
                    style={{
                      width: imageMarkSize,
                      height: imageMarkSize,
                    }}
                    source={stopMarkPic}
                    resizeMode="contain"
                  />
                </View>
              )}
            </View>
          </View>
        </ImageZoom>
      </View>
    </View>
  );
};

export default RailMap;
