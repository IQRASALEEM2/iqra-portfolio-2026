import { useCallback, useEffect, useMemo, useState } from 'react';
import type React from 'react';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc,
  query, 
  onSnapshot,
  getDocs
} from 'firebase/firestore';
import { db } from '../firebase';
import { defaultAgents, defaultBlogs, defaultProjects, defaultReviews } from '../engine/defaultData';

// Firestore collection names
const COLLECTIONS = {
  blogs: 'articles',
  projects: 'projects',
  reviews: 'reviews',
  agents: 'agents',
} as const;

// Helper to convert Firestore doc to our data format
function docToData<T extends { id: number }>(docSnapshot: any): T {
  const data = docSnapshot.data();
  return { ...data, id: data.id || parseInt(docSnapshot.id) || Date.now() } as T;
}

// Initialize collection with defaults if empty (one-time)
async function initializeCollection(collectionName: string, defaults: any[]): Promise<void> {
  try {
    const snapshot = await getDocs(collection(db, collectionName));
    if (snapshot.empty && defaults.length > 0) {
      // Initialize with defaults
      await Promise.all(
        defaults.map(item => addDoc(collection(db, collectionName), { ...item }))
      );
    }
  } catch (error) {
    console.error(`Error initializing ${collectionName}:`, error);
  }
}

// Helper to find Firestore doc by id field
async function findDocById(collectionName: string, itemId: number) {
  try {
    const snapshot = await getDocs(collection(db, collectionName));
    return snapshot.docs.find(d => {
      const data = d.data();
      return data.id === itemId;
    });
  } catch (error) {
    console.error(`Error finding doc in ${collectionName}:`, error);
    return null;
  }
}

// Direct Firestore operations
export async function saveItemToFirestore(collectionName: string, item: any): Promise<void> {
  try {
    const { firestoreId, ...itemData } = item;
    const existingDoc = await findDocById(collectionName, item.id);
    
    if (existingDoc) {
      // Update existing
      await updateDoc(existingDoc.ref, { ...itemData });
    } else {
      // Add new
      await addDoc(collection(db, collectionName), { ...itemData });
    }
  } catch (error) {
    console.error(`Error saving to ${collectionName}:`, error);
    throw error;
  }
}

export async function deleteItemFromFirestore(collectionName: string, itemId: number): Promise<void> {
  try {
    const docToDelete = await findDocById(collectionName, itemId);
    if (docToDelete) {
      await deleteDoc(docToDelete.ref);
    }
  } catch (error) {
    console.error(`Error deleting from ${collectionName}:`, error);
    throw error;
  }
}

