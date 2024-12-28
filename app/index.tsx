import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Link } from "expo-router";
import styles from "../styles/index.style";
import { year, month, date, day } from "../tools/datetime";
import Timer from "../components/Timer";
import { DataHistory } from "../types/DataHistory";
import {
  onSnapshot,
  updateDoc,
  serverTimestamp,
  getDoc,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import {
  currentFermentasiDocument,
  historyCollection,
  monitoringDocument,
} from "../config/firebaseConfig";

interface DataMonitoring {
  Alkohol: number;
  Kelembaban: number;
  Suhu: number;
  status?: boolean;
}

interface DataStartFermentasi {
  status: boolean;
  lastStartFermentasi: Timestamp | null;
}

const defaultValueDataMonitoring: DataMonitoring = {
  Alkohol: 0,
  Kelembaban: 0,
  Suhu: 0,
};

const defaultValueDataStartFermentasi: DataStartFermentasi = {
  status: false,
  lastStartFermentasi: null,
};

export default function Main() {
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [dataLogging, setDataLogging] = useState<DataMonitoring>(
    defaultValueDataMonitoring
  );
  const [lamaFermentasi, setLamaFermentasi] = useState<string>("");
  const [isStartFermentasi, setIsStartFermentasi] =
    useState<DataStartFermentasi>(defaultValueDataStartFermentasi);
  const [isFirstRun, setIsFirstRun] = useState<boolean>(true);

  // Data Logging Listener
  useEffect(() => {
    const unSubscribe = onSnapshot(monitoringDocument, (snapshot) => {
      const data: any = snapshot.data();
      setDataLogging(data);
    });

    return () => unSubscribe();
  }, []);

  async function handleStartFermentasi() {
    if (isStartFermentasi.status == false && selectedValue == "") {
      Alert.alert("Peringatan", "Pilih Jenis Fermentasi Terlebih Dahulu");
      return;
    }
    setIsStartFermentasi((value) => ({ ...value, status: !value.status }));
  }

  // Update Status
  useEffect(() => {
    async function handleUpdateStatus() {
      if (isFirstRun) return;

      // jika fermentasi dimulai
      if (isStartFermentasi.status) {
        await updateDoc(currentFermentasiDocument, {
          status: true,
          tipe: selectedValue,
          lastStartFermentasi: serverTimestamp(),
        }).catch((error) => console.log(error));
        return;
      }

      // jika fermentasi distop dan selected value tidak kosong
      if (selectedValue != "") {
        const history: DataHistory = {
          jenis: selectedValue,
          lamaFermentasi: lamaFermentasi,
          tanggalFermentasi: `${day}, ${date} ${month} ${year}`,
        };

        await addDoc(historyCollection, history);
      }

      // reset current fermentasi
      await updateDoc(currentFermentasiDocument, {
        status: false,
        tipe: null,
        lastStartFermentasi: null,
      }).catch((error) => console.log(error));

      setLamaFermentasi("");
      setSelectedValue("");
    }

    handleUpdateStatus();
  }, [isStartFermentasi]);

  // Get Current Fermentasi
  useEffect(() => {
    async function getCurrentFermentasi() {
      const currFermentasi = await getDoc(currentFermentasiDocument);
      const dataCurrent = currFermentasi.data();
      setIsStartFermentasi((value) => ({
        status: dataCurrent?.status,
        lastStartFermentasi: dataCurrent?.lastStartFermentasi,
      }));
      setIsFirstRun(false);
    }

    getCurrentFermentasi();
  }, []);

  function handleLamaFermentasi(value: string) {
    setLamaFermentasi(value);
  }

  return (
    <View style={styles.container}>
      <View style={styles.topbar}>
        <View style={styles.bar}>
          <Text style={styles.selamat}>Booster</Text>
          <Text style={styles.booster}>Fermentasi Tapai</Text>
        </View>
        <TouchableOpacity style={styles.notifbar}>
          <Ionicons name="notifications" size={28} color="#1a4756" />
        </TouchableOpacity>
      </View>
      <View style={styles.secondbar}>
        <View style={styles.date}>
          <Text style={styles.hari}>{day}</Text>
          <Text style={styles.tgl}>
            {date} {month} {year}
          </Text>
        </View>
        <View style={styles.boxbutton1}>
          <TouchableOpacity style={styles.button1}>
            <Link href="/history" style={styles.history}>
              History
            </Link>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.input}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
          enabled={!isStartFermentasi.status}
        >
          <Picker.Item label="Tidak Ada Fermentasi" value="" />
          <Picker.Item
            label="Fermentasi Tapai Ketan Hitam"
            value="Fermentasi Tapai Ketan Hitam"
          />
          <Picker.Item
            label="Fermentasi Tapai Singkong"
            value="Fermentasi Tapai Singkong"
          />
        </Picker>
      </View>
      <View style={styles.bottombar}>
        <View style={styles.baratas}>
          <Text style={styles.teksput}>{selectedValue}</Text>
        </View>
        <View style={styles.bartengah}>
          <View style={styles.waktu}>
            <View style={styles.dalamwaktu1}>
              <Text style={styles.timef}>Waktu Fermentasi :</Text>
              {isStartFermentasi.status && (
                <Timer
                  handleTime={handleLamaFermentasi}
                  lastFermentasi={isStartFermentasi.lastStartFermentasi}
                />
              )}
            </View>
            <View style={styles.dalamwaktu2}>
              <Ionicons name="timer" size={30} color="#1a4756" />
            </View>
          </View>
          <View style={styles.sa}>
            <View style={styles.suhu}>
              <View style={styles.boxsuhu}>
                <Text style={styles.textsuhu}>Suhu</Text>
                <FontAwesome6
                  name="temperature-half"
                  size={28}
                  color="#1a4756"
                />
              </View>
              <View style={styles.boxsuhu2}>
                <Text style={styles.derjat}>
                  {isStartFermentasi.status && `${dataLogging.Suhu}°`}
                </Text>
              </View>
            </View>
            <View style={styles.alkohol}>
              <View style={styles.boxalkohol}>
                <Text style={styles.textsuhu}>Kadar Alkohol</Text>
              </View>
              <View style={styles.ikonalkohol}>
                <Ionicons name="water" size={30} color="#1a4756" />
              </View>
              <Text
                style={{
                  position: "absolute",
                  bottom: 10,
                  left: 10,
                  fontSize: 25,
                  fontWeight: "bold",
                  color: "#1a4756",
                }}
              >
                {isStartFermentasi.status &&
                  `${(dataLogging.Alkohol * 10).toFixed(2)}%`}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.mulai}
            onPress={handleStartFermentasi}
          >
            <Text style={styles.teksmulai}>
              {isStartFermentasi.status ? "Stop" : "Mulai"} Fermentasi
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
