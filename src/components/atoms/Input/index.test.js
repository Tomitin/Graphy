import React from 'react';
import { shallow } from 'enzyme';
import Input from '.';

const wrap = (props = {}) => shallow(<Input {...props} />).dive();

it('renders props when passed in', ()=> {
    const wrapper = wrap({ type: 'text'});
    expect(wrapper.find({ type: 'text'})).to.have.lengthOf(1);

})