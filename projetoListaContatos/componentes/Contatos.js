import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import PropTypes from "prop-types";

class Contatos extends React.Component {
    static propTypes = {
        contatos: PropTypes.array.isRequired,
        onRemoverContato: PropTypes.func.isRequired, 
        onEditarContato: PropTypes.func.isRequired
    }

    render() {
        return (
            <View style={estilos.listaContatos}>
                {this.props.contatos.map((contato, index) => (
                    <View style={estilos.card} key={index}>
                        <View>
                            <Text style={estilos.textContatos}>{contato.Contato}</Text>
                            <Text style={estilos.textContatos}>{contato.Telefone}</Text>
                        </View>
                        <View style={estilos.botoesContainer}>
                            <Button
                                title="Editar"
                                onPress={() => this.props.onEditarContato(contato)}
                                color="orange"
                            />
                            <Button
                                title="Remover"
                                onPress={() => this.props.onRemoverContato(index)}
                                color="red"
                            />
                        </View>
                    </View>
                ))}
            </View>
        );
    }
}

const estilos = StyleSheet.create({
    listaContatos: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    textContatos: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5,
    },
    botoesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
});

export default Contatos;