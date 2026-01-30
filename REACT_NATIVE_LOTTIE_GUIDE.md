# 🎨 Lottie Animations - Guia Completo React Native/Expo

## ❌ ERRO COMUM
```javascript
// ❌ NÃO FUNCIONA no React Native/Expo
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
```
**Motivo:** Essa lib usa DOM, que não existe no React Native.

## ✅ FORMA CORRETA - React Native/Expo

### 1️⃣ Instalação
```bash
# Para Expo
expo install lottie-react-native

# Para React Native CLI
npm install lottie-react-native
# + configuração nativa (iOS/Android)
```

### 2️⃣ Estrutura de arquivos
```
assets/
└── animations/
    ├── liquid-glass.json
    ├── loading.json
    └── success.json
```

### 3️⃣ Implementação básica
```jsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

export default function LiquidGlassAnimation() {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/animations/liquid-glass.json')}
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0F1419',
  },
  animation: {
    width: 200,
    height: 200,
  },
});
```

### 4️⃣ Controle avançado da animação
```jsx
import React, { useRef, useEffect } from 'react';
import { View, Pressable, Text } from 'react-native';
import LottieView from 'lottie-react-native';

export default function ControlledAnimation() {
  const animationRef = useRef(null);

  useEffect(() => {
    // Auto-play ao montar
    animationRef.current?.play();
  }, []);

  const handlePlay = () => {
    animationRef.current?.play();
  };

  const handlePause = () => {
    animationRef.current?.pause();
  };

  const handleReset = () => {
    animationRef.current?.reset();
    animationRef.current?.play();
  };

  return (
    <View style={styles.container}>
      <LottieView
        ref={animationRef}
        source={require('../assets/animations/liquid-glass.json')}
        loop={false}
        style={styles.animation}
      />
      
      <View style={styles.controls}>
        <Pressable style={styles.button} onPress={handlePlay}>
          <Text style={styles.buttonText}>Play</Text>
        </Pressable>
        
        <Pressable style={styles.button} onPress={handlePause}>
          <Text style={styles.buttonText}>Pause</Text>
        </Pressable>
        
        <Pressable style={styles.button} onPress={handleReset}>
          <Text style={styles.buttonText}>Reset</Text>
        </Pressable>
      </View>
    </View>
  );
}
```

### 5️⃣ Ícone animado como botão (UX premium)
```jsx
import React, { useRef } from 'react';
import { Pressable } from 'react-native';
import LottieView from 'lottie-react-native';

export default function AnimatedButton({ onPress }) {
  const animationRef = useRef(null);

  const handlePress = () => {
    // Trigger animation
    animationRef.current?.reset();
    animationRef.current?.play();
    
    // Execute callback
    onPress?.();
  };

  return (
    <Pressable onPress={handlePress} style={styles.button}>
      <LottieView
        ref={animationRef}
        source={require('../assets/animations/button-icon.json')}
        loop={false}
        style={styles.icon}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  icon: {
    width: 24,
    height: 24,
  },
});
```

### 6️⃣ Loading com animação
```jsx
import React from 'react';
import { View, Text } from 'react-native';
import LottieView from 'lottie-react-native';

export default function LoadingScreen() {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/animations/loading.json')}
        autoPlay
        loop
        style={styles.loading}
      />
      <Text style={styles.text}>Carregando...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  loading: {
    width: 100,
    height: 100,
  },
  text: {
    color: 'white',
    marginTop: 16,
    fontSize: 16,
  },
});
```

## 🔥 Boas Práticas

### ✅ FAZER
- Usar JSON local (require('./path/to/animation.json'))
- Arquivos < 200KB para performance
- Desativar loop quando não necessário
- Animações curtas para microinterações
- Usar refs para controle preciso
- Testar em dispositivos reais

### ❌ NÃO FAZER
- URLs remotas para .lottie
- Arquivos muito pesados (> 500KB)
- Loop infinito desnecessário
- Animações muito longas (> 3s)
- Animações complexas em listas

## 📱 Quando usar cada formato

| Ambiente | Formato | Lib |
|----------|---------|-----|
| **React Web** | `.lottie` / `.json` | `@lottiefiles/dotlottie-react` |
| **React Native** | `.json` local | `lottie-react-native` |
| **Expo** | `.json` local | `lottie-react-native` |

## 🎯 Performance Tips

1. **Pré-carregamento**
```jsx
// Pré-carrega a animação
import animationData from '../assets/animations/liquid-glass.json';

<LottieView
  source={animationData} // Mais rápido que require()
  autoPlay
  loop
/>
```

2. **Lazy Loading**
```jsx
import { lazy, Suspense } from 'react';

const LottieAnimation = lazy(() => import('./LottieAnimation'));

<Suspense fallback={<LoadingSpinner />}>
  <LottieAnimation />
</Suspense>
```

3. **Renderização condicional**
```jsx
const [showAnimation, setShowAnimation] = useState(false);

// Só renderiza quando necessário
{showAnimation && (
  <LottieView
    source={require('../assets/animations/liquid-glass.json')}
    autoPlay
    loop={false}
    onAnimationFinish={() => setShowAnimation(false)}
  />
)}
```

## 🚀 Resultado Final
- ✅ Funciona perfeitamente no iOS e Android
- ✅ Performance otimizada
- ✅ UX de app internacional
- ✅ Controle total da animação
- ✅ Padrão usado em produção