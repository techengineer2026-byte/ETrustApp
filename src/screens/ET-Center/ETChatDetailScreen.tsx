import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    StatusBar,
    Modal,
    ActivityIndicator,
    Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useChat, Message } from '../../context/ChatContext'; // Ensure this path is correct

// --- Custom Toast Component ---
const Toast = ({ message, type, visible }: any) => {
    if (!visible) return null;
    let bg = '#333';
    let icon = 'information-outline';
    switch (type) {
        case 'success': bg = '#10B981'; icon = 'check-circle-outline'; break;
        case 'warning': bg = '#F59E0B'; icon = 'alert-outline'; break;
        case 'error': bg = '#EF4444'; icon = 'close-circle-outline'; break;
        case 'info': bg = '#3B82F6'; icon = 'information-outline'; break;
    }
    return (
        <View style={[styles.toastContainer, { backgroundColor: bg }]}>
            <MaterialCommunityIcons name={icon} size={20} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.toastText}>{message}</Text>
        </View>
    );
};

const ETChatDetailScreen = () => {
    const navigation = useNavigation();
    const route = useRoute<any>();
    const { ticketId } = route.params; 

    // --- Context Data ---
    const { getTicketById, sendMessage: contextSendMessage, updateTicketStatus } = useChat();
    const ticket = getTicketById(ticketId); // Get LIVE data

    // --- UI State ---
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    
    // Modals
    const [actionModalVisible, setActionModalVisible] = useState(false);
    const [profileModalVisible, setProfileModalVisible] = useState(false);
    const [attachMenuVisible, setAttachMenuVisible] = useState(false); // <--- UPLOAD MENU

    const [toast, setToast] = useState({ visible: false, message: '', type: 'info' });
    const flatListRef = useRef<FlatList>(null);

    // Auto-scroll on new message
    useEffect(() => {
        setTimeout(() => flatListRef.current?.scrollToEnd(), 200);
    }, [ticket?.messages]);

    const showToast = (msg: string, type: 'success'|'warning'|'error'|'info') => {
        setToast({ visible: true, message: msg, type });
        setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 3000);
    };

    // --- Bot Logic ---
    const simulateBotReply = (triggerText: string, type: string) => {
        if (ticket?.status === 'Banned') return;
        setIsTyping(true);
        setTimeout(() => {
            let reply = "I understand.";
            const lower = triggerText.toLowerCase();

            if (type !== 'text') reply = "I received the file. Thanks!";
            else if (lower.includes('resolved')) reply = "Great! Thanks for the help.";
            else if (lower.includes('warning')) reply = "Sorry, I will follow the rules.";
            else if (lower.includes('details')) reply = "Here is my ID: #8892.";
            
            // Send Bot Reply via Context
            contextSendMessage(ticketId, reply, 'user', 'text');
            setIsTyping(false);
        }, 2000);
    };

    // --- Send Message (Text or File) ---
    const handleSend = (text = inputText, type: 'text'|'image'|'file' = 'text') => {
        if (!text.trim()) return;
        
        // 1. Send to Context
        contextSendMessage(ticketId, text, 'admin', type);
        
        // 2. Clear UI
        setInputText('');
        setAttachMenuVisible(false);

        // 3. Trigger Bot
        simulateBotReply(text, type);
    };

    // --- Admin Actions ---
    const handleAction = (action: string) => {
        setActionModalVisible(false);
        if (action === 'Resolve') {
            updateTicketStatus(ticketId, 'Resolved');
            contextSendMessage(ticketId, 'Ticket marked as Resolved.', 'admin', 'text', true);
            showToast("Ticket Resolved", 'success');
        } else if (action === 'Ban') {
            updateTicketStatus(ticketId, 'Banned');
            contextSendMessage(ticketId, '🚫 User BANNED.', 'admin', 'text', true);
            showToast("User Banned", 'error');
        } else if (action === 'Profile') {
            setProfileModalVisible(true);
        } else if (action === 'Warning') {
             contextSendMessage(ticketId, '⚠️ Official Warning Sent.', 'admin', 'text');
             showToast("Warning Sent", 'warning');
             simulateBotReply('warning', 'text');
        }
    };

    if (!ticket) return null;

    // --- Message Renderer ---
    const renderMessage = ({ item }: { item: Message }) => {
        if (item.isSystem) {
            return (
                <View style={styles.systemMessageContainer}>
                    <Text style={styles.systemMessageText}>{item.text}</Text>
                </View>
            );
        }
        
        const isAdmin = item.sender === 'admin';
        
        // Dynamic Content
        let content;
        if (item.type === 'image') {
            content = (
                <View style={{alignItems:'center'}}>
                    <View style={styles.placeholderImg}>
                        <MaterialCommunityIcons name="image-outline" size={30} color="#fff" />
                    </View>
                    <Text style={{fontSize:11, color: isAdmin?'#fff':'#333', marginTop:4}}>Sent an Image</Text>
                </View>
            );
        } else if (item.type === 'file') {
             content = (
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <MaterialCommunityIcons name="file-document-outline" size={24} color={isAdmin ? '#fff' : '#333'} />
                    <Text style={{color: isAdmin ? '#fff' : '#333', textDecorationLine:'underline', marginLeft: 5}}>{item.text}</Text>
                </View>
            );
        } else {
            content = <Text style={[styles.msgText, isAdmin ? { color: '#fff' } : { color: '#333' }]}>{item.text}</Text>;
        }

        return (
            <View style={[styles.msgWrapper, isAdmin ? styles.msgRight : styles.msgLeft]}>
                {!isAdmin && (
                    <View style={styles.avatarPlaceholder}>
                         <Text style={styles.avatarText}>{ticket.name.charAt(0)}</Text>
                    </View>
                )}
                <View style={[styles.bubble, isAdmin ? styles.bubbleAdmin : styles.bubbleUser]}>
                    {content}
                    <Text style={[styles.timeText, isAdmin ? { color: '#E0E7FF' } : { color: '#9CA3AF' }]}>{item.time}</Text>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <View style={styles.toastWrapper}><Toast message={toast.message} type={toast.type} visible={toast.visible} /></View>

            {/* --- Header --- */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 5 }}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.headerInfo} onPress={() => setProfileModalVisible(true)}>
                    <Text style={styles.headerName}>{ticket.name}</Text>
                    <View style={styles.headerSubRow}>
                        <View style={[styles.statusDot, { backgroundColor: ticket.status === 'Resolved' ? '#3B82F6' : ticket.status === 'Banned' ? '#EF4444' : '#22C55E' }]} />
                        <Text style={styles.headerTicket}>{ticket.ticketId} • {ticket.status}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionBtn} onPress={() => setActionModalVisible(true)}>
                    <MaterialCommunityIcons name="shield-account" size={24} color="#6C63FF" />
                </TouchableOpacity>
            </View>

            {/* --- Chat List --- */}
            <FlatList
                ref={flatListRef}
                data={ticket.messages}
                keyExtractor={item => item.id}
                renderItem={renderMessage}
                contentContainerStyle={{ padding: 15, paddingBottom: 20 }}
                ListFooterComponent={isTyping ? (
                    <View style={styles.typingContainer}>
                        <View style={styles.avatarPlaceholder}><Text style={styles.avatarText}>{ticket.name.charAt(0)}</Text></View>
                        <View style={styles.typingBubble}><ActivityIndicator size="small" color="#9CA3AF" /></View>
                    </View>
                ) : null}
            />

            {/* --- Input Area --- */}
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                {ticket.status === 'Banned' ? (
                    <View style={styles.bannedContainer}>
                        <MaterialCommunityIcons name="lock" size={16} color="#EF4444" />
                        <Text style={styles.bannedText}>Chat locked (User Banned)</Text>
                    </View>
                ) : (
                    <View style={styles.inputContainer}>
                        {/* THE UPLOAD BUTTON */}
                        <TouchableOpacity style={styles.attachBtn} onPress={() => setAttachMenuVisible(true)}>
                            <MaterialCommunityIcons name="plus-circle" size={28} color="#6C63FF" />
                        </TouchableOpacity>
                        
                        <TextInput
                            style={styles.input}
                            placeholder="Reply as Support..."
                            value={inputText}
                            onChangeText={setInputText}
                            placeholderTextColor="#9CA3AF"
                        />
                        <TouchableOpacity style={styles.sendBtn} onPress={() => handleSend()}>
                            <MaterialCommunityIcons name="send" size={20} color="#fff" />
                        </TouchableOpacity>
                    </View>
                )}
            </KeyboardAvoidingView>

            {/* --- MODAL 1: Admin Actions --- */}
            <Modal visible={actionModalVisible} transparent animationType="fade" onRequestClose={() => setActionModalVisible(false)}>
                <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setActionModalVisible(false)}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Ticket Actions</Text>
                        <TouchableOpacity style={styles.modalOption} onPress={() => handleAction('Resolve')}>
                            <MaterialCommunityIcons name="check-circle-outline" size={22} color="#22C55E" />
                            <Text style={styles.modalOptionText}>Mark Resolved</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalOption} onPress={() => handleAction('Warning')}>
                            <MaterialCommunityIcons name="alert-octagon-outline" size={22} color="#F59E0B" />
                            <Text style={styles.modalOptionText}>Send Warning</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalOption} onPress={() => handleAction('Profile')}>
                            <MaterialCommunityIcons name="account-details-outline" size={22} color="#3B82F6" />
                            <Text style={styles.modalOptionText}>User Profile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalOption} onPress={() => handleAction('Ban')}>
                            <MaterialCommunityIcons name="block-helper" size={22} color="#EF4444" />
                            <Text style={[styles.modalOptionText, { color: '#EF4444' }]}>Ban User</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>

            {/* --- MODAL 2: User Profile --- */}
            <Modal visible={profileModalVisible} animationType="slide" presentationStyle="pageSheet" onRequestClose={() => setProfileModalVisible(false)}>
                <View style={styles.profileModalContainer}>
                    <View style={styles.profileHeader}>
                        <TouchableOpacity onPress={() => setProfileModalVisible(false)} style={styles.closeProfileBtn}>
                            <MaterialCommunityIcons name="close" size={24} color="#333" />
                        </TouchableOpacity>
                        <Text style={styles.profileHeaderTitle}>User Profile</Text>
                    </View>
                    <View style={styles.profileBody}>
                        <View style={styles.profileAvatarLarge}><Text style={styles.profileAvatarText}>{ticket.name.charAt(0)}</Text></View>
                        <Text style={styles.profileName}>{ticket.name}</Text>
                        <Text style={styles.profileRole}>{ticket.userType}</Text>
                        
                        <View style={styles.infoCard}>
                            <View style={styles.infoRow}><MaterialCommunityIcons name="email-outline" size={20} color="#666" /><Text style={styles.infoText}>user@example.com</Text></View>
                            <View style={styles.infoRow}><MaterialCommunityIcons name="phone-outline" size={20} color="#666" /><Text style={styles.infoText}>+91 98765 43210</Text></View>
                            <View style={styles.infoRow}><MaterialCommunityIcons name="identifier" size={20} color="#666" /><Text style={styles.infoText}>ID: {ticket.ticketId}</Text></View>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* --- MODAL 3: Attachment / Upload Menu --- */}
            <Modal visible={attachMenuVisible} transparent animationType="slide" onRequestClose={() => setAttachMenuVisible(false)}>
                <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setAttachMenuVisible(false)}>
                    <View style={styles.attachSheet}>
                        <Text style={styles.attachTitle}>Send Attachment</Text>
                        <View style={styles.attachGrid}>
                            <TouchableOpacity style={styles.attachItem} onPress={() => handleSend('support_guide.pdf', 'file')}>
                                <View style={[styles.attachIcon, {backgroundColor:'#E0F2FE'}]}>
                                    <MaterialCommunityIcons name="file-document-outline" size={28} color="#0284C7" />
                                </View>
                                <Text style={styles.attachLabel}>Document</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.attachItem} onPress={() => handleSend('screenshot.jpg', 'image')}>
                                <View style={[styles.attachIcon, {backgroundColor:'#FCE7F3'}]}>
                                    <MaterialCommunityIcons name="image-outline" size={28} color="#DB2777" />
                                </View>
                                <Text style={styles.attachLabel}>Image</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F3F4F6' },
    
    // Toast
    toastWrapper: { position: 'absolute', top: 60, left: 20, right: 20, zIndex: 9999, alignItems: 'center' },
    toastContainer: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, borderRadius: 25, shadowColor: '#000', shadowOpacity: 0.2, elevation: 5 },
    toastText: { color: '#fff', fontSize: 13, fontWeight: '600' },

    // Header
    header: { flexDirection: 'row', alignItems: 'center', padding: 15, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
    headerInfo: { flex: 1, marginLeft: 15 },
    headerName: { fontSize: 16, fontWeight: '700', color: '#111' },
    headerSubRow: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
    statusDot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
    headerTicket: { fontSize: 12, color: '#6B7280' },
    actionBtn: { padding: 5 },

    // Chat
    msgWrapper: { flexDirection: 'row', marginBottom: 15, maxWidth: '80%' },
    msgLeft: { alignSelf: 'flex-start' },
    msgRight: { alignSelf: 'flex-end', flexDirection: 'row-reverse' },
    avatarPlaceholder: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#CBD5E1', justifyContent: 'center', alignItems: 'center', marginRight: 8 },
    avatarText: { fontSize: 12, fontWeight: 'bold', color: '#fff' },
    bubble: { padding: 12, borderRadius: 16 },
    bubbleUser: { backgroundColor: '#fff', borderTopLeftRadius: 4 },
    bubbleAdmin: { backgroundColor: '#6C63FF', borderBottomRightRadius: 4 },
    msgText: { fontSize: 15, lineHeight: 20 },
    timeText: { fontSize: 10, marginTop: 4, alignSelf: 'flex-end' },
    systemMessageContainer: { alignSelf: 'center', marginVertical: 15, backgroundColor: '#E5E7EB', paddingVertical: 4, paddingHorizontal: 12, borderRadius: 10 },
    systemMessageText: { fontSize: 11, color: '#4B5563', fontWeight: '600' },
    placeholderImg: { width: 150, height: 100, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 8, justifyContent:'center', alignItems:'center' },

    // Typing
    typingContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, marginLeft: 15 },
    typingBubble: { backgroundColor: '#fff', padding: 10, borderRadius: 16, width: 50, alignItems:'center' },

    // Input & Banned
    inputContainer: { flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#E5E7EB' },
    attachBtn: { padding: 10 },
    input: { flex: 1, backgroundColor: '#F9FAFB', borderRadius: 20, paddingHorizontal: 15, paddingVertical: 8, color: '#333', marginRight: 10 },
    sendBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#6C63FF', justifyContent: 'center', alignItems: 'center' },
    bannedContainer: { backgroundColor: '#FEF2F2', padding: 15, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
    bannedText: { color: '#EF4444', fontWeight: '600', marginLeft: 8 },

    // General Modal
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
    modalContent: { backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 25 },
    modalTitle: { fontSize: 18, fontWeight: '800', marginBottom: 20, color: '#111', textAlign: 'center' },
    modalOption: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
    modalOptionText: { fontSize: 16, color: '#333', marginLeft: 15, fontWeight: '500' },

    // Attach Sheet
    attachSheet: { backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 25 },
    attachTitle: { fontSize: 18, fontWeight: '700', color: '#111', marginBottom: 20, textAlign: 'center' },
    attachGrid: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
    attachItem: { alignItems: 'center' },
    attachIcon: { width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
    attachLabel: { color: '#555', fontSize: 13 },

    // Profile Modal
    profileModalContainer: { flex: 1, backgroundColor: '#F9FAFB' },
    profileHeader: { flexDirection: 'row', alignItems: 'center', padding: 15, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
    closeProfileBtn: { padding: 5 },
    profileHeaderTitle: { fontSize: 18, fontWeight: '700', marginLeft: 15, color: '#111' },
    profileBody: { padding: 20, alignItems: 'center' },
    profileAvatarLarge: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#E0E7FF', justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
    profileAvatarText: { fontSize: 32, fontWeight: 'bold', color: '#4F46E5' },
    profileName: { fontSize: 22, fontWeight: '800', color: '#111' },
    profileRole: { fontSize: 14, color: '#6B7280', marginBottom: 20 },
    infoCard: { width: '100%', backgroundColor: '#fff', borderRadius: 12, padding: 20, marginBottom: 20 },
    infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
    infoText: { marginLeft: 15, fontSize: 15, color: '#333' },
});

export default ETChatDetailScreen;