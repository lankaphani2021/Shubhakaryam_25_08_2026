import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  orderBy,
  limit,
  getCountFromServer,
} from "firebase/firestore";
import { db, isFirebaseEnabled } from "../firebase";

// Fallback data for Mock Mode
const MOCK_SERVICES = [
  { slug: "satyanarayana-vratam", name: "Satyanarayana Vratam", deity: "Lord Vishnu", category: "Traditional", price: 3500, duration_minutes: 150, image_url: "/images/satyanarayana.jpg", active: 1 },
  { slug: "griha-pravesham", name: "Griha Pravesham", deity: "Lord Ganesha", category: "Housewarming", price: 5500, duration_minutes: 180, image_url: "/images/griha-pravesham.jpg", active: 1 },
  { slug: "namakaranam", name: "Namakaranam", deity: "Lord Ganesha", category: "Samskara", price: 2500, duration_minutes: 90, image_url: "/images/namakaranam.jpg", active: 1 },
  { slug: "ganapathi-homam", name: "Ganapathi Homam", deity: "Lord Ganesha", category: "Homam", price: 4500, duration_minutes: 120, image_url: "/images/ganapathi-homam.jpg", active: 1 },
  { slug: "vivaham", name: "Vivaham", deity: "Lord Vishnu", category: "Wedding", price: 25000, duration_minutes: 300, image_url: "/images/wedding.jpg", active: 1 }
];

const MOCK_PRIESTS = [
  { slug: "acharya-devanand-mishra", name: "Acharya Devanand Mishra", tradition: "Vedic", languages: "Hindi, English", city: "Hyderabad", experience_years: 25, rating: 4.9, active: 1 },
  { slug: "pdt-vamshi-krishna", name: "Pdt. Vamshi Krishna", tradition: "Smarta", languages: "Telugu, Hindi", city: "Hyderabad", experience_years: 15, rating: 4.8, active: 1 }
];

const appDatabase = {
  query: async (tableName, params = {}) => {
    if (!isFirebaseEnabled) {
      console.log(`[Mock Mode] Querying ${tableName}`);
      let data = tableName === "services" ? [...MOCK_SERVICES] : (tableName === "priests" ? [...MOCK_PRIESTS] : []);
      if (params.limit) data = data.slice(0, parseInt(params.limit));
      return data;
    }

    const colRef = collection(db, tableName);
    let q = colRef;
    const constraints = [];
    if (params.active === "eq.1") constraints.push(where("active", "==", 1));
    if (params.order) {
      const [field, direction] = params.order.split('.');
      constraints.push(orderBy(field, direction === 'desc' ? 'desc' : 'asc'));
    }
    if (params.limit) constraints.push(limit(parseInt(params.limit)));
    if (constraints.length > 0) q = query(colRef, ...constraints);

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  get: async (tableName, id) => {
    if (!isFirebaseEnabled) {
      const data = tableName === "services" ? MOCK_SERVICES : MOCK_PRIESTS;
      return data.find(i => i.slug === id) || null;
    }
    const docRef = doc(db, tableName, id.toString());
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) return { id: docSnap.id, ...docSnap.data() };
    const q = query(collection(db, tableName), where("slug", "==", id), limit(1));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty ? { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() } : null;
  },

  insert: async (tableName, data) => {
    if (!isFirebaseEnabled) return { id: "mock-id", ...data };
    const docRef = await addDoc(collection(db, tableName), { ...data, created_at: new Date().toISOString() });
    return { id: docRef.id, ...data };
  },

  update: async (tableName, filter, data) => {
    if (!isFirebaseEnabled) return true;
    let id = filter.id || (await appDatabase.get(tableName, filter.slug))?.id;
    if (!id) return false;
    await updateDoc(doc(db, tableName, id), { ...data, updated_at: new Date().toISOString() });
    return true;
  },

  delete: async (tableName, filter) => {
    if (!isFirebaseEnabled) return true;
    let id = filter.id || (await appDatabase.get(tableName, filter.slug))?.id;
    if (!id) return false;
    await deleteDoc(doc(db, tableName, id));
    return true;
  },

  count: async (tableName, params = {}) => {
    if (!isFirebaseEnabled) return tableName === "services" ? MOCK_SERVICES.length : MOCK_PRIESTS.length;
    let q = query(collection(db, tableName));
    if (params.active === "eq.1") q = query(q, where("active", "==", 1));
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
  }
};

export default appDatabase;
