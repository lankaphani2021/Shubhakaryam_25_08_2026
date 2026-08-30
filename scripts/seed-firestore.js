/**
 * Firestore Seeding Script
 *
 * Usage:
 * 1. Download your Firebase service account key JSON file.
 * 2. Save it as 'service-account.json' in this directory.
 * 3. Run: npm install firebase-admin
 * 4. Run: node scripts/seed-firestore.js
 */

const admin = require('firebase-admin');
const serviceAccount = require('./service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const SERVICES = [
  {
    slug: "satyanarayana-vratam",
    name: "Satyanarayana Vratam",
    deity: "Lord Satyanarayana (Vishnu)",
    category: "Home Pooja",
    description: "A highly auspicious ritual performed to seek blessings for prosperity, health, and happiness. Ideal for housewarming, weddings, or any special occasion.",
    duration_minutes: 150,
    price: 3500,
    image_url: "/images/satyanarayana.jpg",
    samagri: "Flowers, Fruits, Panchamrutam, Turmeric, Kumkum, Betel leaves, Kalasham, Satyanarayana Photo/Idol",
    active: 1
  },
  {
    slug: "griha-pravesham",
    name: "Griha Pravesham",
    deity: "Lord Ganesha & Lakshmi",
    category: "Home Pooja",
    description: "Housewarming ceremony performed before moving into a new house to purify the environment and invite positive energy.",
    duration_minutes: 180,
    price: 5500,
    image_url: "/images/griha-pravesham.jpg",
    samagri: "Milk, Rice, Pumpkin, New clothes for Kalasham, Traditional items for Vastu Pooja",
    active: 1
  },
  {
    slug: "namakaranam",
    name: "Namakaranam (Naming Ceremony)",
    deity: "Lord Ganesha",
    category: "Samskara",
    description: "Traditional ceremony to name a newborn child, performed on the 11th or 21st day after birth.",
    duration_minutes: 90,
    price: 2500,
    image_url: "/images/namakaranam.jpg",
    samagri: "New clothes for baby, Grains for writing the name, Sweets, Flowers",
    active: 1
  },
  {
    slug: "ganapathi-homam",
    name: "Ganapathi Homam",
    deity: "Lord Ganesha",
    category: "Homam",
    description: "Fire ritual dedicated to Lord Ganesha to remove obstacles and ensure success in all endeavors.",
    duration_minutes: 120,
    price: 4500,
    image_url: "/images/ganapathi-homam.jpg",
    samagri: "Homa kundam, Ghee, Wood, Modak, Coconut, Traditional Homa Dravyam",
    active: 1
  },
  {
    slug: "vivaham",
    name: "Vivaham (Traditional Wedding)",
    deity: "Lord Vishnu & Lakshmi",
    category: "Wedding",
    description: "Sacred wedding ceremony performed according to Vedic traditions with all rituals including Kanyadaanam and Mangalyadharana.",
    duration_minutes: 300,
    price: 25000,
    image_url: "/images/wedding.jpg",
    samagri: "Mangalsutra, Silk clothes, Extensive Pooja materials for wedding rituals",
    active: 1
  }
];

const PRIESTS = [
  {
    slug: "acharya-devanand-mishra",
    name: "Acharya Devanand Mishra",
    tradition: "Vedic (North Indian)",
    languages: "Hindi, Sanskrit, English",
    city: "Hyderabad",
    experience_years: 25,
    rating: 4.9,
    bio: "Expert in Shukla Yajurveda and traditional Vedic rituals with over 25 years of experience in performing complex homams and weddings.",
    photo_url: "/images/priests/devanand.jpg",
    active: 1
  },
  {
    slug: "pdt-vamshi-krishna",
    name: "Pdt. Vamshi Krishna",
    tradition: "Smarta (Telugu)",
    languages: "Telugu, Hindi, Sanskrit",
    city: "Hyderabad",
    experience_years: 15,
    rating: 4.8,
    bio: "Specialist in Telugu traditional ceremonies, Griha Pravesham, and Satyanarayana Vratam. Known for clear explanation of ritual significance.",
    photo_url: "/images/priests/vamshi.jpg",
    active: 1
  },
  {
    slug: "pdt-raghava-charyulu",
    name: "Pdt. Raghava Charyulu",
    tradition: "Vaishnava (Pancharatra)",
    languages: "Telugu, Tamil, Sanskrit",
    city: "Secunderabad",
    experience_years: 20,
    rating: 4.9,
    bio: "Expert in temple rituals and household poojas according to Vaishnava traditions. Dedicated to authentic ritual performance.",
    photo_url: "/images/priests/raghava.jpg",
    active: 1
  }
];

async function seed() {
  console.log('Starting seeding...');

  for (const service of SERVICES) {
    await db.collection('services').doc(service.slug).set(service);
    console.log(`Seeded service: ${service.name}`);
  }

  for (const priest of PRIESTS) {
    await db.collection('priests').doc(priest.slug).set(priest);
    console.log(`Seeded priest: ${priest.name}`);
  }

  console.log('Seeding completed successfully!');
}

seed().catch(console.error);
