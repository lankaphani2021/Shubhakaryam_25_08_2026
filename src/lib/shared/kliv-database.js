// Mock implementation of kliv-database
const db = {
  query: async (table, params = {}) => {
    console.log(`[Mock DB] Querying table: ${table}`, params);
    if (table === "services") {
      return [
        {
          slug: "satyanarayana-vratam",
          name: "Satyanarayana Vratam",
          deity: "Lord Vishnu",
          description: "A traditional thanksgiving ceremony performed for prosperity and wellness. Traditionally performed in Telugu households.",
          category: "Traditional",
          price: 5000,
          duration_minutes: 120,
          image_url: "/images/satyanarayana-vratam.png"
        },
        {
          slug: "astrology-consultation",
          name: "Horoscope Analysis",
          deity: "Navagrahas",
          description: "Detailed analysis of your birth chart and future predictions.",
          category: "Astrology",
          price: 1100,
          duration_minutes: 45,
          image_url: "/images/astrology-hero.jpg"
        },
        {
          slug: "kundali-matching",
          name: "Kundali Matching",
          deity: "Lord Ganesha",
          description: "Comprehensive Guna Milan and compatibility analysis for marriage.",
          category: "Astrology",
          price: 1500,
          duration_minutes: 60,
          image_url: "/images/kundali.png"
        },
        {
          slug: "muhurtham-finding",
          name: "Muhurtham Finding",
          deity: "Navagrahas",
          description: "Finding auspicious timings for weddings, housewarming, and events.",
          category: "Astrology",
          price: 501,
          duration_minutes: 30,
          image_url: "/images/muhurtham.jpg"
        },
        {
          slug: "griha-pravesham",
          name: "Griha Pravesham",
          deity: "Lord Ganesha",
          description: "Housewarming ceremony to bring peace and energy to your new home.",
          category: "Housewarming",
          price: 7500,
          duration_minutes: 180,
          image_url: "/images/wedding-2.jpg"
        },
        {
          slug: "telugu-wedding",
          name: "Traditional Telugu Wedding",
          deity: "Lord Venkateswara",
          description: "Complete Vedic wedding ceremony including Jeelakarra Bellam and Talambralu.",
          category: "Wedding",
          price: 25000,
          duration_minutes: 360,
          image_url: "/images/wedding-3.jpg"
        },
        {
          slug: "half-saree-ceremony",
          name: "Half Saree Ceremony",
          deity: "Goddess Saraswati",
          description: "Traditional half-saree (langa voni) function for girls entering adolescence.",
          category: "Samskara",
          price: 9500,
          duration_minutes: 90,
          image_url: "/images/half-saree.jpg"
        },
        {
          slug: "namakaranam",
          name: "Namakaranam",
          deity: "Lord Ganesha",
          description: "Naming ceremony for the newborn with punyahavachanam, cradle rites and blessings.",
          category: "Samskara",
          price: 5800,
          duration_minutes: 120,
          image_url: "/images/namakaranam.jpg"
        },
        {
          slug: "ayushya-homam",
          name: "Ayushya Homam",
          deity: "Lord Ayur Devata",
          description: "Birthday homam for long life and good health, traditionally performed on the star birthday.",
          category: "Homam",
          price: 6200,
          duration_minutes: 120,
          image_url: "/images/ayushya-homam.jpg"
        },
        {
          slug: "ganapathi-homam",
          name: "Ganapathi Homam",
          deity: "Lord Ganesha",
          description: "Fire ritual to Lord Ganapathi to remove obstacles before any new beginning — traditionally Arranged.",
          category: "Homam",
          price: 6500,
          duration_minutes: 120,
          image_url: "/images/ganapathi-homam.jpg"
        },
        {
          slug: "navagraha-shanti",
          name: "Navagraha Shanti",
          deity: "Nine Planets",
          description: "Planetary peace pooja performed as per your birth chart to soften doshas and bring balance.",
          category: "Homam",
          price: 7800,
          duration_minutes: 180,
          image_url: "/images/navagraha-shanti.jpg"
        }
      ];
    }
    if (table === "priests") {
      return [
        {
          slug: "sharma-ji",
          name: "Vedic Scholar Sharma",
          rating: 4.9,
          tradition: "Rig Veda",
          bio: "Expert in traditional Telugu rituals with 20+ years of experience in Hyderabad and Vijayawada.",
          city: "Hyderabad",
          experience_years: 22,
          languages: "Telugu, Sanskrit, Hindi",
          photo_url: "/images/priest-1.jpg"
        },
        {
          slug: "shastri-garu",
          name: "Suryanarayana Shastri",
          rating: 4.8,
          tradition: "Yajur Veda & Astrology",
          bio: "Specialist in Muhurtham and traditional marriage ceremonies.",
          city: "Gachibowli, Hyd",
          experience_years: 15,
          languages: "Telugu, English",
          photo_url: "/images/priest-2.jpg"
        },
        {
          slug: "vamsi-krishna",
          name: "Pandit Vamsi Krishna",
          rating: 4.9,
          tradition: "Vedic Astrology",
          bio: "Expert in Kundali Matching and Nakshatra calculations.",
          city: "Jubilee Hills, Hyd",
          experience_years: 18,
          languages: "Telugu, Sanskrit",
          photo_url: "/images/priest-1.jpg"
        }
      ];
    }
    if (table === "danalu_services") {
      return [
        {
          slug: "annadanam",
          name: "Annadanam (Food Offering)",
          description: "Feed the needy at local temples or goshalas.",
          category: "Offering",
          price: 2500,
          duration_minutes: 30,
          image_url: "/images/home-hero.jpg",
          items_provided: "Full meal for 20 people"
        },
        {
          slug: "surya-daan",
          name: "Surya Daan",
          description: "Offerings for Lord Surya to improve health and vitality.",
          category: "Navagraha",
          price: 1500,
          duration_minutes: 20,
          image_url: "/images/kundali.png",
          items_provided: "Wheat, Red Cloth, Copper"
        }
      ];
    }
    return [];
  },
  get: async (table, id) => {
    console.log(`[Mock DB] Getting from table: ${table}, id: ${id}`);
    return null;
  },
  insert: async (table, data) => {
    console.log(`[Mock DB] Inserting into table: ${table}`, data);
    return data;
  },
  update: async (table, filter, data) => {
    console.log(`[Mock DB] Updating table: ${table}`, filter, data);
    return data;
  },
  delete: async (table, filter) => {
    console.log(`[Mock DB] Deleting from table: ${table}`, filter);
    return true;
  },
  count: async (table, params = {}) => {
    console.log(`[Mock DB] Counting table: ${table}`, params);
    return 2;
  }
};

export default db;
