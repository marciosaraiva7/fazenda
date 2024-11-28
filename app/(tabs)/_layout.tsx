import { Tabs } from "expo-router";
import React from "react";
import { BlurView } from "expo-blur";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarStyle: {
          position: "absolute", // Deixa a barra sobre o conteúdo
          height: 120,
          borderTopWidth: 0, // Remove a borda superior
          backgroundColor: "rgba(255, 255, 255, 0.6)", // Necessário para o efeito de blur
        },
        tabBarBackground: () => (
          <BlurView
            intensity={50}
            tint={colorScheme === "dark" ? "dark" : "light"}
            style={{ flex: 1 }}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "code-slash" : "code-slash-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
