import { Box, createTheme, Divider, ThemeProvider } from '@material-ui/core';
import { ChatController, MuiChat } from 'chat-ui-react';
import React, { useState } from 'react';

const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#007aff',
    },
  },
});

export default function ChatBox() {
  const [chatCtl] = React.useState(
    new ChatController({
      showDateTime: true,
    }),
  );
  const [age, setAge] = useState(null);
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);

  

  async function echo (chatCtl) {
    await chatCtl.addMessage({
      type: 'text',
      content: `Nhập bất kì để bắt đầu`,
      self: false,
      avatar: '-',
    });
    await chatCtl.setActionRequest({
      type: 'text',
      placeholder: 'Please enter something',
    });
    await chatCtl.addMessage({
      type: 'text',
      content: 'Bạn bao nhiêu tuổi?',
      self: false,
      avatar: '-',
    });
    const age = await chatCtl.setActionRequest({
      type: 'text',
      placeholder: 'Please enter something',
    });
    setAge(age.value);
    await chatCtl.addMessage({
      type: 'text',
      content: 'Bạn cao bao nhiêu cm?',
      self: false,
      avatar: '-',
    });
    const height = await chatCtl.setActionRequest({
      type: 'text',
      placeholder: 'Please enter something',
    });
    setHeight(height.value);
    await chatCtl.addMessage({
      type: 'text',
      content: 'Bạn nặng bao nhiêu kg?',
      self: false,
      avatar: '-',
    });
    const weight = await chatCtl.setActionRequest({
      type: 'text',
      placeholder: 'Please enter something',
    });
    setWeight(weight.value);
    let message = '';
    setTimeout(() => {
      message = 'Bạn thuộc mức vừa'
      chatCtl.addMessage({
        type: 'text',
        content: message,
        self: false,
        avatar: '-',
      });
      echo(chatCtl);
    }, 2000);
  }

  React.useMemo(() => {
    echo(chatCtl);
  }, [chatCtl]);
  return (
    <div className='chat-box'>
      <ThemeProvider theme={muiTheme}>
        <Box sx={{ height: '100%', backgroundColor: 'gray' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              maxWidth: '640px',
              marginLeft: 'auto',
              marginRight: 'auto',
              bgcolor: 'background.default',
            }}
          >
            <Divider />
            <Box sx={{ flex: '1 1 0%', minHeight: '100vh' }}>
              <MuiChat chatController={chatCtl} />
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </div>
  )
}


