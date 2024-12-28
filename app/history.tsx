// import { AntDesign } from "@expo/vector-icons";
import { Alert, Text, View } from "react-native";
import { Link } from "expo-router";

import styles from "../styles/history.style";
import { useCallback, useEffect, useState } from "react";
import HistoryModal from "../components/HistoryModal";
import { DataHistory } from "../types/DataHistory";
import HistoryList from "../components/HistoryList";
import { onSnapshot } from "firebase/firestore";
import { historyCollection } from "../config/firebaseConfig";

export default function History() {
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [listHistory, setListHistory] = useState<DataHistory[]>([]);
  const [selectedData, setSelectedData] = useState<DataHistory | null>(null);

  // ganti "Data Logging " dengan nama colllection history

  useEffect(() => {
    // TODO : ganti jo maammbiak data ka firebase
    const unsubscribe = onSnapshot(historyCollection, (query) => {
      if (query.empty) {
        setListHistory([]);
      } else {
        const list: DataHistory[] = query.docs.map(
          (value) => value.data() as DataHistory
        );
        setListHistory(list);
      }
    });

    return () => unsubscribe();
  }, []);

  const openModal = useCallback((data: DataHistory) => {
    setSelectedData(data);
    setModalVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedData(null);
    setModalVisible(false);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.boxatas}>
        <View style={styles.back}>
          <Link href={"/"} style={styles.bek}>
            Back
          </Link>
        </View>
        <Text style={styles.history}>History</Text>
      </View>

      {/* Edit Desain HistoryList di file component/HistoryList */}
      <HistoryList histories={listHistory} handleModal={openModal} />

      {/* Edit Desain HistoryModal di file component/HistoryModal */}
      <HistoryModal
        isVisible={isModalVisible}
        onClose={closeModal}
        data={selectedData}
      />
    </View>
  );
}
