declare module 'react-native-snap-carousel' {
    import { Component } from 'react';
    import { ViewStyle, StyleProp } from 'react-native';

    export interface CarouselProps {
        data: any[];
        renderItem: (item: any) => JSX.Element;
        sliderWidth: number;
        itemWidth: number;
        layout?: 'default' | 'stack' | 'tinder' | 'default';
        layoutCardOffset?: number;
        containerCustomStyle?: StyleProp<ViewStyle>;
        onSnapToItem?: (index: number) => void;
        loop?: boolean;               // Add loop property
        autoplay?: boolean;           // Add autoplay property
        autoplayInterval?: number;    // Add autoplayInterval property
        // Add any other props you are using
    }

    export default class Carousel extends Component<CarouselProps> {}
}
