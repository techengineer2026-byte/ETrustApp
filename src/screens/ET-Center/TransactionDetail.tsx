// src/screens/ET-Center/TransactionDetail.tsx

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function TransactionDetail() {
    const navigation = useNavigation();
    const route = useRoute<any>();
    const { transaction } = route.params;

    // Simulate calculations
    const commissionRaw = parseInt(transaction.commission.replace(/,/g, ''));
    const gst = commissionRaw * 0.18; // 18% GST
    const netPayable = commissionRaw + gst;

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={24} color="#1c005e" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Transaction Details</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                
                {/* Status Banner */}
                <View style={[
                    styles.statusBanner, 
                    { backgroundColor: transaction.status === 'Paid' ? '#D1FAE5' : '#FEF3C7' }
                ]}>
                    <Icon 
                        name={transaction.status === 'Paid' ? "check-decagram" : "clock-alert"} 
                        size={28} 
                        color={transaction.status === 'Paid' ? '#065F46' : '#92400E'} 
                    />
                    <Text style={[
                        styles.statusBannerText,
                        { color: transaction.status === 'Paid' ? '#065F46' : '#92400E'}
                    ]}>
                        Payment {transaction.status}
                    </Text>
                </View>

                {/* Main Receipt Card */}
                <View style={styles.receiptCard}>
                    <Text style={styles.receiptTitle}>Payment Breakdown</Text>
                    
                    <View style={styles.row}>
                        <Text style={styles.label}>Centre Commission</Text>
                        <Text style={styles.value}>₹ {commissionRaw.toLocaleString()}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>GST (18%)</Text>
                        <Text style={styles.value}>₹ {gst.toLocaleString()}</Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.row}>
                        <Text style={styles.totalLabel}>Net Payable</Text>
                        <Text style={styles.totalValue}>₹ {netPayable.toLocaleString()}</Text>
                    </View>
                </View>

                {/* Information Section */}
                <View style={styles.infoSection}>
                    <Text style={styles.sectionHeader}>Placement Details</Text>
                    
                    <View style={styles.infoRow}>
                        <Icon name="account" size={20} color="#666" style={styles.icon} />
                        <View>
                            <Text style={styles.infoLabel}>Candidate</Text>
                            <Text style={styles.infoValue}>{transaction.candidate}</Text>
                        </View>
                    </View>
                    
                    <View style={styles.infoRow}>
                        <Icon name="domain" size={20} color="#666" style={styles.icon} />
                        <View>
                            <Text style={styles.infoLabel}>Company</Text>
                            <Text style={styles.infoValue}>{transaction.company}</Text>
                        </View>
                    </View>

                    <View style={styles.infoRow}>
                        <Icon name="briefcase-outline" size={20} color="#666" style={styles.icon} />
                        <View>
                            <Text style={styles.infoLabel}>Role & Offer</Text>
                            <Text style={styles.infoValue}>{transaction.job} (₹{transaction.offerPrice})</Text>
                        </View>
                    </View>
                </View>

            </ScrollView>

            {/* Bottom Action */}
            <View style={styles.footer}>
                {transaction.status === 'Pending' ? (
                    <TouchableOpacity style={styles.payBtn}>
                        <Text style={styles.btnText}>Mark as Paid</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={styles.invoiceBtn}>
                        <Icon name="file-document-outline" size={20} color="#1c005e" style={{marginRight: 8}} />
                        <Text style={styles.invoiceText}>Download Invoice</Text>
                    </TouchableOpacity>
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 20 },
    headerTitle: { fontSize: 18, fontWeight: "bold", color: "#1c005e" },
    scrollContent: { paddingHorizontal: 20 },

    // Status Banner
    statusBanner: {
        flexDirection: "row", alignItems: "center", justifyContent: "center",
        paddingVertical: 16, borderRadius: 12, marginBottom: 20,
    },
    statusBannerText: { fontSize: 18, fontWeight: "bold", marginLeft: 10 },

    // Receipt Card
    receiptCard: {
        backgroundColor: "#fff", padding: 20, borderRadius: 16,
        borderWidth: 1, borderColor: "#E0E0E0", marginBottom: 25,
        elevation: 1,
    },
    receiptTitle: { fontSize: 16, fontWeight: "700", color: "#333", marginBottom: 15 },
    row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
    label: { color: "#666", fontSize: 14 },
    value: { color: "#333", fontSize: 14, fontWeight: "600" },
    divider: { height: 1, backgroundColor: "#E0E0E0", marginVertical: 10, borderStyle: 'dashed', borderWidth: 1, borderColor: '#ccc', borderRadius: 1 },
    totalLabel: { fontSize: 16, fontWeight: "bold", color: "#1c005e" },
    totalValue: { fontSize: 18, fontWeight: "bold", color: "#1c005e" },

    // Info Section
    infoSection: { marginBottom: 30 },
    sectionHeader: { fontSize: 16, fontWeight: "bold", color: "#333", marginBottom: 15 },
    infoRow: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
    icon: { width: 30 },
    infoLabel: { fontSize: 12, color: "#888" },
    infoValue: { fontSize: 15, color: "#333", fontWeight: "500" },

    // Footer
    footer: { padding: 20, borderTopWidth: 1, borderColor: "#F0F0F0", backgroundColor: "#fff" },
    payBtn: { backgroundColor: "#1c005e", paddingVertical: 15, borderRadius: 12, alignItems: "center" },
    btnText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
    invoiceBtn: { 
        flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
        paddingVertical: 15, borderRadius: 12, borderWidth: 1, borderColor: "#1c005e" 
    },
    invoiceText: { color: "#1c005e", fontSize: 16, fontWeight: "bold" },
});