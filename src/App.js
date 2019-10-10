import React, { Component } from 'react';
import List from './List'
import './App.css';
import './STORE';
class App extends Component {
    state = {
      STORE:[]
    };

    newRandomCard = () => {
      const id = Math.random().toString(36).substring(2, 4)
        + Math.random().toString(36).substring(2, 4);
      return {
        id,
        title: `Random Card ${id}`,
        content: 'lorem ipsum',
      }
    }
    handleDeleteItem = (item) => {
      const newItems = this.state.shoppingItems.filter(itm => itm !== item)
      this.setState({
        shoppingItems: newItems
      })
    }

  render() {
    const { store } = this.props
    return (
      <main className='App'>
        <header className='App-header'>
          <h1>Trelloyes!</h1>
        </header>
        <div className='App-list'>
          {store.lists.map(list => (
            <List
              key={list.id}
              header={list.header}
              cards={list.cardIds.map(id => store.allCards[id])}
            />
          ))}
        </div>
        <section>
          <Card 
          cards={this.state.STORE}
          onDeleteItem={this.handleDeleteItem}
          onnewRandomCard={this.newRandomCard}
          />
        </section>
      </main>
    );
  }
}

export default App;
