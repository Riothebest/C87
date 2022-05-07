import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Platform,
    StatusBar,
    Image,
    ScrollView,
    Dimensions,
    TouchableOpacity
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";

import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};
export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          fontsLoaded: false,
          light_theme: true
        };
      }
    
      async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        
        this.setState({ fontsLoaded: true });
      }
      fetchUser = () => {
        let theme;
        firebase
          .database()
          .ref("/users/" + firebase.auth().currentUser.uid)
          .on("value", snapshot => {
            theme = snapshot.val().current_theme;
            this.setState({ light_theme: theme === "light" });
          });
      };
    
      componentDidMount() {
        this._loadFontsAsync();
        this.fetchUser()
      }
      render() {
        if (!this.props.route.params) {
          this.props.navigation.navigate("Home");
        } else if (!this.state.fontsLoaded) {
          return <AppLoading />;
        } else {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.droidSafeArea} />
                    <View style={styles.appTitle}>
                        <View style={styles.appIcon}>
                            <Image
                                source={require("../assets/logo.png")}
                                style={styles.iconImage}
                            ></Image>
                        </View>
                        <View style={styles.appTitleTextContainer}>
                            <Text style={styles.appTitleText}>Spectagram</Text>
                        </View>
                    </View>
                    <View style={styles.postContainer}>
                        <ScrollView style={styles.postCard}>
                            <Image
                                source={require("../assets/image_1.jpg")}
                                style={styles.image}
                            ></Image>

                            <View style={styles.dataContainer}>
                                <View style={styles.titleTextContainer}>
                                    <Text style={styles.storyTitleText}>
                                        {this.props.route.params.post.caption}
                                    </Text>
                                    <Text style={styles.storyAuthorText}>
                                        {this.props.route.params.post.author}
                                    </Text>
                                    <Text style={styles.storyAuthorText}>
                                        {this.props.route.params.post.created_on}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.actionContainer}>
                                <View style={styles.likeButton}>
                                    <Ionicons name={"heart"} size={RFValue(30)} color={"white"} />
                                    <Text style={styles.likeText}>12k</Text>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
      </View>
    );
  }}
}

const styles = StyleSheet.create({
 container: {
        flex: 1,
        backgroundColor: "#000000"
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
    },
    appTitle: {
        flex: 0.07,
        flexDirection: "row"
    },
    appIcon: {
        flex: 0.3,
        justifyContent: "center",
        alignItems: "center"
    },
    iconImage: {
        width: "100%",
        height: "100%",
        resizeMode: "contain"
    },
    appTitleTextContainer: {
        flex: 0.7,
        justifyContent: "center"
    },
    appTitleText: {
        color: "white",
        fontSize: RFValue(28),
        fontFamily: "Bubblegum-Sans"
    },
    postContainer: {
        flex: 1
    },
    postCard: {
        margin: RFValue(20),
        backgroundColor: "#3b3939",
        borderRadius: RFValue(20)
    },
    postCardLight:{
        margin: RFValue(20),
        backgroundColor: "#eaeaea",
        borderRadius: RFValue(20)
    },
    image: {
        width: "100%",
        alignSelf: "center",
        height: RFValue(200),
        borderTopLeftRadius: RFValue(20),
        borderTopRightRadius: RFValue(20),
        resizeMode: "contain"
    },
    dataContainer: {
        flexDirection: "row",
        padding: RFValue(20)
    },
    titleTextContainer: {
        flex: 0.8
    },
    storyTitleText: {
        fontFamily: "Bubblegum-Sans",
        fontSize: RFValue(25),
        color: "white"
    },
    storyAuthorText: {
        fontFamily: "Bubblegum-Sans",
        fontSize: RFValue(18),
        color: "white"
    },
    
   
    actionContainer: {
        justifyContent: "center",
        alignItems: "center",
        margin: RFValue(10)
    },
    likeButton: {
        width: RFValue(160),
        height: RFValue(40),
        flexDirection: "row",
        backgroundColor: "#eb3948",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: RFValue(30)
    },
    likeText: {
        color: "white",
        fontFamily: "Bubblegum-Sans",
        fontSize: RFValue(25),
        marginLeft: RFValue(5)
    }
});