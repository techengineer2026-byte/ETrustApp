import React, { useState } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Image,
    TextInput,
    SafeAreaView,
    StatusBar
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Mock Data for the Chat List
const MOCK_CHATS = [
    {
        id: '1',
        name: 'Sarah Jenkins',
        company: 'Tech Solutions Inc.',
        lastMessage: 'Great! Can you send over your portfolio?',
        time: '10:30 AM',
        unread: 2,
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
        id: '2',
        name: 'Michael Chen',
        company: 'InnovateX',
        lastMessage: 'Your interview is scheduled for Tuesday.',
        time: 'Yesterday',
        unread: 0,
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
        id: '3',
        name: 'HR Team',
        company: 'Creative Studio',
        lastMessage: 'Thanks for applying. We will review shortly.',
        time: 'Mon',
        unread: 0,
        avatar: null, // No image, will show icon
    },
];

const ChatScreen = () => {
    const navigation = useNavigation<any>();
    const [searchText, setSearchText] = useState('');

    const renderItem = ({ item }: { item: typeof MOCK_CHATS[0] }) => (
        <TouchableOpacity
            style={styles.chatItem}
            onPress={() => navigation.navigate('EChatDetailScreen', {
                id: item.id,
                name: item.name,
                company: item.company,
                avatar: item.avatar
            })}
        >
            {/* Avatar Section */}
            <View style={styles.avatarContainer}>
                {item.avatar ? (
                    <Image source={{ uri: item.avatar }} style={styles.avatar} />
                ) : (
                    <View style={[styles.avatar, styles.defaultAvatar]}>
                        <Text style={styles.initials}>{item.name.charAt(0)}</Text>
                    </View>
                )}
            </View>

            {/* Content Section */}
            <View style={styles.contentContainer}>
                <View style={styles.headerRow}>
                    <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
                    <Text style={styles.time}>{item.time}</Text>
                </View>
                <Text style={styles.company}>{item.company}</Text>
                <View style={styles.messageRow}>
                    <Text
                        style={[styles.message, item.unread > 0 && styles.unreadMessage]}
                        numberOfLines={1}
                    >
                        {item.lastMessage}
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
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Messages</Text>
                <TouchableOpacity>
                    <MaterialCommunityIcons name="square-edit-outline" size={24} color="#2F80ED" />
                </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <MaterialCommunityIcons name="magnify" size={20} color="#9E9E9E" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search messages..."
                    value={searchText}
                    onChangeText={setSearchText}
                    placeholderTextColor="#9E9E9E"
                />
            </View>

            {/* Chat List */}
            <FlatList
                data={MOCK_CHATS}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
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
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F6FA',
        marginHorizontal: 20,
        marginBottom: 10,
        borderRadius: 12,
        paddingHorizontal: 15,
        height: 45,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 15,
        color: '#333',
    },
    listContent: {
        paddingBottom: 20,
    },
    chatItem: {
        flexDirection: 'row',
        padding: 15,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    avatarContainer: {
        marginRight: 15,
    },
    avatar: {
        width: 55,
        height: 55,
        borderRadius: 27.5,
    },
    defaultAvatar: {
        backgroundColor: '#E0E0E0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    initials: {
        fontSize: 22,
        fontWeight: '600',
        color: '#757575',
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 2,
    },
    name: {
        fontSize: 16,
        fontWeight: '700',
        color: '#333',
        flex: 1,
    },
    time: {
        fontSize: 12,
        color: '#9E9E9E',
    },
    company: {
        fontSize: 12,
        color: '#2F80ED',
        marginBottom: 4,
        fontWeight: '500',
    },
    messageRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    message: {
        fontSize: 14,
        color: '#757575',
        flex: 1,
        marginRight: 10,
    },
    unreadMessage: {
        color: '#333',
        fontWeight: '600',
    },
    badge: {
        backgroundColor: '#2F80ED',
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
    },
    separator: {
        height: 1,
        backgroundColor: '#F0F0F0',
        marginLeft: 90,
    },
});

export default ChatScreen;