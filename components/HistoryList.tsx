import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import styles from "../styles/HistoryList.style";
import { DataHistory } from "../types/DataHistory";

interface historyListProps {
  histories: DataHistory[];
  handleModal: (data: DataHistory) => void;
}

function HistoryList({
  histories,
  handleModal,
}: historyListProps): JSX.Element {
  return (
    <>
      {histories.map((history, index) => {
        return (
          <View style={styles.box1} key={index}>
            <Text style={styles.percobaan1}>{history.jenis}</Text>
            <TouchableOpacity
              style={styles.detail}
              onPress={() => handleModal(history)}
            >
              <Text style={styles.percobaan2}>Detail</Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </>
  );
}

// Edit Style di file styles/HistoryList.style
export default React.memo(HistoryList);
