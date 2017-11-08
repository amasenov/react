import React, { PureComponent } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import Aux from '../hoc/Aux';
import withClass from '../hoc/withClass';

class App extends PureComponent {
  constructor(props) {
    super(props);
    console.log('[App.js] Inside Constructor', props);
    this.state = {
      persons: [
        { id: 'key1a', name: 'John', age: 25 },
        { id: 'key2b', name: 'Jim', age: 35 },
        { id: 'key3c', name: 'Jack', age: 29 },
        { id: 'key4d', name: 'Aleks', age: 26 }
      ],
      otherState: 'some other value',
      showPersons: false,
      toggleClicked: 0
    };
  }

  componentWillMount() {
    console.log('[App.js] Inside componentWillMount()');
  }
  
  componentDidMount() {
    console.log('[App.js] Inside componentDidMount()');
  }
  
  // shouldComponentUpdate(nextProps, nextState) {
  //     console.log('[UPDATED App.js] Inside shouldComponentUpdate', nextProps, nextState);
  //     return nextState.persons !== this.state.persons ||
  //      nextState.showPersons !== this.state.showPersons;
  // }
  
  componentWillUpdate(nextProps, nextState) {
      console.log('[UPDATED App.js] Inside componentWillUpdate', nextProps, nextState);
  }
  
  componentDidUpdate() {
      console.log('[UPDATED App.js] Inside componentDidUpdate');
  }

  // state = {
  //   persons: [
  //     { id: 'key1a', name: 'John', age: 25 },
  //     { id: 'key2b', name: 'Jim', age: 35 },
  //     { id: 'key3c', name: 'Jack', age: 29 },
  //     { id: 'key4d', name: 'Aleks', age: 26 }
  //   ],
  //   otherState: 'some other value',
  //   showPersons: false
  // }

  nameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });
    const person = {
      ...this.state.persons[personIndex]
    };
    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex]=person;
    this.setState({persons: persons});
  }

  deletePersonHandler = ( personIndex ) => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState( { persons: persons } );
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState( (prevState, props) => {
        return {
          showPersons: !doesShow,
          toggleClicked: prevState.toggleClicked + 1
        }
    } );
  }

  render() {
    console.log('[App.js] Inside Render()');
    let persons = null;

    if(this.state.showPersons) {
      persons = <Persons
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangeHandler} />;
    }

    return (
      <Aux>
        <button onClick={ () => {this.setState({showPersons: true})}}>Show Persons</button>
            <Cockpit
            appTitle={this.props.title}
            showPersons={this.state.showPersons}
            persons={this.state.persons}
            clicked={this.togglePersonsHandler}/>
            {persons}
      </Aux>
    );
    // return React.createElement('div', { className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default withClass(App, classes.App);
