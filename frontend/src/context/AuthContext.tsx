import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole, FarmerProfile } from '../types';
import { DEMO_FARMER } from '../data/demoData';

export interface AuthContextType {
  user: User | null;
  farmerProfile: FarmerProfile;
  updateFarmerProfile: (profile: Partial<FarmerProfile>) => void;
  login: (role: UserRole) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  isAuthenticated: boolean;
}

export const DEMO_USERS: Record<UserRole, User> = {
  farmer: {
    id: DEMO_FARMER.id,
    name: DEMO_FARMER.name,
    role: 'farmer',
    phone: DEMO_FARMER.phone,
    district: DEMO_FARMER.district,
    taluka: DEMO_FARMER.taluka,
    village: DEMO_FARMER.village
  },
  officer: {
    id: 'officer_akl_01',
    name: 'Dr. Sunita Deshmukh',
    role: 'officer',
    phone: '+91 94221 55667',
    district: 'Akola',
    designation: 'District Agricultural Officer (DAO)'
  },
  expert: {
    id: 'expert_kvk_09',
    name: 'Dr. Vinayak Shinde',
    role: 'expert',
    phone: '+91 98900 12345',
    district: 'Akola',
    designation: 'Senior Plant Pathologist, KVK Akola'
  },
  admin: {
    id: 'admin_maha_01',
    name: 'State Admin Officer',
    role: 'admin',
    district: 'Mumbai HQ',
    designation: 'Department of Agriculture, Govt. of Maharashtra'
  }
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('krushigan_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEMO_USERS.farmer;
      }
    }
    // Default to farmer for easy testing
    return DEMO_USERS.farmer;
  });

  const [farmerProfile, setFarmerProfile] = useState<FarmerProfile>(() => {
    const saved = localStorage.getItem('krushigan_farmer_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEMO_FARMER;
      }
    }
    return DEMO_FARMER;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('krushigan_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('krushigan_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('krushigan_farmer_profile', JSON.stringify(farmerProfile));
  }, [farmerProfile]);

  const login = (role: UserRole) => {
    setUser(DEMO_USERS[role] || DEMO_USERS.farmer);
  };

  const logout = () => {
    setUser(null);
  };

  const switchRole = (role: UserRole) => {
    login(role);
  };

  const updateFarmerProfile = (updated: Partial<FarmerProfile>) => {
    setFarmerProfile(prev => ({ ...prev, ...updated }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        farmerProfile,
        updateFarmerProfile,
        login,
        logout,
        switchRole,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
