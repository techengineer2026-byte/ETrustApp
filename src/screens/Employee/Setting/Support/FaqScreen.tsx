import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    FlatList,
    LayoutAnimation,
    Platform,
    UIManager,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

// Data
const CATEGORIES = ['All', 'Account', 'Jobs', 'Payment'];
const FAQS = [
    { id: '1', category: 'Account', question: 'How do I change my password?', answer: 'Go to Settings > Security > Change Password. Follow the instructions to update your credentials.' },
    { id: '2', category: 'Jobs', question: 'How do I apply for a job?', answer: 'Find a job you like, tap on it, and click the "Apply Now" button at the bottom of the screen.' },
    { id: '3', category: 'Payment', question: 'Can I get a refund?', answer: 'We generally have a no-refund policy, but exceptions are made for technical billing errors.' },
    { id: '4', category: 'Account', question: 'How do I delete my account?', answer: 'Go to Settings > Security > Delete Account. Note that this action is irreversible.' },
    { id: '5', category: 'Jobs', question: 'How can I track my application?', answer: 'Go to the "My Jobs" tab to see the status of all your active applications.' },
];

export default function FaqScreen() {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const toggleExpand = (id: string) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpandedId(expandedId === id ? null : id);
    };

    const filteredData = FAQS.filter(item => {
        const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
        const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const renderItem = ({ item }: { item: typeof FAQS[0] }) => {
        const isExpanded = expandedId === item.id;
        return (
            <TouchableOpacity
                style={[styles.card, isExpanded && styles.cardExpanded]}
                onPress={() => toggleExpand(item.id)}
                activeOpacity={0.8}
            >
                <View style={styles.questionRow}>
                    <Text style={[styles.questionText, isExpanded && styles.activeQuestion]}>{item.question}</Text>
                    <MaterialCommunityIcons
                        name={isExpanded ? "chevron-up" : "chevron-down"}
                        size={20}
                        color={isExpanded ? "#3B82F6" : "#aaa"}
                    />
                </View>
                {isExpanded && (
                    <View style={styles.answerContainer}>
                        <Text style={styles.answerText}>{item.answer}</Text>
                    </View>
                )}
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Help & Support</Text>
                <View style={{ width: 24 }} />
            </View>

            {/* Search */}
            <View style={styles.searchContainer}>
                <View style={styles.searchBar}>
                    <MaterialCommunityIcons name="magnify" size={20} color="#999" />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search for answers..."
                        placeholderTextColor="#999"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
            </View>

            {/* Categories */}
            <View style={styles.catContainer}>
                <FlatList
                    horizontal
                    data={CATEGORIES}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 20 }}
                    keyExtractor={item => item}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={[styles.catPill, selectedCategory === item && styles.catPillActive]}
                            onPress={() => setSelectedCategory(item)}
                        >
                            <Text style={[styles.catText, selectedCategory === item && styles.catTextActive]}>{item}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>

            {/* List */}
            <FlatList
                data={filteredData}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#f8f9fa' },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, backgroundColor: '#fff' },
    backButton: { padding: 5 },
    headerTitle: { fontSize: 18, fontWeight: '700', color: '#111' },

    searchContainer: { padding: 20, paddingBottom: 10, backgroundColor: '#fff' },
    searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f3f4f6', borderRadius: 10, paddingHorizontal: 12, height: 44 },
    searchInput: { flex: 1, marginLeft: 8, fontSize: 15, color: '#111' },

    catContainer: { paddingBottom: 15, backgroundColor: '#fff' },
    catPill: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#f3f4f6', marginRight: 8 },
    catPillActive: { backgroundColor: '#111' },
    catText: { fontSize: 13, fontWeight: '600', color: '#555' },
    catTextActive: { color: '#fff' },

    listContent: { padding: 20 },
    card: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#eee' },
    cardExpanded: { borderColor: '#3B82F6' },
    questionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    questionText: { fontSize: 15, fontWeight: '600', color: '#333', flex: 1, marginRight: 10 },
    activeQuestion: { color: '#3B82F6' },
    answerContainer: { marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#f3f4f6' },
    answerText: { fontSize: 14, color: '#666', lineHeight: 22 },
});