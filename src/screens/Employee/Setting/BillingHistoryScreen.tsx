import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

// --- TYPES ---
type PaymentStatus = 'Paid' | 'Pending' | 'Failed';

interface Transaction {
    id: string;
    planName: string;
    date: string;
    amount: string;
    status: PaymentStatus;
    paymentMethod: string; // e.g., "Visa **** 4242"
    invoiceId: string;
}

// --- MOCK DATA ---
const HISTORY_DATA: Transaction[] = [
    {
        id: '1',
        planName: 'Career Pro - Monthly',
        date: 'Oct 24, 2023',
        amount: '₹799',
        status: 'Paid',
        paymentMethod: 'Visa •••• 4242',
        invoiceId: 'INV-2023-001',
    },
    {
        id: '2',
        planName: 'Priority - Monthly',
        date: 'Sep 24, 2023',
        amount: '₹399',
        status: 'Paid',
        paymentMethod: 'Visa •••• 4242',
        invoiceId: 'INV-2023-002',
    },
    {
        id: '3',
        planName: 'AIP Premium - Yearly',
        date: 'Aug 24, 2023',
        amount: '₹14,999', // Failed attempt example
        status: 'Failed',
        paymentMethod: 'Mastercard •••• 8899',
        invoiceId: 'INV-2023-003',
    },
    {
        id: '4',
        planName: 'Priority - Monthly',
        date: 'Jul 24, 2023',
        amount: '₹399',
        status: 'Paid',
        paymentMethod: 'Visa •••• 4242',
        invoiceId: 'INV-2023-004',
    },
];

export default function BillingHistoryScreen() {
    const navigation = useNavigation();
    const [downloadingId, setDownloadingId] = useState<string | null>(null);

    // --- HELPERS ---
    const getStatusStyle = (status: PaymentStatus) => {
        switch (status) {
            case 'Paid':
                return { bg: '#E6F4EA', text: '#1E8E3E', icon: 'check-circle' };
            case 'Pending':
                return { bg: '#FEF7E0', text: '#B06000', icon: 'clock-outline' };
            case 'Failed':
                return { bg: '#FCE8E6', text: '#C5221F', icon: 'alert-circle' };
            default:
                return { bg: '#f1f3f4', text: '#5f6368', icon: 'help-circle' };
        }
    };

    const handleDownloadInvoice = (id: string, invoiceId: string) => {
        setDownloadingId(id);
        // Simulate network request
        setTimeout(() => {
            setDownloadingId(null);
            Alert.alert(
                'Invoice Downloaded',
                `Invoice #${invoiceId} has been saved to your files.`,
                [{ text: 'OK' }]
            );
        }, 1500);
    };

    // --- RENDER ITEM ---
    const renderItem = ({ item }: { item: Transaction }) => {
        const statusStyle = getStatusStyle(item.status);

        return (
            <View style={styles.card}>
                {/* Top Row: Date and Status */}
                <View style={styles.cardHeader}>
                    <Text style={styles.dateText}>{item.date}</Text>
                    <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
                        <MaterialCommunityIcons name={statusStyle.icon} size={12} color={statusStyle.text} style={{ marginRight: 4 }} />
                        <Text style={[styles.statusText, { color: statusStyle.text }]}>{item.status}</Text>
                    </View>
                </View>

                {/* Middle Row: Plan Details & Icon */}
                <View style={styles.detailsRow}>
                    <View style={styles.iconBox}>
                        <MaterialCommunityIcons
                            name={item.status === 'Failed' ? "credit-card-remove" : "receipt"}
                            size={24}
                            color="#555"
                        />
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.planName}>{item.planName}</Text>
                        <Text style={styles.paymentMethod}>{item.paymentMethod}</Text>
                    </View>
                    <Text style={styles.amountText}>{item.amount}</Text>
                </View>

                {/* Bottom Row: Actions (Invoice) */}
                {item.status === 'Paid' && (
                    <View style={styles.actionRow}>
                        <View style={styles.divider} />
                        <TouchableOpacity
                            style={styles.downloadButton}
                            onPress={() => handleDownloadInvoice(item.id, item.invoiceId)}
                            disabled={!!downloadingId}
                        >
                            {downloadingId === item.id ? (
                                <ActivityIndicator size="small" color="#3B82F6" />
                            ) : (
                                <>
                                    <MaterialCommunityIcons name="file-download-outline" size={18} color="#3B82F6" />
                                    <Text style={styles.downloadText}>Download Invoice</Text>
                                </>
                            )}
                        </TouchableOpacity>
                    </View>
                )}

                {item.status === 'Failed' && (
                    <View style={styles.actionRow}>
                        <View style={styles.divider} />
                        <TouchableOpacity style={styles.retryButton}>
                            <Text style={styles.retryText}>Update Payment Method</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        );
    };

    const renderEmptyState = () => (
        <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="receipt" size={64} color="#ddd" />
            <Text style={styles.emptyTitle}>No Billing History</Text>
            <Text style={styles.emptySubtitle}>You haven't made any purchases yet.</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* HEADER */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color="#111" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Billing History</Text>
                <View style={{ width: 24 }} />
            </View>

            <FlatList
                data={HISTORY_DATA}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={renderEmptyState}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    backBtn: {
        padding: 5,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111',
    },
    listContent: {
        padding: 20,
        paddingBottom: 40,
    },
    // --- CARD STYLES ---
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    dateText: {
        fontSize: 13,
        color: '#888',
        fontWeight: '500',
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    statusText: {
        fontSize: 11,
        fontWeight: '700',
        textTransform: 'uppercase',
    },
    detailsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 8,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    infoContainer: {
        flex: 1,
    },
    planName: {
        fontSize: 15,
        fontWeight: '700',
        color: '#333',
        marginBottom: 2,
    },
    paymentMethod: {
        fontSize: 12,
        color: '#666',
    },
    amountText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#333',
    },
    // --- ACTIONS ---
    actionRow: {
        marginTop: 5,
    },
    divider: {
        height: 1,
        backgroundColor: '#f0f0f0',
        marginBottom: 10,
    },
    downloadButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
    },
    downloadText: {
        color: '#3B82F6',
        fontWeight: '600',
        fontSize: 13,
        marginLeft: 6,
    },
    retryButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
    },
    retryText: {
        color: '#C5221F',
        fontWeight: '600',
        fontSize: 13,
    },
    // --- EMPTY STATE ---
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 60,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#333',
        marginTop: 16,
        marginBottom: 8,
    },
    emptySubtitle: {
        fontSize: 14,
        color: '#888',
    },
});