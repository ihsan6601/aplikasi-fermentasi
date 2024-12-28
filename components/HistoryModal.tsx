import React from "react";
import { Text, Button, View, Modal, StyleSheet } from "react-native";
import { DataHistory } from "../types/DataHistory";
import styles from "../styles/HistoryModal.style";

interface historyModalProps {
  isVisible: boolean;
  onClose: () => void;
  data: DataHistory | null;
}

function HistoryModal({
  isVisible,
  onClose,
  data,
}: historyModalProps): JSX.Element {
  if (!isVisible) return <></>;
  return (
    <>
      <Modal transparent={true} visible={isVisible} animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Detail</Text>
            <Text>{data?.jenis}</Text>
            <Text>{data?.tanggalFermentasi}</Text>
            <Text>{data?.lamaFermentasi}</Text>
            <Button title="Close" onPress={onClose} />
          </View>
        </View>
      </Modal>
    </>
  );
}

// Edit Style di file styles/HistoryModal.style
export default React.memo(HistoryModal);
