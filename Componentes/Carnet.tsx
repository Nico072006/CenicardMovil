import React, { useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  Animated, 
  Dimensions, 
  TouchableOpacity 
} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const FloatingDate = () => {
  const moveX = useRef(new Animated.Value(0)).current;
  const moveY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Le ponemos ": any" a los parámetros para que el editor NO los marque en rojo
    const animate = (anim: any, toValue: number, duration: number) => {
      Animated.sequence([
        Animated.timing(anim, { 
          toValue: toValue, 
          duration: duration, 
          useNativeDriver: true 
        }),
        Animated.timing(anim, { 
          toValue: 0, 
          duration: duration, 
          useNativeDriver: true 
        }),
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

const Carnet = () => {
  return (
    <View style={styles.container}>
      {/* HEADER */}
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

      {/* TITULO */}
      <View style={styles.blackBanner}>
        <Text style={styles.bannerText}>Carnet digital</Text>
      </View>

      {/* TARJETA PRINCIPAL */}
      <View style={styles.cardFrame}>
        <View style={styles.cardContent}>
          <FloatingDate />
          
          <View style={styles.avatarBorder}>
            <Image 
              source={{ uri: 'https://via.placeholder.com/150' }} 
              style={styles.avatar} 
            />
          </View>

          <View style={styles.pillWhite}><Text style={styles.pillText}>Brayan Bocanegra</Text></View>
          <View style={styles.pillGreen}><Text style={styles.pillTextWhite}>Ficha - 3066747</Text></View>
          <View style={styles.pillBlack}><Text style={styles.pillTextWhite}>Otros</Text></View>
        </View>
      </View>

      {/* NAVBAR INFERIOR */}
      <View style={styles.navBar}>
        <Text style={styles.navIcon}>🏠</Text>
        <Text style={styles.navIcon}>🤝</Text>
        <View style={styles.activeTab}><Text style={styles.navIcon}>🪪</Text></View>
        <Text style={styles.navIcon}>🚪</Text>
      </View>
    </View>
  );
};

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
  navIcon: { fontSize: 24 }
});

export default Carnet;