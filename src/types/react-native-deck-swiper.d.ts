declare module 'react-native-deck-swiper' {
  import { Component } from 'react';
  import { ViewStyle } from 'react-native';

  interface SwiperProps {
    cards: any[];
    renderCard: (card: any, index: number) => JSX.Element;
    cardIndex?: number;
    onSwiped?: (cardIndex: number) => void;
    stackSize?: number;
    infinite?: boolean;
    backgroundColor?: string;
    overlayLabels?: any;
    animateOverlayLabelsOpacity?: boolean;
    animateCardOpacity?: boolean;
    swipeBackCard?: boolean;
    cardVerticalMargin?: number;
    stackSeparation?: number;
    containerStyle?: ViewStyle;
  }

  export default class Swiper extends Component<SwiperProps> {
    swipeLeft(): void;
    swipeRight(): void;
    swipeTop(): void;
    swipeBack(): void;
  }
}
