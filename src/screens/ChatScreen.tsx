import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../types/navigation";

const chats = [
  {
    id: '1',
    name: 'George Alan',
    lastMessage: "Had a great chat! Let's talk soon.",
    time: '03:24 pm',
    avatar: 'https://randomuser.me/api/portraits/men/31.jpg',
    unreadCount: 1,
  },
  {
    id: '2',
    name: 'Safina Fareena',
    lastMessage: '📷 Photo',
    time: '8:00 am',
    avatar: 'https://randomuser.me/api/portraits/women/11.jpg',
    unreadCount: 2,
  },
  {
    id: '3',
    name: 'Robert Allen',
    lastMessage: "You seem awesome! Let's grab coffee?",
    time: '6:56 am',
    avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
    unreadCount: 0,
  },
  {
    id: '4',
    name: 'Lily',
    lastMessage: 'Gotta run! Text me later?',
    time: 'Yesterday',
    avatar: 'https://randomuser.me/api/portraits/men/21.jpg',
    unreadCount: 0
  },
  {
    id: '5',
    name: 'Muhammed',
    lastMessage: "This was fun! Let's plan something?",
    time: 'Yesterday',
    avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
    unreadCount: 0,
  },
  {
    id: '6',
    name: 'John Paul',
    lastMessage: "LOL, you're hilarious. Talk soon!",
    time: '24/01/2025',
    avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
    unreadCount: 1,
  },
  {
    id: '7',
    name: 'Tessa',
    lastMessage: "You made my day! Chat soon?",
    time: '17/01/2025',
    avatar: 'https://randomuser.me/api/portraits/women/41.jpg',
    unreadCount: 2,
  },
  {
    id: '8',
    name: 'Brain',
    lastMessage: "Your video editing project is complete.",
    time: '17/01/2025',
    avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
    unreadCount: 0,
  },
];
interface ChatItemProps {
  name: string;
  lastMessage: string;
  time: string;
  avatar: string;
  unreadCount: number;

}
type ChatNavType = NativeStackNavigationProp<RootStackParamList, "MainTabs">;

const ChatItem = ({ name, lastMessage, time, avatar, unreadCount }: ChatItemProps) => {
  const navigation = useNavigation<ChatNavType>();

  return (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() =>
        // navigation.navigate("ChatDetails", { name, avatar })
        navigation.navigate("ChatDetails", { name, avatar })
      }
    >
      <Image source={{ uri: avatar }} style={styles.avatar} />

      <View style={styles.textContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.lastMessage}>{lastMessage}</Text>
      </View>

      <View style={styles.rightSection}>
        <Text style={styles.time}>{time}</Text>

        {unreadCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{unreadCount}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};


const ChatScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Chats</Text>
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ChatItem {...item} />}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  time: {
    fontSize: 12,
    color: '#999',
  },
  rightSection: {
    alignItems: 'flex-end',
  },

  badge: {
    backgroundColor: '#ff3b30',
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    paddingHorizontal: 4,
  },

  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },

});
