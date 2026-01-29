// src/components/SettingsCommon.tsx

import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Switch,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export interface SettingsItemProps {
    label: string;
    leftIcon?: string;
    iconColor?: string;
    isDestructive?: boolean;
    isLast?: boolean;
    type?: 'link' | 'toggle' | 'value';
    // value can be string (for text) or boolean (for switch)
    value?: string | boolean; 
    onPress?: () => void;
    onToggle?: (val: boolean) => void;
}

export const SettingsItem: React.FC<SettingsItemProps> = ({
    label,
    leftIcon,
    iconColor = '#555',
    isDestructive,
    type,
    value,
    onPress,
    onToggle,
    isLast
}) => {
    const finalIconColor = isDestructive ? '#ff3b30' : iconColor;

    return (
        <TouchableOpacity
            style={[styles.row, isLast && styles.lastRow]}
            activeOpacity={type === 'toggle' ? 1 : 0.7}
            onPress={(type === 'link' || type === 'value') ? onPress : undefined}
        >
            {leftIcon && (
                <View style={styles.iconContainer}>
                    <MaterialCommunityIcons
                        name={leftIcon}
                        size={20}
                        color={finalIconColor}
                    />
                </View>
            )}
            <Text style={[styles.rowLabel, isDestructive && styles.destructiveLabel]}>
                {label}
            </Text>
            
            <View style={styles.rowSpacer} />

            {type === 'toggle' && (
                <Switch
                    // Ensure value is boolean, default to false if undefined
                    value={typeof value === 'boolean' ? value : false} 
                    onValueChange={onToggle}
                />
            )}

            {type === 'value' && (
                <Text style={styles.rowValue}>{String(value)}</Text>
            )}

            {(type === undefined || type === 'link' || (type === 'value' && onPress)) && (
                <MaterialCommunityIcons name="chevron-right" size={20} color="#c4c4c4" />
            )}
        </TouchableOpacity>
    );
};

interface SectionHeaderProps {
    title: string;
    iconName?: string; // Changed from 'icon' to 'iconName' to match MaterialIcons usage generally
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, iconName }) => (
    <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>
            {iconName && <Text>{iconName} </Text>} 
            {/* Note: If passing emoji directly, just use {iconName}. 
                If passing icon name, render MaterialIcon here if preferred. 
                For your current code, you passed emojis or names. 
                Let's assume you might pass an emoji string or just title. */}
            {title}
        </Text>
    </View>
);

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: 50,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderColor: '#e3e3e3',
    },
    lastRow: {
        borderBottomWidth: 0,
    },
    iconContainer: {
        width: 30,
        marginRight: 10,
        alignItems: 'center',
    },
    rowLabel: {
        fontSize: 16,
        color: '#000',
    },
    destructiveLabel: {
        color: '#ff3b30',
    },
    rowSpacer: {
        flex: 1,
    },
    rowValue: {
        fontSize: 16,
        color: '#8a8a8a',
        marginRight: 4,
    },
    sectionHeader: {
        paddingHorizontal: 20,
        marginBottom: 8,
        marginTop: 20,
    },
    sectionHeaderText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#a7a7a7',
        textTransform: 'uppercase',
        letterSpacing: 1.2,
    },
});