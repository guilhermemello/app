import {FontAwesome} from '../../assets/icons';
import * as Screens from '../../screens/index';
import _ from 'lodash';

export const MainRoutes = [
  {
    id: 'Modulo',
    title: 'Módulos',
    icon: FontAwesome.video,
    screen: Screens.Modulos,
    children: [
      {
        id: 'ModulosDetalhe',
        title: 'Módulo',
        icon: FontAwesome.video,
        screen: Screens.ModulosDetalhe,
        children: []
      }
    ]
  },
  {
    id: 'Aulas',
    title: 'Aulas',
    icon: FontAwesome.video,
    screen: Screens.Aulas,
    children: [
      {
        id: 'AulasDetalhe',
        title: 'Aula',
        icon: FontAwesome.video,
        screen: Screens.AulasDetalhe,
        children: []
      }
    ]
  },
  {
    id: 'Redacoes',
    title: 'Redações',
    icon: FontAwesome.video,
    screen: Screens.Redacoes,
    children: [
      {
        id: 'RedacaoDetalhe',
        title: 'Redação',
        icon: FontAwesome.video,
        screen: Screens.RedacaoDetalhe,
        children: []
      }
    ]
  },
  {
    id: 'Tema',
    title: 'Tema',
    icon: FontAwesome.video,
    screen: Screens.Tema,
    children: []
  },
  {
    id: 'Browser',
    title: 'Browser',
    icon: FontAwesome.video,
    screen: Screens.Browser,
    children: []
  },
  {
    id: 'Player',
    title: 'Player',
    icon: FontAwesome.video,
    screen: Screens.Player,
    children: []
  },
  {
    id: 'Comentarios',
    title: 'Comentários',
    icon: FontAwesome.video,
    screen: Screens.Comentarios,
    children: []
  }
];

export const OtherRoutes = [
  {
    id: 'Modulo',
    title: 'Módulos',
    icon: FontAwesome.folder,
    screen: Screens.Modulos,
    children: [
      {
        id: 'ModulosDetalhe',
        title: 'Módulo',
        icon: FontAwesome.video,
        screen: Screens.ModulosDetalhe,
        children: []
      }
    ]
  },
  {
    id: 'Sobre',
    title: 'Sobre',
    icon: FontAwesome.info,
    screen: Screens.Modulos
  }
]

export const MenuRoutes = MainRoutes;
