import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  FlatList,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  SafeAreaView
} from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type ChatDetailsRoute = RouteProp<
  { ChatDetails: { name: string; image?: string } }, // Added optional image param
  'ChatDetails'
>;

interface IMessage {
  _id: number;
  text: string;
  createdAt: Date;
  user: { _id: number; name: string; avatar?: string };
}

// Mock Avatar if none provided
const DEFAULT_AVATAR = 'https://randomuser.me/api/portraits/men/32.jpg';

const ChatDetailsScreen = ({ route }: { route: ChatDetailsRoute }) => {
  const { name, image } = route.params;
  const navigation = useNavigation();
  
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef<FlatList>(null);

  // Human-like replies
  const humanReplies = [
    "Hey! Great to connect with you.",
    "I'm actually looking for someone with your skillset.",
    "Could you send over your resume?",
    "That sounds perfect! When are you free for a call?",
    "Haha, exactly!",
    "I'll check with the hiring manager and get back to you.",
    "Sounds good to me!",
    "Let's schedule an interview for Tuesday?",
  ];

  useEffect(() => {
    // Initial Message
    setMessages([
      {
        _id: 1,
        text: `Hi Anurag! Thanks for applying to ${name}. We liked your profile.`,
        createdAt: new Date(),
        user: { _id: 2, name: name, avatar: image || DEFAULT_AVATAR },
      },
    ]);
  }, []);

  const sendMessage = () => {
    if (!inputText.trim()) return;

    const newMessage: IMessage = {
      _id: Math.random(),
      text: inputText,
      createdAt: new Date(),
      user: { _id: 1, name: 'You' },
    };

    setMessages(prev => [newMessage, ...prev]);
    setInputText('');

    // Simulate typing delay & reply
    setTimeout(() => {
      const randomReply =
        humanReplies[Math.floor(Math.random() * humanReplies.length)];

      const botMsg: IMessage = {
        _id: Math.random(),
        text: randomReply,
        createdAt: new Date(),
        user: { _id: 2, name: name, avatar: image || DEFAULT_AVATAR },
      };

      setMessages(prev => [botMsg, ...prev]);
    }, 1500);
  };

  const renderItem = ({ item }: { item: IMessage }) => {
    const isMe = item.user._id === 1;

    return (
      <View style={[styles.messageRow, isMe ? styles.rowEnd : styles.rowStart]}>
        
        {/* Show Avatar only for Recipient */}
        {!isMe && (
          <Image 
            source={{ uri: item.user.avatar }} 
            style={styles.avatarSmall} 
          />
        )}

        <View style={[
          styles.bubble, 
          isMe ? styles.bubbleMe : styles.bubbleTheirs
        ]}>
          <Text style={[styles.messageText, isMe ? styles.textMe : styles.textTheirs]}>
            {item.text}
          </Text>
          <Text style={[styles.timeText, isMe ? styles.timeMe : styles.timeTheirs]}>
            {item.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* --- CUSTOM HEADER --- */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        
        <View style={styles.headerInfo}>
          <Image source={{ uri: image || DEFAULT_AVATAR }} style={styles.headerAvatar} />
          <View>
            <Text style={styles.headerName}>{name}</Text>
            <View style={styles.statusRow}>
              <View style={styles.onlineDot} />
              <Text style={styles.statusText}>Online</Text>
            </View>
          </View>
        </View>

        <View style={styles.headerIcons}>
           <TouchableOpacity style={{marginRight: 15}}>
             <Icon name="phone-outline" size={24} color="#007AFF" />
           </TouchableOpacity>
           <TouchableOpacity>
             <Icon name="video-outline" size={24} color="#007AFF" />
           </TouchableOpacity>
        </View>
      </View>

      {/* --- CHAT AREA --- */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined} 
        style={styles.keyboardView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={item => item._id.toString()}
          renderItem={renderItem}
          inverted
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />

        {/* --- INPUT BAR --- */}
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.attachBtn}>
             <Icon name="plus" size={24} color="#007AFF" />
          </TouchableOpacity>
          
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type a message..."
            placeholderTextColor="#999"
            multiline
          />
          
          <TouchableOpacity 
            style={[styles.sendBtn, { backgroundColor: inputText.trim() ? '#007AFF' : '#F0F2F5' }]} 
            onPress={sendMessage}
            disabled={!inputText.trim()}
          >
             <Icon name="send" size={20} color={inputText.trim() ? '#fff' : '#B0B3B8'} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatDetailsScreen;

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: '#fff' 
  },
  keyboardView: {
    flex: 1,
  },
  
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
  },
  backBtn: {
    padding: 5,
    marginRight: 10,
  },
  headerInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  headerName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: 5,
  },
  statusText: {
    fontSize: 12,
    color: '#666',
  },
  headerIcons: {
    flexDirection: 'row',
  },

  // Message List
  listContent: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  messageRow: {
    flexDirection: 'row',
    marginVertical: 4,
    alignItems: 'flex-end',
  },
  rowStart: {
    justifyContent: 'flex-start',
  },
  rowEnd: {
    justifyContent: 'flex-end',
  },
  avatarSmall: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 8,
    marginBottom: 5,
  },
  bubble: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 20,
    position: 'relative',
  },
  bubbleMe: {
    backgroundColor: '#007AFF', // iMessage Blue
    borderBottomRightRadius: 4, // Tail effect
  },
  bubbleTheirs: {
    backgroundColor: '#F2F3F5', // Light Gray
    borderBottomLeftRadius: 4, // Tail effect
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  textMe: {
    color: '#fff',
  },
  textTheirs: {
    color: '#000',
  },
  timeText: {
    fontSize: 10,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  timeMe: {
    color: 'rgba(255,255,255,0.7)',
  },
  timeTheirs: {
    color: '#999',
  },

  // Input Bar
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    backgroundColor: '#fff',
  },
  attachBtn: {
    padding: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#F0F2F5',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    maxHeight: 100,
    fontSize: 16,
    color: '#000',
    marginHorizontal: 5,
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
  },
});