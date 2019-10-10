import React, { Component } from 'react';
import List from './List'
import './App.css';
import STORE from './STORE';
// import Card from './Card';

// function omit(obj, keyToOmit) {
//   return Object.entries(obj).reduce(
//     (newObj, [key, value]) =>
//         key === keyToOmit ? newObj : {...newObj, [key]: value},
//     {}
//   );
// }

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
      const newCard = newRandomCard()
      const addToList =
        this.state.store.lists.map(list => {
          if (list.id === listId) {
            return {
              ...list, cardIds: [...list.cardIds, newCard.id]
            };
          }
          return list;
        })
      this.setState({
          store: {
            list: addToList,
            allCards: {...this.state.store.allCards, [newCard.id]: newCard}
          }
      })
    }

    // handleDeleteCard = (cardId) => {
    //   const newList = this.state.lists.filter(itm => itm !== cardId)
    //   this.setState({
    //    lists: newList
    //    allCards: newCards
    //   })
    //   const newCards = omit (allCards, cardId)
    // }

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
              clickAdd={this.handleAddNewCard}
            />
          ))}
        </div>

      </main>
    );
  }
}

export default App;
