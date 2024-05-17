import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Button, Alert } from "react-native";
import Contatos from "./Contatos";

import { db } from "../config/config";
import { ref, onValue, remove } from "firebase/database";

const Inicial = ({ navigation }) => {
  const [contatos, setContatos] = useState([]);

  useEffect(() => {
    const contatosRef = ref(db, '/Contatos');
    onValue(contatosRef, (snapshot) => {
      let data = snapshot.val();
      if (data) {
        let contatos = Object.entries(data).map(([key, value]) => {
          return { key, ...value };
        });
        setContatos(contatos);
      } else {
        setContatos([]);
      }
    });
  }, []);

  const removerContato = (index) => {
    const contatoARemover = contatos[index];
    const contatoKey = contatoARemover.key;
    remove(ref(db, `/Contatos/${contatoKey}`))
      .then(() => {
        Alert.alert('Contato removido com sucesso!');
      })
      .catch((error) => {
        Alert.alert('Erro ao remover o contato:', error.message);
      });
  };

  const editarContato = (contato) => {
    navigation.navigate('Editar', {
      contato: contato.Contato,
      telefone: contato.Telefone,
      contatos: contatos
    });
  };

  return (
    <View style={styles.container}>
      {contatos.length > 0 ? (
        <Contatos contatos={contatos} onRemoverContato={removerContato} onEditarContato={editarContato} />
      ) : (
        <Text style={styles.text}>Não há contatos cadastrados!</Text>
      )}

      <View style={styles.botao}>
        <Button
          title="Adicionar Contato"
          onPress={() => navigation.navigate('Adicionar')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  botao: {
    margin: 10
  }
});

export default Inicial;