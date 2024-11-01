<template>
    <div class="friend-container">
        <h2>Friending Feature</h2>

        <!-- Friend List -->
        <div v-if="friends.length" class="friends-list">
            <h3>Your Friends</h3>
            <ul>
                <li v-for="friend in friends" :key="friend.username">
                    {{ friend.username }}
                    <button @click="removeFriend(friend.username)" class="remove-button">Remove</button>
                </li>
            </ul>
        </div>

        <!-- Friend Requests -->
        <div v-if="friendRequests.length" class="friend-requests">
            <h3>Friend Requests</h3>
            <ul>
                <li v-for="request in friendRequests" :key="request.username">
                    {{ request.username }}
                    <button @click="acceptFriendRequest(request.username)" class="accept-button">Accept</button>
                    <button @click="rejectFriendRequest(request.username)" class="reject-button">Reject</button>
                </li>
            </ul>
        </div>

        <!-- Add Friend -->
        <div class="add-friend">
            <h3>Add a Friend</h3>
            <input
                v-model="newFriend"
                placeholder="Enter friend's username"
                class="friend-input"
            />
            <button @click="addFriend" class="add-button">Add Friend</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { fetchy } from '@/utils/fetchy';
import { onMounted, ref } from 'vue';

const friends = ref<{ username: string }[]>([]);
const friendRequests = ref<{ username: string }[]>([]);
const newFriend = ref<string>('');

// Fetch the user's friends and friend requests on mount
const fetchFriends = async () => {
    try {
        const response = await fetchy('/api/friends', 'GET');
        friends.value = response;
    } catch (error) {
        console.error('Error fetching friends:', error);
    }
};

const fetchFriendRequests = async () => {
    try {
        const response = await fetchy('/api/friend/requests', 'GET');
        for (const request of response) {
            console.log('Request:', request);
            friendRequests.value.push({ username: request.from });
        }
    } catch (error) {
        console.error('Error fetching friend requests:', error);
    }
};

onMounted(() => {
    fetchFriends();
    fetchFriendRequests();
});

// Add a friend by sending a friend request
const addFriend = async () => {
    if (newFriend.value.trim() === '') return;

    try {
        const newFriendData = await fetchy(`/api/friend/requests/${newFriend.value}`, 'POST');
        friendRequests.value.push(newFriendData);
        newFriend.value = '';
    } catch (error) {
        console.error('Error adding friend:', error);
    }
};

const acceptFriendRequest = async (username: string) => {
    try {
        if (!username) return;

        await fetchy(`/api/friend/accept/${username}`, 'PUT');
        console.log('accepted:', username);
    } catch (error) {
        console.error('Error accepting friend request:', error);
    }
};

const rejectFriendRequest = async (username: string) => {
    try {
        await fetchy(`/api/friend/reject/${username}`, 'PUT');
        friendRequests.value = friendRequests.value.filter(req => req.username !== username);
    } catch (error) {
        console.error('Error rejecting friend request:', error);
    }
};

// Remove a friend from the friend list
const removeFriend = async (username: string) => {
    try {
        await fetchy(`/api/friends/${username}`, 'DELETE');
        friends.value = friends.value.filter(friend => friend.username !== username);
    } catch (error) {
        console.error('Error removing friend:', error);
    }
};
</script>

<style scoped>
.friend-container {
    background-color: var(--base-bg);
    border-radius: 1em;
    padding: 1em;
    width: 70%;
    margin: auto;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
    text-align: center;
}

.friends-list {
    margin-bottom: 1em;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    background-color: #f9f9f9;
    margin: 0.5em 0;
    padding: 0.5em;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
}

.add-friend {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
}

.friend-input {
    padding: 0.5em;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1em;
}

.add-button {
    background-color: #A7C957;
    color: white;
    padding: 0.5em;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.add-button:hover {
    background-color: #8FAE47;
}

.remove-button {
    background-color: #FF6B6B;
    color: white;
    padding: 0.5em;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.remove-button:hover {
    background-color: #FF4C4C;
}
</style>
