import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../constants/Colors';
import { api } from '../../services/api';
import { Movie } from '../../types/Movies';

interface MovieCardProps {
  movie: Movie;
  onPress: () => void;
  onFavorite?: () => void;
  isFavorite?: boolean;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onPress,
  onFavorite,
  isFavorite = false
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Image
        source={{ uri: api.getImageUrl(movie.poster_path) }}
        style={styles.poster}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {movie.title}
        </Text>
        <Text style={styles.overview} numberOfLines={3}>
          {movie.overview}
        </Text>
        <View style={styles.footer}>
          <View style={styles.rating}>
            <Ionicons name="star" size={16} color={colors.accent} />
            <Text style={styles.ratingText}>
              {movie.vote_average.toFixed(1)}
            </Text>
          </View>
          {onFavorite && (
            <TouchableOpacity onPress={onFavorite} style={styles.favoriteButton}>
              <Ionicons
                name={isFavorite ? "heart" : "heart-outline"}
                size={24}
                color={isFavorite ? colors.secondary : colors.textSecondary}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  poster: {
    width: 100,
    height: 150,
  },
  content: {
    flex: 1,
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  overview: {
    fontSize: 14,
    color: colors.textSecondary,
    flex: 1,
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: colors.textSecondary,
    marginLeft: 4,
    fontSize: 14,
  },
  favoriteButton: {
    padding: 4,
  },
});