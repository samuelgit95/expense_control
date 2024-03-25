import { useState } from 'react';
import { expense_control_backend } from 'declarations/expense_control_backend';

function App() {
  const [greeting, setGreeting] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    const currentDate = new Date().toDateString();
    const description = event.target.elements.description.value;
    const category = event.target.elements.category.value;
    const value_input = event.target.elements.value_input.value;
    //const entry = {
    //  date: date,
    //  description: description,
    //  category: category,
    //  value: value
    //}
    const entry = {};
    entry['date'] = currentDate;
    entry['description'] = description;
    entry['category'] = category;
    entry['value'] = parseFloat(value_input);    
    /* expense_control_backend.createEntry(entry).then((greeting) => {
      setGreeting(greeting);
    }); */
    const create_entry = await expense_control_backend.createEntry(entry);
    setGreeting(JSON.stringify(entry));
    
    return false;
  }

  return (
    <main>
      <img src="/logo2.svg" alt="DFINITY logo" />
      <br />
      <br />
      <form action="#" onSubmit={handleSubmit}>
        <div className='field'>
        <label htmlFor="description">Enter the description: &nbsp;</label>
        <input id="description" alt="Name" type="text" />
        </div>
        <div className='field'>
        <label htmlFor="category">Enter the category: &nbsp;</label>
        <input id="category" alt="Name" type="text" />
        </div>
        <div className='field'>
        <label htmlFor="value_input">Enter the value: &nbsp;</label>
        <input id="value_input" alt="Name" type="number" />
        </div>
        <button type="submit">Click Me!</button>
      </form>
      <section id="greeting">{greeting}</section>
    </main>
  );
}

export default App;