export function useDataEngine() {
  const [blogsState, setBlogsState] = useState<any[]>([]);
  const [projectsState, setProjectsState] = useState<any[]>([]);
  const [reviewsState, setReviewsState] = useState<any[]>([]);
  const [agentsState, setAgentsState] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Real-time listeners using onSnapshot
  useEffect(() => {
    let unsubscribeBlogs: (() => void) | null = null;
    let unsubscribeProjects: (() => void) | null = null;
    let unsubscribeReviews: (() => void) | null = null;
    let unsubscribeAgents: (() => void) | null = null;

    // Initialize collections if empty (one-time)
    Promise.all([
      initializeCollection(COLLECTIONS.blogs, defaultBlogs),
      initializeCollection(COLLECTIONS.projects, defaultProjects),
      initializeCollection(COLLECTIONS.reviews, defaultReviews),
      initializeCollection(COLLECTIONS.agents, defaultAgents),
    ]).then(() => {
      // Set up real-time listeners - these update state automatically when Firestore changes
      try {
        const blogsQuery = query(collection(db, COLLECTIONS.blogs));
        unsubscribeBlogs = onSnapshot(
          blogsQuery,
          (snapshot) => {
            const items = snapshot.docs.map(d => docToData<any>(d));
            // Sort by id descending
            items.sort((a, b) => (b.id || 0) - (a.id || 0));
            setBlogsState(items);
            setIsLoading(false);
          },
          (error) => {
            console.error('Error listening to articles:', error);
            setBlogsState(defaultBlogs);
            setIsLoading(false);
          }
        );
      } catch (error) {
        console.error('Error setting up articles listener:', error);
        setBlogsState(defaultBlogs);
        setIsLoading(false);
      }

      try {
        const projectsQuery = query(collection(db, COLLECTIONS.projects));
        unsubscribeProjects = onSnapshot(
          projectsQuery,
          (snapshot) => {
            const items = snapshot.docs.map(d => docToData<any>(d));
            items.sort((a, b) => (b.id || 0) - (a.id || 0));
            setProjectsState(items);
          },
          (error) => {
            console.error('Error listening to projects:', error);
            setProjectsState(defaultProjects);
          }
        );
      } catch (error) {
        console.error('Error setting up projects listener:', error);
        setProjectsState(defaultProjects);
      }

      try {
        const reviewsQuery = query(collection(db, COLLECTIONS.reviews));
        unsubscribeReviews = onSnapshot(
          reviewsQuery,
          (snapshot) => {
            const items = snapshot.docs.map(d => docToData<any>(d));
            items.sort((a, b) => (b.id || 0) - (a.id || 0));
            setReviewsState(items);
          },
          (error) => {
            console.error('Error listening to reviews:', error);
            setReviewsState(defaultReviews);
          }
        );
      } catch (error) {
        console.error('Error setting up reviews listener:', error);
        setReviewsState(defaultReviews);
      }

      try {
        const agentsQuery = query(collection(db, COLLECTIONS.agents));
        unsubscribeAgents = onSnapshot(
          agentsQuery,
          (snapshot) => {
            const items = snapshot.docs.map(d => docToData<any>(d));
            items.sort((a, b) => (b.id || 0) - (a.id || 0));
            setAgentsState(items);
          },
          (error) => {
            console.error('Error listening to agents:', error);
            setAgentsState(defaultAgents);
          }
        );
      } catch (error) {
        console.error('Error setting up agents listener:', error);
        setAgentsState(defaultAgents);
      }
    });

    // Cleanup listeners on unmount
    return () => {
      if (unsubscribeBlogs) unsubscribeBlogs();
      if (unsubscribeProjects) unsubscribeProjects();
      if (unsubscribeReviews) unsubscribeReviews();
      if (unsubscribeAgents) unsubscribeAgents();
    };
  }, []);

  // Setters that sync arrays to Firestore (for backward compatibility with Admin code)
  // Note: onSnapshot listeners will update state automatically when Firestore changes
  const setBlogs = useMemo(
    () => (next: any) => {
      setBlogsState((prev) => {
        const resolved = typeof next === 'function' ? next(prev) : next;
        
        // Sync changes to Firestore asynchronously (don't block UI)
        // onSnapshot will update state when Firestore changes
        const prevIds = new Set(prev.map((p: any) => p.id));
        const newIds = new Set(resolved.map((r: any) => r.id));
        
        // Add/update items that are new or changed
        resolved.forEach(async (item: any) => {
          const prevItem = prev.find((p: any) => p.id === item.id);
          // Only write if new or data changed
          if (!prevItem || JSON.stringify(prevItem) !== JSON.stringify(item)) {
            try {
              await saveItemToFirestore(COLLECTIONS.blogs, item);
            } catch (error) {
              console.error('Error saving blog:', error);
            }
          }
        });
        
        // Delete removed items
        Array.from(prevIds).forEach(async (id: any) => {
          if (!newIds.has(id)) {
            try {
              await deleteItemFromFirestore(COLLECTIONS.blogs, id);
            } catch (error) {
              console.error('Error deleting blog:', error);
            }
          }
        });
        
        // Return resolved for immediate UI update (optimistic)
        // onSnapshot will confirm/update when Firestore syncs
        return resolved;
      });
    },
    []
  );

  const setProjects = useMemo(
    () => (next: any) => {
      setProjectsState((prev) => {
        const resolved = typeof next === 'function' ? next(prev) : next;
        
        const prevIds = new Set(prev.map((p: any) => p.id));
        const newIds = new Set(resolved.map((r: any) => r.id));
        
        resolved.forEach(async (item: any) => {
          const prevItem = prev.find((p: any) => p.id === item.id);
          if (!prevItem || JSON.stringify(prevItem) !== JSON.stringify(item)) {
            try {
              await saveItemToFirestore(COLLECTIONS.projects, item);
            } catch (error) {
              console.error('Error saving project:', error);
            }
          }
        });
        
        Array.from(prevIds).forEach(async (id: any) => {
          if (!newIds.has(id)) {
            try {
              await deleteItemFromFirestore(COLLECTIONS.projects, id);
            } catch (error) {
              console.error('Error deleting project:', error);
            }
          }
        });
        
        return resolved;
      });
    },
    []
  );

  const setReviews = useMemo(
    () => (next: any) => {
      setReviewsState((prev) => {
        const resolved = typeof next === 'function' ? next(prev) : next;
        
        const prevIds = new Set(prev.map((p: any) => p.id));
        const newIds = new Set(resolved.map((r: any) => r.id));
        
        resolved.forEach(async (item: any) => {
          const prevItem = prev.find((p: any) => p.id === item.id);
          if (!prevItem || JSON.stringify(prevItem) !== JSON.stringify(item)) {
            try {
              await saveItemToFirestore(COLLECTIONS.reviews, item);
            } catch (error) {
              console.error('Error saving review:', error);
            }
          }
        });
        
        Array.from(prevIds).forEach(async (id: any) => {
          if (!newIds.has(id)) {
            try {
              await deleteItemFromFirestore(COLLECTIONS.reviews, id);
            } catch (error) {
              console.error('Error deleting review:', error);
            }
          }
        });
        
        return resolved;
      });
    },
    []
  );

  const setAgents = useMemo(
    () => (next: any) => {
      setAgentsState((prev) => {
        const resolved = typeof next === 'function' ? next(prev) : next;
        
        const prevIds = new Set(prev.map((p: any) => p.id));
        const newIds = new Set(resolved.map((r: any) => r.id));
        
        resolved.forEach(async (item: any) => {
          const prevItem = prev.find((p: any) => p.id === item.id);
          if (!prevItem || JSON.stringify(prevItem) !== JSON.stringify(item)) {
            try {
              await saveItemToFirestore(COLLECTIONS.agents, item);
            } catch (error) {
              console.error('Error saving agent:', error);
            }
          }
        });
        
        Array.from(prevIds).forEach(async (id: any) => {
          if (!newIds.has(id)) {
            try {
              await deleteItemFromFirestore(COLLECTIONS.agents, id);
            } catch (error) {
              console.error('Error deleting agent:', error);
            }
          }
        });
        
        return resolved;
      });
    },
    []
  );

  // Optional helper for a one-shot reset back to defaults.
  const resetAllData = useCallback(async () => {
    try {
      const collections = [COLLECTIONS.blogs, COLLECTIONS.projects, COLLECTIONS.reviews, COLLECTIONS.agents];
      const defaults = [defaultBlogs, defaultProjects, defaultReviews, defaultAgents];
      
      for (let i = 0; i < collections.length; i++) {
        const snapshot = await getDocs(collection(db, collections[i]));
        await Promise.all(snapshot.docs.map(d => deleteDoc(d.ref)));
        await Promise.all(defaults[i].map(item => addDoc(collection(db, collections[i]), { ...item })));
      }
    } catch (error) {
      console.error('Error resetting data:', error);
    }
  }, []);

  return {
    blogs: blogsState,
    setBlogs,
    projects: projectsState,
    setProjects,
    reviews: reviewsState,
    setReviews,
    agents: agentsState,
    setAgents,
    resetAllData,
    isLoading,
  };
}
