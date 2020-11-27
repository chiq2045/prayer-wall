import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';
configure({ adapter: new Adapter });

describe('App works', () => {
  it('renders without crashing', () => {
    shallow(<App />);
  });
  it('renders `Hello World`', () => {
    expect(shallow(<App />).contains('Hello World')).toEqual(true);
  });
});
