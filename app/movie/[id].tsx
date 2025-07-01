import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button } from '../../components/ui/Button';
import { colors } from '../../constants/Colors';
import { api } from '../../services/api';
import { MovieDetails } from '../../types/Movies';

export default function MovieDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (id) {
      loadMovieDetails(parseInt(id));
    }
  }, [id]);

  const loadMovieDetails = async (movieId: number) => {
    setLoading(true);
    const details = await api.getMovieDetails(movieId);
    setMovie(details);
    setLoading(false);
  };

  const handleFavorite = () => {
    if (!movie) return;

    setIsFavorite(!isFavorite);
    Alert.alert(
      isFavorite ? 'Removido' : 'Adicionado',
      isFavorite ? 'Filme removido dos favoritos' : 'Filme adicionado aos favoritos'
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  if (!movie) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Filme não encontrado</Text>
        <Button title="Voltar" onPress={() => router.back()} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: api.getImageUrl(movie.backdrop_path) }}
        style={styles.backdrop}
        resizeMode="cover"
      />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Image
            source={{ uri: api.getImageUrl(movie.poster_path) }}
            style={styles.poster}
            resizeMode="cover"
          />
          
          <View style={styles.info}>
            <Text style={styles.title}>{movie.title}</Text>
            
            <View style={styles.rating}>
              <Ionicons name="star" size={20} color={colors.accent} />
              <Text style={styles.ratingText}>
                {movie.vote_average.toFixed(1)} ({movie.vote_count} votos)
              </Text>
            </View>
            
            <Text style={styles.releaseDate}>
              Lançamento: {new Date(movie.release_date).toLocaleDateString('pt-BR')}
            </Text>
            
            {movie.runtime > 0 && (
              <Text style={styles.runtime}>
                Duração: {movie.runtime} minutos
              </Text>
            )}
          </View>
        </View>

        <Button
          title={isFavorite ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
          onPress={handleFavorite}
          variant={isFavorite ? "outline" : "primary"}
          style={styles.favoriteButton}
        />

        {movie.genres && movie.genres.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Gêneros</Text>
            <View style={styles.genres}>
              {movie.genres.map((genre) => (
                <View key={genre.id} style={styles.genreTag}>
                  <Text style={styles.genreText}>{genre.name}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sinopse</Text>
          <Text style={styles.overview}>
            {movie.overview || 'Sinopse não disponível.'}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  loadingText: {
    color: colors.textSecondary,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: 20,
  },
  errorText: {
    color: colors.textPrimary,
    fontSize: 18,
    marginBottom: 20,
  },
  backdrop: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  poster: {
    width: 120,
    height: 180,
    borderRadius: 12,
    marginRight: 16,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    color: colors.textSecondary,
    marginLeft: 8,
    fontSize: 16,
  },
  releaseDate: {
    color: colors.textSecondary,
    fontSize: 14,
    marginBottom: 4,
  },
  runtime: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  favoriteButton: {
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  genres: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  genreTag: {
    backgroundColor: colors.card,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  genreText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  overview: {
    color: colors.textSecondary,
    fontSize: 16,
    lineHeight: 24,
  },
});
