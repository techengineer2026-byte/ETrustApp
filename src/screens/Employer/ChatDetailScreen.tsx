// src/screens/Employer/ChatDetailScreen.tsx

import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TextInput,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView,
    Platform,
    StatusBar,
    Modal,
    Keyboard,
    ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const PRIMARY_COLOR = '#2563EB';
const BG_COLOR = '#F3F4F6';

const RANDOM_REPLIES = [
    "Hey! Please I really need this job 🙏",
    "Is there any salary deduction for sick leaves?",
    "Sir, I can join immediately! When is the interview?",
    "Can you pay me in cash? I don't have a bank account.",
    "My previous boss was toxic, I hope you are nice.",
];

export default function ChatDetailScreen({ route, navigation }: any) {
    const { name, img, isOnline } = route.params;

    // --- STATE ---
    const [messages, setMessages] = useState<any[]>([
        { id: '1', text: 'Hi, thanks for applying. We are reviewing your profile.', sender: 'me', time: '10:00 AM', type: 'text' },
    ]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    // UI States
    const [showAttachMenu, setShowAttachMenu] = useState(false);
    const [isCalling, setIsCalling] = useState(false);
    const [callDuration, setCallDuration] = useState('Connecting...');

    const flatListRef = useRef<FlatList>(null);

    // --- AUTO REPLY SIMULATION ---
    useEffect(() => {
        const typingTimer = setTimeout(() => setIsTyping(true), 800);
        const replyTimer = setTimeout(() => {
            setIsTyping(false);
            const randomMsg = RANDOM_REPLIES[Math.floor(Math.random() * RANDOM_REPLIES.length)];
            addMessage(randomMsg, 'them');
        }, 2500);

        return () => { clearTimeout(typingTimer); clearTimeout(replyTimer); };
    }, []);

    // Scroll to bottom helper
    const scrollToBottom = () => {
        setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
    };

    // Generic Add Message
    const addMessage = (content: string, sender: 'me' | 'them', type: 'text' | 'image' | 'file' = 'text') => {
        const newMsg = {
            id: Date.now().toString(),
            text: content,
            sender,
            type, // 'text', 'image', 'file'
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, newMsg]);
        scrollToBottom();
    };

    const handleSendText = () => {
        if (!inputText.trim()) return;
        addMessage(inputText, 'me', 'text');
        setInputText('');
    };

    // --- FAKE ACTIONS ---

    // 1. Simulate Attachment
    const handleAttachment = (type: 'camera' | 'gallery' | 'document') => {
        setShowAttachMenu(false);

        if (type === 'camera' || type === 'gallery') {
            addMessage('https://picsum.photos/200/300', 'me', 'image');
        } else {
            addMessage('Resume_v2.pdf', 'me', 'file');
        }
    };


    // 2. Simulate Call
    const startCall = () => {
        setIsCalling(true);
        setCallDuration('Connecting...');
        setTimeout(() => setCallDuration('Ringing...'), 1500);
        setTimeout(() => setCallDuration('00:01'), 3500); // Fake answer
    };

    const endCall = () => {
        setIsCalling(false);
        addMessage('Call ended • 45s', 'me', 'text');
    };

    // --- RENDERERS ---

    const renderMessage = ({ item }: any) => {
        const isMe = item.sender === 'me';

        // Render Content based on Type
        let content;
        if (item.type === 'image') {
            content = (
                <Image
                    source={{ uri: item.text.startsWith('http') ? item.text : 'https://via.placeholder.com/150' }}
                    style={styles.msgImage}
                />
            );
        } else if (item.type === 'file') {
            content = (
                <View style={styles.fileContainer}>
                    <View style={styles.fileIcon}>
                        <MaterialCommunityIcons name="file-document" size={24} color={PRIMARY_COLOR} />
                    </View>
                    <Text style={[styles.msgText, isMe ? styles.meText : styles.themText, { textDecorationLine: 'underline' }]}>
                        {item.text}
                    </Text>
                </View>
            );
        } else {
            content = <Text style={[styles.msgText, isMe ? styles.meText : styles.themText]}>{item.text}</Text>;
        }

        return (
            <View style={[styles.msgWrapper, isMe ? styles.meWrapper : styles.themWrapper]}>
                {!isMe && <Image source={{ uri: img }} style={styles.smallAvatar} />}
                <View style={[styles.msgBubble, isMe ? styles.meBubble : styles.themBubble]}>
                    {content}
                    <Text style={[styles.msgTime, isMe ? { color: '#BFDBFE' } : { color: '#9CA3AF' }]}>{item.time}</Text>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

            {/* HEADER */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color="#1F2937" />
                </TouchableOpacity>
                <Image source={{ uri: img }} style={styles.headerAvatar} />
                <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={styles.headerName}>{name}</Text>
                    <Text style={styles.headerStatus}>{isTyping ? 'Typing...' : isOnline ? 'Online' : 'Offline'}</Text>
                </View>
                <TouchableOpacity style={styles.iconBtn} onPress={startCall}>
                    <Feather name="phone" size={20} color={PRIMARY_COLOR} />
                </TouchableOpacity>
            </View>

            {/* CHAT LIST */}
            <FlatList
                ref={flatListRef}
                data={messages}
                keyExtractor={item => item.id}
                renderItem={renderMessage}
                contentContainerStyle={styles.chatContent}
                onContentSizeChange={scrollToBottom}
                ListFooterComponent={
                    isTyping ? (
                        <View style={styles.typingContainer}>
                            <Image source={{ uri: img }} style={styles.smallAvatar} />
                            <View style={styles.typingBubble}>
                                <Text style={styles.typingDots}>•••</Text>
                            </View>
                        </View>
                    ) : null
                }
            />

            {/* INPUT AREA */}
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <View style={styles.inputContainer}>
                    <TouchableOpacity
                        style={styles.attachBtn}
                        onPress={() => {
                            Keyboard.dismiss();
                            setShowAttachMenu(!showAttachMenu);
                        }}
                    >
                        <Feather name="plus" size={24} color="#6B7280" />
                    </TouchableOpacity>

                    <TextInput
                        style={styles.input}
                        placeholder="Type a message..."
                        value={inputText}
                        onChangeText={setInputText}
                        onFocus={() => setShowAttachMenu(false)}
                    />

                    <TouchableOpacity style={styles.sendBtn} onPress={handleSendText}>
                        <Ionicons name="send" size={18} color="white" />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>

            {/* --- FAKE ATTACHMENT MENU --- */}
            {showAttachMenu && (
                <View style={styles.attachMenu}>
                    <TouchableOpacity style={styles.attachItem} onPress={() => handleAttachment('camera')}>
                        <View style={[styles.attachIcon, { backgroundColor: '#E0F2FE' }]}>
                            <Feather name="camera" size={20} color="#0284C7" />
                        </View>
                        <Text style={styles.attachText}>Camera</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.attachItem} onPress={() => handleAttachment('gallery')}>
                        <View style={[styles.attachIcon, { backgroundColor: '#FCE7F3' }]}>
                            <Feather name="image" size={20} color="#DB2777" />
                        </View>
                        <Text style={styles.attachText}>Gallery</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.attachItem} onPress={() => handleAttachment('document')}>
                        <View style={[styles.attachIcon, { backgroundColor: '#DCFCE7' }]}>
                            <Feather name="file-text" size={20} color="#16A34A" />
                        </View>
                        <Text style={styles.attachText}>Document</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* --- FAKE CALLING OVERLAY --- */}
            <Modal visible={isCalling} animationType="slide" transparent={false}>
                <View style={styles.callScreen}>
                    <StatusBar barStyle="light-content" backgroundColor="#111827" />
                    <View style={styles.callContent}>
                        <Image source={{ uri: img }} style={styles.callAvatar} />
                        <Text style={styles.callName}>{name}</Text>
                        <Text style={styles.callStatus}>{callDuration}</Text>
                    </View>

                    <View style={styles.callActions}>
                        <TouchableOpacity style={[styles.callBtn, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
                            <Feather name="mic-off" size={24} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.callBtn, { backgroundColor: '#EF4444', width: 70, height: 70 }]} onPress={endCall}>
                            <Feather name="phone-off" size={32} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.callBtn, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
                            <Feather name="volume-2" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <SafeAreaView edges={['bottom']} style={{ backgroundColor: 'white' }} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F3F4F6' },

    // Header
    header: { flexDirection: 'row', alignItems: 'center', padding: 15, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
    backBtn: { paddingRight: 10 },
    headerAvatar: { width: 40, height: 40, borderRadius: 20 },
    headerName: { fontSize: 16, fontWeight: '700', color: '#1F2937' },
    headerStatus: { fontSize: 12, color: '#10B981', fontWeight: '500' },
    iconBtn: { padding: 8, backgroundColor: '#EFF6FF', borderRadius: 20 },

    // Chat Area
    chatContent: { padding: 15, paddingBottom: 20 },
    msgWrapper: { flexDirection: 'row', marginBottom: 15, alignItems: 'flex-end' },
    meWrapper: { justifyContent: 'flex-end' },
    themWrapper: { justifyContent: 'flex-start' },
    smallAvatar: { width: 28, height: 28, borderRadius: 14, marginRight: 8, marginBottom: 4 },
    msgBubble: { maxWidth: '75%', padding: 12, borderRadius: 16 },
    meBubble: { backgroundColor: PRIMARY_COLOR, borderBottomRightRadius: 2 },
    themBubble: { backgroundColor: 'white', borderBottomLeftRadius: 2 },

    // Message Content
    msgText: { fontSize: 15, lineHeight: 22 },
    meText: { color: 'white' },
    themText: { color: '#1F2937' },
    msgTime: { fontSize: 10, marginTop: 4, alignSelf: 'flex-end' },
    msgImage: { width: 200, height: 140, borderRadius: 8, marginBottom: 4 },
    fileContainer: { flexDirection: 'row', alignItems: 'center' },
    fileIcon: { backgroundColor: 'rgba(255,255,255,0.2)', padding: 4, borderRadius: 8, marginRight: 8 },

    // Typing
    typingContainer: { flexDirection: 'row', alignItems: 'flex-end', marginLeft: 0, marginTop: 5 },
    typingBubble: { backgroundColor: '#E5E7EB', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 16, borderBottomLeftRadius: 2 },
    typingDots: { color: '#6B7280', fontWeight: 'bold', fontSize: 18, lineHeight: 18 },

    // Input Bar
    inputContainer: { flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: 'white', borderTopWidth: 1, borderTopColor: '#E5E7EB' },
    attachBtn: { padding: 10 },
    input: { flex: 1, backgroundColor: '#F3F4F6', borderRadius: 20, paddingHorizontal: 15, paddingVertical: 10, fontSize: 15, marginRight: 10, maxHeight: 100 },
    sendBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: PRIMARY_COLOR, justifyContent: 'center', alignItems: 'center' },

    // Fake Attachment Menu
    attachMenu: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: 'white', paddingVertical: 20, borderTopWidth: 1, borderTopColor: '#F3F4F6' },
    attachItem: { alignItems: 'center' },
    attachIcon: { width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginBottom: 5 },
    attachText: { fontSize: 12, color: '#4B5563', fontWeight: '500' },

    // Fake Call Screen
    callScreen: { flex: 1, backgroundColor: '#111827', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 60 },
    callContent: { alignItems: 'center', marginTop: 50 },
    callAvatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 20, borderWidth: 2, borderColor: 'white' },
    callName: { color: 'white', fontSize: 28, fontWeight: '700', marginBottom: 10 },
    callStatus: { color: '#9CA3AF', fontSize: 16 },
    callActions: { flexDirection: 'row', width: '80%', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    callBtn: { width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center' },
});