import React from 'react';
class About extends React.Component {
   render() {
      return (
         <div style={{fontFamily: "Times, serif"}}>
            <h1>What is React?</h1>
            <h3>React is a declarative, efficient, and flexible JavaScript library for building user interfaces.

React has a few different kinds of components, but we'll start with React.Component subclasses:</h3>
                <p style={{color:'#898686'}}>We'll get to the funny XML-like tags in a second. Your components tell React what you want to render – then React will efficiently update and render just the right components when your data changes.

Here, ShoppingList is a React component class, or React component type. A component takes in parameters, called props, and returns a hierarchy of views to display via the render method.

The render method returns a description of what you want to render, and then React takes that description and renders it to the screen. In particular, render returns a React element, which is a lightweight description of what to render. Most React developers use a special syntax called JSX which makes it easier to write these structures. The <div /> syntax is transformed at build time to React.createElement('div'). The example above is equivalent to:

return React.createElement('div', {},
  React.createElement('h1', /* ... h1 children ... */),
  React.createElement('ul', /* ... ul children ... */)
);
</p>
            
         </div>
      )
   }
}

export default About;