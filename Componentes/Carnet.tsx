import React, { useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  Animated, 
  Dimensions, 
  TouchableOpacity,
  ScrollView 
} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// --- COMPONENTE FECHA FLOTANTE ---
const FloatingDate = () => {
  const moveX = useRef(new Animated.Value(0)).current;
  const moveY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animate = (anim, toValue, duration) => {
      Animated.sequence([
        Animated.timing(anim, { toValue, duration, useNativeDriver: true }),
        Animated.timing(anim, { toValue: 0, duration, useNativeDriver: true }),
      ]).start(() => animate(anim, toValue, duration));
    };
    animate(moveX, 120, 3000); 
    animate(moveY, 200, 5000); 
  }, []);

  return (
    <Animated.View style={[
      styles.floatingBadge, 
      { transform: [{ translateX: moveX }, { translateY: moveY }, { rotate: '-15deg' }] }
    ]}>
      <Text style={styles.floatingText}>15/12/2025</Text>
    </Animated.View>
  );
};

// --- PANTALLA 2: INFORMACIÓN (LA PARTE TRASERA) ---
const InfoCarnet = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.welcomeBox}>
          <Text style={styles.welcomeText}>Bienvenido a</Text>
          <Text style={styles.brandText}>CENICARD</Text>
        </View>
        <TouchableOpacity style={styles.bellBtn} onPress={() => navigation.goBack()}>
          <Text style={{fontSize: 20}}>🔙</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.blackBanner}>
        <Text style={styles.bannerText}>Carnet digital</Text>
      </View>

      <View style={styles.cardFrame}>
        <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
          <View style={[styles.pillWhite, {marginTop: 10}]}>
            <Text style={styles.pillText}>Datos del usuario</Text>
          </View>
          
          {/* Filas de Datos según tu imagen */}
          <View style={styles.infoRow}>
            <View style={styles.labelGreen}><Text style={styles.pillTextWhite}>Eps</Text></View>
            <View style={styles.valueBox}><Text>Compensar</Text></View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.labelGreen}><Text style={styles.pillTextWhite}>RH</Text></View>
            <View style={styles.valueBox}><Text>O+</Text></View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.labelGreen}><Text style={styles.pillTextWhite}>Contacto de emergencia</Text></View>
            <View style={styles.valueBox}><Text>3156426181</Text></View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.labelGreen}><Text style={styles.pillTextWhite}>Parentesco</Text></View>
            <View style={styles.valueBox}><Text>Pendiente</Text></View>
          </View>

          <TouchableOpacity style={styles.editBtn}>
            <Text style={styles.pillText}>Editar</Text>
          </TouchableOpacity>

          <View style={[styles.pillGreen, {width: '90%', marginTop: 20}]}>
            <Text style={styles.pillTextWhite}>Información complementaria</Text>
          </View>
          
          <Text style={styles.smallNote}>¿Hay algo condición o situación a tener en cuenta?</Text>
          
          <TouchableOpacity style={styles.editBtn}>
            <Text style={styles.pillText}>Agregar</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

// --- PANTALLA 1: CARNET PRINCIPAL ---
const Carnet = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.welcomeBox}>
          <Text style={styles.welcomeText}>Bienvenido a</Text>
          <Text style={styles.brandText}>CENICARD</Text>
        </View>
        <TouchableOpacity style={styles.bellBtn}>
          <Text style={{fontSize: 24}}>🔔</Text>
          <View style={styles.notifBadge} />
        </TouchableOpacity>
      </View>

      <View style={styles.blackBanner}>
        <Text style={styles.bannerText}>Carnet digital</Text>
      </View>

      <View style={styles.cardFrame}>
        <View style={styles.cardContent}>
          <FloatingDate />
          <View style={styles.avatarBorder}>
            <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.avatar} />
          </View>
          <View style={styles.pillWhite}><Text style={styles.pillText}>Brayan Bocanegra</Text></View>
          <View style={styles.pillGreen}><Text style={styles.pillTextWhite}>Ficha - 3066747</Text></View>
          <TouchableOpacity 
            style={styles.pillBlack} 
            onPress={() => navigation.navigate('PantallaInfo')}
          >
            <Text style={styles.pillTextWhite}>Otros</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.navBar}>
        <Text style={styles.navIcon}>🏠</Text>
        <Text style={styles.navIcon}>🤝</Text>
        <View style={styles.activeTab}><Text style={styles.navIcon}>🪪</Text></View>
        <Text style={styles.navIcon}>🚪</Text>
      </View>
    </View>
  );
};

