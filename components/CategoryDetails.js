import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import tw from 'twrnc';
import { Ionicons, AntDesign, Octicons, FontAwesome5 } from '@expo/vector-icons';
import Carousel from 'react-native-snap-carousel';
import data from "../data";
import { useState } from 'react';


const CategoryDetails = ({ navigation }) => {

  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef(null);

  const renderItem = ({ item }) => {
    if (item.type === 'image') {
      return (
        <Image
          style={[styles.image, tw``]}
          source={{ uri: item.uri }}
        />
      );
    } else if (item.type === 'video') {
      return (
        <Video
          source={{ uri: item.uri }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          isLooping
          style={[styles.image, tw``]}
        />
      );
    }
  };


    return (
        <View style={tw``}>
            <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'left', padding: 4, marginLeft: 10 }}>Rent</Text>
            <FlatList
                data={data}
                Vertical
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('PostDetails')}>
                        <View style={[styles.card, tw`pb-8 pt--2 bg-gray-100 m-1 pl-2`]}>
                            <Carousel
                                ref={carouselRef}
                                data={item.media}
                                renderItem={renderItem}
                                sliderWidth={360}
                                itemWidth={360}
                                loop
                                autoplay
                                autoplayDelay={2000}
                                autoplayInterval={4000}
                                onSnapToItem={(index) => setActiveSlide(index)}
                            />
                            <View style={{
                                flexDirection: 'row',
                                marginLeft: 5,
                            }}>
                                <Text style={[styles.price, tw` pl-2 mt-2 font-bold`]}>{item.price}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <FontAwesome5 name="tape" size={12} color="#6495ED" style={{ marginLeft: 18, marginTop: 10, }} />
                                    <Text style={[styles.row, tw` pl-1 mt-2`]}>{item.size}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <FontAwesome5 name="circle-notch" size={12} color="#6495ED" style={{ marginLeft: 18, marginTop: 10 }} />
                                    <Text style={[styles.row, tw` pl-1 mt-2`]}>{item.status}</Text>
                                </View>


                            </View>
                            <View style={{

                                marginLeft: 5,

                            }}>
                                <Text style={tw` pl-2 mt-2 text-sm font-bold`}>{item.title}</Text>
                                <View styles={{ flexDirection: 'row' }}>
                                    <Octicons name="location" size={14} color="#45A76E" style={{ marginTop: 1, marginLeft: 8, }} />
                                    <Text style={[styles.row, tw` pl-5 mt--4`]}>{item.location}</Text>
                                </View>

                            </View>


                        </View>
                    </TouchableOpacity>

                )}
            />
        </View>
    )

}

export default CategoryDetails

const styles = StyleSheet.create({
    image: {
        width: 360,
        height: 220,
        resizeMode: 'contain',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    card: {
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,

    },
    row: {
        fontSize: 12,
        paddingLeft: 3,
    },
    price: {
        fontSize: 12,
    }
})