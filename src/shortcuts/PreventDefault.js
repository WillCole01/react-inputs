const preventDefaultHandlers = (handlers) => {
    const newHandlers = {};
    for (const [action, handler] of Object.entries(handlers)) {
      newHandlers[action] = (event) => {
        if (event) {
          event.preventDefault();
        }
        handler();
      };
    }
    return newHandlers;
  };

  export default preventDefaultHandlers;