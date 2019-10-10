import React, { Component } from 'react';
import List from './List'
import './App.css';
import './STORE';
import Card from './Card';

function omit(obj, keyToOmit) {
  return Object.entries(obj).reduce(
    (newObj, [key, value]) =>
        key === keyToOmit ? newObj : {...newObj, [key]: value},
    {}
  );
}

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

    handleDeleteCard = (cardId) => {
      const newList = this.state.lists.filter(itm => itm !== cardId)
      const newCard =
      this.setState({
       lists: newList
       allCards: newCards
      })
      const newCards = omit (allCards, cardId)
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
          cards={this.state.STORE.allCards}
          onDeleteItem={this.handleDeleteItem}
          onnewRandomCard={this.newRandomCard}
          />
        </section>
      </main>
    );
  }
}

export default App;
