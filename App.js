import { useEffect, useState } from "react";
import {
  Button,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  Vibration,
  View,
} from "react-native";

export default function App() {
  const [refreshing, setRefreshing] = useState(false);
  const [selected, setSelected] = useState(2);
  const [date, setDate] = useState();
  const [menu] = useState([
    { id: 1, name: "Economy", price: 65 },
    { id: 2, name: "Regular", price: 85 },
    { id: 3, name: "Corporate", price: 115 },
    { id: 4, name: "Spacial", price: 130 },
  ]);

  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 100);
  };

  useEffect(() => {
    const date = new Date();
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const todayDate = `${date.getDate()} ${
      months[date.getMonth()]
    }, ${date.getFullYear()}`;

    setDate(todayDate);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#102027" barStyle={"light-content"} />
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text style={styles.heading}>Add Meal</Text>
        <Text style={styles.helpingText}>Add your daily meal</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.text}>Meal Date</Text>
          <TextInput style={styles.inputControl}>{date}</TextInput>
          <Text style={styles.text}>Meal Variation</Text>
          <View style={styles.gap}>
            {menu.map((item) => (
              <View key={item.id} style={styles.child}>
                <Button
                  title={item.name}
                  onPress={() => setSelected(item.id)}
                  color={selected === item.id ? "#00c06c" : "#3c4955"}
                >
                  {item.name}
                </Button>
              </View>
            ))}
          </View>
          <View>
            <Text style={styles.text}>
              Meal Price: {menu.find((item) => item.id === selected).price} tk
            </Text>
          </View>
          <View style={styles.btnContainer}>
            <Button title="Save Meal" color={"#00c06c"}>
              Save Meal
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const gap = 8;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#0f1b24",
    padding: 20,
  },
  heading: {
    marginTop: 20,
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 10,
  },
  helpingText: {
    fontSize: 14,
    color: "#808080",
  },
  inputContainer: {
    marginTop: 40,
    padding: 15,
    borderRadius: 15,
    backgroundColor: "#2c3945",
  },
  inputControl: {
    backgroundColor: "#efefef",
    borderRadius: 4,
    paddingLeft: 4,
    paddingRight: 4,
    marginBottom: 6,
  },
  gap: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  child: {
    width: "48%",
    marginBottom: gap,
  },
  btnContainer: {
    marginTop: 20,
  },
});
