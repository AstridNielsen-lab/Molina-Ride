import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Phone, Globe } from 'lucide-react-native';

export default function ContactScreen() {
  const openWhatsApp = () => {
    Linking.openURL('https://wa.me/5511992946628');
  };

  const openWebsite = () => {
    Linking.openURL('https://likelook.wixsite.com/solutions');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Contato</Text>
        
        <View style={styles.developerInfo}>
          <Text style={styles.developerName}>Julio Campos Machado</Text>
          <Text style={styles.companyName}>Like Look Solutions</Text>
        </View>

        <TouchableOpacity style={styles.contactButton} onPress={openWhatsApp}>
          <Phone size={24} color="#ffffff" />
          <Text style={styles.buttonText}>WhatsApp</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.websiteButton} onPress={openWebsite}>
          <Globe size={24} color="#ffffff" />
          <Text style={styles.buttonText}>Website</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    padding: 20,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: '#1a1a1a',
    marginBottom: 24,
  },
  developerInfo: {
    marginBottom: 32,
  },
  developerName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: '#1a1a1a',
    marginBottom: 4,
  },
  companyName: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#666666',
  },
  contactButton: {
    backgroundColor: '#25D366',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  websiteButton: {
    backgroundColor: '#0066cc',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
  },
  buttonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#ffffff',
    marginLeft: 12,
  },
});