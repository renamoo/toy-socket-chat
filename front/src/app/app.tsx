import Fab from '@material-ui/core/Fab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import NavigationIcon from '@material-ui/icons/Navigation';
import { default as React, useState } from 'react';
import ReactDOM from 'react-dom';

const App: React.FC<{ compiler: string, framework: string }> = (props) => {
  let [value, setValue] = useState('');
  let [messages, setMessages] = useState([]);
  const socket = new WebSocket('ws://localhost:8888')

  socket.onmessage = (event) => {
    setMessages([...messages, event.data]);
  }

  const sendMessage = () => {
    socket.send(value);
    setValue('');
  }

  return (
    <div>
      <List dense={true}>
        {messages.map((m, i) =>
          <ListItem key={m}>
            <ListItemText
              primary={m}
            />
          </ListItem>)}
      </List>
      <form noValidate autoComplete="off">
        <TextField id="input" label="" value={value} onChange={e => setValue(event.target['value'])} />
        <Fab
          variant="extended"
          size="small"
          color="primary"
          aria-label="add"
          onClick={sendMessage}
        ><NavigationIcon style={{ fontSize: 17 }} />Send</Fab>
      </form>
    </div>
  );
}

ReactDOM.render(
  <App compiler="TypeScript" framework="React" />,
  document.getElementById("root")
);