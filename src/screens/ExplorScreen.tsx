import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground,
  Alert,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

// --- 1. MOCK DATA ---

const QUICK_FILTERS = ["All", "Remote", "Full-Time", "$100k+", "Internship", "Startup"];

const TRENDING_COMPANIES = [
  { id: 1, name: 'Google', logo: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png', jobs: '12 Openings' },
  { id: 2, name: 'Spotify', logo: 'https://cdn-icons-png.flaticon.com/512/174/174872.png', jobs: '5 Openings' },
  { id: 3, name: 'Airbnb', logo: 'https://cdn-icons-png.flaticon.com/512/2111/2111320.png', jobs: '8 Openings' },
  { id: 4, name: 'Tesla', logo: 'https://cdn-icons-png.flaticon.com/512/5968/5968850.png', jobs: '20 Openings' },
  { id: 5, name: 'Netflix', logo: 'https://cdn-icons-png.flaticon.com/512/732/732228.png', jobs: '3 Openings' },
];

// Note: I added tags to categories to make search logic work better
const CATEGORIES = [
  { 
    id: 1, 
    title: 'Work From Home', 
    subtitle: 'Remote friendly jobs',
    tags: ['remote', 'wfh', 'home'],
    image: 'https://images.unsplash.com/photo-1593642632823-8f78536788c6?auto=format&fit=crop&w=800&q=80'
  },
  { 
    id: 2, 
    title: 'High Salary', 
    subtitle: '$150k+ / Year',
    tags: ['$100k+', 'money', 'salary'],
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560eb3e?auto=format&fit=crop&w=800&q=80'
  },
  { 
    id: 3, 
    title: 'Cool Startups', 
    subtitle: 'Join the next unicorn',
    tags: ['startup', 'internship', 'equity'],
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80'
  },
  { 
    id: 4, 
    title: 'Tech Giants', 
    subtitle: 'MNCs & Fortune 500',
    tags: ['full-time', 'google', 'microsoft', 'big'],
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'
  },
  { 
    id: 5, 
    title: 'Design & Creative', 
    subtitle: 'UI/UX, Art, Motion',
    tags: ['design', 'art', 'creative'],
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=800&q=80'
  },
  { 
    id: 6, 
    title: 'Urgent Hiring', 
    subtitle: 'Start within 7 days',
    tags: ['urgent', 'contract', 'part-time'],
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80'
  },
];

const ExploreScreen = () => {
  // --- STATE ---
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  // --- LOGIC ---

  // 1. Handle Filter Pill Click
  const handleFilterPress = (filter: string) => {
    setActiveFilter(filter);
    // If user clicks a filter pill, we can auto-fill search or just highlight it
    // For this demo, let's reset search if they click "All"
    if (filter === 'All') setSearch('');
    else setSearch(filter === '$100k+' ? '100k' : filter);
  };

  // 2. Filter Logic (Filters the Grid based on Search Text)
  const filteredCategories = CATEGORIES.filter((cat) => {
    const query = search.toLowerCase();
    
    // Check Title
    const titleMatch = cat.title.toLowerCase().includes(query);
    // Check Subtitle
    const subMatch = cat.subtitle.toLowerCase().includes(query);
    // Check Tags (for smarter search)
    const tagMatch = cat.tags.some(tag => tag.includes(query));

    return titleMatch || subMatch || tagMatch;
  });

  // 3. Interactions
  const onCategoryPress = (title: string) => {
    Alert.alert("Opening Category", `Showing jobs for: ${title}`);
    // navigation.navigate('JobList', { category: title });
  };

  const onCompanyPress = (company: string) => {
    Alert.alert("Company Profile", `Viewing details for ${company}`);
    // navigation.navigate('CompanyProfile', { name: company });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* --- HEADER --- */}
        <View style={styles.header}>
            <View>
                <Text style={styles.headerTitle}>Discover</Text>
                <Text style={styles.headerSubtitle}>Find your dream role today</Text>
            </View>
            <TouchableOpacity style={styles.locationBtn} onPress={() => Alert.alert("Change Location")}>
                <Icon name="map-marker-outline" size={16} color="#333" />
                <Text style={styles.locationText}> New York, USA</Text>
            </TouchableOpacity>
        </View>

        {/* --- SEARCH BAR --- */}
        <View style={styles.searchContainer}>
            <Icon name="magnify" size={24} color="#888" style={{marginRight: 10}} />
            <TextInput 
                placeholder="Search 'Remote', 'Design', 'Google'..."
                placeholderTextColor="#999"
                style={styles.searchInput}
                value={search}
                onChangeText={setSearch}
                returnKeyType="search"
            />
            {search.length > 0 && (
                <TouchableOpacity onPress={() => setSearch('')}>
                     <Icon name="close-circle" size={20} color="#ccc" style={{marginRight:10}} />
                </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.filterBtn} onPress={() => Alert.alert("Filters", "Open advanced filters modal")}>
                <Icon name="tune-vertical-variant" size={20} color="#fff" />
            </TouchableOpacity>
        </View>

        {/* --- QUICK FILTERS (PILLS) --- */}
        <View style={{height: 50}}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pillsScroll}>
                {QUICK_FILTERS.map((filter, index) => {
                    const isActive = activeFilter === filter;
                    return (
                        <TouchableOpacity 
                            key={index} 
                            style={[styles.pill, isActive && styles.pillActive]}
                            onPress={() => handleFilterPress(filter)}
                        >
                            <Text style={[styles.pillText, isActive && styles.pillTextActive]}>
                                {filter}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>

        {/* --- TRENDING COMPANIES (Only show if not searching deeply) --- */}
        {search.length === 0 && (
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Trending Companies 🔥</Text>
                    <TouchableOpacity>
                        <Text style={styles.seeAllText}>See all</Text>
                    </TouchableOpacity>
                </View>
                
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingLeft: 20, paddingRight: 10}}>
                    {TRENDING_COMPANIES.map((item) => (
                        <TouchableOpacity 
                            key={item.id} 
                            style={styles.trendingCard}
                            onPress={() => onCompanyPress(item.name)}
                        >
                            <View style={styles.logoContainer}>
                                <Image source={{ uri: item.logo }} style={styles.logo} resizeMode="contain" />
                            </View>
                            <Text style={styles.trendingName} numberOfLines={1}>{item.name}</Text>
                            <Text style={styles.trendingJobs}>{item.jobs}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        )}

        {/* --- MAIN GRID (CATEGORIES) --- */}
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>
                {search.length > 0 ? `Results for "${search}"` : "Browse by Category"}
            </Text>
            
            {filteredCategories.length === 0 ? (
                <View style={styles.emptyState}>
                    <Icon name="file-search-outline" size={50} color="#ccc" />
                    <Text style={styles.emptyText}>No categories found.</Text>
                </View>
            ) : (
                <View style={styles.gridContainer}>
                    {filteredCategories.map((cat) => (
                        <TouchableOpacity 
                            key={cat.id} 
                            style={styles.categoryCard} 
                            activeOpacity={0.9}
                            onPress={() => onCategoryPress(cat.title)}
                        >
                            <ImageBackground 
                                source={{ uri: cat.image }} 
                                style={styles.cardImage}
                                imageStyle={{ borderRadius: 16 }}
                            >
                                <LinearGradient 
                                    colors={['transparent', 'rgba(0,0,0,0.85)']} 
                                    style={styles.cardOverlay}
                                    start={{x: 0, y: 0.4}} end={{x: 0, y: 1}}
                                >
                                    <Text style={styles.cardTitle}>{cat.title}</Text>
                                    <Text style={styles.cardSubtitle}>{cat.subtitle}</Text>
                                </LinearGradient>
                            </ImageBackground>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 15,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#000',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  locationBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#eee',
  },
  locationText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },

  // Search
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 16,
    paddingHorizontal: 15,
    height: 55,
    marginBottom: 20,
    // Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    height: '100%',
  },
  filterBtn: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 12,
  },

  // Pills
  pillsScroll: {
    paddingLeft: 20,
    paddingRight: 10,
    alignItems: 'center',
  },
  pill: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 25,
    marginRight: 10,
    justifyContent: 'center',
  },
  pillActive: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  pillText: {
    fontWeight: '600',
    color: '#555',
    fontSize: 13,
  },
  pillTextActive: {
    color: '#fff',
  },

  // Sections
  section: {
    marginTop: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#222',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  seeAllText: {
    color: '#007AFF',
    fontWeight: '600',
    fontSize: 13,
  },

  // Trending
  trendingCard: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#f0f0f0',
    width: 130,
    height: 140,
    borderRadius: 20,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    // Soft shadow
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 5,
    shadowOffset: { width:0, height: 4},
    elevation: 2,
  },
  logoContainer: {
    width: 55,
    height: 55,
    backgroundColor: '#F9F9F9',
    borderRadius: 27.5,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 35,
    height: 35,
  },
  trendingName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 2,
  },
  trendingJobs: {
    fontSize: 11,
    color: '#888',
    fontWeight: '500',
  },

  // Grid Categories
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: (width - 50) / 2, // 2 Columns with gap
    height: 220, // Tall "Story" style
    marginBottom: 15,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width:0, height: 2},
  },
  cardImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  cardOverlay: {
    padding: 15,
    paddingTop: 60,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 3,
  },
  cardSubtitle: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },

  // Empty State
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  emptyText: {
    color: '#999',
    fontSize: 16,
    marginTop: 10,
  },

});