// --- CONFIGURACIÓN DE NAVEGACIÓN ---
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Principal" component={Carnet} />
        <Stack.Screen name="PantallaInfo" component={InfoCarnet} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// --- ESTILOS ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', paddingHorizontal: 20, paddingTop: 50 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  welcomeBox: { backgroundColor: '#000', padding: 12, borderRadius: 20, flex: 0.75, borderWidth: 2, borderColor: '#000' },
  welcomeText: { color: '#FFF', fontSize: 14 },
  brandText: { color: '#00C853', fontSize: 20, fontWeight: 'bold' },
  bellBtn: { borderWidth: 3, borderColor: '#000', borderRadius: 15, padding: 8, justifyContent: 'center', alignItems: 'center' },
  notifBadge: { position: 'absolute', top: 5, right: 5, backgroundColor: '#00C853', width: 12, height: 12, borderRadius: 6, borderWidth: 2, borderColor: '#000' },
  blackBanner: { backgroundColor: '#000', borderRadius: 30, padding: 12, alignItems: 'center', marginBottom: 20 },
  bannerText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  cardFrame: { 
    flex: 0.8, borderWidth: 3, borderColor: '#000', borderRadius: 40, 
    backgroundColor: '#FDFBE2', padding: 15, marginBottom: 80,
    elevation: 10 
  },
  cardContent: { flex: 1, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  floatingBadge: { position: 'absolute', top: 10, left: 10, borderWidth: 2, borderColor: '#000', borderRadius: 12, padding: 6, backgroundColor: '#FFF', zIndex: 10 },
  floatingText: { fontWeight: 'bold', fontSize: 12, color: '#000' },
  avatarBorder: { borderWidth: 3, borderColor: '#000', borderRadius: 100, padding: 5, marginBottom: 20, backgroundColor: '#FFF' },
  avatar: { width: 150, height: 150, borderRadius: 75 },
  pillWhite: { backgroundColor: '#FFF', borderWidth: 2, borderColor: '#000', borderRadius: 20, paddingVertical: 8, width: '90%', alignItems: 'center', marginBottom: 10 },
  pillGreen: { backgroundColor: '#00C853', borderWidth: 2, borderColor: '#000', borderRadius: 20, paddingVertical: 8, width: '90%', alignItems: 'center', marginBottom: 10 },
  pillBlack: { backgroundColor: '#000', borderWidth: 2, borderColor: '#000', borderRadius: 20, paddingVertical: 8, width: '90%', alignItems: 'center' },
  pillText: { fontWeight: 'bold', color: '#000' },
  pillTextWhite: { fontWeight: 'bold', color: '#FFF' },
  navBar: { 
    position: 'absolute', bottom: 25, left: 20, right: 20, 
    flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center',
    borderWidth: 3, borderColor: '#000', borderRadius: 25, padding: 10, backgroundColor: '#FFF'
  },
  activeTab: { backgroundColor: '#00C853', padding: 8, borderRadius: 15, borderWidth: 2, borderColor: '#000' },
  navIcon: { fontSize: 24 },
  // Estilos de la parte trasera
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', width: '95%', marginTop: 15 },
  labelGreen: { backgroundColor: '#00C853', padding: 8, borderRadius: 10, flex: 0.45, borderWeight: 1, borderColor: '#000', borderWidth: 1 },
  valueBox: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#000', padding: 8, borderRadius: 10, flex: 0.5, alignItems: 'center' },
  editBtn: { borderWidth: 1, borderColor: '#000', borderRadius: 15, paddingHorizontal: 20, paddingVertical: 5, marginTop: 10 },
  smallNote: { fontSize: 10, textAlign: 'center', marginTop: 10 }
});
