import React from "react";
import { View, Image, StyleSheet, ScrollView } from "react-native";
import { Icon } from "../assets/icon";
import {
  IconButton,
  MainLayout,
  MovieTitleDetail,
  Typography,
} from "../components";
import Poster1 from "../assets/mock/poster-1.jpg";
import Cast1 from "../assets/mock/cast-1.jpg";
import Cast2 from "../assets/mock/cast-2.jpg";
import Cast3 from "../assets/mock/cast-3.jpg";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
  },
  controls: {
    flexDirection: "row",
    marginTop: 10,
  },
  carouselContainer: {
    width: "100%",
  },
  titleDetail: {
    marginHorizontal: 40,
  },
  poster: {
    borderRadius: 20,
    height: 290,
    width: 195,
  },
  contentContainer: {
    marginTop: 30,
  },
  smallCard: {
    borderRadius: 15,
    overflow: "hidden",
    width: 108,
  },
  castContainer: {
    paddingLeft: 20,
    marginTop: 20,
    maxHeight: 150,
  },
});

const actors = [
  {
    name: "Louis village",
    img: Cast1,
  },
  {
    name: "Louis villagez",
    img: Cast2,
  },
  {
    name: "Louis villagee",
    img: Cast3,
  },
];

const ActorCard = (props) => {
  const { img, name, style } = props;

  return (
    <View style={{ ...styles.smallCard, ...style, backgroundColor: "#22232D" }}>
      <Image
        source={img}
        style={{ height: "75%", resizeMode: "cover", width: "100%" }}
        progressiveRenderingEnabled
      />
      <View
        style={{
          alignItems: "center",
          height: "25%",
          justifyContent: "center",
        }}
      >
        <Typography variant="textSmall">{name}</Typography>
      </View>
    </View>
  );
};

const MovieDetail = () => {
  return (
    <ScrollView showsHorizontalScrollIndicator={false}>
      <MainLayout>
        <View style={styles.container}>
          <Image style={styles.poster} source={Poster1} />
          <View style={styles.controls}>
            <IconButton icon={<Icon name="movie-open-check" size={22} />} />
            <MovieTitleDetail
              align="center"
              title="Dredd"
              releaseYear="2021"
              genres={["Action", "Crime"]}
              style={styles.titleDetail}
            />
            <IconButton icon={<Icon name="checkbox-plus" size={22} />} />
          </View>
        </View>
        <View style={styles.contentContainer}>
          <View>
            <Typography variant="subtitle">Description</Typography>
            <Typography variant="body" style={{ marginTop: 10 }}>
              In a violent, futuristic city where the police have the authority
              to act as judge, jury and executioner, a cop teams with a trainee
              to take down a gang that deals the reality-altering drug, SLO-MO.
            </Typography>
          </View>
          <View
            style={{
              marginTop: 10,
            }}
          >
            <Typography variant="subtitle">Cast</Typography>
          </View>
        </View>
      </MainLayout>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.castContainer}
      >
        {actors.map((actor, i) => (
          <ActorCard
            key={actor.name}
            {...actor}
            style={{ marginLeft: i !== 0 ? 30 : 0 }}
          />
        ))}
      </ScrollView>
    </ScrollView>
  );
};

export default MovieDetail;
