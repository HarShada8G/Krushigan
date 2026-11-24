import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole, FarmerProfile } from '../types';
import { DEMO_FARMER } from '../data/demoData';
import { loginApi, registerApi, fetchCurrentUser, demoLoginApi } from '../services/api';

export interface AuthContextType {
  user: User | null;
  token: string | null;
  farmerProfile: FarmerProfile;
  updateFarmerProfile: (profile: Partial<FarmerProfile>) => void;
  login: (role: UserRole) => Promise<{ success: boolean; error?: string }>;
  loginWithCredentials: (username: string, password: string, role?: UserRole) => Promise<{ success: boolean; error?: string }>;
  registerWithCredentials: (data: {
    username: string;
    password: string;
    role?: UserRole;
    phone?: string;
    email?: string;
    district?: string;
    designation?: string;
  }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  switchRole: (role: UserRole) => Promise<{ success: boolean; error?: string }>;
  isAuthenticated: boolean;
  isDemoUser: boolean;
  isLoading: boolean;
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
        return null;
      }
    }
    return null;
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('krushigan_token') || null;
  });

  const [isDemoUser, setIsDemoUser] = useState<boolean>(() => {
    return localStorage.getItem('krushigan_is_demo') === 'true';
  });

  const [isLoading, setIsLoading] = useState<boolean>(() => {
    return !!localStorage.getItem('krushigan_token') && localStorage.getItem('krushigan_is_demo') !== 'true';
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
    if (token) {
      localStorage.setItem('krushigan_token', token);
    } else {
      localStorage.removeItem('krushigan_token');
    }
  }, [token]);

  useEffect(() => {
    localStorage.setItem('krushigan_farmer_profile', JSON.stringify(farmerProfile));
  }, [farmerProfile]);

  // Validate existing JWT token on application startup
  useEffect(() => {
    const verifySession = async () => {
      const storedToken = localStorage.getItem('krushigan_token');

      if (!storedToken) {
        setUser(null);
        setToken(null);
        setIsLoading(false);
        return;
      }

      try {
        const verifiedUser = await fetchCurrentUser();
        if (verifiedUser && verifiedUser.username) {
          const authedUser: User = {
            id: verifiedUser.username,
            name: verifiedUser.username,
            role: verifiedUser.role as UserRole,
            phone: verifiedUser.phone,
            email: verifiedUser.email,
            district: verifiedUser.district,
            designation: verifiedUser.designation
          };
          setUser(authedUser);
          localStorage.setItem('krushigan_user', JSON.stringify(authedUser));
        } else {
          // Token expired or invalid on the backend
          logout();
        }
      } catch (err) {
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    verifySession();
  }, []);

  const login = async (role: UserRole): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      const res = await demoLoginApi(role);
      const authedUser: User = {
        id: res.user.username,
        name: res.user.username,
        role: (res.user.role as UserRole) || role,
        phone: res.user.phone,
        email: res.user.email,
        district: res.user.district,
        designation: res.user.designation
      };
      setUser(authedUser);
      setToken(res.access_token);
      setIsDemoUser(true);
      localStorage.setItem('krushigan_user', JSON.stringify(authedUser));
      localStorage.setItem('krushigan_token', res.access_token);
      localStorage.setItem('krushigan_is_demo', 'true');

      if (authedUser.role === 'farmer') {
        setFarmerProfile(prev => ({
          ...prev,
          name: authedUser.name,
          phone: authedUser.phone || prev.phone,
          district: authedUser.district || prev.district
        }));
      }

      setIsLoading(false);
      return { success: true };
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, error: err.message || 'Demo login failed' };
    }
  };

  const loginWithCredentials = async (username: string, password: string, role: UserRole = 'farmer') => {
    setIsLoading(true);
    try {
      const res = await loginApi(username, password, role);
      const authedUser: User = {
        id: res.user.username,
        name: res.user.username,
        role: (res.user.role as UserRole) || role,
        phone: res.user.phone,
        email: res.user.email,
        district: res.user.district,
        designation: res.user.designation
      };
      setUser(authedUser);
      setToken(res.access_token);
      setIsDemoUser(false);
      localStorage.setItem('krushigan_user', JSON.stringify(authedUser));
      localStorage.setItem('krushigan_token', res.access_token);
      localStorage.setItem('krushigan_is_demo', 'false');

      if (authedUser.role === 'farmer') {
        setFarmerProfile(prev => ({
          ...prev,
          name: authedUser.name,
          phone: authedUser.phone || prev.phone,
          district: authedUser.district || prev.district
        }));
      }

      setIsLoading(false);
      return { success: true };
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, error: err.message || 'Login failed' };
    }
  };

  const registerWithCredentials = async (data: {
    username: string;
    password: string;
    role?: UserRole;
    phone?: string;
    email?: string;
    district?: string;
    designation?: string;
  }) => {
    setIsLoading(true);
    try {
      const res = await registerApi(data);
      const registeredUser: User = {
        id: res.user.username,
        name: res.user.username,
        role: (res.user.role as UserRole) || data.role || 'farmer',
        phone: res.user.phone,
        email: res.user.email,
        district: res.user.district,
        designation: res.user.designation
      };
      setUser(registeredUser);
      setToken(res.access_token);
      setIsDemoUser(false);
      localStorage.setItem('krushigan_user', JSON.stringify(registeredUser));
      localStorage.setItem('krushigan_token', res.access_token);
      localStorage.setItem('krushigan_is_demo', 'false');

      if (registeredUser.role === 'farmer') {
        setFarmerProfile(prev => ({
          ...prev,
          name: registeredUser.name,
          phone: registeredUser.phone || prev.phone,
          district: registeredUser.district || prev.district
        }));
      }

      setIsLoading(false);
      return { success: true };
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, error: err.message || 'Registration failed' };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsDemoUser(false);
    localStorage.removeItem('krushigan_user');
    localStorage.removeItem('krushigan_token');
    localStorage.removeItem('krushigan_is_demo');
  };

  const switchRole = async (role: UserRole): Promise<{ success: boolean; error?: string }> => {
    return await login(role);
  };

  const updateFarmerProfile = (updated: Partial<FarmerProfile>) => {
    setFarmerProfile(prev => ({ ...prev, ...updated }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        farmerProfile,
        updateFarmerProfile,
        login,
        loginWithCredentials,
        registerWithCredentials,
        logout,
        switchRole,
        isAuthenticated: !!user,
        isDemoUser,
        isLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
