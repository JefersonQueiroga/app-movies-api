import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { colors } from '../../constants/Colors';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Mock - sem validação real por enquanto
    if (email.trim() && password.trim()) {
      Alert.alert('Sucesso', 'Login realizado!', [
        { text: 'OK', onPress: () => router.replace('/(tabs)') }
      ]);
    } else {
      Alert.alert('Erro', 'Preencha todos os campos');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🎬 MovieApp</Text>
        <Text style={styles.subtitle}>Faça login para continuar</Text>
      </View>

      <View style={styles.form}>
        <Input
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Input
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Button title="Entrar" onPress={handleLogin} />

        <View style={styles.registerLink}>
          <Text style={styles.registerText}>Não tem conta? </Text>
          <Link href="/register" style={styles.registerLinkText}>
            Cadastre-se
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  form: {
    backgroundColor: colors.surface,
    padding: 20,
    borderRadius: 16,
  },
  registerLink: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  registerText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  registerLinkText: {
    color: colors.secondary,
    fontSize: 14,
    fontWeight: '600',
  },
});
