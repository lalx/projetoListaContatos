// App.js
import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Inicial from "./componentes/Inicial";
import AdicionaContatos from "./componentes/AdicionaContatos";
import EditarContato from "./componentes/EditarContato";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Inicial" component={Inicial} />
        <Stack.Screen name="Adicionar" component={AdicionaContatos} />
        <Stack.Screen name="Editar" component={EditarContato} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}