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
          price: 4500,
          duration_minutes: 150,
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
          slug: "devanand-mishra",
          name: "Acharya Devanand Mishra",
          rating: 4.9,
          tradition: "Varanasi · Hindi, Sanskrit, English",
          bio: "Expert in Kashi Vedic traditions and elaborate homams.",
          city: "Varanasi",
          experience_years: 25,
          languages: "Hindi, Sanskrit, English",
          photo_url: "/images/priest-1.jpg"
        },
        {
          slug: "ramakrishna",
          name: "Pandit V. Ramakrishna",
          rating: 4.8,
          tradition: "Hyderabad · Telugu, Hindi, Sanskrit",
          bio: "Specialist in traditional Telugu rituals and Satyanarayana Vratam.",
          city: "Hyderabad",
          experience_years: 20,
          languages: "Telugu, Hindi, Sanskrit",
          photo_url: "/images/priest-2.jpg"
        },
        {
          slug: "ramesh-sharma",
          name: "Pandit Ramesh Sharma Shastri",
          rating: 4.9,
          tradition: "Hyderabad · Telugu, Hindi, Sanskrit",
          bio: "Expert Vedic scholar specializing in marriage and housewarming rituals.",
          city: "Hyderabad",
          experience_years: 22,
          languages: "Telugu, Hindi, Sanskrit",
          photo_url: "/images/priest-3.jpg"
        },
        {
          slug: "krishna-dikshitar",
          name: "Sri Krishna Dikshitar",
          rating: 4.7,
          tradition: "Madurai · Tamil, Sanskrit",
          bio: "Specializing in South Indian temple traditions and Agamic rituals.",
          city: "Madurai",
          experience_years: 18,
          languages: "Tamil, Sanskrit",
          photo_url: "/images/priest-4.jpg"
        },
        {
          slug: "shivkumar-bhatt",
          name: "Shivkumar Bhatt",
          rating: 4.8,
          tradition: "Bangalore · Telugu, Kannada, English",
          bio: "Vedic priest with expertise in modern city ritual arrangements.",
          city: "Bangalore",
          experience_years: 12,
          languages: "Telugu, Kannada, English",
          photo_url: "/images/priest-5.jpg"
        },
        {
          slug: "surya-narayan",
          name: "Acharya Surya Narayan",
          rating: 4.9,
          tradition: "Delhi · Hindi, English, Sanskrit",
          bio: "Renowned scholar for Navagraha Shanti and planetary peace rituals.",
          city: "Delhi",
          experience_years: 30,
          languages: "Hindi, English, Sanskrit",
          photo_url: "/images/priest-6.jpg"
        },
        {
          slug: "venkatesh-bhattar",
          name: "Sri Venkatesh Bhattar",
          rating: 4.8,
          tradition: "Chennai · Tamil, Telugu, English",
          bio: "Expert in Vaishnava traditions and elaborate Vishnu poojas.",
          city: "Chennai",
          experience_years: 15,
          languages: "Tamil, Telugu, English",
          photo_url: "/images/priest-7.jpg"
        },
        {
          slug: "gopal-purohit",
          name: "Pandit Gopal Purohit",
          rating: 4.7,
          tradition: "Pune · Marathi, Hindi, English",
          bio: "Specialist in Ganesha Chaturthi and Maharashtrian ritual traditions.",
          city: "Pune",
          experience_years: 16,
          languages: "Marathi, Hindi, English",
          photo_url: "/images/priest-1.jpg"
        },
        {
          slug: "meena-devi",
          name: "Meena Devi",
          rating: 4.9,
          tradition: "Chennai · Tamil, Telugu, English",
          bio: "Expert female priest specializing in Varalakshmi Vratam and women-led rituals.",
          city: "Chennai",
          experience_years: 14,
          languages: "Tamil, Telugu, English",
          photo_url: "/images/priest-2.jpg"
        },
        {
          slug: "anantha-sarma",
          name: "Vedamurthy Anantha Sarma",
          rating: 4.8,
          tradition: "Hyderabad · Telugu, Sanskrit, Kannada",
          bio: "Expert in Yajur Veda and complex Shanti Vidhis.",
          city: "Hyderabad",
          experience_years: 28,
          languages: "Telugu, Sanskrit, Kannada",
          photo_url: "/images/priest-3.jpg"
        },
        {
          slug: "raju-kumar",
          name: "Pandit Raju Kumar",
          rating: 4.6,
          tradition: "Hyderabad · Telugu, Hindi, Sanskrit",
          bio: "Dedicated priest for daily poojas and smaller family ceremonies.",
          city: "Hyderabad",
          experience_years: 10,
          languages: "Telugu, Hindi, Sanskrit",
          photo_url: "/images/priest-4.jpg"
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
