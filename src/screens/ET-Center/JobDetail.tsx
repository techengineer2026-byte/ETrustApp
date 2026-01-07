// src/screens/ET-Center/JobDetail.tsx

// src/screens/ET-Center/JobDetail.tsx

import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

export default function JobDetail() {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <ScrollView contentContainerStyle={styles.container}>

                {/* Header Info */}
                <View style={styles.headerSection}>
                    <Text style={styles.role}>Sales Executive</Text>
                    <Text style={styles.company}>XYZ Retail • Delhi</Text>
                    <View style={styles.tagRow}>
                        <View style={styles.tag}><Text style={styles.tagText}>Full Time</Text></View>
                        <View style={styles.tag}><Text style={styles.tagText}>On-Site</Text></View>
                    </View>
                </View>

                <View style={styles.divider} />

                {/* Financials / Offer (Commission Logic) */}
                <View style={styles.offerCard}>
                    <View style={styles.offerRow}>
                        <Icon name="cash-multiple" size={20} color="#1c005e" />
                        <Text style={styles.offerLabel}>Candidate Salary:</Text>
                        <Text style={styles.offerValue}>₹20k - ₹25k / mo</Text>
                    </View>
                    <View style={[styles.offerRow, { marginTop: 8 }]}>
                        <Icon name="hand-coin" size={20} color="#10B981" />
                        <Text style={styles.offerLabel}>Centre Commission:</Text>
                        <Text style={[styles.offerValue, { color: "#10B981" }]}>₹5,000 / hire</Text>
                    </View>
                </View>

                {/* Job Description */}
                <Text style={styles.sectionTitle}>Job Description</Text>
                <Text style={styles.descText}>
                    • Responsible for field sales and lead generation.{"\n"}
                    • Visiting clients in the Delhi NCR region.{"\n"}
                    • Maintaining daily sales reports.
                </Text>

                <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Requirements</Text>
                <Text style={styles.descText}>
                    • 1-2 years experience in Sales.{"\n"}
                    • Must have a bike and valid license.
                </Text>

            </ScrollView>

            {/* Bottom Action */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.applyBtn} onPress={() => console.log("Nav to Apply Candidate")}>
                    <Text style={styles.applyText}>Apply Candidate</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20 },
    headerSection: { marginBottom: 15 },
    role: { fontSize: 24, fontWeight: "bold", color: "#1c005e" },
    company: { fontSize: 16, color: "#666", marginTop: 4 },
    tagRow: { flexDirection: "row", marginTop: 12 },
    tag: { backgroundColor: "#F3E5F5", paddingHorizontal: 12, paddingVertical: 4, borderRadius: 8, marginRight: 8 },
    tagText: { color: "#1c005e", fontSize: 12, fontWeight: "600" },
    divider: { height: 1, backgroundColor: "#eee", marginVertical: 15 },

    // Financial Card
    offerCard: { backgroundColor: "#F9FAFB", padding: 15, borderRadius: 12, marginBottom: 20, borderWidth: 1, borderColor: "#E5E7EB" },
    offerRow: { flexDirection: "row", alignItems: "center" },
    offerLabel: { marginLeft: 10, fontSize: 14, color: "#555", flex: 1 },
    offerValue: { fontSize: 16, fontWeight: "bold", color: "#333" },

    sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#333", marginBottom: 8 },
    descText: { fontSize: 15, color: "#555", lineHeight: 24 },

    footer: { padding: 20, borderTopWidth: 1, borderColor: "#eee" },
    applyBtn: { backgroundColor: "#1c005e", paddingVertical: 16, borderRadius: 12, alignItems: "center" },
    applyText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});