import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const vehicles = [
  {
    id: 1,
    name: 'Bicicleta Elétrica',
    image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=500',
    pricePerHour: 30,
  },
  {
    id: 2,
    name: 'Patinete Elétrico',
    image: 'https://images.unsplash.com/photo-1606220838315-056192d5e927?q=80&w=500',
    pricePerHour: 30,
  },
  {
    id: 3,
    name: 'Jet Ski',
    image: 'https://images.unsplash.com/photo-1626447852999-c535d3a40825?q=80&w=500',
    pricePerHour: 30,
  },
  {
    id: 4,
    name: 'Carro',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=500',
    pricePerHour: 30,
  },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Molina Ride</Text>
          <Text style={styles.subtitle}>Alugue seu veículo favorito</Text>
        </View>

        <View style={styles.vehiclesGrid}>
          {vehicles.map((vehicle) => (
            <TouchableOpacity key={vehicle.id} style={styles.vehicleCard}>
              <Image source={{ uri: vehicle.image }} style={styles.vehicleImage} />
              <View style={styles.vehicleInfo}>
                <Text style={styles.vehicleName}>{vehicle.name}</Text>
                <Text style={styles.vehiclePrice}>R$ {vehicle.pricePerHour}/hora</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: '#1a1a1a',
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#666666',
    marginTop: 4,
  },
  vehiclesGrid: {
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  vehicleCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  vehicleImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  vehicleInfo: {
    padding: 12,
  },
  vehicleName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1a1a1a',
  },
  vehiclePrice: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#0066cc',
    marginTop: 4,
  },
});