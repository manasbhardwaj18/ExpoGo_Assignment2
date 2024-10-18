import React from 'react';
import Navigation from '../app/Navigation';
import { registerRootComponent } from 'expo';

export default function App() {
  return <Navigation />;
}
registerRootComponent(App);
