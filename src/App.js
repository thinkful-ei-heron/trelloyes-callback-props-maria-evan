import React, { Component } from 'react';
import List from './List'
import './App.css';
import STORE from './STORE';
// import Card from './Card';

function omit(obj, keyToOmit) {
  return Object.entries(obj).reduce(
    (newObj, [key, value]) =>
        key === keyToOmit ? newObj : {...newObj, [key]: value},
    {}
  );
}

const newRandomCard = () => {
  const id = Math.random().toString(36).substring(2, 4)
    + Math.random().toString(36).substring(2, 4);
  return {
    id,
    title: `Random Card ${id}`,
    content: 'lorem ipsum',
  }
}

class App extends Component {
    state = {
      store: STORE,
    };

    handleAddNewCard = (listId) => {
      console.log('handle to add a random card is called')
      const newCard = newRandomCard()
      const addToList =
        this.state.store.lists.map(list => {
          if (list.id === listId) {
            return {
              ...list, 
              cardIds: [...list.cardIds, newCard.id]
            };
          }
          return list;
        })
      this.setState({
          store: {
            lists: addToList,
            allCards: {
              ...this.state.store.allCards,
              [newCard.id]: newCard}
          }
      })
    }

    handleDeleteCard = (cardId) => {
      console.log('handle delete item called', {cardId})
      const newList = this.state.store.lists.map(list => ({
        ...list, 
        cardIds: list.cardIds.filter(item => item !== cardId)
      }))
      // const newList2 = this.state.lists.map((item => ...item, cardId)
      console.log(newList, 'test')
      const newCards = omit (this.state.store.allCards, cardId)
      this.setState({
        store: {
       lists: newList,
       allCards: newCards
      }})
    }

  render() {
    const { store } = this.state
    return (
      <main className='App'>
        <header className='App-header'>
          <h1>Trelloyes!</h1>
        </header>
        <div className='App-list'>
          {store.lists.map(list => (
            <List
              id={list.id}
              key={list.id}
              header={list.header}
              cards={list.cardIds.map(id => store.allCards[id])}
              handleAddNewCard={this.handleAddNewCard}
              handleDeleteCard={this.handleDeleteCard}
            />
          ))}
        </div>

      </main>
    );
  }
}

export default App;
