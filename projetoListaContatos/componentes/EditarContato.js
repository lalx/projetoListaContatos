import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput, Button, Alert } from "react-native";

import { db } from "../config/config";
import { ref, update } from "firebase/database";

const EditarContato = ({ route, navigation }) => {
const { contato, telefone, contatos } = route.params;
  const [novoContato, setNovoContato] = useState(contato);
  const [novoTelefone, setNovoTelefone] = useState(telefone);

  const salvarEdicao = () => {
    // Encontrar o contato com os detalhes existentes
    const contatoExistente = contatos.find(c => c.Contato === contato && c.Telefone === telefone);

    if (contatoExistente) {
      update(ref(db, `/Contatos/${contatoExistente.key}`), {
        Contato: novoContato,
        Telefone: novoTelefone 
      }).then(() => {
        Alert.alert('Contato atualizado com sucesso!');
        navigation.goBack();
      }).catch(error => {
        Alert.alert('Erro ao atualizar o contato: ', error.message);
      });
    } else {
      Alert.alert('Contato não encontrado.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome:</Text>
      <TextInput
        style={styles.input}
        value={novoContato}
        onChangeText={setNovoContato}
      />
      <Text style={styles.label}>Telefone:</Text>
      <TextInput
        style={styles.input}
        value={novoTelefone}
        onChangeText={setNovoTelefone}
        keyboardType="phone-pad"
      />
      <Button title="Salvar" onPress={salvarEdicao} />
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

export default EditarContato;