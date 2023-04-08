import React from "react";
import { Button, TouchableHighlight, View } from "react-native";
import { MainLayout, Typography } from "../components";
import { ScrollView } from "react-native-gesture-handler";
import TMDB_LOGO from "../assets/tmdb-logo.svg";
import * as Linking from "expo-linking";

const AboutMovieData = ({ navigation }) => {
  const openTMDBWebsite = () => {
    Linking.openURL("https://www.themoviedb.org/");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <MainLayout>
        <View>
          <Typography variant="title" style={{ marginBottom: 10 }}>
            Movie Data
          </Typography>
          <Typography variant="text">
            All film-related metadata used in Movielog, including actor,
            director and studio names, synopses, release dates, trailers and
            poster art is supplied by The Movie Database (TMDb).
          </Typography>
          <View>
            <TouchableHighlight
              onPress={openTMDBWebsite}
              style={{width:150,marginTop:20 }}
            >
                <TMDB_LOGO width={150} height={100}  />
            </TouchableHighlight>
          </View>
        </View>
      </MainLayout>
    </ScrollView>
  );
};

export default AboutMovieData;
