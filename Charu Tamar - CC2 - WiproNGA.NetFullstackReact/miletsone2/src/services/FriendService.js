// src/services/FriendService.js
const FriendService = {
    getFriends: () => {
      return JSON.parse(localStorage.getItem("friends")) || [];
    },
  
    addFriend: (name) => {
      const friends = FriendService.getFriends();
      const newFriend = { id: Date.now(), name };
      friends.push(newFriend);
      localStorage.setItem("friends", JSON.stringify(friends));
      return newFriend;
    },
  
    deleteFriend: (id) => {
      let friends = FriendService.getFriends();
      friends = friends.filter((friend) => friend.id !== id);
      localStorage.setItem("friends", JSON.stringify(friends));
    },
  
    updateFriend: (id, newName) => {
      let friends = FriendService.getFriends();
      friends = friends.map((friend) =>
        friend.id === id ? { ...friend, name: newName } : friend
      );
      localStorage.setItem("friends", JSON.stringify(friends));
    },
  };
  
  export default FriendService;
  