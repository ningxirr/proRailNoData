import React from 'react';
import {StyleSheet, TextInput, View, Keyboard} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const SearchBar = ({clicked, searchPhrase, setSearchPhrase, setClicked}) => {
  return (
    <View style={styles.searchBarView}>
      <FontAwesomeIcon name="search" size={18} color='grey' style={{ marginLeft: 2 }}/>
      <TextInput
        placeholderTextColor='grey'
        style={styles.searchText}
        placeholder="Search"
        value={searchPhrase}
        onChangeText={setSearchPhrase}
        onFocus={() => {
          setClicked(true);
        }}
      />
      {clicked && (
          <Entypo
            name="cross"
            size={25}
            color="grey"
            onPress={() => {
              Keyboard.dismiss();
              setClicked(false);
              setSearchPhrase('');
            }}
          />
      )}
    </View>
  );
};
export default SearchBar;

const styles = StyleSheet.create({
  searchBarView: {
    color: 'grey',
    paddingHorizontal: (10),
    height: 45,
    flexDirection: 'row',
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    alignItems: 'center',
    shadowOpacity: 0.08,
    shadowColor: "#000",
    shadowOffset: { //for ios
        width: 0,
        height: 6,
    },
    shadowRadius: 6, //for ios
    elevation: 3, //for android
  },
  searchText: {
    fontSize: 15,
    marginLeft: (10),
    width: '85%',
    color: 'black',
    fontFamily: 'LINESeedSansApp-Regular',
  },
});
