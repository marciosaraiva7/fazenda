import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View, Text } from "react-native";
import MapView, { Geojson } from "react-native-maps";
import Teste_NDVI_Geo_json_Kaio from "../../constants/Teste_NDVI_Geo_json_Kaio.json";
import { BlurView } from "expo-blur";

// Função para calcular a cor com base no NDVI
const getNDVIColor = (ndvi: number): string => {
  if (ndvi <= 0) {
    return "rgba(255, 0, 0, 0.8)"; // Vermelho mais vivo
  } else if (ndvi > 0 && ndvi <= 0.5) {
    return "rgba(255, 165, 0, 0.8)"; // Laranja mais vivo
  } else {
    return "rgba(0, 255, 0, 0.8)"; // Verde mais vivo
  }
};

export default function HomeScreen() {
  const [geojsonData, setGeojsonData] = useState<any | null>(null);

  useEffect(() => {
    setGeojsonData(Teste_NDVI_Geo_json_Kaio);
  }, []);

  const initialRegion = {
    latitude: -15.35, // Ajuste para centralizar no GeoJSON
    longitude: -46.742,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  if (!geojsonData) {
    return <ActivityIndicator size="large" color="#00ff00" />;
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        mapType="standard"
      >
        {geojsonData.features.map((feature: any, index: number) => {
          // Calcula a cor com base no NDVI
          const ndvi = feature.properties.NDVI___ || 0; // NDVI ou valor padrão
          const fillColor = getNDVIColor(ndvi);

          return (
            <Geojson
              key={index}
              geojson={{
                type: "FeatureCollection",
                features: [feature],
              }}
              strokeColor="transparent" // Contorno transparente
              fillColor={fillColor} // Cores mais vivas
              strokeWidth={0}
            />
          );
        })}
      </MapView>
      {/* Legenda */}
      <BlurView intensity={50} tint="light" style={styles.legendContainer}>
        <Text style={styles.legendTitle}>Legenda</Text>
        <View style={styles.legendItem}>
          <View
            style={[
              styles.colorBox,
              { backgroundColor: "rgba(255, 0, 0, 0.8)" },
            ]}
          />
          <Text style={styles.legendText}>{"NDVI ≤ 0 (Baixa vegetação)"}</Text>
        </View>
        <View style={styles.legendItem}>
          <View
            style={[
              styles.colorBox,
              { backgroundColor: "rgba(255, 165, 0, 0.8)" },
            ]}
          />
          <Text style={styles.legendText}>
            {"0 < NDVI ≤ 0.5 (Média vegetação)"}
          </Text>
        </View>
        <View style={styles.legendItem}>
          <View
            style={[
              styles.colorBox,
              { backgroundColor: "rgba(0, 255, 0, 0.8)" },
            ]}
          />
          <Text style={styles.legendText}>{"NDVI > 0.5 (Alta vegetação)"}</Text>
        </View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  legendContainer: {
    position: "absolute",
    bottom: 130,
    left: 20,
    right: 20,
    backgroundColor: "rgba(255, 255, 255, 0.6)", // Fundo branco translúcido
    overflow: "hidden",
    borderRadius: 10,
    padding: 15,
  },
  legendTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  colorBox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  legendText: {
    fontSize: 14,
    color: "#000",
  },
});
