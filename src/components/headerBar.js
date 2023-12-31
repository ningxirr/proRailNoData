"use strict";
import React from 'react';
import { StyleSheet, Text,  View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const HeaderBar = (props) => {
    return (
        <View style={{marginTop: 30}}>
            <View style = {Styles.header_navbar_view}>
                <TouchableOpacity style={{width: 25}} onPress={props.backIconFunction}>
                  <Icon name='angle-left' color={'white'} size={25} />
                </TouchableOpacity>
                <TouchableOpacity style={{width: 30, alignItems: 'center'}} onPress={props.starIconFunction}>
                  <Icon name={props.isFavorite ? 'star': 'star-o' } color={props.isFavorite ? '#FF5733' : 'white'} size={20} />
                </TouchableOpacity> 
            </View>
            <View style={Styles.header_bar_view}>
                <Text style={Styles.header_bar_text}>
                    { props.selectedPath === 'fastest' ? 'Fastest' : props.selectedPath === 'cheapest' ? 'Cheapest' : 'Least Interchanges' } 
                </Text>
                {
                  props.resultPathLength-1 === 0 ? null :
                    <View style = {Styles.stop_view}>
                      <Text style = {Styles.stop_text}>
                          {props.resultPathLength-1} stop(s)
                      </Text>
                    </View>
                }
            </View>
        </View>
    );
};

const Styles = StyleSheet.create({
    header_navbar_view:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        paddingTop: 15,
        paddingBottom: 10,
        paddingHorizontal: 20
      },
      header_bar_view:{
        paddingVertical: 10,
        paddingBottom: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      header_bar_text:{
        color: 'white',
        fontSize: 24,
        fontFamily: 'LINESeedSansApp-Bold',
      },
      stop_view: {
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderColor: '#ffff',
        borderWidth: 1,
        borderRadius:15,
      },
      stop_text:{
        color:'white', 
        fontSize: 15, 
        textAlign:'center',
        fontFamily: 'LINESeedSansApp-Regular',
      },
});

export default HeaderBar;