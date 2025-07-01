import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import { MovieCard } from '../../components/ui/MovieCard';
import { colors } from '../../constants/Colors';
import { FavoriteMovie } from '../../types/Movies';

export default function FavoritesScreen() {
  // Mock de filmes favoritos - em produção viria do Firebase
  const [favorites, setFavorites] = useState<FavoriteMovie[]>([
    {
      id: 1,
      title: 'Vingadores: Ultimato',
      poster_path: '/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
      vote_average: 8.3,
      addedAt: '2024-01-15T10:30:00Z',
    },
    {
      id: 2,
      title: 'Homem-Aranha: Sem Volta Para Casa',
      poster_path: '/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
      vote_average: 8.4,
      addedAt: '2024-01-14T14:20:00Z',
    },
  ]);

  const handleMoviePress = (movie: FavoriteMovie) => {
    router.push(`/movie/${movie.id}`);
  };

  const handleRemoveFavorite = (movie: FavoriteMovie) => {
    Alert.alert(
      'Remover Favorito',
      `Deseja remover "${movie.title}" dos favoritos?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: () => {
            setFavorites(prev => prev.filter(fav => fav.id !== movie.id));
            Alert.alert('Removido', 'Filme removido dos favoritos');
          },
        },
      ]
    );
  };

  const renderFavoriteItem = ({ item }: { item: FavoriteMovie }) => (
    <MovieCard
      movie={{
        id: item.id,
        title: item.title,
        poster_path: item.poster_path,
        vote_average: item.vote_average,
        overview: 'Adicionado em ' + new Date(item.addedAt).toLocaleDateString('pt-BR'),
        backdrop_path: '',
        release_date: '',
        vote_count: 0,
        genre_ids: [],
      }}
      onPress={() => handleMoviePress(item)}
      onFavorite={() => handleRemoveFavorite(item)}
      isFavorite={true}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Favoritos</Text>
      
      <FlatList
        data={favorites}
        renderItem={renderFavoriteItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.favoritesList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>Nenhum favorito ainda</Text>
            <Text style={styles.emptyText}>
              Adicione filmes aos favoritos para vê-los aqui
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
    margin: 20,
    marginBottom: 10,
  },
  favoritesList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 60,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
