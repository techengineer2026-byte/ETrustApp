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
    LayoutAnimation,
    UIManager,
    ImageBackground,
    Dimensions
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Enable Layout Animation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const { width, height } = Dimensions.get('window');

const COLORS = {
    darkBg: '#0F172A',       // Header Background
    primary: '#3B82F6',      // User Bubble
    themBubble: '#FFFFFF',   // Sender Bubble
    bgPattern: '#E2E8F0',    // Background
    textDark: '#1E293B',
    textLight: '#94A3B8',
    danger: '#EF4444',
    success: '#10B981'
};

const RANDOM_REPLIES = [
    "Hello! Yes, I am very interested in this role.",
    "Could you please share the job description PDF?",
    "I have 4 years of experience in React Native.",
    "Can we schedule a call for tomorrow?",
    "Thanks for shortlisting me! 🙌",
];

export default function ChatDetailScreen({ route, navigation }: any) {
    const insets = useSafeAreaInsets();
    
    // Get params safely (Fallback to defaults)
    const { userName = 'Candidate', userImg = 'https://randomuser.me/api/portraits/men/32.jpg' } = route.params || {};

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
        const typingTimer = setTimeout(() => setIsTyping(true), 2000);
        const replyTimer = setTimeout(() => {
            setIsTyping(false);
            const randomMsg = RANDOM_REPLIES[Math.floor(Math.random() * RANDOM_REPLIES.length)];
            addMessage(randomMsg, 'them');
        }, 4500);

        return () => { clearTimeout(typingTimer); clearTimeout(replyTimer); };
    }, []);

    const scrollToBottom = () => {
        setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
    };

    const addMessage = (content: string, sender: 'me' | 'them', type: 'text' | 'image' | 'file' = 'text') => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        const newMsg = {
            id: Date.now().toString(),
            text: content,
            sender,
            type,
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

    // --- ACTIONS ---
    const handleAttachment = (type: 'camera' | 'gallery' | 'document') => {
        setShowAttachMenu(false);
        if (type === 'camera' || type === 'gallery') {
            addMessage('https://picsum.photos/300/200', 'me', 'image');
        } else {
            addMessage('Portfolio_v1.pdf', 'me', 'file');
        }
    };

    const startCall = () => {
        setIsCalling(true);
        setCallDuration('Connecting...');
        setTimeout(() => setCallDuration('Ringing...'), 1500);
        setTimeout(() => setCallDuration('00:01'), 3500); 
    };

    const endCall = () => {
        setIsCalling(false);
        addMessage('Call ended • 45s', 'me', 'text');
    };

    // --- RENDER MESSAGE ---
    const renderMessage = ({ item }: any) => {
        const isMe = item.sender === 'me';
        
        // Dynamic Content
        let content;
        if (item.type === 'image') {
            content = <Image source={{ uri: item.text.startsWith('http') ? item.text : 'https://via.placeholder.com/150' }} style={styles.msgImage} />;
        } else if (item.type === 'file') {
            content = (
                <View style={styles.fileContainer}>
                    <View style={styles.fileIconBox}>
                        <MaterialCommunityIcons name="file-document" size={20} color={isMe ? '#FFF' : COLORS.primary} />
                    </View>
                    <Text style={[styles.msgText, isMe ? styles.meText : styles.themText, { textDecorationLine: 'underline' }]}>{item.text}</Text>
                </View>
            );
        } else {
            content = <Text style={[styles.msgText, isMe ? styles.meText : styles.themText]}>{item.text}</Text>;
        }

        return (
            <View style={[styles.msgRow, isMe ? styles.meRow : styles.themRow]}>
                <View style={[styles.bubble, isMe ? styles.meBubble : styles.themBubble]}>
                    {content}
                    <Text style={[styles.timeText, isMe ? { color: 'rgba(255,255,255,0.7)' } : { color: COLORS.textLight }]}>{item.time}</Text>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.darkBg} />

            {/* --- HEADER --- */}
            <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Feather name="arrow-left" size={24} color="#FFF" />
                </TouchableOpacity>
                
                <View style={styles.headerProfile}>
                    <Image source={{ uri: userImg }} style={styles.headerAvatar} />
                    <View style={styles.onlineDot} />
                </View>

                <View style={styles.headerInfo}>
                    <Text style={styles.headerName}>{userName}</Text>
                    <Text style={styles.headerStatus}>{isTyping ? 'Typing...' : 'Online'}</Text>
                </View>

                <View style={styles.headerActions}>
                    <TouchableOpacity style={styles.headerIcon} onPress={startCall}>
                        <Feather name="phone" size={20} color="#FFF" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.headerIcon}>
                        <Feather name="more-vertical" size={20} color="#FFF" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* --- CHAT AREA --- */}
            <ImageBackground 
                source={{ uri: 'https://i.pinimg.com/originals/97/c0/07/97c00759d90d786d9b6096d274ad3e07.png' }} // WhatsApp-like pattern
                style={styles.chatBackground}
                resizeMode="cover"
            >
                <FlatList
                    ref={flatListRef}
                    data={messages}
                    keyExtractor={item => item.id}
                    renderItem={renderMessage}
                    contentContainerStyle={styles.listContent}
                    onContentSizeChange={scrollToBottom}
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent={
                        isTyping ? (
                            <View style={styles.typingWrapper}>
                                <Image source={{ uri: userImg }} style={styles.tinyAvatar} />
                                <View style={styles.typingBubble}>
                                    <View style={styles.dot} /><View style={styles.dot} /><View style={styles.dot} />
                                </View>
                            </View>
                        ) : null
                    }
                />
            </ImageBackground>

            {/* --- INPUT BAR --- */}
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <View style={[styles.inputContainer, { paddingBottom: insets.bottom > 0 ? insets.bottom : 10 }]}>
                    <TouchableOpacity 
                        style={styles.attachBtn} 
                        onPress={() => { Keyboard.dismiss(); setShowAttachMenu(!showAttachMenu); }}
                    >
                        <Feather name="plus" size={24} color={COLORS.primary} />
                    </TouchableOpacity>

                    <TextInput
                        style={styles.textInput}
                        placeholder="Message..."
                        placeholderTextColor={COLORS.textLight}
                        value={inputText}
                        onChangeText={setInputText}
                        onFocus={() => setShowAttachMenu(false)}
                        multiline
                    />

                    <TouchableOpacity style={styles.sendBtn} onPress={handleSendText}>
                        <Ionicons name="send" size={18} color="#FFF" />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>

            {/* --- ATTACHMENT MENU --- */}
            {showAttachMenu && (
                <View style={[styles.attachSheet, { paddingBottom: insets.bottom + 20 }]}>
                    <TouchableOpacity style={styles.sheetItem} onPress={() => handleAttachment('camera')}>
                        <View style={[styles.sheetIcon, { backgroundColor: '#E0F2FE' }]}><Feather name="camera" size={24} color="#0284C7" /></View>
                        <Text style={styles.sheetLabel}>Camera</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.sheetItem} onPress={() => handleAttachment('gallery')}>
                        <View style={[styles.sheetIcon, { backgroundColor: '#FCE7F3' }]}><Feather name="image" size={24} color="#DB2777" /></View>
                        <Text style={styles.sheetLabel}>Gallery</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.sheetItem} onPress={() => handleAttachment('document')}>
                        <View style={[styles.sheetIcon, { backgroundColor: '#DCFCE7' }]}><Feather name="file-text" size={24} color="#16A34A" /></View>
                        <Text style={styles.sheetLabel}>File</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* --- CALL MODAL --- */}
            <Modal visible={isCalling} animationType="fade" transparent={false}>
                <ImageBackground 
                    source={{ uri: userImg }} 
                    blurRadius={20}
                    style={styles.callScreen}
                >
                    <View style={styles.callOverlay}>
                        <View style={styles.callTop}>
                            <Image source={{ uri: userImg }} style={styles.callBigAvatar} />
                            <Text style={styles.callName}>{userName}</Text>
                            <Text style={styles.callTimer}>{callDuration}</Text>
                        </View>

                        <View style={styles.callControls}>
                            <TouchableOpacity style={styles.controlBtn}><Feather name="mic-off" size={24} color="#FFF" /></TouchableOpacity>
                            <TouchableOpacity style={styles.endCallBtn} onPress={endCall}><MaterialCommunityIcons name="phone-hangup" size={32} color="#FFF" /></TouchableOpacity>
                            <TouchableOpacity style={styles.controlBtn}><Feather name="volume-2" size={24} color="#FFF" /></TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#E2E8F0' },

    // Header
    header: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.darkBg, paddingHorizontal: 16, paddingBottom: 16 },
    backBtn: { padding: 8, marginRight: 8 },
    headerProfile: { position: 'relative' },
    headerAvatar: { width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: '#1E293B' },
    onlineDot: { position: 'absolute', bottom: 0, right: 0, width: 10, height: 10, borderRadius: 5, backgroundColor: COLORS.success, borderWidth: 2, borderColor: COLORS.darkBg },
    headerInfo: { flex: 1, marginLeft: 12 },
    headerName: { color: '#FFF', fontSize: 16, fontWeight: '700' },
    headerStatus: { color: COLORS.success, fontSize: 12, fontWeight: '500' },
    headerActions: { flexDirection: 'row', gap: 8 },
    headerIcon: { padding: 8, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 12 },

    // Chat Area
    chatBackground: { flex: 1 },
    listContent: { padding: 16, paddingBottom: 20 },
    
    msgRow: { marginBottom: 16, flexDirection: 'row' },
    meRow: { justifyContent: 'flex-end', alignSelf: 'flex-end', marginLeft: 'auto' }, // Right align
    themRow: { justifyContent: 'flex-start', alignSelf: 'flex-start' }, // Left align

    bubble: { maxWidth: width * 0.75, padding: 12, borderRadius: 18, elevation: 1, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 2, shadowOffset: { width: 0, height: 1 } },
    meBubble: { backgroundColor: COLORS.primary, borderBottomRightRadius: 4 },
    themBubble: { backgroundColor: COLORS.themBubble, borderBottomLeftRadius: 4 },

    msgText: { fontSize: 15, lineHeight: 22 },
    meText: { color: '#FFF' },
    themText: { color: COLORS.textDark },
    timeText: { fontSize: 10, marginTop: 4, alignSelf: 'flex-end' },

    msgImage: { width: 200, height: 140, borderRadius: 12, marginBottom: 4 },
    fileContainer: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    fileIconBox: { backgroundColor: 'rgba(255,255,255,0.2)', padding: 6, borderRadius: 8 },

    // Typing
    typingWrapper: { flexDirection: 'row', alignItems: 'flex-end', marginBottom: 12 },
    tinyAvatar: { width: 24, height: 24, borderRadius: 12, marginRight: 8 },
    typingBubble: { flexDirection: 'row', backgroundColor: '#FFF', padding: 12, borderRadius: 16, borderBottomLeftRadius: 4, gap: 4 },
    dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.textLight },

    // Input Bar
    inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', paddingHorizontal: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: '#E2E8F0' },
    attachBtn: { padding: 10 },
    textInput: { flex: 1, backgroundColor: '#F1F5F9', borderRadius: 24, paddingHorizontal: 16, paddingVertical: 10, fontSize: 15, color: COLORS.textDark, maxHeight: 100, marginHorizontal: 8 },
    sendBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' },

    // Attach Sheet
    attachSheet: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#FFF', paddingTop: 20, borderTopWidth: 1, borderTopColor: '#E2E8F0' },
    sheetItem: { alignItems: 'center' },
    sheetIcon: { width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
    sheetLabel: { fontSize: 12, color: COLORS.textDark, fontWeight: '500' },

    // Call Screen
    callScreen: { flex: 1 },
    callOverlay: { flex: 1, backgroundColor: 'rgba(15, 23, 42, 0.85)', justifyContent: 'space-between', paddingVertical: 80, alignItems: 'center' },
    callTop: { alignItems: 'center' },
    callBigAvatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 24, borderWidth: 4, borderColor: 'rgba(255,255,255,0.1)' },
    callName: { fontSize: 32, fontWeight: '700', color: '#FFF', marginBottom: 8 },
    callTimer: { fontSize: 18, color: COLORS.success, fontWeight: '600' },
    
    callControls: { flexDirection: 'row', alignItems: 'center', gap: 24 },
    controlBtn: { width: 60, height: 60, borderRadius: 30, backgroundColor: 'rgba(255,255,255,0.15)', justifyContent: 'center', alignItems: 'center' },
    endCallBtn: { width: 80, height: 80, borderRadius: 40, backgroundColor: COLORS.danger, justifyContent: 'center', alignItems: 'center', shadowColor: COLORS.danger, shadowOpacity: 0.5, shadowRadius: 20, elevation: 10 },
});