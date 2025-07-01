import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import { Input } from '../../components/ui/Input';
import { MovieCard } from '../../components/ui/MovieCard';
import { colors } from '../../constants/Colors';
import { api } from '../../services/api';
import { FavoriteMovie, Movie } from '../../types/Movies';

export default function HomeScreen() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState<FavoriteMovie[]>([]);

  useEffect(() => {
    loadPopularMovies();
  }, []);

  const loadPopularMovies = async () => {
    setLoading(true);
    const popularMovies = await api.getPopularMovies();
    setMovies(popularMovies);
    setLoading(false);
  };

  const searchMovies = async (query: string) => {
    if (!query.trim()) {
      loadPopularMovies();
      return;
    }

    setLoading(true);
    const searchResults = await api.searchMovies(query);
    setMovies(searchResults);
    setLoading(false);
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    searchMovies(text);
  };

  const handleMoviePress = (movie: Movie) => {
    router.push(`/movie/${movie.id}`);
  };

  const handleFavorite = (movie: Movie) => {
    const isFavorite = favorites.some(fav => fav.id === movie.id);
    
    if (isFavorite) {
      setFavorites(prev => prev.filter(fav => fav.id !== movie.id));
      Alert.alert('Removido', 'Filme removido dos favoritos');
    } else {
      const newFavorite: FavoriteMovie = {
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        vote_average: movie.vote_average,
        addedAt: new Date().toISOString(),
      };
      setFavorites(prev => [...prev, newFavorite]);
      Alert.alert('Adicionado', 'Filme adicionado aos favoritos');
    }
  };

  const renderMovieItem = ({ item }: { item: Movie }) => (
    <MovieCard
      movie={item}
      onPress={() => handleMoviePress(item)}
      onFavorite={() => handleFavorite(item)}
      isFavorite={favorites.some(fav => fav.id === item.id)}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Input
          placeholder="Buscar filmes..."
          value={searchQuery}
          onChangeText={handleSearch}
          style={styles.searchInput}
        />
      </View>

      <Text style={styles.sectionTitle}>
        {searchQuery ? `Resultados para "${searchQuery}"` : 'Filmes Populares'}
      </Text>

      <FlatList
        data={movies}
        renderItem={renderMovieItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.moviesList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            {loading ? 'Carregando...' : 'Nenhum filme encontrado'}
          </Text>
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
  searchContainer: {
    padding: 20,
    paddingBottom: 10,
  },
  searchInput: {
    marginBottom: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginHorizontal: 20,
    marginBottom: 16,
  },
  moviesList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  emptyText: {
    textAlign: 'center',
    color: colors.textSecondary,
    fontSize: 16,
    marginTop: 40,
  },
});