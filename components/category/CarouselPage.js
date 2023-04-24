import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import Video from 'react-native-video';

const CarouselPage = ({ data }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const updatedData = await Promise.all(
        data.map(async (item) => {
          if (item.type === 'video') {
            const blob = await fetch(item.videos).then((res) => res.blob());
            const url = URL.createObjectURL(blob);
            return { ...item, src: url };
          } else {
            return item;
          }
        })
      );

      setVideos(updatedData);
    };

    fetchVideos();
  }, [data]);

  return (
    <Swiper style={styles.wrapper}>
      {videos.map((item, index) => {
        if (item.type === 'video') {
          return (
            <View style={styles.slide} key={index}>
              <Video source={{ uri: item.videos }} style={styles.video} />
            </View>
          );
        } else {
          return null;
        }
      })}
    </Swiper>
  );
};

export default CarouselPage;

const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    
    resizeMode: 'cover',
  },
  video: {
    width: 100,
    height: 100,
  },
});
