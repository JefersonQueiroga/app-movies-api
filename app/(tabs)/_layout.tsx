import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { colors } from '../../constants/Colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.secondary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.card,
        },
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.textPrimary,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Buscar',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favoritos',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}