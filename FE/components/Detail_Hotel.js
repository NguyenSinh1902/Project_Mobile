import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
} from "react-native";
import { BlurView } from "expo-blur";
const Detail_Hotel = ({ route }) => {
  const { hotel } = route.params;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event) => {
    const index = Math.floor(
      event.nativeEvent.contentOffset.x /
        event.nativeEvent.layoutMeasurement.width
    );
    setCurrentIndex(index);
  };

  return (
    <>
      <ScrollView
        style={styles.container}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.imageContainer}>
          <FlatList
            data={hotel.images_Detail}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={({ nativeEvent }) => handleScroll({ nativeEvent })}
            renderItem={({ item }) => (
              <Image source={{ uri: item }} style={styles.hotelImage} />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
          <View style={styles.buttonWrapperLeft}>
            <BlurView tint="dark" intensity={50} style={styles.blurButton}>
              <TouchableOpacity style={styles.circularButton}>
                <Image
                  source={require("../assets/weui_back-filled.png")}
                  
                />
              </TouchableOpacity>
            </BlurView>
          </View>
          <View style={styles.buttonWrapperRight}>
            <BlurView tint="dark" intensity={50} style={styles.blurButton}>
              <TouchableOpacity style={styles.circularButton}>
                <Image
                  source={require("../assets/iconoir_heart.png")}
                  style={styles.buttonIcon}
                />
              </TouchableOpacity>
            </BlurView>
          </View>
          <View style={styles.imageIndexContainer}>
            <Text style={styles.imageIndexText}>
              {currentIndex + 1}/{hotel.images_Detail.length}
            </Text>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.hotelName}>{hotel.name}</Text>
          <View style={styles.locationContainer}>
            <View style={{ flexDirection: "row" }}>
              <Image
                source={require("../assets/bx_map.png")}
                style={styles.locationIcon}
              />
              <Text style={styles.hotelLocation}>{hotel.location}</Text>
            </View>

            <TouchableOpacity>
              <View style={{ flexDirection: "row", marginRight: 10 }}>
                <Text style={{ color: "#F86D0A" }}>View map</Text>
                <Image source={require("../assets/weui_arrow-filled.png")} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.ratingContainer}>
            <Image
              source={require("../assets/eva_star-fill.png")}
              style={styles.ratingIcon}
            />
            <Text style={styles.hotelRating}>{hotel.rating}</Text>
            <Text style={{ color: "#666" }}>({hotel.review_count})</Text>
          </View>
        </View>

        <View style={styles.horizontalLine} />

        <View
          style={{
            flexDirection: "row",
            marginLeft: 10,
            marginTop: 5,
            marginBottom: 5,
          }}
        >
          <Image source={require("../assets/tdesign_discount.png")} />
          <Text style={styles.hotelVoucher}>50% off, maximum 30k</Text>
        </View>

        <View style={styles.horizontalLine} />

        <View style={styles.containerAmenities}>
          <Text style={{ fontSize: 18, fontWeight: 500, marginBottom: 5 }}>
            Hotel Amenities
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <View style={styles.facilityContainer}>
              <Image source={require("../assets/pepicons-pop_wifi.png")} />
              <Text>Free Wi-Fi</Text>
            </View>
            <View style={styles.facilityContainer}>
              <Image
                source={require("../assets/game-icons_water-bottle.png")}
              />
              <Text style={{ textAlign: "center" }}>
                Complimentary {"\n"}Water
              </Text>
            </View>
            <View style={styles.facilityContainer}>
              <Image
                source={require("../assets/material-symbols_chair-outline.png")}
              />
              <Text style={{}}>Love Chair</Text>
            </View>
            <View style={styles.facilityContainer}>
              <Image source={require("../assets/mdi_hours-24.png")} />
              <Text style={{}}>24-Hour Service</Text>
            </View>
          </View>
          <TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                marginRight: 10,
              }}
            >
              <Text style={{ color: "#F86D0A" }}>See all</Text>
              <Image source={require("../assets/weui_arrow-filled.png")} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.horizontalLine} />

        <View style={styles.containerAmenities}>
          <Text style={{ fontSize: 18, fontWeight: 500 }}>Overview</Text>
          <Text style={{ fontSize: 16, fontWeight: 500, color: "#666" }}>
            Welcome to Swiss-Belresort !
          </Text>
          <View style={{ marginBottom: 5 }}>
            <Text style={{ fontSize: 15, fontWeight: "400", color: "#666" }}>
              Located at 007 KDL Hồ Tuyền Lâm, Ward 3, Đà Lạt, Lâm Đồng 061000,
              Vietnam, Swiss-Belresort offers a luxurious and comfortable haven
              for travelers around t...
              <Text
                style={{ fontSize: 16, fontWeight: "400", color: "#F86D0A" }}
              >
                Read more
              </Text>
            </Text>
          </View>
        </View>

        <View style={styles.horizontalLine} />

        <View style={[styles.containerAmenities, { marginBottom: 5 }]}>
          <Text style={{ fontSize: 18, fontWeight: 500 }}>Reviews</Text>
          <View style={{ flexDirection: "row", marginTop: 5 }}>
            <Image source={require("../assets/noto_star.png")} />
            <Image source={require("../assets/noto_star.png")} />
            <Image source={require("../assets/noto_star.png")} />
            <Image source={require("../assets/noto_star.png")} />
            <Image source={require("../assets/mingcute_star-half-fill.png")} />
            <Text
              style={{
                fontSize: 14,
                fontWeight: 500,
                marginLeft: 5,
                color: "#F86D0A",
              }}
            >
              {hotel.rating}
            </Text>
            <Text style={{ color: "#666" }}>
              ({hotel.review_count} Reviews)
            </Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              {Object.entries(hotel.comments).map(
                ([author, comment], index) => (
                  <View key={index} style={styles.commentBox}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                        }}
                      >
                        <Image
                          source={require("../assets/avatarComment.png")}
                        />
                        <View style={{ marginLeft: 5 }}>
                          <Text style={styles.commentAuthor}>{author}</Text>
                          <Text style={{ fontSize: 12 }}>20/11/2024</Text>
                        </View>
                      </View>
                      <View style={{ flexDirection: "row", marginTop: 5 }}>
                        <Image source={require("../assets/noto_star.png")} />
                        <Image source={require("../assets/noto_star.png")} />
                        <Image source={require("../assets/noto_star.png")} />
                        <Image source={require("../assets/noto_star.png")} />
                        <Image
                          source={require("../assets/mingcute_star-half-fill.png")}
                        />
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={[
                          styles.commentText,
                          { flex: 1, flexShrink: 1, marginRight: 10 },
                        ]}
                      >
                        {comment}
                      </Text>

                      <TouchableOpacity>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Image
                            source={require("../assets/mdi_like.png")}
                            style={{ marginRight: 2 }}
                          />
                          <Text>15</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                )
              )}
            </View>
          </ScrollView>
        </View>

        <View style={styles.horizontalLine} />

        <View style={[styles.containerAmenities, { marginRight: 10 }]}>
          <Text style={{ fontSize: 18, fontWeight: 500 }}>Hotel Policies</Text>
          <Text style={{ fontSize: 16, fontWeight: 500, color: "#666" }}>
            Check-In and Check-Out Times
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 15, fontWeight: "400", color: "#666" }}>
              Hourly Booking
            </Text>
            <Text style={{ fontSize: 15, fontWeight: "400", color: "#666" }}>
              06:00 to 22:00 (on the same day)
            </Text>
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 15, fontWeight: "400", color: "#666" }}>
              Overnight Booking
            </Text>
            <Text style={{ fontSize: 15, fontWeight: "400", color: "#666" }}>
              22:00 to 12:00 (the next day)
            </Text>
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 15, fontWeight: "400", color: "#666" }}>
              Daily Booking
            </Text>
            <Text style={{ fontSize: 15, fontWeight: "400", color: "#666" }}>
              14:00 to 12:00 (the following day)
            </Text>
          </View>
          <View
            style={{
              width: "100%",
              height: 2,
              backgroundColor: "#E0E0E0",
              marginBottom: 5,
              marginTop: 5,
            }}
          />
          <View>
            <Text style={{ fontSize: 16, fontWeight: 500, color: "#666" }}>
              Cancellation Policy
            </Text>
            <Text style={{ fontSize: 15, fontWeight: "500", color: "#666" }}>
              Daily Booking:{" "}
              <Text style={{ fontSize: 15, fontWeight: "400", color: "#666" }}>
                Cancel at least 1 hour before check-in.
              </Text>
            </Text>

            <Text style={{ fontSize: 15, fontWeight: "500", color: "#666" }}>
              Overnight Booking:{" "}
              <Text style={{ fontSize: 15, fontWeight: "400", color: "#666" }}>
                Cancel at least 2 hours before check-in time.
              </Text>
            </Text>

            <Text style={{ fontSize: 15, fontWeight: "500", color: "#666" }}>
              Daily Booking:{" "}
              <Text style={{ fontSize: 15, fontWeight: "400", color: "#666" }}>
                Cancel at least 12 hours before check-in.
              </Text>
            </Text>

            <Text
              style={{
                fontSize: 15,
                fontWeight: "500",
                color: "#666",
                marginTop: 10,
                marginBottom: 5,
              }}
            >
              Note:{" "}
              <Text style={{ fontSize: 15, fontWeight: "400", color: "#666" }}>
                If canceled after the specified time, the full booking amount
                will be non-refundable.
              </Text>
            </Text>
          </View>
        </View>

        <View style={styles.horizontalLine} />
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.timeContainer}>
          <Text>
            {" "}
            <Image source={require("../assets/mdi_weather-night.png")} /> 01
            Night | 22:00, 31/10 - 12:00 01/11
          </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={styles.priceContainer}>
            <Text>
              {" "}
              Original Price:
              <Text style={styles.originalPrice}> ${hotel.price}</Text>
            </Text>

            <Text style={styles.nowPrice}>Now: ${hotel.price * 0.9}</Text>
          </View>
          <TouchableOpacity style={styles.bookButton}>
            <Text style={styles.bookButtonText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
  },
  imageContainer: {
    position: "relative",
  },
  hotelImage: {
    width: 412,
    height: 371,
  },
  imageIndexContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 10,
    padding: 5,
  },
  imageIndexText: {
    color: "#fff",
    fontSize: 16,
  },
  infoContainer: {
    marginTop: 10,
    marginLeft: 10,
  },
  hotelName: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 5,
  },
  locationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  locationIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
    borderRadius: 5,
    backgroundColor: "#000",
    marginLeft: 2,
  },
  hotelLocation: {
    fontSize: 15,
    fontWeight: "500",
    color: "#000",
    marginLeft: 3,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    //marginBottom: 10,
  },
  ratingIcon: {
    width: 24,
    height: 24,
    marginRight: 5,
  },
  hotelRating: {
    fontSize: 16,
    color: "#000",
    fontWeight: "500",
  },
  horizontalLine: {
    width: "100%",
    height: 8,
    backgroundColor: "#E0E0E0",
    marginBottom: 5,
    marginTop: 5,
  },
  hotelVoucher: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
    marginLeft: 10,
  },
  containerAmenities: {
    marginTop: 5,
    marginLeft: 10,
  },
  facilityContainer: {
    alignItems: "center",
  },

  commentBox: {
    width: 300,
    height: 100,
    borderRadius: 20,
    border: 0.5,
    borderColor: "#666",
    backgroundColor: "#FFF",
    padding: 10,
    marginRight: 10,
  },
  commentAuthor: {
    fontWeight: "bold",
    //marginBottom: 5,
  },
  commentText: {
    color: "#000",
    fontSize: 15,
  },

  footer: {
    width: "100%",
    height: 135,
    backgroundColor: "#FFF",
    padding: 10,
  },
  timeContainer: {
    width: 390,
    height: 32,
    borderRadius: 20,
    backgroundColor: "#EDE7F3",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  priceContainer: {
    flexDirection: "column",
    //alignItems: "center",
    //justifyContent: "space-between",
  },
  originalPrice: {
    textDecorationLine: "line-through",
    fontSize: 15,
    fontWeight: "400",
    color: "#666",
  },
  nowPrice: {
    marginLeft: 3,
    fontSize: 25,
    fontWeight: "bold",
    fontStyle: "italic",
    color: "#FB773C",
  },
  bookButton: {
    width: 145,
    height: 55,
    borderRadius: 30,
    backgroundColor: "#F2873B",
    justifyContent: "center",
    alignItems: "center",
  },
  bookButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 18,
  },

  buttonWrapperLeft: {
    position: "absolute",
    top: 40,
    left: 15,
  },
  buttonWrapperRight: {
    position: "absolute",
    top: 40,
    right: 15,
  },
  blurButton: {
    borderRadius: 30,
    overflow: "hidden",
  },
  circularButton: {
    width: 40,
    height: 40,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonIcon: {
    width: 24,
    height: 24,
  },
});

export default Detail_Hotel;
