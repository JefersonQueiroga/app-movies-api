import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../components/ui/Button';
import { colors } from '../constants/Colors';

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Oops!</Text>
      <Text style={styles.message}>Esta tela não existe.</Text>
      
      <Link href="/" asChild>
        <Button title="Ir para Home" onPress={()=>alert("teste")} />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 16,
  },
  message: {
    fontSize: 18,
    color: colors.textSecondary,
    marginBottom: 32,
    textAlign: 'center',
  },
});