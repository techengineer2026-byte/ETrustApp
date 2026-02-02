import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Image,
    TextInput,
    StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

// --- Constants ---
const PRIMARY_COLOR = '#2563EB';
const TEXT_COLOR = '#111827';
const GRAY_TEXT = '#6B7280';
const BG_COLOR = '#FFFFFF';

// --- Mock Data ---
const CHAT_DATA = [
    { id: '1', name: 'Rahul Sharma', message: 'Hi, is the position still open?', time: '10:30 AM', unread: 2, online: true, img: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { id: '2', name: 'Priya Verma', message: 'I have attached my updated portfolio.', time: 'Yesterday', unread: 0, online: false, img: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { id: '3', name: 'Amit Kumar', message: 'Thanks for the opportunity!', time: 'Yesterday', unread: 0, online: true, img: 'https://randomuser.me/api/portraits/men/85.jpg' },
    { id: '4', name: 'Sarah Jenkins', message: 'Can we reschedule the interview?', time: 'Tue', unread: 1, online: false, img: 'https://randomuser.me/api/portraits/women/65.jpg' },
    { id: '5', name: 'Michael Chen', message: 'Looking forward to hearing from you.', time: 'Mon', unread: 0, online: false, img: 'https://randomuser.me/api/portraits/men/12.jpg' },
    { id: '6', name: 'Anita Roy', message: 'Typing...', time: 'Now', unread: 0, online: true, img: 'https://randomuser.me/api/portraits/women/22.jpg', typing: true },
];

export default function ChatScreen({ navigation }: any) {
    const [searchText, setSearchText] = useState('');

    // Filter Logic
    const filteredData = CHAT_DATA.filter(item => 
        item.name.toLowerCase().includes(searchText.toLowerCase())
    );

    const renderChatItem = ({ item }: any) => (
        <TouchableOpacity
            style={styles.chatRow}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('ChatDetailScreen', {
                name: item.name,
                img: item.img,
                isOnline: item.online
            })}
        >
            {/* Avatar Section */}
            <View style={styles.avatarContainer}>
                <Image source={{ uri: item.img }} style={styles.avatar} />
                {item.online && <View style={styles.onlineDot} />}
            </View>

            {/* Content Section */}
            <View style={styles.contentContainer}>
                <View style={styles.rowTop}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={[styles.time, item.unread > 0 && styles.activeTime]}>
                        {item.time}
                    </Text>
                </View>
                <View style={styles.rowBottom}>
                    <Text
                        numberOfLines={1}
                        style={[
                            styles.message,
                            item.typing && { color: PRIMARY_COLOR, fontStyle: 'italic' },
                            item.unread > 0 && { color: TEXT_COLOR, fontWeight: '600' }
                        ]}
                    >
                        {item.message}
                    </Text>
                    {item.unread > 0 && (
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>{item.unread}</Text>
                        </View>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={BG_COLOR} />

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Messages</Text>
                <TouchableOpacity style={styles.iconButton}>
                    <Feather name="edit" size={22} color={PRIMARY_COLOR} />
                </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <View style={styles.searchBox}>
                    <Ionicons name="search" size={20} color={GRAY_TEXT} />
                    <TextInput
                        placeholder="Search candidates..."
                        placeholderTextColor={GRAY_TEXT}
                        style={styles.searchInput}
                        value={searchText}
                        onChangeText={setSearchText}
                    />
                </View>
            </View>

            {/* Chat List */}
            <FlatList
                data={filteredData}
                keyExtractor={(item) => item.id}
                renderItem={renderChatItem}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BG_COLOR,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
        backgroundColor: BG_COLOR,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: TEXT_COLOR,
    },
    iconButton: {
        padding: 8,
        backgroundColor: '#EFF6FF',
        borderRadius: 50,
    },
    searchContainer: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: BG_COLOR,
    },
    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 45,
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 15,
        color: TEXT_COLOR,
    },
    listContent: {
        paddingBottom: 20,
    },
    chatRow: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 12,
        alignItems: 'center',
        backgroundColor: BG_COLOR,
    },
    avatarContainer: {
        position: 'relative',
        marginRight: 15,
    },
    avatar: {
        width: 55,
        height: 55,
        borderRadius: 27.5,
        backgroundColor: '#E5E7EB',
    },
    onlineDot: {
        position: 'absolute',
        bottom: 2,
        right: 2,
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#10B981', // Green
        borderWidth: 2,
        borderColor: 'white',
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#F9FAFB',
        paddingBottom: 12,
    },
    rowTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    name: {
        fontSize: 16,
        fontWeight: '700',
        color: TEXT_COLOR,
    },
    time: {
        fontSize: 12,
        color: GRAY_TEXT,
    },
    activeTime: {
        color: PRIMARY_COLOR,
        fontWeight: '600',
    },
    rowBottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    message: {
        fontSize: 14,
        color: GRAY_TEXT,
        flex: 1,
        marginRight: 10,
    },
    badge: {
        backgroundColor: PRIMARY_COLOR,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 10,
        minWidth: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    badgeText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    },
});