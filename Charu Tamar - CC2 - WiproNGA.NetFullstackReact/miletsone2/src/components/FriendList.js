import { useState } from "react";
import FriendService from "../services/FriendService";
import "./FriendList.css";

const FriendList = () => {
  const [friends, setFriends] = useState(FriendService.getFriends());
  const [newFriend, setNewFriend] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editedName, setEditedName] = useState("");

  const handleAddFriend = () => {
    if (!newFriend.trim()) {
      alert("Friend name cannot be empty");
      return;
    }

    if (friends.some((friend) => friend.name === newFriend.trim())) {
      alert("Friend name must be unique");
      return;
    }

    const newFriendData = FriendService.addFriend(newFriend.trim());
    setFriends([...friends, newFriendData]);
    setNewFriend("");
  };

  const handleDeleteFriend = (id) => {
    FriendService.deleteFriend(id);
    setFriends(FriendService.getFriends());
  };

  const handleEditFriend = (id, name) => {
    setEditingId(id);
    setEditedName(name);
  };

  const handleSaveEdit = (id) => {
    if (!editedName.trim()) {
      alert("Friend name cannot be empty");
      return;
    }

    if (
      friends.some(
        (friend) => friend.name === editedName.trim() && friend.id !== id
      )
    ) {
      alert("Friend name must be unique");
      return;
    }

    FriendService.updateFriend(id, editedName.trim());
    setFriends(FriendService.getFriends());
    setEditingId(null);
    setEditedName("");
  };

  return (
    <div className="friend-list">
      <h2>Friend List</h2>
      <div className="add-friend">
        <input
          type="text"
          value={newFriend}
          onChange={(e) => setNewFriend(e.target.value)}
          placeholder="Enter friend name"
        />
        <button onClick={handleAddFriend}>Add Friend</button>
      </div>

      <ul>
        {friends.map((friend) => (
          <li key={friend.id}>
            {editingId === friend.id ? (
              <>
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                />
                <button onClick={() => handleSaveEdit(friend.id)}>Save</button>
              </>
            ) : (
              <>
                <span>{friend.name}</span>
                <button onClick={() => handleEditFriend(friend.id, friend.name)}>
                  Edit
                </button>
                <button onClick={() => handleDeleteFriend(friend.id)}>
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendList;
