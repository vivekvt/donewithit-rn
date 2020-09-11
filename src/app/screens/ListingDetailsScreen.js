import React from "react";
import { View, StyleSheet } from "react-native";
import { Image } from "react-native-expo-image-cache";
import AppText from "../components/AppText";

import colors from "../config/colors";
import ListItem from "../components/lists/ListItem";

const ListingDetailScreen = ({ route }) => {
  const listing = route.params;
  return (
    <View>
      <Image
        style={styles.image}
        tint="light"
        preview={{ uri: listing.images[0].thumnailUrl }}
        uri={listing.images[0].url}
      />
      <View style={styles.detailContainer}>
        <AppText style={styles.title}>{listing.title}</AppText>
        <AppText style={styles.price}>${listing.price}</AppText>
        <View style={styles.userContainer}>
          <ListItem
            image={require("../assets/mosh.jpg")}
            title="Vivek VT"
            subTitle="5 Listing"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  detailContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 300,
  },
  price: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
  },
  userContainer: {
    marginVertical: 30,
  },
});

export default ListingDetailScreen;
