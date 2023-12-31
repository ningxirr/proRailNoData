"use strict";
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import Animated, { FadeIn, FadeOut, FadeInDown, FadeOutDown, FadeInUp } from 'react-native-reanimated';
import stationInfo from '../../data/station_info.json';
import Walking from './walking';
import BrieflyPathIcon from './brieflyPathIcon';
import PathIcon from './pathIcon'

function selectImage (platformLineID){
    if(platformLineID === '1' || platformLineID === '2' || platformLineID === '9')
        return require('../../assets/images/logo/bts.png');
    else if(platformLineID === '3' || platformLineID === '4')
        return require('../../assets/images/logo/mrt.png');
    else if(platformLineID === '5')
        return require('../../assets/images/logo/arl.png');
    else if(platformLineID === '10' || platformLineID === '11')
        return require('../../assets/images/logo/sretet.png');
}

const Route = (props) => {

    const [briefly, setBriefly] = useState(true);
    useEffect(() => {
        setBriefly(true);
      }, [props]);

    const handleSiamStation = (station, type, color) => {
        const stationList = props.route;
        if(station === 'CEN'){
            if(stationList.includes('N1') || stationList.includes('E1')) {
                if(type === 'light') return '#B3EE78';
                else return '#4CAF1D';
            }
            else if(stationList.includes('W1') || stationList.includes('S1')){
                if(type === 'light') return '#84C5C2';
                else return '#246B5B';
            }
        }
        return color;
    }
    return(   
        <View>
            {
                props.walk !== null ? 
                <View>
                    <Animated.View entering={FadeIn.duration(600)}>
                        {
                             props.haveToWalk ? 
                             <Walking 
                                time={Math.ceil(props.walk)} 
                                station={stationInfo[props.route[0]].station_name.en}/> : null
                        }
                    </Animated.View> 
                </View> : null
            }
            <TouchableOpacity onPress={() => {setBriefly(!briefly)}}>
                {
                    props.route[0] === props.route[props.route.length-1] ?
                    <Animated.View style={Styles.path_view} entering={FadeIn} exiting={FadeOut}>
                        <View style={Styles.path_with_image_view}>
                            <View style={[Styles.path_image_view]}>
                                <BrieflyPathIcon 
                                    color={'transparent'} 
                                    lightColor={stationInfo[props.route[0]].platform.color.path_light_color}
                                />
                            </View>
                            <View>
                                <Text style={Styles.briefly_path_en_text} numberOfLines={1}>
                                    {stationInfo[props.route[0]].station_name.en}
                                </Text>
                                <Text style={Styles.briefly_path_th_text} numberOfLines={1}>
                                    {stationInfo[props.route[0]].station_name.th}
                                </Text>
                            </View>
                            {
                                props.price === null ?
                                null:
                                <View style={Styles.price_component_view}>
                                    <Image source={selectImage(stationInfo[props.route[0]].platform_line_id)} resizeMode='contain' style={Styles.logo_image} />
                                    <View style={{marginLeft: 7}}>
                                        <Text style={Styles.price_text}>
                                            {Math.ceil(props.price)}
                                        </Text>
                                        <Text style={Styles.price_unit_text}>
                                            THB
                                        </Text>
                                    </View>
                                </View>
                            }
                        </View>
                    </Animated.View>:
                    briefly ?
                    /***************briefly***************/
                    <Animated.View style={Styles.path_view} entering={FadeIn} exiting={FadeOut}>
                        <View style={Styles.path_with_image_view}>
                            <View style={[Styles.path_image_view, {marginVertical: 1}]}>
                                <BrieflyPathIcon
                                    color={ handleSiamStation(props.route[0], 'dark', stationInfo[props.route[0]].platform.color.path_color) } 
                                    lightColor={ handleSiamStation(props.route[0], 'light', stationInfo[props.route[0]].platform.color.path_light_color) }
                                />
                            </View>
                            <View>
                                <Text style={Styles.briefly_path_en_text} numberOfLines={1}>
                                    {stationInfo[props.route[0]].station_name.en}
                                </Text>
                                <Text style={Styles.briefly_path_th_text} numberOfLines={1}>
                                    {stationInfo[props.route[0]].station_name.th}
                                </Text>
                            </View>    
                            {
                                props.price === null ?
                                null:
                                <View style={Styles.price_component_view}>
                                    <Image source={selectImage(stationInfo[props.route[0]].platform_line_id)} resizeMode='contain' style={Styles.logo_image} />
                                    <View style={{marginLeft: 7}}>
                                        <Text style={Styles.price_text}>
                                            {Math.ceil(props.price)}
                                        </Text>
                                        <Text style={Styles.price_unit_text}>
                                            THB
                                        </Text>
                                    </View>
                                </View>
                            }
                        </View>
                        <Animated.View style={Styles.path_with_image_view} entering={props.route.length === 2 ? FadeIn:FadeInDown} exiting={props.route.length === 2 ? FadeOut : FadeOutDown}>
                            <View style={[Styles.path_image_view, {marginVertical: 1, transform:[{rotateX: '180deg'}]}]}>
                                <BrieflyPathIcon 
                                    color={ handleSiamStation(props.route[props.route.length-1], 'dark', stationInfo[props.route[props.route.length-1]].platform.color.path_color) } 
                                    lightColor={ handleSiamStation(props.route[props.route.length-1], 'light', stationInfo[props.route[props.route.length-1]].platform.color.path_light_color) }
                                />
                            </View>
                            <View>
                                <Text style={Styles.briefly_path_en_text} numberOfLines={1}>
                                    {stationInfo[props.route[props.route.length-1]].station_name.en}
                                </Text>
                                <Text style={Styles.briefly_path_th_text} numberOfLines={1}>
                                    {stationInfo[props.route[props.route.length-1]].station_name.th}
                                </Text>
                            </View>
                        </Animated.View> 
                        {/* show more signal */}
                        {
                            props.route.length > 2 ?
                            <Animated.View style={{alignItems: 'center'}} entering={props.route.length === 2 ? FadeIn:FadeInDown} exiting={props.route.length === 2 ? FadeOut : FadeOutDown}> 
                                <Text style={{textAlign: 'center', fontFamily: 'LINESeedSansTHApp-Regular', fontSize: 12, color: 'grey'}}>
                                    Show More
                                </Text> 
                            </Animated.View>:null
                        }
                        
                    </Animated.View> : 
                    /***************full***************/
                    <Animated.View style={Styles.container_view} entering={FadeIn}>
                        <View>
                            {
                                props.route.map((station, index) => (
                                    <View key={index} style={Styles.path_with_image_view}>
                                        {
                                            index === 0 || index === props.route.length-1 ? 
                                            <Animated.View entering={index===0 ? null: props.route.length === 2 ? FadeIn: FadeInUp} >
                                                <View style={[Styles.path_image_view, {marginTop: 0}, index === props.route.length-1 ? {transform:[{rotateX: '180deg'}]}: null]}>
                                                    <PathIcon
                                                        isHeader={true}
                                                        color={ handleSiamStation(station, 'dark', stationInfo[props.route[index]].platform.color.path_color) } 
                                                        lightColor={ handleSiamStation(station, 'light', stationInfo[props.route[index]].platform.color.path_light_color) }
                                                    />
                                                </View>
                                                
                                            </Animated.View>
                                            :
                                            <Animated.View entering={props.route.length === 2 ? FadeIn: FadeInUp}>
                                                <View style={Styles.path_image_view} >
                                                    <PathIcon
                                                        isHeader={false}
                                                        color={ handleSiamStation(station, 'dark', stationInfo[props.route[index]].platform.color.path_color) } 
                                                        lightColor={ handleSiamStation(station, 'light', stationInfo[props.route[index]].platform.color.path_light_color) }
                                                    />
                                                </View>
                                            </Animated.View>
                                        }
                                        <Animated.View entering={index===0 ? null: props.route.length === 2 ? FadeIn: FadeInUp} >
                                            <Text style={Styles.briefly_path_en_text} numberOfLines={1}>
                                                {stationInfo[station].station_name.en}
                                            </Text>
                                            <Text style={Styles.briefly_path_th_text}>
                                                {stationInfo[station].station_name.th}
                                            </Text>
                                        </Animated.View>
                                    </View>
                                ))
                            }
                            
                            {
                                props.price === null ?
                                null:
                                <View style={Styles.price_component_view}>
                                    <Image source={selectImage(stationInfo[props.route[0]].platform_line_id)} resizeMode='contain' style={Styles.logo_image} />
                                    <View style={{marginLeft: 7}}>
                                        <Text style={Styles.price_text}>
                                            {Math.ceil(props.price)}
                                        </Text>
                                        <Text style={Styles.price_unit_text}>
                                            THB
                                        </Text>
                                    </View>
                                </View>
                            }
                           
                        </View>
                    
                    </Animated.View>
                }
            </TouchableOpacity>
        </View>
    );
}

const Styles = StyleSheet.create({
    path_view: {
        flex: 1,
        paddingVertical: 10,
        marginVertical: 5,
        borderColor: '#CCCCCC',
        borderWidth: 1,
        borderRadius: 10,
    },
    path_with_image_view: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    path_image_view:{
        marginLeft: 30
    },
    briefly_path_en_text: {
        marginLeft: 40,
        fontSize: 14,
        color: 'black',
        fontFamily: 'LINESeedSansApp-Bold',
        width: 200
    },
    briefly_path_th_text: {
        marginLeft: 40,
        fontSize: 12,
        color: 'black',
        fontFamily: 'LINESeedSansTHApp-Regular',
    },
    container_view: {
        paddingVertical: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 10,
    },
    price_text:{
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'LINESeedSansApp-Regular',
        color: 'black',
    },
    price_unit_text:{
        textAlign: 'center',
        fontSize: 10,
        fontFamily: 'LINESeedSansApp-Regular',
        color: 'black',
    },
    price_component_view: {
        position: 'absolute',
        right: 10,
        top: 5,
        flexDirection: 'row',
    },
    logo_image:{
        width: 25,
        height: 25,
    }
});

export default Route;