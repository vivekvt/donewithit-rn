import React from "react";
import { StyleSheet, View, FlatList } from "react-native";

import Screen from "../components/Screen";
import ListItem from "../components/lists/ListItem";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import colors from "../config/colors";
import Icon from "../components/Icon";

const menuItem = [
  {
    title: "My Listings",
    icon: { name: "format-list-bulleted", backgroundColor: colors.primary },
  },
  {
    title: "My Messages",
    icon: { name: "email", backgroundColor: colors.secondary },
  },
];

const AccountScreen = () => (
  <Screen style={styles.screen}>
    <View style={styles.container}>
      <ListItem
        title="Vivek VT"
        subTitle="contactvivekvt@gmail.com"
        image={require("../assets/mosh.jpg")}
      />
    </View>
    <View style={styles.container}>
      <FlatList
        data={menuItem}
        keyExtractor={(menuItem) => menuItem.title}
        ItemSeparatorComponent={ListItemSeparator}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            IconComponent={
              <Icon
                backgroundColor={item.icon.backgroundColor}
                name={item.icon.name}
              />
            }
          />
        )}
      />
    </View>
    <ListItem
      title="Log Out"
      IconComponent={<Icon backgroundColor="#ffe66d" name="logout" />}
    />
  </Screen>
);

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  screen: {
    backgroundColor: colors.light,
  },
});

export default AccountScreen;
