import { useState, useEffect } from "react";
import { Alert, Text } from "react-native";
import { getEpochSecond } from "../tools/datetime";
import { Timestamp } from "firebase/firestore";

interface timerProps {
  handleTime: (value: string) => void;
  lastFermentasi: Timestamp | null;
}

export default function Timer({
  handleTime,
  lastFermentasi,
}: timerProps): JSX.Element {
  //   const [seconds, setSeconds] = useState(0);
  const [time, setTime] = useState("");
  let secondFermentasi = 0;
  //   TODO: ubag lastfermentasi menjadi timestamp -> toMillis()
  if (lastFermentasi != null) {
    let last: number = Math.floor(lastFermentasi.seconds) ?? 0;
    secondFermentasi = getEpochSecond - last;
  }

  useEffect(() => {
    let seconds: number = secondFermentasi;
    let interval = setInterval(() => {
      const hour: number = Math.floor(seconds / 3600);
      const minute: number = Math.floor((seconds % 3600) / 60);
      const second: number = seconds % 60;
      const lamaFermentasi: string = `${hour} jam ${minute} menit ${second} detik`;

      handleTime(lamaFermentasi);
      setTime(lamaFermentasi);
      seconds += 1;
    }, 1000); //each count lasts for a second
    //cleanup the interval on complete
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Text
        style={{
          fontSize: 17,
          color: "#1a4756",
          fontWeight: "bold",
          marginTop: 5,
        }}
      >
        {time}
      </Text>
    </>
  );
}
