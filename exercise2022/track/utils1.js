const getEventMethod = () => {
  let addMethod = 'addEventListener',
    removeMethod = 'removeEventListener',
    prefix = '';
  if (!window.addEventListener) {
    addMethod = 'attachEvent';
    removeMethod = 'detachEvent';
    prefix = 'on';
  }
  return {
    addMethod,
    removeMethod,
    prefix,
  };
};

const getEvent = (event) => {
  event = event || window.event;
  if (!event) {
    return event;
  }
  if (!event.target) {
    event.target = event.srcElement;
  }
  if (!event.currentTarget) {
    event.currentTarget = event.srcElement;
  }
  return event;
};
export default {
  getEventMethod,
  getEvent,
};
