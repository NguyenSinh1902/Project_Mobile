import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { getAccommodationById } from "../services/AccommodationService";

const Book_Hotel = ({ route }) => {
  const navigation = useNavigation();
  const { accommodationId, customer } = route.params;
  const [accommodation, setAccommodation] = useState(null);

  useEffect(() => {
    const fetchAccommodationDetails = async () => {
      try {
        const data = await getAccommodationById(accommodationId);
        setAccommodation(data);
      } catch (error) {
        console.error("Error fetching accommodation details:", error);
      }
    };

    fetchAccommodationDetails();
  }, [accommodationId]);

  if (!accommodation) {
    return (
      <View style={styles.center}>
        <Text>Loading...</Text>
      </View>
    );
  }
  console.log(accommodation);
  const formatPrice = (price) => {
    return Number(price)
      .toLocaleString("vi-VN", { style: "currency", currency: "VND" })
      .replace("₫", "VND");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../assets/back-filled.png")}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Confirm and Pay</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.hotelInfoContainer}>
        <Image
          source={{ uri: accommodation.image_url }}
          style={styles.hotelImage}
        />
        <View style={styles.hotelDetails}>
          <View>
            <Text style={styles.hotelName}>{accommodation.name}</Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                maxWidth: "100%",
              }}
            >
              <Image
                source={require("../assets/bx_map.png")}
                style={styles.locationIcon}
              />
              <Text style={styles.hotelLocation}>{accommodation.address}</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 16, marginTop: 8 }}>Price: </Text>
              <Text style={{ fontSize: 24, fontWeight: 700 }}>
                {formatPrice(accommodation.price_per_night * 0.9)}
              </Text>
            </View>

            <View style={{ flexDirection: "row", marginLeft: 50 }}>
              <Image
                source={require("../assets/eva_star-fill.png")}
                style={{ marginTop: 8 }}
              />
              <Text
                style={{
                  fontSize: 16,
                  marginTop: 8,
                  color: "#525252",
                  fontWeight: 700,
                }}
              >
                {accommodation.rating}(75)
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.timeInfoContainer}>
        <LinearGradient colors={["#F86D0A", "#FFB26F"]} style={styles.timeBox}>
          <View style={{ flexDirection: "row" }}>
            <Image source={require("../assets/two-hearts_1.png")} />
            <Image source={require("../assets/mdi_timer-check-outline.png")} />
            <Image source={require("../assets/two-hearts_2.png")} />
          </View>
          <Text style={styles.timeText}>01 Night</Text>
        </LinearGradient>
        <View style={styles.timeDetails}>
          <View>
            <Text style={styles.checkIn}>Check-in</Text>
            <Text style={styles.timeInOut}>22:00, 11/08/2024</Text>
          </View>
          <View>
            <Text style={styles.checkOut}>Check-out</Text>
            <Text style={styles.timeInOut}>12:00, 12/08/2024</Text>
          </View>
        </View>
        <TouchableOpacity style={{ marginLeft: 60, marginTop: 10 }}>
          <Image source={require("../assets/bx_edit.png")} />
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      <View style={styles.InforGuest}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 700,
              marginTop: 10,
              marginBottom: 5,
            }}
          >
            Guest Information
          </Text>
          <TouchableOpacity style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 16, color: "#F86D0A" }}>Edit</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 16, fontWeight: 500 }}>Name</Text>
          <Text style={{ fontSize: 16, fontWeight: 400, color: "#666" }}>
          {customer?.name}
          </Text>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 16, fontWeight: 500 }}>Phone Number</Text>
          <Text style={{ fontSize: 16, fontWeight: 400, color: "#666" }}>
          {customer?.phone_number}
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.InforGuest}>
        <View style={styles.VoucherCT1}>
          <View style={{ flexDirection: "row" }}>
            <Image source={require("../assets/ic_baseline-discount.png")} />
            <Text style={{ fontSize: 16, fontWeight: 500, marginLeft: 3 }}>
              Voucher
            </Text>
          </View>
          <TouchableOpacity style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 16, fontWeight: 400, color: "#666" }}>
              Select or enter code
            </Text>
            <Image
              source={require("../assets/weui_nguoc.png")}
              style={{ marginLeft: 3, marginTop: 3 }}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.dividerMini} />

        <View style={styles.VoucherCT1}>
          <View style={{ flexDirection: "row" }}>
            <Image source={require("../assets/ic_baseline-discount.png")} />
            <Text style={{ fontSize: 16, fontWeight: 500, marginLeft: 3 }}>
              Coins
            </Text>
          </View>
          <TouchableOpacity style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 16, fontWeight: 400, color: "#666" }}>
              Use coins
            </Text>
            <Image
              source={require("../assets/weui_nguoc.png")}
              style={{ marginLeft: 3, marginTop: 3 }}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.PaymentDetails}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 700,
              marginTop: 10,
              marginBottom: 5,
            }}
          >
            Payment Details
          </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 16, fontWeight: 500 }}>Room Charges</Text>
          <Text style={{ fontSize: 16, fontWeight: 400, color: "#666" }}>
          {formatPrice(accommodation.price_per_night)}
          </Text>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 16, fontWeight: 500 }}>Voucher</Text>
          <Text style={{ fontSize: 16, fontWeight: 400, color: "#666" }}>
          - {formatPrice(accommodation.price_per_night * 0.1)}
          </Text>
        </View>

        <View style={styles.dividerMini} />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 5,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: 500 }}>Total Payment</Text>
          <Text style={{ fontSize: 16, fontWeight: 700 }}>{formatPrice(accommodation.price_per_night * 0.9)}</Text>
        </View>
      </View>
      <View style={styles.divider} />
      <Text style={{ marginLeft: 10, color: "#666" }}>
        By clicking 'Book Now', you agree to{" "}
        <Text style={{ color: "#3160FA" }}>our terms and conditions</Text>
      </Text>

      <View style={styles.Bottom}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            height: "40%",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", marginLeft: 10 }}>
            <Image source={require("../assets/solar_card-bold.png")} />
            <Text style={{ fontSize: 16, fontWeight: 500, marginLeft: 3 }}>
              Select Payment Method
            </Text>
          </View>
          <TouchableOpacity style={{ marginRight: 10 }}>
            <Image
              source={require("../assets/weui_nguoc.png")}
              style={{ marginLeft: 3, marginTop: 3 }}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            width: "95%",
            height: 2,
            backgroundColor: "#E0E0E0",
            marginBottom: 0,
            marginLeft: 10,
          }}
        />

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ marginLeft: 10 }}>
            <Text style={{ color: "#666", fontSize: 16 }}>Amount to Pay</Text>
            <Text
              style={{
                fontSize: 30,
                fontWeight: 700,
                color: "#F86D0A",
                fontStyle: "italic",
              }}
            >
              {formatPrice(accommodation.price_per_night * 0.9)}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.bookButton}
            onPress={() =>
              navigation.navigate("PaymentSuccessful", {
                accommodationId: accommodationId,
                customer: customer,
              })
            }
          >
            <Text style={styles.bookButtonText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 50,
  },
  backIcon: {
    marginLeft: 10,
  },
  headerText: {
    color: "#000",
    textAlign: "center",
    marginLeft: 100,
    fontSize: 24,
    fontWeight: "500",
  },
  divider: {
    width: "100%",
    height: 5,
    backgroundColor: "#E0E0E0",
    marginTop: 5,
  },
  dividerMini: {
    width: "100%",
    height: 2,
    backgroundColor: "#E0E0E0",
    marginTop: 5,
  },
  hotelInfoContainer: {
    flexDirection: "row",
    width: "95%",
    height: 128,
    borderRadius: 10,
    backgroundColor: "#FFF",
    margin: 10,
  },
  hotelImage: {
    width: 143,
    height: 128,
    borderRadius: 10,
  },
  hotelDetails: {
    marginLeft: 10,
    justifyContent: "space-around",
  },
  hotelName: {
    fontSize: 18,
    fontWeight: "bold",
  },

  timeInfoContainer: {
    flexDirection: "row",
    width: "95%",
    height: 128,
    borderRadius: 10,
    backgroundColor: "#FFF",
    margin: 10,
  },
  timeBox: {
    width: 143,
    height: 128,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  timeText: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "900",
  },
  timeDetails: {
    marginLeft: 10,
    justifyContent: "space-around",
  },
  checkIn: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
  },
  checkOut: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
  },
  timeInOut: {
    fontSize: 16,
    fontWeight: "400",
    color: "#000",
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
    fontWeight: "400",
    color: "#000",
    marginLeft: 3,
    flexShrink: 1,
    flexWrap: "wrap",
    maxWidth: "70%",
  },

  InforGuest: {
    width: "95%",
    height: 100,
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  VoucherCT1: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: "50%",
    alignItems: "center",
  },
  PaymentDetails: {
    width: "95%",
    height: 120,
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  Bottom: {
    width: "100%",
    height: 120,
    backgroundColor: "#FFFF",
    position: "absolute",
    bottom: 0,
  },

  bookButton: {
    width: 130,
    height: 45,
    borderRadius: 30,
    backgroundColor: "#F2873B",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    marginTop: 7,
  },
  bookButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default Book_Hotel;
