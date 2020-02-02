import React from 'react';
import Graphy from './containers/Graphy';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { 
  faCheckSquare, 
  faCoffee, 
  faQuestion, 
  faTrash, 
  faSave, 
  faFileUpload, 
  faSearchMinus, 
  faSearchPlus,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

library.add(
  fab, 
  faQuestion, 
  faCheckSquare, 
  faCoffee, 
  faTrash, 
  faSave, 
  faFileUpload, 
  faSearchMinus,
  faSearchPlus,
  faTimes
);

function App() {
  return (
    <div>
      <Graphy />
    </div>
  );
}

export default App;
