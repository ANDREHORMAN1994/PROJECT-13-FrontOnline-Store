import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import FinishCart from './pages/FinishCart';
import ProductDetails from './pages/ProductDetails';

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Home } />
            <Route path="/Cart/Finish" component={ FinishCart } />
            <Route path="/Cart" component={ Cart } />
            <Route
              path="/:categoryId/:search/:id"
              render={ (props) => <ProductDetails { ...props } /> }
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
