import React from 'react';
import {
  View,
  Text,
  ScrollView
} from 'react-native';

import {
  RkText,
  RkStyleSheet,
  RkTheme
} from 'react-native-ui-kitten';

export class Sobre extends React.Component {
  static navigationOptions = {
    title: 'SOBRE'
  };

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <ScrollView>
        <Text style={styles.centering}>
        O Redação Perfeita tem o objetivo de desenvolver a capacidade de escrever em seus estudantes. Nosso sistema de educação se baseia na escolha de um foco que vai direcionar o preparo do candidato ao ENEM, a concursos públicos e às bancas CESPE, FCC, FGV, Cesgranrio e ESAF.
        {'\n\n'}
De acordo com o foco escolhido, o estudante assistirá videoaulas, enviará sua redação para correção personalizada de nossos professores e poderá tirar dúvidas sobre seus erros e dificuldades.
        {'\n\n'}
Oferecemos um ambiente tecnológico de fácil utilização, com professores qualificados e experientes que podem atender os alunos de maneira personalizada.
        {'\n\n'}
O nome de nosso domínio resume nosso desafio: fazer com que cada um de nossos estudantes possa desenvolver gradativamente sua capacidade de escrever até obter a nota máxima em seu exame – com uma redação perfeita!
        </Text>
      </ScrollView>
    )
  }
}

let styles = RkStyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.colors.screen.scroll
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  }
}));
