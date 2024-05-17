import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput, Button, Alert } from "react-native";

import { db } from "../config/config";
import { ref, push } from "firebase/database";

const AdicionaContatos = ({ navigation }) => {
  const [contato, setContato] = useState('');
  const [telefone, setTelefone] = useState('');

  const salvarContato = () => {
    if (contato && telefone) {
      const contatosRef = ref(db, '/Contatos');
      push(contatosRef, {
        Contato: contato,
        Telefone: telefone 
      }).then(() => {
        Alert.alert('Contato Salvo!');
        setContato('');
        setTelefone('');
      }).catch(error => {
        Alert.alert('Erro ao salvar o contato: ', error.message);
      });
    } else {
      Alert.alert('Por favor, preencha todos os campos.');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome:</Text>
      <TextInput
        style={styles.input}
        value={contato}
        onChangeText={setContato}
      />
      <Text style={styles.label}>Telefone:</Text>
      <TextInput
        style={styles.input}
        value={telefone}
        onChangeText={setTelefone}
        keyboardType="phone-pad"
      />
      <Button title="Adicionar" onPress={salvarContato} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    height: 40,
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});

export default AdicionaContatos;