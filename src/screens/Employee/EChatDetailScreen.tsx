import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    Image,
    StatusBar,
    Modal,
    ActivityIndicator,
    TouchableWithoutFeedback
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
// --- Types ---
interface Message {
    id: string;
    text: string;
    sender: 'me' | 'other';
    time: string;
    type: 'text' | 'file' | 'image'; // Added message types
}

const EChatDetailScreen = () => {
    const navigation = useNavigation();
    const route = useRoute<any>();
    const flatListRef = useRef<FlatList>(null);
    const location = "Mohali"; // or "Remote", "Chandigarh", etc.

    const { name, company, avatar } = route.params || { name: 'Recruiter', company: 'Company', avatar: null };

    // --- State ---
    const [inputMessage, setInputMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', text: 'Hi! I saw your application for the Developer role.', sender: 'other', time: '10:00 AM', type: 'text' },
        { id: '2', text: 'Hello! Yes, I am very interested.', sender: 'me', time: '10:05 AM', type: 'text' },
    ]);

    const [isTyping, setIsTyping] = useState(false); // Simulates HR typing
    const [isUploading, setIsUploading] = useState(false); // Simulates file upload
    const [menuVisible, setMenuVisible] = useState(false); // 3-dot menu
    const [attachMenuVisible, setAttachMenuVisible] = useState(false); // Plus button menu

    // --- Auto Scroll on New Message ---
    useEffect(() => {
        setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 200);
    }, [messages, isTyping]);

    // --- HR Bot Logic ---
    const triggerBotResponse = (userText: string) => {
        setIsTyping(true);

        // Simulate delay (1.5 - 3 seconds)
        const delay = Math.random() * 1500 + 1500;

        setTimeout(() => {
            const lowerText = userText.toLowerCase();
            let responseText = "Thank you for your message. We will get back to you shortly.";

            // Nested Logic for "Real" HR feel
            if (lowerText.includes('hello') || lowerText.includes('hi') || lowerText.includes('hey')) {
                responseText = `Hi there! Thanks for reaching out regarding the position at ${company}. How can I help you today?`;
            }
            else if (lowerText.includes('how are') || lowerText.includes('doing')) {
                responseText = "I'm doing well, thanks for asking! We are currently reviewing applications. Do you have any specific questions about the role?";
            }
            else if (lowerText.includes('resume') || lowerText.includes('cv') || lowerText.includes('file')) {
                responseText = "I've received the file. I'll pass it along to the hiring manager for review immediately.";
            }
            else if (lowerText.includes('interview') || lowerText.includes('when')) {
                responseText = "We are scheduling interviews for next week. If selected, you'll receive an email invitation soon.";
            }
            else if (lowerText.includes('salary') || lowerText.includes('pay') || lowerText.includes('compensation')) {
                responseText = "The salary range for this position is competitive and depends on experience. We can discuss this further during the interview stage.";
            }
            else if (lowerText.includes('thanks') || lowerText.includes('thank you')) {
                responseText = "You're welcome! Have a great day.";
            }
            // Availability & Role details
            else if (lowerText.includes('job description') || lowerText.includes('jd')) {
                responseText = "Sure! I can share more details about the job responsibilities and expectations. Which part would you like to know more about?";
            }
            else if (lowerText.includes('location') || lowerText.includes('work location')) {
                responseText = `This role is primarily based in ${location}. Some flexibility may be available depending on the position.`;
            }
            else if (lowerText.includes('remote') || lowerText.includes('work from home')) {
                responseText = "This role may offer remote or hybrid options depending on the team requirements.";
            }
            else if (lowerText.includes('full time') || lowerText.includes('part time')) {
                responseText = "This position is currently open as a full-time role.";
            }
            else if (lowerText.includes('contract') || lowerText.includes('freelance')) {
                responseText = "At the moment, we are hiring for permanent roles only unless mentioned otherwise.";
            }

            // Application status
            else if (lowerText.includes('application status') || lowerText.includes('status')) {
                responseText = "Your application is under review. Our team will reach out if your profile matches the role requirements.";
            }
            else if (lowerText.includes('selected') || lowerText.includes('shortlisted')) {
                responseText = "If shortlisted, you will be contacted via email or phone with the next steps.";
            }
            else if (lowerText.includes('rejected') || lowerText.includes('not selected')) {
                responseText = "We truly appreciate your interest. Even if not selected this time, we encourage you to apply for future openings.";
            }

            // Experience & skills
            else if (lowerText.includes('experience')) {
                responseText = "We are looking for candidates with relevant experience, but strong skills and willingness to learn are equally important.";
            }
            else if (lowerText.includes('fresher') || lowerText.includes('entry level')) {
                responseText = "Yes, freshers are welcome to apply for this role if they meet the basic skill requirements.";
            }
            else if (lowerText.includes('skills') || lowerText.includes('technologies')) {
                responseText = "The required skills vary by role. Could you let me know which position you are applying for?";
            }

            // Interview process
            else if (lowerText.includes('interview process')) {
                responseText = "The interview process typically includes an initial screening followed by technical and HR rounds.";
            }
            else if (lowerText.includes('online interview')) {
                responseText = "Yes, interviews are conducted online unless specified otherwise.";
            }
            else if (lowerText.includes('walk in')) {
                responseText = "Currently, we are not conducting walk-in interviews. All applications must be submitted online.";
            }
            else if (lowerText.includes('reschedule')) {
                responseText = "Sure, interview rescheduling is possible. Please inform us at least 24 hours in advance.";
            }

            // Salary & benefits
            else if (lowerText.includes('ctc')) {
                responseText = "The CTC will be discussed in detail during the interview based on your experience and expectations.";
            }
            else if (lowerText.includes('increment') || lowerText.includes('hike')) {
                responseText = "Performance-based increments are reviewed periodically as per company policy.";
            }
            else if (lowerText.includes('benefits') || lowerText.includes('perks')) {
                responseText = "We offer benefits such as paid leaves, learning opportunities, and health coverage depending on the role.";
            }

            // Notice period & joining
            else if (lowerText.includes('notice period')) {
                responseText = "The preferred notice period for this role is up to 30 days, but exceptions can be discussed.";
            }
            else if (lowerText.includes('joining') || lowerText.includes('join')) {
                responseText = "The expected joining date will be discussed once the selection process is complete.";
            }
            else if (lowerText.includes('immediate joiner')) {
                responseText = "Immediate joiners are preferred, but we also consider candidates with a short notice period.";
            }

            // Documents & verification
            else if (lowerText.includes('documents')) {
                responseText = "You may be required to submit documents for verification after selection.";
            }
            else if (lowerText.includes('background check')) {
                responseText = "Yes, background verification is part of our standard hiring process.";
            }
            else if (lowerText.includes('offer letter')) {
                responseText = "Offer letters are shared via official email after final approval.";
            }

            // Company & culture
            else if (lowerText.includes('company culture')) {
                responseText = `At ${company}, we value collaboration, learning, and a positive work environment.`;
            }
            else if (lowerText.includes('team size')) {
                responseText = "Team sizes vary by department, but we focus on collaborative and agile teams.";
            }
            else if (lowerText.includes('growth')) {
                responseText = "We strongly support career growth through internal opportunities and upskilling.";
            }

            // Follow-ups & closing
            else if (lowerText.includes('follow up')) {
                responseText = "Thank you for following up. Our team is actively reviewing applications.";
            }
            else if (lowerText.includes('call') || lowerText.includes('phone')) {
                responseText = "If required, our HR team will contact you via phone.";
            }
            else if (lowerText.includes('email')) {
                responseText = "Please keep an eye on your email for further communication from our team.";
            }
            else if (lowerText.includes('bye') || lowerText.includes('goodbye')) {
                responseText = "Thank you for your interest. Wishing you all the best!";
            }
            else {
                responseText = "Thank you for reaching out. Could you please provide more details so I can assist you better?";
            }


            const botMsg: Message = {
                id: Date.now().toString(),
                text: responseText,
                sender: 'other',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                type: 'text'
            };

            setMessages(prev => [...prev, botMsg]);
            setIsTyping(false);
        }, delay);
    };

    // --- Send Text Message ---
    const handleSend = () => {
        if (inputMessage.trim().length === 0) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            text: inputMessage,
            sender: 'me',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            type: 'text'
        };

        setMessages((prev) => [...prev, userMsg]);
        const textToSend = inputMessage;
        setInputMessage('');

        // Trigger Bot
        triggerBotResponse(textToSend);
    };

    // --- Simulate File Upload ---
    const handleFakeUpload = (fileType: 'resume' | 'image') => {
        setAttachMenuVisible(false);
        setIsUploading(true); // Show loader

        // Simulate upload time (2 seconds)
        setTimeout(() => {
            setIsUploading(false);

            const fileMsg: Message = {
                id: Date.now().toString(),
                text: fileType === 'resume' ? 'My_Resume_Updated.pdf' : 'Portfolio_Screenshot.png',
                sender: 'me',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                type: fileType === 'resume' ? 'file' : 'image'
            };

            setMessages(prev => [...prev, fileMsg]);
            triggerBotResponse("Here is my " + fileType); // Prompt bot to say "Received"
        }, 2000);
    };

    // --- Render Message Bubble ---
    const renderMessage = ({ item }: { item: Message }) => {
        const isMe = item.sender === 'me';

        // Custom content for files
        const renderContent = () => {
            if (item.type === 'file') {
                return (
                    <View style={styles.fileContainer}>
                        <View style={styles.fileIconBg}>
                            <MaterialCommunityIcons name="file-document-outline" size={24} color="#fff" />
                        </View>
                        <Text style={[styles.messageText, isMe ? styles.textMe : styles.textOther, { textDecorationLine: 'underline' }]}>
                            {item.text}
                        </Text>
                    </View>
                );
            }
            if (item.type === 'image') {
                return (
                    <View>
                        <View style={styles.placeholderImage}>
                            <MaterialCommunityIcons name="image" size={40} color="#ccc" />
                            <Text style={{ color: '#999', fontSize: 10 }}>Image Preview</Text>
                        </View>
                        <Text style={[styles.messageText, isMe ? styles.textMe : styles.textOther, { marginTop: 5 }]}>
                            {item.text}
                        </Text>
                    </View>
                );
            }
            return (
                <Text style={[styles.messageText, isMe ? styles.textMe : styles.textOther]}>
                    {item.text}
                </Text>
            );
        };

        return (
            <View style={[styles.messageWrapper, isMe ? styles.messageWrapperMe : styles.messageWrapperOther]}>
                {!isMe && avatar && (
                    <Image source={{ uri: avatar }} style={styles.msgAvatar} />
                )}
                {!isMe && !avatar && (
                    <View style={[styles.msgAvatar, { backgroundColor: '#ccc', justifyContent: 'center', alignItems: 'center' }]}>
                        <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'white' }}>{name.charAt(0)}</Text>
                    </View>
                )}

                <View style={[styles.messageBubble, isMe ? styles.bubbleMe : styles.bubbleOther]}>
                    {renderContent()}
                    <Text style={[styles.timeText, isMe ? styles.timeMe : styles.timeOther]}>
                        {item.time}
                    </Text>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            {/* --- Header --- */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
                </TouchableOpacity>

                <View style={styles.headerInfo}>
                    <Text style={styles.headerName}>{name}</Text>
                    <Text style={styles.headerCompany}>{company}</Text>
                </View>

                {/* 3 Dot Button */}
                <TouchableOpacity onPress={() => setMenuVisible(true)} style={{ padding: 5 }}>
                    <MaterialCommunityIcons name="dots-vertical" size={24} color="#333" />
                </TouchableOpacity>
            </View>

            {/* --- Messages List --- */}
            <FlatList
                ref={flatListRef}
                data={messages}
                keyExtractor={(item) => item.id}
                renderItem={renderMessage}
                contentContainerStyle={styles.listContent}
                ListFooterComponent={
                    <>
                        {/* Uploading Indicator */}
                        {isUploading && (
                            <View style={styles.centerStatus}>
                                <ActivityIndicator size="small" color="#2F80ED" />
                                <Text style={styles.statusText}>Uploading file...</Text>
                            </View>
                        )}
                        {/* Typing Indicator */}
                        {isTyping && (
                            <View style={styles.typingWrapper}>
                                <Image source={{ uri: avatar }} style={styles.typingAvatar} />
                                <View style={styles.typingBubble}>
                                    <View style={styles.typingDot} />
                                    <View style={[styles.typingDot, { marginHorizontal: 4 }]} />
                                    <View style={styles.typingDot} />
                                </View>
                            </View>
                        )}
                    </>
                }
            />

            {/* --- Input Area --- */}
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
            >
                <View style={styles.inputContainer}>
                    {/* Attachment Button */}
                    <TouchableOpacity
                        style={styles.attachButton}
                        onPress={() => setAttachMenuVisible(true)}
                    >
                        <MaterialCommunityIcons name="plus" size={24} color="#2F80ED" />
                    </TouchableOpacity>

                    <TextInput
                        style={styles.input}
                        placeholder="Type a message..."
                        placeholderTextColor="#9E9E9E"
                        value={inputMessage}
                        onChangeText={setInputMessage}
                        multiline
                    />

                    <TouchableOpacity
                        style={[styles.sendButton, { backgroundColor: inputMessage.trim() ? '#2F80ED' : '#F5F6FA' }]}
                        onPress={handleSend}
                        disabled={!inputMessage.trim()}
                    >
                        <MaterialCommunityIcons
                            name="send"
                            size={20}
                            color={inputMessage.trim() ? '#fff' : '#BDBDBD'}
                        />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>

            {/* --- Custom Modal for 3-Dots Menu --- */}
            <Modal
                visible={menuVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setMenuVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
                    <View style={styles.modalOverlay}>
                        <View style={styles.menuContainer}>
                            <TouchableOpacity style={styles.menuItem} onPress={() => setMenuVisible(false)}>
                                <MaterialCommunityIcons name="account-outline" size={22} color="#333" />
                                <Text style={styles.menuText}>View Profile</Text>
                            </TouchableOpacity>
                            <View style={styles.menuDivider} />
                            <TouchableOpacity style={styles.menuItem} onPress={() => { setMessages([]); setMenuVisible(false) }}>
                                <MaterialCommunityIcons name="broom" size={22} color="#333" />
                                <Text style={styles.menuText}>Clear Chat</Text>
                            </TouchableOpacity>
                            <View style={styles.menuDivider} />
                            <TouchableOpacity style={styles.menuItem} onPress={() => setMenuVisible(false)}>
                                <MaterialCommunityIcons name="flag-outline" size={22} color="#EB5757" />
                                <Text style={[styles.menuText, { color: '#EB5757' }]}>Report User</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            {/* --- Custom Modal for Attachment Menu (Simulate Upload) --- */}
            <Modal
                visible={attachMenuVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setAttachMenuVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setAttachMenuVisible(false)}>
                    <View style={styles.modalBottomOverlay}>
                        <View style={styles.bottomSheet}>
                            <Text style={styles.sheetTitle}>Send Attachment</Text>

                            <View style={styles.sheetGrid}>
                                <TouchableOpacity style={styles.sheetItem} onPress={() => handleFakeUpload('resume')}>
                                    <View style={[styles.iconCircle, { backgroundColor: '#EBF3FF' }]}>
                                        <MaterialCommunityIcons name="file-document-outline" size={28} color="#2F80ED" />
                                    </View>
                                    <Text style={styles.sheetLabel}>Document</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.sheetItem} onPress={() => handleFakeUpload('image')}>
                                    <View style={[styles.iconCircle, { backgroundColor: '#FFF0F0' }]}>
                                        <MaterialCommunityIcons name="image-outline" size={28} color="#EB5757" />
                                    </View>
                                    <Text style={styles.sheetLabel}>Photo</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.sheetItem} onPress={() => setAttachMenuVisible(false)}>
                                    <View style={[styles.iconCircle, { backgroundColor: '#EDF9F0' }]}>
                                        <MaterialCommunityIcons name="camera-outline" size={28} color="#27AE60" />
                                    </View>
                                    <Text style={styles.sheetLabel}>Camera</Text>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity style={styles.cancelButton} onPress={() => setAttachMenuVisible(false)}>
                                <Text style={styles.cancelText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
        backgroundColor: '#fff',
        zIndex: 10,
    },
    backButton: {
        paddingRight: 15,
    },
    headerInfo: {
        flex: 1,
    },
    headerName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    headerCompany: {
        fontSize: 12,
        color: '#757575',
    },
    listContent: {
        paddingHorizontal: 15,
        paddingVertical: 20,
        paddingBottom: 40,
    },
    messageWrapper: {
        flexDirection: 'row',
        marginBottom: 15,
        maxWidth: '85%',
    },
    messageWrapperMe: {
        alignSelf: 'flex-end',
        justifyContent: 'flex-end',
    },
    messageWrapperOther: {
        alignSelf: 'flex-start',
    },
    msgAvatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 8,
        alignSelf: 'flex-end',
    },
    messageBubble: {
        padding: 12,
        borderRadius: 16,
        maxWidth: '100%',
    },
    bubbleMe: {
        backgroundColor: '#2F80ED',
        borderBottomRightRadius: 2,
    },
    bubbleOther: {
        backgroundColor: '#F2F2F2',
        borderBottomLeftRadius: 2,
    },
    messageText: {
        fontSize: 15,
        lineHeight: 22,
    },
    textMe: {
        color: '#fff',
    },
    textOther: {
        color: '#333',
    },
    timeText: {
        fontSize: 10,
        marginTop: 4,
        alignSelf: 'flex-end',
    },
    timeMe: {
        color: 'rgba(255,255,255,0.7)',
    },
    timeOther: {
        color: '#9E9E9E',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        paddingHorizontal: 15,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
        backgroundColor: '#fff',
    },
    attachButton: {
        marginRight: 10,
        padding: 5,
    },
    input: {
        flex: 1,
        backgroundColor: '#F5F6FA',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 8,
        maxHeight: 100,
        fontSize: 15,
        color: '#333',
        marginRight: 10,
    },
    sendButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },

    // File Styles
    fileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    fileIconBg: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    placeholderImage: {
        width: 150,
        height: 100,
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
    },

    // Status Indicators
    centerStatus: {
        alignItems: 'center',
        marginVertical: 10,
    },
    statusText: {
        color: '#999',
        fontSize: 12,
        marginTop: 5,
    },
    typingWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        marginBottom: 10,
    },
    typingAvatar: {
        width: 20,
        height: 20,
        borderRadius: 10,
        marginRight: 8,
    },
    typingBubble: {
        backgroundColor: '#F2F2F2',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 15,
        flexDirection: 'row',
        borderBottomLeftRadius: 2,
    },
    typingDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#9E9E9E',
    },

    // Modal Styles (Menu)
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.2)', // Dim background
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
    },
    menuContainer: {
        backgroundColor: '#fff',
        width: 180,
        marginTop: 60, // approximate header height
        marginRight: 10,
        borderRadius: 8,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        paddingVertical: 5,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
    },
    menuText: {
        fontSize: 14,
        color: '#333',
        marginLeft: 10,
        fontWeight: '500',
    },
    menuDivider: {
        height: 1,
        backgroundColor: '#F0F0F0',
        marginHorizontal: 10,
    },

    // Bottom Sheet (Attachment)
    modalBottomOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    bottomSheet: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        padding: 25,
        paddingBottom: 40,
    },
    sheetTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    sheetGrid: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    sheetItem: {
        alignItems: 'center',
    },
    iconCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    sheetLabel: {
        fontSize: 14,
        color: '#555',
    },
    cancelButton: {
        marginTop: 10,
        alignItems: 'center',
        padding: 10,
    },
    cancelText: {
        fontSize: 16,
        color: '#EB5757',
        fontWeight: '600',
    },
});

export default EChatDetailScreen;