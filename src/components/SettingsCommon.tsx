// src/components/SettingsCommon.tsx

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

/* ---------------- TYPES ---------------- */

// Base props shared by all types of settings items
interface BaseSettingsItemProps {
    label: string;
    leftIcon?: string; // Name of MaterialCommunityIcon
    iconColor?: string;
    isDestructive?: boolean;
}

// Union type for all possible settings item configurations
export type SettingsItemProps =
    | (BaseSettingsItemProps & {
        type?: 'link'; // Default type, shows a chevron and expects an onPress handler
        onPress: () => void;
    })
    | (BaseSettingsItemProps & {
        type: 'toggle'; // Shows a switch and expects a boolean value and change handler
        toggleValue: boolean; // The current value of the switch
        onToggleChange: (newValue: boolean) => void; // Callback for when the switch changes
    })
    | (BaseSettingsItemProps & {
        type: 'value'; // Shows a text value and a chevron, expects an onPress handler
        value: string; // The value to display on the right side
        onPress: () => void;
    });

// Props for the section header component
export type SectionHeaderProps = {
    title: string;
    icon: string; // An emoji or a vector icon name if you choose to swap it
};

/* -------- Settings Item Component -------- */

/**
 * Reusable component for displaying a single setting item.
 * Can be a link (with chevron), a toggle switch, or a display value.
 */
export const SettingsItem: React.FC<SettingsItemProps> = (props) => {
    // Determine icon color: destructive (red), custom, or default gray
    const iconColor = props.isDestructive 
        ? '#ff3b30' 
        : props.iconColor || '#555';

    // Determines if a chevron should be shown (for links and value displays)
    const showChevron = props.type === undefined || props.type === 'link' || props.type === 'value';

    return (
        <TouchableOpacity
            style={settingsStyles.row}
            // Toggles should not have activeOpacity feedback like buttons
            activeOpacity={props.type === 'toggle' ? 1 : 0.7}
            onPress={
                // Only fire onPress for link/value types, not for toggles
                props.type === 'link' || props.type === 'value'
                    ? props.onPress
                    : undefined
            }
        >
            {/* Left Icon (if provided) */}
            {props.leftIcon && (
                <View style={settingsStyles.iconContainer}>
                    <MaterialCommunityIcons 
                        name={props.leftIcon} 
                        size={20} 
                        color={iconColor} 
                    />
                </View>
            )}

            {/* Main Label */}
            <Text
                style={[
                    settingsStyles.rowLabel,
                    props.isDestructive && settingsStyles.destructiveLabel,
                ]}
            >
                {props.label}
            </Text>

            {/* Spacer to push right-aligned content to the end */}
            <View style={settingsStyles.rowSpacer} />

            {/* Conditional Rendering for Toggle Switch */}
            {props.type === 'toggle' && (
                <Switch
                    value={props.toggleValue}
                    onValueChange={props.onToggleChange}
                />
            )}

            {/* Conditional Rendering for Display Value */}
            {props.type === 'value' && (
                <Text style={settingsStyles.rowValue}>{props.value}</Text>
            )}

            {/* Conditional Rendering for Chevron Icon */}
            {showChevron && (
                <MaterialCommunityIcons name="chevron-right" size={20} color="#c4c4c4" />
            )}
        </TouchableOpacity>
    );
};

/* -------- Section Header Component -------- */

/**
 * Reusable component for displaying a section header.
 */
export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, icon }) => (
    <View style={settingsStyles.sectionHeader}>
        <Text style={settingsStyles.sectionHeaderText}>
            {icon} {title}
        </Text>
    </View>
);

/* ---------------- STYLES ---------------- */

// These styles are specific to the SettingsItem and SectionHeader components
const settingsStyles = StyleSheet.create({
    sectionHeader: {
        paddingHorizontal: 24,
        marginBottom: 8,
    },
    sectionHeaderText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#a7a7a7',
        textTransform: 'uppercase',
        letterSpacing: 1.2,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: 50,
        paddingHorizontal: 24,
        borderBottomWidth: 1,
        borderColor: '#e3e3e3',
    },
    iconContainer: {
        width: 30, // Fixed width helps align labels if icons have different widths
        marginRight: 10,
        alignItems: 'center', // Center icon within its width
    },
    rowLabel: {
        fontSize: 16,
        color: '#000',
    },
    destructiveLabel: {
        color: '#ff3b30',
    },
    rowSpacer: {
        flex: 1, // Takes up remaining space
    },
    rowValue: {
        fontSize: 16,
        color: '#8a8a8a',
        marginRight: 4, // Space before chevron
    },
});