import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../constants/Colors';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" backgroundColor={colors.background} />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.textPrimary,
          headerTitleStyle: {
            fontWeight: '600',
          },
        }}
      >
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="movie/[id]" options={{ title: 'Detalhes do Filme' }} />
      </Stack>
    </>
  );
}