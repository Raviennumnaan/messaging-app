const chatReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_USER':
      return {
        user: action.payload.userInfo,
        chatId:
          action.payload.curUser.uid > action.payload.userInfo.uid
            ? action.payload.curUser.uid + action.payload.userInfo.uid
            : action.payload.userInfo.uid + action.payload.curUser.uid,
      };

    default:
      return state;
  }
};

export default chatReducer;
