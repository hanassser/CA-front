import { Button, Modal } from 'antd';
import React from 'react';

const countDown = () => {
    let secondsToGo = 2;

    const modal = Modal.success({
        title: 'This is a notification message',
        content: `This modal will be destroyed after ${secondsToGo} second.`,
    });

    const timer = setInterval(() => {
        secondsToGo -= 1;
        modal.update({
            content: `This modal will be destroyed after ${secondsToGo} second.`,
        });
    }, 1000);

    setTimeout(() => {
        clearInterval(timer);
        modal.destroy();
    }, secondsToGo * 1000);
};

const App: React.FC = () => <Button onClick={countDown}>Open modal to close in 2s</Button>;

export default App;
