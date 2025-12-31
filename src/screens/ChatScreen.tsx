// src/screens/ChatScreen.tsx

import React, { useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  TextInput,
  StatusBar
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../types/navigation";

// --- MOCK DATA ---
const initialChats = [
  {
    id: '1',
    name: 'George Alan',
    role: 'HR Manager at Google',
    lastMessage: "Had a great chat! Let's talk soon.",
    time: '3:24 PM',
    avatar: 'https://randomuser.me/api/portraits/men/31.jpg',
    unreadCount: 1,
    isOnline: true,
  },
  {
    id: '2',
    name: 'Safina Fareena',
    role: 'Recruiter at Spotify',
    lastMessage: 'Here is the job description you asked for 📄',
    time: '8:00 AM',
    avatar: 'https://randomuser.me/api/portraits/women/11.jpg',
    unreadCount: 2,
    isOnline: false,
  },
  {
    id: '3',
    name: 'Robert Allen',
    role: 'Senior Developer',
    lastMessage: "You seem awesome! Let's grab coffee?",
    time: 'Yesterday',
    avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
    unreadCount: 0,
    isOnline: true,
  },
  {
    id: '4',
    name: 'Lily',
    role: 'Talent Acquisition',
    lastMessage: 'Gotta run! Text me later?',
    time: 'Yesterday',
    avatar: 'https://randomuser.me/api/portraits/women/21.jpg',
    unreadCount: 0,
    isOnline: false,
  },
  {
    id: '5',
    name: 'Muhammed',
    role: 'Startup Founder',
    lastMessage: "This was fun! Let's plan something?",
    time: 'Yesterday',
    avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
    unreadCount: 0,
    isOnline: false,
  },
  {
    id: '6',
    name: 'John Paul',
    role: 'Tech Lead',
    lastMessage: "LOL, you're hilarious. Talk soon!",
    time: '24/01',
    avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
    unreadCount: 1,
    isOnline: true,
  },
];

type ChatNavType = NativeStackNavigationProp<RootStackParamList, "MainTabs">;

const ChatScreen = () => {
  const navigation = useNavigation<ChatNavType>();
  const [searchText, setSearchText] = useState('');

  // Filter Logic
  const filteredChats = initialChats.filter(chat => 
    chat.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderItem = ({ item }: { item: typeof initialChats[0] }) => {
    const isUnread = item.unreadCount > 0;

    return (
      <TouchableOpacity
        style={[styles.chatItem, isUnread && styles.chatItemUnread]}
        activeOpacity={0.7}
        onPress={() => navigation.navigate("ChatDetails", { name: item.name, avatar: item.avatar })}
      >
        {/* Avatar + Online Status */}
        <View style={styles.avatarContainer}>
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
          {item.isOnline && <View style={styles.onlineDot} />}
        </View>


        {/* Info */}
        <View style={styles.textContainer}>
          <View style={styles.topRow}>
            <Text style={[styles.name, isUnread && styles.nameUnread]} numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={[styles.time, isUnread && styles.timeUnread]}>
              {item.time}
            </Text>
          </View>

          <View style={styles.bottomRow}>
            <Text style={[styles.lastMessage, isUnread && styles.lastMessageUnread]} numberOfLines={1}>
              {/* Optional: Add "Typing..." or "Sent an image" logic here */}
              {item.lastMessage}
            </Text>
            
            {item.unreadCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.unreadCount}</Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* --- HEADER --- */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
        <TouchableOpacity style={styles.newChatBtn}>
           <Icon name="square-edit-outline" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      {/* --- SEARCH BAR --- */}
      <View style={styles.searchContainer}>
        <Icon name="magnify" size={20} color="#999" style={styles.searchIcon} />
        <TextInput 
          style={styles.searchInput}
          placeholder="Search chats..."
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* --- LIST --- */}
      <FlatList
        data={filteredChats}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
             <Icon name="message-text-outline" size={48} color="#ccc" />
             <Text style={styles.emptyText}>No messages found</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#000',
  },
  newChatBtn: {
    padding: 5,
    backgroundColor: '#F0F5FF',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Search
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
    marginHorizontal: 20,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 45,
    marginBottom: 15,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    height: '100%',
  },

  // List
  listContent: {
    paddingBottom: 20,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    // borderBottomWidth: 1,
    // borderBottomColor: '#f9f9f9',
  },
  chatItemUnread: {
    backgroundColor: '#F9FAFF', // Very subtle blue highlight for unread
  },
  
  // Avatar
  avatarContainer: {
    position: 'relative',
    marginRight: 15,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  onlineDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#fff',
  },

  // Info
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    flex: 1,
  },
  nameUnread: {
    color: '#000',
    fontWeight: '800',
  },
  time: {
    fontSize: 12,
    color: '#999',
  },
  timeUnread: {
    color: '#007AFF',
    fontWeight: '600',
  },
  
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    fontSize: 14,
    color: '#777',
    flex: 1,
    marginRight: 10,
  },
  lastMessageUnread: {
    color: '#222',
    fontWeight: '600',
  },

  // Badge
  badge: {
    backgroundColor: '#007AFF',
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },

  // Empty State
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  emptyText: {
    marginTop: 10,
    color: '#999',
    fontSize: 16,
  }
});